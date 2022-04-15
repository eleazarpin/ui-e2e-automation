Feature: Remove products
    As an existing user I want remove one or more distinct products

    Scenario: User removes single product
        Given the user opens the demo e-commerce web application url
        When the user login into the application with existing credentials
        And adds to cart '<product>' with quantity <quantity>
        Then proceeds to remove the product

    Examples:
    |product|quantity|
    |Pens   |1       |
    |Stickers|1      |
    |Water Bottle|1 |

    Scenario: User removes more than one product
        Given the user opens the demo e-commerce web application url
        When the user login into the application with existing credentials
        And adds to cart 'Pens' with quantity 1
        And adds to cart 'Stickers' with quantity 2
        And adds to cart 'Water Bottle' with quantity 3
        Then proceeds to remove all the products
