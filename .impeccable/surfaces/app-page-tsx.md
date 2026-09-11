---
version: 1
slug: "app-page-tsx"
primary_target: "app/page.tsx"
related_targets: ["app/plan/page.tsx","components/front-door/StepFlow.tsx","components/plan/PlanPage.tsx"]
---

# Front door and result screen

## Scope and mode

The quiz front door (`app/page.tsx`, `components/front-door/`) and the assembled
result screen (`app/plan/page.tsx`, `components/plan/`). Visitor mode: **Persuade**.
The design is the product here: the visitor must decide and act. Operate discipline
still binds inside the step-through, because a question that is hard to answer is a
question nobody answers.

## Audience, job, action

A person arranging a marriage in South Africa, usually on a phone, usually uncertain
what the process even is. 70% of the work is legal registration; 11% of enquiries are
a wedding ceremony. The action is a booking. Nothing is gated: the answer comes before
the contact details.

## Decisions taken with Ryan, 11 September 2026

1. **Two doors of equal weight.** The front door splits deliberately into registering
   a marriage and having a wedding, rather than leading with either or hiding the
   split. Each door opens its own run of the same six questions.
2. **A short hero, then the quiz.** Not a bare question one, not a long brochure.
3. **Photography at hero and result only.** Question screens stay free of imagery:
   PRODUCT.md names thin light type over photographs as the exact failure that broke
   accessibility last time, and question screens are where contrast matters most.
4. **Wedding photography comes from the existing site** (`marriageofficer.co.za`,
   ~200 images, mostly 2560px) until higher-resolution originals are supplied.
5. **The word "endorsed" never appears in the interface** (11 September 2026).
   The stamping is a visual idea only: a stamp reads "answered", the record counts
   questions answered, and the legal counter carries the officer's round
   "Registered" mark.
6. **The visual world is called "The Quiz"** (Ryan, 11 September 2026). The
   direction assigned by seed `3d463e02` was renamed; the seed key is the link
   back to the round that produced it.
7. **The registration side gets made objects, not photographs of people:** the
   certificate, the register, the ID, the stamp, two pens on a table. Never invented
   couples.

## Direction contract

**THESIS:** The front door is a document that gets stamped, not a form that gets
filled. It refuses the wedding-photo hero and the govtech stepper alike. Two counters
of equal ink open the page because the business is genuinely two jobs, and every
answer prints a stamp the visitor can see, re-read and change.

**OWN-WORLD:** Security-paper ground `#E6E4D9` under a faint guilloche, never cream
and never white. Three inks with roles, committed as whole fields rather than accents:
oxblood `#8A2B34` owns registration, deep teal `#12514E` owns ceremony, state
violet `#413268` is reserved for the state and appears nowhere else. Carbon `#181614`
for text. Archivo in condensed caps for counters, plates and stamps; Faustina for
questions and prose; Azeret Mono for dates, reference numbers and stamps.
Square corners, hairline rules, perforated edges, corner-mounted photographs, and
stamp impressions that misregister, vary in pressure and bleed into the paper grain.

**STORY:** The visitor sees two equal doors and learns in one line that most of this
work is legal, not ceremonial. They choose a door, answer five more questions, watch
their own document assemble stamp by stamp, and read their entire process, price and
document list before anyone asks their name. Then they book.

**FIRST VIEWPORT:** A thin chrome strip, the mark left, one honest mono line right.
Headline in Faustina, "Getting Married Is Two Different Jobs", with one sentence and
one real figure beneath it. Then the two counter plates at equal width, each a full
flat ink field with knocked-out condensed caps: COUNTER 1, REGISTER A MARRIAGE, in
oxblood carrying a stamp impression; COUNTER 2, HAVE A WEDDING, in teal carrying one
corner-mounted photograph. The counters are the primary action; there is no separate
button. A perforation line runs beneath them, and the record spine is ruled and
empty down the right on desktop, a stamp strip across the top on mobile.

**FORM:** The Quiz. Candidate 6 of seven grounded directions, assigned by
the roll; seed key `3d463e02`; assigned card, code-led build (no image generation on
this machine).

**FINISH:** unreviewed and undocumented is unfinished; this build ends with the finish
review, the verdict, DESIGN.md, and every shipping raster carrying its provenance.

## Raises carried into the direction

- **From the Tanaka plane portrait:** colour commits at poster scale. Each counter
  owns a whole flat ink field, not paper with an accent on it.
- **From the mesophotic deep dive:** one continuous spine. Every question and every
  answer is pinned to the document's own edge, so depth in the process is readable
  without a progress bar.
- **From the daylight section:** measured annotation. Every answer carries its number,
  days, rand, document name, in tabular figures beside the prose.
- **From the suminagashi ink basin:** ink behaves as material. Stamps land with
  pressure, bleed and slight misregistration; never a flat vector sticker.

## Memorable moment

The stamp. Each answer prints a stamp onto the record spine, so six questions build a
document rather than filling a form, and the result screen is that document completed.
Tapping a stamp reopens its question.

## Structural consequence

The service question moves to position one and is rendered as the two counters; the
ceremony plate expands in place to offer small ceremony or full wedding. The remaining
question order is unchanged.

## Constraints that bind this surface

- WCAG 2.2 AA at small sizes and over imagery. The one thing the open visual slate did
  not lift.
- Reduced-motion handling, managed focus between steps, and a live region announcing
  step changes, all already honoured and expected of the replacement.
- No officer contact details. No testimonials, review scores, or invented figures.
- Never impersonate Home Affairs: no coat of arms, no state green, no official
  reference numbers. The document grammar is a private studio's, and the mark is held
  at the top of every screen.
- Prices always appear beside what they include.

## Unresolved

- Image generation is unavailable on this machine, so the registration-side object
  plates ship as designed slots plus a shot list. Setting `OPENAI_API_KEY`, or running
  on a harness with a native image tool, unlocks production of them.
- Real font files are still owed; Archivo, Faustina and Azeret Mono are Google Fonts.
- Western Cape must route to a booking with Lara Thomas, never a phone number. The
  result screen must never emit a phone number for any province.
