---
id: "202608061850-BZT3D9"
title: "Land post-merge workflow routing qualification fixes"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on:
  - "202608061646-WCARQG"
tags:
  - "code"
  - "followup"
  - "routing"
task_kind: "code"
mutation_scope: "code"
risk_flags:
  - "merge"
blueprint_request: "code.branch_pr"
verify:
  - "bun run format:check"
  - "bun run test:critical"
  - "bun run typecheck"
  - "bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/runtime/task-routing packages/agentplane/src/commands/task/branch-task-supervisor-operations.test.ts"
  - "node scripts/checks/check-compatibility-contract-baseline.mjs"
plan_approval:
  state: "approved"
  updated_at: "2026-08-06T18:51:38.953Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-08-06T18:58:20.398Z"
  updated_by: "TESTER"
  note: "Post-merge qualification fixes are isolated from merged main and pass all declared release gates."
  attempts: 0
execution_route:
  frozen: true
  reason_codes:
    - "repository_branch_pr_floor"
  repository_mode: "branch_pr"
  requested_mode: "branch_pr"
  schema_version: 1
  selected_mode: "branch_pr"
commit: null
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
events:
  -
    type: "status"
    at: "2026-08-06T18:52:19.793Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "verify"
    at: "2026-08-06T18:58:20.398Z"
    author: "TESTER"
    state: "ok"
    note: "Post-merge qualification fixes are isolated from merged main and pass all declared release gates."
doc_version: 3
doc_updated_at: "2026-08-06T18:58:21.263Z"
doc_updated_by: "CODER"
description: "Publish the already verified post-merge fixes discovered after PR #4784 auto-merged: generated schema formatting, CLI reference and llms corpus refresh, isolated routing E2E coverage, lint-safe route resolution, repaired supervisor test fixture, and reviewed compatibility candidate evidence. No new product behavior beyond task 202608061646-WCARQG."
sections:
  Summary: |-
    Land post-merge workflow routing qualification fixes

    Publish the already verified post-merge fixes discovered after PR #4784 auto-merged: generated schema formatting, CLI reference and llms corpus refresh, isolated routing E2E coverage, lint-safe route resolution, repaired supervisor test fixture, and reviewed compatibility candidate evidence. No new product behavior beyond task 202608061646-WCARQG.
  Scope: |-
    - In scope: Publish the already verified post-merge fixes discovered after PR #4784 auto-merged: generated schema formatting, CLI reference and llms corpus refresh, isolated routing E2E coverage, lint-safe route resolution, repaired supervisor test fixture, and reviewed compatibility candidate evidence. No new product behavior beyond task 202608061646-WCARQG.
    - Out of scope: unrelated refactors not required for "Land post-merge workflow routing qualification fixes".
  Plan: "1. Prove the exact content delta between merged main and the verified WCARQG post-merge head, and exclude already merged implementation changes. 2. Create a dedicated post-merge task worktree from current main and apply only the unmerged qualification, compatibility, documentation, and regression-test commits. 3. Rebuild generated runtime artifacts if required and run task-specific checks plus the critical CLI, docs, workflow, platform, and significant-coverage gates. 4. Record TESTER verification and evaluator review against the final semantic head. 5. Publish a dedicated follow-up PR, wait for hosted checks, integrate through the protected main lane, and clean the superseded WCARQG branch only after its head is contained by main."
  Verify Steps: |-
    1. Run `git diff origin/main...HEAD --stat` and inspect the patch. Expected: only the verified post-merge qualification fixes from WCARQG are present; no duplicate implementation or unrelated task artifacts are introduced.
    2. Run `bun run typecheck`, `bun run format:check`, `bun run schemas:check`, `bun run docs:cli:check`, and `node .agentplane/policy/check-routing.mjs`. Expected: all generated contracts, types, formatting, and routing policy checks pass.
    3. Run `node scripts/checks/check-compatibility-contract-baseline.mjs` and `bun run test:critical`. Expected: the reviewed cumulative compatibility candidate is exact and all critical CLI chunks pass.
    4. Run `bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/runtime/task-routing packages/agentplane/src/commands/task/branch-task-supervisor-operations.test.ts` and `bun run test:project -- cli-core packages/agentplane/src/cli/run-cli.core.task-routing.test.ts`. Expected: per-task route selection and branch supervisor regression coverage pass.
    5. Run `bun run docs:site:check`, `bun run workflows:lint`, `bun run test:platform-critical`, and the significant guard coverage suite. Expected: docs, workflow, platform, and coverage release gates pass.
    6. Confirm the hosted PR head equals the verified local head and all required GitHub checks pass before integration. Expected: protected main contains the follow-up head and the obsolete WCARQG branch is removed only after ancestry is proven.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-08-06T18:58:20.398Z — VERIFY — ok

    By: TESTER

    Note: Post-merge qualification fixes are isolated from merged main and pass all declared release gates.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-06T18:52:19.793Z, excerpt_hash=sha256:49270bb1ae6e5b52fba98df041e83462fede9816891a113de985a75b612507e6

    Details:

    Command: git diff origin/main...HEAD --stat and patch audit
    Result: pass
    Evidence: net diff contains only BZT3D9 task artifacts plus the verified WCARQG qualification, compatibility, documentation, and regression-test fixes; foreign WCARQG PR artifacts were restored to main state.
    Scope: exact post-merge follow-up boundary.

    Command: bun run typecheck; format:check; schemas:check; docs:cli:check; policy routing check
    Result: pass
    Evidence: TypeScript, formatting, generated schemas, CLI reference, and routing policy are current.
    Scope: static and generated contract gates.

    Command: compatibility baseline check and bun run test:critical
    Result: pass
    Evidence: approved cumulative candidate resolves current f1f7ba365b8912771323910df3e34843708feeccc291944d50a1ab2f7874ca01 with 259 commands, 179 args, and 829 options; all 12 critical CLI chunks passed.
    Scope: public compatibility, trust boundary, and RF-04 replay contracts.

    Command: focused routing/supervisor and cli-core routing tests
    Result: pass
    Evidence: 2 AgentPlane files with 6 tests and the isolated CLI route E2E passed.
    Scope: per-task route selection and branch supervisor regression.

    Command: docs site, workflows, platform-critical, and significant guard coverage gates
    Result: pass
    Evidence: site generation/typecheck/build/design passed; workflow contracts passed; 6 platform files with 94 tests and 8 guard files with 101 tests passed; 17 significant source targets satisfied.
    Scope: release qualification surfaces.

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608061850-BZT3D9-land-post-merge-workflow-routing-qualification-f/.agentplane/tasks/202608061850-BZT3D9/blueprint/resolved-snapshot.json
    - old_digest: 440d169b378295a6d69c4666cf3c8ed8ff4c86eec65ae304cf306267eda88e65
    - current_digest: 440d169b378295a6d69c4666cf3c8ed8ff4c86eec65ae304cf306267eda88e65
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608061850-BZT3D9

    DecisionContextRef:
    - operator_action: stop
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
  Findings: ""
extensions:
  workflow_route_baseline:
    start_head_sha: "0e1d30346d74b782d736e480700919077e532c5f"
    version: 1
id_source: "generated"
---
## Summary

Land post-merge workflow routing qualification fixes

Publish the already verified post-merge fixes discovered after PR #4784 auto-merged: generated schema formatting, CLI reference and llms corpus refresh, isolated routing E2E coverage, lint-safe route resolution, repaired supervisor test fixture, and reviewed compatibility candidate evidence. No new product behavior beyond task 202608061646-WCARQG.

## Scope

- In scope: Publish the already verified post-merge fixes discovered after PR #4784 auto-merged: generated schema formatting, CLI reference and llms corpus refresh, isolated routing E2E coverage, lint-safe route resolution, repaired supervisor test fixture, and reviewed compatibility candidate evidence. No new product behavior beyond task 202608061646-WCARQG.
- Out of scope: unrelated refactors not required for "Land post-merge workflow routing qualification fixes".

## Plan

1. Prove the exact content delta between merged main and the verified WCARQG post-merge head, and exclude already merged implementation changes. 2. Create a dedicated post-merge task worktree from current main and apply only the unmerged qualification, compatibility, documentation, and regression-test commits. 3. Rebuild generated runtime artifacts if required and run task-specific checks plus the critical CLI, docs, workflow, platform, and significant-coverage gates. 4. Record TESTER verification and evaluator review against the final semantic head. 5. Publish a dedicated follow-up PR, wait for hosted checks, integrate through the protected main lane, and clean the superseded WCARQG branch only after its head is contained by main.

## Verify Steps

1. Run `git diff origin/main...HEAD --stat` and inspect the patch. Expected: only the verified post-merge qualification fixes from WCARQG are present; no duplicate implementation or unrelated task artifacts are introduced.
2. Run `bun run typecheck`, `bun run format:check`, `bun run schemas:check`, `bun run docs:cli:check`, and `node .agentplane/policy/check-routing.mjs`. Expected: all generated contracts, types, formatting, and routing policy checks pass.
3. Run `node scripts/checks/check-compatibility-contract-baseline.mjs` and `bun run test:critical`. Expected: the reviewed cumulative compatibility candidate is exact and all critical CLI chunks pass.
4. Run `bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/runtime/task-routing packages/agentplane/src/commands/task/branch-task-supervisor-operations.test.ts` and `bun run test:project -- cli-core packages/agentplane/src/cli/run-cli.core.task-routing.test.ts`. Expected: per-task route selection and branch supervisor regression coverage pass.
5. Run `bun run docs:site:check`, `bun run workflows:lint`, `bun run test:platform-critical`, and the significant guard coverage suite. Expected: docs, workflow, platform, and coverage release gates pass.
6. Confirm the hosted PR head equals the verified local head and all required GitHub checks pass before integration. Expected: protected main contains the follow-up head and the obsolete WCARQG branch is removed only after ancestry is proven.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-08-06T18:58:20.398Z — VERIFY — ok

By: TESTER

Note: Post-merge qualification fixes are isolated from merged main and pass all declared release gates.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-06T18:52:19.793Z, excerpt_hash=sha256:49270bb1ae6e5b52fba98df041e83462fede9816891a113de985a75b612507e6

Details:

Command: git diff origin/main...HEAD --stat and patch audit
Result: pass
Evidence: net diff contains only BZT3D9 task artifacts plus the verified WCARQG qualification, compatibility, documentation, and regression-test fixes; foreign WCARQG PR artifacts were restored to main state.
Scope: exact post-merge follow-up boundary.

Command: bun run typecheck; format:check; schemas:check; docs:cli:check; policy routing check
Result: pass
Evidence: TypeScript, formatting, generated schemas, CLI reference, and routing policy are current.
Scope: static and generated contract gates.

Command: compatibility baseline check and bun run test:critical
Result: pass
Evidence: approved cumulative candidate resolves current f1f7ba365b8912771323910df3e34843708feeccc291944d50a1ab2f7874ca01 with 259 commands, 179 args, and 829 options; all 12 critical CLI chunks passed.
Scope: public compatibility, trust boundary, and RF-04 replay contracts.

Command: focused routing/supervisor and cli-core routing tests
Result: pass
Evidence: 2 AgentPlane files with 6 tests and the isolated CLI route E2E passed.
Scope: per-task route selection and branch supervisor regression.

Command: docs site, workflows, platform-critical, and significant guard coverage gates
Result: pass
Evidence: site generation/typecheck/build/design passed; workflow contracts passed; 6 platform files with 94 tests and 8 guard files with 101 tests passed; 17 significant source targets satisfied.
Scope: release qualification surfaces.

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608061850-BZT3D9-land-post-merge-workflow-routing-qualification-f/.agentplane/tasks/202608061850-BZT3D9/blueprint/resolved-snapshot.json
- old_digest: 440d169b378295a6d69c4666cf3c8ed8ff4c86eec65ae304cf306267eda88e65
- current_digest: 440d169b378295a6d69c4666cf3c8ed8ff4c86eec65ae304cf306267eda88e65
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608061850-BZT3D9

DecisionContextRef:
- operator_action: stop
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
