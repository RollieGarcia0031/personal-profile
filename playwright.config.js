/** @type {import('playwright/test').PlaywrightTestConfig} */
module.exports = {
  testDir: './tests/e2e',
  testMatch: '**/*.spec.{js,ts}',
  use: {
    baseURL: 'http://127.0.0.1:4173'
  },
  webServer: {
    command: 'pnpm build:local && pnpm preview --host 127.0.0.1 --port 4173',
    url: 'http://127.0.0.1:4173',
    reuseExistingServer: !process.env.CI,
    timeout: 120000
  }
};
