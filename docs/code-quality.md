# Code quality gates (v1)

This repository targets a high-signal, strict quality baseline for the Node.js/TypeScript codebase.

The rules below are **required** for any change that touches code under `packages/**`.

## Required gates (must pass)

Run with bun:

```bash
bun install
bun run format:check
bun run lint
bun run typecheck
bun run test
bun run coverage
```

`bun run ci` is the recommended single command.

## Tests

- Any new behavior MUST include tests.
- Bug fixes MUST include a regression test.
- Tests run via `vitest` and should live next to code: `packages/<pkg>/src/**/*.test.ts`.

## Coverage

- Coverage is enforced via `vitest` with minimum thresholds in `vitest.config.ts`.
- New code SHOULD increase or maintain overall coverage.

## Linting and formatting

- ESLint is required and enforced via `eslint.config.cjs`.
- Prettier is the single source of truth for formatting.
- Do not commit formatting-only diffs mixed with behavior changes unless necessary.

## Type safety

- `strict` TypeScript is required.
- Avoid `any`. If you must, document why and keep it local.
