import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Navigation } from "@/components/sections/navigation";
import { Footer } from "@/components/sections/footer";
import { SEOHead } from "@/components/SEOHead";
import { CheckCircle2, AlertTriangle, Loader2, Clock, Mail, ShieldCheck } from "lucide-react";

type VerifyState =
  | { kind: "loading" }
  | { kind: "verified" }
  | { kind: "already_verified" }
  | { kind: "expired" }
  | { kind: "invalid"; message?: string }
  | { kind: "error"; message?: string };

const PartnerSmsVerify = () => {
  const [params] = useSearchParams();
  const token = params.get("token");
  const [state, setState] = useState<VerifyState>({ kind: "loading" });

  useEffect(() => {
    if (!token) {
      setState({ kind: "invalid", message: "No verification token in the link." });
      return;
    }
    const url = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/verify-partner-sms?token=${encodeURIComponent(token)}`;
    fetch(url, {
      method: "GET",
      headers: { apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY },
    })
      .then(async (r) => {
        const body = await r.json().catch(() => ({}));
        const status = body?.status;
        if (status === "verified") setState({ kind: "verified" });
        else if (status === "already_verified") setState({ kind: "already_verified" });
        else if (status === "expired") setState({ kind: "expired" });
        else if (status === "invalid") setState({ kind: "invalid", message: body?.error });
        else setState({ kind: "error", message: body?.error });
      })
      .catch((e) => setState({ kind: "error", message: e?.message }));
  }, [token]);

  const seo = seoFor(state);

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <SEOHead
        title={seo.title}
        description={seo.description}
        path="/partners/sms-verify"
      />
      <Helmet>
        <meta name="robots" content="noindex, nofollow" />
        <meta name="googlebot" content="noindex, nofollow, noarchive, nosnippet" />
        <meta name="referrer" content="no-referrer" />
      </Helmet>
      <main className="container mx-auto px-6 pt-32 pb-20 max-w-xl">
        <Card className="border-grey-200 shadow-lg">
          <CardHeader className="text-center">
            <StateIcon state={state} />
            <CardTitle className="text-royal-purple text-2xl mt-4">
              {titleFor(state)}
            </CardTitle>
            <CardDescription className="text-base">{descFor(state)}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-grey-700">
            {state.kind === "verified" && (
              <>
                <p>
                  Thanks for confirming. Your number is now verified and we may
                  send you essential, transactional SMS updates about your free
                  sample distribution application — for example, status changes
                  or onboarding instructions. We will never send marketing SMS.
                </p>
                <div className="rounded-lg bg-fresh-teal/5 border border-fresh-teal/20 p-4 space-y-2">
                  <div className="flex items-center gap-2 text-fresh-teal font-semibold text-sm">
                    <ShieldCheck className="h-4 w-4" /> Your consent, your control
                  </div>
                  <p className="text-sm text-grey-600 m-0">
                    Withdraw consent anytime by replying <strong>STOP</strong> to any
                    SMS, or emailing{" "}
                    <a className="underline" href="mailto:privacy@neuroceutical.co.za">
                      privacy@neuroceutical.co.za
                    </a>
                    . You can also manage SMS preferences from your account
                    settings once your application is approved.
                  </p>
                </div>
              </>
            )}
            {state.kind === "already_verified" && (
              <>
                <p>
                  Good news — this SMS number was already confirmed on a previous
                  visit, so your opt-in is active. There's nothing more to do here.
                </p>
                <p className="text-sm text-grey-600">
                  If you didn't expect this message, or you'd like to withdraw
                  consent, email{" "}
                  <a className="underline" href="mailto:privacy@neuroceutical.co.za">
                    privacy@neuroceutical.co.za
                  </a>{" "}
                  and we'll remove your number right away.
                </p>
              </>
            )}
            {state.kind === "expired" && (
              <>
                <p>
                  Confirmation links are valid for <strong>14 days</strong> to keep
                  your consent fresh and POPIA-compliant. This one has passed that
                  window, so we can't use it anymore.
                </p>
                <div className="rounded-lg bg-amber-50 border border-amber-200 p-4 space-y-2">
                  <div className="flex items-center gap-2 text-amber-700 font-semibold text-sm">
                    <Mail className="h-4 w-4" /> Request a new link
                  </div>
                  <p className="text-sm text-grey-700 m-0">
                    Email{" "}
                    <a className="underline" href="mailto:partners@neuroceutical.co.za?subject=New%20SMS%20confirmation%20link">
                      partners@neuroceutical.co.za
                    </a>{" "}
                    from the address you applied with and we'll resend a fresh
                    confirmation link within one business day.
                  </p>
                </div>
              </>
            )}
            {state.kind === "invalid" && (
              <>
                <p>
                  This confirmation link is missing, malformed, or has already
                  been used. For your security, each link only works once.
                </p>
                <ul className="text-sm text-grey-600 list-disc pl-5 space-y-1">
                  <li>Make sure you opened the most recent email we sent.</li>
                  <li>Try copying the full link directly into your browser.</li>
                  <li>
                    Still stuck? Email{" "}
                    <a className="underline" href="mailto:partners@neuroceutical.co.za">
                      partners@neuroceutical.co.za
                    </a>{" "}
                    and we'll help.
                  </li>
                </ul>
              </>
            )}
            {state.kind === "error" && (
              <>
                <p>
                  Something went wrong on our side while confirming your number.
                  Your application is safe — only the SMS opt-in step did not
                  complete.
                </p>
                <p className="text-sm text-grey-600">
                  Please try the link again in a few minutes. If the problem
                  persists, contact{" "}
                  <a className="underline" href="mailto:partners@neuroceutical.co.za">
                    partners@neuroceutical.co.za
                  </a>
                  {state.message ? ` and mention: "${state.message}".` : "."}
                </p>
              </>
            )}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Button asChild variant="outline" className="flex-1">
                <Link to="/get-started">Back to partners</Link>
              </Button>
              <Button asChild className="flex-1">
                <Link to="/">Return home</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

function StateIcon({ state }: { state: VerifyState }) {
  const cls = "mx-auto h-14 w-14 rounded-full inline-flex items-center justify-center";
  if (state.kind === "loading")
    return <div className={`${cls} bg-grey-100`}><Loader2 className="h-7 w-7 text-grey-500 animate-spin" /></div>;
  if (state.kind === "verified" || state.kind === "already_verified")
    return <div className={`${cls} bg-fresh-teal/10`}><CheckCircle2 className="h-7 w-7 text-fresh-teal" /></div>;
  if (state.kind === "expired")
    return <div className={`${cls} bg-amber-100`}><Clock className="h-7 w-7 text-amber-600" /></div>;
  return <div className={`${cls} bg-red-100`}><AlertTriangle className="h-7 w-7 text-red-600" /></div>;
}

function titleFor(state: VerifyState) {
  switch (state.kind) {
    case "loading": return "Confirming your SMS number…";
    case "verified": return "Your SMS number is confirmed";
    case "already_verified": return "This number is already confirmed";
    case "expired": return "This confirmation link has expired";
    case "invalid": return "We couldn't verify this link";
    case "error": return "Confirmation didn't complete";
  }
}
function descFor(state: VerifyState) {
  switch (state.kind) {
    case "loading": return "Hang tight while we verify your confirmation link.";
    case "verified": return "Transactional SMS only — no marketing, ever.";
    case "already_verified": return "Your SMS opt-in is active. No further action needed.";
    case "expired": return "For your protection, links expire after 14 days.";
    case "invalid": return "The link is missing, malformed, or already used.";
    case "error": return "A temporary issue stopped us from confirming your number.";
  }
}

function seoFor(state: VerifyState): { title: string; description: string } {
  switch (state.kind) {
    case "verified":
      return {
        title: "SMS number confirmed — Partner application",
        description:
          "Your SMS opt-in for free sample distribution updates is now confirmed.",
      };
    case "already_verified":
      return {
        title: "SMS already confirmed — Partner application",
        description: "This SMS number is already confirmed for partner updates.",
      };
    case "expired":
      return {
        title: "SMS confirmation link expired — Partner application",
        description:
          "This SMS confirmation link has expired. Request a new one to opt in.",
      };
    case "invalid":
      return {
        title: "Invalid SMS confirmation link — Partner application",
        description:
          "This SMS confirmation link is missing, malformed, or already used.",
      };
    case "error":
      return {
        title: "SMS confirmation issue — Partner application",
        description:
          "We couldn't complete your SMS confirmation. Please try again shortly.",
      };
    case "loading":
    default:
      return {
        title: "Confirm SMS number — Partner application",
        description:
          "Confirm your SMS number for free sample distribution updates.",
      };
  }
}

export default PartnerSmsVerify;