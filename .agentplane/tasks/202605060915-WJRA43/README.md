---
id: "202605060915-WJRA43"
title: "Add blueprint integration doctor checks"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on:
  - "202605060915-6GW4NW"
  - "202605060915-BS04KY"
  - "202605060915-RQFY8Y"
  - "202605060915-ZHFA8V"
tags:
  - "blueprints"
  - "code"
  - "doctor"
  - "v05"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-06T10:41:58.646Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-06T10:43:48.580Z"
  updated_by: "ENGINEER"
  note: "Doctor now surfaces blueprint compatibility report status and warnings consistently with runner gates."
commit: null
comments:
  -
    author: "ENGINEER"
    body: "Start: add blueprint integration doctor checks."
events:
  -
    type: "status"
    at: "2026-05-06T10:41:58.893Z"
    author: "ENGINEER"
    from: "TODO"
    to: "DOING"
    note: "Start: add blueprint integration doctor checks."
  -
    type: "verify"
    at: "2026-05-06T10:43:48.580Z"
    author: "ENGINEER"
    state: "ok"
    note: "Doctor now surfaces blueprint compatibility report status and warnings consistently with runner gates."
doc_version: 3
doc_updated_at: "2026-05-06T10:43:48.585Z"
doc_updated_by: "ENGINEER"
description: "Extend doctor with v0.5 blueprint integration checks for snapshot drift, invalid evidence contracts, runner policy budget violations, and trusted local compatibility failures."
sections:
  Summary: |-
    Add blueprint integration doctor checks
    
    Extend doctor with v0.5 blueprint integration checks for snapshot drift, invalid evidence contracts, runner policy budget violations, and trusted local compatibility failures.
  Scope: |-
    - In scope: Extend doctor with v0.5 blueprint integration checks for snapshot drift, invalid evidence contracts, runner policy budget violations, and trusted local compatibility failures.
    - Out of scope: unrelated refactors not required for "Add blueprint integration doctor checks".
  Plan: "Update doctor blueprint checks to use the project-local compatibility report, surfacing trusted ids and blocking trust/file errors consistently with blueprint report and runner gates."
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-06T10:43:48.580Z — VERIFY — ok
    
    By: ENGINEER
    
    Note: Doctor now surfaces blueprint compatibility report status and warnings consistently with runner gates.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-06T10:41:58.893Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    Details:
    
    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605060915-2V5SZJ-blueprint-integration-surfaces/.agentplane/tasks/202605060915-WJRA43/blueprint/resolved-snapshot.json
    - old_digest: 9d1cc092f790529431e96f88d13ef90a36e54f1a249ddc1183a78c15536fe57c
    - current_digest: 9d1cc092f790529431e96f88d13ef90a36e54f1a249ddc1183a78c15536fe57c
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605060915-WJRA43
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
