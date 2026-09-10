import { describe, it, expect } from 'vitest';
import { PRICES, priceFor, formatZar } from '@/src/answers/prices';
import { renderBody } from '@/src/answers/render';

describe('prices', () => {
  it('has unique keys', () => {
    const keys = PRICES.map(p => p.key);
    expect(new Set(keys).size).toBe(keys.length);
  });
  it('formats rand with a thin space and no cents', () => {
    expect(formatZar(4500)).toBe('R4 500');
    expect(formatZar(900)).toBe('R900');
  });
  it('throws on an unknown key', () => {
    expect(() => priceFor('nope')).toThrow(/unknown price/);
  });
  it('fills a placeholder in a body', () => {
    expect(renderBody('It costs {{price:registration_office}}.')).toBe('It costs R4 500.');
  });
  it('throws on an unknown placeholder', () => {
    expect(() => renderBody('{{price:nope}}')).toThrow(/unknown price/);
  });
});
