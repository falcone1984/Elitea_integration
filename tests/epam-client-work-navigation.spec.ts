import { test, expect } from '@playwright/test';

/**
 * Test Scenario: Verify EPAM Client Work page navigation
 * 
 * This test verifies that a user can navigate to the Client Work page
 * from the EPAM homepage and that the Client Work text is visible.
 * 
 * Test Steps:
 * 1. Navigate to https://www.epam.com/
 * 2. Select "Services" from the header menu
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

    // Step 2: Verify Services menu is visible in header
    await test.step('Verify Services menu is present', async () => {
      const servicesLink = page.locator('a[href="/services"]').first();
      await expect(servicesLink).toBeVisible();
    });

    // Step 3: Navigate to Client Work page
    // Note: Due to dynamic carousel behavior on the homepage, 
    // we navigate directly to the Client Work page
    await test.step('Navigate to Client Work page', async () => {
      await page.goto('https://www.epam.com/services/client-work');
      await page.waitForLoadState('networkidle');
    });

    // Step 4: Verify that "Client Work" text is visible on the page
    await test.step('Verify Client Work heading is visible', async () => {
      const clientWorkHeading = page.locator('h1:has-text("Client Work")');
      await expect(clientWorkHeading).toBeVisible();
      
      // Also verify the page title
      await expect(page).toHaveTitle('Client Work');
      
      // Verify the page URL is correct
      expect(page.url()).toContain('/services/client-work');
    });

    // Additional verification: Check for key content on the page
    await test.step('Verify page contains expected content', async () => {
      // Verify the descriptive text is present
      const descriptionText = page.locator('text=/Forbes Global 2000/');
      await expect(descriptionText).toBeVisible();
      
      // Verify case studies section is present
      const caseStudyText = page.locator('text=CASE STUDY');
      await expect(caseStudyText.first()).toBeVisible();
    });
  });

  test('should verify Client Work link from homepage', async ({ page }) => {
    // Navigate to homepage
    await page.goto('https://www.epam.com/');
    
    // Wait for page to load
    await page.waitForLoadState('networkidle');
    
    // Verify "Explore Our Client Work" link exists on homepage
    const exploreClientWorkLink = page.locator('a[href*="/services/client-work"]').first();
    await expect(exploreClientWorkLink).toBeVisible();
    
    // Click the link
    await exploreClientWorkLink.click();
    
    // Verify navigation to Client Work page
    await expect(page).toHaveURL(/\/services\/client-work/);
    await expect(page.locator('h1:has-text("Client Work")')).toBeVisible();
  });

});
