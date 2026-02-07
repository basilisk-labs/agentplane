---
id: "202602031648-8RJP59"
title: "Align agent CLI references in templates and installed agents"
status: "DONE"
priority: "med"
owner: "ORCHESTRATOR"
depends_on: []
tags:
  - "docs"
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
  hash: "9d7c87d5dde59d6c2c810fd6944cfbde473887f6"
  message: "📝 8RJP59 align agent CLI references"
comments:
  -
    author: "ORCHESTRATOR"
    body: "Start: Align agent CLI references: repo-local for root AGENTS.md and .agentplane/agents; system agentplane for packages/agentplane/assets templates."
  -
    author: "ORCHESTRATOR"
    body: "Verified: pre-commit hook ran prettier, eslint, and vitest (test-fast) during commit; agentplane verify reported no configured commands."
doc_version: 2
doc_updated_at: "2026-02-03T16:56:09.825Z"
doc_updated_by: "ORCHESTRATOR"
description: "Root AGENTS.md and .agentplane/agents use repo-local agentplane.js; templates in packages/agentplane/assets use system agentplane."
id_source: "generated"
---
## Summary

Aligned CLI references: repo-local agentplane.js for root AGENTS.md and .agentplane/agents; system agentplane for framework assets; updated tests accordingly.

## Scope

AGENTS.md, .agentplane/agents/*.json, packages/agentplane/assets/AGENTS.md, packages/agentplane/src/agents-template.test.ts.

## Risks

Low risk. Documentation/test alignment change; mismatch between repo-local and asset templates could confuse if not kept consistent.

## Verify Steps

Will rely on pre-commit hooks (prettier/eslint/vitest) during commit.

## Rollback Plan

Revert the modified AGENTS templates, installed agents, and tests to the previous CLI reference scheme.

## Plan


## Verification
