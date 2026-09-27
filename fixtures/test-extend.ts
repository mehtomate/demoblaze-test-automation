import { test as base } from '@playwright/test';
import { LandingPage } from '../page-objects/landingPage';
import { ProductPage } from '../page-objects/productPage';
import { CartPage } from '../page-objects/cartPage';
import { NavBar } from '../page-objects/navBar';
import { AuthenticationModal } from '../page-objects/authenticationModal';

export const test = base.extend<{
    landingPage: LandingPage;
    productPage: ProductPage;
    cartPage: CartPage;
    navBar: NavBar;
    authModal: AuthenticationModal;
}>({
    landingPage: async ({ page }, use) => {
        await use(new LandingPage(page));
    },
    productPage: async ({ page }, use) => {
        await use(new ProductPage(page));
    },
    cartPage: async ({ page }, use) => {
        await use(new CartPage(page));
    },
    navBar: async ({ page }, use) => {
        await use(new NavBar(page));
    },
    authModal: async ({ page }, use) => {
        await use(new AuthenticationModal(page));
    },
});