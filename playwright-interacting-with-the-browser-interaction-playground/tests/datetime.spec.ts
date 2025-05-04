import { test, expect } from '@playwright/test';

/*
 * See the following resource for hints about how to control time in tests:
 * https://playwright.dev/docs/clock
 */

test('Test page using different dates', async ({ page }) => {
    await page.goto('https://interaction-playground.pages.dev/datetime');
    await page.getByText('Copyright © 2025 example.com').click();
    await page.clock.setFixedTime(new Date('2033-04-07T10:00:00'));
    await page.goto('https://interaction-playground.pages.dev/datetime');
    await page.getByText('Copyright © 2033 example.com').click();
});