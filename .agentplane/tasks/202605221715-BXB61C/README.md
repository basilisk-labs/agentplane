---
id: "202605221715-BXB61C"
title: "Remove quality review self-SHA requirement for protected PRs"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "workflow"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-22T17:16:32.959Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-22T17:37:25.552Z"
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
    at: "2026-05-22T17:17:55.266Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Implement approved release pipeline hardening batch; this task is included in the shared batch worktree owned by primary task 202605221715-424TFE."
  -
    type: "verify"
    at: "2026-05-22T17:37:25.552Z"
    author: "CODER"
    state: "ok"
    note: "Verified: release pipeline hardening implemented in shared batch branch; targeted checks, framework bootstrap, docs checks, doctor, and ci:contract passed."
doc_version: 3
doc_updated_at: "2026-05-22T17:37:25.569Z"
doc_updated_by: "CODER"
description: "Replace tracked quality_review evaluated_sha freshness with non-self-referential freshness for protected-base PR integration."
sections:
  Summary: |-
    Remove quality review self-SHA requirement for protected PRs

    Replace tracked quality_review evaluated_sha freshness with non-self-referential freshness for protected-base PR integration.
  Scope: |-
    - In scope: Replace tracked quality_review evaluated_sha freshness with non-self-referential freshness for protected-base PR integration.
    - Out of scope: unrelated refactors not required for "Remove quality review self-SHA requirement for protected PRs".
  Plan: "Remove protected-base quality review self-SHA loop by using non-self-referential freshness for branch_pr protected PR integration. Verify local integrate accepts hosted/live freshness without requiring evaluated_sha to equal artifact commit SHA."
  Verify Steps: |-
    1. Run quality-review gate tests.
    2. Run pr integrate prepare tests.
    3. Confirm protected-base route does not require self-referential evaluated_sha while direct/local route still enforces freshness where appropriate.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-22T17:37:25.552Z — VERIFY — ok

    By: CODER

    Note: Verified: release pipeline hardening implemented in shared batch branch; targeted checks, framework bootstrap, docs checks, doctor, and ci:contract passed.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-22T17:17:55.266Z, excerpt_hash=sha256:234e7cd11550e1e22eec1b51d23a30a2d64ad4edc39c2b3469a06daa11c3adc2

    Details:

    BlueprintSnapshotRef:
    - state: missing
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605221715-424TFE-release-pipeline-hardening/.agentplane/tasks/202605221715-BXB61C/blueprint/resolved-snapshot.json
    - old_digest: none
    - current_digest: ec8feff2201994dc2940918379705c7805e02d54594247644273415f2de07586
    - route_changed: unknown
    - safe_command: agentplane blueprint snapshot 202605221715-BXB61C

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Remove quality review self-SHA requirement for protected PRs

Replace tracked quality_review evaluated_sha freshness with non-self-referential freshness for protected-base PR integration.

## Scope

- In scope: Replace tracked quality_review evaluated_sha freshness with non-self-referential freshness for protected-base PR integration.
- Out of scope: unrelated refactors not required for "Remove quality review self-SHA requirement for protected PRs".

## Plan

Remove protected-base quality review self-SHA loop by using non-self-referential freshness for branch_pr protected PR integration. Verify local integrate accepts hosted/live freshness without requiring evaluated_sha to equal artifact commit SHA.

## Verify Steps

1. Run quality-review gate tests.
2. Run pr integrate prepare tests.
3. Confirm protected-base route does not require self-referential evaluated_sha while direct/local route still enforces freshness where appropriate.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-22T17:37:25.552Z — VERIFY — ok

By: CODER

Note: Verified: release pipeline hardening implemented in shared batch branch; targeted checks, framework bootstrap, docs checks, doctor, and ci:contract passed.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-22T17:17:55.266Z, excerpt_hash=sha256:234e7cd11550e1e22eec1b51d23a30a2d64ad4edc39c2b3469a06daa11c3adc2

Details:

BlueprintSnapshotRef:
- state: missing
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605221715-424TFE-release-pipeline-hardening/.agentplane/tasks/202605221715-BXB61C/blueprint/resolved-snapshot.json
- old_digest: none
- current_digest: ec8feff2201994dc2940918379705c7805e02d54594247644273415f2de07586
- route_changed: unknown
- safe_command: agentplane blueprint snapshot 202605221715-BXB61C

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
