import { expect, Locator, Page } from '@playwright/test'
import { MenuItems } from '../types/NavBarItems'
import { webinarsPage } from './locators/webinarsPage'

export class WebinarsPage {
    readonly page: Page
    readonly url: string
    readonly listOfEvents: Locator

    constructor(page: Page) {
        this.page = page
        this.url = MenuItems.webinares
        this.listOfEvents = page.locator(webinarsPage.listOfEvents)
    }

    async assertWebinarsButtons(): Promise<void> {
        await this.page.waitForSelector(webinarsPage.date)
        for (let i = 0; i < (await this.eventCounter()); i++) {
            const dateText = await this.listOfEvents
                .nth(i)
                .locator(webinarsPage.date)
                .innerText()
            const addCalendarButton = this.listOfEvents
                .nth(i)
                .locator(webinarsPage.addCalendarButton)
            const watchButton = this.listOfEvents
                .nth(i)
                .locator(webinarsPage.watchButton)
            const downloadButton = this.listOfEvents
                .nth(i)
                .locator(webinarsPage.downloadButton)
            if (this.isOld(dateText)) {
                expect(watchButton).toBeVisible()
                expect(downloadButton).toBeVisible()
                expect(addCalendarButton).not.toBeVisible()
            } else {
                expect(watchButton).not.toBeVisible()
                expect(downloadButton).not.toBeVisible()
                if (this.isItToday(this.getDateWithoutYear(dateText))) {
                    expect(addCalendarButton).not.toBeVisible()
                } else {
                    expect(addCalendarButton).toBeVisible()
                }
            }
        }
    }

    private getDateWithoutYear(date: string):string {
        return date.split(' ').slice(0, 2).join(' ')
    }

    private isOld(dateText: String): boolean {
        return dateText.split(' ')[0] === 'Прошёл'
    }

    private isItToday(webinarTime: string): boolean {
        const today = new Date()
        return (
            today.toLocaleString('ru-RU', { month: 'long', day: 'numeric' }) ===
            webinarTime
        )
    }

    private async eventCounter(): Promise<number>{
        return this.listOfEvents.count()
    }

    async checkDownloadingOldWebinar(): Promise<void> {
        for (let i = 0; i < (await this.eventCounter()); i++) {
            const dateText = await this.listOfEvents
                .nth(i)
                .locator(webinarsPage.date)
                .innerText()
            const downloadButton = this.listOfEvents
                .nth(i)
                .locator(webinarsPage.downloadButton)
            if (this.isOld(dateText)) {
                try {
                    const [download] = await Promise.all([
                        this.page.waitForEvent('download'),
                        downloadButton.click(),
                    ])
                    expect(await download.failure()).toBeNull()
                    break
                } catch (err) {
                    throw err
                }
            }
        }
    }
}
