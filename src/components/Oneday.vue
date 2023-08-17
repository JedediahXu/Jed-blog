<script lang="ts" setup>

const props = defineProps<{
  date?: string
}>()


// const total = computed(() => props.articles  + props.contributions + props.instagrams)
const getPointHeightStyle = (value: number) => {
  return isNaN(value) ? 0 : `${Math.floor(value * 100)}%`;
};

</script>
<template>
  <div class="day"  :data-date="date">
    <div class="point">
      <!-- <div class="item article" :style="{ height: getPointHeightStyle(articles / total) }" />
      <div class="item instagram" :style="{ height: getPointHeightStyle(instagrams / total) }" />
      -->
      <!-- <div
        class="item instagram"
        :style="{
          height: getPointHeightStyle(1 / 3),
          backgroundColor: '#f6a6ac',
        }"
      />-->
      <div
        class="item contribution"
        :style="{
          height: getPointHeightStyle(0 / 3),
          backgroundColor: 'rgb(235, 237, 240)',
        }"
      /> 
    </div>
    <div class="tooltip" >
      <p class="date">{{ date }}</p>
      <ul class="counts">
        <li class="item article">
          <i class="iconfont icon-quill"></i>
          <span class="count">暂无数据</span>
          articles
        </li>
        <li class="item contribution">
          <i class="iconfont icon-github"></i>
          <span class="count">暂无数据</span>
          github
        </li>
        <li class="item instagram">
          <i class="iconfont icon-instagram"></i>
          <span class="count">暂无数据</span>
          instagrams
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "../style/variables";
@import "../style/mixins";


.day {
  $size: 11px;
  $radius: 2px;
  position: relative;
  width: 11px;
  height: 11px;
  border-radius: $radius;
  background-color: $module-bg-opaque;
  &.dark {
    background-color: $module-bg-darker-1;
    .point {
      filter: brightness(86%);
    }
    .tooltip {
      color: $text-reversal;
      #{--background}: rgba($white, 0.9);
    }
  }

  &:not([data-total-count="0"]) {
    &:hover {
      outline: 1px solid $theme-black;
    }
    .point:hover {
      & + .tooltip {
        opacity: 1 !important;
        visibility: visible !important
      }
    }
  }

  .point {
    display: block;
    width: 11px;
    height: 11px;
    border-radius: $radius;
    overflow: hidden;

    .item {
      width: 100%;
      &.article {
        background-color: $rss-primary;
      }
      &.instagram {
        background-color: $instagram-primary;
      }
    }
  }

  .tooltip {
    #{--background}: rgba($black, 0.9);
    position: absolute;
    left: 22px;
    top: 0;
    transform: translateY(-50%);
    white-space: nowrap;
    z-index: $z-index-normal + 1;
    padding: $sm-gap $gap;
    padding-right: $lg-gap;
    background-color: var(--background);
    border-radius: $sm-radius;
    color: $text-reversal;
    @include hidden();
    &::before {
      $size: 4px;
      content: "";
      position: absolute;
      left: -$size * 2;
      top: 50%;
      margin-top: -1px;
      width: 0;
      height: 0;
      border-top: $size * 1.5 solid transparent;
      border-right: $size * 2 solid var(--background);
      border-bottom: $size * 1.5 solid transparent;
    }

    .date {
      color: $module-bg-opaque;
      font-weight: bold;
      margin-bottom: $xs-gap;
    }

    .counts {
      margin: 0;
      padding: 0;
      list-style: none;

      .item {
        line-height: 1.8em;
        font-size: $font-size-small;
        &.article {
          color: $rss-primary;
        }
      
        &.instagram {
          color: $instagram-primary;
        }


      &.contribution {
        color: $module-bg-opaque
      }

        .count {
          margin-left: $sm-gap;
          font-weight: bold;
        }
      }
    }
  }

  /* articles */
  /* 5+ */
  &:not([data-article-count="0"]) {
    .point {
      .article {
        background-color: $rss-primary;
      }
    }
  }
  /* 1 */
  &[data-article-count="1"] {
    .point {
      .article {
        background-color: lighten($rss-primary, 20%);
      }
    }
  }
  /* 2-4 */
  &[data-article-count="2"],
  &[data-article-count="3"],
  &[data-article-count="4"] {
    .point {
      .article {
        background-color: lighten($rss-primary, 10%);
      }
    }
  }

  /* instagrams */
  /* 3+ */
  &:not([data-instagram-count="0"]) {
    .point {
      .instagram {
        background-color: $instagram-primary;
      }
    }
  }
  /* 1 */
  &[data-instagram-count="1"] {
    .point {
      .instagram {
        background-color: lighten($instagram-primary, 20%);
      }
    }
  }
  /* 2 */
  &[data-instagram-count="2"],
  &[data-instagram-count="3"] {
    .point {
      .instagram {
        background-color: lighten($instagram-primary, 10%);
      }
    }
  }
}
</style>
