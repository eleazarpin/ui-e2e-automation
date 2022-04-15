const { expect } = require("chai");

import LoginPage from "../../pageobjects/login.app.page";
import MainPage from "../../pageobjects/main.app.page";

describe("User Flow Tests", () => {
  before(async () => {
    await LoginPage.open();
    await LoginPage.login(process.env.TEST_USERNAME, process.env.TEST_PASSWORD);
    await browser.waitUntil(
      async () => (await LoginPage.btnLogIn) == undefined,
      { timeout: 5000, timeoutMsg: "User could'n login" }
    );
  });

  beforeEach(async () => {
    // Refresh page for each test
    await browser.url("/");
  });

  it("Navigate among tabs", async () => {
    await MainPage.cartTab.click();
    await MainPage.waitForCartTab();
    await MainPage.storeTab.click();
    const allProducts = await MainPage.allProductsCards;
    expect(allProducts.length > 0).to.equal(true, "Products isn't displayed");
  });

  it("Select minimum quantity of a product", async () => {
    const product = await MainPage.selectRandomProduct();
    await MainPage.addToCart(product, 1);
    const message = await MainPage.snackBarMessage.getText();
    expect(message.trim()).to.equal(
      "Product Added to Cart",
      "Product hasn't been added correctly to the cart"
    );
  });

  it("Perform browser back action", async () => {
    await browser.back();
    const domPageSource = await browser.getPageSource();
    expect(
      domPageSource.includes("Please Login") || domPageSource.includes("ASAPP")
    ).to.equal(true, "Browser back action doesn't work as expected");
  });

  it("Empty cart button should go back to products tab", async () => {
    await MainPage.cartTab.click();
    await MainPage.waitForCartTab();
    await MainPage.removeProductsFromCart();
    await MainPage.btnBuy.click();
    const allProducts = await MainPage.allProductsCards;
    expect(allProducts.length > 0).to.equal(
      true,
      "Empty cart didn't went back to products tab"
    );
  });

  it("Login and logout from the application with an existing user", async () => {
    await MainPage.btnLogout.click();
    const loginTitle = await LoginPage.title.getText();
    expect(loginTitle.trim()).to.equal(
      "Please Login",
      "User didn't login into the application"
    );
  });
});
