---
id: "202605290203-E5E8EF"
title: "Blueprint validate decomposition"
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
  - "hotspot"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-29T02:03:40.337Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-29T02:13:21.445Z"
  updated_by: "CODER"
  note: "Verified blueprint validation helper decomposition. Commands passed: bunx vitest run packages/agentplane/src/blueprints/validate.test.ts --config vitest.workspace.ts (23 tests), bun run typecheck, bun run arch:check, bun run knip:check, bun run lint:core, bun run format:changed, bun run hotspots:check. Runtime hotspot warnings decreased from 24 to 23; validate.ts is 390 lines, below the 400-line warning threshold."
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: decompose blueprint validation helpers while preserving validateBlueprint, validateBlueprintRegistry, and validateBlueprintPlanArtifact behavior."
events:
  -
    type: "status"
    at: "2026-05-29T02:04:06.647Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: decompose blueprint validation helpers while preserving validateBlueprint, validateBlueprintRegistry, and validateBlueprintPlanArtifact behavior."
  -
    type: "verify"
    at: "2026-05-29T02:13:21.445Z"
    author: "CODER"
    state: "ok"
    note: "Verified blueprint validation helper decomposition. Commands passed: bunx vitest run packages/agentplane/src/blueprints/validate.test.ts --config vitest.workspace.ts (23 tests), bun run typecheck, bun run arch:check, bun run knip:check, bun run lint:core, bun run format:changed, bun run hotspots:check. Runtime hotspot warnings decreased from 24 to 23; validate.ts is 390 lines, below the 400-line warning threshold."
doc_version: 3
doc_updated_at: "2026-05-29T02:13:21.470Z"
doc_updated_by: "CODER"
description: "Decompose packages/agentplane/src/blueprints/validate.ts by extracting shared graph/evidence validation helpers while preserving blueprint and plan validation behavior and reducing runtime hotspot warnings."
sections:
  Summary: |-
    Blueprint validate decomposition

    Decompose packages/agentplane/src/blueprints/validate.ts by extracting shared graph/evidence validation helpers while preserving blueprint and plan validation behavior and reducing runtime hotspot warnings.
  Scope: |-
    - In scope: Decompose packages/agentplane/src/blueprints/validate.ts by extracting shared graph/evidence validation helpers while preserving blueprint and plan validation behavior and reducing runtime hotspot warnings.
    - Out of scope: unrelated refactors not required for "Blueprint validate decomposition".
  Plan: |-
    Plan:
    1. Start a branch_pr worktree for CODER.
    2. Extract blueprint validation graph helpers and shared problem constructors from packages/agentplane/src/blueprints/validate.ts into focused modules.
    3. Preserve validateBlueprint, validateBlueprintRegistry, and validateBlueprintPlanArtifact behavior and exports.
    4. Verify with blueprint validation tests, typecheck, arch/knip/lint/format, and hotspot threshold report.
    5. Open PR, wait for hosted checks, merge to main, close lifecycle, and clean worktree.

    Acceptance:
    - Blueprint validation behavior remains compatible, including negative-path tests.
    - validate.ts drops below the 400-line hotspot warning threshold.
    - Runtime hotspot warning count decreases from 24 to 23 without introducing new warning-sized runtime modules.
    - No unrelated blueprint registry, routing, or model changes.
  Verify Steps: |-
    PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-29T02:13:21.445Z — VERIFY — ok

    By: CODER

    Note: Verified blueprint validation helper decomposition. Commands passed: bunx vitest run packages/agentplane/src/blueprints/validate.test.ts --config vitest.workspace.ts (23 tests), bun run typecheck, bun run arch:check, bun run knip:check, bun run lint:core, bun run format:changed, bun run hotspots:check. Runtime hotspot warnings decreased from 24 to 23; validate.ts is 390 lines, below the 400-line warning threshold.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-29T02:04:06.647Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/hotspot-refactor-canonical/.agentplane/worktrees/202605290203-E5E8EF-blueprint-validate-decomposition/.agentplane/tasks/202605290203-E5E8EF/blueprint/resolved-snapshot.json
    - old_digest: b770774286c9309b399a6d4e36ef03ce0194740ff988b3014182dcf7122ef8b7
    - current_digest: b770774286c9309b399a6d4e36ef03ce0194740ff988b3014182dcf7122ef8b7
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605290203-E5E8EF

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Blueprint validate decomposition

Decompose packages/agentplane/src/blueprints/validate.ts by extracting shared graph/evidence validation helpers while preserving blueprint and plan validation behavior and reducing runtime hotspot warnings.

## Scope

- In scope: Decompose packages/agentplane/src/blueprints/validate.ts by extracting shared graph/evidence validation helpers while preserving blueprint and plan validation behavior and reducing runtime hotspot warnings.
- Out of scope: unrelated refactors not required for "Blueprint validate decomposition".

## Plan

Plan:
1. Start a branch_pr worktree for CODER.
2. Extract blueprint validation graph helpers and shared problem constructors from packages/agentplane/src/blueprints/validate.ts into focused modules.
3. Preserve validateBlueprint, validateBlueprintRegistry, and validateBlueprintPlanArtifact behavior and exports.
4. Verify with blueprint validation tests, typecheck, arch/knip/lint/format, and hotspot threshold report.
5. Open PR, wait for hosted checks, merge to main, close lifecycle, and clean worktree.

Acceptance:
- Blueprint validation behavior remains compatible, including negative-path tests.
- validate.ts drops below the 400-line hotspot warning threshold.
- Runtime hotspot warning count decreases from 24 to 23 without introducing new warning-sized runtime modules.
- No unrelated blueprint registry, routing, or model changes.

## Verify Steps

PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-29T02:13:21.445Z — VERIFY — ok

By: CODER

Note: Verified blueprint validation helper decomposition. Commands passed: bunx vitest run packages/agentplane/src/blueprints/validate.test.ts --config vitest.workspace.ts (23 tests), bun run typecheck, bun run arch:check, bun run knip:check, bun run lint:core, bun run format:changed, bun run hotspots:check. Runtime hotspot warnings decreased from 24 to 23; validate.ts is 390 lines, below the 400-line warning threshold.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-29T02:04:06.647Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/hotspot-refactor-canonical/.agentplane/worktrees/202605290203-E5E8EF-blueprint-validate-decomposition/.agentplane/tasks/202605290203-E5E8EF/blueprint/resolved-snapshot.json
- old_digest: b770774286c9309b399a6d4e36ef03ce0194740ff988b3014182dcf7122ef8b7
- current_digest: b770774286c9309b399a6d4e36ef03ce0194740ff988b3014182dcf7122ef8b7
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605290203-E5E8EF

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
