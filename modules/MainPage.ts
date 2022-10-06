import { Page } from '@playwright/test'

export class MainPage {
    readonly page: Page
    readonly url: string

    constructor(page: Page) {
        this.page = page
        this.url = '/ru-ru/'
    }

    async goto(): Promise<void> {
        await this.page.goto(this.url)
    }
}
