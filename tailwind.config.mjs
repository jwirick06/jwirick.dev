import defaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	darkMode: 'class',
	theme: {
		extend: {
			fontFamily: {
				mono: ['"JetBrains Mono"', ...defaultTheme.fontFamily.mono],
				sans: ['Inter', ...defaultTheme.fontFamily.sans],
			},
			colors: {
				accent: {
					DEFAULT: '#5b8def',
					100: '#e1e9fd',
					300: '#a6c1f7',
					400: '#7ba6f2',
					500: '#5b8def',
					600: '#3d6bd6',
					700: '#2f52a8',
				},
			},
		},
	},
	plugins: [],
}
