import { Locator, Page, expect } from '@playwright/test'
import { MenuItems, NavBarItems } from '../types/NavBarItems'
import { header } from './locators/header'

export class Header {
    readonly page: Page
    readonly searchButton: Locator
    readonly searchInput: Locator
    readonly actualProducts: Locator
    readonly submitSearchButton: Locator
    readonly menuOption: (menuItem: MenuItems) => Locator
    readonly navigationOption: (navOption: NavBarItems) => Locator
    readonly searchResponseURL: string

    constructor(page: Page) {
        this.page = page
        this.searchButton = page.locator(header.searchButton)
        this.searchInput = page.locator(header.searchInput)
        this.submitSearchButton = page.locator(header.submitSearchButton)
        this.actualProducts = page.locator(header.actualProducts)
        this.menuOption = (menuItem) => page.locator(header.menuItem(menuItem))
        this.navigationOption = (navOption) =>
            page.locator(header.navOption(navOption))
        this.searchResponseURL = 'https://www.ptsecurity.com/*'
    }

    async clickSearch(): Promise<void> {
        await this.searchButton.click()
    }

    async typeSearchInput(text: string): Promise<void> {
        await this.searchInput.type(text)
    }

    async submitSearch(): Promise<void> {
        await this.submitSearchButton.click()
    }

    async logSearchRequestTime(): Promise<void> {
        const response = await this.page.waitForResponse(this.searchResponseURL)
        const startTime = response.request().timing().startTime
        const requestTime = (Date.now() - startTime).toFixed()
        console.info(`The search took a ${requestTime} ms`)
    }

    async clickNavButton(navOption: NavBarItems): Promise<void> {
        await this.navigationOption(navOption).click()
    }

    async hoverMenuItem(navOption: NavBarItems): Promise<void> {
        await this.navigationOption(navOption).hover()
    }

    async chooseMenuItem(
        navOption: NavBarItems,
        menuItem: MenuItems
    ): Promise<void> {
        await this.navigationOption(navOption).hover()
        await this.menuOption(menuItem).click()
        await this.page.waitForURL(menuItem)
    }

    async assertEthalonProducts(ethalonProducts: string[]): Promise<void> {
        await this.page.waitForSelector(header.menuSublist)
        let actual: string[] = []
        const actualProductsCounter = await this.actualProducts.count()
        for (let i = 0; i < actualProductsCounter; i++) {
            const productText = await this.actualProducts.nth(i).innerText()
            actual.push(productText)
        }
        expect(actual.sort()).toStrictEqual(ethalonProducts.sort())
    }
}
