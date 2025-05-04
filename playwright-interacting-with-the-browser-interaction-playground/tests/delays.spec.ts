import { test, expect } from '@playwright/test';

test('Delayed appearance', async ({ page }) => {
    await page.goto('https://interaction-playground.pages.dev/delays');
    await page.getByRole('textbox', { name: 'Enter the text' }).click();
    await page.getByRole('textbox', { name: 'Enter the text' }).fill('Hello world');
    await page.getByText('Nice job! Hello to you too!').click();
});

test('Delayed enablement', async ({ page }) => {
    await page.goto('https://interaction-playground.pages.dev/delays');
    await page.getByRole('button', { name: 'Click me!' }).click();
    await page.getByText('Thoughtful clicking? You must').click();
});