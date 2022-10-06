import { test } from '@playwright/test'
import { Header } from '../modules/Header'
import { MainPage } from '../modules/MainPage'
import { ProductsPage } from '../modules/ProductsPage'
import { NavBarItems } from '../types/NavBarItems'

// Тест 1
// Предусловия:
// - Имеется сохранённый эталонный список названий всех продуктов со страницы https://www.ptsecurity.com/ru-ru/products/
// Сценарий:
// - Перейти на https://www.ptsecurity.com/ru-ru
// - Перейти через главное меню на страницу Продукты
// - Проверить, что страница содержит информацию обо всех продуктах из списка в предусловии

let ethalonProducts: string[]
test.beforeEach(async ({ page }) => {
    const productsPage = new ProductsPage(page)
    await productsPage.goto()
    ethalonProducts = await productsPage.getEthalonProducts()
})

test('Product menu contains actual products', async ({ page }) => {
    const mainPage = new MainPage(page)
    const header = new Header(page)
    await mainPage.goto()
    await header.hoverMenuItem(NavBarItems.products)
    await header.assertEthalonProducts(ethalonProducts)
})
