const fs = require("fs");
const path = require("path");

const projects = [
  {
    folder: "account-opening",
    title: "Account Opening",
    envKey: "ACCOUNT_OPENING_URL",
  },
  {
    folder: "card-management",
    title: "Card Management",
    envKey: "CARD_MANAGEMENT_URL",
  },
  {
    folder: "ckyc",
    title: "CKYC",
    envKey: "CKYC_URL",
  },
  {
    folder: "customer-onboarding",
    title: "Customer Onboarding",
    envKey: "CUSTOMER_ONBOARDING_URL",
  },
  {
    folder: "fraud-monitoring",
    title: "Fraud Monitoring",
    envKey: "FRAUD_MONITORING_URL",
  },
  {
    folder: "internet-banking",
    title: "Internet Banking",
    envKey: "INTERNET_BANKING_URL",
  },
  {
    folder: "loan-origination",
    title: "Loan Origination",
    envKey: "LOAN_ORIGINATION_URL",
  },
  {
    folder: "mobile-banking",
    title: "Mobile Banking",
    envKey: "MOBILE_BANKING_URL",
  },
  {
    folder: "payments",
    title: "Payments",
    envKey: "PAYMENTS_URL",
  },
  {
    folder: "rekyc",
    title: "ReKYC",
    envKey: "REKYC_URL",
  },
  {
    folder: "trade-finance",
    title: "Trade Finance",
    envKey: "TRADE_FINANCE_URL",
  },
  {
    folder: "vcip",
    title: "V-CIP",
    envKey: "VCIP_URL",
  },
];

const testsRoot = path.join(__dirname, "tests");

projects.forEach((project) => {
  const folderPath = path.join(testsRoot, project.folder);

  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
  }

  const specFilePath = path.join(folderPath, `${project.folder}.spec.ts`);

  const content = `import { test, expect } from '@playwright/test';
import { env } from '../../utils/env';
import { login } from '../../utils/loginHelper';

test.describe('${project.title} Tests', () => {
  test('@smoke ${project.title} - application launch test', async ({ page }) => {
    await page.goto(env.${project.envKey});

    // TODO: Replace this with real ${project.title} page assertion.
    await expect(page).toHaveTitle(/Example/);
  });

  test('@sanity ${project.title} - login and dashboard test', async ({ page }) => {
    await page.goto(env.${project.envKey});

    // TODO: Update loginHelper locators based on real application.
    await login(page, env.COMMON_USERNAME, env.COMMON_PASSWORD);

    // TODO: Replace this with real dashboard assertion.
    await expect(page).toHaveURL(/example|dashboard|home/i);
  });

  test('@regression ${project.title} - end to end workflow test', async ({ page }) => {
    await page.goto(env.${project.envKey});

    await login(page, env.COMMON_USERNAME, env.COMMON_PASSWORD);

    // TODO: Replace this section with real ${project.title} regression workflow.
    // Example:
    // await page.getByRole('button', { name: 'Create' }).click();
    // await page.getByLabel('Customer Name').fill('Test Customer');
    // await page.getByRole('button', { name: 'Submit' }).click();

    // TODO: Replace this with real success assertion.
    await expect(page).toHaveURL(/example|dashboard|home/i);
  });
});
`;

  fs.writeFileSync(specFilePath, content);
  console.log(`Created: ${specFilePath}`);
});

console.log("All Playwright spec files created successfully.");