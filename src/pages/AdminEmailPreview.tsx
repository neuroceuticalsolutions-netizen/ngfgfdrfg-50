import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Navigation } from "@/components/sections/navigation";
import { Footer } from "@/components/sections/footer";
import { SEOHead } from "@/components/SEOHead";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Loader2, Mail, ShieldCheck } from "lucide-react";

/* ------------------------------------------------------------------ */
/* Visual replicas of our React Email templates — kept in sync with    */
/* supabase/functions/_shared/transactional-email-templates/*.tsx so   */
/* admins can preview the layout WITHOUT calling the edge function or  */
/* sending a real email.                                                */
/* ------------------------------------------------------------------ */

const BRAND = {
  purple: "hsl(271, 50%, 35%)",
  purpleDark: "hsl(271, 55%, 25%)",
  purpleLight: "hsl(271, 50%, 45%)",
  teal: "hsl(172, 70%, 50%)",
  tealSoft: "hsl(172, 70%, 96%)",
  ink: "hsl(210, 22%, 8%)",
  muted: "hsl(210, 11%, 46%)",
  border: "hsl(210, 16%, 92%)",
  font:
    'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif',
};

function BrandShell({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        backgroundColor: "#ffffff",
        fontFamily: BRAND.font,
        maxWidth: 560,
        margin: "0 auto",
        border: `1px solid ${BRAND.border}`,
        borderRadius: 12,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          background: `linear-gradient(135deg, ${BRAND.purpleDark} 0%, ${BRAND.purple} 60%, ${BRAND.purpleLight} 100%)`,
          padding: "28px 28px 24px",
          color: "#ffffff",
        }}
      >
        <p
          style={{
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: BRAND.teal,
            margin: "0 0 6px",
          }}
        >
          Neuroceutical Solutions
        </p>
        <p style={{ fontSize: 20, fontWeight: 700, margin: 0 }}>
          Cognitive performance, delivered.
        </p>
      </div>
      <div style={{ height: 3, backgroundColor: BRAND.teal }} />
      <div style={{ padding: "32px 28px 8px" }}>{children}</div>
      <div
        style={{ borderTop: `1px solid ${BRAND.border}`, margin: "24px 0 0" }}
      />
      {/* Body footer */}
      <p
        style={{
          fontSize: 12,
          color: BRAND.muted,
          lineHeight: 1.6,
          padding: "16px 28px 0",
          margin: 0,
        }}
      >
        You received this email because of an action on your Neuroceutical
        Solutions account. If this wasn't you, you can safely ignore it.
      </p>
      <p
        style={{
          fontSize: 11,
          color: BRAND.muted,
          padding: "8px 28px 16px",
          margin: 0,
        }}
      >
        © Neuroceutical Solutions · South Africa
      </p>
      {/* System-managed unsubscribe footer mock */}
      <SystemUnsubscribeFooter />
    </div>
  );
}

function SystemUnsubscribeFooter() {
  return (
    <div
      style={{
        backgroundColor: "#fafafa",
        borderTop: `1px dashed ${BRAND.border}`,
        padding: "14px 28px",
        textAlign: "center",
      }}
    >
      <p
        style={{
          fontSize: 11,
          color: "#888888",
          margin: 0,
          lineHeight: 1.6,
          fontFamily: BRAND.font,
        }}
      >
        Don't want to receive these emails?{" "}
        <a
          href="#"
          onClick={(e) => e.preventDefault()}
          style={{ color: "#666666", textDecoration: "underline" }}
        >
          Unsubscribe
        </a>
        .
      </p>
    </div>
  );
}

const h1: React.CSSProperties = {
  fontSize: 24,
  fontWeight: 700,
  color: BRAND.ink,
  margin: "0 0 16px",
};
const text: React.CSSProperties = {
  fontSize: 15,
  color: BRAND.muted,
  lineHeight: 1.6,
  margin: "0 0 18px",
};
const button: React.CSSProperties = {
  backgroundColor: BRAND.purple,
  color: "#ffffff",
  fontSize: 15,
  fontWeight: 600,
  borderRadius: 12,
  display: "inline-block",
  padding: "14px 24px",
  textDecoration: "none",
  boxShadow: `0 8px 20px -8px ${BRAND.purple}`,
};
const codeCard: React.CSSProperties = {
  backgroundColor: BRAND.tealSoft,
  border: `1px solid ${BRAND.teal}`,
  borderRadius: 12,
  padding: "18px 20px",
  margin: "4px 0 24px",
  textAlign: "center",
};

/* ----- Template mocks (keep visually in sync) ----- */

const TEMPLATES: Array<{
  key: string;
  name: string;
  subject: string;
  render: () => React.ReactNode;
}> = [
  {
    key: "partner-application-submitted",
    name: "Partner application — submitted",
    subject: "We received your distribution application",
    render: () => (
      <BrandShell>
        <h1 style={h1}>Thanks, Jordan!</h1>
        <p style={text}>
          We have received your free sample distribution application for Apex
          Coworking. Our partnerships team will review your submission and
          follow up shortly.
        </p>
        <div
          style={{
            backgroundColor: "hsl(271, 50%, 97%)",
            borderRadius: 12,
            padding: "16px 18px",
            margin: "0 0 20px",
          }}
        >
          <p
            style={{
              fontSize: 12,
              fontWeight: 600,
              color: BRAND.purple,
              letterSpacing: "0.04em",
              textTransform: "uppercase",
              margin: "0 0 8px",
            }}
          >
            What happens next
          </p>
          <p style={{ fontSize: 14, color: BRAND.ink, lineHeight: 1.6, margin: 0 }}>
            1. We confirm receipt of your application.<br />
            2. Our team reviews your venue and audience fit.<br />
            3. You receive a decision with onboarding instructions.
          </p>
        </div>
        <p style={{ fontSize: 12, color: BRAND.muted, margin: "0 0 16px" }}>
          Reference: app_123
        </p>
        <p style={{ fontSize: 12, color: "#999999", margin: "24px 0 0" }}>
          — The Neuroceutical Solutions Partnerships Team
        </p>
      </BrandShell>
    ),
  },
  {
    key: "partner-application-reviewing",
    name: "Partner application — under review",
    subject: "Your distribution application is under review",
    render: () => (
      <BrandShell>
        <h1 style={h1}>Hi Jordan,</h1>
        <p style={text}>
          Good news — your application for Apex Coworking has moved into{" "}
          <strong>active review</strong>. Our partnerships team is now
          assessing venue fit, audience alignment, and logistics.
        </p>
        <p style={text}>
          You can expect a final decision within a few business days.
        </p>
        <p style={{ fontSize: 12, color: BRAND.muted, margin: "0 0 16px" }}>
          Reference: app_123
        </p>
        <p style={{ fontSize: 12, color: "#999999", margin: "24px 0 0" }}>
          — The Neuroceutical Solutions Partnerships Team
        </p>
      </BrandShell>
    ),
  },
  {
    key: "partner-application-approved",
    name: "Partner application — approved",
    subject: "Your distribution partnership has been approved",
    render: () => (
      <BrandShell>
        <h1 style={h1}>Welcome aboard, Jordan!</h1>
        <p style={text}>
          We are excited to confirm that your free sample distribution
          application for Apex Coworking has been <strong>approved</strong>.
        </p>
        <div style={{ margin: "8px 0 24px" }}>
          <a href="#" onClick={(e) => e.preventDefault()} style={button}>
            View partner resources
          </a>
        </div>
        <p style={{ fontSize: 12, color: BRAND.muted, margin: "0 0 16px" }}>
          Reference: app_123
        </p>
        <p style={{ fontSize: 12, color: "#999999", margin: "24px 0 0" }}>
          — The Neuroceutical Solutions Partnerships Team
        </p>
      </BrandShell>
    ),
  },
  {
    key: "partner-application-declined",
    name: "Partner application — declined",
    subject: "An update on your distribution application",
    render: () => (
      <BrandShell>
        <h1 style={h1}>Hi Jordan,</h1>
        <p style={text}>
          Thank you for your interest in becoming a free sample distribution
          partner for Apex Coworking. After a thorough review, we are unable
          to move forward with your application at this time.
        </p>
        <p style={text}>
          We genuinely appreciate the time you spent applying. You are
          welcome to re-apply in the future.
        </p>
        <p style={{ fontSize: 12, color: BRAND.muted, margin: "0 0 16px" }}>
          Reference: app_123
        </p>
        <p style={{ fontSize: 12, color: "#999999", margin: "24px 0 0" }}>
          — The Neuroceutical Solutions Partnerships Team
        </p>
      </BrandShell>
    ),
  },
];

export default function AdminEmailPreview() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  const [active, setActive] = useState(TEMPLATES[0].key);

  useEffect(() => {
    (async () => {
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
        navigate("/admin", { replace: true });
        return;
      }
      setAuthorized(true);
      setLoading(false);
    })();
  }, [navigate]);

  const current = useMemo(
    () => TEMPLATES.find((t) => t.key === active)!,
    [active]
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }
  if (!authorized) return null;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEOHead
        title="Email preview (admin) | Neuroceutical Solutions"
        description="Internal preview of branded transactional emails and unsubscribe flow."
      />
      <Navigation />
      <main className="flex-1 container max-w-6xl py-12 space-y-8">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-fresh-teal-dark font-semibold">
              <ShieldCheck className="h-4 w-4" /> Admin · internal preview
            </div>
            <h1 className="text-3xl font-bold text-foreground mt-1">
              Email preview
            </h1>
            <p className="text-muted-foreground mt-1 max-w-2xl">
              Inspect how branded transactional emails render — including the
              system-managed unsubscribe footer — alongside the live{" "}
              <code className="bg-muted px-1 py-0.5 rounded">/unsubscribe</code>{" "}
              page. Nothing is sent.
            </p>
          </div>
          <Badge variant="outline" className="gap-1">
            <Mail className="h-3 w-3" /> No emails are dispatched
          </Badge>
        </div>

        <Tabs defaultValue="email" className="w-full">
          <TabsList>
            <TabsTrigger value="email">Email templates</TabsTrigger>
            <TabsTrigger value="unsubscribe">Unsubscribe page</TabsTrigger>
          </TabsList>

          <TabsContent value="email" className="mt-6">
            <div className="grid lg:grid-cols-[260px_1fr] gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Templates</CardTitle>
                  <CardDescription>Pick one to preview</CardDescription>
                </CardHeader>
                <CardContent className="space-y-1">
                  {TEMPLATES.map((t) => (
                    <button
                      key={t.key}
                      onClick={() => setActive(t.key)}
                      className={`w-full text-left px-3 py-2 rounded-md text-sm transition ${
                        active === t.key
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-muted text-foreground"
                      }`}
                    >
                      {t.name}
                    </button>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between gap-3 flex-wrap">
                    <div>
                      <CardTitle className="text-base">{current.name}</CardTitle>
                      <CardDescription className="mt-1">
                        Subject: <span className="text-foreground">{current.subject}</span>
                      </CardDescription>
                    </div>
                    <Badge className="bg-fresh-teal/15 text-fresh-teal-dark border-fresh-teal/30 hover:bg-fresh-teal/15">
                      Includes system unsubscribe footer
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="rounded-lg border bg-muted/30 p-6">
                    {current.render()}
                  </div>
                  <p className="text-xs text-muted-foreground mt-3">
                    The dashed-bordered block at the bottom is a faithful mock
                    of the unsubscribe footer Lovable appends automatically to
                    every transactional email. It cannot be styled, but the
                    link points to your branded /unsubscribe page.
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="unsubscribe" className="mt-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between flex-wrap gap-3">
                  <div>
                    <CardTitle className="text-base">
                      /unsubscribe page (live preview)
                    </CardTitle>
                    <CardDescription>
                      Loaded with a fake token so you can see the "invalid link"
                      branded state — no suppression record is created.
                    </CardDescription>
                  </div>
                  <Button asChild variant="outline" size="sm">
                    <a
                      href="/unsubscribe?token=preview-fake-token"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Open in new tab
                    </a>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg overflow-hidden border bg-muted/30">
                  <iframe
                    title="Unsubscribe preview"
                    src="/unsubscribe?token=preview-fake-token"
                    className="w-full"
                    style={{ height: 720, border: 0, background: "white" }}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
}