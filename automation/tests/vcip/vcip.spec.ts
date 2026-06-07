import { test, expect } from '@playwright/test';
import { ENV } from '../../utils/env';
import { login } from '../../utils/loginHelper';

test.describe('V-CIP Tests', () => {

  test('@smoke V-CIP - application launch test', async ({ page }) => {
    const url = ENV.VCIP_URL || 'https://example.com';
    await login(page, url);
    await expect(page).toHaveURL(/example|google/i);
  });

  test('@sanity V-CIP - login and dashboard test', async ({ page }) => {
    const url = ENV.VCIP_URL || 'https://example.com';
    await page.goto(url);
    await login(page, url);
    await expect(page.locator('h1')).toBeVisible();
  });

  test('@regression V-CIP - end to end workflow test', async ({ page }) => {
    const url = ENV.VCIP_URL || 'https://example.com';
    await page.goto(url);
    await login(page, url);
    const title = await page.title();
    expect(title).toBeTruthy();
  });

});
