---
id: "202604220255-9AW010"
title: "Complete core subpath surface and root import ban"
status: "TODO"
priority: "high"
owner: "CODER"
revision: 4
origin:
  system: "manual"
depends_on:
  - "202604220255-AQHZT4"
tags:
  - "architecture"
  - "core"
  - "lint"
verify:
  - "bun run arch:baseline && bun run arch:deps"
  - "bun run ci:local:fast"
  - "bun run knip:check"
  - "git diff --check"
plan_approval:
  state: "approved"
  updated_at: "2026-04-22T02:59:01.169Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit: null
comments: []
events: []
doc_version: 3
doc_updated_at: "2026-04-22T02:55:24.960Z"
doc_updated_by: "PLANNER"
description: "Add missing core subpath exports for config/project/commit surfaces and make lint enforcement cover remaining production root imports."
sections:
  Summary: "Finish the subpath-export migration so production packages do not depend on the root @agentplaneorg/core barrel except intentional public compatibility cases."
  Scope: "Core package exports, tsup config if needed, ESLint restricted imports, and production import callsites. Avoid breaking external compatibility without documented deprecation."
  Plan: |-
    1. Inventory remaining production root core imports and map symbols to subpaths.
    2. Add missing subpath entries for config/project/commit as needed.
    3. Migrate callsites and extend lint restrictions.
    4. Keep root barrel as compatibility surface where policy requires.
  Verify Steps: "Run lint/fast CI, core build/type checks, arch checks, cold-path check."
  Verification: "Pending implementation."
  Rollback Plan: "Restore root imports and remove newly added subpath export entries."
  Findings: "None yet."
id_source: "generated"
---
## Summary

Finish the subpath-export migration so production packages do not depend on the root @agentplaneorg/core barrel except intentional public compatibility cases.

## Scope

Core package exports, tsup config if needed, ESLint restricted imports, and production import callsites. Avoid breaking external compatibility without documented deprecation.

## Plan

1. Inventory remaining production root core imports and map symbols to subpaths.
2. Add missing subpath entries for config/project/commit as needed.
3. Migrate callsites and extend lint restrictions.
4. Keep root barrel as compatibility surface where policy requires.

## Verify Steps

Run lint/fast CI, core build/type checks, arch checks, cold-path check.

## Verification

Pending implementation.

## Rollback Plan

Restore root imports and remove newly added subpath export entries.

## Findings

None yet.
