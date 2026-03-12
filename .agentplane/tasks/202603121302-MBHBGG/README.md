---
id: "202603121302-MBHBGG"
title: "Cleanup phase: split PR flow CLI integration suite"
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
  updated_at: "2026-03-12T13:16:28.663Z"
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
    body: "Start: split the mixed PR-flow CLI integration suite into domain-specific files, keep shared helpers local to the PR-flow family, and preserve existing contracts."
events:
  -
    type: "status"
    at: "2026-03-12T13:16:43.263Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: split the mixed PR-flow CLI integration suite into domain-specific files, keep shared helpers local to the PR-flow family, and preserve existing contracts."
doc_version: 3
doc_updated_at: "2026-03-12T13:23:26.302Z"
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
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

1. PR-flow coverage now lives in four focused suites: work-start, pr, integrate, and cleanup-merged.
2. fast-CI CLI-core discovery was widened to include the new pr-flow split pattern so selector drift does not force a broad fallback.
