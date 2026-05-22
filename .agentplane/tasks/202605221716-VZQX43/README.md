---
id: "202605221716-VZQX43"
title: "Lightweight push route for evidence-only branches"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "ci"
  - "code"
  - "workflow"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-22T17:17:30.585Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-22T17:37:32.980Z"
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
    at: "2026-05-22T17:17:59.096Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Implement approved release pipeline hardening batch; this task is included in the shared batch worktree owned by primary task 202605221715-424TFE."
  -
    type: "verify"
    at: "2026-05-22T17:37:32.980Z"
    author: "CODER"
    state: "ok"
    note: "Verified: release pipeline hardening implemented in shared batch branch; targeted checks, framework bootstrap, docs checks, doctor, and ci:contract passed."
doc_version: 3
doc_updated_at: "2026-05-22T17:37:33.001Z"
doc_updated_by: "CODER"
description: "Avoid running broad local pre-push checks for no-op or evidence-only branch pushes when hosted checks are the source of truth."
sections:
  Summary: |-
    Lightweight push route for evidence-only branches

    Avoid running broad local pre-push checks for no-op or evidence-only branch pushes when hosted checks are the source of truth.
  Scope: |-
    - In scope: Avoid running broad local pre-push checks for no-op or evidence-only branch pushes when hosted checks are the source of truth.
    - Out of scope: unrelated refactors not required for "Lightweight push route for evidence-only branches".
  Plan: "Add lightweight/local-check bypass route for evidence-only branch pushes where hosted checks are source of truth, without weakening normal product branch pre-push checks. Verify evidence-only detection and non-evidence protection."
  Verify Steps: |-
    1. Run pre-push hook tests for evidence-only branch detection.
    2. Confirm evidence-only push avoids broad local fast route.
    3. Confirm code/product branch pushes still run normal pre-push checks.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-22T17:37:32.980Z — VERIFY — ok

    By: CODER

    Note: Verified: release pipeline hardening implemented in shared batch branch; targeted checks, framework bootstrap, docs checks, doctor, and ci:contract passed.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-22T17:17:59.096Z, excerpt_hash=sha256:0da98b69f341b69455418346b5cfed005a8d07033a562f3e3232bebe864c3309

    Details:

    BlueprintSnapshotRef:
    - state: missing
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605221715-424TFE-release-pipeline-hardening/.agentplane/tasks/202605221716-VZQX43/blueprint/resolved-snapshot.json
    - old_digest: none
    - current_digest: 556da3975aedf14ce85f6e76bf821de8d87e8bd668b6c26b510759ae184c6b90
    - route_changed: unknown
    - safe_command: agentplane blueprint snapshot 202605221716-VZQX43

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Lightweight push route for evidence-only branches

Avoid running broad local pre-push checks for no-op or evidence-only branch pushes when hosted checks are the source of truth.

## Scope

- In scope: Avoid running broad local pre-push checks for no-op or evidence-only branch pushes when hosted checks are the source of truth.
- Out of scope: unrelated refactors not required for "Lightweight push route for evidence-only branches".

## Plan

Add lightweight/local-check bypass route for evidence-only branch pushes where hosted checks are source of truth, without weakening normal product branch pre-push checks. Verify evidence-only detection and non-evidence protection.

## Verify Steps

1. Run pre-push hook tests for evidence-only branch detection.
2. Confirm evidence-only push avoids broad local fast route.
3. Confirm code/product branch pushes still run normal pre-push checks.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-22T17:37:32.980Z — VERIFY — ok

By: CODER

Note: Verified: release pipeline hardening implemented in shared batch branch; targeted checks, framework bootstrap, docs checks, doctor, and ci:contract passed.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-22T17:17:59.096Z, excerpt_hash=sha256:0da98b69f341b69455418346b5cfed005a8d07033a562f3e3232bebe864c3309

Details:

BlueprintSnapshotRef:
- state: missing
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605221715-424TFE-release-pipeline-hardening/.agentplane/tasks/202605221716-VZQX43/blueprint/resolved-snapshot.json
- old_digest: none
- current_digest: 556da3975aedf14ce85f6e76bf821de8d87e8bd668b6c26b510759ae184c6b90
- route_changed: unknown
- safe_command: agentplane blueprint snapshot 202605221716-VZQX43

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
