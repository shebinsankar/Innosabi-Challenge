import { Locator, Page, expect } from '@playwright/test'

// Task 3: this page object compiles and the consuming specs pass, but it has at least five
// design issues a senior reviewer would flag. Refactor it. See README for the rubric.
export class InventoryPage {

  private readonly items: Locator;
  private readonly shoppingCartLink: Locator;
  private readonly cartBadge: Locator;
  private readonly itemPrice: Locator;
  private readonly productSort: Locator;
  private readonly addToCartButton: Locator;

  constructor(private readonly page: Page) {
    this.items = this.page.getByTestId("inventory-item");
    this.shoppingCartLink = this.page.getByTestId("shopping-cart-link");
    this.cartBadge = this.page.getByTestId("shopping-cart-badge");
    this.itemPrice = this.page.getByTestId("inventory-item-price");
    this.productSort = this.page.getByTestId("product-sort-container");
    this.addToCartButton = this.page.getByRole('button', { name: 'Add to cart' });
  }

  async navigate(): Promise<void> {
    await this.page.goto('/inventory.html')
    // Added wait for the page to load before interacting with elements to avoid potential timing issues.
    await this.page.waitForLoadState('domcontentloaded')
  }

  // Returns the locator for an inventory item card by visible name.
  private async getItemLocatorByName(name: string): Promise<Locator> {
    const card = this.items.filter({ hasText: name })
    if (await card.count() === 0) {
      throw new Error(`Item not found: "${name}"`)
    }
    return card.first()
  }

  async addItemToCart(name: string): Promise<void> {
    const card = await this.getItemLocatorByName(name);
    await card.locator(this.addToCartButton).click()
  }

  async removeItemFromCart(name: string): Promise<void> {
    const card = await this.getItemLocatorByName(name);
    await card.getByRole('button', { name: 'Remove' }).click()
  }

  async getCartBadgeCount(): Promise<string> {
    const badge = this.cartBadge
    if (await badge.count() === 0) {
      return ''
    }
    return (await badge.textContent()) ?? ''
  }

  async goToCart(): Promise<void> {
    await this.shoppingCartLink.click()
  }

  // Helper to grab the price text out of a card. Specs strip the dollar sign themselves.
  async getItemPrice(name: string): Promise<string> {
    const card = await this.getItemLocatorByName(name)
    return (await card.locator(this.itemPrice).textContent()) ?? ''
  }

  async sortItems(visibleText: string): Promise<void> {
    await this.productSort.selectOption({ label: visibleText })
  }

  // Returns ordered list of item names as currently rendered. Specs use this to assert
  // sort order.
  async getItemNamesInOrder(): Promise<string[]> {
    return await this.page.locator('[data-test="inventory-item-name"]').allTextContents()
  }
}
