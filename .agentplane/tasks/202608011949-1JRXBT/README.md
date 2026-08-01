---
id: "202608011949-1JRXBT"
title: "Assimilate v0.6.25-v0.6.26 maintenance fixes into 0.7"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on:
  - "202607221908-PWFH5K"
  - "202607221854-4FNZPG"
tags:
  - "code"
  - "migration"
  - "release"
  - "v0.7"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "quality.regression"
verify:
  - "bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/shared/task-handoff.test.ts packages/agentplane/src/commands/pr/integrate/internal/finalize.test.ts packages/agentplane/src/commands/shared/pr-meta.test.ts packages/agentplane/src/commands/pr/integrate/verify.test.ts packages/agentplane/src/commands/task/direct-task-supervisor.test.ts packages/agentplane/src/commands/task/direct-task-supervisor-formal-operation.test.ts"
  - "bunx vitest --config vitest.workspace.ts run packages/agentplane/src/cli/run-cli.core.route-decision.direct-closeout.test.ts"
  - "bun run typecheck"
  - "bun run test:critical"
  - "bun run ci:contract"
plan_approval:
  state: "approved"
  updated_at: "2026-08-01T19:50:23.706Z"
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
    at: "2026-08-01T22:10:12.605Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
doc_version: 3
doc_updated_at: "2026-08-01T22:26:47.334Z"
doc_updated_by: "CODER"
description: "Port the behaviorally missing stable-line fixes for direct runner closeout, immutable integration finalization, and isolated streaming verification into the refactored 0.7 architecture; retain stronger 0.7 cleanup behavior and add regression coverage."
sections:
  Summary: |-
    Assimilate v0.6.25-v0.6.26 maintenance fixes into 0.7

    Port the behaviorally missing stable-line fixes for direct runner closeout, immutable integration finalization, and isolated streaming verification into the refactored 0.7 architecture; retain stronger 0.7 cleanup behavior and add regression coverage.
  Scope: |-
    - In scope: Port the behaviorally missing stable-line fixes for direct runner closeout, immutable integration finalization, and isolated streaming verification into the refactored 0.7 architecture; retain stronger 0.7 cleanup behavior and add regression coverage.
    - Out of scope: unrelated refactors not required for "Assimilate v0.6.25-v0.6.26 maintenance fixes into 0.7".
  Plan: |-
    1. Reproduce the v0.6.25-v0.6.26 regressions against the refactored 0.7 route, integration, and verification boundaries.
    2. Port behavioral fixes rather than maintenance-branch commits: terminal direct runner handoff, immutable branch-head finalization, bounded streaming verify output, and runtime environment isolation.
    3. Retain the stronger 0.7 cleanup and route-state implementations where they supersede maintenance code.
    4. Add focused regression tests, then run critical and full contract gates.
    5. Add this repair task to the mandatory rc.2 dependency closure before integration.
  Verify Steps: |-
    1. Run `bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/shared/task-handoff.test.ts packages/agentplane/src/commands/pr/integrate/internal/finalize.test.ts packages/agentplane/src/commands/shared/pr-meta.test.ts packages/agentplane/src/commands/pr/integrate/verify.test.ts packages/agentplane/src/commands/task/direct-task-supervisor.test.ts packages/agentplane/src/commands/task/direct-task-supervisor-formal-operation.test.ts`. Expected: terminal handoff, immutable diffstat, bounded streaming verification, environment isolation, visible failure tails, and direct supervisor closeout regressions pass.
    2. Run `bunx vitest --config vitest.workspace.ts run packages/agentplane/src/cli/run-cli.core.route-decision.direct-closeout.test.ts`. Expected: a terminal successful runner yields a TESTER verification episode with no executable `verify-show` transition.
    3. Run `bun run typecheck`. Expected: the typed WorkflowStep and runner-operation changes compile under the repository TypeScript contract.
    4. Run `bun run test:critical`. Expected: all critical CLI chunks pass.
    5. Run `bun run ci:contract`. Expected: contract, architecture, task-state, formatting, lint, and coverage ratchets pass.
    6. Inspect the final diff against the v0.6.25-v0.6.26 maintenance branch. Expected: only behavior missing from the refactored 0.7 architecture is ported; the stronger current cleanup implementation remains unchanged.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
extensions:
  workflow_route_baseline:
    start_head_sha: "f9997263341ca21006d9df679d646c7477db8747"
    version: 1
id_source: "generated"
---
## Summary

Assimilate v0.6.25-v0.6.26 maintenance fixes into 0.7

Port the behaviorally missing stable-line fixes for direct runner closeout, immutable integration finalization, and isolated streaming verification into the refactored 0.7 architecture; retain stronger 0.7 cleanup behavior and add regression coverage.

## Scope

- In scope: Port the behaviorally missing stable-line fixes for direct runner closeout, immutable integration finalization, and isolated streaming verification into the refactored 0.7 architecture; retain stronger 0.7 cleanup behavior and add regression coverage.
- Out of scope: unrelated refactors not required for "Assimilate v0.6.25-v0.6.26 maintenance fixes into 0.7".

## Plan

1. Reproduce the v0.6.25-v0.6.26 regressions against the refactored 0.7 route, integration, and verification boundaries.
2. Port behavioral fixes rather than maintenance-branch commits: terminal direct runner handoff, immutable branch-head finalization, bounded streaming verify output, and runtime environment isolation.
3. Retain the stronger 0.7 cleanup and route-state implementations where they supersede maintenance code.
4. Add focused regression tests, then run critical and full contract gates.
5. Add this repair task to the mandatory rc.2 dependency closure before integration.

## Verify Steps

1. Run `bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/shared/task-handoff.test.ts packages/agentplane/src/commands/pr/integrate/internal/finalize.test.ts packages/agentplane/src/commands/shared/pr-meta.test.ts packages/agentplane/src/commands/pr/integrate/verify.test.ts packages/agentplane/src/commands/task/direct-task-supervisor.test.ts packages/agentplane/src/commands/task/direct-task-supervisor-formal-operation.test.ts`. Expected: terminal handoff, immutable diffstat, bounded streaming verification, environment isolation, visible failure tails, and direct supervisor closeout regressions pass.
2. Run `bunx vitest --config vitest.workspace.ts run packages/agentplane/src/cli/run-cli.core.route-decision.direct-closeout.test.ts`. Expected: a terminal successful runner yields a TESTER verification episode with no executable `verify-show` transition.
3. Run `bun run typecheck`. Expected: the typed WorkflowStep and runner-operation changes compile under the repository TypeScript contract.
4. Run `bun run test:critical`. Expected: all critical CLI chunks pass.
5. Run `bun run ci:contract`. Expected: contract, architecture, task-state, formatting, lint, and coverage ratchets pass.
6. Inspect the final diff against the v0.6.25-v0.6.26 maintenance branch. Expected: only behavior missing from the refactored 0.7 architecture is ported; the stronger current cleanup implementation remains unchanged.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
