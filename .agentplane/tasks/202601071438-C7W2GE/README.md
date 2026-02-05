---
id: "202601071438-C7W2GE"
title: "Update Redmine custom field IDs"
status: "DONE"
priority: "normal"
owner: "CODER"
depends_on: []
tags: ["redmine", "backend", "docs"]
verify: ["echo docs-only"]
commit: { hash: "a31d27a72cba9e89cd51ea3e90533df52bac35d4", message: "✨ C7W2GE update redmine custom field IDs in docs" }
comments:
  - { author: "INTEGRATOR", body: "Verified: not run (docs-only update). Redmine IDs assumed sequential 1-8." }
doc_version: 2
doc_updated_at: "2026-02-03T12:08:35.818Z"
doc_updated_by: "agentplane"
description: "Update Redmine backend config and docs to use sequential custom field IDs 1-8 for task metadata."
---
## Summary

Update Redmine custom field ID mapping to use sequential IDs 1-8 for task metadata.

## Context

User requested sequential Redmine custom field IDs; admin API access was unavailable, so we aligned docs and config to IDs 1-8.

## Scope

- Update Redmine docs/examples to use sequential custom field IDs 1..8.
- Keep backend config aligned with the same mapping.

## Risks

- If Redmine custom field IDs differ, sync will fail until corrected.

## Verify Steps

- (Optional) Confirm custom field IDs in Redmine admin.
- Run `python .agent-plane/agentctl.py sync redmine` after configuration.

## Rollback Plan

Revert the Redmine backend config and docs to the previous custom field IDs.

## Notes

Backend config already uses IDs 1-8; only docs needed updates.

## Changes Summary

- Updated Redmine docs examples to match sequential custom field IDs 1-8.
