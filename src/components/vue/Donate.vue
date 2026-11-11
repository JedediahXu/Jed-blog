<template>
  <div id="iak-twikoo"></div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from "vue";
import { twikoo } from "../../config";

const TWIKOO_SRC = "https://cdn.staticfile.org/twikoo/1.6.29/twikoo.all.min.js";

const loadTwikooScript = () => {
  const current = window as Window & { twikoo?: { init: (options: { envId: string; el: string }) => void } };
  if (current.twikoo) return Promise.resolve();

  const found = document.querySelector<HTMLScriptElement>("script[data-twikoo-lib]");
  if (found) {
    return new Promise<void>((resolve, reject) => {
      found.addEventListener("load", () => resolve(), { once: true });
      found.addEventListener("error", () => reject(new Error("twikoo load failed")), { once: true });
    });
  }

  return new Promise<void>((resolve, reject) => {
    const script = document.createElement("script");
    script.src = TWIKOO_SRC;
    script.async = true;
    script.dataset.twikooLib = "1";
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("twikoo load failed"));
    document.head.append(script);
  });
};

const loadTwikoo = async () => {
  try {
    await loadTwikooScript();
    const current = window as Window & { twikoo?: { init: (options: { envId: string; el: string }) => void } };
    if (!document.querySelector("#iak-twikoo") || !current.twikoo) return;
    current.twikoo.init({
      envId: twikoo.url,
      el: "#iak-twikoo",
    });
    document.querySelector("#twikoo")?.classList.add("bg-commentBackground", "dark:bg-[#44444499]");
  } catch {
    // Comment CDN can time out. The article itself should still render.
  }
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
