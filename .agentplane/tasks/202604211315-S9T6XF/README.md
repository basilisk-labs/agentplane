---
id: "202604211315-S9T6XF"
title: "Add init v2 Clack UI helpers"
status: "TODO"
priority: "med"
owner: "CODER"
revision: 3
origin:
  system: "manual"
depends_on:
  - "202604211313-Q9ASA7"
tags:
  - "cli"
  - "code"
  - "init"
verify:
  - "bun run test:project -- cli-unit"
  - "bun run typecheck"
  - "bunx vitest run packages/agentplane/src/cli/run-cli/commands/init/ui-v2.test.ts --pool=forks --maxWorkers 4"
plan_approval:
  state: "approved"
  updated_at: "2026-04-21T13:16:00.483Z"
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
doc_updated_at: "2026-04-21T13:15:59.436Z"
doc_updated_by: "PLANNER"
description: "Add Clack-native init UI helpers for section rendering, preview, success outro, and error outro behind the v2 init flow without changing legacy init UI."
sections:
  Summary: |-
    Add init v2 Clack UI helpers
    
    Add Clack-native init UI helpers for section rendering, preview, success outro, and error outro behind the v2 init flow without changing legacy init UI.
  Scope: |-
    - In scope: Add Clack-native init UI helpers for section rendering, preview, success outro, and error outro behind the v2 init flow without changing legacy init UI.
    - Out of scope: unrelated refactors not required for "Add init v2 Clack UI helpers".
  Plan: "Scope: implement atom #2 from AGENTPLANE_INIT_UX_V2. Steps: 1. Add ui-v2.ts with section, previewInstall, outroSuccess, and outroError helpers using @clack/prompts primitives. 2. Add stripAnsi/snapshot-style tests for preview and outro output through mocked Clack. 3. Keep old ui.ts and framedRailCallout untouched. Acceptance: helper tests pass; no legacy init snapshots change."
  Verify Steps: |-
    1. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `bunx vitest run packages/agentplane/src/cli/run-cli/commands/init/ui-v2.test.ts --pool=forks --maxWorkers 4`. Expected: it succeeds and confirms the requested outcome for this task.
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

Add init v2 Clack UI helpers

Add Clack-native init UI helpers for section rendering, preview, success outro, and error outro behind the v2 init flow without changing legacy init UI.

## Scope

- In scope: Add Clack-native init UI helpers for section rendering, preview, success outro, and error outro behind the v2 init flow without changing legacy init UI.
- Out of scope: unrelated refactors not required for "Add init v2 Clack UI helpers".

## Plan

Scope: implement atom #2 from AGENTPLANE_INIT_UX_V2. Steps: 1. Add ui-v2.ts with section, previewInstall, outroSuccess, and outroError helpers using @clack/prompts primitives. 2. Add stripAnsi/snapshot-style tests for preview and outro output through mocked Clack. 3. Keep old ui.ts and framedRailCallout untouched. Acceptance: helper tests pass; no legacy init snapshots change.

## Verify Steps

1. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `bunx vitest run packages/agentplane/src/cli/run-cli/commands/init/ui-v2.test.ts --pool=forks --maxWorkers 4`. Expected: it succeeds and confirms the requested outcome for this task.
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
