import * as dotenv from 'dotenv';
import * as path from 'path';

// Load environment variables from .env file
dotenv.config({ path: path.resolve(__dirname, '..', '.env') });

export const ENV = {
  ACCOUNT_OPENING_URL: process.env.ACCOUNT_OPENING_URL || 'https://example.com',
  CKYC_URL: process.env.CKYC_URL || 'https://example.com',
  REKYC_URL: process.env.REKYC_URL || 'https://example.com',
  VCIP_URL: process.env.VCIP_URL || 'https://example.com',
  TRADE_FINANCE_URL: process.env.TRADE_FINANCE_URL || 'https://example.com',
  LOAN_ORIGINATION_URL: process.env.LOAN_ORIGINATION_URL || 'https://example.com',
  MOBILE_BANKING_URL: process.env.MOBILE_BANKING_URL || 'https://example.com',
  INTERNET_BANKING_URL: process.env.INTERNET_BANKING_URL || 'https://example.com',
  CARD_MANAGEMENT_URL: process.env.CARD_MANAGEMENT_URL || 'https://example.com',
  PAYMENTS_URL: process.env.PAYMENTS_URL || 'https://example.com',
  CUSTOMER_ONBOARDING_URL: process.env.CUSTOMER_ONBOARDING_URL || 'https://example.com',
  FRAUD_MONITORING_URL: process.env.FRAUD_MONITORING_URL || 'https://example.com',
  
  COMMON_USERNAME: process.env.COMMON_USERNAME || 'testuser',
  COMMON_PASSWORD: process.env.COMMON_PASSWORD || 'password',
};
