import { describe, it, expect } from 'vitest';
import { readFileSync, existsSync } from 'node:fs';
import { WA_PROVINCE, WA_NATIONALITY, WA_SERVICE } from '@/src/situation/whatsapp-map';

const FLOWS = '../marriage officer/meeting/whatsapp-flows-2026-09-10.json';

describe('whatsapp flow mapping', () => {
  it.skipIf(!existsSync(FLOWS))('covers every button id the live flow uses', () => {
    const d = JSON.parse(readFileSync(FLOWS, 'utf-8'));
    const ids = new Set<string>();
    for (const f of d.flows) for (const t of f.transitions) if (t.button_id) ids.add(t.button_id);
    const known = new Set([...Object.keys(WA_PROVINCE), ...Object.keys(WA_NATIONALITY), ...Object.keys(WA_SERVICE), 'pricing_details']);
    for (const id of ids) expect(known.has(id), `unmapped WhatsApp button id: ${id}`).toBe(true);
  });
});
