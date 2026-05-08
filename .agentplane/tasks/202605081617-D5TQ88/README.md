---
id: "202605081617-D5TQ88"
title: "Clean up v0.5 release code debt"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 1
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "refactor"
  - "release"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-08T16:17:59.908Z"
  updated_by: "ORCHESTRATOR"
  note: "Approved after user requested implementation of all release-readiness cleanup items from the main-branch analysis."
verification:
  state: "ok"
  updated_at: "2026-05-08T16:26:40.171Z"
  updated_by: "CODER"
  note: "Implemented scoped v0.5 cleanup: recipe build warning removed, task-doc version normalization consolidated through core, testkit internal imports routed through the testkit internal facade, and knip baseline reduced by one stale export. Checks passed: agentplane build, focused recipe/task/testkit tests, release:parity, diff --check, knip:check, hotspots:check, test:fast, release:check."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Implement scoped v0.5 release cleanup in the dedicated branch_pr worktree, preserving runtime behavior while removing the build warning and consolidating duplicated helper surfaces."
events:
  -
    type: "status"
    at: "2026-05-08T16:19:20.516Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Implement scoped v0.5 release cleanup in the dedicated branch_pr worktree, preserving runtime behavior while removing the build warning and consolidating duplicated helper surfaces."
  -
    type: "verify"
    at: "2026-05-08T16:26:40.171Z"
    author: "CODER"
    state: "ok"
    note: "Implemented scoped v0.5 cleanup: recipe build warning removed, task-doc version normalization consolidated through core, testkit internal imports routed through the testkit internal facade, and knip baseline reduced by one stale export. Checks passed: agentplane build, focused recipe/task/testkit tests, release:parity, diff --check, knip:check, hotspots:check, test:fast, release:check."
doc_version: 3
doc_updated_at: "2026-05-08T16:26:40.177Z"
doc_updated_by: "CODER"
description: "Address release-readiness cleanup found in main: unused bundle import warning, duplicated task document helpers, and testkit internal surface coupling without changing runtime behavior."
sections:
  Summary: |-
    Clean up v0.5 release code debt
    
    Address release-readiness cleanup found in main: unused bundle import warning, duplicated task document helpers, and testkit internal surface coupling without changing runtime behavior.
  Scope: |-
    - In scope: Address release-readiness cleanup found in main: unused bundle import warning, duplicated task document helpers, and testkit internal surface coupling without changing runtime behavior.
    - Out of scope: unrelated refactors not required for "Clean up v0.5 release code debt".
  Plan: |-
    1. Remove release build warning from recipe constants by replacing broad re-export with explicit local constants.
    2. Consolidate task document helper usage so command code reuses core task-doc version normalization and shared constants where possible.
    3. Reduce testkit coupling by exposing needed internal task helpers through a deliberate testkit surface instead of ad hoc internal imports where practical.
    4. Verify with focused tests, typecheck, knip, release parity, and release check.
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-08T16:26:40.171Z — VERIFY — ok
    
    By: CODER
    
    Note: Implemented scoped v0.5 cleanup: recipe build warning removed, task-doc version normalization consolidated through core, testkit internal imports routed through the testkit internal facade, and knip baseline reduced by one stale export. Checks passed: agentplane build, focused recipe/task/testkit tests, release:parity, diff --check, knip:check, hotspots:check, test:fast, release:check.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-08T16:19:20.522Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    Details:
    
    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605081617-D5TQ88-v05-release-cleanup/.agentplane/tasks/202605081617-D5TQ88/blueprint/resolved-snapshot.json
    - old_digest: bb5b7f1dc26c1fa2adeb68fe15aeef0489245ae6d18f1ae0af2fc0fc81e4dd43
    - current_digest: bb5b7f1dc26c1fa2adeb68fe15aeef0489245ae6d18f1ae0af2fc0fc81e4dd43
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605081617-D5TQ88
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: release:check passed after the recipe import cleanup with no tsup unused-import warning for @agentplaneorg/recipes.
      Impact: The branch is ready for branch_pr publication; no runtime behavior change intended.
      Resolution: Commit the scoped code/test/baseline changes and open the task PR from the worktree branch.
id_source: "generated"
---
