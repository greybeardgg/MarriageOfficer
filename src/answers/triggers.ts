import { ANSWERS } from './library';
import type { Answer } from './types';

function normalise(s: string): string {
  return ' ' + s.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim() + ' ';
}

export function triggeredAnswers(freeText: string, answers: Answer[] = ANSWERS): Answer[] {
  const text = normalise(freeText);
  if (text.trim() === '') return [];
  const out: Answer[] = [];
  for (const a of answers) {
    const hit = a.triggers.some(t => {
      if (t.endsWith('~')) {
        // stem: match anything starting with the stem after a word boundary
        const stem = normalise(t.slice(0, -1)).trim();
        return text.includes(' ' + stem);
      }
      // whole word or whole phrase
      const n = normalise(t).trim();
      return text.includes(' ' + n + ' ');
    });
    if (hit && !out.some(x => x.id === a.id)) out.push(a);
  }
  return out;
}
