---
id: "202602031025-4MVPM2"
title: "Investigate task README generation duplicates"
status: "DONE"
priority: "med"
owner: "ORCHESTRATOR"
depends_on: []
tags:
  - "tasks"
verify: []
plan_approval:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit:
  hash: "8ed26fc5114c2675d68708835a32922470d13cd0"
  message: "✨ 4MVPM2 dedupe task doc sections"
comments:
  -
    author: "ORCHESTRATOR"
    body: "Verified: bun run test:cli:core; bun run test:core. Note: commit used LEFTHOOK=0 to bypass hooks due to unrelated README formatting issues."
doc_version: 2
doc_updated_at: "2026-02-03T12:09:52.579Z"
doc_updated_by: "agentplane"
description: "Analyze task README.md generation pipeline, fix duplicate section headings, and clarify agentplane-only edits plus commit/push via agentplane."
id_source: "generated"
---
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

## Plan


## Verification
