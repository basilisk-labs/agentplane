---
id: "202603121036-PT556T"
title: "Modularize run-cli command catalog"
status: "DOING"
priority: "med"
owner: "CODER"
depends_on: []
tags:
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-12T10:36:41.765Z"
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
    body: "Start: split the oversized run-cli command catalog into grouped entry modules while preserving the same exported COMMANDS surface, command ordering, and registry/help behavior."
events:
  -
    type: "status"
    at: "2026-03-12T10:36:49.758Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: split the oversized run-cli command catalog into grouped entry modules while preserving the same exported COMMANDS surface, command ordering, and registry/help behavior."
doc_version: 3
doc_updated_at: "2026-03-12T10:36:49.758Z"
doc_updated_by: "CODER"
description: "Split the oversized run-cli command catalog into grouped modules while preserving the exported API, command order, and runtime behavior."
id_source: "generated"
---
## Summary

Split the oversized run-cli command catalog into grouped modules while preserving the exported API, command order, and registry behavior.

## Scope

Touch only the run-cli command catalog files and task-local README artifacts needed to modularize the catalog without changing command specs or handlers.

## Plan

Modularize run-cli command-catalog.ts behind grouped entry modules while preserving the current export contract and command ordering.

## Verify Steps

1. Run `bun x vitest run packages/agentplane/src/cli/run-cli.core.help-contract.test.ts packages/agentplane/src/cli/help.all-commands.contract.test.ts packages/agentplane/src/cli/run-cli.core.help-snap.test.ts packages/agentplane/src/cli/run-cli.core.docs-cli.test.ts --hookTimeout 60000 --testTimeout 60000`.
2. Confirm command matching/help generation still sees the same command IDs and namespace help surfaces.
3. Run `bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build`.

## Verification

Pending.

## Rollback Plan

Revert the catalog modularization if command order, help generation, or registry behavior changes, or if the refactor leaks into command runtime files.

## Findings

None yet.
