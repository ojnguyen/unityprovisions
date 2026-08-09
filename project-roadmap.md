# Unity Provisions Website — Master Roadmap

The single source of truth for this project. A new session should be
able to read this file top to bottom and continue development without
any other context. **Keep it that way, and keep it concise** — facts
and current decisions, not narrative history (see §2).

---

## 1. Project Overview

Unity Provisions: a student-led nonprofit fighting food insecurity
("Students Ending Hunger"), 35+ branches, 8 countries. Rebuilding their
site with Astro + TypeScript + Tailwind — clean, modern, maintainable,
presenting the org's real mission/story/content through a simple
information architecture.

Six pages: **Home, About, Team, Projects, Get Involved, Donate**. No
accounts or authentication anywhere — every page is public.
Participation and giving happen via clearly labeled external links
(Google Forms, Zeffy), not in-house flows.

---

## 2. How to Resume This Project

**Current phase:** Phase 5 — Build Pages. Phase 4 (Shared
Infrastructure) is complete.

**Status source of truth:** §5's file tree (✅ Built / 📋 Planned
markers). Trust that over any summary, including this one, if they ever
disagree.

**Continue here:** Phase 5, Step 3 (Team) — About (`about.astro`) is
fully assembled and complete (§9), including a visual-polish pass this
session (icon badge on "Meet the Team" CTA, asymmetric heading padding
on the two data-intro blocks — §6/§11). Team needs: `StaffCard` (single
member card — photo, name, role, optional email), `StaffGrid` (lays
out an array of them), real data in `staff.ts` (roster already
captured in §7's Domain Composites section), then assemble
`team.astro`. No visual-polish precedent to match yet the way About
had Home's — this is the first "fuller" page built from scratch
rather than reusing Home sections, so expect more original component
work here than About needed.

**Keep this document concise.** One line per fact. A "why" only when it
prevents a future mistake (e.g. "not `type=reset` — X would break Y"),
kept to a sentence, not a paragraph — condense a "why" to one line,
don't delete it outright; there's a real difference between trimming
narration ("this session we...") and cutting a fact or a rationale.
No multi-paragraph justifications or blow-by-blow decision history —
only the current, final state and the short reason for it. If an entry
is getting long when you go to edit it, cut the *narration* down before
adding to it — not the facts.

**Per-component process:**
1. Confirm it deserves its own file — genuinely reused, or genuinely
   isolates a real concern, never by default. Check: does the live site
   (unityprovisions.org) have this, and where? Does this project's own
   data/components already cover the need? Neither answer is a mandate
   — this is a remake, not a clone (§3) — but both inform the call.
2. Explain what it is and why it earns its own file, before writing code.
3. Build it.
4. Explain the resulting code in depth (reader isn't fluent in
   Astro/TypeScript/Tailwind).
5. Update all four tracking spots in the same reply: §5 tree marker,
   §7 status tag, §9 checkbox, §2 "Continue here" line. Keep the new §7
   entry concise per the rule above.

---

## 3. Goals and Design Principles

- Real content, not a template: preserve Unity Provisions' actual
  mission, voice, branding, numbers, partners, story. "Preserve" means
  the substance — not a verbatim transcript of the live site's wording.
- No accounts or authentication anywhere. Every page public.
- Fewer, stronger pages over many thin ones.
- Every page has a clear purpose in the visitor's journey.
- Key content (impact numbers, mission, ways to help) visible
  immediately, not buried in paragraphs.
- Participation (volunteering, branch founding, mailing list) = external
  CTAs, not in-house flows.
- A component exists only if genuinely reused or genuinely isolates a
  real concern — and only if the need isn't already covered by something
  else on this site (see `EmailSignup`'s removal, §7).
- Accessible, performant, responsive, SEO-sound from the start.
- **Remake, not a clone.** unityprovisions.org is a reference for real
  facts, voice, and structure — not a target to reproduce exactly, and
  **not a color reference at all** (explicit direction, this overrides
  the general rule below for color specifically — see §6). Rewrite
  unclear or rough copy; restyle, reorganize, merge, or drop sections
  that don't serve the visitor as well as they could; don't replicate
  something "free" on the live site's page-builder (a bundled widget, a
  duplicate CTA) if it costs real engineering here for no real benefit.
  Every such change gets documented in §7, not made silently.

---

## 4. Technology Stack

- Astro (latest stable) + TypeScript strict mode.
- Tailwind CSS v4, CSS-first (`@theme` in `global.css`; no
  `tailwind.config.mjs`; `@tailwindcss/vite` in `astro.config.mjs`).
- Integrations: `sitemap()`, `mdx()`, `astro-icon()`. Icons: Lucide +
  Simple Icons via astro-icon — now used across most Home sections, not
  just Navbar/Footer (§7).
- Path aliases (`tsconfig.json`): `@components/*`, `@layouts/*`,
  `@styles/*`, `@data/*`, `@utils/*`, `@assets/*`, `@/types`. No
  `baseUrl` (deprecated TS 6.0) — every alias has its own `./src/...`
  prefix. No `@content/*` alias (never needed).
- No CSS-in-JS, no component library. `cn()` = zero-dependency class
  joiner; add `tailwind-merge` only if a real class-conflict-resolution
  need comes up.
- **Live data:** `ImpactStats` live-updates 2 of its 4 stats from a
  public Google Sheet via `gviz/tq` (JSONP `<script>`, not `fetch()` —
  gviz blocks CORS). Keeps the site fully static — no SSR, no API keys.
  Details in §7 (ImpactStats) and §10.

---

## 5. Project Architecture

```
src/
├── assets/
│   ├── hero_image.jpg             — Hero's background photo (in use, index.astro)
│   ├── ryan_nguyen.webp           — Founder photo (in use, about.astro)
│   ├── sodexo.jpg                 — Sodexo logo (in use, partners.ts)
│   ├── ymca.jpg                   — Generic YMCA logo (in use, partners.ts — shared by Wang YMCA, Mystic Valley YMCA, and YMCA)
│   ├── food4philly.jpg            — Food4Philly logo (in use, partners.ts)
│   ├── esther_r_sanger_center.jpg — Esther R. Sanger Center logo (in use, partners.ts)
│   ├── walmart.jpg                — Walmart Spark Good logo (in use, partners.ts)
│   ├── google.jpg                 — Google logo (in use, partners.ts)
│   ├── team/                      — 8 headshots for Team (not yet supplied — may overlap with ryan_nguyen.webp above, tbd)
│   ├── projects/                  — Relief Route / AgriScan imagery (not yet supplied)
│   └── donate/                    — QR code image (not yet supplied)
│
├── components/
│   ├── ui/
│   │   ├── Button.astro                ✅ built
│   │   ├── SectionHeading.astro        ✅ built
│   │   ├── Card.astro                  ✅ built
│   │   ├── ResponsiveImage.astro       ✅ built
│   │   ├── Container.astro             ✅ built
│   │   └── ExternalLinkCTA.astro       ✅ built
│   │
│   ├── layout/
│   │   ├── Navbar.astro                ✅ built
│   │   └── Footer.astro                ✅ built
│   │
│   ├── sections/
│   │   ├── Hero.astro                  ✅ built — Home
│   │   ├── ImpactStats.astro           ✅ built — Home, About
│   │   ├── MissionStatement.astro      ✅ built — Home
│   │   ├── YouTubeEmbed.astro          ✅ built — Home
│   │   ├── PartnersAndSupporters.astro ✅ built — Home, About
│   │   ├── GetInvolvedTeaser.astro     ✅ built — Home
│   │   ├── ContactForm.astro           ✅ built — Home
│   │   └── DonateBanner.astro          ✅ built — Home
│   │
│   ├── staff/
│   │   ├── StaffCard.astro             📋 planned
│   │   └── StaffGrid.astro             📋 planned
│   │
│   ├── projects/
│   │   └── ProjectSection.astro        📋 planned — used twice
│   │
│   └── donate/
│       ├── QRCodeDonate.astro          📋 planned
│       └── DocumentEmbed.astro         📋 planned
│
├── data/
│   ├── navigation.ts                   ✅ built — 6-item nav + orgName
│   ├── footer.ts                       ✅ built
│   ├── staff.ts                        📋 planned
│   ├── stats.ts                        ✅ built
│   ├── partners.ts                     ✅ built
│   └── projects.ts                     📋 planned
│
├── layouts/
│   └── Layout.astro                    ✅ built
│
├── pages/
│   ├── index.astro                     ✅ built — Home
│   ├── about.astro                     ✅ built — About
│   ├── team.astro                      📋 planned
│   ├── projects.astro                  📋 planned
│   ├── get-involved.astro              📋 planned
│   └── donate.astro                    📋 planned
│
├── styles/
│   └── global.css                      ✅ built
│
├── utils/
│   └── cn.ts                           ✅ built
│
└── types.ts                            ✅ built
```

**Note:** `EmailSignup.astro` was built, then removed (§7), and its
deletion from the repo has been confirmed — no further action needed;
don't recreate it without re-reading that entry first.

---

## 6. Design System

### Color
Defined once in `global.css`'s `@theme` block; Tailwind auto-generates
matching utilities.

| Token | Value | Note |
|---|---|---|
| `--color-bg` | `#ffffff` | Page base. Fully redesigned, deliberately independent of the live site (explicit direction, §3) |
| `--color-surface` | `#eef3ea` | Soft sage tint — alternating section bands, Navbar/Footer, Card |
| `--color-text-primary` | `#1a1a1a` | |
| `--color-text-secondary` | `#5c5c5c` | |
| `--color-primary` | `#355e3b` | Deep forest green, ~7:1 contrast with white text |
| `--color-primary-hover` | `#26442a` | |
| `--color-accent` | `#a8592b` | Deep terracotta, ~5:1 contrast with white text — original ochre (#c47a3d) failed WCAG AA |
| `--color-accent-hover` | `#79401f` | Added for button-hover consistency (§7 Button) — same ~28% darken ratio as primary→primary-hover; ~8:1 with white text |
| `--color-border` | `#d7e1d1` | Sage-gray, matches the new surface tone |
| `--color-success` | `#2f7d4f` | Unreviewed |
| `--color-error` | `#b3413b` | Unreviewed |

All 🔶 placeholder in the sense of "not pulled from a real brand
guide" — but no longer pending a live-site swap-in. The palette is a
deliberate, independent design decision; unityprovisions.org is out of
scope as a color reference (§3).

### Typography
`--font-display` / `--font-body`: both `system-ui`, pending real
font-family values.

| Token | Size | Use |
|---|---|---|
| `--text-xs` | 12px | captions |
| `--text-sm` | 14px | meta, labels |
| `--text-base` | 16px | body |
| `--text-lg` | 18px | lead paragraphs |
| `--text-xl` | 24px | h3 |
| `--text-2xl` | 32px | h2 |
| `--text-3xl` | 44px | h1 / hero |

**Gotcha:** this scale only defines up through `--text-3xl`. Tailwind's
`text-4xl`/`5xl`/`6xl` utilities still exist but fall back to Tailwind's
*un-customized* defaults (36px/48px/60px) — `text-4xl` (36px) is
actually smaller than this system's `text-3xl` (44px). Hero briefly had
`md:text-4xl` on its `<h1>`, which silently shrank the headline on
desktop; fixed by just using `text-3xl` alone. Watch for this any time
a component reaches for `text-4xl` or above.

### Spacing & Breakpoints
Tailwind defaults (`sm:640px md:768px lg:1024px xl:1280px`), no
overrides. Content max-width: `max-w-[90rem]` (1440px) — see
`Container.astro` (§7).

### Radius & Shadow
`--radius-sm` (4px, inputs/small buttons) · `--radius-md` (8px, cards) ·
`--radius-lg` (16px, hero/banner imagery). `--shadow-sm/md/lg` for
elevation.

### Component Style Conventions
- Buttons: primary (solid), secondary (outline), accent (solid, distinct
  color) — 150ms ease hover.
- Cards: surface background, `radius-md`, `shadow-sm`, 1.5rem padding.
- Forms: surface-background inputs, 1px border, `radius-sm`,
  primary-colored focus ring, labels always above fields.
- **Section backgrounds:** `--color-bg` (white) is the page's default
  surface; sections alternate with full-bleed `bg-surface` (sage) bands
  for rhythm. Pattern: wrap `<Container>` in a plain background `<div>`
  (established by `DonateBanner`, also used by `Hero`, `ImpactStats`,
  `PartnersAndSupporters`, and `Navbar`'s `<header>`). Use
  `Container`'s `as="section"` only when no distinct full-bleed
  background is needed — when one is, the background lives on the
  wrapping `<div>`, not `Container` itself. A heading-only block that
  exists purely to introduce one of these bands uses asymmetric
  top/bottom padding to visually attach to it, rather than the usual
  symmetric spacing — see §11.
- **A light-colored control on a dark/photo background** (Hero's
  secondary CTA) is written by hand rather than reusing `Button`'s
  `secondary` variant, which assumes a light page background
  (border-primary/text-primary) and would be invisible on a photo.
- **Decorative icons** (Iconify, via `astro-icon`) give plain
  heading+text blocks some visual weight without needing real
  photography — see ImpactStats, MissionStatement, GetInvolvedTeaser,
  PartnersAndSupporters, ContactForm in §7, and About's "Meet the
  Team" CTA. All are optional props / additive — a section renders
  fine with no icon supplied. See §11 for which section *shapes*
  actually earn a badge — this spans every page, not just Home.

### Accessibility
- `:focus-visible` only — `2px solid var(--color-primary)`, 2px offset,
  applied globally.
- Exactly one `<h1>` per page.
- Real `alt` text on every image — except a decorative image nested
  inside an already-labeled control (e.g. `YouTubeEmbed`'s thumbnail,
  Hero's background photo — both `alt=""`). Narrow exception, not a
  general pass to leave alt text empty elsewhere. All decorative icons:
  `aria-hidden`.
- Every form input has a real `<label>`.
- Icon-only links/buttons: `aria-label`.
- `<a>`/`<button>` never substituted for each other.
- Mobile nav: full keyboard operability, correct focus management.
- Viewport meta includes `initial-scale=1` (`Layout.astro`) — required
  for `md:` breakpoints to behave correctly on real phones.
- Color contrast checked ad hoc during palette-revision sessions (text/
  button colors against their real backgrounds, §6 table) — not yet a
  full systematic pass; still on the Cross-Cutting checklist (§9).

---

## 7. Component Library

Status: ✅ Built · 📋 Planned

### UI Primitives — `src/components/ui/`

**Button** — ✅ Built
- Single styled clickable element site-wide. Off-site links use
  `ExternalLinkCTA` instead. Not used for Hero's secondary CTA — see
  §6's note on light controls on dark backgrounds.
- Props: `variant?: 'primary'|'secondary'|'accent'` (primary) ·
  `size?: 'sm'|'md'|'lg'` (md) · `href?` · `type?: 'button'|'submit'`
  (button) · `target?` · `rel?` (last two only apply on the `<a>`
  branch, added for `ExternalLinkCTA`).
- `<a>` if `href` set, else `<button>`.
- No `type="reset"` or `id` prop. Components needing to target a
  specific instance use `querySelector` workarounds instead (see
  ContactForm).

**SectionHeading** — ✅ Built
- Section-intro block: optional eyebrow, required title, optional
  subtext.
- Props: `as?: 'h1'|'h2'|'h3'` (h2) · `eyebrow?` · `title` (required) ·
  `subtext?` · `align?: 'left'|'center'` (left).
- Text colors are hardcoded (`text-text-primary`/`text-text-secondary`),
  not overridable — components on colored backgrounds (`Hero`,
  `DonateBanner`) write custom heading markup instead.

**Card** — ✅ Built
- Bounded surface: `rounded-md shadow-sm` + padding + background.
- Props: `padding?: 'sm'|'md'|'lg'` (md) · `bg?: 'surface'|'bg'`
  (surface) — `surface` (pale sage) suits a card sitting on the page's
  default white background; `bg` (white) suits a card sitting inside
  an already-`bg-surface` full-bleed band, where the default would
  blend in and lose all contrast.
- No `class` pass-through — wrap in an outer `<div>` for width
  constraints (see ContactForm).
- Used by `ContactForm` (default `bg="surface"`, renders pale sage) and
  `PartnersAndSupporters`'s "fuller" org-card grid (`bg="bg"`, since
  that section already sits on its own `bg-surface` band).

**ResponsiveImage** — ✅ Built
- Wraps `astro:assets`'s `<Image />` with design tokens.
- Props: `src` · `alt` (required) · `width` · `height` · `radius?` (md) ·
  `loading?` (lazy).

**Container** — ✅ Built
- Max-width + horizontal-padding wrapper.
- Props: `as?: keyof HTMLElementTagNameMap` (div) · `maxWidth?`
  (`max-w-[90rem]`).
- No `id` prop — components needing a scroll anchor wrap `Container` in
  their own `<div id="...">` instead (see `YouTubeEmbed`). See §6 for
  the full-bleed-background wrapping pattern.

**ExternalLinkCTA** — ✅ Built
- Standalone, prominent off-site CTA. Wraps `Button` with
  `target="_blank" rel="noopener noreferrer"` hardcoded.
- Props: `ExternalLink` type — `label`, `href`, `icon?`.
- Reserved for isolated CTAs, not dense link rows (`Footer` uses plain
  `<a>` for those).
- If a "join our email list" prompt is ever wanted again (see
  `EmailSignup` below): one `<ExternalLinkCTA>` pointed at
  `contactListFormUrl`, inline — not a new component.

### Layout — `src/components/layout/`

**Navbar** — ✅ Built
- Persistent nav (not scroll-sticky). Data: `navigation.ts` (6 items) +
  `orgName`.
- Separate desktop `<ul>` (CSS breakpoint) and mobile `<ul>` (`hidden`
  attribute, JS-toggled) — combining them breaks the JS toggle (a class
  always wins the cascade over a JS-toggled `hidden` attribute).
- Mobile menu: disclosure pattern — `aria-expanded`/`aria-controls`,
  focus to first link on open, Escape closes + returns focus.
- Donate renders as an accent `Button`, not a plain link. No
  `aria-current` support on `Button`, so it doesn't get active-page
  styling on `/donate` — accepted, minor.
- No "Email List" nav item (live site has one) — reachable via Footer
  only (see `EmailSignup` below).
- `bg-surface` now renders pale sage instead of white — no code change,
  just the token update (§6).

**Footer** — ✅ Built
- Data: `footer.ts` — nav links, Email List/Linktree external links,
  social icons, phone, copyright.
- Plain `<a>` tags, not `ExternalLinkCTA` (too heavy for a dense link
  row).
- Copyright year: `new Date().getFullYear()` at build time.
- `bg-surface` now renders pale sage — same note as Navbar.

### Root Layout — `src/layouts/`

**Layout** — ✅ Built
- Base HTML shell; mounts `Navbar` / `<slot />` / `Footer` once.
- Props: `title?` ("Unity Provisions") · `description?` ("Creating
  opportunities and building stronger communities.").
- Viewport meta includes `initial-scale=1`.

### Page Sections — `src/components/sections/`

**Hero** — ✅ Built
- Home's opening `<h1>` section.
- Props: `headline` · `tagline` · `ctaLabel` · `ctaHref` (all required)
  · `subtext?` · `secondaryCtaLabel?`/`secondaryCtaHref?` (must be
  supplied together) · `backgroundImage?: ImageMetadata` (now in use
  with a real photo: `src/assets/hero_image.jpg`).
- Full-bleed photo (or gradient fallback) behind centered white text +
  a primary/ghost button pair. Overlay uses a CSS `mask-image`
  (`mask-y-from-accent` utility class) — the deliberate final choice
  for Hero's photo-legibility treatment, not the gradient-overlay
  `<div>` pattern (§11).
- No scroll-cue arrow (removed — read as distracting).
- `<h1>` uses `text-3xl` only, no `md:` override — see §6's Typography
  gotcha (a previous `md:text-4xl` was silently shrinking it).
- Still no `SectionHeading` (needs custom white-text styling on a
  colored/photo background, same reasoning as `DonateBanner`).
- Real copy: trimmed to one clear kicker + one short headline + one
  supporting line (previously three overlapping messages) — see
  `index.astro`.

**ImpactStats** — ✅ Built (🔶 live data pending — see §10)
- Stat grid; 2 of 4 stats live-sourced from a public Google Sheet.
- Props: `stats: Stat[]`.
- Full-bleed `bg-surface` band (`border-y border-border`) for contrast
  against `--color-bg`. Each stat now renders its optional `icon`
  (Iconify name from `stats.ts`) above the value.
- No heading prop — renders bare on Home; About wraps it in its own
  centered `SectionHeading` ("Numbers So Far") — the "fuller" version
  §8 calls for. That heading block uses asymmetric top/bottom padding
  (`pt-12 pb-4 md:pt-16 md:pb-6`, not the usual symmetric `py-*`) so it
  reads as introducing the sage stats band directly below it, rather
  than floating equidistant between it and the section above — see §11.
- Home and About each independently live-fetch the same sheet — no
  shared state across pages (this is a static multi-page site, so
  nothing persists across a full page navigation). Numbers match in
  practice, since both hit the same source with identical logic;
  deliberately kept simple over adding a caching layer (decided).
- Live sheet: ID `14C4v_A39CNRhI9oQ-i7GHagwggTS3jptgRGuu5UD6_w`, gid
  `638911803`, range `B1:C6` (must stay scoped to the summary block —
  widening it into the donation log below breaks Google's column-type
  inference). Matches exact label text `"Total (lbs)"` /
  `"Money Collected ($)"` in column B. Falls back to `stats.ts` +
  `console.warn` if unreachable/unshared.
- Blocker: sheet needs "Anyone with the link – Viewer" sharing.
- Live homepage (checked) reports 6,180+ lbs / $21,376+ / 35+ branches /
  8 countries — ahead of `stats.ts`'s fallback; not manually updated,
  since the sheet is the intended source of truth.

**MissionStatement** — ✅ Built
- Props: `heading` · `body` (both required) · `icon?` (new — optional
  circular icon badge above the heading)
- Centered, uses `SectionHeading` (unlike Hero — no exclusion here).
- Real copy: see `index.astro` — verified word-for-word against the
  live site's "Our Mission" section, exact match.

**YouTubeEmbed** — ✅ Built
- Click-to-load facade (thumbnail + button) → real `<iframe>`
  (`youtube-nocookie.com`) only on click. Deliberate improvement over
  the live site's eager iframe.
- Props: `videoId` · `title` (both required).
- Wrapped in `<div id="watch-our-story">` — the scroll target for
  Hero's secondary CTA. Added to a wrapping `<div>` rather than giving
  `Container` an `id` prop, to keep `Container`'s API generic.
- Thumbnail `alt=""` (decorative, inside a labeled button — §6's
  exception).
- Real copy: see `index.astro` (videoId pulled from the live site's
  embedded player).

**PartnersAndSupporters** — ✅ Built
- Props: `partners: Partner[]` · `partnersIntro?` · `supportersIntro?`
  (both new — framing paragraphs for the "Partners"/"Supporters"
  groups respectively).
- Groups into Partners/Supporters (no `type` = partner by default);
  badge, or `<img>` once a `logo` path is set (none supplied yet).
- Full-bleed `bg-surface` band, same as `ImpactStats`.
- Two display modes per group, chosen by whether that group's intro
  prop is supplied — not a separate boolean. **Brief** (Home, no
  intro) — the original compact badge row, each with a small
  `lucide:building-2` icon. **Fuller** (About, intro supplied) — the
  intro paragraph plus a grid of `Card` primitives (`bg="bg"`, since
  `Card`'s own default `bg-surface` would otherwise blend into this
  section's own `bg-surface` band and lose all contrast — see `Card`'s
  `bg` prop above).
- No standalone heading prop for the whole section — same brief (Home)
  / fuller (About, its own external `SectionHeading`) pattern as
  ImpactStats. About's "Who Helps Make This Possible" heading uses the
  same asymmetric-padding treatment as its "Numbers So Far" heading
  above — see ImpactStats entry and §11.
- Verified against live site: partner/supporter lists match
  `partners.ts`. About's intro copy is original framing about what
  partners/grants generally provide — not specific claims about any
  named organization; a real per-org photo + paragraph (what the live
  site actually does) is still blocked on real assets/copy (§10).
- `Partner.logo` (types.ts) accepts a local `src/assets/...` import
  (`ImageMetadata`) or a plain string — a `resolveLogoSrc()` helper in
  this component normalizes either to a plain `src` before rendering.
  Real logos are now in place for every org except Stephen J. Brady
  Stop Hunger, which still renders as a text badge/icon until one is
  supplied. The three YMCA-affiliated entries share one generic `ymca`
  logo file.

**GetInvolvedTeaser** — ✅ Built
- Props: `heading` · `subtext` · `ctaLabel` (all required) · `icon?`
  (new — same badge pattern as `MissionStatement`, kept inline rather
  than extracted to a shared component; too small to earn its own
  file, §3). `href="/get-involved"` hardcoded, not a prop.
- `variant="primary"` (not `accent` — accent reserved for donate asks).
- Doesn't exist on the live site as-is (deliberate rebuild choice); its
  destination is a full page of context, which is why it earns its own
  file, unlike `EmailSignup`.
- Real copy: see `index.astro`.

**ContactForm** — ✅ Built
- Props: `heading` · `subtext?`.
- Fields: Name\* · Email\* · Message\* (textarea) · "Where did you hear
  about us?" (optional text) · reCAPTCHA placeholder · Send.
- No file attachment — removed. A public contact form has little real
  need for one, and an open upload endpoint is a real spam/malware
  surface; a Google Form or direct email is the safer path if a real
  need ever comes up.
- Collapsed by default behind a "Drop Us a Line!" button (matches live
  site), revealing a `Card`-wrapped panel (now pale sage, §6). Same
  disclosure pattern as `Navbar` (`aria-expanded`/`aria-controls`,
  focus management, Escape). **Cancel** closes the panel and resets the
  fields — this is closing an optional panel, not resetting an
  always-visible form (the latter is the real anti-pattern; this isn't
  that).
- Trigger/Cancel buttons found via `querySelector` (a wrapping div's id
  / `button[type="button"]`), not a `Button` `id` prop (unsupported).
- Email link now has a small `lucide:mail` icon next to it.
- Real copy: see `index.astro`.
- Open: submission backend (Formspree vs. Cloudflare Function) — markup
  and validation complete, no handler wired; reCAPTCHA is a placeholder
  pending the same decision.

**~~EmailSignup~~** — Built, then removed
- Was a native mailing-list signup form. Removed: its destination
  (`contactListFormUrl`, a Google Form) already has 2 working entry
  points — the Footer link, and Get Involved's Volunteer CTA (same URL)
  — so a native version meant building/maintaining a real backend to
  re-solve an already-solved problem, and would have directly duplicated
  the Volunteer CTA on the same page.
- If wanted again: one `ExternalLinkCTA` pointed at `contactListFormUrl`,
  inline — not a new component.

**DonateBanner** — ✅ Built
- Props: `heading` · `subtext` · `ctaLabel` (all required).
  `href="/donate"` hardcoded.
- Full-bleed `bg-primary-hover` band (not `bg-primary` — matches the
  global focus-ring color, which would make the ring invisible against
  a same-color background) + custom white `<h2>`/`<p>` (not
  `SectionHeading` — can't override its text color).
- Source of the full-bleed-band pattern, and of the "hand-write a light
  control instead of reusing `Button`'s `secondary` variant" pattern
  `Hero` also uses.
- Home only, not the Donate page — `QRCodeDonate` already covers that
  page fully; a second identical CTA there would be redundant.
- Not a floating/sitewide widget (live site's is) — no floating-UI
  pattern exists in this codebase, and it would read as pushy across
  every page for a young nonprofit still building trust.
- Serves a different purpose than Hero/Navbar's donate CTAs: a second
  ask, positioned deliberately after a full read-through, once the
  earlier CTAs are scrolled out of view — not a redundant duplicate.
- Real copy: see `index.astro`.

### Page-Specific Content (not componentized)

Content that lives directly in a page file rather than as its own
component — used exactly once, doesn't isolate a reusable concern
(§2 process, step 1). Listed here so a future session doesn't
re-litigate the "deserves its own file?" question from scratch.

**About's founder story** — built in `about.astro`. `Container` +
`SectionHeading` (`as="h1"`, eyebrow "Our Story", title "Is There
Dinner?") + a photo/prose layout (`ResponsiveImage` + `max-w-3xl`
prose column), side-by-side from `md:` up, stacked on mobile. Real
copy: §8, split into paragraphs for readability — the pounds/dollar
figures are deliberately vague ("thousands of pounds... thousands of
dollars"), with a line pointing to the `ImpactStats` numbers rendered
further down this same page, instead of a hardcoded or synced number.
A build-time-derived version and a fully live-synced version (via a
broadcast event from `ImpactStats`) were both built and reverted —
too much machinery for one sentence; don't re-attempt without
checking here first. Founder photo: `src/assets/ryan_nguyen.webp`,
sized 400×500 pending a look at the real crop.

**About's "Meet the Team" CTA** — built in `about.astro`, closing
section: icon badge (`lucide:users`, same visual treatment as
MissionStatement/GetInvolvedTeaser — see §11) + `SectionHeading` +
one primary `Button` to `/team`. Added this session for consistency
with its closest structural sibling (bare heading + subtext + single
button, no other visual anchor) — see §11 for the underlying rule.

### Domain Composites

**StaffCard / StaffGrid** — 📋 Planned
- Team member card / grid. Props: `StaffCard { photo, name, role,
  email? }`; `StaffGrid`: array of entries.
- Data (`staff.ts`): Ryan Nguyen (Founder & CEO) · Alex Jamkatel (Chief
  Technology Officer) · Vivian Pan (Branch Operations Director) · Louis
  Dang (Executive Secretary) · Wendy Jamsri (Project Mentor & YMCA
  Regional Teen Director) · Alexander Lee (Chief Marketing Officer) ·
  Ananya Bhat (Director of Development) · Aditi Jaiswal (Director of
  People and Culture). Emails: `firstname.lastname@unityprovisions.org`
  (Wendy: `wjamsri@ymcaboston.org`).

**ProjectSection** — 📋 Planned
- Heading + description + optional CTA, used twice. Props: `title`,
  `description`, `ctaLabel?`/`ctaHref?` (from `projects.ts`).
- Relief Route: interactive map for donation centers/food banks; CTA
  "Add Centers Near You" (external).
- AgriScan: low-cost crop-optimization console for small farms/gardens/
  developing regions; no CTA yet.

**QRCodeDonate** — 📋 Planned
- The actual giving mechanism: QR code + Zeffy fallback link, both
  resolving to the same destination. Primary content of the Donate
  page's "Give" section.

**DocumentEmbed** — 📋 Planned
- "Track Our Impact" section of the Donate page — the Donation Tracker
  widget. Confirmed to exist; final shape (full embed vs. static
  transparency statement) pending visual inspection.

---

## 8. Page Structure

### Home (`/`) — ✅ Built
Concise landing page: who Unity Provisions is + paths to every other
page.
Order: Hero → ImpactStats → MissionStatement → YouTubeEmbed →
PartnersAndSupporters (brief) → GetInvolvedTeaser → ContactForm →
DonateBanner.

### About (`/about`)
The organization's full story.
Order: founder story → ImpactStats (fuller) → PartnersAndSupporters
(fuller) → Annual Report CTA (external link via `ExternalLinkCTA` or embedded PDF — decision + reasoning in §10) → link to Team.

Founder story (real copy; pounds/dollar figures deliberately kept
vague — "thousands" — with a pointer to the numbers below, rather than
a hardcoded or synced figure — see §7): "Unity Provisions began with a
simple but
painful question: 'Is there dinner?' Growing up, our founder Ryan knew
the silence of nights when food was uncertain. Later, while volunteering
at a local food pantry, he saw firsthand how hunger hides behind quiet
sacrifices—a mother choosing between diapers and oatmeal, neighbors
masking need with a smile. When that pantry abruptly shut down in 2024,
Ryan realized how fragile food programs could be. He founded Unity
Provisions to build something that couldn't disappear overnight. What
started with a single branch at Boston Latin School has grown into a
youth-led network of over 35 branches across multiple countries.
Together, student leaders have collected thousands of pounds of food
and clothing, raised thousands of dollars, and built partnerships with
organizations like the Wang YMCA to sustain community-based donation
centers — see the current numbers below. Our mission is to empower
young people to fight hunger by creating and leading donation centers
in their schools and communities."

### Team (`/team`)
StaffGrid of 8 real members (§7).

### Projects (`/projects`)
Two `ProjectSection`s — Relief Route, then AgriScan (§7).

### Get Involved (`/get-involved`)
"The single, clear answer to how do I participate."
Order: Branch Founder content → Volunteer CTA (external).

Branch Founder content (real copy): intro "Turn your passion into
impact"; support list — getting approval from your school or community,
guidance for planning and running events, access to reimbursements
through the YMCA partnership, ready-to-use promotional materials and
planning tools, opportunities for funding to grow your ideas; a "global
network" paragraph (35+ branches across 6 countries); CTA "Apply" →
`https://forms.gle/qfwhsPP61RrAd1cW7`.
Volunteer CTA → `https://forms.gle/7JFDkKPdzYv1LfCP6` (same form as the
Footer's Email List link) — whether the "Volunteer" framing still fits
is an open question (§10).

### Donate (`/donate`)
Giving + transparency in one place.
1. **Give** — `QRCodeDonate`: pitch + QR code + Zeffy link
   (`https://www.zeffy.com/fundraising/ending-hunger-through-youth-leadership`).
   Fully specified.
2. **Track Our Impact** — `DocumentEmbed`: Donation Tracker widget.
   🔶 Final shape pending visual inspection.

---

## 9. Implementation Phases

### Phase 4 — Shared Infrastructure (complete)
- [x] Design Tokens
- [~] Global Styles & Fonts (base styles shipped; real font-family
      pending; palette fully redesigned across several sessions, still
      🔶 as a deliberate design choice, not a live-site match — §6)
- [x] Utility Helpers
- [x] UI Primitives: Button, SectionHeading, Card, ResponsiveImage,
      Container, ExternalLinkCTA
- [x] Navigation & Footer Data
- [x] Navbar & Footer Components
- [x] Layout.astro

### Phase 5 — Build Pages (current)
- [x] **1. Home** (`index.astro`) — fully built and assembled; several
      visual-polish rounds since (palette, container width, section
      banding, Hero content + real photo, icons across sections — §6/§7)
    - [x] Hero
    - [x] ImpactStats
    - [x] MissionStatement
    - [x] YouTubeEmbed
    - [x] PartnersAndSupporters
    - [x] GetInvolvedTeaser
    - [x] ContactForm
    - [x] DonateBanner
    - [x] Assemble `index.astro`
- [ ] **2. About** (`about.astro`) — in progress:
    - [x] Founder story section
    - [x] ImpactStats (reused)
    - [x] PartnersAndSupporters (reused)
    - [x] Annual Report reference
    - [x] Team link
    - [x] Assemble `about.astro`
- [ ] **3. Team** (`team.astro`):
    - [ ] StaffCard
    - [ ] StaffGrid
    - [ ] Assemble `team.astro`
- [ ] **4. Projects** (`projects.astro`):
    - [ ] ProjectSection — Relief Route
    - [ ] ProjectSection — AgriScan
    - [ ] Assemble `projects.astro`
- [ ] **5. Get Involved** (`get-involved.astro`):
    - [ ] Branch Founder section
    - [ ] Volunteer CTA
    - [ ] Assemble `get-involved.astro`
- [ ] **6. Donate** (`donate.astro`):
    - [ ] QRCodeDonate
    - [ ] DocumentEmbed
    - [ ] Assemble `donate.astro`

### Cross-Cutting (every page)
- [ ] Responsive check at each breakpoint
- [ ] Accessibility pass (contrast spot-checked ad hoc so far, §6 — full
      systematic pass still unstarted)
- [ ] SEO (title, meta description, OG tags, canonical URL, heading
      hierarchy, alt text)
- [ ] Performance check (image optimization, Lighthouse — check Hero's
      real photo once this doc's copy of `index.astro` is current, §2)
- [ ] Cross-browser spot check

### Phase 6 — Deployment
- [ ] Compare Cloudflare Pages / Netlify / Vercel / GitHub Pages
- [ ] Recommend + set up hosting
- [ ] Domain migration considerations from GoDaddy

---

## 10. Data / Content Integrations

**Static data files:** `navigation.ts` (6-item nav) · `footer.ts` ·
`staff.ts` (8 members, planned) · `stats.ts` (4 stats) · `partners.ts` · `projects.ts` (planned).

**External destinations:**
- Email List (Footer) / Volunteer (Get Involved) →
  `https://forms.gle/7JFDkKPdzYv1LfCP6` (same form; "Volunteer" framing
  is an open question)
- Become a Branch Founder → `https://forms.gle/qfwhsPP61RrAd1cW7`
- Donate (Zeffy) →
  `https://www.zeffy.com/fundraising/ending-hunger-through-youth-leadership`
- Social: Instagram (`instagram.com/unityprovisions`) · TikTok
  (`tiktok.com/@unityprovisionsboston`) · Linktree
  (`linktr.ee/UnityProvisions`)
- Phone: `(857) 777-8811` (`tel:8577778811`)

**Live-site content audit** — homepage sections that exist on
unityprovisions.org but aren't (fully) covered in this revision yet,
confirmed via a live fetch this session (§3 — real-content check):
- **"Our Biggest Event Yet"** — a single-event spotlight, not a running
  stat: North Quincy branch collected and donated 1,025 lbs of food to
  Quincy Community Action Program (Dec 20, 2024), with a photo. No
  equivalent exists anywhere in this revision (Home, About, or
  Projects) — needs a decision on where it'd live, plus a real photo
  (§5 blocker: no project/event photography supplied yet).
- **"Creating Opportunities"** (live site's actual heading — not
  "Created Opportunities") — the same 4 numbers already in `stats.ts`,
  plus it names all 8 countries (US, Canada, India, UAE, Puerto Rico,
  Pakistan, Morocco, England) — that list isn't captured anywhere in
  this revision yet.
- **"Our Partners"** — same orgs already in `partners.ts` (Wang YMCA,
  Mystic Valley YMCA, Food4Philly). About's "fuller" pass (§7) now adds
  a group intro paragraph + a card grid, and real logos are now in
  place for nearly every org (§5) — still no per-org descriptive
  paragraph like the live site has, though; that's still blocked on
  verified per-org copy, not fabricated for named real orgs.
- **"Grants & Funding"** — ✅ addressed: `PartnersAndSupporters`'s
  "fuller" pass (§7) now renders an intro paragraph under "Supporters"
  explaining why the grants matter, same treatment as the live site.
No action taken this session — logged so a future pass (a Home
revisit, or while building About/Projects) can decide what's worth
adding and where, rather than rediscovering it from scratch.

**Open decisions:**
- Annual Report CTA (About, §8): ✅ resolved — link out via
  `ExternalLinkCTA` to a FlipHTML5 flipbook
  (`https://online.fliphtml5.com/uvjxy/tupw/`), not an embedded PDF.
  Reasoning: embedded PDFs (`<iframe>`/`<object>`) are inconsistent on
  mobile — iOS Safari and Chrome for Android often show blank space or
  force a download instead of rendering inline, HTTPS/header quirks
  can silently break the embed, and browser updates can change this
  behavior without warning. A plain link avoids all of that, keeps the
  file swappable without a redeploy, and matches this project's
  existing pattern of external CTAs for participation (§3). See §7
  (Annual Report CTA entry) for the built version.
- ContactForm submission backend: Formspree vs. Cloudflare Function.
  Markup/validation done; only the real handler + reCAPTCHA widget
  pending.
- Donation tracker embed shape: pending visual inspection.
- Get Involved's "Volunteer" framing: the form behind it is a general
  contact-list signup, not volunteer-specific — decide before building
  `get-involved.astro`.
- ImpactStats live sheet 🔶: needs "Anyone with the link – Viewer"
  sharing (currently a permissions error). Fragility: (1) the live match
  requires exact label text `"Total (lbs)"`/`"Money Collected ($)"` in
  column B — silent fallback if wording changes; (2) `SHEET_RANGE`
  (`'B1:C6'`) must stay scoped to the summary block — widening it into
  the donation log below breaks Google's column-type inference (this
  already happened once during development).

---

## 11. Decisions and Conventions

- Tailwind v4, CSS-first (`@theme` in `global.css`; no
  `tailwind.config.mjs`; `@tailwindcss/vite`).
- `tsconfig.json`: explicit `./src/...` path aliases, no `baseUrl`.
- `cn()` (`utils/cn.ts`): zero-dependency; add `tailwind-merge` only for
  a real class-conflict-resolution need.
- `types.ts`: shared cross-component types, separate from `utils/`;
  component-local types stay inline in that component's `Props`.
- Every component: `Astro.props as Props`.
- Class lists: `cn(...)`, never manual string concatenation.
- `Container` lives in `ui/` — generic, no page-specific content, no
  `id` prop (§7).
- Cookie consent banner: decision deferred to end of project.
- Confirm a component deserves its own file before building it (§2, §3)
  — including checking the live site and this project's own existing
  components/data for redundancy.
- Real content (roster, stats, project descriptions, page copy) lives in
  data files or page templates — use as captured here, don't
  re-research. A §7 note marked "verified against the live site" (or
  "verified word-for-word") records that a live re-check was actually
  done during this project — it's a fact, not filler; don't delete
  those notes when trimming an entry. **Exception: color** — the live
  site is out of scope as a color reference (§3/§6); still the
  reference for everything else.
- Dynamic tag props (`as`): typed `keyof HTMLElementTagNameMap` or a
  narrower literal union — never a bare `string` (breaks Astro's
  type-checking on `<Tag>`).
- §7 entries describe what was actually built, not what was originally
  planned — update them in the same edit whenever an implementation
  deviates from spec.
- Empty placeholder files are intentional (not-yet-built pages/
  components) — a file's existence isn't a "started" signal. §5's
  ✅/📋 markers are the only source of truth. Exception:
  `EmailSignup.astro` — if it still exists on disk, delete it (§7).
- `index.astro` is fully assembled with real copy; don't wrap page
  content in its own `<main>` — `Layout.astro` already provides one;
  double-check import aliases match real component names exactly.
- Full-bleed section background bands (wrap `<Container>` in a plain
  background `<div>`, e.g. `bg-surface` or `bg-primary`) are an
  established pattern — use it any time a section needs visual
  separation from `--color-bg`, rather than inventing a new approach
  per component.
- A light-colored control on a dark/photo background is hand-written,
  not `Button`'s `secondary` variant (assumes a light page background)
  — same reasoning `DonateBanner` established for its custom heading
  markup, that `Hero` now also follows.
- Button hover states always resolve to a fixed `-hover` design token
  (e.g. `--color-primary-hover`, `--color-accent-hover`), never an
  opacity blend — keeps hover appearance identical regardless of what
  background the button happens to sit on (§7 Button).
- Decorative Iconify icons (via `astro-icon`) are an established,
  lightweight way to add visual weight to plain heading+text sections —
  always optional props, never required.
- `SectionHeading`'s `eyebrow` prop is opt-in, not a default habit —
  Home's sections never use it. Only reach for it when it adds real
  information the title doesn't already carry; a vague label ("By The
  Numbers", "Transparency") that just restates or decorates the title
  gets cut, not kept (see About's Annual Report CTA entry, §7, for the
  pass that removed several of these). The founder story's "Our Story"
  eyebrow is a deliberate, explicit exception to this — kept per
  preference, not evidence the convention should be loosened generally.
- Icon badges (the circular `bg-primary/10 text-primary` Iconify badge
  above a heading) are reserved for sections that are *only* a heading
  + short subtext + optional single button, with no other visual
  anchor of their own — MissionStatement, GetInvolvedTeaser (Home), and
  About's "Meet the Team" CTA are this shape. Sections that already
  have their own anchor (a photo, a colored band, an inline icon next
  to a link, or a data/logo grid immediately following) don't get one
  — YouTubeEmbed, ContactForm, DonateBanner, the founder story, and
  About's "Numbers So Far" / "Who Helps Make This Possible" intros all
  fall here. Check this rule before adding or omitting a badge on any
  new bare heading section, on any page.
- A bare heading-only intro block (`Container` + `div` + `SectionHeading`,
  no other content of its own) that sits directly above a full-bleed
  band it introduces (sage `bg-surface`, `bg-primary`/`bg-primary-hover`,
  or any future full-bleed treatment) uses **asymmetric** padding —
  full padding on top (`pt-12 md:pt-16`, matching the site's usual
  `py-12 md:py-16`) but compressed padding on the bottom (`pb-4
  md:pb-6`) — instead of the standard symmetric `py-12 md:py-16`. This
  visually attaches the heading to the content it introduces, rather
  than leaving it floating equidistant between that content and
  whatever comes before it. First used on About's "Numbers So Far" and
  "Who Helps Make This Possible" headings (§7, ImpactStats /
  PartnersAndSupporters entries) — apply the same treatment to any
  future heading block that exists solely to introduce a full-bleed
  section immediately following it. Doesn't apply when the heading is
  part of its own self-contained, already-padded section (e.g.
  MissionStatement, GetInvolvedTeaser — heading + button live inside
  one block together) or when no full-bleed section immediately
  follows it (e.g. About's "Annual Report" and "Meet the People Behind
  It" closing blocks, which are themselves the content, not an intro
  to something else).
- Photo-legibility treatment: a CSS `mask-image` (Hero's
  `mask-y-from-accent` utility class) is the established pattern, not
  a gradient overlay `<div>` — final decision, supersedes an earlier-
  considered gradient-overlay approach.
- Tailwind gotcha: this project's custom `--text-3xl` (44px) is larger
  than un-customized `text-4xl` (36px) — don't reach for `text-4xl`+
  assuming it's bigger than `text-3xl` here (§6).
- **Local edits to files this document tracks (e.g. `index.astro`) that
  happen outside the session maintaining this file won't be reflected
  here automatically** — paste the current file back in when resuming.
- **When trimming this document for length, cut narration ("this
  session we…", historical "was X" values), not facts.** A "why" that
  prevents a future mistake, a verification record ("checked against
  the live site"), or a specific implementation detail (e.g. how a
  button is targeted via `querySelector`) should be condensed to one
  line, never deleted outright — three genuine cases of this happened
  in one edit of this document and had to be restored afterward.