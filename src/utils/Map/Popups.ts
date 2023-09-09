/*
 * @Description: 弹窗信息
 * @Author: Chetxu
 * @Date: 2022-07-09
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-09-09 15:47:14
 */
import type { Ref } from 'vue'

export function Popups(map: Ref, popup: any) {
	map.value.on('click', 'places', (e: { features: {
		geometry: any; properties: { description: any } 
}[]; lngLat: { lng: number } }) => {
		// 将光标样式更改为UI指示器
		map.value.getCanvas().style.cursor = 'pointer'

		// 复制坐标数组
		const coordinates = e.features[0].geometry.coordinates.slice()
		const description = e.features[0].properties.description

		// 确保如果地图被缩放，以使多个
		while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
			coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360
		}

		// 填充弹出窗口并设置其坐标
		popup.setLngLat(coordinates).setHTML(description).addTo(map.value)
	})
}
