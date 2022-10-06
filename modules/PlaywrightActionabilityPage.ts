import { Locator, Page } from '@playwright/test'
import { playwrightActionabilityPage } from './locators/playwrightActionabilityPage'

export class PlaywrightActionabilityPage {
    readonly page: Page
    readonly url: string
    readonly tableActions: Locator
    readonly tableStates: Locator
    readonly getValueLocator: (
        actionIndex: number,
        stateIndex: number
    ) => string

    constructor(page: Page) {
        this.page = page
        this.url = 'https://playwright.dev/docs/actionability'
        this.tableActions = page.locator(
            playwrightActionabilityPage.tableActions
        )
        this.tableStates = page.locator(playwrightActionabilityPage.tableStates)
        this.getValueLocator = playwrightActionabilityPage.getValueLocator
    }

    async goto(): Promise<void> {
        await this.page.goto(this.url)
    }

    private async getActions(): Promise<string[]> {
        return this.tableActions.allTextContents()
    }

    private async getStates(): Promise<string[]> {
        return this.tableStates.allTextContents()
    }

    async getRandomInputs(): Promise<{ action: string; state: string }> {
        const actions = await this.getActions()
        const states = await this.getStates()
        const randomIndex = (arr: string[]) =>
            Math.floor(Math.random() * arr.length)
        return {
            action: actions[randomIndex(actions)],
            state: states[randomIndex(states)],
        }
    }

    async getTableValue(action: string, state: string): Promise<string> {
        const actions = await this.getActions()
        const actionIndex = actions.indexOf(action) + 1
        const states = await this.getStates()
        const stateIndex = states.indexOf(state) + 2
        if (actions.includes(action) && states.includes(state)) {
            const valueCell = this.page.locator(
                playwrightActionabilityPage.getValueLocator(
                    actionIndex,
                    stateIndex
                )
            )
            return valueCell.innerText()
        } else {
            throw new Error('Wrong action or state')
        }
    }
}
