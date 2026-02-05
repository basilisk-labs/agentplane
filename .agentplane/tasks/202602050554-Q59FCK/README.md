---
id: "202602050554-Q59FCK"
title: "AP-010b: Update-check fetch + ETag"
status: "DONE"
priority: "high"
owner: "CODER"
depends_on: []
tags: ["roadmap", "cli", "update-check", "network"]
verify: []
commit: { hash: "46de5d2c1ec6441840f234b0e445923a154cae93", message: "🧩 Q59FCK update-check fetch with ETag" }
comments:
  - { author: "CODER", body: "Start: add update-check fetch + ETag handling and tests." }
  - { author: "CODER", body: "Verified: update-check fetch/ETag handling added and tests pass under pre-commit hooks." }
doc_version: 2
doc_updated_at: "2026-02-05T06:02:39.769Z"
doc_updated_by: "CODER"
description: "Add conditional fetch logic and cache updates for update-check."
id_source: "generated"
---
## Summary

Implement conditional update-check fetch (ETag) and cache update rules.

## Scope

Add ETag-aware fetch to npm registry, handle 200/304/error, and update cache accordingly.

## Risks

Risk: registry responses or ETag parsing errors; mitigate with defensive parsing and tests.

## Verify Steps

Run update-check fetch tests covering 200/304/error paths and ETag handling.

## Rollback Plan

Revert the fetch/ETag commit and retain prior update-check network behavior.
