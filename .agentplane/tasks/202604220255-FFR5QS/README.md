---
id: "202604220255-FFR5QS"
title: "Split run-cli query support god helper"
status: "TODO"
priority: "high"
owner: "CODER"
revision: 4
origin:
  system: "manual"
depends_on:
  - "202604220255-YDBAT5"
tags:
  - "cli"
  - "refactor"
  - "testing"
verify:
  - "bun run arch:baseline && bun run arch:deps"
  - "bun run ci:local:fast"
  - "bun run knip:check"
  - "git diff --check"
plan_approval:
  state: "approved"
  updated_at: "2026-04-22T02:59:03.474Z"
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
doc_updated_at: "2026-04-22T02:55:33.210Z"
doc_updated_by: "PLANNER"
description: "Break run-cli.core.tasks.query-support into focused fixtures and remove import-time side effects from helper modules."
sections:
  Summary: "Make CLI task query test helpers composable and side-effect-free at import time."
  Scope: "CLI test support modules and affected tests only. No production command changes."
  Plan: |-
    1. Identify side-effectful setup in query-support.
    2. Split fixture creation, harness installation, assertions, and data builders into focused modules.
    3. Move installRunCliIntegrationHarness behind explicit test setup calls.
    4. Verify all task query tests.
  Verify Steps: "Run task query CLI tests, fast CI, knip check."
  Verification: "Pending implementation."
  Rollback Plan: "Restore the single query-support helper module and previous imports."
  Findings: "None yet."
id_source: "generated"
---
## Summary

Make CLI task query test helpers composable and side-effect-free at import time.

## Scope

CLI test support modules and affected tests only. No production command changes.

## Plan

1. Identify side-effectful setup in query-support.
2. Split fixture creation, harness installation, assertions, and data builders into focused modules.
3. Move installRunCliIntegrationHarness behind explicit test setup calls.
4. Verify all task query tests.

## Verify Steps

Run task query CLI tests, fast CI, knip check.

## Verification

Pending implementation.

## Rollback Plan

Restore the single query-support helper module and previous imports.

## Findings

None yet.
