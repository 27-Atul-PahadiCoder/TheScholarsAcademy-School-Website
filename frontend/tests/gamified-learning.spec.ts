import { test, expect } from "@playwright/test";

// End-to-end flow tests for the Gamified Learning area

const gotoGamified = async (page: import("@playwright/test").Page) => {
  await page.goto("/gamified-learning");
  await expect(
    page.getByText("Learn Through Play!", { exact: false })
  ).toBeVisible();
};

test("home screen shows hero, stats and quick actions", async ({ page }) => {
  await gotoGamified(page);

  await expect(
    page.getByRole("heading", { name: /Learn Through Play!/i })
  ).toBeVisible();
  await expect(
    page.getByRole("button", { name: /Start Playing/i })
  ).toBeVisible();

  // Stats cards
  await expect(page.getByText(/Total Points/i)).toBeVisible();
  await expect(page.getByText(/Current Level/i)).toBeVisible();
  await expect(page.getByText(/Win Streak/i)).toBeVisible();

  // Quick access cards
  await expect(page.getByText(/Play Games/i)).toBeVisible();
  await expect(page.getByText(/Achievements/i)).toBeVisible();
});

test("can navigate to games grid and back", async ({ page }) => {
  await gotoGamified(page);

  await page.getByRole("button", { name: /Start Playing/i }).click();
  await expect(
    page.getByRole("heading", { name: /Choose Your Adventure!/i })
  ).toBeVisible();

  // Ensure all four games are present
  await expect(page.getByText(/Math Challenge/i)).toBeVisible();
  await expect(page.getByText(/Memory Match/i)).toBeVisible();
  await expect(page.getByText(/Quiz Master/i)).toBeVisible();
  await expect(page.getByText(/Word Puzzle/i)).toBeVisible();

  // Back to home via header icon
  await page.getByTestId("back-button").click({ force: true });
  await page.waitForFunction(() => (window as any).screen === "home");
  await expect(
    page.getByRole("heading", { name: /Learn Through Play!/i })
  ).toBeVisible();
});

test("math game screen loads from games grid", async ({ page }) => {
  await gotoGamified(page);
  await page.getByRole("button", { name: /Start Playing/i }).click();

  await page.getByText(/Math Challenge/i).click();

  await expect(page.getByText(/Math Challenge/i)).toBeVisible();
  await expect(page.getByText(/Time Left/i)).toBeVisible();
});

test("memory game screen loads from games grid", async ({ page }) => {
  await gotoGamified(page);
  await page.getByRole("button", { name: /Start Playing/i }).click();

  await page.getByText(/Memory Match/i).click();

  await expect(page.getByText(/Moves/i)).toBeVisible();
  await expect(page.getByText(/Matches/i)).toBeVisible();
});

test("quiz game screen loads from games grid", async ({ page }) => {
  await gotoGamified(page);
  await page.getByRole("button", { name: /Start Playing/i }).click();

  await page.getByText(/Quiz Master/i).click();

  await expect(page.getByText(/Question 1 of/i)).toBeVisible();
  await expect(page.getByText(/points/i)).toBeVisible();
});

test("word puzzle screen loads from games grid", async ({ page }) => {
  await gotoGamified(page);
  await page.getByRole("button", { name: /Start Playing/i }).click();

  await page.getByText(/Word Puzzle/i).click();

  await expect(page.getByText(/Category:/i)).toBeVisible();
  await expect(page.getByText(/Wrong Guesses/i)).toBeVisible();
});
