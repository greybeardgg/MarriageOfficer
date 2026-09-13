/**
 * Checks the shipped tokens against WCAG 2.2. Text pairs need 4.5:1 (3:1 at
 * large sizes); UI component boundaries need 3:1 under SC 1.4.11.
 * Run: node scripts/contrast.mjs
 */
import { readFileSync } from 'node:fs';

const css = readFileSync('app/globals.css', 'utf8');
const token = name => {
  const m = css.match(new RegExp(`--${name}:\\s*(#[0-9A-Fa-f]{6})`));
  if (!m) throw new Error(`token --${name} not found`);
  return m[1];
};

const lin = c => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
const lum = hex => {
  const [r, g, b] = [1, 3, 5].map(i => parseInt(hex.slice(i, i + 2), 16) / 255);
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
};
const ratio = (a, b) => {
  const [x, y] = [lum(a), lum(b)].sort((m, n) => n - m);
  return (x + 0.05) / (y + 0.05);
};

const paper = token('paper');
const lift = token('paper-lift');
const deep = token('paper-deep');

const CHECKS = [
  ['heading text on paper', token('carbon'), paper, 4.5],
  ['body text on paper', token('carbon-soft'), paper, 4.5],
  ['body text on the tinted band', token('carbon-soft'), deep, 4.5],
  ['body text on the raised leaf', token('carbon-soft'), lift, 4.5],
  ['slate ink text on paper', token('ink-legal'), paper, 4.5],
  ['aqua ink at stamp-label size on paper (large-text bar)', token('ink-ceremony'), paper, 3],
  ['state ink on its own band', token('ink-state'), token('ink-state-pale'), 4.5],
  ['state qualifier on paper', token('ink-state'), paper, 4.5],
  ['heading text on the state band', token('carbon'), token('ink-state-pale'), 4.5],
  ['knocked-out text on the slate field', paper, token('ink-legal'), 4.5],
  ['soft text on the slate field', token('ink-legal-pale'), token('ink-legal'), 4.5],
  ['text on the aqua field', token('field-ceremony-ink'), token('ink-ceremony-pale'), 4.5],
  ['soft text on the aqua field', token('field-ceremony-soft'), token('ink-ceremony-pale'), 4.5],
  ['draft tag', paper, token('carbon-soft'), 4.5],
  ['UI boundary: tick box and field on paper', token('rule-strong'), paper, 3],
  ['UI boundary: tick box on the raised leaf', token('rule-strong'), lift, 3],
  ['focus ring on paper', token('ink-legal'), paper, 3],
  ['primary action on paper', token('ink-legal'), paper, 3],
];

let failed = 0;
for (const [what, fg, bg, need] of CHECKS) {
  const r = ratio(fg, bg);
  const ok = r >= need;
  if (!ok) failed++;
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${r.toFixed(2)}:1  (needs ${need}:1)  ${what}  ${fg} on ${bg}`);
}
console.log(failed ? `\n${failed} failing pair(s)` : '\nall pairs clear WCAG 2.2 AA');
process.exit(failed ? 1 : 0);
