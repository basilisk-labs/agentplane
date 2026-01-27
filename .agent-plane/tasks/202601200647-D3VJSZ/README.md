---
id: "202601200647-D3VJSZ"
title: "Audit framework vs recipes"
status: "DONE"
priority: "med"
owner: "ORCHESTRATOR"
depends_on: []
tags: ["recipes", "workflow"]
commit: { hash: "88f3b03eed1a74880d868fc3f6a0551841912fbd", message: "✅ 5Z2HCA export tasks.json after roadmap recipe closure" }
comments:
  - { author: "ORCHESTRATOR", body: "verified: close: framework vs recipe audit completed | details: core/recipe split and migration candidates identified." }
doc_version: 2
doc_updated_at: "2026-01-20T06:49:04+00:00"
doc_updated_by: "agentctl"
description: "Review current framework functionality and identify which capabilities can move into recipes to keep the core minimal."
---
## Summary

Audited the framework and recipe system, confirmed current recipe documentation/CLI coverage, and identified candidates to move into recipes to keep the core minimal.

## Context

Goal was to validate recipe documentation/behavior and map which framework capabilities should be recipes vs core primitives.

## Scope

Reviewed AGENTS.md, RECIPES.md, recipes.py, docs/05-workflow.md, docs/06-agents.md, docs/07-tasks-and-backends.md, docs/09-commands.md, docs/recipes-inventory.json, and the roadmap recipe manifest/scenarios; mapped core vs recipe candidates.

## Risks

Audit is advisory; moving features to recipes must preserve agentctl guardrails and no-task-writes constraints.

## Verify Steps

Reviewed the recipe docs and CLI sources plus workflow/task docs to build the core-vs-recipes map.

## Rollback Plan

No code changes; revert the task doc/finish commits if the audit record must be removed.

## Notes

Recommendations delivered in response; no implementation changes executed.

