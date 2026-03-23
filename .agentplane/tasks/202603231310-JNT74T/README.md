---
id: "202603231310-JNT74T"
title: "R1: Freeze runner CLI contract"
result_summary: "Reserved task run and scenario execute command contracts."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 11
depends_on: []
tags:
  - "code"
  - "cli"
  - "runner"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-23T13:10:37.457Z"
  updated_by: "ORCHESTRATOR"
  note: "Approved task graph for runner/scenario execute rollout"
verification:
  state: "ok"
  updated_at: "2026-03-23T13:17:06.847Z"
  updated_by: "CODER"
  note: "Command contracts and placeholder runtime behavior verified."
commit:
  hash: "8c30a106aa2da032e71b320cac34f2c463f1ae3b"
  message: "✅ JNT74T close: freeze runner CLI contract (202603231310-JNT74T) [code]"
comments:
  -
    author: "CODER"
    body: "Start: implement task run and scenario execute command contracts while preserving preview-only scenario run semantics."
  -
    author: "CODER"
    body: "Verified: reserved task run and scenario execute contracts with placeholder handlers and targeted CLI regression coverage."
  -
    author: "CODER"
    body: "Verified: reserved task run and scenario execute contracts with placeholder handlers and targeted CLI regression coverage."
events:
  -
    type: "status"
    at: "2026-03-23T13:11:20.168Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implement task run and scenario execute command contracts while preserving preview-only scenario run semantics."
  -
    type: "verify"
    at: "2026-03-23T13:17:06.847Z"
    author: "CODER"
    state: "ok"
    note: "Command contracts and placeholder runtime behavior verified."
  -
    type: "status"
    at: "2026-03-23T13:20:01.986Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: reserved task run and scenario execute contracts with placeholder handlers and targeted CLI regression coverage."
  -
    type: "status"
    at: "2026-03-23T13:21:20.852Z"
    author: "CODER"
    from: "DONE"
    to: "DONE"
    note: "Verified: reserved task run and scenario execute contracts with placeholder handlers and targeted CLI regression coverage."
  -
    type: "status"
    at: "2026-03-23T13:28:25.082Z"
    author: "CODER"
    from: "DONE"
    to: "DONE"
doc_version: 3
doc_updated_at: "2026-03-23T13:28:25.383Z"
doc_updated_by: "CODER"
description: "Define task run and scenario execute command surfaces while keeping scenario run preview-only."
sections:
  Summary: |-
    R1: Freeze runner CLI contract
    
    Define task run and scenario execute command surfaces while keeping scenario run preview-only.
  Scope: |-
    - In scope: Define task run and scenario execute command surfaces while keeping scenario run preview-only.
    - Out of scope: unrelated refactors not required for "R1: Freeze runner CLI contract".
  Plan: |-
    1. Add command specs and help surfaces for task run and scenario execute.
    2. Preserve scenario run as preview-only and make the split explicit in command copy.
    3. Add parser and help-contract coverage for the new commands.
  Verify Steps: |-
    1. Run help for task run and scenario execute. Expected: both commands show the agreed usage and summary.
    2. Run invalid invocations for both commands. Expected: they fail with typed E_USAGE output.
    3. Run help for scenario run. Expected: it still describes preview/prepare behavior rather than execution.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    #### 2026-03-23T13:17:06.847Z — VERIFY — ok
    
    By: CODER
    
    Note: Command contracts and placeholder runtime behavior verified.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-23T13:11:20.169Z, excerpt_hash=sha256:a3ae5f040f7b57be7a586437d6a5f2e6495c5d2190fcb5828af1f321003b9fb8
    
    Details:
    
    Command: bunx vitest run packages/agentplane/src/cli/run-cli.core.help-snap.test.ts packages/agentplane/src/cli/run-cli.scenario.test.ts packages/agentplane/src/cli/run-cli.core.tasks.query.test.ts -u
    Result: pass
    Evidence: 3 test files passed, 41 tests passed, 2 snapshots written, 1 snapshot updated.
    Scope: new task/scenario command contracts, help snapshots, placeholder CLI behavior.
    
    Command: bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build
    Result: pass
    Evidence: both package builds exited with code 0.
    Scope: repo-local wrapper freshness for live CLI help.
    
    Command: agentplane help task run && agentplane help scenario execute
    Result: pass
    Evidence: live CLI exposes both commands with the expected placeholder summaries and usage lines.
    Scope: installed wrapper surface after rebuild.
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: "- Live repo-local wrapper required rebuilding core and agentplane dist before the new command contracts became visible through the wrapper help surface."
id_source: "generated"
---
## Summary

R1: Freeze runner CLI contract

Define task run and scenario execute command surfaces while keeping scenario run preview-only.

## Scope

- In scope: Define task run and scenario execute command surfaces while keeping scenario run preview-only.
- Out of scope: unrelated refactors not required for "R1: Freeze runner CLI contract".

## Plan

1. Add command specs and help surfaces for task run and scenario execute.
2. Preserve scenario run as preview-only and make the split explicit in command copy.
3. Add parser and help-contract coverage for the new commands.

## Verify Steps

1. Run help for task run and scenario execute. Expected: both commands show the agreed usage and summary.
2. Run invalid invocations for both commands. Expected: they fail with typed E_USAGE output.
3. Run help for scenario run. Expected: it still describes preview/prepare behavior rather than execution.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-23T13:17:06.847Z — VERIFY — ok

By: CODER

Note: Command contracts and placeholder runtime behavior verified.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-23T13:11:20.169Z, excerpt_hash=sha256:a3ae5f040f7b57be7a586437d6a5f2e6495c5d2190fcb5828af1f321003b9fb8

Details:

Command: bunx vitest run packages/agentplane/src/cli/run-cli.core.help-snap.test.ts packages/agentplane/src/cli/run-cli.scenario.test.ts packages/agentplane/src/cli/run-cli.core.tasks.query.test.ts -u
Result: pass
Evidence: 3 test files passed, 41 tests passed, 2 snapshots written, 1 snapshot updated.
Scope: new task/scenario command contracts, help snapshots, placeholder CLI behavior.

Command: bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build
Result: pass
Evidence: both package builds exited with code 0.
Scope: repo-local wrapper freshness for live CLI help.

Command: agentplane help task run && agentplane help scenario execute
Result: pass
Evidence: live CLI exposes both commands with the expected placeholder summaries and usage lines.
Scope: installed wrapper surface after rebuild.

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Live repo-local wrapper required rebuilding core and agentplane dist before the new command contracts became visible through the wrapper help surface.
