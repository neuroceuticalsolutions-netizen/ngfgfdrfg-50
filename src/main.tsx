import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ErrorBoundary } from './components/ErrorBoundary'
import { initSentry } from './lib/sentry'
import { installCorrelationFetch } from './lib/correlation-fetch'
import { installViewportSanity } from './lib/viewport-sanity'

initSentry()
installCorrelationFetch()
installViewportSanity()

createRoot(document.getElementById("root")!).render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);