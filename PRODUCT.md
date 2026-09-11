# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

**Primary: a person arranging a marriage in South Africa.** The demand is
paperwork, not weddings: 77% of website enquiries are Marriage Registration
and only 11% are a Wedding Ceremony. 84% are couples where both partners are
South African; 13% have at least one non-South African partner and face the
hardest process (2.1% conversion against 6.9% for both-SA). 66% are in
Gauteng. They arrive uncertain about what the process even is, what is
included, and what the state does versus what an officer does. Half of them
write nothing in the message box, and those who write more than 25 words
convert at 8.3% against 5.2% for those who write nothing.

**Secondary, real and named: the people who run it.** Ryan Hogarth (owner and
officiant), Christa (operations), Cameron (developer), and twelve registered
marriage officers working across twelve locations. Their work happens inside
`app.marriageofficer.co.za`: leads, bookings, invoices, payments and a
WhatsApp inbox. Their screens are part of the product, but the enquirer's
experience decides design questions when the two conflict.

## Product Purpose

Marriage Officer helps people get legally married in South Africa: marriage
registrations (at home or at an office), wedding ceremonies, and the Home
Affairs interview that some couples need. The product being built is a
rebuild of www.marriageofficer.co.za that folds in the automation added over
two years and puts an answer library at its centre, so that a person can
learn what their own situation requires before speaking to anyone.

Success is that an enquirer understands their own process and books, rather
than leaving to work it out elsewhere. The measured baseline: trackable form
conversion rose from 4.9% (2022) to 7.4% (2025). Only 39% of the 3,439 won
customers trace back to a form, so segment differences are reliable and the
absolute rate is not.

## Positioning

**Give first, no gate.** The answer to the visitor's situation is shown before
any contact details are asked for. This is the deliberate opposite of the
enquiry-form-first site it replaces, and it is the mechanism a neighbouring
officiant site could not copy without also building the answer library behind
it.

**Explain the Home Affairs relationship, never compare against it.** Every
customer who argues about price names the same alternative: Home Affairs,
free. The confirmed defect is clarity, not price level. The product explains
what the state does and what an officer does; it does not position itself as
a competitor to the state.

**One source, three outlets.** The website, the email templates and the
WhatsApp templates all draw from the same answer library, so a person gets the
same answer whichever door they came through.

## Operating Context

- **The app is the system of record.** `app.marriageofficer.co.za` is a Next.js
  application holding leads, bookings (PENDING / CONFIRMED / EXPRESS_CONFIRMED
  / PAID / CANCELLED), invoices numbered with officer initials, payments, a
  Meta WhatsApp Cloud API inbox, twelve officers, twelve locations, five
  service types, and PDF templates for invoice, booking and certificate.
- **The public site becomes part of that app.** The WordPress site is the only
  thing currently outside it, embedding the enquiry form as an iframe. It
  retires. Agreed rule: one machine.
- **This repository is the front-door sandbox.** A guided button step-through
  (province, then nationality, then non-SA status where it applies, then
  married before, then service, then date) leading to an assembled situation
  page at `/plan`. Everything under `src/` is pure TypeScript with no
  database, so the logic lifts into the main app. Answers are DRAFT and
  tagged as such; drafts appear only when `NEXT_PUBLIC_SHOW_DRAFTS=true` at
  build time.
- **Customers arrive by WhatsApp and email as much as by the site.** Reply
  speed is not a problem: 96% of first WhatsApp replies are within an hour.
- **Switch-over is a single event.** Nothing goes live until it is fully
  tested. Ryan builds look and flow, Cameron makes it work, sandboxed before
  release.

## Capabilities and Constraints

- **Western Cape must route to a booking, never a phone number.** This is the
  product's largest confirmed defect and its correction is structural. Of
  3,477 Western Cape enquirers, 12 were won (0.35%) against Gauteng's 8.54%,
  despite the Western Cape being answered *better* (46% human reply against
  25%, median 2.0 hours against 21.5). The cause is a hand-off: 1,386 of the
  1,607 answered enquirers were given a phone number, and 7 of them ever came
  back. Lara Thomas is already a registered officer with the location
  "WC - Lara"; she must be bookable the way other officers already are.
- **No officer contact details are exposed.** `src/officers/officers.ts`
  carries no phone numbers or email addresses, on purpose.
- **Document upload is out of version 1.** Agreed by Ryan, Christa and Cameron
  on 9 September 2026, for three reasons: the printing burden, POPIA storage
  obligations, and the attack surface.
- **POPIA applies.** The app already carries deletion and audit handling;
  personal client data (the email and WhatsApp archives) is worked on locally
  and never published.
- **Prices appear on the site, but never without their value.** A price is
  always shown next to what it includes.
- **Same-sex marriage is a marketing statement, not a separate flow.** All
  officers are Civil Union officers.
- **Confirmed bookings must write to a shared Google Workspace calendar.**
  In scope; Ryan: "must solve".
- **Payments are PayFast plus manual EFT.** Email templates live in the
  database per step and per officer, sent via SendGrid; WhatsApp templates
  live on Meta and are mirrored in the database per location, with a keyword
  and button flow builder.
- **Terminology.** "Marriage registration" is the paperwork; "wedding
  ceremony" is the event; "express" is a price option, not a service type;
  the Home Affairs interview is a consequence of nationality, not a product
  the customer chooses.
- **Open decisions, not yet made:** Form System 2.0 (v1 has four forms, v2 is
  empty, mid-migration); whether the front door keeps the button step-through
  shape after Cameron's prototype is reviewed.

## Brand Commitments

Only three things below are binding. The visual system is deliberately open:
see the note at the end of this section before treating any colour, typeface
or styling rule as a constraint.

- **Name, and the logo, are fixed.** Ryan Hogarth Marriage Officers. The mark
  is supplied at `design-system/assets/` as `logo-white.svg`,
  `logo-charcoal.svg`, `logo-slate.svg` and a full-colour PNG. New visual
  directions are built around the existing mark. Redesigning it is out of
  scope: it appears on invoices, booking confirmations, certificates, and
  inside `app.marriageofficer.co.za`, so changing it is a business project
  rather than a design decision.
- **Voice is fixed.** Warm professional, South African and UK spelling, "we"
  and "you", Title Case headings and calls to action, sentence case body.
  Answer first, then qualify. Name the worry, then remove it. Dry humour once
  per screen. Never: magical, dream day, fairytale, big day, bespoke,
  seamless, journey. No emoji anywhere.
- **"Human and heartfelt" is the first principle** (Christa, 9 September 2026).
  This governs tone and treatment of the customer, whatever the visual
  direction turns out to be.

**The visual system is open, by Ryan's decision of 11 September 2026.** The
quiz front door is being designed from a blank slate: colour, typography,
spacing, radii, motion, photography treatment and iconography are all free
choices, and no existing value constrains them.

The previous system is evidence and reference material, not authority. It is
recorded in the Claude Design project "Ryan Hogarth Marriage Officers Design
System" and imported at `design-system/` in this repository: charcoal, grey
and slate `#465B69` with aqua `#91CCD2` as an accent, thin tracked uppercase
Montserrat for display with Nunito Sans for body, near-square radii, hairline
borders, and documentary photography. Read it to understand what has been
shipped and what it did not solve. Do not treat it as a floor, a ceiling, or a
starting point, and do not split the difference between it and a new
direction.

## Evidence on Hand

- **A two-year archive, analysed.** 252,249 email messages (2017-2026,
  24,661 two-way customer threads) from `marriageofficerinfo@gmail.com`, plus
  35,615 WhatsApp messages across 5,031 conversations (June 2025 to August
  2026). Findings in the `analysis/` folder of
  `J:\Claude\Marriage Officer Mail & whatsapp data\`. Personal client data:
  local only, never published.
- **A replay test over 24,052 de-identified archive enquiries** runs against
  the situation logic in this repository.
- **1,361 messages across 1,120 threads are people asking where their
  certificate or registration is.** The strongest self-service case in the
  data, and not yet built.
- **Real officers, locations and service types** exist in the app and are
  mirrored in `src/officers/officers.ts`.
- **Approved written spec** at
  `docs/superpowers/specs/2026-09-04-answer-library-and-site-design.md`,
  revised after the 9 September 2026 meeting
  (`meeting/2026-09-09-meeting-notes.md`), both in the data folder.
- **Absent, and not to be invented:** testimonials, customer names, review
  scores, press coverage, photographs of real couples, and any claim about
  volumes or success rates beyond the figures recorded above.

## Product Principles

1. **Answer before you ask.** The visitor's own situation is explained first;
   contact details are earned, never gated.
2. **The paperwork is the product.** Design for the person registering a
   marriage, not the wedding the old site pictured.
3. **Every route ends in a booking.** No phone number, no hand-off, no exit
   that the system cannot see.
4. **Clarity is the price answer.** Show what is included beside what it
   costs; never argue against Home Affairs.
5. **One source, three outlets.** Site, email and WhatsApp say the same thing
   because they read the same library.

## Accessibility & Inclusion

Target: **WCAG 2.2 AA.** This is the one constraint the open visual slate does
not lift, and it is a real one: the previous system failed to make it easy,
because thin light-grey type over photography is the natural shape of this
brief and the natural enemy of a contrast ratio. Any new direction must clear
the bar at small sizes and over imagery, not only in a headline.

Behaviour already honoured in the built front door, and expected of whatever
replaces it: reduced-motion handling, managed focus between steps, and a live
region announcing step changes.

Inclusion facts that are product truth, not styling: all officers are Civil
Union officers and same-sex couples are served by the same flow; couples where
one partner is not South African are 13% of demand on the most difficult
process and must not be treated as an edge case.
