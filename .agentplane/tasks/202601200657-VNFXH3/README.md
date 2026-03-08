---
id: "202601200657-VNFXH3"
title: "Phase 2 migration: QA, release, and docs recipes"
status: "DONE"
priority: "med"
owner: "ORCHESTRATOR"
depends_on:
  - "202601200657-W1Y6ND"
tags:
  - "recipes"
  - "workflow"
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
  hash: "09dcb1df2d4dafdc243fd542e8e33245aa53e9e5"
  message: "✨ VNFXH3 add phase 2 QA/release/docs recipes"
comments:
  -
    author: "ORCHESTRATOR"
    body: "verified: added QA plan, release checklist, and docs scaffold recipes | details: inventory refreshed."
doc_version: 3
doc_updated_at: "2026-02-03T12:08:58.948Z"
doc_updated_by: "agentplane"
description: "Move QA/test planning, release checklists, and docs scaffolding into recipes; keep core limited to agent/task runtime."
---
## Summary

- Added QA plan, release checklist, and docs scaffold recipes.
- Refreshed the recipes inventory to include the new recipes.

## Scope

- Create recipes for QA/test planning, release checklists, and docs scaffolding.
- Update the recipes inventory for discovery.

## Plan


## Verify Steps

- python .agent-plane/recipes.py scan --recipes-dir .agent-plane/recipes --output docs/recipes-inventory.json

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert the new recipe folders and inventory update.\n- Remove the recipes from docs/recipes-inventory.json.

## Findings


## Risks

- Recipes may need iteration if workflows change or require automation.\n- Docs scaffolding could conflict with existing files if users ignore prompts.
