---
id: "202601271200-R1W3KX"
title: "AP-013: base branch pinning"
status: "DONE"
priority: "high"
owner: "CODER"
depends_on: ["202601270756-RMNY59"]
tags: ["nodejs", "roadmap", "git", "branch"]
verify: ["bun run ci"]
commit: { hash: "9eed9c408b75b3dbf5d8ae39da33338a7a46acce", message: "✨ R1W3KX AP-013: base branch pinning" }
comments:
  - { author: "CODER", body: "verified: bun run ci passed | details: base branch pinning and CLI branch base get/set implemented." }
doc_version: 2
doc_updated_at: "2026-01-27T12:08:13+00:00"
doc_updated_by: "agentctl"
description: "Implement base branch pinning via git config agentplane.baseBranch with branch base get|set commands."
---
## Summary

Add base branch pinning via git config and expose branch base get|set in CLI with tests.

## Scope

Core: base-branch helpers + tests. CLI: branch base get|set command and help/tests.

## Risks

Requires git in PATH; command errors if git is missing. Tests now rely on git init in temp repos.

## Verify Steps

bun run ci

## Rollback Plan

Revert commit after AP-013 implementation.
