import { test, expect } from '@playwright/test';

/*
 * Screenshots can be taken in Playwright using the following methods:

 * https://playwright.dev/docs/screenshots
 *
 * The following resources may be helpful in testing responsive pages:
 *
 * https://playwright.dev/docs/emulation#viewport
 * https://playwright.dev/docs/api/class-page#page-set-viewport-size
 */


test('Dark mode', async ({ page }) => {
    await page.goto('https://interaction-playground.pages.dev/responsive');
    await page.getByText('Toggle the dark mode switch and verify that the page\'s color scheme changes.').click();
    await page.getByRole('button', { name: 'Switch to dark mode' }).click();
    await page.getByText('You have successfully').click();
});

test('Dark mode screenshots', async ({ page }) => {
    await page.goto('https://interaction-playground.pages.dev/responsive');
    await page.getByText('Toggle the dark mode switch and verify that the page\'s color scheme changes.').click();
    await page.getByRole('button', { name: 'Switch to dark mode' }).click();
    await page.getByText('You have successfully').click();
    await page.screenshot({ path: 'screenshots/dark-mode.png' });
});

test('Light mode screenshots', async ({ page }) => {
    await page.goto('https://interaction-playground.pages.dev/responsive');
    await page.getByText('Toggle the dark mode switch and verify that the page\'s color scheme changes.').click();
    await page.getByRole('button', { name: 'Switch to dark mode' }).click();
    await page.getByText('You have successfully').click();
    await page.getByRole('button', { name: 'Switch to light mode' }).click();
    await page.screenshot({ path: 'screenshots/light-mode.png' });
});

test('Responsive design', async ({ page }) => {
    await page.goto('https://interaction-playground.pages.dev/responsive');
    // Todo: Add tests for responsive design
    await page.setViewportSize({
        width: 500,
        height: 1800,
    });
    await page.setViewportSize({
        width: 600,
        height: 1800,
    });
    await page.setViewportSize({
        width: 900,
        height: 1800,
    });
    await page.setViewportSize({
        width: 900,
        height: 1800,
    });
    await page.getByText('You have successfully tested all supported screen sizes').click();
});


test('Responsive design screenshots', async ({ page }) => {
    //Extra small (xs)	< 600 px
    await page.setViewportSize({
        width: 550,
        height: 1800,
    });
    await page.goto('https://interaction-playground.pages.dev/responsive');
    await page.screenshot({ path: 'screenshots/extra-small.png' });
    //Small (sm)	>= 600 px
    await page.setViewportSize({
        width: 800,
        height: 1600,
    });
    await page.screenshot({ path: 'screenshots/small.png' });
    //Medium (md)	>= 900 px
    await page.setViewportSize({
        width: 1100,
        height: 1600,
    });
    await page.screenshot({ path: 'screenshots/medium.png' });
    //Large (lg)	>= 1200 px
    await page.setViewportSize({
        width: 1500,
        height: 1400,
    });
    await page.screenshot({ path: 'screenshots/large.png' });
    await page.getByText('You have successfully tested all supported screen sizes').click();

});