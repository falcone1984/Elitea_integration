import { test, expect } from '@playwright/test';

test.describe('EPAM Client Work Navigation', () => {
  test('should navigate to Client Work page and verify visibility', async ({ page }) => {
    // Navigate to EPAM homepage
    await page.goto('https://www.epam.com/');
    
    // Wait for page to load
    await page.waitForLoadState('networkidle');
    
    // Select "Services" from the header menu
    await page.getByRole('link', { name: 'Services' }).click();
    
    // Click the "Explore Our Client Work" link
    await page.getByRole('link', { name: 'Explore Our Client Work' }).click();
    
    // Wait for navigation to complete
    await page.waitForLoadState('networkidle');
    
    // Verify that the "Client Work" text is visible on the page
    await expect(page.getByText('Client Work')).toBeVisible();
  });
});
