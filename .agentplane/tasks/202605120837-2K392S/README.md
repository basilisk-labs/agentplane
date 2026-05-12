---
id: "202605120837-2K392S"
title: "Defer init base branch creation until apply"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 1
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-12T08:38:03.095Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Fix init so interactive base-branch creation is deferred until confirmed apply, with regression coverage for cancel-before-apply behavior."
events:
  -
    type: "status"
    at: "2026-05-12T08:38:30.968Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Fix init so interactive base-branch creation is deferred until confirmed apply, with regression coverage for cancel-before-apply behavior."
doc_version: 3
doc_updated_at: "2026-05-12T08:38:30.968Z"
doc_updated_by: "CODER"
description: "Fix init so interactive base-branch creation is planned before confirmation and only performs git mutations during apply."
sections:
  Summary: |-
    Defer init base branch creation until apply
    
    Fix init so interactive base-branch creation is planned before confirmation and only performs git mutations during apply.
  Scope: |-
    - In scope: Fix init so interactive base-branch creation is planned before confirmation and only performs git mutations during apply.
    - Out of scope: unrelated refactors not required for "Defer init base branch creation until apply".
  Plan: "Fix init base-branch planning boundary. 1. Move interactive base-branch mutation choice out of pre-confirm planning. 2. Preserve dry-run and non-interactive base-branch resolution as read-only planning. 3. Apply branch creation only after init apply confirmation. 4. Add a regression test proving cancellation before apply leaves no created branch. 5. Run focused init tests, exact-file lint, type/docs policy checks as applicable."
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

Defer init base branch creation until apply

Fix init so interactive base-branch creation is planned before confirmation and only performs git mutations during apply.

## Scope

- In scope: Fix init so interactive base-branch creation is planned before confirmation and only performs git mutations during apply.
- Out of scope: unrelated refactors not required for "Defer init base branch creation until apply".

## Plan

Fix init base-branch planning boundary. 1. Move interactive base-branch mutation choice out of pre-confirm planning. 2. Preserve dry-run and non-interactive base-branch resolution as read-only planning. 3. Apply branch creation only after init apply confirmation. 4. Add a regression test proving cancellation before apply leaves no created branch. 5. Run focused init tests, exact-file lint, type/docs policy checks as applicable.

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
