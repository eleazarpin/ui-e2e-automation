import LoginPage from '../pageobjects/login.app.page'
class MainPage {
  /**
   * define selectors using getter methods
   */

  get allTabs() {
    return $$('[role="tab"]');
  }

  get allProductsCards() {
    return $$('[data-test-name="product-card"]');
  }

  get storeTab() {
    return this.allTabs[0];
  }

  get quantityResult() {
    return $("ul[class*=ProductCard-list]");
  }

  get cartTab() {
    return this.allTabs[1];
  }

  get cartTable() {
    return $("body table");
  }

  get btnLogout() {
    return this.allTabs[2];
  }

  get allCancelItemButtons() {
    return $$("table button");
  }

  get btnBuy() {
    return $('[class="buy-button"] button');
  }

  get snackBarMessage() {
    return $("#snackbar-fab-message-id");
  }

  get snackBarMessage() {
    return $("#snackbar-fab-message-id");
  }

  get purchaseDialog() {
    return $('div[role="dialog"]');
  }

  get titleDialog() {
    return $('div[role="dialog"] [class="MuiDialogTitle-root"]');
  }

  get contentDialog() {
    return $('div[role="dialog"] [class="MuiDialogContent-root"]');
  }

  get btnAwesome() {
    return $('div[role="dialog"] button');
  }

  async waitForCartTab() {
    await browser.waitUntil(async () => await this.cartTable.isDisplayed(), {
      timeout: 5000,
      timeoutMsg: "Cart tab is not displayed after 5 seconds",
    });
  }

  async selectRandomProduct() {
    const allProducts = await this.allProductsCards;
    return allProducts[Math.floor(Math.random() * allProducts.length)];
  }

  async addToCart(product, quantity) {
    await product.$('[role="button"][aria-haspopup="listbox"]').click();
    await browser.waitUntil(
      async () => await this.quantityResult.isDisplayed(),
      {
        timeout: 5000,
        timeoutMsg: "Quantity result unorder list isn't displayed",
      }
    );
    await $(`li[data-value="${quantity}"]`).click();
    await product.$('button[data-test-name="add-to-cart-button"]').click();
  }

  async removeProductsFromCart() {
    const allCancelButtons = await this.allCancelItemButtons;
    for (let i = 0; i < allCancelButtons.length; i++) {
      await allCancelButtons[i].click();
    }
  }

  async getProductElementByName(name) {
    const products = await this.allProductsCards;
    return products.find(async (p) => (await p.getText()) == `ASAPP ${name}`);
  }

  async logout() {
    await this.btnLogout.click();
    await browser.waitUntil(
      async () => (await LoginPage.title.getText()) == "Please Login",
      {
        timeout: 5000,
        timeoutMsg: "After logout, login page isn't displated",
      }
    );
  }
}

export default new MainPage();
