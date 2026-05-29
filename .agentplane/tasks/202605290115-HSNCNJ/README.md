---
id: "202605290115-HSNCNJ"
title: "Init execution decomposition"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 4
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "hotspot"
  - "init"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-29T01:16:08.138Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: decompose init execution planning helpers in a task worktree, preserve init behavior, and verify hotspot reduction with focused init tests plus static checks."
events:
  -
    type: "status"
    at: "2026-05-29T01:16:22.265Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: decompose init execution planning helpers in a task worktree, preserve init behavior, and verify hotspot reduction with focused init tests plus static checks."
doc_version: 3
doc_updated_at: "2026-05-29T01:16:22.265Z"
doc_updated_by: "CODER"
description: "Decompose packages/agentplane/src/cli/run-cli/commands/init/execution.ts by extracting focused init planning/effect helpers while preserving init behavior and reducing the runtime hotspot warning count."
sections:
  Summary: |-
    Init execution decomposition

    Decompose packages/agentplane/src/cli/run-cli/commands/init/execution.ts by extracting focused init planning/effect helpers while preserving init behavior and reducing the runtime hotspot warning count.
  Scope: |-
    - In scope: Decompose packages/agentplane/src/cli/run-cli/commands/init/execution.ts by extracting focused init planning/effect helpers while preserving init behavior and reducing the runtime hotspot warning count.
    - Out of scope: unrelated refactors not required for "Init execution decomposition".
  Plan: |-
    Plan:
    1. Start a branch_pr worktree for CODER.
    2. Extract init execution planning helpers from packages/agentplane/src/cli/run-cli/commands/init/execution.ts into focused modules for path/effect/plan support.
    3. Preserve public exports and init behavior for plan/apply/preview flows.
    4. Verify with init execution tests, init CLI focused tests, typecheck, arch/knip/lint/format, and hotspot threshold report.
    5. Open PR, wait for hosted checks, merge to main, close lifecycle, and clean worktree.

    Acceptance:
    - Init planning/apply behavior remains compatible.
    - execution.ts drops below the 400-line hotspot warning threshold.
    - Runtime hotspot warning count decreases from 27 to 26 without introducing new warning-sized runtime modules.
    - No unrelated task or release surface changes.
  Verify Steps: |-
    PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Init execution decomposition

Decompose packages/agentplane/src/cli/run-cli/commands/init/execution.ts by extracting focused init planning/effect helpers while preserving init behavior and reducing the runtime hotspot warning count.

## Scope

- In scope: Decompose packages/agentplane/src/cli/run-cli/commands/init/execution.ts by extracting focused init planning/effect helpers while preserving init behavior and reducing the runtime hotspot warning count.
- Out of scope: unrelated refactors not required for "Init execution decomposition".

## Plan

Plan:
1. Start a branch_pr worktree for CODER.
2. Extract init execution planning helpers from packages/agentplane/src/cli/run-cli/commands/init/execution.ts into focused modules for path/effect/plan support.
3. Preserve public exports and init behavior for plan/apply/preview flows.
4. Verify with init execution tests, init CLI focused tests, typecheck, arch/knip/lint/format, and hotspot threshold report.
5. Open PR, wait for hosted checks, merge to main, close lifecycle, and clean worktree.

Acceptance:
- Init planning/apply behavior remains compatible.
- execution.ts drops below the 400-line hotspot warning threshold.
- Runtime hotspot warning count decreases from 27 to 26 without introducing new warning-sized runtime modules.
- No unrelated task or release surface changes.

## Verify Steps

PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
