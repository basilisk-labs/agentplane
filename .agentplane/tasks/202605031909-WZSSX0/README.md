---
id: "202605031909-WZSSX0"
title: "T18: Enable Discussions and add README badge"
status: "DONE"
priority: "med"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "github"
  - "infra"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-03T19:09:07.586Z"
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
    at: "2026-05-03T19:30:09.257Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: executing this approved launch backlog atom inside the primary ACR launch branch_pr worktree with scoped verification evidence."
  -
    type: "status"
    at: "2026-05-03T21:03:54.924Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: implemented through merged PR #853; release finalization closes the leaf backlog against merge commit 02579b80 after hosted checks passed."
doc_version: 3
doc_updated_at: "2026-05-03T21:03:54.924Z"
doc_updated_by: "INTEGRATOR"
description: "Enable GitHub Discussions, pin launch threads, and add a README badge/footer link."
sections:
  Summary: |-
    T18: Enable Discussions and add README badge

    Enable GitHub Discussions, pin launch threads, and add a README badge/footer link.
  Scope: |-
    - In scope: Enable GitHub Discussions, pin launch threads, and add a README badge/footer link.
    - Out of scope: unrelated refactors not required for "T18: Enable Discussions and add README badge".
  Plan: "Use available GitHub access to verify or update Discussions; if settings access is unavailable, add repo-local README links only and mark settings work blocked-external."
  Verify Steps: |-
    1. Review the requested outcome for "T18: Enable Discussions and add README badge". Expected: the visible result matches ## Summary and stays inside approved scope.
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

T18: Enable Discussions and add README badge

Enable GitHub Discussions, pin launch threads, and add a README badge/footer link.

## Scope

- In scope: Enable GitHub Discussions, pin launch threads, and add a README badge/footer link.
- Out of scope: unrelated refactors not required for "T18: Enable Discussions and add README badge".

## Plan

Use available GitHub access to verify or update Discussions; if settings access is unavailable, add repo-local README links only and mark settings work blocked-external.

## Verify Steps

1. Review the requested outcome for "T18: Enable Discussions and add README badge". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
