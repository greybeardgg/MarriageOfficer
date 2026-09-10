"""Build fixtures/enquiries.csv from the archive. De-identified: no names, no
contact details, no free text. Run once from the repo root with Python 3.11:
    py -3.11 scripts/extract-enquiries.py
"""
import csv, json, re, sys

SRC = r'J:\Claude\marriage officer\analysis\mail.jsonl'
OUT = 'fixtures/enquiries.csv'
FORMSTART = 'there is a new website enquiry'
F = re.compile(r'^\s*(Province|Wedding Type|Nationality of Couple)\s*:\s*(.*)$', re.I | re.M)

PROV = {
    'gauteng': 'gauteng', 'western cape': 'western_cape', 'eastern cape': 'eastern_cape',
    'kwazulu-natal': 'kwazulu_natal', 'kzn': 'kwazulu_natal', 'free state': 'free_state',
    'limpopo': 'limpopo', 'mpumalanga': 'mpumalanga', 'north west': 'north_west',
    'northwest': 'north_west', 'northern cape': 'northern_cape',
}
NAT = {
    'both south african': 'both_sa', 'one non-south african': 'one_non_sa',
    'both non-south african': 'both_non_sa',
}

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
with open(SRC, encoding='utf-8') as f:
    for line in f:
        r = json.loads(line)
        b = r.get('body') or ''
        if not b[:60].lower().lstrip().startswith(FORMSTART):
            continue
        d = {k.lower(): v.strip() for k, v in F.findall(b)}
        prov = PROV.get(d.get('province', '').strip().lower())
        nat = NAT.get(d.get('nationality of couple', '').strip().lower())
        if not prov or not nat:
            continue
        wt = d.get('wedding type', '')
        rows.append((prov, nat, service_of(wt), where_of(wt), (r.get('date') or '')[:4]))

with open(OUT, 'w', encoding='utf-8', newline='') as f:
    w = csv.writer(f)
    w.writerow(['province', 'nationality', 'service', 'where', 'year'])
    w.writerows(rows)
print(f'wrote {len(rows)} rows to {OUT}', file=sys.stderr)
