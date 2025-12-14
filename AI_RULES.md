# AI Rules for This App

Keep contributions consistent, simple, and aligned with the existing stack and patterns in this repo.

## Tech Stack Overview (5–10 bullets)
- Next.js 14 (App Router) with TypeScript for the framework and SSR/SSG.
- Tailwind CSS for styling, using shadcn/ui (Radix UI primitives) for components.
- next-intl for i18n, Crowdin for translations, locale-aware routing in `src/app/[locale]`.
- next-themes for dark/light theme support with hydration-safe configuration.
- Clerk for authentication, organizations, and user management.
- Drizzle ORM for DB access; PostgreSQL in production (`pg`), PGlite in development (`@electric-sql/pglite`).
- react-hook-form for forms with zod for schema validation.
- Pino (with `@logtail/pino`) for structured logging; Sentry for error/performance monitoring.
- Stripe for billing and payments.
- Storybook for UI documentation; Vitest + Playwright for unit/integration/e2e testing.

## Library Usage Rules

### UI & Styling
- Use shadcn/ui components from `src/components/ui/*` for all UI elements; do not add other UI libraries (e.g., MUI/Chakra).
- Style exclusively with Tailwind CSS classes; if custom CSS is needed, put it in `src/styles/global.css`.
- Use `class-variance-authority` for component variants (see `buttonVariants.ts`, `badgeVariants.ts`).
- Merge class names with the shared `cn()` from `src/utils/Helpers.ts` (tailwind-merge + clsx).
- For accessible primitives (dialogs, popovers, tooltips, etc.), use Radix UI via shadcn/ui.

### Icons
- Use `lucide-react` for all icons; do not add other icon packs.

### Forms & Validation
- Use `react-hook-form` for form state and `zod` for schema validation.
- Use the shared form primitives in `src/components/ui/form.tsx` (`Form`, `FormField`, `FormItem`, `FormLabel`, `FormControl`, `FormDescription`, `FormMessage`).
- Keep form components small and reusable; validate in UI and at the server boundary.

### Data Display
- Use `@tanstack/react-table` with the shared table in `src/components/ui/data-table.tsx` for tables.
- Reuse existing table patterns and types; do not build custom table logic from scratch.

### Routing & i18n
- Use Next.js App Router (`src/app`) with locale-aware routes under `src/app/[locale]`; do not add React Router.
- Use `next-intl` APIs; messages live in `src/locales/*.json`.
- Load server-side messages via `src/libs/i18n.ts`; wrap client components with `NextIntlClientProvider` in layouts.
- Only add messages to the default language; other translations are handled via Crowdin.

### Auth
- Use Clerk (`@clerk/nextjs`) for authentication and user management.
- Place auth-protected pages within `src/app/[locale]/(auth)` and follow the existing layout pattern in `src/app/[locale]/(auth)/layout.tsx`.
- Respect locale-aware auth URLs (sign-in/sign-up/dashboard) derived in the auth layout.

### Database
- Use Drizzle ORM; keep schema in `src/models/Schema.ts`.
- Migrations via `drizzle-kit` in `migrations/`; production uses PostgreSQL (`DATABASE_URL`), development uses PGlite (`src/libs/DB.ts`).
- Do not introduce alternate ORMs; follow existing migration and connection patterns.

### Payments
- Use the official `stripe` package for billing; do not add other payment SDKs.

### Logging & Monitoring
- Use `pino` for logging; optionally `@logtail/pino` for transport to Better Stack.
- Prefer the shared logger utilities in `src/libs/Logger.ts` over `console.*` in application code.
- Use `@sentry/nextjs` for error/performance monitoring; keep Sentry config in the existing `sentry.*.config.ts` files and `next.config.mjs`.

### Testing & Tooling
- Use Vitest + React Testing Library for unit tests; Playwright for integration/E2E tests.
- Place E2E tests in `tests/e2e`; unit tests live alongside source or in `tests/integration`.
- Use Storybook for UI development; follow existing setup (`.storybook`).
- Respect ESLint configuration in `eslint.config.mjs`; do not add conflicting lint plugins or formatters.

### Environment & Configuration
- Validate environment variables with `@t3-oss/env-nextjs` (see `src/libs/Env.ts`); avoid direct `process.env` access in app code.
- Store secrets in `.env.local` or CI secrets; do not hardcode sensitive values.
- Follow `drizzle.config.ts` for DB config and migrations.

### Dependency Policy
- Prefer existing libraries; do not introduce new major frameworks without strong justification.
- Before adding a dependency, check if the functionality already exists or can be done with current tools.
- Keep components small (≈100 lines or less) and avoid overengineering.

### Project Structure & Conventions
- Directories are lower-case (`src/components`, `src/features`, etc.); use absolute imports with `@` alias.
- Create a new file for every new component or hook; avoid adding multiple components to a single file.
- Maintain locale-aware routes and layouts; follow existing patterns in `src/app/[locale]`.
- Keep imports sorted; rely on ESLint rules (`simple-import-sort`) and the existing config.
- When in doubt, mirror patterns from similar files already in `src/components/ui/*`, `src/features/*`, and `src/libs/*`.