import { test, expect } from '@playwright/test';

test('Navigate to EPAM website and verify Client Work text', async ({ page }) => {
  // Navigate to https://www.epam.com/
  await page.goto('https://www.epam.com/');

  // Select "Services" from the header menu
  const servicesMenu = await page.locator('text=Services');
  await servicesMenu.click();

  // Click the "Explore Our Client Work" link
  const exploreClientWorkLink = await page.locator('text=Explore Our Client Work');
  await exploreClientWorkLink.click();

  // Verify that the "Client Work" text is visible on the page
  const clientWorkText = await page.locator('text=Client Work');
  await expect(clientWorkText).toBeVisible();
});