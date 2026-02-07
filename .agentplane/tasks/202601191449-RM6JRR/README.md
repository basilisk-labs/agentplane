---
id: "202601191449-RM6JRR"
title: "Normalize status indicators in docs"
status: "DONE"
priority: "normal"
owner: "DOCS"
depends_on:
  - "202601191449-YN9FWW"
tags:
  - "docs"
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
  hash: "8e1f29d9eff0ec9608ba8f7826ee08c14dfe1633"
  message: "✨ YN9FWW plan status normalization and retro priority tasks"
comments:
  -
    author: "DOCS"
    body: "verified: status wording aligned and priorities standardized in docs."
doc_version: 2
doc_updated_at: "2026-02-03T12:08:53.047Z"
doc_updated_by: "agentplane"
description: "Choose a single status indicator scheme and update all relevant docs/templates to match."
---
## Summary

Standardized task priority labels to the core set and aligned status wording in docs.

## Context

The repo had mixed priority labels (med/Нормальный) that needed normalization to the standard scheme.

## Scope

- Normalize task priorities to low/normal/high across task docs and export.
- Update docs wording to reference the standard status labels.

## Risks

- Mislabeling priorities could affect reporting expectations if consumers assumed legacy labels.

## Verify Steps

- N/A (doc-only normalization).

## Rollback Plan

- Revert the commits linked in task metadata to restore prior labels.

## Notes

- Status wording in README/agentctl docs now references TODO instead of Backlog.

## Plan


## Verification
