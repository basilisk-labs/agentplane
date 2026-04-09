---
id: "202604091945-6WQGXP"
title: "Publish April 9 local main wave and close superseded task PRs"
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
  updated_at: "2026-04-09T19:45:59.264Z"
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
    body: "Start: publish the local main closure wave to GitHub and close superseded task PRs so base, origin, and GitHub converge."
events:
  -
    type: "status"
    at: "2026-04-09T19:45:59.492Z"
    author: "INTEGRATOR"
    from: "TODO"
    to: "DOING"
    note: "Start: publish the local main closure wave to GitHub and close superseded task PRs so base, origin, and GitHub converge."
doc_version: 3
doc_updated_at: "2026-04-09T19:45:59.497Z"
doc_updated_by: "INTEGRATOR"
description: "Push the local main wave that closes 2ZX1MQ, PX5WAV, 1ES3RB, and EPMJDB onto GitHub through a protected-main PR, then close superseded task PRs #214 and #220 so local, origin, and GitHub converge again."
sections:
  Summary: |-
    Publish April 9 local main wave and close superseded task PRs
    
    Push the local main wave that closes 2ZX1MQ, PX5WAV, 1ES3RB, and EPMJDB onto GitHub through a protected-main PR, then close superseded task PRs #214 and #220 so local, origin, and GitHub converge again.
  Scope: |-
    - In scope: Push the local main wave that closes 2ZX1MQ, PX5WAV, 1ES3RB, and EPMJDB onto GitHub through a protected-main PR, then close superseded task PRs #214 and #220 so local, origin, and GitHub converge again.
    - Out of scope: unrelated refactors not required for "Publish April 9 local main wave and close superseded task PRs".
  Plan: "1. Publish the current local main wave through a protected-main PR so origin/main and GitHub receive the already-integrated local commits. 2. Merge that PR and refresh local main. 3. Close superseded task PRs #214 and #220, then verify task/project convergence with task list, git status, and open PR state."
  Verify Steps: |-
    <!-- TODO: REPLACE WITH TASK-SPECIFIC ACCEPTANCE STEPS -->
    
    1. <Action>. Expected: <observable result>.
    2. <Action>. Expected: <observable result>.
    3. <Action>. Expected: <observable result>.
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

Publish April 9 local main wave and close superseded task PRs

Push the local main wave that closes 2ZX1MQ, PX5WAV, 1ES3RB, and EPMJDB onto GitHub through a protected-main PR, then close superseded task PRs #214 and #220 so local, origin, and GitHub converge again.

## Scope

- In scope: Push the local main wave that closes 2ZX1MQ, PX5WAV, 1ES3RB, and EPMJDB onto GitHub through a protected-main PR, then close superseded task PRs #214 and #220 so local, origin, and GitHub converge again.
- Out of scope: unrelated refactors not required for "Publish April 9 local main wave and close superseded task PRs".

## Plan

1. Publish the current local main wave through a protected-main PR so origin/main and GitHub receive the already-integrated local commits. 2. Merge that PR and refresh local main. 3. Close superseded task PRs #214 and #220, then verify task/project convergence with task list, git status, and open PR state.

## Verify Steps

<!-- TODO: REPLACE WITH TASK-SPECIFIC ACCEPTANCE STEPS -->

1. <Action>. Expected: <observable result>.
2. <Action>. Expected: <observable result>.
3. <Action>. Expected: <observable result>.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
