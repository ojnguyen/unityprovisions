# Cross-Cutting Checklist — Accessibility & SEO Audit

Scope: the two checklist items I could audit thoroughly from the actual
component code and design tokens (no live/deployed site needed).
Responsive, performance, and cross-browser are addressed at the end —
they genuinely need a live browser/deployed URL, which isn't available
in this environment yet (Phase 6 hasn't happened).

**Accompanying files, provided as complete drop-in replacements:**
`Layout.astro` · `global.css` · `ContactForm.astro`

---

## 1. Accessibility — Color Contrast (full systematic pass)

Computed exact WCAG 2.1 contrast ratios for every real text/background
and non-text combination in the codebase, using the literal hex values
from `global.css`'s `@theme` block.

### Text contrast — all pass

| Combination | Ratio | Result |
|---|---|---|
| Body text on page (`text-primary`/`bg`) | 17.40:1 | AAA |
| Secondary text on page (`text-secondary`/`bg`) | 6.69:1 | AA |
| Heading text on sage band (`text-primary`/`surface`) | 15.45:1 | AAA |
| Secondary text on sage band (`text-secondary`/`surface`) | 5.94:1 | AA |
| Default link color (`primary`/`bg`) | 7.46:1 | AAA |
| Link hover (`primary-hover`/`bg`) | 10.81:1 | AAA |
| Link on sage band (`primary`/`surface`) | 6.62:1 | AA |
| Button primary text (`white`/`primary`) | 7.46:1 | AAA |
| Button primary hover (`white`/`primary-hover`) | 10.81:1 | AAA |
| Button accent text (`white`/`accent`) | 5.09:1 | AA |
| Button accent hover (`white`/`accent-hover`) | 8.18:1 | AAA |
| Button secondary text (`primary`/`bg`) | 7.46:1 | AAA |
| DonateBanner `h2` (`white`/`primary-hover`) | 10.81:1 | AAA |
| ContactForm error text (`error`/`surface`) | 4.99:1 | AA |
| Hero tagline, `text-white/80` on `primary` | 5.48:1 | AA |
| Hero subtext, `text-white/85` on `primary` | 5.94:1 | AA |
| DonateBanner subtext, `text-white/80` on `primary-hover` | 7.61:1 | AAA |

Every real text combination in the design system clears WCAG AA (most
clear AAA). The `--color-success` (`#2f7d4f`) token isn't used as text
anywhere in the current codebase, so it has nothing to verify yet — if
it's ever put to use, re-run this check for wherever it lands.

### Non-text contrast — one real gap

WCAG 1.4.11 requires interactive-element boundaries (like a text
input's outline) to hit 3:1 against their background, not just 4.5:1
for text.

| Combination | Ratio | Result |
|---|---|---|
| Hero secondary-CTA border, `border-white/70` on `primary` | 4.62:1 | OK |
| `--color-border` (`#d7e1d1`) vs `bg` (`#ffffff`) | 1.35:1 | **FAIL** |
| `--color-border` (`#d7e1d1`) vs `surface` (`#eef3ea`) | 1.20:1 | **FAIL** |

`--color-border` is used for `ContactForm`'s text-input/textarea
borders (`border border-border`). It's also worth noting those inputs
are `bg-surface` sitting inside a `Card` that's *also* `bg-surface` by
default — so the input's fill doesn't contrast against its container
either, compounding the problem. Right now these fields likely read as
nearly invisible outlines on a flat sage panel.

**Fix:** `--color-border` is fine as-is for decorative dividers (Card
edges, image frames — those aren't "interface components" under
1.4.11). Interactive boundaries need a separate, darker token. I tested
values in the same sage-gray family and found the minimum darkening
that clears 3:1 against *both* `bg` and `surface`:

| Candidate | vs `bg` | vs `surface` |
|---|---|---|
| `#d7e1d1` (current) | 1.35:1 | 1.20:1 |
| `#9ab090` | 2.34:1 | 2.07:1 |
| `#729266` | **3.49:1** | **3.10:1** |

Applied as a new `--color-border-interactive` token in `global.css`,
and used on `ContactForm.astro`'s inputs (also switched their
background from `bg-surface` to `bg-bg`, since they sit inside a
`bg-surface` Card and had no fill contrast against their own
container). Both files are provided in full alongside this doc — drop
them in as direct replacements.

### Everything else accessibility-related — already solid

Verified directly against the actual component code:
- **Alt text:** every image checked has real, descriptive alt text
  (founder photo, event photo, staff photos, partner logos use the org
  name) except the documented decorative exceptions (`alt=""` on
  Hero's background and `YouTubeEmbed`'s thumbnail, both nested inside
  an already-labeled control).
- **Form labels:** every `ContactForm` field has a real `<label for>`
  matching its input's `id`. Required fields use the native HTML
  `required` attribute (so screen readers announce it), not just a
  visual asterisk.
- **Icon-only controls have `aria-label`:** Navbar's mobile toggle,
  `YouTubeEmbed`'s play button, Footer's social icons.
- **`<a>`/`<button>` usage is consistent:** `Button.astro` renders an
  `<a>` when `href` is set and a `<button>` otherwise; nothing else in
  the codebase swaps them.
- **Heading hierarchy:** exactly one `<h1>` per page, confirmed across
  all six pages (each page-specific `*_Heading` component is the only
  one using `as="h1"`).
- **Focus indicator:** global `:focus-visible` (2px solid `primary`,
  2px offset) — clears 3:1 against every background it appears on.

### Not verifiable from code alone
Real keyboard/screen-reader walkthroughs of the disclosure patterns
(mobile nav, `ContactForm`'s collapse/expand), and 200%/400% zoom
reflow — the code looks correct (`aria-expanded`, focus management,
Escape-to-close) but this needs an actual assistive-tech pass once
there's a live or dev-server URL to test against.

---

## 2. SEO

| Item | Status |
|---|---|
| Title per page | ✅ every page passes an explicit `title` to `Layout` (Home uses `Layout`'s default, a reasonable choice for the homepage) |
| Meta description per page | ✅ same as above |
| Heading hierarchy | ✅ one `<h1>` per page (see accessibility section) |
| Alt text | ✅ see accessibility section |
| Sitemap | ✅ `@astrojs/sitemap` configured with `site: "https://unityprovisions.org"` in `astro.config.mjs` — sitemap.xml generates automatically at build time |
| OG tags | ✅ `Layout.astro` |
| Twitter Card | ✅ `Layout.astro` |
| Canonical URL | ✅ `Layout.astro` |

`Layout.astro` sets `og:type`/`og:site_name`/`og:url`/`og:title`/
`og:description`/`og:image`, the matching Twitter Card tags, and a
canonical `<link>` — all built from `Astro.site` and `Astro.url`, so
every page gets the correct values automatically with no per-page
setup. An optional `image` prop lets any page override its share image
later; it defaults to the real Hero photo, so every page gets a real
image in link previews immediately, without inventing a placeholder
asset.

**Optional, not part of the stated checklist scope, worth a mention:**
a `robots.txt` (currently none) and `NonprofitOrganization` JSON-LD
structured data would both be quick, low-risk SEO wins on top of this
— flagging for later, not fixing now since they weren't asked for.

---

## 3. Responsive, Performance, Cross-Browser — status

These three need a live browser against a real (or dev-server) URL,
which isn't available in this environment — the site hasn't reached
Phase 6 (Deployment) yet. What *was* checkable from code:

- **Responsive:** Tailwind breakpoint prefixes (`sm:`/`md:`/`lg:`) are
  used consistently and sensibly throughout every component reviewed
  — no hardcoded pixel widths or obviously-missing breakpoints found.
  Still needs an actual at-each-breakpoint visual pass once there's a
  URL to load.
- **Performance:** no anti-patterns found — Hero's image uses
  `loading="eager"` (correct, it's the LCP candidate) while everything
  else defaults to `loading="lazy"`; `YouTubeEmbed` is click-to-load
  (loads nothing from YouTube until clicked); the font is a single
  self-hosted variable-font file. A real Lighthouse run is still the
  right next step once the site is deployed or running on a dev
  server — the patterns already in place should score well.
- **Cross-browser:** not checkable without a live target at all.

---

## 4. Roadmap Status Update

§9's Cross-Cutting checklist, updated to reflect this pass:

- [x] Accessibility pass — contrast is now a full systematic check
      (this doc), not just ad hoc. One real gap found (input border
      contrast) with a fix above — apply it, then this item is fully
      closed.
- [x] SEO — title/description/heading-hierarchy/alt-text/sitemap all
      confirmed. OG tags + canonical URL were missing — fix above.
      Apply it, then this item is fully closed.
- [ ] Responsive check — still needs a live/dev-server visual pass.
- [ ] Performance check — still needs a live/dev-server Lighthouse run.
- [ ] Cross-browser spot check — still needs a live/dev-server target.
- [ ] Comment cleanup — still blocked on a style example from you.