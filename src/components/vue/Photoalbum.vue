<script lang="ts" setup>
import { computed, ref, onMounted } from "vue";
import ImageModal from "./ImageModal.vue";
import { photoAlbumData } from "../../server/getters/Photoalbum";
import { getPosts } from "../../server/services/api";
import { getBlogPosts } from "../../server/getters/posts";
import { getBlogPosts2 } from "../../server/getters/posts2";

interface Post {
  id: string;
  title: string;
  body: string;
  userId: string;
  image: string | null;
  images: string[] | null;
  tags: string[] | null;
  createdOn: number;
  updatedOn: number;
  total: number;
}

const data = ref(photoAlbumData);
const apiData = ref<Post[]>([]);
const isLoading = ref(true);
const error = ref<string | null>(null);

const isAlertVisible = ref(false);
const currentIndex = ref(0);
const isModalVisible = ref(false);

const posts = ref<Post[]>([]);
const loading = ref(false);

// 获取API数据
const fetchApiData = async () => {
  try {
    isLoading.value = true;
    error.value = null;
    const response = await getPosts();
    const response1 = await getBlogPosts();
    const response2 = await getBlogPosts2();
    console.log("API Response:", response);
    console.log("API Response1111:", response1);
    console.log("API Response2222:", response2);
    if (response?.data) {
      apiData.value = response.data;
    } else {
      error.value = "数据格式错误";
    }
  } catch (err) {
    console.error("Error in component:", err);
    error.value = "获取数据失败，请稍后重试";
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  fetchApiData();
});

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
    alert("对不起，暂不支持手机查看，请上电脑查看");
  }
};

const handleImageChange = (newIndex: number) => {
  currentIndex.value = newIndex;
};
</script>

<template>
  <div class="md:ml-0 md:mr-20 pb-10" data-pagefind-ignore>
    <div class="mb-6">
      <h2 class="text-xl font-bold mb-4">API 数据测试</h2>
      <div
        v-if="error"
        class="bg-red-100 dark:bg-red-800 p-4 rounded-lg text-red-700 dark:text-red-200"
      >
        {{ error }}
      </div>
      <div v-else-if="isLoading" class="flex justify-center items-center p-4">
        <div
          class="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-white"
        ></div>
      </div>
      <div
        v-else-if="apiData && apiData.length > 0"
        class="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg"
      >
        <div v-for="item in apiData" :key="item.id" class="mb-4">
          <h3 class="font-semibold">{{ item.title }}</h3>
          <p class="text-gray-600 dark:text-gray-300">{{ item.body }}</p>
          <div class="text-sm text-gray-500 mt-2">
            <p>创建时间: {{ new Date(item.createdOn).toLocaleString() }}</p>
            <p>更新时间: {{ new Date(item.updatedOn).toLocaleString() }}</p>
          </div>
        </div>
      </div>
      <div v-else class="text-gray-500 p-4 text-center">暂无数据</div>
    </div>

    <div class="flex flex-wrap">
      <div
        v-for="(image, index) in data.images"
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
    :images="data.images"
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
