---
id: "202606081917-982PET"
title: "Expose loop CLI discovery and route planning"
status: "TODO"
priority: "high"
owner: "CODER"
revision: 2
origin:
  system: "manual"
depends_on:
  - "202606081917-BASAPD"
tags:
  - "cli"
  - "code"
  - "loops"
task_kind: "code"
mutation_scope: "code"
verify:
  - "bun run --filter=agentplane test -- packages/agentplane/src/cli/run-cli.core.loop.test.ts"
  - "bun run docs:cli:check"
plan_approval:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
  attempts: 0
commit: null
comments: []
events: []
doc_version: 3
doc_updated_at: "2026-06-08T19:19:02.386Z"
doc_updated_by: "ORCHESTRATOR"
description: "Add agentplane loop list/show/explain/plan commands that inspect built-in and project-local loops, score candidates against task or synthetic input, and print reviewable route explanations."
sections:
  Summary: |-
    Expose loop CLI discovery and route planning

    Add agentplane loop list/show/explain/plan commands that inspect built-in and project-local loops, score candidates against task or synthetic input, and print reviewable route explanations.
  Scope: |-
    - In scope: Add agentplane loop list/show/explain/plan commands that inspect built-in and project-local loops, score candidates against task or synthetic input, and print reviewable route explanations.
    - Out of scope: unrelated refactors not required for "Expose loop CLI discovery and route planning".
  Plan: |-
    1. Add a loop command group following the existing blueprint command style.
    2. Implement loop list/show/explain for built-in and optional project-local specs.
    3. Implement loop plan for task ids and synthetic input, including selected/rejected candidate explanation and JSON output.
    4. Add command catalog/loaders and help/docs generation integration.
    5. Add CLI tests for text and JSON output.
  Verify Steps: |-
    PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

    1. Run `bun run --filter=agentplane test -- packages/agentplane/src/cli/run-cli.core.loop.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `bun run docs:cli:check`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    4. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
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

Expose loop CLI discovery and route planning

Add agentplane loop list/show/explain/plan commands that inspect built-in and project-local loops, score candidates against task or synthetic input, and print reviewable route explanations.

## Scope

- In scope: Add agentplane loop list/show/explain/plan commands that inspect built-in and project-local loops, score candidates against task or synthetic input, and print reviewable route explanations.
- Out of scope: unrelated refactors not required for "Expose loop CLI discovery and route planning".

## Plan

1. Add a loop command group following the existing blueprint command style.
2. Implement loop list/show/explain for built-in and optional project-local specs.
3. Implement loop plan for task ids and synthetic input, including selected/rejected candidate explanation and JSON output.
4. Add command catalog/loaders and help/docs generation integration.
5. Add CLI tests for text and JSON output.

## Verify Steps

PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

1. Run `bun run --filter=agentplane test -- packages/agentplane/src/cli/run-cli.core.loop.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `bun run docs:cli:check`. Expected: it succeeds and confirms the requested outcome for this task.
3. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
4. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
