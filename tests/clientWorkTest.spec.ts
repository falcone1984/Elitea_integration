import { test, expect } from '@playwright/test';

test('Navigate to EPAM, select Services, and verify Client Work', async ({ page }) => {
  // Step 1: Navigate to https://www.epam.com/
  await page.goto('https://www.epam.com/');

  // Step 2: Select "Services" from the header menu
  await page.click('text=Services');

  // Step 3: Click the "Explore Our Client Work" link
  await page.click('text=Explore Our Client Work');

  // Step 4: Verify that the "Client Work" text is visible on the page
  const clientWorkText = await page.locator('text=Client Work');
  await expect(clientWorkText).toBeVisible();
});