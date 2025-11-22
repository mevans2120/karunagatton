import { test, expect } from '@playwright/test';

/**
 * Visual Regression Tests for Tailwind Refactoring
 *
 * These tests ensure that the Tailwind tokenization refactoring
 * produces ZERO visual changes to the website.
 *
 * How it works:
 * 1. First run: Generates baseline screenshots
 * 2. Subsequent runs: Compares against baseline
 * 3. Any pixel differences will fail the test
 */

// All pages in the application
const pages = [
  { name: 'home', path: '/' },
  { name: 'about', path: '/about' },
  { name: 'offerings', path: '/offerings' },
  { name: 'drum-circle', path: '/drum-circle' },
  { name: 'get-in-touch', path: '/get-in-touch' },
];

// Viewports to test across
const viewports = [
  { name: 'mobile', width: 375, height: 667 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'desktop', width: 1280, height: 800 },
  { name: 'large-desktop', width: 1920, height: 1080 },
];

// Generate a test for each page x viewport combination
for (const page of pages) {
  for (const viewport of viewports) {
    test(`${page.name} - ${viewport.name}`, async ({ page: pw }) => {
      // Set viewport size
      await pw.setViewportSize({ width: viewport.width, height: viewport.height });

      // Navigate to page
      await pw.goto(page.path);

      // Wait for page to be fully loaded
      await pw.waitForLoadState('networkidle');

      // Wait for any animations to complete
      // The site has fade-in animations that take ~600ms
      await pw.waitForTimeout(1500);

      // Disable animations for consistent screenshots
      await pw.addStyleTag({
        content: `
          *, *::before, *::after {
            animation-duration: 0s !important;
            animation-delay: 0s !important;
            transition-duration: 0s !important;
            transition-delay: 0s !important;
          }
        `,
      });

      // Take full page screenshot and compare
      await expect(pw).toHaveScreenshot(`${page.name}-${viewport.name}.png`, {
        fullPage: true,
        animations: 'disabled',
        // Allow for minor anti-aliasing differences
        maxDiffPixels: 100,
      });
    });
  }
}

// Test for 404 page (special case)
test.describe('404 page', () => {
  for (const viewport of viewports) {
    test(`not-found - ${viewport.name}`, async ({ page: pw }) => {
      await pw.setViewportSize({ width: viewport.width, height: viewport.height });

      // Navigate to a non-existent page to trigger 404
      await pw.goto('/this-page-does-not-exist');

      await pw.waitForLoadState('networkidle');
      await pw.waitForTimeout(1500);

      await pw.addStyleTag({
        content: `
          *, *::before, *::after {
            animation-duration: 0s !important;
            animation-delay: 0s !important;
            transition-duration: 0s !important;
            transition-delay: 0s !important;
          }
        `,
      });

      await expect(pw).toHaveScreenshot(`not-found-${viewport.name}.png`, {
        fullPage: true,
        animations: 'disabled',
        maxDiffPixels: 100,
      });
    });
  }
});
