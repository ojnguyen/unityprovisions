<!--
Synced against this Project's knowledge base on Aug 20, 2026 (the repo
isn't actually live-connected — its content lives in Project Knowledge,
reconstructed from search results, not read as one file). Diff against
your local copy before treating this as canonical if you've made edits
since your last sync.
-->

# Unity Provisions Website — Master Roadmap

The single source of truth for this project. A new session should be
able to read this file top to bottom and continue development without
any other context. **Keep it that way, and keep it concise** — facts
and current decisions, not narrative history.

**How to keep it that way when editing:** one line per fact. A "why"
only when it prevents a future mistake, condensed to a sentence, not a
paragraph. State a convention once, in the section it belongs to, and
reference it (`§6`, `§11`) everywhere else it applies — don't restate
the rationale at every point of use.

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

**Current phase:** Phase 5 (Build Pages) is complete — all six pages
built. Currently in the Cross-Cutting checklist (§9), then Phase 6
(Deployment). Phase 4 (Shared Infrastructure) is complete.

**Status source of truth:** §5's file tree (✅ Built / 📋 Planned / 🔶
blocked-or-partial). Trust that over any summary, including this one,
if they ever disagree.

**Continue here** *(replaced each session, not appended to):* A
`Divider` UI primitive (§7) is now placed at every white-white section
seam site-wide (§11) — three sections initially missed the associated
top-padding trim (`ContactForm`, `About_Team`, `Get-Involved_ContactList`)
and have been fixed. `PageHeader`'s §7 entry also had real detail
restored after a prior full-document regeneration in this chat had
dropped it — worth diffing any regeneration, including this one,
against the actual repo rather than trusting it by default.

Remaining: Responsive/Performance/Cross-browser checks and comment
cleanup (§9) — all still need a live/dev-server URL, or for comment
cleanup, a style example from the project owner.

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
  else on this site (see `EmailSignup`'s removal, §5).
- Accessible, performant, responsive, SEO-sound from the start.
- **Remake, not a clone.** unityprovisions.org is a reference for real
  facts, voice, and structure — not a target to reproduce exactly, and
  **not a color reference at all** (explicit direction, overrides the
  general rule below for color specifically — see §6). Rewrite unclear
  or rough copy; restyle, reorganize, merge, or drop sections that
  don't serve the visitor as well as they could; don't replicate
  something "free" on the live site's page-builder (a bundled widget, a
  duplicate CTA) if it costs real engineering here for no real benefit.
  Every such change gets documented in §7, not made silently.

---

## 4. Technology Stack

- Astro (latest stable) + TypeScript strict mode.
- Tailwind CSS v4, CSS-first (`@theme` in `global.css`; no
  `tailwind.config.mjs`; `@tailwindcss/vite` in `astro.config.mjs`).
- Integrations: `sitemap()`, `mdx()`, `astro-icon()`. Icons: Lucide +
  Simple Icons via astro-icon, used across most sections.
- **Image domains:** `astro.config.mjs`'s `image.domains` allowlists
  `i.ytimg.com` (YouTubeEmbed's remote thumbnail, §7) — Astro's Image
  pipeline refuses any remote domain not listed here.
- **Sharp** is a required dependency for `astro:assets`/`<Image>` to
  generate anything locally. Without it, every local image silently
  fails at render time (`Could not find Sharp` in the dev server log,
  not a build/type error) — check for this first if local images ever
  go blank again.
- Path aliases (`tsconfig.json`): `@components/*`, `@layouts/*`,
  `@styles/*`, `@data/*`, `@utils/*`, `@assets/*`, `@/types`. No
  `baseUrl` (deprecated in TS 6.0) — every alias has its own
  `./src/...` prefix. No `@content/*` alias — never needed.
- No CSS-in-JS, no component library. `cn()` = zero-dependency class
  joiner; add `tailwind-merge` only if a real class-conflict-resolution
  need comes up.
- `utils/stats.ts`'s `getStatValue(label)` looks up a `stats.ts` entry
  by label (e.g. `'branches'`, `'countries'`) — used by page copy that
  references those counts, so it can't drift out of sync with
  `stats.ts`.
- `utils/images.ts`'s `getImageDimensions(src, fallback)` resolves the
  real width/height to request from `ResponsiveImage` for an
  `ImageMetadata | string` prop — real dimensions read directly off a
  local import, or the caller's fallback for a plain string src. Shared
  by PartnersAndSupporters, StaffCard, and ProjectSection (§7).
- **Live data:** `ImpactStats` live-updates 2 of its 4 stats from a
  public Google Sheet via `gviz/tq` (JSONP `<script>`, not `fetch()` —
  gviz blocks CORS). Keeps the site fully static — no SSR, no API keys.
  Details in §7 (ImpactStats) and §10.

---

## 5. Project Architecture

### File & Naming Conventions

- **`src/components/reusable/`** — shared components (used on 2+ pages,
  or that isolate a real reusable concern). Subfolders: `ui/`,
  `layout/`, `sections/`, `staff/`, `projects/`, `donate/`.
- **`src/components/page-specific/{page-slug}/`** — components used on
  exactly one page. Filename: **`{PageName}_{ComponentName}.astro`** —
  `PageName` matches the route slug's casing (PascalCase for a
  single-word page, kebab-case for a multi-word one, e.g.
  `Get-Involved`). Examples: `About_Heading.astro`,
  `Get-Involved_BranchFounder.astro`.
- Home has **no** `page-specific/home/` folder — every Home section is
  a `reusable/sections/` component (plus one inline heading block and
  two `Divider`s), assembled directly in `index.astro`.
- **Assets:** dash-case filenames (e.g.
  `esther-r-sanger-center-for-compassion.jpg`), camelCase import
  identifiers (e.g. `ryanPhoto`). Organized into semantic subfolders
  under `src/assets/`, not flat.

### Project Docs
- **`project-roadmap.md'** — this file. The spec and status record.
- **`accessibility-seo-audit.md'** — the full WCAG contrast pass and SEO checklist audit (§6/§9 reference it rather than restating it).
- **`wordings.md'** — a plain-language mirror of every page's real user-facing copy, page by page. It's a convenience view that has to be updated by hand in the same edit whenever copy changes, or the two drift.

### File Tree

```
project-roadmap.md          ✅ this file (§5 "Project Docs")
accessibility-seo-audit.md  ✅ WCAG contrast pass + SEO checklist audit
wordings.md                 ✅ copy mirror — NOT canonical, see §8

public/
├── unity-provisions.svg        ✅ favicon — referenced by literal path in Layout.astro
└── old-unity-provisions.svg    ✅ previous logo mark, kept for reference — not referenced by any code

src/
├── assets/
│   ├── components/hero.jpg                                 — Hero background (index.astro)
│   ├── icons/logo.webp                                     — Navbar logo mark (§7)
│   │
│   ├── team/ryan-nguyen.webp                                — Ryan Nguyen headshot (About + Team)
│   ├── projects-and-events/
│   │   ├── biggest-event.webp                               — North Quincy branch's Dec 2024 donation photo
│   │   └── agriscan.webp                                    — AgriScan screenshot (projects.ts)
│   ├── partners-and-supporters/
│   │   ├── sodexo.jpg
│   │   ├── ymca.jpg                                         — shared: Wang YMCA, Mystic Valley YMCA, YMCA
│   │   ├── food4philly.jpg
│   │   ├── esther-r-sanger-center-for-compassion.jpg
│   │   ├── walmart.jpg
│   │   └── google.jpg
│   │   (Stephen J. Brady Stop Hunger has no logo yet — text badge)
│   └── donate/                                              — empty, intentionally: the QR is generated
│                                                               inline as static SVG (§7 QRCodeDonate), not
│                                                               a supplied image — nothing belongs here.
│
├── components/
│   ├── reusable/
│   │   ├── ui/
│   │   │   ├── Button.astro                ✅
│   │   │   ├── SectionHeading.astro        ✅
│   │   │   ├── Card.astro                  ✅
│   │   │   ├── ResponsiveImage.astro       ✅
│   │   │   ├── Container.astro             ✅
│   │   │   ├── ExternalLinkCTA.astro       ✅
│   │   │   ├── WhiteSpace.astro            ✅ — plain white spacer
│   │   │   └── Divider.astro               ✅ — full-bleed hairline (§11)
│   │   ├── layout/
│   │   │   ├── Navbar.astro                ✅
│   │   │   └── Footer.astro                ✅
│   │   ├── sections/
│   │   │   ├── Hero.astro                  ✅ — Home
│   │   │   ├── ImpactStats.astro           ✅ — Home, About
│   │   │   ├── MissionStatement.astro      ✅ — Home
│   │   │   ├── YouTubeEmbed.astro          ✅ — Home
│   │   │   ├── PartnersAndSupporters.astro ✅ — Home, About
│   │   │   ├── GetInvolvedTeaser.astro     ✅ — Home
│   │   │   ├── ContactForm.astro           ✅ — Home
│   │   │   ├── DonateBanner.astro          ✅ — Home
│   │   │   └── PageHeader.astro            ✅ — About, Team, Projects,
│   │   │                                       Get Involved, Donate
│   │   ├── staff/
│   │   │   ├── StaffCard.astro             ✅ — Team
│   │   │   └── StaffGrid.astro             ✅ — Team
│   │   ├── projects/
│   │   │   └── ProjectSection.astro        ✅ — Projects
│   │   └── donate/
│   │       ├── QRCodeDonate.astro          ✅
│   │       └── DocumentEmbed.astro         ✅
│   │
│   └── page-specific/
│       ├── about/
│       │   ├── About_Heading.astro                 ✅ PageHeader + founder story (photo, prose)
│       │   ├── About_BiggestEvent.astro            ✅
│       │   ├── About_Stats.astro                   ✅ ImpactStats + 8-country caption
│       │   ├── About_PartnersAndSupporters.astro   ✅
│       │   ├── About_AnnualReport.astro            ✅
│       │   └── About_Team.astro                    ✅ closing section (§7/§8)
│       ├── team/
│       │   └── Team_Heading.astro                  ✅ PageHeader + StaffGrid
│       ├── projects/
│       │   └── Projects_Heading.astro              ✅ PageHeader wrapper
│       ├── get-involved/
│       │   ├── Get-Involved_Heading.astro          ✅ PageHeader wrapper
│       │   ├── Get-Involved_BranchFounder.astro    ✅
│       │   └── Get-Involved_ContactList.astro      ✅
│       └── donate/
│           └── Donate_Heading.astro                ✅ PageHeader wrapper
│
├── data/
│   ├── navigation.ts     ✅ 6-item nav + orgName
│   ├── footer.ts         ✅
│   ├── staff.ts          ✅ 8 members — Ryan has a real photo, others pending
│   ├── stats.ts          ✅
│   ├── partners.ts       ✅
│   └── projects.ts       ✅ 2 projects
│
├── layouts/Layout.astro  ✅
│
├── pages/
│   ├── index.astro          ✅ Home
│   ├── about.astro          ✅ About
│   ├── team.astro           ✅ Team
│   ├── projects.astro       ✅ Projects
│   ├── get-involved.astro   ✅ Get Involved
│   └── donate.astro         ✅ Donate
│
├── styles/global.css     ✅
├── utils/
│   ├── cn.ts              ✅
│   ├── stats.ts           ✅ getStatValue()
│   └── images.ts          ✅ getImageDimensions() — real ImageMetadata
│                              dims, or a caller-supplied fallback for a
│                              string src (§4/§7)
└── types.ts               ✅
```

`EmailSignup.astro` was built, then removed — deletion confirmed. Don't
recreate without re-reading its §7 history.

---

## 6. Design System

### Color
Defined once in `global.css`'s `@theme` block.

| Token | Value | Note |
|---|---|---|
| `--color-bg` | `#ffffff` | Page base — deliberately independent of the live site |
| `--color-surface` | `#eef3ea` | Soft sage — alternating bands, Navbar/Footer, Card |
| `--color-text-primary` | `#1a1a1a` | |
| `--color-text-secondary` | `#5c5c5c` | |
| `--color-primary` | `#355e3b` | Deep forest green, ~7:1 vs white text |
| `--color-primary-hover` | `#26442a` | |
| `--color-accent` | `#a8592b` | Deep terracotta, ~5:1 vs white text |
| `--color-accent-hover` | `#79401f` | ~8:1 vs white text |
| `--color-border` | `#d7e1d1` | |
| `--color-border-interactive` | `#729266` | Muted sage-green — interactive-element boundaries + Navbar active/hover fills (§7) |
| `--color-success` | `#2f7d4f` | Unreviewed |
| `--color-error` | `#b3413b` | Unreviewed |

Palette is a deliberate, independent design decision — unityprovisions.org
is out of scope as a color reference (§3).

### Typography
`--font-display`/`--font-body`: both **Manrope Variable** (self-hosted,
`@fontsource-variable/manrope`), differentiated by weight, not two
typefaces.

| Token | Size | Use |
|---|---|---|
| `--text-xs` | 12px | captions |
| `--text-sm` | 14px | meta, labels |
| `--text-base` | 16px | body |
| `--text-lg` | 18px | lead paragraphs |
| `--text-xl` | 24px | h3 |
| `--text-2xl` | 32px | h2 |
| `--text-3xl` | 44px | h1 / hero |

**Gotcha:** scale only defines up through `--text-3xl`. Tailwind's
`text-4xl`+ utilities fall back to *un-customized* defaults (36px) —
smaller than this system's `text-3xl` (44px). Don't reach for `text-4xl`+
assuming it's bigger.

### Spacing, Radius, Shadow
Tailwind default breakpoints, no overrides. Content max-width
`max-w-[90rem]` (1440px, `Container.astro`). Radius: sm 4px / md 8px /
lg 16px. Shadow: sm/md/lg at 0.06/0.08/0.12 alpha. Prefer scale-based
spacing utilities (`h-100`) over pixel arbitrary values (`h-[400px]`)
whenever the unmodified default `--spacing` scale already lands on the
same value — arbitrary brackets stay reserved for genuinely off-scale
values (`max-w-[90rem]`, gradient stops, `mask-y-from-accent`).

### Component Style Conventions
- **Buttons:** primary (solid) / secondary (outline) / accent (solid) —
  150ms ease hover, always resolves to a fixed `-hover` token, never an
  opacity blend (keeps hover appearance identical regardless of the
  background a button sits on).
- **Cards:** surface background, `radius-md`, `shadow-sm`, 1.5rem padding.
- **Forms:** surface-background inputs, 1px border, `radius-sm`,
  primary-colored focus ring, labels always above fields.
- **Full-bleed section backgrounds:** wrap `<Container>` in a plain
  background `<div>` — the standard pattern for `bg-surface`/
  `bg-primary` bands.
- **Sage (`bg-surface`)** is reserved for a section's actual **content**
  (a data grid, screenshot, embed, QR code) — never a heading block
  alone. The heading stays in its own white block above it.
- **Heading top padding:** `pt-12 md:pt-16` when preceded by a
  color-band transition (a sage band or gradient band like `PageHeader`/
  `Hero` ending); trimmed to `pt-8 md:pt-10` when preceded by a
  `Divider` (§11) instead, so the hairline reads as attached to what
  follows rather than floating in the gap. Bottom padding is unaffected
  either way — only the section *after* a boundary ever gets its top
  trimmed. A symmetric `py-12 md:py-16` section becomes `pt-8 pb-12
  md:pt-10 md:pb-16` if it later needs the trim; an already-asymmetric
  `pt-12 pb-4 md:pt-16 md:pb-6` one just changes its `pt`/`md:pt` values.
- **Interior page titles (`bg-linear-to-l from-primary-hover/90 to-primary-hover`)**
  — every page except Home uses `PageHeader` (§7) for its title band: a
  subtle horizontal gradient, white text, centered, `py-16 md:py-20`.
  Shorter than Home's `Hero` (`py-24 md:py-32`) and no CTA row, so
  Home's full photo hero stays the site's one "biggest" visual
  statement — interior pages get a consistent, smaller, color-only echo
  of it instead of repeating it.
  - **Photo legibility:** a CSS `mask-image` (Hero's `mask-y-from-accent`
  utility class) is the established pattern for text-over-photo
  sections — not a gradient-overlay `<div>`.
- A light-colored control on a dark/photo background is hand-written,
  not `Button`'s `secondary` variant (assumes a light page background).
- Icon badges (circular `bg-primary/10` Iconify) are reserved for bare
  heading+subtext+button sections with **no other visual anchor**
  (MissionStatement, GetInvolvedTeaser, About's Team CTA, About's Annual
  Report, Get Involved's Stay Connected). Sections with their own anchor
  (photo, band, checklist, grid) skip the badge. Each section's icon
  should be distinct from every other section's. Current assignments:
  `lucide:heart` (Our Mission), `lucide:handshake` (Get Involved),
  `lucide:users` (Meet the People Behind It), `lucide:book-open`
  (Annual Report), `lucide:mail` (Stay Connected). Home's Partners &
  Supporters heading deliberately skips the badge — it has its own
  visual anchor (the logo grid below).
- `SectionHeading`'s `eyebrow` is opt-in — only when it adds real
  information the title doesn't already carry. The founder story's "Our
  Story" and Get Involved's "Branch Founder" eyebrows are the
  deliberate exceptions; Home's sections never use it.
- If a page's last section before Footer is sage, insert `WhiteSpace`
  (§7) so the two sage bands don't visually merge.
- **Images (`ResponsiveImage`, §7):** request `width`/`height` at the
  image's own real, generous resolution — its full native size for a
  local import, comfortably above any real display size for a remote
  one — never a size tuned to the display box. Display size is a
  separate CSS concern: a fixed box + `object-contain` (logos,
  never crops) or `object-cover` (headshots, crops to fill) for a
  grid/row that needs uniform items, or `w-full h-auto` for a single
  image that should scale to its container.

### Accessibility
- `:focus-visible` — 2px solid primary, 2px offset, global.
- One `<h1>` per page. Real `alt` text (decorative image nested inside
  an already-labeled control excepted, e.g. Hero's background,
  YouTubeEmbed's thumbnail, Navbar's logo mark). All decorative icons
  `aria-hidden`.
- Alt text shouldn't lead with "photo of," "image of," or "picture
  of" — a screen reader already announces the element is an image.
  Astro's own accessibility check flags this. (`ProjectSection`'s
  `` `Screenshot of ${title}` `` fallback alt may hit the same check
  once exercised; not yet changed.)
- Every form input has a real `<label>`. Icon-only controls get
  `aria-label`.
- `<a>`/`<button>` never substituted for each other.
- Mobile nav: full keyboard operability + correct focus management.
- Viewport meta includes `initial-scale=1` — required for `md:`
  breakpoints to behave correctly on real phones.
- Contrast: full systematic pass done (`accessibility-seo-audit.md`),
  every real text combination clears WCAG AA (most AAA). `ContactForm`'s
  inputs use `--color-border-interactive` (`#729266`) and `bg-bg` — a
  separate token from the decorative `--color-border`, since
  interactive-element boundaries need 3:1 contrast under WCAG 1.4.11.
- Every content section should have a heading a screen-reader user can
  navigate by — a bare logo/image grid with no heading is a real gap
  even when each individual image has good `alt` text.

---

## 7. Component Library

Status: ✅ Built · 🔶 Built but incomplete/blocked · 📋 Planned

### Reusable — `src/components/reusable/`

**ui/**
- **Button** — `variant?: primary|secondary|accent`(primary),
  `size?: sm|md|lg`(md), `href?`, `type?`(button), `target?/rel?`.
  `<a>` if `href` set, else `<button>`. No `type="reset"`/`id` —
  components needing one instance use `querySelector` (see ContactForm).
- **SectionHeading** — `as?`(h2), `icon?`, `eyebrow?`, `title`(required),
  `subtext?`, `align?`(left). Text colors hardcoded — components on
  colored backgrounds write custom heading markup instead. Renders the
  circular icon badge (§6) internally when `icon` is passed.
- **Card** — `padding?`(md), `bg?: surface|bg`(surface). No `class`
  pass-through — wrap in an outer `<div>` for width constraints.
- **ResponsiveImage** — wraps `astro:assets`'s `<Image/>`. `src`,
  `alt`, `width`, `height` all required; `radius?`(md), `loading?`(lazy),
  `class?` (merged in after the radius class). `width`/`height` should
  be the image's real, generous resolution, not its display size —
  see §6 "Images."
- **Container** — `as?`(div), `maxWidth?`(`max-w-[90rem]`). No `id` —
  wrap in an outer `<div id>` if a scroll anchor is needed.
- **ExternalLinkCTA** — wraps `Button`, hardcodes
  `target="_blank" rel="noopener noreferrer"`. `label`, `href`, `icon?`.
  Reserved for isolated CTAs, not dense link rows.
- **WhiteSpace** — `<div class="py-12 md:py-16">`. Used when a page's
  last section is sage so it doesn't merge into Footer's sage
  (Projects, Donate use it; About and Get Involved don't need it —
  both end white).
- **Divider** — no props. `<div class="border-t border-border">`,
  full-bleed hairline. Placed at any section seam whose two touching
  edges are both white, regardless of whether either section contains
  sage elsewhere in itself (§11). Current placements: `About_Heading`/
  `About_BiggestEvent`, `About_BiggestEvent`/`About_Stats`,
  `About_Stats`/`About_PartnersAndSupporters`, `About_AnnualReport`/
  `About_Team`, Home's `MissionStatement`/`YouTubeEmbed`, Home's
  `GetInvolvedTeaser`/`ContactForm`, `Get-Involved_BranchFounder`/
  `Get-Involved_ContactList`.

**layout/**
- **Navbar** — 6 nav items + orgName + logo mark. Separate
  desktop/mobile `<ul>` — a class always wins the cascade over a
  JS-toggled `hidden` attribute, so combining them into one list breaks
  the JS toggle. Disclosure pattern (`aria-expanded`/`controls`,
  focus-to-first-link, Escape). Donate renders as an accent `Button`,
  so it doesn't get active-page styling. No "Email List" nav item (the
  live site has one) — reachable via Footer and Get Involved's Stay
  Connected only. Logo mark (`astro:assets` `<Image>`,
  `@assets/icons/logo.webp`) sits inside the same `/` link as
  `orgName`, `alt=""` (decorative — the link's accessible name already
  comes from the visible org-name text, §6). Real Unity Provisions
  logo — a sketched spoon-and-branches illustration, supplied as white
  line art on transparent and recolored here to `--color-primary`
  (only the fill color changed; linework is the original supplied
  artwork). Kept as `.webp` (lossless, alpha preserved). Displayed at
  `h-14` (203×170 real size).

  Sticky (`position: sticky; top-0; z-50`). A single `data-scrolled`
  attribute on the `<header>` drives every visual change via
  `group-data-[scrolled=true]:` Tailwind variants, flipped by an
  rAF-throttled scroll listener using pixel hysteresis (50px to enter
  "scrolled", 10px to exit) to avoid flicker at the threshold. On
  scroll: padding `py-4`→`py-2`, logo `h-14`→`h-10`, background
  `bg-surface`→`bg-text-secondary/30` + `backdrop-blur-sm`. `shadow-sm`
  stays on in both states — that's what keeps the nav/content boundary
  visible regardless of what's scrolling underneath, not the tint color
  itself. `--color-text-secondary` is used for the tint because it's a
  neutral hue distinct from the site's own sage/white content bands.

  Active nav link: `bg-border-interactive/40` pill (`rounded-full`
  desktop, `rounded-md` mobile), plain `text-text-primary`. Inactive
  links: `hover:bg-border-interactive/10`. Both are fills, not text
  color changes, so they stay legible regardless of what's behind the
  translucent header. Not `bg-accent/30` — `--color-accent` is reserved
  for CTA semantics (the Donate button).
- **Footer** — nav links, Email List/Linktree, socials, phone,
  copyright (`new Date().getFullYear()`). Plain `<a>`, not
  `ExternalLinkCTA` (too heavy for a dense link row).

**sections/**
- **Hero** — Home's `<h1>`. `headline/tagline/ctaLabel/ctaHref`
  (required), `subtext?`, `secondaryCtaLabel?/secondaryCtaHref?`
  (paired), `backgroundImage?`. Real photo in use
  (`@assets/components/hero.jpg`) with `mask-y-from-accent` legibility
  mask, gradient fallback otherwise. `text-3xl` only, no `md:` override
  (typography gotcha, §6). No scroll-cue arrow. Still no `SectionHeading`
  — needs custom white-text styling on a colored/photo background,
  same reasoning as `DonateBanner`.
- **ImpactStats** — stat grid, 2/4 stats live from a Google Sheet.
  `stats: Stat[]`. Full-bleed sage band. No heading on Home; About wraps
  its own `SectionHeading` ("Our Impact"). Live sheet: ID
  `14C4v_A39CNRhI9oQ-i7GHagwggTS3jptgRGuu5UD6_w`, gid `638911803`,
  range `B1:C6` (must stay scoped to the summary block — widening it
  into the donation log below breaks Google's column-type inference).
  Matches exact label text `"Total (lbs)"`/`"Money Collected ($)"` in
  column B; falls back to `stats.ts` + a `console.warn` if
  unreachable/unshared. Sheet sharing confirmed "Anyone with the link –
  Viewer" — end-to-end live-fetch verification still needs a
  live/dev-server URL (§9).
- **MissionStatement** — `heading`, `body`(required), `icon?`. Real
  copy verified word-for-word against the live site's "Our Mission"
  section. A `Divider` sits below this, before `YouTubeEmbed`.
- **YouTubeEmbed** — `videoId`, `title` (both required). Click-to-load
  facade (thumbnail + play button) — nothing from YouTube loads until
  clicked, then swaps in a real `youtube-nocookie.com` iframe (avoids
  setting tracking cookies until the visitor opts in). Wrapped in
  `<div id="watch-our-story">` — the scroll target for Hero's secondary
  CTA. Thumbnail via `ResponsiveImage` — `hqdefault.jpg`'s real, fixed
  480×360 passed explicitly. Requires `i.ytimg.com` in
  `astro.config.mjs`'s `image.domains` (§4). `alt=""` (decorative,
  inside a labeled button). White heading + separate full-bleed sage
  band for the facade itself (§6 — sage is for content, and a video is
  content, same as a screenshot/data grid/QR code).
- **PartnersAndSupporters** — `partners`(required),
  `partnersIntro?/supportersIntro?` — presence of intro copy switches
  Home's compact badge row into About's fuller card-grid treatment.
  Full-bleed sage band. Logos render via `ResponsiveImage`, each at its
  own real native resolution (`utils/images.ts`'s
  `getImageDimensions()`), displayed in a fixed `h-12 w-12` (grid) /
  `h-10 w-10` (badge row) box with `object-contain`. Home's usage
  precedes this with a plain white heading ("Our Partners &
  Supporters," no subtext/icon) — added since the bare band previously
  had no landmark (§6 accessibility).
- **GetInvolvedTeaser** — `heading/subtext/ctaLabel`(required), `icon?`.
  `href="/get-involved"` hardcoded, `variant="primary"`. Home passes
  `lucide:handshake`, distinct from `About_Team`'s `lucide:users` (§6).
  A `Divider` sits between this and `ContactForm` below.
- **ContactForm** — `heading`, `subtext?`. Fields: Name*/Email*/
  Message*/optional "where'd you hear about us"/Send. No file
  attachment (spam/security surface for a small org). Collapsed behind
  "Drop Us a Line!" (same disclosure pattern as Navbar). Submits via a
  hand-written `fetch()` POST to Formspree (`Accept: application/json`
  for a same-page JSON response instead of a redirect). Endpoint live
  and confirmed working: `https://formspree.io/f/xbgravll` (§10). A
  `Divider` sits above this, from `GetInvolvedTeaser`.
- **DonateBanner** — `heading/subtext/ctaLabel`(required, no defaults —
  same prop shape as `GetInvolvedTeaser`, both closing-teaser bands).
  `href="/donate"` hardcoded. `bg-primary-hover` band (not `bg-primary`
  — matches the focus-ring color, which would be invisible against a
  same-color background). Home only, not Donate — `QRCodeDonate`
  already covers that page.
- **PageHeader** — `title`(required), `subtext?`, `eyebrow?`.
  `bg-linear-to-l from-primary-hover/90 to-primary-hover` band (a
  subtle horizontal gradient — switched from flat `bg-primary` on Aug
  17, 2026 after a direct visual comparison on the live page), white
  text, centered — the interior-page title treatment for
  About/Team/Projects/Get-Involved/Donate. Custom heading markup, not
  `SectionHeading` (same reasoning as `Hero`/`DonateBanner`). Shorter
  than `Hero` (`py-16 md:py-20` vs `py-24 md:py-32`), no CTA row.
  White text verified 10.81:1 AAA against solid `primary-hover`
  (`accessibility-seo-audit.md`); the 90%-opacity end is slightly
  lighter but still clears AAA by estimate (~8:1) — not independently
  re-audited, worth a real spot-check alongside Responsive/Cross-browser
  (§9). Replaced each page's previous hand-rolled heading block —
  About's was previously left-aligned; now centered like the other
  four. Added Aug 17, 2026.

**staff/**
- **StaffCard/StaffGrid** — `StaffMember` (`name/role` required,
  `email?/photo?`); `members: StaffMember[]`. `photo` optional — falls
  back to a placeholder avatar (`lucide:user`, 160×160) when unset.
  Ryan Nguyen has a real photo; the other 7 don't yet. Card
  `bg="surface"`. Email renders as a visible `mailto:` link with a
  small `lucide:mail` icon. Grid: `grid-cols-1 sm:grid-cols-2
  lg:grid-cols-4`. Photo via `ResponsiveImage`, `object-cover` (crops
  to fill an avatar — unlike a logo, which must never crop).

**projects/**
- **ProjectSection** — `Project`-typed props. White heading block +
  separate full-bleed sage band for content (screenshot or `embedUrl`
  iframe) + CTA. Relief Route embeds `reliefroute.unityprovisions.org`
  directly via a plain, always-loaded `<iframe>` — **not** the
  click-to-load facade `YouTubeEmbed` uses. A deliberate,
  project-owner-approved exception, not a new precedent. Screenshot via
  `ResponsiveImage` at its own real native resolution, `w-full h-auto`.

**donate/**
- **QRCodeDonate** — `heading/subtext/ctaLabel`(required). `donateUrl`
  hardcoded (real Zeffy campaign). QR generated as static inline SVG,
  derived from the URL (not a supplied asset) — decode-verified.
- **DocumentEmbed** — `heading/subtext`. Direct `<iframe>` of the org's
  real Google Sheet (`sheetEmbedUrl`, `/preview` path — `/edit` blocks
  framing), the same sheet `ImpactStats` reads. Hardcoded, not a prop.

### Page-Specific — `src/components/page-specific/`

Used exactly once each; doesn't isolate a reusable concern.

**about/**
- **About_Heading** — `PageHeader` (eyebrow "Our Story", h1 "Is There
  Dinner?") + the founder story below: photo/prose. Pounds/dollars kept
  deliberately vague, pointing to `ImpactStats` below; branch/country
  counts via `getStatValue()`. Photo: `ryanPhoto`, own real native
  resolution, `loading="eager"` since it's above the fold. A `Divider`
  sits below this, before `About_BiggestEvent`.
- **About_BiggestEvent** — North Quincy branch's 1,025 lb Dec 2024
  donation. Photo: `bigEventPhoto`, own real native resolution,
  `loading="eager"` (corrected by the project owner — was previously
  documented as lazy). Alt text corrected to drop a redundant leading
  "Photo from" (§6). A `Divider` sits below this too, before
  `About_Stats`.
- **About_Stats** — `ImpactStats` (fuller) + 8-country caption (US,
  Canada, India, UAE, Puerto Rico, Pakistan, Morocco, England). A
  `Divider` sits below this, before `About_PartnersAndSupporters`.
- **About_PartnersAndSupporters** — fuller `PartnersAndSupporters` with
  real, live-site-verified intro paragraphs for both groups — closes
  the §10 "per-org descriptive paragraphs blocked on verified copy"
  item. Partners' intro names Wang YMCA of Chinatown, Mystic Valley
  YMCA, and Food4Philly specifically; supporters' intro carries the
  live site's "grateful for the generous support" framing. No
  equivalent per-org detail exists for individual supporters (Sodexo,
  Walmart, Google, etc.) — not fabricated; still just the bare name
  list.
- **About_AnnualReport** — `SectionHeading` (`icon="lucide:book-open"`)
  + `ExternalLinkCTA` → FlipHTML5 flipbook
  (`https://online.fliphtml5.com/uvjxy/tupw/`), not an embedded PDF.
  Embedded PDFs are inconsistent on mobile — a plain link avoids that
  and keeps the file swappable without a redeploy. A `Divider` sits
  below this, before `About_Team`.
- **About_Team** — closing section of `about.astro`. `SectionHeading`
  (`icon="lucide:users"`, "Meet the People Behind It") + `Button` →
  `/team`.

**team/**
- **Team_Heading** — `PageHeader` ("Meet the Team") + `StaffGrid`.

**projects/**
- **Projects_Heading** — `PageHeader` ("Our Projects") wrapper.

**get-involved/**
- **Get-Involved_Heading** — `PageHeader` ("Get Involved") wrapper.
- **Get-Involved_BranchFounder** — eyebrow "Branch Founder", title
  "Build Something That Lasts", 5-item checklist, global-network
  paragraph (counts via `getStatValue()`), Apply CTA → Google Form. A
  `Divider` sits below this, before `Get-Involved_ContactList`.
- **Get-Involved_ContactList** — `SectionHeading` (`icon="lucide:mail"`)
  + heading + subtext + "Join Our Email List" CTA →
  `contactListFormUrl` (same form as Footer). Renamed from "Volunteer"
  — the form is a general contact-list signup, not volunteer-specific.

**donate/**
- **Donate_Heading** — `PageHeader` ("Donate") wrapper.

---

## 8. Page Structure

*Full page copy (founder story, mission statement, etc.) lives in the
component files themselves, which are the canonical source — not
duplicated here to avoid the two drifting apart. Ask if you want it
mirrored in this doc as well.*

### Home (`/`) — ✅
`Hero` → `ImpactStats` → `MissionStatement` → `Divider` →
`YouTubeEmbed` → "Our Partners & Supporters" heading →
`PartnersAndSupporters` (brief) → `GetInvolvedTeaser` → `Divider` →
`ContactForm` → `DonateBanner`. All `reusable/sections/` components
plus one inline heading block and two `Divider`s, assembled directly
in `index.astro` — no page-specific folder.

### About (`/about`) — ✅
`About_Heading` (`PageHeader` + founder story) → `Divider` →
`About_BiggestEvent` → `Divider` → `About_Stats` → `Divider` →
`About_PartnersAndSupporters` → `About_AnnualReport` → `Divider` →
`About_Team`. Four dividers total — every white-white seam on the page
has one; the only seams without one are where a sage band already sits
on at least one side.

### Team (`/team`) — ✅
`Team_Heading` — `PageHeader` + `StaffGrid` of 8 real members.

### Projects (`/projects`) — ✅
`Projects_Heading` → `ProjectSection` ×2 (Relief Route — live `iframe`
embed; AgriScan — screenshot) → `WhiteSpace` (AgriScan's sage band would
otherwise run straight into Footer's sage). No `Divider` placements on
this page — every section alternates white heading/sage content.

### Get Involved (`/get-involved`) — ✅
`Get-Involved_Heading` → `Get-Involved_BranchFounder` → `Divider` →
`Get-Involved_ContactList`. No `WhiteSpace` needed — last section is
plain white.

### Donate (`/donate`) — ✅
`Donate_Heading` → `QRCodeDonate` → `DocumentEmbed` → `WhiteSpace`.
Deliberately merges the live site's separate `/donate` and `/donations`
pages into one (§3).

---

## 9. Implementation Phases

### Phase 4 — Shared Infrastructure — ✅ complete
- [x] Design Tokens
- [x] Global Styles & Fonts
- [x] Utility Helpers
- [x] UI Primitives: Button, SectionHeading, Card, ResponsiveImage,
      Container, ExternalLinkCTA, WhiteSpace, Divider
- [x] Navigation & Footer Data
- [x] Navbar & Footer Components
- [x] Layout.astro

### Phase 5 — Build Pages — ✅ complete
- [x] **1. Home** (`index.astro`): Hero, ImpactStats, MissionStatement,
      YouTubeEmbed, PartnersAndSupporters, GetInvolvedTeaser,
      ContactForm, DonateBanner — assembled with real copy.
- [x] **2. About** (`about.astro`): About_Heading, About_BiggestEvent,
      About_Stats, About_PartnersAndSupporters, About_AnnualReport,
      About_Team — assembled with real copy.
- [x] **3. Team** (`team.astro`): StaffCard, StaffGrid — assembled.
- [x] **4. Projects** (`projects.astro`): ProjectSection ×2 — assembled.
- [x] **5. Get Involved** (`get-involved.astro`): Branch Founder + Stay
      Connected — assembled.
- [x] **6. Donate** (`donate.astro`): QRCodeDonate, DocumentEmbed —
      assembled.

### Cross-Cutting (every page) — in progress
- [x] Accessibility pass — contrast is a full systematic check (§6,
      `accessibility-seo-audit.md`). Keyboard/screen-reader walkthroughs
      still need a live URL.
- [x] SEO (title, meta description, OG tags, canonical URL, heading
      hierarchy, alt text) — all in place via `Layout.astro`.
- [ ] Responsive check at each breakpoint — needs a live/dev-server URL
- [ ] Performance check (image optimization, Lighthouse) — needs a
      live/dev-server URL
- [ ] Cross-browser spot check — needs a live/dev-server target
- [ ] Comment cleanup — replace long AI-style comment blocks with short
      human-written ones (blocked on a style example from the project
      owner)
- [x] Interior page headers unified via `PageHeader` component —
      About/Team/Projects/Get-Involved/Donate all updated; Home's
      photo `Hero` remains the site's only full hero treatment.
- [x] Sticky, condensing Navbar — translucent scrolled state,
      `border-interactive`-based active/hover link indicators (§7).
- [x] Sage-consistency + divider pass — YouTubeEmbed's sage band added;
      `Divider` placed at every white-white seam site-wide (§11);
      Home's Partners & Supporters heading added. Still needs a real
      visual check on a live/dev-server URL — this has been a
      code-level pass, not a rendered one.

### Phase 6 — Deployment — not started
- [ ] Compare Cloudflare Pages / Netlify / Vercel / GitHub Pages
- [ ] Recommend + set up hosting
- [ ] Domain migration considerations from GoDaddy

---

## 10. Data / Content Integrations

**Static data files:** `navigation.ts`(6-item nav) · `footer.ts` ·
`staff.ts`(8 members) · `stats.ts`(4 stats) · `partners.ts` ·
`projects.ts`(2 projects).

**External destinations:**
- Email List / Stay Connected → `https://forms.gle/7JFDkKPdzYv1LfCP6`
  (same form; CTA renamed from "Volunteer" — see §7 Get-Involved_ContactList)
- Become a Branch Founder → `https://forms.gle/qfwhsPP61RrAd1cW7`
- Relief Route (embedded live tool) →
  `https://reliefroute.unityprovisions.org/` · Help-build CTA →
  `mailto:contact@unityprovisions.org?subject=Interested%20in%20Helping%20Build%20Relief%20Route`
- AgriScan help-build CTA →
  `mailto:contact@unityprovisions.org?subject=Interested%20in%20Helping%20Build%20AgriScan`
- Donate (Zeffy) →
  `https://www.zeffy.com/fundraising/ending-hunger-through-youth-leadership`
- Social: Instagram (`instagram.com/unityprovisions`) · TikTok
  (`tiktok.com/@unityprovisionsboston`) · Linktree
  (`linktr.ee/UnityProvisions`)
- Phone: `(857) 777-8811`
- Contact Form → Formspree (`https://formspree.io/f/xbgravll`), chosen
  over a Cloudflare Function for zero backend code and no dependency on
  the still-undecided Phase 6 hosting platform. ✅ endpoint live and
  confirmed working end-to-end.
- Donation tracker = same Google Sheet as `ImpactStats`
  (`14C4v_A39CNRhI9oQ-i7GHagwggTS3jptgRGuu5UD6_w`), confirmed by the
  project owner — not a separate third-party service. `DocumentEmbed`
  uses the sheet's `/preview` path (the normal `/edit` share link
  blocks being framed by another site).

**ImpactStats live-sheet fragility** (§7) — two known failure modes:
(1) the live match requires exact label text `"Total (lbs)"`/`"Money
Collected ($)"` in column B — a silent fallback to `stats.ts` if the
wording ever changes; (2) the sheet's query range (`B1:C6`) must stay
scoped to the summary block — widening it into the donation log
immediately below breaks Google's column-type inference. Sharing
confirmed "Anyone with the link – Viewer" — no longer a blocker.

**Live-site content audit** (all addressed): "Our Biggest Event Yet" ✅
· "Creating Opportunities" (8-country list) ✅ · "Our Partners" — real
per-org descriptive copy added (Wang YMCA of Chinatown, Mystic Valley
YMCA, Food4Philly) ✅ · "Grants & Funding" intro ✅ (real copy added).

---

## 11. Decisions and Conventions

- Tailwind v4 CSS-first; `tsconfig.json` explicit `./src/...` aliases,
  no `baseUrl`.
- Prefer scale-based spacing utilities (`h-100`) over pixel arbitrary
  values (`h-[400px]`) whenever the unmodified default `--spacing`
  scale (§6) already lands on the same value — arbitrary brackets stay
  reserved for genuinely off-scale values (`max-w-[90rem]`, gradient
  stops, `mask-y-from-accent`).
- `cn()` zero-dependency; add `tailwind-merge` only for a real
  class-conflict need.
- `types.ts` = shared cross-component types; component-local types stay
  inline in that component's `Props`.
- Every component: `Astro.props as Props`. Class lists via `cn()`,
  never manual concatenation.
- **File/component organization (§5):** `reusable/` for anything shared;
  `page-specific/{slug}/{Page}_{Component}.astro` for single-use.
  Assets: dash-case filenames, camelCase import identifiers, organized
  into semantic subfolders rather than flat.
- Confirm a component deserves its own file before building it (§2/§3)
  — check the live site and existing components/data for redundancy.
- Real content lives in data files/page templates as already captured —
  don't re-research it. Color is the one exception to "the live site is
  the reference" (§3/§6).
- Dynamic `as` tag props: typed `keyof HTMLElementTagNameMap` or a
  narrower literal union — never bare `string` (breaks Astro's
  type-checking on `<Tag>`).
- Page copy referencing a `stats.ts` number uses `getStatValue(label)`
  — not for the two live-synced stats (pounds/dollars), which stay
  dynamic via `ImpactStats`'s own client-side script instead.
- A shared prop shape used by 2+ call sites belongs in `utils/`, not
  copy-pasted per component — `getImageDimensions()` (§4/§7) replaced
  three near-identical local helper functions in PartnersAndSupporters,
  StaffCard, and ProjectSection.
- §7 entries describe what was actually built, not what was planned —
  update them in the same edit whenever implementation deviates.
- Empty placeholder files are intentional — §5's ✅/📋/🔶 markers are
  the only "built" signal, not a file's mere existence.
- `index.astro` (and every page file) is fully assembled with real copy
  — don't wrap page content in its own `<main>`, `Layout.astro` already
  provides one; double-check import aliases match real component names
  exactly.
- Cookie consent banner: decision deferred to end of project.
- Full-bleed background bands, sage-for-content-only,
  icon-badge-only-for-anchor-less-sections, fixed-hover-token (never
  opacity blend), mask-image-not-gradient-overlay-for-photo-legibility,
  request-generous-real-resolution-separate-from-display-size-for-images,
  heading-top-padding-by-what-precedes-it (§6) — all established
  patterns.
- **Divider rule** (`Divider.astro`, §7): place one at any section seam
  where both touching edges are white, regardless of whether either
  section contains sage elsewhere in itself — a viewer scrolling can
  only perceive what's at the seam, not what a component contains
  further down. Skip it wherever a color band (sage, or a gradient band
  like `PageHeader`/`DonateBanner`/`Hero`) already sits on at least one
  side. Placement list is under **Divider** in §7. When adding one,
  trim the *following* section's top padding per §6.
- Relief Route's direct `<iframe>` (ProjectSection, §7) is a confirmed,
  project-owner-approved exception to the click-to-load facade default
  — don't extend it to a future embed without asking first.
- Never guess at an unconfirmed third-party embed URL/src — a wrong or
  fabricated one is worse than no embed at all. Build the component to
  accept it as an optional prop and fall back to something real and
  verifiable in the meantime, not a placeholder box or a guessed URL.
- When something is fully derivable from data already in the project
  (e.g. a QR code from a known URL), generate it once, check it in as
  static output, and verify it round-trips — don't wait on a supplied
  asset or add a build dependency for it.
- Local edits to files this doc tracks, made outside the session
  maintaining it, won't auto-reflect here — re-sync from the repo at
  the start of a session before trusting this doc. A full-document
  regeneration in this chat has already lost real detail once
  (`PageHeader`'s §7 entry, restored) — diff any regeneration against
  the actual repo rather than trusting it by default.