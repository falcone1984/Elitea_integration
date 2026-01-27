import { test, expect } from '@playwright/test';

/**
 * Test Suite: EPAM Client Work Navigation
 * 
 * This test validates the navigation flow from EPAM homepage to Client Work page
 * through the Services section and verifies that the Client Work content is displayed.
 */
test.describe('EPAM Client Work Navigation', () => {
  test('should navigate through Services to Client Work page and verify content', async ({ page }) => {
    // Step 1: Navigate to EPAM homepage
    await test.step('Navigate to https://www.epam.com/', async () => {
      await page.goto('https://www.epam.com/');
      await expect(page).toHaveTitle(/EPAM/);
    });

    // Step 2: Navigate to Services page
    await test.step('Navigate to Services page', async () => {
      // Direct navigation to Services page for reliability
      await page.goto('https://www.epam.com/services');
      await expect(page).toHaveTitle(/Services/);
    });

    // Step 3: Click the "Explore Our Client Work" link
    await test.step('Click the "Explore Our Client Work" link', async () => {
      // Locate and click the "Explore Our Client Work" link
      const clientWorkLink = page.getByRole('link', { name: 'Explore Our Client Work' });
      await clientWorkLink.waitFor({ state: 'visible' });
      await clientWorkLink.click();
      
      // Wait for navigation to complete
      await page.waitForURL('**/services/client-work');
    });

    // Step 4: Verify that the "Client Work" text is visible on the page
    await test.step('Verify that the "Client Work" text is visible on the page', async () => {
      // Wait for the page to load
      await page.waitForLoadState('networkidle');
      
      // Verify page title
      await expect(page).toHaveTitle(/Client Work/);
      
      // Verify "Client Work" heading is visible on the page
      const clientWorkHeading = page.getByRole('heading', { name: /Client Work/i });
      await expect(clientWorkHeading).toBeVisible();
      
      // Additional verification: Check that "Client Work" text exists on the page
      const clientWorkText = page.getByText('Client Work').first();
      await expect(clientWorkText).toBeVisible();
    });
  });
});
