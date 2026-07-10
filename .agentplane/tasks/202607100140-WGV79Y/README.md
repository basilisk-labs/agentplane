---
id: "202607100140-WGV79Y"
title: "Allow pre-merge closure to stage active task artifacts"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 15
origin:
  system: "manual"
depends_on: []
tags:
  - "branch-pr"
  - "lifecycle"
  - "quality"
  - "release-0.6.22"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "code.branch_pr"
verify:
  - "bunx vitest --config vitest.workspace.ts run packages/agentplane/src/commands/task/finish.pre-merge-closure.unit.test.ts"
  - "bun run --filter=agentplane typecheck"
  - "bun run lint:core"
  - "bun run ci:contract"
  - "bun run test:fast"
plan_approval:
  state: "approved"
  updated_at: "2026-07-10T01:53:58.719Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-07-10T02:05:18.200Z"
  updated_by: "CODER"
  note: "Pass: lifecycle, batch-route, and finish quality-target tests 16/16; AgentPlane typecheck; lint:core; ci:contract; full fast suite 361 files and 2,142 tests. Primary finish now separates implementation SHA from explicitly linked batch evidence commits without accepting unrelated changes."
  attempts: 0
quality_review:
  state: "pass"
  updated_at: "2026-07-10T02:05:52.418Z"
  updated_by: "EVALUATOR"
  note: "Batch pre-merge closure now has consistent dirty-state, route freshness, and finish commit semantics."
  evaluated_sha: "2e9dc2e52a26c3b960150ba9fa10d51faa40202b"
  blueprint_digest: "a1c4904fb9c7391cf4514d602bf2f4d7a7b286366b4f62c53bec2a77b1263e85"
  evidence_refs:
    - ".agentplane/tasks/202607100140-WGV79Y/README.md"
    - ".agentplane/tasks/202607100140-WGV79Y/quality/20260710-020552418-recovery-context/quality-report.json"
    - ".agentplane/tasks/202607100140-WGV79Y/quality/20260710-020552418-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202607100140-WGV79Y/quality/20260710-020552418-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202607100140-WGV79Y/blueprint/resolved-snapshot.json"
    - "packages/agentplane/src/commands/task/finish.pre-merge-closure.unit.test.ts"
    - "packages/agentplane/src/commands/task/finish.quality-review-target.unit.test.ts"
    - "packages/agentplane/src/cli/run-cli.core.route-decision.batch.test.ts"
  findings:
    - "Lifecycle, batch-route, and finish quality-target tests 16/16 pass; typecheck, lint:core, ci:contract, and the 2,142-test fast suite are green."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: allow active task subtree artifacts during branch_pr pre-merge close dirty-state validation; keep unrelated paths blocking."
events:
  -
    type: "status"
    at: "2026-07-10T01:41:56.585Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: allow active task subtree artifacts during branch_pr pre-merge close dirty-state validation; keep unrelated paths blocking."
  -
    type: "verify"
    at: "2026-07-10T01:50:35.724Z"
    author: "CODER"
    state: "ok"
    note: "Pass: focused pre-merge closure tests 3/3; AgentPlane typecheck; lint:core; ci:contract; full fast suite 361 files and 2,141 tests. Active-task README and quality artifacts are accepted only for pre-merge closure; unrelated tracked paths remain blocked."
  -
    type: "verify"
    at: "2026-07-10T01:58:57.731Z"
    author: "CODER"
    state: "ok"
    note: "Pass: lifecycle and batch-route tests 11/11; AgentPlane typecheck; lint:core; ci:contract; full fast suite 361 files and 2,141 tests. Active closure artifacts are staged deterministically, and quality/PR freshness accepts only explicitly linked batch task artifact commits."
  -
    type: "verify"
    at: "2026-07-10T02:05:18.200Z"
    author: "CODER"
    state: "ok"
    note: "Pass: lifecycle, batch-route, and finish quality-target tests 16/16; AgentPlane typecheck; lint:core; ci:contract; full fast suite 361 files and 2,142 tests. Primary finish now separates implementation SHA from explicitly linked batch evidence commits without accepting unrelated changes."
doc_version: 3
doc_updated_at: "2026-07-10T02:05:18.364Z"
doc_updated_by: "CODER"
description: "For v0.6.22, fix branch_pr pre-merge closure so an unstaged README or quality artifact inside the active task subtree is treated as close-commit input rather than unrelated dirty state, while unrelated tracked files and other task artifacts remain blocking."
sections:
  Summary: |-
    Allow pre-merge closure to stage active task artifacts

    For v0.6.22, fix branch_pr pre-merge closure so an unstaged README or quality artifact inside the active task subtree is treated as close-commit input rather than unrelated dirty state, while unrelated tracked files and other task artifacts remain blocking.
  Scope: |-
    - In scope: branch_pr pre-merge close dirty-state classification and focused unit coverage.
    - Acceptance: active task README/quality paths are allowed because deterministic close commit stages them; unrelated source files and other task paths remain blocking.
    - Out of scope: direct-mode dirty policy, broader close-tail refactors, and bypassing verification/quality gates.
  Plan: |-
    1. Allow deterministic pre-merge closure to stage active-task README and quality artifacts while unrelated tracked paths remain blocking.
    2. Make primary batch quality freshness treat artifact-only commits from the explicitly linked primary and included task IDs as local evidence advances.
    3. Keep unlinked task artifacts and implementation paths freshness-invalidating.
    4. Add focused positive and negative lifecycle and batch-route coverage.
    5. Re-run focused tests, typecheck, lint:core, ci:contract, and test:fast; include the task in PR #4563.
  Verify Steps: |-
    1. Run bunx vitest --config vitest.workspace.ts run packages/agentplane/src/commands/task/finish.pre-merge-closure.unit.test.ts. Expected: active task artifacts are allowed and unrelated tracked dirt remains blocked.
    2. Run bun run --filter=agentplane typecheck. Expected: AgentPlane typechecks.
    3. Run bun run lint:core. Expected: core lint passes.
    4. Run bun run ci:contract. Expected: lifecycle, architecture, generated, and quality contracts pass.
    5. Run bun run test:fast. Expected: the full fast suite passes.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-07-10T01:50:35.724Z — VERIFY — ok

    By: CODER

    Note: Pass: focused pre-merge closure tests 3/3; AgentPlane typecheck; lint:core; ci:contract; full fast suite 361 files and 2,141 tests. Active-task README and quality artifacts are accepted only for pre-merge closure; unrelated tracked paths remain blocked.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-10T01:43:39.962Z, excerpt_hash=sha256:f21941cfb404bbe0458b0eec4e0f77c749e3b73bba27c2d27ace60d46aab2bae

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607100106-YP0PYE-bound-context-extraction-batches-by-source-bytes/.agentplane/tasks/202607100140-WGV79Y/blueprint/resolved-snapshot.json
    - old_digest: a1c4904fb9c7391cf4514d602bf2f4d7a7b286366b4f62c53bec2a77b1263e85
    - current_digest: a1c4904fb9c7391cf4514d602bf2f4d7a7b286366b4f62c53bec2a77b1263e85
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607100140-WGV79Y

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane work start 202607100140-WGV79Y --agent CODER --slug allow-pre-merge-closure-to-stage-active-task-art --worktree
    - diagnostic_command: agentplane work resume 202607100140-WGV79Y
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: true
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: worktree_projection_drift

    ### 2026-07-10T01:58:57.731Z — VERIFY — ok

    By: CODER

    Note: Pass: lifecycle and batch-route tests 11/11; AgentPlane typecheck; lint:core; ci:contract; full fast suite 361 files and 2,141 tests. Active closure artifacts are staged deterministically, and quality/PR freshness accepts only explicitly linked batch task artifact commits.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-10T01:53:58.406Z, excerpt_hash=sha256:f21941cfb404bbe0458b0eec4e0f77c749e3b73bba27c2d27ace60d46aab2bae

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607100106-YP0PYE-bound-context-extraction-batches-by-source-bytes/.agentplane/tasks/202607100140-WGV79Y/blueprint/resolved-snapshot.json
    - old_digest: a1c4904fb9c7391cf4514d602bf2f4d7a7b286366b4f62c53bec2a77b1263e85
    - current_digest: a1c4904fb9c7391cf4514d602bf2f4d7a7b286366b4f62c53bec2a77b1263e85
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607100140-WGV79Y

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane task brief 202607100106-YP0PYE
    - diagnostic_command: none
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: true
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    ### 2026-07-10T02:05:18.200Z — VERIFY — ok

    By: CODER

    Note: Pass: lifecycle, batch-route, and finish quality-target tests 16/16; AgentPlane typecheck; lint:core; ci:contract; full fast suite 361 files and 2,142 tests. Primary finish now separates implementation SHA from explicitly linked batch evidence commits without accepting unrelated changes.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-10T01:58:57.892Z, excerpt_hash=sha256:f21941cfb404bbe0458b0eec4e0f77c749e3b73bba27c2d27ace60d46aab2bae

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607100106-YP0PYE-bound-context-extraction-batches-by-source-bytes/.agentplane/tasks/202607100140-WGV79Y/blueprint/resolved-snapshot.json
    - old_digest: a1c4904fb9c7391cf4514d602bf2f4d7a7b286366b4f62c53bec2a77b1263e85
    - current_digest: a1c4904fb9c7391cf4514d602bf2f4d7a7b286366b4f62c53bec2a77b1263e85
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607100140-WGV79Y

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane task brief 202607100106-YP0PYE
    - diagnostic_command: none
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: true
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
extensions:
  branch_pr_batch:
    base: "main"
    branch: "task/202607100106-YP0PYE/bound-context-extraction-batches-by-source-bytes"
    included_task_ids:
      - "202607100140-WGV79Y"
    primary_task_id: "202607100106-YP0PYE"
    role: "included"
    updated_at: "2026-07-10T02:10:19.484Z"
id_source: "generated"
---
## Summary

Allow pre-merge closure to stage active task artifacts

For v0.6.22, fix branch_pr pre-merge closure so an unstaged README or quality artifact inside the active task subtree is treated as close-commit input rather than unrelated dirty state, while unrelated tracked files and other task artifacts remain blocking.

## Scope

- In scope: branch_pr pre-merge close dirty-state classification and focused unit coverage.
- Acceptance: active task README/quality paths are allowed because deterministic close commit stages them; unrelated source files and other task paths remain blocking.
- Out of scope: direct-mode dirty policy, broader close-tail refactors, and bypassing verification/quality gates.

## Plan

1. Allow deterministic pre-merge closure to stage active-task README and quality artifacts while unrelated tracked paths remain blocking.
2. Make primary batch quality freshness treat artifact-only commits from the explicitly linked primary and included task IDs as local evidence advances.
3. Keep unlinked task artifacts and implementation paths freshness-invalidating.
4. Add focused positive and negative lifecycle and batch-route coverage.
5. Re-run focused tests, typecheck, lint:core, ci:contract, and test:fast; include the task in PR #4563.

## Verify Steps

1. Run bunx vitest --config vitest.workspace.ts run packages/agentplane/src/commands/task/finish.pre-merge-closure.unit.test.ts. Expected: active task artifacts are allowed and unrelated tracked dirt remains blocked.
2. Run bun run --filter=agentplane typecheck. Expected: AgentPlane typechecks.
3. Run bun run lint:core. Expected: core lint passes.
4. Run bun run ci:contract. Expected: lifecycle, architecture, generated, and quality contracts pass.
5. Run bun run test:fast. Expected: the full fast suite passes.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-07-10T01:50:35.724Z — VERIFY — ok

By: CODER

Note: Pass: focused pre-merge closure tests 3/3; AgentPlane typecheck; lint:core; ci:contract; full fast suite 361 files and 2,141 tests. Active-task README and quality artifacts are accepted only for pre-merge closure; unrelated tracked paths remain blocked.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-10T01:43:39.962Z, excerpt_hash=sha256:f21941cfb404bbe0458b0eec4e0f77c749e3b73bba27c2d27ace60d46aab2bae

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607100106-YP0PYE-bound-context-extraction-batches-by-source-bytes/.agentplane/tasks/202607100140-WGV79Y/blueprint/resolved-snapshot.json
- old_digest: a1c4904fb9c7391cf4514d602bf2f4d7a7b286366b4f62c53bec2a77b1263e85
- current_digest: a1c4904fb9c7391cf4514d602bf2f4d7a7b286366b4f62c53bec2a77b1263e85
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607100140-WGV79Y

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane work start 202607100140-WGV79Y --agent CODER --slug allow-pre-merge-closure-to-stage-active-task-art --worktree
- diagnostic_command: agentplane work resume 202607100140-WGV79Y
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: true
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: worktree_projection_drift

### 2026-07-10T01:58:57.731Z — VERIFY — ok

By: CODER

Note: Pass: lifecycle and batch-route tests 11/11; AgentPlane typecheck; lint:core; ci:contract; full fast suite 361 files and 2,141 tests. Active closure artifacts are staged deterministically, and quality/PR freshness accepts only explicitly linked batch task artifact commits.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-10T01:53:58.406Z, excerpt_hash=sha256:f21941cfb404bbe0458b0eec4e0f77c749e3b73bba27c2d27ace60d46aab2bae

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607100106-YP0PYE-bound-context-extraction-batches-by-source-bytes/.agentplane/tasks/202607100140-WGV79Y/blueprint/resolved-snapshot.json
- old_digest: a1c4904fb9c7391cf4514d602bf2f4d7a7b286366b4f62c53bec2a77b1263e85
- current_digest: a1c4904fb9c7391cf4514d602bf2f4d7a7b286366b4f62c53bec2a77b1263e85
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607100140-WGV79Y

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane task brief 202607100106-YP0PYE
- diagnostic_command: none
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: true
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

### 2026-07-10T02:05:18.200Z — VERIFY — ok

By: CODER

Note: Pass: lifecycle, batch-route, and finish quality-target tests 16/16; AgentPlane typecheck; lint:core; ci:contract; full fast suite 361 files and 2,142 tests. Primary finish now separates implementation SHA from explicitly linked batch evidence commits without accepting unrelated changes.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-10T01:58:57.892Z, excerpt_hash=sha256:f21941cfb404bbe0458b0eec4e0f77c749e3b73bba27c2d27ace60d46aab2bae

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607100106-YP0PYE-bound-context-extraction-batches-by-source-bytes/.agentplane/tasks/202607100140-WGV79Y/blueprint/resolved-snapshot.json
- old_digest: a1c4904fb9c7391cf4514d602bf2f4d7a7b286366b4f62c53bec2a77b1263e85
- current_digest: a1c4904fb9c7391cf4514d602bf2f4d7a7b286366b4f62c53bec2a77b1263e85
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607100140-WGV79Y

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane task brief 202607100106-YP0PYE
- diagnostic_command: none
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: true
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
