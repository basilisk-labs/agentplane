---
id: "202607221846-4VB97J"
title: "Align Workflow schema, migration, and runtime version contracts"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 12
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
  updated_at: "2026-07-23T02:23:56.271Z"
  updated_by: "CODER"
  note: "PASS at 827ea46e: v1/v2 normalization, deterministic migration and exact rollback, future-version rejection, schema parity, upgrade parity, and compatibility candidate verified; 82/82 focused tests and independent evaluator PASS."
  attempts: 0
quality_review:
  state: "pass"
  updated_at: "2026-07-23T02:27:34.283Z"
  updated_by: "EVALUATOR"
  note: "Quality review passed for implementation head 48c84a7f; only task-artifact refreshes distinguish it from independently reviewed code."
  evaluated_sha: "48c84a7f468ab71235cc6af34e0d8f3d6afbb4e2"
  blueprint_digest: "c9b8bb5a1d8bdb6d57881e7eda28adcf417ae290621eaacfd414c4bd1a28f54c"
  evidence_refs:
    - ".agentplane/tasks/202607221846-4VB97J/README.md"
    - ".agentplane/tasks/202607221846-4VB97J/quality/20260723-022734283-recovery-context/quality-report.json"
    - ".agentplane/tasks/202607221846-4VB97J/quality/20260723-022734283-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202607221846-4VB97J/quality/20260723-022734283-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202607221846-4VB97J/blueprint/resolved-snapshot.json"
  findings:
    - "All recovery integrity findings remain closed; 82/82 focused tests, exact compatibility digest, schema parity, and verified task evidence pass."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: implement the approved WORKFLOW v1/v2 contract, migration, writer parity, and compatibility-ledger scope from main SHA 0e2d4b1c6523."
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
doc_version: 3
doc_updated_at: "2026-07-23T02:23:56.380Z"
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

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert the task implementation commit(s) without changing unrelated task state.
    - Restore the previous persisted contract or schema version where applicable.
    - Re-run the task-specific checks and record any data requiring explicit migration repair.
  Findings: |-
    - Observation: Recovery paths now reject forged receipts, active future workflow versions, and invalid UTF-8 before writes.
      Impact: Workflow migrations cannot silently produce unrecoverable state or overwrite unsupported future contracts.
      Resolution: Recomputed receipt transitions, pre-write future-version guard, exact UTF-8 round-trip validation, and regression coverage for dry-run/apply.
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

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert the task implementation commit(s) without changing unrelated task state.
- Restore the previous persisted contract or schema version where applicable.
- Re-run the task-specific checks and record any data requiring explicit migration repair.

## Findings

- Observation: Recovery paths now reject forged receipts, active future workflow versions, and invalid UTF-8 before writes.
  Impact: Workflow migrations cannot silently produce unrecoverable state or overwrite unsupported future contracts.
  Resolution: Recomputed receipt transitions, pre-write future-version guard, exact UTF-8 round-trip validation, and regression coverage for dry-run/apply.
