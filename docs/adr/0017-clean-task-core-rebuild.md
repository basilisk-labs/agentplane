---
title: "ADR 0017: Clean Task Core Rebuild"
description: "Build a side-effect-free canonical Task kernel behind compatibility adapters, then migrate and cut over with replay evidence."
---

## Status

Proposed on 2026-08-29.

## Context

Agentplane has a useful task-centric domain model, but canonical behavior is still split across the
core model, legacy compatibility conversion, backend adapters, task commands, runner code, task
documents, and provider lifecycle code. In particular,
`packages/agentplane/src/adapters/task-backend/task-centric-backend-runtime.ts` still creates a
synthetic aggregate when canonical state is absent. This permits legacy fields and canonical state
to participate in the same runtime decision.

The existing Clean Core roadmap decomposes this problem into many small tasks. That preserves
individual requirements but makes the dependency chain sensitive to repairs in the legacy
controller that the roadmap intends to retire.

## Decision

Build the replacement in four gated milestones:

1. Specify the kernel, code map, invariants, migration oracle, and legacy-task traceability.
2. Implement a new pure internal Task kernel without filesystem, Git, process, provider, clock, or
   projection dependencies.
3. Add explicit persistence, CLI, migration, projection, validation, and provider adapters. Compare
   their results with an exact replay corpus and fail closed on unknown legacy input.
4. Cut all production consumers over to the canonical kernel, qualify crash recovery and
   self-hosting, and remove production legacy lifecycle implementations.

The public CLI and task document format remain compatibility surfaces during the first three
milestones. The 0.7.8 patch release remains a separate maintenance lane. Clean Core cutover does not
rewrite or publish 0.7.8.

## Kernel boundary

The kernel accepts immutable state, a typed command, explicit time and identity inputs, and an
authority envelope. It returns either typed domain events and new state or a typed rejection. It
does not read or write storage and does not perform external effects.

Adapters own persistence, Git, workspaces, process execution, provider calls, documents, legacy
input, and user interaction. Legacy input may enter only through migration. Production routing may
not synthesize canonical state from legacy fields after cutover.

## Consequences

### Positive

1. Kernel behavior can be exhaustively tested and replayed without a repository or provider.
2. Migration mismatches become observable before production cutover.
3. Existing CLI behavior can remain stable while internal authority is replaced.
4. Legacy roadmap requirements remain traceable without keeping dozens of competing ready tasks.

### Negative

1. Compatibility adapters temporarily add code and require dual-path qualification.
2. Cutover cannot proceed until repository-wide replay and crash recovery gates pass.
3. Unknown legacy layouts block migration instead of being repaired heuristically.

## Rejected alternatives

### Rewrite the complete product

Rejected because the CLI, provider integrations, context system, release tooling, and testkit contain
substantial working behavior unrelated to the canonical Task state problem. Reimplementing them
would enlarge the regression surface without strengthening the kernel contract.

### Continue only with the original task chain

Rejected as the primary execution strategy because it repeatedly repairs the legacy control path
before the replacement boundary is established. The tasks remain audit evidence and are mapped to
the new milestones.

### Replace the existing Task and WorkItem ontology

Rejected. The replacement keeps Task, TaskPlanRevision, WorkItemGraph, WorkItem, execution
authority, validation, and domain-event concepts. It consolidates their authority and ownership.

## Rollback

Before cutover, rollback removes the new adapters and kernel module while preserving the existing
runtime. During cutover, rollback requires an exact migration receipt, the prior canonical bytes,
the implementation identity, and proof that no unclassified provider effect occurred. After legacy
production paths are deleted, rollback is a release rollback to the last qualified implementation,
not an in-place conversion back to mutable legacy state.

## Follow-up

The implementation contract, code map, replay corpus, migration algorithm, milestone gates, and
legacy task mapping are defined in
[Clean Task Core rebuild specification](../reference/clean-task-core-rebuild-spec.mdx).
