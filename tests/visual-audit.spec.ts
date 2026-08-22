import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const routes = [
  ["home", "/"],
  ["explore-travel", "/explore-travel"],
  ["book-it-yourself", "/book-it-yourself"],
  ["plan-my-trip", "/plan-my-trip"],
  ["about", "/about"],
  ["contact", "/contact"],
  ["cruises", "/cruises"],
  ["all-inclusive", "/all-inclusive-resorts"],
  ["travel-tips", "/travel-tips"],
  ["postcard", "/travel-tips/if-the-suitcase-needs-a-wrestling-match"],
  ["404", "/audit-page-that-does-not-exist"],
] as const;

for (const [name, path] of routes) {
  test(`${name} renders without launch-blocking layout failures`, async ({ page }, testInfo) => {
    const consoleErrors: string[] = [];
    page.on("console", (message) => {
      if (message.type() === "error") consoleErrors.push(message.text());
    });

    await page.goto(path, { waitUntil: "domcontentloaded" });
    await expect(page.locator("main h1:visible").first()).toBeVisible({ timeout: 15_000 });

    const layout = await page.evaluate(() => {
      const viewportWidth = document.documentElement.clientWidth;
      const visible = (element: Element) => {
        const style = getComputedStyle(element);
        const box = element.getBoundingClientRect();
        return style.display !== "none" && style.visibility !== "hidden" && box.width > 0 && box.height > 0;
      };
      const clippedControls = [...document.querySelectorAll("a, button, input, select, textarea")]
        .filter(visible)
        .map((element) => {
          const box = element.getBoundingClientRect();
          return { label: (element.textContent || element.getAttribute("aria-label") || "").trim(), left: box.left, right: box.right };
        })
        .filter((item) => item.left < -1 || item.right > viewportWidth + 1)
        .filter((item) => item.left > -1000);

      const brokenVisibleImages = [...document.images]
        .filter(visible)
        .filter((image) => {
          const box = image.getBoundingClientRect();
          return box.top < innerHeight && box.bottom > 0 && image.complete && image.naturalWidth === 0;
        })
        .map((image) => image.alt || image.currentSrc);

      return {
        overflow: document.documentElement.scrollWidth - viewportWidth,
        clippedControls,
        brokenVisibleImages,
      };
    });

    expect(layout.overflow, "horizontal page overflow").toBeLessThanOrEqual(1);
    expect(layout.clippedControls, "visible controls clipped by the viewport").toEqual([]);
    expect(layout.brokenVisibleImages, "broken images visible in the viewport").toEqual([]);
    const actionableConsoleErrors = consoleErrors.filter(
      (message) => !message.includes("ERR_NETWORK_ACCESS_DENIED"),
    );
    expect(actionableConsoleErrors, "browser console errors").toEqual([]);

    if (testInfo.project.name === "desktop-1440") {
      const accessibility = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
        .analyze();
      const severe = accessibility.violations.filter(({ impact }) => impact === "critical" || impact === "serious");
      await testInfo.attach("accessibility-results", {
        body: JSON.stringify(severe, null, 2),
        contentType: "application/json",
      });
      expect(
        severe.map(({ id, impact, nodes }) => ({ id, impact, affectedElements: nodes.length })),
        "serious or critical accessibility violations",
      ).toEqual([]);
    }
  });
}

test("mobile navigation opens, locks the page, and closes cleanly", async ({ page, isMobile }) => {
  test.skip(!isMobile, "mobile interaction check");
  await page.goto("/", { waitUntil: "domcontentloaded" });
  const menu = page.getByRole("button", { name: "Open menu" });
  await menu.click();
  await expect(page.getByRole("button", { name: "Close menu" })).toBeVisible();
  await expect(page.getByRole("navigation").getByRole("link", { name: "Contact" }).last()).toBeVisible();
  await expect(page.locator("body")).toHaveCSS("overflow", "hidden");
  await page.getByRole("button", { name: "Close menu" }).click();
  await expect(menu).toBeVisible();
});
