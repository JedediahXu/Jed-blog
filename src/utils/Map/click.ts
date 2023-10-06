/*
 * @Description: 移除坐标弹窗
 * @Author: Jed
 * @Date: 2022-07-09
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-10-06 13:23:24
 */
import type { Ref } from 'vue'

export function click(map: Ref, popup: any) {
	map.value.on('click', (e: any) => {
		console.log(e);
		
		map.value.getCanvas().style.cursor = ''
		popup.remove()
	})
}
