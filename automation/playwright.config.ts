import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright Configuration
 * Set testDir to ./tests and configure Chromium browser.
 */
export default defineConfig({
  testDir: './tests',
  timeout: 60 * 1000, // 60 seconds timeout
  expect: {
    timeout: 5000
  },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://localhost:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    
    /* Take screenshot on failure */
    screenshot: 'only-on-failure',
    
    /* Record video on failure */
    video: 'retain-on-failure',

    /* Run in headless mode for server/Docker compatibility */
    headless: true,
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
