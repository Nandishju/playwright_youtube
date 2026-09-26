import { test, expect } from '@playwright/test';

test('should display the correct title', async ({ page }) => {
  await page.goto('http://localhost:5173');
  await expect(page.locator('.logo')).toBeVisible();
});

test('should display the search input field', async ({ page }) => {
  await page.goto('http://localhost:5173');
  await expect(page.locator('.search input')).toBeVisible();
  await expect(page.locator('.search button .lucide-search')).toBeVisible();
});