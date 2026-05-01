import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Navigation } from "@/components/sections/navigation";
import { Footer } from "@/components/sections/footer";
import { SEOHead } from "@/components/SEOHead";
import { CheckCircle2, AlertTriangle, Loader2, Clock } from "lucide-react";

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

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <SEOHead
        title="Confirm SMS number — Partner application"
        description="Confirm your SMS number for free sample distribution updates."
        path="/partners/sms-verify"
      />
      <Helmet>
        <meta name="robots" content="noindex, nofollow" />
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
              <p>
                Thanks — your number is confirmed and we may send you transactional
                SMS updates about your application. You can withdraw consent anytime
                by replying STOP or emailing privacy@neuroceutical.co.za.
              </p>
            )}
            {state.kind === "already_verified" && (
              <p>This SMS number was already confirmed. No further action needed.</p>
            )}
            {state.kind === "expired" && (
              <p>
                This confirmation link has expired. Please contact
                partners@neuroceutical.co.za and we'll send a new link.
              </p>
            )}
            {(state.kind === "invalid" || state.kind === "error") && (
              <p className="text-sm text-grey-600">
                {state.message ?? "We couldn't process this confirmation link. Please try again later."}
              </p>
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
    case "loading": return "Confirming your number…";
    case "verified": return "SMS number confirmed";
    case "already_verified": return "Already confirmed";
    case "expired": return "Link expired";
    case "invalid": return "Invalid link";
    case "error": return "Something went wrong";
  }
}
function descFor(state: VerifyState) {
  switch (state.kind) {
    case "loading": return "Please wait a moment.";
    case "verified": return "We'll only send essential, transactional SMS.";
    case "already_verified": return "Your SMS opt-in is active.";
    case "expired": return "Confirmation links are valid for 14 days.";
    case "invalid": return "This link is missing or no longer valid.";
    case "error": return "Please try again or contact us.";
  }
}

export default PartnerSmsVerify;