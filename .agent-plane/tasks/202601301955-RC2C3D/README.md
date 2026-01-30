---
id: "202601301955-RC2C3D"
title: "Recipe storage defaults + cache cleanup"
status: "DONE"
priority: "high"
owner: "ORCHESTRATOR"
depends_on: ["none"]
tags: ["nodejs", "recipes", "config", "cli", "cleanup", "docs"]
doc_version: 2
doc_updated_at: "2026-01-30T16:13:57+00:00"
doc_updated_by: "agentctl"
description: "Add config default for recipe storage and a recipe cache prune command; update CLI, config schema/examples, tests, and docs."
---
## Summary

Added config default for recipe storage and a recipe cache prune command; updated CLI, schemas/examples, docs, and tests.

## Scope

Added recipes.storage_default to config + schema/example, defaulted recipe install storage to config, implemented recipe cache prune, and documented CLI changes; added tests for config default and prune.

## Risks

Cache prune is project-scoped by default; running in the wrong repo could remove cached versions used elsewhere unless --all is used intentionally.

## Verify Steps

bun test packages/agentplane/src/run-cli.test.ts -t "recipe cache prune|recipe install uses config storage default|recipe install supports global-only storage|recipe install/list/info/remove manages local recipes"

## Rollback Plan

Remove recipes.storage_default from config/schema and revert recipe cache prune command; restore prior recipe install default behavior.

