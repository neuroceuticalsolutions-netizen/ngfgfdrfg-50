import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Navigation } from "@/components/sections/navigation";
import { Footer } from "@/components/sections/footer";
import { SEOHead } from "@/components/SEOHead";
import { Helmet } from "react-helmet-async";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import {
  Loader2,
  LogOut,
  RefreshCw,
  ShieldCheck,
  ShieldAlert,
  ShieldOff,
  Download,
  ArrowLeft,
} from "lucide-react";

type Row = {
  id: string;
  company_name: string;
  contact_name: string;
  email: string;
  phone: string | null;
  status: "submitted" | "reviewing" | "approved" | "declined";
  sms_opt_in: boolean;
  sms_consent_at: string | null;
  sms_consent_source: string | null;
  sms_verified_at: string | null;
  sms_verification_sent_at: string | null;
  created_at: string;
};

type FilterKey = "all" | "verified" | "pending" | "expired" | "not_opted_in";

const AdminSmsConsent = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  const [rows, setRows] = useState<Row[]>([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<FilterKey>("all");

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
          description: "Your account doesn't have the admin role yet.",
          variant: "destructive",
        });
        setLoading(false);
        return;
      }
      setAuthorized(true);
      await load();
      setLoading(false);
    };
    init();
  }, [navigate, toast]);

  const load = async () => {
    const { data, error } = await supabase
      .from("partner_applications")
      .select(
        "id, company_name, contact_name, email, phone, status, sms_opt_in, sms_consent_at, sms_consent_source, sms_verified_at, sms_verification_sent_at, created_at"
      )
      .order("sms_consent_at", { ascending: false, nullsFirst: false });
    if (error) {
      toast({
        title: "Failed to load",
        description: error.message,
        variant: "destructive",
      });
      return;
    }
    setRows((data ?? []) as Row[]);
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    navigate("/admin", { replace: true });
  };

  const stateOf = (r: Row): FilterKey => {
    if (!r.sms_opt_in) return "not_opted_in";
    if (r.sms_verified_at) return "verified";
    if (r.sms_verification_sent_at) {
      const ageDays =
        (Date.now() - new Date(r.sms_verification_sent_at).getTime()) /
        (24 * 60 * 60 * 1000);
      if (ageDays > 14) return "expired";
    }
    return "pending";
  };

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return rows.filter((r) => {
      const s = stateOf(r);
      if (filter !== "all" && s !== filter) return false;
      if (!q) return true;
      return (
        r.company_name.toLowerCase().includes(q) ||
        r.contact_name.toLowerCase().includes(q) ||
        r.email.toLowerCase().includes(q) ||
        (r.phone ?? "").toLowerCase().includes(q)
      );
    });
  }, [rows, search, filter]);

  const counts = useMemo(() => {
    const c = { verified: 0, pending: 0, expired: 0, not_opted_in: 0 };
    rows.forEach((r) => {
      c[stateOf(r)]++;
    });
    return c;
  }, [rows]);

  const fmt = (iso: string | null) =>
    iso ? new Date(iso).toLocaleString("en-ZA", { hour12: false }) : "—";

  const exportCsv = () => {
    const header = [
      "company",
      "contact",
      "email",
      "phone",
      "application_status",
      "sms_state",
      "sms_opt_in",
      "consent_at",
      "consent_source",
      "verification_sent_at",
      "verified_at",
    ];
    const csvEscape = (v: string | number | boolean | null) => {
      const s = v === null || v === undefined ? "" : String(v);
      return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
    };
    const lines = [header.join(",")];
    filtered.forEach((r) => {
      lines.push(
        [
          r.company_name,
          r.contact_name,
          r.email,
          r.phone ?? "",
          r.status,
          stateOf(r),
          r.sms_opt_in,
          r.sms_consent_at ?? "",
          r.sms_consent_source ?? "",
          r.sms_verification_sent_at ?? "",
          r.sms_verified_at ?? "",
        ]
          .map(csvEscape)
          .join(",")
      );
    });
    const blob = new Blob([lines.join("\n")], {
      type: "text/csv;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `partner-sms-consent-${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-royal-purple" />
      </div>
    );
  }

  if (!authorized) {
    return (
      <div className="min-h-screen bg-white">
        <Navigation />
        <main className="container mx-auto px-6 pt-32 pb-20 max-w-xl">
          <Card>
            <CardHeader>
              <CardTitle>Awaiting role assignment</CardTitle>
              <CardDescription>
                Your account doesn't have the <code>admin</code> role yet.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" onClick={signOut}>
                <LogOut className="mr-2 h-4 w-4" /> Sign out
              </Button>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <SEOHead
        title="Admin — Partner SMS consent"
        description="Audit partner SMS opt-ins and verification status."
        path="/admin/sms-consent"
      />
      <Helmet>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <Navigation />
      <main className="container mx-auto px-6 pt-28 pb-20 max-w-6xl">
        <div className="flex flex-wrap items-start justify-between gap-3 mb-6">
          <div>
            <Button asChild variant="ghost" size="sm" className="-ml-2 mb-2">
              <Link to="/admin/applications">
                <ArrowLeft className="mr-2 h-4 w-4" /> Applications
              </Link>
            </Button>
            <h1 className="heading-lg text-royal-purple">
              Partner SMS consent
            </h1>
            <p className="text-grey-600 text-sm mt-1">
              POPIA audit log of opt-ins, consent timestamps, and email
              verification status.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" onClick={exportCsv}>
              <Download className="mr-2 h-4 w-4" /> Export CSV
            </Button>
            <Button variant="outline" size="sm" onClick={load}>
              <RefreshCw className="mr-2 h-4 w-4" /> Refresh
            </Button>
            <Button variant="outline" size="sm" onClick={signOut}>
              <LogOut className="mr-2 h-4 w-4" /> Sign out
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          <StatCard
            label="Verified"
            value={counts.verified}
            icon={<ShieldCheck className="h-4 w-4 text-fresh-teal" />}
          />
          <StatCard
            label="Pending verification"
            value={counts.pending}
            icon={<ShieldAlert className="h-4 w-4 text-amber-600" />}
          />
          <StatCard
            label="Expired (>14d)"
            value={counts.expired}
            icon={<ShieldOff className="h-4 w-4 text-red-600" />}
          />
          <StatCard
            label="Not opted in"
            value={counts.not_opted_in}
            icon={<ShieldOff className="h-4 w-4 text-grey-500" />}
          />
        </div>

        <Card className="mb-4">
          <CardContent className="p-4 flex flex-wrap gap-3 items-center">
            <Input
              placeholder="Search company, contact, email or phone…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="max-w-sm"
            />
            <Select
              value={filter}
              onValueChange={(v) => setFilter(v as FilterKey)}
            >
              <SelectTrigger className="w-[200px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All applications</SelectItem>
                <SelectItem value="verified">Verified opt-in</SelectItem>
                <SelectItem value="pending">Pending verification</SelectItem>
                <SelectItem value="expired">Expired (&gt;14d)</SelectItem>
                <SelectItem value="not_opted_in">Not opted in</SelectItem>
              </SelectContent>
            </Select>
            <span className="text-sm text-grey-600 ml-auto">
              {filtered.length} of {rows.length}
            </span>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-0 overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Company / contact</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>SMS state</TableHead>
                  <TableHead>Consent at</TableHead>
                  <TableHead>Source</TableHead>
                  <TableHead>Verified at</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      className="text-center text-grey-500 py-10"
                    >
                      No matching applications.
                    </TableCell>
                  </TableRow>
                ) : (
                  filtered.map((r) => (
                    <TableRow key={r.id}>
                      <TableCell>
                        <div className="font-medium text-royal-purple">
                          {r.company_name}
                        </div>
                        <div className="text-xs text-grey-600">
                          {r.contact_name} ·{" "}
                          <a
                            className="underline"
                            href={`mailto:${r.email}`}
                          >
                            {r.email}
                          </a>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm">
                        {r.phone ?? (
                          <span className="text-grey-400">—</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <StateBadge state={stateOf(r)} />
                      </TableCell>
                      <TableCell className="text-sm text-grey-700">
                        {fmt(r.sms_consent_at)}
                      </TableCell>
                      <TableCell className="text-sm text-grey-600">
                        {r.sms_consent_source ?? "—"}
                      </TableCell>
                      <TableCell className="text-sm text-grey-700">
                        {fmt(r.sms_verified_at)}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

function StatCard({
  label,
  value,
  icon,
}: {
  label: string;
  value: number;
  icon: React.ReactNode;
}) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-grey-600">
          {icon} {label}
        </div>
        <div className="text-2xl font-semibold text-royal-purple mt-1">
          {value}
        </div>
      </CardContent>
    </Card>
  );
}

function StateBadge({ state }: { state: FilterKey }) {
  switch (state) {
    case "verified":
      return (
        <Badge className="bg-fresh-teal/15 text-fresh-teal hover:bg-fresh-teal/15">
          Verified
        </Badge>
      );
    case "pending":
      return (
        <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">
          Pending
        </Badge>
      );
    case "expired":
      return (
        <Badge className="bg-red-100 text-red-700 hover:bg-red-100">
          Expired
        </Badge>
      );
    default:
      return (
        <Badge className="bg-grey-100 text-grey-600 hover:bg-grey-100">
          Not opted in
        </Badge>
      );
  }
}

export default AdminSmsConsent;
