---
id: "202604151818-5M1MXG"
title: "Select canonical release commit for workflow_dispatch publish"
result_summary: "Merged via PR #329."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 4
origin:
  system: "manual"
depends_on: []
tags:
  - "release"
verify: []
plan_approval:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit:
  hash: "07c073f8b635af719873c77d09565c2d6ec04290"
  message: "release: Select canonical release commit for workflow_dispatch publish (5M1MXG) (#329)"
comments:
  -
    author: "CODER"
    body: "Start: replacing workflow_dispatch no-sha publish target selection with a canonical release-commit resolver so manual publish recovers the exact unpublished release commit instead of later closure or recovery commits on main."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #329 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "status"
    at: "2026-04-15T18:20:03.346Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: replacing workflow_dispatch no-sha publish target selection with a canonical release-commit resolver so manual publish recovers the exact unpublished release commit instead of later closure or recovery commits on main."
  -
    type: "status"
    at: "2026-04-15T18:34:01.081Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #329 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-04-15T18:34:01.086Z"
doc_updated_by: "INTEGRATOR"
description: "Make publish workflow_dispatch without explicit --sha resolve the exact release-preparation commit for the target unpublished version instead of later closure or recovery commits on first-parent history."
sections:
  Summary: |-
    Select canonical release commit for workflow_dispatch publish
    
    Make publish workflow_dispatch without explicit --sha resolve the exact release-preparation commit for the target unpublished version instead of later closure or recovery commits on first-parent history.
  Scope: |-
    - In scope: Make publish workflow_dispatch without explicit --sha resolve the exact release-preparation commit for the target unpublished version instead of later closure or recovery commits on first-parent history.
    - Out of scope: unrelated refactors not required for "Select canonical release commit for workflow_dispatch publish".
  Plan: |-
    1. Add a canonical release-sha resolver for workflow_dispatch publish that picks the commit introducing the current unpublished release version on first-parent history rather than later closure/recovery commits. -> verify: targeted unit tests cover version-introduction selection and no-sha publish contract.
    2. Wire publish workflow_dispatch no-sha path to the canonical resolver while keeping explicit --sha behavior unchanged. -> verify: publish workflow contract reflects the new routing.
    3. Merge through branch_pr, rerun publish.yml, and confirm v0.3.12 exists as a Git tag and on npm for both packages. -> verify: remote tag and npm versions both report 0.3.12.
  Verify Steps: |-
    1. Review the requested outcome for "Select canonical release commit for workflow_dispatch publish". Expected: the visible result matches ## Summary and stays inside approved scope.
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

Select canonical release commit for workflow_dispatch publish

Make publish workflow_dispatch without explicit --sha resolve the exact release-preparation commit for the target unpublished version instead of later closure or recovery commits on first-parent history.

## Scope

- In scope: Make publish workflow_dispatch without explicit --sha resolve the exact release-preparation commit for the target unpublished version instead of later closure or recovery commits on first-parent history.
- Out of scope: unrelated refactors not required for "Select canonical release commit for workflow_dispatch publish".

## Plan

1. Add a canonical release-sha resolver for workflow_dispatch publish that picks the commit introducing the current unpublished release version on first-parent history rather than later closure/recovery commits. -> verify: targeted unit tests cover version-introduction selection and no-sha publish contract.
2. Wire publish workflow_dispatch no-sha path to the canonical resolver while keeping explicit --sha behavior unchanged. -> verify: publish workflow contract reflects the new routing.
3. Merge through branch_pr, rerun publish.yml, and confirm v0.3.12 exists as a Git tag and on npm for both packages. -> verify: remote tag and npm versions both report 0.3.12.

## Verify Steps

1. Review the requested outcome for "Select canonical release commit for workflow_dispatch publish". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
