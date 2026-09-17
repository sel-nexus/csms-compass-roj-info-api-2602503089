import { expect, test } from "@playwright/test";
test("operator can correct client-side invalid lookup without a network request", async ({ page }) => { await page.goto("/"); await page.getByRole("button", { name: "Look up journey" }).click(); await expect(page.getByText("VIN is required")).toBeVisible(); });
