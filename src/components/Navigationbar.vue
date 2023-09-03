<script lang="ts" setup>
import { ref, computed } from 'vue'
import config from '../config'
const nav = ref(config.navs)

const currentURL = window.location.href;

const parts = currentURL.split('/');

const lastName = parts[parts.length - 1];

const isActive = (routeName) => {
  return routeName === '/' + lastName;
}
</script>

<template>
<div v-for="(item, i) in nav" :key="i">
  <a :href="item.url"  :class="{ 'active': isActive(item.url) }">{{ item.title }}</a>
</div>
</template>

<style lang="scss" scoped>
  .active {
    color: #0088f5;
  }
</style>
