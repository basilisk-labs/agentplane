---
id: "202604230838-CP7EZT"
title: "Add installed runtime smoke release gate"
result_summary: "Added packages/agentplane/src/cli/run-cli.core.installed-smoke.test.ts and committed the approved usability-hardening task graph."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 9
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "release"
  - "testing"
verify:
  - "bun run test:project -- cli-core packages/agentplane/src/cli/run-cli.core.installed-smoke.test.ts"
plan_approval:
  state: "approved"
  updated_at: "2026-04-23T08:40:45.230Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-23T08:51:52.010Z"
  updated_by: "CODER"
  note: "Installed runtime smoke added and verified: direct init with managed pre-push hooks, branch_pr worktree hook shim, hook suite, format check, and test routing all pass."
commit:
  hash: "832bac7a44e84fe4813ef8c9a9926effc21f5780"
  message: "🧪 CP7EZT test: add installed runtime smoke gate"
comments:
  -
    author: "CODER"
    body: "Start: Implement installed-runtime smoke coverage for clean-project hooks, direct lifecycle, and branch_pr worktree shim."
  -
    author: "CODER"
    body: "Verified: installed runtime smoke covers clean direct init with managed pre-push hooks, branch_pr worktree shim seeding, hook suite compatibility, formatting, and test routing."
events:
  -
    type: "status"
    at: "2026-04-23T08:40:57.022Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Implement installed-runtime smoke coverage for clean-project hooks, direct lifecycle, and branch_pr worktree shim."
  -
    type: "verify"
    at: "2026-04-23T08:51:52.010Z"
    author: "CODER"
    state: "ok"
    note: "Installed runtime smoke added and verified: direct init with managed pre-push hooks, branch_pr worktree hook shim, hook suite, format check, and test routing all pass."
  -
    type: "status"
    at: "2026-04-23T08:53:08.939Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: installed runtime smoke covers clean direct init with managed pre-push hooks, branch_pr worktree shim seeding, hook suite compatibility, formatting, and test routing."
doc_version: 3
doc_updated_at: "2026-04-23T08:53:08.940Z"
doc_updated_by: "CODER"
description: "Add an end-to-end smoke gate that exercises an installed AgentPlane package in a clean git project: init with hooks, push through managed hooks, direct task lifecycle, and branch_pr worktree shim materialization."
sections:
  Summary: |-
    Add installed runtime smoke release gate
    
    Add an end-to-end smoke gate that exercises an installed AgentPlane package in a clean git project: init with hooks, push through managed hooks, direct task lifecycle, and branch_pr worktree shim materialization.
  Scope: "In scope: installed-package-shaped runtime smoke coverage for clean-project init, managed hooks, push behavior, direct lifecycle, and branch_pr worktree shim behavior. Out of scope: publishing a real package to npm or changing release version metadata."
  Plan: |-
    1. Inspect existing CLI harness helpers for reusable installed-runtime fixture support.
    2. Add a Vitest smoke test that creates a clean git project, runs an installed-package-shaped AgentPlane runtime, initializes direct mode with managed hooks, commits and pushes through hooks, and completes a minimal direct lifecycle.
    3. Extend the same smoke coverage to branch_pr init and work start --worktree to verify hook shim materialization.
    4. Wire the smoke into an appropriate release or critical test route if runtime cost is acceptable; otherwise document it as an explicit release-gate candidate in scripts/test inventory.
    5. Run the new smoke and targeted affected suites.
  Verify Steps: |-
    1. Run `bun run test:project -- cli-core packages/agentplane/src/cli/run-cli.core.installed-smoke.test.ts`. Expected: installed-runtime smoke passes.
    2. Run `bun run test:project -- cli-core packages/agentplane/src/cli/run-cli.core.hooks.test.ts`. Expected: existing hooks coverage remains green.
    3. Run the relevant release/test routing check if the smoke is added to a routed suite. Expected: route stays fresh.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-23T08:51:52.010Z — VERIFY — ok
    
    By: CODER
    
    Note: Installed runtime smoke added and verified: direct init with managed pre-push hooks, branch_pr worktree hook shim, hook suite, format check, and test routing all pass.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-23T08:40:57.028Z, excerpt_hash=sha256:492c4e804058fe998a33e6267c076f852556be6a5ab590ab0fdabe60b689a0a0
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: "Revert the new smoke test and any test-routing script changes. No runtime behavior should need rollback for this task."
  Findings: ""
id_source: "generated"
---
## Summary

Add installed runtime smoke release gate

Add an end-to-end smoke gate that exercises an installed AgentPlane package in a clean git project: init with hooks, push through managed hooks, direct task lifecycle, and branch_pr worktree shim materialization.

## Scope

In scope: installed-package-shaped runtime smoke coverage for clean-project init, managed hooks, push behavior, direct lifecycle, and branch_pr worktree shim behavior. Out of scope: publishing a real package to npm or changing release version metadata.

## Plan

1. Inspect existing CLI harness helpers for reusable installed-runtime fixture support.
2. Add a Vitest smoke test that creates a clean git project, runs an installed-package-shaped AgentPlane runtime, initializes direct mode with managed hooks, commits and pushes through hooks, and completes a minimal direct lifecycle.
3. Extend the same smoke coverage to branch_pr init and work start --worktree to verify hook shim materialization.
4. Wire the smoke into an appropriate release or critical test route if runtime cost is acceptable; otherwise document it as an explicit release-gate candidate in scripts/test inventory.
5. Run the new smoke and targeted affected suites.

## Verify Steps

1. Run `bun run test:project -- cli-core packages/agentplane/src/cli/run-cli.core.installed-smoke.test.ts`. Expected: installed-runtime smoke passes.
2. Run `bun run test:project -- cli-core packages/agentplane/src/cli/run-cli.core.hooks.test.ts`. Expected: existing hooks coverage remains green.
3. Run the relevant release/test routing check if the smoke is added to a routed suite. Expected: route stays fresh.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-23T08:51:52.010Z — VERIFY — ok

By: CODER

Note: Installed runtime smoke added and verified: direct init with managed pre-push hooks, branch_pr worktree hook shim, hook suite, format check, and test routing all pass.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-23T08:40:57.028Z, excerpt_hash=sha256:492c4e804058fe998a33e6267c076f852556be6a5ab590ab0fdabe60b689a0a0

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert the new smoke test and any test-routing script changes. No runtime behavior should need rollback for this task.

## Findings
