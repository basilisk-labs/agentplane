---
id: "202608062021-V2EESE"
title: "Project semantic-only provider prompts and reject process choreography"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 14
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "prompts"
  - "quality"
  - "supervisor"
  - "v0.7.5"
  - "process-mechanism-repair"
task_kind: "code"
mutation_scope: "code"
risk_flags:
  - "merge"
blueprint_request: "code.branch_pr"
verify:
  - "bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/runner/context/base-prompts.test.ts packages/agentplane/src/runner/usecases/task-run-context.integration.test.ts packages/agentplane/src/commands/task/agent-action-packet.test.ts"
  - "bun run test:critical"
  - "bun run typecheck"
  - "node .agentplane/policy/check-routing.mjs"
plan_approval:
  state: "approved"
  updated_at: "2026-08-06T20:22:25.882Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-08-07T04:43:34.465Z"
  updated_by: "TESTER"
  note: "Evaluator rework is resolved: mixed security fragments are preserved and exact provider input rejects every supervisor command family unless explicit repair authority is present."
  attempts: 0
quality_review:
  state: "rework"
  provenance: "evaluator_supplied"
  updated_at: "2026-08-07T04:45:10.198Z"
  updated_by: "EVALUATOR"
  note: "EVALUATOR returned rework with 1 typed finding(s)."
  evaluated_sha: "e265524d4429d647ef4f08e5cece772ac4cbf35a"
  blueprint_digest: "ff4c844aa3dec226dca8ceeda23e9a8300e0cf77bdeeafc0e9e8f9714994ed26"
  evidence_refs:
    - ".agentplane/tasks/202608062021-V2EESE/quality/20260807-044359838-recovery-context/evaluator-work-order.json"
    - ".agentplane/tasks/202608062021-V2EESE/quality/20260807-044359838-recovery-context/quality-report.json"
    - ".agentplane/tasks/202608062021-V2EESE/quality/objects/sha256/6389435d51dc282ad7d4044775c8e9c2ab5d5f97049b1157bb67a7bb072d8a8e.md"
    - ".agentplane/tasks/202608062021-V2EESE/quality/20260807-044359838-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202608062021-V2EESE/quality/20260807-044359838-recovery-context/evaluator-result.json"
    - ".agentplane/tasks/202608062021-V2EESE/quality/20260807-044359838-recovery-context/evaluator-follow-up.json"
    - ".agentplane/tasks/202608062021-V2EESE/quality/20260807-044359838-recovery-context/evaluator-evidence-manifest.json"
    - ".agentplane/tasks/202608062021-V2EESE/README.md"
    - ".agentplane/tasks/202608062021-V2EESE/quality/objects/sha256/95d8ad739385442fe8b741d140c1a7768db0305da3b54d43c56782c79fb99dad.patch"
    - ".agentplane/tasks/202608062021-V2EESE/quality/objects/sha256/735aae2b19834d975c6f0ce5847bf6d001cae92e419b1f75ae3fc7b29063a019.json"
    - ".agentplane/tasks/202608062021-V2EESE/verification/20260807044334465-b6a89b57419e958c.json"
    - ".agentplane/tasks/202608062021-V2EESE/quality/objects/sha256/95733d97fca351adc4547b7181a057ce60fc567aeb7afbf37c59f69aa9b36417.json"
    - ".agentplane/policy/dod.code.md"
    - ".agentplane/policy/dod.core.md"
    - ".agentplane/policy/security.must.md"
    - ".agentplane/policy/workflow.branch_pr.md"
  findings:
    - "The exact-provider-input guard still permits Git and release/cleanup choreography outside repair-authorized episodes because its command-family patterns enumerate only selected subcommands."
execution_route:
  frozen: true
  reason_codes:
    - "repository_branch_pr_floor"
  repository_mode: "branch_pr"
  requested_mode: "auto"
  schema_version: 1
  selected_mode: "branch_pr"
commit: null
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "CODER"
    body: "Implementation: semantic-only provider prompt projection and exact process-choreography gate."
events:
  -
    type: "status"
    at: "2026-08-06T21:10:33.947Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-08-06T21:32:28.349Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Implementation: semantic-only provider prompt projection and exact process-choreography gate."
  -
    type: "verify"
    at: "2026-08-06T21:32:55.493Z"
    author: "TESTER"
    state: "needs_rework"
    note: "Targeted semantic prompt, context, supervisor, and state-fingerprint checks pass; full test:critical remains blocked by the pre-existing compatibility ratchet drift on current main pending foundational PR BZT3D9."
  -
    type: "verify"
    at: "2026-08-07T04:29:43.950Z"
    author: "TESTER"
    state: "ok"
    note: "Semantic-only provider prompt projection and exact-input choreography guard pass the declared contract."
  -
    type: "verify"
    at: "2026-08-07T04:43:34.465Z"
    author: "TESTER"
    state: "ok"
    note: "Evaluator rework is resolved: mixed security fragments are preserved and exact provider input rejects every supervisor command family unless explicit repair authority is present."
doc_version: 3
doc_updated_at: "2026-08-07T04:43:35.810Z"
doc_updated_by: "CODER"
description: "Compile a phase-aware policy gateway for PLANNER, EXECUTOR, and EVALUATOR semantic episodes so provider input contains only purpose, scope, security, user instructions, semantic objective, authority, writable roots, required inputs, output schema, and stop rules; exclude lifecycle, Git, PR, verification persistence, integration, cleanup, and release procedures, and add qualification against the exact compiled provider prompt."
sections:
  Summary: |-
    Project semantic-only provider prompts and reject process choreography

    Compile a phase-aware policy gateway for PLANNER, EXECUTOR, and EVALUATOR semantic episodes so provider input contains only purpose, scope, security, user instructions, semantic objective, authority, writable roots, required inputs, output schema, and stop rules; exclude lifecycle, Git, PR, verification persistence, integration, cleanup, and release procedures, and add qualification against the exact compiled provider prompt.
  Scope: |-
    - In scope: Compile a phase-aware policy gateway for PLANNER, EXECUTOR, and EVALUATOR semantic episodes so provider input contains only purpose, scope, security, user instructions, semantic objective, authority, writable roots, required inputs, output schema, and stop rules; exclude lifecycle, Git, PR, verification persistence, integration, cleanup, and release procedures, and add qualification against the exact compiled provider prompt.
    - Out of scope: unrelated refactors not required for "Project semantic-only provider prompts and reject process choreography".
  Plan: "1. Add a structured semantic-episode projection for policy gateway fragments instead of regex-based section removal. 2. Include only project purpose, scope and security boundaries, user instructions, semantic role constraints, approved objective, authority, writable roots, required inputs, output schema, and stop rules for PLANNER, EXECUTOR, and EVALUATOR provider calls. 3. Keep the full gateway available to operator and recovery surfaces while preventing normal semantic prompts from receiving startup, route, Git, PR, verification persistence, integration, cleanup, or release choreography. 4. Capture the exact compiled provider input and fail qualification when forbidden lifecycle commands appear outside an explicitly lifecycle-repair episode. 5. Verify parity, bounded context, and no regression in runner recovery or critical contracts."
  Verify Steps: |-
    - bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/runner/context/base-prompts.test.ts packages/agentplane/src/runner/usecases/task-run-context.integration.test.ts packages/agentplane/src/commands/task/agent-action-packet.test.ts
    - bun run test:critical
    - bun run typecheck
    - node .agentplane/policy/check-routing.mjs
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-08-06T21:32:55.493Z — VERIFY — needs_rework

    By: TESTER

    Note: Targeted semantic prompt, context, supervisor, and state-fingerprint checks pass; full test:critical remains blocked by the pre-existing compatibility ratchet drift on current main pending foundational PR BZT3D9.
    Attempts: 1

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-06T21:32:28.349Z, excerpt_hash=sha256:43c07e69b4c42fd71bc8a90bc82544ba98c2854de2a76d4b854de6190b710d98

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608062021-V2EESE-project-semantic-only-provider-prompts-and-rejec/.agentplane/tasks/202608062021-V2EESE/blueprint/resolved-snapshot.json
    - old_digest: 1c1d94c37ff9878ab6fb6e28b8b4c63748c940cecc376d0b37495b7d1dd57fd1
    - current_digest: 1c1d94c37ff9878ab6fb6e28b8b4c63748c940cecc376d0b37495b7d1dd57fd1
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608062021-V2EESE

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202608062021-V2EESE
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    ### 2026-08-07T04:29:43.950Z — VERIFY — ok

    By: TESTER

    Note: Semantic-only provider prompt projection and exact-input choreography guard pass the declared contract.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-06T21:32:56.328Z, excerpt_hash=sha256:43c07e69b4c42fd71bc8a90bc82544ba98c2854de2a76d4b854de6190b710d98

    Details:

    Command: bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/runner/context/base-prompts.test.ts packages/agentplane/src/runner/usecases/task-run-context.integration.test.ts packages/agentplane/src/commands/task/agent-action-packet.test.ts
    Result: pass
    Evidence: 3 files, 33 tests passed.
    Scope: semantic projection, exact provider prompt rejection, task-run context.

    Command: bun run test:critical
    Result: pass
    Evidence: 12 of 12 critical-cli chunks passed.
    Scope: critical CLI, efficiency, replay, trust-boundary and platform contracts.

    Command: bun run typecheck
    Result: pass
    Evidence: TypeScript build exited 0.
    Scope: workspace type safety.

    Command: node .agentplane/policy/check-routing.mjs
    Result: pass
    Evidence: policy routing OK.
    Scope: policy gateway graph.

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608062021-V2EESE-project-semantic-only-provider-prompts-and-rejec/.agentplane/tasks/202608062021-V2EESE/blueprint/resolved-snapshot.json
    - old_digest: 1c1d94c37ff9878ab6fb6e28b8b4c63748c940cecc376d0b37495b7d1dd57fd1
    - current_digest: 1c1d94c37ff9878ab6fb6e28b8b4c63748c940cecc376d0b37495b7d1dd57fd1
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608062021-V2EESE

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

    ### 2026-08-07T04:43:34.465Z — VERIFY — ok

    By: TESTER

    Note: Evaluator rework is resolved: mixed security fragments are preserved and exact provider input rejects every supervisor command family unless explicit repair authority is present.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-07T04:29:44.810Z, excerpt_hash=sha256:43c07e69b4c42fd71bc8a90bc82544ba98c2854de2a76d4b854de6190b710d98

    Details:

    Command: bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/runner/context/base-prompts.test.ts packages/agentplane/src/runner/usecases/task-run-context.integration.test.ts packages/agentplane/src/commands/task/agent-action-packet.test.ts
    Result: pass
    Evidence: 3 files, 60 tests passed after rework and formatting.
    Scope: structured projection, exact provider input, explicit repair authority, phase-tool exception.

    Command: bun run test:critical
    Result: pass
    Evidence: 12 of 12 critical-cli chunks passed after evaluator rework.
    Scope: critical CLI, efficiency, replay and trust boundaries.

    Command: bun run lint:core
    Result: pass
    Evidence: ESLint exited 0.
    Scope: packages and scripts.

    Command: bun run typecheck
    Result: pass
    Evidence: TypeScript build exited 0.
    Scope: workspace type safety.

    Command: bun run format:check
    Result: pass
    Evidence: all matched files use Prettier code style.
    Scope: repository formatting.

    Command: node .agentplane/policy/check-routing.mjs
    Result: pass
    Evidence: policy routing OK.
    Scope: policy gateway graph.

    BlueprintSnapshotRef:
    - state: stale
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608062021-V2EESE-project-semantic-only-provider-prompts-and-rejec/.agentplane/tasks/202608062021-V2EESE/blueprint/resolved-snapshot.json
    - old_digest: 1c1d94c37ff9878ab6fb6e28b8b4c63748c940cecc376d0b37495b7d1dd57fd1
    - current_digest: ff4c844aa3dec226dca8ceeda23e9a8300e0cf77bdeeafc0e9e8f9714994ed26
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608062021-V2EESE

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202608062021-V2EESE
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
    - Observation: The compatibility baseline test reports current main candidate drift before task-specific verification can complete.
      Impact: The semantic projection implementation is locally validated, but the mandatory cumulative critical gate cannot yet be recorded as passing.
      Resolution: Integrate BZT3D9, rebase this branch, rerun all declared Verify Steps, then record a fresh verification result.
extensions:
  workflow_route_baseline:
    start_head_sha: "0e1d30346d74b782d736e480700919077e532c5f"
    version: 1
id_source: "generated"
---
## Summary

Project semantic-only provider prompts and reject process choreography

Compile a phase-aware policy gateway for PLANNER, EXECUTOR, and EVALUATOR semantic episodes so provider input contains only purpose, scope, security, user instructions, semantic objective, authority, writable roots, required inputs, output schema, and stop rules; exclude lifecycle, Git, PR, verification persistence, integration, cleanup, and release procedures, and add qualification against the exact compiled provider prompt.

## Scope

- In scope: Compile a phase-aware policy gateway for PLANNER, EXECUTOR, and EVALUATOR semantic episodes so provider input contains only purpose, scope, security, user instructions, semantic objective, authority, writable roots, required inputs, output schema, and stop rules; exclude lifecycle, Git, PR, verification persistence, integration, cleanup, and release procedures, and add qualification against the exact compiled provider prompt.
- Out of scope: unrelated refactors not required for "Project semantic-only provider prompts and reject process choreography".

## Plan

1. Add a structured semantic-episode projection for policy gateway fragments instead of regex-based section removal. 2. Include only project purpose, scope and security boundaries, user instructions, semantic role constraints, approved objective, authority, writable roots, required inputs, output schema, and stop rules for PLANNER, EXECUTOR, and EVALUATOR provider calls. 3. Keep the full gateway available to operator and recovery surfaces while preventing normal semantic prompts from receiving startup, route, Git, PR, verification persistence, integration, cleanup, or release choreography. 4. Capture the exact compiled provider input and fail qualification when forbidden lifecycle commands appear outside an explicitly lifecycle-repair episode. 5. Verify parity, bounded context, and no regression in runner recovery or critical contracts.

## Verify Steps

- bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/runner/context/base-prompts.test.ts packages/agentplane/src/runner/usecases/task-run-context.integration.test.ts packages/agentplane/src/commands/task/agent-action-packet.test.ts
- bun run test:critical
- bun run typecheck
- node .agentplane/policy/check-routing.mjs

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-08-06T21:32:55.493Z — VERIFY — needs_rework

By: TESTER

Note: Targeted semantic prompt, context, supervisor, and state-fingerprint checks pass; full test:critical remains blocked by the pre-existing compatibility ratchet drift on current main pending foundational PR BZT3D9.
Attempts: 1

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-06T21:32:28.349Z, excerpt_hash=sha256:43c07e69b4c42fd71bc8a90bc82544ba98c2854de2a76d4b854de6190b710d98

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608062021-V2EESE-project-semantic-only-provider-prompts-and-rejec/.agentplane/tasks/202608062021-V2EESE/blueprint/resolved-snapshot.json
- old_digest: 1c1d94c37ff9878ab6fb6e28b8b4c63748c940cecc376d0b37495b7d1dd57fd1
- current_digest: 1c1d94c37ff9878ab6fb6e28b8b4c63748c940cecc376d0b37495b7d1dd57fd1
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608062021-V2EESE

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202608062021-V2EESE
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

### 2026-08-07T04:29:43.950Z — VERIFY — ok

By: TESTER

Note: Semantic-only provider prompt projection and exact-input choreography guard pass the declared contract.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-06T21:32:56.328Z, excerpt_hash=sha256:43c07e69b4c42fd71bc8a90bc82544ba98c2854de2a76d4b854de6190b710d98

Details:

Command: bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/runner/context/base-prompts.test.ts packages/agentplane/src/runner/usecases/task-run-context.integration.test.ts packages/agentplane/src/commands/task/agent-action-packet.test.ts
Result: pass
Evidence: 3 files, 33 tests passed.
Scope: semantic projection, exact provider prompt rejection, task-run context.

Command: bun run test:critical
Result: pass
Evidence: 12 of 12 critical-cli chunks passed.
Scope: critical CLI, efficiency, replay, trust-boundary and platform contracts.

Command: bun run typecheck
Result: pass
Evidence: TypeScript build exited 0.
Scope: workspace type safety.

Command: node .agentplane/policy/check-routing.mjs
Result: pass
Evidence: policy routing OK.
Scope: policy gateway graph.

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608062021-V2EESE-project-semantic-only-provider-prompts-and-rejec/.agentplane/tasks/202608062021-V2EESE/blueprint/resolved-snapshot.json
- old_digest: 1c1d94c37ff9878ab6fb6e28b8b4c63748c940cecc376d0b37495b7d1dd57fd1
- current_digest: 1c1d94c37ff9878ab6fb6e28b8b4c63748c940cecc376d0b37495b7d1dd57fd1
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608062021-V2EESE

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

### 2026-08-07T04:43:34.465Z — VERIFY — ok

By: TESTER

Note: Evaluator rework is resolved: mixed security fragments are preserved and exact provider input rejects every supervisor command family unless explicit repair authority is present.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-07T04:29:44.810Z, excerpt_hash=sha256:43c07e69b4c42fd71bc8a90bc82544ba98c2854de2a76d4b854de6190b710d98

Details:

Command: bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/runner/context/base-prompts.test.ts packages/agentplane/src/runner/usecases/task-run-context.integration.test.ts packages/agentplane/src/commands/task/agent-action-packet.test.ts
Result: pass
Evidence: 3 files, 60 tests passed after rework and formatting.
Scope: structured projection, exact provider input, explicit repair authority, phase-tool exception.

Command: bun run test:critical
Result: pass
Evidence: 12 of 12 critical-cli chunks passed after evaluator rework.
Scope: critical CLI, efficiency, replay and trust boundaries.

Command: bun run lint:core
Result: pass
Evidence: ESLint exited 0.
Scope: packages and scripts.

Command: bun run typecheck
Result: pass
Evidence: TypeScript build exited 0.
Scope: workspace type safety.

Command: bun run format:check
Result: pass
Evidence: all matched files use Prettier code style.
Scope: repository formatting.

Command: node .agentplane/policy/check-routing.mjs
Result: pass
Evidence: policy routing OK.
Scope: policy gateway graph.

BlueprintSnapshotRef:
- state: stale
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608062021-V2EESE-project-semantic-only-provider-prompts-and-rejec/.agentplane/tasks/202608062021-V2EESE/blueprint/resolved-snapshot.json
- old_digest: 1c1d94c37ff9878ab6fb6e28b8b4c63748c940cecc376d0b37495b7d1dd57fd1
- current_digest: ff4c844aa3dec226dca8ceeda23e9a8300e0cf77bdeeafc0e9e8f9714994ed26
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608062021-V2EESE

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202608062021-V2EESE
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

- Observation: The compatibility baseline test reports current main candidate drift before task-specific verification can complete.
  Impact: The semantic projection implementation is locally validated, but the mandatory cumulative critical gate cannot yet be recorded as passing.
  Resolution: Integrate BZT3D9, rebase this branch, rerun all declared Verify Steps, then record a fresh verification result.
