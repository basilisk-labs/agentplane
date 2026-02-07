---
id: "202601200542-E5CDTX"
title: "Update recipe docs and prompts"
status: "DONE"
priority: "med"
owner: "DOCS"
depends_on: []
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
  hash: "f91c90b847200d91fc5dadfdff39f83ae31a0126"
  message: "✨ 202601200542-E5CDTX update roadmap recipe docs"
comments:
  -
    author: "DOCS"
    body: "verified: close: roadmap recipe docs in English | details: updated scenarios and input schemas; documented layout and inventory workflow."
doc_version: 2
doc_updated_at: "2026-02-03T12:08:57.439Z"
doc_updated_by: "agentplane"
description: "Rewrite the feature-spec-to-tasks recipe docs (README/scenarios/input schemas) in English, align them with the roadmap purpose, and document recipe formats and the recipe list in RECIPES.md and commands docs."
---
## Summary

Rewrote the roadmap recipe documentation and input schemas in English, aligned them to roadmap outputs, and documented recipe layout and inventory usage.

## Context

Standardized the feature-spec-to-tasks recipe to focus on roadmap generation and ensured documentation matches current recipe formats and policies.

## Scope

Updated recipe README, scenarios, and input schemas; documented recipe layout and inventory generation in RECIPES.md; added commands note in docs/09-commands.md.

## Risks

Documentation can drift if the runner or manifest changes; the inventory list must be regenerated after recipe updates.

## Verify Steps

Reviewed updated recipe docs and schemas; confirmed the recipes scan command is documented for the inventory list.

## Rollback Plan

Revert commit f91c90b84720 to restore the prior documentation and schemas.

## Notes

Documentation-only changes; no runtime behavior updates in this task.

## Plan


## Verification
