import { Page, Locator, expect } from '@playwright/test';

export class LandingPage {
    readonly page: Page;
    readonly categoriesLink: Locator;
    readonly phoneCategoryLink: Locator;
    readonly monitorCategoryLink: Locator;
    readonly laptopCategoryLink: Locator;
    readonly samplePhone: Locator;
    readonly sampleLaptop: Locator;
    readonly sampleMonitor: Locator;

    constructor(page: Page) {
        this.page = page;
        // CATEGORIES
        this.categoriesLink = page.getByRole('link', { name: 'Categories' });
        this.phoneCategoryLink = page.getByRole('link', { name: 'Phones' });
        this.monitorCategoryLink = page.getByRole('link', { name: 'Monitors' });
        this.laptopCategoryLink = page.getByRole('link', { name: 'Laptops' });
        // SAMPLE PRODUCTS FOR CATEGORY VERIFICATION
        this.samplePhone = page.getByRole('link', { name: 'Samsung galaxy s6' });
        this.sampleLaptop = page.getByRole('link', { name: 'Sony vaio i5' });
        this.sampleMonitor = page.getByRole('link', { name: 'Apple monitor' });
    }

    navigateToLandingPage = async () => {
        await this.page.goto('/');
        await expect(this.categoriesLink).toBeVisible();
    };

    verifyCategoriesAreVisible = async () => {
        await expect(this.categoriesLink).toBeVisible();
        await expect(this.phoneCategoryLink).toBeVisible();
        await expect(this.monitorCategoryLink).toBeVisible();
        await expect(this.laptopCategoryLink).toBeVisible();
    };

    selectCategory = async (categoryName: 'Phones' | 'Laptops' | 'Monitors') => {
        await this.page.getByRole('link', { name: categoryName }).click();
    };

    getProductLocator = (productName: string): Locator => {
        return this.page.getByRole('link', { name: productName });
    };

    selectProduct = async (productName: string) => {
        await this.getProductLocator(productName).click();
    };

    filterAndVerifyCategories = async () => {
        await expect(this.samplePhone).toBeVisible();
        await this.selectCategory('Laptops');
        await expect(this.sampleLaptop).toBeVisible();
        await expect(this.samplePhone).not.toBeVisible();
        await this.selectCategory('Monitors');
        await expect(this.sampleMonitor).toBeVisible();
        await expect(this.sampleLaptop).not.toBeVisible();
    };
}