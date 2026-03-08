---
id: "202603080540-AZY271"
title: "P0: split upgrade orchestration into source plan apply report modules"
status: "DOING"
priority: "high"
owner: "CODER"
depends_on: []
tags:
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-08T05:50:33.517Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-08T06:02:35.675Z"
  updated_by: "CODER"
  note: "Upgrade orchestration was split into dedicated source/report/apply/type modules. Targeted upgrade unit tests passed, upgrade integration tests passed, lint passed, TypeScript noEmit passed, agentplane build passed, and the broad run-cli init/upgrade/backend file passed in fork mode after confirming the thread-only failure was an unrelated process.chdir test-runner limitation."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: extracting upgrade source/download resolution into dedicated modules, then splitting plan/apply/report orchestration while preserving current CLI behavior and merge semantics."
events:
  -
    type: "status"
    at: "2026-03-08T05:50:38.815Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: extracting upgrade source/download resolution into dedicated modules, then splitting plan/apply/report orchestration while preserving current CLI behavior and merge semantics."
  -
    type: "verify"
    at: "2026-03-08T06:02:35.675Z"
    author: "CODER"
    state: "ok"
    note: "Upgrade orchestration was split into dedicated source/report/apply/type modules. Targeted upgrade unit tests passed, upgrade integration tests passed, lint passed, TypeScript noEmit passed, agentplane build passed, and the broad run-cli init/upgrade/backend file passed in fork mode after confirming the thread-only failure was an unrelated process.chdir test-runner limitation."
doc_version: 2
doc_updated_at: "2026-03-08T06:02:35.676Z"
doc_updated_by: "CODER"
description: "Refactor commands/upgrade.ts into narrower units for source resolution, plan construction, apply execution, and reporting while preserving behavior and tests."
id_source: "generated"
---
## Summary

P0: split upgrade orchestration into source plan apply report modules

Refactor commands/upgrade.ts into narrower units for source resolution, plan construction, apply execution, and reporting while preserving behavior and tests.

## Scope

- In scope: Refactor commands/upgrade.ts into narrower units for source resolution, plan construction, apply execution, and reporting while preserving behavior and tests..
- Out of scope: unrelated refactors not required for "P0: split upgrade orchestration into source plan apply report modules".

## Plan

1. Inventory the current responsibilities inside commands/upgrade.ts and carve out the lowest-risk module boundaries: source resolution, plan creation, apply execution, and reporting. 2. Extract those helpers into dedicated modules while keeping command contracts, merge semantics, and tests stable. 3. Run targeted upgrade tests, lint, build, and a representative CLI upgrade flow to confirm no behavioral drift.

## Risks

- Risk: hidden regressions in touched paths.
- Mitigation: run required checks before finish and record evidence.

## Verify Steps

### Scope
- Primary tag: `code`

### Checks
- Add explicit checks/commands for this task before approval.

### Evidence / Commands
- Record executed commands and key outputs.

### Pass criteria
- Steps are reproducible and produce expected results.

## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-08T06:02:35.675Z — VERIFY — ok

By: CODER

Note: Upgrade orchestration was split into dedicated source/report/apply/type modules. Targeted upgrade unit tests passed, upgrade integration tests passed, lint passed, TypeScript noEmit passed, agentplane build passed, and the broad run-cli init/upgrade/backend file passed in fork mode after confirming the thread-only failure was an unrelated process.chdir test-runner limitation.

VerifyStepsRef: doc_version=2, doc_updated_at=2026-03-08T05:50:38.815Z, excerpt_hash=sha256:682d5674a3bb4d925efca0f9cabc057c814315f01dc448e2879b94eecb1a7911

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.
