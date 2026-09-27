import { Page, Locator, expect } from '@playwright/test';

export class NavBar {
    readonly page: Page;
    readonly storeLink: Locator;
    readonly contactLink: Locator;
    readonly aboutUsLink: Locator;
    readonly cartLink: Locator;
    readonly loginLink: Locator;
    readonly signUpLink: Locator;
    readonly logoutLink: Locator;
    readonly loginGreeting: Locator;

    constructor(page: Page) {
        this.page = page;
        this.storeLink = page.getByRole('link', { name: 'Product Store' });
        this.contactLink = page.getByRole('link', { name: 'Contact' });
        this.aboutUsLink = page.getByRole('link', { name: 'About us' });
        this.cartLink = page.getByRole('link', { name: 'Cart', exact: true });
        this.loginLink = page.getByRole('link', { name: 'Log in' });
        this.signUpLink = page.getByRole('link', { name: 'Sign up' });
        this.logoutLink = page.getByRole('link', { name: 'Log out' });
        this.loginGreeting = page.locator('#nameofuser');
    }

    verifyNavigationBarIsVisible = async () => {
        await expect(this.storeLink).toBeVisible();
        await expect(this.contactLink).toBeVisible();
        await expect(this.aboutUsLink).toBeVisible();
        await expect(this.cartLink).toBeVisible();
        await expect(this.loginLink).toBeVisible();
        await expect(this.signUpLink).toBeVisible();
    };

    openCart = async () => {
        await this.cartLink.click();
    };

    openLogin = async () => {
        await this.loginLink.click();
    };

    openSignUp = async () => {
        await this.signUpLink.click();
    };

    logOut = async () => {
        await this.logoutLink.click();
    };

    verifyLoggedIn = async (username: string) => {
        await expect(this.loginGreeting).toBeVisible();
        await expect(this.loginGreeting).toHaveText(`Welcome ${username}`);
    };

    verifyLoggedOut = async () => {
        await expect(this.loginGreeting).not.toBeVisible();
        await expect(this.loginLink).toBeVisible();
    };
}
