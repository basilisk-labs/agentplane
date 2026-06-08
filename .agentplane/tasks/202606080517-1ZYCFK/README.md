---
id: "202606080517-1ZYCFK"
title: "Surface AgentPlane-owned automation boundaries"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-06-08T05:18:04.111Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-06-08T05:22:45.941Z"
  updated_by: "CODER"
  note: "Command: bun test packages/agentplane/src/commands/shared/route-oracle.test.ts | Result: pass | Evidence: 5 pass, 0 fail, 12 expect calls. Command: node .agentplane/policy/check-routing.mjs | Result: pass | Evidence: policy routing OK. Command: agentplane doctor | Result: pass | Evidence: OK; only two pre-existing DONE-task missing-commit warnings outside this task. Command: git diff --check | Result: pass | Evidence: no whitespace errors."
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: implement AgentPlane-owned automation boundary guidance in branch_pr policy, route oracle must_not packets, docs, and focused route tests."
events:
  -
    type: "status"
    at: "2026-06-08T05:18:09.287Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implement AgentPlane-owned automation boundary guidance in branch_pr policy, route oracle must_not packets, docs, and focused route tests."
  -
    type: "verify"
    at: "2026-06-08T05:22:45.941Z"
    author: "CODER"
    state: "ok"
    note: "Command: bun test packages/agentplane/src/commands/shared/route-oracle.test.ts | Result: pass | Evidence: 5 pass, 0 fail, 12 expect calls. Command: node .agentplane/policy/check-routing.mjs | Result: pass | Evidence: policy routing OK. Command: agentplane doctor | Result: pass | Evidence: OK; only two pre-existing DONE-task missing-commit warnings outside this task. Command: git diff --check | Result: pass | Evidence: no whitespace errors."
doc_version: 3
doc_updated_at: "2026-06-08T05:22:46.213Z"
doc_updated_by: "CODER"
description: "Teach branch_pr agents which PR, evaluator, integration, hosted-close, and cleanup operations AgentPlane owns so agents do not duplicate or stale them manually."
sections:
  Summary: |-
    Surface AgentPlane-owned automation boundaries

    Teach branch_pr agents which PR, evaluator, integration, hosted-close, and cleanup operations AgentPlane owns so agents do not duplicate or stale them manually.
  Scope: |-
    - In scope: Teach branch_pr agents which PR, evaluator, integration, hosted-close, and cleanup operations AgentPlane owns so agents do not duplicate or stale them manually.
    - Out of scope: unrelated refactors not required for "Surface AgentPlane-owned automation boundaries".
  Plan: |-
    1. Add a concise branch_pr automation-boundary policy section listing AgentPlane-owned operations that agents must not duplicate manually.
    2. Extend the route oracle execution packet so task brief / next-action --explain surfaces phase-specific must_not rules for PR artifacts, evaluator quality review, integration, hosted close, and cleanup.
    3. Update user-facing lifecycle docs so the runtime guidance and canonical policy agree.
    4. Add focused tests proving the must_not surface includes the automation boundaries.
    5. Run focused route-oracle tests, policy routing check, doctor, and final git status.
  Verify Steps: |-
    1. Run `bun test packages/agentplane/src/commands/shared/route-oracle.test.ts`. Expected: route execution packet tests pass, including automation-boundary must_not coverage.
    2. Run `node .agentplane/policy/check-routing.mjs`. Expected: policy module line budgets and routing checks pass.
    3. Run `agentplane doctor`. Expected: no task-scope or policy/runtime blocker remains.
    4. Run `git status --short --untracked-files=all`. Expected: final tracked/untracked state contains only intentional task-scope changes or is clean after commit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-06-08T05:22:45.941Z — VERIFY — ok

    By: CODER

    Note: Command: bun test packages/agentplane/src/commands/shared/route-oracle.test.ts | Result: pass | Evidence: 5 pass, 0 fail, 12 expect calls. Command: node .agentplane/policy/check-routing.mjs | Result: pass | Evidence: policy routing OK. Command: agentplane doctor | Result: pass | Evidence: OK; only two pre-existing DONE-task missing-commit warnings outside this task. Command: git diff --check | Result: pass | Evidence: no whitespace errors.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-06-08T05:21:08.442Z, excerpt_hash=sha256:987d81206bca5ebc487a78e46b4fb48f8b88ae1bc4cb0f7ece506c05cbf92684

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202606080517-1ZYCFK-surface-agentplane-owned-automation-boundaries/.agentplane/tasks/202606080517-1ZYCFK/blueprint/resolved-snapshot.json
    - old_digest: 8d2a524cab62d534b6dbfda102fdd854630ac05ada314d514e36b3f5a3f5ac70
    - current_digest: 8d2a524cab62d534b6dbfda102fdd854630ac05ada314d514e36b3f5a3f5ac70
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202606080517-1ZYCFK

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane work start 202606080517-1ZYCFK --agent CODER --slug surface-agentplane-owned-automation-boundaries --worktree
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
id_source: "generated"
---
## Summary

Surface AgentPlane-owned automation boundaries

Teach branch_pr agents which PR, evaluator, integration, hosted-close, and cleanup operations AgentPlane owns so agents do not duplicate or stale them manually.

## Scope

- In scope: Teach branch_pr agents which PR, evaluator, integration, hosted-close, and cleanup operations AgentPlane owns so agents do not duplicate or stale them manually.
- Out of scope: unrelated refactors not required for "Surface AgentPlane-owned automation boundaries".

## Plan

1. Add a concise branch_pr automation-boundary policy section listing AgentPlane-owned operations that agents must not duplicate manually.
2. Extend the route oracle execution packet so task brief / next-action --explain surfaces phase-specific must_not rules for PR artifacts, evaluator quality review, integration, hosted close, and cleanup.
3. Update user-facing lifecycle docs so the runtime guidance and canonical policy agree.
4. Add focused tests proving the must_not surface includes the automation boundaries.
5. Run focused route-oracle tests, policy routing check, doctor, and final git status.

## Verify Steps

1. Run `bun test packages/agentplane/src/commands/shared/route-oracle.test.ts`. Expected: route execution packet tests pass, including automation-boundary must_not coverage.
2. Run `node .agentplane/policy/check-routing.mjs`. Expected: policy module line budgets and routing checks pass.
3. Run `agentplane doctor`. Expected: no task-scope or policy/runtime blocker remains.
4. Run `git status --short --untracked-files=all`. Expected: final tracked/untracked state contains only intentional task-scope changes or is clean after commit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-06-08T05:22:45.941Z — VERIFY — ok

By: CODER

Note: Command: bun test packages/agentplane/src/commands/shared/route-oracle.test.ts | Result: pass | Evidence: 5 pass, 0 fail, 12 expect calls. Command: node .agentplane/policy/check-routing.mjs | Result: pass | Evidence: policy routing OK. Command: agentplane doctor | Result: pass | Evidence: OK; only two pre-existing DONE-task missing-commit warnings outside this task. Command: git diff --check | Result: pass | Evidence: no whitespace errors.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-06-08T05:21:08.442Z, excerpt_hash=sha256:987d81206bca5ebc487a78e46b4fb48f8b88ae1bc4cb0f7ece506c05cbf92684

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202606080517-1ZYCFK-surface-agentplane-owned-automation-boundaries/.agentplane/tasks/202606080517-1ZYCFK/blueprint/resolved-snapshot.json
- old_digest: 8d2a524cab62d534b6dbfda102fdd854630ac05ada314d514e36b3f5a3f5ac70
- current_digest: 8d2a524cab62d534b6dbfda102fdd854630ac05ada314d514e36b3f5a3f5ac70
- route_changed: no
- safe_command: agentplane blueprint snapshot 202606080517-1ZYCFK

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane work start 202606080517-1ZYCFK --agent CODER --slug surface-agentplane-owned-automation-boundaries --worktree
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
