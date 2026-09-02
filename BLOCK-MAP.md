# Syncovate v2 — Block Assembly Map

Walk each page top to bottom. Drop each `.html` fragment into a GHL "Custom Code / HTML" element inside a section row. Place native GHL elements (buttons, images, product/price cards, forms, blog feeds) between the fragments as noted — every native element is also called out with an HTML comment inside the fragment right where it belongs, and again as a paste-board blockquote if you're working from `paste/*.md`.

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

Paste `assets/01-custom-css.css` into: GHL Sites → your site → Settings → Custom CSS.

---

## Site-Wide JSON-LD

Paste the **SITE-WIDE** block from `assets/02-schema-jsonld.html` (the `ProfessionalService` block) into: GHL Sites → your site → Settings → Header Tracking Code.

---

## Nav

Links: Home (`/`) · How I Work (`/how-i-work`) · Blog (`/writing`) · About (`/about`) · Contact (`/contact`) · **Let's Talk** button (`https://link.syncovatellc.com/widget/booking/29K6RwPvCIc2xOxgUVKo`, class `sy-btn-primary`)

---

## Footer

- Tagline: **Business Psychology for Owners of Growing Companies**
- Links: Home · How I Work · Blog · About · Contact
- LinkedIn: https://www.linkedin.com/in/shannonsjennings/
- Saturday Seed: /saturday-seed
- Phone: (269) 293-4442 (linked: `tel:+12692934442`)
- Email: Shannon@SyncovateLLC.com (linked: `mailto:Shannon@SyncovateLLC.com`)
- Bottom line: **© 2026 Syncovate LLC · Niles, Michigan · Serving Michiana and beyond**

---

## Redirects

Enter in GHL → Sites → Settings → URL Redirects (all 301 permanent). Full list in `assets/03-redirects.md`.

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
**Paste board:** `paste/home.md`

| Order | Element | Notes |
|---|---|---|
| 1 | `blocks/home/home-01-hero.html` | Contains overline ("Dr. J — Syncovate"), `<h1>`, and embedded GHL NATIVE Image + Button comments. |
| 2 | `blocks/home/home-02-who-i-work-with.html` | |
| 3 | `blocks/home/home-03-how-i-think.html` | |
| 4 | `blocks/home/home-04-why-i-do-this.html` | |
| 5 | `blocks/home/home-05-closing.html` | Contains embedded GHL NATIVE Button comment. |

---

## HOW I WORK — `/how-i-work`

**Title tag:** `Leadership Advisory, Team Facilitation & Retreats | Syncovate`
**Meta description:** `Work with Dr. J one-on-one or bring her in for your team — leadership workshops, retreats, and strategy sessions for owners of growing companies. Starts at $1,500.`
**JSON-LD:** Site-wide block + **HOW I WORK PAGE ONLY** block from `assets/02-schema-jsonld.html` (paste into page → Settings → Custom Code → Header).
**Paste board:** `paste/how-i-work.md`

| Order | Element | Notes |
|---|---|---|
| 1 | `blocks/how-i-work/hiw-01-hero.html` | Contains `<h1>` + Carl Rogers pull quote (uses `...`, not the HTML ellipsis entity — must match the copy doc character for character). |
| 2 | `blocks/how-i-work/hiw-02-start-with-your-team.html` | Team Session is a **GHL NATIVE product element** — see the comment inside the fragment (Title, Price, Description). Also contains embedded "Let's Talk About Your Team" (primary) and "Book a Team Session" (secondary, `#TODO-team-session-calendar`) button comments. |
| 3 | `blocks/how-i-work/hiw-03-what-it-feels-like.html` | |
| 4 | `blocks/how-i-work/hiw-04-work-with-me-directly.html` | All three 1:1 offers (Trusted Advisor, Single Session, On-Call Advisor) are **GHL NATIVE product elements** — see the comments inside the fragment for each one's Title, Badge, Price, Class, and Description. Buttons for each are embedded as comments in place: Trusted Advisor gets "Let's Talk" (primary) + "Start Now" (secondary, real checkout link below); Single Session gets "Book a Session" (secondary, `#TODO-single-session-booking`); On-Call gets "Let's Talk" (primary). |
| 5 | `blocks/how-i-work/hiw-05-who-i-work-with.html` | |
| 6 | `blocks/how-i-work/hiw-06-testimonials.html` | |
| 7 | GHL Image (optional) | Alt: "Dr. Shannon Jennings facilitating a leadership team retreat" |
| 8 | `blocks/how-i-work/hiw-07-closing.html` | Contains embedded GHL NATIVE Button comment. |

**Start Now (Trusted Advisor) URL:** `https://link.syncovatellc.com/payment-link/68b849c521970953fbe18f26` — this is live, not a placeholder.

---

## WRITING — `/writing`

**Title tag:** `Through the Prism: Leadership & Business Psychology Field Notes | Syncovate`
**Meta description:** `Short field notes on leadership, growing companies, and the psychology of running a business — plus the Saturday Seed: one idea you can put into play Monday.`
**JSON-LD:** Site-wide block + **WRITING PAGE ONLY** block from `assets/02-schema-jsonld.html` (paste into page → Settings → Custom Code → Header).
**Paste board:** `paste/writing.md`

| Order | Element | Notes |
|---|---|---|
| 1 | `blocks/writing/writing-01-hero.html` | Contains `<h1>`. No links in this section (per brief). |
| 2 | `blocks/writing/writing-02-saturday-seed.html` | Contains embedded GHL NATIVE Form comment (fallback: Button, "Send Me the Saturday Seed"). |
| 3 | `blocks/writing/writing-03-through-the-prism.html` | Contains embedded GHL NATIVE Blog comment pointing to `/prism-blog`. Fallback: three hardcoded post cards, commented out in the fragment — uncomment only if the native blog feed element isn't available, and leave the TODO to wire the live feed. |
| 4 | `blocks/writing/writing-04-closing.html` | "keep reading" links to `/prism-blog`. Contains embedded GHL NATIVE Button comment. |

---

## ABOUT — `/about`

**Title tag:** `About Dr. Shannon Jennings, Business Psychologist | Syncovate`
**Meta description:** `Dr. Shannon Jennings (Dr. J) holds a doctorate in business psychology and 20 years of experience with entrepreneurs, family businesses, and leadership teams.`
**JSON-LD:** Site-wide block + **ABOUT PAGE ONLY** block from `assets/02-schema-jsonld.html` (paste into page → Settings → Custom Code → Header).
**Paste board:** `paste/about.md`

| Order | Element | Notes |
|---|---|---|
| 1 | `blocks/about/about-01-hero.html` | Contains overline ("Dr. Shannon Jennings · Dr. J"), `<h1>`, and embedded GHL NATIVE Image + Button comments. |
| 2 | `blocks/about/about-02-how-i-got-here.html` | |
| 3 | `blocks/about/about-03-this-is-this-isnt.html` | |
| 4 | `blocks/about/about-04-the-record.html` | |
| 5 | `blocks/about/about-05-thinking-partner.html` | |
| 6 | `blocks/about/about-06-closing.html` | Contains embedded GHL NATIVE Button comment. |

---

## CONTACT — `/contact`

**Title tag:** `Contact Dr. J — Leadership Advisor, South Bend & Elkhart | Syncovate`
**Meta description:** `Start with a 15-minute call with Dr. Shannon Jennings. No pitch, no pressure. Or call, text, or email directly.`
**JSON-LD:** Site-wide block + **CONTACT PAGE ONLY** block from `assets/02-schema-jsonld.html` (paste into page → Settings → Custom Code → Header).
**Paste board:** `paste/contact.md`

| Order | Element | Notes |
|---|---|---|
| 1 | `blocks/contact/contact-01-main.html` | Contains `<h1>` ("Let's talk." — exception: H1 is large here, uses both `sy-display` and `sy-display-override`). Embedded GHL NATIVE Button comment. |

---

## Placeholder URLs — Shannon to wire

| Placeholder | Where | What's needed |
|---|---|---|
| `#TODO-team-session-calendar` | How I Work → "Book a Team Session" button | Booking-and-pay calendar (captures date, group size, context) |
| `#TODO-single-session-booking` | How I Work → "Book a Session" button | Booking-and-pay scheduler ($750, pick a time + pay) |

**Not a placeholder:** the Trusted Advisor "Start Now" button uses the live payment link `https://link.syncovatellc.com/payment-link/68b849c521970953fbe18f26`.

---

## Flags for Shannon

1. ~~**Jen Sailor's title/org**~~ — Confirmed: Chief Financial and Operations Officer, Indiana Trust Wealth Management.
2. **Nav label** — set to "Blog". Page slug and internal file naming stay "Writing"/`/writing`; only the nav and footer link text reads "Blog".
3. **About slug** — built as `/about`; the redirect from `/about-dr-j` handles the old URL. Keep either.
4. **Blog feed** — if GHL's native Blog element can't pull `/prism-blog`, uncomment the three hardcoded post cards in `writing-03-through-the-prism.html` and TODO to wire the live feed.
5. **Price/product cards** — Team Session, Trusted Advisor, Single Session, and On-Call are all built as GHL NATIVE product elements now (not HTML markup). The fragments carry the copy and the comments telling you what to configure in each native element; nothing renders as a styled card from the fragment HTML alone.
