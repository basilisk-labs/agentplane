---
id: "202602051354-XDB53D"
title: "AP-060c: Task index tests"
status: "DOING"
priority: "high"
owner: "TESTER"
depends_on: []
tags: ["roadmap", "testing", "cache"]
verify: []
commit: null
comments:
  - { author: "TESTER", body: "Start: add tests for task index cache and list/search behavior." }
doc_version: 2
doc_updated_at: "2026-02-05T14:06:09.177Z"
doc_updated_by: "TESTER"
description: "Add unit tests for index load/update, mtime refresh, and list/search behavior."
id_source: "generated"
---
## Summary

Add tests covering task index cache creation and behavior.

## Scope

Add unit tests in task-backend for index cache file and metadata.

## Risks

Tests may be brittle if cache path or schema changes; keep expectations minimal.

## Verify Steps

- Run bun run test:fast.\n- Confirm new task index tests pass.

## Verification

Verified on 2026-02-05: bun run test:fast passes; task index cache test green.

## Rollback Plan

Revert task index tests to prior state.
