/*
 * @Description: 转动后的天空层
 * @Author: Chetxu
 * @Date: 2022-07-09
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-09-09 15:43:55
 */
import type { Ref } from 'vue'

export function skyLoad(map: Ref) {
	map.value.on('load', () => {
		map.value.addLayer({
			id: 'sky',
			type: 'sky',
			paint: {
				'sky-type': 'atmosphere',
				'sky-atmosphere-sun': [0.0, 0.0],
				'sky-atmosphere-sun-intensity': 15,
			},
		})
	})
}
