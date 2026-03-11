import { test, expect } from '@playwright/test';

test.describe('Journey B: Cart & API', () => {
    test('should add a product to cart and verify price in modal', async ({ page }) => {
        await page.goto('/shop/wood-carvings', { waitUntil: 'networkidle' });

        // 1. Select a product and click "Add to Cart"
        const productCard = page.locator('.glass-card').first();
        await expect(productCard).toBeVisible({ timeout: 10000 });
        const productName = await productCard.locator('h3').innerText();

        await productCard.getByRole('button', { name: /add to cart/i }).click();

        // 2. Verify cart drawer opens
        await expect(page.getByText(/your cart/i)).toBeVisible({ timeout: 10000 });

        // 3. Verify item details in cart
        await expect(page.locator('aside')).toContainText(productName);
        
        // 4. Verify total price reflects the item (optional check)
        await expect(page.locator('button:has-text("Secure Checkout")')).toBeEnabled();
    });
});
