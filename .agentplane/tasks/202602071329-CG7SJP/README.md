---
id: "202602071329-CG7SJP"
title: "AP-CLEAN-01: Remove legacy commit-policy orchestration and duplicates"
status: "DOING"
priority: "med"
owner: "CODER"
depends_on:
  - "202602071329-N6F413"
  - "202602071329-0BWGED"
  - "202602071329-V0SPSH"
tags:
  - "roadmap"
  - "cleanup"
  - "refactor"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-02-07T15:47:14.437Z"
  updated_by: "USER"
  note: "Approved in chat on 2026-02-07."
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Remove legacy commit-policy orchestration and duplicate validations now superseded by evaluatePolicy."
events: []
doc_version: 2
doc_updated_at: "2026-02-07T15:47:14.786Z"
doc_updated_by: "CODER"
description: "After migrating to evaluatePolicy, delete old entry points/helpers for commit-policy and other legacy code that duplicates domain logic. Prune dependencies and align package structure to the domain layout."
id_source: "generated"
---
## Summary

Delete legacy commit-policy orchestration and duplicate rule implementations after guard/hooks migrated to the shared policy engine.

## Scope

In scope: remove dead commit-policy entrypoints/helpers and duplicate validations now covered by evaluatePolicy; prune unused code and update tests. Out of scope: changing the policy semantics introduced in AP-POL-01.

## Plan

1. Inventory all legacy commit-policy and duplicated rule code paths (guard, hooks, CLI wrappers, shared helpers).
2. Remove dead/legacy code paths and any deprecated compatibility logic now superseded by the policy engine.
3. Ensure a single source of truth remains for: base branch facts (git domain) and enforcement rules (policy domain).
4. Update imports, help/usage strings, and tests to match the new structure.
5. Run format:check, lint, and test:cli:core.

## Risks

Risk: removing legacy code may break undocumented invocations. Mitigation: rely on CLI core tests and keep a strict allowlist for commits.

## Verification

- bun run format:check
- bun run lint
- bun run test:cli:core

## Rollback Plan

Revert the implementation commit(s) for this task to restore the removed legacy code paths.
