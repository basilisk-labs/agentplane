---
id: "202604230838-598K1H"
title: "Stage allowed task artifacts with non-empty index"
result_summary: "Implemented non-empty-index active task artifact staging and covered it with guard unit plus CLI integration tests."
status: "DONE"
priority: "med"
owner: "CODER"
revision: 9
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
  state: "ok"
  updated_at: "2026-04-23T09:38:05.042Z"
  updated_by: "CODER"
  note: "Verified: commit wrapper stages active task artifacts with --allow-tasks even when implementation files are already staged."
commit:
  hash: "afa741361351587573d24201f54485386e3aa4f7"
  message: "🛡️ 598K1H guard: stage task artifacts with populated index"
comments:
  -
    author: "CODER"
    body: "Start: commit allowlist staging behavior is ready after verify matrix completion."
  -
    author: "CODER"
    body: "Verified: commit allowlist now stages active task artifacts before guard validation when --allow-tasks is used with a populated index."
events:
  -
    type: "status"
    at: "2026-04-23T09:34:33.073Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: commit allowlist staging behavior is ready after verify matrix completion."
  -
    type: "verify"
    at: "2026-04-23T09:38:05.042Z"
    author: "CODER"
    state: "ok"
    note: "Verified: commit wrapper stages active task artifacts with --allow-tasks even when implementation files are already staged."
  -
    type: "status"
    at: "2026-04-23T09:38:19.733Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: commit allowlist now stages active task artifacts before guard validation when --allow-tasks is used with a populated index."
doc_version: 3
doc_updated_at: "2026-04-23T09:38:19.734Z"
doc_updated_by: "CODER"
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
    ### 2026-04-23T09:38:05.042Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified: commit wrapper stages active task artifacts with --allow-tasks even when implementation files are already staged.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-23T09:34:33.087Z, excerpt_hash=sha256:d30a1c827664953ad84d161b8af98517dd7da46e4c100d73160136dc1684b8a8
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: "Revert commit staging behavior and tests. Users can fall back to manually staging task artifacts before commit."
  Findings: |-
    - Observation: Ran bun run test:project -- cli-core packages/agentplane/src/cli/run-cli.core.guard.commit-wrapper.test.ts; bun run test:project -- guard; Prettier check for changed files.
      Impact: Prevents task artifacts from being split into a later refresh commit or left outside the intended task-scoped commit when the index is already populated.
      Resolution: Added non-empty-index staging before guard validation and regression coverage.
      Promotion: incident-candidate
      Fixability: external
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
### 2026-04-23T09:38:05.042Z — VERIFY — ok

By: CODER

Note: Verified: commit wrapper stages active task artifacts with --allow-tasks even when implementation files are already staged.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-23T09:34:33.087Z, excerpt_hash=sha256:d30a1c827664953ad84d161b8af98517dd7da46e4c100d73160136dc1684b8a8

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert commit staging behavior and tests. Users can fall back to manually staging task artifacts before commit.

## Findings

- Observation: Ran bun run test:project -- cli-core packages/agentplane/src/cli/run-cli.core.guard.commit-wrapper.test.ts; bun run test:project -- guard; Prettier check for changed files.
  Impact: Prevents task artifacts from being split into a later refresh commit or left outside the intended task-scoped commit when the index is already populated.
  Resolution: Added non-empty-index staging before guard validation and regression coverage.
  Promotion: incident-candidate
  Fixability: external
