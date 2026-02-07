---
id: "202602051353-25ZWGT"
title: "AP-060b: Integrate index into task list/search"
status: "DONE"
priority: "high"
owner: "CODER"
depends_on: []
tags:
  - "roadmap"
  - "tasks"
  - "cache"
  - "cli"
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
  hash: "f687f21159036f23f88599cadb0029e6210f066a"
  message: "✨ 25ZWGT use task index in local listTasks"
comments:
  -
    author: "CODER"
    body: "Start: integrate task index into list/search with fallback rebuild."
  -
    author: "CODER"
    body: "Verified: ran bun run lint, bun run test:fast, and pre-commit hooks; local listTasks now uses index cache."
doc_version: 2
doc_updated_at: "2026-02-05T14:08:31.001Z"
doc_updated_by: "CODER"
description: "Use tasks index for task list/search to avoid full README scans; add fallback to rebuild."
id_source: "generated"
---
## Summary

Wire task index into task list/search flows to avoid full README scans.

## Scope

Use backend listTasks with index support for task list/search; ensure fallback to parse on cache miss.

## Risks

Behavioral regressions in list/search if cached fields are incomplete; ensure cached task data matches TaskData used by search.

## Verify Steps

- Run bun run lint.\n- Run bun run test:fast.\n- Run node packages/agentplane/bin/agentplane.js hooks run pre-commit.\n- Spot-check task list/search outputs match pre-index behavior.

## Verification

Verified on 2026-02-05: bun run lint; bun run test:fast; node packages/agentplane/bin/agentplane.js hooks run pre-commit; list/search outputs unchanged.

## Rollback Plan

Disable index usage and restore list/search to full README scans.

## Plan
