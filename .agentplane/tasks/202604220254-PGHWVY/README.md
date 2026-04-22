---
id: "202604220254-PGHWVY"
title: "Unify supervised runner adapter execution pipeline"
result_summary: "Extracted common supervised runner adapter execution/finalization pipeline into execute-supervised.ts; Codex and custom adapters now keep only adapter-specific manifest, artifact, event, and base-result logic."
status: "DONE"
priority: "med"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on:
  - "202604220254-53MF69"
tags:
  - "code"
  - "refactor"
  - "runner"
verify:
  - "bun run arch:baseline && bun run arch:deps"
  - "bun run ci:local:fast"
  - "bun run knip:check"
  - "git diff --check"
plan_approval:
  state: "approved"
  updated_at: "2026-04-22T02:58:56.371Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-22T04:14:19.695Z"
  updated_by: "CODER"
  note: "Verified shared supervised runner executor. Checks: focused runner tests (5 files/38 tests), cli-core query-run-execute Codex/custom tests (2 files/5 tests), typecheck, eslint on changed runner files, arch baseline/deps, knip baseline, git diff --check, ci:local:fast (233 fast files/1357 passed/2 skipped; 5 critical E2E files/13 passed)."
commit:
  hash: "d9b204fbdd9cb8b2b1a73ed74d7b3a459e3d14cd"
  message: "♻️ PGHWVY runner: unify supervised adapter execution"
comments:
  -
    author: "CODER"
    body: "Start: consolidate duplicated supervised execution/finalization flow between Codex and custom runner adapters while preserving adapter-specific event mapping and lifecycle semantics."
  -
    author: "CODER"
    body: "Verified: shared supervised runner executor preserves Codex/custom semantics and passes focused runner, cli-core, arch, knip, diff, typecheck, eslint, and ci:local:fast checks."
events:
  -
    type: "status"
    at: "2026-04-22T04:05:16.068Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: consolidate duplicated supervised execution/finalization flow between Codex and custom runner adapters while preserving adapter-specific event mapping and lifecycle semantics."
  -
    type: "verify"
    at: "2026-04-22T04:14:19.695Z"
    author: "CODER"
    state: "ok"
    note: "Verified shared supervised runner executor. Checks: focused runner tests (5 files/38 tests), cli-core query-run-execute Codex/custom tests (2 files/5 tests), typecheck, eslint on changed runner files, arch baseline/deps, knip baseline, git diff --check, ci:local:fast (233 fast files/1357 passed/2 skipped; 5 critical E2E files/13 passed)."
  -
    type: "status"
    at: "2026-04-22T04:14:34.856Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: shared supervised runner executor preserves Codex/custom semantics and passes focused runner, cli-core, arch, knip, diff, typecheck, eslint, and ci:local:fast checks."
doc_version: 3
doc_updated_at: "2026-04-22T04:14:34.856Z"
doc_updated_by: "CODER"
description: "Consolidate duplicated supervised execution/finalization flow between custom and Codex runner adapters behind a shared executor."
sections:
  Summary: "Remove duplicated process supervision orchestration from runner adapters while preserving adapter-specific event mapping."
  Scope: "Runner adapters, process-supervision integration, and runner tests. Do not change task lifecycle state semantics."
  Plan: |-
    1. Compare CodexRunnerAdapter and CustomRunnerAdapter execution paths.
    2. Extract shared executor/finalizer where behavior is identical.
    3. Keep adapter-specific prompt/env/event logic local.
    4. Update tests to cover both adapters through shared behavior.
  Verify Steps: "Run runner adapter tests, task lifecycle tests, arch checks, fast CI."
  Verification: |-
    Pending implementation.
    
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-22T04:14:19.695Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified shared supervised runner executor. Checks: focused runner tests (5 files/38 tests), cli-core query-run-execute Codex/custom tests (2 files/5 tests), typecheck, eslint on changed runner files, arch baseline/deps, knip baseline, git diff --check, ci:local:fast (233 fast files/1357 passed/2 skipped; 5 critical E2E files/13 passed).
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-22T04:05:16.084Z, excerpt_hash=sha256:0fa856365d1de0c2006d31a8cca6feb6c0237a56ac4bd7a17383375580ca38df
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: "Inline the shared executor back into adapters and restore previous adapter implementations."
  Findings: "None yet."
id_source: "generated"
---
## Summary

Remove duplicated process supervision orchestration from runner adapters while preserving adapter-specific event mapping.

## Scope

Runner adapters, process-supervision integration, and runner tests. Do not change task lifecycle state semantics.

## Plan

1. Compare CodexRunnerAdapter and CustomRunnerAdapter execution paths.
2. Extract shared executor/finalizer where behavior is identical.
3. Keep adapter-specific prompt/env/event logic local.
4. Update tests to cover both adapters through shared behavior.

## Verify Steps

Run runner adapter tests, task lifecycle tests, arch checks, fast CI.

## Verification

Pending implementation.

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-22T04:14:19.695Z — VERIFY — ok

By: CODER

Note: Verified shared supervised runner executor. Checks: focused runner tests (5 files/38 tests), cli-core query-run-execute Codex/custom tests (2 files/5 tests), typecheck, eslint on changed runner files, arch baseline/deps, knip baseline, git diff --check, ci:local:fast (233 fast files/1357 passed/2 skipped; 5 critical E2E files/13 passed).

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-22T04:05:16.084Z, excerpt_hash=sha256:0fa856365d1de0c2006d31a8cca6feb6c0237a56ac4bd7a17383375580ca38df

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Inline the shared executor back into adapters and restore previous adapter implementations.

## Findings

None yet.
