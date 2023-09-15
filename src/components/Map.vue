<template>
  <div class="footprint w-full">
    <div class="footprint-map">
      <div class="mapbox-wrapper">
        <div class="mapbox mapboxgl-map">
          <div class="mapboxgl-canary"></div>
          <div
            class="mapboxgl-canvas-container mapboxgl-interactive mapboxgl-touch-drag-pan mapboxgl-touch-zoom-rotate"
          >
            <div
              id="mapContainer"
              ref="mapDivElement"
              tabindex="0"
              aria-label="Map"
              role="region"
              class="mapContainer"
            >
              <div
                class="bg-slate-100 shadow-md text-slate-700 rounded-full py-2 px-6 slate-900 text-lg font-semibold absolute bottom-4 left-4 watermark"
              >
                JiNan, Shandong
              </div>
            </div>
          </div>
        </div>
        <div class="toolbar">
          <a
            class="button"
            rel="external nofollow noopener"
            target="_blank"
            href="https://www.google.com/maps/d/embed?mid=1sRx6t0Yj1TutbwORCvjwTMgr70r62Z6w&amp;z=3"
          >
            <i class="iconfont icon-google-maps"></i>
          </a>
          <button class="button" @click="toggleFullscreen">
            <i class="iconfont icon-fullscreen"></i>
          </button>
        </div>
      </div>
      <div class="legends be-with">
        <div class="current-location" @click="displayCurrentLocation">
          <i class="iconfont icon-location"></i>
          <span class="text">苟活于此，代码为伴</span>
        </div>
        <ul class="folders">
          <li
            class="item"
            v-for="(item, index) in photoItems"
            :key="index"
            @click="displayPhoto(index)"
          >
            <i class="iconfont icon-route"></i>
            <span class="text">{{ item.text }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import mapboxgl from "mapbox-gl";
import { geoPhoto, geoData } from "../utils/config";
import { initDragMap } from "../utils/Map/drawMap";
import { onMounted, ref } from "vue";

let popup = new mapboxgl.Popup({
  closeButton: false,
  closeOnClick: false,
});

// 地图数据
const { map, mapDivElement, marker } = initDragMap(mapboxgl, popup, geoPhoto, geoData);

const photoItems = [
  { text: "2023 山东济南", count: "(0)" },
  { text: "2022 山东淄博", count: "(1)" },
  { text: "2018 山东滕州", count: "(2)" },
  { text: "2012 上海世博", count: "(3)" },
  { text: "2008 山东临沂", count: "(4)" },
  { text: "••••" },
];

// 地图按钮
const toggleFullscreen = () => {
  // 在这里实现全屏功能的逻辑
};

// 主菜单
const displayCurrentLocation = () => {
  map.value.flyTo({
    center: [Number(116.99159757284207), Number(36.65020327424449)],
    zoom: 5,
  });
};

// 地图左侧菜单
const displayPhoto = (i: number) => {
  const mapContainer = geoPhoto.features[i].geometry.coordinates;
  map.value.flyTo({ center: [mapContainer[0], mapContainer[1]], zoom: 12 });
  popup
    .setLngLat([mapContainer[0], mapContainer[1]])
    .setHTML(geoPhoto.features[i].properties.description)
    .addTo(map.value);
};
</script>

<style lang="scss" scope>
@import "../style/variables";
@import "../style/mixins";

.footprint {
  border: 1px solid black;
  width: 100%;
  border-radius: 6px;

  .about-page .footprint {
    width: 100%;
    margin-bottom: 2rem;
  }

  .footprint-map {
    position: relative;
    display: flex;
    height: 100%;
  }

  .mapbox-wrapper {
    position: relative;
    padding: 0.6rem;
    transition: background-color 0.25s;
    border-radius: 6px;
    overflow: hidden;
    flex: 1;
  }

  .mapbox-wrapper .mapbox {
    width: 100%;
    display: block;
  }

  .mapbox-wrapper .toolbar {
    position: absolute;
    top: 2.472rem;
    right: 2.472rem;
    z-index: 1;
    display: flex;
  }

  .mapbox-wrapper .toolbar .button {
    margin-left: 1.236rem;
    display: none;
    width: 2em;
    height: 2em;
    line-height: 2em;
    border-radius: 2px;
    text-align: center;
    font-size: 16.1px;
    backdrop-filter: blur(1px);
    -webkit-backdrop-filter: blur(1px);
  }

  .legends {
    display: flex;
    padding: 0.418rem 1rem;
    flex-direction: column;
    color: rgba(0, 0, 0, 0.5);
  }

  .legends .current-location {
    flex-shrink: 0;
    display: inline-flex;
    margin-bottom: 1.236rem;
    padding: 0 1rem;
    width: 100%;
    line-height: 3.4em;
    cursor: pointer;
    background-color: #dde9eb;
  }

  .legends .folders,
  .legends .current-location {
    transition: background-color 0.25s;
    border-radius: 6px;
    overflow: hidden;
  }

  .legends .current-location .iconfont {
    margin-right: 0.618rem;
  }

  .legends .current-location .text {
    font-weight: 700;
  }

  .legends .folders {
    flex: 1;
    list-style: none;
    margin: 0;
    padding: 0.418rem 1rem;
    background-color: #dde9eb;
  }

  .legends .folders,
  .legends .current-location {
    transition: background-color 0.25s;
    border-radius: 6px;
    overflow: hidden;
  }

  .legends .folders .item {
    line-height: 2.4em;
    cursor: pointer;
  }

  .legends .folders .item .iconfont[data-v-4b83f663] {
    margin-right: 1rem;
  }

  .legends .folders .item .text[data-v-4b83f663] {
    font-weight: 700;
    margin-right: 0.309rem;
  }

  .mapboxgl-map {
    font: 12px/20px Helvetica Neue, Arial, Helvetica, sans-serif;
    overflow: hidden;
    position: relative;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }

  .mapboxgl-canvas {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
  }

  a {
    color: var(--link-color);
  }

  a,
  area,
  button,
  input,
  label,
  select,
  textarea,
  [tabindex] {
    touch-action: manipulation;
  }

  a {
    text-decoration: none;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }

  input[type="submit"],
  input[type="reset"],
  button {
    cursor: pointer;
    display: inline-block;
    text-align: center;
    vertical-align: middle;
    white-space: nowrap;
  }

  .iconfont {
    font-size: 1em;
  }

  .iconfont {
    font-size: 1em;
  }

  .iconfont {
    font-family: iconfont !important;
    font-size: 16px;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  ul,
  ol {
    margin-bottom: 1em;
    padding-left: 3em;
    vertical-align: baseline;
  }

  .iconfont {
    font-size: 1em;
  }

  .iconfont {
    font-family: iconfont !important;
    font-size: 16px;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  .mapboxgl-canary {
    visibility: hidden;
  }

  .mapContainer {
    width: 100%;
    height: 45vh;
  }

  .mapboxgl-ctrl {
    display: block;
  }
}

.custom-marker {
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  border-radius: 50%;
  cursor: pointer;

  border: 5px solid white;
  width: 240px;
  height: 240px;

  box-shadow: 0 0 0px 0px rgba(0, 191, 255, 0.7);
  animation: glow 3s infinite;
}

@keyframes glow {
  0% {
    box-shadow: 0 0 0px 0px rgba(0, 191, 255, 0.7);
  }
  50% {
    box-shadow: 0 0 20px 20px rgba(0, 191, 255, 0.1);
  }
  100% {
    box-shadow: 0 0 0px 0px rgba(0, 191, 255, 0.7);
  }
}

.icon-location:before {
  content: "\e619";
}

.mapboxgl-ctrl-logo {
  display: none !important;
}
.mapboxgl-ctrl-attrib {
  display: none !important;
}
.mapboxgl-ctrl-scale {
  display: none !important;
}

@media (max-width: 1200px) {
  .be-with {
    display: none !important;
  }
}

/* 新增水印样式 */
.watermark {
  z-index: 9999;
}
</style>
