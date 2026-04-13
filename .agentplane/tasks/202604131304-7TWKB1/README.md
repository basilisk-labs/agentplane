---
id: "202604131304-7TWKB1"
title: "Publish April 13 release-hardening wave to protected main and close superseded PRs"
status: "DOING"
priority: "high"
owner: "INTEGRATOR"
revision: 4
origin:
  system: "manual"
depends_on: []
tags:
  - "workflow"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-13T13:05:07.729Z"
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
    author: "INTEGRATOR"
    body: "Start: publish the already integrated April 13 release-hardening main wave through one protected-main PR, then close superseded PRs and remove transient release worktrees/branches so the next patch-release starts from an aligned main branch and a clean branch_pr surface."
events:
  -
    type: "status"
    at: "2026-04-13T13:05:28.323Z"
    author: "INTEGRATOR"
    from: "TODO"
    to: "DOING"
    note: "Start: publish the already integrated April 13 release-hardening main wave through one protected-main PR, then close superseded PRs and remove transient release worktrees/branches so the next patch-release starts from an aligned main branch and a clean branch_pr surface."
doc_version: 3
doc_updated_at: "2026-04-13T13:05:28.343Z"
doc_updated_by: "INTEGRATOR"
description: "Publish the already locally integrated April 13 release-hardening main wave through a single protected-main PR, then close superseded task PRs and clean transient release worktrees/branches so the next patch-release starts from a low-friction state."
sections:
  Summary: |-
    Publish April 13 release-hardening wave to protected main and close superseded PRs
    
    Publish the already locally integrated April 13 release-hardening main wave through a single protected-main PR, then close superseded task PRs and clean transient release worktrees/branches so the next patch-release starts from a low-friction state.
  Scope: |-
    - In scope: Publish the already locally integrated April 13 release-hardening main wave through a single protected-main PR, then close superseded task PRs and clean transient release worktrees/branches so the next patch-release starts from a low-friction state.
    - Out of scope: unrelated refactors not required for "Publish April 13 release-hardening wave to protected main and close superseded PRs".
  Plan: "Publish the locally integrated April 13 release-hardening main wave through one protected-main PR, wait for hosted checks, merge it on GitHub, then close superseded PRs (#270/#271), prune transient release branches/worktrees, and verify that origin/main and local main are aligned for the next patch-release."
  Verify Steps: |-
    1. Review the requested outcome for "Publish April 13 release-hardening wave to protected main and close superseded PRs". Expected: the visible result matches ## Summary and stays inside approved scope.
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

Publish April 13 release-hardening wave to protected main and close superseded PRs

Publish the already locally integrated April 13 release-hardening main wave through a single protected-main PR, then close superseded task PRs and clean transient release worktrees/branches so the next patch-release starts from a low-friction state.

## Scope

- In scope: Publish the already locally integrated April 13 release-hardening main wave through a single protected-main PR, then close superseded task PRs and clean transient release worktrees/branches so the next patch-release starts from a low-friction state.
- Out of scope: unrelated refactors not required for "Publish April 13 release-hardening wave to protected main and close superseded PRs".

## Plan

Publish the locally integrated April 13 release-hardening main wave through one protected-main PR, wait for hosted checks, merge it on GitHub, then close superseded PRs (#270/#271), prune transient release branches/worktrees, and verify that origin/main and local main are aligned for the next patch-release.

## Verify Steps

1. Review the requested outcome for "Publish April 13 release-hardening wave to protected main and close superseded PRs". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
