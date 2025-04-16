*** Settings ***
Library             Browser

Test Setup          New Context    tracing=True
Test Teardown       Close Context

*** Test cases ***
Adding an item to the cart
    Given the user is on the products page
    When the user adds a product to the cart
    Then the product should be added to the cart
    
Seeing the correct number of items in the cart
    Given the user is on the products page
    When the user adds multiple products to the cart
    Then the cart icon should show the correct item count

Removing an item from the cart
    Given the user has an item in the cart
    When the user removes the item from the cart
    Then the cart should be empty

Proceeding to checkout
    Given the user has items in the cart
    When the user clicks the checkout button
    Then the checkout page should be displayed

*** Keywords ***
The user is on the products page
    New Page    https://saucedemo.com/
    Type Text    id=user-name    standard_user
    Type Text    id=password     secret_sauce
    Click    id=login-button
    Get Url    should end with    inventory.html
    Wait For Elements State    xpath=//div[@class='inventory_list']        visible    timeout=5s

The user adds a product to the cart
    Click    xpath=//button[@data-test='add-to-cart-sauce-labs-backpack']
    Wait For Elements State    xpath=//span[@class='shopping_cart_badge']        visible    timeout=5s

The product should be added to the cart
    Wait For Elements State    xpath=//span[@data-test='shopping-cart-badge']        visible    timeout=5s

The user adds multiple products to the cart
    Click    xpath=//button[@data-test='add-to-cart-sauce-labs-backpack']
    Click    xpath=//button[@data-test='add-to-cart-sauce-labs-bike-light']
    Wait For Elements State    xpath=//span[@class='shopping_cart_badge']        visible    timeout=5s

The cart icon should show the correct item count
    Get Text     xpath=//span[@class='shopping_cart_badge']    ==     2
    Wait For Elements State    xpath=//span[@class='shopping_cart_badge']        visible    timeout=5s

The user has an item in the cart
    The user is on the products page
    Click    xpath=//button[@data-test='add-to-cart-sauce-labs-backpack']
    Wait For Elements State    xpath=//span[@class='shopping_cart_badge']        visible    timeout=5s

The user removes the item from the cart
    Click    xpath=//button[@data-test='remove-sauce-labs-backpack']

The cart should be empty
    Wait For Elements State    xpath=//span[@class='shopping_cart_badge']        hidden    timeout=5s

The user has items in the cart
    The user is on the products page
    The user adds multiple products to the cart
    The cart icon should show the correct item count

The user clicks the checkout button
    Click    xpath=//a[@data-test="shopping-cart-link"]
    Get Url    should end with    cart.html
    Wait For Elements State    xpath=//button[@data-test="checkout"]        visible    timeout=5s
    Click    xpath=//button[@data-test="checkout"] 

The checkout page should be displayed
    Get Url    should end with    checkout-step-one.html
    Wait For Elements State    xpath=//span[@data-test="title"]          visible    timeout=5s
    Get Text     xpath=//span[@data-test="title"]    ==     Checkout: Your Information
