---
id: "202607252223-THDN0G"
title: "Bound branch snapshot probes in task active"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on:
  - "202607252051-RK9N29"
tags:
  - "correctness"
  - "milestone-alpha2"
  - "performance"
  - "routing"
  - "v0.7"
  - "workflow"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "code.branch_pr"
verify:
  - "bun run lifecycle:invariants"
  - "bun test packages/agentplane/src/cli/run-cli.core.tasks.active.test.ts"
plan_approval:
  state: "approved"
  updated_at: "2026-07-25T22:23:48.811Z"
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
    body: "Start: bound branch snapshot inventory probes in the dedicated task worktree."
events:
  -
    type: "status"
    at: "2026-07-25T22:34:35.389Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: bound branch snapshot inventory probes in the dedicated task worktree."
doc_version: 3
doc_updated_at: "2026-07-25T22:34:35.389Z"
doc_updated_by: "CODER"
description: "Prevent task active from spawning an unbounded local and remote branch probe per task route. Reuse one command-scoped branch inventory or apply a bounded concurrency strategy while preserving branch snapshot precedence and stale-base recovery."
sections:
  Summary: |-
    Bound branch snapshot probes in task active

    Prevent task active from spawning an unbounded local and remote branch probe per task route. Reuse one command-scoped branch inventory or apply a bounded concurrency strategy while preserving branch snapshot precedence and stale-base recovery.
  Scope: "In scope: task-active route evaluation, shared branch-snapshot inventory helpers, focused regression tests, and the alpha.2 roadmap/fan-in record needed to make this v0.7 regression release-blocking. Preserve branch snapshot source priority and existing task route semantics. Out of scope: changing task lifecycle policy, removing snapshot recovery, or broad task-list redesign."
  Plan: "1. Reproduce task active against the real multi-worktree repository and identify the repeated route-level branch inventory probes that exhaust process descriptors. 2. Introduce a command-scoped memoized branch inventory or bounded probe path so route evaluation cannot launch one local and remote git scan per active task. 3. Preserve live-worktree, local-branch, and origin snapshot precedence plus stale-base routing semantics. 4. Add focused active-list and branch-snapshot regression coverage that asserts bounded inventory calls and correct route output. 5. Add this regression to the alpha.2 gate fan-in and roadmap, then run focused tests, type, lint, lifecycle, policy, and diff checks."
  Verify Steps: "1. Reproduce or model a multi-task branch_pr task active call and prove branch inventory is bounded per command rather than per task. 2. agentplane task active succeeds against the repository with many task branches and preserves route output/freshness. 3. Existing branch-snapshot stale-base and remote-only behavior remains covered. 4. This task is listed in 202607221908-9M2FBQ alpha.2 fan-in and roadmap. 5. Run focused active/branch-snapshot tests, bun run typecheck, bun run lint:core, bun run lifecycle:invariants, node .agentplane/policy/check-routing.mjs, and git diff --check."
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: "Revert the task PR as one unit, including its alpha.2 dependency and roadmap record. This restores prior task-active behavior but reintroduces the observed descriptor-exhaustion risk; no persisted task state is migrated."
  Findings: ""
extensions:
  workflow_route_baseline:
    start_head_sha: "220c7f110c07a14b2b055003cd338ad4c1c3503e"
    version: 1
id_source: "generated"
---
## Summary

Bound branch snapshot probes in task active

Prevent task active from spawning an unbounded local and remote branch probe per task route. Reuse one command-scoped branch inventory or apply a bounded concurrency strategy while preserving branch snapshot precedence and stale-base recovery.

## Scope

In scope: task-active route evaluation, shared branch-snapshot inventory helpers, focused regression tests, and the alpha.2 roadmap/fan-in record needed to make this v0.7 regression release-blocking. Preserve branch snapshot source priority and existing task route semantics. Out of scope: changing task lifecycle policy, removing snapshot recovery, or broad task-list redesign.

## Plan

1. Reproduce task active against the real multi-worktree repository and identify the repeated route-level branch inventory probes that exhaust process descriptors. 2. Introduce a command-scoped memoized branch inventory or bounded probe path so route evaluation cannot launch one local and remote git scan per active task. 3. Preserve live-worktree, local-branch, and origin snapshot precedence plus stale-base routing semantics. 4. Add focused active-list and branch-snapshot regression coverage that asserts bounded inventory calls and correct route output. 5. Add this regression to the alpha.2 gate fan-in and roadmap, then run focused tests, type, lint, lifecycle, policy, and diff checks.

## Verify Steps

1. Reproduce or model a multi-task branch_pr task active call and prove branch inventory is bounded per command rather than per task. 2. agentplane task active succeeds against the repository with many task branches and preserves route output/freshness. 3. Existing branch-snapshot stale-base and remote-only behavior remains covered. 4. This task is listed in 202607221908-9M2FBQ alpha.2 fan-in and roadmap. 5. Run focused active/branch-snapshot tests, bun run typecheck, bun run lint:core, bun run lifecycle:invariants, node .agentplane/policy/check-routing.mjs, and git diff --check.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert the task PR as one unit, including its alpha.2 dependency and roadmap record. This restores prior task-active behavior but reintroduces the observed descriptor-exhaustion risk; no persisted task state is migrated.

## Findings
