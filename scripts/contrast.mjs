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
  ['body text on paper', token('carbon'), paper, 4.5],
  ['secondary text on paper', token('carbon-soft'), paper, 4.5],
  ['secondary text on the tinted band', token('carbon-soft'), deep, 4.5],
  ['oxblood text on paper', token('oxblood'), paper, 4.5],
  ['teal text on paper', token('teal'), paper, 4.5],
  ['violet on its own band', token('violet'), token('violet-pale'), 4.5],
  ['violet qualifier on paper', token('violet'), paper, 4.5],
  ['body text on the violet band', token('carbon'), token('violet-pale'), 4.5],
  ['knocked-out text on oxblood', paper, token('oxblood'), 4.5],
  ['knocked-out text on teal', paper, token('teal'), 4.5],
  ['pale text on oxblood', token('oxblood-pale'), token('oxblood'), 4.5],
  ['pale text on teal', token('teal-pale'), token('teal'), 4.5],
  ['UI boundary: tick box and field on paper', token('rule-strong'), paper, 3],
  ['UI boundary: tick box on the raised leaf', token('rule-strong'), lift, 3],
  ['focus ring on paper', token('oxblood'), paper, 3],
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
