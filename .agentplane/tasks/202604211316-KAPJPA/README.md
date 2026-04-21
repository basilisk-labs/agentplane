---
id: "202604211316-KAPJPA"
title: "Add init v2 apply spinner wrapper"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 5
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
  state: "ok"
  updated_at: "2026-04-21T16:25:40.497Z"
  updated_by: "CODER"
  note: "Added init v2 apply spinner wrapper (withStep + apply orchestration) with focused success/failure tests; typecheck, targeted apply test, and cli-unit passed."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: add init v2 apply spinner wrapper after conflict resolver is available."
events:
  -
    type: "status"
    at: "2026-04-21T16:19:42.873Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: add init v2 apply spinner wrapper after conflict resolver is available."
  -
    type: "verify"
    at: "2026-04-21T16:25:40.497Z"
    author: "CODER"
    state: "ok"
    note: "Added init v2 apply spinner wrapper (withStep + apply orchestration) with focused success/failure tests; typecheck, targeted apply test, and cli-unit passed."
doc_version: 3
doc_updated_at: "2026-04-21T16:25:40.507Z"
doc_updated_by: "CODER"
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
    ### 2026-04-21T16:25:40.497Z — VERIFY — ok

    By: CODER

    Note: Added init v2 apply spinner wrapper (withStep + apply orchestration) with focused success/failure tests; typecheck, targeted apply test, and cli-unit passed.

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-21T16:19:42.881Z, excerpt_hash=sha256:a67c33a6dc75f669c1951e1f437643311a6ab8c4c51fcfe858356ebaf71e6ce3

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
### 2026-04-21T16:25:40.497Z — VERIFY — ok

By: CODER

Note: Added init v2 apply spinner wrapper (withStep + apply orchestration) with focused success/failure tests; typecheck, targeted apply test, and cli-unit passed.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-21T16:19:42.881Z, excerpt_hash=sha256:a67c33a6dc75f669c1951e1f437643311a6ab8c4c51fcfe858356ebaf71e6ce3

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
