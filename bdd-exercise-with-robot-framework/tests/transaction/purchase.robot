*** Settings ***
Library             Browser

Test Setup          New Context    tracing=True
Test Teardown       Close Context

*** Test Cases ***
Completing a purchase
    Given the user is on the checkout page
    When the user enters valid checkout information
    And the user completes the purchase
    Then a confirmation message should be displayed

*** Keywords ***
The user is on the checkout page
    New Page    https://saucedemo.com/
    Type Text    id=user-name    standard_user
    Type Text    id=password     secret_sauce
    Click    id=login-button
    Get Url    should end with    inventory.html
    Wait For Elements State    xpath=//div[@class='inventory_list']        visible    timeout=5s
    Click    xpath=//button[@data-test='add-to-cart-sauce-labs-backpack']
    #Wait For Elements State    xpath=//span[@class='shopping_cart_badge']        visible    timeout=5s
    Wait For Elements State    xpath=//span[@data-test='shopping-cart-badge']        visible    timeout=5s
    Click    xpath=//a[@data-test="shopping-cart-link"]
    Get Url    should end with    cart.html
    Wait For Elements State    xpath=//button[@data-test="checkout"]        visible    timeout=5s
    Click    xpath=//button[@data-test="checkout"]
    Get Url    should end with    checkout-step-one.html
    Wait For Elements State    xpath=//span[@data-test="title"]          visible    timeout=5s
    Get Text     xpath=//span[@data-test="title"]    ==     Checkout: Your Information

The user enters valid checkout information
    Get Url    should end with    checkout-step-one.html
    Type Text    id=first-name    Standard
    Type Text    id=last-name     User
    Type Text    id=postal-code     00100
    Click        id=continue
    Get Url    should end with    checkout-step-two.html
    Wait For Elements State    xpath=//span[@data-test="title"]          visible    timeout=5s
    Get Text     xpath=//span[@data-test="title"]    ==     Checkout: Overview

The user completes the purchase 
    Click        id=finish
    Get Url    should end with   checkout-complete.html
    Wait For Elements State    xpath=//span[@data-test="title"]          visible    timeout=5s
    
A confirmation message should be displayed
    Get Url    should end with    checkout-complete.html
    Wait For Elements State    xpath=//h2[@data-test="complete-header"]          visible    timeout=5s
    Get Text     xpath=//h2[@data-test="complete-header"]     ==     Thank you for your order!
    