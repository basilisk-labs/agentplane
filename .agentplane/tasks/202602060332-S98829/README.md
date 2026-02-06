---
id: "202602060332-S98829"
title: "Branching model improvements (tracking)"
status: "DONE"
priority: "high"
owner: "ORCHESTRATOR"
depends_on: []
tags: ["workflow"]
verify: []
commit: { hash: "01fb738a7780db1f8f3c140d0bc6de6455909a7d", message: "📝 S76RDP record task metadata" }
comments:
  - { author: "CODER", body: "Verified: bun run test:core; bun run test:cli:core; bun run --filter=@agentplaneorg/core build; bun run --filter=agentplane build.\\nSummary: Implemented base-branch cleanup (remove base_branch, new base resolution/clear/explain), direct work start without worktree, task exports only via task export, docs/tests updates.\\nCommit: 01fb738a7780db1f8f3c140d0bc6de6455909a7d." }
  - { author: "CODER", body: "Commit update: 7a1d5d3d1ada80c2c1c1b136238e17e2d0bf60ea (main changes), 938f94545ae17e44868559cd779fa1a18d5a9b31 (task finish/export snapshots)." }
doc_version: 2
doc_updated_at: "2026-02-06T04:23:17.080Z"
doc_updated_by: "CODER"
description: "Tracking task for BRANCH.md implementation: effective base resolver, branch UX, tasks.json export-only policy, direct work start behavior, and related docs/tests."
id_source: "generated"
---
## Summary

Tracking task for BRANCH.md improvements across base resolution, branch UX, work start, and tasks.json export policy.

## Scope

Coordinate AP-BR-01 through AP-BR-05 implementation, tests, and documentation updates.

## Risks

Scope spans multiple commands and docs; coordination mistakes could leave inconsistent guidance or behavior.

## Verify Steps

bun run test:core; bun run test:cli:core.

## Verification

bun run test:core; bun run test:cli:core.

## Rollback Plan

Revert all AP-BR changes in core/agentplane/docs and restore previous behavior.
