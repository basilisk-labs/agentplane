---
id: "202606121018-DCEZ9B"
title: "Add loop evaluation fixtures"
status: "TODO"
priority: "high"
owner: "TESTER"
revision: 4
origin:
  system: "manual"
depends_on:
  - "202606121018-DP0P4B"
tags:
  - "evaluation"
  - "fixtures"
  - "loops"
  - "test"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "quality.regression"
verify:
  - "bun run --filter=agentplane build"
  - "bun run --filter=agentplane test -- packages/agentplane/src/loops packages/agentplane/src/commands/loop"
  - "node .agentplane/policy/check-routing.mjs"
plan_approval:
  state: "approved"
  updated_at: "2026-06-12T10:22:54.888Z"
  updated_by: "ORCHESTRATOR"
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
doc_updated_at: "2026-06-12T10:21:28.933Z"
doc_updated_by: "PLANNER"
description: "Add deterministic fixture runs for successful repair, no-progress retry, contract failure, evaluator disagreement, and policy-blocked change so metrics and score-aware decisions have regression coverage."
sections:
  Summary: |-
    Add loop evaluation fixtures

    Add deterministic fixture runs for successful repair, no-progress retry, contract failure, evaluator disagreement, and policy-blocked change so metrics and score-aware decisions have regression coverage.
  Scope: |-
    - In scope: Add deterministic fixture runs for successful repair, no-progress retry, contract failure, evaluator disagreement, and policy-blocked change so metrics and score-aware decisions have regression coverage.
    - Out of scope: unrelated refactors not required for "Add loop evaluation fixtures".
  Plan: |-
    1. Add deterministic loop evaluation fixtures for successful repair, no-progress retry, failed step contract, evaluator disagreement, and policy-blocked change.
    2. Keep fixtures small and local to the loop test surface; do not require network or external providers.
    3. Assert expected metric scores, score deltas, failed contracts, and LoopStopDecision outcomes for each fixture.
    4. Add regression coverage that prevents no-progress retry loops from continuing indefinitely.
    5. Document fixture intent in test names or fixture metadata so future loop.improve work can reuse them.
  Verify Steps: |-
    1. Run `bun run --filter=agentplane test -- packages/agentplane/src/loops packages/agentplane/src/commands/loop`. Expected: all loop evaluation fixtures pass and assert expected decisions/scores.
    2. Run `bun run --filter=agentplane build`. Expected: fixture helpers and test-only types compile.
    3. Run `node .agentplane/policy/check-routing.mjs`. Expected: policy routing remains valid.
    4. Inspect fixture names/data. Expected: coverage includes success, no-progress retry, failed contract, evaluator disagreement, and policy-blocked paths.
    5. Confirm tests do not require network, secrets, or non-dry-run external agent execution.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Add loop evaluation fixtures

Add deterministic fixture runs for successful repair, no-progress retry, contract failure, evaluator disagreement, and policy-blocked change so metrics and score-aware decisions have regression coverage.

## Scope

- In scope: Add deterministic fixture runs for successful repair, no-progress retry, contract failure, evaluator disagreement, and policy-blocked change so metrics and score-aware decisions have regression coverage.
- Out of scope: unrelated refactors not required for "Add loop evaluation fixtures".

## Plan

1. Add deterministic loop evaluation fixtures for successful repair, no-progress retry, failed step contract, evaluator disagreement, and policy-blocked change.
2. Keep fixtures small and local to the loop test surface; do not require network or external providers.
3. Assert expected metric scores, score deltas, failed contracts, and LoopStopDecision outcomes for each fixture.
4. Add regression coverage that prevents no-progress retry loops from continuing indefinitely.
5. Document fixture intent in test names or fixture metadata so future loop.improve work can reuse them.

## Verify Steps

1. Run `bun run --filter=agentplane test -- packages/agentplane/src/loops packages/agentplane/src/commands/loop`. Expected: all loop evaluation fixtures pass and assert expected decisions/scores.
2. Run `bun run --filter=agentplane build`. Expected: fixture helpers and test-only types compile.
3. Run `node .agentplane/policy/check-routing.mjs`. Expected: policy routing remains valid.
4. Inspect fixture names/data. Expected: coverage includes success, no-progress retry, failed contract, evaluator disagreement, and policy-blocked paths.
5. Confirm tests do not require network, secrets, or non-dry-run external agent execution.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
