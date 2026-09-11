import { defineConfig } from '@playwright/test';

/** Point at an already-running copy with PLAYWRIGHT_BASE_URL so a dev server in use is left alone. */
const external = process.env.PLAYWRIGHT_BASE_URL;

export default defineConfig({
  testDir: 'e2e',
  use: { baseURL: external ?? 'http://localhost:3000' },
  ...(external
    ? {}
    : { webServer: { command: 'bun run dev', url: 'http://localhost:3000', reuseExistingServer: true, timeout: 120_000 } }),
});
