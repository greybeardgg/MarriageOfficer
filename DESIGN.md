---
name: Ryan Hogarth Marriage Officers
description: A document that gets stamped, not a form that gets filled, set on the brand palette (charcoal, grey, slate, aqua) in Montserrat and Nunito Sans; square corners, ink as material.
colors:
  white: "#FFFFFF"
  neutral-100: "#F4F5F6"
  slate-100: "#EEF3F5"
  slate-200: "#D7E0E5"
  hairline: "#D5D7D8"
  charcoal: "#57585B"
  grey: "#6C6D70"
  grey-light: "#929497"
  slate: "#465B69"
  slate-deep: "#2E3F4A"
  slate-700: "#3A4D5A"
  slate-900: "#233039"
  aqua-deep: "#3F8E97"
  aqua-200: "#D3EBEE"
  aqua: "#91CCD2"
  state: "#3F4042"
  neutral-200: "#E7E9EA"
typography:
  headline:
    fontFamily: "Montserrat, 'Helvetica Neue', Arial, sans-serif"
    fontSize: "clamp(2.125rem, 5.6vw, 3.75rem)"
    fontWeight: 200
    lineHeight: 1.02
    letterSpacing: "-.024em"
  question:
    fontFamily: "Montserrat, 'Helvetica Neue', Arial, sans-serif"
    fontSize: "clamp(2rem, 5.2vw, 3.5rem)"
    fontWeight: 300
    lineHeight: 1.08
    letterSpacing: "-.018em"
  side-plate:
    fontFamily: "Montserrat, 'Helvetica Neue', Arial, sans-serif"
    fontSize: "clamp(1.75rem, 3.4vw, 2.875rem)"
    fontWeight: 300
    lineHeight: 1.08
    letterSpacing: ".012em"
  plate:
    fontFamily: "Montserrat, 'Helvetica Neue', Arial, sans-serif"
    fontSize: "1.875rem"
    fontWeight: 300
    lineHeight: 1.08
    letterSpacing: ".012em"
  title:
    fontFamily: "Montserrat, 'Helvetica Neue', Arial, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 500
    lineHeight: 1.3
    letterSpacing: "-.012em"
  body:
    fontFamily: "Nunito Sans, \'Segoe UI\', Arial, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.62
    letterSpacing: "normal"
  label:
    fontFamily: "Montserrat, 'Helvetica Neue', Arial, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: ".14em"
  data:
    fontFamily: "Nunito Sans, \'Segoe UI\', Arial, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "-.01em"
    fontFeature: "tnum 1"
  stamp-overline:
    fontFamily: "Montserrat, 'Helvetica Neue', Arial, sans-serif"
    fontSize: "0.625rem"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: ".18em"
  stamp-footline:
    fontFamily: "Nunito Sans, 'Segoe UI', Arial, sans-serif"
    fontSize: "0.5625rem"
    fontWeight: 400
    lineHeight: 1.2
    letterSpacing: ".08em"
rounded:
  none: "0"
spacing:
  s-1: "4px"
  s-2: "8px"
  s-3: "12px"
  s-4: "16px"
  s-5: "24px"
  s-6: "32px"
  s-7: "48px"
  s-8: "64px"
  s-9: "88px"
  s-10: "120px"
  gutter: "clamp(20px, 4vw, 56px)"
components:
  action-ink:
    backgroundColor: "{colors.slate}"
    textColor: "{colors.white}"
    rounded: "{rounded.none}"
    padding: "17px 30px"
    typography: "{typography.label}"
  action-ink-hover:
    backgroundColor: "{colors.slate-deep}"
    textColor: "{colors.white}"
  action-ruled:
    backgroundColor: "transparent"
    textColor: "{colors.charcoal}"
    rounded: "{rounded.none}"
    padding: "17px 30px"
    typography: "{typography.label}"
  action-ruled-hover:
    backgroundColor: "{colors.neutral-100}"
    textColor: "{colors.charcoal}"
  action-quiet:
    backgroundColor: "transparent"
    textColor: "{colors.grey}"
    padding: "6px 0"
    typography: "{typography.label}"
  option-row:
    backgroundColor: "transparent"
    textColor: "{colors.charcoal}"
    rounded: "{rounded.none}"
    padding: "16px 16px 16px 12px"
  option-row-hover:
    backgroundColor: "{colors.neutral-100}"
    textColor: "{colors.charcoal}"
  option-row-chosen:
    backgroundColor: "{colors.slate-200}"
    textColor: "{colors.charcoal}"
  field:
    backgroundColor: "{colors.neutral-100}"
    textColor: "{colors.charcoal}"
    rounded: "{rounded.none}"
    padding: "15px 16px"
    typography: "{typography.data}"
    width: "100%"
  side-legal:
    backgroundColor: "{colors.slate}"
    textColor: "{colors.white}"
    rounded: "{rounded.none}"
    padding: "32px"
    typography: "{typography.side-plate}"
  side-ceremony:
    backgroundColor: "{colors.aqua-deep}"
    textColor: "{colors.white}"
    rounded: "{rounded.none}"
    padding: "32px"
    typography: "{typography.side-plate}"
  clause-note:
    backgroundColor: "transparent"
    textColor: "{colors.state}"
    rounded: "{rounded.none}"
    padding: "0 0 0 16px"
    typography: "{typography.data}"
  stamp-registration:
    backgroundColor: "transparent"
    textColor: "{colors.slate}"
    rounded: "{rounded.none}"
    padding: "12px 15px 10px"
  stamp-ceremony:
    backgroundColor: "transparent"
    textColor: "{colors.aqua-deep}"
    rounded: "{rounded.none}"
    padding: "12px 15px 10px"
  stamp-state:
    backgroundColor: "transparent"
    textColor: "{colors.state}"
    rounded: "{rounded.none}"
    padding: "12px 15px 10px"
  stamp-slot:
    backgroundColor: "transparent"
    textColor: "{colors.grey}"
    rounded: "{rounded.none}"
    padding: "12px 15px 10px"
  draft-tag:
    backgroundColor: "{colors.grey}"
    textColor: "{colors.white}"
    rounded: "{rounded.none}"
    padding: "3px 6px 2px"
---

# Design System: Ryan Hogarth Marriage Officers

## Overview

**Creative North Star: "The Quiz"**

The stamping is a visual device, never a vocabulary. The interface says
"answered", the record counts questions answered, and the officer's own round
mark says "Registered". The word "endorsed" appears nowhere a visitor can read
it and must not be reintroduced.

This is a document that gets stamped, not a form that gets filled. The ground is
white under a faint drawn guilloche rosette, and everything set on it
behaves like something a registry would recognise: hairline rules instead of cards,
perforated tear lines instead of section breaks, tick boxes lettered A, B, C, corner
mounts holding photographs down, and stamps that land with pressure and bleed.
Every answer a visitor gives prints a stamp onto a spine running down the
edge of the page, so the questions assemble a document rather than advancing a
stepper. The result screen is that document, completed, read as numbered clauses.

Density is high and deliberately unpadded: text sits close to its rules, measures are
short (34-68ch), and the only generous space is between parts. Colour does not
decorate; it commits. Nothing on the front door asks the visitor to choose a branch:
question one is already on the page, a free-text box answers from the library before
any question at all, and the two sides of the business are shown at the foot of the page
in a band headed "We Do Both" that carries no controls. Since 13 September 2026 the
door opens on a banner: the owner's own photographs (the hands as the ground, the
certificate as an affixed print over it) with the mark itself on a paper-toned foot, and the current site's menu in the chrome above it. Both sides still
take a whole flat ink field at poster scale, because the business is genuinely two
jobs and neither may read as the secondary one; what changed on 12 September 2026 is
that the fields state the work instead of offering it. The confirmed rejections are
a wedding photograph as the whole first viewport (a short banner carrying the name is
not that, and was restored by the owner on 13 September 2026), the govtech stepper,
cream and white grounds, and any borrowing of state insignia: no coat of arms, no state green, no official reference
numbers. The mark is held at the top of every screen so this page is never mistaken
for a Home Affairs page.

This world replaced the previous charcoal/aqua system on 11 September 2026, and on
13 September 2026 Ryan brought that system's palette and faces back into it: the
page is white, the inks are slate, aqua and state grey from his palette, headings
are Montserrat and body is Nunito Sans. The world's grammar (rules, perforations,
tick boxes, corner mounts, stamps on a spine) is unchanged. WCAG 2.2 AA is the one
constraint the open slate did not lift, and it shaped real values in this build:
the ink-bleed filter's alpha floor, the pale-on-ink blend switch, and the choice of
a mid-dark paper rather than a light one.

**Key Characteristics:**
- A white ground under a faint drawn guilloche; every colour from the brand palette
- Three inks from the palette (slate, aqua, state grey), each owning a role that is enforced
- Ink as material: real displacement filters, pressure, and slight misregistration
- Square corners everywhere; there is no radius scale
- Rules and perforations instead of cards and containers
- Measured annotation: every number sets in tabular mono beside the prose
- One continuous record spine: the document's own edge
- A whole ink field is a statement; affordance is carried by rules and plates

## Colors

The brand palette Ryan supplied on 13 September 2026 ("Marriage Officer colour
palette", sampled from the lockup): charcoal, grey, slate and aqua, plus the
neutral ramp. Nothing outside it appears on the page. The page is white; the
old white ground and the slate, aqua and state grey inks are gone.

### Primary
- **Slate** (#465B69, slate-600): the registration side of the business and the
  primary accent. It fills the "Register A Marriage" field, prints registration
  stamps and the officer's round mark, and carries the primary action, the caret,
  the focus ring and the option-row highlight. Slate-800 (#2E3F4A) is its hover;
  slate-200 (#D7E0E5) is the soft text on its field and the pressed state of a row.

### Secondary
- **Aqua** (#91CCD2, the ring in the lockup) is a seasoning, never a surface: it
  rules the current menu entry and tints text selection. Its deep step, **aqua-700**
  (#3F8E97), prints every ceremony stamp's border and label. Its pale step,
  **aqua-200** (#D3EBEE), is the "Have A Wedding" field, with slate-900 (#233039)
  and slate-700 (#3A4D5A) as the text on it. Aqua never carries reading text on
  white: a stamp's value is always charcoal.

### Tertiary
- **State grey** (#3F4042, neutral-800): the statutory and the unsettled. It tints
  the Home Affairs part of the result document (on neutral-200, #E7E9EA), numbers
  its clauses, prints the non-SA-status stamp, and sets the qualifier under a
  conditional answer in the ask box. It appears nowhere else.

### Neutral
- **White** (#FFFFFF): the page. **Neutral-100** (#F4F5F6): option rows on hover,
  field interiors, the margin inside an affixed print. **Slate-100** (#EEF3F5):
  the result document's head band, the spine channel, corner mounts.
- **Hairline** (#D5D7D8, neutral-300) draws what only separates. **Grey**
  (#6C6D70, neutral-600) draws what bounds a control (tick boxes, field strokes,
  the ruled action) and is also the body text colour; **charcoal** (#57585B) is
  every heading and every stamp value. Grey-light (#929497) is never small text.

### Named Rules
**The Three Inks Rule** stands with new inks: slate is registration, aqua is
ceremony, state grey is the state and the unsettled. An ink never appears on a
surface whose meaning it does not own.

**The Whole Field Rule** stands: an ink at scale takes the whole surface. The
registration field is dark (slate, white text); the ceremony field is light
(aqua-200, slate text). One dark and one light, never two tints in a row.

**The Palette Rule.** Every colour on the page is a token from the supplied
palette. `scripts/contrast.mjs` reads the tokens out of `app/globals.css` and
asserts eighteen pairs (fourteen text at 4.5:1, four boundary and focus at 3:1);
run it after any palette edit, it exits non-zero on failure.

## Typography

**Headings and eyebrows:** Montserrat (with Helvetica Neue, Arial, sans-serif),
thin and tracked, always uppercase: 200 for the headline, 300 for questions,
plates, side titles, stamp values and the officer's name, 500 for eyebrows and
clause headings (the one heading step set in sentence case). Never bold.
**Body and UI:** Nunito Sans (with Segoe UI, Arial), 400 for prose, 600 for
option labels, 700 for actions and the letter in a tick box. Counts, dates and
amounts are Nunito Sans with lining tabular figures (`.data`); there is no
monospace. **Lockup only:** Nunito Sans 400 sets "Marriage Officers" under the
wordmark, because that line is part of the logo, not of the type system.
`font-synthesis-weight` is off, so weights are real or absent.

### Hierarchy
- **Headline** (Montserrat 200, clamp 1.875-3rem, 1.12, +.06em, uppercase): the
  result document's title (capped at 2.125rem, weight 300, because it is a
  sentence) and the team page's title.
- **Question** (Montserrat 300, clamp 1.625-2.625rem, 1.16, +.06em, uppercase):
  one per step screen; on the door it is stepped down to 1.5rem.
- **Side plate** (Montserrat 300, clamp 1.5-2.375rem, +.1em, uppercase): the two
  sides of the "We Do Both" band.
- **Plate** (Montserrat 300, 1.5rem, +.1em, uppercase): part headings, the band
  heading; stamp values at 500.
- **Clause heading** (Montserrat 500, 1.25rem, 1.35, sentence case): the one
  heading that is a question in a sentence.
- **Body** (Nunito Sans 400, 1.0625rem, 1.62, grey on white): all prose, held to
  a 68ch measure.
- **Label** (Montserrat 500, 0.75rem, +.14em, uppercase): the eyebrow, stamp
  labels, spine headings, the band's foot line.
- **Action** (Nunito Sans 700, 0.9375rem, Title Case as written): every button.
- **Data** (Nunito Sans, tabular lining figures): step counts, sequence numbers,
  dates, amounts, stamp footers.

### Named Rules
**The Two Faces Rule.** Montserrat sets headings and eyebrows and nothing else;
Nunito Sans sets everything a visitor reads or operates. Neither ever does the
other's job (Ryan, 13 September 2026).

**The Measured Annotation Rule** stands: every number the visitor is asked to
trust sets in tabular figures beside the prose.

**The Stamp Lettering Rule** stands: the two smallest steps (0.625rem overline,
0.5625rem footline) exist only inside a stamp and the Draft tag.

## Layout

A centred document shell (max 1320px, or 940px narrow) with a fluid gutter
(clamp 20px-56px). The spacing rhythm is a 4px-based scale running 4, 8, 12, 16, 24,
32, 48, 64, 88, 120px; the last two steps separate parts of the document and nothing
else.

Three page grammars ship. The **door** is a banner (clamp 220-360px high, edge to
edge, the name bottom-left and the affixed certificate print right) and then a
single-column stack: the introduction centred, then a 7:5 split ruled down the
middle (question one with its nine provinces in a compact three-by-three grid on the
left, the box that answers on the right), and the "We Do Both" band with the
every-couple line beneath it. The record spine is not on the door; it appears from
the second question on.
The **team** page is the result document's part grammar reused: a province per part,
officers as ruled rows, a corner-mounted print beside the two we hold photographs of. The **step** is a
two-column grid (content plus a 268px spine), one question per screen, vertically
centred between a top bar and a footer, at a minimum height of `100vh - 77px` so a
question always owns its viewport. The **result document** is a tinted head band, then
a single-column body of parts separated by 120px, then a two-up aside (officer and
open question) and a two-up close.

The spine is sticky at 24px from the top on desktop. Below 1040px it stops being a
column: on a step it becomes a horizontal, scroll-snapping stamp strip pinned above
the question, carrying a 40px right-edge mask fade
(`mask-image: linear-gradient(to right, currentColor calc(100% - 40px), transparent)`)
so a scrolled record reads as more-to-come rather than as cut-off text. At the same
width the door collapses to a single ordered column (head, tear, record, question,
ask, sides) and its compact tally folds to two lines so the record never pushes the
question past the fold. The band's two sides stack below 860px and their print height
drops to 240px. Clause number gutters narrow from 58px to 40px below 640px, and the
chrome note disappears below 560px.

### Named Rules
**The One Spine Rule.** Every question and every answer is pinned to the document's
own edge. Progress is read from the stamps accumulating on that spine; this system
has no progress bar, no percentage and no dot stepper.

**The One Question Rule.** A question screen carries exactly one question and its
answers. Imagery never appears on a question screen; photographs belong to the front
door and the result document only.

**The No Fork At The Door Rule.** The front door does not ask the visitor to choose a
branch before it has given them a reason to prefer one. The first question is on the
page, the ask box answers before any question, and the path falls out of the answers.
Anything that shows the shape of the business sits below the question and states
rather than offers.

## Elevation & Depth

This is a flat, ruled system. Depth comes from tonal layering of the paper (paper,
lift, deep, sink) and from hairline rules, not from stacked surfaces. Exactly one
shadow exists in the build, and it is physical rather than decorative: a photograph
sits slightly proud of the page. It is ambient, no-offset and heavily
negative-spread. Nothing else in this system casts a shadow. The counter lift that
was the second shadow left with the counter buttons on 12 September 2026, and its
absence is now a rule rather than an omission: see the Statement, Not An Affordance
Rule.

### Shadow Vocabulary
- **Affixed print** (`box-shadow: 0 10px 26px -18px rgba(24, 22, 20, .55)`): a
  photograph resting on the page inside its paper margin. The only shadow in the
  system.

### Named Rules
**The Ink-Is-Material Rule.** Ink is rendered as material, not as a vector sticker.
Stamps pass through `#ink-bleed` (feTurbulence + feDisplacementMap) and multiply
into the paper grain; large marks that carry no critical text use `#ink-bleed-soft`
at a heavier displacement. The alpha floor in `#ink-bleed` is fixed at 0.88
specifically so a stamped word still clears AA against the paper: lowering it to
make a mark look more worn is a contrast regression, not a style choice.

**The Pale Impression Rule.** A light ink struck onto a dark field switches the blend
mode to normal (`.impression-pale`); multiply would erase it. Any new stamp on an ink
field must carry the pale tone and the pale class together, as the round `Registered`
mark on the legal side of the band does.

**The Flat Document Rule.** Surfaces are flat at rest. Depth is tonal: an option row
on hover goes to the raised leaf, a chosen row goes to pressed, a result head band
goes to the tinted band. No surface gains a shadow to show state.

## Shapes

Square corners throughout, at every scale, with no exceptions and no radius scale:
`border-radius: 0` is set explicitly on actions, fields and the focus outline, and
nothing in the build declares a radius. This is the system's strongest single form
rule and it is what makes the paper read as paper.

Form language is drawn, not styled. Rules are 1px hairlines (2px carbon under a part
or band heading, which is the only heavy rule). Tear lines are real SVG dashed strokes
(`1.5 6` dasharray) that carry no intrinsic width, so a perforation can never widen
its grid track. Photographs are held by four drawn triangular corner mounts inside a
7px paper margin and a strong-rule hairline. Stamps are a 1.5px border plus a 1px
outline at 3px offset, rotated between -2.6 and +2.2 degrees from a deterministic
table so the same stamp never jumps between renders; empty slots are the same shape
in a dashed hairline. The officer's round mark is two concentric rings (2.5px and 1px)
with the name curved inside them. Tick boxes are 26px squares carrying a letter
(A, B, C) in the data face. A conditional note is bounded on one edge only, by a 1px
state grey rule down its left side. The one drawn glyph set is a hand-sized stroked arrow
at 1.5-1.75px, used for the nib, the tick and the back control.

### Named Rules
**The Square Corner Rule.** Nothing in this system is rounded. If a surface needs
softening, it gets a wider paper margin or a lighter rule, never a radius. The
officer's round mark is a drawn object printed on the page, not a rounded surface,
and it is not a licence for one.

**The Drawn-Not-Styled Rule.** Perforations, corner mounts, the guilloche, the round
mark and the tick are drawn in SVG with real geometry. They are never approximated
with dotted borders, gradients or background images.

## Components

### Buttons
- **Shape:** Perfectly square (0 radius), 1px border box, uppercase condensed
  Montserrat at 0.75rem, +.1em tracking.
- **Primary ("ink"):** slate field, paper text, 17px 30px padding. Hover deepens
  the field to slate-deep; active nudges 1px down over 90ms; disabled drops to 40%.
- **Secondary ("ruled"):** transparent with a strong-rule border and carbon text.
  Hover fills with the raised leaf and darkens the border to carbon.
- **Tertiary ("quiet"):** borderless label-weight text in softened carbon with a
  drawn arrow, 6px vertical padding. Hover goes to carbon. Used for Back only.
- **Focus:** a 2px slate outline at 3px offset, square. On an ink field the focus
  ring switches to paper via `.on-ink`.

### Inputs / Fields
- **Style:** raised-leaf interior, 1px strong-rule stroke, square, 15px 16px padding.
  Single-line fields set in the data face because their content is data; textareas
  switch to the serif at 1.55 leading and resize vertically only, because what a
  visitor writes in the ask box is a sentence, not a value.
- **Focus:** border goes slate and a 2px slate outline sits at 2px offset.
- **Placeholder:** softened carbon at 80% opacity. Caret is slate.

### Cards / Containers
There are no cards. Content is grouped by ruling: a top and bottom hairline, a heavy
carbon rule under a part or band heading, or a tinted band that bleeds to the gutter.
The one container-like surface is a side of the "We Do Both" band, and it is an ink
field rather than a card: no radius, no shadow, no hover.

### Navigation
A single chrome strip, 76px minimum height, paper ground with a hairline bottom edge:
the mark at 146px wide on the left linking home, one label-set line on the right that
disappears below 560px. There is no menu, no sticky behaviour and no second level.

### Option List (signature)
A document's option list: ruled rows, never cards. Each row is a three-column grid
(26px lettered tick box, text, 18px arrow) separated by hairlines, with a hairline
above the first. On hover the row's background lifts to the raised leaf, the box and
text step 10px to the right, the box border and letter take the row's ink, and the
arrow fades in; the rule itself never moves, so the row steps forward off a fixed
line. A chosen row sits on the pressed tone with its box filled in ink. Hover motion
is on transforms of the row's contents only, never on layout properties.

### We Do Both Band (signature)
The foot of the front door: a plate heading over a 2px carbon rule, then two ink
fields of equal width and equal weight. Each is an `<article>` with its own heading,
a serif line at a 36ch measure, a label-set foot line divided by a 42%-mixed pale
rule, and a corner-mounted photograph at the bottom. The legal side is slate and
carries the officer's round pale `Registered` mark; the ceremony side is aqua and
spends that band on a taller print instead, so the two fields carry equal content
weight either way. Print height is a token, not a literal: `--art-h` is 230px on the
legal side and 366px on the ceremony side, both dropping to 240px below 860px.
Nothing in the band is interactive. It does not lift, it does not change the cursor,
and it takes no focus; it shows what the business does while the questions decide
which half the visitor is in.

### Ask Box (signature)
The other way in, sitting between question one and the band behind an "Or Tell Us"
perforation. A question-scale `<label>`, a note in softened carbon at a 52ch measure,
a three-row serif textarea and an ink action reading "Answer Me". Answers return in
place into a polite live region that takes focus: settled answers under a plate
heading with a mono count, then conditional ones under their own heading, then a
hairline-topped close that offers the questions. An empty match says so in prose
rather than showing a zero-state graphic. Results render as the same numbered clauses
the result document uses, so the front door and the finished document share one unit.

### Conditional Note (signature)
The qualifier on an answer that is not settled yet: serif at 0.9375rem in state
state grey, with a 1px state grey rule down its left edge and 16px of padding, at a 58ch
measure, sitting under the clause it qualifies. Its clause number takes state grey too.
This is the one place state grey appears outside the Home Affairs part of the result
document, and it is consistent rather than an exception: it says the same thing, that
the answer depends on the state or on facts we do not have yet. State grey on the paper
ground measures 8.75:1.

### Stamp (signature)
The stamp. A tilted, outlined impression carrying a label, a value in plate
lettering, and a footer reading `Answered · No.NN` in the data face. Three sizes
(sm/md/lg) and three inks selected by role; `tone="pale"` prints it in the field's
light ink for stamping onto an ink ground. A stamp is clickable when it can reopen
its question, and carries a screen-reader sentence saying so. An unfilled slot is the
same silhouette in a dashed hairline reading `Awaiting · No.NN`.

### Affixed Print (signature)
A photograph affixed to the page: raised-leaf mount, 7px margin, strong-rule
hairline, four drawn corner mounts in the tinted band tone, optional label-set
caption that takes its colour from the ground it is fixed to (softened carbon on
paper, the field's pale ink on an ink field). Prints may be tilted a fraction of a
degree. Photographs are the client's own, never stock and never invented couples.

### Clause (signature)
The result document's unit, and the ask box's: a two-column row with a zero-padded
sequence number in the data face and a body of serif heading plus text at a 62ch
measure, separated by hairlines with the last rule suppressed. Rand amounts inside
the prose switch to tabular mono at 0.94em. An unconfirmed clause carries a small
solid `Draft` tag in softened carbon, and an optional conditional note under its text.

### Motion
One grammar: exponential ease-out (`cubic-bezier(.16, 1, .3, 1)`) at 180ms for state
and 340ms for the press. Two authored moments exist and no others: **the stamp press**
(scale 1.38 to 0.965 to 1.0 while holding its tilt, over 340ms) and **the leaf turn**
(14px rise and fade, 300ms, on each new question). Everything else is a settle. All
animation and transition collapse to 1ms under `prefers-reduced-motion: reduce`.

### Browser Surfaces
The parts nobody drew still carry the design: selection is slate-pale on carbon,
caret and accent-color are slate, the focus ring is a square 2px slate outline,
and both scrollbar syntaxes are themed (thin, strong-rule thumb on a tinted-band
track, 11px, with a 3px track-coloured border and a carbon-soft hover).

## Do's and Don'ts

### Do:
- **Do** give each ink its meaning and keep it: slate #8A2B34 registration, aqua
  #12514E ceremony, state grey #413268 the state and the not-yet-settled.
- **Do** commit colour as a whole field with knocked-out type when it is used at
  scale, rather than as an accent on paper.
- **Do** keep a poster-scale ink field non-interactive: if it is a whole field it is
  a statement, and any action inside it is a separate plate at ordinary scale.
- **Do** set every number, date, amount and count in Nunito Sans with tabular figures with tabular figures.
- **Do** keep every corner square (0 radius), including on inputs, actions and focus
  rings.
- **Do** group content with a 1px hairline (#B9B4A0), a 2px carbon rule under a part
  or band heading, or a tinted band: the ways a document groups things.
- **Do** draw any line that bounds a control in the strong rule (#827B6C), not the
  hairline, and run `node scripts/contrast.mjs` after touching the palette.
- **Do** draw perforations, corner mounts, the round mark and the guilloche as real
  SVG geometry.
- **Do** run stamps through `#ink-bleed` with its 0.88 alpha floor intact, and use
  `.impression-pale` whenever light ink lands on a dark field.
- **Do** animate row contents by transform on hover and leave the rule in place.
- **Do** return an answer into a polite live region and move focus to it, the way the
  ask box does, when a surface answers in place.
- **Do** theme the browser's own surfaces (selection, caret, focus, scrollbars) from
  this palette on any new surface.
- **Do** keep the mark at the top of every screen.

### Don't:
- **Don't** use state grey for anything other than the state or an explicitly unsettled
  answer, and don't mix an ink into a surface whose meaning it does not own.
- **Don't** make a whole ink field clickable, hoverable or liftable. That was the
  front door's counter buttons, and they were deleted on 12 September 2026 for asking
  a choice before the page had earned one.
- **Don't** fork the visitor at the door: no path-choice screen and no "which are
  you" gate before the first question.
- **Don't** introduce a border radius, anywhere, at any size.
- **Don't** use white or cream as a ground, a card, a field interior or a photo mount.
- **Don't** put a card, a panel or a raised container into this system; rule it
  instead.
- **Don't** add shadows. The one shadow here is physical (a print resting on paper)
  and no second one is needed; state is shown tonally.
- **Don't** set Montserrat in sentence case or use it for prose, and don't set Nunito Sans
  in uppercase.
- **Don't** add a kicker or eyebrow above a heading. This system has no kicker style
  and the previous `Eyebrow` component was deleted on purpose; a heading stands on
  its own or gains a label-set line that is genuinely a caption or a stamp label.
- **Don't** put photography on a question screen: contrast at small sizes over
  imagery is the documented failure of the previous system.
- **Don't** borrow state insignia: no coat of arms, no state green, no official-looking
  reference numbers.
- **Don't** add a second easing curve, a bounce, or a third authored animation; the
  grammar is one exponential ease-out with the press and the leaf.
- **Don't** lower the ink-bleed alpha floor below 0.88 or thin the type to make a
  stamp look more worn. WCAG 2.2 AA at small sizes is binding.
- **Don't** lighten the strong rule (#827B6C) back toward the hairline on a tick box,
  a field, a print border or the perforation; that is the SC 1.4.11 regression this
  build already corrected once.
- **Don't** set any text below the 0.5625rem stamp footline, and don't use the two
  stamp steps outside a stamp or the `Draft` tag.
- **Don't** replace the spine with a progress bar, a percentage or a dot stepper.
