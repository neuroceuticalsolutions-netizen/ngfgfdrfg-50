# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/bbe17783-c538-4e18-9f15-07ff47a6236e

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/bbe17783-c538-4e18-9f15-07ff47a6236e) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/bbe17783-c538-4e18-9f15-07ff47a6236e) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)

## Sentry / error reporting

Sentry is initialised in `src/lib/sentry.ts` and only runs in production
builds (`import.meta.env.PROD`). It captures exceptions, React error
boundary failures, breadcrumbs (route changes, tracked CTAs/forms, fetch
calls) and a per-action correlation id.

### Environment variables

| Variable | Required | Default | Purpose |
| --- | --- | --- | --- |
| `VITE_SENTRY_DSN` | no | hardcoded fallback DSN in `src/lib/sentry.ts` | Override the Sentry DSN per environment. |
| `VITE_SENTRY_SEND_PII` | no | `false` | When `"true"`, allow personally identifiable info (user email, IP address, default request headers) to be sent to Sentry. Anything else (unset, `"false"`, etc.) keeps PII off. |

Build secrets used by `@sentry/vite-plugin` for source-map uploads
(`SENTRY_AUTH_TOKEN`, `SENTRY_ORG`, `SENTRY_PROJECT`) are configured in
**Workspace Settings → Build Secrets**, not via `.env`.

### What gets scrubbed when `VITE_SENTRY_SEND_PII` is off

With `VITE_SENTRY_SEND_PII` unset or `"false"`, the Sentry client:

- Sets `sendDefaultPii: false`, so Sentry's SDK does **not** attach the
  user's IP address, cookies, or default request headers.
- Strips query strings and URL hash fragments from `event.request.url`
  (only `origin + pathname` is sent), so tokens or magic-link params in
  the URL never reach Sentry.
- Removes `email`, `username`, and `ip_address` from `event.user` in
  `beforeSend`. Only the auth user `id` (or an anonymous per-tab session
  id when signed out) is kept so events from the same account can still
  be grouped.
- The user's role (`admin` / `user`) is sent as the `org_role` tag and
  on the `organization` context — these are not considered PII.

With `VITE_SENTRY_SEND_PII="true"` the email is included on
`Sentry.setUser` and the SDK's default PII is allowed through. Use this
only where you have a lawful basis (POPIA / GDPR) to process it.

### Recommended values per environment

| Environment | `VITE_SENTRY_DSN` | `VITE_SENTRY_SEND_PII` | Notes |
| --- | --- | --- | --- |
| **Local dev** | unset | unset (`false`) | Sentry is disabled in dev anyway (`import.meta.env.PROD` gate). No events are sent. |
| **Staging / preview** | staging-only DSN (or fallback) | `false` | Verify error capture without leaking real customer emails. |
| **Production** | production DSN | `false` by default; only set to `"true"` if you have a documented POPIA/GDPR basis to capture user emails for support workflows. | Keep PII off unless you actively need it. |
