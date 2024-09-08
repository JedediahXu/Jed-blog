import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import vue from '@astrojs/vue';
import { remarkReadingTime } from './src/utils/remark-reading-time.mjs';
import path from 'path';

export default defineConfig({
  markdown: {
    syntaxHighlight: 'shiki',
    remarkPlugins: [remarkReadingTime],
    shikiConfig: {
      theme: 'dark-plus',
      wrap: false,
    },
  },
  site: 'https://JedXu.info',
  integrations: [tailwind(), vue()],
  vite: {
    resolve: {
      alias: {
        '@': path.resolve('./src'),
      },
    },
  },
});
