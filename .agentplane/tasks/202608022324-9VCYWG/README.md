---
id: "202608022324-9VCYWG"
title: "Complete the task advance semantic-result round trip"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "external-agent"
  - "agent-protocol"
  - "v0.7.1"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "code.branch_pr"
verify:
  - "Run focused task advance, SemanticResult, supervisor, replay, and stale-fingerprint suites."
  - "Run typecheck, lint:core, knip:check, hotspots:check, policy routing, test:critical, and a two-call external-agent E2E fixture."
plan_approval:
  state: "approved"
  updated_at: "2026-08-02T23:27:17.824Z"
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
    at: "2026-08-02T23:28:26.953Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
doc_version: 3
doc_updated_at: "2026-08-02T23:28:26.953Z"
doc_updated_by: "CODER"
description: "Extend the compact external-agent protocol so task advance accepts a typed SemanticResult bound to the issued transition and state fingerprint, validates and persists it through the same supervisor engine used by task run, executes subsequent deterministic transitions, and returns the next bounded packet without exposing lifecycle choreography. Keep each packet at or below 2 KiB and preserve fail-closed replay and authority semantics."
sections:
  Summary: |-
    Complete the task advance semantic-result round trip

    Extend the compact external-agent protocol so task advance accepts a typed SemanticResult bound to the issued transition and state fingerprint, validates and persists it through the same supervisor engine used by task run, executes subsequent deterministic transitions, and returns the next bounded packet without exposing lifecycle choreography. Keep each packet at or below 2 KiB and preserve fail-closed replay and authority semantics.
  Scope: |-
    - In scope: Extend the compact external-agent protocol so task advance accepts a typed SemanticResult bound to the issued transition and state fingerprint, validates and persists it through the same supervisor engine used by task run, executes subsequent deterministic transitions, and returns the next bounded packet without exposing lifecycle choreography. Keep each packet at or below 2 KiB and preserve fail-closed replay and authority semantics.
    - Out of scope: unrelated refactors not required for "Complete the task advance semantic-result round trip".
  Plan: "1. Reuse the canonical AgentSemanticResult contract and add a task advance result input envelope bound to task_id, transition_id, role, and state_fingerprint; reject stale, mismatched, malformed, or replayed results before mutation. 2. Expose only compact work-order and result-schema references plus one deterministic return invocation in the agent packet, keeping the serialized packet at or below 2 KiB and free of Git/PR/verify/finish/integrate choreography. 3. Feed accepted results into the same persisted supervisor episode and lifecycle operation registry used by task run, execute all newly eligible deterministic operations within the existing bound, and emit the next semantic/approval/wait/terminal packet. 4. Add direct and branch_pr E2E fixtures for planning, implementation, evaluator, stale fingerprint, duplicate result, crash recovery, and terminal convergence; prove task run and task advance do not fork lifecycle behavior. 5. Run focused suites and the full critical/static/size/policy gates, then record structured verification and evaluator evidence."
  Verify Steps: "1. Run focused task advance packet, result-ingestion, AgentSemanticResult validation, supervisor episode, stale-fingerprint, replay, and recovery tests. Expected: a valid result advances the same state machine as task run; malformed, stale, mismatched, or replayed results fail closed without duplicate effects. 2. Run direct and branch_pr external-agent E2E fixtures from task creation through terminal state. Expected: after task creation the external agent uses only task advance plus semantic-result files; Agentplane owns all Git, worktree, PR, verification, evaluator, integration, and cleanup transitions; every emitted packet is at most 2048 bytes and has one representation per field. 3. Run bun run typecheck, bun run lint:core, bun run knip:check, bun run hotspots:check, node .agentplane/policy/check-routing.mjs, and bun run test:critical. Expected: all gates pass without Knip or hotspot baseline growth."
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
extensions:
  workflow_route_baseline:
    start_head_sha: "d7b766b9c4f7c8df771e06f3c8a1a60129035087"
    version: 1
id_source: "generated"
---
## Summary

Complete the task advance semantic-result round trip

Extend the compact external-agent protocol so task advance accepts a typed SemanticResult bound to the issued transition and state fingerprint, validates and persists it through the same supervisor engine used by task run, executes subsequent deterministic transitions, and returns the next bounded packet without exposing lifecycle choreography. Keep each packet at or below 2 KiB and preserve fail-closed replay and authority semantics.

## Scope

- In scope: Extend the compact external-agent protocol so task advance accepts a typed SemanticResult bound to the issued transition and state fingerprint, validates and persists it through the same supervisor engine used by task run, executes subsequent deterministic transitions, and returns the next bounded packet without exposing lifecycle choreography. Keep each packet at or below 2 KiB and preserve fail-closed replay and authority semantics.
- Out of scope: unrelated refactors not required for "Complete the task advance semantic-result round trip".

## Plan

1. Reuse the canonical AgentSemanticResult contract and add a task advance result input envelope bound to task_id, transition_id, role, and state_fingerprint; reject stale, mismatched, malformed, or replayed results before mutation. 2. Expose only compact work-order and result-schema references plus one deterministic return invocation in the agent packet, keeping the serialized packet at or below 2 KiB and free of Git/PR/verify/finish/integrate choreography. 3. Feed accepted results into the same persisted supervisor episode and lifecycle operation registry used by task run, execute all newly eligible deterministic operations within the existing bound, and emit the next semantic/approval/wait/terminal packet. 4. Add direct and branch_pr E2E fixtures for planning, implementation, evaluator, stale fingerprint, duplicate result, crash recovery, and terminal convergence; prove task run and task advance do not fork lifecycle behavior. 5. Run focused suites and the full critical/static/size/policy gates, then record structured verification and evaluator evidence.

## Verify Steps

1. Run focused task advance packet, result-ingestion, AgentSemanticResult validation, supervisor episode, stale-fingerprint, replay, and recovery tests. Expected: a valid result advances the same state machine as task run; malformed, stale, mismatched, or replayed results fail closed without duplicate effects. 2. Run direct and branch_pr external-agent E2E fixtures from task creation through terminal state. Expected: after task creation the external agent uses only task advance plus semantic-result files; Agentplane owns all Git, worktree, PR, verification, evaluator, integration, and cleanup transitions; every emitted packet is at most 2048 bytes and has one representation per field. 3. Run bun run typecheck, bun run lint:core, bun run knip:check, bun run hotspots:check, node .agentplane/policy/check-routing.mjs, and bun run test:critical. Expected: all gates pass without Knip or hotspot baseline growth.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
