---
id: "202608101410-4GSCYN"
title: "Stop external-agent replay after a typed blocked result"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 6
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
commit:
  hash: "f418c45799e9eba70c561a386682a57b8cce7a26"
  message: "🚧 4GSCYN task: apply external agent result"
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: f418c45799e9. CLI accepted one state-bound external-agent semantic result."
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
doc_version: 3
doc_updated_at: "2026-08-10T14:25:19.785Z"
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
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
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
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
