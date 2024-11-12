import adapter from "@sveltejs/adapter-cloudflare"
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte"

// Function to exclude routes that start with an underscore
function excludeUnderscoreRoutes() {
  return {
    name: 'exclude-underscore-routes',
    enforce: 'pre',
    resolveId(source) {
      // Exclude files and directories starting with an underscore
      if (source.includes('/_') || source.startsWith('_')) {
        return source; // Prevent further processing
      }
      return null;
    },
    load(id) {
      if (id.includes('/_') || id.startsWith('_')) {
        return ''; // Return empty content to exclude from build
      }
      return null;
    },
  };
}

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    // adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
    // If your environment is not supported or you settled on a specific environment, switch out the adapter.
    // See https://kit.svelte.dev/docs/adapters for more information about adapters.
    adapter: adapter({
      routes: {
        include: ["/*"],
        exclude: ["<all>"],
      },
      vite: {
        plugins: [excludeUnderscoreRoutes()],
      },
      // for cloudflare workers not needed here
      /*platformProxy: {
				configPath: 'wrangler.toml',
				environment: undefined,
				experimentalJsonConfig: false,
				persist: false
			}*/
    }),
    // allow up to 150kb of style to be inlined with the HTML
    // Faster FCP (First Contentful Paint) by reducing the number of requests
    inlineStyleThreshold: 150000,
  },
  preprocess: vitePreprocess(),
}

export default config

