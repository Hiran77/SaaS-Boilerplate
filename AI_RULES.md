# AI Rules for This App

Use this guide to keep contributions consistent, simple, and aligned with the existing stack.

## Tech Stack Overview (5–10 bullets)
- Next.js 14 (App Router) with TypeScript for the web app framework and SSR/SSG.
- Tailwind CSS for styling, with shadcn/ui (built on Radix UI) as the component library.
- next-intl for internationalization, with Crowdin-managed translations and locale-aware routing.
- next-themes for dark/light theme support and hydration-safe configuration.
- Clerk for authentication and user/profile management.
- Drizzle ORM for database access; PostgreSQL in production (`pg`) and PGlite in development.
- react-hook-form for forms, paired with zod for schema validation.
- Pino (and @logtail/pino) for structured logging; Sentry for error and performance monitoring.
- Stripe for billing and payments.
- Storybook for UI documentation; Vitest and Playwright for unit/integration/e2e testing.

## Library Usage Rules

### UI & Styling
- Use shadcn/ui components for all UI elements. Do not add other UI libraries (e.g., MUI, Chakra).
- Style with Tailwind CSS classes only. Avoid custom CSS unless necessary and place it in `src/styles/global.css`.
- For component variants, use `class-variance-authority`. For merging classes, use `tailwind-merge`.
- For accessible primitives (dialogs, popovers, tooltips, etc.), use Radix UI primitives (already included via shadcn/ui).

### Icons
- Use `lucide-react` for all icons. Do not add other icon packs.

### Forms & Validation
- Use `react-hook-form` for form state.
- Define schemas with `zod` and use the zod resolver in forms.
- Use the shared form primitives in `src/components/ui/form.tsx` (`Form`, `FormField`, `FormItem`, etc.).
- Keep form components small and reusable; validate at the edge and in the UI.

### Data Display
- Use `@tanstack/react-table` and the shared `src/components/ui/data-table.tsx` for tables.
- Reuse existing table patterns and types; avoid rolling custom table logic.

### Routing & i18n
- Use the Next.js App Router for pages/layouts; do not add React Router.
- Use `next-intl` APIs for messages and locale handling. Messages live in `src/locales/*.json`.
- Only add messages to the default language; translations are synced via Crowdin.

### Auth
- Use Clerk for authentication and user management. Do not introduce alternative auth providers.
- Place auth-protected routes within the existing `(auth)` layout structure.

### Database
- Use Drizzle ORM for queries and migrations.
- Migrations are managed with `drizzle-kit` in the `migrations/` folder; keep schema in `src/models/Schema.ts`.
- In development, use PGlite (via `src/libs/DB.ts`); in production, use PostgreSQL with `DATABASE_URL`.

### Payments
- Use the official `stripe` package for billing and payments; do not add other payment SDKs.

### Logging & Monitoring
- Use `pino` for logging (optionally `@logtail/pino` for transport).
- Use `@sentry/nextjs` for error and performance monitoring.
- Keep logs structured; avoid `console.*` in production code.

### Testing & Tooling
- Use Vitest for unit tests and Playwright for e2e tests.
- Use Storybook for component development and documentation.
- Use ESLint and the configs already provided; follow existing formatting and conventions.

### Environment & Configuration
- Validate environment variables with `@t3-oss/env-nextjs`.
- Store secrets in `.env` files and avoid hardcoding sensitive values.
- Follow `drizzle.config.ts` for database config and migration paths.

### Dependency Policy
- Prefer existing libraries in this stack; do not introduce new major frameworks without justification.
- Before adding a new dependency, check if the functionality exists in the project or can be achieved with current tools.
- Keep components small (under ~100 lines when reasonable) and avoid overengineering.