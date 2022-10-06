import { expect, Locator, Page } from '@playwright/test'
import { CheckBoxes } from '../types/CheckBoxes'
import { searchResultPage } from './locators/searchResultPage'

export class SearchResultPage {
    readonly page: Page
    readonly searchResults: Locator
    readonly getCheckBoxLocator: (checkbox: CheckBoxes) => Locator

    constructor(page: Page) {
        this.page = page
        this.searchResults = page.locator(searchResultPage.searchResult)
        this.getCheckBoxLocator = (checkbox) =>
            page.locator(searchResultPage.checkBoxes[checkbox])
    }

    async clickSectionsCheckbox(checkbox: CheckBoxes): Promise<void> {
        await this.getCheckBoxLocator(checkbox).click()
    }

    async assertResults(requestText: string): Promise<void> {
        const resultsCount = await this.searchResults.count()
        for (let i = 0; i < resultsCount; i++) {
            const content = this.searchResults.nth(i)
            const contentCounter = await content.count()
            expect(contentCounter).toBeGreaterThanOrEqual(1)
            const boldWords = content.locator(searchResultPage.boldWords)
            const wordCounter = await boldWords.count()
            for (let j = 0; j < wordCounter; j++) {
                const word = await boldWords.nth(j).innerText()
                expect(requestText).toContain(word)
            }
        }
    }
}
