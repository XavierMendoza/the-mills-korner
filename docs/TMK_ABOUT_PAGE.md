# Kevin Mills / About page

Scope: `/about` only, with page-scoped `tmk-about.css`. Existing public layout supplies the header and footer. Home, other public pages, routes, staff, API code, integrations, dependencies, and source assets are unchanged.

## Approved content and sources

- Kevin's identity, founder/mentor/educator/coach roles, and opening relationship statement: approved Home and current user brief.
- Personal mentoring background, approach, student welfare, and education: official legacy My Story, https://www.themillskorner.org/my-story/ . Retrieved November 6, 2026. The narrative is a concise paraphrase; no employers, dates, awards, or new credentials were introduced. Legacy references to years of experience and family size are intentionally not presented as current facts.
- Three degrees are reproduced from the legacy source: MBA in Business; MA in Human Development; MS in Coaching and Athletic Administration.
- Belief quote: exact wording explicitly approved in the task, attributed to Kevin Mills.
- “All I Want To Do”: the four-stanza excerpt explicitly provided and approved by the user during this task. Wording, punctuation, capitalization, and explicit line breaks are preserved. It is labeled a selected excerpt and displayed in four left-aligned blocks. No missing portions were appended; no full-text expansion is offered.
- TMK purpose, five areas, athletics pathway, and service narrative: existing approved Home, About, opportunity data, brand phrase, and current user brief. No new impact claims or biographical events were added.

## Images

Existing responsive derivatives only: `brand/kevin-{640,1280}.webp`, `brand/huddle-{640,1280}.webp`, and `brand/service-{640,1280}.webp`. These derive from the approved professional headshot, football huddle WebP, and community service group photograph documented in `TMK_IMAGE_ASSET_MAP.md` and `TMK_BRAND_REDESIGN.md`.

The hero portrait preserves full framing and is eager/high-priority. Other images are lazy/async. All have intrinsic dimensions, responsive srcsets/sizes, and descriptive alt text. No portraits are used to identify other people or invented affiliations.

## Sections

1. Kevin-focused split hero and story anchor.
2. Opening personal narrative.
3. Approved hope/opportunity belief quote.
4. Educator, Coach, Mentor approach and verified education.
5. Why TMK exists.
6. Approved selected learning-statement excerpt.
7. Coaching Beyond the Game, within Leadership Development.
8. Community/service feature.
9. Closing next steps.

## Shared footer correction

About now uses actual TMK photographs, so the existing representative-photo disclaimer is omitted on `/about`, just as it is on Home. Its condition remains unchanged for every other page. This is the only shared-layout change; Home output is unchanged.

## CTA destinations

- Read Kevin's Story → `/about#kevins-story`
- See How TMK Supports Young People → `/opportunity`
- See How TMK Builds Young Leaders → `/opportunity/leadership-development`
- See TMK's Kommunity Impact → `/impact`
- Read TMK Success Stories → `/stories`
- Support TMK Through Giving → `/#giving` (safe existing internal preview)

No direct payment URL or checkout was introduced. Brevo form configuration and newsletter thank-you route remain intact.

## Verification — November 6, 2026

- Chrome at 1440,1280,1024,768,640,430,390,320: no horizontal overflow; three TMK photos decoded; shared logos present; mobile menu/Escape passed.
- Desktop/mobile screenshots reviewed. Approved learning-statement wording, punctuation, capitalization and line breaks match the supplied excerpt exactly.
- One H1, no skipped heading levels, descriptive alt text, working story anchor and CTA destinations. Scoped red/white keyboard focus overrides the legacy gold outline.
- Sampled text contrast: 5.18:1–12.06:1. No green/gold UI styling; original photographic colors preserved.
- CTA routes, newsletter thank-you and staff login rendered; no console/runtime/network errors. Staff authentication and external signup/payment submissions were not exercised.
- Task-start hashes confirm Home, other page sources/styles, backend, integrations and package manifests/lockfile unchanged. Only AboutPage.jsx and the footer disclaimer condition changed among existing files.
- Lint, build and git diff --check passed. No dependencies, staging, commits, pushes or branch changes.
