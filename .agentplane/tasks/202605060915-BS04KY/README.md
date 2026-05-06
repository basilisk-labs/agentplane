---
id: "202605060915-BS04KY"
title: "Validate runner policy module budget"
status: "DONE"
priority: "high"
owner: "CODER"
revision: 7
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
  updated_at: "2026-05-06T14:57:44.035Z"
  updated_by: "INTEGRATOR"
  note: "Verified: v0.5 blueprint stack is merged into main and the current blueprint snapshot evidence is recorded for closure."
commit:
  hash: "2e72b6ee9fa45c8fe63fafb02a7919ea687c2153"
  message: "Merge pull request #976 from basilisk-labs/task-close/202605060915-0EDRBK/3b4f6276caab"
comments:
  -
    author: "CODER"
    body: "Start: Implementing runner-side blueprint policy module budget validation; dependencies N3MJJ1 and RKCVW1 are verified and committed in this stacked branch."
  -
    author: "INTEGRATOR"
    body: "Verified: v0.5 blueprint stack is merged into main; local backend closure recorded after rc1 runtime install and blueprint release gate verification."
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
  -
    type: "verify"
    at: "2026-05-06T14:57:44.035Z"
    author: "INTEGRATOR"
    state: "ok"
    note: "Verified: v0.5 blueprint stack is merged into main and the current blueprint snapshot evidence is recorded for closure."
  -
    type: "status"
    at: "2026-05-06T14:58:16.690Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: v0.5 blueprint stack is merged into main; local backend closure recorded after rc1 runtime install and blueprint release gate verification."
doc_version: 3
doc_updated_at: "2026-05-06T14:58:16.690Z"
doc_updated_by: "INTEGRATOR"
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

    ### 2026-05-06T14:57:44.035Z — VERIFY — ok

    By: INTEGRATOR

    Note: Verified: v0.5 blueprint stack is merged into main and the current blueprint snapshot evidence is recorded for closure.

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-06T10:08:26.771Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

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
## Summary

Validate runner policy module budget

Validate that runner bundles do not include policy modules outside the resolved blueprint and workflow route budget.

## Scope

- In scope: Validate that runner bundles do not include policy modules outside the resolved blueprint and workflow route budget.
- Out of scope: unrelated refactors not required for "Validate runner policy module budget".

## Plan

Add an explicit runner-side policy module budget guard. Validate the materialized bundle blueprint policyModules and policy-module context manifest entries against contextBudget before adapter preparation, with focused tests for over-budget bundles.

## Verify Steps

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

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

### 2026-05-06T14:57:44.035Z — VERIFY — ok

By: INTEGRATOR

Note: Verified: v0.5 blueprint stack is merged into main and the current blueprint snapshot evidence is recorded for closure.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-06T10:08:26.771Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: Command: bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/runner/usecases/task-run-blueprint.test.ts packages/agentplane/src/runner/usecases/task-run-lifecycle.test.ts; Result: pass; Evidence: 7 tests passed in the combined run and focused guard test passed after formatting. Command: bun run typecheck; Result: pass. Command: bunx prettier --check touched runner guard files; Result: pass. Command: bunx eslint touched runner guard files; Result: pass. Command: git diff --check; Result: pass.
  Impact: Runner preparation now fails before adapter invocation if materialized blueprint context exceeds maxPolicyModules.
  Resolution: Added assertRunnerBlueprintPolicyModuleBudget and coverage for over-budget bundles.
