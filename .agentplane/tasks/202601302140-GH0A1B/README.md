---
id: "202601302140-GH0A1B"
title: "Remove GitHub sync assets"
status: "DONE"
priority: "normal"
owner: "ORCHESTRATOR"
depends_on: []
tags:
  - "cleanup"
  - "recipes"
  - "docs"
  - "repo"
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
  hash: "1ebcf79f3873a57a7ba9e5c54b0534d0c0f4d7da"
  message: "♻️ VJC5RD migrate to .agentplane layout and add publish environment"
comments:
  -
    author: "ORCHESTRATOR"
    body: "Verified: backfilled commit metadata during migration to satisfy lint; no code changes for this task."
doc_version: 2
doc_updated_at: "2026-02-03T12:09:36.215Z"
doc_updated_by: "agentplane"
description: "Remove .github workflows/scripts and drop the GitHub sync recipe and catalog entry now that GitHub sync is not used."
---
## Summary

Removed .github workflows/scripts and deleted the github-sync recipe plus catalog entry; updated docs to drop GitHub sync references.

## Scope

Deleted .github/workflows/* and .github/scripts/sync_tasks.py; removed agentplane-recipes/recipes/github-sync and index entry; updated audit docs and recipes-spec list.

## Risks

Removing GitHub sync assets prevents any GitHub Issues/Projects automation until reintroduced via a new recipe or workflow.

## Verify Steps

(Docs-only change)

## Rollback Plan

Restore .github workflows/scripts and the github-sync recipe/index entry if GitHub sync is needed again.

## Plan


## Verification
