---
id: "202604220256-VE4YY5"
title: "Seal testkit public surface and ban deep imports"
status: "TODO"
priority: "med"
owner: "CODER"
revision: 4
origin:
  system: "manual"
depends_on:
  - "202604220255-07NK08"
tags:
  - "architecture"
  - "lint"
  - "testkit"
verify:
  - "bun run arch:baseline && bun run arch:deps"
  - "bun run ci:local:fast"
  - "bun run knip:check"
  - "git diff --check"
plan_approval:
  state: "approved"
  updated_at: "2026-04-22T02:59:07.900Z"
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
doc_updated_at: "2026-04-22T02:56:03.649Z"
doc_updated_by: "PLANNER"
description: "Export required helpers through @agentplane/testkit and add guardrails that prevent direct imports from packages/testkit/src in tests."
sections:
  Summary: "Make testkit consumption package-level and prevent new deep import coupling."
  Scope: "Testkit exports, test imports, lint/dep-cruiser rules. No production runtime changes."
  Plan: |-
    1. Inventory deep imports from packages/testkit/src.
    2. Add public exports for supported helpers.
    3. Rewrite consumers to @agentplane/testkit imports.
    4. Add lint or dep-cruiser guard for future deep imports.
  Verify Steps: "Run testkit tests, affected suites, arch checks, fast CI."
  Verification: "Pending implementation."
  Rollback Plan: "Restore deep imports and remove added guardrail."
  Findings: "None yet."
id_source: "generated"
---
## Summary

Make testkit consumption package-level and prevent new deep import coupling.

## Scope

Testkit exports, test imports, lint/dep-cruiser rules. No production runtime changes.

## Plan

1. Inventory deep imports from packages/testkit/src.
2. Add public exports for supported helpers.
3. Rewrite consumers to @agentplane/testkit imports.
4. Add lint or dep-cruiser guard for future deep imports.

## Verify Steps

Run testkit tests, affected suites, arch checks, fast CI.

## Verification

Pending implementation.

## Rollback Plan

Restore deep imports and remove added guardrail.

## Findings

None yet.
