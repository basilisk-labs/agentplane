---
id: "202605221715-FGG4Z3"
title: "Restrict PR diffstat task registry exclusions"
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
  - "workflow"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-22T17:16:51.957Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-22T18:13:20.630Z"
  updated_by: "EVALUATOR"
  note: "EVALUATOR quality gate passed after batch merge: blueprint snapshot recorded, PR #4022 implemented the included task, PR #4023 closed the primary task, and hosted checks were green."
  attempts: 0
quality_review:
  state: "pass"
  updated_at: "2026-05-22T18:13:20.630Z"
  updated_by: "EVALUATOR"
  note: "EVALUATOR quality gate passed after batch merge: blueprint snapshot recorded, PR #4022 implemented the included task, PR #4023 closed the primary task, and hosted checks were green."
  evaluated_sha: "ff82cb92e846c51297beb1a491aed29deb49c079"
  blueprint_digest: "06480c42eb410a180b69b2d1157bd5d3e495f7d7eabf7810216de49d97140905"
  evidence_refs:
    - ".agentplane/tasks/202605221715-FGG4Z3/README.md"
    - "/Users/densmirnov/Github/agentplane/.agentplane/tasks/202605221715-FGG4Z3/blueprint/resolved-snapshot.json"
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
  -
    type: "verify"
    at: "2026-05-22T18:13:20.630Z"
    author: "EVALUATOR"
    state: "ok"
    note: "EVALUATOR quality gate passed after batch merge: blueprint snapshot recorded, PR #4022 implemented the included task, PR #4023 closed the primary task, and hosted checks were green."
  -
    type: "status"
    at: "2026-05-22T18:13:21.260Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: included batch task was implemented by PR #4022, verified by local ci:contract and hosted GitHub checks, and reconciled after close-tail PR #4023."
doc_version: 3
doc_updated_at: "2026-05-22T18:13:21.260Z"
doc_updated_by: "INTEGRATOR"
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

    ### 2026-05-22T18:13:20.630Z — VERIFY — ok

    By: EVALUATOR

    Note: EVALUATOR quality gate passed after batch merge: blueprint snapshot recorded, PR #4022 implemented the included task, PR #4023 closed the primary task, and hosted checks were green.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-22T17:37:26.704Z, excerpt_hash=sha256:f28f3c22fcc1c627350242e2cbea9d0abbc4d310d901781abc0d34d99786a7d9

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tasks/202605221715-FGG4Z3/blueprint/resolved-snapshot.json
    - old_digest: 06480c42eb410a180b69b2d1157bd5d3e495f7d7eabf7810216de49d97140905
    - current_digest: 06480c42eb410a180b69b2d1157bd5d3e495f7d7eabf7810216de49d97140905
    - route_changed: no
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

### 2026-05-22T18:13:20.630Z — VERIFY — ok

By: EVALUATOR

Note: EVALUATOR quality gate passed after batch merge: blueprint snapshot recorded, PR #4022 implemented the included task, PR #4023 closed the primary task, and hosted checks were green.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-22T17:37:26.704Z, excerpt_hash=sha256:f28f3c22fcc1c627350242e2cbea9d0abbc4d310d901781abc0d34d99786a7d9

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tasks/202605221715-FGG4Z3/blueprint/resolved-snapshot.json
- old_digest: 06480c42eb410a180b69b2d1157bd5d3e495f7d7eabf7810216de49d97140905
- current_digest: 06480c42eb410a180b69b2d1157bd5d3e495f7d7eabf7810216de49d97140905
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605221715-FGG4Z3

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
