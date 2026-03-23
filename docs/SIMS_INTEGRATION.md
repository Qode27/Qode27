# Sims Hospital Integration

## Attached repository

The working Sims Hospital codebase is now attached locally at:

- [external/sims-hospital](d:/Kansalt/external/sims-hospital)

Source repository:

- `https://github.com/Kansalt-com/Sims_Hospital.git`

## Why this matters

The original Kansalt platform scaffold introduced a simplified HMS service so the SaaS architecture could be built end-to-end. The attached Sims Hospital repository is the real HMS implementation and should now be treated as the authoritative source for hospital workflows.

## Confirmed Sims capabilities

From the attached repo we can verify:

- React + Vite frontend under [frontend](d:/Kansalt/external/sims-hospital/frontend)
- Express + Prisma backend under [backend](d:/Kansalt/external/sims-hospital/backend)
- working modules for:
  - auth
  - patients
  - visits
  - invoices
  - prescriptions
  - doctors
  - users
  - settings
  - rooms
  - reports
  - IPD
- Prisma migrations and seed data under [backend/prisma](d:/Kansalt/external/sims-hospital/backend/prisma)
- K3s/Helm deployment assets under [deploy](d:/Kansalt/external/sims-hospital/deploy)
- host NGINX deployment assets under [deployment/nginx](d:/Kansalt/external/sims-hospital/deployment/nginx)

## Recommended integration model

Use a phased attachment instead of rewriting the working repo immediately.

### Phase 1

- Keep Sims Hospital running as its own application.
- Expose it through Kansalt product routing at `/sims`.
- Treat Kansalt as the portfolio, dashboard, auth-control, and multi-product shell.

Current progress inside Kansalt `apps/hms-service`:

- native routes for `/patients`, `/doctors`, `/appointments`, `/billing`, `/prescriptions`
- Sims-inspired routes now added for `/visits`, `/invoices`, `/ipd`, `/rooms`, `/settings`, `/users`, and `/reports`
- module catalog endpoint at `/modules`

### Phase 2

- Map Sims backend modules into the Kansalt monorepo service boundaries.
- Reuse or migrate:
  - patients -> `apps/hms-service`
  - visits -> `apps/hms-service`
  - invoices/billing -> `apps/hms-service` plus `services/billing-service`
  - prescriptions -> `apps/hms-service`
  - rooms/IPD -> `apps/hms-service`
  - auth/users/settings -> `apps/auth-service` and `services/user-service`

### Phase 3

- Consolidate shared auth, tenancy, and infrastructure.
- Retire duplicate placeholder HMS contracts from the scaffold once parity is complete.

## Current architectural truth

There are now two layers:

1. Kansalt monorepo platform
   - SaaS shell, routing, shared services, and platform architecture
2. Sims Hospital product repo
   - real hospital domain workflows and production-ready HMS implementation

The correct next move is integration, not replacement.
