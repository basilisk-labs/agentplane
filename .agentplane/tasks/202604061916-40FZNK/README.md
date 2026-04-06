---
id: "202604061916-40FZNK"
title: "Detect stale open PR drift for DONE tasks"
result_summary: "integrate: squash task/202604061916-40FZNK/stale-open-pr-doctor"
status: "DONE"
priority: "high"
owner: "CODER"
revision: 9
origin:
  system: "manual"
depends_on: []
tags:
  - "workflow"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-06T19:16:50.948Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-06T19:56:14.162Z"
  updated_by: "CODER"
  note: "Doctor regression test passed for DONE branch_pr tasks with open PR artifacts; eslint passed; detection no longer depends on a surviving local task branch."
commit:
  hash: "ee1311f4990b594f822b4bdc10782e5edbebaba7"
  message: "📝 40FZNK task: refresh verification artifacts"
comments:
  -
    author: "CODER"
    body: "Start: add doctor diagnostics for DONE branch_pr tasks whose PR artifacts still look open or unreconciled."
  -
    author: "INTEGRATOR"
    body: "Verified: Integrated via squash; verify=skipped(no commands); pr=.agentplane/tasks/202604061916-40FZNK/pr."
events:
  -
    type: "status"
    at: "2026-04-06T19:52:24.935Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: add doctor diagnostics for DONE branch_pr tasks whose PR artifacts still look open or unreconciled."
  -
    type: "verify"
    at: "2026-04-06T19:52:44.544Z"
    author: "CODER"
    state: "ok"
    note: "Doctor regression test passed for DONE branch_pr tasks with open PR artifacts; eslint passed; detection no longer depends on a surviving local task branch."
  -
    type: "verify"
    at: "2026-04-06T19:56:14.162Z"
    author: "CODER"
    state: "ok"
    note: "Doctor regression test passed for DONE branch_pr tasks with open PR artifacts; eslint passed; detection no longer depends on a surviving local task branch."
  -
    type: "status"
    at: "2026-04-06T20:10:55.638Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: Integrated via squash; verify=skipped(no commands); pr=.agentplane/tasks/202604061916-40FZNK/pr."
doc_version: 3
doc_updated_at: "2026-04-06T20:10:55.644Z"
doc_updated_by: "INTEGRATOR"
description: "Surface DONE tasks whose GitHub PRs remain open and diverged so operators can reconcile stale remote task branches before they linger for weeks."
sections:
  Summary: |-
    Detect stale open PR drift for DONE tasks
    
    Surface DONE tasks whose GitHub PRs remain open and diverged so operators can reconcile stale remote task branches before they linger for weeks.
  Scope: |-
    - In scope: Surface DONE tasks whose GitHub PRs remain open and diverged so operators can reconcile stale remote task branches before they linger for weeks.
    - Out of scope: unrelated refactors not required for "Detect stale open PR drift for DONE tasks".
  Plan: "1. Trace how doctor and branch_pr reconciliation currently detect stale shipped tasks and what they miss for DONE tasks with open diverged PRs. 2. Add a low-noise detection path that surfaces this drift before it lingers. 3. Lock the behavior with CLI or command tests. 4. Verify with targeted tests and a realistic stale-PR fixture."
  Verify Steps: |-
    1. Run `bun test packages/agentplane/src/commands/doctor.command.test.ts -t "warns when a DONE branch_pr task still has open PR artifacts"`. Expected: the targeted doctor regression test passes and the warning text mentions stale open PR artifacts for DONE tasks.
    2. Run `bun x eslint packages/agentplane/src/commands/doctor.command.test.ts packages/agentplane/src/commands/doctor.run.ts packages/agentplane/src/commands/doctor/branch-pr.ts packages/agentplane/src/commands/task/hosted-merge-sync.ts`. Expected: lint exits 0.
    3. Run `agentplane doctor` in a branch_pr repo with unreconciled DONE PR metadata. Expected: doctor surfaces a warning before operators drift into manual GitHub cleanup.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-06T19:52:44.544Z — VERIFY — ok
    
    By: CODER
    
    Note: Doctor regression test passed for DONE branch_pr tasks with open PR artifacts; eslint passed; detection no longer depends on a surviving local task branch.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-06T19:52:24.952Z, excerpt_hash=sha256:5d419a099ca6ed7132cf75ede098e500ba03c9ec835a77f962f63f83b789e100
    
    ### 2026-04-06T19:56:14.162Z — VERIFY — ok
    
    By: CODER
    
    Note: Doctor regression test passed for DONE branch_pr tasks with open PR artifacts; eslint passed; detection no longer depends on a surviving local task branch.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-06T19:55:54.041Z, excerpt_hash=sha256:ea7c1bafc06309b1adc8fb837df1524aa60c97311f1c81a2fc429e4187393770
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Root cause: stale branch_pr PR tails could survive after a task was already marked DONE, and `doctor` had no dedicated check for this split-brain state.
    - Hidden premise that failed: requiring a surviving local task branch was too strict; unreconciled `pr/meta.json` is already enough to flag the task as suspicious.
    - Resolution: teach doctor to scan DONE task snapshots plus local PR artifacts and warn when `pr/meta.json` remains open or unreconciled.
id_source: "generated"
---
## Summary

Detect stale open PR drift for DONE tasks

Surface DONE tasks whose GitHub PRs remain open and diverged so operators can reconcile stale remote task branches before they linger for weeks.

## Scope

- In scope: Surface DONE tasks whose GitHub PRs remain open and diverged so operators can reconcile stale remote task branches before they linger for weeks.
- Out of scope: unrelated refactors not required for "Detect stale open PR drift for DONE tasks".

## Plan

1. Trace how doctor and branch_pr reconciliation currently detect stale shipped tasks and what they miss for DONE tasks with open diverged PRs. 2. Add a low-noise detection path that surfaces this drift before it lingers. 3. Lock the behavior with CLI or command tests. 4. Verify with targeted tests and a realistic stale-PR fixture.

## Verify Steps

1. Run `bun test packages/agentplane/src/commands/doctor.command.test.ts -t "warns when a DONE branch_pr task still has open PR artifacts"`. Expected: the targeted doctor regression test passes and the warning text mentions stale open PR artifacts for DONE tasks.
2. Run `bun x eslint packages/agentplane/src/commands/doctor.command.test.ts packages/agentplane/src/commands/doctor.run.ts packages/agentplane/src/commands/doctor/branch-pr.ts packages/agentplane/src/commands/task/hosted-merge-sync.ts`. Expected: lint exits 0.
3. Run `agentplane doctor` in a branch_pr repo with unreconciled DONE PR metadata. Expected: doctor surfaces a warning before operators drift into manual GitHub cleanup.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-06T19:52:44.544Z — VERIFY — ok

By: CODER

Note: Doctor regression test passed for DONE branch_pr tasks with open PR artifacts; eslint passed; detection no longer depends on a surviving local task branch.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-06T19:52:24.952Z, excerpt_hash=sha256:5d419a099ca6ed7132cf75ede098e500ba03c9ec835a77f962f63f83b789e100

### 2026-04-06T19:56:14.162Z — VERIFY — ok

By: CODER

Note: Doctor regression test passed for DONE branch_pr tasks with open PR artifacts; eslint passed; detection no longer depends on a surviving local task branch.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-06T19:55:54.041Z, excerpt_hash=sha256:ea7c1bafc06309b1adc8fb837df1524aa60c97311f1c81a2fc429e4187393770

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Root cause: stale branch_pr PR tails could survive after a task was already marked DONE, and `doctor` had no dedicated check for this split-brain state.
- Hidden premise that failed: requiring a surviving local task branch was too strict; unreconciled `pr/meta.json` is already enough to flag the task as suspicious.
- Resolution: teach doctor to scan DONE task snapshots plus local PR artifacts and warn when `pr/meta.json` remains open or unreconciled.
