---
id: "202605221715-GPNZAR"
title: "Add branch override or clearer usage for pr check"
result_summary: "Included release pipeline hardening task closed after batch merge."
status: "DONE"
priority: "med"
owner: "CODER"
revision: 8
origin:
  system: "manual"
depends_on: []
tags:
  - "cli"
  - "code"
  - "workflow"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-22T17:16:52.946Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-22T18:13:22.200Z"
  updated_by: "EVALUATOR"
  note: "EVALUATOR quality gate passed after batch merge: blueprint snapshot recorded, PR #4022 implemented the included task, PR #4023 closed the primary task, and hosted checks were green."
  attempts: 0
quality_review:
  state: "pass"
  updated_at: "2026-05-22T18:13:22.200Z"
  updated_by: "EVALUATOR"
  note: "EVALUATOR quality gate passed after batch merge: blueprint snapshot recorded, PR #4022 implemented the included task, PR #4023 closed the primary task, and hosted checks were green."
  evaluated_sha: "ff82cb92e846c51297beb1a491aed29deb49c079"
  blueprint_digest: "9af4908222e15726d04162c3e9caad76b777d45deb7b3498c144efd5d62990c5"
  evidence_refs:
    - ".agentplane/tasks/202605221715-GPNZAR/README.md"
    - "/Users/densmirnov/Github/agentplane/.agentplane/tasks/202605221715-GPNZAR/blueprint/resolved-snapshot.json"
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
    at: "2026-05-22T17:17:56.231Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Implement approved release pipeline hardening batch; this task is included in the shared batch worktree owned by primary task 202605221715-424TFE."
  -
    type: "verify"
    at: "2026-05-22T17:37:27.244Z"
    author: "CODER"
    state: "ok"
    note: "Verified: release pipeline hardening implemented in shared batch branch; targeted checks, framework bootstrap, docs checks, doctor, and ci:contract passed."
  -
    type: "verify"
    at: "2026-05-22T18:13:22.200Z"
    author: "EVALUATOR"
    state: "ok"
    note: "EVALUATOR quality gate passed after batch merge: blueprint snapshot recorded, PR #4022 implemented the included task, PR #4023 closed the primary task, and hosted checks were green."
  -
    type: "status"
    at: "2026-05-22T18:13:22.898Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: included batch task was implemented by PR #4022, verified by local ci:contract and hosted GitHub checks, and reconciled after close-tail PR #4023."
doc_version: 3
doc_updated_at: "2026-05-22T18:13:22.899Z"
doc_updated_by: "INTEGRATOR"
description: "Make pr check diagnostics consistent with neighboring PR commands by supporting or clearly rejecting branch overrides."
sections:
  Summary: |-
    Add branch override or clearer usage for pr check

    Make pr check diagnostics consistent with neighboring PR commands by supporting or clearly rejecting branch overrides.
  Scope: |-
    - In scope: Make pr check diagnostics consistent with neighboring PR commands by supporting or clearly rejecting branch overrides.
    - Out of scope: unrelated refactors not required for "Add branch override or clearer usage for pr check".
  Plan: "Improve pr check branch handling by adding branch override or explicit diagnostics. Verify command usage and branch resolution behavior."
  Verify Steps: |-
    1. Run pr check CLI usage tests.
    2. Confirm --branch behavior is accepted or rejected with a precise next action.
    3. Confirm normal pr check still resolves branch from task PR metadata.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-22T17:37:27.244Z — VERIFY — ok

    By: CODER

    Note: Verified: release pipeline hardening implemented in shared batch branch; targeted checks, framework bootstrap, docs checks, doctor, and ci:contract passed.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-22T17:17:56.231Z, excerpt_hash=sha256:46ca6d2e1fdae2dba77cfbb842581beff877796a4f275dbe3bc5024b225eb454

    Details:

    BlueprintSnapshotRef:
    - state: missing
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605221715-424TFE-release-pipeline-hardening/.agentplane/tasks/202605221715-GPNZAR/blueprint/resolved-snapshot.json
    - old_digest: none
    - current_digest: 9af4908222e15726d04162c3e9caad76b777d45deb7b3498c144efd5d62990c5
    - route_changed: unknown
    - safe_command: agentplane blueprint snapshot 202605221715-GPNZAR

    ### 2026-05-22T18:13:22.200Z — VERIFY — ok

    By: EVALUATOR

    Note: EVALUATOR quality gate passed after batch merge: blueprint snapshot recorded, PR #4022 implemented the included task, PR #4023 closed the primary task, and hosted checks were green.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-22T17:37:27.262Z, excerpt_hash=sha256:46ca6d2e1fdae2dba77cfbb842581beff877796a4f275dbe3bc5024b225eb454

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tasks/202605221715-GPNZAR/blueprint/resolved-snapshot.json
    - old_digest: 9af4908222e15726d04162c3e9caad76b777d45deb7b3498c144efd5d62990c5
    - current_digest: 9af4908222e15726d04162c3e9caad76b777d45deb7b3498c144efd5d62990c5
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605221715-GPNZAR

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Add branch override or clearer usage for pr check

Make pr check diagnostics consistent with neighboring PR commands by supporting or clearly rejecting branch overrides.

## Scope

- In scope: Make pr check diagnostics consistent with neighboring PR commands by supporting or clearly rejecting branch overrides.
- Out of scope: unrelated refactors not required for "Add branch override or clearer usage for pr check".

## Plan

Improve pr check branch handling by adding branch override or explicit diagnostics. Verify command usage and branch resolution behavior.

## Verify Steps

1. Run pr check CLI usage tests.
2. Confirm --branch behavior is accepted or rejected with a precise next action.
3. Confirm normal pr check still resolves branch from task PR metadata.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-22T17:37:27.244Z — VERIFY — ok

By: CODER

Note: Verified: release pipeline hardening implemented in shared batch branch; targeted checks, framework bootstrap, docs checks, doctor, and ci:contract passed.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-22T17:17:56.231Z, excerpt_hash=sha256:46ca6d2e1fdae2dba77cfbb842581beff877796a4f275dbe3bc5024b225eb454

Details:

BlueprintSnapshotRef:
- state: missing
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605221715-424TFE-release-pipeline-hardening/.agentplane/tasks/202605221715-GPNZAR/blueprint/resolved-snapshot.json
- old_digest: none
- current_digest: 9af4908222e15726d04162c3e9caad76b777d45deb7b3498c144efd5d62990c5
- route_changed: unknown
- safe_command: agentplane blueprint snapshot 202605221715-GPNZAR

### 2026-05-22T18:13:22.200Z — VERIFY — ok

By: EVALUATOR

Note: EVALUATOR quality gate passed after batch merge: blueprint snapshot recorded, PR #4022 implemented the included task, PR #4023 closed the primary task, and hosted checks were green.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-22T17:37:27.262Z, excerpt_hash=sha256:46ca6d2e1fdae2dba77cfbb842581beff877796a4f275dbe3bc5024b225eb454

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tasks/202605221715-GPNZAR/blueprint/resolved-snapshot.json
- old_digest: 9af4908222e15726d04162c3e9caad76b777d45deb7b3498c144efd5d62990c5
- current_digest: 9af4908222e15726d04162c3e9caad76b777d45deb7b3498c144efd5d62990c5
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605221715-GPNZAR

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
