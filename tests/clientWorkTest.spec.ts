import { test, expect } from '@playwright/test';

test('Navigate to Client Work page and verify text', async ({ page }) => {
  // Step 1: Navigate to https://www.epam.com/
  await page.goto('https://www.epam.com/');

  // Step 2: Select "Services" from the header menu
  await page.evaluate(() => {
    document.querySelector('[aria-label="Services"]').click();
  });

  // Step 3: Click the "Explore Our Client Work" link
  await page.evaluate(() => {
    document.querySelector('[href="/services/client-work"]').click();
  });

  // Step 4: Verify that the "Client Work" text is visible on the page
  await page.waitForURL('https://www.epam.com/services/client-work');
  const clientWorkText = await page.locator('text=Client Work');
  await expect(clientWorkText).toBeVisible();
});