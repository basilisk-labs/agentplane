---
id: "202602051552-P3HJ4S"
title: "AP-091: Atomic writes for critical files"
status: "DOING"
priority: "high"
owner: "CODER"
depends_on: []
tags: ["roadmap", "io", "safety"]
verify: []
commit: null
comments:
  - { author: "CODER", body: "Start: Implement atomic writes for critical files and update tests/docs." }
doc_version: 2
doc_updated_at: "2026-02-05T16:24:17.237Z"
doc_updated_by: "CODER"
description: "Add atomic write helper for critical files and use it across task/docs/cache writes; update tests/docs."
id_source: "generated"
---
## Summary

Ensure critical files are written atomically to avoid partial writes.

## Scope

- Identify critical files.
- Add atomic write helper.
- Replace direct writes.
- Update tests/docs.

## Risks

- Atomic rename semantics differ across filesystems.\n- Permissions/ownership could change if not preserved.

## Verify Steps

- bun run test:fast.
- Spot-check task/docs writes use atomic helper.

## Verification

- ✅ bun run test:fast (pass).\n- ✅ Atomic writes applied for tasks.json and task README updates.

## Rollback Plan

- Revert atomic write helper and restore direct writes.
