# ADR 0003: Refactor Sequencing

## Status

Accepted

## Date

2026-04-20

## Context

The v2 refactor roadmap contains schema migration, testing consolidation, hotspot decomposition,
dependency decisions, observability, documentation, build tooling, CI guardrails, and large-test
splits. Running those in simple line-count order would reduce visible hotspots but leave schema
drift and duplicated helper surfaces active.

## Decision

Sequence remaining refactor work by risk and leverage:

1. Eliminate sources of semantic drift first, especially schema and test-helper duplication.
2. Decompose runtime hotspots after drift risks are contained.
3. Add shared tooling and guardrails before large follow-up migrations rely on them.
4. Record dependency decisions in ADRs before introducing new runtime dependencies.
5. Push after each epic boundary, not after every task, while still committing every task.

## Consequences

### Positive

1. The order reduces parallel sources of truth before widening implementation scope.
2. Guardrails become available before later epics can regress the same hotspots.
3. Dependency decisions get reviewed as architecture choices rather than incidental installs.

### Negative

1. Some high-visibility large files may remain open while lower-level drift risks are closed.
2. ADR and tooling tasks can interrupt pure code decomposition flow.

## Follow-up

1. Keep task IDs tied to each epic atom so sequence changes remain visible in the task board.
2. When a task supersedes another planned atom, close the superseded task explicitly rather than
   leaving duplicate TODOs.
