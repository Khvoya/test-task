import { test } from '@playwright/test'
import { Header } from '../modules/Header'
import { MainPage } from '../modules/MainPage'
import { SearchResultPage } from '../modules/SearchResultPage'
import { CheckBoxes } from '../types/CheckBoxes'

// Test 3
// Scenario:
// - Go to https://www.ptsecurity.com/ru-ru
// - In the site search field, enter "Positive Hack Days", display the duration
//   of the search in the console (in milliseconds)
// - In the "Site sections" block on the page with search results, check
//   the boxes only for "Пресс мероприятия", "СМИ о нас" and "Спикеры"
// - Check in the search results that each of the sections contains
//   at least one found page
// - Check in the search results that the title or the text under the title
//   contains the phrase you are looking for and is in bold

const text = 'Positive Hack Days'

test('Search from header with parameters', async ({ page }) => {
    const header = new Header(page)
    const searchResultPage = new SearchResultPage(page)
    const mainPage = new MainPage(page)
    await mainPage.goto()
    await header.clickSearch()
    await header.typeSearchInput(text)
    await header.submitSearch()
    await header.logSearchRequestTime()
    await searchResultPage.clickSectionsCheckbox(CheckBoxes.press)
    await searchResultPage.clickSectionsCheckbox(CheckBoxes.smi)
    await searchResultPage.clickSectionsCheckbox(CheckBoxes.speakers)
    await searchResultPage.assertResults(text)
})
