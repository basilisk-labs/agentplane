# ADR 0005: Defer Biome Migration

## Status

Accepted

## Date

2026-04-20

## Context

The refactor roadmap considered replacing ESLint and Prettier with Biome. Biome is faster and can
simplify formatting and lint setup, but Agentplane currently relies on ESLint behavior beyond basic
formatting.

Current enforcement includes:

1. `eslint` over `packages`, `scripts`, `eslint.config.cjs`, and `vitest.config.ts`.
2. Prettier formatting as a separate check.
3. Import, Node, Promise, Unicorn, and repository-specific lint rules.
4. Snapshot and generated-document checks that assume stable formatting.

## Decision

Do not migrate to Biome during the 0.3.x refactor.

Keep ESLint and Prettier as the canonical lint/format stack until Biome can replace the repository's
effective rule coverage without weakening architecture, import, Node runtime, or style checks.

## Consequences

### Positive

1. Existing lint semantics stay stable while larger runtime and build refactors continue.
2. No broad formatting churn is introduced into already large refactor branches.
3. Current ESLint-only architecture and import checks remain enforceable.

### Negative

1. Lint and format checks remain slower than a possible Biome-only stack.
2. The repository continues to maintain two tools instead of one.

## Revisit Criteria

Reconsider Biome when all are true:

1. Biome covers the repository's required import sorting, Node, Promise, and Unicorn-equivalent
   checks or those checks are replaced by another enforced boundary tool.
2. A trial branch shows no unacceptable generated-doc or snapshot churn.
3. Local and CI timing improves enough to justify the migration cost.

## Follow-up

1. Keep dependency-cruiser or equivalent boundary tooling separate from any future formatter choice.
2. Revisit after the current refactor roadmap is no longer moving core file boundaries daily.
