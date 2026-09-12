---
name: Ryan Hogarth Marriage Officers
description: A document that gets stamped, not a form that gets filled: security paper, three inks with roles, square corners, ink as material.
colors:
  paper: "#E6E4D9"
  paper-lift: "#EFEDE4"
  paper-deep: "#D8D5C7"
  paper-sink: "#CBC7B6"
  rule: "#B9B4A0"
  rule-strong: "#827B6C"
  carbon: "#181614"
  carbon-soft: "#4A463F"
  oxblood: "#8A2B34"
  oxblood-deep: "#6E202A"
  oxblood-pale: "#E8C9CC"
  teal: "#12514E"
  teal-deep: "#0D403E"
  teal-pale: "#B9D6D2"
  violet: "#413268"
  violet-pale: "#DCD7E5"
typography:
  headline:
    fontFamily: "Faustina, Georgia, 'Times New Roman', serif"
    fontSize: "clamp(2.125rem, 5.6vw, 3.75rem)"
    fontWeight: 600
    lineHeight: 1.02
    letterSpacing: "-.024em"
  question:
    fontFamily: "Faustina, Georgia, 'Times New Roman', serif"
    fontSize: "clamp(2rem, 5.2vw, 3.5rem)"
    fontWeight: 600
    lineHeight: 1.08
    letterSpacing: "-.018em"
  side-plate:
    fontFamily: "Archivo, 'Helvetica Neue', Arial, sans-serif"
    fontSize: "clamp(1.75rem, 3.4vw, 2.875rem)"
    fontWeight: 700
    lineHeight: 1.08
    letterSpacing: ".012em"
    fontVariation: "wdth 88"
  plate:
    fontFamily: "Archivo, 'Helvetica Neue', Arial, sans-serif"
    fontSize: "1.875rem"
    fontWeight: 700
    lineHeight: 1.08
    letterSpacing: ".012em"
    fontVariation: "wdth 88"
  title:
    fontFamily: "Faustina, Georgia, 'Times New Roman', serif"
    fontSize: "1.25rem"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "-.012em"
  body:
    fontFamily: "Faustina, Georgia, 'Times New Roman', serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.62
    letterSpacing: "normal"
  label:
    fontFamily: "Archivo, 'Helvetica Neue', Arial, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: ".14em"
    fontVariation: "wdth 90"
  data:
    fontFamily: "Azeret Mono, ui-monospace, 'SFMono-Regular', Menlo, monospace"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "-.01em"
    fontFeature: "tnum 1"
  stamp-overline:
    fontFamily: "Archivo, 'Helvetica Neue', Arial, sans-serif"
    fontSize: "0.625rem"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: ".18em"
    fontVariation: "wdth 90"
  stamp-footline:
    fontFamily: "Azeret Mono, ui-monospace, 'SFMono-Regular', Menlo, monospace"
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
    backgroundColor: "{colors.oxblood}"
    textColor: "{colors.paper}"
    rounded: "{rounded.none}"
    padding: "17px 30px"
    typography: "{typography.label}"
  action-ink-hover:
    backgroundColor: "{colors.oxblood-deep}"
    textColor: "{colors.paper}"
  action-ruled:
    backgroundColor: "transparent"
    textColor: "{colors.carbon}"
    rounded: "{rounded.none}"
    padding: "17px 30px"
    typography: "{typography.label}"
  action-ruled-hover:
    backgroundColor: "{colors.paper-lift}"
    textColor: "{colors.carbon}"
  action-quiet:
    backgroundColor: "transparent"
    textColor: "{colors.carbon-soft}"
    padding: "6px 0"
    typography: "{typography.label}"
  option-row:
    backgroundColor: "transparent"
    textColor: "{colors.carbon}"
    rounded: "{rounded.none}"
    padding: "16px 16px 16px 12px"
  option-row-hover:
    backgroundColor: "{colors.paper-lift}"
    textColor: "{colors.carbon}"
  option-row-chosen:
    backgroundColor: "{colors.paper-sink}"
    textColor: "{colors.carbon}"
  field:
    backgroundColor: "{colors.paper-lift}"
    textColor: "{colors.carbon}"
    rounded: "{rounded.none}"
    padding: "15px 16px"
    typography: "{typography.data}"
    width: "100%"
  side-legal:
    backgroundColor: "{colors.oxblood}"
    textColor: "{colors.paper}"
    rounded: "{rounded.none}"
    padding: "32px"
    typography: "{typography.side-plate}"
  side-ceremony:
    backgroundColor: "{colors.teal}"
    textColor: "{colors.paper}"
    rounded: "{rounded.none}"
    padding: "32px"
    typography: "{typography.side-plate}"
  clause-note:
    backgroundColor: "transparent"
    textColor: "{colors.violet}"
    rounded: "{rounded.none}"
    padding: "0 0 0 16px"
    typography: "{typography.data}"
  stamp-registration:
    backgroundColor: "transparent"
    textColor: "{colors.oxblood}"
    rounded: "{rounded.none}"
    padding: "12px 15px 10px"
  stamp-ceremony:
    backgroundColor: "transparent"
    textColor: "{colors.teal}"
    rounded: "{rounded.none}"
    padding: "12px 15px 10px"
  stamp-state:
    backgroundColor: "transparent"
    textColor: "{colors.violet}"
    rounded: "{rounded.none}"
    padding: "12px 15px 10px"
  stamp-slot:
    backgroundColor: "transparent"
    textColor: "{colors.carbon-soft}"
    rounded: "{rounded.none}"
    padding: "12px 15px 10px"
  draft-tag:
    backgroundColor: "{colors.carbon-soft}"
    textColor: "{colors.paper}"
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
security paper (#E6E4D9) under a drawn guilloche rosette, and everything set on it
behaves like something a registry would recognise: hairline rules instead of cards,
perforated tear lines instead of section breaks, tick boxes lettered A, B, C, corner
mounts holding photographs down, and stamps that land with pressure and bleed.
Every answer a visitor gives prints a stamp onto a spine running down the
edge of the page, so the questions assemble a document rather than advancing a
stepper. The result screen is that document, completed, read as numbered clauses.

Density is high and deliberately unpadded: text sits close to its rules, measures are
short (34-68ch), and the only generous space is between parts. Colour does not
decorate; it commits. Nothing on the front door asks the visitor to choose a branch:
the first question is already on the page, a free-text box answers from the library
before any question at all, and the two sides of the business are shown at the foot
of the page in a band headed "We Do Both" that carries no controls. Both sides still
take a whole flat ink field at poster scale, because the business is genuinely two
jobs and neither may read as the secondary one; what changed on 12 September 2026 is
that the fields state the work instead of offering it. The confirmed rejections are
the wedding-photo hero, the govtech stepper, cream and white grounds, and any
borrowing of state insignia: no coat of arms, no state green, no official reference
numbers. The mark is held at the top of every screen so this page is never mistaken
for a Home Affairs page.

This world replaced the previous charcoal/aqua system on 11 September 2026. That
system still sits in `design-system/` as imported reference and is not imported by
`app/globals.css`; none of its tokens are current here. WCAG 2.2 AA is the one
constraint the open slate did not lift, and it shaped real values in this build:
the ink-bleed filter's alpha floor, the pale-on-ink blend switch, and the choice of
a mid-dark paper rather than a light one.

**Key Characteristics:**
- Security-paper ground under a faint drawn guilloche, never cream and never white
- Three inks, each owning a role that is enforced, not suggested
- Ink as material: real displacement filters, pressure, and slight misregistration
- Square corners everywhere; there is no radius scale
- Rules and perforations instead of cards and containers
- Measured annotation: every number sets in tabular mono beside the prose
- One continuous record spine: the document's own edge
- A whole ink field is a statement; affordance is carried by rules and plates

## Colors

A registry palette: a warm mid-dark paper and three saturated printing inks, each
committed as a whole field rather than sprinkled as an accent.

### Primary
- **Oxblood Registration Ink** (#8A2B34): the registration side of the business. It
  fills the legal side of the "We Do Both" band as a whole field, prints registration
  stamps and the officer's round mark, and carries the primary action, the caret, the
  selection highlight and the focus ring. Its deep variant is the hover state of an
  oxblood action; its pale variant is the knocked-out prose colour when type sits on
  that field.

### Secondary
- **Ceremony Teal** (#12514E): the ceremony side. It fills the ceremony side of the
  band as a whole field and prints every ceremony stamp. It never appears on a
  registration surface, and registration never appears on a ceremony one.

### Tertiary
- **State Violet** (#413268): the statutory and the unsettled. It tints the Home
  Affairs part of the result document, rules its heading, numbers its clauses, and
  prints the nationality and non-SA-status stamps. It also numbers and annotates a
  conditional answer in the front-door ask box, where the qualifier says an answer is
  not settled until we know more. It appears nowhere else.

### Neutral
- **Security Paper** (#E6E4D9): the page ground, and the knocked-out text colour on
  any ink field.
- **Raised Leaf** (#EFEDE4): option rows on hover, field and textarea interiors, the
  margin inside an affixed print.
- **Tinted Band** (#D8D5C7): the result document's head band, the spine channel and
  the corner mounts that hold photographs.
- **Pressed** (#CBC7B6): the pressed and chosen state of an option row.
- **Hairline** (#B9B4A0) and **Strong Rule** (#827B6C): the ruling of the document.
  Hairline draws what only separates: dividers, the spine channel, the guilloche
  strokes, the empty stamp slot, the close of the ask box. Strong rule draws what
  bounds a control: tick boxes, field strokes, the ruled action's border, print
  borders, the perforation and the scrollbar thumb. The two are not interchangeable,
  and the strong rule is the darker of the pair for a measured reason (see the Ruled
  Boundary Rule).
- **Carbon** (#181614): all primary text, and the heavy 2px rule under a part or band
  heading.
- **Softened Carbon** (#4A463F): secondary text, hints, captions, counts and notes.
  Tinted toward the ground hue, never a grey.

### Named Rules
**The Three Inks Rule.** Each ink owns one meaning. Oxblood is registration, teal is
ceremony, violet is the state and the unsettled. An ink never appears on a surface
whose meaning it does not own. Violet is the narrow one and its meaning is precise:
this depends on the state, or on facts we do not have yet. That covers the Home
Affairs part of the result document, and it covers a conditional answer that cannot
be settled until the visitor has answered more, and it covers nothing else. Violet is
never a decorative third accent.

**The Whole Field Rule.** When an ink is used at scale it takes the entire surface
and the type knocks out of it. There is no paper-with-an-accent-stripe treatment;
a thing is either on paper or it is an ink field.

**The Statement, Not An Affordance Rule.** A whole flat ink field is a statement, not
a control. The two sides of the "We Do Both" band are `<article>` elements with real
headings: no hover lift, no cursor change, no focus ring, nothing to click. Affordance
in this system is carried by rules, plates and tick boxes at ordinary text scale,
never by scale or colour weight. If a new surface needs a poster-scale field and an
action, the action is a separate ruled or ink plate inside it.

**The Not Cream, Not White Rule.** The ground is #E6E4D9. Pure white and cream are
not in this system at any size, including inside photographs' mounts and inside
input fields and textareas, which use the raised leaf (#EFEDE4) instead.

**The Ruled Boundary Rule.** Any line that bounds a control rather than merely
separating content uses the strong rule (#827B6C), which measures 3.29:1 against the
paper and 3.58:1 against the raised leaf: WCAG 2.2 SC 1.4.11. Separators may stay on
the hairline (#B9B4A0), which SC 1.4.11 does not bind. `scripts/contrast.mjs` reads
these tokens straight out of `app/globals.css` and asserts fourteen pairs (eleven
text at 4.5:1, three UI-boundary and focus at 3:1); run it after any palette edit,
it exits non-zero on failure.

## Typography

**Display Font:** Faustina (with Georgia, Times New Roman, serif)
**Body Font:** Faustina (with Georgia, Times New Roman, serif)
**Label/Plate Font:** Archivo, width axis 88-90 (with Helvetica Neue, Arial, sans-serif)
**Data Font:** Azeret Mono, tabular figures (with ui-monospace, SFMono-Regular, Menlo)

**Character:** A serif that speaks and a condensed sans that stamps. Faustina carries
every sentence the business says in its own voice, at negative tracking and tight
leading so headlines read as printed matter rather than marketing. Archivo appears
only where a document would use plate lettering: band and part headings, stamps,
labels and actions, always uppercase, always condensed. Azeret Mono is not a style,
it is a measurement: it appears only where a number, date, reference or count does.
`font-synthesis-weight` is off, so weights are real or absent.

### Hierarchy
- **Headline** (Faustina 600, clamp 2.125-3.75rem, 1.02, -.024em, balanced): the
  front-door headline and the result document's title. One per page.
- **Question** (Faustina 600, clamp 2-3.5rem, 1.08, -.018em, balanced): one question
  per screen, the ask box's own prompt, and the closing ask. The step is tied to the
  role, not to the heading level: on the front door the headline is the `h1` and the
  question sets as `h2` at the same size; on every later screen the question is the
  `h1`. The ask box's prompt is a `<label>` at the same step.
- **Side plate** (Archivo 700, wdth 88, clamp 1.75-2.875rem, uppercase, +.012em): the
  two sides of the "We Do Both" band, knocked out of their ink field. Carried in the
  stylesheet by `--fs-counter`, a name left over from the deleted counter buttons.
- **Plate** (Archivo 700, wdth 88, 1.875rem, uppercase): part headings on the result
  document and in the ask box's results, the band heading, and the officer name plate.
- **Title** (Faustina 600, 1.25rem, 1.3, -.012em): clause headings, option labels.
- **Body** (Faustina 400, 1.0625rem, 1.62): all prose, held to a 68ch measure, and
  narrower where it sits beside or under something else (34-58ch).
- **Label** (Archivo 600, wdth 90, 0.75rem, uppercase, +.14em): captions, stamp
  labels, spine headings, the band's foot line, the chrome note.
- **Data** (Azeret Mono 400-500, tabular): step counts, sequence numbers, dates,
  amounts, stamp footers, officer locations.
- **Stamp overline** (Archivo 600, wdth 90, 0.625rem, uppercase, +.18em): the field
  label struck at the top of a stamp ("Service", "Place", "Nationality").
- **Stamp footline** (0.5625rem, uppercase): the stamp footer under its rule
  (`Answered · No.NN`, `Awaiting · No.NN`) in Azeret Mono at +.08em, and the solid
  `Draft` tag on an unconfirmed clause in Archivo 600 at +.16em.

### Named Rules
**The Measured Annotation Rule.** Every number the visitor is asked to trust sets in
Azeret Mono with tabular figures: rand amounts, day counts, step counts, clause
numbers, stamp sequence numbers. Prose never carries a bare number in the serif
where the mono is available.

**The Plate-Or-Prose Rule.** Archivo is only ever uppercase and only ever on a plate:
a band side, a part heading, a stamp, a label, an action. It never sets a sentence.
Faustina never sets uppercase.

**The Stamp Lettering Rule.** The two smallest steps in the ramp (0.625rem overline,
0.5625rem footline) exist only inside a stamp and the `Draft` tag, because a rubber
stamp's secondary lettering is smaller than its value. They are tracked wide (+.18em,
+.16em and +.08em) to stay legible at that size, and nothing else in the system may
go below the 0.75rem label. These are not off-ramp one-offs; going smaller still is.

## Layout

A centred document shell (max 1320px, or 940px narrow) with a fluid gutter
(clamp 20px-56px). The spacing rhythm is a 4px-based scale running 4, 8, 12, 16, 24,
32, 48, 64, 88, 120px; the last two steps separate parts of the document and nothing
else.

Two page grammars ship. The **door** is a two-column grid (content plus a 196px
channel) over five rows: head, tear, question, ask, sides. The headline, the
perforation and question one stack in the first column; the record channel runs beside
them, spanning rows one to three, because those are what it records. The ask box and
the "We Do Both" band then span both columns at full width, so the page reads as hero,
question, other way in, and finally what the business does. The **step** is a
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
violet rule down its left side. The one drawn glyph set is a hand-sized stroked arrow
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
  Archivo at 0.75rem, +.1em tracking.
- **Primary ("ink"):** oxblood field, paper text, 17px 30px padding. Hover deepens
  the field to oxblood-deep; active nudges 1px down over 90ms; disabled drops to 40%.
- **Secondary ("ruled"):** transparent with a strong-rule border and carbon text.
  Hover fills with the raised leaf and darkens the border to carbon.
- **Tertiary ("quiet"):** borderless label-weight text in softened carbon with a
  drawn arrow, 6px vertical padding. Hover goes to carbon. Used for Back only.
- **Focus:** a 2px oxblood outline at 3px offset, square. On an ink field the focus
  ring switches to paper via `.on-ink`.

### Inputs / Fields
- **Style:** raised-leaf interior, 1px strong-rule stroke, square, 15px 16px padding.
  Single-line fields set in the data face because their content is data; textareas
  switch to the serif at 1.55 leading and resize vertically only, because what a
  visitor writes in the ask box is a sentence, not a value.
- **Focus:** border goes oxblood and a 2px oxblood outline sits at 2px offset.
- **Placeholder:** softened carbon at 80% opacity. Caret is oxblood.

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
rule, and a corner-mounted photograph at the bottom. The legal side is oxblood and
carries the officer's round pale `Registered` mark; the ceremony side is teal and
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
violet, with a 1px violet rule down its left edge and 16px of padding, at a 58ch
measure, sitting under the clause it qualifies. Its clause number takes violet too.
This is the one place violet appears outside the Home Affairs part of the result
document, and it is consistent rather than an exception: it says the same thing, that
the answer depends on the state or on facts we do not have yet. Violet on the paper
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
The parts nobody drew still carry the design: selection is oxblood-pale on carbon,
caret and accent-color are oxblood, the focus ring is a square 2px oxblood outline,
and both scrollbar syntaxes are themed (thin, strong-rule thumb on a tinted-band
track, 11px, with a 3px track-coloured border and a carbon-soft hover).

## Do's and Don'ts

### Do:
- **Do** give each ink its meaning and keep it: oxblood #8A2B34 registration, teal
  #12514E ceremony, violet #413268 the state and the not-yet-settled.
- **Do** commit colour as a whole field with knocked-out type when it is used at
  scale, rather than as an accent on paper.
- **Do** keep a poster-scale ink field non-interactive: if it is a whole field it is
  a statement, and any action inside it is a separate plate at ordinary scale.
- **Do** set every number, date, amount and count in Azeret Mono with tabular figures.
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
- **Don't** use violet for anything other than the state or an explicitly unsettled
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
- **Don't** set Archivo in sentence case or use it for prose, and don't set Faustina
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
