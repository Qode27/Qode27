# Qode27

Marketing website and interactive product demos for Qode27, built with React 19, Vite, Tailwind CSS v4, Framer Motion, and three.js.

## Site structure

| Route | Page |
| --- | --- |
| `/` | Home — 3D hero, positioning, capabilities, products, systems map, industries, work, delivery approach |
| `/about` | Philosophy, mission and vision, principles, delivery methodology |
| `/services`, `/services/:slug` | Six service lines (`src/data/services.ts`), each with its own diagram |
| `/products`, `/products/:slug` | Ten products (`src/data/solutions.ts` + `src/data/products.ts`) with category filter and module explorer |
| `/industries`, `/industries/:slug` | Six industries (`src/data/industries.ts`) |
| `/work` | Interactive demonstrations + clearly labelled illustrative scenarios (`src/data/work.ts`) |
| `/contact`, `/request-demo` | Project inquiry / demo request form |
| `/insights`, `/insights/:slug` | Article index and template (`src/data/insights.ts`, currently empty) |
| `/privacy`, `/terms` | Legal pages — **pending legal review**; placeholders are marked “to be confirmed” |
| `/demo`, `/demo/:app` | Interactive demo catalog and apps (see below) |
| `*` | Branded not-found page (`noindex`) |

Legacy URLs (`/solutions/*`, `/custom-software`, `/case-studies`, `/pricing`, `/thank-you`, `/privacy-policy`, `/terms-and-conditions`) redirect to their new equivalents.

The site intentionally shows **no pricing**. Conversion is through consultation and demo requests.

## Contact form

The inquiry form posts JSON to `VITE_INQUIRY_ENDPOINT` (see `.env.example`), e.g. a Formspree form URL or your own API route. Only public endpoint URLs belong in `VITE_*` variables — they are bundled into client code.

If the variable is not set, the form validates input and then offers a pre-filled email to `qode27business@gmail.com`. It never reports a submission as sent unless the endpoint returned a success response.

## 3D and motion

- Hero scene: `src/components/three/HeroScene.tsx` (plain three.js, lazy-loaded chunk). Pauses when off-screen or the tab is hidden, caps pixel ratio, uses fewer particles on small screens, and renders a single static frame under `prefers-reduced-motion`.
- If WebGL is unavailable or the context is lost, `HeroFallback` (SVG) is shown instead.
- Scroll-linked effects use Framer Motion (`useScroll`). `MotionConfig reducedMotion="user"` and CSS overrides disable motion for users who prefer it.

## SEO

Per-page titles, descriptions, canonical URLs, Open Graph/Twitter tags, and JSON-LD (Organization, Service, SoftwareApplication, FAQPage) are set by `src/components/ui/Seo.tsx`. `public/sitemap.xml` lists all indexable routes — regenerate it when adding services, products, industries, or demos.

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

## Scripts

- `npm install`
- `npm run dev`
- `npm run build`
- `npm run typecheck`
- `npm run lint`

## Branding

The site header and footer use a vector mark (`src/components/ui/BrandMark.tsx`). The original raster assets in `public/` (`qode27-wordmark-cropped.png`, `qode27-icon-cropped.png`) are still used by the demo apps and as fallback icons. `public/og-image.png` is the social sharing image.

## Deploy

Production build output is generated in `dist/`.
