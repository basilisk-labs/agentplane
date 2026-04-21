---
id: "202604211313-99AH4A"
title: "Cache clack prompt import and baseline cold path"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 4
origin:
  system: "manual"
depends_on:
  - "202604211312-4PXEBW"
tags:
  - "cli"
  - "code"
  - "perf"
verify:
  - "bun run bench:cli:cold"
  - "bun run test:project -- cli-unit"
  - "bun run typecheck"
plan_approval:
  state: "approved"
  updated_at: "2026-04-21T13:13:10.918Z"
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
    body: "Start: cache lazy clack prompt import and capture cold-path baseline."
events:
  -
    type: "status"
    at: "2026-04-21T16:34:45.447Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: cache lazy clack prompt import and capture cold-path baseline."
doc_version: 3
doc_updated_at: "2026-04-21T16:34:45.455Z"
doc_updated_by: "CODER"
description: "Replace repeated lazy @clack/prompts import calls with a cached getClack helper and record a current CLI cold-start baseline before bundling."
sections:
  Summary: |-
    Cache clack prompt import and baseline cold path
    
    Replace repeated lazy @clack/prompts import calls with a cached getClack helper and record a current CLI cold-start baseline before bundling.
  Scope: |-
    - In scope: Replace repeated lazy @clack/prompts import calls with a cached getClack helper and record a current CLI cold-start baseline before bundling.
    - Out of scope: unrelated refactors not required for "Cache clack prompt import and baseline cold path".
  Plan: "Scope: low-risk cold-start cleanup before CLI bundling. Steps: 1. Implement a cached getClack/loadClack helper respecting shouldUseClackPrompts. 2. Update promptChoice/promptYesNo/promptInput callsites. 3. Run the cold-path measurement script and record baseline in task evidence or benchmark artifact if one exists. Acceptance: prompt behavior unchanged; cold measurement command succeeds; no duplicate dynamic import wrapper remains."
  Verify Steps: |-
    1. Run `bun run bench:cli:cold`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Run `bun run test:project -- cli-unit`. Expected: it succeeds and confirms the requested outcome for this task.
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

Cache clack prompt import and baseline cold path

Replace repeated lazy @clack/prompts import calls with a cached getClack helper and record a current CLI cold-start baseline before bundling.

## Scope

- In scope: Replace repeated lazy @clack/prompts import calls with a cached getClack helper and record a current CLI cold-start baseline before bundling.
- Out of scope: unrelated refactors not required for "Cache clack prompt import and baseline cold path".

## Plan

Scope: low-risk cold-start cleanup before CLI bundling. Steps: 1. Implement a cached getClack/loadClack helper respecting shouldUseClackPrompts. 2. Update promptChoice/promptYesNo/promptInput callsites. 3. Run the cold-path measurement script and record baseline in task evidence or benchmark artifact if one exists. Acceptance: prompt behavior unchanged; cold measurement command succeeds; no duplicate dynamic import wrapper remains.

## Verify Steps

1. Run `bun run bench:cli:cold`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
3. Run `bun run test:project -- cli-unit`. Expected: it succeeds and confirms the requested outcome for this task.
4. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
5. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
