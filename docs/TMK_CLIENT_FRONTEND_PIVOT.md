# TMK Client Frontend Pivot

TMK originally used React/Vite with Django/DRF and PostgreSQL, including JWT authentication, role-based access, audit logging, staff content management, inquiries, and newsletter subscribers. Client requirements changed: the production client site is being simplified to a primarily frontend site, with occasional content updates managed by the developer.

## Public content

Public informational pages now import arrays from `frontend/src/data/`:

- `opportunities.js`: the five existing opportunity areas, including their approved longer descriptions. Athletics remains within Leadership Development.
- `impactMetrics.js`: all six existing metric values. The “Since 2017” framing remains; the internal “Client-supplied impact figure” caption is omitted from public output.
- `stories.js`, `partners.js`, `events.js`: empty arrays until confirmed content is available. Existing empty states remain.

Edit these modules and rebuild/redeploy the frontend to publish updates. Array order controls display order; keep IDs stable and slugs unique. Home retains its existing first-three opportunity preview. Collection files describe future record fields; event locations use `location_name`. Do not invent records to fill empty sections.

Use root-relative static asset URLs (for example, assets placed under Vite's `public/` directory), imported Vite asset URLs, or approved absolute URLs for `featured_image` and `logo`. Public pages no longer resolve media against the Django origin. The shared staff media helper remains unchanged. No existing images were moved.

## Dependency audit and resulting behavior

| Surface | Previous dependency | Current behavior |
| --- | --- | --- |
| Home | opportunities, metrics, stories, partners, events API collections | Direct local imports |
| Impact | impact metrics API | Local metrics |
| Opportunity list/detail | opportunity collection and slug API | Local array and slug lookup |
| Stories list/detail | story collection and slug API | Empty local collection; missing detail uses existing unavailable state |
| Partners | partners API | Empty local collection |
| Events list/detail | event collection and slug API | Empty local collection; missing detail uses existing unavailable state |
| Contact/Get Involved | Django inquiries POST | No network submission; after a valid form submission attempt, a status message explicitly says the message has not been sent |
| Footer newsletter | Django newsletter POST | No network submission; after a valid signup attempt, a neutral status message explicitly says the email has not been subscribed |
| About, header, footer navigation | No informational API dependency | Unchanged |

Forms retain their fields, native required/email validation, buttons, and entered values. Values remain only in component state; no storage, fake success, mailto fallback, or replacement endpoint was added. Notices appear only after interaction. Message delivery and newsletter signup are unavailable pending real integrations.

`api/public.js`, `api/engagement.js`, and `utils/usePublicResource.js` remain preserved but have no active public callers. Shared Axios infrastructure, staff API modules, protected routes, JWT authentication, staff pages, and the staff media helper are unchanged. Staff login remains absent from public navigation. The existing globally mounted auth provider can still attempt staff session restoration when a browser already holds a staff refresh token; public content does not depend on its result.

## Preserved platform and future work

The backend was not deleted or modified. Django models, serializers, routes, settings, migrations, tests, authorization, audit, engagement, seed commands, and PostgreSQL configuration remain preserved. Staff CMS changes no longer publish to the static public site. The full-stack version may later be separated or rebranded as a portfolio/reusable platform.

Future integrations are an email marketing provider and Stripe donations. Neither is implemented here. A real inquiry delivery mechanism also remains a production decision. No credentials, provider keys, donation URLs, or dependencies were added. Static hosting must serve the SPA entry point for direct navigation to React routes.

## Donations

Donations will use a client-owned Stripe Payment Link, with Stripe hosting payment collection; TMK will not process card data directly. After client Stripe access is available, add the final public Payment Link to `frontend/src/config/donations.js`. No Stripe secret/API keys belong in frontend code. `DonateLink` renders nothing while the configured URL is empty and renders an external button link once it is populated. The homepage's “Invest in a Future” CTA uses this component; mentor and partner links remain available. “Invest in Opportunity” remains general participation copy on Home and Get Involved.
