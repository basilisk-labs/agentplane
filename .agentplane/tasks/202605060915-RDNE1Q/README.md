---
id: "202605060915-RDNE1Q"
title: "Add project-local blueprint compatibility report"
status: "DONE"
priority: "med"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on:
  - "202605060915-BS04KY"
  - "202605060915-S7TK13"
  - "202605060915-SZVSYK"
tags:
  - "blueprints"
  - "cli"
  - "doctor"
  - "v05"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-06T10:34:17.379Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-06T14:57:51.538Z"
  updated_by: "INTEGRATOR"
  note: "Verified: v0.5 blueprint stack is merged into main and the current blueprint snapshot evidence is recorded for closure."
commit:
  hash: "2e72b6ee9fa45c8fe63fafb02a7919ea687c2153"
  message: "Merge pull request #976 from basilisk-labs/task-close/202605060915-0EDRBK/3b4f6276caab"
comments:
  -
    author: "ENGINEER"
    body: "Start: add project-local blueprint compatibility report."
  -
    author: "INTEGRATOR"
    body: "Verified: v0.5 blueprint stack is merged into main; local backend closure recorded after rc1 runtime install and blueprint release gate verification."
events:
  -
    type: "status"
    at: "2026-05-06T10:34:17.593Z"
    author: "ENGINEER"
    from: "TODO"
    to: "DOING"
    note: "Start: add project-local blueprint compatibility report."
  -
    type: "verify"
    at: "2026-05-06T10:35:52.632Z"
    author: "ENGINEER"
    state: "ok"
    note: "Project-local blueprint compatibility report is implemented and covered by focused tests."
  -
    type: "verify"
    at: "2026-05-06T14:57:51.538Z"
    author: "INTEGRATOR"
    state: "ok"
    note: "Verified: v0.5 blueprint stack is merged into main and the current blueprint snapshot evidence is recorded for closure."
  -
    type: "status"
    at: "2026-05-06T14:58:16.694Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: v0.5 blueprint stack is merged into main; local backend closure recorded after rc1 runtime install and blueprint release gate verification."
doc_version: 3
doc_updated_at: "2026-05-06T14:58:16.694Z"
doc_updated_by: "INTEGRATOR"
description: "Add a report that explains whether each trusted project-local blueprint is compatible with resolver rules, recipe extension points, policy budgets, and runner bundle constraints."
sections:
  Summary: |-
    Add project-local blueprint compatibility report

    Add a report that explains whether each trusted project-local blueprint is compatible with resolver rules, recipe extension points, policy budgets, and runner bundle constraints.
  Scope: |-
    - In scope: Add a report that explains whether each trusted project-local blueprint is compatible with resolver rules, recipe extension points, policy budgets, and runner bundle constraints.
    - Out of scope: unrelated refactors not required for "Add project-local blueprint compatibility report".
  Plan: "Add a project-local blueprint compatibility report that summarizes trust config, parsed blueprint files, trusted ids, and blocking errors in one stable data object for future CLI/doctor surfaces."
  Verify Steps: |-
    1. Review the requested outcome for "Add project-local blueprint compatibility report". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-06T10:35:52.632Z — VERIFY — ok

    By: ENGINEER

    Note: Project-local blueprint compatibility report is implemented and covered by focused tests.

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-06T10:34:17.593Z, excerpt_hash=sha256:37879be0d0dd9a797f38d219bc96e9f3b19328f1126e0735fa160c37e8dbb60a

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605060915-S7TK13-blueprint-local-governance/.agentplane/tasks/202605060915-RDNE1Q/blueprint/resolved-snapshot.json
    - old_digest: dd880ea2a9d1ddd8d93ea109782600895401595ef634287203c3ae1a37c9f232
    - current_digest: dd880ea2a9d1ddd8d93ea109782600895401595ef634287203c3ae1a37c9f232
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605060915-RDNE1Q

    ### 2026-05-06T14:57:51.538Z — VERIFY — ok

    By: INTEGRATOR

    Note: Verified: v0.5 blueprint stack is merged into main and the current blueprint snapshot evidence is recorded for closure.

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-06T10:35:52.636Z, excerpt_hash=sha256:37879be0d0dd9a797f38d219bc96e9f3b19328f1126e0735fa160c37e8dbb60a

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Add project-local blueprint compatibility report

Add a report that explains whether each trusted project-local blueprint is compatible with resolver rules, recipe extension points, policy budgets, and runner bundle constraints.

## Scope

- In scope: Add a report that explains whether each trusted project-local blueprint is compatible with resolver rules, recipe extension points, policy budgets, and runner bundle constraints.
- Out of scope: unrelated refactors not required for "Add project-local blueprint compatibility report".

## Plan

Add a project-local blueprint compatibility report that summarizes trust config, parsed blueprint files, trusted ids, and blocking errors in one stable data object for future CLI/doctor surfaces.

## Verify Steps

1. Review the requested outcome for "Add project-local blueprint compatibility report". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-06T10:35:52.632Z — VERIFY — ok

By: ENGINEER

Note: Project-local blueprint compatibility report is implemented and covered by focused tests.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-06T10:34:17.593Z, excerpt_hash=sha256:37879be0d0dd9a797f38d219bc96e9f3b19328f1126e0735fa160c37e8dbb60a

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605060915-S7TK13-blueprint-local-governance/.agentplane/tasks/202605060915-RDNE1Q/blueprint/resolved-snapshot.json
- old_digest: dd880ea2a9d1ddd8d93ea109782600895401595ef634287203c3ae1a37c9f232
- current_digest: dd880ea2a9d1ddd8d93ea109782600895401595ef634287203c3ae1a37c9f232
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605060915-RDNE1Q

### 2026-05-06T14:57:51.538Z — VERIFY — ok

By: INTEGRATOR

Note: Verified: v0.5 blueprint stack is merged into main and the current blueprint snapshot evidence is recorded for closure.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-06T10:35:52.636Z, excerpt_hash=sha256:37879be0d0dd9a797f38d219bc96e9f3b19328f1126e0735fa160c37e8dbb60a

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
