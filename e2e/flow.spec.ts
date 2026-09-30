import { test, expect } from '@playwright/test';

/** The page itself never scrolls on a desktop: one viewport, nothing below the fold (Cameron, 14 September 2026). */
async function expectOneViewport(page: import('@playwright/test').Page) {
  const fits = await page.evaluate(() => document.documentElement.scrollHeight <= window.innerHeight + 1);
  expect(fits).toBe(true);
}

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
  await expectOneViewport(page);
  await page.getByRole('button', { name: /No preference/ }).click();
  await page.getByRole('button', { name: 'Not yet' }).click();

  await expect(page).toHaveURL(/\/plan\?/);
  await expect(page.getByRole('heading', { level: 1 }))
    .toHaveText('legal registration, one of you not South African (on a visa), one of you married before, Western Cape');
  await expectOneViewport(page);
  // the first message is the process; the rest are behind buttons
  await expect(page.getByText('How does a registration at your offices work?')).toBeVisible();
  await expect(page.getByText('One of us is divorced. What extra do we need?')).toHaveCount(0);
  await page.getByRole('button', { name: 'What do we bring?' }).click();
  await expect(page.getByText('One of us is divorced. What extra do we need?')).toBeVisible();
  // a button pressed is not offered again
  await expect(page.getByRole('button', { name: 'What do we bring?' })).toHaveCount(0);
  await page.getByRole('button', { name: 'Who will we meet?' }).click();
  await expect(page.getByText('Lara Thomas')).toBeVisible();
  await expect(page.getByRole('log').getByText('Nearest to you')).toBeVisible();
  // no phone number anywhere on a Western Cape page
  await expect(page.locator('body')).not.toContainText(/0\d{2}[\s-]?\d{3}[\s-]?\d{4}/);

  await page.getByLabel('Ask anything else').fill('can we bring a photographer on a Saturday?');
  await page.getByRole('button', { name: 'Ask', exact: true }).click();
  await expect(page.getByText('Can we bring a photographer or take photos?')).toBeVisible();
  await expect(page.getByText('Can we do it on a Saturday?')).toBeVisible();
  // the buttons still on offer survive a typed question
  await expect(page.getByRole('button', { name: 'What does it cost?' })).toBeVisible();
});

test('gauteng first-marriage registration shows the express option and no decree', async ({ page }) => {
  await page.goto('/plan?p=gauteng&n=both_sa&m=none&s=registration&d=not_yet');
  await page.getByRole('button', { name: 'What does it cost?' }).click();
  await expect(page.getByText('Is there a lower-cost option?')).toBeVisible();
  await page.getByRole('button', { name: 'What do we bring?' }).click();
  await expect(page.getByText('One of us is divorced')).toHaveCount(0);
  await page.getByRole('button', { name: 'Who will we meet?' }).click();
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
  // nothing to bring and no Home Affairs: those buttons are never offered
  await expect(page.getByRole('button', { name: 'What do we bring?' })).toHaveCount(0);
  await expect(page.getByRole('button', { name: 'Where does Home Affairs fit?' })).toHaveCount(0);
  await page.getByRole('button', { name: 'What does it cost?' }).click();
  await expect(page.getByText('What does a ceremony on its own cost?')).toBeVisible();
  await page.getByRole('button', { name: 'Who will we meet?' }).click();
  await expect(page.getByText('Your choice')).toBeVisible();
  // the last topic closes the conversation; Book This stays beside the record
  await page.getByRole('button', { name: 'Anything else to know?' }).click();
  await expect(page.getByText('That is the whole of it')).toBeVisible();
  await expect(page.getByRole('link', { name: 'Book This' })).toBeVisible();
});

test('the date opens over its question, and a picked date is stamped', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Gauteng' }).click();
  await page.getByRole('button', { name: /A ceremony only/ }).click();
  await page.getByRole('button', { name: /No preference/ }).click();
  await expect(page.getByRole('heading', { name: 'Any date in mind?' })).toBeVisible();
  await expect(page.getByRole('dialog')).toHaveCount(0);
  await page.getByRole('button', { name: 'Yes, a date' }).click();
  const dialog = page.getByRole('dialog');
  await expect(dialog).toBeVisible();
  // the question is still on the page behind it
  await expect(page.getByRole('heading', { name: 'Any date in mind?' })).toBeVisible();
  await dialog.getByRole('button', { name: 'Back' }).click();
  await expect(page.getByRole('dialog')).toHaveCount(0);
  await page.getByRole('button', { name: 'Yes, a date' }).click();
  await page.getByLabel('Date', { exact: true }).fill('2027-03-06');
  await page.getByRole('dialog').getByRole('button', { name: 'Next' }).click();
  await expect(page).toHaveURL(/d=2027-03-06/);
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
  // the two panels went on 14 September; the every-couple line stayed
  await expect(page.getByRole('heading', { name: 'We Do Both' })).toHaveCount(0);
  await expect(page.getByRole('heading', { name: 'Register A Marriage' })).toHaveCount(0);
  await expect(page.getByRole('heading', { name: 'Have A Wedding' })).toHaveCount(0);
  await expect(page.getByText('Every couple.')).toBeVisible();
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
  await expectOneViewport(page);
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

const PAGES = [
  { label: 'Marriage Registration', path: '/marriage-registrations', heading: 'Get legally married at home or at our offices', who: 'Nonkululeko Duma' },
  { label: 'Wedding Ceremonies', path: '/wedding-ceremonies', heading: 'From 5 people to 500, personal ceremonies created and delivered', who: 'Liz and Anina' },
  { label: 'Same-Sex Weddings', path: '/same-sex-weddings', heading: 'We are all registered Civil Union marriage officers', who: 'Zavion and John' },
];

for (const p of PAGES) {
  test(`the menu opens ${p.label}: its words, one testimonial, no number, and the way in is the questions`, async ({ page }) => {
    await page.goto('/');
    await page.getByRole('navigation', { name: 'Site' }).getByRole('link', { name: p.label }).click();
    await expect(page).toHaveURL(new RegExp(p.path + '$'));
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(p.heading);
    await expect(page.getByText(p.who)).toBeVisible();
    await expect(page.getByRole('navigation', { name: 'Site' }).getByRole('link', { name: p.label })).toHaveAttribute('aria-current', 'page');
    // no phone number, no email, no enquiry form
    await expect(page.locator('body')).not.toContainText(/0\d{2}[\s-]?\d{3}[\s-]?\d{4}/);
    await expect(page.locator('body')).not.toContainText(/@[\w-]+\.\w+/);
    await expect(page.locator('form')).toHaveCount(0);
    await page.getByRole('link', { name: 'Answer The Questions' }).last().click();
    await expect(page.getByRole('heading', { name: 'Where will this happen?' })).toBeVisible();
  });
}

test('contact offers the questions and the box that answers, and no number until one is set', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('navigation', { name: 'Site' }).getByRole('link', { name: 'Contact' }).click();
  await expect(page).toHaveURL(/\/contact$/);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Got a question, need more information, or want to book?');
  await expect(page.locator('body')).not.toContainText(/0\d{2}[\s-]?\d{3}[\s-]?\d{4}/);
  await expect(page.locator('body')).not.toContainText(/\+27/);
  await page.getByLabel(/explain what you need/i).fill('can we do it on a Saturday?');
  await page.getByRole('button', { name: 'Answer Me' }).click();
  await expect(page.getByRole('heading', { name: 'Can we do it on a Saturday?' })).toBeVisible();
  await page.getByRole('link', { name: 'Answer The Questions' }).click();
  await expect(page.getByRole('heading', { name: 'Where will this happen?' })).toBeVisible();
});
