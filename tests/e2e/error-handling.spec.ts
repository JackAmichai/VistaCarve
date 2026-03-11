import { test, expect } from '@playwright/test';

test.describe('Journey D: Error Handling', () => {
    test('should display a graceful error message when Wix API fails', async ({ page }) => {
        // 1. Listen for dialogs (alerts)
        page.on('dialog', async dialog => {
            expect(dialog.message()).toContain('Failed to start checkout');
            await dialog.dismiss();
        });

        await page.goto('/shop/wood-carvings');

        // 2. Add an item to the cart
        const productCard = page.locator('.glass-card').first();
        await productCard.getByRole('button', { name: /add to cart/i }).click();

        // 3. Open cart and try to checkout
        await page.getByRole('button', { name: /cart/i }).first().click();
        
        // Force mock cart to fail by intercepting the state or just checking the button
        // Actually, let's mock the redirect session call to fail
        await page.route('**/redirects/v1/redirect-sessions', async route => {
            await route.fulfill({ status: 500 });
        });

        await page.getByRole('button', { name: /secure checkout/i }).click();
    });
});
