---
id: "202603121342-C3PDMT"
title: "Cleanup phase: split branch meta CLI integration suite"
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
  updated_at: "2026-03-12T13:51:40.286Z"
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
    body: "Start: split the mixed branch-meta CLI suite into focused domain files, keep branch-meta-specific helpers local, and preserve current CLI assertions and selector coverage."
events:
  -
    type: "status"
    at: "2026-03-12T13:51:48.947Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: split the mixed branch-meta CLI suite into focused domain files, keep branch-meta-specific helpers local, and preserve current CLI assertions and selector coverage."
doc_version: 3
doc_updated_at: "2026-03-12T13:54:52.232Z"
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
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

1. branch-meta coverage now lives in focused branch-base, readiness/preflight, workflow/profile, and sync-maintenance suites instead of one mixed bucket.
2. CLI-core selector discovery and workflow harness docs were synchronized to the new split topology so fast-CI and coverage references continue to point at the real suite family.
