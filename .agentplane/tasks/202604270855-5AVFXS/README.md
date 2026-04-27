---
id: "202604270855-5AVFXS"
title: "Consolidate freshness and sync script helpers"
status: "TODO"
priority: "med"
owner: "CODER"
revision: 3
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "tooling"
verify:
  - "bun run agents:check"
  - "bun run docs:scripts:check"
  - "bun run schemas:check"
plan_approval:
  state: "approved"
  updated_at: "2026-04-27T08:56:48.964Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit: null
comments: []
events: []
doc_version: 3
doc_updated_at: "2026-04-27T08:56:47.589Z"
doc_updated_by: "PLANNER"
description: "Create shared helper primitives for generated artifact freshness checks and mirror sync scripts so docs, schema, recipe inventory, and agent template checks reuse one compare/generate/report pattern."
sections:
  Summary: |-
    Consolidate freshness and sync script helpers
    
    Create shared helper primitives for generated artifact freshness checks and mirror sync scripts so docs, schema, recipe inventory, and agent template checks reuse one compare/generate/report pattern.
  Scope: |-
    - In scope: Create shared helper primitives for generated artifact freshness checks and mirror sync scripts so docs, schema, recipe inventory, and agent template checks reuse one compare/generate/report pattern.
    - Out of scope: unrelated refactors not required for "Consolidate freshness and sync script helpers".
  Plan: "1. Inventory generated-doc freshness and mirror sync scripts with the same generate-compare-report pattern. 2. Create a shared helper for temp generation, stable compare, and concise drift reporting. 3. Migrate one docs freshness check and one sync/check script as representatives. 4. Preserve command output and failure behavior. 5. Verify docs/scripts, schemas, and agents checks."
  Verify Steps: |-
    1. Run `bun run docs:scripts:check`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `bun run schemas:check`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Run `bun run agents:check`. Expected: it succeeds and confirms the requested outcome for this task.
    4. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    5. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
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

Consolidate freshness and sync script helpers

Create shared helper primitives for generated artifact freshness checks and mirror sync scripts so docs, schema, recipe inventory, and agent template checks reuse one compare/generate/report pattern.

## Scope

- In scope: Create shared helper primitives for generated artifact freshness checks and mirror sync scripts so docs, schema, recipe inventory, and agent template checks reuse one compare/generate/report pattern.
- Out of scope: unrelated refactors not required for "Consolidate freshness and sync script helpers".

## Plan

1. Inventory generated-doc freshness and mirror sync scripts with the same generate-compare-report pattern. 2. Create a shared helper for temp generation, stable compare, and concise drift reporting. 3. Migrate one docs freshness check and one sync/check script as representatives. 4. Preserve command output and failure behavior. 5. Verify docs/scripts, schemas, and agents checks.

## Verify Steps

1. Run `bun run docs:scripts:check`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `bun run schemas:check`. Expected: it succeeds and confirms the requested outcome for this task.
3. Run `bun run agents:check`. Expected: it succeeds and confirms the requested outcome for this task.
4. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
5. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
