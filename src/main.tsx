import { createRoot, type Root } from 'react-dom/client'
import './index.css'
import { initSentry } from './lib/sentry'
import { installCorrelationFetch } from './lib/correlation-fetch'
import { installViewportSanity } from './lib/viewport-sanity'
import { markRenderStage } from './lib/render-stage'
import * as Sentry from '@sentry/react'

markRenderStage('script-eval')

/**
 * Runtime check: the Supabase client throws synchronously at module-init
 * time if VITE_SUPABASE_URL / VITE_SUPABASE_PUBLISHABLE_KEY are missing
 * (which happens when a stale build was bundled before Cloud env vars
 * were configured). That kills every route with a blank screen.
 *
 * We verify the env vars BEFORE importing App (which transitively imports
 * the Supabase client). If they are missing we render a friendly error
 * page and skip the rest of bootstrap entirely.
 */
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string | undefined
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string | undefined
const envReady = Boolean(SUPABASE_URL && SUPABASE_KEY)

if (!envReady) {
  markRenderStage('env-missing')
  renderEnvMissingFallback()
} else {
  initSentry()
  markRenderStage('sentry-init')
  installCorrelationFetch()
  installViewportSanity()
  void bootstrap()
}

/**
 * Mount the React app with a bounded retry. If the very first render throws
 * (missing #root, transient module-init failure, etc.) we wait, tear down
 * any partial root, and try again so the preview never stays blank.
 *
 * After all retries fail we paint a minimal HTML fallback with a manual
 * reload button — never leave the document body empty.
 */
const MAX_ATTEMPTS = 3
const RETRY_DELAY_MS = 400

let currentRoot: Root | null = null

async function bootstrap(): Promise<void> {
  try {
    const [{ default: App }, { ErrorBoundary }] = await Promise.all([
      import('./App.tsx'),
      import('./components/ErrorBoundary'),
    ])
    mount(App, ErrorBoundary)
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('[main] failed to load app module:', err)
    try {
      Sentry.captureException(err, { tags: { source: 'app-import' } })
    } catch { /* no-op */ }
    markRenderStage('mount-hard-fallback')
    renderHardFallback(err)
  }
}

type AppCtor = React.ComponentType
type BoundaryCtor = React.ComponentType<{ children: React.ReactNode }>

function mount(App: AppCtor, ErrorBoundary: BoundaryCtor, attempt = 1): void {
  markRenderStage(
    attempt === 1 ? 'mount-attempt-1' : attempt === 2 ? 'mount-attempt-2' : 'mount-attempt-3',
  )
  try {
    const container = document.getElementById('root')
    if (!container) throw new Error('#root element not found')

    // Tear down any partial root from a previous failed attempt before retrying.
    if (currentRoot) {
      try { currentRoot.unmount() } catch { /* no-op */ }
      currentRoot = null
    }

    currentRoot = createRoot(container)
    currentRoot.render(
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    )
    markRenderStage('mount-success')
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(`[main] mount attempt ${attempt} failed:`, err)
    try {
      Sentry.captureException(err, {
        tags: { source: 'app-mount', attempt: String(attempt) },
      })
    } catch { /* no-op */ }

    if (attempt < MAX_ATTEMPTS) {
      window.setTimeout(() => mount(App, ErrorBoundary, attempt + 1), RETRY_DELAY_MS * attempt)
    } else {
      markRenderStage('mount-hard-fallback')
      renderHardFallback(err)
    }
  }
}

function renderEnvMissingFallback(): void {
  const container = document.getElementById('root') ?? document.body
  if (!container) return
  const missing = [
    !SUPABASE_URL ? 'VITE_SUPABASE_URL' : null,
    !SUPABASE_KEY ? 'VITE_SUPABASE_PUBLISHABLE_KEY' : null,
  ].filter(Boolean).join(', ')
  container.innerHTML = `
    <div role="alert" style="min-height:100vh;display:flex;align-items:center;justify-content:center;padding:2rem;font-family:system-ui,sans-serif;background:#fff;color:#111;text-align:center">
      <div style="max-width:34rem">
        <h1 style="font-size:1.5rem;font-weight:600;margin:0 0 .75rem">This site is being updated</h1>
        <p style="color:#555;margin:0 0 1.25rem">The app is missing its backend configuration and can't start. If you're the site owner, republish the app so the latest environment variables are bundled.</p>
        <button id="__retry_mount__" style="padding:.6rem 1.1rem;border-radius:.5rem;border:0;background:#111;color:#fff;font-weight:500;cursor:pointer">Reload page</button>
        <pre style="margin-top:1.5rem;padding:.75rem;background:#f4f4f5;border-radius:.5rem;font-size:.75rem;color:#666;text-align:left;overflow:auto">Missing: ${escapeHtml(missing)}</pre>
      </div>
    </div>`
  document.getElementById('__retry_mount__')?.addEventListener('click', () => {
    window.location.reload()
  })
}

function renderHardFallback(err: unknown): void {
  const container = document.getElementById('root') ?? document.body
  if (!container) return
  const message = err instanceof Error ? err.message : String(err)
  container.innerHTML = `
    <div role="alert" style="min-height:100vh;display:flex;align-items:center;justify-content:center;padding:2rem;font-family:system-ui,sans-serif;background:#fff;color:#111;text-align:center">
      <div style="max-width:32rem">
        <h1 style="font-size:1.5rem;font-weight:600;margin:0 0 .75rem">This page didn't load</h1>
        <p style="color:#555;margin:0 0 1.5rem">The app failed to start. Reloading usually fixes it.</p>
        <button id="__retry_mount__" style="padding:.6rem 1.1rem;border-radius:.5rem;border:0;background:#111;color:#fff;font-weight:500;cursor:pointer">Reload page</button>
        <pre style="margin-top:1.5rem;padding:.75rem;background:#f4f4f5;border-radius:.5rem;font-size:.75rem;color:#666;text-align:left;overflow:auto;max-height:8rem">${escapeHtml(message)}</pre>
      </div>
    </div>`
  document.getElementById('__retry_mount__')?.addEventListener('click', () => {
    window.location.reload()
  })
}

function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) => (
    c === '&' ? '&amp;' :
    c === '<' ? '&lt;' :
    c === '>' ? '&gt;' :
    c === '"' ? '&quot;' : '&#39;'
  ))
}