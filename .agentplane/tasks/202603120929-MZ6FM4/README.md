---
id: "202603120929-MZ6FM4"
title: "Deduplicate verify record parsing"
result_summary: "dedupe verify record parsing"
status: "DONE"
priority: "med"
owner: "CODER"
depends_on: []
tags:
  - "code"
verify: []
plan_approval:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-12T09:48:41.112Z"
  updated_by: "CODER"
  note: "Verify parsing refactor validated by verify-record unit tests, run-cli verify tests, and verify-focused workflow coverage."
commit:
  hash: "979a0f9b9e25773b90c60ebbdfaaa3111b0053a5"
  message: "🚧 MZ6FM4 task: dedupe verify record parsing"
comments:
  -
    author: "CODER"
    body: "Start: extract shared verify-record input parsing and validation while preserving verify ok/rework command behavior and user-facing messages."
  -
    author: "CODER"
    body: "Verified: verify-layer parsing and validation now flow through shared command-spec and runtime helpers while preserving existing CLI output and error contracts."
events:
  -
    type: "status"
    at: "2026-03-12T09:41:44.456Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: extract shared verify-record input parsing and validation while preserving verify ok/rework command behavior and user-facing messages."
  -
    type: "verify"
    at: "2026-03-12T09:48:41.112Z"
    author: "CODER"
    state: "ok"
    note: "Verify parsing refactor validated by verify-record unit tests, run-cli verify tests, and verify-focused workflow coverage."
  -
    type: "status"
    at: "2026-03-12T09:48:49.755Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: verify-layer parsing and validation now flow through shared command-spec and runtime helpers while preserving existing CLI output and error contracts."
doc_version: 3
doc_updated_at: "2026-03-12T09:48:49.755Z"
doc_updated_by: "CODER"
description: "Extract shared verification input parsing and validation from verify-record flows without changing CLI behavior."
id_source: "generated"
---
## Summary

Extract shared verification input parsing from verify-record flows while keeping the CLI surface and user-facing messages stable.

## Scope

Touch verify command implementation, nearby thin wrappers, and tests needed to lock current behavior.

## Plan

Deduplicate verify-record validation and parsing paths behind a shared helper while preserving current CLI contracts.

## Verify Steps

1. Run `bun x vitest run packages/agentplane/src/commands/task/verify-record*.test.ts packages/agentplane/src/cli/run-cli.core.lifecycle.test.ts --hookTimeout 60000 --testTimeout 60000` or the exact replacement verification set.
2. Confirm `verify ok`, `verify rework`, and parsed `verify` command behavior still match current error/output contracts.
3. Run any additional targeted suite required by the extracted helper boundary.

## Verification

Pending.

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-12T09:48:41.112Z — VERIFY — ok

By: CODER

Note: Verify parsing refactor validated by verify-record unit tests, run-cli verify tests, and verify-focused workflow coverage.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-12T09:41:44.456Z, excerpt_hash=sha256:459cfc3803a3a6d62240f29741f3d9c5f181cc81784e08ec1da23d7a7b5759d9

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert the helper extraction if user-facing verify behavior, error messages, or command routing changes.

## Findings

None yet.
