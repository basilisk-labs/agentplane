---
id: "202604171502-509WF4"
title: "Consolidate freshness and generator scripts under scripts/lib"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 4
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "scripts"
  - "tooling"
verify:
  - "bun run docs:cli:check"
  - "bun run docs:recipes:check"
  - "bun run lint:core"
  - "bun run schemas:check"
plan_approval:
  state: "approved"
  updated_at: "2026-04-17T15:26:30.085Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit: null
comments:
  -
    author: "CODER"
    body: "Start: consolidating freshness and generator script helpers under scripts/lib while preserving current docs, recipe, lint, and schema command contracts."
events:
  -
    type: "status"
    at: "2026-04-17T15:26:51.394Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: consolidating freshness and generator script helpers under scripts/lib while preserving current docs, recipe, lint, and schema command contracts."
doc_version: 3
doc_updated_at: "2026-04-17T15:26:51.400Z"
doc_updated_by: "CODER"
description: "Extract shared argv, generation, and freshness-comparison helpers for schema, CLI docs, recipes inventory, and related scripts so scripts stop reimplementing the same control flow."
sections:
  Summary: |-
    Consolidate freshness and generator scripts under scripts/lib
    
    Extract shared argv, generation, and freshness-comparison helpers for schema, CLI docs, recipes inventory, and related scripts so scripts stop reimplementing the same control flow.
  Scope: |-
    - In scope: Extract shared argv, generation, and freshness-comparison helpers for schema, CLI docs, recipes inventory, and related scripts so scripts stop reimplementing the same control flow.
    - Out of scope: unrelated refactors not required for "Consolidate freshness and generator scripts under scripts/lib".
  Plan: |-
    1. Identify repeated argv parsing, freshness comparison, and generated-versus-committed control flow across schema, CLI docs, and recipes scripts.
    2. Extract shared helpers into scripts/lib and migrate the smallest high-value script set first.
    3. Re-run schema and docs freshness checks plus lint to confirm behavior stays stable.
  Verify Steps: |-
    1. Run `bun run schemas:check`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `bun run docs:cli:check`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Run `bun run docs:recipes:check`. Expected: it succeeds and confirms the requested outcome for this task.
    4. Run `bun run lint:core`. Expected: it succeeds and confirms the requested outcome for this task.
    5. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    6. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
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

Consolidate freshness and generator scripts under scripts/lib

Extract shared argv, generation, and freshness-comparison helpers for schema, CLI docs, recipes inventory, and related scripts so scripts stop reimplementing the same control flow.

## Scope

- In scope: Extract shared argv, generation, and freshness-comparison helpers for schema, CLI docs, recipes inventory, and related scripts so scripts stop reimplementing the same control flow.
- Out of scope: unrelated refactors not required for "Consolidate freshness and generator scripts under scripts/lib".

## Plan

1. Identify repeated argv parsing, freshness comparison, and generated-versus-committed control flow across schema, CLI docs, and recipes scripts.
2. Extract shared helpers into scripts/lib and migrate the smallest high-value script set first.
3. Re-run schema and docs freshness checks plus lint to confirm behavior stays stable.

## Verify Steps

1. Run `bun run schemas:check`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `bun run docs:cli:check`. Expected: it succeeds and confirms the requested outcome for this task.
3. Run `bun run docs:recipes:check`. Expected: it succeeds and confirms the requested outcome for this task.
4. Run `bun run lint:core`. Expected: it succeeds and confirms the requested outcome for this task.
5. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
6. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
