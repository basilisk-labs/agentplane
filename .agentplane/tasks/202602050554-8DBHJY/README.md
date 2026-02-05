---
id: "202602050554-8DBHJY"
title: "AP-010a: Update-check cache model"
status: "DOING"
priority: "high"
owner: "CODER"
depends_on: []
tags: ["roadmap", "cli", "update-check", "cache"]
verify: []
commit: null
comments:
  - { author: "CODER", body: "Start: implement update-check cache model and persistence utilities." }
doc_version: 2
doc_updated_at: "2026-02-05T05:56:14.902Z"
doc_updated_by: "CODER"
description: "Implement update-check cache read/write, TTL, and atomic writes."
id_source: "generated"
---
## Summary

Add update-check cache format, TTL handling, and atomic persistence.

## Scope

Introduce update-check cache read/write utilities, TTL logic, and atomic write for cache file.

## Risks

Risk: cache path or schema mismatch; mitigate with tests and explicit schema versioning.

## Verify Steps

Run unit tests for update-check cache utilities; ensure TTL logic and atomic writes behave.

## Rollback Plan

Revert the cache utility commit to restore prior update-check behavior.
