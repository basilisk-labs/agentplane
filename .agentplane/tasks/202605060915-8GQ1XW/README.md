---
id: "202605060915-8GQ1XW"
title: "Add v0.5 blueprint release gate"
status: "DONE"
priority: "high"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on:
  - "202605060915-1QCC5X"
  - "202605060915-6BWQ0X"
  - "202605060915-7R5AA9"
  - "202605060915-8S48JS"
tags:
  - "blueprints"
  - "code"
  - "release"
  - "v05"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-06T10:45:47.893Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-06T14:57:39.168Z"
  updated_by: "INTEGRATOR"
  note: "Verified: v0.5 blueprint stack is merged into main and the current blueprint snapshot evidence is recorded for closure."
commit:
  hash: "2e72b6ee9fa45c8fe63fafb02a7919ea687c2153"
  message: "Merge pull request #976 from basilisk-labs/task-close/202605060915-0EDRBK/3b4f6276caab"
comments:
  -
    author: "ENGINEER"
    body: "Start: add v0.5 blueprint release gate coverage for CLI, doctor, and runner artifacts."
  -
    author: "INTEGRATOR"
    body: "Verified: v0.5 blueprint stack is merged into main; local backend closure recorded after rc1 runtime install and blueprint release gate verification."
events:
  -
    type: "status"
    at: "2026-05-06T10:45:53.692Z"
    author: "ENGINEER"
    from: "TODO"
    to: "DOING"
    note: "Start: add v0.5 blueprint release gate coverage for CLI, doctor, and runner artifacts."
  -
    type: "verify"
    at: "2026-05-06T10:48:48.909Z"
    author: "ENGINEER"
    state: "ok"
    note: "v0.5 blueprint release gate is wired into release-check and covered by release script tests."
  -
    type: "verify"
    at: "2026-05-06T14:57:39.168Z"
    author: "INTEGRATOR"
    state: "ok"
    note: "Verified: v0.5 blueprint stack is merged into main and the current blueprint snapshot evidence is recorded for closure."
  -
    type: "status"
    at: "2026-05-06T14:58:16.687Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: v0.5 blueprint stack is merged into main; local backend closure recorded after rc1 runtime install and blueprint release gate verification."
doc_version: 3
doc_updated_at: "2026-05-06T14:58:16.687Z"
doc_updated_by: "INTEGRATOR"
description: "Add release checks that ensure built-in blueprints, trusted project-local config validation, snapshot schema fixtures, runner bundle contract, ACR projection, and docs stay aligned."
sections:
  Summary: |-
    Add v0.5 blueprint release gate

    Add release checks that ensure built-in blueprints, trusted project-local config validation, snapshot schema fixtures, runner bundle contract, ACR projection, and docs stay aligned.
  Scope: |-
    - In scope: Add release checks that ensure built-in blueprints, trusted project-local config validation, snapshot schema fixtures, runner bundle contract, ACR projection, and docs stay aligned.
    - Out of scope: unrelated refactors not required for "Add v0.5 blueprint release gate".
  Plan: "Add a v0.5 blueprint release gate test/contract that verifies blueprint report CLI, doctor blueprint compatibility output, and runner blueprint execution artifacts remain wired before release."
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-06T10:48:48.909Z — VERIFY — ok

    By: ENGINEER

    Note: v0.5 blueprint release gate is wired into release-check and covered by release script tests.

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-06T10:45:53.692Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605060915-2V5SZJ-blueprint-integration-surfaces/.agentplane/tasks/202605060915-8GQ1XW/blueprint/resolved-snapshot.json
    - old_digest: b264c0d6a681c9c765ef2a5c7efc550cfd95da4fd0e0648ce71fb7e48556cb81
    - current_digest: b264c0d6a681c9c765ef2a5c7efc550cfd95da4fd0e0648ce71fb7e48556cb81
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605060915-8GQ1XW

    ### 2026-05-06T14:57:39.168Z — VERIFY — ok

    By: INTEGRATOR

    Note: Verified: v0.5 blueprint stack is merged into main and the current blueprint snapshot evidence is recorded for closure.

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-06T10:48:48.916Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Add v0.5 blueprint release gate

Add release checks that ensure built-in blueprints, trusted project-local config validation, snapshot schema fixtures, runner bundle contract, ACR projection, and docs stay aligned.

## Scope

- In scope: Add release checks that ensure built-in blueprints, trusted project-local config validation, snapshot schema fixtures, runner bundle contract, ACR projection, and docs stay aligned.
- Out of scope: unrelated refactors not required for "Add v0.5 blueprint release gate".

## Plan

Add a v0.5 blueprint release gate test/contract that verifies blueprint report CLI, doctor blueprint compatibility output, and runner blueprint execution artifacts remain wired before release.

## Verify Steps

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-06T10:48:48.909Z — VERIFY — ok

By: ENGINEER

Note: v0.5 blueprint release gate is wired into release-check and covered by release script tests.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-06T10:45:53.692Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605060915-2V5SZJ-blueprint-integration-surfaces/.agentplane/tasks/202605060915-8GQ1XW/blueprint/resolved-snapshot.json
- old_digest: b264c0d6a681c9c765ef2a5c7efc550cfd95da4fd0e0648ce71fb7e48556cb81
- current_digest: b264c0d6a681c9c765ef2a5c7efc550cfd95da4fd0e0648ce71fb7e48556cb81
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605060915-8GQ1XW

### 2026-05-06T14:57:39.168Z — VERIFY — ok

By: INTEGRATOR

Note: Verified: v0.5 blueprint stack is merged into main and the current blueprint snapshot evidence is recorded for closure.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-06T10:48:48.916Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
