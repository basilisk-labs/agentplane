---
id: "202607242236-1BFWEY"
title: "Persist bounded supervisor execution episodes"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 15
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
  state: "approved"
  updated_at: "2026-07-28T03:31:56.713Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "needs_rework"
  updated_at: "2026-07-28T03:57:29.122Z"
  updated_by: "TESTER"
  note: "Rework: the committed direct/Hermes supervisor journal slice passes targeted checks, but the full task contract remains incomplete."
  attempts: 1
commit: null
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "CODER"
    body: "Implemented: durable bounded supervisor episode journal, migration, and Hermes vertical slice with targeted verification."
events:
  -
    type: "status"
    at: "2026-07-28T03:32:16.664Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-07-28T03:57:08.440Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Implemented: durable bounded supervisor episode journal, migration, and Hermes vertical slice with targeted verification."
  -
    type: "verify"
    at: "2026-07-28T03:57:29.122Z"
    author: "TESTER"
    state: "needs_rework"
    note: "Rework: the committed direct/Hermes supervisor journal slice passes targeted checks, but the full task contract remains incomplete."
doc_version: 3
doc_updated_at: "2026-07-28T03:57:29.723Z"
doc_updated_by: "CODER"
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
    ### 2026-07-28T03:57:29.122Z — VERIFY — needs_rework

    By: TESTER

    Note: Rework: the committed direct/Hermes supervisor journal slice passes targeted checks, but the full task contract remains incomplete.
    Attempts: 1

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-28T03:57:08.440Z, excerpt_hash=sha256:41d35bf605fded6cdc173757ce95594ef978d3858ff5b5e78a12cd22828b8cd8

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/inc-20260727-main-lane.prxk2f/repo/.agentplane/worktrees/202607242236-1BFWEY-persist-bounded-supervisor-execution-episodes/.agentplane/tasks/202607242236-1BFWEY/blueprint/resolved-snapshot.json
    - old_digest: fae61bd2a7aa075ea797d72baa76b0ea0b2502b1995b11c5033ebdf9b4f22477
    - current_digest: fae61bd2a7aa075ea797d72baa76b0ea0b2502b1995b11c5033ebdf9b4f22477
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607242236-1BFWEY

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202607242236-1BFWEY
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: "- Revert supervisor budget/journal integration while preserving already persisted diagnostic records and the existing StateFingerprint, execution-receipt, and effect-in-doubt safety boundaries. - Retain version readers and migration recovery for any journal generation already written; never delete or reinterpret durable records during rollback. - Keep the feature behind an explicit compatibility boundary until schema migration, restart, rollback, and installed-package tests pass. - Re-run schema, lifecycle, guard, critical, type, install-smoke, and agent-efficiency checks before restoring supervised execution."
  Findings: |-
    - The agentplane-loops runtime is design and test evidence for budgets, checkpoints, deterministic transitions, and bounded feedback only. This task must implement those properties inside the 0.7 typed supervisor and must not import the legacy public loop controller or create a second orchestration plane.

    - Observation: format, schemas, lint, guards, core and CLI typechecks, and 30 targeted tests passed; missing CURATOR/EVALUATOR integration, provider token telemetry, full crash matrix, installed-package smoke, and full critical suite.
      Impact: Marking the broad execution-episode task ok would overstate coverage and allow unfinished budget and recovery paths to reach integration.
      Resolution: Continue CODER work with typed telemetry projection, CURATOR/EVALUATOR adoption, crash-resume fixtures, and the declared full verification contract.
extensions:
  agentplane.side_effect_authority:
    audit:
      -
        actor: "USER"
        at: "2026-07-28T03:32:32.681Z"
        authorityDigest: "sha256:b69dfcad80b66bb7c00b8f9bf4b1433fb86b01175b929d3243aca0d1d206b3bc"
        digest: "sha256:148744c4892c1bb467b5c7be5591af31e9b8f3b3bec1502bf846f46dc92223e1"
        operationDigest: "sha256:1c6ad6a08e48aaa62120a4c8be6265af957eb35b2abb05e8f9d7a980d156f9ff"
        operationId: "pr.open"
        outcome: "approved"
        policyRule: "workflow.external_reversible"
        previousDigest: null
        schemaVersion: 1
        sequence: 1
        stateFingerprintDigest: "sha256:0708ba9b2e477068202564d4cf4d624ede0b95ee67d484df8cf62bc8cd127f90"
    grants:
      -
        actor: "USER"
        digest: "sha256:b69dfcad80b66bb7c00b8f9bf4b1433fb86b01175b929d3243aca0d1d206b3bc"
        expiresAt: "2026-07-28T03:47:32.681Z"
        id: "authority-85396e1a-dcc2-4347-a8ba-ddc4ae13de87"
        issuedAt: "2026-07-28T03:32:32.681Z"
        kind: "side_effect_authority"
        operationDigest: "sha256:1c6ad6a08e48aaa62120a4c8be6265af957eb35b2abb05e8f9d7a980d156f9ff"
        operationId: "pr.open"
        policyRule: "workflow.external_reversible"
        schemaVersion: 1
        stateFingerprintDigest: "sha256:0708ba9b2e477068202564d4cf4d624ede0b95ee67d484df8cf62bc8cd127f90"
        stateScopeDigest: "sha256:1cc9ede877816a55464cd799d60a0a69296c4f8bef5b55a63b36f4e6525b3970"
    schemaVersion: 1
  workflow_route_baseline:
    start_head_sha: "08dd47769434fc336d23a80d2d47f4fb0a265d74"
    version: 1
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
### 2026-07-28T03:57:29.122Z — VERIFY — needs_rework

By: TESTER

Note: Rework: the committed direct/Hermes supervisor journal slice passes targeted checks, but the full task contract remains incomplete.
Attempts: 1

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-28T03:57:08.440Z, excerpt_hash=sha256:41d35bf605fded6cdc173757ce95594ef978d3858ff5b5e78a12cd22828b8cd8

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/inc-20260727-main-lane.prxk2f/repo/.agentplane/worktrees/202607242236-1BFWEY-persist-bounded-supervisor-execution-episodes/.agentplane/tasks/202607242236-1BFWEY/blueprint/resolved-snapshot.json
- old_digest: fae61bd2a7aa075ea797d72baa76b0ea0b2502b1995b11c5033ebdf9b4f22477
- current_digest: fae61bd2a7aa075ea797d72baa76b0ea0b2502b1995b11c5033ebdf9b4f22477
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607242236-1BFWEY

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202607242236-1BFWEY
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert supervisor budget/journal integration while preserving already persisted diagnostic records and the existing StateFingerprint, execution-receipt, and effect-in-doubt safety boundaries. - Retain version readers and migration recovery for any journal generation already written; never delete or reinterpret durable records during rollback. - Keep the feature behind an explicit compatibility boundary until schema migration, restart, rollback, and installed-package tests pass. - Re-run schema, lifecycle, guard, critical, type, install-smoke, and agent-efficiency checks before restoring supervised execution.

## Findings

- The agentplane-loops runtime is design and test evidence for budgets, checkpoints, deterministic transitions, and bounded feedback only. This task must implement those properties inside the 0.7 typed supervisor and must not import the legacy public loop controller or create a second orchestration plane.

- Observation: format, schemas, lint, guards, core and CLI typechecks, and 30 targeted tests passed; missing CURATOR/EVALUATOR integration, provider token telemetry, full crash matrix, installed-package smoke, and full critical suite.
  Impact: Marking the broad execution-episode task ok would overstate coverage and allow unfinished budget and recovery paths to reach integration.
  Resolution: Continue CODER work with typed telemetry projection, CURATOR/EVALUATOR adoption, crash-resume fixtures, and the declared full verification contract.
