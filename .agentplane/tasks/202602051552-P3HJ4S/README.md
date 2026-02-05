---
id: "202602051552-P3HJ4S"
title: "AP-091: Atomic writes for critical files"
status: "TODO"
priority: "high"
owner: "CODER"
depends_on: []
tags: ["roadmap", "io", "safety"]
verify: []
commit: null
comments: []
doc_version: 2
doc_updated_at: "2026-02-05T15:52:49.758Z"
doc_updated_by: "CODER"
description: "Add atomic write helper for critical files and use it across task/docs/cache writes; update tests/docs."
id_source: "generated"
---
## Summary

Ensure critical files are written atomically to avoid partial writes.

## Scope

- Identify critical files.\n- Add atomic write helper.\n- Replace direct writes.\n- Update tests/docs.

## Risks

- Atomic rename semantics differ across filesystems.\n- Permissions/ownership could change if not preserved.

## Verify Steps

- bun run test:fast.\n- Spot-check writes to tasks/docs/cache use atomic helper.

## Verification

Pending.

## Rollback Plan

- Revert atomic write helper and restore direct writes.
