# Unity Provisions Website — Master Roadmap

The single source of truth for this project. A new session should be able
to read this file top to bottom and continue development without any
other context.

---

## 1. Project Overview

Unity Provisions is a student-led nonprofit fighting food insecurity —
"Students Ending Hunger" — operating 35+ branches across 8 countries.
This project rebuilds their website with Astro, TypeScript, and Tailwind
CSS: a clean, modern, maintainable site that presents the organization's
real mission, story, and content through a simple, clear information
architecture.

The site has six pages — **Home, About, Team, Projects, Get Involved,
Donate** — and no account or authentication system anywhere. Every page
is public, static content. Participation and giving happen through
clearly labeled external links (Google Forms, Zeffy), not in-house
multi-step flows or logins.

---

## 2. How to Resume This Project

**Current phase: Phase 5 — Build Pages.** Shared infrastructure (Phase 4)
is complete; page assembly starts with Home.

**What's built and what isn't:** don't maintain a separate list here —
the project tree in §5 is the single source of truth for every file in
the project, and each one carries a ✅ Built or 📋 Planned marker. Check
§5 directly rather than trusting a status list that could drift out of
sync with it.

**Continue here:** Phase 5, Step 1 (Home) — build `ContactForm.astro`
next (see Component Library §7 for its spec, Implementation Phases §9
for the full remaining order, and §5 for the current file tree).
**Update this line every time a step is completed, so it always names
the actual next thing to build — not the thing that was just finished.**

**Process for every new component or page:**
1. Confirm it should exist as its own component — a genuinely distinct,
   reusable piece of UI, not a one-off bit of markup.
2. Explain what it is, where it appears on the site, and why it earns its
   own file, before writing any code.
3. Build it.
4. Explain the resulting code in depth — assume the reader is not deeply
   familiar with Astro, TypeScript, or Tailwind's utility generation.
5. **Immediately update every place that tracks status — all four, not
   just one:**
   - Check its box in §9 Implementation Phases.
   - Flip its marker (📋 → ✅) in §5's project tree.
   - Flip its status tag (📋 Planned → ✅ Built) in its §7 Component
     Library entry.
   - Update the "Continue here" line above to name the actual next
     unbuilt item.

---

## 3. Goals and Design Principles

- Preserve Unity Provisions' real mission, voice, branding, and content —
  this is a specific organization's site, not a generic template.
- No account creation, sign-in, or authentication features anywhere.
  Every page is public.
- Fewer, stronger pages rather than many thin ones — related content
  lives together instead of being split across near-duplicate pages.
- Every page serves a clear purpose in the visitor's journey: who Unity
  Provisions is, what they do, how to get involved, how to support them.
- Important content — impact numbers, mission, ways to help — is
  immediately visible, not buried in paragraphs.
- Ways to participate (volunteering, founding a branch, joining the
  mailing list) are external calls-to-action, not native in-house flows.
- A component exists because it's genuinely reused or genuinely isolates
  a real concern — never by default.
- Accessible, performant, responsive, and SEO-sound from the start.

---

## 4. Technology Stack

- **Astro** (latest stable), **TypeScript** strict mode.
- **Tailwind CSS v4**, CSS-first configuration — no `tailwind.config.mjs`.
  All tokens and base styles live in `src/styles/global.css` via a single
  `@theme` block + `@layer base`, wired into the build through the
  `@tailwindcss/vite` plugin in `astro.config.mjs`.
- **Astro integrations configured:** `sitemap()`, `mdx()`, `astro-icon()`.
- **Icon set:** Lucide (UI icons) + Simple Icons (brand/social icons), via
  `astro-icon`. Packages `@iconify-json/lucide` and
  `@iconify-json/simple-icons` are installed.
- **Path aliases** (`tsconfig.json`): `@components/*`, `@layouts/*`,
  `@styles/*`, `@data/*`, `@utils/*`, `@assets/*`, and `@/types` for the
  single root `src/types.ts` file. No `baseUrl` — deprecated in
  TypeScript 6.0; every alias carries its own explicit `./src/...` prefix
  instead. (There is no `@content/*` alias — see §5; a `src/content/`
  folder was never needed for this project and has been removed.)
- No CSS-in-JS and no component library dependency. `cn()` is a
  zero-dependency class-composition helper — add `tailwind-merge` only if
  a component needs to accept a `class` override prop that could
  genuinely conflict with its own internal classes.
- **Live content:** `ImpactStats` (Home, About) live-updates two of its
  four numbers — total lbs collected and money raised — client-side from
  the "Donations Overview" tab of a public Google Sheet, read via
  Google's own Visualization API (`gviz/tq`, the same mechanism behind
  charts embedded from Sheets on other sites) requested through a JSONP
  `<script>` tag rather than `fetch()`, since that endpoint doesn't
  support cross-origin `fetch()`/XHR. This keeps the site fully static
  (no SSR, no API keys, no third-party proxy dependency) while letting
  whoever edits the sheet update those two numbers without a redeploy.
  Falls back to the build-time values in `src/data/stats.ts` if the
  sheet is unreachable, not yet public, or its shape changes
  unexpectedly; branches and countries are permanently static and never
  touched by this mechanism. See §7 (ImpactStats) and §10 (Open
  integration decisions) for setup requirements and what's still pending.

---

## 5. Project Architecture

```
src/
├── assets/
│   ├── team/                     — 8 headshots for the Team page (not yet supplied)
│   ├── projects/                 — Relief Route / AgriScan imagery (not yet supplied)
│   └── donate/                   — QR code image (not yet supplied)
│
├── components/
│   ├── ui/                       — generic, content-agnostic primitives
│   │   ├── Button.astro                ✅ built
│   │   ├── SectionHeading.astro        ✅ built
│   │   ├── Card.astro                  ✅ built
│   │   ├── ResponsiveImage.astro       ✅ built
│   │   ├── Container.astro             ✅ built
│   │   └── ExternalLinkCTA.astro       ✅ built
│   │
│   ├── layout/                   — site-wide chrome, mounted once in Layout.astro
│   │   ├── Navbar.astro                ✅ built
│   │   └── Footer.astro                ✅ built
│   │
│   ├── sections/                 — page-specific composed sections
│   │   ├── Hero.astro                  ✅ built — Home
│   │   ├── ImpactStats.astro           ✅ built — Home, About
│   │   ├── MissionStatement.astro      ✅ built — Home
│   │   ├── YouTubeEmbed.astro          ✅ built — Home
│   │   ├── PartnersAndSupporters.astro ✅ built — Home, About
│   │   ├── GetInvolvedTeaser.astro     ✅ built — Home
│   │   ├── ContactForm.astro           📋 planned — Home
│   │   ├── EmailSignup.astro           📋 planned — Home, Get Involved
│   │   └── DonateBanner.astro          📋 planned — Home, Donate
│   │
│   ├── staff/                     — Team page composites
│   │   ├── StaffCard.astro             📋 planned
│   │   └── StaffGrid.astro             📋 planned
│   │
│   ├── projects/                  — Projects page composite
│   │   └── ProjectSection.astro        📋 planned — used twice (Relief Route, AgriScan)
│   │
│   └── donate/                    — Donate page composites
│       ├── QRCodeDonate.astro          📋 planned
│       └── DocumentEmbed.astro         📋 planned
│
├── data/                          — typed content, kept separate from component code
│   ├── navigation.ts                   ✅ built — flat 6-item nav + orgName
│   ├── footer.ts                       ✅ built
│   ├── staff.ts                        📋 planned — the 8 real team members
│   ├── stats.ts                        ✅ built — the 4 impact numbers
│   ├── partners.ts                     ✅ built — partners + supporters
│   └── projects.ts                     📋 planned — Relief Route + AgriScan content
│
├── layouts/
│   └── Layout.astro                    ✅ built — base shell: head boilerplate,
│                                          mounts Navbar / <slot /> / Footer
│
├── pages/
│   ├── index.astro                     📋 planned — Home
│   ├── about.astro                     📋 planned — About
│   ├── team.astro                      📋 planned — Team
│   ├── projects.astro                  📋 planned — Projects
│   ├── get-involved.astro              📋 planned — Get Involved
│   └── donate.astro                    📋 planned — Donate
│
├── styles/
│   └── global.css                      ✅ built — design tokens (@theme) + base styles
│
├── utils/
│   └── cn.ts                           ✅ built — class-composition helper
│
└── types.ts                            ✅ built — shared cross-component types
                                           (deliberately at src root, not inside utils/)
```

---

## 6. Design System

### Color
Defined once as CSS variables in `global.css`'s `@theme` block; Tailwind
auto-generates matching utilities (`bg-primary`, `text-text-secondary`, etc.).

| Token | Value | Status |
|---|---|---|
| `--color-bg` | `#f9f9e6` | confirmed real |
| `--color-surface` | `#ffffff` | placeholder |
| `--color-text-primary` | `#1a1a1a` | placeholder |
| `--color-text-secondary` | `#5c5c5c` | placeholder |
| `--color-primary` | `#6b7f3f` | placeholder |
| `--color-primary-hover` | `#59692f` | placeholder |
| `--color-accent` | `#c47a3d` | placeholder |
| `--color-border` | `#e0ddc9` | placeholder |
| `--color-success` | `#2f7d4f` | placeholder |
| `--color-error` | `#b3413b` | placeholder |

Only `--color-bg` is confirmed against the live site; the rest need real
values pulled via DevTools before Phase 5 pages ship.

### Typography
`--font-display` / `--font-body`: both `system-ui` placeholder, pending
real font-family values.

| Token | Size | Use |
|---|---|---|
| `--text-xs` | 12px | captions |
| `--text-sm` | 14px | meta, labels |
| `--text-base` | 16px | body |
| `--text-lg` | 18px | lead paragraphs |
| `--text-xl` | 24px | h3 |
| `--text-2xl` | 32px | h2 |
| `--text-3xl` | 44px | h1 / hero |

### Spacing & Breakpoints
Tailwind's default spacing scale and breakpoints
(`sm:640px md:768px lg:1024px xl:1280px`) — no custom overrides. Standard
content max-width ~1280px (`max-w-7xl`).

### Radius & Shadow
`--radius-sm` (4px — inputs, small buttons), `--radius-md` (8px — cards),
`--radius-lg` (16px — hero/banner imagery). `--shadow-sm/md/lg` for card
elevation.

### Component Style Conventions
- **Buttons:** primary (solid), secondary (outline), accent (solid,
  distinct color) — 150ms ease hover transition.
- **Cards:** surface background, `radius-md`, `shadow-sm`, `1.5rem` padding.
- **Forms:** surface-background inputs, 1px border, `radius-sm`,
  primary-colored focus ring, labels always above fields (never
  placeholder-only).

### Accessibility
- Focus ring via `:focus-visible` only — `2px solid var(--color-primary)`,
  `2px` offset (meets WCAG 2.4.11), applied globally.
- Exactly one `<h1>` per page.
- Every image requires real `alt` text — no default/empty value
  permitted — **except** a purely decorative image nested inside a
  control that already carries its own complete accessible name (e.g.
  `YouTubeEmbed`'s thumbnail sits inside a `<button aria-label="...">`).
  In that specific case, `alt=""` is correct: giving the image real alt
  text too would make screen readers announce the same information
  twice back-to-back. This is a narrow, documented exception — not a
  general license to leave alt text empty elsewhere.
- Every form input has a real `<label>`.
- Icon-only links/buttons require `aria-label`.
- `<a>` and `<button>` are never substituted for each other — tag choice
  always matches real behavior.
- Full keyboard operability and correct focus management on the mobile nav.
- Viewport meta tag includes `initial-scale=1` (set in `Layout.astro`) so
  mobile browsers render at true device width rather than a zoomed-out
  desktop simulation — required for the `md:` breakpoint behavior used
  throughout Navbar and other components to actually take effect on
  phones.

---

## 7. Component Library

Status: ✅ Built · 📋 Planned

### UI Primitives — `src/components/ui/`

**Button** — ✅ Built
- Purpose: the single styled clickable element site-wide — actions,
  submits, button-styled navigation.
- Use when: any action or link needing the site's button treatment. Not
  for off-site links — use `ExternalLinkCTA`, which wraps this component.
- Props: `variant?: 'primary'|'secondary'|'accent'` (default `primary`),
  `size?: 'sm'|'md'|'lg'` (default `md`), `href?: string`,
  `type?: 'button'|'submit'` (default `button`),
  `target?: '_self'|'_blank'|'_parent'|'_top'`, `rel?: string` — the last
  two apply only on the `<a>` branch (when `href` is set) and were added
  so `ExternalLinkCTA` can pass through `target="_blank"`/
  `rel="noopener noreferrer"` without duplicating Button's anchor/button
  branching logic. Both are optional with no default, so existing calls
  without them are unaffected. Slot: label/content.
- Structure: single inline-flex element; `<a>` if `href` is set, else `<button>`.
- Example: `<Button variant="accent" href="https://zeffy.com/...">Donate Now</Button>`

**SectionHeading** — ✅ Built
- Purpose: consistent section-intro block — optional eyebrow, required
  title, optional subtext.
- Use when: introducing a page section (Team, Projects, Get Involved,
  Donate). Not for Home's Hero.
- Props: `as?: 'h1'|'h2'|'h3'` (default `h2`), `eyebrow?: string`,
  `title: string` (required), `subtext?: string`,
  `align?: 'left'|'center'` (default `left`).
- Structure: `flex flex-col gap-2`; absent optional children render nothing.
- Example: `<SectionHeading as="h1" title="Our Team" subtext="The people behind Unity Provisions" />`

**Card** — ✅ Built
- Purpose: a bounded surface (background, radius, shadow, padding) for
  grouped content.
- Use when: team member cards, project sections, any content needing
  visual separation from the page background.
- Props: default slot; optional `padding?: 'sm'|'md'|'lg'` (default `md`).
- Structure: single `<div>`; `bg-surface rounded-md shadow-sm` plus a
  padding utility (`p-4`/`p-6`/`p-8`) selected via a `Record` lookup keyed
  on `padding`. `md` (`p-6` = 1.5rem) matches the design system's spec
  exactly and is the default.

**ResponsiveImage** — ✅ Built
- Purpose: wraps `astro:assets`'s `<Image />` with the site's design
  tokens, enforcing accessible/performant defaults.
- Use when: any real content image (team photos, project imagery).
- Props: `src` (required), `alt: string` (required, no default),
  `width`/`height` (required), `radius?: 'sm'|'md'|'lg'|'none'`
  (default `md`), `loading?: 'eager'|'lazy'` (default `lazy`).

**Container** — ✅ Built
- Purpose: shared max-width + horizontal-padding wrapper.
- Use when: wrapping section-level content that should sit within the
  standard content width.
- Props: `as?: keyof HTMLElementTagNameMap` (default `'div'`) — typed as
  a real HTML tag-name union rather than a bare `string`, so the dynamic
  `<Tag>` render in the template type-checks correctly (see §11);
  `maxWidth?: string` (default `'max-w-7xl'`, ~1280px). Slot: children.
- Usage convention: use `as` to render `Container` directly as the
  semantic element (e.g. `<Container as="section">`) only when that
  element needs no independent full-width visual treatment of its own —
  its background then just matches the page. When the element needs a
  full-bleed background, color, or shadow distinct from the page (e.g.
  `Navbar`'s `<header>`, likely `DonateBanner` too), wrap a separate
  plain element around `<Container>` instead, so the background spans
  edge-to-edge while only the inner content is constrained and centered.
  Collapsing the two in that case would squeeze the background itself
  down to the container's max-width — a real visual regression, not
  just a style preference.

**ExternalLinkCTA** — ✅ Built
- Purpose: the component for standalone, prominent off-site
  calls-to-action — e.g. the Get Involved page's Volunteer and Branch
  Founder CTAs, and the Donate page's Zeffy link.
- Props: reuses the shared `ExternalLink` type from `src/types.ts`
  (`type Props = ExternalLink`) rather than redeclaring an identical
  interface — `label: string`, `href: string`, `icon?: string`.
- Structure: wraps `Button`, passing `target="_blank"` and
  `rel="noopener noreferrer"` through as hardcoded literals (not exposed
  as `ExternalLinkCTA`'s own props) via Button's new pass-through support
  (see Button's entry above). Renders `icon` (an Iconify name) after the
  label only when provided.
- Usage convention: reserved for isolated, prominent CTAs — not for
  dense rows of small utility links sitting close together (e.g. a
  footer's link columns, or social icons), where Button's solid styling
  reads as too heavy. See Footer's entry below for the concrete case
  this came up against.
- Example: `<ExternalLinkCTA label="Volunteer" href="https://forms.gle/7JFDkKPdzYv1LfCP6" icon="lucide:external-link" />`

### Layout — `src/components/layout/`

**Navbar** — ✅ Built
- Purpose: persistent site navigation (present on every page — "persistent"
  refers to appearing site-wide via `Layout.astro`, not scroll-sticky
  positioning, which isn't currently implemented).
- Data: `src/data/navigation.ts` — flat list, no dropdowns: Home, About,
  Team, Projects, Get Involved, Donate. Also imports `orgName` from the
  same file for the site name/logo text (no logo image asset exists yet
  — see §5 `assets/` — so this renders as text).
- Structure: two separate `<ul>` link lists, not one shared list — a
  desktop row (`hidden md:flex`, pure CSS breakpoint toggle) and a
  mobile list (`#mobile-menu`, JavaScript-toggled via the native `hidden`
  attribute). They're kept separate because mixing a JS-toggled native
  `hidden` attribute with an unconditional Tailwind layout class on the
  same element causes the class to always win the cascade, silently
  breaking the JS toggle — see the component's own inline comments.
- Design constraints: full keyboard operability and correct focus
  management on the mobile menu — implemented via the disclosure pattern
  (not a full focus trap, which is the modal-dialog pattern, not this
  one): `aria-expanded`/`aria-controls` on the toggle button, focus moves
  to the first link on open, Escape closes and returns focus to the
  toggle button. Active page gets `aria-current="page"` via a
  `Astro.url.pathname` comparison against each nav item's `href` — except
  Donate (see below), which doesn't receive this treatment since it
  isn't a plain `<a>`.
- Donate is rendered as an accent `Button` (`variant="accent" size="sm"`),
  not a plain text link like the other five items — a deliberate visual
  distinction to draw the eye toward giving, matching common nonprofit-
  site convention. Reuses the existing `Button` component rather than
  duplicating button styling inline. Known gap: `Button` doesn't accept
  `aria-current`, so the Donate button doesn't get the active-page
  treatment the plain links do when a visitor is on `/donate` — accepted
  as minor, since its accent color already visually distinguishes it
  regardless, but noted here rather than left silent.
- Outer structure is `<header class="bg-surface shadow-sm">` wrapping
  `<Container>`, not `<Container as="header">` — see Container's own
  entry above for why these two stay separate.

**Footer** — ✅ Built
- Purpose: persistent footer.
- Data: `src/data/footer.ts` — main nav links, plus Email List / Linktree
  as external links, social icons (Instagram, TikTok), phone, copyright.
  (No separate "Volunteer" footer link — the real form behind it turned
  out to be a general contact-list signup with no volunteer-specific
  question, so showing it under two adjacent labels read as a mistake
  rather than two real options. See §10.)
- Structure: plain hand-styled `<a>` tags throughout (nav links,
  external links, social icons), not `ExternalLinkCTA` — see that
  component's entry above for why. Cost of this choice: `target="_blank"`
  and `rel="noopener noreferrer"` have to be set by hand on each external
  `<a>` here, rather than centralized in one component.
- Design constraints: icon-only social links get `aria-label` on the
  link itself (the link's real accessible name); the icon inside is
  `aria-hidden="true"` so it isn't announced a second time, redundantly,
  on top of that label. Copyright year computed via
  `new Date().getFullYear()` at build time, not per-visitor — it updates
  on the next deploy, not automatically at midnight on Jan 1.
- A second `<nav aria-label="Footer">` landmark, distinct from Navbar's
  `aria-label="Primary"`, so landmark-based screen reader navigation can
  tell the two apart.

### Root Layout — `src/layouts/`

**Layout** — ✅ Built
- Purpose: the single base HTML shell for every page — owns the
  `<html>`/`<head>`/`<body>` boilerplate and mounts the persistent chrome
  (`Navbar`, `Footer`) exactly once around each page's own content.
  Unlike everything else in this section, this isn't a reusable content
  component so much as the required Astro pattern for sharing page
  structure — its existence isn't a "does this deserve its own file?"
  judgment call the way a section component is.
- Use when: every page (`index.astro`, `about.astro`, etc.) wraps its
  content in `<Layout>...</Layout>`.
- Props: `title?: string` (default `"Unity Provisions"`),
  `description?: string` (default `"Creating opportunities and building
  stronger communities."`) — both optional so a page can render with no
  props at all during early scaffolding, and both feed the `<title>` tag
  and the `description` meta tag respectively.
- Structure: `<meta charset>`, a responsive `viewport` meta
  (`width=device-width, initial-scale=1`), the `description` meta,
  `Astro.generator` meta, `<title>`, and the favicon link, followed by
  `<body class="min-h-screen"><Navbar /><main><slot /></main><Footer /></body>`.
  `<slot />` is where each page's real markup is injected.
- Implementation note: the viewport meta's `initial-scale=1` was added
  during review — the first draft only had `width=device-width`, which
  is enough to prevent desktop-simulation zoom but not to guarantee a
  1:1 initial scale on all mobile browsers. Also brought the props
  destructuring in line with the site-wide `Astro.props as Props`
  convention (§11), which the first draft omitted.

### Page Sections — `src/components/sections/`

**Hero** — ✅ Built
- Purpose: Home's opening statement — the first section a visitor sees.
- Props: `headline: string`, `tagline: string`, `ctaLabel: string`,
  `ctaHref: string` — all required, no defaults, matching the pattern of
  the other Home section components (they're pure content components;
  real copy is supplied by `index.astro` at assembly time, not baked in
  here). `tagline` holds the org's actual slogan ("Students Ending
  Hunger"); `ctaLabel`/`ctaHref` point at Donate.
- Structure: `<Container as="section">` (no distinct background of its
  own, so it renders directly as the section per Container's usage
  convention) wrapping a centered flex column: tagline (styled as an
  eyebrow — small, uppercase, bold, `text-primary` — by hand, not via
  `SectionHeading`, which is explicitly excluded from Hero per its own
  entry above) → `headline` as this page's one `<h1>` → CTA.
- CTA uses plain `Button` (`variant="accent" size="lg"`), not
  `ExternalLinkCTA` — the Donate destination (`/donate`) is an internal
  route, not an off-site link, so `target="_blank"` would be wrong here.
- Implementation note: no image prop. `global.css` has a `--radius-lg`
  comment mentioning "hero image," but there's no `assets/hero/` folder
  in §5 and §7's original spec never listed an image prop — treating
  that comment as describing a possible future use of the token, not a
  current requirement. Flagging here in case that assumption changes.

**ImpactStats** — ✅ Built (🔶 live data pending sheet sharing — see §10)
- Purpose: presents the organization's real impact numbers as a
  scannable stat grid.
- Use when: Home (brief) and About (fuller) — see implementation note
  below for how that distinction is actually drawn.
- Props: `stats: Stat[]`, where `Stat` (`src/types.ts`) is
  `{ value: string, label: string, liveSheetLabel?: string }`. Passed in
  by the page rather than imported from `src/data/stats.ts` directly, so
  Home and About can each supply their own subset/order without the
  component knowing which page it's on.
- Data (`src/data/stats.ts`): total lbs collected and money raised are
  live-sourced (see below); `35+` branches and `8` countries are
  permanently static, pre-formatted display strings.
- Structure: `<Container as="section">` wrapping a `<dl>` grid
  (`grid-cols-2` mobile, `md:grid-cols-4` desktop). Each stat is a
  `<dt>` (the large value, `text-3xl font-bold text-primary`) + `<dd>`
  (the label, `text-sm text-text-secondary`), grouped in their own
  `<div>` per HTML5's `dl` content model.
- **Live data:** stats whose `Stat` entry sets `liveSheetLabel` (in
  `src/data/stats.ts`) render their build-time fallback value first,
  then get overwritten client-side if a row in the "Donations Overview"
  Google Sheet tab (spreadsheet ID
  `14C4v_A39CNRhI9oQ-i7GHagwggTS3jptgRGuu5UD6_w`, `gid=638911803`) has
  that exact text in column B — that row's column C value replaces the
  stat's `<dt>`. Stats without `liveSheetLabel` (branches, countries)
  are never touched. Fetched via Google's `gviz/tq` endpoint through a
  JSONP `<script>` tag (not `fetch()`, which gviz blocks via CORS) — see
  §4 for why this approach was chosen over SSR or a third-party proxy.
  Requirement on the sheet: "Anyone with the link – Viewer" sharing —
  currently not the case (a request returned a permissions error); see
  §10 for what's still needed.
- Implementation note: the component itself carries no heading or
  "brief vs. fuller" prop — §7's original spec didn't define one, and
  the only prop is the stats array. The brief/fuller distinction is left
  to the assembling page: Home can render `<ImpactStats />` with no
  surrounding copy, while About can wrap it in its own `SectionHeading`
  and additional paragraph text. This keeps the component reusable
  rather than page-aware.

**MissionStatement** — ✅ Built
- Purpose: the organization's mission, in its own words.
- Props: `heading: string`, `body: string` — both required, no defaults,
  matching the pattern of the other Home section components; real copy
  (see Content below) is supplied by `index.astro` at assembly time.
- Content: "At Unity Provisions, we believe that no one should go hungry
  in a world of abundance. As a student-led movement, we empower young
  leaders to create sustainable food collection programs in schools and
  communities worldwide. Through education, collaboration, and action, we
  fight the stigma around food insecurity and transform surplus into
  sustenance. Together, we are building a future where access to food is
  a right, not a privilege."
- Structure: `<Container as="section">` (no distinct background, same
  reasoning as Hero/ImpactStats) wrapping a centered flex column:
  `SectionHeading` (`title={heading}`, `align="center"`, rendering as
  this page's `<h2>` since Hero already owns the one `<h1>`) followed by
  a `<p>` at `text-lg` — the design system's "lead paragraph" size —
  constrained to `max-w-3xl` for readable line length.
- Implementation note: unlike Hero, this component *does* use
  `SectionHeading` — nothing in §7 excludes it here, and a plain title
  (no eyebrow/subtext) was enough since the real substance is the body
  paragraph, not the heading.

**YouTubeEmbed** — ✅ Built
- Purpose: embeds "Watch Our Story" without a hand-written iframe or
  eager script load.
- Props: `videoId: string`, `title: string` — both required. `title`
  does double duty: it's the visible heading above the video (via
  `SectionHeading`) *and* the accessible name used for the play button's
  `aria-label` and the eventual iframe's `title` — one prop, no
  redundant second field.
- Structure: `<Container as="section">` wrapping a centered
  `SectionHeading` + a `data-youtube-facade` div locked to `aspect-video`
  (Tailwind's built-in 16:9 utility), `max-w-3xl` to match
  `MissionStatement`'s paragraph width above it. Inside: a `<button>`
  (not a link — clicking runs JS, not navigation) showing a `hqdefault`
  thumbnail with a play-icon overlay.
- Click-to-load mechanism: a `<script>` (using `querySelectorAll`, safe
  for multiple instances) listens for a click on the facade, then builds
  a real `<iframe>` — pointed at `youtube-nocookie.com` with
  `autoplay=1` — and swaps it in via `replaceChildren`, entirely
  replacing the button/thumbnail. Nothing from YouTube loads until that
  click happens.
- Implementation notes / deviations from a strict reading of §6:
  1. The thumbnail's `<img>` uses `alt=""` — see §6's accessibility
     rules for the narrow exception this falls under (decorative image
     nested inside an already-labeled control).
  2. Not using `ResponsiveImage` for the thumbnail — that component
     relies on `astro:assets`, which only optimizes local or
     explicitly-allowlisted remote images, and `i.ytimg.com` isn't in
     `astro.config.mjs`. A plain `<img>` avoids needing to touch that
     config for one external thumbnail.
  3. `youtube-nocookie.com` (not the standard `youtube.com/embed`
     domain) delays most tracking cookies until the visitor opts in by
     clicking play — a small head start on §11's still-deferred cookie
     banner decision, not a full solution to it.

**PartnersAndSupporters** — ✅ Built
- Purpose: presents the organizations that partner with or fund Unity Provisions.
- Use when: Home (brief) and About (fuller) — same brief/fuller pattern
  as `ImpactStats`: the component has no internal toggle for this, only
  a `partners` array prop; the assembling page decides what subset (and
  what surrounding heading/copy) to supply.
- Props: `partners: Partner[]`, where `Partner` (`src/types.ts`) is
  `{ name: string, type?: 'partner' | 'supporter', logo?: string }`. An
  entry with no `type` set is grouped as a partner by default.
- Data (`src/data/partners.ts`): Partners — Wang YMCA, Mystic Valley
  YMCA, Food4Philly. Supporters — Esther R. Sanger Center for
  Compassion, Stephen J. Brady Stop Hunger, YMCA, Sodexo, Walmart Spark
  Good, Google.
- Structure: `<Container as="section">` wrapping one loop over up to two
  groups ("Partners" / "Supporters," each skipped entirely if empty),
  each rendering a small `<h3>` label (assumes the assembling page
  supplies its own `<h2>` above this component, e.g. via
  `SectionHeading`, so this nests correctly one level below it) followed
  by a wrapped row of badges.
- Logo support: `logo` is optional and forward-looking — no logo assets
  exist yet (see §5's `assets/` tree), so every organization currently
  renders as a plain text badge (`rounded-sm border border-border ...`).
  The moment any entry in `partners.ts` gets a real `logo` path, that
  one organization automatically switches to rendering as an `<img>`
  (`object-contain`, fixed height) instead — no component changes
  needed.

**GetInvolvedTeaser** — ✅ Built
- Purpose: a short Home band pointing to the full Get Involved page.
- Props: `heading: string`, `subtext: string`, `ctaLabel: string` — all
  required, no defaults, matching the pattern of the other Home section
  components. Notably *not* a prop: the destination href.
- Structure: `<Container as="section">` wrapping a centered
  `SectionHeading` (using its built-in `subtext` slot rather than a
  separate hand-written paragraph — nothing in §7 excludes
  `SectionHeading` here, unlike Hero) followed by a `Button`.
- The CTA's `href="/get-involved"` is hardcoded inside the component,
  not exposed as a prop like Hero's `ctaHref` is. This component's whole
  identity is "the teaser that links to Get Involved" — hardcoding the
  destination keeps that permanently true and makes it structurally
  impossible to misuse this component to link elsewhere.
- Uses `variant="primary" size="md"` on the `Button`, not
  `variant="accent"` like Hero's Donate CTA. `accent` has so far been
  reserved specifically for "give money" asks (Navbar's Donate, Hero's
  Donate); keeping this teaser on the ordinary `primary` color preserves
  that distinction rather than competing with Donate for visual weight.
  `md` (not Hero's `lg`) since this sits further down the page after
  several other sections have already made their case.

**ContactForm** — 📋 Planned
- Purpose: the site's one native form.
- Fields: Name, Email (required), "Where did you hear about us?", file
  attachment, reCAPTCHA, Send/Cancel.
- Open decision: submission backend (Formspree vs. Cloudflare Function) —
  build the markup now, wire submission once decided.

**EmailSignup** — 📋 Planned
- Purpose: lets visitors join the mailing list inline.
- Use when: Home; referenced from Get Involved.

**DonateBanner** — 📋 Planned
- Purpose: the prominent donate prompt.
- Use when: Home and the Donate page only.
- Props: promo image, heading, `ctaLabel`/`ctaHref` (Zeffy).

### Domain Composites

**StaffCard / StaffGrid** — 📋 Planned
- Purpose: displays one team member / arranges the full team in a grid.
- Use when: Team page.
- Props: `StaffCard`: `{ photo, name, role, email? }`. `StaffGrid`: array
  of entries.
- Data (`src/data/staff.ts`): Ryan Nguyen (Founder & CEO) · Alex Jamkatel
  (Chief Technology Officer) · Vivian Pan (Branch Operations Director) ·
  Louis Dang (Executive Secretary) · Wendy Jamsri (Project Mentor & YMCA
  Regional Teen Director) · Alexander Lee (Chief Marketing Officer) ·
  Ananya Bhat (Director of Development) · Aditi Jaiswal (Director of
  People and Culture). Emails follow `firstname.lastname@unityprovisions.org`
  (Wendy's is `wjamsri@ymcaboston.org`).

**ProjectSection** — 📋 Planned
- Purpose: the heading + description + optional CTA shape for one
  project, used twice on the Projects page.
- Props: `title`, `description`, `ctaLabel?`/`ctaHref?`, from
  `src/data/projects.ts`.
- Data: **Relief Route** — an in-development interactive map for locating
  donation centers and food banks; CTA "Add Centers Near You" (external).
  **AgriScan** — a low-cost crop-optimization console for small farms,
  home gardens, and developing regions; no CTA currently defined.

**QRCodeDonate** — 📋 Planned
- Purpose: the actual giving mechanism — QR donation image + Zeffy fallback link.
- Use when: the "Give" section of the Donate page — this is the primary,
  fully-specified content of that page, not optional.
- Design constraint: the QR code and fallback link must resolve to the
  identical destination.

**DocumentEmbed** — 📋 Planned
- Purpose: the "Track Our Impact" section of the Donate page — a real,
  distinct piece of content (the site's Donation Tracker widget), shown
  alongside `QRCodeDonate`, not instead of it. The Donate page has both
  sections: give money, and see where money has gone.
- Open decision: needs visual inspection to confirm what's actually
  embedded in the tracker before deciding its final shape — that's the
  only open part. Whether the *section itself* exists is not in question;
  only whether it's a full interactive embed or a simpler static
  transparency statement once inspected.

---

## 8. Page Structure

### Home (`/`)
Purpose: a concise landing page — who Unity Provisions is, and clear
paths to every other page.
Sections, in order: Hero → ImpactStats → MissionStatement → YouTubeEmbed
→ PartnersAndSupporters (brief) → GetInvolvedTeaser → ContactForm →
EmailSignup → DonateBanner.

### About (`/about`)
Purpose: the organization's full story.
Sections: founder story → ImpactStats (fuller) → PartnersAndSupporters
(fuller) → Annual Report reference (a simple link/download, not a
component of its own — see Component Library note) → link to Team.
Founder story: "Unity Provisions began with a simple but painful
question: 'Is there dinner?' Growing up, our founder Ryan knew the
silence of nights when food was uncertain. Later, while volunteering at
a local food pantry, he saw firsthand how hunger hides behind quiet
sacrifices—a mother choosing between diapers and oatmeal, neighbors
masking need with a smile. When that pantry abruptly shut down in 2024,
Ryan realized how fragile food programs could be. He founded Unity
Provisions to build something that couldn't disappear overnight. What
started with a single branch at Boston Latin School has grown into a
youth-led network of over 35 branches across multiple countries.
Together, student leaders have collected more than 4,000 pounds of food
and clothing, raised over $11,000, and built partnerships with
organizations like the Wang YMCA to sustain community-based donation
centers. Our mission is to empower young people to fight hunger by
creating and leading donation centers in their schools and communities."

### Team (`/team`)
Purpose: introduces the people running the organization.
Sections: StaffGrid of 8 real team members (data in §7).

### Projects (`/projects`)
Purpose: presents the organization's active initiatives.
Sections: two `ProjectSection`s — Relief Route, then AgriScan (data in §7).

### Get Involved (`/get-involved`)
Purpose: the single, clear answer to "how do I participate."
Sections: Branch Founder content → Volunteer CTA (external) → EmailSignup.
Branch Founder content: intro "Turn your passion into impact"; support
list (getting approval from your school or community, guidance for
planning and running events, access to reimbursements through the YMCA
partnership, ready-to-use promotional materials and planning tools,
opportunities for funding to grow your ideas); a "global network"
paragraph (35+ branches across 6 countries); CTA "Apply" →
`https://forms.gle/qfwhsPP61RrAd1cW7`. Volunteer CTA →
`https://forms.gle/7JFDkKPdzYv1LfCP6` — the same general
contact-list form now used for the footer's Email List link (§7
Footer); whether this CTA's "Volunteer" framing still fits is an open
question (§10).

### Donate (`/donate`)
Purpose: the site's one page for both giving and transparency — a
visitor can donate and see the org's donation tracker in the same place,
rather than needing to know these are two different destinations.
Sections, in order:
1. **Give** — `QRCodeDonate`: a short pitch, a QR code, and a Zeffy
   fallback link (`https://www.zeffy.com/fundraising/ending-hunger-through-youth-leadership`).
   This section is fully specified — nothing pending.
2. **Track Our Impact** — `DocumentEmbed`: the site's Donation Tracker
   widget, shown directly below the giving section. 🔶 Open item: the
   tracker's exact final shape (full embed vs. a simpler static
   transparency statement) is pending visual inspection — but the section
   itself is a confirmed, real part of this page, not optional.

---

## 9. Implementation Phases

### Phase 4 — Shared Infrastructure (complete)
- [x] 4.1 Design Tokens
- [~] 4.2 Global Styles & Fonts (base styles shipped; real font-family still pending)
- [x] 4.3 Utility Helpers
- [x] 4.4 UI Primitives:
    - [x] Button
    - [x] SectionHeading
    - [x] Card
    - [x] ResponsiveImage
    - [x] Container
    - [x] ExternalLinkCTA
- [x] 4.5 Navigation & Footer Data (`src/data/navigation.ts`, `src/data/footer.ts`)
- [x] 4.6 Navbar & Footer Components:
    - [x] Navbar
    - [x] Footer
- [x] 4.7 Layout.astro

### Phase 5 — Build Pages (current)
Build order; components per page in build order; each page ends with an assembly step.

- [ ] **1. Home** (`index.astro`):
    - [x] Hero
    - [x] ImpactStats
    - [x] MissionStatement
    - [x] YouTubeEmbed
    - [x] PartnersAndSupporters
    - [x] GetInvolvedTeaser
    - [ ] ContactForm — next
    - [ ] EmailSignup
    - [ ] DonateBanner
    - [ ] Assemble `index.astro`
- [ ] **2. About** (`about.astro`):
    - [ ] Founder story section
    - [ ] ImpactStats (reused)
    - [ ] PartnersAndSupporters (reused)
    - [ ] Annual Report reference
    - [ ] Team link
    - [ ] Assemble `about.astro`
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
    - [ ] EmailSignup (reused)
    - [ ] Assemble `get-involved.astro`
- [ ] **6. Donate** (`donate.astro`):
    - [ ] QRCodeDonate — "Give" section: QR code + Zeffy link
    - [ ] DocumentEmbed — "Track Our Impact" section: Donation Tracker widget
    - [ ] Assemble `donate.astro`

### Cross-Cutting (every page)
- [ ] Responsive check at each breakpoint
- [ ] Accessibility pass
- [ ] SEO (title, meta description, OG tags, canonical URL, heading hierarchy, alt text)
- [ ] Performance check (image optimization, Lighthouse)
- [ ] Cross-browser spot check

### Phase 6 — Deployment
- [ ] Compare Cloudflare Pages / Netlify / Vercel / GitHub Pages
- [ ] Recommend + set up hosting
- [ ] Domain migration considerations from GoDaddy

---

## 10. Data / Content Integrations

**Static data files (`src/data/`):**
- `navigation.ts` — flat nav list (6 items)
- `footer.ts` — footer links, social icons, phone, copyright
- `staff.ts` — 8 team members
- `stats.ts` — 4 impact numbers
- `partners.ts` — partner + supporter organizations
- `projects.ts` — Relief Route + AgriScan content

**External destinations (CTAs, not pages):**
- Email List (Footer) — `https://forms.gle/7JFDkKPdzYv1LfCP6`
- Volunteer (Get Involved page CTA) — `https://forms.gle/7JFDkKPdzYv1LfCP6` — same form as
  Email List above; whether this CTA's "Volunteer" framing still fits
  is an open question (see below)
- Become a Branch Founder application — `https://forms.gle/qfwhsPP61RrAd1cW7`
- Donate (Zeffy) — `https://www.zeffy.com/fundraising/ending-hunger-through-youth-leadership`
- Social — Instagram (`instagram.com/unityprovisions`), TikTok
  (`tiktok.com/@unityprovisionsboston`), Linktree (`linktr.ee/UnityProvisions`)
- Phone — `(857) 777-8811` (`tel:8577778811`)

**Open integration decisions:**
- ContactForm submission backend: Formspree vs. Cloudflare Function.
- Donation tracker embed on the Donate page: pending visual inspection.
- Get Involved page's "Volunteer CTA": the Google Form behind it is a
  general contact-list signup (name/email/phone/state), not volunteer-
  specific — decide before building `get-involved.astro` whether the
  "Volunteer" framing/copy still makes sense, gets adjusted, or the CTA
  is merged with the Email List concept entirely.
- **ImpactStats live sheet (🔶 pending — one item left):** `ImpactStats.astro`
  is fully wired to Google Sheet ID
  `14C4v_A39CNRhI9oQ-i7GHagwggTS3jptgRGuu5UD6_w`, tab `gid=638911803`
  ("Donations Overview"), via Google's own `gviz/tq` endpoint (see §4,
  §7) — only two stats are live-sourced (total lbs, money raised);
  branches and countries are permanently static. The only remaining
  blocker: **the sheet's sharing needs to be set to "Anyone with the
  link – Viewer"** (currently not the case — a request returned a
  permissions error). Until that's done, the component silently shows
  the static fallback from `src/data/stats.ts` and logs a console
  warning — it does not break the page.
  - Fragility to know about:
    1. The live match works by looking for the exact text
       `"Total (lbs)"` and `"Money Collected ($)"` in column B of that
       tab. If those cells' wording ever changes, that stat quietly
       reverts to its static fallback rather than erroring.
    2. `ImpactStats.astro`'s `SHEET_RANGE` constant (`'B1:C6'`) is
       intentionally scoped to just the summary block, and must stay
       that way — the tab has an unrelated donation log starting
       immediately at row 7, no buffer row in between. Google's query
       engine infers each column's type from the *majority* of values
       within whatever range it's given; if `SHEET_RANGE` were ever
       widened to include the log (mostly dates), column B would get
       typed as non-string overall, and the label match would silently
       find nothing — this is exactly what happened during development
       and cost real debugging time, so it's worth understanding before
       touching that constant. If rows are added to or removed from the
       summary block, `SHEET_RANGE` needs to be updated to match.

---

## 11. Decisions and Conventions

- Tailwind v4, CSS-first (`@theme` in `global.css`; no `tailwind.config.mjs`;
  `@tailwindcss/vite` in `astro.config.mjs`).
- `tsconfig.json` uses explicit `./src/...`-prefixed path aliases; no
  `baseUrl` (deprecated in TypeScript 6.0).
- `cn()` (`src/utils/cn.ts`) is zero-dependency; add `tailwind-merge` only
  if a component needs real class-override conflict resolution.
- `src/types.ts` holds shared cross-component types, separate from
  `utils/`; component-local types stay inline in that component's own
  `Props` interface.
- Every component explicitly writes `Astro.props as Props`.
- Class lists are built with `cn(...)`, never manual string concatenation.
- `Container` lives in `ui/` — generic, no page-specific content.
- Cookie consent banner: decision deferred to the end of the project.
- Confirm a component should exist as its own reusable piece before
  building it — don't create one by default just because a section exists.
- Real content (team roster, impact numbers, project descriptions, page
  copy) lives in typed data files or directly in page templates — use it
  as captured here rather than re-researching it.
- Dynamic tag props (commonly named `as`) are typed as
  `keyof HTMLElementTagNameMap`, or a narrower literal union when only
  specific tags make sense (e.g. `SectionHeading`'s `'h1'|'h2'|'h3'`) —
  never a bare `string`. A bare `string` doesn't satisfy Astro's
  type-checking when the prop is used to render a dynamic element
  (`<Tag>`), so this is a correctness rule, not a style preference.
- Whenever an implementation deviates from what §7 specifies (a prop
  type, a default, a structural choice), the §7 entry is updated to
  match the real implementation in the same edit — the roadmap describes
  what was actually built, not what was originally planned.
- **Empty placeholder files are intentional.** Files/folders for planned
  work (e.g. `src/components/sections/Hero.astro`,
  `src/data/stats.ts`, the not-yet-built pages) are often created ahead
  of time as blank files, purely for repo organization — this happens
  before any real content or code goes in them. A file's mere existence
  on disk (even an empty one at the correct path) is not a signal that
  it's been started or built. §5's ✅/📋 markers are the only source of
  truth for build status — always trust those over what's present in the
  file tree.