# Syncovate v2 — Block Assembly Map

Walk each page top to bottom. Drop each `.html` fragment into a GHL "Custom Code / HTML" element inside a section row. Place native GHL elements (buttons, forms, images, blog feeds) between the fragments as noted.

---

## Fonts (Site Settings)

Load in GHL Site Settings → Custom Code → Header:
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
```

---

## Site-Wide CSS

Paste `01-custom-css.css` into: GHL Sites → your site → Settings → Custom CSS.

---

## Site-Wide JSON-LD

Paste the **SITE-WIDE** block from `02-schema-jsonld.html` (the `ProfessionalService` block) into: GHL Sites → your site → Settings → Header Tracking Code.

---

## Nav

Links: Home (`/`) · How I Work (`/how-i-work`) · Writing (`/writing`) · About (`/about`) · Contact (`/contact`) · **Let's Talk** button (`https://link.syncovatellc.com/widget/booking/29K6RwPvCIc2xOxgUVKo`, class `sy-btn-primary`)

---

## Footer

- Tagline: **Business Psychology for Owners of Growing Companies**
- Links: Home · How I Work · Writing · About · Contact
- LinkedIn: https://www.linkedin.com/in/shannonsjennings/
- Saturday Seed: /saturday-seed
- Phone: (269) 293-4442 (linked: `tel:+12692934442`)
- Email: Shannon@SyncovateLLC.com (linked: `mailto:Shannon@SyncovateLLC.com`)
- Bottom line: **© 2026 Syncovate LLC · Niles, Michigan · Serving Michiana and beyond**

---

## Redirects

Enter in GHL → Sites → Settings → URL Redirects (all 301 permanent). Full list in `03-redirects.md`.

| Old URL | → New URL |
|---|---|
| `/organizational-diagnostic` | `/how-i-work` |
| `/coaching-and-advising` | `/how-i-work` |
| `/speaking` | `/how-i-work` |
| `/about-dr-j` | `/about` (only if slug changes) |

Do NOT redirect `/prism-blog` or `/saturday-seed` — they stay live.

---

## HOME — `/`

**Title tag:** `Business Psychology for Owners of Growing Companies | Syncovate`
**Meta description:** `Dr. Shannon Jennings, business psychologist, works with owners of growing trades, manufacturing, and family businesses. Leadership advisory and team facilitation.`
**JSON-LD:** Site-wide block only (no page-specific block needed).

| Order | Element | Notes |
|---|---|---|
| 1 | `home/home-01-hero.html` | Contains `<h1>`. |
| 2 | GHL Image | Alt: "Dr. Shannon Jennings, business psychologist and leadership advisor for owners of growing companies" |
| 3 | GHL Button | Label: "Let's Talk" · URL: `https://link.syncovatellc.com/widget/booking/29K6RwPvCIc2xOxgUVKo` · Class: `sy-btn-primary` |
| 4 | `home/home-02-who-i-work-with.html` | |
| 5 | `home/home-03-how-i-think.html` | |
| 6 | `home/home-04-why-i-do-this.html` | |
| 7 | `home/home-05-closing.html` | |
| 8 | GHL Button | Label: "Let's Talk" · URL: `https://link.syncovatellc.com/widget/booking/29K6RwPvCIc2xOxgUVKo` · Class: `sy-btn-primary` |

---

## HOW I WORK — `/how-i-work`

**Title tag:** `Leadership Advisory, Team Facilitation & Retreats | Syncovate`
**Meta description:** `Work with Dr. J one-on-one or bring her in for your team — leadership workshops, retreats, and strategy sessions for owners of growing companies. Starts at $1,500.`
**JSON-LD:** Site-wide block + **HOW I WORK PAGE ONLY** block from `02-schema-jsonld.html` (paste into page → Settings → Custom Code → Header).

| Order | Element | Notes |
|---|---|---|
| 1 | `hiw-01-hero.html` | Contains `<h1>` + Carl Rogers pull quote. |
| 2 | `hiw-02-start-with-your-team.html` | |
| 3 | GHL Button | Label: "Let's Talk About Your Team" · URL: `https://link.syncovatellc.com/widget/booking/29K6RwPvCIc2xOxgUVKo` · Class: `sy-btn-primary` |
| 4 | GHL Button | Label: "Book a Team Session" · URL: `#TODO-team-session-calendar` · Class: `sy-btn-secondary` |
| 5 | `hiw-03-what-it-feels-like.html` | |
| 6 | `hiw-04-work-with-me-directly.html` | Contains price cards. |
| 7 | GHL Button (Trusted Advisor) | Label: "Let's Talk" · URL: `https://link.syncovatellc.com/widget/booking/29K6RwPvCIc2xOxgUVKo` · Class: `sy-btn-primary` |
| 8 | GHL Button (Trusted Advisor) | Label: "Start Now" · URL: `#TODO-trusted-advisor-checkout` · Class: `sy-btn-secondary` |
| 9 | GHL Button (Single Session) | Label: "Book a Session" · URL: `#TODO-single-session-booking` · Class: `sy-btn-secondary` |
| 10 | GHL Button (On-Call) | Label: "Let's Talk" · URL: `https://link.syncovatellc.com/widget/booking/29K6RwPvCIc2xOxgUVKo` · Class: `sy-btn-primary` |
| 11 | `hiw-05-who-i-work-with.html` | |
| 12 | `hiw-06-testimonials.html` | FLAG: Confirm Jen Sailor's current title/org. |
| 13 | GHL Image (optional) | Alt: "Dr. Shannon Jennings facilitating a leadership team retreat" |
| 14 | `hiw-07-closing.html` | |
| 15 | GHL Button | Label: "Let's Talk" · URL: `https://link.syncovatellc.com/widget/booking/29K6RwPvCIc2xOxgUVKo` · Class: `sy-btn-primary` |

---

## WRITING — `/writing`

**Title tag:** `Through the Prism: Leadership & Business Psychology Field Notes | Syncovate`
**Meta description:** `Short field notes on leadership, growing companies, and the psychology of running a business — plus the Saturday Seed: one idea you can put into play Monday.`
**JSON-LD:** Site-wide block + **WRITING PAGE ONLY** block from `02-schema-jsonld.html` (paste into page → Settings → Custom Code → Header).

| Order | Element | Notes |
|---|---|---|
| 1 | `writing-01-hero.html` | Contains `<h1>`. No links in this section (per brief). |
| 2 | `writing-02-saturday-seed.html` | Copy only. |
| 3 | GHL Form | The existing Saturday Seed sign-up form (same one powering `/saturday-seed`). If form embed isn't available, use GHL Button: "Send Me the Saturday Seed" → `https://syncovatellc.com/saturday-seed` · Class: `sy-btn-primary` |
| 4 | `writing-03-through-the-prism.html` | Intro copy only. |
| 5 | GHL Blog | Point to `/prism-blog`. Show 3 most recent posts. If native blog element unavailable, uncomment the hardcoded fallback posts in the fragment and TODO to wire the feed later. |
| 6 | `writing-04-closing.html` | |
| 7 | GHL Button | Label: "Let's Talk" · URL: `https://link.syncovatellc.com/widget/booking/29K6RwPvCIc2xOxgUVKo` · Class: `sy-btn-primary` |

---

## ABOUT — `/about`

**Title tag:** `About Dr. Shannon Jennings, Business Psychologist | Syncovate`
**Meta description:** `Dr. Shannon Jennings (Dr. J) holds a doctorate in business psychology and 20 years of experience with entrepreneurs, family businesses, and leadership teams.`
**JSON-LD:** Site-wide block + **ABOUT PAGE ONLY** block from `02-schema-jsonld.html` (paste into page → Settings → Custom Code → Header).

| Order | Element | Notes |
|---|---|---|
| 1 | `about-01-hero.html` | Contains `<h1>`. |
| 2 | GHL Image | Alt: "Dr. Shannon Jennings, PsyD, business psychologist and founder of Syncovate" |
| 3 | GHL Button | Label: "Let's Talk" · URL: `https://link.syncovatellc.com/widget/booking/29K6RwPvCIc2xOxgUVKo` · Class: `sy-btn-primary` |
| 4 | `about-02-how-i-got-here.html` | |
| 5 | `about-03-this-is-this-isnt.html` | |
| 6 | `about-04-the-record.html` | |
| 7 | `about-05-thinking-partner.html` | |
| 8 | `about-06-closing.html` | |
| 9 | GHL Button | Label: "Let's Talk" · URL: `https://link.syncovatellc.com/widget/booking/29K6RwPvCIc2xOxgUVKo` · Class: `sy-btn-primary` |

---

## CONTACT — `/contact`

**Title tag:** `Contact Dr. J — Leadership Advisor, South Bend & Elkhart | Syncovate`
**Meta description:** `Start with a 15-minute call with Dr. Shannon Jennings. No pitch, no pressure. Or call, text, or email directly.`
**JSON-LD:** Site-wide block + **CONTACT PAGE ONLY** block from `02-schema-jsonld.html` (paste into page → Settings → Custom Code → Header).

| Order | Element | Notes |
|---|---|---|
| 1 | `contact/contact-01-main.html` | Contains `<h1>` ("Let's talk." — exception: H1 is large here, uses `sy-display-override`). |
| 2 | GHL Button | Label: "Let's Talk" · URL: `https://link.syncovatellc.com/widget/booking/29K6RwPvCIc2xOxgUVKo` · Class: `sy-btn-primary` |

---

## Placeholder URLs — Shannon to wire

| Placeholder | Where | What's needed |
|---|---|---|
| `#TODO-team-session-calendar` | How I Work → "Book a Team Session" button | Booking-and-pay calendar (captures date, group size, context) |
| `#TODO-trusted-advisor-checkout` | How I Work → "Start Now" button | GHL/Stripe recurring checkout ($1,500/mo) |
| `#TODO-single-session-booking` | How I Work → "Book a Session" button | Booking-and-pay scheduler ($750, pick a time + pay) |

---

## Flags for Shannon

1. **Jen Sailor's title/org** — currently "Chief Financial and Operations Officer, Indiana Trust Wealth Management" per copy doc. Confirm before publishing.
2. **Nav label** — built as "Writing"; change to "Through the Prism" if preferred (one text change in nav).
3. **About slug** — built as `/about`; the redirect from `/about-dr-j` handles the old URL. Keep either.
4. **Blog feed** — if GHL's native Blog element can't pull `/prism-blog`, uncomment the three hardcoded post cards in `writing-03-through-the-prism.html` and TODO to wire the live feed.
