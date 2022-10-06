import { test, expect } from '@playwright/test'
import { PlaywrightActionabilityPage } from '../modules/PlaywrightActionabilityPage'

// Тест 4
// Предусловия:
// - Реализовать функционал, который позволит возвращать значения из таблицы на странице
// https://playwright.dev/docs/actionability с учётом следующих условий:
// 1) Количество и порядок колонок и строк в будущем может изменяться,
// что не должно влиять на работу функционала
// 2) Базовый функционал: передаём интересующее значение из "Action" и названия колонки,
// по которой хотим получить соответствующее значение
// 3) Если какое-либо из переданных значений не существует в таблице, выводится исключение
// Сценарий для проверки работы функционала:
// - Перейти на https://playwright.dev/docs/actionability
// - Проверить, что возвращаемое значение соответствует "Yes" или "-" для случайных значений
// из "Action" и из названия колонки (т.е. при каждом новом запуске теста значения для передачи будут выбираться случайно)

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
