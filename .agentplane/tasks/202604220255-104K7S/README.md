---
id: "202604220255-104K7S"
title: "Stabilize init v2 naming and flags"
status: "TODO"
priority: "low"
owner: "CODER"
revision: 4
origin:
  system: "manual"
depends_on:
  - "202604220254-938Q7X"
tags:
  - "cli"
  - "init"
  - "ux"
verify:
  - "bun run arch:baseline && bun run arch:deps"
  - "bun run ci:local:fast"
  - "bun run knip:check"
  - "git diff --check"
plan_approval:
  state: "approved"
  updated_at: "2026-04-22T02:58:58.879Z"
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
doc_updated_at: "2026-04-22T02:55:05.772Z"
doc_updated_by: "PLANNER"
description: "Remove stale experimental wording from init v2 user-facing text and converge init UI flags on stable names."
sections:
  Summary: "Align init v2 docs/help/output with its current default status."
  Scope: "Init command help/docs/tests only. Do not reintroduce legacy init UI support."
  Plan: |-
    1. Find experimental init v2 wording in help, docs, and tests.
    2. Rename or alias flags to stable UI naming where supported by existing parser patterns.
    3. Update snapshots and docs for stable terminology.
    4. Verify init command suites.
  Verify Steps: "Run init CLI tests, docs checks if docs changed, fast CI."
  Verification: "Pending implementation."
  Rollback Plan: "Restore prior wording/flag names; keep compatibility aliases if added only by this task."
  Findings: "None yet."
id_source: "generated"
---
## Summary

Align init v2 docs/help/output with its current default status.

## Scope

Init command help/docs/tests only. Do not reintroduce legacy init UI support.

## Plan

1. Find experimental init v2 wording in help, docs, and tests.
2. Rename or alias flags to stable UI naming where supported by existing parser patterns.
3. Update snapshots and docs for stable terminology.
4. Verify init command suites.

## Verify Steps

Run init CLI tests, docs checks if docs changed, fast CI.

## Verification

Pending implementation.

## Rollback Plan

Restore prior wording/flag names; keep compatibility aliases if added only by this task.

## Findings

None yet.
