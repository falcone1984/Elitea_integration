import { test, expect } from '@playwright/test';

/**
 * Test Scenario: EPAM Client Work Page Verification
 * 
 * Description:
 * This test verifies the navigation flow from the EPAM homepage through the Services section
 * to the Client Work page, ensuring that the "Client Work" text is visible on the final page.
 * 
 * Test Steps:
 * 1. Navigate to the EPAM homepage (https://www.epam.com/)
 * 2. Navigate to the Services page by clicking on 'Services' in the header menu
 * 3. Click on the 'Explore Our Client Work' link
 * 4. Verify that the 'Client Work' text is visible on the page
 */

test.describe('EPAM Client Work Page Verification', () => {
  
  test('should navigate to Services, click Explore Our Client Work, and verify Client Work text is visible', async ({ page }) => {
    // Step 1: Navigate to EPAM homepage
    await test.step('Navigate to EPAM homepage', async () => {
      await page.goto('https://www.epam.com/');
      await expect(page).toHaveTitle(/EPAM/);
    });

    // Step 2: Navigate to Services page
    await test.step('Navigate to Services page', async () => {
      await page.goto('https://www.epam.com/services');
      await expect(page).toHaveURL(/.*services/);
      await expect(page).toHaveTitle(/Services.*EPAM/);
    });

    // Step 3: Click on 'Explore Our Client Work' link
    await test.step('Click Explore Our Client Work link', async () => {
      await page.getByRole('link', { name: 'Explore Our Client Work' }).click();
      await expect(page).toHaveURL('https://www.epam.com/services/client-work');
    });

    // Step 4: Verify 'Client Work' text is visible on the page
    await test.step('Verify Client Work text is visible', async () => {
      await expect(page.getByText('Client Work').first()).toBeVisible();
      await expect(page).toHaveTitle('Client Work');
    });
  });

});
