import { Page, Locator } from '@playwright/test'
import { productsPage } from './locators/productsPage'

export class ProductsPage {
    readonly ethalonProducts: Locator
    readonly page: Page
    readonly url: string

    constructor(page: Page) {
        this.page = page
        this.ethalonProducts = page.locator(productsPage.ethalonProducts)
        this.url = '/ru-ru/products/'
    }

    async goto(): Promise<void> {
        await this.page.goto(this.url)
    }

    async getEthalonProducts(): Promise<string[]> {
        let result: string[] = []
        const productsCount = await this.ethalonProducts.count()
        for (let i = 0; i < productsCount; i++) {
            const productTitle = await this.ethalonProducts.nth(i).innerText()
            result.push(productTitle)
        }
        return result
    }
}
