import { test } from '@playwright/test'
import { Header } from '../modules/Header'
import { MainPage } from '../modules/MainPage'
import { SearchResultPage } from '../modules/SearchResultPage'
import { CheckBoxes } from '../types/CheckBoxes'

// Тест 3
// Сценарий:
// - Перейти на https://www.ptsecurity.com/ru-ru
// - В поле поиска по сайту ввести Positive Hack Days, сделать вывод в консоль длительность поиска (в миллисекундах)
// - В блоке "Разделы сайта" на странице с результатами поиска поставить галочки только для "Пресс мероприятия", "СМИ о нас" и "Спикеры"
// - Проверить в результатах поиска, что каждый из разделов содержит хотя бы по одной найденной странице
// - Проверить в результатах поиска, что в названии или в тексте под названием содержится искомая фраза и выделена жирным шрифтом

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
