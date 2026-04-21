---
id: "202604211316-KAPJPA"
title: "Add init v2 apply spinner wrapper"
status: "TODO"
priority: "med"
owner: "CODER"
revision: 3
origin:
  system: "manual"
depends_on:
  - "202604211316-5S3WXY"
tags:
  - "cli"
  - "code"
  - "init"
verify:
  - "bun run test:project -- cli-unit"
  - "bun run typecheck"
  - "bunx vitest run packages/agentplane/src/cli/run-cli/commands/init/steps/apply.test.ts --pool=forks --maxWorkers 4"
plan_approval:
  state: "approved"
  updated_at: "2026-04-21T13:16:20.730Z"
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
doc_updated_at: "2026-04-21T13:16:19.751Z"
doc_updated_by: "PLANNER"
description: "Add withStep spinner helper and wrap init v2 mutation writers with progress messages while keeping mutation functions unchanged."
sections:
  Summary: |-
    Add init v2 apply spinner wrapper
    
    Add withStep spinner helper and wrap init v2 mutation writers with progress messages while keeping mutation functions unchanged.
  Scope: |-
    - In scope: Add withStep spinner helper and wrap init v2 mutation writers with progress messages while keeping mutation functions unchanged.
    - Out of scope: unrelated refactors not required for "Add init v2 apply spinner wrapper".
  Plan: "Scope: implement atom #5. Steps: 1. Add steps/apply.ts with withStep helper that works with or without Clack. 2. Wire v2 install-plan application through spinner labels for config, agents, workflow, gitignore, hooks, IDE sync, recipes, and install commit. 3. Test success and failure spinner behavior. Acceptance: mutation side effects remain delegated to existing writer functions; tests prove spinner wrapper behavior."
  Verify Steps: |-
    1. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `bunx vitest run packages/agentplane/src/cli/run-cli/commands/init/steps/apply.test.ts --pool=forks --maxWorkers 4`. Expected: it succeeds and confirms the requested outcome for this task.
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

Add init v2 apply spinner wrapper

Add withStep spinner helper and wrap init v2 mutation writers with progress messages while keeping mutation functions unchanged.

## Scope

- In scope: Add withStep spinner helper and wrap init v2 mutation writers with progress messages while keeping mutation functions unchanged.
- Out of scope: unrelated refactors not required for "Add init v2 apply spinner wrapper".

## Plan

Scope: implement atom #5. Steps: 1. Add steps/apply.ts with withStep helper that works with or without Clack. 2. Wire v2 install-plan application through spinner labels for config, agents, workflow, gitignore, hooks, IDE sync, recipes, and install commit. 3. Test success and failure spinner behavior. Acceptance: mutation side effects remain delegated to existing writer functions; tests prove spinner wrapper behavior.

## Verify Steps

1. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `bunx vitest run packages/agentplane/src/cli/run-cli/commands/init/steps/apply.test.ts --pool=forks --maxWorkers 4`. Expected: it succeeds and confirms the requested outcome for this task.
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
