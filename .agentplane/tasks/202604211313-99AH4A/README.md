---
id: "202604211313-99AH4A"
title: "Cache clack prompt import and baseline cold path"
result_summary: "Replaced repeated @clack/prompts dynamic imports with a cached promise helper and recorded current cold-path timings."
status: "DONE"
priority: "med"
owner: "CODER"
revision: 6
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
  state: "ok"
  updated_at: "2026-04-21T16:42:26.347Z"
  updated_by: "CODER"
  note: "Verified clack import cache: focused prompts tests passed (7 project/file executions, 60 tests); bun run bench:cli:cold passed with avg quickstart=300.959ms, task_list=318.248ms, task_search=302.917ms, task_next=272.514ms, preflight_quick=304.491ms; bun run typecheck passed; bun run lint:core passed; bun run format:check passed."
commit:
  hash: "a48b5b8bff569282dfe617e5e1cdd3378dde070f"
  message: "⚡ 99AH4A cli: cache clack prompt import"
comments:
  -
    author: "CODER"
    body: "Start: cache lazy clack prompt import and capture cold-path baseline."
  -
    author: "CODER"
    body: "Verified: cached clack prompt import. Checks: focused prompts tests; bun run bench:cli:cold; bun run typecheck; bun run lint:core; bun run format:check."
events:
  -
    type: "status"
    at: "2026-04-21T16:34:45.447Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: cache lazy clack prompt import and capture cold-path baseline."
  -
    type: "verify"
    at: "2026-04-21T16:42:26.347Z"
    author: "CODER"
    state: "ok"
    note: "Verified clack import cache: focused prompts tests passed (7 project/file executions, 60 tests); bun run bench:cli:cold passed with avg quickstart=300.959ms, task_list=318.248ms, task_search=302.917ms, task_next=272.514ms, preflight_quick=304.491ms; bun run typecheck passed; bun run lint:core passed; bun run format:check passed."
  -
    type: "status"
    at: "2026-04-21T16:42:34.175Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: cached clack prompt import. Checks: focused prompts tests; bun run bench:cli:cold; bun run typecheck; bun run lint:core; bun run format:check."
doc_version: 3
doc_updated_at: "2026-04-21T16:42:34.176Z"
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
    ### 2026-04-21T16:42:26.347Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified clack import cache: focused prompts tests passed (7 project/file executions, 60 tests); bun run bench:cli:cold passed with avg quickstart=300.959ms, task_list=318.248ms, task_search=302.917ms, task_next=272.514ms, preflight_quick=304.491ms; bun run typecheck passed; bun run lint:core passed; bun run format:check passed.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-21T16:34:45.455Z, excerpt_hash=sha256:252232f38bd1858b1b34c9248461d8ee98b9f1f936a15e26510a83cdc92a854b
    
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
### 2026-04-21T16:42:26.347Z — VERIFY — ok

By: CODER

Note: Verified clack import cache: focused prompts tests passed (7 project/file executions, 60 tests); bun run bench:cli:cold passed with avg quickstart=300.959ms, task_list=318.248ms, task_search=302.917ms, task_next=272.514ms, preflight_quick=304.491ms; bun run typecheck passed; bun run lint:core passed; bun run format:check passed.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-21T16:34:45.455Z, excerpt_hash=sha256:252232f38bd1858b1b34c9248461d8ee98b9f1f936a15e26510a83cdc92a854b

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
