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

1. **No path choice at the door** (Ryan, 12 September 2026, reversing the decision
   of 11 September). The front door used to split into two large counters,
   registering a marriage and having a wedding, and the visitor picked one before
   anything had been asked. That is a fork in front of someone who has not been
   given a reason to prefer either branch, and it cost a decision before the page
   had earned one. The path now falls out of the answers: the service question is
   answered on its way through like any other. Both kinds of work are still shown
   on the front door, in the "We Do Both" band, but nothing there is a control.
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

## Decisions taken with Ryan, 13 September 2026

8. **A banner hero returns, with Ryan's own photographs.** The front door
   opens on a banner, smaller than the old site's, carrying the name in type
   ("Ryan Hogarth / Professional Marriage Officers") and a menu above it, as
   the current site does. Two photographs were supplied: a pale close-up of
   two hands with rings (the 2017 site background, its old lockup painted out
   because the lockup has since changed) and the certificate with rings and a
   pen. They are combined: the hands are the ground, the certificate is an
   affixed print pinned over the right of it. This revises the 11 September
   rejection of "the wedding-photo hero": the rejection was of a wedding
   photograph as the whole first viewport; a short banner with the name on it
   is a different thing and is the owner's call.
9. **The menu is the current site's**, less the pages this rebuild does not
   have: Home, Marriage Registration, Wedding Ceremonies, Same-Sex Weddings,
   Our Team, Contact. The three middle entries land on the "We Do Both" band
   and the every-couple line beneath it; Our Team is a new ruled list of the
   twelve officers at `/team`; Contact lands on the box that answers.
   Testimonials, Gallery, Blog and FAQ are not carried: nothing may be invented
   for them (PRODUCT.md, Evidence on Hand).
10. **Ryan's introduction, verbatim and centred**, with no headline above it
    (the "Two Different Jobs" line is gone, Ryan, later the same day). Beneath
    it, question one itself, the nine provinces in a compact three-by-three
    grid, beside the box: "Or explain what you need in the box below and we'll
    answer it right here". There is no Start button and no "Two Ways In" rule.
    The first answer takes the page over; Back off question two lands on the
    door again. The banner carries the lockup Ryan supplied (the rings
    wordmark from the current site with "Marriage Officers" set beneath it
    between two rules), and the chrome carries the same lockup small; the
    older PROFESSIONAL MARRIAGE OFFICERS lockup is no longer shown. The
    province question lost its note line at Ryan's request.
11. **A ceremony only.** A fourth service: the couple are already married or
    are registering elsewhere, so nothing is signed or lodged and none of the
    legal questions are asked. The service question therefore moves to second,
    because it decides which questions follow. Its price clause is a draft
    that assumes ceremony pricing without the legal part; Ryan and Christa
    confirm it.
12a. **The brand palette and faces** (Ryan, 13 September 2026, evening): the
    oxblood, teal and violet inks and the security-paper ground are replaced by
    slate, aqua and state grey on white, from the supplied palette; Montserrat for
    headings and eyebrows, Nunito Sans for all body and UI text. Faustina survives
    only as the lockup's "Marriage Officers" line.
12. **Choose your officer.** Where the province has more than one officer
    (Gauteng, Western Cape), a question offers no preference first and then
    each officer by name and place. A named officer is honoured, appears in the
    summary line ("with Lara Thomas"), and the plate says "Your choice" rather
    than "Nearest to you". Elsewhere the question is skipped.

## Direction contract

**THESIS:** The front door is a document that gets stamped, not a form that gets
filled. It refuses the wedding-photo hero and the govtech stepper alike, and it asks
nothing of the visitor before it starts being useful: the first question is on the
page, and a free-text box answers from the library before any question at all. Every
answer prints a stamp the visitor can see, re-read and change.

**OWN-WORLD (revised 13 September 2026):** White ground under a faint guilloche.
Every colour is a token from Ryan's brand palette: slate `#465B69` owns registration
and the primary action, aqua (`#3F8E97` for stamps, `#D3EBEE` as the ceremony field,
`#91CCD2` as a seasoning) owns ceremony, state grey `#3F4042` is reserved for the
state and the unsettled. Charcoal `#57585B` for headings, grey `#6C6D70` for body.
Montserrat, thin and tracked, for every heading and eyebrow; Nunito Sans for
everything read or operated. Square corners, hairline rules, perforated edges,
corner-mounted photographs, and stamp impressions that misregister, vary in pressure
and bleed into the paper grain.

**STORY:** The visitor is asked nothing before the page starts being useful. Ryan's
introduction says who we are, and a box beside the Start The Quiz button answers
whatever they type straight from the library, qualifying anything it cannot settle
yet. They start the Quiz, answer three to seven questions, watch their own document
assemble stamp by stamp, and read their entire process, price and document list
before anyone asks their name. Which of the two kinds of work they need falls out of
those answers; it is never a fork at the door. Then they book.

**FIRST VIEWPORT (13 September 2026):** The chrome: the mark left, the menu
right. Then the banner: the hands photograph edge to edge under a paper-toned foot,
the mark at the left, the certificate print corner-mounted over the right. Beneath
it Ryan's two paragraphs, centred. Then, ruled off, question one on the left (the
nine provinces in three rows of three, compact) and the box that answers on the
right. The record spine appears from the second question on.

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

Second to it: the free-text box answers before it asks. Whatever a visitor types is
matched against the answer library and answered on the page, with the record still
reading zero answered. Anything the library cannot settle without knowing more says
what it still depends on, in the state's own violet, rather than pretending to apply.

## Structural consequence

The question order, since 13 September 2026: place, service, then nationality,
non-SA status where it applies and prior marriage (all three skipped for a ceremony on
its own), then officer where the province offers a choice, then date. Service sits
second because it decides which questions follow; it is one question among the
others, never a fork at the door. `src/answers/ask.ts` is pure, so the free-text route
lifts into the main app with the rest of `src/`; so do `visibleQuestions`,
`choicesOf` and the officer rule in `src/officers/assign.ts`.

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
