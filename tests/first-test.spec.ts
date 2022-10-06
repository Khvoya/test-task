import { test } from '@playwright/test'
import { Header } from '../modules/Header'
import { MainPage } from '../modules/MainPage'
import { ProductsPage } from '../modules/ProductsPage'
import { NavBarItems } from '../types/NavBarItems'

// Test 1
// Preconditions:
// - There is a saved reference list of names of all products from the page
//   https://www.ptsecurity.com/ru-ru/products/
// Scenario:
// - Go to https://www.ptsecurity.com/ru-ru
// - Go through the main menu to the Products page
// - Check that the page contains information about all products
//   from the list in the precondition

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
