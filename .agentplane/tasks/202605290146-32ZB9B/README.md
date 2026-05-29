---
id: "202605290146-32ZB9B"
title: "SGR contracts decomposition"
result_summary: "Merged via PR #4254."
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
  - "runtime"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-29T01:46:19.154Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-29T01:51:33.765Z"
  updated_by: "CODER"
  note: "Verified SGR contracts decomposition. Commands passed: SGR contract vitest suite (1 file, 8 tests), bun run typecheck, bun run arch:check, bun run knip:check after reviewed baseline remap for moved public types, bun run lint:core, bun run format:changed, bun run hotspots:check. Runtime hotspot warnings decreased from 25 to 24; contracts.ts is 322 lines."
  attempts: 0
commit:
  hash: "3f220a193b56b8c76ede98f730d02460e82d7f89"
  message: "✅ 32ZB9B runtime: record verification"
comments:
  -
    author: "CODER"
    body: "Start: decompose SGR contracts into type and validator primitive modules while preserving public SGR validation exports."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #4254 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "status"
    at: "2026-05-29T01:46:41.424Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: decompose SGR contracts into type and validator primitive modules while preserving public SGR validation exports."
  -
    type: "verify"
    at: "2026-05-29T01:51:33.765Z"
    author: "CODER"
    state: "ok"
    note: "Verified SGR contracts decomposition. Commands passed: SGR contract vitest suite (1 file, 8 tests), bun run typecheck, bun run arch:check, bun run knip:check after reviewed baseline remap for moved public types, bun run lint:core, bun run format:changed, bun run hotspots:check. Runtime hotspot warnings decreased from 25 to 24; contracts.ts is 322 lines."
  -
    type: "status"
    at: "2026-05-29T01:57:20.246Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #4254 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-05-29T01:57:20.251Z"
doc_updated_by: "INTEGRATOR"
description: "Decompose packages/agentplane/src/runtime/sgr/contracts.ts by extracting contract types and shared validation primitives while preserving public SGR validation exports and reducing runtime hotspot warnings."
sections:
  Summary: |-
    SGR contracts decomposition

    Decompose packages/agentplane/src/runtime/sgr/contracts.ts by extracting contract types and shared validation primitives while preserving public SGR validation exports and reducing runtime hotspot warnings.
  Scope: |-
    - In scope: Decompose packages/agentplane/src/runtime/sgr/contracts.ts by extracting contract types and shared validation primitives while preserving public SGR validation exports and reducing runtime hotspot warnings.
    - Out of scope: unrelated refactors not required for "SGR contracts decomposition".
  Plan: |-
    Plan:
    1. Start a branch_pr worktree for CODER.
    2. Extract SGR contract type definitions into a focused module and shared primitive validators into another focused module.
    3. Keep runtime/sgr/index.ts and all wrapper exports compatible.
    4. Verify with SGR contract tests, typecheck, arch/knip/lint/format, and hotspot threshold report.
    5. Open PR, wait for hosted checks, merge to main, close lifecycle, and clean worktree.

    Acceptance:
    - Public SGR validator functions and exported types remain compatible.
    - contracts.ts drops below the 400-line hotspot warning threshold.
    - Runtime hotspot warning count decreases from 25 to 24 without introducing new warning-sized runtime modules.
    - SGR contract negative-path validation behavior remains covered by tests.
  Verify Steps: |-
    PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-29T01:51:33.765Z — VERIFY — ok

    By: CODER

    Note: Verified SGR contracts decomposition. Commands passed: SGR contract vitest suite (1 file, 8 tests), bun run typecheck, bun run arch:check, bun run knip:check after reviewed baseline remap for moved public types, bun run lint:core, bun run format:changed, bun run hotspots:check. Runtime hotspot warnings decreased from 25 to 24; contracts.ts is 322 lines.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-29T01:46:41.424Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/hotspot-refactor-canonical/.agentplane/worktrees/202605290146-32ZB9B-sgr-contracts-decomposition/.agentplane/tasks/202605290146-32ZB9B/blueprint/resolved-snapshot.json
    - old_digest: c8b09d8c370485f1728698191237e8f8b02220eb3cb9898c7d38f6ba215547f2
    - current_digest: c8b09d8c370485f1728698191237e8f8b02220eb3cb9898c7d38f6ba215547f2
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605290146-32ZB9B

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

SGR contracts decomposition

Decompose packages/agentplane/src/runtime/sgr/contracts.ts by extracting contract types and shared validation primitives while preserving public SGR validation exports and reducing runtime hotspot warnings.

## Scope

- In scope: Decompose packages/agentplane/src/runtime/sgr/contracts.ts by extracting contract types and shared validation primitives while preserving public SGR validation exports and reducing runtime hotspot warnings.
- Out of scope: unrelated refactors not required for "SGR contracts decomposition".

## Plan

Plan:
1. Start a branch_pr worktree for CODER.
2. Extract SGR contract type definitions into a focused module and shared primitive validators into another focused module.
3. Keep runtime/sgr/index.ts and all wrapper exports compatible.
4. Verify with SGR contract tests, typecheck, arch/knip/lint/format, and hotspot threshold report.
5. Open PR, wait for hosted checks, merge to main, close lifecycle, and clean worktree.

Acceptance:
- Public SGR validator functions and exported types remain compatible.
- contracts.ts drops below the 400-line hotspot warning threshold.
- Runtime hotspot warning count decreases from 25 to 24 without introducing new warning-sized runtime modules.
- SGR contract negative-path validation behavior remains covered by tests.

## Verify Steps

PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-29T01:51:33.765Z — VERIFY — ok

By: CODER

Note: Verified SGR contracts decomposition. Commands passed: SGR contract vitest suite (1 file, 8 tests), bun run typecheck, bun run arch:check, bun run knip:check after reviewed baseline remap for moved public types, bun run lint:core, bun run format:changed, bun run hotspots:check. Runtime hotspot warnings decreased from 25 to 24; contracts.ts is 322 lines.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-29T01:46:41.424Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/hotspot-refactor-canonical/.agentplane/worktrees/202605290146-32ZB9B-sgr-contracts-decomposition/.agentplane/tasks/202605290146-32ZB9B/blueprint/resolved-snapshot.json
- old_digest: c8b09d8c370485f1728698191237e8f8b02220eb3cb9898c7d38f6ba215547f2
- current_digest: c8b09d8c370485f1728698191237e8f8b02220eb3cb9898c7d38f6ba215547f2
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605290146-32ZB9B

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
