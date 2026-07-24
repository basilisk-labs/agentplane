---
id: "202607242236-1BFWEY"
title: "Persist bounded supervisor execution episodes"
status: "TODO"
priority: "high"
owner: "CODER"
revision: 10
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
  - "bun run schemas:check"
  - "bun run package:install-smoke"
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
doc_updated_at: "2026-07-24T22:50:15.041Z"
doc_updated_by: "PLANNER"
description: "Define a durable supervisor episode journal and hard execution budgets for bounded EXECUTOR, CURATOR, EVALUATOR, and rework cycles, with deterministic checkpoints, resume without replay, bounded feedback deltas, persisted-format migration, and limits for episodes, agent runs, tokens, wall time, changed files, diff lines, and no-progress episodes; integrate with the typed supervisor and runner without exposing the legacy ap loop or LoopSpec surface."
sections:
  Summary: |-
    Persist bounded supervisor execution episodes

    Define a durable supervisor episode journal and hard execution budgets for bounded EXECUTOR to EVALUATOR to rework cycles, with deterministic checkpoints, resume without replay, stop reasons, bounded feedback deltas, and limits for episodes, agent runs, tokens, wall time, changed files, diff lines, and no-progress episodes; integrate with the typed supervisor and runner without exposing the legacy ap loop or LoopSpec surface.
  Scope: "- In scope: one versioned journal and hard budget contract shared by direct EXECUTOR, context/CURATOR, EVALUATOR, and rework episodes; deterministic checkpoints and stop records; resume without replay; bounded feedback deltas; usage limits for episodes, agent runs, tokens, wall time, changed files, diff lines, and no-progress episodes. - In scope: canonical schema and fixtures, migrator from absent/legacy state, idempotency and rollback/recovery evidence, installed-package smoke, human/JSON status, StateFingerprint, execution-receipt, authority, and effect-in-doubt integration. - Out of scope: importing ap loop, LoopSpec, project-local programmable loop JSON, automatic loop selection, or any second orchestration controller."
  Plan: "1. Define versioned SupervisorExecutionBudget, SupervisorEpisodeJournal, cursor, usage, transition, stop, and bounded-feedback contracts with canonical digests, generated schema fixtures, and explicit persisted-format versions. 2. Add an idempotent migrator from absent and legacy journal state, transactional rollback/recovery, and installed-package coverage for the published CLI surface. 3. Persist checkpoints around every supervisor operation and EXECUTOR, CURATOR, or EVALUATOR episode boundary so restart resumes from the first incomplete action without replaying completed agent or side-effect operations. 4. Enforce hard limits for episodes, agent runs, input/output/total tokens, wall time, changed files, diff lines, and no-progress episodes before launching the next operation; return typed terminal or human-review stops. 5. Integrate budget accounting and journal recovery with direct execution, context assimilation and CURATOR rework, typed runner lifecycle results, evaluator rework work orders, StateFingerprint, execution receipts, and effect-in-doubt guards. 6. Add deterministic crash/restart, stale-state, budget-edge, no-progress, bounded-feedback, schema migration idempotency/rollback, installed-package, and agent-efficiency regression tests. Do not port or expose ap loop, LoopSpec, project-local loop JSON, or a second orchestration controller."
  Verify Steps: "1. Run direct EXECUTOR and context/CURATOR rework fixtures with each budget just below and exactly at its limit. Expected: the next agent/evaluator/side-effect operation is refused before launch, usage is durably recorded, and the typed stop identifies the exhausted dimension. 2. Crash after journal creation, operation intent, adapter completion, receipt persistence, evaluator result, bounded feedback creation, and cursor advancement in both direct and context flows, then resume. Expected: execution continues from the first incomplete phase without replaying a completed agent run, CURATOR work order, semantic apply, or external effect. 3. Exercise evaluator rework and repeated no-progress results for EXECUTOR and CURATOR. Expected: only a bounded feedback delta enters the next work order, progress fingerprints are deterministic, and max-no-progress terminates both cycles. 4. Validate canonical current/legacy/absent schema fixtures, migrate twice, inject failure at every publish phase, and roll back. Expected: migration is idempotent, mixed generations fail closed, recovery preserves prior valid state, and no journal is silently discarded. 5. Install the built package in an isolated fixture and run journal create/status/resume compatibility smoke. Expected: the published tarball contains the schemas/migrator/runtime assets and does not depend on repository-only files. 6. Change task revision, Git/provider state, authority, or StateFingerprint between checkpoints and leave an effect in doubt. Expected: resume fails closed and delegates to typed stale-state/effect-resolution paths rather than consuming budget or retrying. 7. Verify human and JSON projections contain canonical budget usage, cursor, stop reason, work-order/receipt refs, and no raw transcripts or secrets. 8. Run bun run schemas:check, bun run lifecycle:invariants, bun run guards:check, bun run test:critical, bun run typecheck, bun run package:install-smoke, and bun run bench:agent-efficiency:check. Expected: all pass and quality/safety controls do not regress."
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: "- Revert supervisor budget/journal integration while preserving already persisted diagnostic records and the existing StateFingerprint, execution-receipt, and effect-in-doubt safety boundaries. - Retain version readers and migration recovery for any journal generation already written; never delete or reinterpret durable records during rollback. - Keep the feature behind an explicit compatibility boundary until schema migration, restart, rollback, and installed-package tests pass. - Re-run schema, lifecycle, guard, critical, type, install-smoke, and agent-efficiency checks before restoring supervised execution."
  Findings: "- The agentplane-loops runtime is design and test evidence for budgets, checkpoints, deterministic transitions, and bounded feedback only. This task must implement those properties inside the 0.7 typed supervisor and must not import the legacy public loop controller or create a second orchestration plane."
id_source: "generated"
---
## Summary

Persist bounded supervisor execution episodes

Define a durable supervisor episode journal and hard execution budgets for bounded EXECUTOR to EVALUATOR to rework cycles, with deterministic checkpoints, resume without replay, stop reasons, bounded feedback deltas, and limits for episodes, agent runs, tokens, wall time, changed files, diff lines, and no-progress episodes; integrate with the typed supervisor and runner without exposing the legacy ap loop or LoopSpec surface.

## Scope

- In scope: one versioned journal and hard budget contract shared by direct EXECUTOR, context/CURATOR, EVALUATOR, and rework episodes; deterministic checkpoints and stop records; resume without replay; bounded feedback deltas; usage limits for episodes, agent runs, tokens, wall time, changed files, diff lines, and no-progress episodes. - In scope: canonical schema and fixtures, migrator from absent/legacy state, idempotency and rollback/recovery evidence, installed-package smoke, human/JSON status, StateFingerprint, execution-receipt, authority, and effect-in-doubt integration. - Out of scope: importing ap loop, LoopSpec, project-local programmable loop JSON, automatic loop selection, or any second orchestration controller.

## Plan

1. Define versioned SupervisorExecutionBudget, SupervisorEpisodeJournal, cursor, usage, transition, stop, and bounded-feedback contracts with canonical digests, generated schema fixtures, and explicit persisted-format versions. 2. Add an idempotent migrator from absent and legacy journal state, transactional rollback/recovery, and installed-package coverage for the published CLI surface. 3. Persist checkpoints around every supervisor operation and EXECUTOR, CURATOR, or EVALUATOR episode boundary so restart resumes from the first incomplete action without replaying completed agent or side-effect operations. 4. Enforce hard limits for episodes, agent runs, input/output/total tokens, wall time, changed files, diff lines, and no-progress episodes before launching the next operation; return typed terminal or human-review stops. 5. Integrate budget accounting and journal recovery with direct execution, context assimilation and CURATOR rework, typed runner lifecycle results, evaluator rework work orders, StateFingerprint, execution receipts, and effect-in-doubt guards. 6. Add deterministic crash/restart, stale-state, budget-edge, no-progress, bounded-feedback, schema migration idempotency/rollback, installed-package, and agent-efficiency regression tests. Do not port or expose ap loop, LoopSpec, project-local loop JSON, or a second orchestration controller.

## Verify Steps

1. Run direct EXECUTOR and context/CURATOR rework fixtures with each budget just below and exactly at its limit. Expected: the next agent/evaluator/side-effect operation is refused before launch, usage is durably recorded, and the typed stop identifies the exhausted dimension. 2. Crash after journal creation, operation intent, adapter completion, receipt persistence, evaluator result, bounded feedback creation, and cursor advancement in both direct and context flows, then resume. Expected: execution continues from the first incomplete phase without replaying a completed agent run, CURATOR work order, semantic apply, or external effect. 3. Exercise evaluator rework and repeated no-progress results for EXECUTOR and CURATOR. Expected: only a bounded feedback delta enters the next work order, progress fingerprints are deterministic, and max-no-progress terminates both cycles. 4. Validate canonical current/legacy/absent schema fixtures, migrate twice, inject failure at every publish phase, and roll back. Expected: migration is idempotent, mixed generations fail closed, recovery preserves prior valid state, and no journal is silently discarded. 5. Install the built package in an isolated fixture and run journal create/status/resume compatibility smoke. Expected: the published tarball contains the schemas/migrator/runtime assets and does not depend on repository-only files. 6. Change task revision, Git/provider state, authority, or StateFingerprint between checkpoints and leave an effect in doubt. Expected: resume fails closed and delegates to typed stale-state/effect-resolution paths rather than consuming budget or retrying. 7. Verify human and JSON projections contain canonical budget usage, cursor, stop reason, work-order/receipt refs, and no raw transcripts or secrets. 8. Run bun run schemas:check, bun run lifecycle:invariants, bun run guards:check, bun run test:critical, bun run typecheck, bun run package:install-smoke, and bun run bench:agent-efficiency:check. Expected: all pass and quality/safety controls do not regress.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert supervisor budget/journal integration while preserving already persisted diagnostic records and the existing StateFingerprint, execution-receipt, and effect-in-doubt safety boundaries. - Retain version readers and migration recovery for any journal generation already written; never delete or reinterpret durable records during rollback. - Keep the feature behind an explicit compatibility boundary until schema migration, restart, rollback, and installed-package tests pass. - Re-run schema, lifecycle, guard, critical, type, install-smoke, and agent-efficiency checks before restoring supervised execution.

## Findings

- The agentplane-loops runtime is design and test evidence for budgets, checkpoints, deterministic transitions, and bounded feedback only. This task must implement those properties inside the 0.7 typed supervisor and must not import the legacy public loop controller or create a second orchestration plane.
