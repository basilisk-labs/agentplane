---
id: "202604211316-2FRTB3"
title: "Implement experimental init v2 orchestrator"
status: "TODO"
priority: "high"
owner: "CODER"
revision: 3
origin:
  system: "manual"
depends_on:
  - "202604211316-KAPJPA"
tags:
  - "cli"
  - "code"
  - "init"
verify:
  - "bun run test:project -- cli-core"
  - "bun run typecheck"
  - "bunx vitest run packages/agentplane/src/cli/run-cli.core.init.v2.test.ts --pool=forks --maxWorkers 4 --testTimeout 60000"
plan_approval:
  state: "approved"
  updated_at: "2026-04-21T13:16:27.289Z"
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
doc_updated_at: "2026-04-21T13:16:26.245Z"
doc_updated_by: "PLANNER"
description: "Add orchestrate-v2 flow behind AGENTPLANE_INIT_UI=v2 or --experimental-ui while legacy init remains the default path."
sections:
  Summary: |-
    Implement experimental init v2 orchestrator
    
    Add orchestrate-v2 flow behind AGENTPLANE_INIT_UI=v2 or --experimental-ui while legacy init remains the default path.
  Scope: |-
    - In scope: Add orchestrate-v2 flow behind AGENTPLANE_INIT_UI=v2 or --experimental-ui while legacy init remains the default path.
    - Out of scope: unrelated refactors not required for "Implement experimental init v2 orchestrator".
  Plan: "Scope: implement atom #6. Steps: 1. Add orchestrate-v2.ts using prompts-v2, ui-v2, step modules, preview, conflict resolver, and apply spinners. 2. Gate entry by env AGENTPLANE_INIT_UI=v2 and/or --experimental-ui. 3. Reuse existing mutation functions and config writers. 4. Add e2e coverage for the experimental path. Acceptance: legacy init tests still pass; v2 e2e proves preview/confirm/apply path."
  Verify Steps: |-
    1. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `bunx vitest run packages/agentplane/src/cli/run-cli.core.init.v2.test.ts --pool=forks --maxWorkers 4 --testTimeout 60000`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Run `bun run test:project -- cli-core`. Expected: it succeeds and confirms the requested outcome for this task.
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

Implement experimental init v2 orchestrator

Add orchestrate-v2 flow behind AGENTPLANE_INIT_UI=v2 or --experimental-ui while legacy init remains the default path.

## Scope

- In scope: Add orchestrate-v2 flow behind AGENTPLANE_INIT_UI=v2 or --experimental-ui while legacy init remains the default path.
- Out of scope: unrelated refactors not required for "Implement experimental init v2 orchestrator".

## Plan

Scope: implement atom #6. Steps: 1. Add orchestrate-v2.ts using prompts-v2, ui-v2, step modules, preview, conflict resolver, and apply spinners. 2. Gate entry by env AGENTPLANE_INIT_UI=v2 and/or --experimental-ui. 3. Reuse existing mutation functions and config writers. 4. Add e2e coverage for the experimental path. Acceptance: legacy init tests still pass; v2 e2e proves preview/confirm/apply path.

## Verify Steps

1. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `bunx vitest run packages/agentplane/src/cli/run-cli.core.init.v2.test.ts --pool=forks --maxWorkers 4 --testTimeout 60000`. Expected: it succeeds and confirms the requested outcome for this task.
3. Run `bun run test:project -- cli-core`. Expected: it succeeds and confirms the requested outcome for this task.
4. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
5. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
