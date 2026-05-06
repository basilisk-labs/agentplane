---
id: "202605060915-BS04KY"
title: "Validate runner policy module budget"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on:
  - "202605060915-RKCVW1"
tags:
  - "blueprints"
  - "code"
  - "policy"
  - "runner"
  - "v05"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-06T10:07:11.535Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-06T10:08:26.767Z"
  updated_by: "CODER"
  note: "Verified: runner prepare has an explicit blueprint policy module budget guard with focused coverage."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Implementing runner-side blueprint policy module budget validation; dependencies N3MJJ1 and RKCVW1 are verified and committed in this stacked branch."
events:
  -
    type: "status"
    at: "2026-05-06T10:07:11.748Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Implementing runner-side blueprint policy module budget validation; dependencies N3MJJ1 and RKCVW1 are verified and committed in this stacked branch."
  -
    type: "verify"
    at: "2026-05-06T10:08:26.767Z"
    author: "CODER"
    state: "ok"
    note: "Verified: runner prepare has an explicit blueprint policy module budget guard with focused coverage."
doc_version: 3
doc_updated_at: "2026-05-06T10:08:26.771Z"
doc_updated_by: "CODER"
description: "Validate that runner bundles do not include policy modules outside the resolved blueprint and workflow route budget."
sections:
  Summary: |-
    Validate runner policy module budget
    
    Validate that runner bundles do not include policy modules outside the resolved blueprint and workflow route budget.
  Scope: |-
    - In scope: Validate that runner bundles do not include policy modules outside the resolved blueprint and workflow route budget.
    - Out of scope: unrelated refactors not required for "Validate runner policy module budget".
  Plan: "Add an explicit runner-side policy module budget guard. Validate the materialized bundle blueprint policyModules and policy-module context manifest entries against contextBudget before adapter preparation, with focused tests for over-budget bundles."
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-06T10:08:26.767Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified: runner prepare has an explicit blueprint policy module budget guard with focused coverage.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-06T10:07:11.748Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    Details:
    
    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605060915-N3MJJ1-blueprint-runner-context/.agentplane/tasks/202605060915-BS04KY/blueprint/resolved-snapshot.json
    - old_digest: 0fa93b005f5818b1295e5e0574a4876dc69d9495d01baffbce1a78ec1755c1e9
    - current_digest: 0fa93b005f5818b1295e5e0574a4876dc69d9495d01baffbce1a78ec1755c1e9
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605060915-BS04KY
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Command: bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/runner/usecases/task-run-blueprint.test.ts packages/agentplane/src/runner/usecases/task-run-lifecycle.test.ts; Result: pass; Evidence: 7 tests passed in the combined run and focused guard test passed after formatting. Command: bun run typecheck; Result: pass. Command: bunx prettier --check touched runner guard files; Result: pass. Command: bunx eslint touched runner guard files; Result: pass. Command: git diff --check; Result: pass.
      Impact: Runner preparation now fails before adapter invocation if materialized blueprint context exceeds maxPolicyModules.
      Resolution: Added assertRunnerBlueprintPolicyModuleBudget and coverage for over-budget bundles.
id_source: "generated"
---
