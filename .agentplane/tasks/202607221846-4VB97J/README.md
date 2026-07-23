---
id: "202607221846-4VB97J"
title: "Align Workflow schema, migration, and runtime version contracts"
result_summary: "pre-merge closure"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 16
origin:
  system: "manual"
depends_on:
  - "202607221846-ZAENM6"
tags:
  - "contract-drift"
  - "migration"
  - "milestone-alpha1"
  - "refactor"
  - "schema"
  - "v0.7"
  - "wave-trust"
  - "workflow"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "code.branch_pr"
verify:
  - "bun run docs:cli:check"
  - "bun run schemas:check"
  - "bun run test:critical"
  - "bun run workflows:command-check"
plan_approval:
  state: "approved"
  updated_at: "2026-07-23T00:30:42.372Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-07-23T03:07:18.006Z"
  updated_by: "CODER"
  note: "PASS after CI rework at implementation 816b1f592: 41 focused and 2216/2216 full tests pass; hosted-equivalent static, critical, schema, docs, workflow and compatibility gates pass; independent evaluator found no P0-P2 issues."
  attempts: 0
quality_review:
  state: "pass"
  updated_at: "2026-07-23T03:06:42.939Z"
  updated_by: "EVALUATOR"
  note: "CI rework at 816b1f592 preserves the finite typed legacy v1 surface, removes only dead exports, and passes the full hosted-equivalent local suite."
  evaluated_sha: "816b1f5920215469790609d2b34d5336ec410921"
  blueprint_digest: "c9b8bb5a1d8bdb6d57881e7eda28adcf417ae290621eaacfd414c4bd1a28f54c"
  evidence_refs:
    - ".agentplane/tasks/202607221846-4VB97J/README.md"
    - ".agentplane/tasks/202607221846-4VB97J/quality/20260723-030642939-recovery-context/quality-report.json"
    - ".agentplane/tasks/202607221846-4VB97J/quality/20260723-030642939-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202607221846-4VB97J/quality/20260723-030642939-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202607221846-4VB97J/blueprint/resolved-snapshot.json"
    - "commit 816b1f592"
    - "bun run test:fast: 372 files, 2216 tests passed"
    - "format, schemas, compatibility, lint, typecheck, arch, knip, docs, workflow and test:critical passed"
  findings:
    - "No P0-P2 finding: v1 tasks/framework and extension fields survive raw migration without materialized defaults, while arbitrary roots and v1.workflow remain rejected."
    - "Static cleanup keeps the public core config subpath intact and returns the Knip baseline to zero new debt."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: implement the approved WORKFLOW v1/v2 contract, migration, writer parity, and compatibility-ledger scope from main SHA 0e2d4b1c6523."
  -
    author: "CODER"
    body: "Verified: pre-merge closure packet is ready for the task PR."
events:
  -
    type: "status"
    at: "2026-07-23T00:32:03.585Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implement the approved WORKFLOW v1/v2 contract, migration, writer parity, and compatibility-ledger scope from main SHA 0e2d4b1c6523."
  -
    type: "verify"
    at: "2026-07-23T02:23:56.271Z"
    author: "CODER"
    state: "ok"
    note: "PASS at 827ea46e: v1/v2 normalization, deterministic migration and exact rollback, future-version rejection, schema parity, upgrade parity, and compatibility candidate verified; 82/82 focused tests and independent evaluator PASS."
  -
    type: "status"
    at: "2026-07-23T02:31:36.726Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: pre-merge closure packet is ready for the task PR."
  -
    type: "verify"
    at: "2026-07-23T02:44:41.310Z"
    author: "CODER"
    state: "needs_rework"
    note: "Hosted CI found a backward-compatibility defect in v1 optional sections and new unused exports; reopen for bounded correction."
  -
    type: "verify"
    at: "2026-07-23T03:07:18.006Z"
    author: "CODER"
    state: "ok"
    note: "PASS after CI rework at implementation 816b1f592: 41 focused and 2216/2216 full tests pass; hosted-equivalent static, critical, schema, docs, workflow and compatibility gates pass; independent evaluator found no P0-P2 issues."
doc_version: 3
doc_updated_at: "2026-07-23T03:07:18.117Z"
doc_updated_by: "CODER"
description: "Correct the verified v0.7 prerequisite drift between WORKFLOW v2 runtime parsing, the public v1 JSON Schema/docs, future-version acceptance, and upgrade behavior."
sections:
  Summary: |-
    Align Workflow schema, migration, and runtime version contracts

    Correct the verified v0.7 prerequisite drift between WORKFLOW v2 runtime parsing, the public v1 JSON Schema/docs, future-version acceptance, and upgrade behavior.
  Scope: |-
    - In scope: one Zod source of truth for supported WORKFLOW versions, generated JSON Schema and fixtures, an idempotent v1-to-v2 migrator with rollback evidence, strict rejection of unsupported future versions, and synchronized public contract documentation.
    - Out of scope: unrelated workflow semantics or removal of supported v1 reading without a compatibility window.
  Plan: "1. Define one Zod source of truth for supported WORKFLOW v1 and v2 inputs, normalize both to v2, and reject future versions with a typed error. 2. Generate the public JSON Schema, fixtures, and contract documentation from that source. 3. Implement a pure v1-to-v2 migrator with dry-run, atomic apply, idempotency, and an exact-byte rollback receipt. 4. Route config/save/build, doctor/fix, and upgrade writers through the versioned contract without field loss or silent version downgrade. 5. Record the intentional compatibility delta in a reviewed candidate ledger while preserving the immutable 0.6.24 baseline anchor. 6. Add focused round-trip, migration, rollback, future-version, writer-parity, schema, CLI-doc, and compatibility checks."
  Verify Steps: |-
    1. Round-trip valid v1 and v2 fixtures through runtime parsing and generated JSON Schema. Expected: both supported forms agree on normalized v2 meaning.
    2. Run migration twice and exercise rollback. Expected: the second run is a no-op and rollback restores the exact source fixture.
    3. Parse an unsupported future version. Expected: a typed version error, not permissive acceptance.
    4. Run `bun run schemas:check`, `bun run workflows:command-check`, `bun run docs:cli:check`, and focused migration tests. Expected: runtime, schema, upgrade, and docs surfaces are in parity.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-07-23T02:23:56.271Z — VERIFY — ok

    By: CODER

    Note: PASS at 827ea46e: v1/v2 normalization, deterministic migration and exact rollback, future-version rejection, schema parity, upgrade parity, and compatibility candidate verified; 82/82 focused tests and independent evaluator PASS.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-23T00:32:03.585Z, excerpt_hash=sha256:af5ea8abec88124a9c949254e987364e763f794ade7f69ed80c53fe80741acd7

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607221846-4VB97J-align-workflow-schema-migration-and-runtime-vers/.agentplane/tasks/202607221846-4VB97J/blueprint/resolved-snapshot.json
    - old_digest: c9b8bb5a1d8bdb6d57881e7eda28adcf417ae290621eaacfd414c4bd1a28f54c
    - current_digest: c9b8bb5a1d8bdb6d57881e7eda28adcf417ae290621eaacfd414c4bd1a28f54c
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607221846-4VB97J

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane pr update 202607221846-4VB97J
    - diagnostic_command: agentplane pr check 202607221846-4VB97J
    - source_of_truth: route=task_next_action diagnostic=pr_check remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: if PR check passes but next-action still requests PR artifact update, verify live PR state before rerunning mutation
    - risks: pr_artifact_freshness_loop, git_hook_side_effect

    ### 2026-07-23T02:44:41.310Z — VERIFY — needs_rework

    By: CODER

    Note: Hosted CI found a backward-compatibility defect in v1 optional sections and new unused exports; reopen for bounded correction.
    Attempts: 1

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-23T02:31:36.727Z, excerpt_hash=sha256:af5ea8abec88124a9c949254e987364e763f794ade7f69ed80c53fe80741acd7

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607221846-4VB97J-align-workflow-schema-migration-and-runtime-vers/.agentplane/tasks/202607221846-4VB97J/blueprint/resolved-snapshot.json
    - old_digest: c9b8bb5a1d8bdb6d57881e7eda28adcf417ae290621eaacfd414c4bd1a28f54c
    - current_digest: c9b8bb5a1d8bdb6d57881e7eda28adcf417ae290621eaacfd414c4bd1a28f54c
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607221846-4VB97J

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane integrate queue enqueue 202607221846-4VB97J --branch task/202607221846-4VB97J/align-workflow-schema-migration-and-runtime-vers
    - diagnostic_command: agentplane pr check 202607221846-4VB97J
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: true
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: git_hook_side_effect

    ### 2026-07-23T03:07:18.006Z — VERIFY — ok

    By: CODER

    Note: PASS after CI rework at implementation 816b1f592: 41 focused and 2216/2216 full tests pass; hosted-equivalent static, critical, schema, docs, workflow and compatibility gates pass; independent evaluator found no P0-P2 issues.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-23T02:44:43.349Z, excerpt_hash=sha256:af5ea8abec88124a9c949254e987364e763f794ade7f69ed80c53fe80741acd7

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607221846-4VB97J-align-workflow-schema-migration-and-runtime-vers/.agentplane/tasks/202607221846-4VB97J/blueprint/resolved-snapshot.json
    - old_digest: c9b8bb5a1d8bdb6d57881e7eda28adcf417ae290621eaacfd414c4bd1a28f54c
    - current_digest: c9b8bb5a1d8bdb6d57881e7eda28adcf417ae290621eaacfd414c4bd1a28f54c
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607221846-4VB97J

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane integrate queue enqueue 202607221846-4VB97J --branch task/202607221846-4VB97J/align-workflow-schema-migration-and-runtime-vers
    - diagnostic_command: agentplane pr check 202607221846-4VB97J
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: true
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: git_hook_side_effect

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert the task implementation commit(s) without changing unrelated task state.
    - Restore the previous persisted contract or schema version where applicable.
    - Re-run the task-specific checks and record any data requiring explicit migration repair.
  Findings: |-
    - Observation: Recovery paths now reject forged receipts, active future workflow versions, and invalid UTF-8 before writes.
      Impact: Workflow migrations cannot silently produce unrecoverable state or overwrite unsupported future contracts.
      Resolution: Recomputed receipt transitions, pre-write future-version guard, exact UTF-8 round-trip validation, and regression coverage for dry-run/apply.

    - Observation: The v1 Zod branch rejects legacy tasks/framework sections previously accepted by runtime, and knip reports redundant new exports.
      Impact: Doctor behavior regresses for supported v1 repositories and the PR cannot merge.
      Resolution: Broaden the versioned v1 schema only across known legacy root sections, preserve them during v1-to-v2 migration, remove redundant exports, and rerun hosted-equivalent checks.
extensions:
  implementation_commit:
    hash: "48c84a7f468ab71235cc6af34e0d8f3d6afbb4e2"
    message: "🧪 4VB97J migration: cover dry-run UTF-8 rejection"
id_source: "generated"
---
## Summary

Align Workflow schema, migration, and runtime version contracts

Correct the verified v0.7 prerequisite drift between WORKFLOW v2 runtime parsing, the public v1 JSON Schema/docs, future-version acceptance, and upgrade behavior.

## Scope

- In scope: one Zod source of truth for supported WORKFLOW versions, generated JSON Schema and fixtures, an idempotent v1-to-v2 migrator with rollback evidence, strict rejection of unsupported future versions, and synchronized public contract documentation.
- Out of scope: unrelated workflow semantics or removal of supported v1 reading without a compatibility window.

## Plan

1. Define one Zod source of truth for supported WORKFLOW v1 and v2 inputs, normalize both to v2, and reject future versions with a typed error. 2. Generate the public JSON Schema, fixtures, and contract documentation from that source. 3. Implement a pure v1-to-v2 migrator with dry-run, atomic apply, idempotency, and an exact-byte rollback receipt. 4. Route config/save/build, doctor/fix, and upgrade writers through the versioned contract without field loss or silent version downgrade. 5. Record the intentional compatibility delta in a reviewed candidate ledger while preserving the immutable 0.6.24 baseline anchor. 6. Add focused round-trip, migration, rollback, future-version, writer-parity, schema, CLI-doc, and compatibility checks.

## Verify Steps

1. Round-trip valid v1 and v2 fixtures through runtime parsing and generated JSON Schema. Expected: both supported forms agree on normalized v2 meaning.
2. Run migration twice and exercise rollback. Expected: the second run is a no-op and rollback restores the exact source fixture.
3. Parse an unsupported future version. Expected: a typed version error, not permissive acceptance.
4. Run `bun run schemas:check`, `bun run workflows:command-check`, `bun run docs:cli:check`, and focused migration tests. Expected: runtime, schema, upgrade, and docs surfaces are in parity.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-07-23T02:23:56.271Z — VERIFY — ok

By: CODER

Note: PASS at 827ea46e: v1/v2 normalization, deterministic migration and exact rollback, future-version rejection, schema parity, upgrade parity, and compatibility candidate verified; 82/82 focused tests and independent evaluator PASS.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-23T00:32:03.585Z, excerpt_hash=sha256:af5ea8abec88124a9c949254e987364e763f794ade7f69ed80c53fe80741acd7

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607221846-4VB97J-align-workflow-schema-migration-and-runtime-vers/.agentplane/tasks/202607221846-4VB97J/blueprint/resolved-snapshot.json
- old_digest: c9b8bb5a1d8bdb6d57881e7eda28adcf417ae290621eaacfd414c4bd1a28f54c
- current_digest: c9b8bb5a1d8bdb6d57881e7eda28adcf417ae290621eaacfd414c4bd1a28f54c
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607221846-4VB97J

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane pr update 202607221846-4VB97J
- diagnostic_command: agentplane pr check 202607221846-4VB97J
- source_of_truth: route=task_next_action diagnostic=pr_check remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: if PR check passes but next-action still requests PR artifact update, verify live PR state before rerunning mutation
- risks: pr_artifact_freshness_loop, git_hook_side_effect

### 2026-07-23T02:44:41.310Z — VERIFY — needs_rework

By: CODER

Note: Hosted CI found a backward-compatibility defect in v1 optional sections and new unused exports; reopen for bounded correction.
Attempts: 1

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-23T02:31:36.727Z, excerpt_hash=sha256:af5ea8abec88124a9c949254e987364e763f794ade7f69ed80c53fe80741acd7

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607221846-4VB97J-align-workflow-schema-migration-and-runtime-vers/.agentplane/tasks/202607221846-4VB97J/blueprint/resolved-snapshot.json
- old_digest: c9b8bb5a1d8bdb6d57881e7eda28adcf417ae290621eaacfd414c4bd1a28f54c
- current_digest: c9b8bb5a1d8bdb6d57881e7eda28adcf417ae290621eaacfd414c4bd1a28f54c
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607221846-4VB97J

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane integrate queue enqueue 202607221846-4VB97J --branch task/202607221846-4VB97J/align-workflow-schema-migration-and-runtime-vers
- diagnostic_command: agentplane pr check 202607221846-4VB97J
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: true
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: git_hook_side_effect

### 2026-07-23T03:07:18.006Z — VERIFY — ok

By: CODER

Note: PASS after CI rework at implementation 816b1f592: 41 focused and 2216/2216 full tests pass; hosted-equivalent static, critical, schema, docs, workflow and compatibility gates pass; independent evaluator found no P0-P2 issues.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-23T02:44:43.349Z, excerpt_hash=sha256:af5ea8abec88124a9c949254e987364e763f794ade7f69ed80c53fe80741acd7

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607221846-4VB97J-align-workflow-schema-migration-and-runtime-vers/.agentplane/tasks/202607221846-4VB97J/blueprint/resolved-snapshot.json
- old_digest: c9b8bb5a1d8bdb6d57881e7eda28adcf417ae290621eaacfd414c4bd1a28f54c
- current_digest: c9b8bb5a1d8bdb6d57881e7eda28adcf417ae290621eaacfd414c4bd1a28f54c
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607221846-4VB97J

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane integrate queue enqueue 202607221846-4VB97J --branch task/202607221846-4VB97J/align-workflow-schema-migration-and-runtime-vers
- diagnostic_command: agentplane pr check 202607221846-4VB97J
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: true
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: git_hook_side_effect

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert the task implementation commit(s) without changing unrelated task state.
- Restore the previous persisted contract or schema version where applicable.
- Re-run the task-specific checks and record any data requiring explicit migration repair.

## Findings

- Observation: Recovery paths now reject forged receipts, active future workflow versions, and invalid UTF-8 before writes.
  Impact: Workflow migrations cannot silently produce unrecoverable state or overwrite unsupported future contracts.
  Resolution: Recomputed receipt transitions, pre-write future-version guard, exact UTF-8 round-trip validation, and regression coverage for dry-run/apply.

- Observation: The v1 Zod branch rejects legacy tasks/framework sections previously accepted by runtime, and knip reports redundant new exports.
  Impact: Doctor behavior regresses for supported v1 repositories and the PR cannot merge.
  Resolution: Broaden the versioned v1 schema only across known legacy root sections, preserve them during v1-to-v2 migration, remove redundant exports, and rerun hosted-equivalent checks.
