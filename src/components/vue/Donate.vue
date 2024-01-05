<template>
  <div id="iak-twikoo"></div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from "vue";
import { twikoo } from "../../config";

const loadTwikoo = () => {
  const script = document.createElement("script");
  script.textContent = `
    twikoo.init({
      envId: "${twikoo.url}",
      el: "#iak-twikoo"
    });
  `;
  document.head.append(script);
};

const onPopState = () => {
  loadTwikoo();
};

onMounted(() => {
  window.addEventListener("popstate", onPopState);
  loadTwikoo();
});

onUnmounted(() => {
  window.removeEventListener("popstate", onPopState);
});
</script>
