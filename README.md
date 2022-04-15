# Web Tests Automation Framework

## Table of Contents
1. [How the framework works](#framework)
2. [How to run tests locally](#locally)
4. [Environment Variables](#envvars)
5. [Test Results Report](#report)

<a name="framework"></a>
## How the framework works

It implements:
* [Cucumber](https://www.npmjs.com/package/@wdio/cucumber-framework) and [Mocha](https://www.npmjs.com/package/@wdio/mocha-framework) as testing frameworks.
* The [Page Object](https://martinfowler.com/bliki/PageObject.html) design pattern.
* [ChaiJS](https://www.chaijs.com/) as the assertion library.

<a name="locally"></a>
## How to run tests locally
Follow these steps:
1. Install NPM dependencies
```bash
npm install
```
2. Define environment variables in your local machine or the `.env` file
3. Run:
    0. Pre-condition data:
    ```bash
    npm run pre-condition-data
    ```
    1. UI tests
    ```bash
    npm run ui.tests
    ```
    2. E2E scenario based tests
    ```bash
    npm run e2e.scenarios.tests
    ```

<a name="envvars"></a>
## Environment Variables

* `BASE_URL`: the URL of the environment under test.
* `USERNAME`: username used to test the instance.
* `PASSWORD`: username's password.
* (optional) `THREADS`: number of tests that will run in parallel.

<a name="report"></a>
## Test Results Report
Once tests are completed open:
* `./reports/junit/junit-0-0.xml` to get the ui test xml results report
* `./reports/cucumber/html/index.html` to get the E2E scenario based tests results report