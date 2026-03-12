---
id: "202603120810-HK5B6P"
title: "Improve help discoverability for task lifecycle namespaces"
status: "DOING"
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
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit: null
comments:
  -
    author: "CODER"
    body: "Start: implement namespace help for task lifecycle commands and wire direct lifecycle guidance into the CLI help surface."
events:
  -
    type: "status"
    at: "2026-03-12T08:12:51.312Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implement namespace help for task lifecycle commands and wire direct lifecycle guidance into the CLI help surface."
doc_version: 3
doc_updated_at: "2026-03-12T08:12:51.312Z"
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
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
