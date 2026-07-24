---
id: "202607242236-1BFWEY"
title: "Persist bounded supervisor execution episodes"
status: "TODO"
priority: "high"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on:
  - "202607221849-8YYZ9X"
  - "202607221850-DRWR0V"
  - "202607221850-R7WS01"
tags:
  - "budgets"
  - "checkpoint"
  - "code"
  - "journal"
  - "milestone-beta1"
  - "refactor"
  - "rf-10"
  - "rf-25"
  - "runner"
  - "supervisor"
  - "v0.7"
  - "wave-supervisor"
task_kind: "code"
mutation_scope: "code"
risk_flags:
  - "security"
blueprint_request: "code.branch_pr"
verify:
  - "bun run bench:agent-efficiency:check"
  - "bun run guards:check"
  - "bun run lifecycle:invariants"
  - "bun run test:critical"
  - "bun run typecheck"
plan_approval:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
  attempts: 0
commit: null
comments: []
events: []
doc_version: 3
doc_updated_at: "2026-07-24T22:36:42.252Z"
doc_updated_by: "PLANNER"
description: "Define a durable supervisor episode journal and hard execution budgets for bounded EXECUTOR to EVALUATOR to rework cycles, with deterministic checkpoints, resume without replay, stop reasons, bounded feedback deltas, and limits for episodes, agent runs, tokens, wall time, changed files, diff lines, and no-progress episodes; integrate with the typed supervisor and runner without exposing the legacy ap loop or LoopSpec surface."
sections:
  Summary: |-
    Persist bounded supervisor execution episodes

    Define a durable supervisor episode journal and hard execution budgets for bounded EXECUTOR to EVALUATOR to rework cycles, with deterministic checkpoints, resume without replay, stop reasons, bounded feedback deltas, and limits for episodes, agent runs, tokens, wall time, changed files, diff lines, and no-progress episodes; integrate with the typed supervisor and runner without exposing the legacy ap loop or LoopSpec surface.
  Scope: |-
    - In scope: Define a durable supervisor episode journal and hard execution budgets for bounded EXECUTOR to EVALUATOR to rework cycles, with deterministic checkpoints, resume without replay, stop reasons, bounded feedback deltas, and limits for episodes, agent runs, tokens, wall time, changed files, diff lines, and no-progress episodes; integrate with the typed supervisor and runner without exposing the legacy ap loop or LoopSpec surface.
    - Out of scope: unrelated refactors not required for "Persist bounded supervisor execution episodes".
  Plan: "1. Define versioned SupervisorExecutionBudget, SupervisorEpisodeJournal, cursor, usage, transition, stop, and bounded-feedback contracts with canonical digests. 2. Persist checkpoints around every supervisor operation and episode boundary so restart resumes from the first incomplete action without replaying completed agent or side-effect operations. 3. Enforce hard limits for episodes, agent runs, input/output/total tokens, wall time, changed files, diff lines, and no-progress episodes before launching the next operation; return typed terminal or human-review stops. 4. Integrate budget accounting and journal recovery with the shared typed supervisor, typed runner lifecycle results, evaluator rework work orders, StateFingerprint, execution receipts, and effect-in-doubt guards. 5. Add deterministic crash/restart, stale-state, budget-edge, no-progress, bounded-feedback, and compatibility tests plus agent-efficiency regression evidence. Do not port or expose ap loop, LoopSpec, project-local loop JSON, or a second orchestration controller."
  Verify Steps: "1. Run a direct supervised task with each budget set just below and exactly at its limit. Expected: the next agent/evaluator/side-effect operation is refused before launch, usage is durably recorded, and the typed stop identifies the exhausted dimension. 2. Crash after journal creation, operation intent, adapter completion, receipt persistence, evaluator result, feedback creation, and cursor advancement, then resume. Expected: execution continues from the first incomplete phase without replaying a completed agent run or external effect. 3. Exercise evaluator rework and repeated no-progress results. Expected: only a bounded feedback delta is placed in the next work order, progress fingerprints are deterministic, and max-no-progress terminates the cycle. 4. Change task revision, Git/provider state, authority, or StateFingerprint between checkpoints and leave an effect in doubt. Expected: resume fails closed and delegates to the existing typed stale-state/effect-resolution paths rather than consuming budget or retrying. 5. Verify human and JSON journal/status projections contain canonical budget usage, cursor, stop reason, work-order/receipt refs, and no raw transcripts or secrets. 6. Run bun run lifecycle:invariants, bun run guards:check, bun run test:critical, bun run typecheck, and bun run bench:agent-efficiency:check. Expected: all pass and quality/safety controls do not regress."
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: "- Revert supervisor budget/journal integration while preserving already persisted diagnostic records and the existing StateFingerprint, execution-receipt, and effect-in-doubt safety boundaries. - Keep the feature behind an explicit compatibility boundary until journal migration and restart tests pass. - Re-run lifecycle, guard, critical, type, and agent-efficiency checks before restoring supervised execution."
  Findings: "- The agentplane-loops runtime is design and test evidence for budgets, checkpoints, deterministic transitions, and bounded feedback only. This task must implement those properties inside the 0.7 typed supervisor and must not import the legacy public loop controller or create a second orchestration plane."
id_source: "generated"
---
## Summary

Persist bounded supervisor execution episodes

Define a durable supervisor episode journal and hard execution budgets for bounded EXECUTOR to EVALUATOR to rework cycles, with deterministic checkpoints, resume without replay, stop reasons, bounded feedback deltas, and limits for episodes, agent runs, tokens, wall time, changed files, diff lines, and no-progress episodes; integrate with the typed supervisor and runner without exposing the legacy ap loop or LoopSpec surface.

## Scope

- In scope: Define a durable supervisor episode journal and hard execution budgets for bounded EXECUTOR to EVALUATOR to rework cycles, with deterministic checkpoints, resume without replay, stop reasons, bounded feedback deltas, and limits for episodes, agent runs, tokens, wall time, changed files, diff lines, and no-progress episodes; integrate with the typed supervisor and runner without exposing the legacy ap loop or LoopSpec surface.
- Out of scope: unrelated refactors not required for "Persist bounded supervisor execution episodes".

## Plan

1. Define versioned SupervisorExecutionBudget, SupervisorEpisodeJournal, cursor, usage, transition, stop, and bounded-feedback contracts with canonical digests. 2. Persist checkpoints around every supervisor operation and episode boundary so restart resumes from the first incomplete action without replaying completed agent or side-effect operations. 3. Enforce hard limits for episodes, agent runs, input/output/total tokens, wall time, changed files, diff lines, and no-progress episodes before launching the next operation; return typed terminal or human-review stops. 4. Integrate budget accounting and journal recovery with the shared typed supervisor, typed runner lifecycle results, evaluator rework work orders, StateFingerprint, execution receipts, and effect-in-doubt guards. 5. Add deterministic crash/restart, stale-state, budget-edge, no-progress, bounded-feedback, and compatibility tests plus agent-efficiency regression evidence. Do not port or expose ap loop, LoopSpec, project-local loop JSON, or a second orchestration controller.

## Verify Steps

1. Run a direct supervised task with each budget set just below and exactly at its limit. Expected: the next agent/evaluator/side-effect operation is refused before launch, usage is durably recorded, and the typed stop identifies the exhausted dimension. 2. Crash after journal creation, operation intent, adapter completion, receipt persistence, evaluator result, feedback creation, and cursor advancement, then resume. Expected: execution continues from the first incomplete phase without replaying a completed agent run or external effect. 3. Exercise evaluator rework and repeated no-progress results. Expected: only a bounded feedback delta is placed in the next work order, progress fingerprints are deterministic, and max-no-progress terminates the cycle. 4. Change task revision, Git/provider state, authority, or StateFingerprint between checkpoints and leave an effect in doubt. Expected: resume fails closed and delegates to the existing typed stale-state/effect-resolution paths rather than consuming budget or retrying. 5. Verify human and JSON journal/status projections contain canonical budget usage, cursor, stop reason, work-order/receipt refs, and no raw transcripts or secrets. 6. Run bun run lifecycle:invariants, bun run guards:check, bun run test:critical, bun run typecheck, and bun run bench:agent-efficiency:check. Expected: all pass and quality/safety controls do not regress.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert supervisor budget/journal integration while preserving already persisted diagnostic records and the existing StateFingerprint, execution-receipt, and effect-in-doubt safety boundaries. - Keep the feature behind an explicit compatibility boundary until journal migration and restart tests pass. - Re-run lifecycle, guard, critical, type, and agent-efficiency checks before restoring supervised execution.

## Findings

- The agentplane-loops runtime is design and test evidence for budgets, checkpoints, deterministic transitions, and bounded feedback only. This task must implement those properties inside the 0.7 typed supervisor and must not import the legacy public loop controller or create a second orchestration plane.
