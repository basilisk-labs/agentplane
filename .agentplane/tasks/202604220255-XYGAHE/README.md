---
id: "202604220255-XYGAHE"
title: "Remove duplicate task doc normalization in task new"
status: "TODO"
priority: "low"
owner: "CODER"
revision: 4
origin:
  system: "manual"
depends_on:
  - "202604220255-104K7S"
tags:
  - "cleanup"
  - "perf"
  - "tasks"
verify:
  - "bun run arch:baseline && bun run arch:deps"
  - "bun run ci:local:fast"
  - "bun run knip:check"
  - "git diff --check"
plan_approval:
  state: "approved"
  updated_at: "2026-04-22T02:58:59.658Z"
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
doc_updated_at: "2026-04-22T02:55:13.923Z"
doc_updated_by: "PLANNER"
description: "Ensure task creation normalizes the generated task document once instead of running redundant normalization paths."
sections:
  Summary: "Simplify task creation document generation and remove double-normalization overhead."
  Scope: "Task creation/doc generation path and tests. Preserve generated README contract exactly unless an existing bug is exposed."
  Plan: |-
    1. Trace task new document generation and normalization calls.
    2. Remove redundant normalization while keeping canonical doc_version=3 output.
    3. Add regression coverage for generated sections.
    4. Verify task new tests and snapshots.
  Verify Steps: "Run task new/doc tests, fast CI, git diff --check."
  Verification: "Pending implementation."
  Rollback Plan: "Restore the previous normalization sequence."
  Findings: "None yet."
id_source: "generated"
---
## Summary

Simplify task creation document generation and remove double-normalization overhead.

## Scope

Task creation/doc generation path and tests. Preserve generated README contract exactly unless an existing bug is exposed.

## Plan

1. Trace task new document generation and normalization calls.
2. Remove redundant normalization while keeping canonical doc_version=3 output.
3. Add regression coverage for generated sections.
4. Verify task new tests and snapshots.

## Verify Steps

Run task new/doc tests, fast CI, git diff --check.

## Verification

Pending implementation.

## Rollback Plan

Restore the previous normalization sequence.

## Findings

None yet.
