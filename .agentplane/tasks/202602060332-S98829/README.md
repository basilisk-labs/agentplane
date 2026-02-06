---
id: "202602060332-S98829"
title: "Branching model improvements (tracking)"
status: "TODO"
priority: "high"
owner: "ORCHESTRATOR"
depends_on: []
tags: ["workflow"]
verify: []
comments: []
doc_version: 2
doc_updated_at: "2026-02-06T04:11:12.526Z"
doc_updated_by: "ORCHESTRATOR"
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
