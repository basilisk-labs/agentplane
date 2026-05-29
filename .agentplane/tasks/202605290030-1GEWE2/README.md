---
id: "202605290030-1GEWE2"
title: "Blueprint model decomposition"
result_summary: "Merged via PR #4244."
status: "DONE"
priority: "med"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "hotspot"
  - "refactor"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-29T00:30:40.826Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-29T00:36:12.130Z"
  updated_by: "CODER"
  note: "Verified blueprint model decomposition. Commands passed: blueprint focused tests (resolve, recipe-hints, task-input), bun run typecheck, bun run arch:check, bun run knip:check after reviewed baseline remap, bun run lint:core, bun run format:changed, hotspot report check. Runtime hotspot warnings decreased from 30 to 29; model.ts is 5 lines."
  attempts: 0
commit:
  hash: "a160777b00b7e43dd0ab85acf11cdb0a84180996"
  message: "✅ 1GEWE2 blueprints: record verification"
comments:
  -
    author: "CODER"
    body: "Start: Split blueprint model type declarations into focused modules with model.ts as compatibility barrel."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #4244 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "status"
    at: "2026-05-29T00:30:51.773Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Split blueprint model type declarations into focused modules with model.ts as compatibility barrel."
  -
    type: "verify"
    at: "2026-05-29T00:36:12.130Z"
    author: "CODER"
    state: "ok"
    note: "Verified blueprint model decomposition. Commands passed: blueprint focused tests (resolve, recipe-hints, task-input), bun run typecheck, bun run arch:check, bun run knip:check after reviewed baseline remap, bun run lint:core, bun run format:changed, hotspot report check. Runtime hotspot warnings decreased from 30 to 29; model.ts is 5 lines."
  -
    type: "status"
    at: "2026-05-29T00:42:11.705Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #4244 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-05-29T00:42:11.709Z"
doc_updated_by: "INTEGRATOR"
description: "Decompose packages/agentplane/src/blueprints/model.ts into focused blueprint model schema/type modules while preserving public blueprint model exports and reducing runtime hotspot warnings."
sections:
  Summary: |-
    Blueprint model decomposition

    Decompose packages/agentplane/src/blueprints/model.ts into focused blueprint model schema/type modules while preserving public blueprint model exports and reducing runtime hotspot warnings.
  Scope: |-
    - In scope: Decompose packages/agentplane/src/blueprints/model.ts into focused blueprint model schema/type modules while preserving public blueprint model exports and reducing runtime hotspot warnings.
    - Out of scope: unrelated refactors not required for "Blueprint model decomposition".
  Plan: |-
    Plan:
    1. Start branch_pr worktree for CODER.
    2. Split blueprint model type declarations into focused modules: core model, resolution/plan model, execution model, snapshot model, and explain output model.
    3. Preserve packages/agentplane/src/blueprints/model.ts as a compatibility barrel so public imports keep working.
    4. Verify with blueprint-focused tests plus typecheck, arch/knip/lint/format, and hotspot threshold report.
    5. Open PR, wait for hosted checks, merge to main, close lifecycle, and clean worktree.

    Acceptance:
    - public blueprint model exports remain import-compatible.
    - model.ts drops below the 400-line hotspot warning threshold.
    - runtime hotspot warning count decreases from 30 to 29 without adding new warning-sized runtime modules.
  Verify Steps: |-
    PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-29T00:36:12.130Z — VERIFY — ok

    By: CODER

    Note: Verified blueprint model decomposition. Commands passed: blueprint focused tests (resolve, recipe-hints, task-input), bun run typecheck, bun run arch:check, bun run knip:check after reviewed baseline remap, bun run lint:core, bun run format:changed, hotspot report check. Runtime hotspot warnings decreased from 30 to 29; model.ts is 5 lines.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-29T00:30:51.773Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/hotspot-refactor-canonical/.agentplane/worktrees/202605290030-1GEWE2-blueprint-model-decomposition/.agentplane/tasks/202605290030-1GEWE2/blueprint/resolved-snapshot.json
    - old_digest: 6e93cd8f958dd913f94319de9906fc3eaa0596c8dbbc3f48016acfa3a4170fa5
    - current_digest: 6e93cd8f958dd913f94319de9906fc3eaa0596c8dbbc3f48016acfa3a4170fa5
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605290030-1GEWE2

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Blueprint model decomposition

Decompose packages/agentplane/src/blueprints/model.ts into focused blueprint model schema/type modules while preserving public blueprint model exports and reducing runtime hotspot warnings.

## Scope

- In scope: Decompose packages/agentplane/src/blueprints/model.ts into focused blueprint model schema/type modules while preserving public blueprint model exports and reducing runtime hotspot warnings.
- Out of scope: unrelated refactors not required for "Blueprint model decomposition".

## Plan

Plan:
1. Start branch_pr worktree for CODER.
2. Split blueprint model type declarations into focused modules: core model, resolution/plan model, execution model, snapshot model, and explain output model.
3. Preserve packages/agentplane/src/blueprints/model.ts as a compatibility barrel so public imports keep working.
4. Verify with blueprint-focused tests plus typecheck, arch/knip/lint/format, and hotspot threshold report.
5. Open PR, wait for hosted checks, merge to main, close lifecycle, and clean worktree.

Acceptance:
- public blueprint model exports remain import-compatible.
- model.ts drops below the 400-line hotspot warning threshold.
- runtime hotspot warning count decreases from 30 to 29 without adding new warning-sized runtime modules.

## Verify Steps

PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-29T00:36:12.130Z — VERIFY — ok

By: CODER

Note: Verified blueprint model decomposition. Commands passed: blueprint focused tests (resolve, recipe-hints, task-input), bun run typecheck, bun run arch:check, bun run knip:check after reviewed baseline remap, bun run lint:core, bun run format:changed, hotspot report check. Runtime hotspot warnings decreased from 30 to 29; model.ts is 5 lines.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-29T00:30:51.773Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/hotspot-refactor-canonical/.agentplane/worktrees/202605290030-1GEWE2-blueprint-model-decomposition/.agentplane/tasks/202605290030-1GEWE2/blueprint/resolved-snapshot.json
- old_digest: 6e93cd8f958dd913f94319de9906fc3eaa0596c8dbbc3f48016acfa3a4170fa5
- current_digest: 6e93cd8f958dd913f94319de9906fc3eaa0596c8dbbc3f48016acfa3a4170fa5
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605290030-1GEWE2

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
