# Syncovate Website v2 — GHL Build Kit

Everything needed to rebuild syncovatellc.com as five GoHighLevel pages: Home, How I Work, Writing, About, Contact.

## What's in here

```
blocks/          23 HTML fragments — the copy, grouped by page and section, in build order
paste/           5 paste boards (generated) — one scrollable file per page, fragments + native-element notes
assets/          Site-wide CSS, JSON-LD schema, and the 301 redirect map
scripts/         The generator that builds paste/ from blocks/
BLOCK-MAP.md     Page-by-page assembly guide — what order, what's native, what's a placeholder
```

## How to build a page

1. Open `BLOCK-MAP.md` and find the page.
2. Working top to bottom, either:
   - Open each file under `blocks/<page>/` and paste its contents into a GHL "Custom Code / HTML" element, **or**
   - Open `paste/<page>.md` and work straight down that one file — same content, already in order.
3. Wherever a fragment has an HTML comment starting `<!-- GHL NATIVE: ... -->`, that's not part of the page copy — it's telling you to add a native GHL element (button, image, product/price card, form, or blog feed) right there, with the label/URL/price it names. Native elements never live inside the fragment HTML.
4. Paste `assets/01-custom-css.css` into Site Settings → Custom CSS (site-wide).
5. Paste the site-wide block from `assets/02-schema-jsonld.html` into Site Settings → Header Tracking Code, and each page's page-specific block into that page's own header code, per `BLOCK-MAP.md`.
6. Set up the redirects in `assets/03-redirects.md` before unpublishing the old pages.

## Rules the fragments follow

- Copy is verbatim from the source copy doc — never rewritten or tightened.
- No `<style>`, `<script>`, or `<iframe>` inside any fragment. Markup and text only.
- Buttons, images, forms, blog feeds, and price/product cards are all GHL native elements, called out with comments — never hardcoded HTML.
- One booking link everywhere "Let's Talk" appears: `https://link.syncovatellc.com/widget/booking/29K6RwPvCIc2xOxgUVKo`.
- One public phone number everywhere: (269) 293-4442. The 574 number is private and never appears here.
- Two placeholders are still open — see "Placeholder URLs" in `BLOCK-MAP.md`. Everything else, including the Trusted Advisor "Start Now" checkout link, is live.

## Regenerating the paste boards

`paste/*.md` is generated output — never hand-edit it. If you change anything under `blocks/`, regenerate:

```
python3 scripts/build-paste-boards.py
```

This rewrites all five files in `paste/` from the current contents of `blocks/`.
