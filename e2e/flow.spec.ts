import { test, expect } from '@playwright/test';

test('western cape, one non-SA on a visa, divorced, registration', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1, name: /Ryan Hogarth/ })).toBeVisible();
  await expect(page.locator('select')).toHaveCount(0); // never a drop-down
  await expect(page.getByRole('heading', { name: 'Where will this happen?' })).toBeVisible();
  await page.getByRole('button', { name: 'Western Cape' }).click();
  await page.getByRole('button', { name: /Just the legal registration/ }).click();
  await page.getByRole('button', { name: 'One of us is' }).click();
  await page.getByRole('button', { name: 'Here on a visa or permit' }).click();
  await page.getByRole('button', { name: 'Yes, divorced' }).click();
  await expect(page.getByRole('heading', { name: 'Do you have an officer in mind?' })).toBeVisible();
  await page.getByRole('button', { name: /No preference/ }).click();
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
  await expect(page.getByText('Ryan Hogarth', { exact: true })).toBeVisible();
});

test('a ceremony on its own asks no legal question and can name an officer', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Gauteng' }).click();
  await page.getByRole('button', { name: /A ceremony only/ }).click();
  // straight to the officer: no nationality, no prior marriage
  await expect(page.getByRole('heading', { name: 'Do you have an officer in mind?' })).toBeVisible();
  await expect(page.getByText('03 / 04')).toBeVisible();
  await page.getByRole('button', { name: /Christa Lizamore/ }).click();
  await page.getByRole('button', { name: 'Soon, not fixed yet' }).click();

  await expect(page).toHaveURL(/\/plan\?p=gauteng&s=ceremony_only&o=christa&d=soon/);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('ceremony on its own, Gauteng, with Christa Lizamore');
  await expect(page.getByText('What does a ceremony on its own cost?')).toBeVisible();
  await expect(page.getByText('What do we bring on the day?')).toHaveCount(0);
  await expect(page.getByText('Your choice')).toBeVisible();
});

test('the front door offers no path choice: a banner, the introduction, and question one', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1, name: /Ryan Hogarth/ })).toBeVisible();
  await expect(page.getByText('Whether you simply need to be legally married')).toBeVisible();
  await expect(page.getByText('Getting Married Is Two Different Jobs')).toHaveCount(0);
  await expect(page.getByText('Two Ways In')).toHaveCount(0);
  // the nine provinces are on the door, compact, no start button
  await expect(page.getByRole('heading', { name: 'Where will this happen?' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Northern Cape' })).toBeVisible();
  // both kinds of work are shown, but neither is a control
  await expect(page.getByRole('heading', { name: 'Register A Marriage' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Have A Wedding' })).toBeVisible();
  await expect(page.getByRole('button', { name: /Register A Marriage/ })).toHaveCount(0);
  await expect(page.getByRole('button', { name: /Have A Wedding/ })).toHaveCount(0);
  await expect(page.getByRole('button', { name: 'Start The Quiz' })).toHaveCount(0);
  // the menu the current site carries
  await expect(page.getByRole('navigation', { name: 'Site' }).getByRole('link', { name: 'Our Team' })).toBeVisible();
});

test('the chat box answers from free text before the quiz has started', async ({ page }) => {
  await page.goto('/');
  await page.getByLabel(/explain what you need/i).fill('my fiance is on a work visa and I am divorced');
  await page.getByRole('button', { name: 'Answer Me' }).click();
  await expect(page.getByRole('heading', { name: /we can tell you now|depends on you/ }).first()).toBeVisible();
  // nothing was asked of them to get this: question one is still waiting on the door
  await expect(page.getByRole('heading', { name: 'Where will this happen?' })).toBeVisible();
  await expect(page.getByText('The Record')).toHaveCount(0);
});

test('answering stamps the record, a stamp reopens its question, and back off question two returns to the door', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Gauteng' }).click();
  await expect(page.getByRole('heading', { name: 'What do you need?' })).toBeVisible();
  await page.getByRole('button', { name: 'Back' }).click();
  await expect(page.getByText('Whether you simply need to be legally married')).toBeVisible();
  await page.getByRole('button', { name: 'Gauteng' }).click();
  await expect(page.getByRole('button', { name: /Change your answer for Place/ })).toBeVisible();
  await page.getByRole('button', { name: /Change your answer for Place/ }).click();
  await expect(page.getByRole('heading', { name: 'Where will this happen?' })).toBeVisible();
});

test('the team page names every officer and no phone number', async ({ page }) => {
  await page.goto('/team');
  await expect(page.getByRole('heading', { level: 1, name: 'Our Team' })).toBeVisible();
  await expect(page.getByText('Lara Thomas')).toBeVisible();
  await expect(page.getByText('Cindy Reed')).toBeVisible();
  await expect(page.locator('body')).not.toContainText(/0\d{2}[\s-]?\d{3}[\s-]?\d{4}/);
  await page.getByRole('link', { name: 'Answer The Questions' }).click();
  await expect(page.getByRole('heading', { name: 'Where will this happen?' })).toBeVisible();
});

test('a broken link offers a way back', async ({ page }) => {
  await page.goto('/plan?p=gauteng');
  await expect(page.getByRole('link', { name: 'Back to the questions' })).toBeVisible();
});
