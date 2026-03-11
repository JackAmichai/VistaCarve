import { test, expect } from '@playwright/test';

test.describe('Journey C: B2B Integration Flow', () => {
    test('should submit a B2B provisioning request and handle mocked response', async ({ page }) => {
        await page.goto('/websites/create');

        // Step 1: Click "Online Store"
        await page.getByRole('button', { name: /online store/i }).click();
        await page.getByRole('button', { name: /continue/i }).click();

        // Step 2: Fill business name
        await page.getByPlaceholder(/john's custom woodworks/i).fill('Test Business');

        // 2. Mock the Wix Site Management API
        await page.route('https://www.wixapis.com/site-management/v1/sites', async route => {
            const json = {
                site: {
                    id: 'mock-site-123',
                    displayName: 'Test Business'
                }
            };
            await route.fulfill({ json });
        });

        // Submit form
        await page.getByRole('button', { name: /generate my site/i }).click();

        // 4. Verify success UI
        await expect(page.getByText(/site created successfully/i)).toBeVisible();
        await expect(page.getByRole('link', { name: /view dashboard/i })).toHaveAttribute('href', /.*mock-site-123/);
    });
});
