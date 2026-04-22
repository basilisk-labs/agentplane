---
id: "202604220255-7DPXA1"
title: "Split remaining oversized CLI mega-tests"
status: "TODO"
priority: "high"
owner: "CODER"
revision: 4
origin:
  system: "manual"
depends_on:
  - "202604220255-FFR5QS"
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
  updated_at: "2026-04-22T02:59:04.773Z"
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
doc_updated_at: "2026-04-22T02:55:37.907Z"
doc_updated_by: "PLANNER"
description: "Split block-finish, task-hosted-close, and init mega-test files into scenario-focused files under the configured test size threshold."
sections:
  Summary: "Reduce large CLI test files into scenario files that are easier to debug and compatible with hotspot/test guards."
  Scope: "Test files and test helper imports only. Do not weaken scenario coverage."
  Plan: |-
    1. Split each mega-test by scenario family.
    2. Move shared setup to existing or newly consolidated testkit helpers.
    3. Preserve test names enough for failure triage.
    4. Run oversized-test guard and affected project suites.
  Verify Steps: "Run oversized hotspot/test guard, affected CLI suites, fast CI."
  Verification: "Pending implementation."
  Rollback Plan: "Restore previous mega-test files and remove split files."
  Findings: "None yet."
id_source: "generated"
---
## Summary

Reduce large CLI test files into scenario files that are easier to debug and compatible with hotspot/test guards.

## Scope

Test files and test helper imports only. Do not weaken scenario coverage.

## Plan

1. Split each mega-test by scenario family.
2. Move shared setup to existing or newly consolidated testkit helpers.
3. Preserve test names enough for failure triage.
4. Run oversized-test guard and affected project suites.

## Verify Steps

Run oversized hotspot/test guard, affected CLI suites, fast CI.

## Verification

Pending implementation.

## Rollback Plan

Restore previous mega-test files and remove split files.

## Findings

None yet.
