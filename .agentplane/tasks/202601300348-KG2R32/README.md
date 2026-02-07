---
id: "202601300348-KG2R32"
title: "Document recipes usage and developer guide"
status: "DONE"
priority: "med"
owner: "ORCHESTRATOR"
depends_on: []
tags:
  - "docs"
  - "recipes"
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
  hash: "c18aac3d05c99734f94a00345f38a8a4b01022e0"
  message: "✨ 202601300348-KG2R32 document recipes usage, built-ins, and authoring"
comments: []
doc_version: 2
doc_updated_at: "2026-01-30T04:05:54+00:00"
doc_updated_by: "agentctl"
description: "Update main repo docs: how recipes work, built-in recipes list, and a developer guide for adding new recipes."
---
## Summary

Expanded recipes documentation with built-in catalog details, runtime behavior, and a developer guide for authoring and releasing recipes.

## Context

The main docs needed a consolidated explanation of how recipes work, what is bundled by default, and how to add new recipes.

## Scope

- Documented built-in vs remote catalog behavior
- Added runtime/execution model notes for scenarios and env handling
- Added a step-by-step developer guide for creating and releasing recipes

## Risks

- Catalog contents can change; docs call out checking the remote index for the latest list.

## Verify Steps

- Not run (documentation-only update).

## Rollback Plan

- Revert the recipes-spec documentation changes.

## Notes

Docs updated in docs/recipes-spec.mdx.

## Plan


## Verification
