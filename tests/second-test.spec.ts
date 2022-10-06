import { test, expect } from '@playwright/test'
import { Header } from '../modules/Header'
import { MainPage } from '../modules/MainPage'
import { WebinarsPage } from '../modules/WebinarsPage'
import { MenuItems, NavBarItems } from '../types/NavBarItems'

// Тест 2
// Сценарий:
// - Перейти на https://www.ptsecurity.com/ru-ru
// - Перейти через главное меню в Исследования-Вебинары
// - На первой странице списка вебинаров проверить, что ко всем прошедшим вебинарам добавлены кнопки
// "Смотреть запись" и "Скачать презентацию", а для предстоящих вебинаров этих кнопок нет,
//  но есть ссылка "Добавить в календарь", и что она не "битая" (ведёт на существующий файл)

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
