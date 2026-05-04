import { Page, expect } from '@playwright/test'

export class CartPage {
  constructor(private readonly page: Page) {}

  async expectItemPresent(name: string): Promise<void> {
    await expect(this.page.locator('.cart_item').filter({ hasText: name })).toBeVisible()
  }

  async itemCount(): Promise<number> {
    return this.page.locator('.cart_item').count()
  }

  async checkout(): Promise<void> {
    await this.page.getByTestId('checkout').click()
  }
}
