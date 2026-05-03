const { test, expect } = require('playwright/test');

test.describe('smoke: tracks experience', () => {
  test('home and tracks pages load', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Rollie/i);

    await page.goto('/tracks/');
    await expect(page).toHaveTitle(/Tracks/i);
    const loadedCount = await page.locator('#tracks-grid track-option').count();
    expect(loadedCount).toBeGreaterThan(0);
  });

  test('search narrows visible tracks', async ({ page }) => {
    await page.goto('/tracks/');

    const tracks = page.locator('#tracks-grid track-option');
    const initialCount = await tracks.count();
    await expect(initialCount).toBeGreaterThan(1);

    await page.getByRole('searchbox', { name: /search tracks/i }).fill('pipiliin');
    await expect(tracks).toHaveCount(1);
    await expect(tracks.first()).toHaveAttribute('track-id', 'pipiliin_ko');
  });

  test('sort option changes ordering', async ({ page }) => {
    await page.goto('/tracks/');

    const tracks = page.locator('#tracks-grid track-option');
    const firstBeforeSort = await tracks.first().getAttribute('track-id');

    await page.locator('#sort-by-custom .select-trigger').click();
    await page.locator('#sort-by-custom .option[data-value="duration"]').click();

    await expect.poll(async () => tracks.first().getAttribute('track-id')).not.toBe(firstBeforeSort);
  });

  test('list view + track option click navigates to track info', async ({ page }) => {
    await page.goto('/tracks/');

    await page.locator('#list-view-btn').click();
    await expect(page.locator('#tracks-grid')).toHaveClass(/list-view/);

    const targetTrackId = await page.locator('#tracks-grid track-option').first().getAttribute('track-id');
    await page.locator('#tracks-grid track-option').first().click();

    await expect(page).toHaveURL(new RegExp(`/track-info/${targetTrackId}/$`));
  });

  test('theme toggle persists after reload', async ({ page }) => {
    await page.goto('/tracks/');

    const html = page.locator('html');
    const initialTheme = await html.getAttribute('data-theme');

    await page.locator('header #theme-toggle-btn').click();
    const toggledTheme = await html.getAttribute('data-theme');
    expect(toggledTheme).not.toBe(initialTheme);

    await page.reload();
    await expect(html).toHaveAttribute('data-theme', toggledTheme || 'dark');
  });
});
