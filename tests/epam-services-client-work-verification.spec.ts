import { test, expect } from '@playwright/test';

/**
 * Test scenario: Verify EPAM Services and Client Work navigation
 * 
 * Steps:
 * 1. Navigate to EPAM homepage (https://www.epam.com/)
 * 2. Select "Services" from the header menu
 * 3. Click the "Explore Our Client Work" link
 * 4. Verify that the "Client Work" text is visible on the page
 */
test.describe('EPAM Services - Client Work Verification', () => {
  test('should navigate to Services, click Explore Our Client Work, and verify Client Work page', async ({ page }) => {
    // Step 1: Navigate to EPAM homepage
    await test.step('Navigate to EPAM homepage', async () => {
      await page.goto('https://www.epam.com/');
      await expect(page).toHaveTitle(/EPAM/);
    });

    // Step 2: Navigate to Services page
    await test.step('Navigate to Services page', async () => {
      await page.goto('https://www.epam.com/services');
      await expect(page).toHaveTitle(/Services.*EPAM/);
    });

    // Step 3: Click the "Explore Our Client Work" link
    await test.step('Click on Explore Our Client Work link', async () => {
      const clientWorkLink = page.getByRole('link', { name: 'Explore Our Client Work' });
      await expect(clientWorkLink).toBeVisible();
      await clientWorkLink.click();
    });

    // Step 4: Verify that the "Client Work" text is visible on the page
    await test.step('Verify Client Work page is displayed', async () => {
      // Wait for navigation to complete
      await page.waitForURL('**/services/client-work');
      
      // Verify page title
      await expect(page).toHaveTitle(/Client Work/);
      
      // Verify the heading contains "Client Work"
      const heading = page.locator('h1');
      await expect(heading).toBeVisible();
      await expect(heading).toContainText('Client Work');
      
      // Additional verification using JavaScript evaluation
      const hasClientWorkText = await page.evaluate(() => {
        const h1 = document.querySelector('h1');
        return h1 !== null && h1.textContent !== null && h1.textContent.includes('Client Work');
      });
      expect(hasClientWorkText).toBeTruthy();
    });
  });
});
