---
id: "202605061515-WJWM2W"
title: "Allow prerelease release-version checks"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on: []
tags:
  - "blueprints"
  - "code"
  - "release"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-06T15:16:49.790Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-06T15:25:51.716Z"
  updated_by: "CODER"
  note: "Verified: release-version script preserves prerelease tag suffixes; prerelease unit test and v0.5.0-rc.1 script check pass."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Fix prerelease release-version validation for rc tags as part of the blueprint discoverability batch."
events:
  -
    type: "status"
    at: "2026-05-06T15:17:29.746Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Fix prerelease release-version validation for rc tags as part of the blueprint discoverability batch."
  -
    type: "verify"
    at: "2026-05-06T15:25:51.716Z"
    author: "CODER"
    state: "ok"
    note: "Verified: release-version script preserves prerelease tag suffixes; prerelease unit test and v0.5.0-rc.1 script check pass."
doc_version: 3
doc_updated_at: "2026-05-06T15:25:51.731Z"
doc_updated_by: "CODER"
description: "Make release-version validation handle prerelease tags such as v0.5.0-rc.1 consistently with release parity checks."
sections:
  Summary: |-
    Allow prerelease release-version checks
    
    Make release-version validation handle prerelease tags such as v0.5.0-rc.1 consistently with release parity checks.
  Scope: |-
    - In scope: Make release-version validation handle prerelease tags such as v0.5.0-rc.1 consistently with release parity checks.
    - Out of scope: unrelated refactors not required for "Allow prerelease release-version checks".
  Plan: "Fix prerelease release-version validation so v0.5.0-rc.1 resolves to required version 0.5.0-rc.1 instead of 0.5.0. Scope: script parsing and focused tests only; do not change release apply semantics unless required by the parser contract. Verification: release-version focused tests, check-release-version --tag v0.5.0-rc.1, release parity, doctor, typecheck."
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-06T15:25:51.716Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified: release-version script preserves prerelease tag suffixes; prerelease unit test and v0.5.0-rc.1 script check pass.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-06T15:17:29.746Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    Details:
    
    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605061515-2W42MM-blueprint-discoverability/.agentplane/tasks/202605061515-WJWM2W/blueprint/resolved-snapshot.json
    - old_digest: 64f1f44bfdc2b38eaa117c3b8e466c4cf953caa5c485486dbeec247a961d36bb
    - current_digest: 64f1f44bfdc2b38eaa117c3b8e466c4cf953caa5c485486dbeec247a961d36bb
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605061515-WJWM2W
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
