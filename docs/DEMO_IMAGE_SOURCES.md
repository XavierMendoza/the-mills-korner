# TMK demo image sources

These are representative stock photographs, not photographs of TMK participants, staff, partners, or events. Their placement illustrates themes only; it does not establish affiliations, outcomes, or endorsement. The public footer carries this disclosure, and the homepage hero also labels its photography as representative. Replace them with client-approved photography when available.

All files are stored under `frontend/public/images/demo/`. Each photograph has a large `.webp` and a smaller `-800.webp` derivative. Downloaded from Pexels on November 5, 2026; the [Pexels license](https://www.pexels.com/license/) permits free use and modification and prohibits implying endorsement. No external image hotlinks, fonts, scripts, or image CDN are required at runtime.

| Files (including the -800 variant) | Source | Page / section usage |
| --- | --- | --- |
| `mentorship.webp` | [Two students collaborating — Pexels 8199761](https://www.pexels.com/photo/students-studying-together-while-looking-at-the-screen-of-a-laptop-8199761/) | Hero slide 1, Mentorship card/detail, About philosophy image, Get Involved hero/Mentor pathway, Stories empty state, Contact image |
| `study.webp` | [Students studying — Pexels 8457292](https://www.pexels.com/photo/students-studying-together-8457292/) | Hero slide 2, Academic Success card/detail, Opportunities hero, Invest pathway |
| `teamwork.webp` | [Group collaboration — Pexels 31367509](https://www.pexels.com/photo/diverse-team-collaborating-outdoors-31367509/) | Hero slide 3, Leadership Development card/detail, About and Partners heroes, Partner pathway, Events empty state |
| `planning.webp` | [Students taking notes — Pexels 5965970](https://www.pexels.com/photo/diverse-classmates-studying-together-in-park-5965970/) | Financial Capability card/detail; Impact editorial section (not associated with a specific metric) |
| `wellness.webp` | [Students outdoors — Pexels 5553051](https://www.pexels.com/photo/positive-multiethnic-students-doing-homework-in-team-5553051/) | Wellness card/detail, Stories and Contact heroes, Home stories section |
| `community.webp` | [Volunteer gathering — Pexels 11599230](https://www.pexels.com/photo/young-people-on-a-volunteer-work-11599230/) | Impact and Events heroes, Home/About philosophy photo break, Home events section |

## Preparation and maintenance

Source downloads were limited to 1600 pixels wide, then converted to WebP at quality 78 (large) and 76 (small), with a maximum large size of 1600 × 1200 and small size of 800 × 600. Original JPEGs are not shipped. `DemoPhoto` supplies intrinsic dimensions, responsive `srcSet`/`sizes`, async decoding, and lazy loading below the fold. Initial hero photographs load eagerly; the other carousel photographs do not receive high fetch priority. Cropping uses `object-fit: cover`; no text is embedded in images.

The carousel is manual, with previous/next buttons, selectable indicators, arrow-key support inside its control group, and a polite status announcement. No autoplay needs to be paused. Reduced-motion preferences disable fades and hover transitions. Public presentation styles are isolated from staff selectors in `public-refresh.css`.

Before the owner demo, review photo suitability and crops with the owner. Before launch, prioritize actual permission-cleared TMK photography, verify Brevo registration with a controlled address, and complete the client-owned Stripe Payment Link and inquiry-delivery decisions. Stories, partners, and events still contain no invented records.
