import { test, expect } from '@playwright/test';

/**
 * Test Scenario: Verify EPAM Client Work Page Navigation
 * 
 * Description:
 * This test navigates through the EPAM website to verify the Client Work section
 * is accessible and displays correctly.
 * 
 * Steps:
 * 1. Navigate to https://www.epam.com/
 * 2. Navigate to Services page
 * 3. Click the "Explore Our Client Work" link
 * 4. Verify that the "Client Work" text is visible on the page
 */

test.describe('EPAM Client Work Navigation', () => {
  test('should navigate to Client Work page and verify content', async ({ page }) => {
    // Step 1: Navigate to EPAM homepage
    await test.step('Navigate to EPAM homepage', async () => {
      await page.goto('https://www.epam.com/');
      await expect(page).toHaveTitle(/EPAM/);
    });

    // Step 2: Navigate to Services page
    await test.step('Navigate to Services page', async () => {
      await page.goto('https://www.epam.com/services');
      await expect(page).toHaveTitle(/Services/);
    });

    // Step 3: Click the "Explore Our Client Work" link
    await test.step('Click "Explore Our Client Work" link', async () => {
      await page.getByRole('link', { name: 'Explore Our Client Work' }).click();
      await page.waitForLoadState('networkidle');
    });

    // Step 4: Verify that the "Client Work" text is visible on the page
    await test.step('Verify "Client Work" heading is visible', async () => {
      const clientWorkHeading = page.getByRole('heading', { name: 'Client Work', level: 1 });
      await expect(clientWorkHeading).toBeVisible();
      await expect(page).toHaveURL(/.*client-work/);
    });
  });
});
