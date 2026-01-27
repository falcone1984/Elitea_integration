import { test, expect } from '@playwright/test';

test('Navigate to Client Work page and verify visibility', async ({ page }) => {
  // Step 1: Navigate to the Epam website
  await page.goto('https://www.epam.com/');

  // Step 2: Click on the "Services" from the header menu
  const servicesMenu = await page.locator('text=Services');
  await servicesMenu.click();

  // Step 3: Click the "Explore Our Client Work" link
  const clientWorkLink = await page.locator('text=Explore Our Client Work');
  await clientWorkLink.click();

  // Step 4: Verify that the "Client Work" text is visible
  const clientWorkHeader = await page.locator('text=Client Work');
  await expect(clientWorkHeader).toBeVisible();
});