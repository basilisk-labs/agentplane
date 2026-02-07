---
id: "202601200752-GSWYEG"
title: "Document backend routing and Redmine enablement"
status: "DONE"
priority: "med"
owner: "DOCS"
depends_on: []
tags:
  - "docs"
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
  hash: "f968c09c52df03372b3362bf7544998c869e49db"
  message: "✅ GSWYEG docs: clarify backend routing and Redmine enablement"
comments: []
doc_version: 2
doc_updated_at: "2026-01-20T08:12:03+00:00"
doc_updated_by: "agentctl"
description: "Clarify how agentctl routes tasks between local storage and optional Redmine integration, and document enable/disable flow via recipes."
---
## Summary

Document backend routing and Redmine recipe enable/disable flow.

## Context

Clarify how agentctl routes tasks after Redmine activation and reinforce that the local backend remains the base store and cache.

## Scope

- Update docs/07 to emphasize local base store plus remote optionality.
- Update docs/12 with recipe enable/disable steps and routing flow details.

## Risks

Docs could imply implicit tool execution or confuse canonical vs cache roles.

## Verify Steps

Review docs/07 and docs/12 for accuracy and English-only wording.

## Rollback Plan

Revert the documentation changes.

## Notes

No code or behavior changes.

## Plan


## Verification
