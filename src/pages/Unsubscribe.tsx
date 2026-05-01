import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Navigation } from "@/components/sections/navigation";
import { Footer } from "@/components/sections/footer";

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
      <Navigation />
      <main className="flex-1 container max-w-xl py-20">
        <div className="rounded-2xl border bg-card p-8 shadow-sm">
          <h1 className="text-2xl font-bold text-foreground mb-3">Email preferences</h1>
          {state.kind === "loading" && (
            <p className="text-muted-foreground">Validating your unsubscribe link…</p>
          )}
          {state.kind === "ready" && (
            <>
              <p className="text-muted-foreground mb-6">
                Click below to confirm you no longer want to receive emails from
                Neuroceutical Solutions.
              </p>
              <Button onClick={confirm}>Confirm unsubscribe</Button>
            </>
          )}
          {state.kind === "submitting" && (
            <p className="text-muted-foreground">Processing…</p>
          )}
          {state.kind === "success" && (
            <p className="text-foreground">
              You have been unsubscribed. We are sorry to see you go.
            </p>
          )}
          {state.kind === "already" && (
            <p className="text-foreground">This email is already unsubscribed.</p>
          )}
          {state.kind === "invalid" && (
            <p className="text-destructive">
              This unsubscribe link is invalid or has expired.
            </p>
          )}
          {state.kind === "error" && (
            <p className="text-destructive">{state.message}</p>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}