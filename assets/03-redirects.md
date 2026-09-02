# Syncovate — 301 Redirect Map

**Where:** GHL → Sites → your site → Settings → **URL Redirects** (some accounts: Sites → Redirects).
Type: **301 (permanent)**. Add each row exactly as written. Do this BEFORE you delete or unpublish the old pages.

**Why this matters:** the old pages have been live and may have backlinks, LinkedIn shares, and search equity. A 301 hands that value to the new page instead of dropping it into a 404.

| Old URL (live today) | → New URL | Note |
|---|---|---|
| `/organizational-diagnostic` | `/how-i-work` | Old Diagnostics page — funnel era, retired |
| `/coaching-and-advising` | `/how-i-work` | Old Coaching page — merged into How I Work |
| `/speaking` | `/how-i-work` | Old Speaking page — merged into How I Work |
| `/about-dr-j` | `/about` | Only if you change the slug. If you keep `/about-dr-j` as the About URL, no redirect needed — and keeping it is fine. |
| `/prism-blog` | *(keep)* | Do NOT redirect. The blog stays at this URL; the Writing page links to it. |
| `/saturday-seed` | *(keep)* | Do NOT redirect. Link to it from Writing and the footer. |

**Scotoma Spotter — your call (flagged in build rules):**
- `spotter.syncovatellc.com` is a separate subdomain, so it keeps working regardless. The question is only whether the *main site* still links to it. Recommendation: remove it from nav/footer; leave the subdomain live and unlinked. No redirect needed.

**New page slugs to create:**
| Page | Slug |
|---|---|
| Home | `/` |
| How I Work | `/how-i-work` |
| Writing | `/writing` |
| About | `/about` *(or keep `/about-dr-j`)* |
| Contact | `/contact` |

**After publishing:** open each OLD URL in an incognito window and confirm it lands on the new page. Then submit the sitemap in Google Search Console (Sites → Settings → SEO usually exposes `/sitemap.xml`).
