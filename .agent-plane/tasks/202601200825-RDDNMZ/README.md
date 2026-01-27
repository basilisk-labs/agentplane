---
id: "202601200825-RDDNMZ"
title: "Document recipe bundle refresh"
status: "DONE"
priority: "med"
owner: "DOCS"
depends_on: []
tags: ["recipes", "docs"]
commit: { hash: "97ee8149d897bc6544a629c9623b3b7cb0e19cd2", message: "✅ RDDNMZ docs: document bundle refresh" }
doc_version: 2
doc_updated_at: "2026-01-20T08:29:59+00:00"
doc_updated_by: "agentctl"
description: "Update RECIPES.md to describe the refresh command and how it updates bundle.json and bundle.md."
---
## Summary

Document the recipe bundle refresh command in RECIPES.md.

## Context

Users need a stable, documented way to refresh bundle.json without manual compile steps.

## Scope

- Add a Bundle refresh section to RECIPES.md.
- Explain refresh behavior and bundle.md update rules.

## Risks

Docs could drift from CLI behavior if examples are inaccurate.

## Verify Steps

Review RECIPES.md for accuracy and English-only wording.

## Rollback Plan

Revert RECIPES.md changes.

## Notes

Keep examples minimal and consistent with recipes.py flags.

