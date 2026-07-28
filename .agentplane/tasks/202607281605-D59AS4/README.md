---
id: "202607281605-D59AS4"
title: "Recover completed evaluator supervisor journals for new episodes"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 9
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "supervisor"
  - "evaluator"
  - "recovery"
  - "refactor"
  - "v0.7"
verify:
  - "bun run --filter=@agentplaneorg/core build && bunx vitest run packages/core/src/runner/supervisor-execution-episode.test.ts packages/agentplane/src/commands/evaluator/evaluator-execute.command.test.ts"
  - "bun run typecheck"
  - "bun run format:changed"
  - "node .agentplane/policy/check-routing.mjs"
plan_approval:
  state: "approved"
  updated_at: "2026-07-28T16:06:02.030Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
  attempts: 0
commit:
  hash: "395c5c3248bc87364098cfa7f7d51f2987025489"
  message: "fix(evaluator): reopen completed stale supervisor journals"
comments:
  -
    author: "CODER"
    body: "Start: investigate and repair safe reopening of completed stale-state evaluator supervisor journals without weakening terminal protection for ambiguous provider effects."
  -
    author: "CODER"
    body: "Implementation: reopened only completed stale-state evaluator journals; preserved failed and ambiguous-effect terminal stops; added focused regression coverage."
events:
  -
    type: "status"
    at: "2026-07-28T16:06:20.538Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: investigate and repair safe reopening of completed stale-state evaluator supervisor journals without weakening terminal protection for ambiguous provider effects."
  -
    type: "status"
    at: "2026-07-28T16:14:59.272Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Implementation: reopened only completed stale-state evaluator journals; preserved failed and ambiguous-effect terminal stops; added focused regression coverage."
doc_version: 3
doc_updated_at: "2026-07-28T16:14:59.272Z"
doc_updated_by: "CODER"
description: "Allow a completed evaluator supervisor episode stopped only for stale state to reopen safely for a new provider episode, while preserving terminal protection for ambiguous or failed provider effects. This unblocks the 0.7 context-assimilation task without changing CURATOR semantics."
sections:
  Summary: |-
    Recover completed evaluator supervisor journals for new episodes

    Allow a completed evaluator supervisor episode stopped only for stale state to reopen safely for a new provider episode, while preserving terminal protection for ambiguous or failed provider effects. This unblocks the 0.7 context-assimilation task without changing CURATOR semantics.
  Scope: |-
    - In scope: Allow a completed evaluator supervisor episode stopped only for stale state to reopen safely for a new provider episode, while preserving terminal protection for ambiguous or failed provider effects. This unblocks the 0.7 context-assimilation task without changing CURATOR semantics.
    - Out of scope: unrelated refactors not required for "Recover completed evaluator supervisor journals for new episodes".
  Plan: "1. Inspect evaluator supervisor journal transition and recovery guards. 2. Permit only a completed stale-state journal to refresh its fingerprint and create a new episode. 3. Keep operation_failed and effect_in_doubt terminal. 4. Add focused unit and command-level regression tests, then run a real repeat evaluator episode. 5. Publish and integrate through the protected branch_pr route."
  Verify Steps: |-
    1. Confirm the safe reopen transition.
    Command: bun run --filter=@agentplaneorg/core build && bunx vitest run packages/core/src/runner/supervisor-execution-episode.test.ts packages/agentplane/src/commands/evaluator/evaluator-execute.command.test.ts
    Expected: a completed stale-state evaluator journal starts a second bounded episode; operation_failed and effect_in_doubt remain terminal.

    2. Check types and formatting.
    Command: bun run typecheck && bun run format:changed
    Expected: no type or formatting regression.

    3. Check policy routing.
    Command: node .agentplane/policy/check-routing.mjs
    Expected: routing validation succeeds.

    4. Exercise a repeated live evaluator episode.
    Expected: the second read-only provider episode succeeds and cumulative usage increases without reset.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
extensions:
  workflow_route_baseline:
    start_head_sha: "c8df32a5e5a1b160e9ab74e0ae6f3a97224d186f"
    version: 1
id_source: "generated"
---
## Summary

Recover completed evaluator supervisor journals for new episodes

Allow a completed evaluator supervisor episode stopped only for stale state to reopen safely for a new provider episode, while preserving terminal protection for ambiguous or failed provider effects. This unblocks the 0.7 context-assimilation task without changing CURATOR semantics.

## Scope

- In scope: Allow a completed evaluator supervisor episode stopped only for stale state to reopen safely for a new provider episode, while preserving terminal protection for ambiguous or failed provider effects. This unblocks the 0.7 context-assimilation task without changing CURATOR semantics.
- Out of scope: unrelated refactors not required for "Recover completed evaluator supervisor journals for new episodes".

## Plan

1. Inspect evaluator supervisor journal transition and recovery guards. 2. Permit only a completed stale-state journal to refresh its fingerprint and create a new episode. 3. Keep operation_failed and effect_in_doubt terminal. 4. Add focused unit and command-level regression tests, then run a real repeat evaluator episode. 5. Publish and integrate through the protected branch_pr route.

## Verify Steps

1. Confirm the safe reopen transition.
Command: bun run --filter=@agentplaneorg/core build && bunx vitest run packages/core/src/runner/supervisor-execution-episode.test.ts packages/agentplane/src/commands/evaluator/evaluator-execute.command.test.ts
Expected: a completed stale-state evaluator journal starts a second bounded episode; operation_failed and effect_in_doubt remain terminal.

2. Check types and formatting.
Command: bun run typecheck && bun run format:changed
Expected: no type or formatting regression.

3. Check policy routing.
Command: node .agentplane/policy/check-routing.mjs
Expected: routing validation succeeds.

4. Exercise a repeated live evaluator episode.
Expected: the second read-only provider episode succeeds and cumulative usage increases without reset.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
