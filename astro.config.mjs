// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import icon from 'astro-icon';

// https://astro.build/config
export default defineConfig({
  site: "https://unityprovisions.org",
  vite: {
    plugins: [tailwindcss()]
  },

  // i.ytimg.com: YouTubeEmbed's click-to-load facade thumbnail
  // (YouTubeEmbed.astro) is a remote image — Astro's Image pipeline
  // refuses to process any remote domain that isn't explicitly
  // allowlisted here.
  image: {
    domains: ['i.ytimg.com'],
  },

  integrations: [sitemap(), mdx(), icon()]
});
