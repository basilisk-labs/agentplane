---
id: "202602031504-5KNP91"
title: "Release 0.1.3"
status: "DONE"
priority: "high"
owner: "ORCHESTRATOR"
depends_on: []
tags: ["release"]
verify: []
commit: { hash: "574678b50ddcf26d1045fc22cff5fd20d82d6a66", message: "📦 5KNP91 release 0.1.3" }
comments:
  - { author: "ORCHESTRATOR", body: "Start: bump versions to 0.1.3 and publish via GitHub Actions trusted publishing." }
  - { author: "ORCHESTRATOR", body: "Verified: git push origin v0.1.3 triggered pre-push test-full (vitest) and completed successfully; release tag v0.1.3 created." }
doc_version: 2
doc_updated_at: "2026-02-03T15:40:38.617Z"
doc_updated_by: "ORCHESTRATOR"
description: "Bump versions to 0.1.3 and publish to npm via GitHub Actions."
id_source: "generated"
---
## Summary

Release 0.1.3 by bumping package versions and updating CLI/test version strings.

## Scope

Update version references to 0.1.3 in core/agentplane packages and CLI/test fixtures; prepare release commit and tag for GitHub Actions publish.

## Risks

If any version strings are missed, published package could report the wrong version or docs/tests may fail.

## Verify Steps

rg "0.1.2" packages/core packages/agentplane

## Rollback Plan

Revert the release commit and delete tag v0.1.3 if it was pushed.
