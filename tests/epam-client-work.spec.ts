import { test, expect } from '@playwright/test';

test.describe('EPAM client work navigation', () => {
  test('navigate to Client Work and verify text', async ({ page }) => {
    // Navigate to EPAM homepage
    await page.goto('https://www.epam.com/');

    // Wait for header to be visible and click Services from the header menu
    const servicesMenu = page.locator('header').locator('text=Services');
    await expect(servicesMenu).toBeVisible({ timeout: 10000 });
    await servicesMenu.click();

    // Click the "Explore Our Client Work" link
    const exploreClientWork = page.locator('text=Explore Our Client Work');
    await expect(exploreClientWork).toBeVisible({ timeout: 10000 });
    await exploreClientWork.click();

    // Verify "Client Work" text is visible on the resulting page
    const clientWorkText = page.locator('text=Client Work');
    await expect(clientWorkText).toBeVisible({ timeout: 10000 });

    // Close browser handled by Playwright test runner
  });
});
