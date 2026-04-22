---
id: "202604220255-E4C2R4"
title: "De-overlap Vitest workspace projects"
status: "TODO"
priority: "high"
owner: "CODER"
revision: 4
origin:
  system: "manual"
depends_on:
  - "202604220255-7DPXA1"
tags:
  - "ci"
  - "testing"
  - "vitest"
verify:
  - "bun run arch:baseline && bun run arch:deps"
  - "bun run ci:local:fast"
  - "bun run knip:check"
  - "git diff --check"
plan_approval:
  state: "approved"
  updated_at: "2026-04-22T02:59:06.197Z"
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
doc_updated_at: "2026-04-22T02:55:44.398Z"
doc_updated_by: "PLANNER"
description: "Restructure vitest.workspace.ts so each test file belongs to one primary project and aggregate execution is handled by scripts instead of overlapping projects."
sections:
  Summary: "Reduce duplicate test execution and ambiguous ownership across Vitest projects."
  Scope: "Vitest workspace config, package scripts, and docs if needed. Preserve existing named CI entrypoints or provide compatible replacements."
  Plan: |-
    1. Map current test file membership across projects.
    2. Define non-overlapping primary projects.
    3. Move aggregate combinations to scripts or documented command groups.
    4. Add or update a project membership lint check if practical.
  Verify Steps: "Run vitest workspace/list validation, fast CI, scripts docs check if scripts changed."
  Verification: "Pending implementation."
  Rollback Plan: "Restore previous vitest.workspace.ts project definitions."
  Findings: "None yet."
id_source: "generated"
---
## Summary

Reduce duplicate test execution and ambiguous ownership across Vitest projects.

## Scope

Vitest workspace config, package scripts, and docs if needed. Preserve existing named CI entrypoints or provide compatible replacements.

## Plan

1. Map current test file membership across projects.
2. Define non-overlapping primary projects.
3. Move aggregate combinations to scripts or documented command groups.
4. Add or update a project membership lint check if practical.

## Verify Steps

Run vitest workspace/list validation, fast CI, scripts docs check if scripts changed.

## Verification

Pending implementation.

## Rollback Plan

Restore previous vitest.workspace.ts project definitions.

## Findings

None yet.
