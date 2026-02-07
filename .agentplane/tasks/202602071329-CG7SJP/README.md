---
id: "202602071329-CG7SJP"
title: "AP-CLEAN-01: Remove legacy commit-policy orchestration and duplicates"
status: "DONE"
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
  note: "Approved in chat on 2026-02-07T15:47:14.437Z."
verification:
  state: "ok"
  updated_at: "2026-02-07T15:59:01.534Z"
  updated_by: "CODER"
  note: "Verified: removed legacy parity/no-op flags and duplicate policy-deny plumbing; removed deprecated base_branch from config and PR meta; updated integrate commit subjects to comply with commit subject policy. format:check, lint, and test:cli:core passed."
commit:
  hash: "0e8ca2d47265de7248bdc9b5f9b6fbb613b8fa0d"
  message: "✅ CG7SJP cleanup: remove legacy parity flags and prune duplicates"
comments:
  -
    author: "CODER"
    body: "Start: Remove legacy commit-policy orchestration and duplicate validations now superseded by evaluatePolicy."
  -
    author: "CODER"
    body: "Verified: legacy commit-policy/parity code removed (no-op finish flags, deprecated base_branch config/meta). Guard/hooks share a single policy engine and a shared deny helper. Integrate now produces commit subjects compliant with the enforced template. format:check, lint, and test:cli:core passed."
events: []
doc_version: 2
doc_updated_at: "2026-02-07T15:59:09.236Z"
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

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-02-07T15:59:01.534Z — VERIFY — ok

By: CODER

Note: Verified: removed legacy parity/no-op flags and duplicate policy-deny plumbing; removed deprecated base_branch from config and PR meta; updated integrate commit subjects to comply with commit subject policy. format:check, lint, and test:cli:core passed.

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert the implementation commit(s) for this task to restore the removed legacy code paths.
