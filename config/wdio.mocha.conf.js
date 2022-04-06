const baseConfig = require('./wdio.base.conf').config;


export const config = {
    ...baseConfig,
    specs: [
        './test/specs/ui/*.js'
    ],
    framework: 'mocha',
    // Options to be passed to Mocha.
    // See the full list at http://mochajs.org/
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    },
    reporters: [
        'spec',
        ['junit',
            {
                outputDir: 'reports/junit',
                outputFileFormat: (options) => `junit-${options.cid}.xml`,
                errorOptions: {
                    failure: 'message',
                    stacktrace: 'stack'
                }
            }
        ]
    ]
};
