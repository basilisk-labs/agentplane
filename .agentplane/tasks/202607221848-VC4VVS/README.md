---
id: "202607221848-VC4VVS"
title: "Unify brief, next-action, runner, and Hermes on AgentWorkOrder v2"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on:
  - "202607221848-T9B3PS"
  - "202607221848-VBV9B1"
tags:
  - "hermes"
  - "milestone-alpha2"
  - "refactor"
  - "rf-05"
  - "rf-25"
  - "runner"
  - "v0.7"
  - "wave-contracts"
  - "work-order"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "code.branch_pr"
verify:
  - "bun run guards:check"
  - "bun run lifecycle:invariants"
  - "bun run test:critical"
  - "bun run typecheck"
plan_approval:
  state: "approved"
  updated_at: "2026-07-26T08:57:43.713Z"
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
    body: "Start: continue branch_pr task in the dedicated task worktree."
events:
  -
    type: "status"
    at: "2026-07-26T10:53:22.520Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
doc_version: 3
doc_updated_at: "2026-07-26T10:53:22.520Z"
doc_updated_by: "CODER"
description: "RF-05b/RF-25c: make task brief, next-action, runner bootstrap, and Hermes projections views of one prepared AgentWorkOrder v2 result instead of independent route/context reconstruction."
sections:
  Summary: |-
    Unify brief, next-action, runner, and Hermes on AgentWorkOrder v2

    RF-05b/RF-25c: make task brief, next-action, runner bootstrap, and Hermes projections views of one prepared AgentWorkOrder v2 result instead of independent route/context reconstruction.
  Scope: |-
    - In scope: one in-process work-order builder, typed use-case result, human/JSON compatibility renderers, shared remote policy, prompt compilation, source/test context manifests, and deletion of unsafe casts and duplicate snake/camel aliases from the v2 surface.
    - Out of scope: removing the announced v1 compatibility output during its support window.
  Plan: |-
    1. Build AgentWorkOrder once from task, route, policy, Git, knowledge, prompt, and verification inputs.
    2. Return a typed use-case result independent of stdout.
    3. Render brief, next-action, runner, and Hermes compatibility views from that result.
    4. Use the real prompt-module compiler and fail preparation on error diagnostics.
    5. Remove duplicated reconstruction and add cross-surface equality/freshness fixtures.
  Verify Steps: |-
    1. Prepare one task through brief, next-action, runner, and Hermes paths. Expected: all views share one work-order id, fingerprint, remote policy, route step, source manifest, and verification intent.
    2. Change task/Git/policy state after preparation. Expected: every invocation path rejects the same stale work order.
    3. Introduce a prompt compiler error. Expected: all launch surfaces stop before agent execution.
    4. Compare v1 compatibility and v2 JSON snapshots. Expected: v1 remains explicit and v2 has one casing without duplicate aliases.
    5. Run focused route/brief/runner/Hermes tests, lifecycle invariants, guards, and typecheck.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert the task implementation commit(s) while preserving unrelated task and migration state.
    - Restore the previous compatibility view or persisted contract version.
    - Re-run focused contract, migration, and type checks.
  Findings: ""
extensions:
  workflow_route_baseline:
    start_head_sha: "4da09cdaca713eb3be1576f00a4f57e72b1353db"
    version: 1
id_source: "generated"
---
## Summary

Unify brief, next-action, runner, and Hermes on AgentWorkOrder v2

RF-05b/RF-25c: make task brief, next-action, runner bootstrap, and Hermes projections views of one prepared AgentWorkOrder v2 result instead of independent route/context reconstruction.

## Scope

- In scope: one in-process work-order builder, typed use-case result, human/JSON compatibility renderers, shared remote policy, prompt compilation, source/test context manifests, and deletion of unsafe casts and duplicate snake/camel aliases from the v2 surface.
- Out of scope: removing the announced v1 compatibility output during its support window.

## Plan

1. Build AgentWorkOrder once from task, route, policy, Git, knowledge, prompt, and verification inputs.
2. Return a typed use-case result independent of stdout.
3. Render brief, next-action, runner, and Hermes compatibility views from that result.
4. Use the real prompt-module compiler and fail preparation on error diagnostics.
5. Remove duplicated reconstruction and add cross-surface equality/freshness fixtures.

## Verify Steps

1. Prepare one task through brief, next-action, runner, and Hermes paths. Expected: all views share one work-order id, fingerprint, remote policy, route step, source manifest, and verification intent.
2. Change task/Git/policy state after preparation. Expected: every invocation path rejects the same stale work order.
3. Introduce a prompt compiler error. Expected: all launch surfaces stop before agent execution.
4. Compare v1 compatibility and v2 JSON snapshots. Expected: v1 remains explicit and v2 has one casing without duplicate aliases.
5. Run focused route/brief/runner/Hermes tests, lifecycle invariants, guards, and typecheck.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert the task implementation commit(s) while preserving unrelated task and migration state.
- Restore the previous compatibility view or persisted contract version.
- Re-run focused contract, migration, and type checks.

## Findings
