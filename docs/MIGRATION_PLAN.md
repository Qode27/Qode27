# Kansalt Migration Plan

## 1. Legacy audit

The current Kansalt repository is a Streamlit application. It does not expose Python REST endpoints that can be ported line-for-line into Node.js.

Legacy workflow inventory discovered in this repo:

- [app/main.py](d:/Kansalt/app/main.py): application shell, query-param routing, navigation
- [pages/home.py](d:/Kansalt/pages/home.py): landing and platform messaging
- [pages/business.py](d:/Kansalt/pages/business.py): consulting and app-store style workflows
- [pages/education.py](d:/Kansalt/pages/education.py): education discovery flows
- [pages/jobs.py](d:/Kansalt/pages/jobs.py): job aggregation flows
- [services/appstore_service.py](d:/Kansalt/services/appstore_service.py): business app metadata logic
- [db/models.py](d:/Kansalt/db/models.py): legacy SQLModel entities for jobs, users, resumes, and cache

## 2. Migration principle

Because the current app is UI-driven, the migration should be done by capability mapping rather than endpoint cloning.

Streamlit workflow -> Node target:

- authentication and user bootstrap -> `apps/auth-service`
- organization and product admin -> `services/user-service`
- marketplace app catalog -> `services/app-service`
- patient management -> `apps/hms-service /patients`
- doctor management -> `apps/hms-service /doctors`
- appointments -> `apps/hms-service /appointments`
- billing -> `apps/hms-service /billing`
- prescriptions -> `apps/hms-service /prescriptions`
- notifications -> `services/notification-service`
- landing and product UI -> `apps/kansalt-frontend`

## 3. New API contracts introduced

### Auth

- `POST /api/auth/signup`
- `POST /api/auth/login`
- `POST /api/auth/logout`
- `GET /api/auth/me`
- `POST /api/auth/users`

### Marketplace

- `GET /api/apps`
- `GET /api/apps/:id`

### HMS

- `GET /api/hms/summary`
- `GET|POST /api/hms/patients`
- `GET|PATCH /api/hms/patients/:id`
- `GET|POST /api/hms/doctors`
- `GET|POST /api/hms/appointments`
- `PATCH /api/hms/appointments/:id/status`
- `GET|POST /api/hms/billing`
- `PATCH /api/hms/billing/:id/status`
- `GET|POST /api/hms/prescriptions`
- `GET /api/hms/prescriptions/:id`

### Tenant admin and growth services

- `POST /api/public/leads`
- `GET|PATCH /api/users/organizations/current`
- `PATCH /api/users/organizations/current/products`
- `PATCH /api/users/organizations/current/feature-flags`
- `GET /api/users/users`
- `GET /api/billing/summary`
- `GET /api/notifications/history`
- `POST /api/notifications/email`
- `POST /api/notifications/whatsapp`

## 4. Data migration target

The shared Prisma schema now defines:

- `Organization`
- `User`
- `App`
- `Subscription`
- `Patient`
- `Doctor`
- `Appointment`
- `Billing`
- `Prescription`
- `Notification`
- `Lead`

Multi-tenancy is enforced by `organizationId` across domain entities.

## 5. Practical rollout sequence

1. Keep the Streamlit app as a reference for content and workflow intent.
2. Start real HMS migration from the actual Sims Hospital business rules and database fields.
3. Map each screen action to a REST contract in `apps/hms-service`.
4. Point the Next.js product pages to `/api/*` instead of Python code paths.
5. Migrate users and tenant records into PostgreSQL through Prisma.
6. Add background workers for notifications and billing automation if needed.
7. Decommission Streamlit modules after acceptance testing.

## 6. Important limitation

This repository does not currently include the real HMS Python source for patient, doctor, billing, or prescription logic. The Node.js HMS service added here is therefore a production-style foundation and API contract, not a byte-for-byte migration of hidden hospital rules.

## 7. Updated reality after repo attachment

The working Sims Hospital implementation is now attached at:

- [external/sims-hospital](d:/Kansalt/external/sims-hospital)

That changes the migration stance:

- the attached Sims repo is the real HMS reference implementation,
- the Kansalt monorepo HMS service is the integration target,
- migration should now happen module-by-module from the attached repo rather than from hypothetical or missing source code.
