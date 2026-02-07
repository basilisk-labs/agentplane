---
id: "202601191510-6ZKD5S"
title: "Document recipes prompts and wire into AGENTS"
status: "DONE"
priority: "med"
owner: "DOCS"
depends_on:
  - "202601191510-0AWCPY"
tags:
  - "recipes"
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
  hash: "154970d7be5a455048d1fc55b85ff7f922f9a9bd"
  message: "✨ 6ZKD5S update recipes prompt rules: add outputs guidance"
comments:
  -
    author: "DOCS"
    body: "verified: updated RECIPES.md outputs guidance and reviewed recipes doc references for consistency."
doc_version: 2
doc_updated_at: "2026-02-03T12:08:54.902Z"
doc_updated_by: "agentplane"
description: "Add .agent-plane/RECIPES.md with global prompt guidance, reference it from AGENTS.md, and update docs/README/PRD as needed to reflect recipes CLI."
---
## Summary

Documented recipe prompt rules and updated docs to reference the new recipes CLI.

## Context

Updated .agent-plane/RECIPES.md and referenced it from AGENTS.md, README.md, docs/README.md, docs/09-commands.md, and .agent-plane/recipes/prd.md.

## Scope

Added global recipe prompt guidance and refreshed documentation pointers to recipes.py and inventory/bundle usage.

## Risks

Docs can drift if recipe CLI behavior changes; keep RECIPES.md aligned with recipes.py updates.

## Verify Steps

Manual review of recipe docs for correct recipes.py references.

## Rollback Plan

Revert the documentation commit for this task if the recipes guidance needs to be rolled back.

## Notes

RECIPES.md now includes outputs/artifacts guidance plus explicit bundle usage rules.

## Plan


## Verification
