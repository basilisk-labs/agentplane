---
id: "202607221908-PWFH5K"
title: "Enforce mandatory release dependency closure"
result_summary: "pre-merge closure"
status: "DONE"
priority: "high"
owner: "CODER"
revision: 11
origin:
  system: "manual"
depends_on:
  - "202607221854-K7799B"
tags:
  - "graph"
  - "guard"
  - "milestone-rc2"
  - "release"
  - "rf-27"
  - "v0.7"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "quality.regression"
verify:
  - "bun run guards:check"
  - "bun run task-state:check"
  - "bun run test:critical"
plan_approval:
  state: "approved"
  updated_at: "2026-08-01T18:47:48.669Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-08-01T19:13:13.772Z"
  updated_by: "TESTER"
  note: "PASS at 24183b04ebd6. Command: bunx vitest run task-registry-ready-script.test.ts release-ready-manifest-script.test.ts; Result: pass; Evidence: 2 files, 16/16 tests. Scope: corrected 69-task closure, RF-02/RF-20 omissions, cycle, unknown dependency, optional classification, missing contract, manifest integration. Command: bun run task-state:check; Result: pass; Evidence: tasks=3197 release_closure=69. Scope: canonical repository graph. Command: bun run release:tasks:check --ignore-release-task 202607221908-PWFH5K; Result: pass; Evidence: release_closure=69. Scope: release readiness excluding only the task under verification. Command: bun run guards:check; Result: pass; Evidence: shared guards OK and trust ratchet 0. Scope: trust boundaries. Command: bun run typecheck and bun run test:critical; Result: pass; Evidence: TypeScript 7 and 12/12 critical CLI chunks. Scope: typed build and critical CLI compatibility. Command: bun run ci:contract; Result: pass; Evidence: all contract, architecture, clone, Knip, and coverage ratchets passed. Scope: full static contract gate."
  attempts: 0
quality_review:
  state: "pass"
  provenance: "evaluator_supplied"
  updated_at: "2026-08-01T19:14:59.579Z"
  updated_by: "EVALUATOR"
  note: "EVALUATOR returned pass with 1 typed finding(s)."
  evaluated_sha: "24183b04ebd63e8c6bf8bcbcaafe85ba72328b51"
  blueprint_digest: "cae53404e3ae8d03a273e2e42e39c2587fc164f6d4557386182d5eb5917897a6"
  evidence_refs:
    - ".agentplane/tasks/202607221908-PWFH5K/quality/20260801-191412657-recovery-context/evaluator-work-order.json"
    - ".agentplane/tasks/202607221908-PWFH5K/quality/20260801-191412657-recovery-context/quality-report.json"
    - ".agentplane/tasks/202607221908-PWFH5K/quality/20260801-191412657-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202607221908-PWFH5K/quality/20260801-191412657-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202607221908-PWFH5K/quality/20260801-191412657-recovery-context/evaluator-result.json"
    - ".agentplane/tasks/202607221908-PWFH5K/README.md"
    - ".agentplane/tasks/202607221908-PWFH5K/quality/20260801-191412657-recovery-context/evaluator-diff.patch"
    - ".agentplane/tasks/202607221908-PWFH5K/quality/20260801-191412657-recovery-context/evaluator-observed-checks.json"
    - ".agentplane/tasks/202607221908-PWFH5K/quality/20260801-191412657-recovery-context/evaluator-blueprint.json"
    - ".agentplane/policy/dod.code.md"
    - ".agentplane/policy/dod.core.md"
    - ".agentplane/policy/security.must.md"
    - ".agentplane/policy/workflow.branch_pr.md"
  findings:
    - "The closure contract is manually enumerated, so the guard cannot independently detect a mandatory task omitted from both the contract and the release-root ancestry."
commit:
  hash: "24183b04ebd63e8c6bf8bcbcaafe85ba72328b51"
  message: "🧩 PWFH5K release: enforce dependency closure"
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "CODER"
    body: "Implementation: added an explicit 0.7.0 release closure contract and fail-closed task/release guards for missing ancestors, cycles, unknown dependencies, unclassified nodes, and optional tasks required in practice."
  -
    author: "CODER"
    body: "Verified: pre-merge closure packet is ready for the task PR."
events:
  -
    type: "status"
    at: "2026-08-01T18:48:16.237Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-08-01T19:12:24.839Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Implementation: added an explicit 0.7.0 release closure contract and fail-closed task/release guards for missing ancestors, cycles, unknown dependencies, unclassified nodes, and optional tasks required in practice."
  -
    type: "verify"
    at: "2026-08-01T19:13:13.772Z"
    author: "TESTER"
    state: "ok"
    note: "PASS at 24183b04ebd6. Command: bunx vitest run task-registry-ready-script.test.ts release-ready-manifest-script.test.ts; Result: pass; Evidence: 2 files, 16/16 tests. Scope: corrected 69-task closure, RF-02/RF-20 omissions, cycle, unknown dependency, optional classification, missing contract, manifest integration. Command: bun run task-state:check; Result: pass; Evidence: tasks=3197 release_closure=69. Scope: canonical repository graph. Command: bun run release:tasks:check --ignore-release-task 202607221908-PWFH5K; Result: pass; Evidence: release_closure=69. Scope: release readiness excluding only the task under verification. Command: bun run guards:check; Result: pass; Evidence: shared guards OK and trust ratchet 0. Scope: trust boundaries. Command: bun run typecheck and bun run test:critical; Result: pass; Evidence: TypeScript 7 and 12/12 critical CLI chunks. Scope: typed build and critical CLI compatibility. Command: bun run ci:contract; Result: pass; Evidence: all contract, architecture, clone, Knip, and coverage ratchets passed. Scope: full static contract gate."
  -
    type: "status"
    at: "2026-08-01T19:16:02.359Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: pre-merge closure packet is ready for the task PR."
doc_version: 3
doc_updated_at: "2026-08-01T19:16:02.360Z"
doc_updated_by: "CODER"
description: "RF-27 release guard: automatically prove that every required open v0.7 implementation, migration, documentation, and gate task is an ancestor of the final 0.7.0 release task."
sections:
  Summary: |-
    Enforce mandatory release dependency closure

    RF-27 release guard: automatically prove that every required open v0.7 implementation, migration, documentation, and gate task is an ancestor of the final 0.7.0 release task.
  Scope: |-
    - In scope: a generic task-DAG closure checker, required/optional release-task classification, cycle/missing/non-ancestor diagnostics, tests including RF-02/RF-20 omissions, and release/contract CI integration.
    - Out of scope: inferring semantic completion from tags alone; the final release plan declares the required root and allowed optional tasks.
  Plan: |-
    1. Define explicit metadata/config for final release root and optional prerelease/backport tasks.
    2. Traverse the canonical task dependency DAG and require every mandatory v0.7 leaf to reach the release root.
    3. Report missing, cyclic, unknown, and accidentally optional nodes with paths.
    4. Add positive/negative fixtures for the planning graph and known omission cases.
    5. Integrate the guard into task-state/release readiness checks.
  Verify Steps: |-
    1. Run the checker on the corrected v0.7 graph. Expected: every mandatory leaf has a dependency path to final 0.7.0.
    2. Remove RF-02 and RF-20 edges in fixtures. Expected: both are named as release-blocking non-ancestors.
    3. Add a cycle, unknown dependency, and optional prerelease task. Expected: precise errors for the first two and explicit acceptance only for declared optional nodes.
    4. Run guards, task-state, focused tests, and release readiness.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-08-01T19:13:13.772Z — VERIFY — ok

    By: TESTER

    Note: PASS at 24183b04ebd6. Command: bunx vitest run task-registry-ready-script.test.ts release-ready-manifest-script.test.ts; Result: pass; Evidence: 2 files, 16/16 tests. Scope: corrected 69-task closure, RF-02/RF-20 omissions, cycle, unknown dependency, optional classification, missing contract, manifest integration. Command: bun run task-state:check; Result: pass; Evidence: tasks=3197 release_closure=69. Scope: canonical repository graph. Command: bun run release:tasks:check --ignore-release-task 202607221908-PWFH5K; Result: pass; Evidence: release_closure=69. Scope: release readiness excluding only the task under verification. Command: bun run guards:check; Result: pass; Evidence: shared guards OK and trust ratchet 0. Scope: trust boundaries. Command: bun run typecheck and bun run test:critical; Result: pass; Evidence: TypeScript 7 and 12/12 critical CLI chunks. Scope: typed build and critical CLI compatibility. Command: bun run ci:contract; Result: pass; Evidence: all contract, architecture, clone, Knip, and coverage ratchets passed. Scope: full static contract gate.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-01T19:12:24.839Z, excerpt_hash=sha256:5cd190056c52e310338253a9fbc48de2ab04cd52bdc9be0bf4e6cb4ff0995387

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202607221908-PWFH5K-enforce-mandatory-release-dependency-closure/.agentplane/tasks/202607221908-PWFH5K/blueprint/resolved-snapshot.json
    - old_digest: cae53404e3ae8d03a273e2e42e39c2587fc164f6d4557386182d5eb5917897a6
    - current_digest: cae53404e3ae8d03a273e2e42e39c2587fc164f6d4557386182d5eb5917897a6
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607221908-PWFH5K

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202607221908-PWFH5K
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert the checker and its CI hook together without changing task dependencies.
    - Preserve the corrected release fan-in in task documents.
    - Re-run the previous task-state check and manually record closure evidence until the guard is restored.
  Findings: |-
    - Observation: Original failure reproduced before implementation: the three new negative release-graph scenarios exited successfully, so removed RF-02/RF-20 edges, dependency cycles, and optional tasks required by the root were not release blockers.
      Impact: The previous task-state and release-ready paths could publish 0.7.0 from an incomplete or cyclic declared program graph.
      Resolution: Added one explicit release closure contract and one shared deterministic checker consumed by both task-state and release readiness; no provider or semantic inference is involved.
extensions:
  workflow_route_baseline:
    start_head_sha: "a7391f6733a069b0ad1e4e4c6aebf622983c3781"
    version: 1
id_source: "generated"
---
## Summary

Enforce mandatory release dependency closure

RF-27 release guard: automatically prove that every required open v0.7 implementation, migration, documentation, and gate task is an ancestor of the final 0.7.0 release task.

## Scope

- In scope: a generic task-DAG closure checker, required/optional release-task classification, cycle/missing/non-ancestor diagnostics, tests including RF-02/RF-20 omissions, and release/contract CI integration.
- Out of scope: inferring semantic completion from tags alone; the final release plan declares the required root and allowed optional tasks.

## Plan

1. Define explicit metadata/config for final release root and optional prerelease/backport tasks.
2. Traverse the canonical task dependency DAG and require every mandatory v0.7 leaf to reach the release root.
3. Report missing, cyclic, unknown, and accidentally optional nodes with paths.
4. Add positive/negative fixtures for the planning graph and known omission cases.
5. Integrate the guard into task-state/release readiness checks.

## Verify Steps

1. Run the checker on the corrected v0.7 graph. Expected: every mandatory leaf has a dependency path to final 0.7.0.
2. Remove RF-02 and RF-20 edges in fixtures. Expected: both are named as release-blocking non-ancestors.
3. Add a cycle, unknown dependency, and optional prerelease task. Expected: precise errors for the first two and explicit acceptance only for declared optional nodes.
4. Run guards, task-state, focused tests, and release readiness.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-08-01T19:13:13.772Z — VERIFY — ok

By: TESTER

Note: PASS at 24183b04ebd6. Command: bunx vitest run task-registry-ready-script.test.ts release-ready-manifest-script.test.ts; Result: pass; Evidence: 2 files, 16/16 tests. Scope: corrected 69-task closure, RF-02/RF-20 omissions, cycle, unknown dependency, optional classification, missing contract, manifest integration. Command: bun run task-state:check; Result: pass; Evidence: tasks=3197 release_closure=69. Scope: canonical repository graph. Command: bun run release:tasks:check --ignore-release-task 202607221908-PWFH5K; Result: pass; Evidence: release_closure=69. Scope: release readiness excluding only the task under verification. Command: bun run guards:check; Result: pass; Evidence: shared guards OK and trust ratchet 0. Scope: trust boundaries. Command: bun run typecheck and bun run test:critical; Result: pass; Evidence: TypeScript 7 and 12/12 critical CLI chunks. Scope: typed build and critical CLI compatibility. Command: bun run ci:contract; Result: pass; Evidence: all contract, architecture, clone, Knip, and coverage ratchets passed. Scope: full static contract gate.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-01T19:12:24.839Z, excerpt_hash=sha256:5cd190056c52e310338253a9fbc48de2ab04cd52bdc9be0bf4e6cb4ff0995387

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202607221908-PWFH5K-enforce-mandatory-release-dependency-closure/.agentplane/tasks/202607221908-PWFH5K/blueprint/resolved-snapshot.json
- old_digest: cae53404e3ae8d03a273e2e42e39c2587fc164f6d4557386182d5eb5917897a6
- current_digest: cae53404e3ae8d03a273e2e42e39c2587fc164f6d4557386182d5eb5917897a6
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607221908-PWFH5K

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202607221908-PWFH5K
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert the checker and its CI hook together without changing task dependencies.
- Preserve the corrected release fan-in in task documents.
- Re-run the previous task-state check and manually record closure evidence until the guard is restored.

## Findings

- Observation: Original failure reproduced before implementation: the three new negative release-graph scenarios exited successfully, so removed RF-02/RF-20 edges, dependency cycles, and optional tasks required by the root were not release blockers.
  Impact: The previous task-state and release-ready paths could publish 0.7.0 from an incomplete or cyclic declared program graph.
  Resolution: Added one explicit release closure contract and one shared deterministic checker consumed by both task-state and release readiness; no provider or semantic inference is involved.
