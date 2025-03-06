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
  output: 'server',  // 启用服务端渲染
  server: {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    }
  }
});
