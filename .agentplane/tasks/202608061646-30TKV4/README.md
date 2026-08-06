---
id: "202608061646-30TKV4"
title: "Add user-first task intake and execution preview"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 17
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
  updated_at: "2026-08-06T20:02:09.449Z"
  updated_by: "TESTER"
  note: "Verified the re-approved user-first task contract: cli-core 37/37 covers route inference and overrides, invalid inputs, simultaneous duplicate creation, persisted route consistency, dry-run preview, and task advance --agent-json compatibility; docs, onboarding, types, and routing also pass."
  attempts: 0
quality_review:
  state: "pass"
  provenance: "evaluator_supplied"
  updated_at: "2026-08-06T20:06:54.540Z"
  updated_by: "EVALUATOR"
  note: "EVALUATOR returned pass with 1 typed finding(s)."
  evaluated_sha: "dbb7a18e2f1a190d27cf5a10944d4add569d2795"
  blueprint_digest: "2f8610afcfd1abaeb32f14e5ad0a6404b7e15a397b921ba5cc867344a42e2b62"
  evidence_refs:
    - ".agentplane/tasks/202608061646-30TKV4/quality/20260806-200556945-recovery-context/evaluator-work-order.json"
    - ".agentplane/tasks/202608061646-30TKV4/quality/20260806-200556945-recovery-context/quality-report.json"
    - ".agentplane/tasks/202608061646-30TKV4/quality/objects/sha256/be5bf17957e5fcc62ce6ab515862696169490e862ea5f5db6c659c46a024c2f9.md"
    - ".agentplane/tasks/202608061646-30TKV4/quality/20260806-200556945-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202608061646-30TKV4/quality/20260806-200556945-recovery-context/evaluator-result.json"
    - ".agentplane/tasks/202608061646-30TKV4/quality/20260806-200556945-recovery-context/evaluator-evidence-manifest.json"
    - ".agentplane/tasks/202608061646-30TKV4/README.md"
    - ".agentplane/tasks/202608061646-30TKV4/quality/objects/sha256/bf10581d752fc3621d83fb64097f6c8dc524659f1968fb0a20b5c8a6df501f38.patch"
    - ".agentplane/tasks/202608061646-30TKV4/quality/objects/sha256/10da21d3dee9e373ba52d43aaf8e7662593dd31a6302ae4ad8add25fcf455349.json"
    - ".agentplane/tasks/202608061646-30TKV4/verification/20260806200209449-a03aef059064a503.json"
    - ".agentplane/tasks/202608061646-30TKV4/quality/objects/sha256/425dc49ad99db2ca9f60810ac83290977a16fdf6a35d74fe3f0c781f5388ee6d.json"
    - ".agentplane/policy/dod.code.md"
    - ".agentplane/policy/dod.core.md"
    - ".agentplane/policy/security.must.md"
    - ".agentplane/policy/workflow.branch_pr.md"
  findings:
    - "No findings."
commit:
  hash: "dbb7a18e2f1a190d27cf5a10944d4add569d2795"
  message: "🧪 30TKV4 task: harden user-first task intake"
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "CODER"
    body: "Implemented: add user-first natural-language task creation with deterministic intent and route selection, route-aware status output, and a dry-run execution preview with context, approval, check, and token-budget summaries. Focused CLI tests, typecheck, lint, docs generation, and docs checks pass."
  -
    author: "CODER"
    body: "Implemented evaluator rework: corrected and re-approved the cli-core Verify Step, serialized task creation across processes, added concurrent duplicate protection with persisted route evidence, covered empty/invalid intake and explicit route overrides, and exercised the task advance --agent-json handoff. Declared focused tests 37/37 and all static/docs checks pass."
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
  -
    type: "status"
    at: "2026-08-06T20:01:18.245Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Implemented evaluator rework: corrected and re-approved the cli-core Verify Step, serialized task creation across processes, added concurrent duplicate protection with persisted route evidence, covered empty/invalid intake and explicit route overrides, and exercised the task advance --agent-json handoff. Declared focused tests 37/37 and all static/docs checks pass."
  -
    type: "verify"
    at: "2026-08-06T20:02:09.449Z"
    author: "TESTER"
    state: "ok"
    note: "Verified the re-approved user-first task contract: cli-core 37/37 covers route inference and overrides, invalid inputs, simultaneous duplicate creation, persisted route consistency, dry-run preview, and task advance --agent-json compatibility; docs, onboarding, types, and routing also pass."
doc_version: 3
doc_updated_at: "2026-08-06T20:02:10.497Z"
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

    ### 2026-08-06T20:02:09.449Z — VERIFY — ok

    By: TESTER

    Note: Verified the re-approved user-first task contract: cli-core 37/37 covers route inference and overrides, invalid inputs, simultaneous duplicate creation, persisted route consistency, dry-run preview, and task advance --agent-json compatibility; docs, onboarding, types, and routing also pass.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-06T20:01:18.245Z, excerpt_hash=sha256:1e3e36afade323c09657b8fd8b642e24388663392d4ee528edb44f7db34b8c89

    Details:

    Command: bun run test:project -- cli-core packages/agentplane/src/cli/run-cli.core.tasks.create.test.ts packages/agentplane/src/cli/run-cli.core.task-run.test.ts packages/agentplane/src/cli/run-cli.core.task-advance.test.ts
    Result: pass
    Evidence: 3 files passed, 37 tests passed; includes empty and invalid intake, explicit route overrides, simultaneous exact duplicates, persisted route consistency, and task advance --agent-json compatibility
    Scope: complete user-first task intake, preview, duplicate coordination, and compact agent handoff contract

    Command: bun run docs:cli:check
    Result: pass
    Evidence: generated CLI reference is up to date
    Scope: public CLI command and option documentation

    Command: bun run docs:onboarding:check
    Result: pass
    Evidence: agent onboarding scenario surfaces are aligned
    Scope: onboarding guidance affected by the task create workflow

    Command: bun run typecheck
    Result: pass
    Evidence: TypeScript build completed with exit code 0
    Scope: implementation, lock coordination, and test type contracts

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

### 2026-08-06T20:02:09.449Z — VERIFY — ok

By: TESTER

Note: Verified the re-approved user-first task contract: cli-core 37/37 covers route inference and overrides, invalid inputs, simultaneous duplicate creation, persisted route consistency, dry-run preview, and task advance --agent-json compatibility; docs, onboarding, types, and routing also pass.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-06T20:01:18.245Z, excerpt_hash=sha256:1e3e36afade323c09657b8fd8b642e24388663392d4ee528edb44f7db34b8c89

Details:

Command: bun run test:project -- cli-core packages/agentplane/src/cli/run-cli.core.tasks.create.test.ts packages/agentplane/src/cli/run-cli.core.task-run.test.ts packages/agentplane/src/cli/run-cli.core.task-advance.test.ts
Result: pass
Evidence: 3 files passed, 37 tests passed; includes empty and invalid intake, explicit route overrides, simultaneous exact duplicates, persisted route consistency, and task advance --agent-json compatibility
Scope: complete user-first task intake, preview, duplicate coordination, and compact agent handoff contract

Command: bun run docs:cli:check
Result: pass
Evidence: generated CLI reference is up to date
Scope: public CLI command and option documentation

Command: bun run docs:onboarding:check
Result: pass
Evidence: agent onboarding scenario surfaces are aligned
Scope: onboarding guidance affected by the task create workflow

Command: bun run typecheck
Result: pass
Evidence: TypeScript build completed with exit code 0
Scope: implementation, lock coordination, and test type contracts

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
