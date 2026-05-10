import { createRoot, type Root } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ErrorBoundary } from './components/ErrorBoundary'
import { initSentry } from './lib/sentry'
import { installCorrelationFetch } from './lib/correlation-fetch'
import { installViewportSanity } from './lib/viewport-sanity'
import { markRenderStage } from './lib/render-stage'
import * as Sentry from '@sentry/react'

markRenderStage('script-eval')
initSentry()
markRenderStage('sentry-init')
installCorrelationFetch()
installViewportSanity()

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

function mount(attempt = 1): void {
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
      window.setTimeout(() => mount(attempt + 1), RETRY_DELAY_MS * attempt)
    } else {
      markRenderStage('mount-hard-fallback')
      renderHardFallback(err)
    }
  }
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

mount()