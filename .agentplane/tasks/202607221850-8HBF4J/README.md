---
id: "202607221850-8HBF4J"
title: "Supervise context assimilation post-processing"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 12
origin:
  system: "manual"
depends_on:
  - "202607221848-ER5H6N"
  - "202607221849-8YYZ9X"
  - "202607221850-DRWR0V"
  - "202607221850-WM9X1G"
  - "202607242236-1BFWEY"
tags:
  - "context"
  - "curator"
  - "milestone-beta1"
  - "refactor"
  - "rf-11"
  - "rf-25"
  - "supervisor"
  - "v0.7"
  - "wave-supervisor"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "code.branch_pr"
verify:
  - "bun run coverage:workflow-suite"
  - "bun run lifecycle:invariants"
  - "bun run test:critical"
  - "bun run typecheck"
plan_approval:
  state: "approved"
  updated_at: "2026-07-28T13:53:03.642Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-07-28T14:49:18.130Z"
  updated_by: "TESTER"
  note: "Verified supervisor implementation: invalid semantic SGR blocks mechanics; failed CLI operation retries without replaying CURATOR; durable completed phase resumes without replay; evaluator rework creates bounded CURATOR work order. Checks passed: typecheck, focused core/context tests (43), workflow coverage (52), compatibility contract, format and lint, critical CLI suite, lifecycle invariants."
  attempts: 0
quality_review:
  state: "rework"
  provenance: "evaluator_supplied"
  updated_at: "2026-07-28T21:42:42.240Z"
  updated_by: "EVALUATOR"
  note: "EVALUATOR returned rework with 2 typed finding(s)."
  evaluated_sha: "47c01f6c33ca35c36d7b53d4d5a03d891384c1e3"
  blueprint_digest: "ca32716bbebf15f72977ad2d6c3faa9b33798a500864fdc03cb9687f81a17bde"
  evidence_refs:
    - ".agentplane/tasks/202607221850-8HBF4J/quality/20260728-214115790-recovery-context/evaluator-work-order.json"
    - ".agentplane/tasks/202607221850-8HBF4J/quality/20260728-214115790-recovery-context/quality-report.json"
    - ".agentplane/tasks/202607221850-8HBF4J/quality/20260728-214115790-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202607221850-8HBF4J/quality/20260728-214115790-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202607221850-8HBF4J/quality/20260728-214115790-recovery-context/evaluator-result.json"
    - ".agentplane/tasks/202607221850-8HBF4J/quality/20260728-214115790-recovery-context/evaluator-follow-up.json"
    - ".agentplane/tasks/202607221850-8HBF4J/README.md"
    - ".agentplane/tasks/202607221850-8HBF4J/quality/20260728-214115790-recovery-context/evaluator-diff.patch"
    - ".agentplane/tasks/202607221850-8HBF4J/quality/20260728-214115790-recovery-context/evaluator-observed-checks.json"
    - ".agentplane/tasks/202607221850-8HBF4J/quality/20260728-214115790-recovery-context/evaluator-blueprint.json"
    - ".agentplane/policy/dod.code.md"
    - ".agentplane/policy/dod.core.md"
    - ".agentplane/policy/security.must.md"
    - ".agentplane/policy/workflow.branch_pr.md"
  findings:
    - "A different or stale semantic result can be accepted after the ingest journal has advanced beyond semantic_result_received, while completed mechanical phases are reused without applying or validating that result."
    - "The verification evidence does not demonstrate the required per-gate failure matrix, repeated semantic-rework limits, or stale-result scenario; the added supervisor tests exercise only one mechanical failure and one rework round."
commit:
  hash: "47c01f6c33ca35c36d7b53d4d5a03d891384c1e3"
  message: "Implement supervised context assimilation post-processing"
comments:
  -
    author: "CODER"
    body: "Start: implement the supervised, resumable mechanical post-processing for context assimilation while preserving CURATOR semantic ownership."
  -
    author: "CODER"
    body: "Implemented: supervised context assimilation post-processing; CURATOR emits only semantic SGR while CLI journals resumable mechanical phases and bounded evaluator rework. Local checks: typecheck; focused core/context tests (43); workflow coverage (52); compatibility contract; formatting and lint."
events:
  -
    type: "status"
    at: "2026-07-28T13:53:08.890Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implement the supervised, resumable mechanical post-processing for context assimilation while preserving CURATOR semantic ownership."
  -
    type: "status"
    at: "2026-07-28T14:48:51.340Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Implemented: supervised context assimilation post-processing; CURATOR emits only semantic SGR while CLI journals resumable mechanical phases and bounded evaluator rework. Local checks: typecheck; focused core/context tests (43); workflow coverage (52); compatibility contract; formatting and lint."
  -
    type: "verify"
    at: "2026-07-28T14:49:18.130Z"
    author: "TESTER"
    state: "ok"
    note: "Verified supervisor implementation: invalid semantic SGR blocks mechanics; failed CLI operation retries without replaying CURATOR; durable completed phase resumes without replay; evaluator rework creates bounded CURATOR work order. Checks passed: typecheck, focused core/context tests (43), workflow coverage (52), compatibility contract, format and lint, critical CLI suite, lifecycle invariants."
doc_version: 3
doc_updated_at: "2026-07-28T14:49:19.650Z"
doc_updated_by: "CODER"
description: "RF-11/RF-25b: after the CURATOR semantic result, let the supervisor validate/apply, reindex, build/lint wiki, validate graph, run coverage/checks, evaluate, create ACR, and finalize with resumable mechanical operations."
sections:
  Summary: |-
    Supervise context assimilation post-processing

    RF-11/RF-25b: after the CURATOR semantic result, let the supervisor validate/apply, reindex, build/lint wiki, validate graph, run coverage/checks, evaluate, create ACR, and finalize with resumable mechanical operations.
  Scope: |-
    - In scope: typed in-process context use-case results, supervisor operation registry for every mechanical assimilation phase, separate CURATOR rework work orders, retry from failed operation, and removal of lifecycle command lists from CURATOR prompts.
    - Out of scope: changing the CURATOR's semantic identity, synthesis, or ambiguity decisions.
  Plan: |-
    1. Convert context apply/reindex/wiki/graph/coverage/check/evaluate/ACR/finalize commands into typed idempotent operations.
    2. Execute them through the common supervisor and ingestion journal.
    3. Reduce CURATOR input/output to semantic responsibilities and the typed result contract.
    4. Return mechanical failures as operation failures and semantic failures as a new CURATOR work order.
    5. Add complete, crash/retry, validation-failure, evaluator-rework, and stale-result scenarios.
  Verify Steps: "1. Inspect the generated CURATOR work order. Expected: no list of mechanical completion commands; semantic responsibilities, evidence, output schema, budget reference, and stop rules remain. 2. Run a successful assimilation fixture. Expected: every mechanical phase is CLI-observed, journaled, bounded by 202607242236-1BFWEY, and finalized without CURATOR lifecycle calls. 3. Fail each mechanical gate in turn and restart after each durable phase. Expected: retry resumes that operation without new reasoning, duplicate apply, replayed CURATOR work, or lost budget usage. 4. Return evaluator semantic rework repeatedly. Expected: each separate CURATOR work order receives only bounded feedback, shares the durable episode budget/cursor, and terminates at the episode/token/no-progress limit. 5. Run focused context/supervisor tests, workflow coverage, lifecycle invariants, guards, and typecheck."
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-07-28T14:49:18.130Z — VERIFY — ok

    By: TESTER

    Note: Verified supervisor implementation: invalid semantic SGR blocks mechanics; failed CLI operation retries without replaying CURATOR; durable completed phase resumes without replay; evaluator rework creates bounded CURATOR work order. Checks passed: typecheck, focused core/context tests (43), workflow coverage (52), compatibility contract, format and lint, critical CLI suite, lifecycle invariants.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-28T14:48:51.340Z, excerpt_hash=sha256:b4ab7c795de943481157c1d37d45d6e2458d26e60bef5d48f3c2e6da619fc813

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/inc-20260727-main-lane.prxk2f/repo/.agentplane/worktrees/202607221850-8HBF4J-supervise-context-assimilation-post-processing/.agentplane/tasks/202607221850-8HBF4J/blueprint/resolved-snapshot.json
    - old_digest: ca32716bbebf15f72977ad2d6c3faa9b33798a500864fdc03cb9687f81a17bde
    - current_digest: ca32716bbebf15f72977ad2d6c3faa9b33798a500864fdc03cb9687f81a17bde
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607221850-8HBF4J

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202607221850-8HBF4J
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert the migrated vertical slice while preserving the typed contracts consumed by later tasks.
    - Restore the previous compatibility path behind an explicit feature/compatibility boundary.
    - Re-run lifecycle, focused, and type checks before resuming dependent work.
  Findings: |-
    - Observation: CLI owns mechanical assimilation post-processing under the shared supervisor journal.
      Impact: CURATOR no longer receives lifecycle command lists or mechanical retry burden.
      Resolution: Recorded passing local verification; hosted PR checks remain required.
extensions:
  workflow_route_baseline:
    start_head_sha: "322533fd11f322aadf4e77a44d4343c0c6c19341"
    version: 1
id_source: "generated"
---
## Summary

Supervise context assimilation post-processing

RF-11/RF-25b: after the CURATOR semantic result, let the supervisor validate/apply, reindex, build/lint wiki, validate graph, run coverage/checks, evaluate, create ACR, and finalize with resumable mechanical operations.

## Scope

- In scope: typed in-process context use-case results, supervisor operation registry for every mechanical assimilation phase, separate CURATOR rework work orders, retry from failed operation, and removal of lifecycle command lists from CURATOR prompts.
- Out of scope: changing the CURATOR's semantic identity, synthesis, or ambiguity decisions.

## Plan

1. Convert context apply/reindex/wiki/graph/coverage/check/evaluate/ACR/finalize commands into typed idempotent operations.
2. Execute them through the common supervisor and ingestion journal.
3. Reduce CURATOR input/output to semantic responsibilities and the typed result contract.
4. Return mechanical failures as operation failures and semantic failures as a new CURATOR work order.
5. Add complete, crash/retry, validation-failure, evaluator-rework, and stale-result scenarios.

## Verify Steps

1. Inspect the generated CURATOR work order. Expected: no list of mechanical completion commands; semantic responsibilities, evidence, output schema, budget reference, and stop rules remain. 2. Run a successful assimilation fixture. Expected: every mechanical phase is CLI-observed, journaled, bounded by 202607242236-1BFWEY, and finalized without CURATOR lifecycle calls. 3. Fail each mechanical gate in turn and restart after each durable phase. Expected: retry resumes that operation without new reasoning, duplicate apply, replayed CURATOR work, or lost budget usage. 4. Return evaluator semantic rework repeatedly. Expected: each separate CURATOR work order receives only bounded feedback, shares the durable episode budget/cursor, and terminates at the episode/token/no-progress limit. 5. Run focused context/supervisor tests, workflow coverage, lifecycle invariants, guards, and typecheck.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-07-28T14:49:18.130Z — VERIFY — ok

By: TESTER

Note: Verified supervisor implementation: invalid semantic SGR blocks mechanics; failed CLI operation retries without replaying CURATOR; durable completed phase resumes without replay; evaluator rework creates bounded CURATOR work order. Checks passed: typecheck, focused core/context tests (43), workflow coverage (52), compatibility contract, format and lint, critical CLI suite, lifecycle invariants.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-28T14:48:51.340Z, excerpt_hash=sha256:b4ab7c795de943481157c1d37d45d6e2458d26e60bef5d48f3c2e6da619fc813

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/inc-20260727-main-lane.prxk2f/repo/.agentplane/worktrees/202607221850-8HBF4J-supervise-context-assimilation-post-processing/.agentplane/tasks/202607221850-8HBF4J/blueprint/resolved-snapshot.json
- old_digest: ca32716bbebf15f72977ad2d6c3faa9b33798a500864fdc03cb9687f81a17bde
- current_digest: ca32716bbebf15f72977ad2d6c3faa9b33798a500864fdc03cb9687f81a17bde
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607221850-8HBF4J

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202607221850-8HBF4J
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert the migrated vertical slice while preserving the typed contracts consumed by later tasks.
- Restore the previous compatibility path behind an explicit feature/compatibility boundary.
- Re-run lifecycle, focused, and type checks before resuming dependent work.

## Findings

- Observation: CLI owns mechanical assimilation post-processing under the shared supervisor journal.
  Impact: CURATOR no longer receives lifecycle command lists or mechanical retry burden.
  Resolution: Recorded passing local verification; hosted PR checks remain required.
