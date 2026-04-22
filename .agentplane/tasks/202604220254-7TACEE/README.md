---
id: "202604220254-7TACEE"
title: "Replace recipes facade imports with direct command imports"
result_summary: "Recipe command entrypoints and init recipe helper no longer import through the broad commands/recipes facade; they import direct implementation modules and source package types."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on:
  - "202604220254-Q6YYWM"
tags:
  - "cli"
  - "perf"
  - "recipes"
verify:
  - "bun run arch:baseline && bun run arch:deps"
  - "bun run ci:local:fast"
  - "bun run knip:check"
  - "git diff --check"
plan_approval:
  state: "approved"
  updated_at: "2026-04-22T02:58:53.945Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-22T03:42:50.899Z"
  updated_by: "CODER"
  note: "Verified direct recipe command imports. Evidence: cli-recipes 31/31 passed; focused recipe command/impl tests 64/64 passed via vitest fast; command catalog/help contract 6/6 passed; typecheck passed; arch:baseline + arch:deps passed with 6 known no-circular ignored; bench:cli:cold:check passed when run alone; git diff --check passed; ci:local:fast passed with 233 fast files / 1357 passed / 2 skipped and critical E2E 5 files / 13 passed."
commit:
  hash: "0bf7d5c1fd118a4efacc46429bd62f9a7529e3ea"
  message: "♻️ 7TACEE recipes: use direct command imports"
comments:
  -
    author: "CODER"
    body: "Start: Replace broad recipes facade imports with direct per-command imports, preserving recipe CLI behavior and validating focused recipe and CLI checks."
  -
    author: "CODER"
    body: "Verified: direct recipe command imports are in place and recipe/CLI/arch/cold/fast CI checks passed."
events:
  -
    type: "status"
    at: "2026-04-22T03:32:38.545Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Replace broad recipes facade imports with direct per-command imports, preserving recipe CLI behavior and validating focused recipe and CLI checks."
  -
    type: "verify"
    at: "2026-04-22T03:42:50.899Z"
    author: "CODER"
    state: "ok"
    note: "Verified direct recipe command imports. Evidence: cli-recipes 31/31 passed; focused recipe command/impl tests 64/64 passed via vitest fast; command catalog/help contract 6/6 passed; typecheck passed; arch:baseline + arch:deps passed with 6 known no-circular ignored; bench:cli:cold:check passed when run alone; git diff --check passed; ci:local:fast passed with 233 fast files / 1357 passed / 2 skipped and critical E2E 5 files / 13 passed."
  -
    type: "status"
    at: "2026-04-22T03:43:12.319Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: direct recipe command imports are in place and recipe/CLI/arch/cold/fast CI checks passed."
doc_version: 3
doc_updated_at: "2026-04-22T03:43:12.321Z"
doc_updated_by: "CODER"
description: "Stop recipe command entrypoints from importing the broad recipes facade and route each CLI command to its minimal implementation module."
sections:
  Summary: "Reduce cold-path import weight by removing broad imports through packages/agentplane/src/commands/recipes.ts for per-command recipe handlers."
  Scope: "Recipe CLI command entrypoints and related tests only. Preserve public recipe CLI behavior."
  Plan: |-
    1. Map each recipe command to its minimal implementation module.
    2. Replace facade imports in list/add/remove/apply style commands.
    3. Keep any public facade only for compatibility if still referenced externally.
    4. Verify command snapshots and recipe command tests.
  Verify Steps: "Run recipe command tests, CLI fast tests, cold-path check, and arch checks."
  Verification: |-
    Pending implementation.
    
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-22T03:42:50.899Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified direct recipe command imports. Evidence: cli-recipes 31/31 passed; focused recipe command/impl tests 64/64 passed via vitest fast; command catalog/help contract 6/6 passed; typecheck passed; arch:baseline + arch:deps passed with 6 known no-circular ignored; bench:cli:cold:check passed when run alone; git diff --check passed; ci:local:fast passed with 233 fast files / 1357 passed / 2 skipped and critical E2E 5 files / 13 passed.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-22T03:32:38.587Z, excerpt_hash=sha256:330077834a358373498a8d041bb4fdaa2e4aaa2e8d34ccb3f2427d26e8993a03
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: "Restore imports from the recipes facade and remove direct import rewiring."
  Findings: "None yet."
id_source: "generated"
---
## Summary

Reduce cold-path import weight by removing broad imports through packages/agentplane/src/commands/recipes.ts for per-command recipe handlers.

## Scope

Recipe CLI command entrypoints and related tests only. Preserve public recipe CLI behavior.

## Plan

1. Map each recipe command to its minimal implementation module.
2. Replace facade imports in list/add/remove/apply style commands.
3. Keep any public facade only for compatibility if still referenced externally.
4. Verify command snapshots and recipe command tests.

## Verify Steps

Run recipe command tests, CLI fast tests, cold-path check, and arch checks.

## Verification

Pending implementation.

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-22T03:42:50.899Z — VERIFY — ok

By: CODER

Note: Verified direct recipe command imports. Evidence: cli-recipes 31/31 passed; focused recipe command/impl tests 64/64 passed via vitest fast; command catalog/help contract 6/6 passed; typecheck passed; arch:baseline + arch:deps passed with 6 known no-circular ignored; bench:cli:cold:check passed when run alone; git diff --check passed; ci:local:fast passed with 233 fast files / 1357 passed / 2 skipped and critical E2E 5 files / 13 passed.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-22T03:32:38.587Z, excerpt_hash=sha256:330077834a358373498a8d041bb4fdaa2e4aaa2e8d34ccb3f2427d26e8993a03

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Restore imports from the recipes facade and remove direct import rewiring.

## Findings

None yet.
