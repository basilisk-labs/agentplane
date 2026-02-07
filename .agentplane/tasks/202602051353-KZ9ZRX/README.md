---
id: "202602051353-KZ9ZRX"
title: "AP-060a: Task index storage + updater"
status: "DONE"
priority: "high"
owner: "CODER"
depends_on: []
tags:
  - "roadmap"
  - "tasks"
  - "cache"
  - "performance"
verify: []
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
  hash: "bacd2e6a7645a3a326772c374678fa8e9f8bd74f"
  message: "✨ KZ9ZRX add task index cache helpers"
comments:
  -
    author: "CODER"
    body: "Start: design and implement task index cache model and incremental updater."
  -
    author: "CODER"
    body: "Verified: ran bun run lint, bun run test:fast, and pre-commit hooks; task index helpers added."
doc_version: 2
doc_updated_at: "2026-02-05T14:08:23.360Z"
doc_updated_by: "CODER"
description: "Implement .agentplane/cache/tasks-index.v1.json with load/save and incremental update helpers."
id_source: "generated"
---
## Summary

Implement task index cache model and incremental update helpers for local backend.

## Scope

Add task index module, load/save logic, and integrate incremental cache update in local backend listTasks.

## Risks

Cache could drift from README content if mtime comparisons fail; ensure fallback to parse on changes.

## Verify Steps

- Run bun run lint.\n- Run bun run test:fast.\n- Run node packages/agentplane/bin/agentplane.js hooks run pre-commit.\n- Confirm tasks-index.v1.json created under cache.

## Verification

Verified on 2026-02-05: bun run lint; bun run test:fast; node packages/agentplane/bin/agentplane.js hooks run pre-commit; index file created in cache.

## Rollback Plan

Remove task index module and revert local backend listTasks to always parse README files.

## Plan
