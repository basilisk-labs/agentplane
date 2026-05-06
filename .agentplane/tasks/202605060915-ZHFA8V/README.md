---
id: "202605060915-ZHFA8V"
title: "Validate required blueprint evidence before finish"
status: "DONE"
priority: "high"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on:
  - "202605060915-D6SFRB"
tags:
  - "blueprints"
  - "code"
  - "evidence"
  - "v05"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-06T09:52:41.339Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-06T14:58:06.104Z"
  updated_by: "INTEGRATOR"
  note: "Verified: v0.5 blueprint stack is merged into main and the current blueprint snapshot evidence is recorded for closure."
commit:
  hash: "2e72b6ee9fa45c8fe63fafb02a7919ea687c2153"
  message: "Merge pull request #976 from basilisk-labs/task-close/202605060915-0EDRBK/3b4f6276caab"
comments:
  -
    author: "CODER"
    body: "Start: Implementing the finish-time blueprint evidence gate in the evidence epic branch; dependency D6SFRB is already verified and committed in this stacked branch but not DONE until base integration."
  -
    author: "INTEGRATOR"
    body: "Verified: v0.5 blueprint stack is merged into main; local backend closure recorded after rc1 runtime install and blueprint release gate verification."
events:
  -
    type: "status"
    at: "2026-05-06T09:52:46.147Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Implementing the finish-time blueprint evidence gate in the evidence epic branch; dependency D6SFRB is already verified and committed in this stacked branch but not DONE until base integration."
  -
    type: "verify"
    at: "2026-05-06T09:54:56.495Z"
    author: "CODER"
    state: "ok"
    note: "Verified: finish evidence gate rejects stale or missing blueprint-backed verification and preserves existing finish flows."
  -
    type: "verify"
    at: "2026-05-06T14:58:06.104Z"
    author: "INTEGRATOR"
    state: "ok"
    note: "Verified: v0.5 blueprint stack is merged into main and the current blueprint snapshot evidence is recorded for closure."
  -
    type: "status"
    at: "2026-05-06T14:58:16.706Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: v0.5 blueprint stack is merged into main; local backend closure recorded after rc1 runtime install and blueprint release gate verification."
doc_version: 3
doc_updated_at: "2026-05-06T14:58:16.706Z"
doc_updated_by: "INTEGRATOR"
description: "Add finish-time validation that required blueprint evidence is present or explicitly waived by route-compatible stop or approval semantics."
sections:
  Summary: |-
    Validate required blueprint evidence before finish

    Add finish-time validation that required blueprint evidence is present or explicitly waived by route-compatible stop or approval semantics.
  Scope: |-
    - In scope: Add finish-time validation that required blueprint evidence is present or explicitly waived by route-compatible stop or approval semantics.
    - Out of scope: unrelated refactors not required for "Validate required blueprint evidence before finish".
  Plan: "Implement a finish-time evidence gate for blueprint-backed tasks. The gate loads the already resolved task state during finish, checks that the task blueprint snapshot artifact is current, and requires a recorded BlueprintSnapshotRef in task verification before DONE transition. Add unit coverage for missing/stale evidence and keep force/close behavior unchanged except for this validation."
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-06T09:54:56.495Z — VERIFY — ok

    By: CODER

    Note: Verified: finish evidence gate rejects stale or missing blueprint-backed verification and preserves existing finish flows.

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-06T09:52:46.147Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605060915-N929BE-blueprint-evidence/.agentplane/tasks/202605060915-ZHFA8V/blueprint/resolved-snapshot.json
    - old_digest: 137e2d280e1594b6433e407ccaee8426dae174309a6693aad27f6350defdafc1
    - current_digest: 137e2d280e1594b6433e407ccaee8426dae174309a6693aad27f6350defdafc1
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605060915-ZHFA8V

    ### 2026-05-06T14:58:06.104Z — VERIFY — ok

    By: INTEGRATOR

    Note: Verified: v0.5 blueprint stack is merged into main and the current blueprint snapshot evidence is recorded for closure.

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-06T09:54:56.499Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Command: bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/task/finish.validation.unit.test.ts; Result: pass; Evidence: 21 tests passed. Command: bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/task/finish.state.unit.test.ts; Result: pass; Evidence: 8 tests passed. Command: bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/task/finish.close-tail.unit.test.ts; Result: pass; Evidence: 11 tests passed. Command: bun run typecheck; Result: pass. Command: bunx eslint touched finish files; Result: pass. Command: git diff --check; Result: pass.
      Impact: Finish now fails before DONE transition for blueprint-backed tasks when snapshot evidence is stale or verification lacks BlueprintSnapshotRef.
      Resolution: Added assertBlueprintEvidenceBeforeFinish and focused coverage while legacy tasks without blueprint artifacts remain finishable.
id_source: "generated"
---
## Summary

Validate required blueprint evidence before finish

Add finish-time validation that required blueprint evidence is present or explicitly waived by route-compatible stop or approval semantics.

## Scope

- In scope: Add finish-time validation that required blueprint evidence is present or explicitly waived by route-compatible stop or approval semantics.
- Out of scope: unrelated refactors not required for "Validate required blueprint evidence before finish".

## Plan

Implement a finish-time evidence gate for blueprint-backed tasks. The gate loads the already resolved task state during finish, checks that the task blueprint snapshot artifact is current, and requires a recorded BlueprintSnapshotRef in task verification before DONE transition. Add unit coverage for missing/stale evidence and keep force/close behavior unchanged except for this validation.

## Verify Steps

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-06T09:54:56.495Z — VERIFY — ok

By: CODER

Note: Verified: finish evidence gate rejects stale or missing blueprint-backed verification and preserves existing finish flows.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-06T09:52:46.147Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605060915-N929BE-blueprint-evidence/.agentplane/tasks/202605060915-ZHFA8V/blueprint/resolved-snapshot.json
- old_digest: 137e2d280e1594b6433e407ccaee8426dae174309a6693aad27f6350defdafc1
- current_digest: 137e2d280e1594b6433e407ccaee8426dae174309a6693aad27f6350defdafc1
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605060915-ZHFA8V

### 2026-05-06T14:58:06.104Z — VERIFY — ok

By: INTEGRATOR

Note: Verified: v0.5 blueprint stack is merged into main and the current blueprint snapshot evidence is recorded for closure.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-06T09:54:56.499Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: Command: bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/task/finish.validation.unit.test.ts; Result: pass; Evidence: 21 tests passed. Command: bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/task/finish.state.unit.test.ts; Result: pass; Evidence: 8 tests passed. Command: bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/task/finish.close-tail.unit.test.ts; Result: pass; Evidence: 11 tests passed. Command: bun run typecheck; Result: pass. Command: bunx eslint touched finish files; Result: pass. Command: git diff --check; Result: pass.
  Impact: Finish now fails before DONE transition for blueprint-backed tasks when snapshot evidence is stale or verification lacks BlueprintSnapshotRef.
  Resolution: Added assertBlueprintEvidenceBeforeFinish and focused coverage while legacy tasks without blueprint artifacts remain finishable.
