*** Variables ***
${login_type}    Unknown
${git}    Epic sadface: Sorry, this user has been locked out.

*** Settings ***
Library             Browser

Test Setup          New Context    tracing=True
Test Teardown       Close Context

*** Test Cases ***
Successful login with a valid user
    [Documentation]     This test case is to test login with a valid user
    Given the user is on the login page
    #When the user enters a username "standard_user" and password "secret_sauce"
    When the user enters a username and password    standard_user    secret_sauce
    And the user clicks the login button
    Then the user should be redirected to the products page

Login With Invalid User
    [Documentation]    This test case is to test login with an invalid user
    Given the user is on the login page
    #When the user enters a username "12" and password "secret_sauce"
    When the user enters a username and password    12    secret_sauce
    And the user clicks the login button
    #Then an error message "Epic sadface: Username and password do not match any user in this service" should be displayed
    Then an error message should be displayed       Epic sadface: Username and password do not match any user in this service

Login with a locked-out user
    [Documentation]    This test case is to test login with a locked-out user
    Given the user is on the login page
    #When the user enters a username "locked_out_user" and password "secret_sauce"
    When the user enters a username and password    locked_out_user    secret_sauce
    And the user clicks the login button
    #Then an error message "Epic sadface: Sorry, this user has been locked out." should be displayed
    Then an error message should be displayed       Epic sadface: Sorry, this user has been locked out.

*** Keywords ***
The user is on the login page
    New Page    https://saucedemo.com/

#The user enters a username "${username}" and password "${password}"
The user enters a username and password 
    [Arguments]    ${username}    ${password}
    [Documentation]    This keyword is to enter username and password
    Type Text    id=user-name    ${username}
    Type Text    id=password     ${password}
    IF   "${username}" == "standard_user" and "${password}" == "secret_sauce"
        Log To Console       Login successfully
        Set Test Variable    ${login_type}    Valid
    ELSE IF   "${username}" == "locked_out_user" and "${password}" == "secret_sauce"
        Log To Console    Login failed: locked-out
        Set Test Variable    ${login_type}    Locked-out
    ELSE IF  "${username}" not in ["standard_user", "locked_out_user", "problem_user", "performance_glitch_user", "error_user", "visual_user"] and "${password}" == "secret_sauce"
        Log To Console    Login failed: Invalid
        Set Test Variable    ${login_type}    Invalid
    ELSE
        Log To Console    Unexpected usename or password
        Set Test Variable    ${login_type}    Unknown
    END

The user clicks the login button
    Click    id=login-button  

The user should be redirected to the products page
    Get Url    should end with    inventory.html

#An error message "${errormessage}" should be displayed
An error message should be displayed
    [Arguments]    ${errormessage}
    [Documentation]    This keyword is to check error message
    IF   "${login_type}" == "Invalid"
        Log To Console    Error message "Username and password do not match any user in this service" is displayed
        Get Text    xpath=//h3[@data-test='error']    ==    Epic sadface: Username and password do not match any user in this service
    ELSE IF   "${login_type}" == "Locked-out"
        Log To Console    Error message "Sorry, this user has been locked out." is displayed
        Get Text    xpath=//h3[@data-test='error']    ==    Epic sadface: Sorry, this user has been locked out.
    ELSE
        Log To Console    Error message is not displayed
        Fail    Error message is not displayed
    END