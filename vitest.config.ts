import { defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		coverage: {
			provider: "v8",
			include: ["src/**/*.ts"],
			exclude: ["src/generated/**", "src/index.ts"],
			thresholds: {
				statements: 85,
			},
		},
	},
});
