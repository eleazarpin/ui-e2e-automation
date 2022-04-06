// const { expect } = require('chai');
import { Given, When, Then } from '@cucumber/cucumber'

import LoginPage from '../../../pageobjects/login.page';
import SecurePage from '../../../pageobjects/secure.page';


Given(/^the user opens the url (.*)$/, async (url) => {
  browser.deleteCookies();
  browser.url(url);
  // browser.waitUntil(
  //   () => LoginPage.emailField().isDisplayed(),
  //   undefined,
  //   errorMessages.LOGIN_EMAIL_FIELD
  // );
});

When(/^inputs valid username and password$/, async () => {
  await LoginPage.login('tomsmith', 'SuperSecretPassword!');
});

Then(/^the expects to access the application$/, async () => {
  await expect(SecurePage.flashAlert).toBeExisting();
  await expect(SecurePage.flashAlert).toHaveTextContaining(
    'You logged into a secure area!');
});
