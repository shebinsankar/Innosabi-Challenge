My Tasks

## Task 2 
1. The expected text or badge count was 1, but the test was adding 2 items to the cart as actual.
2. During the parse float step, the price text was not properly cleaned. Parse identifies the '$' sign first and results in NaN value.
3. The "Remove" button is not active for the "error_user" in inventory page, thus not removing the cart badge. The test name should be changed to 'error_user cannot remove an item from the cart'.

## Task 3
1. Renamed method names to 'addItemToCart(), removeItemFromCart(), goToCart(), sortItems()' so that they are more meaningful.
2. Used stable selectors getByTestId(), getByRole() - removed brittle selectors such as css, texts.
3. Made locators private and centralised in the class scope for readability, reusability, reduce duplicates and for easy maintenance.
4. Added error handle for addToCart('nonexistent product') - when product don't exists.
5. Replaced waitForTimeout() with waitForLoadState() dom loaded - good when page navigation happens.
6. The expectItemVisible() method removed as it is not recommended to use assertion in class scope. If we keep the locators also private to the class, this can reduce the flexibily of the tests.
7. Removed navigate() method from tests - loginAs() method will already redirects to inventory page

## Task 4
Identified the flakiness is due to floating point issue when asserting the total. And this fails for certain combinations with decimal points. Fixed it by rounding the value to two decimal points.
Also the regex can be improved "/\$([\d,]+\.?\d*)/". It should not break if comma in total.

Diagnosis: First I ran the test in serial and parallel runs to identify the flakiness. Checked for any delay in app, any dependency in the tests, version dependency. Changed the test data to verify the floating point issue.

Also we can have stable tests by picking the products without hardcoded values (addItemToCart('Sauce Labs Bike Light')). Instead pick product details in an array list(name, price) and persist it for validating till the end of test. Use isVisible() methods so that actions happen only when elements are ready.

## Task 5
I would implement logout feature also in the smoke suite, it is important to check the user session logout is working properly.




# Feature: 
I liked the user variations provided by the Saucedemo. We can use 'performance_glitch_user' to check our tests in a low performance environment.