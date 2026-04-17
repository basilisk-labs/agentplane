---
id: "202604170644-ETY83P"
title: "Remove bundled recipes from init flow"
result_summary: "Closed as duplicate of 202604170647-7CT2P9."
risk_level: "low"
breaking: false
status: "DONE"
priority: "high"
owner: "CODER"
revision: 4
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "recipes"
  - "workflow"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-17T06:45:59.721Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit: null
comments:
  -
    author: "ORCHESTRATOR"
    body: |-
      Verified: 202604170644-ETY83P is a bookkeeping duplicate of 202604170647-7CT2P9 (Remove bundled recipes from init flow); no code/config changes are expected in this task and closure is recorded as no-op.
      
      Reason: Superseded by executed init-from-cache task.
events:
  -
    type: "status"
    at: "2026-04-17T10:04:47.766Z"
    author: "ORCHESTRATOR"
    from: "TODO"
    to: "DONE"
    note: |-
      Verified: 202604170644-ETY83P is a bookkeeping duplicate of 202604170647-7CT2P9 (Remove bundled recipes from init flow); no code/config changes are expected in this task and closure is recorded as no-op.
      
      Reason: Superseded by executed init-from-cache task.
doc_version: 3
doc_updated_at: "2026-04-17T10:04:47.766Z"
doc_updated_by: "ORCHESTRATOR"
description: "Make init surface only cached recipes and eliminate bundled-recipe selection from the project bootstrap path."
sections:
  Summary: |-
    Remove bundled recipes from init flow
    
    Make init surface only cached recipes and eliminate bundled-recipe selection from the project bootstrap path.
  Scope: |-
    - In scope: Make init surface only cached recipes and eliminate bundled-recipe selection from the project bootstrap path.
    - Out of scope: unrelated refactors not required for "Remove bundled recipes from init flow".
  Plan: "1. Remove bundled recipes selection from init. 2. Make init surface cached recipes only and continue cleanly when cache is empty. 3. Verify init vendors selected cached recipes into the project."
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Remove bundled recipes from init flow

Make init surface only cached recipes and eliminate bundled-recipe selection from the project bootstrap path.

## Scope

- In scope: Make init surface only cached recipes and eliminate bundled-recipe selection from the project bootstrap path.
- Out of scope: unrelated refactors not required for "Remove bundled recipes from init flow".

## Plan

1. Remove bundled recipes selection from init. 2. Make init surface cached recipes only and continue cleanly when cache is empty. 3. Verify init vendors selected cached recipes into the project.

## Verify Steps

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
