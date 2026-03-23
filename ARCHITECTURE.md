# Kansalt SaaS Platform Architecture

## Monorepo layout

```text
apps/
  kansalt-frontend/   # Next.js marketplace, dashboard, login, and launcher
  api-gateway/        # Public API entrypoint and reverse proxy for services
  hms-service/        # HMS domain APIs
  hrms-service/       # HRMS domain shell APIs
  auth-service/       # Login, signup, tenant bootstrap, user invitation

services/
  app-service/        # App catalog, app metadata, launch URLs, subscriptions surface
  user-service/       # Tenant profile, product enablement, feature flags, lead intake
  billing-service/    # Invoice and revenue summaries
  notification-service/ # Email / WhatsApp queue layer

shared/
  prisma/             # Prisma schema and shared client
  middleware/         # Request context, JWT auth, RBAC, error handling
  utils/              # Shared helpers and env utilities
```

## Routing model

- `kansalt.com/` -> Next.js App Marketplace
- `kansalt.com/dashboard` -> unified product launcher
- `kansalt.com/login` -> central login
- `kansalt.com/api/*` -> API gateway to auth and domain services
- `hms.kansalt.com` -> HMS product
- `hrms.kansalt.com` -> HRMS product
- `crm.kansalt.com` -> future CRM product

NGINX sits in front of the marketplace and subdomain apps so the root domain handles discovery and auth while products remain independently deployable.

## Service design

- `auth-service`: JWT issuance, tenant bootstrap, admin user invitation
- `app-service`: app listing, categories, launch URLs, and future subscription metadata
- `hms-service`: patients, doctors, appointments, billing, prescriptions, HMS summary
- `hrms-service`: starter shell for future employee operations modules
- `user-service`: organization profile, product enablement, feature flags, user listing
- `billing-service`: aggregate finance summaries for dashboard widgets
- `notification-service`: queueable email and WhatsApp notifications

## Shared contracts

- Authentication: JWT in `kansalt_token` cookie scoped to `.kansalt.com`, with bearer fallback
- Authorization: RBAC for `ADMIN`, `DOCTOR`, and `RECEPTIONIST`
- Tenancy: all domain models include `organizationId`
- Database: PostgreSQL + Prisma
- Product access: `Organization.products`
- Feature flags: `Organization.featureFlags`
- Marketplace catalog: `App` and `Subscription`

## Frontend model

- Next.js App Router for SEO and clean marketplace routing
- Tailwind CSS for a premium SaaS presentation layer
- Shared marketplace, dashboard, and login shell
- Product launch cards redirect to subdomains instead of embedding app UIs
- Legacy `/sims` and `/hrms` paths now exist only as compatibility redirects

## DevOps model

- Every app and service has its own Dockerfile
- `docker-compose.platform.yml` runs the full platform locally
- `infra/nginx/default.conf` handles reverse proxy routing
- `infra/k8s/` contains Kubernetes-ready manifests via Kustomize

## Migration stance

The current Python repository is a Streamlit UI, not a REST backend. That means the migration is contract-first:

1. Audit Streamlit workflows and data shapes.
2. Recreate those workflows as Node.js APIs.
3. Replace UI-side Python logic with API consumption from Next.js.
4. Retire Streamlit modules once parity is reached.

## Future products

CRM, inventory, analytics, or partner portals can be added by:

1. creating a new app or service in the existing monorepo layout,
2. exposing it through the gateway,
3. enabling it per tenant through `Organization.products`,
4. surfacing it in the dashboard without disturbing existing products.

## Attached product repositories

Kansalt can also attach product repositories that already exist outside the monorepo while the platform migration is in progress.

The working Sims Hospital codebase is attached locally at:

- [external/sims-hospital](d:/Kansalt/external/sims-hospital)

That repository is currently the authoritative HMS implementation for:

- visits
- invoices and payments
- IPD and room workflows
- reports
- prescription sheets
- permissions and audit logs

The monorepo HMS service remains a platform scaffold until those business rules are merged or proxied into the Kansalt service layer.
