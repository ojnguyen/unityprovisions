<!--
Synced against this Project's knowledge base on Aug 14, 2026 (the repo
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
only when it prevents a future mistake (e.g. "not `type=reset` — X
would break Y"), condensed to a sentence, not a paragraph. A "why," a
verification record ("checked against the live site"), or a specific
implementation gotcha should be trimmed to one line when this doc gets
edited — never deleted outright. There's a real difference between
cutting *narration* ("this session we...", a superseded "was X" value)
and cutting a *fact or rationale* — only the former is fair game.

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
built. Next up: the Cross-Cutting checklist (§9), entirely unstarted,
then Phase 6 (Deployment). Phase 4 (Shared Infrastructure) is complete.

**Status source of truth:** §5's file tree (✅ Built / 📋 Planned / 🔶
blocked-or-partial). Trust that over any summary, including this one,
if they ever disagree.

**Continue here** *(replaced each session, not appended to — this is
the current next step only, not a history):* apply the icon-badge
architecture change — `SectionHeading.astro` (new `icon?` prop),
`MissionStatement.astro`, `GetInvolvedTeaser.astro`, `About_Team.astro`,
`Get-Involved_ContactList.astro`, and `index.astro` (Get Involved's
icon changed to `lucide:handshake`) — see §6/§7. Delivered as files,
not yet confirmed applied to the actual repo. Accessibility (input
border contrast) and SEO (OG tags/canonical URL) fixes are applied —
see §6/§9. Responsive check, Performance check, and Cross-browser spot
check all still need a live or dev-server URL to test against — none
of that's possible from this environment. Separately:
`ContactForm.astro`'s `FORMSPREE_ENDPOINT` is still a placeholder,
blocked on the project owner's Formspree account access (§7/§10).

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
  a `reusable/sections/` component, assembled directly in `index.astro`.
- **Assets:** dash-case filenames (e.g.
  `esther-r-sanger-center-for-compassion.jpg`), camelCase import
  identifiers (e.g. `ryanPhoto`). Organized into semantic subfolders
  under `src/assets/`, not flat.

### File Tree

```
src/
├── assets/
│   ├── components/hero.jpg                                — Hero background (index.astro)
│   ├── team/ryan-nguyen.webp                               — Ryan Nguyen headshot (About + Team)
│   ├── projects-and-events/
│   │   ├── biggest-event.webp                              — About "Biggest Event Yet" photo
│   │   └── agriscan.webp                                   — AgriScan screenshot (projects.ts)
│   ├── partners-and-supporters/
│   │   ├── sodexo.jpg
│   │   ├── ymca.jpg                                        — shared: Wang YMCA, Mystic Valley YMCA, YMCA
│   │   ├── food4philly.jpg
│   │   ├── esther-r-sanger-center-for-compassion.jpg
│   │   ├── walmart.jpg
│   │   └── google.jpg
│   │   (Stephen J. Brady Stop Hunger has no logo yet — text badge)
│   └── donate/                                             — empty, intentionally: the QR is generated
│                                                              inline as static SVG (§7 QRCodeDonate), not
│                                                              a supplied image — nothing belongs here.
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
│   │   │   └── WhiteSpace.astro            ✅ — plain white spacer
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
│   │   │   └── DonateBanner.astro          ✅ — Home
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
│       │   ├── About_Heading.astro                ✅ founder story (h1, photo, prose)
│       │   ├── About_BiggestEvent.astro            ✅
│       │   ├── About_Stats.astro                   ✅ ImpactStats + 8-country caption
│       │   ├── About_PartnersAndSupporters.astro   ✅
│       │   ├── About_AnnualReport.astro            ✅
│       │   └── About_Team.astro                    ✅ closing section (§7/§8)
│       ├── team/
│       │   └── Team_Heading.astro                  ✅ heading + StaffGrid
│       ├── projects/
│       │   └── Projects_Heading.astro              ✅
│       ├── get-involved/
│       │   ├── Get-Involved_Heading.astro          ✅
│       │   ├── Get-Involved_BranchFounder.astro    ✅
│       │   └── Get-Involved_ContactList.astro      ✅
│       └── donate/
│           └── Donate_Heading.astro                ✅
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
│   └── stats.ts           ✅ getStatValue()
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
lg 16px. Shadow: sm/md/lg at 0.06/0.08/0.12 alpha. Both reviewed
against actual usage (Card, Button, inputs, Hero/DonateBanner imagery)
— final values, not placeholder guesses.

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
  alone. The heading stays in its own white block above it, using
  **asymmetric** padding (`pt-12 md:pt-16 pb-4 md:pb-6`) to visually
  attach to what follows, rather than floating equidistant between it
  and whatever comes before. Doesn't apply when the heading is part of
  its own self-contained, already-padded section (heading + button in
  one block, e.g. MissionStatement) or when no full-bleed band
  immediately follows (e.g. About's closing blocks).
- **Photo legibility:** a CSS `mask-image` (Hero's `mask-y-from-accent`
  utility class) is the established pattern for text-over-photo
  sections — not a gradient-overlay `<div>`.
- A light-colored control on a dark/photo background is hand-written,
  not `Button`'s `secondary` variant (assumes a light page background).
- Icon badges (circular `bg-primary/10` Iconify) are reserved for bare
  heading+subtext+button sections with **no other visual anchor**
  (MissionStatement, GetInvolvedTeaser, About's Team CTA, Get Involved's
  Stay Connected). Sections with their own anchor (photo, band,
  checklist, grid) skip the badge. Each section's icon should be
  distinct from every other section's — a repeated icon reads as those
  two sections being related when they aren't. Current assignments:
  `lucide:heart` (Our Mission), `lucide:handshake` (Get Involved),
  `lucide:users` (Meet the People Behind It), `lucide:mail` (Stay
  Connected). Check this list before adding a new icon-badge section.
- `SectionHeading`'s `eyebrow` is opt-in — only when it adds real
  information the title doesn't already carry. The founder story's "Our
  Story" and Get Involved's "Branch Founder" eyebrows are the
  deliberate exceptions (each adds real info); Home's sections never
  use it.
- If a page's last section before Footer is sage, insert `WhiteSpace`
  (§7) so the two sage bands don't visually merge.

### Accessibility
- `:focus-visible` — 2px solid primary, 2px offset, global.
- One `<h1>` per page. Real `alt` text (decorative image nested inside
  an already-labeled control excepted, e.g. Hero's background,
  YouTubeEmbed's thumbnail). All decorative icons `aria-hidden`.
- Every form input has a real `<label>`. Icon-only controls get
  `aria-label`.
- `<a>`/`<button>` never substituted for each other.
- Mobile nav: full keyboard operability + correct focus management.
- Viewport meta includes `initial-scale=1` — required for `md:`
  breakpoints to behave correctly on real phones.
- Contrast: full systematic pass done (audit doc), every real text
  combination clears WCAG AA (most AAA). `ContactForm`'s inputs use
  `--color-border-interactive` (`#729266`) and `bg-bg` — a separate
  token from the decorative `--color-border`, since interactive-element
  boundaries need 3:1 contrast under WCAG 1.4.11.

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
  circular icon badge (§6) internally when `icon` is passed — this
  replaced 4 separate hand-rolled copies of the same badge markup
  (`MissionStatement`, `GetInvolvedTeaser`, `About_Team`,
  `Get-Involved_ContactList`, all below), which now just forward `icon`
  through instead. Two nested wrappers internally: the icon sits above
  an inner `eyebrow`/`title`/`subtext` group, so the badge gets its own
  larger gap without disturbing the tighter spacing between the text
  elements. Omitting `icon` renders identically to before this existed.
- **Card** — `padding?`(md), `bg?: surface|bg`(surface). No `class`
  pass-through — wrap in an outer `<div>` for width constraints.
- **ResponsiveImage** — wraps `astro:assets`'s `<Image/>`. `src`,
  `alt`(required), `width`, `height`, `radius?`(md), `loading?`(lazy).
- **Container** — `as?`(div), `maxWidth?`(`max-w-[90rem]`). No `id` —
  wrap in an outer `<div id>` if a scroll anchor is needed.
- **ExternalLinkCTA** — wraps `Button`, hardcodes
  `target="_blank" rel="noopener noreferrer"`. `label`, `href`, `icon?`.
  Reserved for isolated CTAs, not dense link rows.
- **WhiteSpace** — `<div class="py-12 md:py-16">`. Used when a page's
  last section is sage so it doesn't merge into Footer's sage
  (Projects, Donate use it; About and Get Involved don't need it —
  both end white).

**layout/**
- **Navbar** — 6 nav items + orgName. Separate desktop/mobile `<ul>` —
  a class always wins the cascade over a JS-toggled `hidden` attribute,
  so combining them into one list breaks the JS toggle. Disclosure
  pattern (`aria-expanded`/`controls`, focus-to-first-link, Escape).
  Donate renders as an accent `Button`, so it doesn't get active-page
  styling. No "Email List" nav item (the live site has one) —
  reachable via Footer and Get Involved's Stay Connected only.
- **Footer** — nav links, Email List/Linktree, socials, phone,
  copyright (`new Date().getFullYear()`). Plain `<a>`, not
  `ExternalLinkCTA` (too heavy for a dense link row).

**sections/**
- **Hero** — Home's `<h1>`. `headline/tagline/ctaLabel/ctaHref`
  (required), `subtext?`, `secondaryCtaLabel?/secondaryCtaHref?`
  (paired), `backgroundImage?`. Real photo in use
  (`@assets/components/hero.jpg`) with `mask-y-from-accent` legibility
  mask, gradient fallback otherwise. `text-3xl` only, no `md:` override
  (typography gotcha, §6). No scroll-cue arrow (removed — read as
  distracting). Still no `SectionHeading` — needs custom white-text
  styling on a colored/photo background, same reasoning as
  `DonateBanner`.
- **ImpactStats** — stat grid, 2/4 stats live from a Google Sheet.
  `stats: Stat[]`. Full-bleed sage band. No heading on Home; About wraps
  its own `SectionHeading` ("Numbers So Far") with asymmetric padding.
  Live sheet: ID `14C4v_A39CNRhI9oQ-i7GHagwggTS3jptgRGuu5UD6_w`, gid
  `638911803`, range `B1:C6` (must stay scoped to the summary block —
  widening it into the donation log below breaks Google's column-type
  inference). Matches exact label text `"Total (lbs)"`/`"Money
  Collected ($)"` in column B; falls back to `stats.ts` + a
  `console.warn` if unreachable/unshared. 🔶 Blocker: sheet needs
  "Anyone with the link – Viewer" sharing (§10). Live homepage reports
  6,180+ lbs / $21,376+ / 35+ branches / 8 countries — behind
  `stats.ts`'s fallback values; not manually synced, since the sheet is
  the intended source of truth once shared correctly.
- **MissionStatement** — `heading`, `body`(required), `icon?` (forwarded
  straight to `SectionHeading`, §7). Real copy verified word-for-word
  against the live site's "Our Mission" section — exact match.
- **YouTubeEmbed** — `videoId`, `title` (both required). Click-to-load
  facade (thumbnail + play button) — nothing from YouTube loads until
  clicked, then swaps in a real `youtube-nocookie.com` iframe (avoids
  setting tracking cookies until the visitor opts in). Deliberate
  improvement over the live site's eager iframe. Wrapped in
  `<div id="watch-our-story">` — the scroll target for Hero's secondary
  CTA — rather than giving `Container` an `id` prop, to keep its API
  generic. Thumbnail `alt=""` (decorative, inside a labeled button).
- **PartnersAndSupporters** — `partners`(required),
  `partnersIntro?/supportersIntro?` — presence of intro copy switches
  Home's compact badge row into About's fuller card-grid treatment.
  Full-bleed sage band. Verified against live site: partner/supporter
  lists match `partners.ts`.
- **GetInvolvedTeaser** — `heading/subtext/ctaLabel`(required), `icon?`
  (forwarded to `SectionHeading`, §7). `href="/get-involved"`
  hardcoded, `variant="primary"`. Home passes `lucide:handshake`,
  distinct from `About_Team`'s `lucide:users` — see the distinct-icon
  rule in §6.
- **ContactForm** — `heading`, `subtext?`. Fields: Name*/Email*/
  Message*/optional "where'd you hear about us"/Send. No file
  attachment (spam/security surface for a small org). Collapsed behind
  "Drop Us a Line!" (same disclosure pattern as Navbar). 🔶
  `FORMSPREE_ENDPOINT` placeholder — no-ops with a console warning until
  the real value is supplied.
- **DonateBanner** — `heading/subtext/ctaLabel`(required, no defaults —
  same prop shape as `GetInvolvedTeaser`, its closest sibling: both are
  closing-teaser bands whose destination is hardcoded inside the
  component, not exposed as a prop, so it can't be redirected).
  `href="/donate"` hardcoded. `bg-primary-hover` band (not
  `bg-primary` — matches the focus-ring color, which would be invisible
  against a same-color background). Home only, not Donate — `QRCodeDonate`
  already covers that page. Not a floating/sitewide widget like the live
  site's — no floating-UI pattern exists in this codebase, and it would
  read as pushy across every page for a young nonprofit still building
  trust. Serves a different purpose than Hero/Navbar's donate CTAs: a
  second ask, positioned deliberately after a full read-through, once
  the earlier CTAs are scrolled out of view — not a redundant duplicate.

**staff/**
- **StaffCard/StaffGrid** — `StaffMember` (`name/role` required,
  `email?/photo?`); `members: StaffMember[]`. `photo` optional — falls
  back to a placeholder avatar (`lucide:user`, 160×160) when unset.
  Ryan Nguyen has a real photo; the other 7 don't yet. Card
  `bg="surface"`. Email renders as a visible `mailto:` link with a small
  `lucide:mail` icon, same treatment as About's contact email and
  Footer's phone link. Grid: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-4`,
  `w-full` set on the grid itself so it fills its parent regardless of
  the flex-column wrapper it sits inside (same fix `PartnersAndSupporters`'s
  grid needed). Starts at 1 column, not 2 like `PartnersAndSupporters`'s
  org-card grid — a staff card carries more content (photo+name+role+
  email) than an org badge, so it needs the extra width on small screens.

**projects/**
- **ProjectSection** — `Project`-typed props. White heading block
  (asymmetric padding) + separate full-bleed sage band for content
  (screenshot or `embedUrl` iframe) + CTA. Relief Route embeds
  `reliefroute.unityprovisions.org` directly via a plain, always-loaded
  `<iframe>` (`loading="lazy"` only) — **not** the click-to-load JS
  facade `YouTubeEmbed` uses. This is a deliberate, project-owner-
  approved exception to that default, not a new precedent: they
  confirmed the original live site embeds the same tool successfully on
  mobile. Don't assume a future third-party/self-hosted embed gets the
  same direct treatment without asking first — `YouTubeEmbed`'s facade
  pattern is still the fallback default for anything not explicitly
  confirmed this way.

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
- **About_Heading** — the founder story: h1 "Is There Dinner?" (eyebrow
  "Our Story") + photo/prose. Pounds/dollars kept deliberately vague,
  pointing to `ImpactStats` below; branch/country counts via
  `getStatValue()`. Photo: `ryanPhoto`, 400×500.
- **About_BiggestEvent** — North Quincy branch's 1,025 lb Dec 2024
  donation. Photo: `bigEventPhoto`, 600×400, lazy-loaded.
- **About_Stats** — `ImpactStats` (fuller) + 8-country caption (US,
  Canada, India, UAE, Puerto Rico, Pakistan, Morocco, England).
- **About_PartnersAndSupporters** — fuller `PartnersAndSupporters` with
  intro paragraphs for both groups.
- **About_AnnualReport** — `ExternalLinkCTA` → FlipHTML5 flipbook
  (`https://online.fliphtml5.com/uvjxy/tupw/`), not an embedded PDF.
  Embedded PDFs (`<iframe>`/`<object>`) are inconsistent on mobile — iOS
  Safari and Chrome for Android often show blank space or force a
  download, and HTTPS/header quirks or browser updates can silently
  break the embed. A plain link avoids all of that and keeps the file
  swappable without a redeploy.
- **About_Team** — closing section of `about.astro`. `SectionHeading`
  (`icon="lucide:users"`, "Meet the People Behind It") + `Button` →
  `/team`.

**team/**
- **Team_Heading** — h1 "Meet the Team" + `StaffGrid`.

**projects/**
- **Projects_Heading** — h1 "Our Projects" + subtext.

**get-involved/**
- **Get-Involved_Heading** — h1 "Get Involved" + subtext.
- **Get-Involved_BranchFounder** — eyebrow "Branch Founder", title
  "Turn Your Passion Into Impact", 5-item checklist, global-network
  paragraph (counts via `getStatValue()`), Apply CTA → Google Form.
- **Get-Involved_ContactList** — `SectionHeading` (`icon="lucide:mail"`)
  + heading + subtext + "Join Our Email List" CTA →
  `contactListFormUrl` (same form as Footer). Renamed from "Volunteer"
  — the form is a general contact-list signup, not volunteer-specific,
  and the old label overpromised.

**donate/**
- **Donate_Heading** — h1 "Donate" + subtext.

---

## 8. Page Structure

*Full page copy (founder story, mission statement, etc.) lives in the
component files themselves, which are the canonical source — not
duplicated here to avoid the two drifting apart. Ask if you want it
mirrored in this doc as well.*

### Home (`/`) — ✅
`Hero` → `ImpactStats` → `MissionStatement` → `YouTubeEmbed` →
`PartnersAndSupporters` (brief) → `GetInvolvedTeaser` → `ContactForm` →
`DonateBanner`. All `reusable/sections/` components, assembled directly
in `index.astro` — no page-specific folder.

### About (`/about`) — ✅
`About_Heading` (founder story) → `About_BiggestEvent` → `About_Stats`
→ `About_PartnersAndSupporters` → `About_AnnualReport` → `About_Team`.

### Team (`/team`) — ✅
`Team_Heading` — h1 + `StaffGrid` of 8 real members.

### Projects (`/projects`) — ✅
`Projects_Heading` → `ProjectSection` ×2 (Relief Route — live `iframe`
embed; AgriScan — screenshot) → `WhiteSpace` (AgriScan's sage band would
otherwise run straight into Footer's sage).

### Get Involved (`/get-involved`) — ✅
`Get-Involved_Heading` → `Get-Involved_BranchFounder` →
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
- [x] Global Styles & Fonts (font, radius, shadow tokens all finalized
      — §6; palette fully redesigned across several sessions, a
      deliberate design choice, not a live-site match)
- [x] Utility Helpers
- [x] UI Primitives: Button, SectionHeading, Card, ResponsiveImage,
      Container, ExternalLinkCTA
- [x] Navigation & Footer Data
- [x] Navbar & Footer Components
- [x] Layout.astro

### Phase 5 — Build Pages — ✅ complete
- [x] **1. Home** (`index.astro`):
    - [x] Hero
    - [x] ImpactStats
    - [x] MissionStatement
    - [x] YouTubeEmbed
    - [x] PartnersAndSupporters
    - [x] GetInvolvedTeaser
    - [x] ContactForm
    - [x] DonateBanner
    - [x] Assemble `index.astro`
- [x] **2. About** (`about.astro`):
    - [x] `About_Heading.astro` — founder story
    - [x] `About_Stats.astro` — ImpactStats
    - [x] `About_PartnersAndSupporters.astro`
    - [x] `About_AnnualReport.astro`
    - [x] `About_Team.astro` — Team link
    - [x] Assemble `about.astro`
- [x] **3. Team** (`team.astro`):
    - [x] StaffCard
    - [x] StaffGrid
    - [x] Assemble `team.astro`
- [x] **4. Projects** (`projects.astro`):
    - [x] ProjectSection — Relief Route
    - [x] ProjectSection — AgriScan
    - [x] Assemble `projects.astro`
- [x] **5. Get Involved** (`get-involved.astro`):
    - [x] Branch Founder section
    - [x] Stay Connected (email list) CTA
    - [x] Assemble `get-involved.astro`
- [x] **6. Donate** (`donate.astro`):
    - [x] QRCodeDonate
    - [x] DocumentEmbed
    - [x] Assemble `donate.astro`

### Cross-Cutting (every page) — in progress
- [x] Accessibility pass — contrast is a full systematic check (§6,
      `accessibility-seo-audit.md`). Keyboard/screen-reader walkthroughs
      still need a live URL — not part of this item.
- [x] SEO (title, meta description, OG tags, canonical URL, heading
      hierarchy, alt text) — all in place; `Layout.astro` sets the OG
      tags, Twitter Card tags, and canonical URL.
- [ ] Responsive check at each breakpoint — needs a live/dev-server URL
- [ ] Performance check (image optimization, Lighthouse) — no
      anti-patterns found in code; real Lighthouse run needs a
      live/dev-server URL
- [ ] Cross-browser spot check — needs a live/dev-server URL
- [ ] Comment cleanup — replace long AI-style comment blocks with short
      human-written ones (blocked on a style example from the project
      owner)

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
- Contact Form → Formspree, chosen over a Cloudflare Function for zero
  backend code and no dependency on the still-undecided Phase 6 hosting
  platform. 🔶 `FORMSPREE_ENDPOINT` still a placeholder, blocked on the
  project owner's account access.
- Donation tracker = same Google Sheet as `ImpactStats`
  (`14C4v_A39CNRhI9oQ-i7GHagwggTS3jptgRGuu5UD6_w`), confirmed by the
  project owner — not a separate third-party service. `DocumentEmbed`
  uses the sheet's `/preview` path (the normal `/edit` share link
  blocks being framed by another site).

**ImpactStats live-sheet fragility** (§7) — two known failure modes to
watch for: (1) the live match requires exact label text `"Total (lbs)"`
/`"Money Collected ($)"` in column B — a silent fallback to `stats.ts`
if the wording ever changes; (2) the sheet's query range (`B1:C6`) must
stay scoped to the summary block — widening it into the donation log
immediately below breaks Google's column-type inference (this already
happened once during development). Also currently blocked on the sheet
being shared as "Anyone with the link – Viewer."

**Live-site content audit** (all addressed unless noted): "Our Biggest
Event Yet" ✅ · "Creating Opportunities" (8-country list) ✅ · "Our
Partners" — per-org descriptive paragraphs still blocked on verified
copy (not fabricated for named real orgs) · "Grants & Funding" intro ✅.

---

## 11. Decisions and Conventions

- Tailwind v4 CSS-first; `tsconfig.json` explicit `./src/...` aliases,
  no `baseUrl`.
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
  asymmetric-padding-for-intro-headings, icon-badge-only-for-
  anchor-less-sections, fixed-hover-token (never opacity blend),
  mask-image-not-gradient-overlay-for-photo-legibility — all
  established patterns (§6).
- Relief Route's direct `<iframe>` (ProjectSection, §7) is a confirmed,
  project-owner-approved exception to the click-to-load facade default
  — don't extend it to a future embed without asking first.
- Never guess at an unconfirmed third-party embed URL/src — a wrong or
  fabricated one is worse than no embed at all. Build the component to
  accept it as an optional prop and fall back to something real and
  verifiable in the meantime, not a placeholder box or a guessed URL.
  `ContactForm`'s Formspree endpoint follows this: built as if real,
  guarded against firing on the still-placeholder value.
- When something is fully derivable from data already in the project
  (e.g. a QR code from a known URL), generate it once, check it in as
  static output, and verify it round-trips — don't wait on a supplied
  asset or add a build dependency for it.
- Local edits to files this doc tracks, made outside the session
  maintaining it, won't auto-reflect here — re-sync from the repo at
  the start of a session before trusting this doc.