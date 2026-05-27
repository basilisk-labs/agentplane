---
id: "202605271730-QSZ1R3"
title: "Harden patch-release workflow ergonomics"
result_summary: "Merged via PR #4170."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "branch_pr"
  - "code"
  - "workflow"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-27T17:30:39.540Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-27T17:55:42.293Z"
  updated_by: "CODER"
  note: "Implemented preflight role/active-task summary, hosted PR check waiting, integration queue doctor, SQLite warning suppression, and lifecycle invariant gate. Verified with typecheck, targeted lint, focused tests, docs freshness checks, lifecycle invariants, policy routing, doctor, preflight smoke, and queue doctor smoke."
  attempts: 0
commit:
  hash: "9e60bbdcafd6c8e08232691e13cf60f55e10df28"
  message: "code: harden patch-release workflow gates"
comments:
  -
    author: "CODER"
    body: "Start: Implementing approved patch-release hardening in the dedicated branch_pr worktree, covering preflight, hosted checks, integration queue repair, SQLite read-path noise, and lifecycle invariant verification."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #4170 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "status"
    at: "2026-05-27T17:32:19.003Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Implementing approved patch-release hardening in the dedicated branch_pr worktree, covering preflight, hosted checks, integration queue repair, SQLite read-path noise, and lifecycle invariant verification."
  -
    type: "verify"
    at: "2026-05-27T17:55:42.293Z"
    author: "CODER"
    state: "ok"
    note: "Implemented preflight role/active-task summary, hosted PR check waiting, integration queue doctor, SQLite warning suppression, and lifecycle invariant gate. Verified with typecheck, targeted lint, focused tests, docs freshness checks, lifecycle invariants, policy routing, doctor, preflight smoke, and queue doctor smoke."
  -
    type: "status"
    at: "2026-05-27T19:38:31.400Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #4170 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-05-27T19:38:31.406Z"
doc_updated_by: "INTEGRATOR"
description: "Implement patch-release hardening across preflight, hosted PR gates, integration queue repair, SQLite read-path noise, and lifecycle invariants."
sections:
  Summary: |-
    Harden patch-release workflow ergonomics

    Implement patch-release hardening across preflight, hosted PR gates, integration queue repair, SQLite read-path noise, and lifecycle invariants.
  Scope: |-
    - In scope: Implement patch-release hardening across preflight, hosted PR gates, integration queue repair, SQLite read-path noise, and lifecycle invariants.
    - Out of scope: unrelated refactors not required for "Harden patch-release workflow ergonomics".
  Plan: |-
    1. Add a read-only ap preflight surface that aggregates config, git state, active tasks, doctor-light/runtime context, and next commands without noisy SQLite warnings.
    2. Promote hosted PR required-check waiting into installed CLI surfaces: add pr check hosted/stability options and route integrate queue through that gate before merge-lane handoff.
    3. Add integration queue doctor/fix diagnostics for stale lanes, stale lock ownership, and DONE/merged residue.
    4. Remove or suppress SQLite experimental warning from first-screen read-only commands while preserving projection cache fallback.
    5. Add a small lifecycle invariant gate and package script covering core direct/branch_pr state semantics.

    Verify with focused tests for touched command surfaces, typecheck as feasible, policy routing, and agentplane doctor.
  Verify Steps: |-
    PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-27T17:55:42.293Z — VERIFY — ok

    By: CODER

    Note: Implemented preflight role/active-task summary, hosted PR check waiting, integration queue doctor, SQLite warning suppression, and lifecycle invariant gate. Verified with typecheck, targeted lint, focused tests, docs freshness checks, lifecycle invariants, policy routing, doctor, preflight smoke, and queue doctor smoke.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-27T17:32:19.003Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605271730-QSZ1R3-patch-workflow-hardening/.agentplane/tasks/202605271730-QSZ1R3/blueprint/resolved-snapshot.json
    - old_digest: e9b4727241f6d77219eae6089cd093a761df6b66d1d63b00a1d7c2302848f03e
    - current_digest: e9b4727241f6d77219eae6089cd093a761df6b66d1d63b00a1d7c2302848f03e
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605271730-QSZ1R3

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Harden patch-release workflow ergonomics

Implement patch-release hardening across preflight, hosted PR gates, integration queue repair, SQLite read-path noise, and lifecycle invariants.

## Scope

- In scope: Implement patch-release hardening across preflight, hosted PR gates, integration queue repair, SQLite read-path noise, and lifecycle invariants.
- Out of scope: unrelated refactors not required for "Harden patch-release workflow ergonomics".

## Plan

1. Add a read-only ap preflight surface that aggregates config, git state, active tasks, doctor-light/runtime context, and next commands without noisy SQLite warnings.
2. Promote hosted PR required-check waiting into installed CLI surfaces: add pr check hosted/stability options and route integrate queue through that gate before merge-lane handoff.
3. Add integration queue doctor/fix diagnostics for stale lanes, stale lock ownership, and DONE/merged residue.
4. Remove or suppress SQLite experimental warning from first-screen read-only commands while preserving projection cache fallback.
5. Add a small lifecycle invariant gate and package script covering core direct/branch_pr state semantics.

Verify with focused tests for touched command surfaces, typecheck as feasible, policy routing, and agentplane doctor.

## Verify Steps

PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-27T17:55:42.293Z — VERIFY — ok

By: CODER

Note: Implemented preflight role/active-task summary, hosted PR check waiting, integration queue doctor, SQLite warning suppression, and lifecycle invariant gate. Verified with typecheck, targeted lint, focused tests, docs freshness checks, lifecycle invariants, policy routing, doctor, preflight smoke, and queue doctor smoke.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-27T17:32:19.003Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605271730-QSZ1R3-patch-workflow-hardening/.agentplane/tasks/202605271730-QSZ1R3/blueprint/resolved-snapshot.json
- old_digest: e9b4727241f6d77219eae6089cd093a761df6b66d1d63b00a1d7c2302848f03e
- current_digest: e9b4727241f6d77219eae6089cd093a761df6b66d1d63b00a1d7c2302848f03e
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605271730-QSZ1R3

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
