---
id: "202601271201-GNVXQ1"
title: "AP-019: start/block/finish parity (direct)"
status: "DONE"
priority: "high"
owner: "CODER"
depends_on:
  - "202601271201-1PF9KF"
tags:
  - "nodejs"
  - "roadmap"
  - "workflow"
  - "direct"
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
  hash: "1385dbb3d412718022c0578bf0e8d4ed3d03c10a"
  message: "✨ GNVXQ1 AP-019: direct start/block/finish parity"
comments:
  -
    author: "CODER"
    body: "Start: implement direct start/block/finish parity with comments, commit metadata, and export lint flow."
  -
    author: "CODER"
    body: "verified: bun run ci passed (format, typecheck, lint, coverage)."
doc_version: 2
doc_updated_at: "2026-02-03T12:09:11.588Z"
doc_updated_by: "agentplane"
description: "Implement start/block/finish for direct mode with comments, commit metadata, and lint pass flow."
---
## Summary

Added block/finish commands, enabled env task-id fallback, and expanded CLI coverage for direct workflow status updates.

## Scope

- Implement block and finish CLI flows with comment validation and status updates.\n- Add env-based task id fallback for start/block/finish.\n- Expand CLI tests to meet coverage gates.

## Risks

- Direct workflow status changes could regress lint/export flow; mitigated by CI coverage tests.

## Verify Steps

bun run ci

## Rollback Plan

git revert 1385dbb3d412

## Plan


## Verification
