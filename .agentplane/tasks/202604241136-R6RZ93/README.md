---
id: "202604241136-R6RZ93"
title: "v0.3 freeze D3: split verify-record and hosted-close command hotspots"
status: "DOING"
priority: "normal"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on:
  - "202604241136-ATVM0G"
tags:
  - "code"
  - "refactor"
  - "v0.3"
verify:
  - "bun run hotspots:check"
  - "bun run test -- packages/agentplane/src/commands/task"
  - "bun run typecheck"
plan_approval:
  state: "approved"
  updated_at: "2026-04-24T13:13:50.243Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-24T13:20:53.438Z"
  updated_by: "CODER"
  note: "Command: bun run hotspots:check => pass; verify-record.ts is 144 LoC and hosted-close.command.ts is 243 LoC. Command: bun run test -- packages/agentplane/src/commands/task => pass, 25 files / 166 tests. Command: bun run typecheck => pass. Additional checks: focused hosted-close CLI test passed, format:check and git diff --check passed, knip and arch:deps passed, framework:dev:bootstrap and doctor passed."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: split verify-record and hosted-close command hotspots into smaller task modules while preserving existing CLI exports and behavior."
events:
  -
    type: "status"
    at: "2026-04-24T13:14:02.068Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: split verify-record and hosted-close command hotspots into smaller task modules while preserving existing CLI exports and behavior."
  -
    type: "verify"
    at: "2026-04-24T13:20:53.438Z"
    author: "CODER"
    state: "ok"
    note: "Command: bun run hotspots:check => pass; verify-record.ts is 144 LoC and hosted-close.command.ts is 243 LoC. Command: bun run test -- packages/agentplane/src/commands/task => pass, 25 files / 166 tests. Command: bun run typecheck => pass. Additional checks: focused hosted-close CLI test passed, format:check and git diff --check passed, knip and arch:deps passed, framework:dev:bootstrap and doctor passed."
doc_version: 3
doc_updated_at: "2026-04-24T13:20:53.470Z"
doc_updated_by: "CODER"
description: "Split the remaining task lifecycle hotspots verify-record.ts and hosted-close.command.ts into smaller units without changing CLI behavior."
sections:
  Summary: |-
    v0.3 freeze D3: split verify-record and hosted-close command hotspots
    
    Split the remaining task lifecycle hotspots verify-record.ts and hosted-close.command.ts into smaller units without changing CLI behavior.
  Scope: |-
    - In scope: Split the remaining task lifecycle hotspots verify-record.ts and hosted-close.command.ts into smaller units without changing CLI behavior.
    - Out of scope: unrelated refactors not required for "v0.3 freeze D3: split verify-record and hosted-close command hotspots".
  Plan: |-
    1. Split verify-record.ts into small modules: shared types, input normalization, execution/mutation logic, and a thin public wrapper preserving cmdTaskVerifyOk/cmdTaskVerifyRework/cmdVerifyParsed exports.
    2. Split hosted-close.command.ts by moving hosted close recovery/meta helpers into a sibling module while keeping the CLI spec export and makeRunTaskHostedCloseHandler boundary unchanged.
    3. Run hotspots, focused task tests, typecheck, format/diff checks, bootstrap, and doctor; stop for re-approval if behavior or public exports need to change.
  Verify Steps: |-
    1. Run `bun run hotspots:check`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `bun run test -- packages/agentplane/src/commands/task`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
    4. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    5. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-24T13:20:53.438Z — VERIFY — ok
    
    By: CODER
    
    Note: Command: bun run hotspots:check => pass; verify-record.ts is 144 LoC and hosted-close.command.ts is 243 LoC. Command: bun run test -- packages/agentplane/src/commands/task => pass, 25 files / 166 tests. Command: bun run typecheck => pass. Additional checks: focused hosted-close CLI test passed, format:check and git diff --check passed, knip and arch:deps passed, framework:dev:bootstrap and doctor passed.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-24T13:14:02.103Z, excerpt_hash=sha256:8c544a70be0c01ebfcf2879e113eade544b2ea246bf1107785e31f2d5e678e09
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

v0.3 freeze D3: split verify-record and hosted-close command hotspots

Split the remaining task lifecycle hotspots verify-record.ts and hosted-close.command.ts into smaller units without changing CLI behavior.

## Scope

- In scope: Split the remaining task lifecycle hotspots verify-record.ts and hosted-close.command.ts into smaller units without changing CLI behavior.
- Out of scope: unrelated refactors not required for "v0.3 freeze D3: split verify-record and hosted-close command hotspots".

## Plan

1. Split verify-record.ts into small modules: shared types, input normalization, execution/mutation logic, and a thin public wrapper preserving cmdTaskVerifyOk/cmdTaskVerifyRework/cmdVerifyParsed exports.
2. Split hosted-close.command.ts by moving hosted close recovery/meta helpers into a sibling module while keeping the CLI spec export and makeRunTaskHostedCloseHandler boundary unchanged.
3. Run hotspots, focused task tests, typecheck, format/diff checks, bootstrap, and doctor; stop for re-approval if behavior or public exports need to change.

## Verify Steps

1. Run `bun run hotspots:check`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `bun run test -- packages/agentplane/src/commands/task`. Expected: it succeeds and confirms the requested outcome for this task.
3. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
4. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
5. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-24T13:20:53.438Z — VERIFY — ok

By: CODER

Note: Command: bun run hotspots:check => pass; verify-record.ts is 144 LoC and hosted-close.command.ts is 243 LoC. Command: bun run test -- packages/agentplane/src/commands/task => pass, 25 files / 166 tests. Command: bun run typecheck => pass. Additional checks: focused hosted-close CLI test passed, format:check and git diff --check passed, knip and arch:deps passed, framework:dev:bootstrap and doctor passed.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-24T13:14:02.103Z, excerpt_hash=sha256:8c544a70be0c01ebfcf2879e113eade544b2ea246bf1107785e31f2d5e678e09

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
