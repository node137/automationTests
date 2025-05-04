import { test, expect } from '@playwright/test';

test('Mark todos as completed', async ({ page }) => {
  await page.goto('https://interaction-playground.pages.dev/repetition');
  const checkboxes = await page.locator('input[type="checkbox"]');
  const checkboxCount = await checkboxes.count();

  for (let i = 0; i < checkboxCount; i++) {
    const checkbox = checkboxes.nth(i);
    const isChecked = await checkbox.isChecked();
    if (!isChecked) {
      await checkbox.check();
    }
  }
  await page.getByText('Nice job! You literally').click();
});

test('Counter', async ({ page }) => {
    await page.goto('https://interaction-playground.pages.dev/repetition');
    const clickCount = 100;
  
    for (let i = 0; i < clickCount; i++) {
        await page.getByRole('button', { name: '+' }).click();
    }
    await page.getByText('If you keep clicking, I might').click();
    await page.getByText('Counter: 100 / 100').click();
});