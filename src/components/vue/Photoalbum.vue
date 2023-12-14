<script lang="ts" setup>
import { computed } from "vue";
import probe from "probe-image-size";
import { data } from "@/data/Photoalbum";

async function updateImageSizes() {
  for (let i = 0; i < data.images.length; i++) {
    const image = data.images[i];
    try {
      const result = await probe(image.href);
      data.images[i].size.width = result.width;
      data.images[i].size.height = result.height;
    } catch (error) {
      console.error(`Could not get image size: ${image.href}`);
    }
  }
}

await updateImageSizes();
</script>

<template>
  <div class="md:ml-0 md:mr-20 pb-10">
    <div id="my-gallery" class="flex flex-wrap">
      <div
        v-for="(image, index) in data.images"
        :key="index"
        class="w-2/4 md:w-1/4 p-1 2xl:p-3 md:p-3 h-17 relative"
      >
        <div class="relative group rounded-md overflow-hidden">
          <div class="date-top">
           <div class="group-hover:opacity-0 transition duration-200">
              <span class="date-label group-hover:opacity-0 transition duration-200">"{{
                image.label
              }}"</span>
            </div>
          </div>
          <a
            :data-pswp-width="image.size.width"
            :data-pswp-height="image.size.height"
            :href="image.href"
            data-cropped="true"
            class="block overflow-hidden"
          >
            <div class="transition-transform transform group-hover:scale-110">
              <div style="width: 100%; height: 260px; position: relative">
                <img
                  :src="image.href"
                  :alt="image.label"
                  style="width: 100%; height: 260px; object-fit: cover"
                />
              </div>
            </div>
          </a>
          <div class="date-container">
            <div class="group-hover:opacity-0 transition duration-200">
              <span class="date-label group-hover:opacity-0 transition duration-200">{{
                image.time
              }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.date-container {
  position: absolute;
  bottom: 0.318rem;
  left: 0.5rem;
  color: #fff;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 1px;
}
.date-top {
  position: absolute;
  top: 0.318rem;
  left: 0.5rem;
  color: #fff;
  z-index: 999;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 1px;
}

.date-label {
  opacity: 0.8;
  transition: opacity 0.2s;
}
</style>
