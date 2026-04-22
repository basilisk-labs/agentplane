---
id: "202604220255-YDBAT5"
title: "Consolidate CLI harness helpers and backend doubles"
status: "TODO"
priority: "high"
owner: "CODER"
revision: 4
origin:
  system: "manual"
depends_on:
  - "202604220255-9AW010"
tags:
  - "cleanup"
  - "testing"
  - "testkit"
verify:
  - "bun run arch:baseline && bun run arch:deps"
  - "bun run ci:local:fast"
  - "bun run knip:check"
  - "git diff --check"
plan_approval:
  state: "approved"
  updated_at: "2026-04-22T02:59:01.840Z"
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
doc_updated_at: "2026-04-22T02:55:30.080Z"
doc_updated_by: "PLANNER"
description: "Deduplicate approveTaskPlan and task-backend double helpers across testkit and run-cli lifecycle helper modules."
sections:
  Summary: "Move duplicated CLI lifecycle helper behavior into one public testkit helper and update tests to consume it."
  Scope: "Test helper modules and tests only. No production behavior change."
  Plan: |-
    1. Compare duplicate approveTaskPlan/helper implementations.
    2. Select canonical home in packages/testkit public API.
    3. Replace duplicate test-local helpers with imports from the canonical helper.
    4. Verify affected CLI lifecycle tests.
  Verify Steps: "Run affected run-cli lifecycle tests, testkit tests, fast CI, knip check."
  Verification: "Pending implementation."
  Rollback Plan: "Restore local helper definitions and remove canonical exports added by this task."
  Findings: "None yet."
id_source: "generated"
---
## Summary

Move duplicated CLI lifecycle helper behavior into one public testkit helper and update tests to consume it.

## Scope

Test helper modules and tests only. No production behavior change.

## Plan

1. Compare duplicate approveTaskPlan/helper implementations.
2. Select canonical home in packages/testkit public API.
3. Replace duplicate test-local helpers with imports from the canonical helper.
4. Verify affected CLI lifecycle tests.

## Verify Steps

Run affected run-cli lifecycle tests, testkit tests, fast CI, knip check.

## Verification

Pending implementation.

## Rollback Plan

Restore local helper definitions and remove canonical exports added by this task.

## Findings

None yet.
