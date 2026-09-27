import { test } from '../fixtures/test-extend';

test.describe('smoke tests', { tag: '@smoke' }, () => {
    test('user can access the store', async ({ landingPage, navBar }) => {
        await landingPage.navigateToLandingPage();
        await landingPage.verifyCategoriesAreVisible();
        await navBar.verifyNavigationBarIsVisible();
    });

    test('user can sign up, login and log out', async ({ landingPage, navBar, authModal }) => {
        await landingPage.navigateToLandingPage();
        await navBar.openSignUp();
        const { username, password } = await authModal.completeSignUp();
        await navBar.openLogin();
        await authModal.login(username, password);
        await navBar.verifyLoggedIn(username);
        await navBar.logOut();
        await navBar.verifyLoggedOut();
    });

    test('user can complete a purchase', async ({ landingPage, productPage, cartPage, navBar }) => {
        const product = 'Apple monitor';
        const price = '$400';

        await landingPage.navigateToLandingPage();
        await landingPage.filterAndVerifyCategories();
        await landingPage.selectProduct(product);

        await productPage.verifyProductDetails(product, price);
        await productPage.addProductToCart();

        await navBar.openCart();
        await cartPage.verifyProductInCart(product, price);
        await cartPage.completePurchase(price);
    });
});