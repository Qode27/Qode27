# Qode27

Premium static marketing website for Qode27, built with React, Vite, Tailwind CSS, and Framer Motion.

## Demo Mode Architecture

The site now includes a reusable frontend-only demo framework that runs entirely inside `qode27.com` with no extra backend, database, hosting, or paid infrastructure.

### What exists now

- Public demo catalog at `/demo`
- Ten interactive demo routes:
  - `/demo/hrms`
  - `/demo/hms`
  - `/demo/inventory`
  - `/demo/parking`
  - `/demo/coaching`
  - `/demo/ca`
  - `/demo/restaurant`
  - `/demo/shipping`
  - `/demo/port`
  - `/demo/crm`
- Optional nested routes per app, for example:
  - `/demo/hrms/employees`
  - `/demo/hms/billing`
  - `/demo/inventory/purchase-orders`
  - `/demo/parking/movement`
  - `/demo/coaching/fees`
  - `/demo/crm/forecast`

### Core design

- All demo state is mocked in frontend code and optionally persisted to `localStorage`
- Demo forms update local mock state only
- Demo exports generate sample files in-browser only
- Demo pages block live network/API requests through `useDemoNetworkGuard`
- Demo routes are lazy loaded, so the main marketing site stays lightweight
- Demo availability is controlled centrally from `src/config/demo-apps.ts`
- The shared engine now supports app-specific identity on top of shared state and routing:
  - nav style
  - density mode
  - card style
  - table style
  - preview variant
  - typography tone
  - dashboard label
  - motion style
  - product hint

### Key folders

- `src/config/demo-apps.ts`
  Central registry for demo metadata, route slugs, enabled/request-only mode, solution mapping, theme accents, and lazy module loading.
- `src/components/demo/`
  Shared low-level demo utilities such as previews, toasts, charts, and support components. App layouts themselves are now intentionally route-specific.
- `src/lib/demo/`
  Local persistence helpers, mock export helpers, and the live-request safety guard.
- `src/data/demo/`
  Realistic mock datasets for each demo application.
- `src/pages/demo/`
  Demo catalog, route entry page, and per-app demo modules.

### How to add an 11th demo

1. Create a new mock data file in `src/data/demo/`.
2. Create a new demo page in `src/pages/demo/apps/`, using `useDemoAppState` and the mock helpers while keeping the product layout, navigation, dashboard composition, and page structure unique to that app.
3. Add a registry entry in `src/config/demo-apps.ts`:
   - `slug`
   - `solutionSlug`
   - `name`
   - `shortName`
   - `category`
   - `tagline`
   - `summary`
   - `accent`
   - `identity`
   - `heroMetrics`
   - `demoEnabled`
   - `requestDemoOnly`
   - `modulePath`
4. Use the `identity` object to make the product feel unique rather than just recolored:
   - `navStyle`
   - `densityMode`
   - `cardStyle`
   - `tableStyle`
   - `previewVariant`
   - `typography`
   - `dashboardLabel`
   - `motionStyle`
   - `productHint`
5. Do not copy another app surface. Reuse only low-level engine pieces such as state, mock exports, and safety guards.
6. Give the new product its own layout philosophy:
   - navigation pattern
   - dashboard hierarchy
   - module flow
   - interaction rhythm
   - preview composition
7. If the app should be public, set:
   - `demoEnabled: true`
   - `requestDemoOnly: false`
8. If the app should stay private and only collect leads, set:
   - `demoEnabled: true`
   - `requestDemoOnly: true`
9. If the related product already exists in `src/data/solutions.ts`, the solution cards and detail page will automatically pick up the interactive demo or request-only state from the registry mapping.
10. Run:
   - `npm.cmd run typecheck`
   - `npm.cmd run build`

### Safety guarantees

- No production database is used by demo mode
- No separate demo backend is required
- No new services are required
- No live API requests are allowed from demo routes
- Resetting a demo restores sample data only

## Stack

- React
- Vite
- Tailwind CSS v4
- Framer Motion
- React Icons

## Scripts

- `npm install`
- `npm run dev`
- `npm run build`
- `npm run preview`
- `npm run lint`

## Branding

The active brand assets used by the site live in `public/`:

- `qode27-wordmark-cropped.png`
- `qode27-icon-cropped.png`

## Deploy

Production build output is generated in `dist/`.
