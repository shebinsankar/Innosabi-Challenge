import { Page, expect } from '@playwright/test'

export class CheckoutPage {
  constructor(private readonly page: Page) { }

  async fillInformation(firstName: string, lastName: string, postalCode: string): Promise<void> {
    await this.page.getByTestId('firstName').fill(firstName)
    await this.page.getByTestId('lastName').fill(lastName)
    await this.page.getByTestId('postalCode').fill(postalCode)
    await this.page.getByTestId('continue').click()
  }

  async finish(): Promise<void> {
    await this.page.getByTestId('finish').click()
  }

  async expectOrderComplete(): Promise<void> {
    await expect(this.page.getByTestId('complete-header')).toContainText('Thank you for your order')
  }

  async readSubtotal(): Promise<number> {
    const text = (await this.page.locator('.summary_subtotal_label').textContent()) ?? ''
    const match = text.match(/\$([\d.]+)/)
    if (!match) throw new Error(`Could not parse subtotal from "${text}"`)
    return Number.parseFloat(match[1])
  }

  async readTax(): Promise<number> {
    const text = (await this.page.locator('.summary_tax_label').textContent()) ?? ''
    const match = text.match(/\$([\d.]+)/)
    if (!match) throw new Error(`Could not parse tax from "${text}"`)
    return Number.parseFloat(match[1])
  }

  async readTotal(): Promise<number> {
    const text = (await this.page.locator('.summary_total_label').textContent()) ?? ''
    const match = text.match(/\$([\d.]+)/)
    if (!match) throw new Error(`Could not parse total from "${text}"`)
    return Number.parseFloat(match[1])
  }
}
