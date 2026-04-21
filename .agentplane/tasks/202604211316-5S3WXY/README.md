---
id: "202604211316-5S3WXY"
title: "Add init v2 interactive conflict resolver"
status: "TODO"
priority: "med"
owner: "CODER"
revision: 3
origin:
  system: "manual"
depends_on:
  - "202604211316-H02C2T"
tags:
  - "cli"
  - "code"
  - "init"
verify:
  - "bun run test:project -- cli-unit"
  - "bun run typecheck"
  - "bunx vitest run packages/agentplane/src/cli/run-cli/commands/init/steps/conflict-resolver.test.ts --pool=forks --maxWorkers 4"
plan_approval:
  state: "approved"
  updated_at: "2026-04-21T13:16:14.162Z"
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
doc_updated_at: "2026-04-21T13:16:13.158Z"
doc_updated_by: "PLANNER"
description: "Add a Clack select-based conflict resolver for init v2 that supports overwrite, backup, and cancel choices when conflicts exist and --force/--backup are not set."
sections:
  Summary: |-
    Add init v2 interactive conflict resolver
    
    Add a Clack select-based conflict resolver for init v2 that supports overwrite, backup, and cancel choices when conflicts exist and --force/--backup are not set.
  Scope: |-
    - In scope: Add a Clack select-based conflict resolver for init v2 that supports overwrite, backup, and cancel choices when conflicts exist and --force/--backup are not set.
    - Out of scope: unrelated refactors not required for "Add init v2 interactive conflict resolver".
  Plan: "Scope: implement atom #4. Steps: 1. Add steps/conflict-resolver.ts with ConflictChoice type. 2. Render relative conflict paths in a Clack note. 3. Return overwrite/backup or throw InitAborted for cancel. 4. Test all three choices and empty-conflict behavior. Acceptance: resolver is isolated, unit-tested, and not wired into legacy init yet."
  Verify Steps: |-
    1. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `bunx vitest run packages/agentplane/src/cli/run-cli/commands/init/steps/conflict-resolver.test.ts --pool=forks --maxWorkers 4`. Expected: it succeeds and confirms the requested outcome for this task.
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

Add init v2 interactive conflict resolver

Add a Clack select-based conflict resolver for init v2 that supports overwrite, backup, and cancel choices when conflicts exist and --force/--backup are not set.

## Scope

- In scope: Add a Clack select-based conflict resolver for init v2 that supports overwrite, backup, and cancel choices when conflicts exist and --force/--backup are not set.
- Out of scope: unrelated refactors not required for "Add init v2 interactive conflict resolver".

## Plan

Scope: implement atom #4. Steps: 1. Add steps/conflict-resolver.ts with ConflictChoice type. 2. Render relative conflict paths in a Clack note. 3. Return overwrite/backup or throw InitAborted for cancel. 4. Test all three choices and empty-conflict behavior. Acceptance: resolver is isolated, unit-tested, and not wired into legacy init yet.

## Verify Steps

1. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `bunx vitest run packages/agentplane/src/cli/run-cli/commands/init/steps/conflict-resolver.test.ts --pool=forks --maxWorkers 4`. Expected: it succeeds and confirms the requested outcome for this task.
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
