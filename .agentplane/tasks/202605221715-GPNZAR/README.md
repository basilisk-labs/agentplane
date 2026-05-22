---
id: "202605221715-GPNZAR"
title: "Add branch override or clearer usage for pr check"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 6
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
  updated_at: "2026-05-22T17:37:27.244Z"
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
doc_version: 3
doc_updated_at: "2026-05-22T17:37:27.262Z"
doc_updated_by: "CODER"
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

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
