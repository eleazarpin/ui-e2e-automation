const { expect } = require("chai");
import { Given, When, Then } from "@cucumber/cucumber";

import LoginPage from "../../../pageobjects/login.app.page";
import MainPage from "../../../pageobjects/main.app.page";

var newUser = { user: "", pass: "" };

Given(/^the user opens the demo e-commerce web application url$/, async () => {
  await LoginPage.open();
});

When(
  /^goes to register to enter new userName \'(.*)\' and new password \'(.*)\'$/,
  async (user, pass) => {
    await LoginPage.register(user, pass);
    newUser.user = user;
    newUser.pass = pass;
  }
);

When(/^login into the application$/, async () => {
  await LoginPage.login(newUser.user, newUser.pass);
});

Then(/^user lands in main page$/, async () => {
  await browser.waitUntil(async () => (await LoginPage.btnLogIn) == undefined, {
    timeout: 5000,
    timeoutMsg: "User could'n login",
  });
  const allProducts = await MainPage.allProductsCards;
  expect(allProducts.length > 0).to.equal(true, "Products isn't displayed");
  await MainPage.logout();
});

When(
  /^the user login into the application with existing credentials$/,
  async () => {
    await LoginPage.login(process.env.TEST_USERNAME, process.env.TEST_PASSWORD);
  }
);

When(/^adds to cart \'(.*)\' with quantity (.*)$/, async (product, quantity) => {
    // XPath selector. Anyway you can use MainPage.getProductElementByName method to continue using CSS selectors
    await MainPage.addToCart(
      $(
        `//h2[text()="ASAPP ${product}"]/ancestor::div[@data-test-name="product-card"]`
      ),
      quantity
    );
  }
);

Then(/^proceed to buy the item\/s$/, async () => {
  await MainPage.cartTab.click();
  await MainPage.waitForCartTab();
  await MainPage.btnBuy.click();
});

Then(/^sees a purchased succesfully dialog$/, async () => {
  await browser.waitUntil(
    async () => await MainPage.purchaseDialog.isDisplayed(),
    {
      timeout: 5000,
      timeoutMsg: "Purchase dialog isn't displayed",
    }
  );
  const dialogTitle = await MainPage.titleDialog.getText();
  expect(dialogTitle.trim()).to.equal(
    "Thank you!",
    "Purchase dialog title mismatch"
  );
  const dialogContent = await MainPage.contentDialog.getText();
  expect(dialogContent.trim()).to.equal(
    "We'll be sending you a link by e-mail to complete payment. We only accept DLacy Coins!!",
    "Purchase dialog content mismatch"
  );
  await MainPage.btnAwesome.click();
  const allProducts = await MainPage.allProductsCards;
  expect(allProducts.length > 0).to.equal(
    true,
    "There are no product in the main page"
  );
  await MainPage.logout();
});

Then(/^proceeds to remove (the product|all the products)$/, async (type) => {
  await MainPage.cartTab.click();
  await MainPage.waitForCartTab();
  await MainPage.removeProductsFromCart();
  await MainPage.btnBuy.click();
  const allProducts = await MainPage.allProductsCards;
  expect(allProducts.length > 0).to.equal(
    true,
    "Empty cart didn't went back to products tab"
  );
  await MainPage.logout();
});
