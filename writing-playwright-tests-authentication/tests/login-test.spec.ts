import { test, expect } from '@playwright/test';

test('SignIn test: can log in successfully ', async ({ 
page }) => {
  await page.goto('https://authentication-6o1.pages.dev/');
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('alice@example.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('}3jc\\xJnQ=E=+Q_y/%Hd311bW#6{_Oyj');
  await page.getByRole('button', { name: 'Sign in', exact: true }).click();
  const header = page.locator('h4');
  await expect(header).toHaveText('Welcome Alice!');
  //await page.getByRole('heading', { name: 'Welcome Alice!' }).click();
});

test('SignIn test: validation invalid email form', async ({ page }) => {
    await page.goto('https://authentication-6o1.pages.dev/');
    await page.getByRole('textbox', { name: 'Email' }).click();
    await page.getByRole('textbox', { name: 'Email' }).fill('test@');
    await page.getByRole('button', { name: 'Sign in', exact: true }).click();
    await page.getByText('Please enter a valid email').click();
  });

test('SignIn test: validation: invalid password form', async ({ page }) => {
    await page.goto('https://authentication-6o1.pages.dev/');
    await page.getByRole('textbox', { name: 'Password' }).click();
    await page.getByRole('textbox', { name: 'Password' }).fill('12345');
    await page.getByRole('button', { name: 'Sign in', exact: true }).click();
    await page.getByText('Password must be at least 6').click();
  });

test('SignIn test: validation Invalid email or password combo: email', async ({ page }) => {
    await page.goto('https://authentication-6o1.pages.dev/');
    await page.getByRole('textbox', { name: 'Email' }).click();
    await page.getByRole('textbox', { name: 'Email' }).fill('alice@example.co');
    await page.getByRole('textbox', { name: 'Password' }).click();
    await page.getByRole('textbox', { name: 'Password' }).fill('}3jc\\xJnQ=E=+Q_y/%Hd311bW#6{_Oyj');
    await page.getByRole('button', { name: 'Sign in', exact: true }).click();
    await page.getByText('Invalid email or password').click();
  });

  test('SignIn test: validation Invalid email or password combo: pwd', async ({ page }) => {
    await page.goto('https://authentication-6o1.pages.dev/');
    await page.getByRole('textbox', { name: 'Email' }).click();
    await page.getByRole('textbox', { name: 'Email' }).fill('alice@example.com');
    await page.getByRole('textbox', { name: 'Password' }).click();
    await page.getByRole('textbox', { name: 'Password' }).fill('}3jc\\xJnQ=E=+Q_y/%Hd311bW#6{_Oy');
    await page.getByRole('button', { name: 'Sign in', exact: true }).click();
    await page.getByText('Invalid email or password').click();
  });

  test('LogOut test: logged out', async ({ page }) => {
    await page.goto('https://authentication-6o1.pages.dev/');
    await page.getByRole('textbox', { name: 'Email' }).click();
    await page.getByRole('textbox', { name: 'Email' }).fill('alice@example.com');
    await page.getByRole('textbox', { name: 'Password' }).click();
    await page.getByRole('textbox', { name: 'Password' }).click();
    await page.getByRole('textbox', { name: 'Password' }).fill('}3jc\\xJnQ=E=+Q_y/%Hd311bW#6{_Oyj');
    await page.getByRole('button', { name: 'Sign in', exact: true }).click();
    await page.getByText('Successfully logged in').click();
    await page.getByRole('button', { name: 'Logout' }).click();
    await page.getByText('You have been logged out.').click();
  });

test('Autorization test: verification not logged in', async ({ page }) => {
  await page.goto(' https://authentication-6o1.pages.dev/dashboard');
  await page.getByText('You must be logged in to').click();
});

test('SignUp test: verification email already in use', async ({ page }) => {
    await page.goto('https://authentication-6o1.pages.dev/signUp');
    await page.getByRole('textbox', { name: 'Full name' }).click();
    await page.getByRole('textbox', { name: 'Full name' }).fill('alice');
    await page.getByRole('textbox', { name: 'Email' }).click();
    await page.getByRole('textbox', { name: 'Email' }).fill('alice@example.com');
    await page.getByRole('textbox', { name: 'Password' }).click();
    await page.getByRole('textbox', { name: 'Password' }).fill('1234567');
    await page.getByRole('button', { name: 'Sign up', exact: true }).click();
    await page.getByText('Email is already in use').click();
  });

  test('SignUp test: name is empty, name is required', async ({ page }) => {
    await page.goto('https://authentication-6o1.pages.dev/signUp');
    await page.getByRole('textbox', { name: 'Email' }).click();
    await page.getByRole('textbox', { name: 'Email' }).fill('alice2@example.com');
    await page.getByRole('textbox', { name: 'Password' }).click();
    await page.getByRole('textbox', { name: 'Password' }).fill('1234567');
    await page.getByRole('button', { name: 'Sign up', exact: true }).click();
    await page.getByText('Name is required.').click();
  });

  test('SignUp test: SignUp Ok', async ({ page }) => {
    await page.goto('https://authentication-6o1.pages.dev/signUp');
    await page.getByRole('textbox', { name: 'Full name' }).click();
    await page.getByRole('textbox', { name: 'Full name' }).fill('testialice');
    await page.getByRole('textbox', { name: 'Email' }).click();
    await page.getByRole('textbox', { name: 'Email' }).fill('testialice3@example.com');
    await page.getByRole('textbox', { name: 'Password' }).click();
    await page.getByRole('textbox', { name: 'Password' }).fill('1234567');
    await page.getByRole('button', { name: 'Sign up', exact: true }).click();
    await page.getByText('Account created successfully').click();
  });