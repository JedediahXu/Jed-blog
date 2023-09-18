import { onMounted, Ref, ref } from 'vue'
import mapboxgl from 'mapbox-gl';
import { mapThreeDim } from './mapThreeDim'
import { skyLoad } from './skyLoad'
import { click } from './click'
import { addPhoto } from './addPhoto'
import { addPointMk } from './addPointMk'
import { Popups } from './Popups'

export function initDragMap(
  mapboxgl: { accessToken: string },
  popup: unknown,
  geoPhoto: unknown,
  geoData: unknown,
) {
  const mapDivElement: Ref<HTMLDivElement | null> = ref(null)
  const map: any = ref({})
  const marker: unknown = ref({})
  onMounted(initMap)
  return {
    map,
    mapDivElement,
    marker,
  }



  /**
   * 初始化地图
   */
  function initMap() {
    mapboxgl.accessToken =
      'pk.eyJ1Ijoic2VyZW5hZGUwOTE2IiwiYSI6ImNsNWRieWNrZTBwdWgzYm8yZXNiZno2NWsifQ.IKHQFsbqXEpXC3wPWDDs1A'
    mapNew(map, mapDivElement, marker, popup, geoPhoto, geoData, [
      Number(116.99159757284207),
      Number(36.65020327424449),
    ])
  }
}



/**
 * 地图
 * @param map
 * @param mapDivElement
 * @param marker
 * @param popup
 * @param arr
 */
function mapNew(
  map: any,
  mapDivElement: Ref<HTMLDivElement | null>,
  marker: any,
  popup: unknown,
  geoPhoto: unknown,
  geoData: unknown,
  arr: [number, number],
) {
  if (mapDivElement.value !== null) {
    map.value = new mapboxgl.Map({
      container: mapDivElement.value, // 容器 ID
      center: arr, // 初始坐标
      minZoom: 1.7, // 设置最小缩放比例
      zoom: 5, // 初始缩放级别
      style: 'mapbox://styles/serenade0916/cl5g5ecmx003d14pv1c05whzc',
      pitch: 30, // 地图的俯仰角
      bearing: 0, // 地图的初始方向，值为北的逆时针度数，默认为0，即正北
      antialias: true, // 关闭抗锯齿以提高性能
    })

    map.value.on('click', function () {
      // 处理点击事件
      // console.log(e.lngLat, '---------')
    })

    // 创建一个自定义标记元素
    const avatarUrl = 'https://chetxu.chetserenade.info/uPic/WechatIMG825.jpeg'; 
    const markerElement = document.createElement('div');
    markerElement.className = 'custom-marker';
    markerElement.style.backgroundImage = `url(${avatarUrl})`;
    markerElement.style.width = '100px'; // 调整宽度和高度以适应您的头像尺寸
    markerElement.style.height = '100px';

    // 在地图上添加自定义标记
    marker.value = new mapboxgl.Marker({
      element: markerElement,
    })
      .setLngLat(arr)
      .addTo(map.value)

    mapThreeDim(map) // 渲染模型高度
    skyLoad(map) // 转动后的天空层
    addPhoto(map, popup, geoPhoto) // 渲染坐标
    addPointMk(map, popup, geoData)
    click(map, popup) // 移除坐标弹窗
    Popups(map, popup) // 弹窗信息

    // 添加比例尺控件
    const scale = new mapboxgl.ScaleControl({
      maxWidth: 100,
      unit: 'metric',
    })

    map.value.addControl(scale, 'bottom-left')
    scale.setUnit('metric')
  } else {
    throw Error('地图初始化错误')
  }
}
