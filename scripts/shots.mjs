import { chromium } from '@playwright/test';
import { mkdirSync } from 'node:fs';

const BASE = process.env.SHOT_BASE ?? 'http://localhost:3311';
const OUT = '.impeccable/review';
mkdirSync(OUT, { recursive: true });

const PLAN = '/plan?p=western_cape&n=one_non_sa&ns=temporary_visa&m=divorced&s=registration&d=not_yet';

const VIEWPORTS = [
  { tag: 'desktop', width: 1440, height: 900 },
  { tag: 'mobile', width: 390, height: 844 },
];

/** Settle entrance motion before capturing, so animation timing never reads as a missing element. */
async function settle(page) {
  await page.waitForLoadState('networkidle').catch(() => {});
  // Walk the page so lazily loaded images decode; an unloaded image in a
  // full-page capture reads as a missing element and gets "fixed" into a bug.
  await page.evaluate(async () => {
    const step = Math.round(window.innerHeight * 0.8);
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise(r => setTimeout(r, 90));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForFunction(() => Array.from(document.images).every(i => i.complete && i.naturalWidth > 0), null, { timeout: 15000 }).catch(() => {});
  await page.evaluate(() => Promise.all(document.getAnimations().map(a => { a.finish(); return a.finished.catch(() => {}); })));
  await page.evaluate(() => document.fonts.ready);
  // A stylesheet that failed to load renders a plausible-looking page that
  // proves nothing. Refuse the capture rather than review it.
  const styled = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
  if (styled !== 'rgb(230, 228, 217)') throw new Error('stylesheet did not apply, body background is ' + styled);
  await page.waitForTimeout(320);
  await page.evaluate(() => window.scrollTo(0, 0));
}

const shots = [
  {
    name: 'front-door',
    async run(page) {
      await page.goto(BASE + '/');
      await settle(page);
    },
  },
  {
    name: 'asked',
    async run(page) {
      await page.goto(BASE + '/');
      await page.getByLabel(/explain what you need/i).fill('my fiance is Zimbabwean and on a work visa, and I was divorced');
      await page.getByRole('button', { name: 'Answer Me' }).click();
      await settle(page);
    },
  },
  {
    name: 'question',
    async run(page) {
      await page.goto(BASE + '/');
      await page.getByRole('button', { name: 'Start The Quiz' }).click();
      await page.getByRole('button', { name: 'Gauteng' }).click();
      await page.getByRole('button', { name: /Just the legal registration/ }).click();
      await page.getByRole('button', { name: 'One of us is' }).click();
      await settle(page);
    },
  },
  {
    name: 'question-service',
    async run(page) {
      await page.goto(BASE + '/');
      await page.getByRole('button', { name: 'Start The Quiz' }).click();
      await page.getByRole('button', { name: 'Gauteng' }).click();
      await settle(page);
    },
  },
  {
    name: 'question-officer',
    async run(page) {
      await page.goto(BASE + '/');
      await page.getByRole('button', { name: 'Start The Quiz' }).click();
      await page.getByRole('button', { name: 'Gauteng' }).click();
      await page.getByRole('button', { name: /Just the legal registration/ }).click();
      await page.getByRole('button', { name: 'Yes, both of us' }).click();
      await page.getByRole('button', { name: 'No', exact: true }).click();
      await settle(page);
    },
  },
  {
    name: 'plan',
    async run(page) {
      await page.goto(BASE + PLAN);
      await settle(page);
    },
  },
  {
    name: 'plan-ceremony-only',
    async run(page) {
      await page.goto(BASE + '/plan?p=gauteng&s=ceremony_only&o=christa&d=soon');
      await settle(page);
    },
  },
  {
    name: 'team',
    async run(page) {
      await page.goto(BASE + '/team');
      await settle(page);
    },
  },
];

const browser = await chromium.launch();
for (const vp of VIEWPORTS) {
  const ctx = await browser.newContext({ viewport: { width: vp.width, height: vp.height }, deviceScaleFactor: 1 });
  for (const shot of shots) {
    const page = await ctx.newPage();
    try {
      await shot.run(page);
      const file = `${OUT}/${vp.tag === 'desktop' && shot.name === 'front-door' ? 'desktop' : vp.tag === 'mobile' && shot.name === 'front-door' ? 'mobile' : `${vp.tag}-${shot.name}`}.png`;
      await page.screenshot({ path: file, fullPage: true });
      console.log('wrote', file);
    } catch (err) {
      console.error('FAILED', vp.tag, shot.name, err.message);
    }
    await page.close();
  }
  await ctx.close();
}
await browser.close();
