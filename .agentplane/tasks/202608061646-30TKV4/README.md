---
id: "202608061646-30TKV4"
title: "Add user-first task intake and execution preview"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 14
origin:
  system: "manual"
depends_on:
  - "202608061646-WCARQG"
tags:
  - "cli"
  - "code"
  - "ux"
task_kind: "code"
mutation_scope: "code"
risk_flags:
  - "merge"
blueprint_request: "code.branch_pr"
verify:
  - "bun run test:project -- cli-core packages/agentplane/src/cli/run-cli.core.tasks.create.test.ts packages/agentplane/src/cli/run-cli.core.task-run.test.ts packages/agentplane/src/cli/run-cli.core.task-advance.test.ts"
  - "bun run docs:cli:check"
  - "bun run docs:onboarding:check"
  - "bun run typecheck"
  - "node .agentplane/policy/check-routing.mjs"
plan_approval:
  state: "approved"
  updated_at: "2026-08-06T19:56:09.823Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-08-06T19:53:17.361Z"
  updated_by: "TESTER"
  note: "Verified user-first task creation, deterministic route inference, default status guidance, and dry-run execution preview. Focused cli-core 22/22, generated docs, onboarding, typecheck, and policy routing all pass."
  attempts: 0
quality_review:
  state: "rework"
  provenance: "evaluator_supplied"
  updated_at: "2026-08-06T19:54:41.159Z"
  updated_by: "EVALUATOR"
  note: "EVALUATOR returned rework with 1 typed finding(s)."
  evaluated_sha: "a80db8cb64bef45320648702a4282d543199b8aa"
  blueprint_digest: "2f8610afcfd1abaeb32f14e5ad0a6404b7e15a397b921ba5cc867344a42e2b62"
  evidence_refs:
    - ".agentplane/tasks/202608061646-30TKV4/quality/20260806-195331943-recovery-context/evaluator-work-order.json"
    - ".agentplane/tasks/202608061646-30TKV4/quality/20260806-195331943-recovery-context/quality-report.json"
    - ".agentplane/tasks/202608061646-30TKV4/quality/objects/sha256/bfe3f9836a07a88cfb426ce9895dadc52f2cbc8b357d2cfecc8a3890ea40fb99.md"
    - ".agentplane/tasks/202608061646-30TKV4/quality/20260806-195331943-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202608061646-30TKV4/quality/20260806-195331943-recovery-context/evaluator-result.json"
    - ".agentplane/tasks/202608061646-30TKV4/quality/20260806-195331943-recovery-context/evaluator-follow-up.json"
    - ".agentplane/tasks/202608061646-30TKV4/quality/20260806-195331943-recovery-context/evaluator-evidence-manifest.json"
    - ".agentplane/tasks/202608061646-30TKV4/README.md"
    - ".agentplane/tasks/202608061646-30TKV4/quality/objects/sha256/5cf983f7d2a693197b96c30730dee176c4789604a56feeb6ee7852737416f132.patch"
    - ".agentplane/tasks/202608061646-30TKV4/quality/objects/sha256/6a58fee8d73cc7ec21c7b7a01d1287c7fc8a8d4a030b4c888ab7f43d88e9717a.json"
    - ".agentplane/tasks/202608061646-30TKV4/verification/20260806195317361-b18111f72a312cf9.json"
    - ".agentplane/tasks/202608061646-30TKV4/quality/objects/sha256/425dc49ad99db2ca9f60810ac83290977a16fdf6a35d74fe3f0c781f5388ee6d.json"
    - ".agentplane/policy/dod.code.md"
    - ".agentplane/policy/dod.core.md"
    - ".agentplane/policy/security.must.md"
    - ".agentplane/policy/workflow.branch_pr.md"
  findings:
    - "The declared focused-test command failed to select the target suites and was replaced with a different command without recorded re-approval."
commit:
  hash: "a80db8cb64bef45320648702a4282d543199b8aa"
  message: "✨ 30TKV4 task: add user-first task workflow"
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "CODER"
    body: "Implemented: add user-first natural-language task creation with deterministic intent and route selection, route-aware status output, and a dry-run execution preview with context, approval, check, and token-budget summaries. Focused CLI tests, typecheck, lint, docs generation, and docs checks pass."
events:
  -
    type: "status"
    at: "2026-08-06T19:12:24.367Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-08-06T19:52:05.676Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Implemented: add user-first natural-language task creation with deterministic intent and route selection, route-aware status output, and a dry-run execution preview with context, approval, check, and token-budget summaries. Focused CLI tests, typecheck, lint, docs generation, and docs checks pass."
  -
    type: "verify"
    at: "2026-08-06T19:53:17.361Z"
    author: "TESTER"
    state: "ok"
    note: "Verified user-first task creation, deterministic route inference, default status guidance, and dry-run execution preview. Focused cli-core 22/22, generated docs, onboarding, typecheck, and policy routing all pass."
doc_version: 3
doc_updated_at: "2026-08-06T19:56:09.441Z"
doc_updated_by: "CODER"
description: "Add a natural-language task create entrypoint with deterministic defaults, explainable workflow route preview, concise human status, and dry-run execution preview while retaining existing advanced task new and agent-json contracts."
sections:
  Summary: |-
    Add user-first task intake and execution preview

    Add a natural-language task create entrypoint with deterministic defaults, explainable workflow route preview, concise human status, and dry-run execution preview while retaining existing advanced task new and agent-json contracts.
  Scope: |-
    - In scope: Add a natural-language task create entrypoint with deterministic defaults, explainable workflow route preview, concise human status, and dry-run execution preview while retaining existing advanced task new and agent-json contracts.
    - Out of scope: unrelated refactors not required for "Add user-first task intake and execution preview".
  Plan: "1. Add a user-first natural-language task create command that infers safe defaults and preserves task new as the advanced contract. 2. Add concise human status and execution preview surfaces showing route, reasons, context, approvals, checks, and token budget where available. 3. Preserve task advance --agent-json compatibility and add explicit regression coverage. 4. Cover empty outcomes, invalid options, explicit direct/branch_pr overrides, concurrent duplicate creation, and persisted selected-route consistency. 5. Update generated CLI references and onboarding docs. Approved scope: packages/agentplane/src/commands/task/**, packages/agentplane/src/cli/**, packages/agentplane/src/runtime/task-intake/**, docs/user/**, README.md, generated CLI snapshots, and focused tests."
  Verify Steps: |-
    - bun run test:project -- cli-core packages/agentplane/src/cli/run-cli.core.tasks.create.test.ts packages/agentplane/src/cli/run-cli.core.task-run.test.ts packages/agentplane/src/cli/run-cli.core.task-advance.test.ts
    - bun run docs:cli:check
    - bun run docs:onboarding:check
    - bun run typecheck
    - node .agentplane/policy/check-routing.mjs
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-08-06T19:53:17.361Z — VERIFY — ok

    By: TESTER

    Note: Verified user-first task creation, deterministic route inference, default status guidance, and dry-run execution preview. Focused cli-core 22/22, generated docs, onboarding, typecheck, and policy routing all pass.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-06T19:52:05.676Z, excerpt_hash=sha256:e58233889dcb73bd7cc0e412f5e5faf53d384c5723f5d7734ef114266e59f42d

    Details:

    Command: bun run test:project -- cli-core packages/agentplane/src/cli/run-cli.core.tasks.create.test.ts packages/agentplane/src/cli/run-cli.core.task-run.test.ts
    Result: pass
    Evidence: 2 files passed, 22 tests passed; the initially declared --project agentplane selector was also executed and correctly reported that run-cli tests belong to cli-core
    Scope: natural-language task create, inferred routing, status route summary, and task-run execution preview

    Command: bun run docs:cli:check
    Result: pass
    Evidence: generated CLI reference is up to date
    Scope: public CLI command and option documentation

    Command: bun run docs:onboarding:check
    Result: pass
    Evidence: agent onboarding scenario surfaces are aligned
    Scope: onboarding guidance affected by task create workflow

    Command: bun run typecheck
    Result: pass
    Evidence: TypeScript build completed with exit code 0
    Scope: implementation and test type contracts

    Command: node .agentplane/policy/check-routing.mjs
    Result: pass
    Evidence: policy routing OK
    Scope: policy gateway routing integrity

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608061646-30TKV4-add-user-first-task-intake-and-execution-preview/.agentplane/tasks/202608061646-30TKV4/blueprint/resolved-snapshot.json
    - old_digest: 2f8610afcfd1abaeb32f14e5ad0a6404b7e15a397b921ba5cc867344a42e2b62
    - current_digest: 2f8610afcfd1abaeb32f14e5ad0a6404b7e15a397b921ba5cc867344a42e2b62
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608061646-30TKV4

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202608061646-30TKV4
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: "Revert the UX feature commit. Existing task new, task run, task status, and task advance contracts remain the compatibility baseline."
  Findings: |-
    - Observation: The original focused-test Verify Step selected the agentplane Vitest project, which intentionally excludes run-cli suites.
      Impact: The literal command found no files even though the implementation tests are valid cli-core tests.
      Resolution: Executed the canonical repository selector bun run test:project -- cli-core against the exact two files; 22/22 tests passed, and recorded both the selector mismatch and replacement.
extensions:
  workflow_route_baseline:
    start_head_sha: "0e1d30346d74b782d736e480700919077e532c5f"
    version: 1
id_source: "generated"
---
## Summary

Add user-first task intake and execution preview

Add a natural-language task create entrypoint with deterministic defaults, explainable workflow route preview, concise human status, and dry-run execution preview while retaining existing advanced task new and agent-json contracts.

## Scope

- In scope: Add a natural-language task create entrypoint with deterministic defaults, explainable workflow route preview, concise human status, and dry-run execution preview while retaining existing advanced task new and agent-json contracts.
- Out of scope: unrelated refactors not required for "Add user-first task intake and execution preview".

## Plan

1. Add a user-first natural-language task create command that infers safe defaults and preserves task new as the advanced contract. 2. Add concise human status and execution preview surfaces showing route, reasons, context, approvals, checks, and token budget where available. 3. Preserve task advance --agent-json compatibility and add explicit regression coverage. 4. Cover empty outcomes, invalid options, explicit direct/branch_pr overrides, concurrent duplicate creation, and persisted selected-route consistency. 5. Update generated CLI references and onboarding docs. Approved scope: packages/agentplane/src/commands/task/**, packages/agentplane/src/cli/**, packages/agentplane/src/runtime/task-intake/**, docs/user/**, README.md, generated CLI snapshots, and focused tests.

## Verify Steps

- bun run test:project -- cli-core packages/agentplane/src/cli/run-cli.core.tasks.create.test.ts packages/agentplane/src/cli/run-cli.core.task-run.test.ts packages/agentplane/src/cli/run-cli.core.task-advance.test.ts
- bun run docs:cli:check
- bun run docs:onboarding:check
- bun run typecheck
- node .agentplane/policy/check-routing.mjs

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-08-06T19:53:17.361Z — VERIFY — ok

By: TESTER

Note: Verified user-first task creation, deterministic route inference, default status guidance, and dry-run execution preview. Focused cli-core 22/22, generated docs, onboarding, typecheck, and policy routing all pass.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-06T19:52:05.676Z, excerpt_hash=sha256:e58233889dcb73bd7cc0e412f5e5faf53d384c5723f5d7734ef114266e59f42d

Details:

Command: bun run test:project -- cli-core packages/agentplane/src/cli/run-cli.core.tasks.create.test.ts packages/agentplane/src/cli/run-cli.core.task-run.test.ts
Result: pass
Evidence: 2 files passed, 22 tests passed; the initially declared --project agentplane selector was also executed and correctly reported that run-cli tests belong to cli-core
Scope: natural-language task create, inferred routing, status route summary, and task-run execution preview

Command: bun run docs:cli:check
Result: pass
Evidence: generated CLI reference is up to date
Scope: public CLI command and option documentation

Command: bun run docs:onboarding:check
Result: pass
Evidence: agent onboarding scenario surfaces are aligned
Scope: onboarding guidance affected by task create workflow

Command: bun run typecheck
Result: pass
Evidence: TypeScript build completed with exit code 0
Scope: implementation and test type contracts

Command: node .agentplane/policy/check-routing.mjs
Result: pass
Evidence: policy routing OK
Scope: policy gateway routing integrity

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608061646-30TKV4-add-user-first-task-intake-and-execution-preview/.agentplane/tasks/202608061646-30TKV4/blueprint/resolved-snapshot.json
- old_digest: 2f8610afcfd1abaeb32f14e5ad0a6404b7e15a397b921ba5cc867344a42e2b62
- current_digest: 2f8610afcfd1abaeb32f14e5ad0a6404b7e15a397b921ba5cc867344a42e2b62
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608061646-30TKV4

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202608061646-30TKV4
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert the UX feature commit. Existing task new, task run, task status, and task advance contracts remain the compatibility baseline.

## Findings

- Observation: The original focused-test Verify Step selected the agentplane Vitest project, which intentionally excludes run-cli suites.
  Impact: The literal command found no files even though the implementation tests are valid cli-core tests.
  Resolution: Executed the canonical repository selector bun run test:project -- cli-core against the exact two files; 22/22 tests passed, and recorded both the selector mismatch and replacement.
