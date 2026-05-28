---
id: "202605282313-0JV1JB"
title: "Harvest task artifacts decomposition"
result_summary: "Merged via PR #4232."
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
  updated_at: "2026-05-28T23:13:35.186Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-28T23:20:59.721Z"
  updated_by: "CODER"
  note: "Verified harvest task artifacts decomposition. Commands passed: focused harvest context vitest (11 tests), bun run typecheck, bun run arch:deps, bun run lint:core, bun run format:changed, hotspot report check. Runtime hotspot warnings decreased from 36 to 35; harvest-tasks-artifacts.ts is 175 lines."
  attempts: 0
commit:
  hash: "982c840b175ad755326df64dfb5b9ffbbb5beeef"
  message: "✅ 0JV1JB context: record verification"
comments:
  -
    author: "CODER"
    body: "Start: Decompose harvest task artifact model and builders in the task worktree, preserving the existing context harvest tasks API and verifying focused behavior before opening the PR."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #4232 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "status"
    at: "2026-05-28T23:13:46.745Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Decompose harvest task artifact model and builders in the task worktree, preserving the existing context harvest tasks API and verifying focused behavior before opening the PR."
  -
    type: "verify"
    at: "2026-05-28T23:20:59.721Z"
    author: "CODER"
    state: "ok"
    note: "Verified harvest task artifacts decomposition. Commands passed: focused harvest context vitest (11 tests), bun run typecheck, bun run arch:deps, bun run lint:core, bun run format:changed, hotspot report check. Runtime hotspot warnings decreased from 36 to 35; harvest-tasks-artifacts.ts is 175 lines."
  -
    type: "status"
    at: "2026-05-28T23:24:27.017Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #4232 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-05-28T23:24:27.021Z"
doc_updated_by: "INTEGRATOR"
description: "Decompose packages/agentplane/src/context/harvest-tasks-artifacts.ts by extracting stable model/build/render helpers while preserving the existing context harvest tasks API and behavior."
sections:
  Summary: |-
    Harvest task artifacts decomposition

    Decompose packages/agentplane/src/context/harvest-tasks-artifacts.ts by extracting stable model/build/render helpers while preserving the existing context harvest tasks API and behavior.
  Scope: |-
    - In scope: Decompose packages/agentplane/src/context/harvest-tasks-artifacts.ts by extracting stable model/build/render helpers while preserving the existing context harvest tasks API and behavior.
    - Out of scope: unrelated refactors not required for "Harvest task artifacts decomposition".
  Plan: |-
    Plan:
    1. Start branch_pr worktree for CODER using the route oracle.
    2. Extract harvest task model/types and pure builders from harvest-tasks-artifacts.ts into focused modules, preserving public exports and serialized output shape.
    3. Keep write/read/render orchestration in harvest-tasks-artifacts.ts unless a second extraction is needed to bring it below the warning threshold.
    4. Verify with focused harvest context tests, typecheck, dependency architecture, lint, format, and hotspot threshold report.
    5. Open PR, wait for hosted checks, merge to main, close task lifecycle, and clean merged worktree.

    Acceptance:
    - context harvest tasks behavior and JSON/text payloads remain compatible.
    - harvest-tasks-artifacts.ts drops below the runtime hotspot warning threshold without broad semantic rewrites.
    - hotspot runtime warning count decreases from 36 to 35.
  Verify Steps: |-
    PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-28T23:20:59.721Z — VERIFY — ok

    By: CODER

    Note: Verified harvest task artifacts decomposition. Commands passed: focused harvest context vitest (11 tests), bun run typecheck, bun run arch:deps, bun run lint:core, bun run format:changed, hotspot report check. Runtime hotspot warnings decreased from 36 to 35; harvest-tasks-artifacts.ts is 175 lines.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-28T23:13:46.745Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/hotspot-refactor-canonical/.agentplane/worktrees/202605282313-0JV1JB-harvest-artifacts-decomposition/.agentplane/tasks/202605282313-0JV1JB/blueprint/resolved-snapshot.json
    - old_digest: 156a5710586c99ee5501205337abbffb2275ba5eb5b9c5ba2c8effdce767082f
    - current_digest: 156a5710586c99ee5501205337abbffb2275ba5eb5b9c5ba2c8effdce767082f
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605282313-0JV1JB

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Harvest task artifacts decomposition

Decompose packages/agentplane/src/context/harvest-tasks-artifacts.ts by extracting stable model/build/render helpers while preserving the existing context harvest tasks API and behavior.

## Scope

- In scope: Decompose packages/agentplane/src/context/harvest-tasks-artifacts.ts by extracting stable model/build/render helpers while preserving the existing context harvest tasks API and behavior.
- Out of scope: unrelated refactors not required for "Harvest task artifacts decomposition".

## Plan

Plan:
1. Start branch_pr worktree for CODER using the route oracle.
2. Extract harvest task model/types and pure builders from harvest-tasks-artifacts.ts into focused modules, preserving public exports and serialized output shape.
3. Keep write/read/render orchestration in harvest-tasks-artifacts.ts unless a second extraction is needed to bring it below the warning threshold.
4. Verify with focused harvest context tests, typecheck, dependency architecture, lint, format, and hotspot threshold report.
5. Open PR, wait for hosted checks, merge to main, close task lifecycle, and clean merged worktree.

Acceptance:
- context harvest tasks behavior and JSON/text payloads remain compatible.
- harvest-tasks-artifacts.ts drops below the runtime hotspot warning threshold without broad semantic rewrites.
- hotspot runtime warning count decreases from 36 to 35.

## Verify Steps

PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-28T23:20:59.721Z — VERIFY — ok

By: CODER

Note: Verified harvest task artifacts decomposition. Commands passed: focused harvest context vitest (11 tests), bun run typecheck, bun run arch:deps, bun run lint:core, bun run format:changed, hotspot report check. Runtime hotspot warnings decreased from 36 to 35; harvest-tasks-artifacts.ts is 175 lines.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-28T23:13:46.745Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/hotspot-refactor-canonical/.agentplane/worktrees/202605282313-0JV1JB-harvest-artifacts-decomposition/.agentplane/tasks/202605282313-0JV1JB/blueprint/resolved-snapshot.json
- old_digest: 156a5710586c99ee5501205337abbffb2275ba5eb5b9c5ba2c8effdce767082f
- current_digest: 156a5710586c99ee5501205337abbffb2275ba5eb5b9c5ba2c8effdce767082f
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605282313-0JV1JB

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
