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

**Continue here:** Phase 5, Step 1 (Home) — `Assemble index.astro`
next (see Component Library §7 for its spec, Implementation Phases §9
for the full remaining order, and §5 for the current file tree).
**Update this line every time a step is completed, so it always names
the actual next thing to build — not the thing that was just finished.**

**Process for every new component or page:**
1. Confirm it should exist as its own component — a genuinely distinct,
   reusable piece of UI, not a one-off bit of markup. As part of this
   confirmation, check the real live site (unityprovisions.org) for
   whether the content/section actually exists there and where — this is
   real signal for the decision, not a mandate to copy it exactly. This
   project is a remake, not a clone: content and structure can and does
   change from what's live (see §3), so a live-site finding is one input
   into the judgment call, not an override of it. When live copy,
   layout, or visual treatment falls short of a professional standard,
   improve it — rewrite wording, adjust placement, restyle — rather than
   reproducing it as-is (see §3's higher-standard principle). Also check
   this site's *own* existing components and data — if the need is
   already fully served by something already built (an existing link,
   an existing form, an existing page), that's a reason to reuse or
   extend it rather than add a parallel one, even if the live site has
   a dedicated widget for it (see `EmailSignup`'s removal in §7 for a
   worked example of this going the other way after it was built).
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

- Preserve Unity Provisions' real mission, voice, branding, and factual
  content — who they are, what they do, their real numbers, partners,
  and story — this is a specific organization's site, not a generic
  template. "Preserve" means preserve the substance, not transcribe the
  live site's exact sentences verbatim — see the higher-standard
  principle below.
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
  a real concern — never by default. This also means not building a
  parallel mechanism (a native form, a custom widget) for something an
  existing, already-working link or integration already covers — see
  `EmailSignup`'s removal in §7 for a concrete case where this applied.
- Accessible, performant, responsive, and SEO-sound from the start.
- **This is a remake to a higher standard, not a verbatim copy.** The
  live site (unityprovisions.org) is a real, valuable reference for the
  organization's actual facts, mission, voice, and structure — but it
  was built with a drag-and-drop site builder, not this project's design
  system, and its exact wording, layout, and visual polish reflect that.
  Don't just transcribe its content. If live copy is unclear,
  grammatically rough, or reads as a lower bar than the rest of this
  rebuild, rewrite it — clearer, correct, more professional — while
  keeping the underlying facts and organizational voice intact. The same
  applies to placement and visual presentation: a section can be
  reorganized, restyled, merged, dropped, or given a more polished
  treatment than its live-site counterpart, if that serves the visitor
  better. This cuts both ways: something the live site includes "for
  free" via its site-builder platform (a bundled widget, a duplicate
  CTA) may cost real engineering effort to replicate natively here, and
  isn't automatically worth building just because it's live — see
  `EmailSignup`'s entry in §7 for the concrete case this came up
  against. Every such change should still be a deliberate, documented
  call (see §2's per-component process, and §7's entries for further
  examples: `YouTubeEmbed`'s click-to-load facade is a deliberate
  improvement over the live site's plain eager iframe).

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
│   │   ├── ContactForm.astro           ✅ built — Home
│   │   └── DonateBanner.astro          ✅ built — Home
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

**Note:** `EmailSignup.astro` was built in an earlier pass of this
project, then removed after reconsideration — see §7's "Considered and
Removed" note under Page Sections for the full reasoning. If the file
still exists on disk in the actual repo, delete it; it should not be
recreated without revisiting that note first.

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
- Note: still doesn't accept `type="reset"` or an `id` prop.
  `ContactForm`'s Cancel button needs identifying without either — it's
  found via `form.querySelector('button[type="button"]')` since it's the
  only such button inside that form, and its own trigger button (which
  opens the form) is found the same way, via a wrapping `<div>`'s id
  rather than one on the `Button` itself. See ContactForm's entry: Cancel
  was briefly removed under the assumption it was a plain reset button
  (a well-known anti-pattern, since a reset sitting next to Submit on an
  already-visible form invites accidental data loss) — it turned out to
  actually close a collapsed/expanded form panel, a legitimate and
  different action, so it's back with that corrected understanding.

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
  visual separation from the page background. First used inside a page
  section by `ContactForm` — a good fit, since a form asking for a
  visitor's attention benefits from a bounded, elevated surface distinct
  from the page background, the same reasoning originally worked out for
  a native `EmailSignup` before that component was removed (see the
  "Considered and Removed" note under Page Sections below) — the Card
  treatment itself was the right call, just applied to the wrong
  component at the time.
- Props: default slot; optional `padding?: 'sm'|'md'|'lg'` (default `md`).
- Structure: single `<div>`; `bg-surface rounded-md shadow-sm` plus a
  padding utility (`p-4`/`p-6`/`p-8`) selected via a `Record` lookup keyed
  on `padding`. `md` (`p-6` = 1.5rem) matches the design system's spec
  exactly and is the default.
- Known gap: no `class` pass-through prop — a future consumer that needs
  to additionally constrain Card's width (e.g. `max-w-2xl`) will need to
  wrap it in its own outer `<div>` rather than passing a class straight
  in.

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
- If a contextual "join our email list" prompt is ever wanted on Home or
  Get Involved (see `EmailSignup`'s removal below), this is the
  component to use for it — a single `<ExternalLinkCTA>` pointed at
  `contactListFormUrl` (from `@data/footer.ts`), inlined directly into
  the page. That's a one-line addition when assembling the page, not a
  reason to build a dedicated wrapper component.

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
- Note: this rebuild's nav deliberately doesn't include an "Email List"
  item the way the live site's does — that destination is reachable via
  Footer instead (see Footer's entry below, and `EmailSignup`'s removal
  under Page Sections for the fuller reasoning on this destination).

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
- **Verified against the live site, revisited:** `unityprovisions.org`
  also shows a native inline "Join our email list" widget on its
  homepage, in addition to this Footer link and the nav's own "Email
  List" item — both already pointing at the same underlying signup. A
  native version of that widget (`EmailSignup`) was built for this
  rebuild, then removed after reconsideration: on a GoDaddy Website
  Builder site, adding a second, redundant entry point costs the
  organization nothing, so the live site keeps both; on this hand-built
  site, a native version means designing and maintaining a real form and
  a real backend, for a need this Footer link (and, on Get Involved, the
  Volunteer CTA — the same form) already fully covers. See §7's
  "Considered and Removed" note under Page Sections for the full
  reasoning.

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
- **Verified against the live site:** the current homepage reports
  6,180+ lbs collected, $21,376+ raised, 35+ branches across 8 countries
  (naming the US, Canada, India, UAE, Puerto Rico, Pakistan, Morocco, and
  England) — slightly ahead of the numbers currently in
  `src/data/stats.ts`. Not updating the data file from this alone, since
  the live-sheet mechanism above is the intended source of truth for the
  two dynamic numbers once its sharing is fixed — noting the gap here so
  it isn't mistaken for a bug later.

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
- Verified word-for-word against the live homepage's "Our Mission"
  section — matches exactly, and reads well as-is; no rewrite needed
  here under §3's higher-standard principle.

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
- The real site embeds the same video via a plain `youtube.com/embed`
  iframe with no facade — this component's click-to-load approach is a
  deliberate improvement (defers third-party load/cookies until a real
  click) under §3's higher-standard principle, not something the live
  site already does.

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
- Verified against the live site: both the partner list ("Wang YMCA of
  Chinatown," Mystic Valley YMCA, Food4Philly) and the supporter list
  match what's in `partners.ts` today.

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
- Note: this exact teaser band doesn't exist on the live site — the
  real homepage links to "Relief Route" and "Open a branch" instead (see
  ProjectSection and Become a Branch Founder content, still planned).
  Keeping this component as already built is a deliberate structural
  choice for the rebuild's Home page under §3's higher-standard/remake
  principle, not a live-site match. Unlike `EmailSignup` (see below),
  this teaser's destination (`/get-involved`) is a whole page of
  additional context, not a link that's already reachable elsewhere in
  one click — that distinction is why this component earns its keep
  while `EmailSignup` didn't.

**ContactForm** — ✅ Built
- Purpose: the site's one native form — a way for visitors to reach
  Unity Provisions directly, distinct from every other CTA on the site
  (which is an off-site Google Form/Zeffy link, not an in-house form).
- Use when: Home only, per §8.
- Props: `heading: string`, `subtext?: string` — matching the pattern of
  the other Home section components (real copy supplied by `index.astro`
  at assembly time, not baked in here). Current placeholder copy used
  during development: heading "Contact Us," a one-line subtext inviting
  questions — both are stand-ins pending real copy, same status as
  Hero's headline/tagline before real content was supplied.
- **Revised under §3's higher-standard principle, after asking "what
  does a visitor submitting this form actually want to do?"** The
  original build followed §7's initial spec (and the live site) closely
  — Name, Email, "Where did you hear about us?", a file attachment,
  reCAPTCHA, Send/Cancel, always visible on the page — and in doing so
  missed the one field the entire form exists for, carried over a field
  that doesn't earn its place, and (in an earlier pass of this revision)
  briefly misjudged what Cancel was actually for. Addressed in order:
  - **Added: a required `Message` textarea.** The original field set had
    no way for a visitor to actually say what they're contacting the
    organization about — Name, Email, and a referral-source question,
    but nothing for the message itself. That's not a minor gap; without
    it the form couldn't do its one job. This is now the form's third
    required field (`rows="5"`, `resize-y`, a `placeholder="How can we
    help you?"` for a warm, inviting entry point without cluttering the
    real label above it).
  - **Removed: the file attachment.** A general public "Contact Us" form
    has very few legitimate cases where a visitor needs to attach a
    file — and what it does add is real: an open file-upload endpoint on
    a public form is a genuine spam/malware vector, needing size limits,
    type restrictions, and scanning to handle safely. That's meaningful
    backend security work for a need almost nobody has. This is the same
    shape of issue as `EmailSignup`'s removal (see that entry): a feature
    that exists because the live site's GoDaddy form builder bundles
    "Attach Files" by default, not because it was chosen for this form's
    actual needs. If a real need for attachments ever comes up (e.g. a
    school submitting a proposal), the safer answer is following up by
    email, or a dedicated Google Form (which already handles file uploads
    securely, the same way `contactListFormUrl` already handles mailing-
    list signups) — not a custom upload endpoint on a general inquiry
    form.
  - **Name is now `required`** alongside Email and Message — replying to
    an inquiry without knowing who sent it is awkward. "Where did you
    hear about us?" is the only optional field.
  - **Cancel was briefly removed, then restored with a corrected
    understanding of what it actually does.** It was first cut as an
    assumed plain reset button — a well-documented anti-pattern, since a
    reset sitting next to Submit on an already-visible, already-typed-in
    form invites an accidental full-form wipe for little real benefit.
    But the live site's actual behavior (confirmed by inspection, not
    assumption) is progressive disclosure: the form stays collapsed
    behind a single "Drop us a line!" button, and Cancel closes it back
    up again — a legitimate, different action from a reset, since
    nothing is being wiped that the visitor was actively relying on
    staying visible. Both the collapse/expand behavior and Cancel's
    corrected role are rebuilt below.
  - **Card-wrapped, elevated layout.** The form now sits inside a `Card`
    (`padding="lg"`) rather than flush on the page background like the
    other Home sections — the same "bounded surface, distinct
    background" treatment already worked out for a native `EmailSignup`
    before that component was removed (see its entry). A form asking for
    a visitor's attention benefits from being visually set apart at
    least as much as a one-field signup would have; this component just
    hadn't gotten that treatment yet. (Card has no `class` pass-through,
    so the `max-w-xl` width constraint is applied via a wrapping `<div>`
    around the `<Card>`, per Card's own documented gap.)
- Remaining field: **"Where did you hear about us?" stays a plain text
  input, not a dropdown**, and stays optional. It doesn't serve the
  visitor directly, but it's a real, low-cost, legitimate question for
  the organization's own marketing insight. §7 never specified a fixed
  set of referral-source options, and inventing one (Instagram/TikTok/
  etc.) would be adding content that wasn't actually decided; free text
  captures any answer without that guesswork.
- **reCAPTCHA** is a visibly-marked placeholder `<div>`
  (`data-recaptcha-placeholder`, dashed border, explanatory text) — not
  a real widget. Unlike the file attachment, this is a genuine,
  necessary need (spam protection on any public form, especially one
  with a free-text message field) — it stays. A real widget needs a site
  key tied to whichever submission backend is chosen (see below), so it
  can't be wired up until that decision is made.
- Structure: `<Container as="section">` (no distinct background of its
  own — the elevation now comes from the `Card` inside it, not the
  section) wrapping a centered `SectionHeading` (always visible, in both
  the collapsed and expanded states), a trigger-button wrapper `<div>`
  (visible only when collapsed), and the form panel (a `max-w-xl` `<div>`
  wrapping the `Card`, hidden by default). Every field inside the form is
  a `<label>` wrapping its `<input>`/`<textarea>` (both an implicit
  association via nesting *and* an explicit `for`/`id` pair, for maximum
  assistive-tech compatibility) in a `flex flex-col` layout, so the label
  text always sits above the field per §6's forms spec. Inputs and the
  textarea share one `inputClasses` constant (surface background,
  `border-border`, `rounded-sm`) built with `cn()`, so the "1px border,
  radius-sm" spec only has to be written once; the textarea adds
  `resize-y` on top so it can only be resized vertically, not stretched
  sideways out of the form's layout.
- **Disclosure behavior (reusing the pattern already documented for
  Navbar's mobile menu):** the panel carries a native `hidden` attribute
  by default. Clicking the "Drop Us a Line!" trigger button removes
  `hidden` from the panel, hides the trigger's wrapping `<div>`, sets
  `aria-expanded="true"` on the trigger, and moves focus to the first
  field. Clicking Cancel (inside the form) does the reverse — re-hides
  the panel, re-shows the trigger, sets `aria-expanded="false"`, calls
  `form.reset()` (clearing whatever was typed, since "Cancel" here means
  "never mind, close this" — the same reasoning that makes a Cancel
  button legitimate for a collapsible panel but not for an
  already-committed, always-visible form), and returns focus to the
  trigger. Pressing Escape while focus is inside the panel does the same
  as Cancel. Both the trigger button and the Cancel button are found via
  `querySelector` rather than an `id` prop on `Button` (which doesn't
  support one) — the trigger via its wrapping `<div>`'s id, Cancel via
  `form.querySelector('button[type="button"]')`, since it's the only
  such button inside the form (see Button's entry above).
- Submission: a separate listener on the form's `submit` event calls
  `event.preventDefault()` and logs a `console.warn` reminder — since no
  backend is wired yet (see below), letting the browser's default submit
  through would just reload the page with nowhere for the data to go.
- **Open decision carried over from §10:** the actual submission
  backend — Formspree vs. a Cloudflare Function — is still undecided.
  The markup and client-side behavior (HTML5 `required` validation, the
  disclosure/Cancel behavior, the submit interception) are complete now;
  only the real submit handler (a `fetch()` call to Formspree, or a POST
  to a Cloudflare Function) and the real reCAPTCHA widget are deferred
  until that's chosen.
- **Why this stays a native form, unlike `EmailSignup` (see that
  entry):** this form now collects a real message — there is no existing
  external form on this site that does that. The Google Form behind
  "Email List"/"Volunteer" only asks for name/email/phone/state, a
  different, simpler shape. ContactForm fills a genuine gap rather than
  duplicating something that already works.
- **Verified against the live site, revisited:** the real homepage's
  "Contact Us" section has Name, Email (marked required), "Where did you
  hear about us?", "Attach Files," a reCAPTCHA notice, and Send/Cancel —
  and, going by the visible page text captured, no distinctly-labeled
  message field either, though GoDaddy's contact-form widget likely
  renders one that just didn't surface in a text-only fetch. The live
  site also confirmed something worth reproducing on its own merits: the
  form is collapsed behind a "Drop us a line!" button by default, not
  shown in full immediately — a real, good instance of progressive
  disclosure this rebuild now matches (see the disclosure-behavior note
  above), independent of §3's general caution against copying the live
  site by default. The live site also shows a contact email
  (`contact@unityprovisions.org`) above its form, which isn't reproduced
  here; worth deciding whether to add it as static text alongside the
  heading/subtext once real copy is finalized.

**~~EmailSignup~~ — Considered, built, then removed**
- What it was: a native inline mailing-list signup form (heading, an
  Email input, a Sign Up button), planned for Home and Get Involved, and
  at one point fully built — including a revised, professionally-rewritten
  version of its copy and a `Card`-based elevated layout.
- **Why it was removed:** on review, the actual destination for "join
  the email list" is an external Google Form
  (`contactListFormUrl` in `src/data/footer.ts`) that Google already
  hosts, processes, and stores submissions for, at zero engineering or
  maintenance cost. That destination already has two live entry points
  on this site: the Footer's "Email List" link (present on every page
  via `Layout.astro`), and — on the page `EmailSignup` was also planned
  for — the Get Involved page's Volunteer CTA, which (per §10) resolves
  to the *exact same form URL*. Building a third, native version meant
  designing, wiring, and maintaining a real backend (Formspree, a
  Cloudflare Function, or a newsletter provider) purely to re-solve a
  problem that already has a working solution — and on Get Involved
  specifically, it would have sat directly beside a CTA pointing at the
  identical destination.
- **Why the live site has this, and why that didn't transfer:**
  unityprovisions.org's version is a GoDaddy Website Builder built-in
  widget — adding it costs the organization nothing there, no code, no
  backend, so a redundant entry point is essentially free for them. In a
  hand-built Astro site, the same redundancy isn't free: it's a real
  form, a real submission handler, and a real backend decision to build
  and maintain. §3's higher-standard principle — a remake, not a
  verbatim copy — cuts against replicating this specific pattern once
  the cost/benefit no longer matches; this is the concrete case that
  principle's own text now points to.
- **What removing it cleaned up:** the "EmailSignup submission backend"
  line that was in §10 is gone entirely, not just deferred — there's
  nothing left to wire up, since the existing Google Form already
  handles it. A field-label consistency flag that once compared this
  component's "Email Address" wording against `ContactForm`'s "Email" is
  also moot now that there's only one native form on the site.
- **If a persuasive nudge is still wanted later:** see `ExternalLinkCTA`'s
  entry above — a single instance of that component, pointed at
  `contactListFormUrl` and inlined directly into a page, covers this
  without a dedicated wrapper file. That's a one-line addition at
  assembly time, not a reason to keep (or rebuild) a dedicated
  component.
- Contrast with `GetInvolvedTeaser` (kept) and `ContactForm` (kept): both
  of those route to something genuinely not available in one click
  elsewhere (a full page of context, or a richer form respectively) —
  see their own entries above for the specific distinction in each case.

**DonateBanner** — ✅ Built
- Purpose: a second, deliberately later "give money" ask on Home — a
  closing CTA band positioned after Mission, Impact, the video, Partners,
  Get Involved, and Contact, for visitors who've read through the whole
  page and scrolled well past both earlier donate prompts (Navbar's
  button, which isn't scroll-sticky and disappears once you scroll down;
  Hero's CTA, seen once at the very top). This is a genuinely different
  case from `EmailSignup`'s redundancy: that was an identical link
  duplicated right next to another identical link; this is the same
  underlying action, offered again deliberately at a different point in
  a long page's reading journey, once the earlier CTAs are long out of
  view — a standard, legitimate nonprofit fundraising pattern.
- **Use when: Home only — narrowed from the original "Home and the
  Donate page," resolving the scope question that had been open since
  `EmailSignup`'s removal.** `QRCodeDonate` is already documented as
  "the primary, fully-specified content" of the Donate page — the first
  thing a visitor sees there. Adding a second identical banner further
  down that same short, two-section page would repeat the same button
  right after its own opening ask, reading as redundant rather than
  reinforcing (unlike Home's much longer scroll, where the gap between
  the first and second ask is substantial). See §10 for the closed-out
  decision.
- **Not a floating/sitewide widget, unlike the live site's version.**
  `unityprovisions.org`'s real donate promo ("We Launched Our Zeffy")
  renders as an overlay present on every page (Home, `/become-a-branch-
  founder`, even a dead-end login page). Two reasons this wasn't carried
  over: first, this codebase has no existing pattern for persistent/
  floating UI — building one would be new architecture for a single
  component, not a small addition, the same "free for them, real
  engineering for us" gap already worked out for `EmailSignup`. Second,
  a donate popup following visitors across every page, including
  informational ones like About or Team, reads as pushy rather than
  trust-building for a young nonprofit — a judgment call under §3's
  higher-standard principle, not just an engineering-cost one.
- **CTA routes to `/donate` (this rebuild's own internal page), not
  straight to Zeffy.** The live site's Hero button and floating widget
  both link directly to Zeffy — the live site has no internal donate
  page with a QR code and impact tracker the way this rebuild's
  `/donate` does. Routing here matches what this rebuild's own `Hero`
  and `Navbar` already do (both point at `/donate`, not Zeffy directly),
  funneling visitors through the fuller give-and-track experience rather
  than around it. Consistent with `GetInvolvedTeaser`'s exact pattern,
  `href="/donate"` is hardcoded inside the component, not exposed as a
  prop — this component's whole identity is "the band that closes Home
  by pointing at Donate," and hardcoding the destination keeps that
  permanently true.
- **Copy, rewritten, not copied.** The live version's heading ("We
  Launched Our Zeffy") reads like an internal platform-migration
  announcement, not a donor-facing ask — a candidate for rewriting under
  §3's higher-standard principle from the moment it was first noted.
  Recommended real copy for assembly: heading "Support Our Mission,"
  subtext "Your gift helps us stock donation centers, launch new
  branches, and reach students who need it most" — both tie the ask to
  concrete outcomes already established earlier on the page (Impact
  Stats, Partners) rather than announcing a payment-platform change.
  `ctaLabel`: "Donate Now."
- **No image prop**, unlike the original spec ("promo image, heading,
  ctaLabel/ctaHref"). No promo image asset exists in this project (§5's
  `assets/donate/` only lists a QR code image, not yet supplied, for a
  different component) and a bold color band with clear copy and a
  single button is a complete, professional pattern without one — the
  same reasoning already applied to `Hero`, which also ended up with no
  image prop despite an early `global.css` comment hinting one might be
  needed. If a real photo is supplied later, it can be added then;
  building for a hypothetical asset now would be speculative.
- Props: `heading: string`, `subtext: string`, `ctaLabel: string` — all
  required, no defaults, matching `GetInvolvedTeaser`'s exact shape
  (this component's closest sibling: both are closing-teaser bands with
  a hardcoded internal destination).
- Structure: `<div class="bg-primary-hover">` wrapping
  `<Container as="section">`, following the same pattern already used by
  `Navbar`'s `<header>` — a full-bleed background needs a plain wrapping
  element around `Container`, not `Container as="section"` alone (see
  Container's own entry above for why). Inside: a centered flex column
  with a plain `<h2>` and `<p>` (not `SectionHeading` — see below) and a
  `Button` (`variant="accent" size="lg"`).
- **`bg-primary-hover`, not `bg-primary`, for the band's background —
  a real accessibility reason, not a stylistic one.** This site's global
  focus ring (`global.css`) is `outline: 2px solid var(--color-primary)`.
  Using that same color as the band's own background would make the
  ring invisible to keyboard users tabbing to the Donate button, since
  it would exactly match the backdrop it sits against. `--color-primary-
  hover` is a distinctly darker shade of the same brand color — same
  family, real contrast against the lighter ring color.
- **Not using `SectionHeading`, for the same reason `Hero` doesn't.**
  `SectionHeading` hardcodes `text-text-primary`/`text-text-secondary`
  for its heading/subtext, with no prop to override them — dark text
  that would be nearly unreadable against this band's colored
  background. A plain `<h2>`/`<p>` with explicit `text-white`/
  `text-white/80` was used instead, matching Hero's own precedent of
  writing custom markup when `SectionHeading`'s fixed styling doesn't
  fit.

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
DonateBanner. (`EmailSignup` was planned here, then removed — see §7's
"Considered and Removed" note.)

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
Sections: Branch Founder content → Volunteer CTA (external). (`EmailSignup`
was planned here too, then removed — its destination is the same form
URL as the Volunteer CTA immediately above it, which would have made it
a literal duplicate on this specific page; see §7's "Considered and
Removed" note.)
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
    - [x] ContactForm
    - [x] DonateBanner
    - [ ] Assemble `index.astro` — next
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
  Markup and client-side behavior (validation, Cancel-reset, submit
  interception) are built — see ContactForm's §7 entry; only the real
  submit handler and reCAPTCHA widget are still pending this choice.
  (There is no longer an `EmailSignup` backend decision to track here —
  see §7's "Considered and Removed" note; that need is already served by
  the Email List/Volunteer form above.)
- Donation tracker embed on the Donate page: pending visual inspection.
- Get Involved page's "Volunteer CTA": the Google Form behind it is a
  general contact-list signup (name/email/phone/state), not volunteer-
  specific — decide before building `get-involved.astro` whether the
  "Volunteer" framing/copy still makes sense, gets adjusted, or the CTA
  is merged with the Email List concept entirely.
- ~~DonateBanner scope and copy~~ — resolved; see §7's entry. Built
  Home-only (not Donate — `QRCodeDonate` already covers that page), as
  a normal in-page section rather than a sitewide floating widget, with
  rewritten donor-facing copy and a CTA routed to this rebuild's own
  `/donate` page rather than straight to Zeffy.
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
    3. The live site's current homepage reports slightly higher numbers
       (6,180+ lbs, $21,376+) than `src/data/stats.ts`'s fallback values
       — see ImpactStats's §7 entry. Not corrected here since the sheet
       is the intended source of truth; flagging so the gap isn't
       mistaken for a data bug later.

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
  As of this update, that confirmation includes checking the real live
  site (unityprovisions.org) for whether the content actually exists
  there and where — real signal for the decision, never a mandate to
  copy it exactly (see §2, §3) — and checking this site's own existing
  components/data for whether the need is already served, since the
  live site's own economics for adding something (often free, via a
  site builder) don't apply to a hand-built rebuild.
- **This is a remake to a higher standard, not a verbatim copy (see §3).**
  Live copy, layout, and visual treatment are a starting reference, not
  a target to reproduce exactly. Rewrite wording that's unclear or
  grammatically rough, restyle sections that read as flat or easy to
  miss, reorganize content where it serves the visitor better, and drop
  a section entirely if it turns out to just duplicate something this
  site already does elsewhere — all while keeping the organization's
  real facts, mission, and voice intact. `YouTubeEmbed`'s click-to-load
  facade (an improvement kept) and `EmailSignup` (built, then removed
  once it was clear it duplicated the Footer's existing Email List link
  and Get Involved's Volunteer CTA — see §7's "Considered and Removed"
  note) are the concrete examples on record so far.
- Real content (team roster, impact numbers, project descriptions, page
  copy) lives in typed data files or directly in page templates — use it
  as captured here rather than re-researching it. Where a §7 entry notes
  it was "verified against the live site," that's a live re-check done
  during this project, not just a carry-over assumption.
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
  file tree. The exception is `EmailSignup.astro`: if it still exists on
  disk in the actual repo, that's leftover from before this removal, not
  a placeholder — delete it (see §7's "Considered and Removed" note).