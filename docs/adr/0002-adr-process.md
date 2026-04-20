# ADR 0002: Lightweight ADR Process

## Status

Accepted

## Date

2026-04-20

## Context

The refactor roadmap now includes dependency and framework decisions with different outcomes:
accept, reject, defer, or keep frozen. Keeping those decisions only in planning notes makes them
easy to lose during later implementation tasks.

## Decision

Use `docs/adr/` as the canonical home for architecture decisions that affect package boundaries,
runtime contracts, dependency posture, build tooling, or long-lived documentation structure.

Each ADR should include:

1. Status.
2. Date.
3. Context.
4. Decision.
5. Consequences.
6. Follow-up, when applicable.

The ADR should be concise and should link to enforcement when enforcement exists.

## Consequences

### Positive

1. Dependency decisions have a stable source of truth beyond task README artifacts.
2. Later roadmap tasks can reference an ADR instead of reopening settled tradeoffs.
3. Deferred decisions can include explicit revisit criteria.

### Negative

1. ADRs add another documentation surface that can drift if updates are not tied to tasks.
2. Very small decisions may become overweight if written as full ADRs.

## Follow-up

1. Add focused ADRs for dependency decisions from the framework migration epic.
2. Link major roadmap documentation to the ADR index instead of duplicating decision text.
