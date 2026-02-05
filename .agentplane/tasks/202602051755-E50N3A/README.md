---
id: "202602051755-E50N3A"
title: "Release workflow: version checks + GitHub Release"
status: "DOING"
priority: "high"
owner: "CODER"
depends_on: []
tags: ["release", "ci"]
verify: []
commit: null
comments:
  - { author: "CODER", body: "Start: add version/tag validation and auto GitHub Release to publish workflow." }
doc_version: 2
doc_updated_at: "2026-02-05T17:57:29.849Z"
doc_updated_by: "CODER"
description: "Add version/tag validation and auto-create GitHub Release on tag publish."
id_source: "generated"
---
## Summary

Add release version checks and GitHub Release creation to tag-based publish workflow.

## Scope

Update publish.yml to tag-only trigger with contents:write, add version/tag validation script, and create GitHub Release from docs/releases/vX.Y.Z.md.

## Risks

Wrong version/tag detection could block releases or publish wrong versions.

## Verify Steps

Inspect workflow and script changes; ensure publish.yml validates release notes and version alignment for vX.Y.Z.

## Verification

Reviewed publish.yml changes, added version check script, and configured GitHub Release creation with body from docs/releases/vX.Y.Z.md.

## Rollback Plan

Revert publish workflow/script changes to restore prior behavior.
