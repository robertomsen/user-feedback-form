import { defineConfig } from '@playwright/test';

const PORT = process.env.PORT || 5173;

export default defineConfig({
  testDir: './tests/e2e',
  timeout: 10000,
  use: {
    baseURL: `http://localhost:${PORT}`,
    headless: true,
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
  },
});
