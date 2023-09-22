import { test, expect } from '@playwright/test';


test('Home Page should have the right title', async ({ page }) => {
  await page.goto('/');
  expect(page).toHaveTitle('Restore AI')
})

test('Dashboard should redirect to login page', async ({ page }) => {
  await page.goto('/dashboard')
  expect(page).toHaveURL(/.*signin/)
})
