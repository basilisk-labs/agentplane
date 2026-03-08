---
id: "202603080540-AKTBET"
title: "P1: optimize doctor archive scan and heavy-path performance"
result_summary: "doctor default path is materially cheaper on this repository, and archive-heavy history checks remain available on demand with batched commit-subject lookups."
status: "DONE"
priority: "med"
owner: "CODER"
depends_on: []
tags:
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-08T06:44:10.474Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-08T07:03:39.222Z"
  updated_by: "CODER"
  note: "Command: bunx vitest run packages/agentplane/src/commands/doctor.command.test.ts --pool=threads --testTimeout 60000 --hookTimeout 60000\nResult: pass\nEvidence: 1 file, 19 tests passed, including new default bounded archive scan and --archive-full coverage.\nScope: doctor archive behavior and runtime/workspace regressions.\n\nCommand: bun run lint:core -- packages/agentplane/src/commands/doctor.run.ts packages/agentplane/src/commands/doctor.spec.ts packages/agentplane/src/commands/doctor/archive.ts packages/agentplane/src/commands/doctor.command.test.ts\nResult: pass\nEvidence: eslint completed clean on the modified doctor sources and tests.\nScope: doctor implementation and test files.\n\nCommand: bunx tsc -p packages/agentplane/tsconfig.json --noEmit\nResult: pass\nEvidence: TypeScript no-emit completed with the new doctor flag and archive options.\nScope: agentplane package typing after doctor changes.\n\nCommand: bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build && agentplane doctor && agentplane doctor --archive-full\nResult: pass\nEvidence: rebuild completed; default doctor finished in real 0.88s with bounded archive info, archive-full finished in real 0.75s and preserved deep historical findings.\nScope: framework checkout runtime freshness and doctor default/full command behavior."
commit:
  hash: "36996a3409fd38a7fbf4feea62d9ed0f30253e31"
  message: "⚡ AKTBET doctor: bound archive scan and batch commit lookups"
comments:
  -
    author: "CODER"
    body: "Start: optimizing doctor so the default path stops paying full historical archive cost while preserving an explicit deep archive mode."
  -
    author: "CODER"
    body: "Verified: default doctor now uses a bounded recent archive scan while --archive-full preserves deep historical audit; doctor tests, lint, TypeScript, rebuild, and both command modes passed."
events:
  -
    type: "status"
    at: "2026-03-08T06:44:10.767Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: optimizing doctor so the default path stops paying full historical archive cost while preserving an explicit deep archive mode."
  -
    type: "verify"
    at: "2026-03-08T07:03:39.222Z"
    author: "CODER"
    state: "ok"
    note: "Command: bunx vitest run packages/agentplane/src/commands/doctor.command.test.ts --pool=threads --testTimeout 60000 --hookTimeout 60000\nResult: pass\nEvidence: 1 file, 19 tests passed, including new default bounded archive scan and --archive-full coverage.\nScope: doctor archive behavior and runtime/workspace regressions.\n\nCommand: bun run lint:core -- packages/agentplane/src/commands/doctor.run.ts packages/agentplane/src/commands/doctor.spec.ts packages/agentplane/src/commands/doctor/archive.ts packages/agentplane/src/commands/doctor.command.test.ts\nResult: pass\nEvidence: eslint completed clean on the modified doctor sources and tests.\nScope: doctor implementation and test files.\n\nCommand: bunx tsc -p packages/agentplane/tsconfig.json --noEmit\nResult: pass\nEvidence: TypeScript no-emit completed with the new doctor flag and archive options.\nScope: agentplane package typing after doctor changes.\n\nCommand: bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build && agentplane doctor && agentplane doctor --archive-full\nResult: pass\nEvidence: rebuild completed; default doctor finished in real 0.88s with bounded archive info, archive-full finished in real 0.75s and preserved deep historical findings.\nScope: framework checkout runtime freshness and doctor default/full command behavior."
  -
    type: "status"
    at: "2026-03-08T07:04:07.169Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: default doctor now uses a bounded recent archive scan while --archive-full preserves deep historical audit; doctor tests, lint, TypeScript, rebuild, and both command modes passed."
doc_version: 2
doc_updated_at: "2026-03-08T07:04:07.169Z"
doc_updated_by: "CODER"
description: "Reduce doctor latency on large archives via clearer archive boundaries, optional deeper modes, and cheap-path shortcuts after module extraction."
id_source: "generated"
---
## Summary

P1: optimize doctor archive scan and heavy-path performance

Reduce doctor latency on large archives via clearer archive boundaries, optional deeper modes, and cheap-path shortcuts after module extraction.

## Scope

- In scope: Reduce doctor latency on large archives via clearer archive boundaries, optional deeper modes, and cheap-path shortcuts after module extraction..
- Out of scope: unrelated refactors not required for "P1: optimize doctor archive scan and heavy-path performance".

## Plan

1. Add an explicit deep-archive mode to doctor and keep the default path focused on actionable current-state checks plus a bounded recent archive window.
2. Replace per-hash historical git lookups with batched subject resolution so archive checks do not spawn one git process per task.
3. Verify doctor behavior with targeted tests, lint, and timing-sensitive local runs for default and deep modes.

## Risks

- Risk: hidden regressions in touched paths.
- Mitigation: run required checks before finish and record evidence.

## Verify Steps

### Scope
- Primary tag: `code`

### Checks
- Add explicit checks/commands for this task before approval.

### Evidence / Commands
- Record executed commands and key outputs.

### Pass criteria
- Steps are reproducible and produce expected results.

## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-08T07:03:39.222Z — VERIFY — ok

By: CODER

Note: Command: bunx vitest run packages/agentplane/src/commands/doctor.command.test.ts --pool=threads --testTimeout 60000 --hookTimeout 60000
Result: pass
Evidence: 1 file, 19 tests passed, including new default bounded archive scan and --archive-full coverage.
Scope: doctor archive behavior and runtime/workspace regressions.

Command: bun run lint:core -- packages/agentplane/src/commands/doctor.run.ts packages/agentplane/src/commands/doctor.spec.ts packages/agentplane/src/commands/doctor/archive.ts packages/agentplane/src/commands/doctor.command.test.ts
Result: pass
Evidence: eslint completed clean on the modified doctor sources and tests.
Scope: doctor implementation and test files.

Command: bunx tsc -p packages/agentplane/tsconfig.json --noEmit
Result: pass
Evidence: TypeScript no-emit completed with the new doctor flag and archive options.
Scope: agentplane package typing after doctor changes.

Command: bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build && agentplane doctor && agentplane doctor --archive-full
Result: pass
Evidence: rebuild completed; default doctor finished in real 0.88s with bounded archive info, archive-full finished in real 0.75s and preserved deep historical findings.
Scope: framework checkout runtime freshness and doctor default/full command behavior.

VerifyStepsRef: doc_version=2, doc_updated_at=2026-03-08T06:44:10.767Z, excerpt_hash=sha256:682d5674a3bb4d925efca0f9cabc057c814315f01dc448e2879b94eecb1a7911

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Notes

- Optimize default doctor for daily use; do not remove deep historical validation, only move it behind an explicit flag.
- Preserve current runtime/workspace/workflow diagnostics and only narrow the archive-heavy default path.
