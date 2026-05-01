import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { supabase } from "@/integrations/supabase/client";
import { Navigation } from "@/components/sections/navigation";
import { Footer } from "@/components/sections/footer";
import { SEOHead } from "@/components/SEOHead";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Loader2, ShieldCheck, Mail, KeyRound, Sparkles, UserPlus, Repeat, ShieldAlert, CheckCircle2, XCircle } from "lucide-react";

const SUPPORT_EMAIL = "support@neuroceutical.co.za";
const ROOT_DOMAIN = "neuroceutical.co.za";
const UNSUBSCRIBE_URL = `https://${ROOT_DOMAIN}/unsubscribe`;

/* ------------------------------------------------------------------ */
/* Visual replicas of the auth React Email templates living in        */
/* supabase/functions/_shared/email-templates/*.tsx — kept in sync     */
/* with _brand.tsx so admins can preview the layouts without sending  */
/* a real auth email.                                                 */
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
  bg: "#ffffff",
  font:
    'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif',
};

const S = {
  shell: {
    backgroundColor: BRAND.bg,
    fontFamily: BRAND.font,
    maxWidth: 560,
    margin: "0 auto",
    border: `1px solid ${BRAND.border}`,
    borderRadius: 12,
    overflow: "hidden",
  } as React.CSSProperties,
  header: {
    background: `linear-gradient(135deg, ${BRAND.purpleDark} 0%, ${BRAND.purple} 60%, ${BRAND.purpleLight} 100%)`,
    padding: "28px 28px 24px",
    color: "#fff",
  } as React.CSSProperties,
  brandRow: {
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: "0.18em",
    textTransform: "uppercase" as const,
    color: BRAND.teal,
    margin: "0 0 6px",
  },
  brandName: { fontSize: 20, fontWeight: 700, margin: 0 },
  tealRule: { height: 3, backgroundColor: BRAND.teal },
  body: { padding: "32px 28px 8px" } as React.CSSProperties,
  h1: {
    fontSize: 24,
    fontWeight: 700,
    color: BRAND.ink,
    margin: "0 0 16px",
    letterSpacing: "-0.01em",
  },
  text: {
    fontSize: 15,
    color: BRAND.muted,
    lineHeight: 1.6,
    margin: "0 0 18px",
  },
  link: { color: BRAND.purple, textDecoration: "underline" },
  buttonWrap: { margin: "8px 0 24px" } as React.CSSProperties,
  button: {
    display: "inline-block",
    backgroundColor: BRAND.purple,
    color: "#fff",
    fontSize: 15,
    fontWeight: 600,
    borderRadius: 12,
    padding: "14px 24px",
    textDecoration: "none",
    boxShadow: `0 8px 20px -8px ${BRAND.purple}`,
  } as React.CSSProperties,
  codeCard: {
    backgroundColor: BRAND.tealSoft,
    border: `1px solid ${BRAND.teal}`,
    borderRadius: 12,
    padding: "18px 20px",
    margin: "4px 0 24px",
    textAlign: "center" as const,
  },
  codeText: {
    fontFamily: '"SFMono-Regular", Menlo, Consolas, monospace',
    fontSize: 28,
    fontWeight: 700,
    color: BRAND.purpleDark,
    letterSpacing: "0.24em",
    margin: 0,
  },
  divider: { borderTop: `1px solid ${BRAND.border}`, margin: "24px 0 16px" },
  footer: {
    fontSize: 12,
    color: BRAND.muted,
    lineHeight: 1.6,
    margin: "0 0 6px",
    padding: "0 28px",
  },
  footerSmall: {
    fontSize: 11,
    color: BRAND.muted,
    margin: "8px 0 0",
    padding: "0 28px",
  },
};

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div style={S.shell}>
      <div style={S.header}>
        <p style={S.brandRow}>Neuroceutical Solutions</p>
        <p style={S.brandName}>Cognitive performance, delivered.</p>
      </div>
      <div style={S.tealRule} />
      <div style={S.body}>{children}</div>
      <div style={S.divider} />
      <p style={S.footer}>
        You received this email because of an action on your Neuroceutical
        Solutions account. If this wasn't you, you can safely ignore it.
      </p>
      <p style={S.footer}>
        Need help? Contact our support team at{" "}
        <a href={`mailto:${SUPPORT_EMAIL}`} style={S.link}>
          {SUPPORT_EMAIL}
        </a>{" "}
        or visit{" "}
        <a href={`https://${ROOT_DOMAIN}`} style={S.link}>
          {ROOT_DOMAIN}
        </a>
        .
      </p>
      <p style={S.footerSmall}>
        <strong>Disclaimer:</strong> Neuroceutical Solutions products are
        dietary supplements intended to support cognitive performance and
        general wellbeing. They are not intended to diagnose, treat, cure,
        or prevent any disease. Always consult a qualified healthcare
        professional before starting any supplement, especially if you are
        pregnant, nursing, taking medication, or have a medical condition.
        Statements have not been evaluated by SAHPRA.
      </p>
      <p style={S.footerSmall}>
        <strong>Email consent:</strong> You're receiving this transactional
        email because you created an account or requested an action on{" "}
        {ROOT_DOMAIN}, in line with our{" "}
        <a href={`https://${ROOT_DOMAIN}/privacy`} style={S.link}>
          Privacy Policy
        </a>{" "}
        and POPIA. To manage your email preferences or opt out of
        non-essential messages, visit{" "}
        <a href={UNSUBSCRIBE_URL} style={S.link}>
          {ROOT_DOMAIN}/unsubscribe
        </a>
        . Note: essential security and account emails (sign-in, password
        reset, email verification) will still be sent.
      </p>
      <p style={S.footerSmall}>
        <strong>SMS notifications:</strong> SMS is <em>off by default</em>.
        You will only receive transactional SMS (e.g. verification codes,
        order updates) if you have explicitly opted in and added a mobile
        number under{" "}
        <a
          href={`https://${ROOT_DOMAIN}/account/sms-preferences`}
          style={S.link}
        >
          Account → SMS preferences
        </a>
        . You can withdraw SMS consent there at any time, or by replying
        STOP to any SMS we send. Standard carrier rates may apply.
      </p>
      <p style={S.footerSmall}>
        © Neuroceutical Solutions · South Africa ·{" "}
        <a href={`https://${ROOT_DOMAIN}/privacy`} style={S.link}>Privacy</a> ·{" "}
        <a href={`https://${ROOT_DOMAIN}/terms`} style={S.link}>Terms</a> ·{" "}
        <a href={`https://${ROOT_DOMAIN}/disclaimer`} style={S.link}>Disclaimer</a>
      </p>
      <div style={{ height: 24 }} />
    </div>
  );
}

/* ------------------------ template replicas ------------------------ */

type SampleData = {
  siteName: string;
  siteUrl: string;
  recipient: string;
  oldEmail: string;
  newEmail: string;
  confirmationUrl: string;
  token: string;
};

const SignupPreview = ({ d }: { d: SampleData }) => (
  <Shell>
    <h1 style={S.h1}>Confirm your email</h1>
    <p style={S.text}>
      Welcome to{" "}
      <a href={d.siteUrl} style={S.link}>
        <strong>{d.siteName}</strong>
      </a>
      . Please confirm{" "}
      <a href={`mailto:${d.recipient}`} style={S.link}>
        {d.recipient}
      </a>{" "}
      to activate your account and start your cognitive performance journey.
    </p>
    <div style={S.buttonWrap}>
      <a href={d.confirmationUrl} style={S.button}>
        Verify my email
      </a>
    </div>
    <p style={S.text}>
      If you didn't create an account, you can safely ignore this email.
    </p>
  </Shell>
);

const MagicLinkPreview = ({ d }: { d: SampleData }) => (
  <Shell>
    <h1 style={S.h1}>Your secure login link</h1>
    <p style={S.text}>
      Tap the button below to sign in to {d.siteName}. For your security,
      this link expires shortly and can only be used once.
    </p>
    <div style={S.buttonWrap}>
      <a href={d.confirmationUrl} style={S.button}>
        Sign in to {d.siteName}
      </a>
    </div>
    <p style={S.text}>
      Didn't request this? You can safely ignore this email — no one can
      access your account without it.
    </p>
  </Shell>
);

const RecoveryPreview = ({ d }: { d: SampleData }) => (
  <Shell>
    <h1 style={S.h1}>Reset your password</h1>
    <p style={S.text}>
      We received a request to reset the password on your {d.siteName}{" "}
      account. Choose a new password using the button below.
    </p>
    <div style={S.buttonWrap}>
      <a href={d.confirmationUrl} style={S.button}>
        Choose a new password
      </a>
    </div>
    <p style={S.text}>
      If you didn't request this, no action is needed — your password stays
      the same.
    </p>
  </Shell>
);

const InvitePreview = ({ d }: { d: SampleData }) => (
  <Shell>
    <h1 style={S.h1}>You're invited</h1>
    <p style={S.text}>
      You've been invited to join{" "}
      <a href={d.siteUrl} style={S.link}>
        <strong>{d.siteName}</strong>
      </a>
      . Accept your invitation to set up your account and get started.
    </p>
    <div style={S.buttonWrap}>
      <a href={d.confirmationUrl} style={S.button}>
        Accept invitation
      </a>
    </div>
    <p style={S.text}>
      Wasn't expecting this? You can safely ignore this email.
    </p>
  </Shell>
);

const EmailChangePreview = ({ d }: { d: SampleData }) => (
  <Shell>
    <h1 style={S.h1}>Confirm your email change</h1>
    <p style={S.text}>
      You requested to change the email address on your {d.siteName} account
      from{" "}
      <a href={`mailto:${d.oldEmail}`} style={S.link}>
        {d.oldEmail}
      </a>{" "}
      to{" "}
      <a href={`mailto:${d.newEmail}`} style={S.link}>
        {d.newEmail}
      </a>
      .
    </p>
    <div style={S.buttonWrap}>
      <a href={d.confirmationUrl} style={S.button}>
        Confirm email change
      </a>
    </div>
    <p style={S.text}>
      If you didn't request this change, please secure your account
      immediately by resetting your password.
    </p>
  </Shell>
);

const ReauthPreview = ({ d }: { d: SampleData }) => (
  <Shell>
    <h1 style={S.h1}>Confirm it's you</h1>
    <p style={S.text}>
      Enter the verification code below to confirm your identity and continue.
    </p>
    <div style={S.codeCard}>
      <p style={S.codeText}>{d.token}</p>
    </div>
    <p style={S.text}>
      This code expires shortly. If you didn't request it, you can safely
      ignore this email.
    </p>
  </Shell>
);

/* ----------------------------- registry ---------------------------- */

const TEMPLATES = [
  {
    key: "signup",
    label: "Signup",
    icon: UserPlus,
    description: "Sent to confirm a new user's email address.",
    Component: SignupPreview,
  },
  {
    key: "magic-link",
    label: "Magic link",
    icon: Sparkles,
    description: "One-tap passwordless sign-in link.",
    Component: MagicLinkPreview,
  },
  {
    key: "recovery",
    label: "Password reset",
    icon: KeyRound,
    description: "Triggered when a user forgets their password.",
    Component: RecoveryPreview,
  },
  {
    key: "invite",
    label: "Invite",
    icon: Mail,
    description: "Invites a new user to join the workspace.",
    Component: InvitePreview,
  },
  {
    key: "email-change",
    label: "Email change",
    icon: Repeat,
    description: "Confirms a request to change the account email address.",
    Component: EmailChangePreview,
  },
  {
    key: "reauthentication",
    label: "Reauthentication",
    icon: ShieldAlert,
    description: "Sends a one-time verification code to confirm identity.",
    Component: ReauthPreview,
  },
] as const;

type TemplateKey = (typeof TEMPLATES)[number]["key"];

const DEFAULT_DATA: SampleData = {
  siteName: "Neuroceutical Solutions",
  siteUrl: "https://neuroceutical.lovable.app",
  recipient: "jane@example.com",
  oldEmail: "jane@example.com",
  newEmail: "jane.new@example.com",
  confirmationUrl: "https://neuroceutical.lovable.app/auth/callback?token=sample-token-123",
  token: "284619",
};

export default function AdminAuthEmailPreview() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  const [active, setActive] = useState<TemplateKey>("signup");
  const [data, setData] = useState<SampleData>(DEFAULT_DATA);
  const [previewHtml, setPreviewHtml] = useState<string>("");

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

  // After each render, capture the preview pane's HTML so we can run
  // footer compliance checks against the actual rendered output.
  useEffect(() => {
    const node = document.getElementById(`auth-email-preview-${active}`);
    setPreviewHtml(node?.innerHTML ?? "");
  }, [active, data]);

  const checks = useMemo(() => {
    const h = previewHtml.toLowerCase();
    return [
      {
        label: "Support contact: support@neuroceutical.co.za",
        ok: h.includes("support@neuroceutical.co.za"),
      },
      {
        label: "Mailto link to support address",
        ok: h.includes('mailto:support@neuroceutical.co.za'),
      },
      {
        label: "SAHPRA disclaimer present",
        ok: h.includes("sahpra"),
      },
      {
        label: "Not intended to diagnose/treat/cure/prevent",
        ok: h.includes("diagnose") && h.includes("treat") && h.includes("prevent"),
      },
      {
        label: "Email consent / POPIA reference",
        ok: h.includes("popia") && h.includes("consent"),
      },
      {
        label: "Unsubscribe link to /unsubscribe",
        ok: h.includes("/unsubscribe"),
      },
      {
        label: "SMS consent reference + preferences link",
        ok:
          h.includes("sms") &&
          h.includes("/account/sms-preferences"),
      },
      {
        label: "Privacy / Terms / Disclaimer legal links",
        ok:
          h.includes("/privacy") &&
          h.includes("/terms") &&
          h.includes("/disclaimer"),
      },
      {
        label: "Brand attribution: Neuroceutical Solutions · South Africa",
        ok: h.includes("neuroceutical solutions") && h.includes("south africa"),
      },
    ];
  }, [previewHtml]);

  const allOk = checks.every((c) => c.ok);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }
  if (!authorized) return null;

  const update = (k: keyof SampleData) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => setData((d) => ({ ...d, [k]: e.target.value }));

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEOHead
        title="Auth email preview (admin)"
        description="Internal preview of branded auth email templates with sample data."
        path="/admin/auth-email-preview"
      />
      <Helmet>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <Navigation />
      <main className="flex-1 container max-w-6xl py-12 space-y-8">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-fresh-teal-dark font-semibold">
              <ShieldCheck className="h-4 w-4" /> Admin · internal preview
            </div>
            <h1 className="text-3xl font-bold text-foreground mt-1">
              Auth email preview
            </h1>
            <p className="text-muted-foreground mt-1 max-w-2xl">
              Click through each branded auth email template (signup, magic
              link, password reset, invite, email change, reauthentication)
              with sample data — no emails are sent.
            </p>
          </div>
          <Badge variant="outline" className="text-xs">
            Renders mirror{" "}
            <code className="ml-1 bg-muted px-1 py-0.5 rounded">
              _shared/email-templates/*.tsx
            </code>
          </Badge>
        </div>

        <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
          {/* Sample data controls */}
          <Card className="h-fit">
            <CardHeader>
              <CardTitle className="text-base">Sample data</CardTitle>
              <CardDescription>
                Edit values to preview how variables render.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Field label="siteName" value={data.siteName} onChange={update("siteName")} />
              <Field label="siteUrl" value={data.siteUrl} onChange={update("siteUrl")} />
              <Field label="recipient" value={data.recipient} onChange={update("recipient")} />
              <Field label="oldEmail" value={data.oldEmail} onChange={update("oldEmail")} />
              <Field label="newEmail" value={data.newEmail} onChange={update("newEmail")} />
              <Field label="confirmationUrl" value={data.confirmationUrl} onChange={update("confirmationUrl")} />
              <Field label="token (OTP)" value={data.token} onChange={update("token")} />
              <Button
                variant="outline"
                size="sm"
                className="w-full"
                onClick={() => setData(DEFAULT_DATA)}
              >
                Reset to defaults
              </Button>
            </CardContent>
          </Card>

          {/* Preview pane */}
          <div className="space-y-4">
            <Tabs value={active} onValueChange={(v) => setActive(v as TemplateKey)}>
              <TabsList className="flex flex-wrap h-auto justify-start gap-1 bg-muted/50 p-1">
                {TEMPLATES.map((t) => {
                  const Icon = t.icon;
                  return (
                    <TabsTrigger
                      key={t.key}
                      value={t.key}
                      className="data-[state=active]:bg-background"
                    >
                      <Icon className="h-3.5 w-3.5 mr-1.5" />
                      {t.label}
                    </TabsTrigger>
                  );
                })}
              </TabsList>
              {TEMPLATES.map((t) => (
                <TabsContent key={t.key} value={t.key} className="mt-4">
                  <Card>
                    <CardHeader>
                      <div className="flex items-start justify-between gap-3 flex-wrap">
                        <div>
                          <CardTitle>{t.label}</CardTitle>
                          <CardDescription>{t.description}</CardDescription>
                        </div>
                        <Badge variant="secondary" className="font-mono text-[11px]">
                          {t.key}.tsx
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="bg-muted/30 rounded-b-lg py-8">
                      <div id={`auth-email-preview-${t.key}`}>
                        <t.Component d={data} />
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              ))}
            </Tabs>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between gap-3 flex-wrap">
                  <div>
                    <CardTitle className="text-base">Footer compliance check</CardTitle>
                    <CardDescription>
                      Scans the currently shown <code className="text-xs">{current.key}</code>{" "}
                      preview for required footer elements.
                    </CardDescription>
                  </div>
                  <Badge
                    variant={allOk ? "default" : "destructive"}
                    className={allOk ? "bg-fresh-teal text-white" : ""}
                  >
                    {allOk ? "All checks passed" : "Issues found"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  {checks.map((c) => (
                    <li key={c.label} className="flex items-start gap-2">
                      {c.ok ? (
                        <CheckCircle2 className="h-4 w-4 text-fresh-teal-dark mt-0.5 shrink-0" />
                      ) : (
                        <XCircle className="h-4 w-4 text-destructive mt-0.5 shrink-0" />
                      )}
                      <span className={c.ok ? "text-foreground" : "text-destructive font-medium"}>
                        {c.label}
                      </span>
                    </li>
                  ))}
                </ul>
                <p className="text-xs text-muted-foreground mt-4">
                  This preview mirrors{" "}
                  <code>supabase/functions/_shared/email-templates/_brand.tsx</code>.
                  If checks fail, update the shared brand layout and redeploy{" "}
                  <code>auth-email-hook</code>.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="space-y-1">
      <Label className="text-xs font-mono text-muted-foreground">{label}</Label>
      <Input value={value} onChange={onChange} className="text-sm" />
    </div>
  );
}
