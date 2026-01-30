import { test, expect } from '@playwright/test';

/**
 * Test Scenario: Navigate to EPAM website, select Services, 
 * click Explore Our Client Work, and verify Client Work page
 * 
 * Steps:
 * 1. Navigate to https://www.epam.com/
 * 2. Select "Services" from the header menu
 * 3. Click the "Explore Our Client Work" link
 * 4. Verify that the "Client Work" text is visible on the page
 */

test.describe('EPAM Client Work Navigation', () => {
  test('should navigate to EPAM website, access Services, and verify Client Work page', async ({ page }) => {
    // Step 1: Navigate to https://www.epam.com/
    await test.step('Navigate to EPAM homepage', async () => {
      await page.goto('https://www.epam.com/');
      await expect(page).toHaveTitle(/EPAM/);
    });

    // Step 2: Select "Services" from the header menu (hover to reveal submenu)
    await test.step('Hover over Services menu to reveal submenu', async () => {
      const servicesButton = page.locator('button[aria-label="Services"]').first();
      await servicesButton.hover();
      
      // Wait for submenu to appear
      await page.waitForSelector('a[href="/services/client-work"]', { state: 'visible' });
    });

    // Step 3: Click the "Explore Our Client Work" link or navigate directly to Client Work
    await test.step('Navigate to Client Work page', async () => {
      // Option 1: Click on "Client Work" from the Services submenu
      const clientWorkLink = page.locator('a[href="/services/client-work"]').first();
      await clientWorkLink.click();
      
      // Wait for navigation to complete
      await page.waitForURL('**/services/client-work');
    });

    // Step 4: Verify that the "Client Work" text is visible on the page
    await test.step('Verify Client Work heading is visible', async () => {
      // Check page title
      await expect(page).toHaveTitle('Client Work');
      
      // Verify the "Client Work" heading is visible
      const clientWorkHeading = page.locator('h1:has-text("Client Work")');
      await expect(clientWorkHeading).toBeVisible();
      
      // Additional verification: Check URL
      expect(page.url()).toContain('/services/client-work');
    });
  });

  test('alternative: should navigate directly using "Explore Our Client Work" link from homepage', async ({ page }) => {
    // Step 1: Navigate to https://www.epam.com/
    await test.step('Navigate to EPAM homepage', async () => {
      await page.goto('https://www.epam.com/');
      await expect(page).toHaveTitle(/EPAM/);
    });

    // Step 2-3: Find and click the "Explore Our Client Work" link on homepage
    await test.step('Click Explore Our Client Work link from carousel', async () => {
      // Wait for the carousel to be visible
      await page.waitForSelector('a[href*="/services/client-work"]', { timeout: 10000 });
      
      // Look for the "Explore Our Client Work" link text
      const exploreLink = page.locator('a:has-text("Explore Our Client Work")').first();
      
      // Scroll to the element to ensure it's in view
      await exploreLink.scrollIntoViewIfNeeded();
      
      // Wait a bit for carousel animations to settle
      await page.waitForTimeout(1000);
      
      // Click the link
      await exploreLink.click();
      
      // Wait for navigation
      await page.waitForURL('**/services/client-work');
    });

    // Step 4: Verify that the "Client Work" text is visible on the page
    await test.step('Verify Client Work page content', async () => {
      // Check page title
      await expect(page).toHaveTitle('Client Work');
      
      // Verify the "Client Work" heading is visible
      const clientWorkHeading = page.locator('h1:has-text("Client Work")');
      await expect(clientWorkHeading).toBeVisible();
      
      // Verify page content
      await expect(page.locator('text=Forbes Global 2000')).toBeVisible();
      
      // Additional verification: Check URL
      expect(page.url()).toContain('/services/client-work');
    });
  });
});
