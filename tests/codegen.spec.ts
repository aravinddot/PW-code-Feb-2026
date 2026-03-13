import { test, expect } from '@playwright/test';



// codegen
test('test', async ({ page }) => {
  await page.goto('https://playwright-mastery-academy-app.vercel.app/practice/sandbox-advanced');
  await expect(page.getByRole('heading', { name: 'Interactive Playwright' })).toBeVisible();
  await page.getByTestId('dynamic-group-select').selectOption('Locators');
  await page.getByTestId('dynamic-option-select').selectOption('role');
  await expect(page.getByTestId('dynamic-dropdown-status')).toContainText('Dynamic dropdown selected: getByRole + name.');
});

// console.log()
// debug
// pause()
// vscode
// trace viewer


//npx playwright codegen

// npx playwright show-trace

// npx playwright test --debug

// page.pause()