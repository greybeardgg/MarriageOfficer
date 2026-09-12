import { test, expect } from '@playwright/test';

test('western cape, one non-SA on a visa, divorced, registration', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'Getting Married Is Two Different Jobs' })).toBeVisible();
  await expect(page.locator('select')).toHaveCount(0); // never a drop-down
  // the first question is on the front door; the path is never forked before it
  await expect(page.getByRole('heading', { name: 'Where will this happen?' })).toBeVisible();
  await page.getByRole('button', { name: 'Western Cape' }).click();
  await page.getByRole('button', { name: 'One of us is' }).click();
  await page.getByRole('button', { name: 'Here on a visa or permit' }).click();
  await page.getByRole('button', { name: 'Yes, divorced' }).click();
  await page.getByRole('button', { name: /Just the legal registration/ }).click();
  await page.getByRole('button', { name: 'Not yet' }).click();

  await expect(page).toHaveURL(/\/plan\?/);
  await expect(page.getByRole('heading', { level: 1 }))
    .toHaveText('legal registration, one of you not South African (on a visa), one of you married before, Western Cape');
  await expect(page.getByText('Lara Thomas')).toBeVisible();
  await expect(page.getByText('One of us is divorced. What extra do we need?')).toBeVisible();
  // no phone number anywhere on a Western Cape page
  await expect(page.locator('body')).not.toContainText(/0\d{2}[\s-]?\d{3}[\s-]?\d{4}/);

  await page.getByLabel('Do you have any questions?').fill('can we bring a photographer on a Saturday?');
  await page.getByRole('button', { name: 'Show me' }).click();
  await expect(page.getByText('Can we bring a photographer or take photos?')).toBeVisible();
  await expect(page.getByText('Can we do it on a Saturday?')).toBeVisible();
  await expect(page).toHaveURL(/q=/);
});

test('gauteng first-marriage registration shows the express option and no decree', async ({ page }) => {
  await page.goto('/plan?p=gauteng&n=both_sa&m=none&s=registration&d=not_yet');
  await expect(page.getByText('Is there a lower-cost option?')).toBeVisible();
  await expect(page.getByText('One of us is divorced')).toHaveCount(0);
  await expect(page.getByText('Ryan Hogarth')).toBeVisible();
});

test('the front door offers no path choice, only the first question', async ({ page }) => {
  await page.goto('/');
  // both kinds of work are shown, but neither is a control
  await expect(page.getByRole('heading', { name: 'Register A Marriage' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Have A Wedding' })).toBeVisible();
  await expect(page.getByRole('button', { name: /Register A Marriage/ })).toHaveCount(0);
  await expect(page.getByRole('button', { name: /Have A Wedding/ })).toHaveCount(0);
});

test('the chat box answers from free text before any question is answered', async ({ page }) => {
  await page.goto('/');
  await page.getByLabel(/tell us your needs/i).fill('my fiance is on a work visa and I am divorced');
  await page.getByRole('button', { name: 'Answer Me' }).click();
  await expect(page.getByRole('heading', { name: /we can tell you now|depends on you/ }).first()).toBeVisible();
  // the record is still empty: nothing was asked of them to get this
  await expect(page.getByText('0 of 5 answered')).toBeVisible();
});

test('answering stamps the record and a stamp reopens its question', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Gauteng' }).click();
  await expect(page.getByRole('button', { name: /Change your answer for Place/ })).toBeVisible();
  await page.getByRole('button', { name: /Change your answer for Place/ }).click();
  await expect(page.getByRole('heading', { name: 'Where will this happen?' })).toBeVisible();
});

test('a broken link offers a way back', async ({ page }) => {
  await page.goto('/plan?p=gauteng');
  await expect(page.getByRole('link', { name: 'Back to the questions' })).toBeVisible();
});
