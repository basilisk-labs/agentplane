---
id: "202605290043-M9K6C0"
title: "Preflight report command decomposition"
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
  - "refactor"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-29T00:43:18.820Z"
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
    body: "Start: Extract preflight report drift and message guard helpers while preserving buildPreflightReport output."
events:
  -
    type: "status"
    at: "2026-05-29T00:43:29.168Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Extract preflight report drift and message guard helpers while preserving buildPreflightReport output."
doc_version: 3
doc_updated_at: "2026-05-29T00:43:29.168Z"
doc_updated_by: "CODER"
description: "Decompose packages/agentplane/src/cli/run-cli/commands/core/preflight-report.ts into focused preflight report modules while preserving CLI behavior and reducing runtime hotspot warnings."
sections:
  Summary: |-
    Preflight report command decomposition

    Decompose packages/agentplane/src/cli/run-cli/commands/core/preflight-report.ts into focused preflight report modules while preserving CLI behavior and reducing runtime hotspot warnings.
  Scope: |-
    - In scope: Decompose packages/agentplane/src/cli/run-cli/commands/core/preflight-report.ts into focused preflight report modules while preserving CLI behavior and reducing runtime hotspot warnings.
    - Out of scope: unrelated refactors not required for "Preflight report command decomposition".
  Plan: |-
    Plan:
    1. Start branch_pr worktree for CODER.
    2. Extract preflight report task artifact drift classification and changed PR title guard into focused helper modules.
    3. Keep buildPreflightReport behavior and PreflightReport public type compatible.
    4. Verify with preflight/core tests, typecheck, arch/knip/lint/format, and hotspot threshold report.
    5. Open PR, wait for hosted checks, merge to main, close lifecycle, and clean worktree.

    Acceptance:
    - preflight report behavior remains compatible.
    - preflight-report.ts drops below the 400-line hotspot warning threshold.
    - runtime hotspot warning count decreases from 29 to 28 without adding new warning-sized runtime modules.
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

Preflight report command decomposition

Decompose packages/agentplane/src/cli/run-cli/commands/core/preflight-report.ts into focused preflight report modules while preserving CLI behavior and reducing runtime hotspot warnings.

## Scope

- In scope: Decompose packages/agentplane/src/cli/run-cli/commands/core/preflight-report.ts into focused preflight report modules while preserving CLI behavior and reducing runtime hotspot warnings.
- Out of scope: unrelated refactors not required for "Preflight report command decomposition".

## Plan

Plan:
1. Start branch_pr worktree for CODER.
2. Extract preflight report task artifact drift classification and changed PR title guard into focused helper modules.
3. Keep buildPreflightReport behavior and PreflightReport public type compatible.
4. Verify with preflight/core tests, typecheck, arch/knip/lint/format, and hotspot threshold report.
5. Open PR, wait for hosted checks, merge to main, close lifecycle, and clean worktree.

Acceptance:
- preflight report behavior remains compatible.
- preflight-report.ts drops below the 400-line hotspot warning threshold.
- runtime hotspot warning count decreases from 29 to 28 without adding new warning-sized runtime modules.

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
