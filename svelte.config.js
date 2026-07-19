import adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';
import fs from 'fs';

const routes = fs.existsSync('./routes.js')
	? (await import('./routes.js')).default
	: [];

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess(),

	kit: {
		adapter: adapter(),
		trailingSlash: 'always',
		prerender :{
			default: true,
			crawl: true,
			enabled: true,
			onError: 'continue',
			entries: [...routes],
		},
	}
};

export default config;
