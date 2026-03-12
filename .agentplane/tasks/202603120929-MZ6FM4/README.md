---
id: "202603120929-MZ6FM4"
title: "Deduplicate verify record parsing"
status: "DOING"
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
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit: null
comments:
  -
    author: "CODER"
    body: "Start: extract shared verify-record input parsing and validation while preserving verify ok/rework command behavior and user-facing messages."
events:
  -
    type: "status"
    at: "2026-03-12T09:41:44.456Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: extract shared verify-record input parsing and validation while preserving verify ok/rework command behavior and user-facing messages."
doc_version: 3
doc_updated_at: "2026-03-12T09:41:44.456Z"
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

## Rollback Plan

Revert the helper extraction if user-facing verify behavior, error messages, or command routing changes.

## Findings

None yet.
