---
id: "202607221848-VBV9B1"
title: "Replace route string dispatch with typed WorkflowStep decisions"
result_summary: "pre-merge closure"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 11
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
  state: "approved"
  updated_at: "2026-07-24T22:14:51.805Z"
  updated_by: "ORCHESTRATOR"
  note: "Approved as the first critical-path alpha.2 leaf under the existing full v0.7 refactor authorization."
verification:
  state: "needs_rework"
  updated_at: "2026-07-25T20:14:53.732Z"
  updated_by: "TESTER"
  note: "Hosted Core CI verify-static failed: dependency-cruiser found three circular imports among workflow-step, projections, factory, reducer, and branch modules. Local bun run arch:check reproduces the failure; break the cycles and rerun the architecture gate."
  attempts: 1
quality_review:
  state: "pass"
  provenance: "evaluator_supplied"
  updated_at: "2026-07-25T20:04:58.421Z"
  updated_by: "EVALUATOR"
  note: "Typed workflow decisions preserve safety gates and Hermes execution authority."
  evaluated_sha: "dc166cc393b91a88caa4993c62616726a926ab15"
  blueprint_digest: "29b8f03842c5dea829e9ba611d12b62dcd826876a111b44387855830b4d0a64f"
  evidence_refs:
    - ".agentplane/tasks/202607221848-VBV9B1/README.md"
    - ".agentplane/tasks/202607221848-VBV9B1/quality/20260725-200458421-recovery-context/quality-report.json"
    - ".agentplane/tasks/202607221848-VBV9B1/quality/20260725-200458421-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202607221848-VBV9B1/quality/20260725-200458421-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202607221848-VBV9B1/blueprint/resolved-snapshot.json"
    - "bun test packages/agentplane/src/commands/shared/workflow-step.test.ts; bun test packages/agentplane/src/commands/shared/workflow-step-projections.test.ts; bun test packages/agentplane/src/commands/hermes/hermes.command.test.ts; bun test packages/agentplane/src/cli/run-cli.core.route-decision.test.ts; bun run test:critical; bun run guards:check; bun run lifecycle:invariants"
  findings:
    - "No blocking findings after independent review and the final regression matrix."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Implement the single typed WorkflowStep decision boundary, operation registry, compatibility projections, and lifecycle parity fixtures without semantic route-string inference."
  -
    author: "CODER"
    body: "Verified: pre-merge closure packet is ready for the task PR."
events:
  -
    type: "status"
    at: "2026-07-24T22:15:24.501Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Implement the single typed WorkflowStep decision boundary, operation registry, compatibility projections, and lifecycle parity fixtures without semantic route-string inference."
  -
    type: "verify"
    at: "2026-07-25T20:04:39.054Z"
    author: "TESTER"
    state: "ok"
    note: "Verified typed WorkflowStep authority: workflow-step (21/21), projections (16/16), Hermes (18/18), and CLI route decisions (10/10) pass. typecheck, critical CLI (11/11 chunks), format, lint, knip, hotspots, policy routing, guards, and lifecycle invariants pass. Independent review found no remaining blocker."
  -
    type: "status"
    at: "2026-07-25T20:05:23.510Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: pre-merge closure packet is ready for the task PR."
  -
    type: "verify"
    at: "2026-07-25T20:14:53.732Z"
    author: "TESTER"
    state: "needs_rework"
    note: "Hosted Core CI verify-static failed: dependency-cruiser found three circular imports among workflow-step, projections, factory, reducer, and branch modules. Local bun run arch:check reproduces the failure; break the cycles and rerun the architecture gate."
doc_version: 3
doc_updated_at: "2026-07-25T20:14:54.365Z"
doc_updated_by: "CODER"
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
    ### 2026-07-25T20:04:39.054Z — VERIFY — ok

    By: TESTER

    Note: Verified typed WorkflowStep authority: workflow-step (21/21), projections (16/16), Hermes (18/18), and CLI route decisions (10/10) pass. typecheck, critical CLI (11/11 chunks), format, lint, knip, hotspots, policy routing, guards, and lifecycle invariants pass. Independent review found no remaining blocker.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-24T22:15:24.501Z, excerpt_hash=sha256:81d13ec3ef8cff47794690d511e2f03db6c6a41e05d0ec23effb27ff1b59656b

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607221848-VBV9B1-replace-route-string-dispatch-with-typed-workflo/.agentplane/tasks/202607221848-VBV9B1/blueprint/resolved-snapshot.json
    - old_digest: 29b8f03842c5dea829e9ba611d12b62dcd826876a111b44387855830b4d0a64f
    - current_digest: 29b8f03842c5dea829e9ba611d12b62dcd826876a111b44387855830b4d0a64f
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607221848-VBV9B1

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202607221848-VBV9B1
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    ### 2026-07-25T20:14:53.732Z — VERIFY — needs_rework

    By: TESTER

    Note: Hosted Core CI verify-static failed: dependency-cruiser found three circular imports among workflow-step, projections, factory, reducer, and branch modules. Local bun run arch:check reproduces the failure; break the cycles and rerun the architecture gate.
    Attempts: 1

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-25T20:05:23.511Z, excerpt_hash=sha256:81d13ec3ef8cff47794690d511e2f03db6c6a41e05d0ec23effb27ff1b59656b

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607221848-VBV9B1-replace-route-string-dispatch-with-typed-workflo/.agentplane/tasks/202607221848-VBV9B1/blueprint/resolved-snapshot.json
    - old_digest: 29b8f03842c5dea829e9ba611d12b62dcd826876a111b44387855830b4d0a64f
    - current_digest: 29b8f03842c5dea829e9ba611d12b62dcd826876a111b44387855830b4d0a64f
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607221848-VBV9B1

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane task next-action 202607221848-VBV9B1 --remote --explain
    - diagnostic_command: agentplane task next-action 202607221848-VBV9B1 --remote --explain
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: true
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

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
### 2026-07-25T20:04:39.054Z — VERIFY — ok

By: TESTER

Note: Verified typed WorkflowStep authority: workflow-step (21/21), projections (16/16), Hermes (18/18), and CLI route decisions (10/10) pass. typecheck, critical CLI (11/11 chunks), format, lint, knip, hotspots, policy routing, guards, and lifecycle invariants pass. Independent review found no remaining blocker.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-24T22:15:24.501Z, excerpt_hash=sha256:81d13ec3ef8cff47794690d511e2f03db6c6a41e05d0ec23effb27ff1b59656b

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607221848-VBV9B1-replace-route-string-dispatch-with-typed-workflo/.agentplane/tasks/202607221848-VBV9B1/blueprint/resolved-snapshot.json
- old_digest: 29b8f03842c5dea829e9ba611d12b62dcd826876a111b44387855830b4d0a64f
- current_digest: 29b8f03842c5dea829e9ba611d12b62dcd826876a111b44387855830b4d0a64f
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607221848-VBV9B1

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202607221848-VBV9B1
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

### 2026-07-25T20:14:53.732Z — VERIFY — needs_rework

By: TESTER

Note: Hosted Core CI verify-static failed: dependency-cruiser found three circular imports among workflow-step, projections, factory, reducer, and branch modules. Local bun run arch:check reproduces the failure; break the cycles and rerun the architecture gate.
Attempts: 1

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-25T20:05:23.511Z, excerpt_hash=sha256:81d13ec3ef8cff47794690d511e2f03db6c6a41e05d0ec23effb27ff1b59656b

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607221848-VBV9B1-replace-route-string-dispatch-with-typed-workflo/.agentplane/tasks/202607221848-VBV9B1/blueprint/resolved-snapshot.json
- old_digest: 29b8f03842c5dea829e9ba611d12b62dcd826876a111b44387855830b4d0a64f
- current_digest: 29b8f03842c5dea829e9ba611d12b62dcd826876a111b44387855830b4d0a64f
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607221848-VBV9B1

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane task next-action 202607221848-VBV9B1 --remote --explain
- diagnostic_command: agentplane task next-action 202607221848-VBV9B1 --remote --explain
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: true
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert the task implementation commit(s) while preserving unrelated task and migration state.
- Restore the previous compatibility view or persisted contract version.
- Re-run focused contract, migration, and type checks.

## Findings
