import { test, expect } from '@playwright/test'

import { CartPage } from '../page-objects/CartPage'
import { CheckoutPage } from '../page-objects/CheckoutPage'
import { InventoryPage } from '../page-objects/InventoryPage'
import { LoginPage } from '../page-objects/LoginPage'

// Task 4: this test passes most of the time but fails intermittently when you run
//   `npm run test:flaky`
// The site itself is not flaky. Find the race / bad assumption, fix it, and explain
// in NOTES.md what was actually wrong and how you diagnosed it.

test.describe('Checkout', () => {
  test('completes a checkout with one item', async ({ page }) => {
    const loginPage = new LoginPage(page)
    const inventory = new InventoryPage(page)
    const cart = new CartPage(page)
    const checkout = new CheckoutPage(page)

    await loginPage.goto()
    await loginPage.loginAs('standard_user', 'secret_sauce')
    await inventory.navigate()
    await inventory.addItemToCart('Sauce Labs Bike Light')
    await inventory.goToCart()
    await cart.checkout()
    await checkout.fillInformation('Ada', 'Lovelace', '10115')

    const subtotal = await checkout.readSubtotal()
    const tax = await checkout.readTax()
    const total = await checkout.readTotal()
    const expectedTotal = parseFloat((subtotal + tax).toFixed(2))
    expect(total).toEqual(expectedTotal)
    expect(total).toBeCloseTo(expectedTotal, 2)

    await checkout.finish()
    await checkout.expectOrderComplete()
  })
})
