---
id: "202604091841-PX5WAV"
title: "Persist merged branch_pr task closure state onto main"
result_summary: "integrate: squash task/202604091841-PX5WAV/tracked-closure-state"
status: "DONE"
priority: "high"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "tasks"
  - "workflow"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-09T18:41:50.358Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-09T18:59:43.941Z"
  updated_by: "CODER"
  note: "Verified that task hosted-close-pr accepts multiple task ids, with targeted hosted-close regressions and a live batch run that opened closure PRs #215-#219 for the current stale merged tasks."
commit:
  hash: "afda89ee7b3e400d40ccbe85f99db525eba9f820"
  message: "🧩 PX5WAV integrate: tasks/workflow: Persist merged branch_pr task closure state onto main"
comments:
  -
    author: "CODER"
    body: "Start: trace why merged branch_pr tasks still arrive on main as DOING and fix the closure path so tracked history lands in DONE without local normalize dirt."
  -
    author: "INTEGRATOR"
    body: "Verified: Integrated via squash; verify=skipped(no commands); pr=.agentplane/tasks/202604091841-PX5WAV/pr."
events:
  -
    type: "status"
    at: "2026-04-09T18:53:18.945Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: trace why merged branch_pr tasks still arrive on main as DOING and fix the closure path so tracked history lands in DONE without local normalize dirt."
  -
    type: "verify"
    at: "2026-04-09T18:59:43.941Z"
    author: "CODER"
    state: "ok"
    note: "Verified that task hosted-close-pr accepts multiple task ids, with targeted hosted-close regressions and a live batch run that opened closure PRs #215-#219 for the current stale merged tasks."
  -
    type: "status"
    at: "2026-04-09T19:43:03.639Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: Integrated via squash; verify=skipped(no commands); pr=.agentplane/tasks/202604091841-PX5WAV/pr."
doc_version: 3
doc_updated_at: "2026-04-09T19:43:03.641Z"
doc_updated_by: "INTEGRATOR"
description: "Make merged branch_pr tasks land in tracked main history as DONE with reconciled PR metadata, so pulling origin/main does not reopen them as DOING or require local normalize dirt."
sections:
  Summary: |-
    Persist merged branch_pr task closure state onto main
    
    Make merged branch_pr tasks land in tracked main history as DONE with reconciled PR metadata, so pulling origin/main does not reopen them as DOING or require local normalize dirt.
  Scope: |-
    - In scope: Make merged branch_pr tasks land in tracked main history as DONE with reconciled PR metadata, so pulling origin/main does not reopen them as DOING or require local normalize dirt.
    - Out of scope: unrelated refactors not required for "Persist merged branch_pr task closure state onto main".
  Plan: "1. Trace why merged branch_pr tasks can be reconciled locally yet still arrive on pulled main as DOING with OPEN PR metadata. 2. Change the closure or reconciliation path so tracked history records DONE plus merged PR state without requiring ad hoc local normalize dirt. 3. Add regressions for the stale-state scenario, then verify with targeted tests, doctor/task-list checks, and lint."
  Verify Steps: |-
    1. Reproduce the stale branch_pr closure state with a focused fixture or regression harness. Expected: the current code shows how merged tasks can remain DOING or OPEN on main after pull.
    2. Run the fixed closure or reconciliation path. Expected: tracked task README and pr/meta land as DONE and MERGED in repository history instead of only in local normalize output.
    3. Run targeted task-list/doctor or reconcile regressions plus eslint. Expected: the affected merged tasks no longer reappear as DOING on main and the touched checks exit 0.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-09T18:59:43.941Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified that task hosted-close-pr accepts multiple task ids, with targeted hosted-close regressions and a live batch run that opened closure PRs #215-#219 for the current stale merged tasks.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-09T18:53:18.951Z, excerpt_hash=sha256:7fe793a21e0de64646cd108596dfc0255123f6721feabe23b3259d740706dadb
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Hosted-close recovery had to be driven one task at a time even when multiple remote task-close branches were already waiting, so merged tasks stayed DOING on main longer than necessary.
      Impact: Operators had to run repetitive hosted-close-pr commands for each stale task and closure waves remained partially tracked until every PR was opened manually.
      Resolution: Allow task hosted-close-pr to accept multiple task ids in one invocation so closure PR batches can be materialized deterministically from the existing remote task-close branches.
      Promotion: incident-candidate
      Fixability: external
id_source: "generated"
---
## Summary

Persist merged branch_pr task closure state onto main

Make merged branch_pr tasks land in tracked main history as DONE with reconciled PR metadata, so pulling origin/main does not reopen them as DOING or require local normalize dirt.

## Scope

- In scope: Make merged branch_pr tasks land in tracked main history as DONE with reconciled PR metadata, so pulling origin/main does not reopen them as DOING or require local normalize dirt.
- Out of scope: unrelated refactors not required for "Persist merged branch_pr task closure state onto main".

## Plan

1. Trace why merged branch_pr tasks can be reconciled locally yet still arrive on pulled main as DOING with OPEN PR metadata. 2. Change the closure or reconciliation path so tracked history records DONE plus merged PR state without requiring ad hoc local normalize dirt. 3. Add regressions for the stale-state scenario, then verify with targeted tests, doctor/task-list checks, and lint.

## Verify Steps

1. Reproduce the stale branch_pr closure state with a focused fixture or regression harness. Expected: the current code shows how merged tasks can remain DOING or OPEN on main after pull.
2. Run the fixed closure or reconciliation path. Expected: tracked task README and pr/meta land as DONE and MERGED in repository history instead of only in local normalize output.
3. Run targeted task-list/doctor or reconcile regressions plus eslint. Expected: the affected merged tasks no longer reappear as DOING on main and the touched checks exit 0.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-09T18:59:43.941Z — VERIFY — ok

By: CODER

Note: Verified that task hosted-close-pr accepts multiple task ids, with targeted hosted-close regressions and a live batch run that opened closure PRs #215-#219 for the current stale merged tasks.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-09T18:53:18.951Z, excerpt_hash=sha256:7fe793a21e0de64646cd108596dfc0255123f6721feabe23b3259d740706dadb

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: Hosted-close recovery had to be driven one task at a time even when multiple remote task-close branches were already waiting, so merged tasks stayed DOING on main longer than necessary.
  Impact: Operators had to run repetitive hosted-close-pr commands for each stale task and closure waves remained partially tracked until every PR was opened manually.
  Resolution: Allow task hosted-close-pr to accept multiple task ids in one invocation so closure PR batches can be materialized deterministically from the existing remote task-close branches.
  Promotion: incident-candidate
  Fixability: external
