import { test, expect } from '@playwright/test';

/**
 * Test Scenario: EPAM Client Work Navigation
 * 
 * This test verifies that a user can navigate through the EPAM website
 * from the home page to the Services section and then to the Client Work page.
 * 
 * Steps:
 * 1. Navigate to https://www.epam.com/
 * 2. Select "Services" from the header menu
 * 3. Click the "Explore Our Client Work" link
 * 4. Verify that the "Client Work" text is visible on the page
 */

test.describe('EPAM Client Work Navigation', () => {
  
  test('should navigate to Client Work page and verify content', async ({ page }) => {
    // Step 1: Navigate to https://www.epam.com/
    await test.step('Navigate to EPAM home page', async () => {
      await page.goto('https://www.epam.com/');
      await expect(page).toHaveTitle(/EPAM/);
    });

    // Step 2: Navigate to Services page
    await test.step('Navigate to Services page', async () => {
      // Navigate directly to the Services page
      await page.goto('https://www.epam.com/services');
      await expect(page).toHaveURL(/.*services/);
    });

    // Step 3: Click the "Explore Our Client Work" link
    await test.step('Click on Explore Our Client Work link', async () => {
      const clientWorkLink = page.getByRole('link', { name: 'Explore Our Client Work' });
      await clientWorkLink.waitFor({ state: 'visible' });
      await clientWorkLink.click();
      
      // Wait for navigation to complete
      await page.waitForURL('**/services/client-work');
    });

    // Step 4: Verify that the "Client Work" text is visible on the page
    await test.step('Verify Client Work heading is visible', async () => {
      // Verify the page title
      await expect(page).toHaveTitle('Client Work');
      
      // Verify the main heading contains "Client Work"
      const heading = page.locator('h1');
      await expect(heading).toBeVisible();
      await expect(heading).toContainText('Client Work');
      
      // Additional verification: check that we're on the correct URL
      await expect(page).toHaveURL('https://www.epam.com/services/client-work');
    });
  });

  test('should navigate using header menu Services link', async ({ page }) => {
    // Alternative approach: Testing with direct header menu interaction
    await test.step('Navigate to EPAM home page', async () => {
      await page.goto('https://www.epam.com/');
      await expect(page).toHaveTitle(/EPAM/);
    });

    await test.step('Click Services in header menu', async () => {
      // Scroll to top to ensure header is visible
      await page.evaluate(() => window.scrollTo(0, 0));
      
      // Wait for the Services link to be available
      const servicesLink = page.locator('a[href="/services"]').first();
      await servicesLink.waitFor({ state: 'visible', timeout: 10000 });
      
      // Click on Services link
      await servicesLink.click({ force: true });
      
      // Wait for navigation
      await page.waitForURL('**/services', { timeout: 10000 });
    });

    await test.step('Click Explore Our Client Work from Services page', async () => {
      const clientWorkLink = page.getByRole('link', { name: 'Explore Our Client Work' }).first();
      await clientWorkLink.waitFor({ state: 'visible' });
      await clientWorkLink.click();
      
      await page.waitForURL('**/services/client-work');
    });

    await test.step('Verify Client Work page is loaded', async () => {
      const heading = page.locator('h1');
      await expect(heading).toContainText('Client Work');
    });
  });
});
