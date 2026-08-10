---
id: "202608101410-4GSCYN"
title: "Stop external-agent replay after a typed blocked result"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 12
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "lifecycle"
  - "supervisor"
task_kind: "code"
mutation_scope: "code"
verify:
  - "bun run typecheck"
  - "bun test packages/agentplane/src/cli/run-cli.core.task-advance.test.ts"
plan_approval:
  state: "approved"
  updated_at: "2026-08-10T14:11:03.332Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "needs_rework"
  updated_at: "2026-08-10T14:46:17.929Z"
  updated_by: "SUPERVISOR"
  note: "Rework: Unsupported declared check: bun test packages/agentplane/src/cli/run-cli.core.task-advance.test.ts"
  attempts: 1
quality_review:
  state: "rework"
  provenance: "evaluator_supplied"
  updated_at: "2026-08-10T14:40:06.741Z"
  updated_by: "EVALUATOR"
  note: "EVALUATOR returned rework with 4 typed finding(s)."
  evaluated_sha: "f418c45799e9eba70c561a386682a57b8cce7a26"
  blueprint_digest: "d70a135fe341265e5322c09e53a591e05a8451c700eda6cef5f3e3f838a1bd4c"
  evidence_refs:
    - ".agentplane/tasks/202608101410-4GSCYN/quality/20260810-143820810-recovery-context/evaluator-work-order.json"
    - ".agentplane/tasks/202608101410-4GSCYN/quality/20260810-143820810-recovery-context/quality-report.json"
    - ".agentplane/tasks/202608101410-4GSCYN/quality/objects/sha256/15ae17d8a5851661ce0b3970d9ca36090e9e1fafa5cce0b628aabea0da17cdac.md"
    - ".agentplane/tasks/202608101410-4GSCYN/quality/20260810-143820810-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202608101410-4GSCYN/quality/20260810-143820810-recovery-context/evaluator-result.json"
    - ".agentplane/tasks/202608101410-4GSCYN/quality/20260810-143820810-recovery-context/evaluator-follow-up.json"
    - ".agentplane/tasks/202608101410-4GSCYN/quality/20260810-143820810-recovery-context/evaluator-evidence-manifest.json"
    - ".agentplane/tasks/202608101410-4GSCYN/README.md"
    - ".agentplane/tasks/202608101410-4GSCYN/quality/objects/sha256/3f2e6486bcb8fefe73ac994f158421e1dcfee6ba27f12e7d40eb647abecb9474.patch"
    - ".agentplane/tasks/202608101410-4GSCYN/quality/objects/sha256/06e34016b25e966b5fc8ea502747ab2cd42bc8de9e0025e9ccd97e94a3beabc8.json"
    - ".agentplane/tasks/202608101410-4GSCYN/verification/20260810143753314-5534c674a516bc5e.json"
    - ".agentplane/tasks/202608101410-4GSCYN/quality/objects/sha256/0ccfda77d6f1cfdf86c92a8efe75935565ee4ca301ad143fdb7804153736afa7.json"
    - ".agentplane/policy/dod.code.md"
    - ".agentplane/policy/dod.core.md"
    - ".agentplane/policy/security.must.md"
    - ".agentplane/policy/workflow.branch_pr.md"
  findings:
    - "recordExternalBlockedResult calls task set-status and then cmdCommit with allowTasks=true without first validating the current head, task fingerprint, baseline status, or agent-introduced paths."
    - "A non-completed agent could alter active-task README or PR metadata and return blocked; the new path can then stage those task artifacts under a trusted supervisor commit."
    - "The positive lifecycle and replay tests pass, but no negative test mutates task artifacts or workspace content before returning blocked."
    - "Residual risk: Without a zero-change return check, protected task metadata can cross the external-agent trust boundary inside a supervisor-attributed commit."
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
  -
    author: "SUPERVISOR"
    body: "Implementation committed: f418c45799e9. CLI accepted one state-bound external-agent semantic result."
  -
    author: "CODER"
    body: "Start: restore the unchanged implementation after the verifier rejected an already executed safe check."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: 3b66b944ef0e. CLI accepted one state-bound external-agent semantic result."
events:
  -
    type: "status"
    at: "2026-08-10T14:11:35.782Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-08-10T14:25:19.785Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: f418c45799e9. CLI accepted one state-bound external-agent semantic result."
    commit: "f418c45799e9eba70c561a386682a57b8cce7a26"
  -
    type: "verify"
    at: "2026-08-10T14:33:30.394Z"
    author: "SUPERVISOR"
    state: "needs_rework"
    note: "Rework: Unsupported declared check: bun test packages/agentplane/src/cli/run-cli.core.task-advance.test.ts"
  -
    type: "status"
    at: "2026-08-10T14:37:31.837Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Start: restore the unchanged implementation after the verifier rejected an already executed safe check."
    commit: "f418c45799e9eba70c561a386682a57b8cce7a26"
  -
    type: "verify"
    at: "2026-08-10T14:37:53.314Z"
    author: "TESTER"
    state: "ok"
    note: "Verified: blocked-result lifecycle, replay idempotency, explicit resume, routing, types, lint, formatting, and critical CLI coverage all pass."
  -
    type: "status"
    at: "2026-08-10T14:46:01.039Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: 3b66b944ef0e. CLI accepted one state-bound external-agent semantic result."
    commit: "3b66b944ef0ef743f21acb3a524751736cf60a12"
  -
    type: "verify"
    at: "2026-08-10T14:46:17.929Z"
    author: "SUPERVISOR"
    state: "needs_rework"
    note: "Rework: Unsupported declared check: bun test packages/agentplane/src/cli/run-cli.core.task-advance.test.ts"
doc_version: 3
doc_updated_at: "2026-08-10T14:46:19.332Z"
doc_updated_by: "SUPERVISOR"
description: "When an external EXECUTOR returns a valid state-bound blocked semantic result, consume that envelope exactly once, persist the blocker as task state and evidence, and return a non-episode boundary. Do not issue another implementation envelope until an operator deliberately resolves the blocker and resumes the task. Preserve completed-result behavior and exact replay idempotency."
sections:
  Summary: |-
    Stop external-agent replay after a typed blocked result

    When an external EXECUTOR returns a valid state-bound blocked semantic result, consume that envelope exactly once, persist the blocker as task state and evidence, and return a non-episode boundary. Do not issue another implementation envelope until an operator deliberately resolves the blocker and resumes the task. Preserve completed-result behavior and exact replay idempotency.
  Scope: |-
    - In scope: When an external EXECUTOR returns a valid state-bound blocked semantic result, consume that envelope exactly once, persist the blocker as task state and evidence, and return a non-episode boundary. Do not issue another implementation envelope until an operator deliberately resolves the blocker and resumes the task. Preserve completed-result behavior and exact replay idempotency.
    - Out of scope: unrelated refactors not required for "Stop external-agent replay after a typed blocked result".
  Plan: |-
    Goal: make typed blocked external-agent results terminal for the current implementation attempt instead of silently replaying the same semantic episode.

    1. Add a failing branch_pr task-advance regression that issues an implementation envelope, returns a valid blocked AgentSemanticResult, and observes the next packet.
    2. Apply a blocked implementation result as a supervisor-owned task transition: preserve the semantic summary and recommended action, set task status to BLOCKED, and record the task-local evidence once.
    3. Project an approved BLOCKED branch_pr task to a non-agent operator boundary. The packet must contain no new exchange and must not consume another agent-run budget slot.
    4. Keep the accepted exchange consumed with its original result digest. Replaying the exact result must be idempotent and must not duplicate comments, events, commits, or result application.
    5. Require an explicit task resume transition before another implementation episode can be issued; after resume, issue a fresh state-bound exchange rather than reviving the consumed one.
    6. Preserve completed-result behavior, stale-result rejection, differing-result rejection, planning/evaluator paths, and direct workflow behavior.
    7. Run focused task-advance and workflow projection tests, then typecheck and the critical CLI suite.

    Success: one blocked envelope produces one durable blocker and one non-episode boundary; requesting another packet without resolving the blocker never replays implementation.
    Rollback: revert the isolated blocked-result projection and application changes; existing exchange digests remain readable.
  Verify Steps: |-
    1. Run the focused external task-advance regression. Expected: a valid blocked implementation result is consumed once, the task becomes BLOCKED, and the returned packet has no exchange and no agent_episode action.
    2. Replay the same result path. Expected: no duplicate blocker comment, event, status commit, or semantic application is created.
    3. Request a fresh packet while the task remains BLOCKED. Expected: no implementation envelope is issued and agent-run usage does not increase.
    4. Resume the fixture task to DOING and request a packet. Expected: a fresh state-bound exchange is issued; the consumed envelope is not reused.
    5. Run completed, stale, differing-result, direct-workflow, planning, and evaluator regression cases. Expected: existing behavior remains intact.
    6. Run bun test packages/agentplane/src/cli/run-cli.core.task-advance.test.ts and the relevant workflow-step projection tests.
    7. Run bun run typecheck and bun run test:critical. Expected: all pass.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-08-10T14:33:30.394Z — VERIFY — needs_rework

    By: SUPERVISOR

    Note: Rework: Unsupported declared check: bun test packages/agentplane/src/cli/run-cli.core.task-advance.test.ts
    Attempts: 1

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-10T14:25:19.785Z, excerpt_hash=sha256:86b0656c20c7d0d6524a42fa6cf6d195dbe7409e19e6ff8fadb0bd4d206b8eb2

    Details:

    Command: bun run typecheck
    Result: pass
    Evidence: .agentplane/tasks/202608101410-4GSCYN/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608101410-4GSCYN declared verification

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608101410-4GSCYN-stop-external-agent-replay-after-a-typed-blocked/.agentplane/tasks/202608101410-4GSCYN/blueprint/resolved-snapshot.json
    - old_digest: d70a135fe341265e5322c09e53a591e05a8451c700eda6cef5f3e3f838a1bd4c
    - current_digest: d70a135fe341265e5322c09e53a591e05a8451c700eda6cef5f3e3f838a1bd4c
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608101410-4GSCYN

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202608101410-4GSCYN
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    ### 2026-08-10T14:37:53.314Z — VERIFY — ok

    By: TESTER

    Note: Verified: blocked-result lifecycle, replay idempotency, explicit resume, routing, types, lint, formatting, and critical CLI coverage all pass.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-10T14:37:31.837Z, excerpt_hash=sha256:86b0656c20c7d0d6524a42fa6cf6d195dbe7409e19e6ff8fadb0bd4d206b8eb2

    Details:

    Command: bun test packages/agentplane/src/cli/run-cli.core.task-advance.test.ts
    Result: pass
    Evidence: 15 tests passed with 153 assertions, including the new blocked-result round trip.
    Scope: external-agent task advance, direct and branch_pr behavior, planning, evaluator, replay, and stale-result handling.

    Command: bun test packages/agentplane/src/commands/shared/workflow-step-projections.test.ts
    Result: pass
    Evidence: 15 route projection tests passed with 61 assertions.
    Scope: workflow-step authority and checkout projection.

    Command: bun run typecheck
    Result: pass
    Evidence: TypeScript build exited 0.
    Scope: repository TypeScript contracts.

    Command: bun run test:critical
    Result: pass
    Evidence: all 12 critical-cli chunks passed after canonical framework bootstrap.
    Scope: critical CLI, trust-boundary, Git-edge, protected-path, RF-04, and replay suites.

    Command: focused ESLint, format:changed, and policy routing
    Result: pass
    Evidence: changed files have zero lint/format errors and policy routing reports OK.
    Scope: three changed source/test files and gateway routing.

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608101410-4GSCYN-stop-external-agent-replay-after-a-typed-blocked/.agentplane/tasks/202608101410-4GSCYN/blueprint/resolved-snapshot.json
    - old_digest: d70a135fe341265e5322c09e53a591e05a8451c700eda6cef5f3e3f838a1bd4c
    - current_digest: d70a135fe341265e5322c09e53a591e05a8451c700eda6cef5f3e3f838a1bd4c
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608101410-4GSCYN

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202608101410-4GSCYN
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    ### 2026-08-10T14:46:17.929Z — VERIFY — needs_rework

    By: SUPERVISOR

    Note: Rework: Unsupported declared check: bun test packages/agentplane/src/cli/run-cli.core.task-advance.test.ts
    Attempts: 1

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-10T14:46:01.039Z, excerpt_hash=sha256:86b0656c20c7d0d6524a42fa6cf6d195dbe7409e19e6ff8fadb0bd4d206b8eb2

    Details:

    Command: bun run typecheck
    Result: pass
    Evidence: .agentplane/tasks/202608101410-4GSCYN/supervision/declared-checks.json#check-1
    Scope: branch_pr task 202608101410-4GSCYN declared verification

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608101410-4GSCYN-stop-external-agent-replay-after-a-typed-blocked/.agentplane/tasks/202608101410-4GSCYN/blueprint/resolved-snapshot.json
    - old_digest: d70a135fe341265e5322c09e53a591e05a8451c700eda6cef5f3e3f838a1bd4c
    - current_digest: d70a135fe341265e5322c09e53a591e05a8451c700eda6cef5f3e3f838a1bd4c
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608101410-4GSCYN

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202608101410-4GSCYN
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
    - Observation: Task creation accepted bun test packages/agentplane/src/cli/run-cli.core.task-advance.test.ts, but automatic TESTER execution later rejected the same command as unsupported and recorded a false needs_rework result.
      Impact: A valid implementation is sent back to CODER despite its declared check passing manually, creating unnecessary lifecycle churn and blocking first-task UX.
      Resolution: Recovered with manually recorded structured TESTER evidence; follow up by sharing one validation contract between task verify input and automatic declared-check execution.
      Promotion: incident-candidate
      Fixability: repo-fixable
      IncidentScope: task declared-check validation and execution parity
      IncidentTags: verifier, ux
      IncidentMatch: Unsupported declared check
extensions:
  workflow_route_baseline:
    start_head_sha: "3d417620e9a8b333416d25c2cf19b3ccbdbdd1c9"
    version: 1
id_source: "generated"
---
## Summary

Stop external-agent replay after a typed blocked result

When an external EXECUTOR returns a valid state-bound blocked semantic result, consume that envelope exactly once, persist the blocker as task state and evidence, and return a non-episode boundary. Do not issue another implementation envelope until an operator deliberately resolves the blocker and resumes the task. Preserve completed-result behavior and exact replay idempotency.

## Scope

- In scope: When an external EXECUTOR returns a valid state-bound blocked semantic result, consume that envelope exactly once, persist the blocker as task state and evidence, and return a non-episode boundary. Do not issue another implementation envelope until an operator deliberately resolves the blocker and resumes the task. Preserve completed-result behavior and exact replay idempotency.
- Out of scope: unrelated refactors not required for "Stop external-agent replay after a typed blocked result".

## Plan

Goal: make typed blocked external-agent results terminal for the current implementation attempt instead of silently replaying the same semantic episode.

1. Add a failing branch_pr task-advance regression that issues an implementation envelope, returns a valid blocked AgentSemanticResult, and observes the next packet.
2. Apply a blocked implementation result as a supervisor-owned task transition: preserve the semantic summary and recommended action, set task status to BLOCKED, and record the task-local evidence once.
3. Project an approved BLOCKED branch_pr task to a non-agent operator boundary. The packet must contain no new exchange and must not consume another agent-run budget slot.
4. Keep the accepted exchange consumed with its original result digest. Replaying the exact result must be idempotent and must not duplicate comments, events, commits, or result application.
5. Require an explicit task resume transition before another implementation episode can be issued; after resume, issue a fresh state-bound exchange rather than reviving the consumed one.
6. Preserve completed-result behavior, stale-result rejection, differing-result rejection, planning/evaluator paths, and direct workflow behavior.
7. Run focused task-advance and workflow projection tests, then typecheck and the critical CLI suite.

Success: one blocked envelope produces one durable blocker and one non-episode boundary; requesting another packet without resolving the blocker never replays implementation.
Rollback: revert the isolated blocked-result projection and application changes; existing exchange digests remain readable.

## Verify Steps

1. Run the focused external task-advance regression. Expected: a valid blocked implementation result is consumed once, the task becomes BLOCKED, and the returned packet has no exchange and no agent_episode action.
2. Replay the same result path. Expected: no duplicate blocker comment, event, status commit, or semantic application is created.
3. Request a fresh packet while the task remains BLOCKED. Expected: no implementation envelope is issued and agent-run usage does not increase.
4. Resume the fixture task to DOING and request a packet. Expected: a fresh state-bound exchange is issued; the consumed envelope is not reused.
5. Run completed, stale, differing-result, direct-workflow, planning, and evaluator regression cases. Expected: existing behavior remains intact.
6. Run bun test packages/agentplane/src/cli/run-cli.core.task-advance.test.ts and the relevant workflow-step projection tests.
7. Run bun run typecheck and bun run test:critical. Expected: all pass.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-08-10T14:33:30.394Z — VERIFY — needs_rework

By: SUPERVISOR

Note: Rework: Unsupported declared check: bun test packages/agentplane/src/cli/run-cli.core.task-advance.test.ts
Attempts: 1

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-10T14:25:19.785Z, excerpt_hash=sha256:86b0656c20c7d0d6524a42fa6cf6d195dbe7409e19e6ff8fadb0bd4d206b8eb2

Details:

Command: bun run typecheck
Result: pass
Evidence: .agentplane/tasks/202608101410-4GSCYN/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608101410-4GSCYN declared verification

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608101410-4GSCYN-stop-external-agent-replay-after-a-typed-blocked/.agentplane/tasks/202608101410-4GSCYN/blueprint/resolved-snapshot.json
- old_digest: d70a135fe341265e5322c09e53a591e05a8451c700eda6cef5f3e3f838a1bd4c
- current_digest: d70a135fe341265e5322c09e53a591e05a8451c700eda6cef5f3e3f838a1bd4c
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608101410-4GSCYN

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202608101410-4GSCYN
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

### 2026-08-10T14:37:53.314Z — VERIFY — ok

By: TESTER

Note: Verified: blocked-result lifecycle, replay idempotency, explicit resume, routing, types, lint, formatting, and critical CLI coverage all pass.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-10T14:37:31.837Z, excerpt_hash=sha256:86b0656c20c7d0d6524a42fa6cf6d195dbe7409e19e6ff8fadb0bd4d206b8eb2

Details:

Command: bun test packages/agentplane/src/cli/run-cli.core.task-advance.test.ts
Result: pass
Evidence: 15 tests passed with 153 assertions, including the new blocked-result round trip.
Scope: external-agent task advance, direct and branch_pr behavior, planning, evaluator, replay, and stale-result handling.

Command: bun test packages/agentplane/src/commands/shared/workflow-step-projections.test.ts
Result: pass
Evidence: 15 route projection tests passed with 61 assertions.
Scope: workflow-step authority and checkout projection.

Command: bun run typecheck
Result: pass
Evidence: TypeScript build exited 0.
Scope: repository TypeScript contracts.

Command: bun run test:critical
Result: pass
Evidence: all 12 critical-cli chunks passed after canonical framework bootstrap.
Scope: critical CLI, trust-boundary, Git-edge, protected-path, RF-04, and replay suites.

Command: focused ESLint, format:changed, and policy routing
Result: pass
Evidence: changed files have zero lint/format errors and policy routing reports OK.
Scope: three changed source/test files and gateway routing.

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608101410-4GSCYN-stop-external-agent-replay-after-a-typed-blocked/.agentplane/tasks/202608101410-4GSCYN/blueprint/resolved-snapshot.json
- old_digest: d70a135fe341265e5322c09e53a591e05a8451c700eda6cef5f3e3f838a1bd4c
- current_digest: d70a135fe341265e5322c09e53a591e05a8451c700eda6cef5f3e3f838a1bd4c
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608101410-4GSCYN

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202608101410-4GSCYN
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

### 2026-08-10T14:46:17.929Z — VERIFY — needs_rework

By: SUPERVISOR

Note: Rework: Unsupported declared check: bun test packages/agentplane/src/cli/run-cli.core.task-advance.test.ts
Attempts: 1

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-10T14:46:01.039Z, excerpt_hash=sha256:86b0656c20c7d0d6524a42fa6cf6d195dbe7409e19e6ff8fadb0bd4d206b8eb2

Details:

Command: bun run typecheck
Result: pass
Evidence: .agentplane/tasks/202608101410-4GSCYN/supervision/declared-checks.json#check-1
Scope: branch_pr task 202608101410-4GSCYN declared verification

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202608101410-4GSCYN-stop-external-agent-replay-after-a-typed-blocked/.agentplane/tasks/202608101410-4GSCYN/blueprint/resolved-snapshot.json
- old_digest: d70a135fe341265e5322c09e53a591e05a8451c700eda6cef5f3e3f838a1bd4c
- current_digest: d70a135fe341265e5322c09e53a591e05a8451c700eda6cef5f3e3f838a1bd4c
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608101410-4GSCYN

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202608101410-4GSCYN
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

- Observation: Task creation accepted bun test packages/agentplane/src/cli/run-cli.core.task-advance.test.ts, but automatic TESTER execution later rejected the same command as unsupported and recorded a false needs_rework result.
  Impact: A valid implementation is sent back to CODER despite its declared check passing manually, creating unnecessary lifecycle churn and blocking first-task UX.
  Resolution: Recovered with manually recorded structured TESTER evidence; follow up by sharing one validation contract between task verify input and automatic declared-check execution.
  Promotion: incident-candidate
  Fixability: repo-fixable
  IncidentScope: task declared-check validation and execution parity
  IncidentTags: verifier, ux
  IncidentMatch: Unsupported declared check
