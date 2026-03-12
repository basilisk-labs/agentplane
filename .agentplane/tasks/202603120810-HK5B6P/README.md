---
id: "202603120810-HK5B6P"
title: "Improve help discoverability for task lifecycle namespaces"
result_summary: "Task and task plan namespace help surfaces added."
status: "DONE"
priority: "high"
owner: "CODER"
depends_on: []
tags:
  - "code"
  - "cli"
verify:
  - "bun x vitest run packages/agentplane/src/cli/run-cli.core.help-snap.test.ts packages/agentplane/src/cli/run-cli.core.test.ts --hookTimeout 60000 --testTimeout 60000"
plan_approval:
  state: "approved"
  updated_at: "2026-03-12T08:12:30.475Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-12T08:18:25.354Z"
  updated_by: "CODER"
  note: "Command: bun x vitest run packages/agentplane/src/cli/run-cli.core.help-snap.test.ts packages/agentplane/src/cli/run-cli.core.test.ts --update --hookTimeout 60000 --testTimeout 60000; Result: pass; Evidence: 41 tests passed, 2 snapshots written, 1 updated; Scope: task and task plan namespace help routing and usage output."
commit:
  hash: "0a07aaae80c7cb88585ad69569f2539fc59b3210"
  message: "✨ HK5B6P task: add task namespace help roots"
comments:
  -
    author: "CODER"
    body: "Start: implement namespace help for task lifecycle commands and wire direct lifecycle guidance into the CLI help surface."
  -
    author: "CODER"
    body: "Verified: task and task plan namespace help now resolve cleanly and advertise the direct lifecycle route."
events:
  -
    type: "status"
    at: "2026-03-12T08:12:51.312Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implement namespace help for task lifecycle commands and wire direct lifecycle guidance into the CLI help surface."
  -
    type: "verify"
    at: "2026-03-12T08:18:25.354Z"
    author: "CODER"
    state: "ok"
    note: "Command: bun x vitest run packages/agentplane/src/cli/run-cli.core.help-snap.test.ts packages/agentplane/src/cli/run-cli.core.test.ts --update --hookTimeout 60000 --testTimeout 60000; Result: pass; Evidence: 41 tests passed, 2 snapshots written, 1 updated; Scope: task and task plan namespace help routing and usage output."
  -
    type: "status"
    at: "2026-03-12T08:18:30.379Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: task and task plan namespace help now resolve cleanly and advertise the direct lifecycle route."
doc_version: 3
doc_updated_at: "2026-03-12T08:18:30.379Z"
doc_updated_by: "CODER"
description: "Make help task and help task plan resolve cleanly and expose the direct lifecycle route instead of failing as an unknown command."
id_source: "generated"
---
## Summary

Improve help discoverability for task lifecycle namespaces

Make  and  resolve cleanly and expose the direct lifecycle route instead of failing as an unknown command.

## Scope

- In scope: Make  and  resolve cleanly and expose the direct lifecycle route instead of failing as an unknown command.
- Out of scope: unrelated refactors not required for "Improve help discoverability for task lifecycle namespaces".

## Plan

1. Add task and task plan namespace help surfaces. 2. Wire them into CLI routing/help output with lifecycle examples. 3. Cover snapshot and usage behavior with tests.

## Verify Steps

- Command: bun x vitest run packages/agentplane/src/cli/run-cli.core.help-snap.test.ts packages/agentplane/src/cli/run-cli.core.test.ts --hookTimeout 60000 --testTimeout 60000
- Expected: help task and help task plan render actionable help instead of Unknown command.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-12T08:18:25.354Z — VERIFY — ok

By: CODER

Note: Command: bun x vitest run packages/agentplane/src/cli/run-cli.core.help-snap.test.ts packages/agentplane/src/cli/run-cli.core.test.ts --update --hookTimeout 60000 --testTimeout 60000; Result: pass; Evidence: 41 tests passed, 2 snapshots written, 1 updated; Scope: task and task plan namespace help routing and usage output.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-12T08:12:51.312Z, excerpt_hash=sha256:bd9b9267af35e94e4f25452980208206a90c40a3847ad24d18c61af8995a4db1

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
