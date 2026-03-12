---
id: "202603121036-PT556T"
title: "Modularize run-cli command catalog"
result_summary: "Split monolithic run-cli command catalog into core/task/project/lifecycle modules behind the same COMMANDS API."
status: "DONE"
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
  state: "ok"
  updated_at: "2026-03-12T10:45:26.903Z"
  updated_by: "CODER"
  note: "Verified modularized run-cli command catalog preserves help/docs contract: eslint command-catalog files; vitest run-cli.core.help-contract/help.all-commands.contract/run-cli.core.help-snap/run-cli.core.docs-cli; bun run --filter=@agentplaneorg/core build; bun run --filter=agentplane build."
commit:
  hash: "b47617bd52951545c5fd528e8f4ed42d3e08735c"
  message: "🚧 PT556T refactor: modularize run-cli command catalog"
comments:
  -
    author: "CODER"
    body: "Start: split the oversized run-cli command catalog into grouped entry modules while preserving the same exported COMMANDS surface, command ordering, and registry/help behavior."
  -
    author: "CODER"
    body: "Verified: modularized run-cli command catalog with preserved command order and help/docs contracts."
events:
  -
    type: "status"
    at: "2026-03-12T10:36:49.758Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: split the oversized run-cli command catalog into grouped entry modules while preserving the same exported COMMANDS surface, command ordering, and registry/help behavior."
  -
    type: "verify"
    at: "2026-03-12T10:45:26.903Z"
    author: "CODER"
    state: "ok"
    note: "Verified modularized run-cli command catalog preserves help/docs contract: eslint command-catalog files; vitest run-cli.core.help-contract/help.all-commands.contract/run-cli.core.help-snap/run-cli.core.docs-cli; bun run --filter=@agentplaneorg/core build; bun run --filter=agentplane build."
  -
    type: "status"
    at: "2026-03-12T10:45:27.167Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: modularized run-cli command catalog with preserved command order and help/docs contracts."
doc_version: 3
doc_updated_at: "2026-03-12T10:45:27.167Z"
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

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-12T10:45:26.903Z — VERIFY — ok

By: CODER

Note: Verified modularized run-cli command catalog preserves help/docs contract: eslint command-catalog files; vitest run-cli.core.help-contract/help.all-commands.contract/run-cli.core.help-snap/run-cli.core.docs-cli; bun run --filter=@agentplaneorg/core build; bun run --filter=agentplane build.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-12T10:36:49.758Z, excerpt_hash=sha256:8a6366d77f8f70d165fb4fd28f6844cbc6ac413f68072cb80dcfa277ad8d72d0

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert the catalog modularization if command order, help generation, or registry behavior changes, or if the refactor leaks into command runtime files.

## Findings

None yet.
