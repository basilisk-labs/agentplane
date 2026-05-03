---
id: "202605031908-5E28XJ"
title: "T15: Prepare docs-only 0.4.3 patch publish"
status: "TODO"
priority: "high"
owner: "CODER"
revision: 3
origin:
  system: "manual"
depends_on:
  - "202605031908-1D4BT9"
  - "202605031908-6V1G82"
  - "202605031908-75KN06"
  - "202605031908-85TGHC"
  - "202605031908-TE8H0C"
  - "202605031908-TFYQJ0"
  - "202605031908-Z2FSSG"
  - "202605031908-ZHHV9H"
tags:
  - "package"
  - "release"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-03T19:08:58.810Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit: null
comments: []
events: []
doc_version: 3
doc_updated_at: "2026-05-03T19:08:58.409Z"
doc_updated_by: "PLANNER"
description: "Bump package versions and changelog entries for docs-only 0.4.3 so npm package READMEs can ship ACR copy."
sections:
  Summary: |-
    T15: Prepare docs-only 0.4.3 patch publish

    Bump package versions and changelog entries for docs-only 0.4.3 so npm package READMEs can ship ACR copy.
  Scope: |-
    - In scope: Bump package versions and changelog entries for docs-only 0.4.3 so npm package READMEs can ship ACR copy.
    - Out of scope: unrelated refactors not required for "T15: Prepare docs-only 0.4.3 patch publish".
  Plan: "Prepare the branch_pr release candidate scope for 0.4.3, run release checks, and stop before irreversible npm publication unless explicitly approved and available."
  Verify Steps: |-
    1. Review the requested outcome for "T15: Prepare docs-only 0.4.3 patch publish". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
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

T15: Prepare docs-only 0.4.3 patch publish

Bump package versions and changelog entries for docs-only 0.4.3 so npm package READMEs can ship ACR copy.

## Scope

- In scope: Bump package versions and changelog entries for docs-only 0.4.3 so npm package READMEs can ship ACR copy.
- Out of scope: unrelated refactors not required for "T15: Prepare docs-only 0.4.3 patch publish".

## Plan

Prepare the branch_pr release candidate scope for 0.4.3, run release checks, and stop before irreversible npm publication unless explicitly approved and available.

## Verify Steps

1. Review the requested outcome for "T15: Prepare docs-only 0.4.3 patch publish". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
