---
id: "202605290253-8GE5QM"
title: "ACR generate decomposition"
result_summary: "Merged via PR #4262."
status: "DONE"
priority: "med"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "acr"
  - "code"
  - "hotspot"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-29T02:53:49.093Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-29T02:59:55.667Z"
  updated_by: "CODER"
  note: "Verified ACR generate decomposition. Commands passed: bunx vitest run packages/agentplane/src/commands/acr/acr.command.test.ts packages/agentplane/src/commands/task/finish.validation.unit.test.ts --config vitest.workspace.ts (33 tests), bun run typecheck, bun run arch:check, bun run knip:check, bun run lint:core, bun run format:changed, bun run hotspots:check. Runtime hotspot warnings decreased from 21 to 20; generate.ts is 341 lines, below the 400-line warning threshold."
  attempts: 0
commit:
  hash: "6eb102d43ddae733552450b6adb9993fb6e75fcc"
  message: "✅ 8GE5QM acr: record verification"
comments:
  -
    author: "CODER"
    body: "Start: decompose ACR generate helpers while preserving generated record behavior and digest validation."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #4262 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "status"
    at: "2026-05-29T02:54:05.771Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: decompose ACR generate helpers while preserving generated record behavior and digest validation."
  -
    type: "verify"
    at: "2026-05-29T02:59:55.667Z"
    author: "CODER"
    state: "ok"
    note: "Verified ACR generate decomposition. Commands passed: bunx vitest run packages/agentplane/src/commands/acr/acr.command.test.ts packages/agentplane/src/commands/task/finish.validation.unit.test.ts --config vitest.workspace.ts (33 tests), bun run typecheck, bun run arch:check, bun run knip:check, bun run lint:core, bun run format:changed, bun run hotspots:check. Runtime hotspot warnings decreased from 21 to 20; generate.ts is 341 lines, below the 400-line warning threshold."
  -
    type: "status"
    at: "2026-05-29T03:05:45.297Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #4262 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-05-29T03:05:45.302Z"
doc_updated_by: "INTEGRATOR"
description: "Decompose packages/agentplane/src/commands/acr/generate.ts by extracting ACR extension and residual-risk helpers while preserving generated Agent Change Record behavior."
sections:
  Summary: |-
    ACR generate decomposition

    Decompose packages/agentplane/src/commands/acr/generate.ts by extracting ACR extension and residual-risk helpers while preserving generated Agent Change Record behavior.
  Scope: |-
    - In scope: Decompose packages/agentplane/src/commands/acr/generate.ts by extracting ACR extension and residual-risk helpers while preserving generated Agent Change Record behavior.
    - Out of scope: unrelated refactors not required for "ACR generate decomposition".
  Plan: |-
    Plan:
    1. Start a branch_pr worktree for CODER.
    2. Extract ACR blueprint/context extension projection and residual-risk/check helper logic from packages/agentplane/src/commands/acr/generate.ts into focused modules.
    3. Preserve generateAcr public API, ACR schema validation, record digest behavior, and output path behavior.
    4. Verify with ACR command tests, typecheck, arch/knip/lint/format, and hotspot threshold report.
    5. Open PR, wait for hosted checks, merge to main, close lifecycle, and clean worktree.

    Acceptance:
    - Generated ACR records remain schema-valid and digest-compatible for existing tests.
    - generate.ts drops below the 400-line hotspot warning threshold.
    - Runtime hotspot warning count decreases from 21 to 20 without introducing new warning-sized runtime modules.
    - No unrelated ACR validate, diff, remediation, or CLI parsing changes.
  Verify Steps: |-
    PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-29T02:59:55.667Z — VERIFY — ok

    By: CODER

    Note: Verified ACR generate decomposition. Commands passed: bunx vitest run packages/agentplane/src/commands/acr/acr.command.test.ts packages/agentplane/src/commands/task/finish.validation.unit.test.ts --config vitest.workspace.ts (33 tests), bun run typecheck, bun run arch:check, bun run knip:check, bun run lint:core, bun run format:changed, bun run hotspots:check. Runtime hotspot warnings decreased from 21 to 20; generate.ts is 341 lines, below the 400-line warning threshold.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-29T02:54:05.771Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: .agentplane/tasks/202605290253-8GE5QM/blueprint/resolved-snapshot.json
    - old_digest: 8726c91028e18312e5e6027e4b9769ca4518eee90c3a0a74766df7c6a74a29b8
    - current_digest: 8726c91028e18312e5e6027e4b9769ca4518eee90c3a0a74766df7c6a74a29b8
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605290253-8GE5QM

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

ACR generate decomposition

Decompose packages/agentplane/src/commands/acr/generate.ts by extracting ACR extension and residual-risk helpers while preserving generated Agent Change Record behavior.

## Scope

- In scope: Decompose packages/agentplane/src/commands/acr/generate.ts by extracting ACR extension and residual-risk helpers while preserving generated Agent Change Record behavior.
- Out of scope: unrelated refactors not required for "ACR generate decomposition".

## Plan

Plan:
1. Start a branch_pr worktree for CODER.
2. Extract ACR blueprint/context extension projection and residual-risk/check helper logic from packages/agentplane/src/commands/acr/generate.ts into focused modules.
3. Preserve generateAcr public API, ACR schema validation, record digest behavior, and output path behavior.
4. Verify with ACR command tests, typecheck, arch/knip/lint/format, and hotspot threshold report.
5. Open PR, wait for hosted checks, merge to main, close lifecycle, and clean worktree.

Acceptance:
- Generated ACR records remain schema-valid and digest-compatible for existing tests.
- generate.ts drops below the 400-line hotspot warning threshold.
- Runtime hotspot warning count decreases from 21 to 20 without introducing new warning-sized runtime modules.
- No unrelated ACR validate, diff, remediation, or CLI parsing changes.

## Verify Steps

PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-29T02:59:55.667Z — VERIFY — ok

By: CODER

Note: Verified ACR generate decomposition. Commands passed: bunx vitest run packages/agentplane/src/commands/acr/acr.command.test.ts packages/agentplane/src/commands/task/finish.validation.unit.test.ts --config vitest.workspace.ts (33 tests), bun run typecheck, bun run arch:check, bun run knip:check, bun run lint:core, bun run format:changed, bun run hotspots:check. Runtime hotspot warnings decreased from 21 to 20; generate.ts is 341 lines, below the 400-line warning threshold.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-29T02:54:05.771Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

Details:

BlueprintSnapshotRef:
- state: current
- path: .agentplane/tasks/202605290253-8GE5QM/blueprint/resolved-snapshot.json
- old_digest: 8726c91028e18312e5e6027e4b9769ca4518eee90c3a0a74766df7c6a74a29b8
- current_digest: 8726c91028e18312e5e6027e4b9769ca4518eee90c3a0a74766df7c6a74a29b8
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605290253-8GE5QM

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
