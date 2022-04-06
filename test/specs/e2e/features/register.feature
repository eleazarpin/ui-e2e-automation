Feature: Register new user
    As a new user I want be registered in the e-commerce web application

    Scenario: User is registered
        Given the user opens the demo e-commerce web application url
        When  goes to register to enter new userName 'regularUser' and new password 'h3ll0!'
        And login into the application
        Then user lands in main page
