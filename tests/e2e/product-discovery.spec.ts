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

test.describe("Product Hunt product discovery", () => {
  test("homepage product links have visible text", async ({ page }) => {
    await page.goto("/");

    await skipIfBlockedByBotProtection(page);

    const productLinks = page.locator(
      "a[href*='/products/'], a[href*='/posts/']"
    );

    await expect(productLinks.first()).toBeVisible();

    const firstProductText = await productLinks.first().innerText();

    expect(firstProductText.trim().length).toBeGreaterThan(0);
  });

  test("visible product images are not broken", async ({ page }) => {
    await page.goto("/");

    await skipIfBlockedByBotProtection(page);

    const images = page.locator("img");
    const imageCount = await images.count();

    expect(imageCount).toBeGreaterThan(0);

    const maxImagesToCheck = Math.min(imageCount, 10);

    for (let i = 0; i < maxImagesToCheck; i++) {
      const image = images.nth(i);

      if (await image.isVisible()) {
        const isLoaded = await image.evaluate((img) => {
          const htmlImage = img as HTMLImageElement;
          return htmlImage.complete && htmlImage.naturalWidth > 0;
        });

        expect(isLoaded).toBe(true);
      }
    }
  });

  test("homepage works on mobile viewport", async ({ page }) => {
    await page.setViewportSize({
      width: 390,
      height: 844
    });

    await page.goto("/");

    await skipIfBlockedByBotProtection(page);

    const productLinks = page.locator(
      "a[href*='/products/'], a[href*='/posts/']"
    );

    await expect(productLinks.first()).toBeVisible();

    const count = await productLinks.count();
    expect(count).toBeGreaterThan(0);
  });
});