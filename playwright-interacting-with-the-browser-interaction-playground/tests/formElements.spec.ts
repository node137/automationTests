import { test, expect } from '@playwright/test';

/*
 * The following resource may be helful in locating elements in the DOM
 * using both accessibility selectors and CSS selectors:
 *
 * https://playwright.dev/docs/locators
 *
 * When interacting with dialogs and prompts, the following resources
 * may be helpful:
 *
 * https://playwright.dev/docs/dialogs
 * https://playwright.dev/docs/api/class-dialog#dialog-accept
 */


test('Basic text input', async ({ page }) => {

        await page.goto('https://interaction-playground.pages.dev/forms');
        await page.getByRole('textbox', { name: 'Greeting' }).click();
        await page.getByRole('textbox', { name: 'Greeting' }).fill('hello');
        await page.getByText('Nice job! You have greeted the page').click();
});
    
test('Input without proper attributes', async ({ page }) => {

    await page.goto('https://interaction-playground.pages.dev/forms');
    await page.getByRole('textbox').nth(1).click();
    await page.getByRole('textbox').nth(1).fill('undefined is not a function');
    await page.getByText('Done! But be careful, that').click();
})

test('Reading values from the page', async ({ page }) => {
    await page.goto('https://interaction-playground.pages.dev/forms');
    await page.getByText('The value to enter is').click();
    await page.getByRole('textbox', { name: 'Insert the value here' }).click();
    const dynamicValue = await page.textContent('#dynamic-value'); 
    if (dynamicValue) { 
      // Varmistetaan, että dynamicValue ei ole null
      await page.getByRole('textbox', { name: 'Insert the value here' }).fill(dynamicValue);
    } else {
      throw new Error('Dynamic value not found or is null');
    }
    await page.getByRole('textbox', { name: 'Insert the value here' }).fill(dynamicValue);
    await page.getByText('Great job! You have').click();
});

test('Radio buttons', async ({ page }) => {
    await page.goto('https://interaction-playground.pages.dev/forms');
    await page.getByRole('radio', { name: 'Java', exact: true }).check();
    await page.getByRole('radio', { name: 'JavaScript' }).check();
    await page.getByRole('radio', { name: 'TypeScript' }).check();
    await page.getByRole('radio', { name: 'Python' }).check();
    await page.getByText('The term "radio button" in').click();
});

test('Checkboxes', async ({ page }) => {
    await page.goto('https://interaction-playground.pages.dev/forms');
    await page.locator('input[name="terms-and-conditions"]').check();
    await page.getByRole('checkbox').nth(1).check();
    await page.locator('#yes-robot').check();
    await page.getByTitle('Subscribe to newsletter').getByRole('checkbox').check();
    await page.getByRole('checkbox').nth(4).check();
    await page.getByText('Button-mashing detected. Are').click();
});

test('Alerts and prompts', async ({ page }) => {
    // Kuuntele dialog-tapahtumaa
    page.on('dialog', async (dialog) => {
      await dialog.accept('2'); 
    });
    await page.goto('https://interaction-playground.pages.dev/forms');
    await page.getByRole('button', { name: 'What is 1 + 1?' }).click();
    await page.getByText('You have handled the prompt').click();
});