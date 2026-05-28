---
id: "202605282325-F3Q401"
title: "Close commit message decomposition"
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
  updated_at: "2026-05-28T23:26:04.524Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-28T23:30:46.101Z"
  updated_by: "CODER"
  note: "Verified close commit message decomposition. Commands passed: close-message focused vitest (34 tests), bun run typecheck, bun run arch:deps, bun run lint:core, bun run format:changed, hotspot report check. Runtime hotspot warnings decreased from 35 to 34; close-message.ts is 112 lines."
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Decompose close commit message helpers in the task worktree while preserving renderMergeMessage and buildCloseCommitMessage behavior under existing focused tests."
events:
  -
    type: "status"
    at: "2026-05-28T23:26:21.679Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Decompose close commit message helpers in the task worktree while preserving renderMergeMessage and buildCloseCommitMessage behavior under existing focused tests."
  -
    type: "verify"
    at: "2026-05-28T23:30:46.101Z"
    author: "CODER"
    state: "ok"
    note: "Verified close commit message decomposition. Commands passed: close-message focused vitest (34 tests), bun run typecheck, bun run arch:deps, bun run lint:core, bun run format:changed, hotspot report check. Runtime hotspot warnings decreased from 35 to 34; close-message.ts is 112 lines."
doc_version: 3
doc_updated_at: "2026-05-28T23:30:46.126Z"
doc_updated_by: "CODER"
description: "Decompose packages/agentplane/src/commands/guard/impl/close-message.ts by extracting git metadata and rendering helpers while preserving buildCloseCommitMessage/renderMergeMessage behavior."
sections:
  Summary: |-
    Close commit message decomposition

    Decompose packages/agentplane/src/commands/guard/impl/close-message.ts by extracting git metadata and rendering helpers while preserving buildCloseCommitMessage/renderMergeMessage behavior.
  Scope: |-
    - In scope: Decompose packages/agentplane/src/commands/guard/impl/close-message.ts by extracting git metadata and rendering helpers while preserving buildCloseCommitMessage/renderMergeMessage behavior.
    - Out of scope: unrelated refactors not required for "Close commit message decomposition".
  Plan: |-
    Plan:
    1. Start branch_pr worktree for CODER using the route oracle.
    2. Extract close-message git metadata helpers and rendering/normalization helpers into focused modules.
    3. Preserve public exports and close commit subject/body behavior covered by existing tests.
    4. Verify with close-message focused tests, typecheck, arch dependency check, lint, format, and hotspot threshold report.
    5. Open PR, wait for hosted checks, merge to main, close lifecycle, and clean merged worktree.

    Acceptance:
    - buildCloseCommitMessage and renderMergeMessage remain behavior-compatible.
    - close-message.ts drops below the runtime hotspot warning threshold.
    - hotspot runtime warning count decreases from 35 to 34.
  Verify Steps: |-
    PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-28T23:30:46.101Z — VERIFY — ok

    By: CODER

    Note: Verified close commit message decomposition. Commands passed: close-message focused vitest (34 tests), bun run typecheck, bun run arch:deps, bun run lint:core, bun run format:changed, hotspot report check. Runtime hotspot warnings decreased from 35 to 34; close-message.ts is 112 lines.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-28T23:26:21.679Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/hotspot-refactor-canonical/.agentplane/worktrees/202605282325-F3Q401-close-message-decomposition/.agentplane/tasks/202605282325-F3Q401/blueprint/resolved-snapshot.json
    - old_digest: d2a4d77317bd4c4639cbcd149e7addf6c4ac1ae678a924161de98ec91411ef99
    - current_digest: d2a4d77317bd4c4639cbcd149e7addf6c4ac1ae678a924161de98ec91411ef99
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605282325-F3Q401

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Close commit message decomposition

Decompose packages/agentplane/src/commands/guard/impl/close-message.ts by extracting git metadata and rendering helpers while preserving buildCloseCommitMessage/renderMergeMessage behavior.

## Scope

- In scope: Decompose packages/agentplane/src/commands/guard/impl/close-message.ts by extracting git metadata and rendering helpers while preserving buildCloseCommitMessage/renderMergeMessage behavior.
- Out of scope: unrelated refactors not required for "Close commit message decomposition".

## Plan

Plan:
1. Start branch_pr worktree for CODER using the route oracle.
2. Extract close-message git metadata helpers and rendering/normalization helpers into focused modules.
3. Preserve public exports and close commit subject/body behavior covered by existing tests.
4. Verify with close-message focused tests, typecheck, arch dependency check, lint, format, and hotspot threshold report.
5. Open PR, wait for hosted checks, merge to main, close lifecycle, and clean merged worktree.

Acceptance:
- buildCloseCommitMessage and renderMergeMessage remain behavior-compatible.
- close-message.ts drops below the runtime hotspot warning threshold.
- hotspot runtime warning count decreases from 35 to 34.

## Verify Steps

PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-28T23:30:46.101Z — VERIFY — ok

By: CODER

Note: Verified close commit message decomposition. Commands passed: close-message focused vitest (34 tests), bun run typecheck, bun run arch:deps, bun run lint:core, bun run format:changed, hotspot report check. Runtime hotspot warnings decreased from 35 to 34; close-message.ts is 112 lines.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-28T23:26:21.679Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/hotspot-refactor-canonical/.agentplane/worktrees/202605282325-F3Q401-close-message-decomposition/.agentplane/tasks/202605282325-F3Q401/blueprint/resolved-snapshot.json
- old_digest: d2a4d77317bd4c4639cbcd149e7addf6c4ac1ae678a924161de98ec91411ef99
- current_digest: d2a4d77317bd4c4639cbcd149e7addf6c4ac1ae678a924161de98ec91411ef99
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605282325-F3Q401

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
