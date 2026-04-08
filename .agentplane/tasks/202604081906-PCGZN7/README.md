---
id: "202604081906-PCGZN7"
title: "Sync integrated main wave and close superseded task PRs"
status: "DOING"
priority: "high"
owner: "INTEGRATOR"
revision: 4
origin:
  system: "manual"
depends_on: []
tags:
  - "github"
  - "tasks"
  - "workflow"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-08T19:06:21.752Z"
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
    body: "Start: publish the already integrated main wave through a protected-main sync PR, then close superseded task PRs and prune lifecycle tails so local/origin/GitHub converge again."
events:
  -
    type: "status"
    at: "2026-04-08T19:06:22.228Z"
    author: "INTEGRATOR"
    from: "TODO"
    to: "DOING"
    note: "Start: publish the already integrated main wave through a protected-main sync PR, then close superseded task PRs and prune lifecycle tails so local/origin/GitHub converge again."
doc_version: 3
doc_updated_at: "2026-04-08T19:06:22.240Z"
doc_updated_by: "INTEGRATOR"
description: "Publish the local main integrate wave for XYTDYA, TQKZ66, and DCDXVB to protected origin/main, then close the superseded task PRs and delete their remote task branches so local/origin/GitHub converge again."
sections:
  Summary: |-
    Sync integrated main wave and close superseded task PRs
    
    Publish the local main integrate wave for XYTDYA, TQKZ66, and DCDXVB to protected origin/main, then close the superseded task PRs and delete their remote task branches so local/origin/GitHub converge again.
  Scope: |-
    - In scope: Publish the local main integrate wave for XYTDYA, TQKZ66, and DCDXVB to protected origin/main, then close the superseded task PRs and delete their remote task branches so local/origin/GitHub converge again.
    - Out of scope: unrelated refactors not required for "Sync integrated main wave and close superseded task PRs".
  Plan: "1. Publish the local main branch state that already includes XYTDYA, TQKZ66, and DCDXVB integration/close commits through a protected-main sync PR. 2. Merge that sync PR and pull origin/main until local/origin converge again. 3. Close superseded task PRs #153, #154, and #155 using task artifacts and delete their remote task branches. 4. Remove stale local task-close/task worktree tails from this wave and verify GitHub/local task state convergence."
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

Sync integrated main wave and close superseded task PRs

Publish the local main integrate wave for XYTDYA, TQKZ66, and DCDXVB to protected origin/main, then close the superseded task PRs and delete their remote task branches so local/origin/GitHub converge again.

## Scope

- In scope: Publish the local main integrate wave for XYTDYA, TQKZ66, and DCDXVB to protected origin/main, then close the superseded task PRs and delete their remote task branches so local/origin/GitHub converge again.
- Out of scope: unrelated refactors not required for "Sync integrated main wave and close superseded task PRs".

## Plan

1. Publish the local main branch state that already includes XYTDYA, TQKZ66, and DCDXVB integration/close commits through a protected-main sync PR. 2. Merge that sync PR and pull origin/main until local/origin converge again. 3. Close superseded task PRs #153, #154, and #155 using task artifacts and delete their remote task branches. 4. Remove stale local task-close/task worktree tails from this wave and verify GitHub/local task state convergence.

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
