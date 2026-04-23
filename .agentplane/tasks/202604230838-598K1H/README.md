---
id: "202604230838-598K1H"
title: "Stage allowed task artifacts with non-empty index"
status: "TODO"
priority: "med"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on:
  - "202604230838-XRSYS4"
tags:
  - "code"
  - "git"
  - "workflow"
verify:
  - "bun run test:project -- cli-core packages/agentplane/src/cli/run-cli.core.guard.commit-wrapper.test.ts"
  - "bun run test:project -- guard"
plan_approval:
  state: "approved"
  updated_at: "2026-04-23T08:40:46.256Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit: null
comments: []
events: []
doc_version: 3
doc_updated_at: "2026-04-23T08:40:26.152Z"
doc_updated_by: "PLANNER"
description: "Adjust commit allowlist behavior or diagnostics so --allow-tasks cannot leave active task artifacts unstaged when other files are already staged."
sections:
  Summary: |-
    Stage allowed task artifacts with non-empty index
    
    Adjust commit allowlist behavior or diagnostics so --allow-tasks cannot leave active task artifacts unstaged when other files are already staged.
  Scope: "In scope: commit allowlist staging behavior and diagnostics for active task artifacts. Out of scope: broad commit policy rewrites or protected path model changes."
  Plan: |-
    1. Inspect commit auto-stage and guard behavior when the git index is already non-empty.
    2. Add a regression test proving --allow-tasks does not leave active task artifacts behind when other staged files exist, or emits a precise blocking diagnostic.
    3. Implement the least surprising behavior: stage task-allowed artifacts while still preserving guard checks for already staged files.
    4. Run guard and commit wrapper tests.
  Verify Steps: |-
    1. Run `bun run test:project -- cli-core packages/agentplane/src/cli/run-cli.core.guard.commit-wrapper.test.ts`. Expected: commit wrapper behavior passes.
    2. Run `bun run test:project -- guard`. Expected: guard implementation tests pass.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: "Revert commit staging behavior and tests. Users can fall back to manually staging task artifacts before commit."
  Findings: ""
id_source: "generated"
---
## Summary

Stage allowed task artifacts with non-empty index

Adjust commit allowlist behavior or diagnostics so --allow-tasks cannot leave active task artifacts unstaged when other files are already staged.

## Scope

In scope: commit allowlist staging behavior and diagnostics for active task artifacts. Out of scope: broad commit policy rewrites or protected path model changes.

## Plan

1. Inspect commit auto-stage and guard behavior when the git index is already non-empty.
2. Add a regression test proving --allow-tasks does not leave active task artifacts behind when other staged files exist, or emits a precise blocking diagnostic.
3. Implement the least surprising behavior: stage task-allowed artifacts while still preserving guard checks for already staged files.
4. Run guard and commit wrapper tests.

## Verify Steps

1. Run `bun run test:project -- cli-core packages/agentplane/src/cli/run-cli.core.guard.commit-wrapper.test.ts`. Expected: commit wrapper behavior passes.
2. Run `bun run test:project -- guard`. Expected: guard implementation tests pass.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert commit staging behavior and tests. Users can fall back to manually staging task artifacts before commit.

## Findings
