import { test, expect } from '@playwright/test'
import { PlaywrightActionabilityPage } from '../modules/PlaywrightActionabilityPage'

// Test 4
// Preconditions:
// - Implement functionality that will allow you to return values   from a table 
//   on the https://playwright.dev/docs/actionability page, subject to the following conditions:
//   1) The number and order of columns and rows may change in the future,
//      which should not affect the functionality
//   2) Basic functionality: we pass the value of interest from the "Action" 
//      and the name of the column for which we want to get the corresponding value
//   3) If any of the passed values   do not exist in the table, an exception is thrown
// Script to test the functionality:
// - Go to https://playwright.dev/docs/actionability
// - Check that the return value matches "Yes" or "-" for random values from the "Action" and
// from the column name (i.e., with each new test run, the values for transmission will
// be selected randomly)

test('Getting values from playwright actionability page', async ({ page }) => {
    const playwrightActionabilityPage = new PlaywrightActionabilityPage(page)
    await playwrightActionabilityPage.goto()
    const inputs = await playwrightActionabilityPage.getRandomInputs()
    const result = await playwrightActionabilityPage.getTableValue(
        inputs.action,
        inputs.state
    )
    console.info(`Input values: ${inputs.action}, ${inputs.state}`)
    console.info(`Result: ${result}`)
    expect(result).toMatch(/-|(Yes)/)
})
