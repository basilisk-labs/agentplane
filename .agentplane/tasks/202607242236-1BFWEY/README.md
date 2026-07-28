---
id: "202607242236-1BFWEY"
title: "Persist bounded supervisor execution episodes"
result_summary: "pre-merge closure"
status: "DONE"
priority: "high"
owner: "CODER"
revision: 25
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
  state: "ok"
  updated_at: "2026-07-28T05:01:44.723Z"
  updated_by: "CODER"
  note: "Supervisor episode rework verified locally: persisted EXECUTOR, CURATOR, and EVALUATOR episodes recover fail-closed; private provider usage is budgeted without public-schema drift."
  attempts: 0
quality_review:
  state: "pass"
  provenance: "evaluator_supplied"
  updated_at: "2026-07-28T05:17:03.471Z"
  updated_by: "EVALUATOR"
  note: "EVALUATOR returned pass with 1 typed finding(s)."
  evaluated_sha: "edb373fa89ab1ca84d4dca56dadf1acea166a9a7"
  blueprint_digest: "fae61bd2a7aa075ea797d72baa76b0ea0b2502b1995b11c5033ebdf9b4f22477"
  evidence_refs:
    - ".agentplane/tasks/202607242236-1BFWEY/quality/20260728-051703351-recovery-context/evaluator-work-order.json"
    - ".agentplane/tasks/202607242236-1BFWEY/quality/20260728-051703351-recovery-context/quality-report.json"
    - ".agentplane/tasks/202607242236-1BFWEY/quality/20260728-051703351-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202607242236-1BFWEY/quality/20260728-051703351-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202607242236-1BFWEY/quality/20260728-051703351-recovery-context/evaluator-result.json"
    - ".agentplane/tasks/202607242236-1BFWEY/README.md"
    - ".agentplane/tasks/202607242236-1BFWEY/quality/20260728-051703351-recovery-context/evaluator-diff.patch"
    - ".agentplane/tasks/202607242236-1BFWEY/quality/20260728-051703351-recovery-context/evaluator-observed-checks.json"
    - ".agentplane/tasks/202607242236-1BFWEY/quality/20260728-051703351-recovery-context/evaluator-blueprint.json"
    - ".agentplane/policy/dod.code.md"
    - ".agentplane/policy/dod.core.md"
    - ".agentplane/policy/security.must.md"
    - ".agentplane/policy/workflow.branch_pr.md"
  findings:
    - "The changed test assertion is equivalent and the local format gate now passes; no production code or evaluator work-order contract changed in this head."
commit:
  hash: "a702e4ed0c9429e24babe0adcbff82c99f90acb5"
  message: "Record refreshed pre-merge authority"
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "CODER"
    body: "Implemented: durable bounded supervisor episode journal, migration, and Hermes vertical slice with targeted verification."
  -
    author: "CODER"
    body: "Verified: pre-merge closure packet is ready for the task PR."
  -
    author: "CODER"
    body: "Verified: refreshed pre-merge closure packet is ready for the task PR."
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
  -
    type: "verify"
    at: "2026-07-28T05:01:44.723Z"
    author: "CODER"
    state: "ok"
    note: "Supervisor episode rework verified locally: persisted EXECUTOR, CURATOR, and EVALUATOR episodes recover fail-closed; private provider usage is budgeted without public-schema drift."
  -
    type: "status"
    at: "2026-07-28T05:11:48.174Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: pre-merge closure packet is ready for the task PR."
  -
    type: "status"
    at: "2026-07-28T05:18:09.118Z"
    author: "CODER"
    from: "DONE"
    to: "DONE"
    note: "Verified: refreshed pre-merge closure packet is ready for the task PR."
doc_version: 3
doc_updated_at: "2026-07-28T05:18:09.118Z"
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

    ### 2026-07-28T05:01:44.723Z — VERIFY — ok

    By: CODER

    Note: Supervisor episode rework verified locally: persisted EXECUTOR, CURATOR, and EVALUATOR episodes recover fail-closed; private provider usage is budgeted without public-schema drift.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-28T03:57:29.723Z, excerpt_hash=sha256:41d35bf605fded6cdc173757ce95594ef978d3858ff5b5e78a12cd22828b8cd8

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
    - diagnostic_command: none
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

    - Observation: Targeted supervisor and evaluator suites, schemas, lifecycle invariants, shared guards, typecheck, critical suite, isolated tarball smoke, and RF-04 agent-efficiency baseline passed.
      Impact: The prior evaluator rework is addressed without changing the frozen v0.7 public CLI or tarball contract.
      Resolution: Keep journal status in the existing supervised execution JSON projection; reserve any new public status command for a separately reviewed compatibility candidate.
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
      -
        actor: "USER"
        at: "2026-07-28T05:11:33.405Z"
        authorityDigest: "sha256:dcfdc60d6f3281df43d53a50a6fea79f1ab195b4b46d353644fba613891569f8"
        digest: "sha256:904b0943f7ec19949ad82ca611147825dc5be65d04ff908fa026c9ccf1a18f4a"
        operationDigest: "sha256:e2945d25d29654fb26cdc502d1e54bd9e623a55ed6aede165ab346ec9920b889"
        operationId: "task.pre_merge_close"
        outcome: "approved"
        policyRule: "workflow.external_high_risk"
        previousDigest: "sha256:148744c4892c1bb467b5c7be5591af31e9b8f3b3bec1502bf846f46dc92223e1"
        schemaVersion: 1
        sequence: 2
        stateFingerprintDigest: "sha256:6a900f164aac2b5e9f5bf90204dc385cc766a4de6500003835c49a597c1f53e8"
      -
        actor: "USER"
        at: "2026-07-28T05:12:03.680Z"
        authorityDigest: "sha256:4fd66dbd8ddd79685067beab756f1ef997c96065b4b1e9fa2b65a585da33caba"
        digest: "sha256:059cf70189ba38ff36c0dc3eb2a593f1fc00e9b0e7011c482a7a5d2ef6976e29"
        operationDigest: "sha256:dd2c22089f53f9bbc507c7076870a842f3706a70ebf24985df65dd0f6ba23645"
        operationId: "route.remote.refresh"
        outcome: "approved"
        policyRule: "workflow.external_reversible"
        previousDigest: "sha256:904b0943f7ec19949ad82ca611147825dc5be65d04ff908fa026c9ccf1a18f4a"
        schemaVersion: 1
        sequence: 3
        stateFingerprintDigest: "sha256:27677edb096c3f3fcf1101b75c9bdfdfdd72fdaf60497411fa2f137ebd4aa5cd"
      -
        actor: "USER"
        at: "2026-07-28T05:12:45.934Z"
        authorityDigest: "sha256:85a2a00917f441a59c6b5ad92356c9d47ab930402fce3ccef87e07c8e41524ef"
        digest: "sha256:3598f52b6b683bd7ac01d5a9910942247c8a5dd6178864c16ea221e3080ffc11"
        operationDigest: "sha256:5d741e2d30f33acf9cd87346af5aac0b5cd6d7c727b7ec562933caf1bb6e17ce"
        operationId: "pr.head.publish"
        outcome: "approved"
        policyRule: "workflow.external_reversible"
        previousDigest: "sha256:059cf70189ba38ff36c0dc3eb2a593f1fc00e9b0e7011c482a7a5d2ef6976e29"
        schemaVersion: 1
        sequence: 4
        stateFingerprintDigest: "sha256:183a73c963b43204b9c6825e550252473d18b64f009e5963e020cf4d5fd99e63"
      -
        actor: "USER"
        at: "2026-07-28T05:17:39.939Z"
        authorityDigest: "sha256:33bc08b9b6ba5f71a2657b4be2673025e72b007c767b063f767764f658aeae14"
        digest: "sha256:f7f7af43943708dcfecefbbb847c965e79207ba75473b7243fed7fcf05cff1ad"
        operationDigest: "sha256:dbf3dc274da6344d1b206c88ce3c1958397020f126fcd073fccf67536091c92b"
        operationId: "task.pre_merge_close"
        outcome: "approved"
        policyRule: "workflow.external_high_risk"
        previousDigest: "sha256:3598f52b6b683bd7ac01d5a9910942247c8a5dd6178864c16ea221e3080ffc11"
        schemaVersion: 1
        sequence: 5
        stateFingerprintDigest: "sha256:244af54f86df03ad6fcac867add43b009281cf2aa25d4e74bd397b8d793ca2a9"
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
      -
        actor: "USER"
        digest: "sha256:dcfdc60d6f3281df43d53a50a6fea79f1ab195b4b46d353644fba613891569f8"
        expiresAt: "2026-07-28T05:26:33.405Z"
        id: "authority-bd4f7aa6-084a-4d5d-bfb9-b1bd196f74e5"
        issuedAt: "2026-07-28T05:11:33.405Z"
        kind: "side_effect_authority"
        operationDigest: "sha256:e2945d25d29654fb26cdc502d1e54bd9e623a55ed6aede165ab346ec9920b889"
        operationId: "task.pre_merge_close"
        policyRule: "workflow.external_high_risk"
        schemaVersion: 1
        stateFingerprintDigest: "sha256:6a900f164aac2b5e9f5bf90204dc385cc766a4de6500003835c49a597c1f53e8"
        stateScopeDigest: "sha256:9cce98f32a648dc1db71591015dad1539b8c1c013dc9bdc1c9cca2c73df1509a"
      -
        actor: "USER"
        digest: "sha256:4fd66dbd8ddd79685067beab756f1ef997c96065b4b1e9fa2b65a585da33caba"
        expiresAt: "2026-07-28T05:27:03.680Z"
        id: "authority-325b4beb-5929-4f4e-87be-c8708eee8a43"
        issuedAt: "2026-07-28T05:12:03.680Z"
        kind: "side_effect_authority"
        operationDigest: "sha256:dd2c22089f53f9bbc507c7076870a842f3706a70ebf24985df65dd0f6ba23645"
        operationId: "route.remote.refresh"
        policyRule: "workflow.external_reversible"
        schemaVersion: 1
        stateFingerprintDigest: "sha256:27677edb096c3f3fcf1101b75c9bdfdfdd72fdaf60497411fa2f137ebd4aa5cd"
        stateScopeDigest: "sha256:fc29b1c1dfa9724f6320d9d2b23a28d58b1c330205642ade3d0ae77766048097"
      -
        actor: "USER"
        digest: "sha256:85a2a00917f441a59c6b5ad92356c9d47ab930402fce3ccef87e07c8e41524ef"
        expiresAt: "2026-07-28T05:27:45.934Z"
        id: "authority-2847bd19-6499-4ea5-a9b8-c76b5edbd3db"
        issuedAt: "2026-07-28T05:12:45.934Z"
        kind: "side_effect_authority"
        operationDigest: "sha256:5d741e2d30f33acf9cd87346af5aac0b5cd6d7c727b7ec562933caf1bb6e17ce"
        operationId: "pr.head.publish"
        policyRule: "workflow.external_reversible"
        schemaVersion: 1
        stateFingerprintDigest: "sha256:183a73c963b43204b9c6825e550252473d18b64f009e5963e020cf4d5fd99e63"
        stateScopeDigest: "sha256:81eeea5784b5d614a5f355ec3549f24958492b93dcb10b2a728267fca723d798"
      -
        actor: "USER"
        digest: "sha256:33bc08b9b6ba5f71a2657b4be2673025e72b007c767b063f767764f658aeae14"
        expiresAt: "2026-07-28T05:32:39.939Z"
        id: "authority-01a79f43-fac7-4901-828d-99e4b8ec6b50"
        issuedAt: "2026-07-28T05:17:39.939Z"
        kind: "side_effect_authority"
        operationDigest: "sha256:dbf3dc274da6344d1b206c88ce3c1958397020f126fcd073fccf67536091c92b"
        operationId: "task.pre_merge_close"
        policyRule: "workflow.external_high_risk"
        schemaVersion: 1
        stateFingerprintDigest: "sha256:244af54f86df03ad6fcac867add43b009281cf2aa25d4e74bd397b8d793ca2a9"
        stateScopeDigest: "sha256:da322591a9d63c2bc316fec83a6705e9a48cbfc15303589ed94d94c2781b8aea"
    schemaVersion: 1
  implementation_commit:
    hash: "edb373fa89ab1ca84d4dca56dadf1acea166a9a7"
    message: "Format evaluator provider failure coverage"
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

### 2026-07-28T05:01:44.723Z — VERIFY — ok

By: CODER

Note: Supervisor episode rework verified locally: persisted EXECUTOR, CURATOR, and EVALUATOR episodes recover fail-closed; private provider usage is budgeted without public-schema drift.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-28T03:57:29.723Z, excerpt_hash=sha256:41d35bf605fded6cdc173757ce95594ef978d3858ff5b5e78a12cd22828b8cd8

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
- diagnostic_command: none
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

- Observation: Targeted supervisor and evaluator suites, schemas, lifecycle invariants, shared guards, typecheck, critical suite, isolated tarball smoke, and RF-04 agent-efficiency baseline passed.
  Impact: The prior evaluator rework is addressed without changing the frozen v0.7 public CLI or tarball contract.
  Resolution: Keep journal status in the existing supervised execution JSON projection; reserve any new public status command for a separately reviewed compatibility candidate.
