---
id: "202607281655-YMPY8Y"
title: "Authorize replacement evaluator episodes after terminal failure"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "evaluator"
  - "recovery"
  - "refactor"
  - "supervisor"
  - "v0.7"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-07-28T16:55:45.384Z"
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
    body: "Start: add the explicit, auditable replacement evaluator path required to continue the blocked semantic review without replaying the failed provider operation."
events:
  -
    type: "status"
    at: "2026-07-28T16:55:51.958Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: add the explicit, auditable replacement evaluator path required to continue the blocked semantic review without replaying the failed provider operation."
doc_version: 3
doc_updated_at: "2026-07-28T17:31:51.253Z"
doc_updated_by: "CODER"
description: "Allow an explicitly authorized replacement evaluator episode after a terminal operation_failed journal without reopening or mutating the failed operation. Preserve durable history, usage, and effect-in-doubt fail-closed behavior so a pre-provider failure does not permanently block an independent semantic review."
sections:
  Summary: |-
    Authorize replacement evaluator episodes after terminal failure

    Allow an explicitly authorized replacement evaluator episode after a terminal operation_failed journal without reopening or mutating the failed operation. Preserve durable history, usage, and effect-in-doubt fail-closed behavior so a pre-provider failure does not permanently block an independent semantic review.
  Scope: |-
    - In scope: Allow an explicitly authorized replacement evaluator episode after a terminal operation_failed journal without reopening or mutating the failed operation. Preserve durable history, usage, and effect-in-doubt fail-closed behavior so a pre-provider failure does not permanently block an independent semantic review.
    - Out of scope: unrelated refactors not required for "Authorize replacement evaluator episodes after terminal failure".
  Plan: "1. Inspect the terminal evaluator journal and existing provider boundary to define a distinct replacement operation, not a retry. 2. Add an explicit replacement-only execution path that preserves failed operation history and accumulated usage, starts a new bounded episode, and refuses effect_in_doubt or implicit replay. 3. Cover operation_failed replacement, terminal-effect rejection, default no-retry behavior, and command-level persistence. 4. Run focused supervisor/evaluator tests, typecheck, formatting, routing, and one real read-only replacement provider episode before publishing."
  Verify Steps: |-
    1. Run `bunx vitest run packages/core/src/runner/supervisor-execution-episode.test.ts packages/agentplane/src/commands/evaluator/evaluator-execute.command.test.ts --testTimeout 60000`.
       Expected: default retry remains blocked; `--replacement` creates a distinct bounded evaluator episode linked to the failed operation; `effect_in_doubt` and exhausted budgets remain terminal.

    2. Run `bun run typecheck && bun run format:changed`.
       Expected: type and formatting gates pass.

    3. Run `node .agentplane/policy/check-routing.mjs`.
       Expected: policy routing validation passes.

    4. After integration, run one real `--replacement` evaluator episode for `202607221850-8HBF4J`.
       Expected: the original `operation_failed` record is retained and a distinct provider work order completes without replaying it.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
extensions:
  workflow_route_baseline:
    start_head_sha: "a9b9d6a834893013c30b5046d0c618cb23553638"
    version: 1
id_source: "generated"
---
## Summary

Authorize replacement evaluator episodes after terminal failure

Allow an explicitly authorized replacement evaluator episode after a terminal operation_failed journal without reopening or mutating the failed operation. Preserve durable history, usage, and effect-in-doubt fail-closed behavior so a pre-provider failure does not permanently block an independent semantic review.

## Scope

- In scope: Allow an explicitly authorized replacement evaluator episode after a terminal operation_failed journal without reopening or mutating the failed operation. Preserve durable history, usage, and effect-in-doubt fail-closed behavior so a pre-provider failure does not permanently block an independent semantic review.
- Out of scope: unrelated refactors not required for "Authorize replacement evaluator episodes after terminal failure".

## Plan

1. Inspect the terminal evaluator journal and existing provider boundary to define a distinct replacement operation, not a retry. 2. Add an explicit replacement-only execution path that preserves failed operation history and accumulated usage, starts a new bounded episode, and refuses effect_in_doubt or implicit replay. 3. Cover operation_failed replacement, terminal-effect rejection, default no-retry behavior, and command-level persistence. 4. Run focused supervisor/evaluator tests, typecheck, formatting, routing, and one real read-only replacement provider episode before publishing.

## Verify Steps

1. Run `bunx vitest run packages/core/src/runner/supervisor-execution-episode.test.ts packages/agentplane/src/commands/evaluator/evaluator-execute.command.test.ts --testTimeout 60000`.
   Expected: default retry remains blocked; `--replacement` creates a distinct bounded evaluator episode linked to the failed operation; `effect_in_doubt` and exhausted budgets remain terminal.

2. Run `bun run typecheck && bun run format:changed`.
   Expected: type and formatting gates pass.

3. Run `node .agentplane/policy/check-routing.mjs`.
   Expected: policy routing validation passes.

4. After integration, run one real `--replacement` evaluator episode for `202607221850-8HBF4J`.
   Expected: the original `operation_failed` record is retained and a distinct provider work order completes without replaying it.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
