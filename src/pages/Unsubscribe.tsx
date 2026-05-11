import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { CheckCircle2, MailX, AlertTriangle, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Navigation } from "@/components/sections/navigation";
import { Footer } from "@/components/sections/footer";
import { SEOHead } from "@/components/SEOHead";
import { Helmet } from "react-helmet-async";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string;

type State =
  | { kind: "loading" }
  | { kind: "ready" }
  | { kind: "already" }
  | { kind: "invalid" }
  | { kind: "submitting" }
  | { kind: "success" }
  | { kind: "error"; message: string };

export default function Unsubscribe() {
  const [params] = useSearchParams();
  const token = params.get("token");
  const [state, setState] = useState<State>({ kind: "loading" });

  useEffect(() => {
    if (!token) {
      setState({ kind: "invalid" });
      return;
    }
    (async () => {
      try {
        const res = await fetch(
          `${SUPABASE_URL}/functions/v1/handle-email-unsubscribe?token=${encodeURIComponent(token)}`,
          { headers: { apikey: SUPABASE_ANON_KEY } },
        );
        const data = await res.json();
        if (!res.ok) {
          setState({ kind: "invalid" });
          return;
        }
        if (data.valid === true) setState({ kind: "ready" });
        else if (data.reason === "already_unsubscribed") setState({ kind: "already" });
        else setState({ kind: "invalid" });
      } catch {
        setState({ kind: "invalid" });
      }
    })();
  }, [token]);

  const confirm = async () => {
    if (!token) return;
    setState({ kind: "submitting" });
    try {
      const { data, error } = await supabase.functions.invoke("handle-email-unsubscribe", {
        body: { token },
      });
      if (error) throw error;
      if (data?.success) setState({ kind: "success" });
      else if (data?.reason === "already_unsubscribed") setState({ kind: "already" });
      else setState({ kind: "error", message: "Could not process unsubscribe." });
    } catch (e: any) {
      setState({ kind: "error", message: e?.message ?? "Something went wrong." });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEOHead
        title="Email preferences"
        description="Manage your Neuroceutical Solutions email preferences."
        path="/unsubscribe"
      />
      <Helmet>
        <meta name="robots" content="noindex, nofollow, noarchive" />
        <meta name="googlebot" content="noindex, nofollow" />
      </Helmet>
      <Navigation />
      <main className="flex-1 container max-w-xl py-16 md:py-24">
        <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-medium">
          {/* Branded header */}
          <div className="bg-gradient-to-br from-royal-purple-dark via-royal-purple to-royal-purple-light px-8 py-7 text-primary-foreground">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-fresh-teal">
              Neuroceutical Solutions
            </p>
            <h1 className="mt-1 text-2xl font-bold">Email preferences</h1>
          </div>
          <div className="h-[3px] bg-fresh-teal" />

          <div className="p-8">
            {state.kind === "loading" && (
              <div className="flex items-center gap-3 text-muted-foreground">
                <Loader2 className="h-5 w-5 animate-spin text-primary" />
                <p>Validating your unsubscribe link…</p>
              </div>
            )}

            {state.kind === "ready" && (
              <>
                <p className="mb-6 text-muted-foreground leading-relaxed">
                  Confirm below and you'll stop receiving emails from{" "}
                  <strong className="text-foreground">Neuroceutical Solutions</strong>.
                  This includes updates about your sample distribution
                  application and partner communications.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button onClick={confirm} className="shadow-purple">
                    Confirm unsubscribe
                  </Button>
                  <Button asChild variant="outline">
                    <Link to="/">Keep me subscribed</Link>
                  </Button>
                </div>
              </>
            )}

            {state.kind === "submitting" && (
              <div className="flex items-center gap-3 text-muted-foreground">
                <Loader2 className="h-5 w-5 animate-spin text-primary" />
                <p>Processing your request…</p>
              </div>
            )}

            {state.kind === "success" && (
              <div className="space-y-4">
                <div className="flex items-start gap-3 rounded-xl border border-fresh-teal/40 bg-fresh-teal/5 p-4">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-fresh-teal-dark" />
                  <div>
                    <p className="font-semibold text-foreground">
                      You've been unsubscribed.
                    </p>
                    <p className="text-sm text-muted-foreground">
                      We're sorry to see you go. You can resubscribe anytime
                      from our newsletter page.
                    </p>
                  </div>
                </div>
                <Button asChild variant="outline">
                  <Link to="/">Return to homepage</Link>
                </Button>
              </div>
            )}

            {state.kind === "already" && (
              <div className="flex items-start gap-3 rounded-xl border border-border bg-muted/40 p-4">
                <MailX className="mt-0.5 h-5 w-5 shrink-0 text-muted-foreground" />
                <p className="text-foreground">
                  This email is already unsubscribed — no further action needed.
                </p>
              </div>
            )}

            {state.kind === "invalid" && (
              <div className="flex items-start gap-3 rounded-xl border border-destructive/30 bg-destructive/5 p-4">
                <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-destructive" />
                <div>
                  <p className="font-semibold text-foreground">
                    This link is invalid or has expired.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Please use the unsubscribe link from a recent email, or{" "}
                    <Link to="/contact" className="text-primary underline">
                      contact us
                    </Link>{" "}
                    for help.
                  </p>
                </div>
              </div>
            )}

            {state.kind === "error" && (
              <div className="flex items-start gap-3 rounded-xl border border-destructive/30 bg-destructive/5 p-4">
                <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-destructive" />
                <p className="text-destructive">{state.message}</p>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}