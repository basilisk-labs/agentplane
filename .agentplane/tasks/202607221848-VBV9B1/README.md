---
id: "202607221848-VBV9B1"
title: "Replace route string dispatch with typed WorkflowStep decisions"
status: "TODO"
priority: "high"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on:
  - "202607221846-YGWMA2"
  - "202607221848-0ZAB1F"
tags:
  - "milestone-alpha2"
  - "refactor"
  - "rf-06"
  - "routing"
  - "v0.7"
  - "wave-contracts"
  - "workflow-step"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "code.branch_pr"
verify:
  - "bun run guards:check"
  - "bun run lifecycle:invariants"
  - "bun run test:critical"
  - "bun run typecheck"
plan_approval:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
  attempts: 0
commit: null
comments: []
events: []
doc_version: 3
doc_updated_at: "2026-07-22T18:48:48.546Z"
doc_updated_by: "PLANNER"
description: "RF-06b: reduce RouteState to typed CLI operation, agent episode, approval, human input, wait, and terminal steps with idempotency keys and postconditions."
sections:
  Summary: |-
    Replace route string dispatch with typed WorkflowStep decisions

    RF-06b: reduce RouteState to typed CLI operation, agent episode, approval, human input, wait, and terminal steps with idempotency keys and postconditions.
  Scope: |-
    - In scope: one pure RouteState-to-WorkflowStep reducer, operation registry identifiers, idempotency/postconditions, compatibility projections for brief/next-action/guidance/bootstrap, and removal of duplicate route classifications including existing-worktree drift.
    - Out of scope: supervisor side-effect execution and semantic evaluation.
  Plan: |-
    1. Define the discriminated WorkflowStep union and operation registry.
    2. Build a single pure reducer from structured route state.
    3. Project blocker, phase, checkout, exact argv, guidance, and compatibility JSON from the same decision.
    4. Remove prose inference and repeated command-string classification from migrated paths.
    5. Add parity fixtures for every lifecycle phase, including an already-created task worktree without PR metadata.
  Verify Steps: |-
    1. Evaluate the route fixture matrix. Expected: one typed step deterministically supplies phase, blocker, authoritative checkout, operation id, and compatibility command.
    2. Exercise included-batch and worktree states without relying on title/comment phrases. Expected: structured metadata decides the route; ambiguity becomes typed input/repair.
    3. Create an existing worktree fixture with missing PR metadata. Expected: the reducer resumes it and never instructs duplicate creation.
    4. Run route/oracle/guidance/bootstrap tests, `bun run lifecycle:invariants`, `bun run guards:check`, and `bun run typecheck`.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert the task implementation commit(s) while preserving unrelated task and migration state.
    - Restore the previous compatibility view or persisted contract version.
    - Re-run focused contract, migration, and type checks.
  Findings: ""
id_source: "generated"
---
## Summary

Replace route string dispatch with typed WorkflowStep decisions

RF-06b: reduce RouteState to typed CLI operation, agent episode, approval, human input, wait, and terminal steps with idempotency keys and postconditions.

## Scope

- In scope: one pure RouteState-to-WorkflowStep reducer, operation registry identifiers, idempotency/postconditions, compatibility projections for brief/next-action/guidance/bootstrap, and removal of duplicate route classifications including existing-worktree drift.
- Out of scope: supervisor side-effect execution and semantic evaluation.

## Plan

1. Define the discriminated WorkflowStep union and operation registry.
2. Build a single pure reducer from structured route state.
3. Project blocker, phase, checkout, exact argv, guidance, and compatibility JSON from the same decision.
4. Remove prose inference and repeated command-string classification from migrated paths.
5. Add parity fixtures for every lifecycle phase, including an already-created task worktree without PR metadata.

## Verify Steps

1. Evaluate the route fixture matrix. Expected: one typed step deterministically supplies phase, blocker, authoritative checkout, operation id, and compatibility command.
2. Exercise included-batch and worktree states without relying on title/comment phrases. Expected: structured metadata decides the route; ambiguity becomes typed input/repair.
3. Create an existing worktree fixture with missing PR metadata. Expected: the reducer resumes it and never instructs duplicate creation.
4. Run route/oracle/guidance/bootstrap tests, `bun run lifecycle:invariants`, `bun run guards:check`, and `bun run typecheck`.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert the task implementation commit(s) while preserving unrelated task and migration state.
- Restore the previous compatibility view or persisted contract version.
- Re-run focused contract, migration, and type checks.

## Findings
