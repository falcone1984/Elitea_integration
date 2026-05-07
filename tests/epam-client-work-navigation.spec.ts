import { test, expect } from '@playwright/test';

/**
 * Test Suite: EPAM Client Work Navigation
 * 
 * This test verifies the navigation flow from the EPAM homepage through the Services menu
 * to the Client Work page, ensuring that all key elements are accessible and visible.
 */

test.describe('EPAM Client Work Navigation', () => {
  test('should navigate to Client Work page via Services menu and verify page content', async ({ page }) => {
    // Step 1: Navigate to EPAM homepage
    await test.step('Navigate to EPAM homepage', async () => {
      await page.goto('https://www.epam.com/');
      await expect(page).toHaveTitle(/EPAM/);
    });

    // Step 2: Open the hamburger menu and click Services
    await test.step('Open hamburger menu and select Services', async () => {
      // Click the hamburger menu button to expand navigation
      await page.getByRole('button').first().click();
      
      // Wait for the menu to be visible
      await page.waitForSelector('navigation[aria-label="Main navigation"]', { state: 'visible' });
      
      // Click on Services link
      await page.getByRole('link', { name: 'Services', exact: true }).click();
      
      // Verify we're on the Services page
      await expect(page).toHaveURL(/\/services$/);
      await expect(page).toHaveTitle(/Services/);
    });

    // Step 3: Click 'Explore Our Client Work' link
    await test.step('Click on Explore Our Client Work link', async () => {
      // Click the 'Explore Our Client Work' link
      await page.getByRole('link', { name: 'Explore Our Client Work' }).click();
      
      // Verify we're on the Client Work page
      await expect(page).toHaveURL(/\/services\/client-work/);
      await expect(page).toHaveTitle(/Client Work/);
    });

    // Step 4: Verify 'Client Work' text is visible on the page
    await test.step('Verify Client Work heading is visible', async () => {
      // Verify the main heading contains 'Client Work'
      const heading = page.getByRole('heading', { name: /Client.*Work/i, level: 1 });
      await expect(heading).toBeVisible();
      
      // Additional verification: check for the presence of descriptive text
      await expect(page.locator('text=Forbes Global 2000')).toBeVisible();
    });
  });

  test('should verify complete page structure and key elements', async ({ page }) => {
    // Navigate directly to Client Work page for structure verification
    await page.goto('https://www.epam.com/services/client-work');
    
    // Verify page title
    await expect(page).toHaveTitle('Client Work');
    
    // Verify main heading
    const heading = page.getByRole('heading', { name: /Client.*Work/i, level: 1 });
    await expect(heading).toBeVisible();
    
    // Verify case studies section is present
    const caseStudyElements = page.locator('text=CASE STUDY');
    await expect(caseStudyElements.first()).toBeVisible();
    
    // Verify "Learn More" buttons are present
    const learnMoreButtons = page.getByRole('link', { name: 'Learn More' });
    await expect(learnMoreButtons.first()).toBeVisible();
    
    // Verify Contact Us section
    const contactSection = page.getByRole('link', { name: 'CONTACT US' });
    await expect(contactSection.first()).toBeVisible();
  });
});
