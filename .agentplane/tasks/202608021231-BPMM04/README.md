---
id: "202608021231-BPMM04"
title: "Record token usage on every completed task"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 5
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
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
events:
  -
    type: "status"
    at: "2026-08-03T11:03:33.709Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
doc_version: 3
doc_updated_at: "2026-08-03T11:03:33.709Z"
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
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
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
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
