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
      "Relief Route is an interactive map designed to make food resources easier to find. It brings together donation centers, food banks, and other community resources that can be difficult to discover, along with information such as hours and current donation needs. Relief Route is still in development. Our goal is to make it easier for people to find food assistance and other support in their communities.",
    embedUrl: 'https://reliefroute.unityprovisions.org/',
    ctaLabel: 'Help Build Relief Route',
    ctaHref:
      'mailto:contact@unityprovisions.org?subject=Interested%20in%20Helping%20Build%20Relief%20Route',
    ctaIcon: 'lucide:mail',
  },
  {
    title: 'AgriScan',
    description:
      "AgriScan is a low-cost, easy-to-use crop optimization tool we're developing for small farms, home gardens, and communities with limited resources. It combines a database of crop needs (including water, sunlight, and soil pH) with field data to provide practical suggestions for improving plant health and reducing waste. Each unit can cover up to one acre and can be connected with others for larger growing areas. It is designed to be simple to set up and use in places such as backyards, school gardens, and community plots. Our goal is to make practical farming tools more accessible, reduce water use, and help address hunger at the root.",
    image: agriscanImage,
    ctaLabel: 'Help Build AgriScan',
    ctaHref:
      'mailto:contact@unityprovisions.org?subject=Interested%20in%20Helping%20Build%20AgriScan',
    ctaIcon: 'lucide:mail',
  },
];