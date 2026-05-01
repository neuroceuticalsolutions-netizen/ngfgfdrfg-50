import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Navigation } from "@/components/sections/navigation";
import { Footer } from "@/components/sections/footer";
import { SEOHead } from "@/components/SEOHead";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Loader2, LogOut, Mail, RefreshCw, MessageSquare } from "lucide-react";

type AppRow = {
  id: string;
  company_name: string;
  brand_name: string | null;
  email: string;
  contact_name: string;
  product_category: string;
  distribution_goals: string;
  status: "submitted" | "reviewing" | "approved" | "declined";
  admin_notes: string | null;
  created_at: string;
};

const STATUS_VARIANT: Record<AppRow["status"], string> = {
  submitted: "bg-grey-100 text-grey-700",
  reviewing: "bg-amber-100 text-amber-800",
  approved: "bg-emerald-100 text-emerald-800",
  declined: "bg-red-100 text-red-700",
};

const AdminApplications = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  const [rows, setRows] = useState<AppRow[]>([]);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [notesById, setNotesById] = useState<Record<string, string>>({});

  useEffect(() => {
    const init = async () => {
      const { data: sess } = await supabase.auth.getSession();
      if (!sess.session) {
        navigate("/admin", { replace: true });
        return;
      }
      // Check role
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
      .select("id, company_name, brand_name, email, contact_name, product_category, distribution_goals, status, admin_notes, created_at")
      .order("created_at", { ascending: false });
    if (error) {
      toast({ title: "Failed to load", description: error.message, variant: "destructive" });
      return;
    }
    setRows((data ?? []) as AppRow[]);
  };

  const updateStatus = async (id: string, status: AppRow["status"]) => {
    setBusyId(id);
    try {
      const { data, error } = await supabase.functions.invoke("update-application-status", {
        body: { applicationId: id, status, notes: notesById[id] || undefined },
      });
      if (error) throw error;
      toast({
        title: `Status set to ${status}`,
        description: data?.emailSent === false ? "Email could not be sent (email infra may not be configured yet)." : "Applicant has been notified by email.",
      });
      await load();
    } catch (err: any) {
      toast({ title: "Update failed", description: err.message, variant: "destructive" });
    } finally {
      setBusyId(null);
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    navigate("/admin", { replace: true });
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
                Your account exists but doesn't have the <code>admin</code> role yet.
                An existing admin needs to insert a row in <code>user_roles</code> with your user id and role <code>admin</code>.
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
      <SEOHead title="Admin — Partner applications" description="Review and update partner application status." path="/admin/applications" />
      <Navigation />
      <main className="container mx-auto px-6 pt-28 pb-20 max-w-5xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="heading-lg text-royal-purple">Partner applications</h1>
            <p className="text-grey-600 text-sm mt-1">{rows.length} application{rows.length === 1 ? "" : "s"}</p>
          </div>
          <div className="flex gap-2">
            <Button asChild variant="outline" size="sm">
              <Link to="/admin/sms-consent">
                <MessageSquare className="mr-2 h-4 w-4" /> SMS consent
              </Link>
            </Button>
            <Button variant="outline" size="sm" onClick={load}>
              <RefreshCw className="mr-2 h-4 w-4" /> Refresh
            </Button>
            <Button variant="outline" size="sm" onClick={signOut}>
              <LogOut className="mr-2 h-4 w-4" /> Sign out
            </Button>
          </div>
        </div>

        {rows.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center text-grey-500">No applications yet.</CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {rows.map((row) => (
              <Card key={row.id}>
                <CardHeader>
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <CardTitle className="text-royal-purple">{row.company_name}</CardTitle>
                      <CardDescription>
                        {row.contact_name} · <a className="underline" href={`mailto:${row.email}`}><Mail className="inline h-3 w-3" /> {row.email}</a>
                      </CardDescription>
                      <p className="text-xs text-grey-500 mt-1">
                        {new Date(row.created_at).toLocaleString()} · {row.product_category}
                      </p>
                    </div>
                    <Badge className={STATUS_VARIANT[row.status]}>{row.status}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-grey-700 whitespace-pre-wrap">{row.distribution_goals}</p>
                  <Textarea
                    placeholder="Optional notes to include in the status email…"
                    value={notesById[row.id] ?? row.admin_notes ?? ""}
                    onChange={(e) => setNotesById((m) => ({ ...m, [row.id]: e.target.value }))}
                    rows={2}
                  />
                  <div className="flex flex-wrap items-center gap-2">
                    <Select
                      value={row.status}
                      onValueChange={(v) => updateStatus(row.id, v as AppRow["status"])}
                      disabled={busyId === row.id}
                    >
                      <SelectTrigger className="w-[200px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="submitted">Submitted</SelectItem>
                        <SelectItem value="reviewing">Mark as reviewing</SelectItem>
                        <SelectItem value="approved">Approve</SelectItem>
                        <SelectItem value="declined">Decline</SelectItem>
                      </SelectContent>
                    </Select>
                    {busyId === row.id && <Loader2 className="h-4 w-4 animate-spin text-royal-purple" />}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default AdminApplications;