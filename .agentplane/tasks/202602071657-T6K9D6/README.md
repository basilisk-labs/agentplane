---
id: "202602071657-T6K9D6"
title: "CLI: Derive implementation task(s) from spike"
status: "DOING"
priority: "high"
owner: "CODER"
depends_on:
  - "202602071657-B8B59A"
tags:
  - "code"
  - "cli"
  - "tasks"
verify:
  - "bun run test:agentplane"
plan_approval:
  state: "approved"
  updated_at: "2026-02-07T17:50:02.479Z"
  updated_by: "ORCHESTRATOR"
  note: "OK"
verification:
  state: "ok"
  updated_at: "2026-02-07T17:53:01.638Z"
  updated_by: "CODER"
  note: "Implemented task derive command to create an implementation task depending on a spike and copying Notes excerpt; tests: bun run test:agentplane, bun run test:cli:core."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: implement task derive command to create implementation tasks depending on a spike and copying decision context."
doc_version: 2
doc_updated_at: "2026-02-07T17:53:01.641Z"
doc_updated_by: "CODER"
description: "Add task derive command to create implementation tasks depending on a spike and copying Decision context."
---
## Summary


## Scope


## Plan

1) Implement `agentplane task derive <spike-id> ...` to create an implementation task depending on the spike.
2) Require spike tag on the source task (tag=spike).
3) Copy a small excerpt from spike Notes into the new task description for context.
4) Run bun run test:agentplane and bun run test:cli:core.

## Risks


## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-02-07T17:53:01.638Z — VERIFY — ok

By: CODER

Note: Implemented task derive command to create an implementation task depending on a spike and copying Notes excerpt; tests: bun run test:agentplane, bun run test:cli:core.

<!-- END VERIFICATION RESULTS -->

## Rollback Plan


## Verify Steps

### Scope

Add a helper command to derive implementation tasks from a spike with an explicit dependency edge.

### Checks

- `agentplane task derive <spike-id> ...` creates a new TODO task.
- New task has depends_on: [<spike-id>].
- New task description includes a short excerpt from spike Notes (if present).

### Evidence / Commands

- bun run test:cli:core

### Pass criteria

- Command works end-to-end and is non-breaking to existing CLI.
