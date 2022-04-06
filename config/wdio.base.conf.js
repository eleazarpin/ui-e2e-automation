require('dotenv').config();
const fs = require('fs');
const driverLogs = `logs/driver`;
const failureScreenshots = 'screenshots/failures'

export const config = {
    runner: 'local',
    maxInstances: parseInt(process.env.THREADS) || 1,
    capabilities: [{
        maxInstances: parseInt(process.env.THREADS) || 1,
        browserName: 'chrome',
        acceptInsecureCerts: true
    }],
    logLevel: 'warn',
    baseUrl: process.env.BASE_URL,
    //
    // Default timeout for all waitFor* commands.
    waitforTimeout: 10000,
    //
    // Default timeout in milliseconds for request
    // if browser driver or grid doesn't send response
    connectionRetryTimeout: 120000,
    //
    // Default request retries count
    connectionRetryCount: 3,
    services: [['chromedriver', {
        logFileName: 'wdio-chromedriver.log',
        outputDir: driverLogs
    }]],
    // =====
    // Hooks
    // =====
    onPrepare: async () => {
        try {
            // Success and failure directories (recursive creation)
            if (!fs.existsSync(failureScreenshots)) {
                fs.mkdirSync(failureScreenshots, { recursive: true });
            }
        } catch (error) {
            console.error(error);
        }
    },
    afterTest: async (test, context, { error, result, duration, passed, retries }) => {
        if (passed) {
            await browser.saveScreenshot(`${failureScreenshots}/${test.title}.png`);
        } else if (error != undefined) {
            if (error.actual || test.pending === false) {
                await browser.saveScreenshot(`${failureScreenshots}/${test.title}.png`);
            }
        }
    }
};
