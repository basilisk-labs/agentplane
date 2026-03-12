---
id: "202603121342-C3PDMT"
title: "Cleanup phase: split branch meta CLI integration suite"
result_summary: "Replaced the monolithic branch-meta CLI suite with focused branch-base, readiness, workflow-profile, and sync-maintenance files and synchronized CLI-core selector discovery plus workflow harness docs."
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
  updated_at: "2026-03-12T13:51:40.286Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-12T13:55:19.882Z"
  updated_by: "CODER"
  note: "Split branch-meta coverage into 4 suites, reran the new branch-meta family plus local-ci-selection (67 + 29 tests), linted the touched files, and rebuilt @agentplaneorg/core plus agentplane with updated CLI-core discovery and docs references."
commit:
  hash: "471217d6ca8204123aca4c7cf7693bf99130fffe"
  message: "🚧 C3PDMT task: split branch meta CLI suite"
comments:
  -
    author: "CODER"
    body: "Start: split the mixed branch-meta CLI suite into focused domain files, keep branch-meta-specific helpers local, and preserve current CLI assertions and selector coverage."
  -
    author: "CODER"
    body: "Verified: branch-meta CLI coverage is now split by domain and selector/docs routing follow the new suite topology."
events:
  -
    type: "status"
    at: "2026-03-12T13:51:48.947Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: split the mixed branch-meta CLI suite into focused domain files, keep branch-meta-specific helpers local, and preserve current CLI assertions and selector coverage."
  -
    type: "verify"
    at: "2026-03-12T13:55:19.882Z"
    author: "CODER"
    state: "ok"
    note: "Split branch-meta coverage into 4 suites, reran the new branch-meta family plus local-ci-selection (67 + 29 tests), linted the touched files, and rebuilt @agentplaneorg/core plus agentplane with updated CLI-core discovery and docs references."
  -
    type: "status"
    at: "2026-03-12T13:55:30.456Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: branch-meta CLI coverage is now split by domain and selector/docs routing follow the new suite topology."
doc_version: 3
doc_updated_at: "2026-03-12T13:55:30.456Z"
doc_updated_by: "CODER"
description: "Split run-cli.core.branch-meta.test.ts into smaller domain suites for branch base, readiness/preflight, workflow/profile, and branch maintenance while preserving coverage and CLI contracts."
id_source: "generated"
---
## Summary

Cleanup phase: split branch meta CLI integration suite

Split run-cli.core.branch-meta.test.ts into smaller domain suites for branch base, readiness/preflight, workflow/profile, and branch maintenance while preserving coverage and CLI contracts.

## Scope

- In scope: Split run-cli.core.branch-meta.test.ts into smaller domain suites for branch base, readiness/preflight, workflow/profile, and branch maintenance while preserving coverage and CLI contracts.
- Out of scope: unrelated refactors not required for "Cleanup phase: split branch meta CLI integration suite".

## Plan

1. Map coherent branch-meta domains inside the mixed CLI suite: branch base, readiness/preflight, workflow/profile/role, and branch maintenance/backend sync edges.
2. Split the suite into focused files along those domain boundaries while keeping any shared helper logic local to the branch-meta family.
3. Update selectors or scripts that assume the old single-file branch-meta suite.
4. Run targeted tests, lint, and builds; then record evidence and finish the task.

## Verify Steps

1. Run the new split branch-meta CLI suites. Expected: all migrated branch-base, readiness/preflight, workflow/profile, and branch-maintenance tests pass.
2. Run lint for the split branch-meta files and updated selector code. Expected: no new lint violations.
3. Build the touched packages after the suite split. Expected: @agentplaneorg/core and agentplane build successfully.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-12T13:55:19.882Z — VERIFY — ok

By: CODER

Note: Split branch-meta coverage into 4 suites, reran the new branch-meta family plus local-ci-selection (67 + 29 tests), linted the touched files, and rebuilt @agentplaneorg/core plus agentplane with updated CLI-core discovery and docs references.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-12T13:54:52.232Z, excerpt_hash=sha256:76692a77d984e66f7873e3489064c5fd5079ea2461d0b86079c6b228873e11e4

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

1. branch-meta coverage now lives in focused branch-base, readiness/preflight, workflow/profile, and sync-maintenance suites instead of one mixed bucket.
2. CLI-core selector discovery and workflow harness docs were synchronized to the new split topology so fast-CI and coverage references continue to point at the real suite family.
