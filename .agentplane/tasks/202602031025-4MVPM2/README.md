---
id: "202602031025-4MVPM2"
title: "Investigate task README generation duplicates"
status: "TODO"
priority: "med"
owner: "ORCHESTRATOR"
depends_on: []
tags: ["tasks"]
verify: []
comments: []
doc_version: 2
doc_updated_at: "2026-02-03T10:34:13.438Z"
doc_updated_by: "agentplane"
description: "Analyze task README.md generation pipeline, fix duplicate section headings, and clarify agentplane-only edits plus commit/push via agentplane."
id_source: "generated"
---
## Summary

## Scope

## Risks

## Verify Steps

## Rollback Plan

## Summary

Investigated task README generation and fixed duplicate section handling across CLI/core.

## Scope

Updated task doc normalization in CLI and core, added tests, and clarified AGENTS guardrails for agentplane-only task docs and agentplane commit/push.

## Risks

Low risk: doc normalization may slightly reflow whitespace; verified via unit tests.

## Verify Steps

- bun run test:cli:core\n- bun run test:core

## Rollback Plan

Revert changes in run-cli/task-store doc normalization and tests.
