import { test, expect } from '@playwright/test';

test('Standard select element', async ({ page }) => {
    await page.goto('https://interaction-playground.pages.dev/customisations');
    await page.getByLabel('Select animal:').selectOption('fox');
    await page.getByText('Success! You selected the').click();
});

test('Custom select element', async ({ page }) => {
    await page.goto('https://interaction-playground.pages.dev/customisations');
    await page.getByLabel('', { exact: true }).click();
    await page.getByRole('option', { name: 'blue' }).click();
    await page.getByText('Success! You have selected').click();
});

test('Standard date picker', async ({ page }) => {
    await page.goto('https://interaction-playground.pages.dev/customisations');
    await page.locator('#date-picker').fill('2030-01-01');
    await page.getByText('Success! You have selected').click();
});


test('Custom date picker', async ({ page }) => {
  await page.goto('https://interaction-playground.pages.dev/customisations');
  await page.getByRole('textbox', { name: 'Choose a date' }).click();
  await page.getByRole('button', { name: 'Choose date, selected date is' }).click();
  await page.getByRole('button', { name: 'Previous month' }).click();
  await page.getByRole('button', { name: 'Previous month' }).click();
  await page.getByRole('button', { name: 'Previous month' }).click();
  await page.getByRole('gridcell', { name: '1', exact: true }).nth(0).click();
  await page.getByRole('button', { name: 'Choose date, selected date is' }).click();
  await page.getByText('January 2025').click();
  await page.getByRole('radio', { name: '2030' }).click();
  await page.getByRole('gridcell', { name: '1', exact: true }).click();
});
