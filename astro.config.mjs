import { defineConfig } from 'astro/config';

import vercel from '@astrojs/vercel/serverless';
import tailwind from "@astrojs/tailwind";
import vue from "@astrojs/vue";
import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), vue(), icon({
    include: {
      mdi: ['language-javascript', 'language-html5', 'language-css3', 'language-python', 'language-csharp', 'language-java', 'language-php', 'vuejs', 'ubuntu', 'microsoft-visual-studio-code', 'microsoft-visual-studio'],
      ph: ['planet-bold'],
      simple_icons: ['astro', 'nuxtdotjs', 'express', 'flask', 'wordpress', 'windows11', 'nginx', 'pterodactyl', 'raspberrypi', 'intellijidea'],
      octicon: ['repo-24'],
      tabler: ["brand-nextjs"]
    }
  })],
  output: 'server',
  adapter: vercel({
    webAnalytics: { enabled: false }
  }),
});