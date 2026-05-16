import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";

type CheckState = "idle" | "checking" | "ok" | "fail";

const AdminEnvCheck = () => {
  const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
  const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string | undefined;
  const projectId = import.meta.env.VITE_SUPABASE_PROJECT_ID as string | undefined;

  const [state, setState] = useState<CheckState>("idle");
  const [status, setStatus] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const mask = (v?: string) =>
    !v ? "—" : v.length <= 12 ? "•".repeat(v.length) : `${v.slice(0, 6)}…${v.slice(-4)} (${v.length} chars)`;

  const runCheck = async () => {
    setState("checking");
    setError(null);
    setStatus(null);
    if (!url || !key) {
      setState("fail");
      setError("Missing VITE_SUPABASE_URL or VITE_SUPABASE_PUBLISHABLE_KEY");
      return;
    }
    try {
      const res = await fetch(`${url.replace(/\/$/, "")}/rest/v1/`, {
        headers: { apikey: key, Authorization: `Bearer ${key}` },
      });
      setStatus(res.status);
      setState(res.ok ? "ok" : "fail");
      if (!res.ok) setError(await res.text().catch(() => `HTTP ${res.status}`));
    } catch (e: any) {
      setState("fail");
      setError(e?.message ?? String(e));
    }
  };

  useEffect(() => {
    runCheck();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const Row = ({ label, value, ok }: { label: string; value: string; ok: boolean }) => (
    <div className="flex items-start justify-between gap-4 border-b border-border py-3">
      <div>
        <div className="text-sm font-medium text-foreground">{label}</div>
        <div className="font-mono text-xs text-muted-foreground break-all">{value}</div>
      </div>
      <span
        className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-semibold ${
          ok ? "bg-emerald-500/15 text-emerald-600" : "bg-red-500/15 text-red-600"
        }`}
      >
        {ok ? "present" : "missing"}
      </span>
    </div>
  );

  return (
    <>
      <Helmet>
        <title>Environment Check</title>
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>
      <main className="mx-auto max-w-2xl px-6 py-16">
        <h1 className="text-3xl font-semibold text-foreground">Environment configuration check</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Verifies that the backend keys are present in this build and that the REST endpoint is reachable.
        </p>

        <section className="mt-8 rounded-lg border border-border bg-card p-5">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Environment variables</h2>
          <Row label="VITE_SUPABASE_URL" value={url ?? "not set"} ok={Boolean(url)} />
          <Row label="VITE_SUPABASE_PUBLISHABLE_KEY" value={mask(key)} ok={Boolean(key)} />
          <Row label="VITE_SUPABASE_PROJECT_ID" value={projectId ?? "not set"} ok={Boolean(projectId)} />
        </section>

        <section className="mt-6 rounded-lg border border-border bg-card p-5">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">REST endpoint reachability</h2>
            <button
              onClick={runCheck}
              className="rounded-md border border-border px-3 py-1 text-xs font-medium text-foreground hover:bg-muted"
            >
              Re-run
            </button>
          </div>
          <div className="mt-3 space-y-2 text-sm">
            <div>
              <span className="text-muted-foreground">Target: </span>
              <span className="font-mono text-xs">{url ? `${url.replace(/\/$/, "")}/rest/v1/` : "—"}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Status: </span>
              {state === "checking" && <span className="text-foreground">checking…</span>}
              {state === "ok" && (
                <span className="font-semibold text-emerald-600">OK ({status})</span>
              )}
              {state === "fail" && (
                <span className="font-semibold text-red-600">Failed{status ? ` (${status})` : ""}</span>
              )}
            </div>
            {error && (
              <pre className="mt-2 overflow-auto rounded bg-muted p-3 font-mono text-xs text-foreground">{error}</pre>
            )}
          </div>
        </section>
      </main>
    </>
  );
};

export default AdminEnvCheck;