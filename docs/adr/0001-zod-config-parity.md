# ADR 0001: Config Zod Parity Baseline

## Status

Accepted

## Date

2026-04-19

## Supersession

2026-04-21: AJV was removed from the config validation stack. The temporary
`scripts/diff-config-schemas.mjs` audit is retired and deleted; config validation now relies on
the Zod source of truth and the generated schema sync check.

## Context

The v2 refactor plan assumed that `packages/core/src/config/config.ts` still hosted an AJV-based
runtime validator while `packages/core/src/config/config-zod.ts` introduced a parallel Zod schema.
That assumption is no longer true in the 0.3.15 repository state.

## Facts

1. `packages/core/src/config/config.ts` imports `AgentplaneConfigSchema` from
   `packages/core/src/config/config-schema.ts`, which is a thin re-export of `config-zod.ts`.
2. `validateConfig()` already validates with `AgentplaneConfigSchema.safeParse(...)`.
3. `loadConfig()` and `saveConfig()` are runtime adapters around the schema, not independent
   schema sources.
4. `scripts/sync-schemas.mjs` already renders `config.schema.json` from the Zod schema.
5. The temporary AJV-vs-Zod parity audit is no longer needed after AJV dependency cleanup.

## Decision

Treat config schema migration as functionally complete for runtime validation and move the next
guardrail to regression prevention rather than dual-validator coexistence.

The original baseline added `scripts/diff-config-schemas.mjs` to compare representative config
fixtures through:

- the runtime adapter path (`validateConfig()`), and
- the raw Zod schema path (`AgentplaneConfigSchema.safeParse(...)` after deprecated-key sanitization).

That audit was intentionally temporary. After AJV removal, the script is retired rather than kept as
a second config validation path.

## Consequences

### Positive

1. The repository now has an executable audit proving that config runtime behavior is derived from
   the Zod source of truth.
2. The plan can stop treating `config.ts` as a second validator and instead focus on remaining
   migration residue.

### Negative

1. Error-message parity was checked only for a representative fixture set during the transition, not
   exhaustive generated cases.

## Follow-up

1. Retarget future config work toward schema-surface export consolidation and generated artifact
   freshness, not AJV parity.
