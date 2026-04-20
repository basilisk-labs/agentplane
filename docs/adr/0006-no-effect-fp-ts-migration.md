# ADR 0006: No Effect or fp-ts Migration

## Status

Accepted

## Date

2026-04-20

## Context

Agentplane runtime code is written in pragmatic TypeScript with explicit async functions, typed
domain helpers, and command-level error mapping. The refactor roadmap considered whether a
functional effects stack such as Effect or fp-ts should be introduced while runtime systems are
being decomposed.

## Decision

Do not migrate Agentplane to Effect, fp-ts, or another functional effects framework during this
refactor cycle.

Keep the current imperative TypeScript style and improve it through smaller modules, typed
boundaries, Zod schemas, structured errors, and focused registries.

## Consequences

### Positive

1. Refactor work remains incremental and reviewable.
2. Contributors do not need to learn a new effects abstraction while core modules are moving.
3. Runtime behavior, error handling, and test fixtures remain close to existing code.

### Negative

1. Agentplane does not gain a uniform effect runtime for cancellation, dependency injection, or
   typed error channels.
2. Some async orchestration patterns will continue to rely on local conventions.

## Revisit Criteria

Reconsider an effects framework only if all are true:

1. Multiple runtime subsystems show repeated defects caused by ad hoc async orchestration.
2. A prototype demonstrates lower complexity in a real module, not only in isolated examples.
3. Migration can be staged without rewriting command handlers, testkit fixtures, and runner
   adapters at the same time.

## Follow-up

1. Prefer smaller internal abstractions such as `runProcess`, registries, and structured errors.
2. Use ADRs for any future dependency that changes the programming model of the repository.
