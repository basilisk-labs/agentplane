---
id: "202602051552-BB7ZAC"
title: "AP-092: Normalize env variables with compatibility"
status: "TODO"
priority: "high"
owner: "CODER"
depends_on: ["[]"]
tags: ["roadmap", "env", "compatibility"]
verify: []
commit: null
comments: []
doc_version: 2
doc_updated_at: "2026-02-05T15:52:58.239Z"
doc_updated_by: "CODER"
description: "Normalize env names with compatibility window and update docs/tests."
id_source: "generated"
---
## Summary

Normalize env variable names with a compatibility window.

## Scope

- Define canonical env names.\n- Support legacy names temporarily.\n- Update tests/docs.

## Risks

- Unexpected overrides if both old/new env vars are set.

## Verify Steps

- bun run test:fast.\n- Validate env resolution prefers canonical names.

## Verification

Pending.

## Rollback Plan

- Remove normalization layer and restore legacy env usage.
