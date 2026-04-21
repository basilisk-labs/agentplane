---
id: "202604211315-S9T6XF"
title: "Add init v2 Clack UI helpers"
result_summary: "Implemented init v2 UI helper module and tests; removed remaining cli-unit blocker through current-contract fixture updates. Evidence: bun run typecheck, bunx vitest run packages/agentplane/src/cli/run-cli/commands/init/ui-v2.test.ts --pool=forks --maxWorkers 4, bun run test:project -- cli-unit."
status: "DONE"
priority: "med"
owner: "CODER"
revision: 7
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
  state: "ok"
  updated_at: "2026-04-21T15:45:37.842Z"
  updated_by: "CODER"
  note: "Verified: bun run typecheck passed; bunx vitest run packages/agentplane/src/cli/run-cli/commands/init/ui-v2.test.ts --pool=forks --maxWorkers 4 passed (1 file, 4 tests); bun run test:project -- cli-unit passed (54 files, 624 tests). cli-unit blocker removed by a8a90546."
commit:
  hash: "a3fd098211abbf96d6c58a707c7a4041f05255c2"
  message: "✨ init: add v2 UI helpers"
comments:
  -
    author: "CODER"
    body: "Start: Add Clack-native init v2 UI helper module and focused tests while keeping legacy init UI and existing snapshots untouched."
  -
    author: "CODER"
    body: "Verified: init v2 Clack UI helpers are implemented and covered; typecheck and full cli-unit are green."
events:
  -
    type: "status"
    at: "2026-04-21T13:23:15.128Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Add Clack-native init v2 UI helper module and focused tests while keeping legacy init UI and existing snapshots untouched."
  -
    type: "verify"
    at: "2026-04-21T13:48:29.396Z"
    author: "CODER"
    state: "needs_rework"
    note: "Command: bunx vitest --config vitest.workspace.ts run packages/agentplane/src/cli/run-cli/commands/init/ui-v2.test.ts --pool=forks --maxWorkers 4; Result: pass; Evidence: 12 assertions across workspace projects. Command: bun run typecheck; Result: pass from earlier full typecheck. Command: bun run test:project -- cli-unit; Result: fail; Evidence: 13 failures in guard/finish/upgrade/normalize suites unrelated to ui-v2 helper. Task remains open until cli-unit blocker is resolved or verify contract is narrowed."
  -
    type: "verify"
    at: "2026-04-21T15:45:37.842Z"
    author: "CODER"
    state: "ok"
    note: "Verified: bun run typecheck passed; bunx vitest run packages/agentplane/src/cli/run-cli/commands/init/ui-v2.test.ts --pool=forks --maxWorkers 4 passed (1 file, 4 tests); bun run test:project -- cli-unit passed (54 files, 624 tests). cli-unit blocker removed by a8a90546."
  -
    type: "status"
    at: "2026-04-21T15:45:56.914Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: init v2 Clack UI helpers are implemented and covered; typecheck and full cli-unit are green."
doc_version: 3
doc_updated_at: "2026-04-21T15:45:56.915Z"
doc_updated_by: "CODER"
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
    ### 2026-04-21T13:48:29.396Z — VERIFY — needs_rework
    
    By: CODER
    
    Note: Command: bunx vitest --config vitest.workspace.ts run packages/agentplane/src/cli/run-cli/commands/init/ui-v2.test.ts --pool=forks --maxWorkers 4; Result: pass; Evidence: 12 assertions across workspace projects. Command: bun run typecheck; Result: pass from earlier full typecheck. Command: bun run test:project -- cli-unit; Result: fail; Evidence: 13 failures in guard/finish/upgrade/normalize suites unrelated to ui-v2 helper. Task remains open until cli-unit blocker is resolved or verify contract is narrowed.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-21T13:23:15.188Z, excerpt_hash=sha256:71485a0c8950e5363324cd9799abdab09f97290cb2552a02a71baee309b8cf13
    
    ### 2026-04-21T15:45:37.842Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified: bun run typecheck passed; bunx vitest run packages/agentplane/src/cli/run-cli/commands/init/ui-v2.test.ts --pool=forks --maxWorkers 4 passed (1 file, 4 tests); bun run test:project -- cli-unit passed (54 files, 624 tests). cli-unit blocker removed by a8a90546.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-21T13:48:29.403Z, excerpt_hash=sha256:71485a0c8950e5363324cd9799abdab09f97290cb2552a02a71baee309b8cf13
    
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
### 2026-04-21T13:48:29.396Z — VERIFY — needs_rework

By: CODER

Note: Command: bunx vitest --config vitest.workspace.ts run packages/agentplane/src/cli/run-cli/commands/init/ui-v2.test.ts --pool=forks --maxWorkers 4; Result: pass; Evidence: 12 assertions across workspace projects. Command: bun run typecheck; Result: pass from earlier full typecheck. Command: bun run test:project -- cli-unit; Result: fail; Evidence: 13 failures in guard/finish/upgrade/normalize suites unrelated to ui-v2 helper. Task remains open until cli-unit blocker is resolved or verify contract is narrowed.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-21T13:23:15.188Z, excerpt_hash=sha256:71485a0c8950e5363324cd9799abdab09f97290cb2552a02a71baee309b8cf13

### 2026-04-21T15:45:37.842Z — VERIFY — ok

By: CODER

Note: Verified: bun run typecheck passed; bunx vitest run packages/agentplane/src/cli/run-cli/commands/init/ui-v2.test.ts --pool=forks --maxWorkers 4 passed (1 file, 4 tests); bun run test:project -- cli-unit passed (54 files, 624 tests). cli-unit blocker removed by a8a90546.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-21T13:48:29.403Z, excerpt_hash=sha256:71485a0c8950e5363324cd9799abdab09f97290cb2552a02a71baee309b8cf13

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
