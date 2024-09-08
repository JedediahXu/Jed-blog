<script lang="ts" setup>
import { computed, ref, onMounted } from "vue";
import ImageModal from "./ImageModal.vue";
import { data as photoAlbumData } from "@/server/getters/photoalbum";

const isAlertVisible = ref(false);
const currentIndex = ref(0);
const isModalVisible = ref(false);

const isMobile = computed(() => {
  return /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
});

const openModal = (index: number) => {
  if (!isMobile.value) {
    currentIndex.value = index;
    isModalVisible.value = true;
  } else {
    // TODO: Temporary processing, will be optimized later
    alert("对不起，暂不支持手机查看，请上电脑查看");
  }
};

const handleImageChange = (newIndex: number) => {
  currentIndex.value = newIndex;
};
</script>

<template>
  <div class="md:ml-0 md:mr-20 pb-10" data-pagefind-ignore>
    <div class="flex flex-wrap">
      <div
        v-for="(image, index) in photoAlbumData.images"
        :key="index"
        class="w-2/4 md:w-1/4 p-1 2xl:p-3 md:p-3 h-17 relative"
      >
        <div class="relative group rounded-md overflow-hidden">
          <div class="date-top">
            <div class="group-hover:opacity-0 transition duration-200">
              <span class="date-label group-hover:opacity-0 transition duration-200"
                >"{{ image.label }}"</span
              >
            </div>
          </div>
          <a data-cropped="true" class="block overflow-hidden">
            <div class="transition-transform transform group-hover:scale-110">
              <div class="transform-img">
                <img
                  :src="image.href"
                  :alt="image.label"
                  class="img-width"
                  @click="openModal(index)"
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
  <image-modal
    :images="photoAlbumData.images"
    :current-index="currentIndex"
    :is-visible="isModalVisible"
    @close="isModalVisible = false"
    @change="handleImageChange"
  />
  <div v-if="isAlertVisible" class="alert-modal">
    <p>对不起，暂不支持手机查看，请上电脑查看</p>
    <button @click="isAlertVisible = false">关闭</button>
  </div>
</template>

<style lang="scss" scoped>
.date-container {
  position: absolute;
  bottom: 0.318rem;
  left: 0.5rem;
  color: #fff;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 1px;
}
.date-top {
  position: absolute;
  top: 0.318rem;
  left: 0.5rem;
  color: #fff;
  z-index: 999;
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 1px;
}

.date-label {
  opacity: 0.8;
  transition: opacity 0.2s;
}

.transform-img {
  width: 100%;
  height: 260px;
  position: relative;
}
.img-width {
  width: 100%;
  height: 260px;
  object-fit: cover;
}
</style>
