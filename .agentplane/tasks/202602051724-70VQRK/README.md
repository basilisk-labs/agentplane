---
id: "202602051724-70VQRK"
title: "Bump packages to 0.1.5"
status: "DOING"
priority: "high"
owner: "CODER"
depends_on: []
tags: ["release", "versioning"]
verify: []
commit: null
comments:
  - { author: "CODER", body: "Start: bump package versions for agentplane and core to 0.1.5." }
doc_version: 2
doc_updated_at: "2026-02-05T17:27:47.916Z"
doc_updated_by: "CODER"
description: "Update package versions to 0.1.5 for agentplane and core."
id_source: "generated"
---
## Summary

Bump package versions to 0.1.5 for agentplane and core.

## Scope

Update packages/agentplane/package.json and packages/core/package.json versions to 0.1.5.

## Risks

Version mismatch if any package is missed.

## Verify Steps

Check package.json versions are 0.1.5 in packages/agentplane and packages/core.

## Verification

Confirmed package versions updated to 0.1.5 in agentplane and core.

## Rollback Plan

Revert package.json version changes.
