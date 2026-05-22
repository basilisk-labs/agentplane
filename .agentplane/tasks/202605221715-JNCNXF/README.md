---
id: "202605221715-JNCNXF"
title: "Exclude active release task from release readiness gate"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "release"
  - "tasks"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-22T17:16:31.124Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-22T17:37:24.479Z"
  updated_by: "CODER"
  note: "Verified: release pipeline hardening implemented in shared batch branch; targeted checks, framework bootstrap, docs checks, doctor, and ci:contract passed."
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Implement approved release pipeline hardening batch; this task is included in the shared batch worktree owned by primary task 202605221715-424TFE."
events:
  -
    type: "status"
    at: "2026-05-22T17:17:54.598Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Implement approved release pipeline hardening batch; this task is included in the shared batch worktree owned by primary task 202605221715-424TFE."
  -
    type: "verify"
    at: "2026-05-22T17:37:24.479Z"
    author: "CODER"
    state: "ok"
    note: "Verified: release pipeline hardening implemented in shared batch branch; targeted checks, framework bootstrap, docs checks, doctor, and ci:contract passed."
doc_version: 3
doc_updated_at: "2026-05-22T17:37:24.498Z"
doc_updated_by: "CODER"
description: "Let release readiness ignore the current approved release task instead of forcing it into BLOCKED during its own release."
sections:
  Summary: |-
    Exclude active release task from release readiness gate

    Let release readiness ignore the current approved release task instead of forcing it into BLOCKED during its own release.
  Scope: |-
    - In scope: Let release readiness ignore the current approved release task instead of forcing it into BLOCKED during its own release.
    - Out of scope: unrelated refactors not required for "Exclude active release task from release readiness gate".
  Plan: "Adjust release task registry readiness so the active approved release task does not block its own release, while all other active tasks remain blocking. Verify current-task exclusion and non-current active task rejection."
  Verify Steps: |-
    1. Run targeted release task registry readiness tests.
    2. Confirm active release task id can be excluded only when explicitly identified.
    3. Confirm unrelated DOING/BLOCKED tasks still fail release readiness.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-22T17:37:24.479Z — VERIFY — ok

    By: CODER

    Note: Verified: release pipeline hardening implemented in shared batch branch; targeted checks, framework bootstrap, docs checks, doctor, and ci:contract passed.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-22T17:17:54.598Z, excerpt_hash=sha256:37a50eb173d714dae100200dcc52fd9b93e11402d4e13d5999893559cf148eec

    Details:

    BlueprintSnapshotRef:
    - state: missing
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605221715-424TFE-release-pipeline-hardening/.agentplane/tasks/202605221715-JNCNXF/blueprint/resolved-snapshot.json
    - old_digest: none
    - current_digest: 5267ed3bdec96f9d6803b0f555df7d58f00ccee2785add3fd2067bb7291c2824
    - route_changed: unknown
    - safe_command: agentplane blueprint snapshot 202605221715-JNCNXF

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Exclude active release task from release readiness gate

Let release readiness ignore the current approved release task instead of forcing it into BLOCKED during its own release.

## Scope

- In scope: Let release readiness ignore the current approved release task instead of forcing it into BLOCKED during its own release.
- Out of scope: unrelated refactors not required for "Exclude active release task from release readiness gate".

## Plan

Adjust release task registry readiness so the active approved release task does not block its own release, while all other active tasks remain blocking. Verify current-task exclusion and non-current active task rejection.

## Verify Steps

1. Run targeted release task registry readiness tests.
2. Confirm active release task id can be excluded only when explicitly identified.
3. Confirm unrelated DOING/BLOCKED tasks still fail release readiness.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-22T17:37:24.479Z — VERIFY — ok

By: CODER

Note: Verified: release pipeline hardening implemented in shared batch branch; targeted checks, framework bootstrap, docs checks, doctor, and ci:contract passed.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-22T17:17:54.598Z, excerpt_hash=sha256:37a50eb173d714dae100200dcc52fd9b93e11402d4e13d5999893559cf148eec

Details:

BlueprintSnapshotRef:
- state: missing
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605221715-424TFE-release-pipeline-hardening/.agentplane/tasks/202605221715-JNCNXF/blueprint/resolved-snapshot.json
- old_digest: none
- current_digest: 5267ed3bdec96f9d6803b0f555df7d58f00ccee2785add3fd2067bb7291c2824
- route_changed: unknown
- safe_command: agentplane blueprint snapshot 202605221715-JNCNXF

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
