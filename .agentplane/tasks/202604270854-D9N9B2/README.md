---
id: "202604270854-D9N9B2"
title: "Introduce runner run repository contracts"
status: "TODO"
priority: "med"
owner: "CODER"
revision: 3
origin:
  system: "manual"
depends_on:
  - "202604270853-ZDBDWP"
tags:
  - "code"
  - "runner"
verify:
  - "bun run typecheck"
  - "bun test packages/agentplane/src/runner packages/agentplane/src/cli/run-cli.core.tasks.query-run*.test.ts"
plan_approval:
  state: "approved"
  updated_at: "2026-04-27T08:56:45.995Z"
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
doc_updated_at: "2026-04-27T08:56:44.522Z"
doc_updated_by: "PLANNER"
description: "Introduce RunnerRunRepository and TaskRunnerProjection contracts so runner invocation, result semantics, and task projection derive from one persisted run source rather than mutable config reconstruction and adapter-specific result interpretation."
sections:
  Summary: |-
    Introduce runner run repository contracts
    
    Introduce RunnerRunRepository and TaskRunnerProjection contracts so runner invocation, result semantics, and task projection derive from one persisted run source rather than mutable config reconstruction and adapter-specific result interpretation.
  Scope: |-
    - In scope: Introduce RunnerRunRepository and TaskRunnerProjection contracts so runner invocation, result semantics, and task projection derive from one persisted run source rather than mutable config reconstruction and adapter-specific result interpretation.
    - Out of scope: unrelated refactors not required for "Introduce runner run repository contracts".
  Plan: "1. Identify runner invocation/result persistence seams and adapter-specific success interpretation. 2. Introduce narrow RunnerRunRepository and TaskRunnerProjection contracts without replacing all runner storage. 3. Wire one low-risk read/write path to the contracts. 4. Add coverage for canonical invocation/result projection. 5. Verify runner tests and typecheck."
  Verify Steps: |-
    1. Run `bun test packages/agentplane/src/runner packages/agentplane/src/cli/run-cli.core.tasks.query-run*.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
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

Introduce runner run repository contracts

Introduce RunnerRunRepository and TaskRunnerProjection contracts so runner invocation, result semantics, and task projection derive from one persisted run source rather than mutable config reconstruction and adapter-specific result interpretation.

## Scope

- In scope: Introduce RunnerRunRepository and TaskRunnerProjection contracts so runner invocation, result semantics, and task projection derive from one persisted run source rather than mutable config reconstruction and adapter-specific result interpretation.
- Out of scope: unrelated refactors not required for "Introduce runner run repository contracts".

## Plan

1. Identify runner invocation/result persistence seams and adapter-specific success interpretation. 2. Introduce narrow RunnerRunRepository and TaskRunnerProjection contracts without replacing all runner storage. 3. Wire one low-risk read/write path to the contracts. 4. Add coverage for canonical invocation/result projection. 5. Verify runner tests and typecheck.

## Verify Steps

1. Run `bun test packages/agentplane/src/runner packages/agentplane/src/cli/run-cli.core.tasks.query-run*.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
3. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
4. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
