import { test, expect } from '@playwright/test';

test.describe('Component Library Navigation and Display', () => {
  test('should navigate to components page and verify all component sections are rendered', async ({ page }) => {
    // Navigate to homepage to start the component library navigation test
    await page.goto('http://localhost:4173');
    
    // Verify homepage loads successfully with proper heading
    await expect(page.getByRole('heading', { name: 'Home' })).toBeVisible();
    
    // Verify GOV.UK header link is displayed correctly
    await expect(page.getByRole('link', { name: 'GOV.UK' })).toBeVisible();
    
    // Click View components link to navigate to components page
    await page.getByRole('link', { name: 'View components' }).click();
    
    // Verify Components page heading is displayed after navigation
    await expect(page.getByRole('heading', { name: 'Components' })).toBeVisible();
    
    // Verify key component sections are rendered
    await expect(page.getByRole('heading', { name: 'Accordion' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Button' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Checkboxes' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'DateInput' })).toBeVisible();
    
    // Scroll to ensure all components are visible on the page
    await page.keyboard.press('End');
    
    // Verify components at the bottom of the page are rendered
    await expect(page.getByRole('heading', { name: 'WarningText' })).toBeVisible();
    
    // Additional component verifications for comprehensive coverage
    await expect(page.getByRole('heading', { name: 'ErrorSummary' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Typography' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'TaskList' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Textarea' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'TextInput' })).toBeVisible();
  });
});