import { remarkReadingTime } from './src/utils/remark-reading-time.mjs';
import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import vue from '@astrojs/vue';

// https://astro.build/config
export default defineConfig({
  markdown: {
    syntaxHighlight: 'shiki',
    remarkPlugins: [remarkReadingTime],
    shikiConfig: {
      // Choose Shiki's built-in theme (or add your own)
      // https://github.com/shikijs/shiki/blob/main/docs/themes.md
      theme: 'dark-plus',
      wrap: false,
    },
  },
  site: 'https://JedXu.info',
  integrations: [tailwind(),vue()],
});
