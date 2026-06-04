---
id: "202606032104-H2VM14"
title: "Fix upstream issue 4406 quickstart direct route"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on: []
tags:
  - "bug"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-06-03T21:05:51.644Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: reproducing the direct-workflow quickstart route mismatch in a dedicated task worktree, tracing the route selection path, and preparing the smallest fix plus targeted verification evidence."
events:
  -
    type: "status"
    at: "2026-06-03T21:06:23.955Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: reproducing the direct-workflow quickstart route mismatch in a dedicated task worktree, tracing the route selection path, and preparing the smallest fix plus targeted verification evidence."
doc_version: 3
doc_updated_at: "2026-06-03T21:10:18.762Z"
doc_updated_by: "CODER"
description: "Investigate why quickstart reports a branch_pr route in a direct workflow repo, implement the smallest coherent fix, and verify with targeted CLI checks."
sections:
  Summary: |-
    Fix upstream issue 4406 quickstart direct route

    Investigate why quickstart reports a branch_pr route in a direct workflow repo, implement the smallest coherent fix, and verify with targeted CLI checks.
  Scope: |-
    - In scope: Investigate why quickstart reports a branch_pr route in a direct workflow repo, implement the smallest coherent fix, and verify with targeted CLI checks.
    - Out of scope: unrelated refactors not required for "Fix upstream issue 4406 quickstart direct route".
  Plan: "1. Reproduce the quickstart output for a direct-workflow fixture and trace where the route text is chosen. 2. Apply the smallest fix so quickstart prints the repo's actual configured workflow route. 3. Run targeted quickstart/config tests plus the required routing/doctor checks, then record evidence in the task artifact."
  Verify Steps: "1. Reproduce the bug by running the repo-local quickstart command in a direct-workflow fixture and confirm the route text is wrong before the fix. Expected: quickstart incorrectly mentions branch_pr despite direct workflow configuration. 2. Re-run the same direct-workflow quickstart path after the fix. Expected: the route guidance now matches direct workflow commands only. 3. Run targeted tests for the touched quickstart/config code plus required repository checks. Expected: targeted tests pass, ✅ doctor (OK) passes, and policy routing OK passes."
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Targeted quickstart CLI tests could not be executed in this session because the framework worktree is not bootstrapped and the required bun runtime is unavailable in the environment.
      Impact: Verification is limited to source inspection plus ap doctor and node .agentplane/policy/check-routing.mjs, so runtime-level regression coverage for the edited quickstart copy remains unconfirmed here.
      Resolution: Run bun run framework:dev:bootstrap, then execute the targeted AgentPlane CLI tests covering packages/agentplane/src/cli/command-guide.test.ts and packages/agentplane/src/cli/run-cli.core.branch-meta.readiness.test.ts before merge or release.
id_source: "generated"
---
## Summary

Fix upstream issue 4406 quickstart direct route

Investigate why quickstart reports a branch_pr route in a direct workflow repo, implement the smallest coherent fix, and verify with targeted CLI checks.

## Scope

- In scope: Investigate why quickstart reports a branch_pr route in a direct workflow repo, implement the smallest coherent fix, and verify with targeted CLI checks.
- Out of scope: unrelated refactors not required for "Fix upstream issue 4406 quickstart direct route".

## Plan

1. Reproduce the quickstart output for a direct-workflow fixture and trace where the route text is chosen. 2. Apply the smallest fix so quickstart prints the repo's actual configured workflow route. 3. Run targeted quickstart/config tests plus the required routing/doctor checks, then record evidence in the task artifact.

## Verify Steps

1. Reproduce the bug by running the repo-local quickstart command in a direct-workflow fixture and confirm the route text is wrong before the fix. Expected: quickstart incorrectly mentions branch_pr despite direct workflow configuration. 2. Re-run the same direct-workflow quickstart path after the fix. Expected: the route guidance now matches direct workflow commands only. 3. Run targeted tests for the touched quickstart/config code plus required repository checks. Expected: targeted tests pass, ✅ doctor (OK) passes, and policy routing OK passes.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: Targeted quickstart CLI tests could not be executed in this session because the framework worktree is not bootstrapped and the required bun runtime is unavailable in the environment.
  Impact: Verification is limited to source inspection plus ap doctor and node .agentplane/policy/check-routing.mjs, so runtime-level regression coverage for the edited quickstart copy remains unconfirmed here.
  Resolution: Run bun run framework:dev:bootstrap, then execute the targeted AgentPlane CLI tests covering packages/agentplane/src/cli/command-guide.test.ts and packages/agentplane/src/cli/run-cli.core.branch-meta.readiness.test.ts before merge or release.
