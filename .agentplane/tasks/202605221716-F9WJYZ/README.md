---
id: "202605221716-F9WJYZ"
title: "Generate release social image with release notes"
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
  - "website"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-22T17:17:28.707Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-22T18:13:32.937Z"
  updated_by: "EVALUATOR"
  note: "EVALUATOR quality gate passed after batch merge: blueprint snapshot recorded, PR #4022 implemented the included task, PR #4023 closed the primary task, and hosted checks were green."
  attempts: 0
quality_review:
  state: "pass"
  updated_at: "2026-05-22T18:13:32.937Z"
  updated_by: "EVALUATOR"
  note: "EVALUATOR quality gate passed after batch merge: blueprint snapshot recorded, PR #4022 implemented the included task, PR #4023 closed the primary task, and hosted checks were green."
  evaluated_sha: "ff82cb92e846c51297beb1a491aed29deb49c079"
  blueprint_digest: "7d903f4d8106c1c3e941d6718871ffffd22c2df2fd87e76ede1e48c2029f5590"
  evidence_refs:
    - ".agentplane/tasks/202605221716-F9WJYZ/README.md"
    - "/Users/densmirnov/Github/agentplane/.agentplane/tasks/202605221716-F9WJYZ/blueprint/resolved-snapshot.json"
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
    at: "2026-05-22T17:17:58.456Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Implement approved release pipeline hardening batch; this task is included in the shared batch worktree owned by primary task 202605221715-424TFE."
  -
    type: "verify"
    at: "2026-05-22T17:37:31.607Z"
    author: "CODER"
    state: "ok"
    note: "Verified: release pipeline hardening implemented in shared batch branch; targeted checks, framework bootstrap, docs checks, doctor, and ci:contract passed."
  -
    type: "verify"
    at: "2026-05-22T18:13:32.937Z"
    author: "EVALUATOR"
    state: "ok"
    note: "EVALUATOR quality gate passed after batch merge: blueprint snapshot recorded, PR #4022 implemented the included task, PR #4023 closed the primary task, and hosted checks were green."
  -
    type: "status"
    at: "2026-05-22T18:13:33.562Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: included batch task was implemented by PR #4022, verified by local ci:contract and hosted GitHub checks, and reconciled after close-tail PR #4023."
doc_version: 3
doc_updated_at: "2026-05-22T18:13:33.562Z"
doc_updated_by: "INTEGRATOR"
description: "Create or validate release page social images as part of release planning/candidate preparation."
sections:
  Summary: |-
    Generate release social image with release notes

    Create or validate release page social images as part of release planning/candidate preparation.
  Scope: |-
    - In scope: Create or validate release page social images as part of release planning/candidate preparation.
    - Out of scope: unrelated refactors not required for "Generate release social image with release notes".
  Plan: "Generate or validate release social image as part of release note/candidate preparation. Verify new release page cannot reach docs:site:check missing social image."
  Verify Steps: |-
    1. Run release note/social image generation tests.
    2. Run docs:site:check or targeted social image check.
    3. Confirm a new docs/releases/vX.Y.Z page produces matching static/img/social image.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-22T17:37:31.607Z — VERIFY — ok

    By: CODER

    Note: Verified: release pipeline hardening implemented in shared batch branch; targeted checks, framework bootstrap, docs checks, doctor, and ci:contract passed.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-22T17:17:58.456Z, excerpt_hash=sha256:2dac319266d604b32a275edcfb693fdfb4bacea16266b4a62f98e3719107ad59

    Details:

    BlueprintSnapshotRef:
    - state: missing
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605221715-424TFE-release-pipeline-hardening/.agentplane/tasks/202605221716-F9WJYZ/blueprint/resolved-snapshot.json
    - old_digest: none
    - current_digest: 7d903f4d8106c1c3e941d6718871ffffd22c2df2fd87e76ede1e48c2029f5590
    - route_changed: unknown
    - safe_command: agentplane blueprint snapshot 202605221716-F9WJYZ

    ### 2026-05-22T18:13:32.937Z — VERIFY — ok

    By: EVALUATOR

    Note: EVALUATOR quality gate passed after batch merge: blueprint snapshot recorded, PR #4022 implemented the included task, PR #4023 closed the primary task, and hosted checks were green.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-22T17:37:31.626Z, excerpt_hash=sha256:2dac319266d604b32a275edcfb693fdfb4bacea16266b4a62f98e3719107ad59

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tasks/202605221716-F9WJYZ/blueprint/resolved-snapshot.json
    - old_digest: 7d903f4d8106c1c3e941d6718871ffffd22c2df2fd87e76ede1e48c2029f5590
    - current_digest: 7d903f4d8106c1c3e941d6718871ffffd22c2df2fd87e76ede1e48c2029f5590
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605221716-F9WJYZ

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Generate release social image with release notes

Create or validate release page social images as part of release planning/candidate preparation.

## Scope

- In scope: Create or validate release page social images as part of release planning/candidate preparation.
- Out of scope: unrelated refactors not required for "Generate release social image with release notes".

## Plan

Generate or validate release social image as part of release note/candidate preparation. Verify new release page cannot reach docs:site:check missing social image.

## Verify Steps

1. Run release note/social image generation tests.
2. Run docs:site:check or targeted social image check.
3. Confirm a new docs/releases/vX.Y.Z page produces matching static/img/social image.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-22T17:37:31.607Z — VERIFY — ok

By: CODER

Note: Verified: release pipeline hardening implemented in shared batch branch; targeted checks, framework bootstrap, docs checks, doctor, and ci:contract passed.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-22T17:17:58.456Z, excerpt_hash=sha256:2dac319266d604b32a275edcfb693fdfb4bacea16266b4a62f98e3719107ad59

Details:

BlueprintSnapshotRef:
- state: missing
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605221715-424TFE-release-pipeline-hardening/.agentplane/tasks/202605221716-F9WJYZ/blueprint/resolved-snapshot.json
- old_digest: none
- current_digest: 7d903f4d8106c1c3e941d6718871ffffd22c2df2fd87e76ede1e48c2029f5590
- route_changed: unknown
- safe_command: agentplane blueprint snapshot 202605221716-F9WJYZ

### 2026-05-22T18:13:32.937Z — VERIFY — ok

By: EVALUATOR

Note: EVALUATOR quality gate passed after batch merge: blueprint snapshot recorded, PR #4022 implemented the included task, PR #4023 closed the primary task, and hosted checks were green.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-22T17:37:31.626Z, excerpt_hash=sha256:2dac319266d604b32a275edcfb693fdfb4bacea16266b4a62f98e3719107ad59

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tasks/202605221716-F9WJYZ/blueprint/resolved-snapshot.json
- old_digest: 7d903f4d8106c1c3e941d6718871ffffd22c2df2fd87e76ede1e48c2029f5590
- current_digest: 7d903f4d8106c1c3e941d6718871ffffd22c2df2fd87e76ede1e48c2029f5590
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605221716-F9WJYZ

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
