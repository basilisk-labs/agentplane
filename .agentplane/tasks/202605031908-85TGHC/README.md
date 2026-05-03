---
id: "202605031908-85TGHC"
title: "T04: Fix homepage hero title regression"
status: "DONE"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "frontend"
  - "website"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-03T19:08:21.892Z"
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
    author: "CODER"
    body: "Start: executing this approved launch backlog atom inside the primary ACR launch branch_pr worktree with scoped verification evidence."
  -
    author: "INTEGRATOR"
    body: "Verified: implemented through merged PR #853; release finalization closes the leaf backlog against merge commit 02579b80 after hosted checks passed."
events:
  -
    type: "status"
    at: "2026-05-03T19:30:07.042Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: executing this approved launch backlog atom inside the primary ACR launch branch_pr worktree with scoped verification evidence."
  -
    type: "status"
    at: "2026-05-03T21:03:54.905Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: implemented through merged PR #853; release finalization closes the leaf backlog against merge commit 02579b80 after hosted checks passed."
doc_version: 3
doc_updated_at: "2026-05-03T21:03:54.905Z"
doc_updated_by: "INTEGRATOR"
description: "Restore the homepage H1 categorical claim from EDITORIAL canonical messaging."
sections:
  Summary: |-
    T04: Fix homepage hero title regression

    Restore the homepage H1 categorical claim from EDITORIAL canonical messaging.
  Scope: |-
    - In scope: Restore the homepage H1 categorical claim from EDITORIAL canonical messaging.
    - Out of scope: unrelated refactors not required for "T04: Fix homepage hero title regression".
  Plan: "Update website homepage content so hero.title reads The audit layer for coding agents., then verify rendered/source H1 and site checks."
  Verify Steps: |-
    1. Review the requested outcome for "T04: Fix homepage hero title regression". Expected: the visible result matches ## Summary and stays inside approved scope.
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

T04: Fix homepage hero title regression

Restore the homepage H1 categorical claim from EDITORIAL canonical messaging.

## Scope

- In scope: Restore the homepage H1 categorical claim from EDITORIAL canonical messaging.
- Out of scope: unrelated refactors not required for "T04: Fix homepage hero title regression".

## Plan

Update website homepage content so hero.title reads The audit layer for coding agents., then verify rendered/source H1 and site checks.

## Verify Steps

1. Review the requested outcome for "T04: Fix homepage hero title regression". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
