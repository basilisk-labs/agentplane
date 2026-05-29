---
id: "202605290229-K1E9GB"
title: "Prompt module validation decomposition"
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
  - "prompt-modules"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-29T02:29:23.246Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-29T02:35:06.121Z"
  updated_by: "CODER"
  note: "Verified prompt module validation decomposition. Commands passed: bunx vitest run packages/agentplane/src/runtime/prompt-modules/model.test.ts packages/agentplane/src/runtime/prompt-modules/mutations.test.ts packages/agentplane/src/runtime/prompt-modules/registry.test.ts --config vitest.workspace.ts (13 tests), bun run typecheck, bun run arch:check, bun run knip:check, bun run lint:core, bun run format:changed, bun run hotspots:check. Runtime hotspot warnings decreased from 23 to 22; validation.ts is 342 lines, below the 400-line warning threshold."
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: decompose prompt module validation constants and primitive guards while preserving public validation exports and runtime behavior."
events:
  -
    type: "status"
    at: "2026-05-29T02:29:48.514Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: decompose prompt module validation constants and primitive guards while preserving public validation exports and runtime behavior."
  -
    type: "verify"
    at: "2026-05-29T02:35:06.121Z"
    author: "CODER"
    state: "ok"
    note: "Verified prompt module validation decomposition. Commands passed: bunx vitest run packages/agentplane/src/runtime/prompt-modules/model.test.ts packages/agentplane/src/runtime/prompt-modules/mutations.test.ts packages/agentplane/src/runtime/prompt-modules/registry.test.ts --config vitest.workspace.ts (13 tests), bun run typecheck, bun run arch:check, bun run knip:check, bun run lint:core, bun run format:changed, bun run hotspots:check. Runtime hotspot warnings decreased from 23 to 22; validation.ts is 342 lines, below the 400-line warning threshold."
doc_version: 3
doc_updated_at: "2026-05-29T02:35:06.148Z"
doc_updated_by: "CODER"
description: "Decompose packages/agentplane/src/runtime/prompt-modules/validation.ts by extracting prompt module validation constants and primitive field guards while preserving runtime prompt module, mutation set, and compiled graph validation behavior."
sections:
  Summary: |-
    Prompt module validation decomposition

    Decompose packages/agentplane/src/runtime/prompt-modules/validation.ts by extracting prompt module validation constants and primitive field guards while preserving runtime prompt module, mutation set, and compiled graph validation behavior.
  Scope: |-
    - In scope: Decompose packages/agentplane/src/runtime/prompt-modules/validation.ts by extracting prompt module validation constants and primitive field guards while preserving runtime prompt module, mutation set, and compiled graph validation behavior.
    - Out of scope: unrelated refactors not required for "Prompt module validation decomposition".
  Plan: |-
    Plan:
    1. Start a branch_pr worktree for CODER.
    2. Extract prompt module validation enum domains and primitive guard helpers from packages/agentplane/src/runtime/prompt-modules/validation.ts into focused modules.
    3. Preserve validatePromptModule, validatePromptModuleMutationSet, validatePromptModuleCompiledGraph, and ValidatedPromptModuleMutation exports and behavior.
    4. Verify with prompt module model/mutation/registry tests, typecheck, arch/knip/lint/format, and hotspot threshold report.
    5. Open PR, wait for hosted checks, merge to main, close lifecycle, and clean worktree.

    Acceptance:
    - Prompt module validation tests remain compatible, including negative-path validation errors.
    - validation.ts drops below the 400-line hotspot warning threshold.
    - Runtime hotspot warning count decreases from 23 to 22 without introducing new warning-sized runtime modules.
    - No compiler, registry, schema, or mutation semantics change beyond shared helper imports.
  Verify Steps: |-
    PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-29T02:35:06.121Z — VERIFY — ok

    By: CODER

    Note: Verified prompt module validation decomposition. Commands passed: bunx vitest run packages/agentplane/src/runtime/prompt-modules/model.test.ts packages/agentplane/src/runtime/prompt-modules/mutations.test.ts packages/agentplane/src/runtime/prompt-modules/registry.test.ts --config vitest.workspace.ts (13 tests), bun run typecheck, bun run arch:check, bun run knip:check, bun run lint:core, bun run format:changed, bun run hotspots:check. Runtime hotspot warnings decreased from 23 to 22; validation.ts is 342 lines, below the 400-line warning threshold.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-29T02:29:48.514Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: .agentplane/tasks/202605290229-K1E9GB/blueprint/resolved-snapshot.json
    - old_digest: 771cbd40ebe2e3d9d8f16c2bce9a3f2c1386d4ca8e48c4095af84fb1c10b9b6e
    - current_digest: 771cbd40ebe2e3d9d8f16c2bce9a3f2c1386d4ca8e48c4095af84fb1c10b9b6e
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605290229-K1E9GB

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Prompt module validation decomposition

Decompose packages/agentplane/src/runtime/prompt-modules/validation.ts by extracting prompt module validation constants and primitive field guards while preserving runtime prompt module, mutation set, and compiled graph validation behavior.

## Scope

- In scope: Decompose packages/agentplane/src/runtime/prompt-modules/validation.ts by extracting prompt module validation constants and primitive field guards while preserving runtime prompt module, mutation set, and compiled graph validation behavior.
- Out of scope: unrelated refactors not required for "Prompt module validation decomposition".

## Plan

Plan:
1. Start a branch_pr worktree for CODER.
2. Extract prompt module validation enum domains and primitive guard helpers from packages/agentplane/src/runtime/prompt-modules/validation.ts into focused modules.
3. Preserve validatePromptModule, validatePromptModuleMutationSet, validatePromptModuleCompiledGraph, and ValidatedPromptModuleMutation exports and behavior.
4. Verify with prompt module model/mutation/registry tests, typecheck, arch/knip/lint/format, and hotspot threshold report.
5. Open PR, wait for hosted checks, merge to main, close lifecycle, and clean worktree.

Acceptance:
- Prompt module validation tests remain compatible, including negative-path validation errors.
- validation.ts drops below the 400-line hotspot warning threshold.
- Runtime hotspot warning count decreases from 23 to 22 without introducing new warning-sized runtime modules.
- No compiler, registry, schema, or mutation semantics change beyond shared helper imports.

## Verify Steps

PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-29T02:35:06.121Z — VERIFY — ok

By: CODER

Note: Verified prompt module validation decomposition. Commands passed: bunx vitest run packages/agentplane/src/runtime/prompt-modules/model.test.ts packages/agentplane/src/runtime/prompt-modules/mutations.test.ts packages/agentplane/src/runtime/prompt-modules/registry.test.ts --config vitest.workspace.ts (13 tests), bun run typecheck, bun run arch:check, bun run knip:check, bun run lint:core, bun run format:changed, bun run hotspots:check. Runtime hotspot warnings decreased from 23 to 22; validation.ts is 342 lines, below the 400-line warning threshold.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-29T02:29:48.514Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

Details:

BlueprintSnapshotRef:
- state: current
- path: .agentplane/tasks/202605290229-K1E9GB/blueprint/resolved-snapshot.json
- old_digest: 771cbd40ebe2e3d9d8f16c2bce9a3f2c1386d4ca8e48c4095af84fb1c10b9b6e
- current_digest: 771cbd40ebe2e3d9d8f16c2bce9a3f2c1386d4ca8e48c4095af84fb1c10b9b6e
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605290229-K1E9GB

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
