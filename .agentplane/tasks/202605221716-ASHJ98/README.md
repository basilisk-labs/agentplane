---
id: "202605221716-ASHJ98"
title: "Update expected CLI version during release bump"
result_summary: "Included release pipeline hardening task closed after batch merge."
status: "DONE"
priority: "med"
owner: "CODER"
revision: 8
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "release"
  - "runtime"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-22T17:17:29.669Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-22T18:13:34.400Z"
  updated_by: "EVALUATOR"
  note: "EVALUATOR quality gate passed after batch merge: blueprint snapshot recorded, PR #4022 implemented the included task, PR #4023 closed the primary task, and hosted checks were green."
  attempts: 0
quality_review:
  state: "pass"
  updated_at: "2026-05-22T18:13:34.400Z"
  updated_by: "EVALUATOR"
  note: "EVALUATOR quality gate passed after batch merge: blueprint snapshot recorded, PR #4022 implemented the included task, PR #4023 closed the primary task, and hosted checks were green."
  evaluated_sha: "ff82cb92e846c51297beb1a491aed29deb49c079"
  blueprint_digest: "5d5286a0ca82f646eb63d5bf2aa07001baa5ed7d899b0df49ade2ffeee63bf49"
  evidence_refs:
    - ".agentplane/tasks/202605221716-ASHJ98/README.md"
    - "/Users/densmirnov/Github/agentplane/.agentplane/tasks/202605221716-ASHJ98/blueprint/resolved-snapshot.json"
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
    at: "2026-05-22T17:17:58.778Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Implement approved release pipeline hardening batch; this task is included in the shared batch worktree owned by primary task 202605221715-424TFE."
  -
    type: "verify"
    at: "2026-05-22T17:37:32.303Z"
    author: "CODER"
    state: "ok"
    note: "Verified: release pipeline hardening implemented in shared batch branch; targeted checks, framework bootstrap, docs checks, doctor, and ci:contract passed."
  -
    type: "verify"
    at: "2026-05-22T18:13:34.400Z"
    author: "EVALUATOR"
    state: "ok"
    note: "EVALUATOR quality gate passed after batch merge: blueprint snapshot recorded, PR #4022 implemented the included task, PR #4023 closed the primary task, and hosted checks were green."
  -
    type: "status"
    at: "2026-05-22T18:13:34.991Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: included batch task was implemented by PR #4022, verified by local ci:contract and hosted GitHub checks, and reconciled after close-tail PR #4023."
doc_version: 3
doc_updated_at: "2026-05-22T18:13:34.992Z"
doc_updated_by: "INTEGRATOR"
description: "Keep repository expected CLI version aligned with the release candidate version to avoid post-merge doctor drift."
sections:
  Summary: |-
    Update expected CLI version during release bump

    Keep repository expected CLI version aligned with the release candidate version to avoid post-merge doctor drift.
  Scope: |-
    - In scope: Keep repository expected CLI version aligned with the release candidate version to avoid post-merge doctor drift.
    - Out of scope: unrelated refactors not required for "Update expected CLI version during release bump".
  Plan: "Update repository expected CLI version during release version bump so post-merge doctor does not report expected_version drift. Verify version surfaces include expected CLI where configured."
  Verify Steps: |-
    1. Run release version surface parity tests.
    2. Run version-bump script test for expected CLI config update.
    3. Confirm doctor/runtime explain no longer reports stale expected version after release bump.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-22T17:37:32.303Z — VERIFY — ok

    By: CODER

    Note: Verified: release pipeline hardening implemented in shared batch branch; targeted checks, framework bootstrap, docs checks, doctor, and ci:contract passed.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-22T17:17:58.778Z, excerpt_hash=sha256:ade9ad9dc92a11b491b2959ccfffb5dd3387ce529822e4e5ca1c316e273b6b3f

    Details:

    BlueprintSnapshotRef:
    - state: missing
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605221715-424TFE-release-pipeline-hardening/.agentplane/tasks/202605221716-ASHJ98/blueprint/resolved-snapshot.json
    - old_digest: none
    - current_digest: 5d5286a0ca82f646eb63d5bf2aa07001baa5ed7d899b0df49ade2ffeee63bf49
    - route_changed: unknown
    - safe_command: agentplane blueprint snapshot 202605221716-ASHJ98

    ### 2026-05-22T18:13:34.400Z — VERIFY — ok

    By: EVALUATOR

    Note: EVALUATOR quality gate passed after batch merge: blueprint snapshot recorded, PR #4022 implemented the included task, PR #4023 closed the primary task, and hosted checks were green.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-22T17:37:32.322Z, excerpt_hash=sha256:ade9ad9dc92a11b491b2959ccfffb5dd3387ce529822e4e5ca1c316e273b6b3f

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tasks/202605221716-ASHJ98/blueprint/resolved-snapshot.json
    - old_digest: 5d5286a0ca82f646eb63d5bf2aa07001baa5ed7d899b0df49ade2ffeee63bf49
    - current_digest: 5d5286a0ca82f646eb63d5bf2aa07001baa5ed7d899b0df49ade2ffeee63bf49
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605221716-ASHJ98

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Update expected CLI version during release bump

Keep repository expected CLI version aligned with the release candidate version to avoid post-merge doctor drift.

## Scope

- In scope: Keep repository expected CLI version aligned with the release candidate version to avoid post-merge doctor drift.
- Out of scope: unrelated refactors not required for "Update expected CLI version during release bump".

## Plan

Update repository expected CLI version during release version bump so post-merge doctor does not report expected_version drift. Verify version surfaces include expected CLI where configured.

## Verify Steps

1. Run release version surface parity tests.
2. Run version-bump script test for expected CLI config update.
3. Confirm doctor/runtime explain no longer reports stale expected version after release bump.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-22T17:37:32.303Z — VERIFY — ok

By: CODER

Note: Verified: release pipeline hardening implemented in shared batch branch; targeted checks, framework bootstrap, docs checks, doctor, and ci:contract passed.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-22T17:17:58.778Z, excerpt_hash=sha256:ade9ad9dc92a11b491b2959ccfffb5dd3387ce529822e4e5ca1c316e273b6b3f

Details:

BlueprintSnapshotRef:
- state: missing
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605221715-424TFE-release-pipeline-hardening/.agentplane/tasks/202605221716-ASHJ98/blueprint/resolved-snapshot.json
- old_digest: none
- current_digest: 5d5286a0ca82f646eb63d5bf2aa07001baa5ed7d899b0df49ade2ffeee63bf49
- route_changed: unknown
- safe_command: agentplane blueprint snapshot 202605221716-ASHJ98

### 2026-05-22T18:13:34.400Z — VERIFY — ok

By: EVALUATOR

Note: EVALUATOR quality gate passed after batch merge: blueprint snapshot recorded, PR #4022 implemented the included task, PR #4023 closed the primary task, and hosted checks were green.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-22T17:37:32.322Z, excerpt_hash=sha256:ade9ad9dc92a11b491b2959ccfffb5dd3387ce529822e4e5ca1c316e273b6b3f

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tasks/202605221716-ASHJ98/blueprint/resolved-snapshot.json
- old_digest: 5d5286a0ca82f646eb63d5bf2aa07001baa5ed7d899b0df49ade2ffeee63bf49
- current_digest: 5d5286a0ca82f646eb63d5bf2aa07001baa5ed7d899b0df49ade2ffeee63bf49
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605221716-ASHJ98

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
