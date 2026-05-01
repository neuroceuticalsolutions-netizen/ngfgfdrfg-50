import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { Navigation } from "@/components/sections/navigation";
import { Footer } from "@/components/sections/footer";
import { SEOHead } from "@/components/SEOHead";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Loader2,
  MessageSquare,
  ShieldCheck,
  Info,
  CheckCircle2,
  BellOff,
  XCircle,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// E.164: leading +, 7–15 digits total, first digit 1–9
const phoneSchema = z
  .string()
  .trim()
  .regex(/^\+[1-9][0-9]{6,14}$/, {
    message: "Use international format, e.g. +27821234567",
  });

const formSchema = z
  .object({
    sms_opt_in: z.boolean(),
    phone_e164: z.string().trim().max(20),
  })
  .superRefine((val, ctx) => {
    if (val.sms_opt_in) {
      const r = phoneSchema.safeParse(val.phone_e164);
      if (!r.success) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["phone_e164"],
          message: r.error.issues[0]?.message ?? "Invalid phone number",
        });
      }
    }
  });

type Pref = {
  id: string;
  user_id: string;
  phone_e164: string | null;
  sms_opt_in: boolean;
  consent_at: string | null;
  opted_out_at: string | null;
  consent_source: string;
  updated_at: string;
};

export default function AccountSmsPreferences() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string>("");
  const [pref, setPref] = useState<Pref | null>(null);
  const [optIn, setOptIn] = useState(false);
  const [phone, setPhone] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [withdrawOpen, setWithdrawOpen] = useState(false);
  const [withdrawing, setWithdrawing] = useState(false);

  useEffect(() => {
    (async () => {
      const { data: sess } = await supabase.auth.getSession();
      if (!sess.session) {
        navigate("/admin", { replace: true });
        return;
      }
      const uid = sess.session.user.id;
      setUserId(uid);
      setUserEmail(sess.session.user.email ?? "");
      const { data, error: e } = await supabase
        .from("sms_preferences")
        .select("*")
        .eq("user_id", uid)
        .maybeSingle();
      if (e) {
        setError(e.message);
      } else if (data) {
        setPref(data as Pref);
        setOptIn(data.sms_opt_in);
        setPhone(data.phone_e164 ?? "");
      }
      setLoading(false);
    })();
  }, [navigate]);

  const save = async (override?: { sms_opt_in?: boolean }) => {
    if (!userId) return;
    setError(null);
    const nextOptIn = override?.sms_opt_in ?? optIn;
    const parsed = formSchema.safeParse({
      sms_opt_in: nextOptIn,
      phone_e164: phone,
    });
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Invalid input");
      return;
    }
    setSaving(true);
    const now = new Date().toISOString();
    const wasOptedIn = pref?.sms_opt_in === true;
    const payload = {
      user_id: userId,
      phone_e164: nextOptIn ? phone.trim() : pref?.phone_e164 ?? null,
      sms_opt_in: nextOptIn,
      consent_at: nextOptIn ? (pref?.consent_at ?? now) : pref?.consent_at ?? null,
      opted_out_at: !nextOptIn && wasOptedIn ? now : pref?.opted_out_at ?? null,
      consent_source: "account_settings",
    };
    const { data, error: upErr } = await supabase
      .from("sms_preferences")
      .upsert(payload, { onConflict: "user_id" })
      .select()
      .maybeSingle();
    setSaving(false);
    if (upErr) {
      setError(upErr.message);
      return;
    }
    if (data) {
      setPref(data as Pref);
      setOptIn(data.sms_opt_in);
      setPhone(data.phone_e164 ?? "");
    }
    toast({
      title: nextOptIn ? "Preferences saved" : "SMS consent withdrawn",
      description: nextOptIn
        ? "You'll receive transactional SMS from Neuroceutical Solutions."
        : "We've stopped SMS effective immediately. You can re-enable anytime.",
    });
  };

  const confirmWithdraw = async () => {
    if (!userId) return;
    setWithdrawing(true);
    // Optimistic UI: flip status badges immediately
    const optimistic: Pref | null = pref
      ? {
          ...pref,
          sms_opt_in: false,
          opted_out_at: new Date().toISOString(),
        }
      : null;
    const previous = pref;
    setOptIn(false);
    if (optimistic) setPref(optimistic);
    try {
      await save({ sms_opt_in: false });
      setWithdrawOpen(false);
    } catch (e) {
      // Roll back if save throws (save also surfaces errors via setError)
      if (previous) setPref(previous);
      setOptIn(previous?.sms_opt_in ?? false);
    } finally {
      setWithdrawing(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEOHead
        title="SMS notification preferences"
        description="Manage your SMS notification consent and phone number for Neuroceutical Solutions."
        path="/account/sms-preferences"
      />
      <Helmet>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <Navigation />
      <main className="flex-1 container max-w-2xl py-12 space-y-6">
        <div>
          <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-fresh-teal-dark font-semibold">
            <MessageSquare className="h-4 w-4" /> Account · SMS preferences
          </div>
          <h1 className="text-3xl font-bold text-foreground mt-1">
            SMS notifications
          </h1>
          <p className="text-muted-foreground mt-1">
            Optional. Get important account and order updates by SMS, in
            addition to email. Signed in as{" "}
            <span className="font-medium text-foreground">{userEmail}</span>.
          </p>
        </div>

        <Alert>
          <Info className="h-4 w-4" />
          <AlertTitle>What we send (transactional only)</AlertTitle>
          <AlertDescription className="text-sm">
            Account, order and security notifications only — for example
            verification codes, order confirmations, and delivery updates.
            We will <strong>not</strong> send marketing or promotional SMS
            under this consent. Standard carrier rates may apply.
          </AlertDescription>
        </Alert>

        <StatusBanner pref={pref} />

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Your preferences</CardTitle>
            <CardDescription>
              Per POPIA, opt-in is explicit and you can withdraw at any time.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="phone">Mobile number</Label>
              <Input
                id="phone"
                type="tel"
                inputMode="tel"
                placeholder="+27821234567"
                value={phone}
                maxLength={20}
                onChange={(e) => setPhone(e.target.value)}
                aria-describedby="phone-help"
              />
              <p id="phone-help" className="text-xs text-muted-foreground">
                International format with country code, e.g. +27 for South
                Africa.
              </p>
            </div>

            <div className="flex items-start gap-3 rounded-md border p-3 bg-muted/30">
              <Checkbox
                id="optin"
                checked={optIn}
                onCheckedChange={(v) => setOptIn(v === true)}
                className="mt-0.5"
              />
              <div className="space-y-1">
                <Label htmlFor="optin" className="text-sm font-medium leading-snug">
                  I consent to receive transactional SMS from Neuroceutical
                  Solutions at the number above.
                </Label>
                <p className="text-xs text-muted-foreground">
                  You can withdraw consent at any time on this page or by
                  replying STOP. Withdrawing consent does not affect the
                  lawfulness of processing before withdrawal.
                </p>
              </div>
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {pref?.sms_opt_in && pref?.consent_at && (
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <CheckCircle2 className="h-4 w-4 text-fresh-teal-dark" />
                Consent recorded{" "}
                {new Date(pref.consent_at).toLocaleString()} via{" "}
                <Badge variant="secondary" className="text-[10px]">
                  {pref.consent_source}
                </Badge>
              </div>
            )}
            {pref && !pref.sms_opt_in && pref.opted_out_at && (
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <XCircle className="h-4 w-4 text-destructive" />
                Consent withdrawn {new Date(pref.opted_out_at).toLocaleString()}
              </div>
            )}

            <div className="flex flex-wrap gap-2 pt-1">
              <Button onClick={() => save()} disabled={saving || withdrawing}>
                {saving && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                Save preferences
              </Button>
              {pref?.sms_opt_in && (
                <Button
                  variant="outline"
                  className="border-destructive/30 text-destructive hover:bg-destructive/5 hover:text-destructive"
                  onClick={() => setWithdrawOpen(true)}
                  disabled={saving || withdrawing}
                >
                  <BellOff className="h-4 w-4 mr-2" />
                  Withdraw SMS consent
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-fresh-teal-dark" />
              Privacy & legal
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground space-y-2">
            <p>
              Your phone number is processed under our{" "}
              <a href="/privacy" className="text-primary underline">
                Privacy Policy
              </a>{" "}
              and the Protection of Personal Information Act (POPIA). We use
              it solely to deliver the transactional SMS described above.
            </p>
            <p>
              SMS sending is currently in setup. Saving your preferences now
              records your consent so messages start as soon as the service
              is active.
            </p>
            <p className="text-xs">
              Need help? Email{" "}
              <a
                href="mailto:support@neuroceutical.co.za"
                className="text-primary underline"
              >
                support@neuroceutical.co.za
              </a>
              .
            </p>
          </CardContent>
        </Card>
      </main>
      <Footer />

      <AlertDialog open={withdrawOpen} onOpenChange={setWithdrawOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <BellOff className="h-5 w-5 text-destructive" />
              Withdraw SMS consent?
            </AlertDialogTitle>
            <AlertDialogDescription className="space-y-2">
              <span className="block">
                We'll stop sending you transactional SMS{" "}
                <strong>immediately</strong>. You'll still receive essential
                emails and can re-enable SMS at any time from this page.
              </span>
              <span className="block text-xs">
                Your withdrawal timestamp will be recorded for POPIA
                compliance. This does not affect the lawfulness of any
                processing that happened before withdrawal.
              </span>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={withdrawing}>
              Keep SMS on
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={(e) => {
                e.preventDefault();
                confirmWithdraw();
              }}
              disabled={withdrawing}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {withdrawing && (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              )}
              Yes, withdraw consent
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

function StatusBanner({ pref }: { pref: Pref | null }) {
  if (!pref) {
    return (
      <div className="flex items-center gap-2 rounded-md border bg-muted/40 px-3 py-2 text-sm">
        <BellOff className="h-4 w-4 text-muted-foreground" />
        <span className="text-muted-foreground">
          SMS notifications are <strong>off</strong>. Set them up below.
        </span>
      </div>
    );
  }
  if (pref.sms_opt_in) {
    return (
      <div className="flex items-center gap-2 rounded-md border border-fresh-teal-dark/30 bg-fresh-teal-dark/5 px-3 py-2 text-sm">
        <CheckCircle2 className="h-4 w-4 text-fresh-teal-dark" />
        <span>
          SMS notifications are <strong>on</strong>
          {pref.phone_e164 ? ` for ${pref.phone_e164}` : ""}.
        </span>
      </div>
    );
  }
  return (
    <div className="flex items-center gap-2 rounded-md border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm">
      <BellOff className="h-4 w-4 text-destructive" />
      <span>
        SMS notifications are <strong>off</strong>
        {pref.opted_out_at
          ? ` since ${new Date(pref.opted_out_at).toLocaleDateString()}`
          : ""}
        . You can re-enable them anytime below.
      </span>
    </div>
  );
}
