---
id: "202605060915-RQFY8Y"
title: "Detect blueprint snapshot drift"
status: "DONE"
priority: "high"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on:
  - "202605060915-0EDRBK"
  - "202605060915-3NBTGG"
tags:
  - "blueprints"
  - "code"
  - "doctor"
  - "v05"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-06T09:20:39.889Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-06T14:57:55.920Z"
  updated_by: "INTEGRATOR"
  note: "Verified: v0.5 blueprint stack is merged into main and the current blueprint snapshot evidence is recorded for closure."
commit:
  hash: "2e72b6ee9fa45c8fe63fafb02a7919ea687c2153"
  message: "Merge pull request #976 from basilisk-labs/task-close/202605060915-0EDRBK/3b4f6276caab"
comments:
  -
    author: "CODER"
    body: "Start: Detect blueprint snapshot drift using the persisted snapshot and explicit refresh command from this epic branch. Dependency is force-started inside branch_pr because upstream DONE happens only after integration; commits 0d21e91 and 6fa8aa1 are present locally."
  -
    author: "INTEGRATOR"
    body: "Verified: v0.5 blueprint stack is merged into main; local backend closure recorded after rc1 runtime install and blueprint release gate verification."
events:
  -
    type: "status"
    at: "2026-05-06T09:35:15.077Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Detect blueprint snapshot drift using the persisted snapshot and explicit refresh command from this epic branch. Dependency is force-started inside branch_pr because upstream DONE happens only after integration; commits 0d21e91 and 6fa8aa1 are present locally."
  -
    type: "verify"
    at: "2026-05-06T09:37:01.696Z"
    author: "CODER"
    state: "ok"
    note: "Implemented read-only blueprint snapshot drift detection. Verification passed: bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/blueprint/snapshot-artifact.test.ts packages/agentplane/src/commands/task/start.unit.test.ts packages/agentplane/src/blueprints/snapshot.test.ts; bunx vitest --config vitest.workspace.ts run --project cli-core packages/agentplane/src/cli/run-cli.core.blueprint.test.ts; bun run typecheck; prettier/eslint on touched files; git diff --check; bun run framework:dev:bootstrap; node packages/agentplane/bin/agentplane.js blueprint drift 202605060915-RQFY8Y --json."
  -
    type: "verify"
    at: "2026-05-06T14:57:55.920Z"
    author: "INTEGRATOR"
    state: "ok"
    note: "Verified: v0.5 blueprint stack is merged into main and the current blueprint snapshot evidence is recorded for closure."
  -
    type: "status"
    at: "2026-05-06T14:58:16.698Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: v0.5 blueprint stack is merged into main; local backend closure recorded after rc1 runtime install and blueprint release gate verification."
doc_version: 3
doc_updated_at: "2026-05-06T14:58:16.698Z"
doc_updated_by: "INTEGRATOR"
description: "Detect when task metadata, recipe hints, workflow mode, or trusted local blueprint registry drift from the persisted resolved blueprint snapshot and surface actionable warnings or stops."
sections:
  Summary: |-
    Detect blueprint snapshot drift

    Detect when task metadata, recipe hints, workflow mode, or trusted local blueprint registry drift from the persisted resolved blueprint snapshot and surface actionable warnings or stops.
  Scope: |-
    - In scope: Detect when task metadata, recipe hints, workflow mode, or trusted local blueprint registry drift from the persisted resolved blueprint snapshot and surface actionable warnings or stops.
    - Out of scope: unrelated refactors not required for "Detect blueprint snapshot drift".
  Plan: |-
    Detect blueprint snapshot drift after persistence and refresh support exist.

    Depends on: 202605060915-0EDRBK and 202605060915-3NBTGG.

    Steps:
    1. Compare persisted blueprint snapshot digest against the current resolver output for the same task intent/context.
    2. Surface drift in the lowest-noise existing diagnostic path, likely doctor or blueprint explain/check.
    3. Classify unchanged, expected refreshed, and stale snapshot states.
    4. Add tests for no drift, blueprint definition drift, recipe hint drift, and missing snapshot.
    5. Document stop rule: stale snapshot requires explicit refresh before runner materialization.

    Verification:
    - Focused drift/doctor tests pass.
    - Diagnostics explain the exact changed digest and recommended safe command.
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-06T09:37:01.696Z — VERIFY — ok

    By: CODER

    Note: Implemented read-only blueprint snapshot drift detection. Verification passed: bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/blueprint/snapshot-artifact.test.ts packages/agentplane/src/commands/task/start.unit.test.ts packages/agentplane/src/blueprints/snapshot.test.ts; bunx vitest --config vitest.workspace.ts run --project cli-core packages/agentplane/src/cli/run-cli.core.blueprint.test.ts; bun run typecheck; prettier/eslint on touched files; git diff --check; bun run framework:dev:bootstrap; node packages/agentplane/bin/agentplane.js blueprint drift 202605060915-RQFY8Y --json.

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-06T09:35:15.077Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

    ### 2026-05-06T14:57:55.920Z — VERIFY — ok

    By: INTEGRATOR

    Note: Verified: v0.5 blueprint stack is merged into main and the current blueprint snapshot evidence is recorded for closure.

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-06T09:37:01.699Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: blueprint drift compares persisted snapshot digest and route against current resolver output, returning current/missing/invalid/stale and a safe refresh command.
      Impact: Runner materialization and future doctor checks can stop on stale blueprint snapshots instead of silently using changed routing state.
      Resolution: Added drift helper and blueprint drift CLI command with unit and CLI coverage.
id_source: "generated"
---
## Summary

Detect blueprint snapshot drift

Detect when task metadata, recipe hints, workflow mode, or trusted local blueprint registry drift from the persisted resolved blueprint snapshot and surface actionable warnings or stops.

## Scope

- In scope: Detect when task metadata, recipe hints, workflow mode, or trusted local blueprint registry drift from the persisted resolved blueprint snapshot and surface actionable warnings or stops.
- Out of scope: unrelated refactors not required for "Detect blueprint snapshot drift".

## Plan

Detect blueprint snapshot drift after persistence and refresh support exist.

Depends on: 202605060915-0EDRBK and 202605060915-3NBTGG.

Steps:
1. Compare persisted blueprint snapshot digest against the current resolver output for the same task intent/context.
2. Surface drift in the lowest-noise existing diagnostic path, likely doctor or blueprint explain/check.
3. Classify unchanged, expected refreshed, and stale snapshot states.
4. Add tests for no drift, blueprint definition drift, recipe hint drift, and missing snapshot.
5. Document stop rule: stale snapshot requires explicit refresh before runner materialization.

Verification:
- Focused drift/doctor tests pass.
- Diagnostics explain the exact changed digest and recommended safe command.

## Verify Steps

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-06T09:37:01.696Z — VERIFY — ok

By: CODER

Note: Implemented read-only blueprint snapshot drift detection. Verification passed: bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/blueprint/snapshot-artifact.test.ts packages/agentplane/src/commands/task/start.unit.test.ts packages/agentplane/src/blueprints/snapshot.test.ts; bunx vitest --config vitest.workspace.ts run --project cli-core packages/agentplane/src/cli/run-cli.core.blueprint.test.ts; bun run typecheck; prettier/eslint on touched files; git diff --check; bun run framework:dev:bootstrap; node packages/agentplane/bin/agentplane.js blueprint drift 202605060915-RQFY8Y --json.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-06T09:35:15.077Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

### 2026-05-06T14:57:55.920Z — VERIFY — ok

By: INTEGRATOR

Note: Verified: v0.5 blueprint stack is merged into main and the current blueprint snapshot evidence is recorded for closure.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-06T09:37:01.699Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: blueprint drift compares persisted snapshot digest and route against current resolver output, returning current/missing/invalid/stale and a safe refresh command.
  Impact: Runner materialization and future doctor checks can stop on stale blueprint snapshots instead of silently using changed routing state.
  Resolution: Added drift helper and blueprint drift CLI command with unit and CLI coverage.
