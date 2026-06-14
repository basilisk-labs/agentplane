---
id: "202606120809-85QTY9"
title: "Reduce branch_pr commit count for single-task fixes"
result_summary: "pre-merge closure refreshed"
status: "DONE"
priority: "high"
owner: "CODER"
revision: 11
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-06-12T08:10:53.268Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-06-12T08:28:39.987Z"
  updated_by: "CODER"
  note: "Verified route decision quality/pre-merge lifecycle change. Checks: bunx vitest route-decision tests passed; route-oracle/route-guidance tests passed; bun run typecheck passed; node .agentplane/policy/check-routing.mjs passed; git diff --check passed; hotspot-report threshold passed."
  attempts: 0
quality_review:
  state: "pass"
  updated_at: "2026-06-12T09:24:32.178Z"
  updated_by: "EVALUATOR"
  note: "Quality review passed after review fix."
  evaluated_sha: "4a9e2956b82fb63053f45d6f12988ee40fad42ce"
  blueprint_digest: "6e4812a08d29086cee97f6976e0519ae25c0570dcf043905b54fe69fabce383c"
  evidence_refs:
    - ".agentplane/tasks/202606120809-85QTY9/README.md"
    - ".agentplane/tasks/202606120809-85QTY9/quality/20260612-092432178-recovery-context/quality-report.json"
    - ".agentplane/tasks/202606120809-85QTY9/quality/20260612-092432178-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202606120809-85QTY9/quality/20260612-092432178-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202606120809-85QTY9/blueprint/resolved-snapshot.json"
    - "packages/agentplane/src/commands/shared/route-decision-next-action.ts"
  findings:
    - "No blocking findings after addressing PR branch head review comment and rerunning lint, typecheck, and focused tests."
commit:
  hash: "bb0e9f766641a835af4f02c22e5756b0d708e4f0"
  message: "Refresh quality review after PR review fix"
comments:
  -
    author: "CODER"
    body: "Start: reduce branch_pr commit count by moving quality evidence and pre-merge closure ahead of PR publication/integration where route state allows it."
  -
    author: "CODER"
    body: "Verified: pre-merge closure packet is ready for the task PR."
  -
    author: "CODER"
    body: "Verified: refreshed pre-merge closure packet after lint repair."
  -
    author: "CODER"
    body: "Verified: refreshed pre-merge closure packet after PR review fix."
events:
  -
    type: "status"
    at: "2026-06-12T08:11:34.786Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: reduce branch_pr commit count by moving quality evidence and pre-merge closure ahead of PR publication/integration where route state allows it."
  -
    type: "verify"
    at: "2026-06-12T08:28:39.987Z"
    author: "CODER"
    state: "ok"
    note: "Verified route decision quality/pre-merge lifecycle change. Checks: bunx vitest route-decision tests passed; route-oracle/route-guidance tests passed; bun run typecheck passed; node .agentplane/policy/check-routing.mjs passed; git diff --check passed; hotspot-report threshold passed."
  -
    type: "status"
    at: "2026-06-12T08:37:43.377Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: pre-merge closure packet is ready for the task PR."
  -
    type: "status"
    at: "2026-06-12T09:15:32.092Z"
    author: "CODER"
    from: "DONE"
    to: "DONE"
    note: "Verified: refreshed pre-merge closure packet after lint repair."
  -
    type: "status"
    at: "2026-06-12T09:26:11.756Z"
    author: "CODER"
    from: "DONE"
    to: "DONE"
    note: "Verified: refreshed pre-merge closure packet after PR review fix."
doc_version: 3
doc_updated_at: "2026-06-12T09:26:11.756Z"
doc_updated_by: "CODER"
description: "Optimize branch_pr lifecycle guidance so evaluator quality evidence and pre-merge closure are recorded before the final task-branch publication, reducing common single-task fixes from four commit events toward two to three without weakening verification gates."
sections:
  Summary: |-
    Reduce branch_pr commit count for single-task fixes

    Optimize branch_pr lifecycle guidance so evaluator quality evidence and pre-merge closure are recorded before the final task-branch publication, reducing common single-task fixes from four commit events toward two to three without weakening verification gates.
  Scope: |-
    - In scope: Optimize branch_pr lifecycle guidance so evaluator quality evidence and pre-merge closure are recorded before the final task-branch publication, reducing common single-task fixes from four commit events toward two to three without weakening verification gates.
    - Out of scope: unrelated refactors not required for "Reduce branch_pr commit count for single-task fixes".
  Plan: |-
    Plan:
    1. Inspect branch_pr routing, evaluator, quality-review and pre-merge-closure gates to identify why quality evidence is recorded after the first PR publication.
    2. Implement a minimal lifecycle/routing change so quality review and pre-merge closure are required before PR publication/integration when possible, reducing extra commit/CI cycles for one-task fixes.
    3. Add focused tests covering the reduced-commit route.
    4. Run focused tests plus routing policy checks, then record verification and finish through the approved branch_pr path.
  Verify Steps: |-
    PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-06-12T08:28:39.987Z — VERIFY — ok

    By: CODER

    Note: Verified route decision quality/pre-merge lifecycle change. Checks: bunx vitest route-decision tests passed; route-oracle/route-guidance tests passed; bun run typecheck passed; node .agentplane/policy/check-routing.mjs passed; git diff --check passed; hotspot-report threshold passed.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-06-12T08:11:34.786Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202606120809-85QTY9-reduce-branch-pr-commit-count-for-single-task-fi/.agentplane/tasks/202606120809-85QTY9/blueprint/resolved-snapshot.json
    - old_digest: 6e4812a08d29086cee97f6976e0519ae25c0570dcf043905b54fe69fabce383c
    - current_digest: 6e4812a08d29086cee97f6976e0519ae25c0570dcf043905b54fe69fabce383c
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202606120809-85QTY9

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane pr update 202606120809-85QTY9
    - diagnostic_command: agentplane pr check 202606120809-85QTY9
    - source_of_truth: route=task_next_action diagnostic=pr_check remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: if PR check passes but next-action still requests PR artifact update, verify live PR state before rerunning mutation
    - risks: pr_artifact_freshness_loop, git_hook_side_effect

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
extensions:
  implementation_commit:
    hash: "4a9e2956b82fb63053f45d6f12988ee40fad42ce"
    message: "Use PR branch head for pre-merge route"
id_source: "generated"
---
## Summary

Reduce branch_pr commit count for single-task fixes

Optimize branch_pr lifecycle guidance so evaluator quality evidence and pre-merge closure are recorded before the final task-branch publication, reducing common single-task fixes from four commit events toward two to three without weakening verification gates.

## Scope

- In scope: Optimize branch_pr lifecycle guidance so evaluator quality evidence and pre-merge closure are recorded before the final task-branch publication, reducing common single-task fixes from four commit events toward two to three without weakening verification gates.
- Out of scope: unrelated refactors not required for "Reduce branch_pr commit count for single-task fixes".

## Plan

Plan:
1. Inspect branch_pr routing, evaluator, quality-review and pre-merge-closure gates to identify why quality evidence is recorded after the first PR publication.
2. Implement a minimal lifecycle/routing change so quality review and pre-merge closure are required before PR publication/integration when possible, reducing extra commit/CI cycles for one-task fixes.
3. Add focused tests covering the reduced-commit route.
4. Run focused tests plus routing policy checks, then record verification and finish through the approved branch_pr path.

## Verify Steps

PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-06-12T08:28:39.987Z — VERIFY — ok

By: CODER

Note: Verified route decision quality/pre-merge lifecycle change. Checks: bunx vitest route-decision tests passed; route-oracle/route-guidance tests passed; bun run typecheck passed; node .agentplane/policy/check-routing.mjs passed; git diff --check passed; hotspot-report threshold passed.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-06-12T08:11:34.786Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202606120809-85QTY9-reduce-branch-pr-commit-count-for-single-task-fi/.agentplane/tasks/202606120809-85QTY9/blueprint/resolved-snapshot.json
- old_digest: 6e4812a08d29086cee97f6976e0519ae25c0570dcf043905b54fe69fabce383c
- current_digest: 6e4812a08d29086cee97f6976e0519ae25c0570dcf043905b54fe69fabce383c
- route_changed: no
- safe_command: agentplane blueprint snapshot 202606120809-85QTY9

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane pr update 202606120809-85QTY9
- diagnostic_command: agentplane pr check 202606120809-85QTY9
- source_of_truth: route=task_next_action diagnostic=pr_check remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: if PR check passes but next-action still requests PR artifact update, verify live PR state before rerunning mutation
- risks: pr_artifact_freshness_loop, git_hook_side_effect

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
