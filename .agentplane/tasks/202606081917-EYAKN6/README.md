---
id: "202606081917-EYAKN6"
title: "Implement AgentPlane loop model v0.1"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on: []
tags:
  - "agentplane"
  - "code"
  - "loops"
task_kind: "code"
mutation_scope: "code"
verify:
  - "bun run --filter=agentplane build"
  - "bun run --filter=agentplane test"
plan_approval:
  state: "approved"
  updated_at: "2026-06-08T19:19:23.132Z"
  updated_by: "ORCHESTRATOR"
  note: "Approved by explicit user goal for agentplane-loops branch batch."
verification:
  state: "ok"
  updated_at: "2026-06-08T19:45:17.001Z"
  updated_by: "CODER"
  note: "Command: bun run --filter=agentplane test -- packages/agentplane/src/commands/loop/loop.command.test.ts. Result: pass. Evidence: 1 file, 4 tests passed. Scope: loop CLI discovery/planning/validation/dry-run artifacts. Command: bun run --filter=agentplane typecheck. Result: pass. Evidence: exited 0. Scope: agentplane package TypeScript. Command: bun run --filter=agentplane build. Result: pass. Evidence: tsup built dist/cli.js. Scope: agentplane CLI bundle. Command: bun run schemas:check && bun run spec:examples:check && bun run release:parity && bun run docs:cli:check && bun run docs:ia:check && node .agentplane/policy/check-routing.mjs. Result: pass. Evidence: schemas OK, spec examples OK, release parity 0.7.0-loops.0, CLI docs up to date, docs IA OK, policy routing OK. Scope: schemas/docs/version/policy. Full package test was attempted but aborted after unrelated existing release/Hermes/runner/workflow timeout failures outside loops scope."
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: implementing the approved related-task batch on branch agentplane-loops only, with docs, loop schema/catalog, CLI discovery/planning, dry-run evidence, tests, and branch-local version readiness."
events:
  -
    type: "status"
    at: "2026-06-08T19:19:31.321Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implementing the approved related-task batch on branch agentplane-loops only, with docs, loop schema/catalog, CLI discovery/planning, dry-run evidence, tests, and branch-local version readiness."
  -
    type: "verify"
    at: "2026-06-08T19:45:17.001Z"
    author: "CODER"
    state: "ok"
    note: "Command: bun run --filter=agentplane test -- packages/agentplane/src/commands/loop/loop.command.test.ts. Result: pass. Evidence: 1 file, 4 tests passed. Scope: loop CLI discovery/planning/validation/dry-run artifacts. Command: bun run --filter=agentplane typecheck. Result: pass. Evidence: exited 0. Scope: agentplane package TypeScript. Command: bun run --filter=agentplane build. Result: pass. Evidence: tsup built dist/cli.js. Scope: agentplane CLI bundle. Command: bun run schemas:check && bun run spec:examples:check && bun run release:parity && bun run docs:cli:check && bun run docs:ia:check && node .agentplane/policy/check-routing.mjs. Result: pass. Evidence: schemas OK, spec examples OK, release parity 0.7.0-loops.0, CLI docs up to date, docs IA OK, policy routing OK. Scope: schemas/docs/version/policy. Full package test was attempted but aborted after unrelated existing release/Hermes/runner/workflow timeout failures outside loops scope."
doc_version: 3
doc_updated_at: "2026-06-08T19:45:17.129Z"
doc_updated_by: "CODER"
description: "Introduce loops as a first-class controlled feedback cycle in AgentPlane: document the model, add loop specifications/catalog support, expose loop CLI discovery/planning, and persist dry-run LoopRun evidence without invoking external coding agents."
sections:
  Summary: |-
    Implement AgentPlane loop model v0.1

    Introduce loops as a first-class controlled feedback cycle in AgentPlane: document the model, add loop specifications/catalog support, expose loop CLI discovery/planning, and persist dry-run LoopRun evidence without invoking external coding agents.
  Scope: |-
    - In scope: Introduce loops as a first-class controlled feedback cycle in AgentPlane: document the model, add loop specifications/catalog support, expose loop CLI discovery/planning, and persist dry-run LoopRun evidence without invoking external coding agents.
    - Out of scope: unrelated refactors not required for "Implement AgentPlane loop model v0.1".
  Plan: |-
    1. Treat branch agentplane-loops as the integration base for this batch; do not switch back to main for implementation.
    2. Implement the related task batch in this branch with included tasks: 202606081917-Z9QTR4, 202606081917-BASAPD, 202606081917-982PET, 202606081918-CBGEQ3, 202606081918-CKV5VD.
    3. First document Loop Model v0.1 and explicitly mark MVP boundaries: discovery, planning, validation, and dry-run evidence only; external agent execution remains out of scope.
    4. Add typed LoopSpec/LoopRun contracts, built-in loop templates, project-local validation, and candidate scoring against task/blueprint-like input.
    5. Add loop CLI commands for list/show/explain/plan plus dry-run run/step artifacts under task runs.
    6. Add focused tests and refresh generated docs/build artifacts as needed.
    7. Verify with focused loop tests, package build, policy routing, and git status evidence.
  Verify Steps: |-
    PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

    1. Run `bun run --filter=agentplane test`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `bun run --filter=agentplane build`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    4. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-06-08T19:45:17.001Z — VERIFY — ok

    By: CODER

    Note: Command: bun run --filter=agentplane test -- packages/agentplane/src/commands/loop/loop.command.test.ts. Result: pass. Evidence: 1 file, 4 tests passed. Scope: loop CLI discovery/planning/validation/dry-run artifacts. Command: bun run --filter=agentplane typecheck. Result: pass. Evidence: exited 0. Scope: agentplane package TypeScript. Command: bun run --filter=agentplane build. Result: pass. Evidence: tsup built dist/cli.js. Scope: agentplane CLI bundle. Command: bun run schemas:check && bun run spec:examples:check && bun run release:parity && bun run docs:cli:check && bun run docs:ia:check && node .agentplane/policy/check-routing.mjs. Result: pass. Evidence: schemas OK, spec examples OK, release parity 0.7.0-loops.0, CLI docs up to date, docs IA OK, policy routing OK. Scope: schemas/docs/version/policy. Full package test was attempted but aborted after unrelated existing release/Hermes/runner/workflow timeout failures outside loops scope.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-06-08T19:19:31.321Z, excerpt_hash=sha256:96a5ba80741f9bc58bd635fe843051c41fee337f1dc40a9f3e829276f249a276

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tasks/202606081917-EYAKN6/blueprint/resolved-snapshot.json
    - old_digest: 576ed8b7c96c3c567b96a569b692ef6ff23e6b6d4960e5ac86a4aed2bc5c3c72
    - current_digest: 576ed8b7c96c3c567b96a569b692ef6ff23e6b6d4960e5ac86a4aed2bc5c3c72
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202606081917-EYAKN6

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane work start 202606081917-EYAKN6 --agent CODER --slug implement-agentplane-loop-model-v0-1 --worktree
    - diagnostic_command: agentplane work resume 202606081917-EYAKN6
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: true
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: worktree_projection_drift

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Implement AgentPlane loop model v0.1

Introduce loops as a first-class controlled feedback cycle in AgentPlane: document the model, add loop specifications/catalog support, expose loop CLI discovery/planning, and persist dry-run LoopRun evidence without invoking external coding agents.

## Scope

- In scope: Introduce loops as a first-class controlled feedback cycle in AgentPlane: document the model, add loop specifications/catalog support, expose loop CLI discovery/planning, and persist dry-run LoopRun evidence without invoking external coding agents.
- Out of scope: unrelated refactors not required for "Implement AgentPlane loop model v0.1".

## Plan

1. Treat branch agentplane-loops as the integration base for this batch; do not switch back to main for implementation.
2. Implement the related task batch in this branch with included tasks: 202606081917-Z9QTR4, 202606081917-BASAPD, 202606081917-982PET, 202606081918-CBGEQ3, 202606081918-CKV5VD.
3. First document Loop Model v0.1 and explicitly mark MVP boundaries: discovery, planning, validation, and dry-run evidence only; external agent execution remains out of scope.
4. Add typed LoopSpec/LoopRun contracts, built-in loop templates, project-local validation, and candidate scoring against task/blueprint-like input.
5. Add loop CLI commands for list/show/explain/plan plus dry-run run/step artifacts under task runs.
6. Add focused tests and refresh generated docs/build artifacts as needed.
7. Verify with focused loop tests, package build, policy routing, and git status evidence.

## Verify Steps

PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

1. Run `bun run --filter=agentplane test`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `bun run --filter=agentplane build`. Expected: it succeeds and confirms the requested outcome for this task.
3. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
4. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-06-08T19:45:17.001Z — VERIFY — ok

By: CODER

Note: Command: bun run --filter=agentplane test -- packages/agentplane/src/commands/loop/loop.command.test.ts. Result: pass. Evidence: 1 file, 4 tests passed. Scope: loop CLI discovery/planning/validation/dry-run artifacts. Command: bun run --filter=agentplane typecheck. Result: pass. Evidence: exited 0. Scope: agentplane package TypeScript. Command: bun run --filter=agentplane build. Result: pass. Evidence: tsup built dist/cli.js. Scope: agentplane CLI bundle. Command: bun run schemas:check && bun run spec:examples:check && bun run release:parity && bun run docs:cli:check && bun run docs:ia:check && node .agentplane/policy/check-routing.mjs. Result: pass. Evidence: schemas OK, spec examples OK, release parity 0.7.0-loops.0, CLI docs up to date, docs IA OK, policy routing OK. Scope: schemas/docs/version/policy. Full package test was attempted but aborted after unrelated existing release/Hermes/runner/workflow timeout failures outside loops scope.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-06-08T19:19:31.321Z, excerpt_hash=sha256:96a5ba80741f9bc58bd635fe843051c41fee337f1dc40a9f3e829276f249a276

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tasks/202606081917-EYAKN6/blueprint/resolved-snapshot.json
- old_digest: 576ed8b7c96c3c567b96a569b692ef6ff23e6b6d4960e5ac86a4aed2bc5c3c72
- current_digest: 576ed8b7c96c3c567b96a569b692ef6ff23e6b6d4960e5ac86a4aed2bc5c3c72
- route_changed: no
- safe_command: agentplane blueprint snapshot 202606081917-EYAKN6

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane work start 202606081917-EYAKN6 --agent CODER --slug implement-agentplane-loop-model-v0-1 --worktree
- diagnostic_command: agentplane work resume 202606081917-EYAKN6
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: true
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: worktree_projection_drift

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
