---
id: "202605031908-V9335S"
title: "T10: Add ACR row to comparison page"
status: "DONE"
priority: "med"
owner: "DOCS"
revision: 5
origin:
  system: "manual"
depends_on:
  - "202605031908-ZHHV9H"
tags:
  - "compare"
  - "docs"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-03T19:08:43.527Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit:
  hash: "02579b80b963154c24d2a3fbd1e36b697bde978e"
  message: "🚧 E70TF7 task: Launch public-surface ACR task graph [202605031908-E70TF7]"
comments:
  -
    author: "INTEGRATOR"
    body: "Verified: implemented through merged PR #853; release finalization closes the leaf backlog against merge commit 02579b80 after hosted checks passed."
events:
  -
    type: "status"
    at: "2026-05-03T21:03:54.910Z"
    author: "INTEGRATOR"
    from: "TODO"
    to: "DONE"
    note: "Verified: implemented through merged PR #853; release finalization closes the leaf backlog against merge commit 02579b80 after hosted checks passed."
doc_version: 3
doc_updated_at: "2026-05-03T21:03:54.910Z"
doc_updated_by: "INTEGRATOR"
description: "Add Produces an ACR to docs/compare.mdx and mention ACR in the intro."
sections:
  Summary: |-
    T10: Add ACR row to comparison page

    Add Produces an ACR to docs/compare.mdx and mention ACR in the intro.
  Scope: |-
    - In scope: Add Produces an ACR to docs/compare.mdx and mention ACR in the intro.
    - Out of scope: unrelated refactors not required for "T10: Add ACR row to comparison page".
  Plan: "Update the comparison table and intro copy, then grep/render-check for ACR."
  Verify Steps: |-
    1. Review the requested outcome for "T10: Add ACR row to comparison page". Expected: the visible result matches ## Summary and stays inside approved scope.
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

T10: Add ACR row to comparison page

Add Produces an ACR to docs/compare.mdx and mention ACR in the intro.

## Scope

- In scope: Add Produces an ACR to docs/compare.mdx and mention ACR in the intro.
- Out of scope: unrelated refactors not required for "T10: Add ACR row to comparison page".

## Plan

Update the comparison table and intro copy, then grep/render-check for ACR.

## Verify Steps

1. Review the requested outcome for "T10: Add ACR row to comparison page". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
