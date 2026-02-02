---
id: "202601200738-BP0RD5"
title: "Document recipe mini-CLI and backend strategy"
status: "DONE"
priority: "med"
owner: "ORCHESTRATOR"
depends_on: []
tags: ["recipes", "docs", "workflow"]
verify: []
commit: { hash: "c9a7cc449afd4d8f56423535f19143588714f0d1", message: "✨ BP0RD5 document recipe mini-cli contract and backend strategy" }
comments:
  - { author: "ORCHESTRATOR", body: "verified: close: mini-cli contract and backend strategy documented." }
doc_version: 2
doc_updated_at: "2026-01-20T07:40:19+00:00"
doc_updated_by: "agentctl"
description: "Document the core vs recipes backend strategy (local backend stays in core; remote backends via recipes) and define the mini-CLI contract for recipe tools, aligned with agentctl-style outputs and errors."
---
## Summary

Documented the recipe mini-CLI contract and clarified the core/local backend strategy in the docs.

## Context

Needed to codify the minimal core (local backend) and require recipe tools to expose a formal mini-CLI interface.

## Scope

Updated AGENTS.md with the local-backend core rule; added a recipe mini-CLI contract and structured output format in RECIPES.md; noted backend strategy in docs/07-tasks-and-backends.md.

## Risks

Documentation changes may need alignment as recipe tooling evolves; enforce the mini-CLI contract in future recipe implementations.

## Verify Steps

Reviewed the updated documentation sections for consistency with core and recipe guardrails.

## Rollback Plan

Revert commit c9a7cc449afd to remove the documentation updates.

## Notes

Mini-CLI JSON output format is now documented in RECIPES.md and should be used for new recipe tools.
