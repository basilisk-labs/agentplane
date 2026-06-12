---
id: "202606081917-982PET"
title: "Expose loop CLI discovery and route planning"
status: "TODO"
priority: "high"
owner: "CODER"
revision: 4
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
  state: "approved"
  updated_at: "2026-06-12T10:24:28.984Z"
  updated_by: "ORCHESTRATOR"
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
doc_updated_at: "2026-06-12T10:24:09.315Z"
doc_updated_by: "PLANNER"
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
    1. Run `bun run --filter=agentplane test -- packages/agentplane/src/commands/loop packages/agentplane/src/loops`. Expected: loop list/show/explain/plan text and JSON command behavior are covered.
    2. Run `bun run docs:cli:check`. Expected: generated CLI docs include loop commands and remain current.
    3. Run `node .agentplane/policy/check-routing.mjs`. Expected: policy routing remains valid after command/catalog changes.
    4. Run `agentplane loop list --json` and a representative `agentplane loop plan ... --json` against a fixture or synthetic input. Expected: selected and rejected loop candidates include reviewable scores/reasons.
    5. Confirm planning remains read-only and does not create run artifacts or mutate task state.
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

1. Run `bun run --filter=agentplane test -- packages/agentplane/src/commands/loop packages/agentplane/src/loops`. Expected: loop list/show/explain/plan text and JSON command behavior are covered.
2. Run `bun run docs:cli:check`. Expected: generated CLI docs include loop commands and remain current.
3. Run `node .agentplane/policy/check-routing.mjs`. Expected: policy routing remains valid after command/catalog changes.
4. Run `agentplane loop list --json` and a representative `agentplane loop plan ... --json` against a fixture or synthetic input. Expected: selected and rejected loop candidates include reviewable scores/reasons.
5. Confirm planning remains read-only and does not create run artifacts or mutate task state.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
