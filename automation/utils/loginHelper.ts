import { Page, expect } from '@playwright/test';
import { ENV } from './env';

/**
 * Reusable login helper function.
 * TODO: Update with real application locators and workflow.
 */
export async function login(page: Page, url: string) {
  // Navigate to the provided URL
  await page.goto(url);
  
  // TODO: Update these locators with real application elements
  // Example:
  // await page.fill('#username', ENV.COMMON_USERNAME);
  // await page.fill('#password', ENV.COMMON_PASSWORD);
  // await page.click('#login-button');
  
  // For demo purposes, we just verify page title or a header
  await expect(page).toHaveTitle(/Example Domain|Google/);
  
  console.log(`Log: Navigated to ${url} successfully.`);
}
