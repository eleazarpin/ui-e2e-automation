

import Page from './page';

/**
 * sub page containing specific selectors and methods for a specific page
 */
class LoginPage extends Page {
    /**
     * define selectors using getter methods
     */

    get inputUsername () {
        return $('#username');
    }

    get inputPassword () {
        return $('#password');
    }

    get allButtons () {
        return $$('header > [class*="MuiPaper-root"] button')
    }

    get btnLogIn () {
        return this.allButtons[1];
    }

    get btnRegister() {
        return this.allButtons[2];
    }

    get inputDialogUsername () {
        return $('#register-username');
    }

    get inputDialogPassword () {
        return $('#register-password');
    }

    get btnDialogRegister() {
        return $('div[role=dialog] button')
    }

    /**
     * a method to encapsule automation code to interact with the page
     * e.g. to login using username and password
     */
    async login (username, password) {
        await browser.waitUntil(
            async () => await this.btnLogIn.isDisplayed(), { timeout: 5000, timeoutMsg: 'Login button not displayed after 5 seconds'}
        );
        await this.inputUsername.setValue(username);
        await this.inputPassword.setValue(password);
        await this.btnLogIn.click();
    }

    async register (username, password) {
        await browser.waitUntil(
            async () => await this.btnRegister.isDisplayed(), { timeout: 5000, timeoutMsg: 'Register button not displayed after 5 seconds'}
        );
        await this.btnRegister.click();
        await browser.waitUntil(
            async () => await this.inputDialogUsername.isDisplayed(), { timeout: 5000, timeoutMsg: 'Register button not displayed after 5 seconds'}
        );
        await this.inputDialogUsername.setValue(username);
        await this.inputDialogPassword.setValue(password);
        await this.btnDialogRegister.click();
    }

    async waitForPageToLoad () {
        await browser.waitUntil(
            async () => await this.btnLogIn.isDisplayed(), { timeout: 5000, timeoutMsg: 'Login button not displayed after 5 seconds'}
        );
        await browser.waitUntil(
            async () => await this.btnRegister.isDisplayed(), { timeout: 5000, timeoutMsg: 'Register button not displayed after 5 seconds'}
        );
    }

    /**
     * overwrite specific options to adapt it to page object
     */
    async open () {
        await super.open();
    }
}

export default new LoginPage();
