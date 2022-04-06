class MainPage {
    /**
     * define selectors using getter methods
     */

    get allTabs () {
        return $$('[role="tab"]')
    }

    get allProductsCards () {
        return $$('[data-test-name="product-card"]')
    }

    get storeTab () {
        return this.allTabs[0];
    }

    get cartTab () {
        return this.allTabs[1];
    }

    get buttonLogout () {
        return this.allTabs[2];
    }

 
    async addToCart (product, quantity) {
        // TODO: To be implemented
    }

}

export default new MainPage();
