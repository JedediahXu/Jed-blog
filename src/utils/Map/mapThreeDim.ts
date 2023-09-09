/*
 * @Description: 渲染模型高度
 * @Author: XuGe
 * @Date: 2022-07-09
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-09-09 15:42:26
 */
import type { Ref } from 'vue'

export function mapThreeDim(map: Ref) {
	map.value.on('load', () => {
		const layers = map.value.getStyle().layers
		if (layers !== undefined) {
			const labelLayerId = layers.find(
				(layer: { layout: { [x: string]: unknown }; type: string }) => {
					if ('layout' in layer && layer.layout !== undefined) {
						return layer.type === 'symbol' && layer.layout['text-field']
					} else {
						return false
					}
				},
			)?.id
			//3D
			map.value.addLayer(
				{
					id: '3d',
					source: 'composite',
					'source-layer': 'building',
					filter: ['==', 'extrude', 'true'],
					type: 'fill-extrusion',
					minzoom: 15,
					paint: {
						'fill-extrusion-color': '#aaa',

						// Use the "interpolation" expression to add a smooth transition effect to the building as the user zooms in
						'fill-extrusion-height': [
							'interpolate',
							['linear'],
							['zoom'],
							15,
							0,
							15.05,
							['get', 'height'],
						],
						'fill-extrusion-base': [
							'interpolate',
							['linear'],
							['zoom'],
							15,
							0,
							15.05,
							['get', 'min_height'],
						],
						'fill-extrusion-opacity': 0.6,
					},
				},
				labelLayerId,
			)
		}
	})
}
