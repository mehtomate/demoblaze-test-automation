import { Page, Locator, expect } from '@playwright/test';

export class ProductPage {
    readonly page: Page;
    readonly productHeading: Locator;
    readonly productPrice: Locator;
    readonly addToCartButton: Locator;
    readonly msgProductAdded: string = 'Product added';

    constructor(page: Page) {
        this.page = page;
        this.productHeading = page.locator('#tbodyid h2');
        this.productPrice = page.locator('#tbodyid h3');
        this.addToCartButton = page.getByRole('link', { name: 'Add to cart' });
    }

    verifyProductDetails = async (expectedTitle: string, expectedPrice?: string) => {
        await expect(this.productHeading).toContainText(expectedTitle);
        if (expectedPrice) {
            await expect(this.productPrice).toContainText(expectedPrice);
        }
        await expect(this.addToCartButton).toBeVisible();
    };

    addProductToCart = async () => {
        const dialogPromise = this.page.waitForEvent('dialog');
        await this.addToCartButton.click();
        const dialog = await dialogPromise;
        expect(dialog.message()).toBe(this.msgProductAdded);
        await dialog.accept();
    };
}