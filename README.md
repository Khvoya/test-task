# Test task

Implement on Playwright test runner (TypeScript), use Page Object, use steps with descriptions, try not to use xpath to access elements.

Test 1
Preconditions:
- There is a saved reference list of names of all products from the page https://www.ptsecurity.com/en-us/products/
Scenario:
- Go to https://www.ptsecurity.com/en-us
- Go through the main menu to the Products page
- Check that the page contains information about all products from the list in the precondition

Test 2
Scenario:
- Go to https://www.ptsecurity.com/en-us
- Go through the main menu to Research-Webinars
- On the first page of the list of webinars, check that the "Watch recording" and "Download presentation" buttons have been added to all past webinars.Also check that there are no mentioned buttons for upcoming webinars, but there is a "Add to calendar" link, and that it redirects to an existing file)

Test 3
Scenario:
- Go to https://www.ptsecurity.com/en-us
- In the site search field, enter Positive Hack Days, display the duration of the search in the console (in milliseconds)
- In the "Site sections" block on the page with search results, check the boxes only for "Press event", "Media about us" and "Speakers"
- Check in the search results that each of the sections contains at least one found page
- Check in the search results that the title or the text under the title contains the phrase you are looking for and is in bold

Test 4
Preconditions:
- Implement functionality that will allow you to return values   from a table on the https://playwright.dev/docs/actionability page, subject to the following conditions:
1) The number and order of columns and rows may change in the future, which should not affect the functionality
2) Basic functionality: we pass the value of interest from the "Action" and the name of the column for which we want to get the corresponding value
3) If any of the passed values   do not exist in the table, an exception is thrown
Script to test the functionality:
- Go to https://playwright.dev/docs/actionability
- Check that the return value matches "Yes" or "-" for random values   from the "Action" and from the column name (i.e., with each new test run, the values     for transmission will be selected randomly)

 Clone project:

```sh
https://github.com/Khvoya/test-task.git
```
 Install packages:

```sh
npm install
```
Run tests:

```sh
npx playwright test
```