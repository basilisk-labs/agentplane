---
id: "202603231533-V6SVH2"
title: "Runner lifecycle preconditions for task and scenario execution"
result_summary: "Enforced lifecycle gating for task and scenario runner execution."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 11
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "runner"
  - "lifecycle"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-23T15:36:20.877Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-03-23T15:42:15.611Z"
  updated_by: "CODER"
  note: "Verified lifecycle gating for task run and scenario execute with vitest, source builds, and doctor."
commit:
  hash: "cba06bd75920d2d95910d25073295b74b0b7dda7"
  message: "✅ V6SVH2 code: done"
comments:
  -
    author: "CODER"
    body: "Start: enforce DOING-only runner execution semantics and route scenario execute through the normal task start lifecycle before launching the shared runner."
  -
    author: "CODER"
    body: "Verified: enforced DOING-only runner execution, routed scenario execute through plan-approve plus start-ready, and covered the lifecycle path with runner CLI integration tests."
  -
    author: "CODER"
    body: "Verified: recorded the lifecycle-gating implementation commit after the initial finish attempt crossed the DONE transition before the status-commit confirmation gate was acknowledged."
  -
    author: "CODER"
    body: "Start: reopen briefly to attach the implementation commit after the earlier finish attempt stopped at the confirmation gate."
  -
    author: "CODER"
    body: "Verified: enforced DOING-only runner execution, routed scenario execute through plan-approve plus start-ready, and recovered the finish flow after the confirmation gate interruption."
events:
  -
    type: "status"
    at: "2026-03-23T15:36:21.660Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: enforce DOING-only runner execution semantics and route scenario execute through the normal task start lifecycle before launching the shared runner."
  -
    type: "verify"
    at: "2026-03-23T15:42:15.611Z"
    author: "CODER"
    state: "ok"
    note: "Verified lifecycle gating for task run and scenario execute with vitest, source builds, and doctor."
  -
    type: "status"
    at: "2026-03-23T15:43:00.625Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: enforced DOING-only runner execution, routed scenario execute through plan-approve plus start-ready, and covered the lifecycle path with runner CLI integration tests."
  -
    type: "status"
    at: "2026-03-23T15:45:22.647Z"
    author: "CODER"
    from: "DONE"
    to: "DONE"
    note: "Verified: recorded the lifecycle-gating implementation commit after the initial finish attempt crossed the DONE transition before the status-commit confirmation gate was acknowledged."
  -
    type: "status"
    at: "2026-03-23T15:46:12.587Z"
    author: "CODER"
    from: "DONE"
    to: "DOING"
    note: "Start: reopen briefly to attach the implementation commit after the earlier finish attempt stopped at the confirmation gate."
  -
    type: "status"
    at: "2026-03-23T15:46:21.114Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: enforced DOING-only runner execution, routed scenario execute through plan-approve plus start-ready, and recovered the finish flow after the confirmation gate interruption."
doc_version: 3
doc_updated_at: "2026-03-23T15:46:28.618Z"
doc_updated_by: "CODER"
description: "Enforce explicit lifecycle semantics for task run and scenario execute: require executable task state, and materialize recipe-backed tasks through normal start lifecycle instead of bypassing it."
sections:
  Summary: |-
    Runner lifecycle preconditions for task and scenario execution
    
    Enforce explicit lifecycle semantics for task run and scenario execute: require executable task state, and materialize recipe-backed tasks through normal start lifecycle instead of bypassing it.
  Scope: |-
    - In scope: Enforce explicit lifecycle semantics for task run and scenario execute: require executable task state, and materialize recipe-backed tasks through normal start lifecycle instead of bypassing it.
    - Out of scope: unrelated refactors not required for "Runner lifecycle preconditions for task and scenario execution".
  Plan: |-
    1. Add an explicit runner lifecycle guard so `task run` only prepares or executes runs for tasks already in `DOING`.
    2. Route `scenario execute` through task materialization plus `task start-ready` semantics before shared runner execution, using a deterministic start comment.
    3. Update CLI integration coverage for the new failure/success paths, then re-run the declared verification commands.
  Verify Steps: |-
    1. Run `bunx vitest run packages/agentplane/src/cli/run-cli.core.tasks.query.test.ts packages/agentplane/src/cli/run-cli.scenario.test.ts`. Expected: task run enforces the new lifecycle precondition and scenario execute still succeeds through the normal start lifecycle.
    2. Run `bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build`. Expected: the runner/task/scenario code builds cleanly from source.
    3. Run `AGENTPLANE_DEV_ALLOW_STALE_DIST=1 agentplane doctor`. Expected: no new errors or warnings related to the task lifecycle change.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    #### 2026-03-23T15:42:15.611Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified lifecycle gating for task run and scenario execute with vitest, source builds, and doctor.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-23T15:36:21.661Z, excerpt_hash=sha256:8044b10be9a7c5dced181572b46feba21ad60450926b10704047fd6474d61e72
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Runner lifecycle preconditions for task and scenario execution

Enforce explicit lifecycle semantics for task run and scenario execute: require executable task state, and materialize recipe-backed tasks through normal start lifecycle instead of bypassing it.

## Scope

- In scope: Enforce explicit lifecycle semantics for task run and scenario execute: require executable task state, and materialize recipe-backed tasks through normal start lifecycle instead of bypassing it.
- Out of scope: unrelated refactors not required for "Runner lifecycle preconditions for task and scenario execution".

## Plan

1. Add an explicit runner lifecycle guard so `task run` only prepares or executes runs for tasks already in `DOING`.
2. Route `scenario execute` through task materialization plus `task start-ready` semantics before shared runner execution, using a deterministic start comment.
3. Update CLI integration coverage for the new failure/success paths, then re-run the declared verification commands.

## Verify Steps

1. Run `bunx vitest run packages/agentplane/src/cli/run-cli.core.tasks.query.test.ts packages/agentplane/src/cli/run-cli.scenario.test.ts`. Expected: task run enforces the new lifecycle precondition and scenario execute still succeeds through the normal start lifecycle.
2. Run `bun run --filter=@agentplaneorg/core build && bun run --filter=agentplane build`. Expected: the runner/task/scenario code builds cleanly from source.
3. Run `AGENTPLANE_DEV_ALLOW_STALE_DIST=1 agentplane doctor`. Expected: no new errors or warnings related to the task lifecycle change.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-03-23T15:42:15.611Z — VERIFY — ok

By: CODER

Note: Verified lifecycle gating for task run and scenario execute with vitest, source builds, and doctor.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-23T15:36:21.661Z, excerpt_hash=sha256:8044b10be9a7c5dced181572b46feba21ad60450926b10704047fd6474d61e72

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
