/*
 * @Description: 移除坐标弹窗
 * @Author: Jed
 * @Date: 2022-07-09
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-11-06 14:43:21
 */
import type { Ref } from 'vue'

export function click(map: Ref, popup: any) {
	map.value.on('click', (e: any) => {
		
		map.value.getCanvas().style.cursor = ''
		popup.remove()
	})
}
