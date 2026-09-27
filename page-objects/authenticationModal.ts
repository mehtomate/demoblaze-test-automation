import { Page, Locator, expect } from '@playwright/test';
import { getRandomNumber } from '../helpers/dataFunctions';
import { defaultUserPassword } from '../helpers/testData';

export class AuthenticationModal {
    readonly page: Page;
    readonly signUpDialogHeader: Locator;
    readonly signUpUsernameField: Locator;
    readonly signUpPasswordField: Locator;
    readonly signUpButton: Locator;
    readonly loginDialogHeader: Locator;
    readonly loginUsernameField: Locator;
    readonly loginPasswordField: Locator;
    readonly loginButton: Locator;
    readonly msgSignUpSuccess: string = 'Sign up successful.';

    constructor(page: Page) {
        this.page = page;
        // SIGN UP MODAL
        this.signUpDialogHeader = page.locator('#signInModalLabel');
        this.signUpUsernameField = page.locator('#sign-username');
        this.signUpPasswordField = page.locator('#sign-password');
        this.signUpButton = page.getByRole('button', { name: 'Sign up' });
        // LOGIN MODAL
        this.loginDialogHeader = page.locator('#logInModalLabel');
        this.loginUsernameField = page.locator('#loginusername');
        this.loginPasswordField = page.locator('#loginpassword');
        this.loginButton = page.getByRole('button', { name: 'Log in' });
    }

    completeSignUp = async (
        username: string = `test_${getRandomNumber()}`,
        password: string = defaultUserPassword
    ) => {
        await expect(this.signUpDialogHeader).toBeVisible();
        await this.signUpUsernameField.fill(username);
        await this.signUpPasswordField.fill(password);

        const dialogPromise = this.page.waitForEvent('dialog');
        await this.signUpButton.click();
        const dialog = await dialogPromise;

        expect(dialog.message()).toBe(this.msgSignUpSuccess);
        await dialog.accept();
        return { username, password };
    };

    login = async (username: string, password: string = defaultUserPassword) => {
        await expect(this.loginDialogHeader).toBeVisible();
        await this.loginUsernameField.fill(username);
        await this.loginPasswordField.fill(password);
        await this.loginButton.click();
    };
}

