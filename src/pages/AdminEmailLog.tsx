import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Navigation } from "@/components/sections/navigation";
import { Footer } from "@/components/sections/footer";
import { SEOHead } from "@/components/SEOHead";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { Loader2, RefreshCw, Mail, ShieldCheck, Info, Database, Eye, EyeOff } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type LogRow = {
  id: string;
  message_id: string | null;
  template_name: string;
  recipient_email: string;
  recipient_ip_hash: string | null;
  status: string;
  error_message: string | null;
  created_at: string;
};

type Preset = "24h" | "7d" | "30d" | "custom";

const PAGE_SIZE = 50;

const STATUS_STYLES: Record<string, string> = {
  sent: "bg-emerald-100 text-emerald-800 hover:bg-emerald-100",
  pending: "bg-blue-100 text-blue-800 hover:bg-blue-100",
  failed: "bg-red-100 text-red-700 hover:bg-red-100",
  dlq: "bg-red-100 text-red-700 hover:bg-red-100",
  bounced: "bg-red-100 text-red-700 hover:bg-red-100",
  complained: "bg-red-100 text-red-700 hover:bg-red-100",
  suppressed: "bg-amber-100 text-amber-800 hover:bg-amber-100",
};

function isoDaysAgo(days: number): string {
  const d = new Date();
  d.setDate(d.getDate() - days);
  return d.toISOString();
}
function isoHoursAgo(hours: number): string {
  const d = new Date();
  d.setHours(d.getHours() - hours);
  return d.toISOString();
}

function presetRange(preset: Preset): { start: string; end: string } {
  const end = new Date().toISOString();
  if (preset === "24h") return { start: isoHoursAgo(24), end };
  if (preset === "7d") return { start: isoDaysAgo(7), end };
  return { start: isoDaysAgo(30), end };
}

const REVEAL_PREF_KEY = "admin_email_log_reveal_emails";

/**
 * Mask an email like "john.doe@example.com" -> "j••••e@e••••e.com".
 * Keeps the first/last character of the local part and of the domain label.
 */
function maskEmail(email: string | null | undefined): string {
  if (!email) return "—";
  const at = email.indexOf("@");
  if (at < 1) return "•••";
  const local = email.slice(0, at);
  const domain = email.slice(at + 1);
  const maskPart = (s: string) => {
    if (s.length <= 2) return s[0] + "•";
    return s[0] + "•".repeat(Math.min(4, s.length - 2)) + s[s.length - 1];
  };
  const dotIdx = domain.lastIndexOf(".");
  const domainName = dotIdx > 0 ? domain.slice(0, dotIdx) : domain;
  const tld = dotIdx > 0 ? domain.slice(dotIdx) : "";
  return `${maskPart(local)}@${maskPart(domainName)}${tld}`;
}

const AdminEmailLog = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [authorized, setAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const [preset, setPreset] = useState<Preset>("7d");
  const [customStart, setCustomStart] = useState<string>("");
  const [customEnd, setCustomEnd] = useState<string>("");
  const [templateFilter, setTemplateFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [emailSearch, setEmailSearch] = useState<string>("");
  const [exactMatch, setExactMatch] = useState<boolean>(false);
  const [page, setPage] = useState(0);
  const [revealAll, setRevealAll] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return window.localStorage.getItem(REVEAL_PREF_KEY) === "1";
  });
  const [revealedRows, setRevealedRows] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(REVEAL_PREF_KEY, revealAll ? "1" : "0");
  }, [revealAll]);

  const [rows, setRows] = useState<LogRow[]>([]);
  const [templates, setTemplates] = useState<string[]>([]);

  const range = useMemo(() => {
    if (preset === "custom") {
      const start = customStart ? new Date(customStart).toISOString() : isoDaysAgo(30);
      const end = customEnd
        ? new Date(new Date(customEnd).getTime() + 24 * 60 * 60 * 1000 - 1).toISOString()
        : new Date().toISOString();
      return { start, end };
    }
    return presetRange(preset);
  }, [preset, customStart, customEnd]);

  // Auth/role check
  useEffect(() => {
    const init = async () => {
      const { data: sess } = await supabase.auth.getSession();
      if (!sess.session) {
        navigate("/admin", { replace: true });
        return;
      }
      const { data: roleRow } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", sess.session.user.id)
        .eq("role", "admin")
        .maybeSingle();
      if (!roleRow) {
        toast({
          title: "Not authorized",
          description: "You need an admin role to access this page.",
          variant: "destructive",
        });
        navigate("/admin", { replace: true });
        return;
      }
      setAuthorized(true);
      setLoading(false);
    };
    init();
  }, [navigate, toast]);

  // Fetch data within range
  const fetchData = async () => {
    setRefreshing(true);
    try {
      const { data, error } = await supabase
        .from("email_send_log")
        .select("id, message_id, template_name, recipient_email, recipient_ip_hash, status, error_message, created_at")
        .gte("created_at", range.start)
        .lte("created_at", range.end)
        .order("created_at", { ascending: false })
        .limit(1000);
      if (error) throw error;
      setRows((data ?? []) as LogRow[]);
      const distinct = Array.from(
        new Set((data ?? []).map((r: any) => r.template_name).filter(Boolean)),
      ).sort();
      setTemplates(distinct);
      setPage(0);
    } catch (e: any) {
      toast({
        title: "Failed to load email log",
        description: e?.message ?? "Unknown error",
        variant: "destructive",
      });
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    if (!authorized) return;
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authorized, range.start, range.end]);

  // Deduplicate by message_id (latest row per message). Rows without message_id are kept as-is.
  const dedupedAll = useMemo(() => {
    const sorted = [...rows].sort(
      (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
    );
    const seen = new Set<string>();
    const out: LogRow[] = [];
    for (const r of sorted) {
      if (r.message_id) {
        if (seen.has(r.message_id)) continue;
        seen.add(r.message_id);
      }
      out.push(r);
    }
    return out;
  }, [rows]);

  const filtered = useMemo(() => {
    const q = emailSearch.trim().toLowerCase();
    return dedupedAll.filter((r) => {
      if (templateFilter !== "all" && r.template_name !== templateFilter) return false;
      if (statusFilter !== "all") {
        if (statusFilter === "failed") {
          if (!["failed", "dlq", "bounced", "complained"].includes(r.status)) return false;
        } else if (r.status !== statusFilter) {
          return false;
        }
      }
      if (q) {
        const email = r.recipient_email?.toLowerCase() ?? "";
        const ip = r.recipient_ip_hash?.toLowerCase() ?? "";
        const matchEmail = exactMatch ? email === q : email.includes(q);
        const matchIp = exactMatch ? ip === q : ip.includes(q);
        if (!matchEmail && !matchIp) return false;
      }
      return true;
    });
  }, [dedupedAll, templateFilter, statusFilter, emailSearch, exactMatch]);

  useEffect(() => {
    setPage(0);
  }, [emailSearch, templateFilter, statusFilter, exactMatch]);

  const stats = useMemo(() => {
    // Compute counts from rows after template + search filters but BEFORE the
    // status filter, so the quick-filter chips always show accurate per-status totals.
    const q = emailSearch.trim().toLowerCase();
    const base = dedupedAll.filter((r) => {
      if (templateFilter !== "all" && r.template_name !== templateFilter) return false;
      if (q) {
        const email = r.recipient_email?.toLowerCase() ?? "";
        const ip = r.recipient_ip_hash?.toLowerCase() ?? "";
        const matchEmail = exactMatch ? email === q : email.includes(q);
        const matchIp = exactMatch ? ip === q : ip.includes(q);
        if (!matchEmail && !matchIp) return false;
      }
      return true;
    });
    const s = { total: base.length, sent: 0, failed: 0, suppressed: 0, pending: 0 };
    for (const r of base) {
      if (r.status === "sent") s.sent++;
      else if (["failed", "dlq", "bounced", "complained"].includes(r.status)) s.failed++;
      else if (r.status === "suppressed") s.suppressed++;
      else if (r.status === "pending") s.pending++;
    }
    return s;
  }, [dedupedAll, templateFilter, emailSearch, exactMatch]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageRows = filtered.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!authorized) return null;

  return (
    <div className="min-h-screen flex flex-col">
      <SEOHead
        title="Email Delivery Log – Admin"
        description="Monitor sent auth and transactional emails and their delivery statuses."
      />
      <Navigation />
      <main className="flex-1 container mx-auto px-4 py-10 max-w-7xl">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <div>
            <h1 className="text-3xl font-semibold flex items-center gap-2">
              <Mail className="h-7 w-7" /> Email delivery log
            </h1>
            <p className="text-muted-foreground text-sm mt-1">
              Sent auth and transactional emails with deduplicated latest status per message.
            </p>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            {(
              [
                { value: "all", label: "All", count: stats.total },
                { value: "pending", label: "Pending", count: stats.pending },
                { value: "sent", label: "Sent", count: stats.sent },
                { value: "failed", label: "Failed", count: stats.failed },
                { value: "suppressed", label: "Suppressed", count: stats.suppressed },
              ] as const
            ).map((opt) => (
              <Button
                key={opt.value}
                size="sm"
                variant={statusFilter === opt.value ? "default" : "outline"}
                onClick={() => setStatusFilter(opt.value)}
              >
                {opt.label}
                <span className="ml-1.5 text-xs opacity-70">{opt.count}</span>
              </Button>
            ))}
            <Button variant="outline" size="sm" onClick={fetchData} disabled={refreshing}>
              {refreshing ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : (
                <RefreshCw className="h-4 w-4 mr-2" />
              )}
              Refresh
            </Button>
          </div>
        </div>

        {/* Privacy disclaimer */}
        <Alert className="mb-6">
          <ShieldCheck className="h-4 w-4" />
          <AlertTitle>Privacy notice</AlertTitle>
          <AlertDescription>
            The <span className="font-mono text-xs">IP hash</span> column shows a salted SHA-256
            digest of the originating IP address — never the raw IP. Hashes are one-way and used
            only to correlate delivery attempts (e.g. spotting repeated failures from the same
            source). Recipient emails and IP hashes are visible to admins only.
          </AlertDescription>
        </Alert>

        {/* Data retention */}
        <Alert className="mb-6">
          <Database className="h-4 w-4" />
          <AlertTitle>Data retention</AlertTitle>
          <AlertDescription>
            <p className="mb-2">
              Email log entries (template name, recipient email, IP hash, status, error message,
              timestamp) are retained <strong>indefinitely</strong> by default — no automated
              purge is configured. Logs are append-only: each delivery attempt writes a new row
              and existing rows are never modified.
            </p>
            <p className="mb-2">
              <strong>How data is deleted:</strong>
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                <strong>Manual purge:</strong> An admin can permanently delete entries through the
                backend database (e.g. delete rows older than 90 days, or delete all rows for a
                specific recipient on POPIA/GDPR request).
              </li>
              <li>
                <strong>Right to erasure:</strong> If a user requests deletion of their personal
                data, their entries in <span className="font-mono text-xs">email_send_log</span>{" "}
                and <span className="font-mono text-xs">email_unsubscribe_tokens</span> should be
                removed alongside their account.
              </li>
              <li>
                <strong>Suppression list:</strong> Bounced/complained/unsubscribed addresses are
                kept in <span className="font-mono text-xs">suppressed_emails</span> as long as
                needed to prevent re-sending — these are intentionally retained.
              </li>
            </ul>
            <p className="mt-2 text-xs text-muted-foreground">
              If you'd like an automated retention window (e.g. auto-delete logs older than 90 days),
              ask your developer to configure a scheduled cleanup job.
            </p>
          </AlertDescription>
        </Alert>

        {/* Filters */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-base">Filters</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-4">
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1 block">
                Time range
              </label>
              <Select value={preset} onValueChange={(v) => setPreset(v as Preset)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="24h">Last 24 hours</SelectItem>
                  <SelectItem value="7d">Last 7 days</SelectItem>
                  <SelectItem value="30d">Last 30 days</SelectItem>
                  <SelectItem value="custom">Custom range</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {preset === "custom" && (
              <>
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1 block">
                    Start date
                  </label>
                  <Input
                    type="date"
                    value={customStart}
                    onChange={(e) => setCustomStart(e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1 block">
                    End date
                  </label>
                  <Input
                    type="date"
                    value={customEnd}
                    onChange={(e) => setCustomEnd(e.target.value)}
                  />
                </div>
              </>
            )}

            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1 block">
                Email type
              </label>
              <Select value={templateFilter} onValueChange={setTemplateFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All templates</SelectItem>
                  {templates.map((t) => (
                    <SelectItem key={t} value={t}>
                      {t}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1 block">
                Status
              </label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All statuses</SelectItem>
                  <SelectItem value="sent">Sent</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                  <SelectItem value="suppressed">Suppressed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="md:col-span-4">
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-medium text-muted-foreground">
                  Search recipient email
                </label>
                <div className="flex items-center gap-2">
                  <Switch
                    id="exact-match"
                    checked={exactMatch}
                    onCheckedChange={setExactMatch}
                  />
                  <Label htmlFor="exact-match" className="text-xs text-muted-foreground cursor-pointer">
                    Exact match
                  </Label>
                </div>
              </div>
              <div className="flex gap-2">
                <Input
                  type="search"
                  placeholder={
                    exactMatch
                      ? "Exact email or IP hash"
                      : "Search by email or IP hash (partial)"
                  }
                  value={emailSearch}
                  onChange={(e) => setEmailSearch(e.target.value)}
                />
                {emailSearch && (
                  <Button variant="outline" onClick={() => setEmailSearch("")}>
                    Clear
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Summary stats */}
        <div className="grid gap-4 grid-cols-2 md:grid-cols-5 mb-6">
          {[
            { label: "Total emails", value: stats.total, color: "text-foreground" },
            { label: "Sent", value: stats.sent, color: "text-emerald-700" },
            { label: "Pending", value: stats.pending, color: "text-blue-700" },
            { label: "Failed", value: stats.failed, color: "text-red-700" },
            { label: "Suppressed", value: stats.suppressed, color: "text-amber-700" },
          ].map((s) => (
            <Card key={s.label}>
              <CardContent className="pt-6">
                <div className="text-xs uppercase tracking-wide text-muted-foreground">
                  {s.label}
                </div>
                <div className={`text-2xl font-semibold mt-1 ${s.color}`}>{s.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Log table */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">
              Email log ({filtered.length} unique emails)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Template</TableHead>
                    <TableHead>Recipient</TableHead>
                    <TableHead>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <span className="inline-flex items-center gap-1 cursor-help">
                              IP hash
                              <Info className="h-3 w-3 text-muted-foreground" />
                            </span>
                          </TooltipTrigger>
                          <TooltipContent className="max-w-xs">
                            Salted SHA-256 hash of the originating IP address — not the raw IP.
                            One-way and used only for correlating delivery attempts.
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Sent at</TableHead>
                    <TableHead>Error</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pageRows.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                        No emails match these filters.
                      </TableCell>
                    </TableRow>
                  ) : (
                    pageRows.map((r) => (
                      <TableRow key={r.id}>
                        <TableCell className="font-medium">{r.template_name}</TableCell>
                        <TableCell className="font-mono text-xs">{r.recipient_email}</TableCell>
                        <TableCell
                          className="font-mono text-xs text-muted-foreground max-w-[140px] truncate"
                          title={r.recipient_ip_hash ?? ""}
                        >
                          {r.recipient_ip_hash ?? "—"}
                        </TableCell>
                        <TableCell>
                          <Badge
                            className={
                              STATUS_STYLES[r.status] ?? "bg-muted text-muted-foreground"
                            }
                          >
                            {r.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-xs text-muted-foreground whitespace-nowrap">
                          {new Date(r.created_at).toLocaleString()}
                        </TableCell>
                        <TableCell className="text-xs text-red-700 max-w-xs truncate" title={r.error_message ?? ""}>
                          {r.error_message ?? "—"}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>

            {filtered.length > PAGE_SIZE && (
              <div className="flex items-center justify-between mt-4">
                <div className="text-xs text-muted-foreground">
                  Page {page + 1} of {totalPages}
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={page === 0}
                    onClick={() => setPage((p) => Math.max(0, p - 1))}
                  >
                    Previous
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={page >= totalPages - 1}
                    onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default AdminEmailLog;