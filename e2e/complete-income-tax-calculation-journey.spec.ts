// spec: Basic Income Tax Calculator Happy Path
// seed: seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('Basic Income Tax Calculator', () => {
  test('Complete Income Tax Calculation Journey', async ({ page }) => {
    // Navigate to the journeys listing page to access the income tax calculator
    await page.goto('http://localhost:4173/journey');

    // Wait for the journey links to load on the page
    await new Promise(f => setTimeout(f, 3 * 1000));

    // Click on the Basic Income Tax Calculator link to start the journey
    await page.getByRole('link', { name: 'Basic Income Tax Calculator' }).click();

    // Click the Start now button to begin the income tax calculation journey
    await page.getByRole('button', { name: 'Start now' }).click();

    // Enter the total annual income of £55,000 in the annual income field
    await page.getByRole('textbox', { name: 'Annual income' }).fill('55000');

    // Select Yearly as the income period
    await page.getByRole('radio', { name: 'Yearly' }).click();

    // Select Freelance work as an additional income source
    await page.getByRole('checkbox', { name: 'Freelance work' }).click();

    // Select Investments as an additional income source
    await page.getByRole('checkbox', { name: 'Investments' }).click();

    // Click Continue to proceed to the tax code and allowances page
    await page.getByRole('button', { name: 'Continue' }).click();

    // Enter the tax code 1257L in the tax code field
    await page.getByRole('textbox', { name: 'Tax Code' }).fill('1257L');

    // Select England as the tax region
    await page.getByRole('radio', { name: 'England' }).click();

    // Select Personal allowance as a tax allowance
    await page.getByRole('checkbox', { name: 'Personal allowance' }).click();

    // Select Code 0T as a tax code option to satisfy the validation requirement
    await page.getByRole('checkbox', { name: 'Code 0T' }).click();

    // Click Continue to proceed to the check your details page
    await page.getByRole('button', { name: 'Continue' }).click();

    // Click Confirm to proceed to the tax estimate results page
    await page.getByRole('button', { name: 'Confirm' }).click();

    // Verify that the total income of £55,000 is displayed in the tax breakdown table
    await expect(page.getByText('£55,000')).toBeVisible();

    // Verify that the total tax deducted of £11,000 is displayed in the results
    await expect(page.getByText('£11,000')).toBeVisible();

    // Verify that the tax breakdown table with caption 'Tax Breakdown of Your Income' is visible
    await expect(page.getByRole('table', { name: 'Tax Breakdown of Your Income' })).toBeVisible();
  });
});