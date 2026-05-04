import { Locator, Page, expect } from '@playwright/test'

// LoginPage is the reference implementation we expect the InventoryPage refactor to mirror:
// methods describe user intent, selectors stay inside the class, no Locator return values
// leak to specs.
export class LoginPage {

  private readonly usernameField: Locator

  constructor(private readonly page: Page) {
    this.usernameField = this.page.getByTestId('username')
  }

  async goto(): Promise<void> {
    await this.page.goto('/')
  }

  async loginAs(username: string, password: string): Promise<void> {
    await this.usernameField.fill(username)
    await this.page.getByTestId('password').fill(password)
    await this.page.getByTestId('login-button').click()
  }

  getUsernameField(): Locator {
    return this.usernameField
  }

  async expectErrorContaining(text: string): Promise<void> {
    await expect(this.page.getByTestId('error')).toContainText(text)
  }
}
