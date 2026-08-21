import agriscanImage from '@assets/projects-and-events/agriscan.webp';
import type { Project } from '@/types';

/*
 * These descriptions are paraphrased from the live project pages.
 * Relief Route loads its interactive map directly in the project section.
 * Both projects use email links for help requests instead of file-upload forms,
 * so the site does not need to handle uploaded files.
 * The email subjects make it clear which project someone wants to help with.
 */
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