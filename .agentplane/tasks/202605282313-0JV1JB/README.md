---
id: "202605282313-0JV1JB"
title: "Harvest task artifacts decomposition"
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
  updated_at: "2026-05-28T23:13:35.186Z"
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
    body: "Start: Decompose harvest task artifact model and builders in the task worktree, preserving the existing context harvest tasks API and verifying focused behavior before opening the PR."
events:
  -
    type: "status"
    at: "2026-05-28T23:13:46.745Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Decompose harvest task artifact model and builders in the task worktree, preserving the existing context harvest tasks API and verifying focused behavior before opening the PR."
doc_version: 3
doc_updated_at: "2026-05-28T23:13:46.745Z"
doc_updated_by: "CODER"
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
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
