
import LoginPage from  '../../pageobjects/login.app.page';
import MainPage from '../../pageobjects/main.app.page';

describe('User Flow Tests', () => {
    before(async () => {
        await LoginPage.open();
        await LoginPage.login(process.env.USERNAME, process.env.PASSWORD);
    });

    beforeEach(async () => {
        // Refresh page for each test
        await browser.url('/');
    });

    it('Navigate among tabs', async () => {
        // TODO: implement test
    });

    it('Select minimum quantity of a product', async () => {
        // TODO: implement test
    });

    it('Login and logout from the application with an existing user', async () => {
        // TODO: implement test
    });

    it('Perform browser back action', async () => {
        // TODO: implement test
    });

    it('Empty cart button should go back to products tab', async () => {
        // TODO: implement test
    });
});


