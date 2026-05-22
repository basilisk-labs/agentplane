---
id: "202605221715-Q6QT2M"
title: "Make PR artifacts external or precommit-safe"
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
  - "git"
  - "workflow"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-22T17:16:32.066Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-22T18:13:16.274Z"
  updated_by: "EVALUATOR"
  note: "EVALUATOR quality gate passed after batch merge: blueprint snapshot recorded, PR #4022 implemented the included task, PR #4023 closed the primary task, and hosted checks were green."
  attempts: 0
quality_review:
  state: "pass"
  updated_at: "2026-05-22T18:13:16.274Z"
  updated_by: "EVALUATOR"
  note: "EVALUATOR quality gate passed after batch merge: blueprint snapshot recorded, PR #4022 implemented the included task, PR #4023 closed the primary task, and hosted checks were green."
  evaluated_sha: "ff82cb92e846c51297beb1a491aed29deb49c079"
  blueprint_digest: "10bd61d14b52cad76bd3dc3f1a1572dfa3d1f44fb0b4db8c2c2ee0ea64f0899b"
  evidence_refs:
    - ".agentplane/tasks/202605221715-Q6QT2M/README.md"
    - "/Users/densmirnov/Github/agentplane/.agentplane/tasks/202605221715-Q6QT2M/blueprint/resolved-snapshot.json"
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
    at: "2026-05-22T17:17:54.939Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Implement approved release pipeline hardening batch; this task is included in the shared batch worktree owned by primary task 202605221715-424TFE."
  -
    type: "verify"
    at: "2026-05-22T17:37:24.986Z"
    author: "CODER"
    state: "ok"
    note: "Verified: release pipeline hardening implemented in shared batch branch; targeted checks, framework bootstrap, docs checks, doctor, and ci:contract passed."
  -
    type: "verify"
    at: "2026-05-22T18:13:16.274Z"
    author: "EVALUATOR"
    state: "ok"
    note: "EVALUATOR quality gate passed after batch merge: blueprint snapshot recorded, PR #4022 implemented the included task, PR #4023 closed the primary task, and hosted checks were green."
  -
    type: "status"
    at: "2026-05-22T18:13:16.872Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: included batch task was implemented by PR #4022, verified by local ci:contract and hosted GitHub checks, and reconciled after close-tail PR #4023."
doc_version: 3
doc_updated_at: "2026-05-22T18:13:16.873Z"
doc_updated_by: "INTEGRATOR"
description: "Prevent pr open/update from requiring a second tracked artifact commit after the implementation commit."
sections:
  Summary: |-
    Make PR artifacts external or precommit-safe

    Prevent pr open/update from requiring a second tracked artifact commit after the implementation commit.
  Scope: |-
    - In scope: Prevent pr open/update from requiring a second tracked artifact commit after the implementation commit.
    - Out of scope: unrelated refactors not required for "Make PR artifacts external or precommit-safe".
  Plan: "Refactor PR artifacts so pr open/update cannot require a second tracked commit after implementation commit. Mutable PR runtime fields should be external or computed live. Verify one-commit branch state after pr open/update."
  Verify Steps: |-
    1. Run targeted pr open/update artifact tests.
    2. Confirm tracked PR artifacts do not include mutable head_sha-like state.
    3. Confirm pr open/update leaves no required tracked-only commit after implementation commit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-22T17:37:24.986Z — VERIFY — ok

    By: CODER

    Note: Verified: release pipeline hardening implemented in shared batch branch; targeted checks, framework bootstrap, docs checks, doctor, and ci:contract passed.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-22T17:17:54.939Z, excerpt_hash=sha256:a1aa334dae6f62160a080f1899fd69c0e446c04ad54309bbe5c222d01c9e31d8

    Details:

    BlueprintSnapshotRef:
    - state: missing
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605221715-424TFE-release-pipeline-hardening/.agentplane/tasks/202605221715-Q6QT2M/blueprint/resolved-snapshot.json
    - old_digest: none
    - current_digest: 10bd61d14b52cad76bd3dc3f1a1572dfa3d1f44fb0b4db8c2c2ee0ea64f0899b
    - route_changed: unknown
    - safe_command: agentplane blueprint snapshot 202605221715-Q6QT2M

    ### 2026-05-22T18:13:16.274Z — VERIFY — ok

    By: EVALUATOR

    Note: EVALUATOR quality gate passed after batch merge: blueprint snapshot recorded, PR #4022 implemented the included task, PR #4023 closed the primary task, and hosted checks were green.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-22T17:37:25.005Z, excerpt_hash=sha256:a1aa334dae6f62160a080f1899fd69c0e446c04ad54309bbe5c222d01c9e31d8

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tasks/202605221715-Q6QT2M/blueprint/resolved-snapshot.json
    - old_digest: 10bd61d14b52cad76bd3dc3f1a1572dfa3d1f44fb0b4db8c2c2ee0ea64f0899b
    - current_digest: 10bd61d14b52cad76bd3dc3f1a1572dfa3d1f44fb0b4db8c2c2ee0ea64f0899b
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605221715-Q6QT2M

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Make PR artifacts external or precommit-safe

Prevent pr open/update from requiring a second tracked artifact commit after the implementation commit.

## Scope

- In scope: Prevent pr open/update from requiring a second tracked artifact commit after the implementation commit.
- Out of scope: unrelated refactors not required for "Make PR artifacts external or precommit-safe".

## Plan

Refactor PR artifacts so pr open/update cannot require a second tracked commit after implementation commit. Mutable PR runtime fields should be external or computed live. Verify one-commit branch state after pr open/update.

## Verify Steps

1. Run targeted pr open/update artifact tests.
2. Confirm tracked PR artifacts do not include mutable head_sha-like state.
3. Confirm pr open/update leaves no required tracked-only commit after implementation commit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-22T17:37:24.986Z — VERIFY — ok

By: CODER

Note: Verified: release pipeline hardening implemented in shared batch branch; targeted checks, framework bootstrap, docs checks, doctor, and ci:contract passed.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-22T17:17:54.939Z, excerpt_hash=sha256:a1aa334dae6f62160a080f1899fd69c0e446c04ad54309bbe5c222d01c9e31d8

Details:

BlueprintSnapshotRef:
- state: missing
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605221715-424TFE-release-pipeline-hardening/.agentplane/tasks/202605221715-Q6QT2M/blueprint/resolved-snapshot.json
- old_digest: none
- current_digest: 10bd61d14b52cad76bd3dc3f1a1572dfa3d1f44fb0b4db8c2c2ee0ea64f0899b
- route_changed: unknown
- safe_command: agentplane blueprint snapshot 202605221715-Q6QT2M

### 2026-05-22T18:13:16.274Z — VERIFY — ok

By: EVALUATOR

Note: EVALUATOR quality gate passed after batch merge: blueprint snapshot recorded, PR #4022 implemented the included task, PR #4023 closed the primary task, and hosted checks were green.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-22T17:37:25.005Z, excerpt_hash=sha256:a1aa334dae6f62160a080f1899fd69c0e446c04ad54309bbe5c222d01c9e31d8

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tasks/202605221715-Q6QT2M/blueprint/resolved-snapshot.json
- old_digest: 10bd61d14b52cad76bd3dc3f1a1572dfa3d1f44fb0b4db8c2c2ee0ea64f0899b
- current_digest: 10bd61d14b52cad76bd3dc3f1a1572dfa3d1f44fb0b4db8c2c2ee0ea64f0899b
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605221715-Q6QT2M

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
