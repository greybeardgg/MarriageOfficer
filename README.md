# Marriage Officer: front door sandbox

The guided front door and the situation page, built standalone so it can be
lifted into the main app. Everything under `src/` is pure TypeScript with no
database: swap `src/answers/library.ts`, `src/answers/prices.ts` and
`src/officers/officers.ts` for tables and the rest carries across.

- `bun run dev` – local
- `bun run test` – logic tests (Vitest)
- `bun run e2e` – walk the flow in a browser (Playwright)

Design: `../marriage officer/docs/superpowers/specs/2026-09-04-answer-library-and-site-design.md`

## For Christa and Cameron

Sandbox: https://s375kl2brd0yjsk6xo5texqr.fra.prisma.build

Pages: `/` the front door (banner, introduction, Start The Quiz, the box that
answers), `/team` the twelve officers, `/plan?…` the assembled situation. `/?start`
opens straight onto question one.

To publish, run `bun run publish`. Credentials live in `.deploy.env` in the
repo root, two lines: `PRISMA_APP_ID=` and `PRISMA_SERVICE_TOKEN=`. That file
is git-ignored: never commit it or share it. Running `bun run deploy` on its
own, without `--publish`, is a dry run: it checks everything but uploads
nothing.

Every answer on the page is a **draft** and carries a DRAFT tag. Read them
as if you were the couple. What is wrong, what is missing, what does not
sound like us? Say so; nothing here is final.

Drafts are shown only when `NEXT_PUBLIC_SHOW_DRAFTS=true` is set at build time; the sandbox sets it, production will not.

Two options Ryan asked for on 13 September 2026: **a ceremony only** (a fourth
service; the legal questions are skipped and the price clause is a draft to confirm)
and **choose your officer** (asked only where the province has more than one).

Prices are in `src/answers/prices.ts`, in one place. Officers and their
locations are in `src/officers/officers.ts` with no contact details on
purpose. The answers are in `src/answers/library.ts`.

Cameron: `src/` has no framework dependency and no database. `select.ts`
is the situation → answers function from the spec (10.3); `triggers.ts`
is the deterministic stand-in for the reader (10.5); `assign.ts` is the
province rule that your app replaces with real assignment.
