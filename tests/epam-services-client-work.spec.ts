import { test, expect } from '@playwright/test';

/**
 * Test Suite: EPAM Services - Client Work Navigation
 *
 * Scenario:
 *  1. Navigate to https://www.epam.com/
 *  2. Select "Services" from the header menu
 *  3. Click the "Explore Our Client Work" link
 *  4. Verify that the "Client Work" text is visible on the page
 */
test.describe('EPAM Services - Client Work Navigation', () => {
  test.beforeEach(async ({ page }) => {
    // Accept cookies and navigate to the homepage
    await page.goto('https://www.epam.com/', { waitUntil: 'domcontentloaded' });

    // Accept cookie banner if present
    const acceptButton = page.getByRole('button', { name: 'Accept All' });
    if (await acceptButton.isVisible({ timeout: 5000 }).catch(() => false)) {
      await acceptButton.click();
    }
  });

  test('should navigate to Client Work page via Services menu', async ({ page }) => {
    // Step 1: Verify homepage loaded
    await expect(page).toHaveURL('https://www.epam.com/');

    // Step 2: Select "Services" from the header menu
    // Use JavaScript click to avoid overlay/animation interference
    await page.evaluate(() => {
      const link = document.querySelector<HTMLAnchorElement>('a[href="/services"]');
      if (link) link.click();
    });

    // Wait for Services page to load
    await page.waitForURL('**/services', { waitUntil: 'domcontentloaded' });
    await expect(page).toHaveURL(/\/services$/);

    // Step 3: Click the "Explore Our Client Work" link
    const exploreLink = page.getByRole('link', { name: 'Explore Our Client Work' });
    await expect(exploreLink).toBeVisible();
    await exploreLink.click();

    // Wait for Client Work page to load
    await page.waitForURL('**/services/client-work', { waitUntil: 'domcontentloaded' });

    // Step 4: Verify "Client Work" text is visible on the page
    await expect(page).toHaveTitle(/Client Work/i);

    const clientWorkHeading = page.getByRole('heading', { name: /Client Work/i }).first();
    await expect(clientWorkHeading).toBeVisible();

    // Additional assertion: verify text exists in the page body
    await expect(page.locator('body')).toContainText('Client Work');
  });
});
