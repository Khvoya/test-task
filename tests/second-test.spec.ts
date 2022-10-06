import { test, expect } from '@playwright/test'
import { Header } from '../modules/Header'
import { MainPage } from '../modules/MainPage'
import { WebinarsPage } from '../modules/WebinarsPage'
import { MenuItems, NavBarItems } from '../types/NavBarItems'

// Test 2
// Scenario:
// - Go to https://www.ptsecurity.com/ru-ru
// - Go through the main menu to Research-Webinars
// - On the first page of the list of webinars, check that the "Watch recording" and
//   "Download presentation" buttons have been added to all past webinars.Also check
//   that there are no mentioned buttons for upcoming webinars, but there is a 
//   "Add to calendar" link, and that it redirects to an existing file)

test.describe.configure({ mode: 'serial' })
test("Old webinars have download buttons, and future webinars haven't", async ({
    page,
}) => {
    const mainPage = new MainPage(page)
    const header = new Header(page)
    const webinarsPage = new WebinarsPage(page)
    await mainPage.goto()
    await header.chooseMenuItem(NavBarItems.research, MenuItems.webinares)
    await webinarsPage.assertWebinarsButtons()
})

test('Old webinare downloading by click on the link', async ({ page }) => {
    const webinarsPage = new WebinarsPage(page)
    await webinarsPage.checkDownloadingOldWebinar()
})
