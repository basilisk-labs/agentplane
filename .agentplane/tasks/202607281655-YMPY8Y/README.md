---
id: "202607281655-YMPY8Y"
title: "Authorize replacement evaluator episodes after terminal failure"
result_summary: "pre-merge closure"
status: "DONE"
priority: "med"
owner: "CODER"
revision: 27
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "evaluator"
  - "recovery"
  - "refactor"
  - "supervisor"
  - "v0.7"
verify:
  - "bunx vitest run packages/core/src/runner/supervisor-execution-episode.test.ts packages/agentplane/src/commands/evaluator/evaluator-execute.command.test.ts --testTimeout 60000"
  - "bun run typecheck"
  - "bun run format:changed"
  - "node .agentplane/policy/check-routing.mjs"
  - "agentplane evaluator execute 202607221850-8HBF4J --replacement"
plan_approval:
  state: "approved"
  updated_at: "2026-07-28T16:55:45.384Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-07-28T19:19:01.764Z"
  updated_by: "TESTER"
  note: "Hosted CI rework verified: refreshed CLI reference and lint-safe evaluator paths; local verify-contract and verify-static parity checks pass."
  attempts: 0
quality_review:
  state: "pass"
  provenance: "evaluator_supplied"
  updated_at: "2026-07-28T19:21:00.389Z"
  updated_by: "EVALUATOR"
  note: "EVALUATOR returned pass with 1 typed finding(s)."
  evaluated_sha: "9ea452754fe4fbabf259cad263a0279aa78f3d2f"
  blueprint_digest: "34e29918e43eeb804003f15d8f35f548f11ce9abec4fd702725f31e2be11b138"
  evidence_refs:
    - ".agentplane/tasks/202607281655-YMPY8Y/quality/20260728-191951897-recovery-context/evaluator-work-order.json"
    - ".agentplane/tasks/202607281655-YMPY8Y/quality/20260728-191951897-recovery-context/quality-report.json"
    - ".agentplane/tasks/202607281655-YMPY8Y/quality/20260728-191951897-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202607281655-YMPY8Y/quality/20260728-191951897-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202607281655-YMPY8Y/quality/20260728-191951897-recovery-context/evaluator-result.json"
    - ".agentplane/tasks/202607281655-YMPY8Y/README.md"
    - ".agentplane/tasks/202607281655-YMPY8Y/quality/20260728-191951897-recovery-context/evaluator-diff.patch"
    - ".agentplane/tasks/202607281655-YMPY8Y/quality/20260728-191951897-recovery-context/evaluator-observed-checks.json"
    - ".agentplane/tasks/202607281655-YMPY8Y/verification/20260728-181738-replacement-rework.json"
    - ".agentplane/tasks/202607281655-YMPY8Y/verification/20260728-184101-compatibility-ratchet.json"
    - ".agentplane/tasks/202607281655-YMPY8Y/verification/20260728-191822-hosted-ci-rework.json"
    - ".agentplane/tasks/202607281655-YMPY8Y/quality/20260728-191951897-recovery-context/evaluator-blueprint.json"
    - ".agentplane/policy/dod.code.md"
    - ".agentplane/policy/dod.core.md"
    - ".agentplane/policy/security.must.md"
    - ".agentplane/policy/workflow.branch_pr.md"
  findings:
    - "Frozen evidence shows the hosted-CI rework is limited to generated CLI documentation and lint-safe refactoring, while focused replacement, compatibility, type, format, routing, and concurrency-sensitive checks remain green."
commit:
  hash: "411792b907528fd6654997f139c8707816ebc3a7"
  message: "🔍 YMPY8Y evaluator: record replacement quality pass"
comments:
  -
    author: "CODER"
    body: "Start: add the explicit, auditable replacement evaluator path required to continue the blocked semantic review without replaying the failed provider operation."
  -
    author: "CODER"
    body: "Verified: pre-merge closure packet is ready for the task PR."
  -
    author: "CODER"
    body: "Verified: refreshed pre-merge closure packet is ready for the task PR."
events:
  -
    type: "status"
    at: "2026-07-28T16:55:51.958Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: add the explicit, auditable replacement evaluator path required to continue the blocked semantic review without replaying the failed provider operation."
  -
    type: "status"
    at: "2026-07-28T17:44:41.959Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
  -
    type: "verify"
    at: "2026-07-28T17:45:35.786Z"
    author: "TESTER"
    state: "ok"
    note: "Focused replacement coverage passed: 19 tests; typecheck, changed-format, policy routing, and diff check passed. The required live replacement evaluator episode for 202607221850-8HBF4J remains an explicit post-integration proof."
  -
    type: "status"
    at: "2026-07-28T17:56:57.617Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
  -
    type: "verify"
    at: "2026-07-28T17:57:16.339Z"
    author: "TESTER"
    state: "ok"
    note: "Rework verification passed: 19 focused supervisor/evaluator tests, typecheck, changed-format, policy routing, and diff check. Task metadata now freezes these commands; the real replacement provider episode for 202607221850-8HBF4J remains an explicit post-integration proof."
  -
    type: "verify"
    at: "2026-07-28T18:18:08.153Z"
    author: "TESTER"
    state: "ok"
    note: "Rework verification passed with durable command-level records; the post-integration 8H replacement remains an explicit release gate."
  -
    type: "verify"
    at: "2026-07-28T18:24:08.495Z"
    author: "TESTER"
    state: "ok"
    note: "Rework verification passed on a6f138a66591 with exact command-level evidence; the real 8H replacement remains the explicit post-integration gate."
  -
    type: "status"
    at: "2026-07-28T18:27:26.244Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: pre-merge closure packet is ready for the task PR."
  -
    type: "verify"
    at: "2026-07-28T18:42:31.263Z"
    author: "TESTER"
    state: "ok"
    note: "Compatibility ratchet verification passed for implementation 4aaa436b1; critical CLI, focused replacement, typecheck, format, and routing checks are frozen in 20260728-184101-compatibility-ratchet.json."
  -
    type: "status"
    at: "2026-07-28T19:02:30.846Z"
    author: "CODER"
    from: "DONE"
    to: "DONE"
    note: "Verified: refreshed pre-merge closure packet is ready for the task PR."
  -
    type: "verify"
    at: "2026-07-28T19:19:01.764Z"
    author: "TESTER"
    state: "ok"
    note: "Hosted CI rework verified: refreshed CLI reference and lint-safe evaluator paths; local verify-contract and verify-static parity checks pass."
doc_version: 3
doc_updated_at: "2026-07-28T19:19:04.613Z"
doc_updated_by: "CODER"
description: "Allow an explicitly authorized replacement evaluator episode after a terminal operation_failed journal without reopening or mutating the failed operation. Preserve durable history, usage, and effect-in-doubt fail-closed behavior so a pre-provider failure does not permanently block an independent semantic review."
sections:
  Summary: |-
    Authorize replacement evaluator episodes after terminal failure

    Allow an explicitly authorized replacement evaluator episode after a terminal operation_failed journal without reopening or mutating the failed operation. Preserve durable history, usage, and effect-in-doubt fail-closed behavior so a pre-provider failure does not permanently block an independent semantic review.
  Scope: |-
    - In scope: Allow an explicitly authorized replacement evaluator episode after a terminal operation_failed journal without reopening or mutating the failed operation. Preserve durable history, usage, and effect-in-doubt fail-closed behavior so a pre-provider failure does not permanently block an independent semantic review.
    - Out of scope: unrelated refactors not required for "Authorize replacement evaluator episodes after terminal failure".
  Plan: "1. Inspect the terminal evaluator journal and existing provider boundary to define a distinct replacement operation, not a retry. 2. Add an explicit replacement-only execution path that preserves failed operation history and accumulated usage, starts a new bounded episode, and refuses effect_in_doubt or implicit replay. 3. Cover operation_failed replacement, terminal-effect rejection, default no-retry behavior, and command-level persistence. 4. Run focused supervisor/evaluator tests, typecheck, formatting, routing, and one real read-only replacement provider episode before publishing."
  Verify Steps: |-
    1. Run `bunx vitest run packages/core/src/runner/supervisor-execution-episode.test.ts packages/agentplane/src/commands/evaluator/evaluator-execute.command.test.ts --testTimeout 60000`.
       Expected: default retry remains blocked; `--replacement` creates a distinct bounded evaluator episode linked to the failed operation; `effect_in_doubt` and exhausted budgets remain terminal.

    2. Run `bun run typecheck && bun run format:changed`.
       Expected: type and formatting gates pass.

    3. Run `node .agentplane/policy/check-routing.mjs`.
       Expected: policy routing validation passes.

    4. After integration, run one real `--replacement` evaluator episode for `202607221850-8HBF4J`.
       Expected: the original `operation_failed` record is retained and a distinct provider work order completes without replaying it.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-07-28T17:45:35.786Z — VERIFY — ok

    By: TESTER

    Note: Focused replacement coverage passed: 19 tests; typecheck, changed-format, policy routing, and diff check passed. The required live replacement evaluator episode for 202607221850-8HBF4J remains an explicit post-integration proof.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-28T17:44:41.959Z, excerpt_hash=sha256:0f087dbea8b3ad632e23903978529270f8b4914cdb0875b69280177860432135

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/inc-20260727-main-lane.prxk2f/repo/.agentplane/worktrees/202607281655-YMPY8Y-authorize-replacement-evaluator-episodes-after-t/.agentplane/tasks/202607281655-YMPY8Y/blueprint/resolved-snapshot.json
    - old_digest: 34e29918e43eeb804003f15d8f35f548f11ce9abec4fd702725f31e2be11b138
    - current_digest: 34e29918e43eeb804003f15d8f35f548f11ce9abec4fd702725f31e2be11b138
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607281655-YMPY8Y

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202607281655-YMPY8Y
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    ### 2026-07-28T17:57:16.339Z — VERIFY — ok

    By: TESTER

    Note: Rework verification passed: 19 focused supervisor/evaluator tests, typecheck, changed-format, policy routing, and diff check. Task metadata now freezes these commands; the real replacement provider episode for 202607221850-8HBF4J remains an explicit post-integration proof.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-28T17:56:57.617Z, excerpt_hash=sha256:0f087dbea8b3ad632e23903978529270f8b4914cdb0875b69280177860432135

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/inc-20260727-main-lane.prxk2f/repo/.agentplane/worktrees/202607281655-YMPY8Y-authorize-replacement-evaluator-episodes-after-t/.agentplane/tasks/202607281655-YMPY8Y/blueprint/resolved-snapshot.json
    - old_digest: 34e29918e43eeb804003f15d8f35f548f11ce9abec4fd702725f31e2be11b138
    - current_digest: 34e29918e43eeb804003f15d8f35f548f11ce9abec4fd702725f31e2be11b138
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607281655-YMPY8Y

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

    ### 2026-07-28T18:18:08.153Z — VERIFY — ok

    By: TESTER

    Note: Rework verification passed with durable command-level records; the post-integration 8H replacement remains an explicit release gate.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-28T17:57:17.079Z, excerpt_hash=sha256:0f087dbea8b3ad632e23903978529270f8b4914cdb0875b69280177860432135

    Details:

    Command-level execution record: .agentplane/tasks/202607281655-YMPY8Y/verification/20260728-181738-replacement-rework.json

    Scope: commit 8d242418bcd6fce80fa6ff6729fa996bc389d2b4; replacement CAS, cross-process contention, and interrupted-reservation recovery.

    Evidence manifest: .agentplane/tasks/202607281655-YMPY8Y/evidence/manifest.json (generated and verified after this record).

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/inc-20260727-main-lane.prxk2f/repo/.agentplane/worktrees/202607281655-YMPY8Y-authorize-replacement-evaluator-episodes-after-t/.agentplane/tasks/202607281655-YMPY8Y/blueprint/resolved-snapshot.json
    - old_digest: 34e29918e43eeb804003f15d8f35f548f11ce9abec4fd702725f31e2be11b138
    - current_digest: 34e29918e43eeb804003f15d8f35f548f11ce9abec4fd702725f31e2be11b138
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607281655-YMPY8Y

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

    ### 2026-07-28T18:24:08.495Z — VERIFY — ok

    By: TESTER

    Note: Rework verification passed on a6f138a66591 with exact command-level evidence; the real 8H replacement remains the explicit post-integration gate.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-28T18:18:08.889Z, excerpt_hash=sha256:0f087dbea8b3ad632e23903978529270f8b4914cdb0875b69280177860432135

    Details:

    Command-level execution record: .agentplane/tasks/202607281655-YMPY8Y/verification/20260728-181738-replacement-rework.json

    Implementation SHA: a6f138a66591a729333a69c3e2af718b9a339e73

    Recorded commands: 22 focused tests, typecheck, changed-format, and policy routing all exited 0.

    Evidence manifest: .agentplane/tasks/202607281655-YMPY8Y/evidence/manifest.json

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/inc-20260727-main-lane.prxk2f/repo/.agentplane/worktrees/202607281655-YMPY8Y-authorize-replacement-evaluator-episodes-after-t/.agentplane/tasks/202607281655-YMPY8Y/blueprint/resolved-snapshot.json
    - old_digest: 34e29918e43eeb804003f15d8f35f548f11ce9abec4fd702725f31e2be11b138
    - current_digest: 34e29918e43eeb804003f15d8f35f548f11ce9abec4fd702725f31e2be11b138
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607281655-YMPY8Y

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

    ### 2026-07-28T18:42:31.263Z — VERIFY — ok

    By: TESTER

    Note: Compatibility ratchet verification passed for implementation 4aaa436b1; critical CLI, focused replacement, typecheck, format, and routing checks are frozen in 20260728-184101-compatibility-ratchet.json.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-28T18:27:26.244Z, excerpt_hash=sha256:0f087dbea8b3ad632e23903978529270f8b4914cdb0875b69280177860432135

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/inc-20260727-main-lane.prxk2f/repo/.agentplane/worktrees/202607281655-YMPY8Y-authorize-replacement-evaluator-episodes-after-t/.agentplane/tasks/202607281655-YMPY8Y/blueprint/resolved-snapshot.json
    - old_digest: 34e29918e43eeb804003f15d8f35f548f11ce9abec4fd702725f31e2be11b138
    - current_digest: 34e29918e43eeb804003f15d8f35f548f11ce9abec4fd702725f31e2be11b138
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607281655-YMPY8Y

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

    ### 2026-07-28T19:19:01.764Z — VERIFY — ok

    By: TESTER

    Note: Hosted CI rework verified: refreshed CLI reference and lint-safe evaluator paths; local verify-contract and verify-static parity checks pass.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-28T19:02:30.847Z, excerpt_hash=sha256:0f087dbea8b3ad632e23903978529270f8b4914cdb0875b69280177860432135

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/inc-20260727-main-lane.prxk2f/repo/.agentplane/worktrees/202607281655-YMPY8Y-authorize-replacement-evaluator-episodes-after-t/.agentplane/tasks/202607281655-YMPY8Y/blueprint/resolved-snapshot.json
    - old_digest: 34e29918e43eeb804003f15d8f35f548f11ce9abec4fd702725f31e2be11b138
    - current_digest: 34e29918e43eeb804003f15d8f35f548f11ce9abec4fd702725f31e2be11b138
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607281655-YMPY8Y

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
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Default retry remains terminal; explicit replacement records a distinct linked operation; effect_in_doubt and exhausted budgets are rejected.
      Impact: A known provider failure can be replaced only through an auditable bounded operation without mutating prior history.
      Resolution: Local verification is recorded; run the real replacement provider episode after integration before closing the dependent recovery task.

    - Observation: The journal persists a pending replacement key and start consumes it only for the exact failed operation with the same role and kind; arbitrary, unbound, effect-in-doubt, and exhausted replacements are rejected.
      Impact: Replacement authorization is now atomic at the journal transition, preventing an unrelated provider operation from consuming a terminal failure recovery path.
      Resolution: Run the retained post-integration provider proof after the feature merges, then close the dependent recovery task.

    - Observation: verify-contract and verify-static failed only on stale generated documentation and lint findings.
      Impact: PR #4664 could not enter integration until the generated artifact and static checks were repaired.
      Resolution: Regenerated docs/user/cli-reference.generated.mdx, resolved ten lint findings, and froze local parity checks at 9ea452754fe4fbabf259cad263a0279aa78f3d2f.
extensions:
  implementation_commit:
    hash: "7d46071af90efdbfc80473de79339cb44148c27e"
    message: "🧪 YMPY8Y task: freeze compatibility ratchet verification"
  workflow_route_baseline:
    start_head_sha: "a9b9d6a834893013c30b5046d0c618cb23553638"
    version: 1
id_source: "generated"
---
## Summary

Authorize replacement evaluator episodes after terminal failure

Allow an explicitly authorized replacement evaluator episode after a terminal operation_failed journal without reopening or mutating the failed operation. Preserve durable history, usage, and effect-in-doubt fail-closed behavior so a pre-provider failure does not permanently block an independent semantic review.

## Scope

- In scope: Allow an explicitly authorized replacement evaluator episode after a terminal operation_failed journal without reopening or mutating the failed operation. Preserve durable history, usage, and effect-in-doubt fail-closed behavior so a pre-provider failure does not permanently block an independent semantic review.
- Out of scope: unrelated refactors not required for "Authorize replacement evaluator episodes after terminal failure".

## Plan

1. Inspect the terminal evaluator journal and existing provider boundary to define a distinct replacement operation, not a retry. 2. Add an explicit replacement-only execution path that preserves failed operation history and accumulated usage, starts a new bounded episode, and refuses effect_in_doubt or implicit replay. 3. Cover operation_failed replacement, terminal-effect rejection, default no-retry behavior, and command-level persistence. 4. Run focused supervisor/evaluator tests, typecheck, formatting, routing, and one real read-only replacement provider episode before publishing.

## Verify Steps

1. Run `bunx vitest run packages/core/src/runner/supervisor-execution-episode.test.ts packages/agentplane/src/commands/evaluator/evaluator-execute.command.test.ts --testTimeout 60000`.
   Expected: default retry remains blocked; `--replacement` creates a distinct bounded evaluator episode linked to the failed operation; `effect_in_doubt` and exhausted budgets remain terminal.

2. Run `bun run typecheck && bun run format:changed`.
   Expected: type and formatting gates pass.

3. Run `node .agentplane/policy/check-routing.mjs`.
   Expected: policy routing validation passes.

4. After integration, run one real `--replacement` evaluator episode for `202607221850-8HBF4J`.
   Expected: the original `operation_failed` record is retained and a distinct provider work order completes without replaying it.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-07-28T17:45:35.786Z — VERIFY — ok

By: TESTER

Note: Focused replacement coverage passed: 19 tests; typecheck, changed-format, policy routing, and diff check passed. The required live replacement evaluator episode for 202607221850-8HBF4J remains an explicit post-integration proof.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-28T17:44:41.959Z, excerpt_hash=sha256:0f087dbea8b3ad632e23903978529270f8b4914cdb0875b69280177860432135

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/inc-20260727-main-lane.prxk2f/repo/.agentplane/worktrees/202607281655-YMPY8Y-authorize-replacement-evaluator-episodes-after-t/.agentplane/tasks/202607281655-YMPY8Y/blueprint/resolved-snapshot.json
- old_digest: 34e29918e43eeb804003f15d8f35f548f11ce9abec4fd702725f31e2be11b138
- current_digest: 34e29918e43eeb804003f15d8f35f548f11ce9abec4fd702725f31e2be11b138
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607281655-YMPY8Y

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202607281655-YMPY8Y
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

### 2026-07-28T17:57:16.339Z — VERIFY — ok

By: TESTER

Note: Rework verification passed: 19 focused supervisor/evaluator tests, typecheck, changed-format, policy routing, and diff check. Task metadata now freezes these commands; the real replacement provider episode for 202607221850-8HBF4J remains an explicit post-integration proof.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-28T17:56:57.617Z, excerpt_hash=sha256:0f087dbea8b3ad632e23903978529270f8b4914cdb0875b69280177860432135

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/inc-20260727-main-lane.prxk2f/repo/.agentplane/worktrees/202607281655-YMPY8Y-authorize-replacement-evaluator-episodes-after-t/.agentplane/tasks/202607281655-YMPY8Y/blueprint/resolved-snapshot.json
- old_digest: 34e29918e43eeb804003f15d8f35f548f11ce9abec4fd702725f31e2be11b138
- current_digest: 34e29918e43eeb804003f15d8f35f548f11ce9abec4fd702725f31e2be11b138
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607281655-YMPY8Y

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

### 2026-07-28T18:18:08.153Z — VERIFY — ok

By: TESTER

Note: Rework verification passed with durable command-level records; the post-integration 8H replacement remains an explicit release gate.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-28T17:57:17.079Z, excerpt_hash=sha256:0f087dbea8b3ad632e23903978529270f8b4914cdb0875b69280177860432135

Details:

Command-level execution record: .agentplane/tasks/202607281655-YMPY8Y/verification/20260728-181738-replacement-rework.json

Scope: commit 8d242418bcd6fce80fa6ff6729fa996bc389d2b4; replacement CAS, cross-process contention, and interrupted-reservation recovery.

Evidence manifest: .agentplane/tasks/202607281655-YMPY8Y/evidence/manifest.json (generated and verified after this record).

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/inc-20260727-main-lane.prxk2f/repo/.agentplane/worktrees/202607281655-YMPY8Y-authorize-replacement-evaluator-episodes-after-t/.agentplane/tasks/202607281655-YMPY8Y/blueprint/resolved-snapshot.json
- old_digest: 34e29918e43eeb804003f15d8f35f548f11ce9abec4fd702725f31e2be11b138
- current_digest: 34e29918e43eeb804003f15d8f35f548f11ce9abec4fd702725f31e2be11b138
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607281655-YMPY8Y

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

### 2026-07-28T18:24:08.495Z — VERIFY — ok

By: TESTER

Note: Rework verification passed on a6f138a66591 with exact command-level evidence; the real 8H replacement remains the explicit post-integration gate.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-28T18:18:08.889Z, excerpt_hash=sha256:0f087dbea8b3ad632e23903978529270f8b4914cdb0875b69280177860432135

Details:

Command-level execution record: .agentplane/tasks/202607281655-YMPY8Y/verification/20260728-181738-replacement-rework.json

Implementation SHA: a6f138a66591a729333a69c3e2af718b9a339e73

Recorded commands: 22 focused tests, typecheck, changed-format, and policy routing all exited 0.

Evidence manifest: .agentplane/tasks/202607281655-YMPY8Y/evidence/manifest.json

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/inc-20260727-main-lane.prxk2f/repo/.agentplane/worktrees/202607281655-YMPY8Y-authorize-replacement-evaluator-episodes-after-t/.agentplane/tasks/202607281655-YMPY8Y/blueprint/resolved-snapshot.json
- old_digest: 34e29918e43eeb804003f15d8f35f548f11ce9abec4fd702725f31e2be11b138
- current_digest: 34e29918e43eeb804003f15d8f35f548f11ce9abec4fd702725f31e2be11b138
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607281655-YMPY8Y

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

### 2026-07-28T18:42:31.263Z — VERIFY — ok

By: TESTER

Note: Compatibility ratchet verification passed for implementation 4aaa436b1; critical CLI, focused replacement, typecheck, format, and routing checks are frozen in 20260728-184101-compatibility-ratchet.json.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-28T18:27:26.244Z, excerpt_hash=sha256:0f087dbea8b3ad632e23903978529270f8b4914cdb0875b69280177860432135

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/inc-20260727-main-lane.prxk2f/repo/.agentplane/worktrees/202607281655-YMPY8Y-authorize-replacement-evaluator-episodes-after-t/.agentplane/tasks/202607281655-YMPY8Y/blueprint/resolved-snapshot.json
- old_digest: 34e29918e43eeb804003f15d8f35f548f11ce9abec4fd702725f31e2be11b138
- current_digest: 34e29918e43eeb804003f15d8f35f548f11ce9abec4fd702725f31e2be11b138
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607281655-YMPY8Y

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

### 2026-07-28T19:19:01.764Z — VERIFY — ok

By: TESTER

Note: Hosted CI rework verified: refreshed CLI reference and lint-safe evaluator paths; local verify-contract and verify-static parity checks pass.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-28T19:02:30.847Z, excerpt_hash=sha256:0f087dbea8b3ad632e23903978529270f8b4914cdb0875b69280177860432135

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/inc-20260727-main-lane.prxk2f/repo/.agentplane/worktrees/202607281655-YMPY8Y-authorize-replacement-evaluator-episodes-after-t/.agentplane/tasks/202607281655-YMPY8Y/blueprint/resolved-snapshot.json
- old_digest: 34e29918e43eeb804003f15d8f35f548f11ce9abec4fd702725f31e2be11b138
- current_digest: 34e29918e43eeb804003f15d8f35f548f11ce9abec4fd702725f31e2be11b138
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607281655-YMPY8Y

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

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: Default retry remains terminal; explicit replacement records a distinct linked operation; effect_in_doubt and exhausted budgets are rejected.
  Impact: A known provider failure can be replaced only through an auditable bounded operation without mutating prior history.
  Resolution: Local verification is recorded; run the real replacement provider episode after integration before closing the dependent recovery task.

- Observation: The journal persists a pending replacement key and start consumes it only for the exact failed operation with the same role and kind; arbitrary, unbound, effect-in-doubt, and exhausted replacements are rejected.
  Impact: Replacement authorization is now atomic at the journal transition, preventing an unrelated provider operation from consuming a terminal failure recovery path.
  Resolution: Run the retained post-integration provider proof after the feature merges, then close the dependent recovery task.

- Observation: verify-contract and verify-static failed only on stale generated documentation and lint findings.
  Impact: PR #4664 could not enter integration until the generated artifact and static checks were repaired.
  Resolution: Regenerated docs/user/cli-reference.generated.mdx, resolved ten lint findings, and froze local parity checks at 9ea452754fe4fbabf259cad263a0279aa78f3d2f.
