---
id: "202605220959-6R6Y21"
title: "Fix open upgrade and blueprint artifact issues"
status: "DOING"
priority: "high"
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
  updated_at: "2026-05-22T09:59:52.789Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-22T10:10:30.141Z"
  updated_by: "EVALUATOR"
  note: "Verified: EVALUATOR quality gate re-run after implementation commit d191d3340. The fix covers #4010/#4011 by committing runtime SQLite .gitignore upgrade leftovers and allowlisted managed leftovers, and covers #4012 by classifying blueprint artifacts as task_blueprint_evidence. BlueprintSnapshotRef: cbd6cbc9c91eea107af28b205fade48933638e0957e81159a25e5cf45a21e838"
  attempts: 0
quality_review:
  state: "pass"
  updated_at: "2026-05-22T10:10:30.141Z"
  updated_by: "EVALUATOR"
  note: "Verified: EVALUATOR quality gate re-run after implementation commit d191d3340. The fix covers #4010/#4011 by committing runtime SQLite .gitignore upgrade leftovers and allowlisted managed leftovers, and covers #4012 by classifying blueprint artifacts as task_blueprint_evidence. BlueprintSnapshotRef: cbd6cbc9c91eea107af28b205fade48933638e0957e81159a25e5cf45a21e838"
  evaluated_sha: "d191d3340c9631c6b4aea41101e0986244850812"
  blueprint_digest: "cbd6cbc9c91eea107af28b205fade48933638e0957e81159a25e5cf45a21e838"
  evidence_refs:
    - ".agentplane/tasks/202605220959-6R6Y21/README.md"
    - "/Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605220959-6R6Y21-fix-open-issues/.agentplane/tasks/202605220959-6R6Y21/blueprint/resolved-snapshot.json"
  findings: []
commit: null
comments:
  -
    author: "CODER"
    body: "Start: fixing GitHub issues #4010, #4011, and #4012 by hardening upgrade commit boundaries and blueprint task artifact handling in the task worktree."
events:
  -
    type: "status"
    at: "2026-05-22T10:00:06.403Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: fixing GitHub issues #4010, #4011, and #4012 by hardening upgrade commit boundaries and blueprint task artifact handling in the task worktree."
  -
    type: "verify"
    at: "2026-05-22T10:08:53.463Z"
    author: "CODER"
    state: "ok"
    note: "Verified: fixed GitHub issues #4010, #4011, and #4012. Focused upgrade regression passes, preflight blueprint artifact classification regression passes, typecheck passes, format check passes, doctor passes, and policy routing passes. BlueprintSnapshotRef: cbd6cbc9c91eea107af28b205fade48933638e0957e81159a25e5cf45a21e838"
  -
    type: "verify"
    at: "2026-05-22T10:09:05.311Z"
    author: "EVALUATOR"
    state: "ok"
    note: "Verified: EVALUATOR quality gate passed for the upgrade commit boundary and blueprint artifact classification fix. Regression tests cover #4010/#4011 .gitignore upgrade leftovers and #4012 blueprint evidence classification; typecheck, format, doctor, and routing checks passed. BlueprintSnapshotRef: cbd6cbc9c91eea107af28b205fade48933638e0957e81159a25e5cf45a21e838"
  -
    type: "verify"
    at: "2026-05-22T10:10:30.141Z"
    author: "EVALUATOR"
    state: "ok"
    note: "Verified: EVALUATOR quality gate re-run after implementation commit d191d3340. The fix covers #4010/#4011 by committing runtime SQLite .gitignore upgrade leftovers and allowlisted managed leftovers, and covers #4012 by classifying blueprint artifacts as task_blueprint_evidence. BlueprintSnapshotRef: cbd6cbc9c91eea107af28b205fade48933638e0957e81159a25e5cf45a21e838"
doc_version: 3
doc_updated_at: "2026-05-22T10:10:30.190Z"
doc_updated_by: "CODER"
description: "Fix GitHub issues #4010, #4011, and #4012 by hardening upgrade commit boundaries and clarifying blueprint task artifact handling."
sections:
  Summary: |-
    Fix open upgrade and blueprint artifact issues

    Fix GitHub issues #4010, #4011, and #4012 by hardening upgrade commit boundaries and clarifying blueprint task artifact handling.
  Scope: |-
    - In scope: Fix GitHub issues #4010, #4011, and #4012 by hardening upgrade commit boundaries and clarifying blueprint task artifact handling.
    - Out of scope: unrelated refactors not required for "Fix open upgrade and blueprint artifact issues".
  Plan: |-
    Plan:
    1. Reproduce and inspect upgrade commit path for GitHub issues #4010 and #4011.
    2. Include runtime SQLite .gitignore changes in the upgrade auto-commit boundary when upgrade creates them.
    3. Clarify blueprint task artifact handling so .agentplane/tasks/<id>/blueprint evidence is treated as task-owned artifact rather than ambiguous drift.
    4. Add focused regression tests for upgrade leftover tracked diff and blueprint artifact classification/finish contract.
    5. Verify with focused Vitest, agentplane doctor, and policy routing check.
  Verify Steps: |-
    PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-22T10:08:53.463Z — VERIFY — ok

    By: CODER

    Note: Verified: fixed GitHub issues #4010, #4011, and #4012. Focused upgrade regression passes, preflight blueprint artifact classification regression passes, typecheck passes, format check passes, doctor passes, and policy routing passes. BlueprintSnapshotRef: cbd6cbc9c91eea107af28b205fade48933638e0957e81159a25e5cf45a21e838
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-22T10:00:06.403Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605220959-6R6Y21-fix-open-issues/.agentplane/tasks/202605220959-6R6Y21/blueprint/resolved-snapshot.json
    - old_digest: cbd6cbc9c91eea107af28b205fade48933638e0957e81159a25e5cf45a21e838
    - current_digest: cbd6cbc9c91eea107af28b205fade48933638e0957e81159a25e5cf45a21e838
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605220959-6R6Y21

    ### 2026-05-22T10:09:05.311Z — VERIFY — ok

    By: EVALUATOR

    Note: Verified: EVALUATOR quality gate passed for the upgrade commit boundary and blueprint artifact classification fix. Regression tests cover #4010/#4011 .gitignore upgrade leftovers and #4012 blueprint evidence classification; typecheck, format, doctor, and routing checks passed. BlueprintSnapshotRef: cbd6cbc9c91eea107af28b205fade48933638e0957e81159a25e5cf45a21e838
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-22T10:08:53.517Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605220959-6R6Y21-fix-open-issues/.agentplane/tasks/202605220959-6R6Y21/blueprint/resolved-snapshot.json
    - old_digest: cbd6cbc9c91eea107af28b205fade48933638e0957e81159a25e5cf45a21e838
    - current_digest: cbd6cbc9c91eea107af28b205fade48933638e0957e81159a25e5cf45a21e838
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605220959-6R6Y21

    ### 2026-05-22T10:10:30.141Z — VERIFY — ok

    By: EVALUATOR

    Note: Verified: EVALUATOR quality gate re-run after implementation commit d191d3340. The fix covers #4010/#4011 by committing runtime SQLite .gitignore upgrade leftovers and allowlisted managed leftovers, and covers #4012 by classifying blueprint artifacts as task_blueprint_evidence. BlueprintSnapshotRef: cbd6cbc9c91eea107af28b205fade48933638e0957e81159a25e5cf45a21e838
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-22T10:09:05.364Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605220959-6R6Y21-fix-open-issues/.agentplane/tasks/202605220959-6R6Y21/blueprint/resolved-snapshot.json
    - old_digest: cbd6cbc9c91eea107af28b205fade48933638e0957e81159a25e5cf45a21e838
    - current_digest: cbd6cbc9c91eea107af28b205fade48933638e0957e81159a25e5cf45a21e838
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605220959-6R6Y21

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Upgrade now explicitly normalizes runtime SQLite .gitignore lines before commit-path collection and sweeps allowlisted tracked upgrade leftovers into the upgrade commit. Preflight now classifies .agentplane/tasks/<id>/blueprint artifacts as task_blueprint_evidence with commit_with_task_evidence action.
      Impact: Prevents upgrade from leaving policy/.gitignore leftovers and removes ambiguity around blueprint evidence artifacts.
      Resolution: Added regression coverage in run-cli.core.upgrade.test.ts and run-cli.core.branch-meta.readiness.test.ts.
id_source: "generated"
---
## Summary

Fix open upgrade and blueprint artifact issues

Fix GitHub issues #4010, #4011, and #4012 by hardening upgrade commit boundaries and clarifying blueprint task artifact handling.

## Scope

- In scope: Fix GitHub issues #4010, #4011, and #4012 by hardening upgrade commit boundaries and clarifying blueprint task artifact handling.
- Out of scope: unrelated refactors not required for "Fix open upgrade and blueprint artifact issues".

## Plan

Plan:
1. Reproduce and inspect upgrade commit path for GitHub issues #4010 and #4011.
2. Include runtime SQLite .gitignore changes in the upgrade auto-commit boundary when upgrade creates them.
3. Clarify blueprint task artifact handling so .agentplane/tasks/<id>/blueprint evidence is treated as task-owned artifact rather than ambiguous drift.
4. Add focused regression tests for upgrade leftover tracked diff and blueprint artifact classification/finish contract.
5. Verify with focused Vitest, agentplane doctor, and policy routing check.

## Verify Steps

PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-22T10:08:53.463Z — VERIFY — ok

By: CODER

Note: Verified: fixed GitHub issues #4010, #4011, and #4012. Focused upgrade regression passes, preflight blueprint artifact classification regression passes, typecheck passes, format check passes, doctor passes, and policy routing passes. BlueprintSnapshotRef: cbd6cbc9c91eea107af28b205fade48933638e0957e81159a25e5cf45a21e838
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-22T10:00:06.403Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605220959-6R6Y21-fix-open-issues/.agentplane/tasks/202605220959-6R6Y21/blueprint/resolved-snapshot.json
- old_digest: cbd6cbc9c91eea107af28b205fade48933638e0957e81159a25e5cf45a21e838
- current_digest: cbd6cbc9c91eea107af28b205fade48933638e0957e81159a25e5cf45a21e838
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605220959-6R6Y21

### 2026-05-22T10:09:05.311Z — VERIFY — ok

By: EVALUATOR

Note: Verified: EVALUATOR quality gate passed for the upgrade commit boundary and blueprint artifact classification fix. Regression tests cover #4010/#4011 .gitignore upgrade leftovers and #4012 blueprint evidence classification; typecheck, format, doctor, and routing checks passed. BlueprintSnapshotRef: cbd6cbc9c91eea107af28b205fade48933638e0957e81159a25e5cf45a21e838
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-22T10:08:53.517Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605220959-6R6Y21-fix-open-issues/.agentplane/tasks/202605220959-6R6Y21/blueprint/resolved-snapshot.json
- old_digest: cbd6cbc9c91eea107af28b205fade48933638e0957e81159a25e5cf45a21e838
- current_digest: cbd6cbc9c91eea107af28b205fade48933638e0957e81159a25e5cf45a21e838
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605220959-6R6Y21

### 2026-05-22T10:10:30.141Z — VERIFY — ok

By: EVALUATOR

Note: Verified: EVALUATOR quality gate re-run after implementation commit d191d3340. The fix covers #4010/#4011 by committing runtime SQLite .gitignore upgrade leftovers and allowlisted managed leftovers, and covers #4012 by classifying blueprint artifacts as task_blueprint_evidence. BlueprintSnapshotRef: cbd6cbc9c91eea107af28b205fade48933638e0957e81159a25e5cf45a21e838
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-22T10:09:05.364Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605220959-6R6Y21-fix-open-issues/.agentplane/tasks/202605220959-6R6Y21/blueprint/resolved-snapshot.json
- old_digest: cbd6cbc9c91eea107af28b205fade48933638e0957e81159a25e5cf45a21e838
- current_digest: cbd6cbc9c91eea107af28b205fade48933638e0957e81159a25e5cf45a21e838
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605220959-6R6Y21

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: Upgrade now explicitly normalizes runtime SQLite .gitignore lines before commit-path collection and sweeps allowlisted tracked upgrade leftovers into the upgrade commit. Preflight now classifies .agentplane/tasks/<id>/blueprint artifacts as task_blueprint_evidence with commit_with_task_evidence action.
  Impact: Prevents upgrade from leaving policy/.gitignore leftovers and removes ambiguity around blueprint evidence artifacts.
  Resolution: Added regression coverage in run-cli.core.upgrade.test.ts and run-cli.core.branch-meta.readiness.test.ts.
