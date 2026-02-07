---
id: "202601300348-EV7PZ5"
title: "Release and push recipe updates"
status: "DONE"
priority: "med"
owner: "ORCHESTRATOR"
depends_on:
  - "202601300348-WETHGB"
tags:
  - "recipes"
  - "release"
  - "git"
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
  hash: "a4cc96465b18d02bbf6182c8d18d4962ddbf6ddd"
  message: "✨ 202601300348-EV7PZ5 update recipes release index"
comments: []
doc_version: 2
doc_updated_at: "2026-01-30T04:06:05+00:00"
doc_updated_by: "agentctl"
description: "Run the agentplane-recipes release pipeline and push updates in both repos."
---
## Summary

Ran the recipes release build to regenerate the index and update the submodule pointer for the new recipe artifacts.

## Context

Release metadata in agentplane-recipes is generated from recipe manifests and must be rebuilt after adding recipes.

## Scope

- Ran build-release to regenerate index.json and dist artifacts
- Committed updated index.json in agentplane-recipes
- Updated the submodule pointer in the main repo

## Risks

- dist artifacts are untracked locally and must be uploaded as release assets separately.

## Verify Steps

- bun agentplane-recipes/scripts/build-release.ts --tag v0.1.0

## Rollback Plan

- Reset the agentplane-recipes submodule pointer and revert index.json updates.

## Notes

Release artifacts are in agentplane-recipes/dist for upload.

## Plan


## Verification
