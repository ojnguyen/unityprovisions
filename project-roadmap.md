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

**Continue here:** Phase 5, Step 2 (About) — write the founder story
section next (real content already captured in §8; see §9 for the full
remaining order).

**Keep this document concise.** One line per fact. A "why" only when it
prevents a future mistake (e.g. "not `type=reset` — X would break Y"),
kept to a sentence, not a paragraph. No multi-paragraph justifications
or blow-by-blow decision history — only the current, final state and
the short reason for it. If an entry is getting long when you go to edit
it, cut it down before adding to it.

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
  facts, voice, and structure — not a target to reproduce exactly.
  Rewrite unclear or rough copy; restyle, reorganize, merge, or drop
  sections that don't serve the visitor as well as they could; don't
  replicate something "free" on the live site's page-builder (a bundled
  widget, a duplicate CTA) if it costs real engineering here for no real
  benefit. Every such change gets documented in §7, not made silently.

---

## 4. Technology Stack

- Astro (latest stable) + TypeScript strict mode.
- Tailwind CSS v4, CSS-first (`@theme` in `global.css`; no
  `tailwind.config.mjs`; `@tailwindcss/vite` in `astro.config.mjs`).
- Integrations: `sitemap()`, `mdx()`, `astro-icon()`. Icons: Lucide +
  Simple Icons via astro-icon.
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
│   ├── team/                     — 8 headshots for Team (not yet supplied)
│   ├── projects/                 — Relief Route / AgriScan imagery (not yet supplied)
│   └── donate/                   — QR code image (not yet supplied)
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
│   ├── about.astro                     📋 planned
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

**Note:** `EmailSignup.astro` was built, then removed (§7) — delete it
from the repo if it still exists there; don't recreate it without
re-reading that entry first.

---

## 6. Design System

### Color
Defined once in `global.css`'s `@theme` block; Tailwind auto-generates
matching utilities (`bg-primary`, `text-text-secondary`, etc.).

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
Tailwind defaults (`sm:640px md:768px lg:1024px xl:1280px`), no
overrides. Content max-width ~1280px (`max-w-7xl`).

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

### Accessibility
- `:focus-visible` only — `2px solid var(--color-primary)`, 2px offset,
  applied globally.
- Exactly one `<h1>` per page.
- Real `alt` text on every image — except a decorative image nested
  inside an already-labeled control (e.g. `YouTubeEmbed`'s thumbnail
  inside its labeled play button uses `alt=""`). Narrow exception, not a
  general pass to leave alt text empty elsewhere.
- Every form input has a real `<label>`.
- Icon-only links/buttons: `aria-label`.
- `<a>`/`<button>` never substituted for each other.
- Mobile nav: full keyboard operability, correct focus management.
- Viewport meta includes `initial-scale=1` (`Layout.astro`) — required
  for `md:` breakpoints to behave correctly on real phones.

---

## 7. Component Library

Status: ✅ Built · 📋 Planned

### UI Primitives — `src/components/ui/`

**Button** — ✅ Built
- Single styled clickable element site-wide. Off-site links use
  `ExternalLinkCTA` instead.
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
- Bounded surface: `bg-surface rounded-md shadow-sm` + padding.
- Props: `padding?: 'sm'|'md'|'lg'` (md).
- No `class` pass-through — wrap in an outer `<div>` for width
  constraints (see ContactForm).
- First used by: `ContactForm`.

**ResponsiveImage** — ✅ Built
- Wraps `astro:assets`'s `<Image />` with design tokens.
- Props: `src` · `alt` (required) · `width` · `height` · `radius?` (md) ·
  `loading?` (lazy).

**Container** — ✅ Built
- Max-width + horizontal-padding wrapper.
- Props: `as?: keyof HTMLElementTagNameMap` (div) · `maxWidth?`
  (`max-w-7xl`).
- Use `as="section"` only when no distinct full-bleed background is
  needed. For a distinct background, wrap a plain element around
  `<Container>` instead (`Navbar`'s `<header>`, `DonateBanner`'s
  `<div>`).

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
  styling on `/donate` — accepted, minor (accent color already
  distinguishes it).
- No "Email List" nav item (live site has one) — reachable via Footer
  only (see `EmailSignup` below).

**Footer** — ✅ Built
- Data: `footer.ts` — nav links, Email List/Linktree external links,
  social icons, phone, copyright.
- Plain `<a>` tags, not `ExternalLinkCTA` (too heavy for a dense link
  row).
- Copyright year: `new Date().getFullYear()` at build time.
- Live site has both this Footer link and a native inline signup widget
  on its homepage — see `EmailSignup` below for why only the link was
  kept.

### Root Layout — `src/layouts/`

**Layout** — ✅ Built
- Base HTML shell; mounts `Navbar` / `<slot />` / `Footer` once.
- Props: `title?` ("Unity Provisions") · `description?` ("Creating
  opportunities and building stronger communities.").
- Viewport meta includes `initial-scale=1`.

### Page Sections — `src/components/sections/`

**Hero** — ✅ Built
- Home's opening `<h1>` section.
- Props: `headline` · `tagline` · `ctaLabel` · `ctaHref` (all required).
- No `SectionHeading` (needs custom eyebrow styling); no image prop
  (none needed/available).
- Real copy: see `index.astro`.

**ImpactStats** — ✅ Built (🔶 live data pending — see §10)
- Stat grid; 2 of 4 stats live-sourced from a public Google Sheet.
- Props: `stats: Stat[]`.
- No heading prop — Home renders it bare; About wraps it in its own
  `SectionHeading` ("fuller").
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
- Props: `heading` · `body` (both required).
- Uses `SectionHeading` (unlike Hero — no exclusion here).
- Real copy: see `index.astro` — verified word-for-word against the live
  site's "Our Mission" section, exact match.

**YouTubeEmbed** — ✅ Built
- Click-to-load facade (thumbnail + button) → real `<iframe>`
  (`youtube-nocookie.com`) only on click. Deliberate improvement over
  the live site's eager iframe.
- Props: `videoId` · `title` (both required).
- Thumbnail `alt=""` (decorative, inside a labeled button — §6's
  exception).
- Real copy: see `index.astro` (videoId pulled from the live site's
  embedded player).

**PartnersAndSupporters** — ✅ Built
- Props: `partners: Partner[]`.
- Groups into Partners/Supporters (no `type` = partner by default);
  badge, or `<img>` once a `logo` path is set (none supplied yet).
- No heading prop — same brief (Home) / fuller (About) pattern as
  ImpactStats.
- Verified against live site: partner/supporter lists match
  `partners.ts`.

**GetInvolvedTeaser** — ✅ Built
- Props: `heading` · `subtext` · `ctaLabel` (all required).
  `href="/get-involved"` hardcoded, not a prop.
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
  site), revealing a `Card`-wrapped panel. Same disclosure pattern as
  `Navbar` (`aria-expanded`/`aria-controls`, focus management, Escape).
  **Cancel** closes the panel and resets the fields — this is closing an
  optional panel, not resetting an always-visible form (the latter is
  the real anti-pattern; this isn't that).
- Trigger/Cancel buttons found via `querySelector` (a wrapping div's id
  / `button[type="button"]`), not a `Button` `id` prop (unsupported).
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
- Live site has it "for free" via its page-builder; that economics
  doesn't transfer to a hand-built rebuild.
- If wanted again: one `ExternalLinkCTA` pointed at `contactListFormUrl`,
  inline — not a new component.

**DonateBanner** — ✅ Built
- Props: `heading` · `subtext` · `ctaLabel` (all required).
  `href="/donate"` hardcoded.
- Full-bleed `bg-primary-hover` band (not `bg-primary` — matches the
  global focus-ring color, which would make the ring invisible against a
  same-color background) + custom white `<h2>`/`<p>` (not
  `SectionHeading` — can't override its text color).
- Home only, not the Donate page — `QRCodeDonate` already covers that
  page fully; a second identical CTA there would be redundant.
- Not a floating/sitewide widget (live site's is) — no floating-UI
  pattern exists in this codebase, and it would read as pushy across
  every page for a young nonprofit still building trust.
- Real copy: see `index.astro`.
- Serves a different purpose than Hero/Navbar's donate CTAs: a second
  ask, positioned deliberately after a full read-through, once the
  earlier CTAs are scrolled out of view — not a redundant duplicate.

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
(fuller) → Annual Report reference (plain link, not a component) → link
to Team.

Founder story (real copy): "Unity Provisions began with a simple but
painful question: 'Is there dinner?' Growing up, our founder Ryan knew
the silence of nights when food was uncertain. Later, while volunteering
at a local food pantry, he saw firsthand how hunger hides behind quiet
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
      pending)
- [x] Utility Helpers
- [x] UI Primitives: Button, SectionHeading, Card, ResponsiveImage,
      Container, ExternalLinkCTA
- [x] Navigation & Footer Data
- [x] Navbar & Footer Components
- [x] Layout.astro

### Phase 5 — Build Pages (current)
- [x] **1. Home** (`index.astro`) — fully built and assembled
    - [x] Hero
    - [x] ImpactStats
    - [x] MissionStatement
    - [x] YouTubeEmbed
    - [x] PartnersAndSupporters
    - [x] GetInvolvedTeaser
    - [x] ContactForm
    - [x] DonateBanner
    - [x] Assemble `index.astro`
- [ ] **2. About** (`about.astro`):
    - [ ] Founder story section — next
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
    - [ ] QRCodeDonate
    - [ ] DocumentEmbed
    - [ ] Assemble `donate.astro`

### Cross-Cutting (every page)
- [ ] Responsive check at each breakpoint
- [ ] Accessibility pass
- [ ] SEO (title, meta description, OG tags, canonical URL, heading
      hierarchy, alt text)
- [ ] Performance check (image optimization, Lighthouse)
- [ ] Cross-browser spot check

### Phase 6 — Deployment
- [ ] Compare Cloudflare Pages / Netlify / Vercel / GitHub Pages
- [ ] Recommend + set up hosting
- [ ] Domain migration considerations from GoDaddy

---

## 10. Data / Content Integrations

**Static data files:** `navigation.ts` (6-item nav) · `footer.ts` ·
`staff.ts` (8 members, planned) · `stats.ts` (4 stats) · `partners.ts` ·
`projects.ts` (planned).

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

**Open decisions:**
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
  already happened once during development). Live site currently reports
  higher numbers than the `stats.ts` fallback (§7) — not corrected here,
  since the sheet is the intended source of truth.

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
- `Container` lives in `ui/` — generic, no page-specific content.
- Cookie consent banner: decision deferred to end of project.
- Confirm a component deserves its own file before building it (§2, §3)
  — including checking the live site and this project's own existing
  components/data for redundancy.
- Real content (roster, stats, project descriptions, page copy) lives in
  data files or page templates — use as captured here, don't
  re-research. A §7 note marked "verified against the live site" is a
  live re-check done during this project.
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
- `index.astro` is fully assembled with real copy; the Phase-4
  dev-sandbox demo blocks are gone. Two bugs fixed during that assembly,
  worth remembering for other pages: don't wrap page content in its own
  `<main>` — `Layout.astro` already provides one; double-check import
  aliases match real component names exactly.