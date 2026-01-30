---
id: "202601301931-RC1A2B"
title: "Global recipe cache + project layer modes"
status: "DONE"
priority: "high"
owner: "ORCHESTRATOR"
depends_on: ["none"]
tags: ["nodejs", "recipes", "cli", "storage", "docs"]
doc_version: 2
doc_updated_at: "2026-01-30T16:13:27+00:00"
doc_updated_by: "agentctl"
description: "Add ~/.agentplane recipes cache with link/copy/global-only storage modes; update CLI install/remove/scenario flows, lockfile metadata, tests, and docs."
---
## Summary

Added global recipe cache with project storage modes (link/copy/global), updated CLI flows and lockfile metadata, and aligned docs/tests with cache-backed recipes.

## Scope

Updated recipe install/storage resolution, lockfile fields, scenario/recipe lookup paths, CLI help/usage, and recipe docs; added tests for global-only storage and default behavior.

## Risks

Global cache now stores recipe content; incorrect storage mode or missing cache could break recipe resolution if project layer is absent. Symlink fallback copies content when links fail.

## Verify Steps

bun test packages/agentplane/src/run-cli.test.ts -t "recipe"

## Rollback Plan

Revert changes in run-cli recipe handling, lockfile storage fields, and docs; restore previous recipe install path behavior.

