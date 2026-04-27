---
id: "202604270853-ZDBDWP"
title: "Unify lifecycle mutations through transition service"
status: "TODO"
priority: "high"
owner: "CODER"
revision: 3
origin:
  system: "manual"
depends_on:
  - "202604270852-PR9VMK"
tags:
  - "code"
  - "workflow"
verify:
  - "bun run typecheck"
  - "bun test packages/agentplane/src/commands/task packages/agentplane/src/cli/run-cli.core.lifecycle*.test.ts"
plan_approval:
  state: "approved"
  updated_at: "2026-04-27T08:56:35.892Z"
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
doc_updated_at: "2026-04-27T08:56:34.199Z"
doc_updated_by: "PLANNER"
description: "Move remaining task lifecycle mutation paths toward the shared workflow transition service so finish, verify rework, close flows, and hosted closure share the same state transition and doc side-effect rules."
sections:
  Summary: |-
    Unify lifecycle mutations through transition service
    
    Move remaining task lifecycle mutation paths toward the shared workflow transition service so finish, verify rework, close flows, and hosted closure share the same state transition and doc side-effect rules.
  Scope: |-
    - In scope: Move remaining task lifecycle mutation paths toward the shared workflow transition service so finish, verify rework, close flows, and hosted closure share the same state transition and doc side-effect rules.
    - Out of scope: unrelated refactors not required for "Unify lifecycle mutations through transition service".
  Plan: "1. Identify remaining lifecycle commands that mutate task status, verification, commit, comments, and docs outside the transition service. 2. Move one coherent subset behind workflow-transition-service without changing public command semantics. 3. Preserve backend and README side-effect behavior through existing intent abstractions. 4. Add regression coverage for finish, verify rework, and close/hosted-close behavior touched by the change. 5. Verify focused lifecycle tests and typecheck."
  Verify Steps: |-
    1. Run `bun test packages/agentplane/src/commands/task packages/agentplane/src/cli/run-cli.core.lifecycle*.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
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

Unify lifecycle mutations through transition service

Move remaining task lifecycle mutation paths toward the shared workflow transition service so finish, verify rework, close flows, and hosted closure share the same state transition and doc side-effect rules.

## Scope

- In scope: Move remaining task lifecycle mutation paths toward the shared workflow transition service so finish, verify rework, close flows, and hosted closure share the same state transition and doc side-effect rules.
- Out of scope: unrelated refactors not required for "Unify lifecycle mutations through transition service".

## Plan

1. Identify remaining lifecycle commands that mutate task status, verification, commit, comments, and docs outside the transition service. 2. Move one coherent subset behind workflow-transition-service without changing public command semantics. 3. Preserve backend and README side-effect behavior through existing intent abstractions. 4. Add regression coverage for finish, verify rework, and close/hosted-close behavior touched by the change. 5. Verify focused lifecycle tests and typecheck.

## Verify Steps

1. Run `bun test packages/agentplane/src/commands/task packages/agentplane/src/cli/run-cli.core.lifecycle*.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
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
