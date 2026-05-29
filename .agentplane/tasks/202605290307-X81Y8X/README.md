---
id: "202605290307-X81Y8X"
title: "Blueprint resolve decomposition"
result_summary: "Merged via PR #4264."
status: "DONE"
priority: "med"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "blueprints"
  - "code"
  - "hotspot"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-29T03:07:15.420Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-29T03:13:16.388Z"
  updated_by: "CODER"
  note: "Verified blueprint resolve decomposition. Commands passed: bunx vitest run packages/agentplane/src/blueprints/resolve.test.ts packages/agentplane/src/blueprints/recipe-hints.test.ts packages/agentplane/src/blueprints/snapshot.test.ts packages/agentplane/src/blueprints/validate.test.ts --config vitest.workspace.ts (56 tests), bun run typecheck, bun run arch:check, bun run knip:check, bun run lint:core, bun run format:changed, bun run hotspots:check. Runtime hotspot warnings decreased from 20 to 19; resolve.ts is 346 lines, below the 400-line warning threshold."
  attempts: 0
commit:
  hash: "a97cbd444535b7b08fa2ff8e9b23a27cc05d870d"
  message: "✅ X81Y8X blueprints: record verification"
comments:
  -
    author: "CODER"
    body: "Start: extract recipe hint validation helpers while preserving blueprint resolve behavior and exports."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #4264 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "status"
    at: "2026-05-29T03:07:30.299Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: extract recipe hint validation helpers while preserving blueprint resolve behavior and exports."
  -
    type: "verify"
    at: "2026-05-29T03:13:16.388Z"
    author: "CODER"
    state: "ok"
    note: "Verified blueprint resolve decomposition. Commands passed: bunx vitest run packages/agentplane/src/blueprints/resolve.test.ts packages/agentplane/src/blueprints/recipe-hints.test.ts packages/agentplane/src/blueprints/snapshot.test.ts packages/agentplane/src/blueprints/validate.test.ts --config vitest.workspace.ts (56 tests), bun run typecheck, bun run arch:check, bun run knip:check, bun run lint:core, bun run format:changed, bun run hotspots:check. Runtime hotspot warnings decreased from 20 to 19; resolve.ts is 346 lines, below the 400-line warning threshold."
  -
    type: "status"
    at: "2026-05-29T03:18:36.963Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #4264 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-05-29T03:18:36.967Z"
doc_updated_by: "INTEGRATOR"
description: "Decompose packages/agentplane/src/blueprints/resolve.ts by extracting recipe hint validation helpers while preserving blueprint resolution and explanation behavior."
sections:
  Summary: |-
    Blueprint resolve decomposition

    Decompose packages/agentplane/src/blueprints/resolve.ts by extracting recipe hint validation helpers while preserving blueprint resolution and explanation behavior.
  Scope: |-
    - In scope: Decompose packages/agentplane/src/blueprints/resolve.ts by extracting recipe hint validation helpers while preserving blueprint resolution and explanation behavior.
    - Out of scope: unrelated refactors not required for "Blueprint resolve decomposition".
  Plan: |-
    Plan:
    1. Start a branch_pr worktree for CODER.
    2. Extract recipe hint target/accept/reject validation from packages/agentplane/src/blueprints/resolve.ts into a focused helper module.
    3. Preserve resolveBlueprint, validateRecipeHintsForBlueprint, and inferBlueprintTaskKind public behavior and exports.
    4. Verify with blueprint resolve/recipe hint/snapshot tests, typecheck, arch/knip/lint/format, and hotspot threshold report.
    5. Open PR, wait for hosted checks, merge to main, close lifecycle, and clean worktree.

    Acceptance:
    - Existing blueprint selection and recipe hint acceptance/rejection behavior remains compatible.
    - resolve.ts drops below the 400-line hotspot warning threshold.
    - Runtime hotspot warning count decreases from 20 to 19 without introducing new warning-sized runtime modules.
    - No unrelated registry, model, explain, or validation changes.
  Verify Steps: |-
    PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-29T03:13:16.388Z — VERIFY — ok

    By: CODER

    Note: Verified blueprint resolve decomposition. Commands passed: bunx vitest run packages/agentplane/src/blueprints/resolve.test.ts packages/agentplane/src/blueprints/recipe-hints.test.ts packages/agentplane/src/blueprints/snapshot.test.ts packages/agentplane/src/blueprints/validate.test.ts --config vitest.workspace.ts (56 tests), bun run typecheck, bun run arch:check, bun run knip:check, bun run lint:core, bun run format:changed, bun run hotspots:check. Runtime hotspot warnings decreased from 20 to 19; resolve.ts is 346 lines, below the 400-line warning threshold.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-29T03:07:30.299Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: .agentplane/tasks/202605290307-X81Y8X/blueprint/resolved-snapshot.json
    - old_digest: 1ef3084ba6c5f2457bc7e333a613514829ce3f4c8da437f5a5ca8e914333fca1
    - current_digest: 1ef3084ba6c5f2457bc7e333a613514829ce3f4c8da437f5a5ca8e914333fca1
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605290307-X81Y8X

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Blueprint resolve decomposition

Decompose packages/agentplane/src/blueprints/resolve.ts by extracting recipe hint validation helpers while preserving blueprint resolution and explanation behavior.

## Scope

- In scope: Decompose packages/agentplane/src/blueprints/resolve.ts by extracting recipe hint validation helpers while preserving blueprint resolution and explanation behavior.
- Out of scope: unrelated refactors not required for "Blueprint resolve decomposition".

## Plan

Plan:
1. Start a branch_pr worktree for CODER.
2. Extract recipe hint target/accept/reject validation from packages/agentplane/src/blueprints/resolve.ts into a focused helper module.
3. Preserve resolveBlueprint, validateRecipeHintsForBlueprint, and inferBlueprintTaskKind public behavior and exports.
4. Verify with blueprint resolve/recipe hint/snapshot tests, typecheck, arch/knip/lint/format, and hotspot threshold report.
5. Open PR, wait for hosted checks, merge to main, close lifecycle, and clean worktree.

Acceptance:
- Existing blueprint selection and recipe hint acceptance/rejection behavior remains compatible.
- resolve.ts drops below the 400-line hotspot warning threshold.
- Runtime hotspot warning count decreases from 20 to 19 without introducing new warning-sized runtime modules.
- No unrelated registry, model, explain, or validation changes.

## Verify Steps

PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-29T03:13:16.388Z — VERIFY — ok

By: CODER

Note: Verified blueprint resolve decomposition. Commands passed: bunx vitest run packages/agentplane/src/blueprints/resolve.test.ts packages/agentplane/src/blueprints/recipe-hints.test.ts packages/agentplane/src/blueprints/snapshot.test.ts packages/agentplane/src/blueprints/validate.test.ts --config vitest.workspace.ts (56 tests), bun run typecheck, bun run arch:check, bun run knip:check, bun run lint:core, bun run format:changed, bun run hotspots:check. Runtime hotspot warnings decreased from 20 to 19; resolve.ts is 346 lines, below the 400-line warning threshold.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-29T03:07:30.299Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

Details:

BlueprintSnapshotRef:
- state: current
- path: .agentplane/tasks/202605290307-X81Y8X/blueprint/resolved-snapshot.json
- old_digest: 1ef3084ba6c5f2457bc7e333a613514829ce3f4c8da437f5a5ca8e914333fca1
- current_digest: 1ef3084ba6c5f2457bc7e333a613514829ce3f4c8da437f5a5ca8e914333fca1
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605290307-X81Y8X

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
