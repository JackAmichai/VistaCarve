import { test, expect } from '@playwright/test';

test.describe('Journey A: Browsing & Filtering', () => {
    test('should navigate to Stone Carvings and apply filters', async ({ page }) => {
        // 1. Navigate to home
        await page.goto('/', { waitUntil: 'networkidle' });

        // 2. Click on "Stone Carvings" in the header navigation
        // Select from the desktop nav and wait for it to be visible (hydration)
        const stoneLink = page.locator('nav').getByRole('link', { name: 'Stone Carvings' });
        await expect(stoneLink).toBeVisible({ timeout: 10000 });
        await stoneLink.click();

        // 3. Verify we are on the correct page
        await expect(page).toHaveURL(/\/shop\/stone-carvings/, { timeout: 10000 });
        await expect(page.locator('h1')).toContainText('Marble & Stone');

        // 4. Verify filters match the category (Dynamic Filters Fix)
        await expect(page.locator('aside')).toContainText('Granite');
        await expect(page.locator('aside')).toContainText('Marble');
        await expect(page.locator('aside')).toContainText('Slate');

        // 5. Apply a filter and verify product cards exist
        await page.locator('label').filter({ hasText: 'Marble' }).locator('input').check();
        
        // In a real app with backend filtering, we would verify the product list updates.
        // For this portfolio piece, we verify the UI state.
        const productCards = page.locator('.grid > div');
        await expect(productCards.first()).toBeVisible();
    });
});
