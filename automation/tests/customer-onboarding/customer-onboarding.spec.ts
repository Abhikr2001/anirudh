import { test, expect } from '@playwright/test';
import { ENV } from '../../utils/env';
import { login } from '../../utils/loginHelper';

test.describe('Customer Onboarding Tests', () => {

  test('@smoke Customer Onboarding - application launch test', async ({ page }) => {
    const url = ENV.CUSTOMER_ONBOARDING_URL || 'https://example.com';
    await login(page, url);
    await expect(page).toHaveURL(/example|google/i);
  });

  test('@sanity Customer Onboarding - login and dashboard test', async ({ page }) => {
    const url = ENV.CUSTOMER_ONBOARDING_URL || 'https://example.com';
    await page.goto(url);
    await login(page, url);
    await expect(page.locator('h1')).toBeVisible();
  });

  test('@regression Customer Onboarding - end to end workflow test', async ({ page }) => {
    const url = ENV.CUSTOMER_ONBOARDING_URL || 'https://example.com';
    await page.goto(url);
    await login(page, url);
    const title = await page.title();
    expect(title).toBeTruthy();
  });

});
