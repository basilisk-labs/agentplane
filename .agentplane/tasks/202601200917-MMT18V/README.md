---
id: "202601200917-MMT18V"
title: "Add global recipes bundle CLI"
status: "DONE"
priority: "med"
owner: "CODER"
depends_on: []
tags:
  - "recipes"
  - "cli"
  - "context"
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
  hash: "66fca3f2b17e97b9144a62891e912dcd08a9c343"
  message: "✅ MMT18V recipes: add global bundle build/show"
comments: []
doc_version: 2
doc_updated_at: "2026-01-24T18:16:18+00:00"
doc_updated_by: "agentctl"
description: "Implement recipes.py bundle build/show to generate a global recipes bundle with context and allowed commands."
---
## Summary

Implement a global recipes bundle CLI that aggregates all recipes with context and allowed commands.

## Context

Agents need a single bundle to know available recipes, scenarios, tools, and context without loading per-scenario bundles.

## Scope

- Add recipes.py bundle build/show commands.
- Aggregate per-recipe context snapshots, tools, and scenario docs.
- Default output to .agent-plane/recipes/bundle.json (not committed).
- Ignore the bundle file in .gitignore.

## Risks

Global bundle size may grow; ensure context limits are enforced and errors are clear.

## Verify Steps

Review recipes.py help and bundle build output structure.

## Rollback Plan

Revert recipes.py and .gitignore changes.

## Notes

No tool execution; bundle is metadata only.

## Plan


## Verification
