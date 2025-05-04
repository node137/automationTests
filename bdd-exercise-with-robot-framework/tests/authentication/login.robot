*** Settings ***
Library             Browser

Test Setup          New Context    tracing=True
Test Teardown       Close Context


*** Test Cases ***
Successful login with a valid user
    [Documentation]    Successful login with a valid user

    Given the user is on the login page
    When the user enters a valid username and password
    And the user clicks the login button
    Then the user should be redirected to the products page

Login with an invalid user
    [Documentation]    Login with an invalid user

    Given the user is on the login page
    When the user enters invalids username or password
    And the user clicks the login button
    Then an error message should be displayed
    
Login with a locked-out user
    [Documentation]    Login with a locked-out user
    
    Given the user is on the login page
    When the user enters crendentials for a locked-out user
    And the user clicks the login button
    Then the error message should indicate that the user is locked out
    
*** Keywords ***
The user is on the login page
    New Page    https://saucedemo.com/

The user enters a valid username and password
    Type Text    id=user-name    standard_user
    Type Text    id=password     secret_sauce

The user clicks the login button
    Click    id=login-button   
    
The user should be redirected to the products page
    Get Url    should end with    inventory.html

The user enters invalids username or password
    Type Text    id=user-name    12
    Type Text    id=password    secret_sauce

An error message should be displayed
    Get Text    xpath=//h3[@data-test='error']    ==    Epic sadface: Username and password do not match any user in this service
    
The user enters crendentials for a locked-out user
    Type Text    id=user-name    locked_out_user
    Type Text    id=password    secret_sauce

The error message should indicate that the user is locked out
    Get Text    xpath=//h3[@data-test='error']    ==    Epic sadface: Sorry, this user has been locked out.