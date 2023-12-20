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
      // 选择 Shiki 内置的主题（或添加你自己的主题）
      // https://github.com/shikijs/shiki/blob/main/docs/themes.md
      theme: 'dark-plus',
      wrap: false,
    },
  },
  site: 'https://JedXu.info',
  integrations: [tailwind(),vue()]
});
