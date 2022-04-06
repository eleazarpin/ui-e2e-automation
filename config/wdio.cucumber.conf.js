const baseConfig = require('./wdio.base.conf').config;
const path = require('path');
const reporter = require('multiple-cucumber-html-reporter');

exports.config = {
    ...baseConfig,
    specs: [
        './test/specs/e2e/**/*.feature'
    ],
    framework: 'cucumber',
    cucumberOpts: {
        require: [path.join(__dirname, '../test/**/*.steps.js')],
        backtrace: false,
        format: ['pretty'],
        failAmbiguousDefinitions: true,
        ignoreUndefinedDefinitions: false,
        snippets: true,
        scenarioLevelReporter: false,
        // <number> timeout for step definitions
        timeout: 20000,
    },
    reporters: [
        'spec',
        ['cucumberjs-json',
            {
                jsonFolder: 'reports/cucumber/json'
            }
        ]
    ],
    onComplete: async (exitCode, config) => {
        const options = {
            jsonDir: 'reports/cucumber/json',
            reportPath: 'reports/cucumber/html',
            pageTitle: 'Web Test Automation Results',
            reportName: 'Web Test Automation Results',
            pageFooter: '<div align="center"><p>Test Scenarios</p></div>'
        };

        reporter.generate(options);
    }
}
