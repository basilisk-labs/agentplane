---
id: "202604092006-5HP443"
title: "Use gh auth-aware env for pr open remote creation"
result_summary: "Merged via PR #226. agentplane pr open now uses ghEnv for remote lookup/create, so dotenv-loaded GitHub tokens no longer shadow a valid gh keyring session."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on: []
tags:
  - "github"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-09T20:35:12.896Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-09T20:46:20.207Z"
  updated_by: "INTEGRATOR"
  note: "Verified PR #226: ghEnv now reaches pr open gh-api calls, dotenv-injected tokens are stripped in the remote-creation path, and regression coverage locks the auth-aware behavior."
commit:
  hash: "4fa818d28e54e4449906ae51b4894c4033581a3c"
  message: "github: Use gh auth-aware env for pr open remote creation (5HP443) (#226)"
comments:
  -
    author: "CODER"
    body: "Start: switch pr open remote creation to the auth-safe gh environment path, add regression coverage, and validate the real task-branch remote PR flow."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #226 merged on GitHub after green hosted checks; local integrate remains blocked by the stale-dist squash-commit defect already tracked separately."
events:
  -
    type: "status"
    at: "2026-04-09T20:35:30.914Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: switch pr open remote creation to the auth-safe gh environment path, add regression coverage, and validate the real task-branch remote PR flow."
  -
    type: "verify"
    at: "2026-04-09T20:46:20.207Z"
    author: "INTEGRATOR"
    state: "ok"
    note: "Verified PR #226: ghEnv now reaches pr open gh-api calls, dotenv-injected tokens are stripped in the remote-creation path, and regression coverage locks the auth-aware behavior."
  -
    type: "status"
    at: "2026-04-09T20:46:30.873Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #226 merged on GitHub after green hosted checks; local integrate remains blocked by the stale-dist squash-commit defect already tracked separately."
doc_version: 3
doc_updated_at: "2026-04-09T20:46:30.873Z"
doc_updated_by: "INTEGRATOR"
description: "Fix pr open remote GitHub creation so it uses the same auth-safe gh environment path as hosted merge sync and does not degrade to local-only staging when gh is already logged in."
sections:
  Summary: |-
    Use gh auth-aware env for pr open remote creation
    
    Fix pr open remote GitHub creation so it uses the same auth-safe gh environment path as hosted merge sync and does not degrade to local-only staging when gh is already logged in.
  Scope: |-
    - In scope: Fix pr open remote GitHub creation so it uses the same auth-safe gh environment path as hosted merge sync and does not degrade to local-only staging when gh is already logged in.
    - Out of scope: unrelated refactors not required for "Use gh auth-aware env for pr open remote creation".
  Plan: "1. Switch pr open remote GitHub creation from gitEnv() to the same gh auth-aware environment helper used by hosted merge sync. 2. Add regression coverage for successful remote PR creation and preserved staged-only fallback behavior. 3. Verify the fix with targeted tests plus a live task-branch pr open."
  Verify Steps: |-
    1. Reproduce the pr open remote-creation path with healthy gh auth and no manual GH_TOKEN export. Expected: `agentplane pr open` creates or links the remote PR instead of degrading to local-only staged artifacts.
    2. Run targeted pr-open and gh-env tests. Expected: the auth-safe gh environment is used for remote PR creation while genuine auth failures still stay on the local-only fallback path.
    3. Validate the real workflow on a task branch. Expected: a live `agentplane pr open` for this task creates the GitHub PR directly when gh auth is valid.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-09T20:46:20.207Z — VERIFY — ok
    
    By: INTEGRATOR
    
    Note: Verified PR #226: ghEnv now reaches pr open gh-api calls, dotenv-injected tokens are stripped in the remote-creation path, and regression coverage locks the auth-aware behavior.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-09T20:35:30.920Z, excerpt_hash=sha256:f42bfc814ad89afa5c7d41cd7799122dded2c4eab8eb96f8d90b769a2d7fd0ad
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Use gh auth-aware env for pr open remote creation

Fix pr open remote GitHub creation so it uses the same auth-safe gh environment path as hosted merge sync and does not degrade to local-only staging when gh is already logged in.

## Scope

- In scope: Fix pr open remote GitHub creation so it uses the same auth-safe gh environment path as hosted merge sync and does not degrade to local-only staging when gh is already logged in.
- Out of scope: unrelated refactors not required for "Use gh auth-aware env for pr open remote creation".

## Plan

1. Switch pr open remote GitHub creation from gitEnv() to the same gh auth-aware environment helper used by hosted merge sync. 2. Add regression coverage for successful remote PR creation and preserved staged-only fallback behavior. 3. Verify the fix with targeted tests plus a live task-branch pr open.

## Verify Steps

1. Reproduce the pr open remote-creation path with healthy gh auth and no manual GH_TOKEN export. Expected: `agentplane pr open` creates or links the remote PR instead of degrading to local-only staged artifacts.
2. Run targeted pr-open and gh-env tests. Expected: the auth-safe gh environment is used for remote PR creation while genuine auth failures still stay on the local-only fallback path.
3. Validate the real workflow on a task branch. Expected: a live `agentplane pr open` for this task creates the GitHub PR directly when gh auth is valid.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-09T20:46:20.207Z — VERIFY — ok

By: INTEGRATOR

Note: Verified PR #226: ghEnv now reaches pr open gh-api calls, dotenv-injected tokens are stripped in the remote-creation path, and regression coverage locks the auth-aware behavior.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-09T20:35:30.920Z, excerpt_hash=sha256:f42bfc814ad89afa5c7d41cd7799122dded2c4eab8eb96f8d90b769a2d7fd0ad

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
