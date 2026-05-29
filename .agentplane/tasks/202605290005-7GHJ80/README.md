---
id: "202605290005-7GHJ80"
title: "Context verify-task validator decomposition"
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
  updated_at: "2026-05-29T00:05:22.661Z"
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
    body: "Start: Decompose context verify-task path policy and artifact validation helpers in the task worktree while preserving command behavior under focused tests."
events:
  -
    type: "status"
    at: "2026-05-29T00:05:45.102Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Decompose context verify-task path policy and artifact validation helpers in the task worktree while preserving command behavior under focused tests."
doc_version: 3
doc_updated_at: "2026-05-29T00:05:45.102Z"
doc_updated_by: "CODER"
description: "Decompose packages/agentplane/src/context/verify-task.ts by extracting path policy and artifact validation helpers while preserving context verify-task command behavior."
sections:
  Summary: |-
    Context verify-task validator decomposition

    Decompose packages/agentplane/src/context/verify-task.ts by extracting path policy and artifact validation helpers while preserving context verify-task command behavior.
  Scope: |-
    - In scope: Decompose packages/agentplane/src/context/verify-task.ts by extracting path policy and artifact validation helpers while preserving context verify-task command behavior.
    - Out of scope: unrelated refactors not required for "Context verify-task validator decomposition".
  Plan: |-
    Plan:
    1. Start branch_pr worktree for CODER.
    2. Extract verify-task path policy helpers and artifact validators into focused modules.
    3. Preserve cmdContextVerifyTask behavior and public command export.
    4. Verify with focused context verify-task tests, typecheck, arch/knip/lint/format, and hotspot threshold report.
    5. Open PR, wait for hosted checks, merge to main, close lifecycle, and clean merged worktree.

    Acceptance:
    - context verify-task validation behavior remains compatible.
    - verify-task.ts drops below the runtime hotspot warning threshold.
    - hotspot runtime warning count decreases from 32 to 31.
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

Context verify-task validator decomposition

Decompose packages/agentplane/src/context/verify-task.ts by extracting path policy and artifact validation helpers while preserving context verify-task command behavior.

## Scope

- In scope: Decompose packages/agentplane/src/context/verify-task.ts by extracting path policy and artifact validation helpers while preserving context verify-task command behavior.
- Out of scope: unrelated refactors not required for "Context verify-task validator decomposition".

## Plan

Plan:
1. Start branch_pr worktree for CODER.
2. Extract verify-task path policy helpers and artifact validators into focused modules.
3. Preserve cmdContextVerifyTask behavior and public command export.
4. Verify with focused context verify-task tests, typecheck, arch/knip/lint/format, and hotspot threshold report.
5. Open PR, wait for hosted checks, merge to main, close lifecycle, and clean merged worktree.

Acceptance:
- context verify-task validation behavior remains compatible.
- verify-task.ts drops below the runtime hotspot warning threshold.
- hotspot runtime warning count decreases from 32 to 31.

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
