# TMK Home and public chrome brand redesign

Scope: Home, global public header/footer, shared newsletter presentation. Interior page designs, staff, backend, route architecture, impact/opportunity data, and original assets are unchanged.

## Content provenance

- Hero headline/support, philosophy, six impact figures, opportunity descriptions, and brand phrase: approved user brief and existing project data.
- Mission, Vision, Values: verbatim wording supplied and explicitly approved by the user in this task. Values is split into two paragraphs.
- Kevin headshot identity: explicitly approved by user. Concise founder/teacher/coach/mentor description is supported by https://www.themillskorner.org/koaches-korner/ and the task brief. No dates, credentials, or new metrics were added.
- Three short exact testimonial excerpts (24 words total), real names: https://www.themillskorner.org/testimonials/ . Chris Hollis, Arness Ikner, La France Gregory. No invented portraits or titles. These are Home previews; the existing Stories page remains unchanged.
- Historical sponsor preview: Verizon and CBG are listed in the Sponsors section of https://www.themillskorner.org/ . This is historical support, not a claim of current sponsorship.
  - Verizon source: https://www.themillskorner.org/wp-content/uploads/2020/09/ver.png
  - CBG source: https://www.themillskorner.org/wp-content/uploads/2020/11/final-cbg-logo-higher-res.jpg
- No new phone, email, address, or social accounts were introduced. Footer routes to the existing Contact page.

## Images

All supplied originals and existing derivatives remain byte-identical. New `frontend/public/images/tmk/brand/` derivatives preserve full framing; CSS crops display containers only. Pillow LANCZOS proportional resize, WebP quality 86, widths 640/1280. Sources: community service group/supplies JPGs and existing huddle/champions/headshot WebPs. Logo is a 256px PNG derivative of the supplied PNG, with the original retained as src/fallback. Sponsor logos are lossless WebP conversions.

Home uses service/huddle/champions in the hero, Kevin headshot early, huddle for athletics, supplies for impact. All photo tags have dimensions and srcset/sizes; first hero photo is high-priority, remaining/below-fold images lazy and async. No stock images on Home. Real photo colors are preserved; the UI palette uses black/charcoal/off-white/red.

## Carousels

Shared useCarousel hook: one interval per mounted carousel (hero 5000ms; testimonials 9000ms), effect cleanup clears interval on pause, reset, preference changes, and unmount. Manual selection increments a reset revision even on the same dot. Pointer hover and focus within carousel pause; leaving starts a full delay. Reduced-motion disables timers and transitions while preserving manual controls. Previous/next/dots, arrow keys, explicit Pause/Play, visible playback reason; automatic content has aria-live=off.

Previously the whole hero including static copy triggered hover pause. The new image/control panel defines the carousel interaction boundary, so reading/hovering static copy does not stop the photos. Hover/focus on the actual carousel still pauses as requested. This explains one reproducible apparent stall, but the exact prior user-browser state is not independently recoverable.

## Integration boundaries

Brevo endpoint, POST method, field names, honeypot, locale and html_type are unchanged. No live signup is submitted during verification. `/newsletter-thank-you` is preserved.

Existing `donationUrl` and DonateLink remain compatible. Optional `monthlyDonationUrl` is empty until a client-owned Payment Link is supplied. Home gives no checkout control or href when a URL is empty. Header/footer/Home routes stay internal and valid; no payment/backend integration is added.

## Verification — November 6, 2026

- Chrome running against local Vite preview: hero visibly changed at 5.103s and 10.208s, looped to first at 15.314s. Actual hover pause and resume passed across full 5-second intervals.
- Testimonials changed at 9.081s and 18.094s, looped at 27.042s. Both carousel control sets passed previous/next/dots/arrows, same-dot timer restart, focus/hover pause/resume, and explicit Pause/Play tests.
- Real reduced-motion run held both slides unchanged for 10s before and after manual navigation. Preference changes remove/recreate intervals; instrumentation saw at most one 5000ms and one 9000ms interval. SPA navigation unmounted Home and cleared both.
- Widths 1440,1280,1024,768,640,430,390,320: no page overflow, logos present, mobile menu opens/closes with Escape, metric columns 3/3/2/2/1/1/1/1. Desktop/mobile screenshots reviewed. One H1, sequential section headings, scoped visible focus, image alt text, no automatic live-region announcements.
- Public navigation destinations, all five opportunity detail routes, newsletter thank-you, and staff login rendered. Staff authentication/backend behavior is outside this frontend change and was not exercised.
- Native Brevo submission intercepted locally: POST EMAIL, locale=en, html_type=simple, empty email_address_check preserved. No external subscriber was created; provider-side delivery/redirect was not re-tested.
- One transient 404 appeared during the broad run; subsequent isolated route/form checks passed with no console/runtime errors. No persistent application failure was reproduced.
- New CSS typography/foreground palette uses neutral colors, contrast-safe red on light, light red on charcoal, and white on CTA red. Original photographic colors and sponsor brand colors are retained.
- Lint/build/diff-check pass. No dependency changes, backend edits, staging, commits, pushes, or branch changes.

## Remaining work

Interior public pages retain their existing designs and content, including empty Stories/Partners collections. Their Home preview CTAs route to these existing pages. A later phase can populate those detail collections and redesign About, Impact, Opportunities/details, Stories/details, Partners, Events/details, Get Involved, Kontact, and newsletter thank-you. Payment Links and approved direct contact/social details remain pending.
