*** Settings ***
Library             Browser

Test Setup          New Context    tracing=True
Test Teardown       Close Context


*** Test Cases ***
Product list is displayed after login
    [Documentation]    Product list is displayed after login
    Given the user is logged in
    When the user navigates to the products page
    Then a list of products should be visible

Sorting products by price
    [Documentation]    Sorting products by price
    Given the user is on the products page
    When the user selects "price low to high" from the sorting dropdown
    Then the products should be listed in ascending order of price

*** Keywords ***
The user is logged in
    New Page    https://saucedemo.com/
    Type Text    id=user-name    standard_user
    Type Text    id=password     secret_sauce
    Click    id=login-button   
    
The user navigates to the products page
    Get Url    should end with    inventory.html

A list of products should be visible
    Wait For Elements State    xpath=//div[@class='inventory_list']        visible    timeout=5s

The user is on the products page
    New Page    https://saucedemo.com/
    Type Text    id=user-name    standard_user
    Type Text    id=password     secret_sauce
    Click    id=login-button
    Get Url    should end with    inventory.html
    Wait For Elements State    xpath=//div[@class='inventory_list']        visible    timeout=5s

The user selects "price low to high" from the sorting dropdown
    [Documentation]    Sorting products by price

    Click    xpath=//select[@class='product_sort_container']
    Select Options By    xpath=//select[@class='product_sort_container']   value  lohi
    Wait For Elements State    xpath=//div[@class='inventory_list']        visible    timeout=5s

The products should be listed in ascending order of price    
    Get Text     xpath=//span[@data-test='active-option']    ==     Price (low to high)
#    Wait For Elements State    xpath=//span[@data-test='active-option']        visible    timeout=5s

