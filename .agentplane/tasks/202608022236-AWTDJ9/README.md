---
id: "202608022236-AWTDJ9"
title: "Preserve verification freshness after rebase merge"
result_summary: "pre-merge closure"
status: "DONE"
priority: "high"
owner: "CODER"
revision: 9
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "routing"
  - "v0.7.1"
  - "verification"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-08-02T22:36:50.938Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-08-02T22:44:56.087Z"
  updated_by: "TESTER"
  note: "Verified at bfb6abc89: hosted rebase-merge evidence remains current and active-branch freshness remains fail-closed."
  attempts: 0
quality_review:
  state: "pass"
  provenance: "evaluator_supplied"
  updated_at: "2026-08-02T22:45:36.394Z"
  updated_by: "EVALUATOR"
  note: "EVALUATOR returned pass with 3 typed finding(s)."
  evaluated_sha: "bfb6abc89187231c2497ef737c67e98a45e997b2"
  blueprint_digest: "c7df3b836248f7c038ddb561e0608f660f2f35a1d313ccbe918a432b16810ea5"
  evidence_refs:
    - ".agentplane/tasks/202608022236-AWTDJ9/quality/20260802-224536209-recovery-context/evaluator-work-order.json"
    - ".agentplane/tasks/202608022236-AWTDJ9/quality/20260802-224536209-recovery-context/quality-report.json"
    - ".agentplane/tasks/202608022236-AWTDJ9/quality/20260802-224536209-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202608022236-AWTDJ9/quality/20260802-224536209-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202608022236-AWTDJ9/quality/20260802-224536209-recovery-context/evaluator-result.json"
    - ".agentplane/tasks/202608022236-AWTDJ9/README.md"
    - ".agentplane/tasks/202608022236-AWTDJ9/quality/20260802-224536209-recovery-context/evaluator-diff.patch"
    - ".agentplane/tasks/202608022236-AWTDJ9/quality/20260802-224536209-recovery-context/evaluator-observed-checks.json"
    - ".agentplane/tasks/202608022236-AWTDJ9/verification/20260802224456087-ce8ce96bac3cbf49.json"
    - ".agentplane/tasks/202608022236-AWTDJ9/quality/20260802-224536209-recovery-context/evaluator-blueprint.json"
    - ".agentplane/policy/dod.code.md"
    - ".agentplane/policy/dod.core.md"
    - ".agentplane/policy/security.must.md"
    - ".agentplane/policy/workflow.branch_pr.md"
  findings:
    - "PASS: the terminal exception is narrowly gated by DONE status, passed quality review, MERGED provider state, recorded_on_base close tail, and a canonical 40-64 character hexadecimal evaluated SHA."
    - "PASS: active or open tasks still resolve the live task-branch head, so subsequent semantic commits continue to invalidate stale verification records."
    - "PASS: the behavior is proven by focused unit coverage, 14 route files / 60 tests, 79 critical tests, all static and size gates, and a live readback against merged PR 4748."
commit:
  hash: "dafc86b07cd0faafa3dbf6f0fa9dfc9bc284f164"
  message: "✅ AWTDJ9 task: record verification and evaluator pass"
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "CODER"
    body: "Implementation committed: preserve accepted verification evidence after hosted rebase merge without weakening active-branch freshness."
  -
    author: "CODER"
    body: "Verified: pre-merge closure packet is ready for the task PR."
events:
  -
    type: "status"
    at: "2026-08-02T22:37:28.364Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-08-02T22:43:02.006Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: preserve accepted verification evidence after hosted rebase merge without weakening active-branch freshness."
  -
    type: "verify"
    at: "2026-08-02T22:44:56.087Z"
    author: "TESTER"
    state: "ok"
    note: "Verified at bfb6abc89: hosted rebase-merge evidence remains current and active-branch freshness remains fail-closed."
  -
    type: "status"
    at: "2026-08-02T22:47:35.029Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: pre-merge closure packet is ready for the task PR."
doc_version: 3
doc_updated_at: "2026-08-02T22:47:35.029Z"
doc_updated_by: "CODER"
description: "Fix the branch_pr route oracle so a DONE task remains terminal after GitHub rebase-merge and hosted close, while still invalidating verification for new semantic commits on an active task branch."
sections:
  Summary: |-
    Preserve verification freshness after rebase merge

    Fix the branch_pr route oracle so a DONE task remains terminal after GitHub rebase-merge and hosted close, while still invalidating verification for new semantic commits on an active task branch.
  Scope: |-
    - In scope: Fix the branch_pr route oracle so a DONE task remains terminal after GitHub rebase-merge and hosted close, while still invalidating verification for new semantic commits on an active task branch.
    - Out of scope: unrelated refactors not required for "Preserve verification freshness after rebase merge".
  Plan: "1. Add a regression fixture for a DONE branch_pr task after GitHub rebase-merge and hosted-close sync, where the base HEAD differs from the verified pre-merge task head. 2. Change verification target selection so an available task-branch head remains authoritative for active work, while a missing merged branch falls back to the recorded task implementation/evaluator target before the base checkout head. 3. Prove stale semantic commits still invalidate prior evidence and rerun route, static, hotspot, policy, and critical suites."
  Verify Steps: |-
    1. Run the focused route-verification suites, including a post-rebase-merge/hosted-close fixture. Expected: the merged DONE task has no verification_required blocker, while a later semantic task-branch commit still produces verification_required.
    2. Run typecheck, lint:core, knip:check, hotspots:check, and the policy routing check. Expected: all gates pass without baseline growth.
    3. Run test:critical. Expected: all critical CLI chunks pass.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-08-02T22:44:56.087Z — VERIFY — ok

    By: TESTER

    Note: Verified at bfb6abc89: hosted rebase-merge evidence remains current and active-branch freshness remains fail-closed.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-02T22:43:02.006Z, excerpt_hash=sha256:5f91686f85e6a3b71536705721e1d7e2275f33198b7a050c2b0d0cf12244b668

    Details:

    Command: bunx vitest run packages/agentplane/src/commands/shared/route-decision*.test.ts packages/agentplane/src/commands/shared/task-verification-records.test.ts packages/agentplane/src/cli/run-cli.core.route-decision*.test.ts --maxWorkers=1 --fileParallelism=false
    Result: pass
    Evidence: 14 test files and 60 tests passed, including reviewed pre-rebase target selection and active branch head authority
    Scope: route oracle and verification freshness

    Command: ap task next-action 202608022128-39YSZ1 --remote --explain
    Result: pass
    Evidence: real merged PR 4748 routes to hosted_close_recorded_upstream with no verification_required blocker and evidence_missing none
    Scope: live post-rebase-merge regression

    Command: bun run typecheck; bun run lint:core; bun run knip:check; bun run hotspots:check; node .agentplane/policy/check-routing.mjs
    Result: pass
    Evidence: typecheck and lint passed, Knip baseline 539/539, hotspot and oversized-test baselines passed, policy routing OK
    Scope: static, dependency, size, and policy gates

    Command: bun run test:critical
    Result: pass
    Evidence: 12 chunks and 79 critical CLI tests passed
    Scope: critical CLI trust-boundary and efficiency regression suite

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608022236-AWTDJ9-preserve-verification-freshness-after-rebase-mer/.agentplane/tasks/202608022236-AWTDJ9/blueprint/resolved-snapshot.json
    - old_digest: c7df3b836248f7c038ddb561e0608f660f2f35a1d313ccbe918a432b16810ea5
    - current_digest: c7df3b836248f7c038ddb561e0608f660f2f35a1d313ccbe918a432b16810ea5
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608022236-AWTDJ9

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
  Findings: |-
    - Observation: A GitHub rebase merge rewrites base history and can make the base HEAD incomparable with the pre-merge verified SHA after branch cleanup.
      Impact: Using the base checkout head for a merged, hosted-closed task created a false verification_required blocker on completed work.
      Resolution: For DONE tasks with merged PR and hosted close recorded on base, bind verification to the canonical passed quality-review target; retain live branch-head resolution before merge.
extensions:
  implementation_commit:
    hash: "bfb6abc89187231c2497ef737c67e98a45e997b2"
    message: "🐛 AWTDJ9 verification: preserve merged task evidence"
  workflow_route_baseline:
    start_head_sha: "05423cade6f22a75b10a70cdbf7809d0c501377b"
    version: 1
id_source: "generated"
---
## Summary

Preserve verification freshness after rebase merge

Fix the branch_pr route oracle so a DONE task remains terminal after GitHub rebase-merge and hosted close, while still invalidating verification for new semantic commits on an active task branch.

## Scope

- In scope: Fix the branch_pr route oracle so a DONE task remains terminal after GitHub rebase-merge and hosted close, while still invalidating verification for new semantic commits on an active task branch.
- Out of scope: unrelated refactors not required for "Preserve verification freshness after rebase merge".

## Plan

1. Add a regression fixture for a DONE branch_pr task after GitHub rebase-merge and hosted-close sync, where the base HEAD differs from the verified pre-merge task head. 2. Change verification target selection so an available task-branch head remains authoritative for active work, while a missing merged branch falls back to the recorded task implementation/evaluator target before the base checkout head. 3. Prove stale semantic commits still invalidate prior evidence and rerun route, static, hotspot, policy, and critical suites.

## Verify Steps

1. Run the focused route-verification suites, including a post-rebase-merge/hosted-close fixture. Expected: the merged DONE task has no verification_required blocker, while a later semantic task-branch commit still produces verification_required.
2. Run typecheck, lint:core, knip:check, hotspots:check, and the policy routing check. Expected: all gates pass without baseline growth.
3. Run test:critical. Expected: all critical CLI chunks pass.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-08-02T22:44:56.087Z — VERIFY — ok

By: TESTER

Note: Verified at bfb6abc89: hosted rebase-merge evidence remains current and active-branch freshness remains fail-closed.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-02T22:43:02.006Z, excerpt_hash=sha256:5f91686f85e6a3b71536705721e1d7e2275f33198b7a050c2b0d0cf12244b668

Details:

Command: bunx vitest run packages/agentplane/src/commands/shared/route-decision*.test.ts packages/agentplane/src/commands/shared/task-verification-records.test.ts packages/agentplane/src/cli/run-cli.core.route-decision*.test.ts --maxWorkers=1 --fileParallelism=false
Result: pass
Evidence: 14 test files and 60 tests passed, including reviewed pre-rebase target selection and active branch head authority
Scope: route oracle and verification freshness

Command: ap task next-action 202608022128-39YSZ1 --remote --explain
Result: pass
Evidence: real merged PR 4748 routes to hosted_close_recorded_upstream with no verification_required blocker and evidence_missing none
Scope: live post-rebase-merge regression

Command: bun run typecheck; bun run lint:core; bun run knip:check; bun run hotspots:check; node .agentplane/policy/check-routing.mjs
Result: pass
Evidence: typecheck and lint passed, Knip baseline 539/539, hotspot and oversized-test baselines passed, policy routing OK
Scope: static, dependency, size, and policy gates

Command: bun run test:critical
Result: pass
Evidence: 12 chunks and 79 critical CLI tests passed
Scope: critical CLI trust-boundary and efficiency regression suite

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608022236-AWTDJ9-preserve-verification-freshness-after-rebase-mer/.agentplane/tasks/202608022236-AWTDJ9/blueprint/resolved-snapshot.json
- old_digest: c7df3b836248f7c038ddb561e0608f660f2f35a1d313ccbe918a432b16810ea5
- current_digest: c7df3b836248f7c038ddb561e0608f660f2f35a1d313ccbe918a432b16810ea5
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608022236-AWTDJ9

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

- Observation: A GitHub rebase merge rewrites base history and can make the base HEAD incomparable with the pre-merge verified SHA after branch cleanup.
  Impact: Using the base checkout head for a merged, hosted-closed task created a false verification_required blocker on completed work.
  Resolution: For DONE tasks with merged PR and hosted close recorded on base, bind verification to the canonical passed quality-review target; retain live branch-head resolution before merge.
