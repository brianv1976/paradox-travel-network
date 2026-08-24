import { defineConfig } from "@playwright/test";

const liveBaseUrl = process.env.AUDIT_BASE_URL;

export default defineConfig({
  testDir: "./tests",
  outputDir: "test-results",
  timeout: 45_000,
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 2 : 4,
  reporter: [["list"], ["html", { open: "never" }]],
  use: {
    baseURL: liveBaseUrl || "http://127.0.0.1:4173",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
  },
  webServer: liveBaseUrl
    ? undefined
    : {
        command: "npm run build && npm run preview -- --host 127.0.0.1",
        url: "http://127.0.0.1:4173",
        reuseExistingServer: !process.env.CI,
        timeout: 120_000,
      },
  projects: [
    { name: "desktop-1440", use: { viewport: { width: 1440, height: 900 } } },
    { name: "laptop-1024", use: { viewport: { width: 1024, height: 768 } } },
    { name: "tablet-768", use: { viewport: { width: 768, height: 1024 }, isMobile: true, hasTouch: true } },
    { name: "phone-390", use: { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true } },
    { name: "phone-320", use: { viewport: { width: 320, height: 568 }, isMobile: true, hasTouch: true } },
    { name: "phone-landscape", use: { viewport: { width: 667, height: 375 }, isMobile: true, hasTouch: true } },
  ],
});
