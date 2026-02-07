---
id: "202601271008-63G26Q"
title: "AP-009: Local tasks backend (new/show/list)"
status: "DONE"
priority: "high"
owner: "CODER"
depends_on: []
tags:
  - "nodejs"
  - "cli"
  - "tasks"
  - "roadmap"
verify:
  - "bun run ci"
plan_approval:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit:
  hash: "d5f7efc2d4bea64f7bc9ff3d211221cf8dc89911"
  message: "✨ 63G26Q AP-009: task new/show/list"
comments:
  -
    author: "CODER"
    body: "Start: AP-009 implement local tasks backend + task new/show/list."
  -
    author: "CODER"
    body: "Start: implementing local tasks backend and CLI commands task new/show/list."
  -
    author: "CODER"
    body: "verified: bun run ci passed | details: task new/show/list implemented with file-based store."
doc_version: 2
doc_updated_at: "2026-02-03T12:09:06.992Z"
doc_updated_by: "agentplane"
description: "Implement local tasks backend using .agentplane/tasks/<id>/README.md frontmatter and expose minimal task commands: task new, task show, task list."
---
## Summary

Implement AP-009 (minimal): a local tasks backend stored as task README frontmatter files and expose task new/show/list commands in the Node.js CLI.

## Scope

- Add core task storage helpers (create/read/list) using `.agentplane/tasks/<id>/README.md`
- Implement `agentplane task new` with basic flags (title/description/priority/owner/tags)
- Implement `agentplane task show <id>` and `agentplane task list`
- Add tests covering CLI behavior

## Risks

- ID generation must be stable and collision-safe.
- File format must remain deterministic to avoid noisy diffs.

## Verify Steps

- `bun run ci`
- E2E-style test: create a temp git root, run task new, then show/list

## Rollback Plan

- Revert commits; remove task command handling and core task storage module

## Plan


## Verification
