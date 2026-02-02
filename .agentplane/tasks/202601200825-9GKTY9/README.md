---
id: "202601200825-9GKTY9"
title: "Add recipes bundle refresh command"
status: "DONE"
priority: "med"
owner: "CODER"
depends_on: []
tags: ["recipes", "cli"]
verify: []
commit: { hash: "eae47d31c3f9fde6a8d986b6f416b4238868b944", message: "✅ 9GKTY9 recipes: add bundle refresh command" }
comments: []
doc_version: 2
doc_updated_at: "2026-01-20T08:29:53+00:00"
doc_updated_by: "agentctl"
description: "Implement recipes.py refresh to rebuild an existing bundle.json using stored recipe, scenario, and inputs."
---
## Summary

Add a refresh command to recipes.py that rebuilds an existing bundle.json from its stored recipe, scenario, and inputs.

## Context

The orchestrator should be able to refresh bundles in code without rerunning full compile when a bundle already exists.

## Scope

- Add a refresh subcommand to recipes.py.
- Reuse stored bundle metadata to compile in place.
- Update bundle.md if a sibling file exists or an explicit --out-md is provided.

## Risks

Refreshing a malformed bundle could fail or produce partial output; ensure validation is strict and errors are clear.

## Verify Steps

Review recipes.py for the refresh command behavior and ensure it does not execute tools.

## Rollback Plan

Revert recipes.py changes.

## Notes

No changes to recipe manifests.
