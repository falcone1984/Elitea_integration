import { test, expect } from '@playwright/test';

test('Navigate to EPAM website and verify Client Work page', async ({ page }) => {
  // Navigate to the EPAM website
  await page.goto('https://www.epam.com/');

  // Click on "Services" from the header menu
  const servicesMenu = await page.locator('text=Services');
  await servicesMenu.click();

  // Click on "Explore Our Client Work" link
  const clientWorkLink = await page.locator('text=Explore Our Client Work');
  await clientWorkLink.click();

  // Verify that "Client Work" text is visible on the page
  const clientWorkText = await page.locator('text=Client Work');
  await expect(clientWorkText).toBeVisible();
});