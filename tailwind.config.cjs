/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
	darkMode: 'class',
	content: ['./src/**/*.{astro,html,js,jsx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				snowfallWhite: '#dedede',
				crystalClear: "#FFFFFFE5",
				techNoir: "#000000E5",
				lightGray:'#444444',
				lunarLight: ' #eebbeeec',
				markerShadow: 'rgba(68, 68, 68, .6)',
				dullGrey:'#B2C5DE',
				frostedGlass: 'rgba(255, 255, 255, .6)',
				codeReveal: 'rgba(255, 255, 255, .9)',
				secondary:'rgba(240, 240, 240, .5)',
				commentBackground:'#ffffffe5',
			},
			fontFamily: {
				body: ['Manrope', ...defaultTheme.fontFamily.sans]
			},
		}
	}
}
