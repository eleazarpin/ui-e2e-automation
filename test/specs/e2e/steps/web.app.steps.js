const { expect } = require('chai');
import { Given, When, Then } from '@cucumber/cucumber'

import LoginPage from '../../../pageobjects/login.app.page';
import MainPage from '../../../pageobjects/main.app.page';

var newUser = { user: '', pass: ''};


Given(/^the user opens the demo e-commerce web application url$/, async () => {
  await LoginPage.open();
});

When(/^goes to register to enter new userName \'(.*)\' and new password \'(.*)\'$/, async (user, pass) => {
  await LoginPage.register(user, pass);
  newUser.user = user;
  newUser.pass = pass;
});

When(/^login into the application$/, async () => {
  await LoginPage.login(newUser.user, newUser.pass);
});

Then(/^user lands in main page$/, async () => {
  await browser.waitUntil(
    async () => (await LoginPage.btnLogIn) == undefined, { timeout: 5000, timeoutMsg: "User could\'n login"}
  );
  const allProducts = await MainPage.allProductsCards;
  expect(allProducts.length > 0).to.equal(true, "Products isn\'t displayed")
});

When(/^the user login into the application with existing credentials$/, async () => {
  await LoginPage.login(process.env.USERNAME, process.env.PASSWORD);

});

When(/^adds to cart (.*) with quantity (.*)$/, async (product, quantity) => {
  await MainPage.addToCart(product, quantity);
});

Then(/^proceed to buy the item\/s$/, async () => {
  // TODO: implement step
});

Then(/^sees a purchased succesfully dialog$/, async () => {
  // TODO: implement step
});