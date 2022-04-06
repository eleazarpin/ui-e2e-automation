@skip() @to-be-implemented
Feature: Buy products
    As an existing user I want buy one or more distinct products

    Scenario: User buys single product
        Given the user opens the demo e-commerce web application url
        When the user login into the application with existing credentials
        And adds to cart <product> with quantity <quantity>
        Then proceed to buy the item/s
        And sees a purchased succesfully dialog

    Examples:
    |product|quantity|
    |Pens   |5       |
    |Stickers|15     |
    |Watter Bottle|25|

    Scenario: User buys more than one product
        Given the user opens the demo e-commerce web application url
        When the user login into the application with existing credentials
        And adds to cart 'Pens' with quantity 1
        And adds to cart 'Stickers' with quantity 2
        And adds to cart 'Watter Bottle' with quantity 3
        Then proceed to buy the item/s
        And sees a purchased succesfully dialog
