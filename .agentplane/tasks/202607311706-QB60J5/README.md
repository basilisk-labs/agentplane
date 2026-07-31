---
id: "202607311706-QB60J5"
title: "Benchmark TypeScript 7 and freeze the AgentPlane adoption contract"
status: "DOING"
priority: "high"
owner: "TESTER"
revision: 9
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
  state: "ok"
  updated_at: "2026-07-31T17:51:03.105Z"
  updated_by: "TESTER"
  note: "Verified implementation 7a6a2ee8f3ec: 3 cold and 5 warm runs per compiler, 4.46x-4.93x speedup, lower RSS, root/website compatibility classification, reviewed emit drift, TypeScript 6 API resolution, lint/trust/compatibility gates, frozen install, typecheck, format, task-state, routing, syntax, and diff checks passed."
  attempts: 0
quality_review:
  state: "pass"
  provenance: "evaluator_supplied"
  updated_at: "2026-07-31T17:51:38.698Z"
  updated_by: "EVALUATOR"
  note: "EVALUATOR returned pass with 3 typed finding(s)."
  evaluated_sha: "7a6a2ee8f3ec8d8055136c45d5e53b3e0679f456"
  blueprint_digest: "0a853313c2d88fe649ee7750dae792ecf78a7e4696e56067b8885330da375514"
  evidence_refs:
    - ".agentplane/tasks/202607311706-QB60J5/quality/20260731-175138576-recovery-context/evaluator-work-order.json"
    - ".agentplane/tasks/202607311706-QB60J5/quality/20260731-175138576-recovery-context/quality-report.json"
    - ".agentplane/tasks/202607311706-QB60J5/quality/20260731-175138576-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202607311706-QB60J5/quality/20260731-175138576-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202607311706-QB60J5/quality/20260731-175138576-recovery-context/evaluator-result.json"
    - ".agentplane/tasks/202607311706-QB60J5/README.md"
    - ".agentplane/tasks/202607311706-QB60J5/quality/20260731-175138576-recovery-context/evaluator-diff.patch"
    - ".agentplane/tasks/202607311706-QB60J5/quality/20260731-175138576-recovery-context/evaluator-observed-checks.json"
    - ".agentplane/tasks/202607311706-QB60J5/quality/20260731-175138576-recovery-context/evaluator-blueprint.json"
    - ".agentplane/policy/dod.code.md"
    - ".agentplane/policy/dod.core.md"
    - ".agentplane/policy/security.must.md"
    - ".agentplane/policy/workflow.branch_pr.md"
  findings:
    - "Implementation 7a6a2ee8f3ec records the required 3 cold and 5 warm runs per compiler, exact timing and RSS calculations, and a measured 4.46x to 4.93x speedup without a memory regression."
    - "Diagnostic and emit drift are classified: supported root and website paths are green after bounded candidate config changes, JavaScript emit is unchanged, declaration drift is order-only or parenthesis-only, and pre-existing non-gating config failures are explicit."
    - "The side-by-side resolution proof and passing lint, trust-boundary, no-console, compatibility, frozen-install, typecheck, format, routing, task-state, syntax, and diff gates support the GO decision without prematurely landing the migration."
commit:
  hash: "7a6a2ee8f3ec8d8055136c45d5e53b3e0679f456"
  message: "🧪 QB60J5 benchmark: freeze TypeScript 7 adoption contract"
comments:
  -
    author: "TESTER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "TESTER"
    body: "Implementation target: TypeScript 7 benchmark evidence and frozen adoption contract."
events:
  -
    type: "status"
    at: "2026-07-31T17:28:35.361Z"
    author: "TESTER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-07-31T17:50:50.260Z"
    author: "TESTER"
    from: "DOING"
    to: "DOING"
    note: "Implementation target: TypeScript 7 benchmark evidence and frozen adoption contract."
  -
    type: "verify"
    at: "2026-07-31T17:51:03.105Z"
    author: "TESTER"
    state: "ok"
    note: "Verified implementation 7a6a2ee8f3ec: 3 cold and 5 warm runs per compiler, 4.46x-4.93x speedup, lower RSS, root/website compatibility classification, reviewed emit drift, TypeScript 6 API resolution, lint/trust/compatibility gates, frozen install, typecheck, format, task-state, routing, syntax, and diff checks passed."
doc_version: 3
doc_updated_at: "2026-07-31T17:51:03.949Z"
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
    ### 2026-07-31T17:51:03.105Z — VERIFY — ok

    By: TESTER

    Note: Verified implementation 7a6a2ee8f3ec: 3 cold and 5 warm runs per compiler, 4.46x-4.93x speedup, lower RSS, root/website compatibility classification, reviewed emit drift, TypeScript 6 API resolution, lint/trust/compatibility gates, frozen install, typecheck, format, task-state, routing, syntax, and diff checks passed.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-31T17:50:50.260Z, excerpt_hash=sha256:edd26f13b67347bbe224437f2883b183c775e8f1c03f1e5411b759c1d0fcb26a

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202607311706-QB60J5-benchmark-typescript-7-and-freeze-the-agentplane/.agentplane/tasks/202607311706-QB60J5/blueprint/resolved-snapshot.json
    - old_digest: 0a853313c2d88fe649ee7750dae792ecf78a7e4696e56067b8885330da375514
    - current_digest: 0a853313c2d88fe649ee7750dae792ecf78a7e4696e56067b8885330da375514
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607311706-QB60J5

    DecisionContextRef:
    - operator_action: provider_action
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: none
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: TypeScript 7.0.2 completed the root graph 4.46x to 4.93x faster than TypeScript 6.0.3 with 8.6% to 14.4% lower peak RSS after the required baseUrl compatibility changes.
      Impact: AgentPlane 0.7 should adopt the native compiler for typechecking, but TypeScript 7 cannot replace the compiler API used by ESLint and trust-boundary scripts.
      Resolution: Freeze the side-by-side contract in benchmark/typescript-7-adoption-contract.md and hand implementation to 202607311707-DRYTNK.

    - Observation: TypeScript 7 is viable only as a side-by-side native typecheck compiler; root and Docusaurus baseUrl usage require bounded compatibility changes.
      Impact: The v0.7 migration can reduce typecheck latency materially without moving compiler-API consumers off TypeScript 6.
      Resolution: Proceed through DRYTNK with exact pins, hosted Windows/Linux gates, declaration drift guard, and the TypeScript 6 rollback override.
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
### 2026-07-31T17:51:03.105Z — VERIFY — ok

By: TESTER

Note: Verified implementation 7a6a2ee8f3ec: 3 cold and 5 warm runs per compiler, 4.46x-4.93x speedup, lower RSS, root/website compatibility classification, reviewed emit drift, TypeScript 6 API resolution, lint/trust/compatibility gates, frozen install, typecheck, format, task-state, routing, syntax, and diff checks passed.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-31T17:50:50.260Z, excerpt_hash=sha256:edd26f13b67347bbe224437f2883b183c775e8f1c03f1e5411b759c1d0fcb26a

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202607311706-QB60J5-benchmark-typescript-7-and-freeze-the-agentplane/.agentplane/tasks/202607311706-QB60J5/blueprint/resolved-snapshot.json
- old_digest: 0a853313c2d88fe649ee7750dae792ecf78a7e4696e56067b8885330da375514
- current_digest: 0a853313c2d88fe649ee7750dae792ecf78a7e4696e56067b8885330da375514
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607311706-QB60J5

DecisionContextRef:
- operator_action: provider_action
- can_execute_now: false
- safe_command: none
- diagnostic_command: none
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: TypeScript 7.0.2 completed the root graph 4.46x to 4.93x faster than TypeScript 6.0.3 with 8.6% to 14.4% lower peak RSS after the required baseUrl compatibility changes.
  Impact: AgentPlane 0.7 should adopt the native compiler for typechecking, but TypeScript 7 cannot replace the compiler API used by ESLint and trust-boundary scripts.
  Resolution: Freeze the side-by-side contract in benchmark/typescript-7-adoption-contract.md and hand implementation to 202607311707-DRYTNK.

- Observation: TypeScript 7 is viable only as a side-by-side native typecheck compiler; root and Docusaurus baseUrl usage require bounded compatibility changes.
  Impact: The v0.7 migration can reduce typecheck latency materially without moving compiler-API consumers off TypeScript 6.
  Resolution: Proceed through DRYTNK with exact pins, hosted Windows/Linux gates, declaration drift guard, and the TypeScript 6 rollback override.
