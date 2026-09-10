import { priceFor, formatZar } from './prices';

const PLACEHOLDER = /\{\{price:([a-z0-9_]+)\}\}/g;

export function renderBody(body: string): string {
  return body.replace(PLACEHOLDER, (_, key: string) => formatZar(priceFor(key).amountZar));
}
