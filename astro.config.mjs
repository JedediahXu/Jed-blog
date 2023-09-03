import { defineConfig } from 'astro/config';

import tailwind from "@astrojs/tailwind";

import vue from '@astrojs/vue';

import svelte from '@astrojs/svelte';

// https://astro.build/config
export default defineConfig({
  site: 'https://chetserenade.info',
  integrations: [tailwind(),vue(),svelte(),]
});
