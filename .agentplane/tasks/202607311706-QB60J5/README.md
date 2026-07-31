---
id: "202607311706-QB60J5"
title: "Benchmark TypeScript 7 and freeze the AgentPlane adoption contract"
status: "DOING"
priority: "high"
owner: "TESTER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "benchmark"
  - "code"
  - "milestone-rc2"
  - "performance"
  - "toolchain"
  - "typescript7"
  - "v0.7"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "performance.benchmark"
verify:
  - "Exercise typescript-eslint plus trust-boundary and compatibility scripts that import the TypeScript compiler API with the side-by-side TypeScript 6 package."
  - "Measure repeated warm and cold TypeScript 6 and TypeScript 7 typecheck runs for the root project graph and record wall time, peak memory, and diagnostic counts."
  - "Record a go/no-go decision with exact package aliases, pinned versions, checker/builder settings, CI resource limits, and a one-command rollback path."
  - "Run TypeScript 7 against every repository tsconfig/project-reference path and classify every diagnostic or emit difference; unresolved correctness drift fails the adoption gate."
plan_approval:
  state: "approved"
  updated_at: "2026-07-31T17:07:29.290Z"
  updated_by: "ORCHESTRATOR"
  note: "Approved as the TypeScript 7 evidence gate for AgentPlane 0.7."
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
  attempts: 0
commit: null
comments:
  -
    author: "TESTER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
events:
  -
    type: "status"
    at: "2026-07-31T17:28:35.361Z"
    author: "TESTER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
doc_version: 3
doc_updated_at: "2026-07-31T17:47:05.196Z"
doc_updated_by: "TESTER"
description: "Measure TypeScript 7.0 against the current TypeScript 6.0.3 baseline across all AgentPlane project references, classify diagnostic and emit parity, prove the TypeScript 6 compiler API consumers remain supported side-by-side, and freeze compiler pinning, CI concurrency, rollback, and acceptance thresholds for the 0.7 migration."
sections:
  Summary: |-
    Benchmark TypeScript 7 and freeze the AgentPlane adoption contract

    Measure TypeScript 7.0 against the current TypeScript 6.0.3 baseline across all AgentPlane project references, classify diagnostic and emit parity, prove the TypeScript 6 compiler API consumers remain supported side-by-side, and freeze compiler pinning, CI concurrency, rollback, and acceptance thresholds for the 0.7 migration.
  Scope: |-
    - In scope: Measure TypeScript 7.0 against the current TypeScript 6.0.3 baseline across all AgentPlane project references, classify diagnostic and emit parity, prove the TypeScript 6 compiler API consumers remain supported side-by-side, and freeze compiler pinning, CI concurrency, rollback, and acceptance thresholds for the 0.7 migration.
    - Out of scope: unrelated refactors not required for "Benchmark TypeScript 7 and freeze the AgentPlane adoption contract".
  Plan: |-
    1. Freeze a reproducible TypeScript 6 baseline and benchmark method.
    2. Add a worktree-local side-by-side TypeScript 7 candidate and exercise all compiler entrypoints.
    3. Prove compiler-API consumers remain on TypeScript 6 and classify every parity difference.
    4. Benchmark the candidate under local and hosted CI resource shapes.
    5. Publish a bounded adoption contract or a no-go decision with rollback and residual risks.
  Verify Steps: |-
    1. Capture the TypeScript 6.0.3 baseline with at least three isolated cold runs and five warm runs of the root project-reference typecheck; record wall time, peak memory, diagnostic count, machine/runner shape, and exact commands in a task artifact.
    2. Install TypeScript 7 side-by-side without replacing the TypeScript 6 API surface, then run every repository tsconfig/project-reference path. Zero unexplained diagnostic, declaration, or emit drift is required.
    3. Exercise ESLint/typescript-eslint and every scripts/** consumer that imports the TypeScript compiler API. They must continue to resolve the pinned TypeScript 6 compatibility API while typecheck commands resolve TypeScript 7.
    4. Compare at least three TypeScript 7 cold runs and five warm runs against the same baseline. Adoption requires no correctness regression, no material peak-memory regression on CI-sized runners, and a measured typecheck improvement or a documented reason the smaller local graph masks expected CI savings.
    5. Record a go/no-go decision that freezes exact package aliases and versions, checker/builder concurrency, CI resource limits, rollback command, residual risks, and the implementation task handoff.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: TypeScript 7.0.2 completed the root graph 4.46x to 4.93x faster than TypeScript 6.0.3 with 8.6% to 14.4% lower peak RSS after the required baseUrl compatibility changes.
      Impact: AgentPlane 0.7 should adopt the native compiler for typechecking, but TypeScript 7 cannot replace the compiler API used by ESLint and trust-boundary scripts.
      Resolution: Freeze the side-by-side contract in benchmark/typescript-7-adoption-contract.md and hand implementation to 202607311707-DRYTNK.
extensions:
  workflow_route_baseline:
    start_head_sha: "54c1d90ac8cd30ea28d165c8e41fcdc1542e740c"
    version: 1
id_source: "generated"
---
## Summary

Benchmark TypeScript 7 and freeze the AgentPlane adoption contract

Measure TypeScript 7.0 against the current TypeScript 6.0.3 baseline across all AgentPlane project references, classify diagnostic and emit parity, prove the TypeScript 6 compiler API consumers remain supported side-by-side, and freeze compiler pinning, CI concurrency, rollback, and acceptance thresholds for the 0.7 migration.

## Scope

- In scope: Measure TypeScript 7.0 against the current TypeScript 6.0.3 baseline across all AgentPlane project references, classify diagnostic and emit parity, prove the TypeScript 6 compiler API consumers remain supported side-by-side, and freeze compiler pinning, CI concurrency, rollback, and acceptance thresholds for the 0.7 migration.
- Out of scope: unrelated refactors not required for "Benchmark TypeScript 7 and freeze the AgentPlane adoption contract".

## Plan

1. Freeze a reproducible TypeScript 6 baseline and benchmark method.
2. Add a worktree-local side-by-side TypeScript 7 candidate and exercise all compiler entrypoints.
3. Prove compiler-API consumers remain on TypeScript 6 and classify every parity difference.
4. Benchmark the candidate under local and hosted CI resource shapes.
5. Publish a bounded adoption contract or a no-go decision with rollback and residual risks.

## Verify Steps

1. Capture the TypeScript 6.0.3 baseline with at least three isolated cold runs and five warm runs of the root project-reference typecheck; record wall time, peak memory, diagnostic count, machine/runner shape, and exact commands in a task artifact.
2. Install TypeScript 7 side-by-side without replacing the TypeScript 6 API surface, then run every repository tsconfig/project-reference path. Zero unexplained diagnostic, declaration, or emit drift is required.
3. Exercise ESLint/typescript-eslint and every scripts/** consumer that imports the TypeScript compiler API. They must continue to resolve the pinned TypeScript 6 compatibility API while typecheck commands resolve TypeScript 7.
4. Compare at least three TypeScript 7 cold runs and five warm runs against the same baseline. Adoption requires no correctness regression, no material peak-memory regression on CI-sized runners, and a measured typecheck improvement or a documented reason the smaller local graph masks expected CI savings.
5. Record a go/no-go decision that freezes exact package aliases and versions, checker/builder concurrency, CI resource limits, rollback command, residual risks, and the implementation task handoff.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: TypeScript 7.0.2 completed the root graph 4.46x to 4.93x faster than TypeScript 6.0.3 with 8.6% to 14.4% lower peak RSS after the required baseUrl compatibility changes.
  Impact: AgentPlane 0.7 should adopt the native compiler for typechecking, but TypeScript 7 cannot replace the compiler API used by ESLint and trust-boundary scripts.
  Resolution: Freeze the side-by-side contract in benchmark/typescript-7-adoption-contract.md and hand implementation to 202607311707-DRYTNK.
