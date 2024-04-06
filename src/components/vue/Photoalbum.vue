<script lang="ts" setup>
import { computed, ref, onMounted } from "vue";
import ImageModal from "./ImageModal.vue";

// In order to solve [ERROR] [vite] Could not resolve "../../../src/server/getters/photoalbum" from "src/components/vue/Photoalbum.vue"
// I put it here temporarily
const data = ref({
  images: [
   {
      label: "烟台-养马岛",
      time: "2024/04/04",
      size: {
        width: 0,
        height: 0,
      },
      href: "https://chetxu.chetserenade.info/leslab/YanTai.jpg",
    },
    {
      label: "百花公园",
      time: "2024/03/23",
      size: {
        width: 0,
        height: 0,
      },
      href: "https://chetxu.chetserenade.info/leslab/WechatIMG2185.jpg",
    },
    {
      label: "天空 🛫",
      time: "2024/01/07",
      size: {
        width: 0,
        height: 0,
      },
      href: "https://chetxu.chetserenade.info/ieslab/WechatIMG1845.jpg",
    },
    {
      label: "棒 👍",
      time: "2023/08/14",
      size: {
        width: 0,
        height: 0,
      },
      href: "https://chetxu.chetserenade.info/JedXu/WechatIMG1473.jpg",
    },
    {
      label: "奥体 🏀",
      time: "2023/08/14",
      size: {
        width: 0,
        height: 0,
      },
      href: "https://chetxu.chetserenade.info/uPic/WechatIMG1223.jpg",
    },
    {
      label: "Living alone in Jinan",
      time: "2023/07/23",
      size: {
        width: 0,
        height: 0,
      },
      href: "https://chetxu.chetserenade.info/JedXu/Jinan.jpg",
    },
    {
      label: "雨 🌧️",
      time: "2023/07/14",
      size: {
        width: 0,
        height: 0,
      },
      href: "https://chetxu.chetserenade.info/JedXu/WechatIMG1475.jpg",
    },
    {
      label: "向日葵的花语",
      time: "2023/06/06",
      size: {
        width: 0,
        height: 0,
      },
      href: "https://chetxu.chetserenade.info/JedXu/WechatIMG1476.jpg",
    },
    {
      label: "淄博人民公园",
      time: "2023/06/14",
      size: {
        width: 0,
        height: 0,
      },
      href: "https://chetxu.chetserenade.info/JedXu/WechatIMG1172.jpg",
    },
    {
      label: "受伤 👍",
      time: "2023/04/20",
      size: {
        width: 0,
        height: 0,
      },
      href: "https://chetxu.chetserenade.info/JedXu/WechatIMG1174.jpg",
    },
    {
      label: "发小",
      time: "2023/04/20",
      size: {
        width: 0,
        height: 0,
      },
      href: "https://chetxu.chetserenade.info/JedXu/WechatIMG1175.jpg",
    },
    {
      label: "夜跑 🏃",
      time: "2022/11/25",
      size: {
        width: 0,
        height: 0,
      },
      href: "https://chetxu.chetserenade.info/JedXu/12001694758911_.pic_hd.jpg",
    },
    {
      label: "爱情 ❤️",
      time: "2023/12/23",
      size: {
        width: 0,
        height: 0,
      },
      href: "https://chetxu.chetserenade.info/JedXu/11951694758845_.pic_hd.jpg",
    },
    {
      label: "淄博文体中心",
      time: "2022/11/10",
      size: {
        width: 0,
        height: 0,
      },
      href: "https://chetxu.chetserenade.info/JedXu/WechatIMG1176.jpg",
    },
    {
      label: "月照西湘 🌚",
      time: "2022/10/03",
      size: {
        width: 0,
        height: 0,
      },
      href: "https://chetxu.chetserenade.info/JedXu/11881694758825_.pic_hd.jpg",
    },
    {
      label: "山东省博物馆",
      time: "2022/10/03",
      size: {
        width: 0,
        height: 0,
      },
      href: "https://chetxu.chetserenade.info/JedXu/WechatIMG151.jpeg",
    },
    {
      label: "粉色天空",
      time: "2022/08/16",
      size: {
        width: 0,
        height: 0,
      },
      href: "https://chetxu.chetserenade.info/JedXu/11971694758845_.pic_hd.jpg",
    },
    {
      label: "Live alone",
      time: "2022/04/16",
      size: {
        width: 0,
        height: 0,
      },
      href: "https://chetxu.chetserenade.info/JedXu/11841694758806_.pic_hd.jpg",
    },
    {
      label: "关于东三路的故事",
      time: "2022/04/16",
      size: {
        width: 0,
        height: 0,
      },
      href: "https://chetxu.chetserenade.info/JedXu/11981694758899_.pic_hd.jpg",
    },
    {
      label: "周村孝妇河",
      time: "2021/10/20",
      size: {
        width: 0,
        height: 0,
      },
      href: "https://chetxu.chetserenade.info/JedXu/IMG_3733.JPG",
    },
    {
      label: "雏菊🌼",
      time: "2020/05/12",
      size: {
        width: 0,
        height: 0,
      },
      href: "https://chetxu.chetserenade.info/JedXu/12031694758924_.pic_hd.jpg",
    },
    {
      label: "通宵编程之后去吃早饭路上拍的",
      time: "2020/05/12",
      size: {
        width: 0,
        height: 0,
      },
      href: "https://chetxu.chetserenade.info/JedXu/12041694758924_.pic_hd.jpg",
    },
    {
      label: "第一份工作下班路上",
      time: "2020/11/17",
      size: {
        width: 0,
        height: 0,
      },
      href: "https://chetxu.chetserenade.info/JedXu/11961694758845_.pic_hd.jpg",
    },
    {
      label: "抽烟 🚬",
      time: "2020/09/26",
      size: {
        width: 0,
        height: 0,
      },
      href: "https://chetxu.chetserenade.info/JedXu/2020-09-26%20105639.jpg",
    },
    {
      label: "晨曦",
      time: "2020/04/12",
      size: {
        width: 0,
        height: 0,
      },
      href: "https://chetxu.chetserenade.info/JedXu/11891694758831_.pic.jpg",
    },
    {
      label: "淄博公交",
      time: "2020/06/16",
      size: {
        width: 0,
        height: 0,
      },
      href: "https://chetxu.chetserenade.info/JedXu/WechatIMG1178.jpg",
    },
    {
      label: "雪❄️",
      time: "2019/12/12",
      size: {
        width: 0,
        height: 0,
      },
      href: "https://chetxu.chetserenade.info/JedXu/12021694758919_.pic_hd.jpg",
    },
    {
      label: "🌲",
      time: "2019/10/29",
      size: {
        width: 0,
        height: 0,
      },
      href: "https://chetxu.chetserenade.info/JedXu/2020-10-25%20100814.jpg",
    },
    {
      label: "大学课程",
      time: "2019/10/20",
      size: {
        width: 0,
        height: 0,
      },
      href: "https://chetxu.chetserenade.info/JedXu/11901694758831_.pic_hd.jpg",
    },
    {
      label: "青岛",
      time: "2019/3/15",
      size: {
        width: 0,
        height: 0,
      },
      href: "https://chetxu.chetserenade.info/JedXu/2019-07-10%20235108.png",
    },
    {
      label: "眼睛",
      time: "2019/2/12",
      size: {
        width: 0,
        height: 0,
      },
      href: "https://chetxu.chetserenade.info/JedXu/2019-01-23%20091949.png",
    },
    {
      label: "夜",
      time: "2018/7/11",
      size: {
        width: 0,
        height: 0,
      },
      href: "https://chetxu.chetserenade.info/JedXu/WechatIMG1177.jpg",
    },
  ],
});

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
