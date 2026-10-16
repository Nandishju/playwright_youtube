import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// __dirname doesn't exist in ES modules, so recreate it
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

test('Upload a PNG or PDF file', async ({ page }) => {
  await expect(page.locator('h2')).toHaveText('Playwright File Upload & Download');
  await expect(page.locator('section h3').nth(1)).toHaveText('File Download');
  await expect(page.locator('label')).toHaveText('Choose a PDF or PNG file:');

  // Upload a file
  const filePath = 'tests/sampleTest.pdf'; // Path to the sample file
  await page.setInputFiles('#file-upload', filePath);
});


test('Download a file', async ({ page }) => {
  await expect(page.locator('section h3').nth(1)).toHaveText('File Download');
    // Click the download button    
    const downloadPromise = page.waitForEvent('download');
    await page.getByTestId('download-button').click();
    const download = await downloadPromise;

    const content = fs.readFileSync(await download.path(), 'utf-8');
    console.log(content);
});