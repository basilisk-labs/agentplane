---
id: "202603121343-7ZXJPA"
title: "Cleanup phase: split task doc-write CLI integration suite"
result_summary: "Reduced the mixed task doc-write regression bucket by moving scaffold/derive and normalize/migrate coverage into dedicated suites and keeping fast-CI expectations aligned with the split."
status: "DONE"
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
  state: "ok"
  updated_at: "2026-03-12T14:16:12.442Z"
  updated_by: "CODER"
  note: "OK: split task doc-write coverage into doc-write, scaffold-derive, and normalize-migrate suites; local-ci-selection expectations updated; eslint on split files passed; vitest passed for 48 task-suite tests; bun run --filter=@agentplaneorg/core build and bun run --filter=agentplane build passed."
commit:
  hash: "5b0d618bfaf4cf75087b1a2e6b6e9dc980f73c01"
  message: "🚧 7ZXJPA task: split task doc-write CLI integration suite"
comments:
  -
    author: "CODER"
    body: "Start: splitting the mixed task doc-write CLI suite into focused doc-set, scaffold/derive, and normalize/migrate buckets while keeping fast-CI expectations aligned."
  -
    author: "CODER"
    body: "Verified: split the former mixed task doc-write CLI suite into focused doc-set, scaffold/derive, and normalize/migrate buckets; lint, targeted vitest, and both package builds all passed."
events:
  -
    type: "status"
    at: "2026-03-12T14:11:21.245Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: splitting the mixed task doc-write CLI suite into focused doc-set, scaffold/derive, and normalize/migrate buckets while keeping fast-CI expectations aligned."
  -
    type: "verify"
    at: "2026-03-12T14:16:12.442Z"
    author: "CODER"
    state: "ok"
    note: "OK: split task doc-write coverage into doc-write, scaffold-derive, and normalize-migrate suites; local-ci-selection expectations updated; eslint on split files passed; vitest passed for 48 task-suite tests; bun run --filter=@agentplaneorg/core build and bun run --filter=agentplane build passed."
  -
    type: "status"
    at: "2026-03-12T14:16:27.741Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: split the former mixed task doc-write CLI suite into focused doc-set, scaffold/derive, and normalize/migrate buckets; lint, targeted vitest, and both package builds all passed."
doc_version: 3
doc_updated_at: "2026-03-12T14:16:27.741Z"
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
#### 2026-03-12T14:16:12.442Z — VERIFY — ok

By: CODER

Note: OK: split task doc-write coverage into doc-write, scaffold-derive, and normalize-migrate suites; local-ci-selection expectations updated; eslint on split files passed; vitest passed for 48 task-suite tests; bun run --filter=@agentplaneorg/core build and bun run --filter=agentplane build passed.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-12T14:15:27.542Z, excerpt_hash=sha256:00d07f2259562d056054c45bf9a0c62efeb361ec5dc0ef99b0907a5bb5703f96

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

Split the former mixed task doc-write bucket by responsibility: the existing file now covers task doc set only, new scaffold-derive and normalize-migrate suites hold the remaining mutation paths, and a tiny local helper plus fast-CI expectation updates keep the split discoverable.
