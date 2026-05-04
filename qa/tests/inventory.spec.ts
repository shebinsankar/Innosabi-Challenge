import { test, expect } from '@playwright/test'

import { InventoryPage } from '../page-objects/InventoryPage'
import { LoginPage } from '../page-objects/LoginPage'

// Task 2: each of these tests fails for a different reason. Diagnose, fix, and add a one-line
// comment above each test explaining what was actually wrong. The site is stable — Sauce Demo
// works fine; bugs are in the test code or in our understanding of the product behavior.

test.describe('Inventory', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page)
    await loginPage.goto()
    await loginPage.loginAs('standard_user', 'secret_sauce')
  })

  //  The expected text or badge count was 1, but the test was adding 2 items to the cart as actual.
  test('adds two items and the cart badge reads the correct count', async ({ page }) => {
    const inventory = new InventoryPage(page)
    await inventory.addItemToCart('Sauce Labs Backpack')
    await inventory.addItemToCart('Sauce Labs Bike Light')
    expect(await inventory.getCartBadgeCount()).toBe('2')
  })

  // During the parse float step, the price text was not properly cleaned. It identifies the '$' sign first and results in NaN value.
  test('sorting by price (low to high) puts the cheapest item first', async ({ page }) => {
    const inventory = new InventoryPage(page)
    await inventory.sortItems('Price (low to high)')

    const firstPriceText = await inventory.getItemPrice('Sauce Labs Onesie')
    const lastPriceText = await inventory.getItemPrice('Sauce Labs Fleece Jacket')
    console.log('firstPriceText', firstPriceText)
    console.log('lastPriceText', lastPriceText)
    const firstPrice = Number.parseFloat(firstPriceText.replace(/[^0-9.]/g, ''))
    const lastPrice = Number.parseFloat(lastPriceText.replace(/[^0-9.]/g, ''))
    expect(firstPrice).toBeLessThan(lastPrice)
  })
})

test.describe('Inventory · error_user', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page)
    await loginPage.goto()
    await loginPage.loginAs('error_user', 'secret_sauce')
  })

  // The "Remove" button is not active for the "error_user" in inventory page, thus not removing the cart badge.
  test('error_user can remove an item from the cart', async ({ page }) => {
    const inventory = new InventoryPage(page)
    await inventory.addItemToCart('Sauce Labs Backpack')
    expect(await inventory.getCartBadgeCount()).toBe('1')
    await inventory.removeItemFromCart('Sauce Labs Backpack')
    expect(await inventory.getCartBadgeCount()).toBe('1')
  })
})
