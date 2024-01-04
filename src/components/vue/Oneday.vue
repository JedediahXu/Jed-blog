<script lang="ts" setup>
import { computed } from "vue";

const props = defineProps<{
  date?: string;
  githubColor?: string;
  articles: number;
  contributions: number;
}>();

const total = computed(() => props.articles + props.contributions);
const getPointHeightStyle = (value: number) => {
  return isNaN(value) ? 0 : `${Math.floor(value * 100)}%`;
};
</script>

<template>
  <div
    class="day bg-lunarLight dark:bg-slate-600"
    :data-date="date"
    :data-total-count="total"
    :data-contribution-count="contributions"
    data-pagefind-ignore
  >
    <div class="point">
      <div
        class="item article"
        :style="{ height: getPointHeightStyle(articles / total) }"
      />
      <!-- <div
        class="item instagram"
        :style="{ height: getPointHeightStyle(instagrams / total) }"
      /> -->
      <!-- <div
        class="item instagram"
        :style="{
          height: getPointHeightStyle(2 / 3),
          backgroundColor: '#f6a6ac',
        }"
      /> -->
      <div
        class="item contribution"
        :style="{
          height: getPointHeightStyle(3 / 3),
          backgroundColor: githubColor,
        }"
      />
    </div>
    <div class="tooltip bg-techNoir dark:bg-slate-800" v-if="total">
      <p class="date">{{ date }}</p>
      <ul class="counts">
        <li class="item article">
          <i class="iconfont icon-quill"></i>
          <span class="count">发生 {{ articles }} 次</span>
          articles
        </li>
        <li class="item contribution">
          <i class="iconfont icon-github"></i>
          <span class="count">发生 {{ contributions }} 次</span>
          contributions
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
@import "@/style/mixins";

li {
  text-decoration: none;
}

.day {
  $size: 11px;
  $radius: 2px;
  position: relative;
  width: 11px;
  height: 11px;
  border-radius: $radius;
  &.dark {
    background-color: #444;
    .point {
      filter: brightness(86%);
    }
    .tooltip {
      color: #444;
      #{--background}: rgba(#ffffff, 0.9);
    }
  }

  &:not([data-total-count="0"]) {
    &:hover {
      outline: 1px solid #000;
    }
    .point:hover {
      & + .tooltip {
        opacity: 1 !important;
        visibility: visible !important;
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
        background-color: #f8981d;
      }
      &.instagram {
        background-color: #ed4956;
      }
    }
  }

  .tooltip {
    #{--background}: rgba(#000000, 0.7);
    position: absolute;
    left: 22px;
    top: 0;
    transform: translateY(-50%);
    white-space: nowrap;
    z-index: 0 + 1;
    padding: 8px 1rem;
    padding-right: 1rem;
    border-radius: 4px;
    color: #444;
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
      color: #fff;
      font-weight: bold;
      margin-bottom: 4px;
    }

    .counts {
      margin: 0;
      padding: 0;
      list-style: none;

      .item {
        line-height: 1.8em;
        font-size: 12px;
        &.article {
          color: #f8981d;
          /* A token to indicate that twitter is no longer supported */
          // text-decoration: line-through;
        }

        &.instagram {
          color: #ed4956;
          /* A token to indicate that twitter is no longer supported */
          text-decoration: line-through;
        }

        &.contribution {
          color: #fff;
        }

        .count {
          margin-left: 8px;
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
        background-color: #f8981d;
      }
    }
  }
  /* 1 */
  &[data-article-count="1"] {
    .point {
      .article {
        background-color: lighten(#f8981d, 20%);
      }
    }
  }
  /* 2-4 */
  &[data-article-count="2"],
  &[data-article-count="3"],
  &[data-article-count="4"] {
    .point {
      .article {
        background-color: lighten(#f8981d, 10%);
      }
    }
  }

  /* instagrams */
  /* 3+ */
  &:not([data-instagram-count="0"]) {
    .point {
      .instagram {
        background-color: #ed4956;
      }
    }
  }
  /* 1 */
  &[data-instagram-count="1"] {
    .point {
      .instagram {
        background-color: lighten(#ed4956, 20%);
      }
    }
  }
  /* 2 */
  &[data-instagram-count="2"],
  &[data-instagram-count="3"] {
    .point {
      .instagram {
        background-color: lighten(#ed4956, 10%);
      }
    }
  }
}
</style>
