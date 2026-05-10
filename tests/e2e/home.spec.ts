import { test, expect, Page } from "@playwright/test";

async function skipIfBlockedByBotProtection(page: Page) {
  const title = await page.title();

  if (title.includes("Just a moment")) {
    test.skip(
      true,
      "Product Hunt showed bot protection page in automated browser"
    );
  }
}

test.describe("Product Hunt homepage", () => {
  test("loads homepage and shows product links", async ({ page }) => {
    await page.goto("/");

    await skipIfBlockedByBotProtection(page);

    await expect(page).toHaveTitle(/Product Hunt/i);

    const productLinks = page.locator(
      "a[href*='/products/'], a[href*='/posts/']"
    );

    await expect(productLinks.first()).toBeVisible();

    const count = await productLinks.count();
    expect(count).toBeGreaterThan(0);
  });

  test("opens a product detail page from homepage", async ({ page }) => {
    await page.goto("/");

    await skipIfBlockedByBotProtection(page);

    const productLinks = page.locator(
      "a[href*='/products/'], a[href*='/posts/']"
    );

    await expect(productLinks.first()).toBeVisible();

    await productLinks.first().click();

    await expect(page).toHaveURL(/\/(products|posts)\//);

    const heading = page.locator("h1").first();
    await expect(heading).toBeVisible();
  });
});