---
id: "202603121343-7ZXJPA"
title: "Cleanup phase: split task doc-write CLI integration suite"
status: "DOING"
priority: "high"
owner: "CODER"
depends_on: []
tags:
  - "code"
  - "cli"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-12T14:11:02.228Z"
  updated_by: "ORCHESTRATOR"
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
    body: "Start: splitting the mixed task doc-write CLI suite into focused doc-set, scaffold/derive, and normalize/migrate buckets while keeping fast-CI expectations aligned."
events:
  -
    type: "status"
    at: "2026-03-12T14:11:21.245Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: splitting the mixed task doc-write CLI suite into focused doc-set, scaffold/derive, and normalize/migrate buckets while keeping fast-CI expectations aligned."
doc_version: 3
doc_updated_at: "2026-03-12T14:15:27.542Z"
doc_updated_by: "CODER"
description: "Split run-cli.core.tasks.doc-write.test.ts into focused task-doc-set and task-scaffold/derive/normalize/migrate suites while preserving current task CLI assertions."
id_source: "generated"
---
## Summary

Cleanup phase: split task doc-write CLI integration suite

Split run-cli.core.tasks.doc-write.test.ts into focused task-doc-set and task-scaffold/derive/normalize/migrate suites while preserving current task CLI assertions.

## Scope

- In scope: Split run-cli.core.tasks.doc-write.test.ts into focused task-doc-set and task-scaffold/derive/normalize/migrate suites while preserving current task CLI assertions.
- Out of scope: unrelated refactors not required for "Cleanup phase: split task doc-write CLI integration suite".

## Plan

1. Keep task doc set coverage in run-cli.core.tasks.doc-write.test.ts and trim it to the doc-write contract only. 2. Extract task scaffold/derive coverage into a focused split suite and extract task normalize/migrate coverage into its own split suite, reusing a tiny shared helper only if it reduces duplication. 3. Sync fast-CI task-family expectations and verify the split with targeted lint, vitest, and package builds.

## Verify Steps

1. Run the split task doc-write and extracted task mutation suites. Expected: doc-set, scaffold/derive, and normalize/migrate CLI tests all pass.
2. Run lint for the split task suite files and selector expectations. Expected: no new lint violations.
3. Build the touched packages after the suite split. Expected: @agentplaneorg/core and agentplane build successfully.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

Split the former mixed task doc-write bucket by responsibility: the existing file now covers task doc set only, new scaffold-derive and normalize-migrate suites hold the remaining mutation paths, and a tiny local helper plus fast-CI expectation updates keep the split discoverable.
