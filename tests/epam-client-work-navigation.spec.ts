import { test, expect } from '@playwright/test';

/**
 * Test Scenario: Navigate to EPAM website, access Services page, and verify Client Work page
 * 
 * Steps:
 * 1. Navigate to https://www.epam.com/
 * 2. Navigate to the Services page
 * 3. Click the "Explore Our Client Work" link
 * 4. Verify that the "Client Work" text is visible on the page
 */

test.describe('EPAM Client Work Navigation', () => {
  test('should navigate to Client Work page from Services and verify page content', async ({ page }) => {
    // Step 1: Navigate to EPAM homepage
    await page.goto('https://www.epam.com/');
    
    // Wait for page to load
    await page.waitForLoadState('networkidle');
    
    // Step 2: Navigate to the Services page
    // Note: Direct navigation is used due to potential UI overlay issues
    await page.goto('https://www.epam.com/services');
    
    // Wait for Services page to load
    await page.waitForLoadState('networkidle');
    
    // Step 3: Click the "Explore Our Client Work" link
    const exploreClientWorkLink = page.getByRole('link', { name: 'Explore Our Client Work' });
    await exploreClientWorkLink.click();
    
    // Wait for navigation to complete
    await page.waitForLoadState('networkidle');
    
    // Step 4: Verify that the "Client Work" text is visible on the page
    // Check the page title
    await expect(page).toHaveTitle(/Client Work/);
    
    // Verify the heading contains "Client Work"
    const clientWorkHeading = page.getByRole('heading', { name: /Client Work/i, level: 1 });
    await expect(clientWorkHeading).toBeVisible();
    
    // Verify URL
    expect(page.url()).toBe('https://www.epam.com/services/client-work');
    
    // Additional verification: Check for case studies section
    const caseStudyElements = page.getByText('CASE STUDY');
    await expect(caseStudyElements.first()).toBeVisible();
  });
});
