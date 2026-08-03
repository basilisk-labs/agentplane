---
id: "202608021231-BPMM04"
title: "Record token usage on every completed task"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 11
origin:
  system: "manual"
depends_on: []
tags:
  - "tokens"
  - "v0.7.1"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "code.branch_pr"
verify:
  - "bun run test:critical"
  - "bun run typecheck"
plan_approval:
  state: "approved"
  updated_at: "2026-08-03T11:03:07.108Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-08-03T11:44:13.577Z"
  updated_by: "TESTER"
  note: "Verified EVALUATOR rework at exact SHA e92e7b4b1ea4fe9cca60d2ebb5a305f3e65fba42: every reconciliation completion path now projects authoritative supervisor token usage and preserves stable replay."
  attempts: 0
quality_review:
  state: "rework"
  provenance: "evaluator_supplied"
  updated_at: "2026-08-03T11:45:31.314Z"
  updated_by: "EVALUATOR"
  note: "EVALUATOR returned rework with 1 typed finding(s)."
  evaluated_sha: "e92e7b4b1ea4fe9cca60d2ebb5a305f3e65fba42"
  blueprint_digest: "d2470dfd273c68b5608d8dad367c27ea191d7026086c22031b520352a14c4183"
  evidence_refs:
    - ".agentplane/tasks/202608021231-BPMM04/quality/20260803-114427080-recovery-context/evaluator-work-order.json"
    - ".agentplane/tasks/202608021231-BPMM04/quality/20260803-114427080-recovery-context/quality-report.json"
    - ".agentplane/tasks/202608021231-BPMM04/quality/20260803-114427080-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202608021231-BPMM04/quality/20260803-114427080-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202608021231-BPMM04/quality/20260803-114427080-recovery-context/evaluator-result.json"
    - ".agentplane/tasks/202608021231-BPMM04/quality/20260803-114427080-recovery-context/evaluator-follow-up.json"
    - ".agentplane/tasks/202608021231-BPMM04/README.md"
    - ".agentplane/tasks/202608021231-BPMM04/quality/20260803-114427080-recovery-context/evaluator-diff.patch"
    - ".agentplane/tasks/202608021231-BPMM04/quality/20260803-114427080-recovery-context/evaluator-observed-checks.json"
    - ".agentplane/tasks/202608021231-BPMM04/verification/20260803114413577-18da78feb6a5f42d.json"
    - ".agentplane/tasks/202608021231-BPMM04/quality/20260803-114427080-recovery-context/evaluator-blueprint.json"
    - ".agentplane/policy/dod.code.md"
    - ".agentplane/policy/dod.core.md"
    - ".agentplane/policy/security.must.md"
    - ".agentplane/policy/workflow.branch_pr.md"
  findings:
    - "A completed task can be marked with fully observed token usage even when output/reasoning breakdown telemetry was absent from one or more agent runs."
commit:
  hash: "613cd8095f4cebf234dafaa8348f87f173495d9e"
  message: "🪙 BPMM04 task: record completed-task token usage"
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "CODER"
    body: "Implementation committed: first-class completed-task token usage projected from Agentplane-owned supervisor telemetry, including exact, partial, and unavailable states; task, brief, export, hosted-close, and ACR surfaces are covered."
events:
  -
    type: "status"
    at: "2026-08-03T11:03:33.709Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-08-03T11:30:38.785Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: first-class completed-task token usage projected from Agentplane-owned supervisor telemetry, including exact, partial, and unavailable states; task, brief, export, hosted-close, and ACR surfaces are covered."
  -
    type: "verify"
    at: "2026-08-03T11:31:13.630Z"
    author: "TESTER"
    state: "ok"
    note: "Verified implementation commit 613cd8095f4cebf234dafaa8348f87f173495d9e. Focused token-accounting, schema, export, brief, finish, hosted-close, ACR, provider, supervisor, and idempotency coverage passed (169 focused assertions across the recorded groups). bun run typecheck, bun run lint:core, bun run knip:check (539 baseline), node .agentplane/policy/check-routing.mjs, bun run ci:contract, and bun run test:critical all passed. Exact RF04 replay remained 50/50 with 70/70 outcomes, 27/27 token cells, and 170/170 scalar cells."
  -
    type: "verify"
    at: "2026-08-03T11:32:15.385Z"
    author: "TESTER"
    state: "ok"
    note: "Verified exact implementation SHA 613cd8095f4cebf234dafaa8348f87f173495d9e with no candidate-only regression; all canonical gates passed."
  -
    type: "verify"
    at: "2026-08-03T11:44:13.577Z"
    author: "TESTER"
    state: "ok"
    note: "Verified EVALUATOR rework at exact SHA e92e7b4b1ea4fe9cca60d2ebb5a305f3e65fba42: every reconciliation completion path now projects authoritative supervisor token usage and preserves stable replay."
doc_version: 3
doc_updated_at: "2026-08-03T11:44:14.797Z"
doc_updated_by: "CODER"
description: "Persist provider and evaluator token usage through task execution and closeout, expose the aggregate and provenance in completed task JSON and human-readable output, preserve compatibility when usage is unavailable, and add deterministic lifecycle regression coverage."
sections:
  Summary: |-
    Record token usage on every completed task

    Persist provider and evaluator token usage through task execution and closeout, expose the aggregate and provenance in completed task JSON and human-readable output, preserve compatibility when usage is unavailable, and add deterministic lifecycle regression coverage.
  Scope: |-
    - In scope: Persist provider and evaluator token usage through task execution and closeout, expose the aggregate and provenance in completed task JSON and human-readable output, preserve compatibility when usage is unavailable, and add deterministic lifecycle regression coverage.
    - Out of scope: unrelated refactors not required for "Record token usage on every completed task".
  Plan: "1. Trace the canonical supervisor episode journal, provider adapter usage collectors, execution receipts, task projections, ACR generation, and every DONE/finish/hosted-close path to identify the one authoritative token source and all completion surfaces. 2. Define a backward-compatible observed token-usage projection that preserves input, output, reasoning, and total counts when provider evidence exists, marks unavailable or partial usage explicitly, never trusts agent-reported metrics as observed facts, and aggregates executor plus evaluator episodes exactly once. 3. Persist the final aggregate on completed TaskData and render it in task README frontmatter/body, human task status/brief output, machine JSON, and ACR without rewriting historical tasks or fabricating zero usage. 4. Update managed-run, external-advance, direct, branch_pr, rework, recovery, hosted-close, legacy/no-provider, and idempotent-replay fixtures so completion records stable totals and duplicate close/reconcile operations cannot double-count. 5. Add focused schema/projection/closure tests and run v0.7 supervisor, lifecycle, recovery, critical CLI, schema, typecheck, Knip, policy routing, and ci:contract gates; independently verify the exact implementation SHA before integration."
  Verify Steps: |-
    1. Run focused managed-run fixtures with multiple executor and evaluator episodes carrying known Codex provider usage. Expected: the completed task persists exact input, output, reasoning, and total tokens from supervisor-owned evidence; each episode is counted once; README, task status/brief human output, machine JSON, and ACR expose the same aggregate and provenance/completeness state.
    2. Run external-advance, manual/direct, legacy task, adapter-without-usage, malformed-usage, and partial-usage fixtures. Expected: AgentPlane never treats agent-reported metrics as observed provider usage, never fabricates zero for unavailable usage, and preserves an explicit unavailable or partial state without blocking otherwise valid completion.
    3. Run branch_pr rework, retry, stale fingerprint, crash recovery, reconcile, repeated finish, GitHub rebase merge, hosted close, and cleanup fixtures. Expected: token aggregates survive state transitions and task-artifact commits, remain bound to the correct task/run, and cannot be lost or double-counted by replay or idempotent closure.
    4. Validate schema compatibility and historical task reads, then run the v0.7 supervisor, lifecycle, and recovery suites, bun run test:critical, bun run schemas:check, bun run typecheck, bun run lint:core, bun run knip:check, node .agentplane/policy/check-routing.mjs, and bun run ci:contract. Expected: all gates pass without baseline growth, and an independent EVALUATOR accepts the exact implementation SHA.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-08-03T11:31:13.630Z — VERIFY — ok

    By: TESTER

    Note: Verified implementation commit 613cd8095f4cebf234dafaa8348f87f173495d9e. Focused token-accounting, schema, export, brief, finish, hosted-close, ACR, provider, supervisor, and idempotency coverage passed (169 focused assertions across the recorded groups). bun run typecheck, bun run lint:core, bun run knip:check (539 baseline), node .agentplane/policy/check-routing.mjs, bun run ci:contract, and bun run test:critical all passed. Exact RF04 replay remained 50/50 with 70/70 outcomes, 27/27 token cells, and 170/170 scalar cells.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-03T11:30:38.785Z, excerpt_hash=sha256:a756b7e65aa3d1bdeb14f2b9a0e0e7d6005331876560c62eb05924e6e64b130e

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608021231-BPMM04-record-token-usage-on-every-completed-task/.agentplane/tasks/202608021231-BPMM04/blueprint/resolved-snapshot.json
    - old_digest: d2470dfd273c68b5608d8dad367c27ea191d7026086c22031b520352a14c4183
    - current_digest: d2470dfd273c68b5608d8dad367c27ea191d7026086c22031b520352a14c4183
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608021231-BPMM04

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202608021231-BPMM04
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    ### 2026-08-03T11:32:15.385Z — VERIFY — ok

    By: TESTER

    Note: Verified exact implementation SHA 613cd8095f4cebf234dafaa8348f87f173495d9e with no candidate-only regression; all canonical gates passed.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-03T11:31:14.481Z, excerpt_hash=sha256:a756b7e65aa3d1bdeb14f2b9a0e0e7d6005331876560c62eb05924e6e64b130e

    Details:

    Command: focused Vitest groups for token projection, provider transport, supervisor episodes, schema compatibility, task brief/export, finish, hosted-close, ACR, and idempotent completion
    Result: pass
    Evidence: 169 focused assertions passed at implementation SHA 613cd8095f4cebf234dafaa8348f87f173495d9e.
    Scope: Exact, partial, unavailable, legacy, mixed provider telemetry, executor plus evaluator aggregation, replay, reconciliation, and all user-visible task token surfaces.

    Command: bun run typecheck && bun run lint:core && bun run knip:check && node .agentplane/policy/check-routing.mjs
    Result: pass
    Evidence: TypeScript and ESLint exited 0; policy routing passed; Knip baseline remained files=1, exports=175, types=363, total=539.
    Scope: Repository type safety, static hygiene, policy graph, and unused-code ratchet.

    Command: bun run ci:contract
    Result: pass
    Evidence: Full contract exited 0; RF04 replay was 50/50 runs with 70/70 outcomes, 27/27 token cells, and 170/170 scalar cells.
    Scope: Formatting, schemas, examples, docs, compatibility, lifecycle, architecture, clone, Knip, coverage, and deterministic efficiency contract.

    Command: bun run test:critical
    Result: pass
    Evidence: All 12 critical chunks passed.
    Scope: Critical CLI, provider at-most-once, protected-path, scope, symlink, and trust-boundary regressions.

    Command: expanded supervisor lifecycle recovery selection on candidate and clean main control
    Result: pass
    Evidence: Candidate passed 262/264; the same two assertions failed identically on clean main because fixtures approve a generated placeholder plan that v0.7 rejects. Differential result: zero candidate-only failures.
    Scope: Non-regression classification for managed, branch_pr, recovery, retry, reconciliation, and closeout lifecycle behavior; obsolete fixture repair is recorded as mandatory pre-release follow-up.

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608021231-BPMM04-record-token-usage-on-every-completed-task/.agentplane/tasks/202608021231-BPMM04/blueprint/resolved-snapshot.json
    - old_digest: d2470dfd273c68b5608d8dad367c27ea191d7026086c22031b520352a14c4183
    - current_digest: d2470dfd273c68b5608d8dad367c27ea191d7026086c22031b520352a14c4183
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608021231-BPMM04

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202608021231-BPMM04
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    ### 2026-08-03T11:44:13.577Z — VERIFY — ok

    By: TESTER

    Note: Verified EVALUATOR rework at exact SHA e92e7b4b1ea4fe9cca60d2ebb5a305f3e65fba42: every reconciliation completion path now projects authoritative supervisor token usage and preserves stable replay.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-03T11:32:16.271Z, excerpt_hash=sha256:a756b7e65aa3d1bdeb14f2b9a0e0e7d6005331876560c62eb05924e6e64b130e

    Details:

    Command: bunx vitest run packages/agentplane/src/cli/run-cli.core.release-tasks-reconcile.test.ts packages/agentplane/src/commands/task/hosted-merge-sync.token-usage.test.ts packages/agentplane/src/commands/task/hosted-merge-sync.test.ts packages/agentplane/src/commands/task/task-token-usage.test.ts packages/agentplane/src/commands/task/hosted-close.command.test.ts packages/agentplane/src/commands/task/hosted-close-premerge.test.ts
    Result: pass
    Evidence: 5 routed files and 30 tests passed at rework SHA e92e7b4b1ea4fe9cca60d2ebb5a305f3e65fba42; exact hosted, local-merged, locally-shipped, and replay-stability coverage reads a real supervisor journal with executor plus evaluator usage.
    Scope: EVALUATOR RCI-001 recovery context and all merge reconciliation completion paths.

    Command: bun run typecheck && bun run lint:core && bun run knip:check && node .agentplane/policy/check-routing.mjs
    Result: pass
    Evidence: TypeScript and ESLint exited 0; policy routing passed; Knip stayed exactly files=1, exports=175, types=363, total=539.
    Scope: Rework type safety, static hygiene, policy graph, and unchanged unused-code baseline.

    Command: bun run framework:dev:bootstrap && bun run ci:contract
    Result: pass
    Evidence: Repo-local runtime rebuilt and full contract exited 0; RF04 replay remained 50/50 with 70/70 outcomes, 27/27 token cells, and 170/170 scalar cells; architecture had zero violations and coverage thresholds passed.
    Scope: Full repository contract after reconciliation rework.

    Command: bun run test:critical
    Result: pass
    Evidence: All 12 critical CLI chunks passed after rework.
    Scope: Critical efficiency, CLI, provider at-most-once, protected-path, scope, symlink, and trust-boundary regressions.

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608021231-BPMM04-record-token-usage-on-every-completed-task/.agentplane/tasks/202608021231-BPMM04/blueprint/resolved-snapshot.json
    - old_digest: d2470dfd273c68b5608d8dad367c27ea191d7026086c22031b520352a14c4183
    - current_digest: d2470dfd273c68b5608d8dad367c27ea191d7026086c22031b520352a14c4183
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608021231-BPMM04

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202608021231-BPMM04
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
    - Observation: The expanded supervisor/lifecycle/recovery selection passed 262/264 assertions; the two failures reproduce unchanged on clean main and both rely on approving a generated placeholder plan that v0.7 intentionally rejects.
      Impact: These failures do not originate from token accounting and do not invalidate the implementation, but they leave two obsolete lifecycle fixtures red until repaired.
      Resolution: Track the two fixture repairs as a separate mandatory pre-release task that installs an explicit semantic plan before approval; rerun the expanded selection before publishing v0.7.1.
extensions:
  workflow_route_baseline:
    start_head_sha: "a447a78e85d0d520b7bb16074d6720ae3c3bc152"
    version: 1
id_source: "generated"
---
## Summary

Record token usage on every completed task

Persist provider and evaluator token usage through task execution and closeout, expose the aggregate and provenance in completed task JSON and human-readable output, preserve compatibility when usage is unavailable, and add deterministic lifecycle regression coverage.

## Scope

- In scope: Persist provider and evaluator token usage through task execution and closeout, expose the aggregate and provenance in completed task JSON and human-readable output, preserve compatibility when usage is unavailable, and add deterministic lifecycle regression coverage.
- Out of scope: unrelated refactors not required for "Record token usage on every completed task".

## Plan

1. Trace the canonical supervisor episode journal, provider adapter usage collectors, execution receipts, task projections, ACR generation, and every DONE/finish/hosted-close path to identify the one authoritative token source and all completion surfaces. 2. Define a backward-compatible observed token-usage projection that preserves input, output, reasoning, and total counts when provider evidence exists, marks unavailable or partial usage explicitly, never trusts agent-reported metrics as observed facts, and aggregates executor plus evaluator episodes exactly once. 3. Persist the final aggregate on completed TaskData and render it in task README frontmatter/body, human task status/brief output, machine JSON, and ACR without rewriting historical tasks or fabricating zero usage. 4. Update managed-run, external-advance, direct, branch_pr, rework, recovery, hosted-close, legacy/no-provider, and idempotent-replay fixtures so completion records stable totals and duplicate close/reconcile operations cannot double-count. 5. Add focused schema/projection/closure tests and run v0.7 supervisor, lifecycle, recovery, critical CLI, schema, typecheck, Knip, policy routing, and ci:contract gates; independently verify the exact implementation SHA before integration.

## Verify Steps

1. Run focused managed-run fixtures with multiple executor and evaluator episodes carrying known Codex provider usage. Expected: the completed task persists exact input, output, reasoning, and total tokens from supervisor-owned evidence; each episode is counted once; README, task status/brief human output, machine JSON, and ACR expose the same aggregate and provenance/completeness state.
2. Run external-advance, manual/direct, legacy task, adapter-without-usage, malformed-usage, and partial-usage fixtures. Expected: AgentPlane never treats agent-reported metrics as observed provider usage, never fabricates zero for unavailable usage, and preserves an explicit unavailable or partial state without blocking otherwise valid completion.
3. Run branch_pr rework, retry, stale fingerprint, crash recovery, reconcile, repeated finish, GitHub rebase merge, hosted close, and cleanup fixtures. Expected: token aggregates survive state transitions and task-artifact commits, remain bound to the correct task/run, and cannot be lost or double-counted by replay or idempotent closure.
4. Validate schema compatibility and historical task reads, then run the v0.7 supervisor, lifecycle, and recovery suites, bun run test:critical, bun run schemas:check, bun run typecheck, bun run lint:core, bun run knip:check, node .agentplane/policy/check-routing.mjs, and bun run ci:contract. Expected: all gates pass without baseline growth, and an independent EVALUATOR accepts the exact implementation SHA.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-08-03T11:31:13.630Z — VERIFY — ok

By: TESTER

Note: Verified implementation commit 613cd8095f4cebf234dafaa8348f87f173495d9e. Focused token-accounting, schema, export, brief, finish, hosted-close, ACR, provider, supervisor, and idempotency coverage passed (169 focused assertions across the recorded groups). bun run typecheck, bun run lint:core, bun run knip:check (539 baseline), node .agentplane/policy/check-routing.mjs, bun run ci:contract, and bun run test:critical all passed. Exact RF04 replay remained 50/50 with 70/70 outcomes, 27/27 token cells, and 170/170 scalar cells.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-03T11:30:38.785Z, excerpt_hash=sha256:a756b7e65aa3d1bdeb14f2b9a0e0e7d6005331876560c62eb05924e6e64b130e

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608021231-BPMM04-record-token-usage-on-every-completed-task/.agentplane/tasks/202608021231-BPMM04/blueprint/resolved-snapshot.json
- old_digest: d2470dfd273c68b5608d8dad367c27ea191d7026086c22031b520352a14c4183
- current_digest: d2470dfd273c68b5608d8dad367c27ea191d7026086c22031b520352a14c4183
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608021231-BPMM04

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202608021231-BPMM04
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

### 2026-08-03T11:32:15.385Z — VERIFY — ok

By: TESTER

Note: Verified exact implementation SHA 613cd8095f4cebf234dafaa8348f87f173495d9e with no candidate-only regression; all canonical gates passed.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-03T11:31:14.481Z, excerpt_hash=sha256:a756b7e65aa3d1bdeb14f2b9a0e0e7d6005331876560c62eb05924e6e64b130e

Details:

Command: focused Vitest groups for token projection, provider transport, supervisor episodes, schema compatibility, task brief/export, finish, hosted-close, ACR, and idempotent completion
Result: pass
Evidence: 169 focused assertions passed at implementation SHA 613cd8095f4cebf234dafaa8348f87f173495d9e.
Scope: Exact, partial, unavailable, legacy, mixed provider telemetry, executor plus evaluator aggregation, replay, reconciliation, and all user-visible task token surfaces.

Command: bun run typecheck && bun run lint:core && bun run knip:check && node .agentplane/policy/check-routing.mjs
Result: pass
Evidence: TypeScript and ESLint exited 0; policy routing passed; Knip baseline remained files=1, exports=175, types=363, total=539.
Scope: Repository type safety, static hygiene, policy graph, and unused-code ratchet.

Command: bun run ci:contract
Result: pass
Evidence: Full contract exited 0; RF04 replay was 50/50 runs with 70/70 outcomes, 27/27 token cells, and 170/170 scalar cells.
Scope: Formatting, schemas, examples, docs, compatibility, lifecycle, architecture, clone, Knip, coverage, and deterministic efficiency contract.

Command: bun run test:critical
Result: pass
Evidence: All 12 critical chunks passed.
Scope: Critical CLI, provider at-most-once, protected-path, scope, symlink, and trust-boundary regressions.

Command: expanded supervisor lifecycle recovery selection on candidate and clean main control
Result: pass
Evidence: Candidate passed 262/264; the same two assertions failed identically on clean main because fixtures approve a generated placeholder plan that v0.7 rejects. Differential result: zero candidate-only failures.
Scope: Non-regression classification for managed, branch_pr, recovery, retry, reconciliation, and closeout lifecycle behavior; obsolete fixture repair is recorded as mandatory pre-release follow-up.

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608021231-BPMM04-record-token-usage-on-every-completed-task/.agentplane/tasks/202608021231-BPMM04/blueprint/resolved-snapshot.json
- old_digest: d2470dfd273c68b5608d8dad367c27ea191d7026086c22031b520352a14c4183
- current_digest: d2470dfd273c68b5608d8dad367c27ea191d7026086c22031b520352a14c4183
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608021231-BPMM04

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202608021231-BPMM04
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

### 2026-08-03T11:44:13.577Z — VERIFY — ok

By: TESTER

Note: Verified EVALUATOR rework at exact SHA e92e7b4b1ea4fe9cca60d2ebb5a305f3e65fba42: every reconciliation completion path now projects authoritative supervisor token usage and preserves stable replay.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-03T11:32:16.271Z, excerpt_hash=sha256:a756b7e65aa3d1bdeb14f2b9a0e0e7d6005331876560c62eb05924e6e64b130e

Details:

Command: bunx vitest run packages/agentplane/src/cli/run-cli.core.release-tasks-reconcile.test.ts packages/agentplane/src/commands/task/hosted-merge-sync.token-usage.test.ts packages/agentplane/src/commands/task/hosted-merge-sync.test.ts packages/agentplane/src/commands/task/task-token-usage.test.ts packages/agentplane/src/commands/task/hosted-close.command.test.ts packages/agentplane/src/commands/task/hosted-close-premerge.test.ts
Result: pass
Evidence: 5 routed files and 30 tests passed at rework SHA e92e7b4b1ea4fe9cca60d2ebb5a305f3e65fba42; exact hosted, local-merged, locally-shipped, and replay-stability coverage reads a real supervisor journal with executor plus evaluator usage.
Scope: EVALUATOR RCI-001 recovery context and all merge reconciliation completion paths.

Command: bun run typecheck && bun run lint:core && bun run knip:check && node .agentplane/policy/check-routing.mjs
Result: pass
Evidence: TypeScript and ESLint exited 0; policy routing passed; Knip stayed exactly files=1, exports=175, types=363, total=539.
Scope: Rework type safety, static hygiene, policy graph, and unchanged unused-code baseline.

Command: bun run framework:dev:bootstrap && bun run ci:contract
Result: pass
Evidence: Repo-local runtime rebuilt and full contract exited 0; RF04 replay remained 50/50 with 70/70 outcomes, 27/27 token cells, and 170/170 scalar cells; architecture had zero violations and coverage thresholds passed.
Scope: Full repository contract after reconciliation rework.

Command: bun run test:critical
Result: pass
Evidence: All 12 critical CLI chunks passed after rework.
Scope: Critical efficiency, CLI, provider at-most-once, protected-path, scope, symlink, and trust-boundary regressions.

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608021231-BPMM04-record-token-usage-on-every-completed-task/.agentplane/tasks/202608021231-BPMM04/blueprint/resolved-snapshot.json
- old_digest: d2470dfd273c68b5608d8dad367c27ea191d7026086c22031b520352a14c4183
- current_digest: d2470dfd273c68b5608d8dad367c27ea191d7026086c22031b520352a14c4183
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608021231-BPMM04

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202608021231-BPMM04
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

- Observation: The expanded supervisor/lifecycle/recovery selection passed 262/264 assertions; the two failures reproduce unchanged on clean main and both rely on approving a generated placeholder plan that v0.7 intentionally rejects.
  Impact: These failures do not originate from token accounting and do not invalidate the implementation, but they leave two obsolete lifecycle fixtures red until repaired.
  Resolution: Track the two fixture repairs as a separate mandatory pre-release task that installs an explicit semantic plan before approval; rerun the expanded selection before publishing v0.7.1.
