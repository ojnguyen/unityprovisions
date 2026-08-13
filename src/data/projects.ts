import type { Project } from '@/types';
import agriscanImage from '@assets/projects-and-events/agriscan.webp';

// Real Unity Provisions projects. Copy is paraphrased from the live
// site's dedicated Relief Route / AgriScan pages, not transcribed
// verbatim — project-roadmap.md §3: preserve the substance, not a
// word-for-word copy.
//
// Relief Route embeds the live tool directly via ProjectSection's
// `embedUrl` (§7) — a deliberate call to use a plain always-loaded
// iframe, not the click-to-load facade YouTubeEmbed uses. Its CTA
// originally pointed at a separate "add a center" request page, but
// that page turned out not to do anything beyond showing the map
// again (Relief Route's own copy already says it's still being
// built) — so the CTA became a mailto "help us build this" ask
// instead, same shape as AgriScan's.
//
// AgriScan's live "We're Hiring!" section (an embedded resume-upload
// form) was replaced with a plain mailto CTA for the same reason
// ContactForm's file attachment was removed — an upload endpoint is a
// real spam/security surface for a small volunteer-run org (§7).
//
// Both mailto CTAs carry a `?subject=` so the org can tell the two
// asks apart in their inbox without relying on the sender to explain
// why they're emailing.
export const projects: Project[] = [
  {
    title: 'Relief Route',
    description:
      "Relief Route is an interactive map that surfaces donation centers, food banks, and other food resources that are easy to miss — including hours and what each location currently needs most. It's still being built, with the goal of making it simpler for people to find real help nearby.",
    embedUrl: 'https://reliefroute.unityprovisions.org/',
    ctaLabel: 'Help Build Relief Route',
    ctaHref:
      'mailto:contact@unityprovisions.org?subject=Interested%20in%20Helping%20Build%20Relief%20Route',
    ctaIcon: 'lucide:mail',
  },
  {
    title: 'AgriScan',
    description:
      "AgriScan is a low-cost crop optimization tool still in development, aimed at small farms, home gardens, and communities with limited resources. It pairs a database of what different crops need — water, sunlight, soil pH — with real field readings to suggest ways to improve plant health and cut waste. Each unit covers about an acre and can be combined for larger plots, and it's simple enough to set up in a backyard, school garden, or community plot. We're actively building this out and could use extra hands — reach out if you'd like to help.",
    image: agriscanImage,
    ctaLabel: 'Help Build AgriScan',
    ctaHref:
      'mailto:contact@unityprovisions.org?subject=Interested%20in%20Helping%20Build%20AgriScan',
    ctaIcon: 'lucide:mail',
  },
];