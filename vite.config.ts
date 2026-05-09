import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { sentryVitePlugin } from "@sentry/vite-plugin";

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
    mode === 'development' &&
    componentTagger(),
    // Upload source maps to Sentry on production builds only.
    // Requires the following build-time env vars (Workspace Settings → Build Secrets):
    //   SENTRY_AUTH_TOKEN  (required, secret)
    //   SENTRY_ORG         (required, your Sentry org slug)
    //   SENTRY_PROJECT     (required, your Sentry project slug)
    mode === 'production' &&
      process.env.SENTRY_AUTH_TOKEN &&
      process.env.SENTRY_ORG &&
      process.env.SENTRY_PROJECT &&
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
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
