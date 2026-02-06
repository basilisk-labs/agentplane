---
id: "202602060332-B46WJ2"
title: "AP-BR-04 Direct mode work start alignment"
status: "TODO"
priority: "med"
owner: "CODER"
depends_on: []
tags: ["workflow"]
verify: []
comments: []
doc_version: 2
doc_updated_at: "2026-02-06T04:09:49.927Z"
doc_updated_by: "CODER"
description: "Implement work start in direct mode (create task branch from HEAD, optional worktree, minimal scaffold) and align docs. Includes tests and docs updates."
id_source: "generated"
---
## Summary

Enabled work start in direct mode (optional worktree) and aligned CLI parsing/tests/docs.

## Scope

Work start command behavior, CLI flag validation, tests, and workflow documentation.

## Risks

Direct-mode work start now switches/creates branches; users must be ready for checkout changes.

## Verify Steps

bun run test:core; bun run test:cli:core.

## Verification

bun run test:core; bun run test:cli:core.

## Rollback Plan

Revert work start direct-mode changes and restore strict branch_pr-only behavior.
