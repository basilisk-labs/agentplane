---
id: "202605290053-CR056N"
title: "Blueprint project-local decomposition"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 5
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
  updated_at: "2026-05-29T00:54:44.855Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-29T01:06:18.246Z"
  updated_by: "CODER"
  note: "Verified project-local blueprint decomposition. Commands passed: project-local focused tests, bun run typecheck, bun run arch:check, bun run knip:check after reviewed baseline remap, bun run lint:core, bun run format:changed, bun run hotspots:check. Runtime hotspot warnings decreased from 28 to 27; project-local.ts is below the 400-line warning threshold."
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Decompose project-local blueprint trust/config and file parsing helpers while preserving public API behavior."
events:
  -
    type: "status"
    at: "2026-05-29T00:54:58.996Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Decompose project-local blueprint trust/config and file parsing helpers while preserving public API behavior."
  -
    type: "verify"
    at: "2026-05-29T01:06:18.246Z"
    author: "CODER"
    state: "ok"
    note: "Verified project-local blueprint decomposition. Commands passed: project-local focused tests, bun run typecheck, bun run arch:check, bun run knip:check after reviewed baseline remap, bun run lint:core, bun run format:changed, bun run hotspots:check. Runtime hotspot warnings decreased from 28 to 27; project-local.ts is below the 400-line warning threshold."
doc_version: 3
doc_updated_at: "2026-05-29T01:06:18.272Z"
doc_updated_by: "CODER"
description: "Decompose packages/agentplane/src/blueprints/project-local.ts into focused project-local blueprint modules while preserving behavior and reducing runtime hotspot warnings."
sections:
  Summary: |-
    Blueprint project-local decomposition

    Decompose packages/agentplane/src/blueprints/project-local.ts into focused project-local blueprint modules while preserving behavior and reducing runtime hotspot warnings.
  Scope: |-
    - In scope: Decompose packages/agentplane/src/blueprints/project-local.ts into focused project-local blueprint modules while preserving behavior and reducing runtime hotspot warnings.
    - Out of scope: unrelated refactors not required for "Blueprint project-local decomposition".
  Plan: |-
    Plan:
    1. Start branch_pr worktree for CODER.
    2. Extract project-local blueprint trust/config helpers and file parsing/loading helpers from packages/agentplane/src/blueprints/project-local.ts into focused modules.
    3. Keep public project-local functions and behavior compatible.
    4. Verify with project-local blueprint tests, typecheck, arch/knip/lint/format, and hotspot threshold report.
    5. Open PR, wait for hosted checks, merge to main, close lifecycle, and clean worktree.

    Acceptance:
    - project-local blueprint loading, trust config, compatibility report, and scaffold behavior remain compatible.
    - project-local.ts drops below the 400-line hotspot warning threshold.
    - runtime hotspot warning count decreases from 28 to 27 without adding new warning-sized runtime modules.
  Verify Steps: |-
    PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-29T01:06:18.246Z — VERIFY — ok

    By: CODER

    Note: Verified project-local blueprint decomposition. Commands passed: project-local focused tests, bun run typecheck, bun run arch:check, bun run knip:check after reviewed baseline remap, bun run lint:core, bun run format:changed, bun run hotspots:check. Runtime hotspot warnings decreased from 28 to 27; project-local.ts is below the 400-line warning threshold.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-29T00:54:58.996Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/hotspot-refactor-canonical/.agentplane/worktrees/202605290053-CR056N-blueprint-project-local-decomposition/.agentplane/tasks/202605290053-CR056N/blueprint/resolved-snapshot.json
    - old_digest: 1f309aff64eadf6c1ce96967b4bed57ef33a11b3b5a35192ef8d8a73a9601c9a
    - current_digest: 1f309aff64eadf6c1ce96967b4bed57ef33a11b3b5a35192ef8d8a73a9601c9a
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605290053-CR056N

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Blueprint project-local decomposition

Decompose packages/agentplane/src/blueprints/project-local.ts into focused project-local blueprint modules while preserving behavior and reducing runtime hotspot warnings.

## Scope

- In scope: Decompose packages/agentplane/src/blueprints/project-local.ts into focused project-local blueprint modules while preserving behavior and reducing runtime hotspot warnings.
- Out of scope: unrelated refactors not required for "Blueprint project-local decomposition".

## Plan

Plan:
1. Start branch_pr worktree for CODER.
2. Extract project-local blueprint trust/config helpers and file parsing/loading helpers from packages/agentplane/src/blueprints/project-local.ts into focused modules.
3. Keep public project-local functions and behavior compatible.
4. Verify with project-local blueprint tests, typecheck, arch/knip/lint/format, and hotspot threshold report.
5. Open PR, wait for hosted checks, merge to main, close lifecycle, and clean worktree.

Acceptance:
- project-local blueprint loading, trust config, compatibility report, and scaffold behavior remain compatible.
- project-local.ts drops below the 400-line hotspot warning threshold.
- runtime hotspot warning count decreases from 28 to 27 without adding new warning-sized runtime modules.

## Verify Steps

PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-29T01:06:18.246Z — VERIFY — ok

By: CODER

Note: Verified project-local blueprint decomposition. Commands passed: project-local focused tests, bun run typecheck, bun run arch:check, bun run knip:check after reviewed baseline remap, bun run lint:core, bun run format:changed, bun run hotspots:check. Runtime hotspot warnings decreased from 28 to 27; project-local.ts is below the 400-line warning threshold.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-29T00:54:58.996Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/hotspot-refactor-canonical/.agentplane/worktrees/202605290053-CR056N-blueprint-project-local-decomposition/.agentplane/tasks/202605290053-CR056N/blueprint/resolved-snapshot.json
- old_digest: 1f309aff64eadf6c1ce96967b4bed57ef33a11b3b5a35192ef8d8a73a9601c9a
- current_digest: 1f309aff64eadf6c1ce96967b4bed57ef33a11b3b5a35192ef8d8a73a9601c9a
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605290053-CR056N

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
