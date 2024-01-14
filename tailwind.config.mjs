/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				'accent': 'var(--accent)',
				'accent-light': 'var(--accent-light)',
				'accent-dark': 'var(--accent-dark)',
				'accent-gradient': 'var(--accent-gradient)'
			}
		},
	},
	plugins: [
		function ({ addVariant }) {
			addVariant('child', '& > *');
			addVariant('child-hover', '& > *:hover');
		}
	],
	corePlugins: {
		preflight: false,
	}
}
