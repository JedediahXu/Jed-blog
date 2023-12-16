/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
	darkMode: 'class',
	content: ['./src/**/*.{astro,html,js,jsx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				white: '#f5f5f5',
				pale:"#FFFFFFE5",
				somber:"#000000E5",
				day:' #eebbeeec',
				mark:'rgba(68, 68, 68, .6)',
			},
			fontFamily: {
				body: ['Manrope', ...defaultTheme.fontFamily.sans]
			},
		}
	},
	plugins: [
	],
}
