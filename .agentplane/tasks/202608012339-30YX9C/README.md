---
id: "202608012339-30YX9C"
title: "Allow documentation tasks to commit canonical site artifacts"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 9
origin:
  system: "manual"
depends_on: []
tags:
  - "docs"
  - "policy"
  - "v0.7"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "code.branch_pr"
verify:
  - "bun run docs:site:check"
  - "bunx vitest run packages/agentplane/src/policy/rules/task-bound-mutation.test.ts"
plan_approval:
  state: "approved"
  updated_at: "2026-08-01T23:40:09.089Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "needs_rework"
  updated_at: "2026-08-02T00:09:14.050Z"
  updated_by: "EVALUATOR"
  note: "Implementation rework must remove the unrelated llms-full delta from this PR and record the policy-routing check before a fresh quality review."
  attempts: 1
quality_review:
  state: "rework"
  updated_at: "2026-08-02T00:09:14.050Z"
  updated_by: "EVALUATOR"
  note: "Implementation rework must remove the unrelated llms-full delta from this PR and record the policy-routing check before a fresh quality review."
  evaluated_sha: "ac15e3b88a6b88cadc07a51f00748b6271a15e6c"
  blueprint_digest: "c91fec84f6bec1204e38bd82bf492c6b06599b974c5e33a0d59040afef82995e"
  evidence_refs:
    - ".agentplane/tasks/202608012339-30YX9C/README.md"
    - "/Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608012339-30YX9C-allow-documentation-tasks-to-commit-canonical-si/.agentplane/tasks/202608012339-30YX9C/blueprint/resolved-snapshot.json"
  findings: []
commit: null
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "CODER"
    body: "Implemented docs-site path classification with focused policy coverage; local typecheck, docs site, formatting, routing, and diff checks pass."
events:
  -
    type: "status"
    at: "2026-08-01T23:40:33.688Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-08-01T23:44:27.065Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Implemented docs-site path classification with focused policy coverage; local typecheck, docs site, formatting, routing, and diff checks pass."
  -
    type: "verify"
    at: "2026-08-01T23:45:30.490Z"
    author: "TESTER"
    state: "ok"
    note: "Docs-site artifacts are correctly scoped and regression-protected."
  -
    type: "verify"
    at: "2026-08-02T00:09:14.050Z"
    author: "EVALUATOR"
    state: "needs_rework"
    note: "Implementation rework must remove the unrelated llms-full delta from this PR and record the policy-routing check before a fresh quality review."
doc_version: 3
doc_updated_at: "2026-08-02T00:09:14.767Z"
doc_updated_by: "CODER"
description: "Treat Docusaurus documentation navigation and generated social-card artifacts as documentation paths so docs.change tasks can satisfy the full site gate without bypassing task-bound mutation policy."
sections:
  Summary: |-
    Allow documentation tasks to commit canonical site artifacts

    Treat Docusaurus documentation navigation and generated social-card artifacts as documentation paths so docs.change tasks can satisfy the full site gate without bypassing task-bound mutation policy.
  Scope: |-
    - In scope: Treat Docusaurus documentation navigation and generated social-card artifacts as documentation paths so docs.change tasks can satisfy the full site gate without bypassing task-bound mutation policy.
    - Out of scope: unrelated refactors not required for "Allow documentation tasks to commit canonical site artifacts".
  Plan: |-
    1. Extend docs-only path classification to the canonical Docusaurus navigation files and generated social-card artifacts.
    2. Add focused policy tests that prove docs tasks may commit those exact paths while implementation paths remain blocked.
    3. Run the focused policy test, policy routing check, and full docs site gate.
    4. Open, verify, evaluate, and integrate the protected fix before resuming the migration-guide task.
  Verify Steps: |-
    PLANNER fallback scaffold for "Allow documentation tasks to commit canonical site artifacts". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Allow documentation tasks to commit canonical site artifacts". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-08-01T23:45:30.490Z — VERIFY — ok

    By: TESTER

    Note: Docs-site artifacts are correctly scoped and regression-protected.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-01T23:44:27.065Z, excerpt_hash=sha256:20c0fe523c70880ad2da3591c3436261a1d304e8662f58f7c395155e72609f7c

    Details:

    Command: bunx vitest run packages/agentplane/src/policy/rules/task-bound-mutation.test.ts
    Result: pass (1 file, 2 tests)
    Evidence: docs tasks may commit the exact Docusaurus navigation and generated social-card paths; website/src implementation remains blocked.
    Scope: task-bound mutation policy.

    Command: bun run typecheck
    Result: pass
    Evidence: native TypeScript build completed without diagnostics.
    Scope: repository type surface.

    Command: bun run docs:site:check
    Result: pass
    Evidence: generated docs and llms-full are fresh, site typecheck/build/navigation/design checks passed, 220 social images verified.
    Scope: complete documentation site gate.

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608012339-30YX9C-allow-documentation-tasks-to-commit-canonical-si/.agentplane/tasks/202608012339-30YX9C/blueprint/resolved-snapshot.json
    - old_digest: c91fec84f6bec1204e38bd82bf492c6b06599b974c5e33a0d59040afef82995e
    - current_digest: c91fec84f6bec1204e38bd82bf492c6b06599b974c5e33a0d59040afef82995e
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608012339-30YX9C

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202608012339-30YX9C
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    ### 2026-08-02T00:09:14.050Z — VERIFY — needs_rework

    By: EVALUATOR

    Note: Implementation rework must remove the unrelated llms-full delta from this PR and record the policy-routing check before a fresh quality review.
    Attempts: 1

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-01T23:45:31.215Z, excerpt_hash=sha256:20c0fe523c70880ad2da3591c3436261a1d304e8662f58f7c395155e72609f7c

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608012339-30YX9C-allow-documentation-tasks-to-commit-canonical-si/.agentplane/tasks/202608012339-30YX9C/blueprint/resolved-snapshot.json
    - old_digest: c91fec84f6bec1204e38bd82bf492c6b06599b974c5e33a0d59040afef82995e
    - current_digest: c91fec84f6bec1204e38bd82bf492c6b06599b974c5e33a0d59040afef82995e
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608012339-30YX9C

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
  Findings: ""
extensions:
  workflow_route_baseline:
    start_head_sha: "5319bbdeecb05adc2c436e4039f5046a5bfeb89a"
    version: 1
id_source: "generated"
---
## Summary

Allow documentation tasks to commit canonical site artifacts

Treat Docusaurus documentation navigation and generated social-card artifacts as documentation paths so docs.change tasks can satisfy the full site gate without bypassing task-bound mutation policy.

## Scope

- In scope: Treat Docusaurus documentation navigation and generated social-card artifacts as documentation paths so docs.change tasks can satisfy the full site gate without bypassing task-bound mutation policy.
- Out of scope: unrelated refactors not required for "Allow documentation tasks to commit canonical site artifacts".

## Plan

1. Extend docs-only path classification to the canonical Docusaurus navigation files and generated social-card artifacts.
2. Add focused policy tests that prove docs tasks may commit those exact paths while implementation paths remain blocked.
3. Run the focused policy test, policy routing check, and full docs site gate.
4. Open, verify, evaluate, and integrate the protected fix before resuming the migration-guide task.

## Verify Steps

PLANNER fallback scaffold for "Allow documentation tasks to commit canonical site artifacts". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Allow documentation tasks to commit canonical site artifacts". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-08-01T23:45:30.490Z — VERIFY — ok

By: TESTER

Note: Docs-site artifacts are correctly scoped and regression-protected.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-01T23:44:27.065Z, excerpt_hash=sha256:20c0fe523c70880ad2da3591c3436261a1d304e8662f58f7c395155e72609f7c

Details:

Command: bunx vitest run packages/agentplane/src/policy/rules/task-bound-mutation.test.ts
Result: pass (1 file, 2 tests)
Evidence: docs tasks may commit the exact Docusaurus navigation and generated social-card paths; website/src implementation remains blocked.
Scope: task-bound mutation policy.

Command: bun run typecheck
Result: pass
Evidence: native TypeScript build completed without diagnostics.
Scope: repository type surface.

Command: bun run docs:site:check
Result: pass
Evidence: generated docs and llms-full are fresh, site typecheck/build/navigation/design checks passed, 220 social images verified.
Scope: complete documentation site gate.

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608012339-30YX9C-allow-documentation-tasks-to-commit-canonical-si/.agentplane/tasks/202608012339-30YX9C/blueprint/resolved-snapshot.json
- old_digest: c91fec84f6bec1204e38bd82bf492c6b06599b974c5e33a0d59040afef82995e
- current_digest: c91fec84f6bec1204e38bd82bf492c6b06599b974c5e33a0d59040afef82995e
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608012339-30YX9C

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202608012339-30YX9C
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

### 2026-08-02T00:09:14.050Z — VERIFY — needs_rework

By: EVALUATOR

Note: Implementation rework must remove the unrelated llms-full delta from this PR and record the policy-routing check before a fresh quality review.
Attempts: 1

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-01T23:45:31.215Z, excerpt_hash=sha256:20c0fe523c70880ad2da3591c3436261a1d304e8662f58f7c395155e72609f7c

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608012339-30YX9C-allow-documentation-tasks-to-commit-canonical-si/.agentplane/tasks/202608012339-30YX9C/blueprint/resolved-snapshot.json
- old_digest: c91fec84f6bec1204e38bd82bf492c6b06599b974c5e33a0d59040afef82995e
- current_digest: c91fec84f6bec1204e38bd82bf492c6b06599b974c5e33a0d59040afef82995e
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608012339-30YX9C

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
