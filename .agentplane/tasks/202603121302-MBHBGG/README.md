---
id: "202603121302-MBHBGG"
title: "Cleanup phase: split PR flow CLI integration suite"
result_summary: "Replaced the monolithic PR-flow CLI regression file with focused work-start, pr, integrate, and cleanup-merged suites, plus local helper wiring and updated CLI-core selector discovery."
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
  updated_at: "2026-03-12T13:16:28.663Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-12T13:23:54.277Z"
  updated_by: "CODER"
  note: "Split PR-flow coverage into 4 suites, reran the new PR-flow test family plus local-ci-selection (89 + 28 tests), and rebuilt @agentplaneorg/core plus agentplane with updated CLI-core discovery."
commit:
  hash: "03416435cd0e6579fa97233e04258e92be2c3ad1"
  message: "🚧 MBHBGG task: split PR flow CLI suite"
comments:
  -
    author: "CODER"
    body: "Start: split the mixed PR-flow CLI integration suite into domain-specific files, keep shared helpers local to the PR-flow family, and preserve existing contracts."
  -
    author: "CODER"
    body: "Verified: PR-flow CLI integration coverage is split into domain-specific suites and fast-CI still discovers the full family."
events:
  -
    type: "status"
    at: "2026-03-12T13:16:43.263Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: split the mixed PR-flow CLI integration suite into domain-specific files, keep shared helpers local to the PR-flow family, and preserve existing contracts."
  -
    type: "verify"
    at: "2026-03-12T13:23:54.277Z"
    author: "CODER"
    state: "ok"
    note: "Split PR-flow coverage into 4 suites, reran the new PR-flow test family plus local-ci-selection (89 + 28 tests), and rebuilt @agentplaneorg/core plus agentplane with updated CLI-core discovery."
  -
    type: "status"
    at: "2026-03-12T13:24:05.560Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR-flow CLI integration coverage is split into domain-specific suites and fast-CI still discovers the full family."
doc_version: 3
doc_updated_at: "2026-03-12T13:24:05.560Z"
doc_updated_by: "CODER"
description: "Split run-cli.core.pr-flow.test.ts into smaller work-start, PR, integrate, and cleanup suites while preserving existing coverage and command contracts."
id_source: "generated"
---
## Summary

Cleanup phase: split PR flow CLI integration suite

Split run-cli.core.pr-flow.test.ts into smaller work-start, PR, integrate, and cleanup suites while preserving existing coverage and command contracts.

## Scope

- In scope: Split run-cli.core.pr-flow.test.ts into smaller work-start, PR, integrate, and cleanup suites while preserving existing coverage and command contracts.
- Out of scope: unrelated refactors not required for "Cleanup phase: split PR flow CLI integration suite".

## Plan

1. Identify coherent PR-flow test domains and shared helpers inside the existing mixed suite.
2. Split the suite into domain-specific files for work-start, pr artifacts, integrate, and cleanup-merged flows.
3. Keep shared helper logic local to the PR-flow test family and update any selector or script references that assume the old single file.
4. Run targeted tests, lint, and builds; then record evidence and finish the task.

## Verify Steps

1. Run the new split PR-flow CLI suites. Expected: all migrated work-start, pr, integrate, and cleanup-merged tests pass.
2. Run lint for the split PR-flow files and any new helpers. Expected: no new lint violations.
3. Build the touched packages after the suite split. Expected: @agentplaneorg/core and agentplane build successfully.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-12T13:23:54.277Z — VERIFY — ok

By: CODER

Note: Split PR-flow coverage into 4 suites, reran the new PR-flow test family plus local-ci-selection (89 + 28 tests), and rebuilt @agentplaneorg/core plus agentplane with updated CLI-core discovery.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-12T13:23:26.302Z, excerpt_hash=sha256:1f11fd51481f218913192a832c78c250cb40ef9be88006915bd5eef1e47e1e72

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

1. PR-flow coverage now lives in four focused suites: work-start, pr, integrate, and cleanup-merged.
2. fast-CI CLI-core discovery was widened to include the new pr-flow split pattern so selector drift does not force a broad fallback.
