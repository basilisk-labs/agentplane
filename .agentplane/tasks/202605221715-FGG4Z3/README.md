---
id: "202605221715-FGG4Z3"
title: "Restrict PR diffstat task registry exclusions"
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
  updated_at: "2026-05-22T17:16:51.957Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-22T17:37:26.685Z"
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
    at: "2026-05-22T17:17:55.907Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Implement approved release pipeline hardening batch; this task is included in the shared batch worktree owned by primary task 202605221715-424TFE."
  -
    type: "verify"
    at: "2026-05-22T17:37:26.685Z"
    author: "CODER"
    state: "ok"
    note: "Verified: release pipeline hardening implemented in shared batch branch; targeted checks, framework bootstrap, docs checks, doctor, and ci:contract passed."
doc_version: 3
doc_updated_at: "2026-05-22T17:37:26.704Z"
doc_updated_by: "CODER"
description: "Exclude only the configured task registry path, not a hard-coded path derived from prDir."
sections:
  Summary: |-
    Restrict PR diffstat task registry exclusions

    Exclude only the configured task registry path, not a hard-coded path derived from prDir.
  Scope: |-
    - In scope: Exclude only the configured task registry path, not a hard-coded path derived from prDir.
    - Out of scope: unrelated refactors not required for "Restrict PR diffstat task registry exclusions".
  Plan: "Fix PR diffstat exclusion to use only the task directory and configured tasks_path; never derive or hide unrelated tasks.json paths from prDir. Verify custom workflow_dir/tasks_path scenarios."
  Verify Steps: |-
    1. Run computePrDiffstat/integrate prepare tests with custom tasks_path.
    2. Confirm unrelated root tasks.json remains visible in diffstat.
    3. Confirm configured .agentplane/tasks.json is excluded when configured.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-22T17:37:26.685Z — VERIFY — ok

    By: CODER

    Note: Verified: release pipeline hardening implemented in shared batch branch; targeted checks, framework bootstrap, docs checks, doctor, and ci:contract passed.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-22T17:17:55.907Z, excerpt_hash=sha256:f28f3c22fcc1c627350242e2cbea9d0abbc4d310d901781abc0d34d99786a7d9

    Details:

    BlueprintSnapshotRef:
    - state: missing
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605221715-424TFE-release-pipeline-hardening/.agentplane/tasks/202605221715-FGG4Z3/blueprint/resolved-snapshot.json
    - old_digest: none
    - current_digest: 06480c42eb410a180b69b2d1157bd5d3e495f7d7eabf7810216de49d97140905
    - route_changed: unknown
    - safe_command: agentplane blueprint snapshot 202605221715-FGG4Z3

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Restrict PR diffstat task registry exclusions

Exclude only the configured task registry path, not a hard-coded path derived from prDir.

## Scope

- In scope: Exclude only the configured task registry path, not a hard-coded path derived from prDir.
- Out of scope: unrelated refactors not required for "Restrict PR diffstat task registry exclusions".

## Plan

Fix PR diffstat exclusion to use only the task directory and configured tasks_path; never derive or hide unrelated tasks.json paths from prDir. Verify custom workflow_dir/tasks_path scenarios.

## Verify Steps

1. Run computePrDiffstat/integrate prepare tests with custom tasks_path.
2. Confirm unrelated root tasks.json remains visible in diffstat.
3. Confirm configured .agentplane/tasks.json is excluded when configured.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-22T17:37:26.685Z — VERIFY — ok

By: CODER

Note: Verified: release pipeline hardening implemented in shared batch branch; targeted checks, framework bootstrap, docs checks, doctor, and ci:contract passed.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-22T17:17:55.907Z, excerpt_hash=sha256:f28f3c22fcc1c627350242e2cbea9d0abbc4d310d901781abc0d34d99786a7d9

Details:

BlueprintSnapshotRef:
- state: missing
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605221715-424TFE-release-pipeline-hardening/.agentplane/tasks/202605221715-FGG4Z3/blueprint/resolved-snapshot.json
- old_digest: none
- current_digest: 06480c42eb410a180b69b2d1157bd5d3e495f7d7eabf7810216de49d97140905
- route_changed: unknown
- safe_command: agentplane blueprint snapshot 202605221715-FGG4Z3

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
