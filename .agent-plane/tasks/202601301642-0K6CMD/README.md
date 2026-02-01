---
id: "202601301642-0K6CMD"
title: "Port recipes parity to Node CLI"
status: "DOING"
priority: "high"
owner: "ORCHESTRATOR"
depends_on: []
tags: ["nodejs", "recipes", "cli", "parity"]
comments:
  - { author: "ORCHESTRATOR", body: "Start: Implement Node CLI recipe parity, optimize installs, and refresh recipe listing." }
doc_version: 2
doc_updated_at: "2026-02-01T13:04:07+00:00"
doc_updated_by: "agentctl"
description: "Implement Node CLI support for Python recipes.py features: list-remote/install/list/full/tag search/metadata cache and optimized recipe handling."
---
## Summary

Recipes CLI now uses the installed registry for list/tag, adds recipes explain with scenario details, and updates recipe docs accordingly.

## Scope

packages/agentplane/src/run-cli.ts; packages/agentplane/src/help.ts; packages/agentplane/src/run-cli.test.ts; docs/recipes-how-it-works.mdx; docs/recipes-spec.mdx; docs/commands.mdx; docs/cli-contract.mdx.

## Risks

Explain output can be verbose; scenario details depend on definition files being present in installed recipes.

## Verify Steps

bun test packages/agentplane/src/run-cli.test.ts

## Rollback Plan

Revert recipe CLI and docs changes to restore previous list/info behavior.

