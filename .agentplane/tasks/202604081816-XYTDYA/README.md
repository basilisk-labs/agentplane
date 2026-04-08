---
id: "202604081816-XYTDYA"
title: "Detect stale open branch_pr PR drift from projection snapshots"
result_summary: "integrate: squash task/202604081816-XYTDYA/doctor-open-pr-projection"
status: "DONE"
priority: "high"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "github"
  - "workflow"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-08T18:17:42.963Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-08T18:26:00.526Z"
  updated_by: "CODER"
  note: "Command: bun x vitest run packages/agentplane/src/commands/doctor.command.test.ts; bun x eslint packages/agentplane/src/commands/doctor/branch-pr.ts packages/agentplane/src/commands/doctor.command.test.ts. Result: pass. Evidence: doctor branch_pr open-PR drift now reads live backend state before falling back to tasks.json, and the new regression locks the projection-only stale snapshot shape. Scope: doctor branch_pr stale open-PR detection."
commit:
  hash: "93b24ee85dea659b185742b210f03278e7bf7366"
  message: "🧩 XYTDYA integrate: github/workflow: Detect stale open branch_pr PR drift from projection snapshots"
comments:
  -
    author: "CODER"
    body: "Start: reproduce the projection-vs-tasks.json doctor gap around stale open branch_pr PRs, then fix the detector against the live A1XE27 shape with focused regressions."
  -
    author: "INTEGRATOR"
    body: "Verified: Integrated via squash; verify=skipped(no commands); pr=.agentplane/tasks/202604081816-XYTDYA/pr."
events:
  -
    type: "status"
    at: "2026-04-08T18:17:54.012Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: reproduce the projection-vs-tasks.json doctor gap around stale open branch_pr PRs, then fix the detector against the live A1XE27 shape with focused regressions."
  -
    type: "verify"
    at: "2026-04-08T18:26:00.526Z"
    author: "CODER"
    state: "ok"
    note: "Command: bun x vitest run packages/agentplane/src/commands/doctor.command.test.ts; bun x eslint packages/agentplane/src/commands/doctor/branch-pr.ts packages/agentplane/src/commands/doctor.command.test.ts. Result: pass. Evidence: doctor branch_pr open-PR drift now reads live backend state before falling back to tasks.json, and the new regression locks the projection-only stale snapshot shape. Scope: doctor branch_pr stale open-PR detection."
  -
    type: "status"
    at: "2026-04-08T19:01:53.226Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: Integrated via squash; verify=skipped(no commands); pr=.agentplane/tasks/202604081816-XYTDYA/pr."
doc_version: 3
doc_updated_at: "2026-04-08T19:01:53.241Z"
doc_updated_by: "INTEGRATOR"
description: "Doctor currently misses real DONE-task open-PR drift because it reads the legacy tasks.json snapshot instead of the current projection/task docs. Fix doctor to use the same current-state source that task list and local backend use, and lock the regression with a live-style fixture."
sections:
  Summary: |-
    Detect stale open branch_pr PR drift from projection snapshots
    
    Doctor currently misses real DONE-task open-PR drift because it reads the legacy tasks.json snapshot instead of the current projection/task docs. Fix doctor to use the same current-state source that task list and local backend use, and lock the regression with a live-style fixture.
  Scope: |-
    - In scope: Doctor currently misses real DONE-task open-PR drift because it reads the legacy tasks.json snapshot instead of the current projection/task docs. Fix doctor to use the same current-state source that task list and local backend use, and lock the regression with a live-style fixture.
    - Out of scope: unrelated refactors not required for "Detect stale open branch_pr PR drift from projection snapshots".
  Plan: "1. Reproduce the stale open-PR drift with a DONE task that exists in projection/current README state but is absent or stale in legacy tasks.json. 2. Refactor the doctor branch_pr open-PR drift check to read current task snapshots from the same projection/backend source used by task list, falling back only when necessary. 3. Add focused regression coverage that proves doctor warns on the real-world shape and does not regress existing quiet paths."
  Verify Steps: "1. Run the focused doctor branch_pr tests. Expected: doctor warns when a DONE task with open PR artifacts exists only in the current projection snapshot, not just legacy tasks.json. 2. Run the touched lint/build or focused CLI suite. Expected: the updated detection path passes without widening unrelated doctor noise. 3. Run agentplane doctor against this repository or a representative fixture. Expected: the stale open PR condition becomes visible with an actionable next step."
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-08T18:26:00.526Z — VERIFY — ok
    
    By: CODER
    
    Note: Command: bun x vitest run packages/agentplane/src/commands/doctor.command.test.ts; bun x eslint packages/agentplane/src/commands/doctor/branch-pr.ts packages/agentplane/src/commands/doctor.command.test.ts. Result: pass. Evidence: doctor branch_pr open-PR drift now reads live backend state before falling back to tasks.json, and the new regression locks the projection-only stale snapshot shape. Scope: doctor branch_pr stale open-PR detection.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-08T18:17:54.025Z, excerpt_hash=sha256:bd848875fdda789502a77822a1c587eb366c628136af507cd859965971222006
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Detect stale open branch_pr PR drift from projection snapshots

Doctor currently misses real DONE-task open-PR drift because it reads the legacy tasks.json snapshot instead of the current projection/task docs. Fix doctor to use the same current-state source that task list and local backend use, and lock the regression with a live-style fixture.

## Scope

- In scope: Doctor currently misses real DONE-task open-PR drift because it reads the legacy tasks.json snapshot instead of the current projection/task docs. Fix doctor to use the same current-state source that task list and local backend use, and lock the regression with a live-style fixture.
- Out of scope: unrelated refactors not required for "Detect stale open branch_pr PR drift from projection snapshots".

## Plan

1. Reproduce the stale open-PR drift with a DONE task that exists in projection/current README state but is absent or stale in legacy tasks.json. 2. Refactor the doctor branch_pr open-PR drift check to read current task snapshots from the same projection/backend source used by task list, falling back only when necessary. 3. Add focused regression coverage that proves doctor warns on the real-world shape and does not regress existing quiet paths.

## Verify Steps

1. Run the focused doctor branch_pr tests. Expected: doctor warns when a DONE task with open PR artifacts exists only in the current projection snapshot, not just legacy tasks.json. 2. Run the touched lint/build or focused CLI suite. Expected: the updated detection path passes without widening unrelated doctor noise. 3. Run agentplane doctor against this repository or a representative fixture. Expected: the stale open PR condition becomes visible with an actionable next step.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-08T18:26:00.526Z — VERIFY — ok

By: CODER

Note: Command: bun x vitest run packages/agentplane/src/commands/doctor.command.test.ts; bun x eslint packages/agentplane/src/commands/doctor/branch-pr.ts packages/agentplane/src/commands/doctor.command.test.ts. Result: pass. Evidence: doctor branch_pr open-PR drift now reads live backend state before falling back to tasks.json, and the new regression locks the projection-only stale snapshot shape. Scope: doctor branch_pr stale open-PR detection.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-08T18:17:54.025Z, excerpt_hash=sha256:bd848875fdda789502a77822a1c587eb366c628136af507cd859965971222006

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
