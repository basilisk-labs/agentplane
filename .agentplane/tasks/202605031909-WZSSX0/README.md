---
id: "202605031909-WZSSX0"
title: "T18: Enable Discussions and add README badge"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 4
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
commit: null
comments:
  -
    author: "CODER"
    body: "Start: executing this approved launch backlog atom inside the primary ACR launch branch_pr worktree with scoped verification evidence."
events:
  -
    type: "status"
    at: "2026-05-03T19:30:09.257Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: executing this approved launch backlog atom inside the primary ACR launch branch_pr worktree with scoped verification evidence."
doc_version: 3
doc_updated_at: "2026-05-03T19:30:09.257Z"
doc_updated_by: "CODER"
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
