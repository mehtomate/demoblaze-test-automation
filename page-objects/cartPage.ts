import { Page, Locator, expect } from '@playwright/test';
import { OrderDetails, defaultOrderData } from '../helpers/testData';

export class CartPage {
    readonly page: Page;
    readonly placeOrderButton: Locator;
    readonly totalPrice: Locator;
    readonly orderModalHeader: Locator;
    readonly nameField: Locator;
    readonly countryField: Locator;
    readonly cityField: Locator;
    readonly creditCardField: Locator;
    readonly monthField: Locator;
    readonly yearField: Locator;
    readonly purchaseButton: Locator;
    readonly confirmationHeading: Locator;
    readonly confirmationDetails: Locator;
    readonly confirmOkButton: Locator;

    constructor(page: Page) {
        this.page = page;
        // CART TABLE & ACTIONS
        this.placeOrderButton = page.getByRole('button', { name: 'Place Order' });
        this.totalPrice = page.locator('#totalp');
        // ORDER MODAL FIELDS
        this.orderModalHeader = page.locator('#orderModalLabel');
        this.nameField = page.locator('#name');
        this.countryField = page.locator('#country');
        this.cityField = page.locator('#city');
        this.creditCardField = page.locator('#card');
        this.monthField = page.locator('#month');
        this.yearField = page.locator('#year');
        this.purchaseButton = page.getByRole('button', { name: 'Purchase' });
        // CONFIRMATION POPUP
        this.confirmationHeading = page.getByRole('heading', { name: 'Thank you for your purchase!' });
        this.confirmationDetails = page.locator('.sweet-alert p');
        this.confirmOkButton = page.getByRole('button', { name: 'OK' });
    }

    verifyProductInCart = async (productName: string, expectedPrice?: string) => {
        await expect(this.page.getByRole('cell', { name: productName })).toBeVisible();
        if (expectedPrice) {
            const numericPrice = expectedPrice.replace('$', '');
            await expect(this.totalPrice).toHaveText(numericPrice);
        }
    };

    openOrderModal = async () => {
        await this.placeOrderButton.click();
        await expect(this.orderModalHeader).toBeVisible();
    };

    fillOrderForm = async (orderData: OrderDetails = {}) => {
        const data = { ...defaultOrderData, ...orderData };
        await this.nameField.fill(data.name);
        await this.countryField.fill(data.country);
        await this.cityField.fill(data.city);
        await this.creditCardField.fill(data.creditCard);
        await this.monthField.fill(data.month);
        await this.yearField.fill(data.year);
    };

    completePurchase = async (expectedPrice?: string, orderData: OrderDetails = {}) => {
        await this.openOrderModal();
        await this.fillOrderForm(orderData);
        await this.purchaseButton.click();
        await expect(this.confirmationHeading).toBeVisible();
        if (expectedPrice) {
            const numericPrice = expectedPrice.replace('$', '');
            await expect(this.confirmationDetails).toContainText(`${numericPrice} USD`);
        }
        await this.confirmOkButton.click();
        await expect(this.confirmationHeading).not.toBeVisible();
    };
}
