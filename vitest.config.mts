import { defineWorkersConfig } from "@cloudflare/vitest-pool-workers/config";
import { cloudflare } from "@cloudflare/vite-plugin"

export default defineWorkersConfig({
	server: {
		cors: false
	},
	test: {
		poolOptions: {
			workers: {
				wrangler: { configPath: "./wrangler.jsonc" },
			},
		},
	},
});
