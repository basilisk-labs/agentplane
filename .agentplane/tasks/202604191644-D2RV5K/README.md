---
id: "202604191644-D2RV5K"
title: "Extend significant coverage enforcement to new hotspots"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 4
origin:
  system: "manual"
depends_on: []
tags:
  - "ci"
  - "code"
  - "testing"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-20T16:24:52.662Z"
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
    body: "Start: Extending significant coverage contract to the recently split hotspot modules."
events:
  -
    type: "status"
    at: "2026-04-20T16:24:56.912Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Extending significant coverage contract to the recently split hotspot modules."
doc_version: 3
doc_updated_at: "2026-04-20T16:24:56.922Z"
doc_updated_by: "CODER"
description: "Epic J′. Add the newly split hotspot modules to significant coverage enforcement."
sections:
  Summary: |-
    Extend significant coverage enforcement to new hotspots
    
    Epic J′. Add the newly split hotspot modules to significant coverage enforcement.
  Scope: |-
    - In scope: Epic J′. Add the newly split hotspot modules to significant coverage enforcement.
    - Out of scope: unrelated refactors not required for "Extend significant coverage enforcement to new hotspots".
  Plan: "Extend scripts/check-significant-coverage.mjs from the old guard-only contract to cover the newly decomposed hotspot surfaces. Add source->test entries for init, hosted-merge-sync, finish, and guard split modules; keep the script as a fast existence/contract check rather than a slow coverage run. Verification: agentplane task verify-show; bun run coverage:significant; bun run lint:core; bun run format:check."
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

Extend significant coverage enforcement to new hotspots

Epic J′. Add the newly split hotspot modules to significant coverage enforcement.

## Scope

- In scope: Epic J′. Add the newly split hotspot modules to significant coverage enforcement.
- Out of scope: unrelated refactors not required for "Extend significant coverage enforcement to new hotspots".

## Plan

Extend scripts/check-significant-coverage.mjs from the old guard-only contract to cover the newly decomposed hotspot surfaces. Add source->test entries for init, hosted-merge-sync, finish, and guard split modules; keep the script as a fast existence/contract check rather than a slow coverage run. Verification: agentplane task verify-show; bun run coverage:significant; bun run lint:core; bun run format:check.

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
