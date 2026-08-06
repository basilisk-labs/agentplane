---
id: "202608061850-BZT3D9"
title: "Land post-merge workflow routing qualification fixes"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 5
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
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
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
doc_version: 3
doc_updated_at: "2026-08-06T18:52:19.793Z"
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
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
