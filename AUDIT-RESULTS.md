# Scotoma Spotter Audit Results

Auditor: Claude (automated code + copy audit)
Date: 2026-03-18
Files reviewed: index.html, app.js, results-content.js, results-engine.js, styles.css, all assets

---

## 1. CRITICAL — Broken or Will Embarrass the Brand

### C1. Q3 Score Ordering Is Inverted — "Drowning" Scores LOWER Than "Outgrown"

**File:** `index.html`, lines 163-168
**The problem:** The Q3 options are scored 5, 10, 20, 15 from top to bottom. The third option ("I've clearly outgrown my ability to see everything") scores 20, but the fourth and most severe option ("I'm drowning — I have no idea what's really happening anymore") scores only 15. A person selecting the worst option gets a LOWER score than someone selecting the second-worst option.

**Why it matters:** This directly corrupts tier calculations. Someone who is truly drowning gets placed into a lower tier than someone who merely "outgrown" their visibility. The entire diagnostic accuracy is undermined.

**The copy narratives in results-content.js are also inverted:**
- `vis>=20` triggers: "You told me you've clearly outgrown your ability to see everything."
- `vis>=15` triggers: "You said you're drowning..."

So the narrative text matches the WRONG score. A person who selected "drowning" (score 15) gets the "drowning" narrative correctly, but a person who selected "outgrown" (score 20) gets the "outgrown" narrative. The scoring is wrong but the narrative accidentally compensates. However, the TIER CALCULATION is still wrong because drowning should contribute more points than outgrown.

**Recommendation:** Change the "I'm drowning" option to score 25 (highest) and "outgrown" to score 20. Then adjust the narrative thresholds in results-content.js to match: `vis>=25` for drowning, `vis>=20` for outgrown, `vis>=10` for starting to lose, `vis>=5` for still see everything.

---

### C2. buildResults() Passes q2score Where orgSize Should Be (Argument Order Bug)

**File:** `app.js`, line 208
```javascript
buildResults(name, total, tier, S.q5type, S.industry, S.q2, S.sizeLabel, S);
```

**File:** `results-engine.js`, line 128 — function signature:
```javascript
function buildResults(name, score, tier, type, industry, q2score, orgSize, S)
```

The 6th argument in the call is `S.q2` (the 3AM test score), and the 7th is `S.sizeLabel` (e.g., "26-75"). The function signature expects `q2score` 6th and `orgSize` 7th. **This is correct.**

BUT — `getContent()` on line 135 passes `q2score` (which is `S.q2`, the raw 3AM score 0-25) to the content function. Then inside `getContent()`, line 76, the `q2score` parameter is used for the q2 narrative thresholds (lines 86-96: `q2score>=25`, `q2score>=15`, `q2score>=5`). The raw Q2 values from the HTML are 0, 5, 15, 25 — so the thresholds match. **This is actually fine.**

However, there is a subtle issue: on line 47 of app.js (the shareable URL path), `buildResults` is called with `data.q2` as q2score, which also works. **No bug here after careful review — false alarm. Removing from critical.**

---

### C3. Inflection Tier "Not Ready?" Alt Link Has No href or Download Target

**File:** `results-content.js`, lines 274
```javascript
alt: 'Not ready? Download: "5 Warning Signs Your Blind Spot Is Getting Worse"'
```

There is no `altHref` or `altDownload` property set for the inflection tier. In `results-engine.js` line 168, when alt starts with "Not ready", it renders as a link with `href` from `content.offer.altHref || '#'`. So this will render as a link pointing to `#` — a dead link that scrolls to the top of the page.

The asset file "5 Warning Signs Your Blind Spot Is Getting Worse" does not exist anywhere in the project. There is no PDF for it.

**Recommendation:** Either create the PDF and add `altHref: 'assets/5-warning-signs.pdf', altDownload: true` to the inflection tier offer, or change the alt text to something that doesn't promise a download (e.g., "Not ready? Reply to the email you'll receive — I read every one.").

---

### C4. Early Tier Download Link Relies on PDF That May Not Render In-Browser

**File:** `results-content.js`, line 211
```javascript
ctaHref: 'assets/founders-pre-scotoma-checklist.pdf'
```

The PDF exists (`assets/founders-pre-scotoma-checklist.pdf`), but the CTA button has `download` attribute, meaning it will trigger a file download rather than opening in-browser. For many mobile users, this may fail silently or feel broken depending on the browser. The user may not realize they need to find the file in their downloads.

**Recommendation:** This is a UX concern more than a bug. Consider adding a line beneath the download button: "The PDF will download to your device." Or host it and link to an in-browser viewer.

---

### C5. Webhook URL Is Hardcoded and Exposed in Client-Side JavaScript

**File:** `app.js`, lines 188 and 277
The GHL webhook URL is in plaintext in client-side JS. Anyone who views source can hit this endpoint with arbitrary data, potentially polluting the CRM with junk leads or triggering automations with fake data.

**Recommendation:** At minimum, add a honeypot field or basic validation server-side. Ideally, proxy the webhook through a simple serverless function (Cloudflare Worker, Netlify Function) so the actual endpoint is never exposed to the browser.

---

## 2. HIGH PRIORITY — Copy Issues That Weaken the Landing

### H1. Velocity heroEmphasis Creates Awkward Headline at Inflection Tier

**File:** `results-content.js`, line 166 and 255

The velocity type has `heroEmphasis: 'Outrun Your Own Foundation'`. At inflection tier, the headline template is:
```
You've Outrun Your Own Foundation.
Now It's in the Way.
```

"You've Outrun Your Own Foundation. Now It's in the Way." — "It" is ambiguous. What's "in the way"? The foundation? The outrunning? For the other types, "it" clearly refers to the thing named: "You've Built This Company. Now It's in the Way." works. "You've Lost Sight of the Signal. Now It's in the Way." is slightly awkward but passable. But "outrun your own foundation" is an action, not a thing, so "it" dangles.

**Recommendation:** Change velocity heroEmphasis to `'Outpaced Your Own Foundation'` or restructure the inflection headline template to `'You\'ve '+tc.heroEmphasis+'.<br><em>And it\'s catching up.</em>'` for velocity specifically.

### H2. Optimizer heroEmphasis Creates Contradictory Headline

`heroEmphasis: 'Built This Company'` at inflection becomes: "You've Built This Company. Now It's in the Way." The company isn't in the way — the founder's operating style is. This lands wrong.

**Recommendation:** Change to `heroEmphasis: 'Built This the Only Way You Knew How'` or handle optimizer separately: "The thing that built this company is now in the way."

### H3. Greeting Concatenation Can Create Double-Thought Overload

**File:** `results-content.js`, lines 223, 284, 311

For builder tier:
```javascript
greeting: name+', you\'re in the window where small decisions become permanent patterns. '+q2Narrative+(visNarrative?' '+visNarrative:'')
```

When q2score=25 AND vis>=20, this produces something like:
> "Mike, you're in the window where small decisions become permanent patterns. You told me that feeling hits you weekly or more. That's not stress -- that's your gut telling you something your calendar won't make room for. You told me you've clearly outgrown your ability to see everything. That's not failure -- that's scale. But you're still trying to lead like you can see it all..."

That is a 70+ word paragraph BEFORE the user reaches the first section. It front-loads too much insight and dilutes each point.

**Recommendation:** For builder tier, drop visNarrative from the greeting and let it appear only in the sections (as it does for inflection). Or cap the greeting at one narrative append.

Similarly for transformation tier (line 311), the greeting appends q2Narrative + visNarrative + a full additional sentence. This can run to 100+ words. Too much for a greeting.

### H4. The Three Lenses Blur Together for Relational Type

For the relational type, the three lenses are:
- **opsView**: Talks about turnover cost and the silence signal
- **deeperPattern**: Talks about structural isolation from information, traces back to something you did
- **honestTruth**: Talks about hallway conversations, meetings, the person who used to challenge you

These are good individually, but opsView's second half ("how many of those departures were preceded by a period where the person got quieter...") crosses into honestTruth territory. And deeperPattern's second half ("a promise that was heard differently than it was meant") crosses into honestTruth territory too.

**Recommendation:** Keep opsView strictly operational: turnover data, exit interview patterns, recruiting costs. Move the "silence was the signal" observation to honestTruth. Keep deeperPattern focused on the structural isolation thesis without the personal blame element — save that for honestTruth.

### H5. "Early" Tier Gives Type-Specific Actions That Overpromise

The early tier says "Your Vision Is Still Clear" and "you can still see the whole picture" — but then delivers type-specific action items (e.g., "Map the decision queue" for optimizer). If the person is truly early stage, telling them to map their decision queue implies they already have a bottleneck problem, which contradicts the tier messaging.

**Recommendation:** Create a separate set of early-specific actions that are genuinely preventive, not diagnostic. E.g., "Set up a weekly 15-minute check-in with your key person about what decisions they needed you for this week" rather than "Map the decision queue."

### H6. "Early" Tier Still Shows the Full Scotoma Type Profile

The early tier content doesn't include a "Blind Spot Risk" section the way builder does (which is good), but it still shows the radar chart with a primary scotoma type. For someone who scores "early," showing them a radar chart that says "Your strongest pattern: The Optimizer Blind Spot — 85%" is alarming and contradicts the "you're still clear" messaging.

**Recommendation:** Either suppress the radar chart for early tier, or significantly tone down the primary score (the current formula can produce 70-95 for the primary even at low total scores because the primary base is 70 + modifiers). Consider capping early-tier primary scores at 40-50 and labeling it "Emerging Pattern" instead of "Strongest pattern."

### H7. Consultant-Speak Violations

Per the brief: avoid "leveraging," "synergies," "scalable solution," "data-driven insights," "holistic approach." The copy is mostly clean, but a few phrases would make a contractor in Elkhart squint:

- **"compound invisibility"** (velocity mirror, line 168) — This is jargon. A real person would say "you can't see what's piling up."
- **"operational debt"** (velocity opsView, line 171) — This is tech-startup language. Construction/trades/healthcare founders won't relate. Say "shortcuts that are about to cost you."
- **"accruing operational debt"** (velocity cost, line 169) — Same.
- **"administrative infrastructure"** (healthcare velocity industry color, line 50) — Passable for healthcare, but heavy.
- **"load-bearing shortcut"** (velocity opsView, line 171) — This one actually works brilliantly for trades/construction. Keep it.

**Recommendation:** Replace "compound invisibility" with "blind spots that stack." Replace "operational debt" with "shortcuts that are about to break" or "the 'fix it later' pile."

### H8. Breaking and Transformation Tiers Share Identical "Triage" Alt Text

**File:** `results-content.js`, lines 301 and 328
Both breaking and transformation use nearly identical triage text:
- Breaking: "This isn't a sales call. It's a triage conversation — we figure out if this is the right fit for where you are."
- Transformation: "This isn't a sales call. It's a triage conversation — we'll confirm whether this is the right fit and what the shortest path to action looks like."

These are almost the same sentence. At $15K vs $30K+, the transformation tier should feel distinctly more serious, not copy-pasted with slight variation.

**Recommendation:** Transformation alt should acknowledge the gravity: "This isn't a pitch. At this level, we need 15 minutes to confirm we're the right partner — and that you're ready for what this actually requires."

---

## 3. MEDIUM — Polish Items That Would Improve Quality

### M1. Industry Color for "Other" Feels Generic Compared to Specific Industries

All four "Other" industry colors (lines 65-69) are truisms that could apply to any situation. They lack the concrete, visceral detail of the named industries. Since "Other" is a catchall, this is expected, but the gap in quality is noticeable.

**Recommendation:** Add one concrete example to each "Other" color. E.g., optimizer: "...become the constraints that hold you back at 50. You've probably noticed it in how long your email takes to get through, or how many 'quick questions' fill your day."

### M2. Transportation & Logistics Industry Color Overlaps with Generic

The transportation relational color ("relational blind spots hide in the isolation of the work itself") is essentially the same thesis as the generic relational deeperPattern ("your role has structurally isolated you from it"). They're making the same point at two different levels.

**Recommendation:** Make the transportation relational color more specific to the driver/dispatch/dock dynamic. E.g., reference driver turnover, dispatcher burnout, or the specific communication gaps that happen when half your workforce is on the road.

### M3. Q3 Visibility Narrative for vis=5 Contradicts "Early" Tier Messaging

When vis=5 (user says they still see everything), the visNarrative says: "That works at your current scale — but it won't survive the next stage of growth. The patterns you can't see are the ones forming right now."

If this person also lands in the early tier, the greeting says "your vision is still clear" while the visNarrative (if included) says "it won't survive." The builder tier DOES include visNarrative in the greeting, so a builder-tier person who selected vis=5 gets: "you're in the window where small decisions become permanent patterns... You said you still see and touch everything. That works at your current scale — but it won't survive the next stage of growth."

This is actually fine for builder, but worth noting the tension.

### M4. failsNarrative for q4fails=0 Is Empty — Missing Opportunity

When someone says "No — haven't tried anything specific yet" (score 0), `failsNarrative` is empty string. This means sections that append `failsNarrative` just end without acknowledging the answer. For builder and breaking tiers, this means the "Your Profile" section text or "Deeper Pattern" section doesn't address Q4 at all.

**Recommendation:** Add a narrative for fails=0: "You haven't tried to fix this yet — and that's actually data. Either you haven't named the problem clearly enough to attempt a fix, or some part of you knows the obvious fixes won't touch it."

### M5. Action Item Time Estimates Are Inconsistent in Specificity

- Optimizer Action 1: "30 minutes over 5 days" (specific)
- Optimizer Action 3: "One conversation" (vague)
- Relational Action 1: "15 minutes of honest reflection" (specific + emotional)
- Relational Action 3: "Depends on what you hear" (hedge)
- Velocity Action 2: "Honest gut check" (not a time estimate at all)

**Recommendation:** Make all time estimates concrete. "Honest gut check" becomes "10 minutes." "Depends on what you hear" becomes "One action this week." "One conversation" becomes "15-minute conversation."

### M6. The $750 Single Session Upsell Appears on ALL Tiers Including Early

**File:** `results-engine.js`, lines 176-177

Every tier gets: "Not ready for a full engagement? Book a single session — $750."

For the early tier, the main offer is a FREE guide. Going from "You don't need a diagnostic yet" to "Book a $750 session" in the same offer section is jarring and contradicts the positioning.

**Recommendation:** Suppress the $750 session bridge for early tier, or soften it significantly: "Want to talk through what you're seeing? Book a single session — $750. Ninety minutes with Dr. J on your specific situation."

### M7. Missing Privacy Policy Link

The consent checkbox says "I agree to receive my results and occasional resources from Syncovate" but there's no link to a privacy policy. For GDPR and CAN-SPAM compliance, and for trust with skeptical founders, this should link somewhere.

**Recommendation:** Add a link to the Syncovate privacy policy after the consent text.

### M8. Email Validation Is Minimal

**File:** `app.js`, line 150
Email validation is just `email.indexOf('@')===-1`. This accepts "a@b" as valid. While server-side validation matters more, a slightly better regex would catch obvious typos and reduce junk submissions.

**Recommendation:** Use a basic pattern check: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/` at minimum.

### M9. No "Back" Button on Any Question Screen

Users can only go forward. If someone misclicks on Q4 and wants to change their answer, they have to retake the entire assessment. There is no back navigation.

**Recommendation:** Add a subtle "Back" link below each Continue button. Store prior screen IDs and allow backward navigation while preserving state.

### M10. Results Page Has No Share/Save Mechanism Visible to User

The code builds a shareable results URL (`buildResultsUrl` in app.js), but this URL is only sent to the webhook. The user never sees it. There is no "Share your results" or "Copy link" button on the results page.

**Recommendation:** Add a "Copy link to your results" button or at minimum show the URL so the user can bookmark/share their results page.

### M11. Radar Chart Primary Score Can Be Misleadingly High

**File:** `results-engine.js`, line 30
Primary score formula: `Math.min(100, Math.max(15, 70 + q2mod + q4mod))`

With q2=25 and q6=30: q2mod = 15, q4mod (from q6) = 10. Primary = 70+15+10 = 95%.

A person who just took a 6-question quiz is told their blind spot is at 95%. This overpromises what a brief self-assessment can detect and may undermine credibility with analytical founders who will question how 6 questions can produce a 95% confidence score.

**Recommendation:** Cap the primary at 75-80% maximum, or relabel the axis from percentage to a qualitative scale (Low/Moderate/High/Elevated). Or add a footnote: "This profile reflects patterns, not precision measurements."

### M12. Architectural deeperPattern Uses "Feels Like Betrayal" — Emotional Framing Risk

Per the brief: "the entry point is always BUSINESS, never emotional/psychological framing." The architectural deeperPattern (line 140) says "naming that feels like betrayal." And the relational honestTruth (line 157) says "Maybe you're afraid that finding it means discovering it was something you did."

These are psychologically insightful but edge toward the territory the brief warns about. A contractor in Elkhart might feel talked down to.

**Recommendation:** Keep the insight but frame it in business terms. Instead of "feels like betrayal," try "feels like you're punishing loyalty — and that's a hard call to make when someone helped you build this." Instead of "afraid," try "you're not sure you want to find out."

---

## 4. LOW — Nice-to-Haves for Future Iterations

### L1. No Analytics Events for Assessment Funnel

Google Analytics is loaded but there are no custom events fired for question completion, drop-off tracking, tier distribution, or CTA clicks. Without this, you can't measure funnel performance.

**Recommendation:** Add `gtag('event', ...)` calls at each screen transition and on CTA clicks.

### L2. No Structured Data / Schema Markup

For SEO, adding WebApplication or Quiz schema markup would help the page appear in search results with richer formatting.

### L3. The Disqualification Page Toolkit Items Are Not Delivered

The toolkit promises three items (Executive Brief, Conversation Starter, VIP Assessment Link), but the webhook just fires with `ss_tier: 'toolkit'`. Whether these assets actually exist and get delivered depends entirely on the GHL automation being configured correctly. There's no fallback if the webhook fails.

**Recommendation:** Consider hosting the toolkit items as a PDF download (like the other tier PDFs) as a fallback, or at least add an inline "If you don't receive the email within 5 minutes..." message.

### L4. No Loading State Error Handling

**File:** `app.js`, lines 197-214
The loading screen runs for a fixed 3.8 seconds with no error handling. If the webhook POST fails, the user still sees "Building your diagnosis..." and then gets results. The webhook failure is silently caught. This is fine for now, but if the webhook becomes critical to the flow later, this could be a problem.

### L5. Q5 (Scotoma Type) Always Scores 15 Regardless of Selection

**File:** `index.html`, lines 211-223
All four Q5 options score `pts=15`. The only thing that differs is the `type` parameter. This means Q5 contributes a flat 15 points to the total score regardless of which type the user selects. This is by design (the question determines type, not severity), but it means the score granularity comes from only 5 of 6 questions.

### L6. Footer Link to "Scotoma Spotter" Points to syncovatellc.com/scotoma-spotter

This URL may or may not exist on the main site. If it redirects to the spotter tool, that creates a loop. If it's a landing page about the tool, it should be verified.

### L7. Mobile Nav Hides All Links Except "Book a Call"

On screens under 768px, all nav links except the CTA are hidden via CSS. There's no hamburger menu. Users on mobile can't navigate to Diagnostics, Coaching, Speaking, or About pages from the assessment.

**Recommendation:** Either add a hamburger menu or ensure the footer navigation (which is always visible on results) is sufficient.

### L8. No Keyboard Navigation Support for Chip/Option Selection

The chip and option selects use `onclick` handlers on labels but don't support keyboard navigation (Enter/Space to select, arrow keys to move between options). The radio inputs are hidden via `display:none`, removing them from the tab order entirely.

**Recommendation:** Use `opacity:0; position:absolute` instead of `display:none` for radio inputs, and add keyboard event handlers or rely on native radio behavior.

---

## 5. LINKS & FORMS — Specific Broken/Missing Functionality

### LF1. BROKEN: Inflection Tier "Not Ready?" Download Link Points to `#`
- **Element:** Alt link in inflection tier offer
- **Expected:** Download "5 Warning Signs Your Blind Spot Is Getting Worse"
- **Actual:** Links to `#` (no altHref set), no PDF exists
- **Fix:** Create the PDF asset and add `altHref` + `altDownload` properties, or remove the download promise

### LF2. WORKING: Early Tier Download
- `assets/founders-pre-scotoma-checklist.pdf` -- File exists, link configured correctly

### LF3. WORKING: Builder Tier Alt Download
- `assets/7-decisions-scale-or-stall.pdf` -- File exists, link configured correctly

### LF4. WORKING: All Booking Links
- `https://link.syncovatellc.com/widget/booking/29K6RwPvCIc2xOxgUVKo` -- Used in nav, footer, and as default CTA for inflection/breaking/transformation
- `https://link.syncovatellc.com/widget/bookings/on-demand-advisor` -- Used for $750 single session

Note: These are external links and were not tested for live availability. Verify both URLs resolve correctly.

### LF5. WORKING: Email Form Validation
- Name validation: checks for empty string, shows error, focuses field
- Email validation: checks for empty and presence of `@` (minimal but functional)
- Consent checkbox: checked before submission
- Error display: uses aria-live="polite" for accessibility
- Input error styling: applies `.input-error` class

### LF6. WORKING: Toolkit Form Validation
- Name and email validation mirrors the main form
- Success state hides form fields and shows confirmation
- Uses same webhook URL

### LF7. WORKING: Restart Assessment
- Clears all state variables
- Removes selection classes
- Resets continue buttons
- Clears email form
- Resets progress bar
- Navigates to hero

### LF8. WORKING: Shareable Results URL
- Encodes state to base64
- Decodes on page load
- Renders results without requiring re-submission

### LF9. NOT TESTED: Nav Links to syncovatellc.com
All nav and footer links to syncovatellc.com should be manually verified:
- `syncovatellc.com/index` (unusual — most sites use `/` not `/index`)
- `syncovatellc.com/organizational-diagnostic`
- `syncovatellc.com/coaching-and-advising`
- `syncovatellc.com/speaking--facilitation` (note the double dash — verify this is correct)
- `syncovatellc.com/about-dr-j`
- `syncovatellc.com/scotoma-spotter`

### LF10. POTENTIAL ISSUE: Nav Wordmark Links to `/index`
**File:** `index.html`, line 37
```html
<a href="https://syncovatellc.com/index" class="nav-wordmark">Syncovate</a>
```
Most sites link the wordmark to `/` not `/index`. Verify that `syncovatellc.com/index` resolves correctly and doesn't 404.

---

## Summary of Highest-Impact Fixes

1. **Fix Q3 scoring order** (Critical C1) — The drowning option scores lower than the outgrown option. This corrupts every tier calculation.
2. **Create the "5 Warning Signs" PDF or remove the dead download link** (Critical C3) — Inflection tier users click a link that goes nowhere.
3. **Fix velocity heroEmphasis for the inflection headline** (High H1) — The headline reads awkwardly for 25% of inflection-tier users.
4. **Trim greeting concatenation** (High H3) — Builder and transformation greetings can balloon to 100+ words before the first section.
5. **Suppress $750 upsell on early tier** (Medium M6) — Contradicts the "you don't need a diagnostic" positioning.
6. **Cap radar chart primary score** (Medium M11) — 95% from a 6-question quiz strains credibility.
7. **Add back navigation** (Medium M9) — Users who misclick are trapped.
8. **Add share/copy link for results URL** (Medium M10) — The shareable URL exists but is invisible to the user.
