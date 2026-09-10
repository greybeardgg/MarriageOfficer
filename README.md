# Marriage Officer: front door sandbox

The guided front door and the situation page, built standalone so it can be
lifted into the main app. Everything under `src/` is pure TypeScript with no
database: swap `src/answers/library.ts`, `src/answers/prices.ts` and
`src/officers/officers.ts` for tables and the rest carries across.

- `bun run dev` – local
- `bun run test` – logic tests (Vitest)
- `bun run e2e` – walk the flow in a browser (Playwright)

Design: `../marriage officer/docs/superpowers/specs/2026-09-04-answer-library-and-site-design.md`
