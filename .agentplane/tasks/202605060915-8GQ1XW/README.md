---
id: "202605060915-8GQ1XW"
title: "Add v0.5 blueprint release gate"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 5
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
  updated_at: "2026-05-06T10:48:48.909Z"
  updated_by: "ENGINEER"
  note: "v0.5 blueprint release gate is wired into release-check and covered by release script tests."
commit: null
comments:
  -
    author: "ENGINEER"
    body: "Start: add v0.5 blueprint release gate coverage for CLI, doctor, and runner artifacts."
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
doc_version: 3
doc_updated_at: "2026-05-06T10:48:48.916Z"
doc_updated_by: "ENGINEER"
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
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
