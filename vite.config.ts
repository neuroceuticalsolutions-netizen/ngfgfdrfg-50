import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { sentryVitePlugin } from "@sentry/vite-plugin";

// Non-fatal build-time check: log a warning (don't abort) when required
// Supabase env vars are missing so the build still ships but the issue
// is visible in build logs.
const warnSupabaseEnvPlugin = (mode: string) => ({
  name: "warn-supabase-env",
  apply: "build" as const,
  enforce: "pre" as const,
  configResolved() {
    const env = { ...loadEnv(mode, process.cwd(), ""), ...process.env };
    const required = ["VITE_SUPABASE_URL", "VITE_SUPABASE_PUBLISHABLE_KEY"];
    const missing = required.filter((k) => !env[k] || String(env[k]).trim() === "");
    if (missing.length > 0) {
      // eslint-disable-next-line no-console
      console.warn(
        `\n\u001b[33m[warn-supabase-env]\u001b[0m Missing env var(s): ${missing.join(
          ", "
        )}. Build will continue, but the Supabase client will be disabled at runtime until these are set.\n`
      );
    }
  },
});

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  build: {
    // Generate source maps so Sentry can map minified stack traces
    // back to original filenames and line numbers.
    sourcemap: true,
  },
  plugins: [
    react(),
    warnSupabaseEnvPlugin(mode),
    mode === 'development' &&
    componentTagger(),
    // Upload source maps to Sentry on production builds only.
    // Requires these build-time env vars (Workspace Settings → Build Secrets):
    //   SENTRY_AUTH_TOKEN  (required, secret)
    //   SENTRY_ORG         (required, your Sentry org slug)
    //   SENTRY_PROJECT     (required, your Sentry project slug)
    ...(mode === 'production' &&
    process.env.SENTRY_AUTH_TOKEN &&
    process.env.SENTRY_ORG &&
    process.env.SENTRY_PROJECT
      ? [
          sentryVitePlugin({
            org: process.env.SENTRY_ORG,
            project: process.env.SENTRY_PROJECT,
            authToken: process.env.SENTRY_AUTH_TOKEN,
            telemetry: false,
            sourcemaps: {
              filesToDeleteAfterUpload: ["./dist/**/*.map"],
            },
            release: {
              name: process.env.SENTRY_RELEASE || undefined,
            },
          }),
        ]
      : []),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
