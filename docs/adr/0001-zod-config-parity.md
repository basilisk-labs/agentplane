# ADR 0001: Config Zod Parity Baseline

## Status

Accepted

## Date

2026-04-19

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
5. `packages/core/package.json` still declares `ajv` and `ajv-formats` even though the current
   source tree no longer imports them from `packages/core/src/**`.

## Decision

Treat config schema migration as functionally complete for runtime validation and move the next
guardrail to regression prevention rather than dual-validator coexistence.

We add `scripts/diff-config-schemas.mjs` to compare representative config fixtures through:

- the runtime adapter path (`validateConfig()`), and
- the raw Zod schema path (`AgentplaneConfigSchema.safeParse(...)` after deprecated-key sanitization).

This script becomes the baseline audit for future config changes until AJV dependencies are fully
removed from package manifests.

## Consequences

### Positive

1. The repository now has an executable audit proving that config runtime behavior is derived from
   the Zod source of truth.
2. The plan can stop treating `config.ts` as a second validator and instead focus on remaining
   migration residue.

### Negative

1. `ajv` and `ajv-formats` are still stale dependencies in `packages/core/package.json`.
2. Error-message parity is checked only for a representative fixture set, not exhaustive generated
   cases.

## Follow-up

1. Retarget the next config migration task toward dependency cleanup and schema-surface export
   consolidation instead of a non-existent runtime cutover.
2. Remove stale AJV dependencies after confirming no package-level or release-path consumers still
   depend on them.
