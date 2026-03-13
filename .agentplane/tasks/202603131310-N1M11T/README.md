---
id: "202603131310-N1M11T"
title: "Harden retry side effects in task mutations"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 6
depends_on:
  - "202603131310-0KBWXJ"
tags:
  - "code"
  - "cli"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-13T17:24:42.058Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-13T17:32:28.640Z"
  updated_by: "CODER"
  note: "Buffered warning side effects out of local retry-capable mutation callbacks: block/set-status now resolve policy warnings without printing inside builders, dependency warnings in local set-status emit once from the outer path, and start/block/set-status unit suites plus run-cli.core.lifecycle and both builds are green."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: remove warning side effects from retry-capable local mutation callbacks so retries stay idempotent and stderr is emitted exactly once from the final outcome path."
events:
  -
    type: "status"
    at: "2026-03-13T17:24:53.072Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: remove warning side effects from retry-capable local mutation callbacks so retries stay idempotent and stderr is emitted exactly once from the final outcome path."
  -
    type: "verify"
    at: "2026-03-13T17:32:28.640Z"
    author: "CODER"
    state: "ok"
    note: "Buffered warning side effects out of local retry-capable mutation callbacks: block/set-status now resolve policy warnings without printing inside builders, dependency warnings in local set-status emit once from the outer path, and start/block/set-status unit suites plus run-cli.core.lifecycle and both builds are green."
doc_version: 3
doc_updated_at: "2026-03-13T17:32:28.642Z"
doc_updated_by: "CODER"
description: "Buffer or defer warnings and other side effects so retries in task mutation paths remain idempotent and do not duplicate human-facing output."
sections:
  Summary: |-
    Harden retry side effects in task mutations
    
    Buffer or defer warnings and other side effects so retries in task mutation paths remain idempotent and do not duplicate human-facing output.
  Scope: |-
    - In scope: Buffer or defer warnings and other side effects so retries in task mutation paths remain idempotent and do not duplicate human-facing output.
    - Out of scope: unrelated refactors not required for "Harden retry side effects in task mutations".
  Plan: "1. Refactor status/comment-commit warning helpers so retry-capable local mutation callbacks can resolve warnings without printing inside the builder. 2. Buffer dependency-readiness and status-commit warnings in the remaining local mutation paths (start, block, set-status), and emit them exactly once outside TaskStore retry loops while preserving existing non-local behavior. 3. Add regressions for local retry paths to prove warnings are not duplicated when a builder is re-run after a concurrent README refresh."
  Verify Steps: |-
    1. Run `bun x vitest run packages/agentplane/src/commands/task/start.unit.test.ts packages/agentplane/src/commands/task/block.unit.test.ts packages/agentplane/src/commands/task/set-status.unit.test.ts packages/agentplane/src/cli/run-cli.core.lifecycle.test.ts --hookTimeout 60000 --testTimeout 60000`. Expected: local retry-capable mutation paths pass and retry-path warning regressions stay green.
    2. Run `./node_modules/.bin/eslint packages/agentplane/src/commands/task/shared/transitions.ts packages/agentplane/src/commands/task/shared/dependencies.ts packages/agentplane/src/commands/task/start.ts packages/agentplane/src/commands/task/block.ts packages/agentplane/src/commands/task/set-status.ts packages/agentplane/src/commands/task/start.unit.test.ts packages/agentplane/src/commands/task/block.unit.test.ts packages/agentplane/src/commands/task/set-status.unit.test.ts`. Expected: touched runtime and regression files lint cleanly.
    3. Run `bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build`. Expected: both packages compile after the warning-buffering changes.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    #### 2026-03-13T17:32:28.640Z — VERIFY — ok
    
    By: CODER
    
    Note: Buffered warning side effects out of local retry-capable mutation callbacks: block/set-status now resolve policy warnings without printing inside builders, dependency warnings in local set-status emit once from the outer path, and start/block/set-status unit suites plus run-cli.core.lifecycle and both builds are green.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-13T17:24:53.073Z, excerpt_hash=sha256:7f8084121a3b6ad118ac3d486e2c9b26163dd3f16b2b17cda30b7664f7cd37ee
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Harden retry side effects in task mutations

Buffer or defer warnings and other side effects so retries in task mutation paths remain idempotent and do not duplicate human-facing output.

## Scope

- In scope: Buffer or defer warnings and other side effects so retries in task mutation paths remain idempotent and do not duplicate human-facing output.
- Out of scope: unrelated refactors not required for "Harden retry side effects in task mutations".

## Plan

1. Refactor status/comment-commit warning helpers so retry-capable local mutation callbacks can resolve warnings without printing inside the builder. 2. Buffer dependency-readiness and status-commit warnings in the remaining local mutation paths (start, block, set-status), and emit them exactly once outside TaskStore retry loops while preserving existing non-local behavior. 3. Add regressions for local retry paths to prove warnings are not duplicated when a builder is re-run after a concurrent README refresh.

## Verify Steps

1. Run `bun x vitest run packages/agentplane/src/commands/task/start.unit.test.ts packages/agentplane/src/commands/task/block.unit.test.ts packages/agentplane/src/commands/task/set-status.unit.test.ts packages/agentplane/src/cli/run-cli.core.lifecycle.test.ts --hookTimeout 60000 --testTimeout 60000`. Expected: local retry-capable mutation paths pass and retry-path warning regressions stay green.
2. Run `./node_modules/.bin/eslint packages/agentplane/src/commands/task/shared/transitions.ts packages/agentplane/src/commands/task/shared/dependencies.ts packages/agentplane/src/commands/task/start.ts packages/agentplane/src/commands/task/block.ts packages/agentplane/src/commands/task/set-status.ts packages/agentplane/src/commands/task/start.unit.test.ts packages/agentplane/src/commands/task/block.unit.test.ts packages/agentplane/src/commands/task/set-status.unit.test.ts`. Expected: touched runtime and regression files lint cleanly.
3. Run `bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build`. Expected: both packages compile after the warning-buffering changes.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-13T17:32:28.640Z — VERIFY — ok

By: CODER

Note: Buffered warning side effects out of local retry-capable mutation callbacks: block/set-status now resolve policy warnings without printing inside builders, dependency warnings in local set-status emit once from the outer path, and start/block/set-status unit suites plus run-cli.core.lifecycle and both builds are green.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-13T17:24:53.073Z, excerpt_hash=sha256:7f8084121a3b6ad118ac3d486e2c9b26163dd3f16b2b17cda30b7664f7cd37ee

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
