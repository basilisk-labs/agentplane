---
id: "202604180845-S30N9W"
title: "Restore formatting drift after delete-only pre-push refactor"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 4
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-18T08:45:42.100Z"
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
    author: "CODER"
    body: "Start: restore Prettier compliance for the NS8Y9G hook files so close-tail pushes are not blocked by unrelated format drift."
events:
  -
    type: "status"
    at: "2026-04-18T08:45:52.382Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: restore Prettier compliance for the NS8Y9G hook files so close-tail pushes are not blocked by unrelated format drift."
doc_version: 3
doc_updated_at: "2026-04-18T08:45:52.389Z"
doc_updated_by: "CODER"
description: "Bring the files changed by NS8Y9G back into Prettier compliance so subsequent task-close pushes are not blocked by unrelated format drift."
sections:
  Summary: |-
    Restore formatting drift after delete-only pre-push refactor
    
    Bring the files changed by NS8Y9G back into Prettier compliance so subsequent task-close pushes are not blocked by unrelated format drift.
  Scope: |-
    - In scope: Bring the files changed by NS8Y9G back into Prettier compliance so subsequent task-close pushes are not blocked by unrelated format drift.
    - Out of scope: unrelated refactors not required for "Restore formatting drift after delete-only pre-push refactor".
  Plan: "1. Reproduce the exact Prettier drift reported by pre-push for the NS8Y9G files. 2. Apply only formatting-safe edits to the touched files without changing behavior. 3. Verify with format:check plus targeted tests, then publish a narrow unblocker PR so the pending NS8Y9G close-tail can push cleanly."
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

Restore formatting drift after delete-only pre-push refactor

Bring the files changed by NS8Y9G back into Prettier compliance so subsequent task-close pushes are not blocked by unrelated format drift.

## Scope

- In scope: Bring the files changed by NS8Y9G back into Prettier compliance so subsequent task-close pushes are not blocked by unrelated format drift.
- Out of scope: unrelated refactors not required for "Restore formatting drift after delete-only pre-push refactor".

## Plan

1. Reproduce the exact Prettier drift reported by pre-push for the NS8Y9G files. 2. Apply only formatting-safe edits to the touched files without changing behavior. 3. Verify with format:check plus targeted tests, then publish a narrow unblocker PR so the pending NS8Y9G close-tail can push cleanly.

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
