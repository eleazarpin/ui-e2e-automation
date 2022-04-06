Feature: Example test
    As a user
    I want to test if can login into the site

    Scenario: User login with correct credentials
        Given the user opens the url https://the-internet.herokuapp.com/login
        When  inputs valid username and password
        Then  the expects to access the application