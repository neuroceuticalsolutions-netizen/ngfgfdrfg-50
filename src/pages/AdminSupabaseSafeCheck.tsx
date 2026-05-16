import { useEffect, useState } from "react";
import { supabase, isSupabaseConfigured } from "@/integrations/supabase/safe-client";

type CheckResult = {
  name: string;
  passed: boolean;
  detail: string;
};

export default function AdminSupabaseSafeCheck() {
  const [results, setResults] = useState<CheckResult[]>([]);
  const [warnCount, setWarnCount] = useState(0);

  useEffect(() => {
    const originalWarn = console.warn;
    let captured = 0;
    console.warn = (...args: unknown[]) => {
      if (typeof args[0] === "string" && args[0].includes("[supabase]")) {
        captured += 1;
        setWarnCount(captured);
      }
      originalWarn(...args);
    };

    void (async () => {
      const out: CheckResult[] = [];

      out.push({
        name: "Module imported without throwing",
        passed: true,
        detail: "safe-client loaded successfully at build & runtime.",
      });

      out.push({
        name: "isSupabaseConfigured flag",
        passed: typeof isSupabaseConfigured === "boolean",
        detail: `value = ${String(isSupabaseConfigured)}`,
      });

      // Exercise a chained call — must never throw, regardless of config.
      try {
        const res = await supabase.from("nonexistent_table").select("*");
        out.push({
          name: "Chained .from().select() returns a response",
          passed: true,
          detail: isSupabaseConfigured
            ? `real client returned: ${res.error ? `error=${res.error.message}` : `data length=${(res.data as unknown[] | null)?.length ?? 0}`}`
            : `stub returned: data=${String(res.data)}, error=${res.error?.message ?? "none"}`,
        });
      } catch (err) {
        out.push({
          name: "Chained .from().select() returns a response",
          passed: false,
          detail: `threw: ${err instanceof Error ? err.message : String(err)}`,
        });
      }

      // Fire a second stub access to confirm warning is one-time.
      try {
        await supabase.from("another_table").select("*");
      } catch { /* no-op */ }

      out.push({
        name: isSupabaseConfigured
          ? "Warning suppressed when configured"
          : "Stub warns exactly once",
        passed: isSupabaseConfigured ? captured === 0 : captured === 1,
        detail: `console.warn '[supabase]' calls captured: ${captured}`,
      });

      setResults(out);
    })();

    return () => {
      console.warn = originalWarn;
    };
  }, []);

  const allPassed = results.length > 0 && results.every((r) => r.passed);

  return (
    <main className="min-h-screen bg-background text-foreground p-8">
      <div className="max-w-2xl mx-auto space-y-6">
        <header>
          <h1 className="text-2xl font-semibold">Supabase Safe Client — Dev Check</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Verifies <code>@/integrations/supabase/safe-client</code> builds cleanly and
            behaves correctly whether or not the Supabase env vars are configured.
          </p>
        </header>

        <section
          className={`rounded-lg border p-4 ${
            results.length === 0
              ? "border-border bg-muted/30"
              : allPassed
                ? "border-green-500/40 bg-green-500/10"
                : "border-destructive/40 bg-destructive/10"
          }`}
        >
          <div className="font-medium">
            {results.length === 0
              ? "Running checks…"
              : allPassed
                ? "All checks passed ✓"
                : "Some checks failed ✗"}
          </div>
          <div className="text-xs text-muted-foreground mt-1">
            isSupabaseConfigured = <code>{String(isSupabaseConfigured)}</code> · captured
            warnings: <code>{warnCount}</code>
          </div>
        </section>

        <ul className="space-y-2">
          {results.map((r, i) => (
            <li
              key={i}
              className="rounded-md border border-border bg-card p-3 text-sm flex gap-3"
            >
              <span
                className={`mt-0.5 inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded-full text-xs font-semibold ${
                  r.passed
                    ? "bg-green-500/20 text-green-700 dark:text-green-300"
                    : "bg-destructive/20 text-destructive"
                }`}
              >
                {r.passed ? "✓" : "✗"}
              </span>
              <div>
                <div className="font-medium">{r.name}</div>
                <div className="text-xs text-muted-foreground mt-0.5 font-mono">
                  {r.detail}
                </div>
              </div>
            </li>
          ))}
        </ul>

        <p className="text-xs text-muted-foreground">
          Open the browser console to see the actual <code>[supabase]</code> warning when
          env vars are missing.
        </p>
      </div>
    </main>
  );
}
