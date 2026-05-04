import { Locator, Page, expect } from '@playwright/test'

export class SideMenu {

    private readonly burgerButton: Locator;
    private readonly logoutLink: Locator;


    constructor(private readonly page: Page) {
        this.burgerButton = this.page.getByRole("button", { name: "Open Menu" });
        this.logoutLink = this.page.getByTestId("logout-sidebar-link");
    }

    async openSideMenu(): Promise<void> {
        await this.burgerButton.click()
    }

    async logout(): Promise<void> {
        await this.logoutLink.click()
    }
}
