import { test, expect } from '@playwright/test';

test.beforeAll(async () => {
  // Start the Vite server before running the tests
  console.log('Starting Vite server...');
  // You can use a child process to start the server if needed
  // For example, using 'child_process' module in Node.js 
});


test.beforeEach(async ({ page }) => {
  // Navigate to the home page before each test
  await page.goto('http://localhost:5173');
});


test('should display the correct title', async ({ page }) => {
  await expect(page.locator('.logo')).toBeVisible();
});

test('should display the search input field', async ({ page }) => {
  await expect(page.locator('.search input')).toBeVisible();
  await expect(page.locator('.search button .lucide-search')).toBeVisible();
});

test.afterEach(async () => {
  // You can add any cleanup code here if needed after each test
  console.log('Test completed.');
});

test.afterAll(async () => {
  // Stop the Vite server after running the tests
  console.log('Stopping Vite server...');
  // You can use a child process to stop the server if needed
});