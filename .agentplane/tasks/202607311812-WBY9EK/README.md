---
id: "202607311812-WBY9EK"
title: "Publish resolved DONE conflict heads before semantic rework gating"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 8
origin:
  system: "manual"
depends_on: []
tags:
  - "workflow.routing"
verify:
  - "Critical CLI suite and typecheck pass."
  - "Focused conflict-rework and route projection tests pass."
plan_approval:
  state: "approved"
  updated_at: "2026-07-31T18:12:29.998Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-07-31T18:19:56.955Z"
  updated_by: "TESTER"
  note: "PASS at ec05273fe448 under the PLANNER-authored contract: 35 focused tests prove verified DONE/no-queue fast-forward publication and aligned-authority gating; all 12 critical chunks, typecheck, routing, format, and diff checks pass."
  attempts: 0
quality_review:
  state: "pass"
  provenance: "evaluator_supplied"
  updated_at: "2026-07-31T18:20:00.219Z"
  updated_by: "EVALUATOR"
  note: "EVALUATOR returned pass with 2 typed finding(s)."
  evaluated_sha: "ec05273fe44825a864f54aef15865b80afeeb847"
  blueprint_digest: "811859237d1e336a22045da7dbb31a7f329f2ca34c058ea0ecc8483282d8ea04"
  evidence_refs:
    - ".agentplane/tasks/202607311812-WBY9EK/quality/20260731-182000115-recovery-context/evaluator-work-order.json"
    - ".agentplane/tasks/202607311812-WBY9EK/quality/20260731-182000115-recovery-context/quality-report.json"
    - ".agentplane/tasks/202607311812-WBY9EK/quality/20260731-182000115-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202607311812-WBY9EK/quality/20260731-182000115-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202607311812-WBY9EK/quality/20260731-182000115-recovery-context/evaluator-result.json"
    - ".agentplane/tasks/202607311812-WBY9EK/README.md"
    - ".agentplane/tasks/202607311812-WBY9EK/quality/20260731-182000115-recovery-context/evaluator-diff.patch"
    - ".agentplane/tasks/202607311812-WBY9EK/quality/20260731-182000115-recovery-context/evaluator-observed-checks.json"
    - ".agentplane/tasks/202607311812-WBY9EK/quality/20260731-182000115-recovery-context/evaluator-blueprint.json"
    - ".agentplane/policy/dod.code.md"
    - ".agentplane/policy/dod.core.md"
    - ".agentplane/policy/security.must.md"
    - ".agentplane/policy/workflow.branch_pr.md"
  findings:
    - "A clean verified DOING or DONE local head may be published only when the stale provider head is its strict ancestor; branch identity, protected base, clean worktree, status, and verification are checked first."
    - "After provider/local heads align, DONE tasks without current queue or handoff evidence remain ineligible for semantic conflict rework."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
events:
  -
    type: "status"
    at: "2026-07-31T18:13:29.425Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "verify"
    at: "2026-07-31T18:18:09.839Z"
    author: "TESTER"
    state: "ok"
    note: "PASS at ec05273fe448: verified DONE/no-queue fast-forward routes to guarded publication; aligned conflict remains authority-gated; 35 focused tests, 12 critical chunks, typecheck, routing, format, and diff checks pass."
  -
    type: "verify"
    at: "2026-07-31T18:19:56.955Z"
    author: "TESTER"
    state: "ok"
    note: "PASS at ec05273fe448 under the PLANNER-authored contract: 35 focused tests prove verified DONE/no-queue fast-forward publication and aligned-authority gating; all 12 critical chunks, typecheck, routing, format, and diff checks pass."
doc_version: 3
doc_updated_at: "2026-07-31T18:19:57.768Z"
doc_updated_by: "CODER"
description: "When a verified DONE task has a clean local branch that strictly fast-forwards the stale conflicting provider head, route guarded non-force publication before requiring semantic conflict queue or handoff evidence; preserve fail-closed behavior for divergence, dirty worktrees, unverified tasks, and still-conflicting aligned heads."
sections:
  Summary: |-
    Publish resolved DONE conflict heads before semantic rework gating

    When a verified DONE task has a clean local branch that strictly fast-forwards the stale conflicting provider head, route guarded non-force publication before requiring semantic conflict queue or handoff evidence; preserve fail-closed behavior for divergence, dirty worktrees, unverified tasks, and still-conflicting aligned heads.
  Scope: |-
    - In scope: When a verified DONE task has a clean local branch that strictly fast-forwards the stale conflicting provider head, route guarded non-force publication before requiring semantic conflict queue or handoff evidence; preserve fail-closed behavior for divergence, dirty worktrees, unverified tasks, and still-conflicting aligned heads.
    - Out of scope: unrelated refactors not required for "Publish resolved DONE conflict heads before semantic rework gating".
  Plan: "1. Reproduce the verified DONE/no-queue stale provider conflict where the clean local head strictly fast-forwards the provider head. 2. Move only guarded fast-forward publication ahead of semantic route eligibility while retaining verification/status, protected-base, clean-worktree, branch identity, and ancestry checks. 3. Add unit and CLI route regressions for the resolved-conflict closeout path plus fail-closed divergent/unverified cases. 4. Run focused route tests, typecheck, and critical CLI checks; record independent verification and evaluator evidence. 5. Merge the repair, then resume CT2725 publication from live provider truth."
  Verify Steps: |-
    1. Run `bunx vitest run packages/agentplane/src/commands/pr/conflict-rework.test.ts packages/agentplane/src/cli/run-cli.core.pr-conflict-rework.test.ts`. Expected: a verified DONE task without queue/handoff routes a clean strict provider-head descendant to guarded non-force publication; after heads align, unresolved conflicts still require semantic route authority; divergent, dirty, and unverified cases remain fail-closed.
    2. Run `bun run typecheck`, `node .agentplane/policy/check-routing.mjs`, and formatting/diff checks for touched files. Expected: all static and routing contracts pass without unrelated changes.
    3. Run `bun run test:critical`. Expected: all critical CLI chunks pass, including side-effect authority, route safety, and trust-boundary regressions.
    4. Review the final diff and task evidence. Expected: changes remain bounded to conflict-rework preparation ordering and its unit/CLI regression coverage; no force-push, automatic merge/rebase, queue mutation, or weakened semantic authority is introduced.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-07-31T18:18:09.839Z — VERIFY — ok

    By: TESTER

    Note: PASS at ec05273fe448: verified DONE/no-queue fast-forward routes to guarded publication; aligned conflict remains authority-gated; 35 focused tests, 12 critical chunks, typecheck, routing, format, and diff checks pass.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-31T18:13:29.425Z, excerpt_hash=sha256:20edfb5f60809a3436f94714767006b56a2513fea97bb46702b1ccd78bcb5b42

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202607311812-WBY9EK-publish-resolved-done-conflict-heads-before-sema/.agentplane/tasks/202607311812-WBY9EK/blueprint/resolved-snapshot.json
    - old_digest: 811859237d1e336a22045da7dbb31a7f329f2ca34c058ea0ecc8483282d8ea04
    - current_digest: 811859237d1e336a22045da7dbb31a7f329f2ca34c058ea0ecc8483282d8ea04
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607311812-WBY9EK

    DecisionContextRef:
    - operator_action: provider_action
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: none
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    ### 2026-07-31T18:19:56.955Z — VERIFY — ok

    By: TESTER

    Note: PASS at ec05273fe448 under the PLANNER-authored contract: 35 focused tests prove verified DONE/no-queue fast-forward publication and aligned-authority gating; all 12 critical chunks, typecheck, routing, format, and diff checks pass.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-31T18:18:33.169Z, excerpt_hash=sha256:5b10453a492623ff2849150259e77233cbfc8d36735121620706d48ff4a23cea

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202607311812-WBY9EK-publish-resolved-done-conflict-heads-before-sema/.agentplane/tasks/202607311812-WBY9EK/blueprint/resolved-snapshot.json
    - old_digest: 811859237d1e336a22045da7dbb31a7f329f2ca34c058ea0ecc8483282d8ea04
    - current_digest: 811859237d1e336a22045da7dbb31a7f329f2ca34c058ea0ecc8483282d8ea04
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607311812-WBY9EK

    DecisionContextRef:
    - operator_action: provider_action
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
  Findings: ""
extensions:
  workflow_route_baseline:
    start_head_sha: "9eb65c88341f2495a0a1f11865eb38c4978b2ef3"
    version: 1
id_source: "generated"
---
## Summary

Publish resolved DONE conflict heads before semantic rework gating

When a verified DONE task has a clean local branch that strictly fast-forwards the stale conflicting provider head, route guarded non-force publication before requiring semantic conflict queue or handoff evidence; preserve fail-closed behavior for divergence, dirty worktrees, unverified tasks, and still-conflicting aligned heads.

## Scope

- In scope: When a verified DONE task has a clean local branch that strictly fast-forwards the stale conflicting provider head, route guarded non-force publication before requiring semantic conflict queue or handoff evidence; preserve fail-closed behavior for divergence, dirty worktrees, unverified tasks, and still-conflicting aligned heads.
- Out of scope: unrelated refactors not required for "Publish resolved DONE conflict heads before semantic rework gating".

## Plan

1. Reproduce the verified DONE/no-queue stale provider conflict where the clean local head strictly fast-forwards the provider head. 2. Move only guarded fast-forward publication ahead of semantic route eligibility while retaining verification/status, protected-base, clean-worktree, branch identity, and ancestry checks. 3. Add unit and CLI route regressions for the resolved-conflict closeout path plus fail-closed divergent/unverified cases. 4. Run focused route tests, typecheck, and critical CLI checks; record independent verification and evaluator evidence. 5. Merge the repair, then resume CT2725 publication from live provider truth.

## Verify Steps

1. Run `bunx vitest run packages/agentplane/src/commands/pr/conflict-rework.test.ts packages/agentplane/src/cli/run-cli.core.pr-conflict-rework.test.ts`. Expected: a verified DONE task without queue/handoff routes a clean strict provider-head descendant to guarded non-force publication; after heads align, unresolved conflicts still require semantic route authority; divergent, dirty, and unverified cases remain fail-closed.
2. Run `bun run typecheck`, `node .agentplane/policy/check-routing.mjs`, and formatting/diff checks for touched files. Expected: all static and routing contracts pass without unrelated changes.
3. Run `bun run test:critical`. Expected: all critical CLI chunks pass, including side-effect authority, route safety, and trust-boundary regressions.
4. Review the final diff and task evidence. Expected: changes remain bounded to conflict-rework preparation ordering and its unit/CLI regression coverage; no force-push, automatic merge/rebase, queue mutation, or weakened semantic authority is introduced.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-07-31T18:18:09.839Z — VERIFY — ok

By: TESTER

Note: PASS at ec05273fe448: verified DONE/no-queue fast-forward routes to guarded publication; aligned conflict remains authority-gated; 35 focused tests, 12 critical chunks, typecheck, routing, format, and diff checks pass.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-31T18:13:29.425Z, excerpt_hash=sha256:20edfb5f60809a3436f94714767006b56a2513fea97bb46702b1ccd78bcb5b42

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202607311812-WBY9EK-publish-resolved-done-conflict-heads-before-sema/.agentplane/tasks/202607311812-WBY9EK/blueprint/resolved-snapshot.json
- old_digest: 811859237d1e336a22045da7dbb31a7f329f2ca34c058ea0ecc8483282d8ea04
- current_digest: 811859237d1e336a22045da7dbb31a7f329f2ca34c058ea0ecc8483282d8ea04
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607311812-WBY9EK

DecisionContextRef:
- operator_action: provider_action
- can_execute_now: false
- safe_command: none
- diagnostic_command: none
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

### 2026-07-31T18:19:56.955Z — VERIFY — ok

By: TESTER

Note: PASS at ec05273fe448 under the PLANNER-authored contract: 35 focused tests prove verified DONE/no-queue fast-forward publication and aligned-authority gating; all 12 critical chunks, typecheck, routing, format, and diff checks pass.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-31T18:18:33.169Z, excerpt_hash=sha256:5b10453a492623ff2849150259e77233cbfc8d36735121620706d48ff4a23cea

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202607311812-WBY9EK-publish-resolved-done-conflict-heads-before-sema/.agentplane/tasks/202607311812-WBY9EK/blueprint/resolved-snapshot.json
- old_digest: 811859237d1e336a22045da7dbb31a7f329f2ca34c058ea0ecc8483282d8ea04
- current_digest: 811859237d1e336a22045da7dbb31a7f329f2ca34c058ea0ecc8483282d8ea04
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607311812-WBY9EK

DecisionContextRef:
- operator_action: provider_action
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
