---
id: "202601300418-XPJTRW"
title: "Load .env in dokploy tool"
status: "DONE"
priority: "med"
owner: "ORCHESTRATOR"
depends_on: []
tags: ["recipes", "dokploy"]
commit: { hash: "b5bd66823e703c9a539be81d60d6a32f1db90287", message: "✨ 202601300418-XPJTRW load .env in dokploy tool" }
doc_version: 2
doc_updated_at: "2026-01-30T04:19:22+00:00"
doc_updated_by: "agentctl"
description: "Add a minimal .env loader in the Dokploy recipe tool so scenarios can run without manual env export."
---
## Summary

Added a minimal .env loader to the Dokploy recipe tool so scenarios can run without manual env export.

## Context

Dokploy scenarios require API endpoint and key from .env; this change reduces friction for recipe users.

## Scope

- Parse .env in the tool and populate missing process.env keys
- Preserve existing env values

## Risks

- .env parsing is minimal and may not support advanced dotenv syntax.

## Verify Steps

- Not run (small tool change).

## Rollback Plan

- Revert the dokploy.mjs changes in the recipe.

## Notes

Loader ignores comments/blank lines and strips surrounding quotes.

