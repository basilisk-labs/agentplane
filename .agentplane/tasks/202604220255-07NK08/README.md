---
id: "202604220255-07NK08"
title: "Replace sleep and polling tests with deterministic wait helpers"
status: "TODO"
priority: "med"
owner: "CODER"
revision: 4
origin:
  system: "manual"
depends_on:
  - "202604220255-9XHT1G"
tags:
  - "cleanup"
  - "stability"
  - "testing"
verify:
  - "bun run arch:baseline && bun run arch:deps"
  - "bun run ci:local:fast"
  - "bun run knip:check"
  - "git diff --check"
plan_approval:
  state: "approved"
  updated_at: "2026-04-22T02:59:07.282Z"
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
doc_updated_at: "2026-04-22T02:55:57.427Z"
doc_updated_by: "PLANNER"
description: "Remove short setTimeout sleeps and ad hoc polling loops from test suites where deterministic hooks or filesystem/event predicates can be used."
sections:
  Summary: "Reduce timing-sensitive tests by introducing deterministic wait helpers in testkit."
  Scope: "Testkit wait utilities and affected tests. Do not increase default test timeouts."
  Plan: |-
    1. Inventory setTimeout sleep and polling loop usages in tests.
    2. Add explicit wait helpers around events/files/state predicates.
    3. Replace fragile sleeps in the highest-impact suites first.
    4. Verify repeated local runs of affected tests.
  Verify Steps: "Run affected tests repeatedly where cheap, fast CI, testkit tests."
  Verification: "Pending implementation."
  Rollback Plan: "Restore previous sleeps/polling loops and remove helper changes."
  Findings: "None yet."
id_source: "generated"
---
## Summary

Reduce timing-sensitive tests by introducing deterministic wait helpers in testkit.

## Scope

Testkit wait utilities and affected tests. Do not increase default test timeouts.

## Plan

1. Inventory setTimeout sleep and polling loop usages in tests.
2. Add explicit wait helpers around events/files/state predicates.
3. Replace fragile sleeps in the highest-impact suites first.
4. Verify repeated local runs of affected tests.

## Verify Steps

Run affected tests repeatedly where cheap, fast CI, testkit tests.

## Verification

Pending implementation.

## Rollback Plan

Restore previous sleeps/polling loops and remove helper changes.

## Findings

None yet.
