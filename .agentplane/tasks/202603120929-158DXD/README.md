---
id: "202603120929-158DXD"
title: "Split lifecycle CLI integration suite"
result_summary: "split lifecycle CLI suites"
status: "DONE"
priority: "med"
owner: "CODER"
depends_on: []
tags:
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-12T09:30:22.988Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-12T09:37:45.439Z"
  updated_by: "CODER"
  note: "Lifecycle suite split verified via targeted Vitest run across start, block-finish, and verify files."
commit:
  hash: "a7a17f50858ac4ba21c584c40601e3f11b44df2f"
  message: "🚧 158DXD task: split lifecycle CLI suites"
comments:
  -
    author: "CODER"
    body: "Start: split the oversized lifecycle CLI integration bucket into smaller suites while preserving the same lifecycle contracts and targeted regression coverage."
  -
    author: "CODER"
    body: "Verified: lifecycle CLI integration coverage now lives in smaller start, block-finish, and verify suites with targeted green Vitest coverage preserving the previous contracts."
events:
  -
    type: "status"
    at: "2026-03-12T09:30:31.986Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: split the oversized lifecycle CLI integration bucket into smaller suites while preserving the same lifecycle contracts and targeted regression coverage."
  -
    type: "verify"
    at: "2026-03-12T09:37:45.439Z"
    author: "CODER"
    state: "ok"
    note: "Lifecycle suite split verified via targeted Vitest run across start, block-finish, and verify files."
  -
    type: "status"
    at: "2026-03-12T09:37:52.287Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: lifecycle CLI integration coverage now lives in smaller start, block-finish, and verify suites with targeted green Vitest coverage preserving the previous contracts."
doc_version: 3
doc_updated_at: "2026-03-12T09:37:52.287Z"
doc_updated_by: "CODER"
description: "Decompose the oversized lifecycle integration test bucket into smaller suites without changing lifecycle behavior."
id_source: "generated"
---
## Summary

Split the oversized lifecycle CLI integration bucket into smaller suites without changing external lifecycle behavior.

## Scope

Touch only lifecycle integration tests and minimal shared test helpers needed for the split.

## Plan

Split lifecycle integration coverage into smaller suites with unchanged runtime behavior and equivalent assertions.

## Verify Steps

1. Run `bun x vitest run packages/agentplane/src/cli/run-cli.core.lifecycle*.test.ts --hookTimeout 60000 --testTimeout 60000` or the exact replacement test set.
2. Confirm moved cases preserve the previous lifecycle assertions and snapshots.
3. Run any additional targeted suite required by extracted shared helpers.

## Verification

Pending.

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-12T09:37:45.439Z — VERIFY — ok

By: CODER

Note: Lifecycle suite split verified via targeted Vitest run across start, block-finish, and verify files.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-12T09:30:31.986Z, excerpt_hash=sha256:1aa5f820bfd18616de53a277f9502f5c01f746cd59b61796d513c6b7dcf80698

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert moved test files and helper extraction if the split changes behavior or weakens coverage.

## Findings

None yet.
