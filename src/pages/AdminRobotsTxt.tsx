import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Navigation } from "@/components/sections/navigation";
import { Footer } from "@/components/sections/footer";
import { SEOHead } from "@/components/SEOHead";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2, RefreshCw, ShieldCheck, Bot, AlertTriangle, CheckCircle2 } from "lucide-react";
import { Helmet } from "react-helmet-async";

type FetchState =
  | { kind: "idle" }
  | { kind: "loading" }
  | {
      kind: "ok";
      status: number;
      url: string;
      body: string;
      headers: Record<string, string>;
      fetchedAt: string;
    }
  | { kind: "error"; message: string };

const INTERESTING_HEADERS = [
  "last-modified",
  "etag",
  "content-type",
  "content-length",
  "cache-control",
  "age",
  "date",
  "x-served-by",
  "server",
];

function highlight(line: string) {
  if (/^\s*#/.test(line)) return "text-muted-foreground";
  if (/^\s*Disallow:/i.test(line)) return "text-destructive";
  if (/^\s*Allow:/i.test(line)) return "text-fresh-teal-dark";
  if (/^\s*User-agent:/i.test(line)) return "text-royal-purple font-semibold";
  if (/^\s*Sitemap:/i.test(line)) return "text-primary";
  return "text-foreground";
}

export default function AdminRobotsTxt() {
  const navigate = useNavigate();
  const [authLoading, setAuthLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  const [state, setState] = useState<FetchState>({ kind: "idle" });

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
      setAuthLoading(false);
    })();
  }, [navigate]);

  const load = async () => {
    setState({ kind: "loading" });
    try {
      // Cache-bust so we always see the latest deployed file.
      const url = `/robots.txt?ts=${Date.now()}`;
      const res = await fetch(url, { cache: "no-store" });
      const body = await res.text();
      const headers: Record<string, string> = {};
      res.headers.forEach((v, k) => {
        headers[k.toLowerCase()] = v;
      });
      setState({
        kind: "ok",
        status: res.status,
        url: new URL(url, window.location.origin).toString().replace(/\?ts=\d+$/, ""),
        body,
        headers,
        fetchedAt: new Date().toISOString(),
      });
    } catch (e: any) {
      setState({ kind: "error", message: e?.message ?? "Failed to fetch robots.txt" });
    }
  };

  useEffect(() => {
    if (authorized) load();
  }, [authorized]);

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }
  if (!authorized) return null;

  const unsubscribeBlocked =
    state.kind === "ok" && /^\s*Disallow:\s*\/unsubscribe/im.test(state.body);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEOHead
        title="robots.txt viewer (admin)"
        description="Internal admin viewer for the live robots.txt file and response headers."
        path="/admin/robots-txt"
      />
      <Helmet>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <Navigation />
      <main className="flex-1 container max-w-5xl py-12 space-y-8">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-fresh-teal-dark font-semibold">
              <ShieldCheck className="h-4 w-4" /> Admin · internal tool
            </div>
            <h1 className="text-3xl font-bold text-foreground mt-1 flex items-center gap-2">
              <Bot className="h-7 w-7 text-royal-purple" />
              robots.txt viewer
            </h1>
            <p className="text-muted-foreground mt-1 max-w-2xl">
              Confirms what crawlers actually see at{" "}
              <code className="bg-muted px-1 py-0.5 rounded">/robots.txt</code> on
              this deployment — useful when verifying that{" "}
              <code className="bg-muted px-1 py-0.5 rounded">/unsubscribe</code>{" "}
              is excluded from indexing.
            </p>
          </div>
          <Button onClick={load} disabled={state.kind === "loading"} variant="outline">
            {state.kind === "loading" ? (
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
            ) : (
              <RefreshCw className="h-4 w-4 mr-2" />
            )}
            Refresh
          </Button>
        </div>

        {state.kind === "loading" && (
          <Card>
            <CardContent className="py-10 flex items-center gap-3 text-muted-foreground">
              <Loader2 className="h-5 w-5 animate-spin text-primary" />
              Fetching /robots.txt…
            </CardContent>
          </Card>
        )}

        {state.kind === "error" && (
          <Card className="border-destructive/40">
            <CardContent className="py-6 flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-destructive mt-0.5" />
              <div>
                <p className="font-semibold text-foreground">Could not fetch robots.txt</p>
                <p className="text-sm text-muted-foreground">{state.message}</p>
              </div>
            </CardContent>
          </Card>
        )}

        {state.kind === "ok" && (
          <>
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between flex-wrap gap-3">
                  <div>
                    <CardTitle>Status</CardTitle>
                    <CardDescription className="break-all">{state.url}</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={state.status === 200 ? "default" : "destructive"}>
                      HTTP {state.status}
                    </Badge>
                    <Badge variant={unsubscribeBlocked ? "default" : "secondary"}
                      className={unsubscribeBlocked ? "bg-fresh-teal text-foreground" : ""}>
                      {unsubscribeBlocked ? (
                        <span className="inline-flex items-center gap-1">
                          <CheckCircle2 className="h-3 w-3" /> /unsubscribe disallowed
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1">
                          <AlertTriangle className="h-3 w-3" /> /unsubscribe NOT disallowed
                        </span>
                      )}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-1 text-sm">
                <p className="text-muted-foreground">
                  Fetched at{" "}
                  <code className="bg-muted px-1 py-0.5 rounded">{state.fetchedAt}</code>
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Response headers</CardTitle>
                <CardDescription>
                  Includes <code className="bg-muted px-1 py-0.5 rounded">last-modified</code> and
                  caching info to confirm the deployed version.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg border border-border overflow-hidden">
                  <table className="w-full text-sm">
                    <tbody>
                      {INTERESTING_HEADERS.filter((h) => state.headers[h]).map((h) => (
                        <tr key={h} className="border-b border-border last:border-0">
                          <td className="py-2 px-3 bg-muted/40 font-mono text-xs text-muted-foreground w-56 align-top">
                            {h}
                          </td>
                          <td className="py-2 px-3 font-mono text-xs break-all text-foreground">
                            {state.headers[h]}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <details className="mt-4">
                  <summary className="cursor-pointer text-sm text-muted-foreground hover:text-foreground">
                    Show all headers ({Object.keys(state.headers).length})
                  </summary>
                  <pre className="mt-3 text-xs bg-muted/40 border border-border rounded-lg p-3 overflow-auto max-h-64">
{Object.entries(state.headers)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([k, v]) => `${k}: ${v}`)
  .join("\n")}
                  </pre>
                </details>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>File contents</CardTitle>
                <CardDescription>
                  Live response body. Lines are color-coded by directive.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <pre className="text-xs leading-relaxed bg-muted/40 border border-border rounded-lg p-4 overflow-auto max-h-[28rem] font-mono">
                  {state.body.split("\n").map((line, i) => (
                    <div key={i} className={highlight(line)}>
                      {line || "\u00A0"}
                    </div>
                  ))}
                </pre>
              </CardContent>
            </Card>
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}
