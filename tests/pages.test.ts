import { describe, it, expect } from 'vitest';
import { CONTENT_PAGES } from '@/src/site/pages';
import { CONTACT, displayNumber, hasContact, whatsappLink } from '@/src/site/contact';

const everyWord = (p: (typeof CONTENT_PAGES)[number]) =>
  [p.headline, ...p.lede, ...p.sections.flatMap(s => [s.title, ...s.body]), ...p.testimonial.quote, p.close, p.meta.description].join(' ');

describe('the content pages', () => {
  it('keeps the addresses the live site already uses', () => {
    expect(CONTENT_PAGES.map(p => p.slug)).toEqual(['marriage-registrations', 'wedding-ceremonies', 'same-sex-weddings']);
  });

  it('carries no phone number and no email address in its copy', () => {
    for (const p of CONTENT_PAGES) {
      const text = everyWord(p);
      expect(text).not.toMatch(/0\d{2}[\s-]?\d{3}[\s-]?\d{4}/);
      expect(text).not.toMatch(/\+27/);
      expect(text).not.toMatch(/[\w.+-]+@[\w-]+\.\w+/);
      expect(text.toLowerCase()).not.toContain('whatsapp');
    }
  });

  it('gives every page a headline, a testimonial with a name and place, and a photograph with alt text', () => {
    for (const p of CONTENT_PAGES) {
      expect(p.headline.length).toBeGreaterThan(10);
      expect(p.sections.length).toBeGreaterThan(1);
      expect(p.testimonial.quote.length).toBeGreaterThan(0);
      expect(p.testimonial.name).toBeTruthy();
      expect(p.testimonial.place).toBeTruthy();
      expect(p.art.alt.length).toBeGreaterThan(20);
    }
  });

  it('says the same number of years the front door says', () => {
    const ceremonies = CONTENT_PAGES.find(p => p.slug === 'wedding-ceremonies')!;
    expect(everyWord(ceremonies)).toContain('25 years');
    expect(everyWord(ceremonies)).not.toContain('20 years');
  });
});

describe('the business contact details', () => {
  it('shows nothing until a number is set', () => {
    expect(CONTACT.phone).toBeNull();
    expect(CONTACT.whatsapp).toBeNull();
    expect(hasContact()).toBe(false);
    expect(hasContact({ phone: '27110000000', whatsapp: null })).toBe(true);
  });

  it('formats a South African number for reading and for WhatsApp', () => {
    expect(displayNumber('27112345678')).toBe('+27 11 234 5678');
    expect(whatsappLink('27 82 123 4567')).toBe('https://wa.me/27821234567');
  });
});
