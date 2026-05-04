import { Locator, Page, expect } from '@playwright/test'

export class SideMenu {

    private readonly burgerButton: Locator;
    private readonly logoutLink: Locator;


    constructor(private readonly page: Page) {
        this.burgerButton = this.page.getByRole("button", { name: "Open Menu" });
        this.logoutLink = this.page.getByTestId("logout-sidebar-link");
    }

    // Helps user to open the side menu by clicking on the burger button
    async openSideMenu(): Promise<void> {
        await this.burgerButton.click()
    }
    // Helps user to logout from the application by clicking on the logout link in the side menu
    async logout(): Promise<void> {
        await this.logoutLink.click()
    }
}
