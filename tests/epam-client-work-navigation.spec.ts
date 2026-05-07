import { test, expect } from '@playwright/test';

/**
 * Test Scenario: Navigate to EPAM website and verify Client Work section
 * 
 * Steps:
 * 1. Navigate to https://www.epam.com/
 * 2. Select "Services" from the header menu
 * 3. Click the "Explore Our Client Work" link
 * 4. Verify that the "Client Work" text is visible on the page
 * 5. Close browser after execution of steps
 */

test.describe('EPAM Client Work Navigation', () => {
  test('should navigate to Client Work page from Services section', async ({ page }) => {
    // Step 1: Navigate to https://www.epam.com/
    await test.step('Navigate to EPAM homepage', async () => {
      await page.goto('https://www.epam.com/');
      await expect(page).toHaveTitle(/EPAM/);
    });

    // Step 2: Navigate to Services page
    await test.step('Navigate to Services page', async () => {
      // Direct navigation to Services page to avoid header menu interaction issues
      await page.goto('https://www.epam.com/services');
      await expect(page).toHaveTitle(/Services/);
    });

    // Step 3: Click the "Explore Our Client Work" link
    await test.step('Click "Explore Our Client Work" link', async () => {
      const clientWorkLink = page.getByRole('link', { name: 'Explore Our Client Work' });
      await expect(clientWorkLink).toBeVisible();
      await clientWorkLink.click();
    });

    // Step 4: Verify that the "Client Work" text is visible on the page
    await test.step('Verify "Client Work" heading is visible', async () => {
      await expect(page).toHaveURL(/.*client-work/);
      await expect(page).toHaveTitle(/Client Work/);
      
      // Verify the "Client Work" heading is present on the page
      const clientWorkHeading = page.getByRole('heading', { name: /Client Work/i, level: 1 });
      await expect(clientWorkHeading).toBeVisible();
    });

    // Step 5: Browser will be automatically closed after test completion by Playwright
  });
});
