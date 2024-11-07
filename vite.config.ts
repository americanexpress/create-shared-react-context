import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: [
      // Any .spec/test files in __tests__/unit
      "**/__tests__/unit/**/*.?(*.)+(spec|test).[tj]s?(x)",
    ],
    environment: "jsdom",
    setupFiles: ["__tests__/setup.ts"],
    coverage: {
      enabled: true,
      thresholds: { "100": true }, // Set global coverage threshold to 100%
      include: ["src/**"],
      exclude: ["**/*.d.ts"],
      reportsDirectory: "__tests__/unit/coverage",
    },
    clearMocks: true, // automatically run mockClear between every test
  },
});
