---
id: "202604220255-104K7S"
title: "Stabilize init v2 naming and flags"
status: "DOING"
priority: "low"
owner: "CODER"
revision: 6
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
  state: "ok"
  updated_at: "2026-04-22T04:48:45.644Z"
  updated_by: "CODER"
  note: "Verified init UI naming stabilization. Checks passed: focused init submodule tests (5 files, 22 tests), cli-core init tests (2 files, 44 tests), docs:cli:check, typecheck, eslint on changed init files, git diff --check, arch baseline/deps, knip baseline, ci:local:fast (234 fast files / 1361 tests passed, 2 skipped; 5 critical E2E files / 13 tests passed)."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: remove stale experimental init v2 wording, converge user-facing init UI flag names on stable terminology, and keep compatibility only where existing parser patterns support it."
events:
  -
    type: "status"
    at: "2026-04-22T04:43:37.573Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: remove stale experimental init v2 wording, converge user-facing init UI flag names on stable terminology, and keep compatibility only where existing parser patterns support it."
  -
    type: "verify"
    at: "2026-04-22T04:48:45.644Z"
    author: "CODER"
    state: "ok"
    note: "Verified init UI naming stabilization. Checks passed: focused init submodule tests (5 files, 22 tests), cli-core init tests (2 files, 44 tests), docs:cli:check, typecheck, eslint on changed init files, git diff --check, arch baseline/deps, knip baseline, ci:local:fast (234 fast files / 1361 tests passed, 2 skipped; 5 critical E2E files / 13 tests passed)."
doc_version: 3
doc_updated_at: "2026-04-22T04:48:45.657Z"
doc_updated_by: "CODER"
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
  Verification: |-
    Pending implementation.
    
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-22T04:48:45.644Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified init UI naming stabilization. Checks passed: focused init submodule tests (5 files, 22 tests), cli-core init tests (2 files, 44 tests), docs:cli:check, typecheck, eslint on changed init files, git diff --check, arch baseline/deps, knip baseline, ci:local:fast (234 fast files / 1361 tests passed, 2 skipped; 5 critical E2E files / 13 tests passed).
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-22T04:43:37.588Z, excerpt_hash=sha256:135bdd825a07c78cb854c09a88fe99f5a3f989c284509d6d98266820321f22c6
    
    <!-- END VERIFICATION RESULTS -->
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

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-22T04:48:45.644Z — VERIFY — ok

By: CODER

Note: Verified init UI naming stabilization. Checks passed: focused init submodule tests (5 files, 22 tests), cli-core init tests (2 files, 44 tests), docs:cli:check, typecheck, eslint on changed init files, git diff --check, arch baseline/deps, knip baseline, ci:local:fast (234 fast files / 1361 tests passed, 2 skipped; 5 critical E2E files / 13 tests passed).

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-22T04:43:37.588Z, excerpt_hash=sha256:135bdd825a07c78cb854c09a88fe99f5a3f989c284509d6d98266820321f22c6

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Restore prior wording/flag names; keep compatibility aliases if added only by this task.

## Findings

None yet.
