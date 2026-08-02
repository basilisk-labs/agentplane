---
id: "202608021534-YN84E1"
title: "Harden the v0.7.1 guided lifecycle and canonical help surface"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on: []
tags:
  - "trust-boundary"
  - "ux"
  - "v0.7.1"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "code.branch_pr"
verify:
  - "bunx vitest --config vitest.workspace.ts run --project cli-core packages/agentplane/src/cli/run-cli.core.help-contract.test.ts packages/agentplane/src/cli/run-cli.core.help-snap.test.ts packages/agentplane/src/cli/run-cli.core.task-advance.test.ts packages/agentplane/src/cli/run-cli.core.task-guided.test.ts packages/agentplane/src/cli/run-cli.core.task-run.test.ts"
  - "bun run typecheck"
  - "bun run lint:core"
  - "bun run docs:cli:check"
  - "bun run docs:bootstrap:check"
  - "bun run docs:ia:check"
  - "node .agentplane/policy/check-routing.mjs"
  - "bun run test:critical"
  - "node scripts/qualification/check-v0.7.1-product-contract.mjs"
plan_approval:
  state: "approved"
  updated_at: "2026-08-02T19:28:09.490Z"
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
    at: "2026-08-02T19:28:52.499Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
doc_version: 3
doc_updated_at: "2026-08-02T20:07:09.507Z"
doc_updated_by: "CODER"
description: "Make task begin stop at a real semantic planning boundary, make task complete fail closed without observed checks plus evaluator or explicit human receipt, keep compatibility flows advanced-only, and cap default help at 10-12 canonical operations centered on task advance and task run."
sections:
  Summary: |-
    Harden the v0.7.1 guided lifecycle and canonical help surface

    Make task begin stop at a real semantic planning boundary, make task complete fail closed without observed checks plus evaluator or explicit human receipt, keep compatibility flows advanced-only, and cap default help at 10-12 canonical operations centered on task advance and task run.
  Scope: |-
    - In scope: Make task begin stop at a real semantic planning boundary, make task complete fail closed without observed checks plus evaluator or explicit human receipt, keep compatibility flows advanced-only, and cap default help at 10-12 canonical operations centered on task advance and task run.
    - Out of scope: unrelated refactors not required for "Harden the v0.7.1 guided lifecycle and canonical help surface".
  Plan: |-
    1. Map the current task begin, task complete, task advance, task run, quickstart, README, and default help paths to one explicit supervisor contract while preserving advanced compatibility entrypoints.
    2. Change task begin so it creates or prepares the task and stops at a typed semantic planning boundary without synthesizing or approving a task-specific plan.
    3. Change task complete so normal closure fails closed unless matching observed checks and an evaluator or explicit human verdict are present; retain any compatibility bypass only as an explicit unsafe advanced path with durable evidence.
    4. Make task advance and task run share the same state-machine boundary semantics, promote them in README and quickstart, and limit default help to 10-12 canonical operations while moving aliases, recovery, and maintainer commands behind advanced discovery.
    5. Add focused contract and regression tests for every allowed and rejected path, then run docs:check, test:critical, and the v0.7.1 product-contract gate.
  Verify Steps: |-
    1. Run the focused cli-core lifecycle/help suite listed in task verify. Expected: begin stops on a PLANNER semantic boundary; normal complete rejects missing observed checks or missing evaluator/human verdict; the unsafe compatibility override requires explicit operator confirmation and leaves durable history; advance and run expose the same state-machine boundary.
    2. Run typecheck, lint:core, docs:cli:check, docs:bootstrap:check, docs:ia:check, and the policy routing check. Expected: default help exposes no more than 12 canonical operations, promotes task advance/task run, generated docs are current, and repository policy remains valid.
    3. Run test:critical and scripts/qualification/check-v0.7.1-product-contract.mjs. Expected: all trust-boundary, recovery, package, compatibility-ratchet, and v0.7.1 product gates pass.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
extensions:
  workflow_route_baseline:
    start_head_sha: "ed94f65a0ff27eaf0b0add2413780630a87e838b"
    version: 1
id_source: "generated"
---
## Summary

Harden the v0.7.1 guided lifecycle and canonical help surface

Make task begin stop at a real semantic planning boundary, make task complete fail closed without observed checks plus evaluator or explicit human receipt, keep compatibility flows advanced-only, and cap default help at 10-12 canonical operations centered on task advance and task run.

## Scope

- In scope: Make task begin stop at a real semantic planning boundary, make task complete fail closed without observed checks plus evaluator or explicit human receipt, keep compatibility flows advanced-only, and cap default help at 10-12 canonical operations centered on task advance and task run.
- Out of scope: unrelated refactors not required for "Harden the v0.7.1 guided lifecycle and canonical help surface".

## Plan

1. Map the current task begin, task complete, task advance, task run, quickstart, README, and default help paths to one explicit supervisor contract while preserving advanced compatibility entrypoints.
2. Change task begin so it creates or prepares the task and stops at a typed semantic planning boundary without synthesizing or approving a task-specific plan.
3. Change task complete so normal closure fails closed unless matching observed checks and an evaluator or explicit human verdict are present; retain any compatibility bypass only as an explicit unsafe advanced path with durable evidence.
4. Make task advance and task run share the same state-machine boundary semantics, promote them in README and quickstart, and limit default help to 10-12 canonical operations while moving aliases, recovery, and maintainer commands behind advanced discovery.
5. Add focused contract and regression tests for every allowed and rejected path, then run docs:check, test:critical, and the v0.7.1 product-contract gate.

## Verify Steps

1. Run the focused cli-core lifecycle/help suite listed in task verify. Expected: begin stops on a PLANNER semantic boundary; normal complete rejects missing observed checks or missing evaluator/human verdict; the unsafe compatibility override requires explicit operator confirmation and leaves durable history; advance and run expose the same state-machine boundary.
2. Run typecheck, lint:core, docs:cli:check, docs:bootstrap:check, docs:ia:check, and the policy routing check. Expected: default help exposes no more than 12 canonical operations, promotes task advance/task run, generated docs are current, and repository policy remains valid.
3. Run test:critical and scripts/qualification/check-v0.7.1-product-contract.mjs. Expected: all trust-boundary, recovery, package, compatibility-ratchet, and v0.7.1 product gates pass.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
