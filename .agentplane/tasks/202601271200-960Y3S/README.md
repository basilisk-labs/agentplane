---
id: "202601271200-960Y3S"
title: "AP-014: commit policy suffix + generic tokens"
status: "DONE"
priority: "high"
owner: "CODER"
depends_on: ["202601270756-V6CK4Q", "202601271200-R1W3KX"]
tags: ["nodejs", "roadmap", "git", "policy"]
verify: ["bun run ci"]
commit: { hash: "e8e82e179ade7e3d30336081ea3c9926768ec99e", message: "✨ 960Y3S AP-014: commit subject policy" }
comments:
  - { author: "CODER", body: "verified: bun run ci passed | details: commit subject policy helpers and tests added." }
doc_version: 2
doc_updated_at: "2026-02-03T12:09:10.301Z"
doc_updated_by: "agentplane"
description: "Enforce commit subject matching task suffix/id and block generic commit tokens from config."
---
## Summary

Add commit subject policy validation (suffix/id match + generic-token guard) with unit and git integration tests.

## Scope

Core commit policy helpers + tests; no CLI wiring yet.

## Risks

May reject legitimate short subjects if they match generic tokens; tune config.commit.generic_tokens if needed.

## Verify Steps

bun run ci

## Rollback Plan

Revert commit after AP-014 implementation.
