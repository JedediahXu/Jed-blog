<script setup>
import { ref } from "vue";
import { defineEmits } from "vue";

const props = defineProps({
  images: Array,
  currentIndex: Number,
  isVisible: Boolean,
});

const showButtons = ref(false);
const emits = defineEmits(["close", "change"]);
const close = () => {
  emits("close");
};

const change = (direction) => {
  let newIndex = props.currentIndex + direction;
  if (newIndex < 0) {
    newIndex = 0;
  } else if (newIndex >= props.images.length) {
    newIndex = props.images.length - 1;
  }
  emits("change", newIndex);
};

const closeModal = (event) => {
  if (event.target.classList.contains("modal")) {
    close();
  }
};

const handleMouseEnter = () => {
  showButtons.value = true;
};

const handleMouseLeave = () => {
  showButtons.value = false;
};
</script>

<template>
  <transition name="fade">
    <div v-if="isVisible" class="modal" @click="closeModal">
      <div
        class="modal-content bg-snowfallWhite text-stone-950 dark:bg-[#232323]"
        @mouseenter="handleMouseEnter"
        @mouseleave="handleMouseLeave"
      >
        <img :src="images[currentIndex].href" alt="Full Size Image" />
        <button
          v-if="currentIndex < images.length - 1 && showButtons"
          @click.stop="change(1)"
          class="next-button"
        >
          <i data-v-4830c8dd="" class="iconfont icon-next"></i>
        </button>
        <button
          v-if="currentIndex > 0 && showButtons"
          @click.stop="change(-1)"
          class="prev-button"
        >
          <i data-v-4830c8dd="" class="iconfont icon-prev"></i>
        </button>
      </div>
    </div>
  </transition>
</template>

<style scope lang="scss">
.modal {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 1000;

  button {
    opacity: 0.7;
    width: 2.3rem;
    height: 2.3rem;
    border-radius: 100%;
    background-color: #ccc;
    transition: all 0.3s;
    position: absolute;
    top: 50%;
    cursor: pointer;
  }

  button:hover {
    background-color: #eee;
  }

  button:disabled {
    background-color: #f9f9f9;
    color: #ccc;
    cursor: default;
  }

  .next-button {
    right: 25px;
  }

  .prev-button {
    left: 25px;
  }
}

.modal-content {
  position: relative;
  max-width: 80%;
  max-height: 100%;
  padding: 6px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
}

.modal-content img {
  min-width: 30rem;
  max-height: 86vh;
  width: auto;
  height: auto;
  overflow: hidden;
  will-change: width, height;
  transition: max-width 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94),
    max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
