"""Build fixtures/enquiries.csv from the archive. De-identified: no names, no
contact details, no free text. Run once from the repo root with Python 3.11:
    py -3.11 scripts/extract-enquiries.py
"""
import csv, json, re, sys

SRC = r'J:\Claude\Marriage Officer Mail & whatsapp data\analysis\mail.jsonl'
OUT = 'fixtures/enquiries.csv'
FORMSTART = 'there is a new website enquiry'
F = re.compile(r'^\s*(Province|Wedding Type|Nationality of Couple)\s*:\s*(.*)$', re.I | re.M)

# Keys are normalised via normalize_prov() before lookup: lowercased, stripped,
# runs of spaces/hyphens/underscores collapsed to a single space, and a
# trailing " province" dropped. So the table only needs canonical spellings
# plus the genuinely different variants (one-word forms, "kwa zulu natal").
PROV = {
    'gauteng': 'gauteng', 'western cape': 'western_cape', 'eastern cape': 'eastern_cape',
    'kwazulu natal': 'kwazulu_natal', 'kwa zulu natal': 'kwazulu_natal', 'kzn': 'kwazulu_natal',
    'free state': 'free_state', 'freestate': 'free_state',
    'limpopo': 'limpopo', 'mpumalanga': 'mpumalanga', 'north west': 'north_west',
    'northwest': 'north_west', 'northern cape': 'northern_cape',
}
NAT = {
    'both south african': 'both_sa', 'one non-south african': 'one_non_sa',
    'both non-south african': 'both_non_sa',
}

def normalize_prov(s):
    s = re.sub(r'[-_\s]+', ' ', s.strip().lower()).strip()
    if s.endswith(' province'):
        s = s[:-len(' province')].strip()
    return s

def service_of(t):
    t = t.lower()
    if 'wedding ceremony' in t or 'ceremony at a wedding' in t: return 'wedding_ceremony'
    if 'short wedding' in t or 'small' in t: return 'small_ceremony'
    return 'registration'

def where_of(t):
    t = t.lower()
    if 'home' in t: return 'home'
    if 'office' in t: return 'office'
    return ''

rows = []
dropped_prov = 0
dropped_nat = 0
unrecognised_prov = {}
with open(SRC, encoding='utf-8') as f:
    for line in f:
        r = json.loads(line)
        b = r.get('body') or ''
        if not b[:60].lower().lstrip().startswith(FORMSTART):
            continue
        d = {k.lower(): v.strip() for k, v in F.findall(b)}
        raw_prov = d.get('province', '').strip()
        raw_nat = d.get('nationality of couple', '').strip()
        prov = PROV.get(normalize_prov(raw_prov))
        nat = NAT.get(raw_nat.lower())
        if not prov:
            dropped_prov += 1
            if raw_prov and raw_prov not in unrecognised_prov:
                unrecognised_prov[raw_prov] = True
        if not nat:
            dropped_nat += 1
        if not prov or not nat:
            continue
        wt = d.get('wedding type', '')
        rows.append((prov, nat, service_of(wt), where_of(wt), (r.get('date') or '')[:4]))

with open(OUT, 'w', encoding='utf-8', newline='') as f:
    w = csv.writer(f)
    w.writerow(['province', 'nationality', 'service', 'where', 'year'])
    w.writerows(rows)

print(f'wrote {len(rows)} rows to {OUT}', file=sys.stderr)
print(f'dropped {dropped_prov} rows (unrecognised province)', file=sys.stderr)
print(f'dropped {dropped_nat} rows (unrecognised nationality)', file=sys.stderr)
sample = list(unrecognised_prov.keys())[:20]
if sample:
    print('unrecognised province strings (sample):', file=sys.stderr)
    for s in sample:
        print(f'  {s[:40]!r}', file=sys.stderr)
