---
id: "202604220255-9XHT1G"
title: "Remove obsolete mixed root and subpath test mocks"
status: "TODO"
priority: "med"
owner: "CODER"
revision: 4
origin:
  system: "manual"
depends_on:
  - "202604220255-E4C2R4"
tags:
  - "cleanup"
  - "core"
  - "testing"
verify:
  - "bun run arch:baseline && bun run arch:deps"
  - "bun run ci:local:fast"
  - "bun run knip:check"
  - "git diff --check"
plan_approval:
  state: "approved"
  updated_at: "2026-04-22T02:59:06.746Z"
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
doc_updated_at: "2026-04-22T02:55:50.594Z"
doc_updated_by: "PLANNER"
description: "Clean up tests that mock both @agentplaneorg/core root and subpath modules after the subpath migration."
sections:
  Summary: "Make test mocks match the production import graph and reduce fragile duplicate mock setup."
  Scope: "Tests and mocks only. Production imports should already be covered by prior core subpath task."
  Plan: |-
    1. Find tests that mock both root and subpath core modules.
    2. Keep only mocks matching actual production imports.
    3. Extract shared mock setup where repeated.
    4. Verify affected tests and knip baseline.
  Verify Steps: "Run affected tests, fast CI, knip check."
  Verification: "Pending implementation."
  Rollback Plan: "Restore previous mock declarations."
  Findings: "None yet."
id_source: "generated"
---
## Summary

Make test mocks match the production import graph and reduce fragile duplicate mock setup.

## Scope

Tests and mocks only. Production imports should already be covered by prior core subpath task.

## Plan

1. Find tests that mock both root and subpath core modules.
2. Keep only mocks matching actual production imports.
3. Extract shared mock setup where repeated.
4. Verify affected tests and knip baseline.

## Verify Steps

Run affected tests, fast CI, knip check.

## Verification

Pending implementation.

## Rollback Plan

Restore previous mock declarations.

## Findings

None yet.
