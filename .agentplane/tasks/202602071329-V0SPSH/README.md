---
id: "202602071329-V0SPSH"
title: "AP-CLI-01: Clean up CLI layer (parsing vs execution, remove legacy)"
status: "DOING"
priority: "med"
owner: "CODER"
depends_on:
  - "202602071328-RDATF2"
tags:
  - "roadmap"
  - "cli"
  - "refactor"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-02-07T15:32:42.402Z"
  updated_by: "USER"
  note: "Approved in chat on 2026-02-07."
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Refactor CLI into a thin runner with dedicated parsing helpers; remove implicit/legacy flags and require explicit behavior."
events: []
doc_version: 2
doc_updated_at: "2026-02-07T15:45:09.694Z"
doc_updated_by: "CODER"
description: "Split CLI parsing from execution: parsing in dedicated functions/modules, the runner only wires commands and contexts. Remove deprecated/implicit flags and modes; all behavior must be explicit."
id_source: "generated"
---
## Summary

Refactor CLI to separate parsing from execution for lifecycle commands; remove implicit task-id env fallback and a deprecated no-op flag.

## Scope

In scope: start/block/finish/verify argument parsing extraction into cli/parse helpers; remove AGENTPLANE_TASK_ID fallback for those commands; remove deprecated --allow-dirty no-op from guard commit parsing; update core CLI lifecycle tests. Out of scope: init/update-check/env loading behavior.

## Plan

1. Audit CLI entrypoints and command wiring to identify parsing mixed with execution and any implicit/legacy behavior.
2. Extract argument parsing into dedicated pure parsing helpers per command/namespace (no IO, no context reads).
3. Keep the CLI runner thin: resolve command -> parse args -> build CommandContext/GitContext/PolicyContext -> call command implementation.
4. Remove deprecated/implicit flags and modes; require explicit options and fail fast with clear usage errors.
5. Add/adjust tests to lock behavior (usage errors, flag removal, and command wiring).
6. Run format:check, lint, and test:fast.

## Risks

Behavior break: scripts relying on implicit AGENTPLANE_TASK_ID fallback for start/block/finish/verify will now fail with a usage error. Tests cover the new behavior and core workflows.

## Verification

- bun run format:check
- bun run lint
- bun run test:cli:core

## Rollback Plan

Revert the implementation commit for this task (and the task README close commit) to restore the previous CLI behavior.
