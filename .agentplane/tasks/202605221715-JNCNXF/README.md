---
id: "202605221715-JNCNXF"
title: "Exclude active release task from release readiness gate"
result_summary: "Included release pipeline hardening task closed after batch merge."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 8
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
  updated_at: "2026-05-22T18:12:52.249Z"
  updated_by: "EVALUATOR"
  note: "EVALUATOR quality gate passed after batch merge: blueprint snapshot recorded, PR #4022 implemented the included task, PR #4023 closed the primary task, and hosted checks were green."
  attempts: 0
quality_review:
  state: "pass"
  updated_at: "2026-05-22T18:12:52.249Z"
  updated_by: "EVALUATOR"
  note: "EVALUATOR quality gate passed after batch merge: blueprint snapshot recorded, PR #4022 implemented the included task, PR #4023 closed the primary task, and hosted checks were green."
  evaluated_sha: "ff82cb92e846c51297beb1a491aed29deb49c079"
  blueprint_digest: "5267ed3bdec96f9d6803b0f555df7d58f00ccee2785add3fd2067bb7291c2824"
  evidence_refs:
    - ".agentplane/tasks/202605221715-JNCNXF/README.md"
    - "/Users/densmirnov/Github/agentplane/.agentplane/tasks/202605221715-JNCNXF/blueprint/resolved-snapshot.json"
  findings: []
commit:
  hash: "ff82cb92e846c51297beb1a491aed29deb49c079"
  message: "Merge pull request #4023 from basilisk-labs/task-close/202605221715-424TFE/53b9f7c74c78"
comments:
  -
    author: "CODER"
    body: "Start: Implement approved release pipeline hardening batch; this task is included in the shared batch worktree owned by primary task 202605221715-424TFE."
  -
    author: "INTEGRATOR"
    body: "Verified: included batch task was implemented by PR #4022, verified by local ci:contract and hosted GitHub checks, and reconciled after close-tail PR #4023."
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
  -
    type: "verify"
    at: "2026-05-22T18:12:52.249Z"
    author: "EVALUATOR"
    state: "ok"
    note: "EVALUATOR quality gate passed after batch merge: blueprint snapshot recorded, PR #4022 implemented the included task, PR #4023 closed the primary task, and hosted checks were green."
  -
    type: "status"
    at: "2026-05-22T18:13:04.451Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: included batch task was implemented by PR #4022, verified by local ci:contract and hosted GitHub checks, and reconciled after close-tail PR #4023."
doc_version: 3
doc_updated_at: "2026-05-22T18:13:04.451Z"
doc_updated_by: "INTEGRATOR"
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

    ### 2026-05-22T18:12:52.249Z — VERIFY — ok

    By: EVALUATOR

    Note: EVALUATOR quality gate passed after batch merge: blueprint snapshot recorded, PR #4022 implemented the included task, PR #4023 closed the primary task, and hosted checks were green.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-22T17:37:24.498Z, excerpt_hash=sha256:37a50eb173d714dae100200dcc52fd9b93e11402d4e13d5999893559cf148eec

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tasks/202605221715-JNCNXF/blueprint/resolved-snapshot.json
    - old_digest: 5267ed3bdec96f9d6803b0f555df7d58f00ccee2785add3fd2067bb7291c2824
    - current_digest: 5267ed3bdec96f9d6803b0f555df7d58f00ccee2785add3fd2067bb7291c2824
    - route_changed: no
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

### 2026-05-22T18:12:52.249Z — VERIFY — ok

By: EVALUATOR

Note: EVALUATOR quality gate passed after batch merge: blueprint snapshot recorded, PR #4022 implemented the included task, PR #4023 closed the primary task, and hosted checks were green.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-22T17:37:24.498Z, excerpt_hash=sha256:37a50eb173d714dae100200dcc52fd9b93e11402d4e13d5999893559cf148eec

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tasks/202605221715-JNCNXF/blueprint/resolved-snapshot.json
- old_digest: 5267ed3bdec96f9d6803b0f555df7d58f00ccee2785add3fd2067bb7291c2824
- current_digest: 5267ed3bdec96f9d6803b0f555df7d58f00ccee2785add3fd2067bb7291c2824
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605221715-JNCNXF

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
