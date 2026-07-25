---
id: "202607221848-ER5H6N"
title: "Define digest-addressed KnowledgeRef contracts"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 8
origin:
  system: "manual"
depends_on:
  - "202607221848-0ZAB1F"
tags:
  - "context"
  - "knowledge"
  - "milestone-alpha2"
  - "refactor"
  - "rf-08"
  - "v0.7"
  - "wave-contracts"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "code.branch_pr"
verify:
  - "bun run schemas:check"
  - "bun run test:critical"
  - "bun run typecheck"
plan_approval:
  state: "approved"
  updated_at: "2026-07-24T22:16:26.325Z"
  updated_by: "ORCHESTRATOR"
  note: "Approved as the independent KnowledgeRef contract leaf for alpha.2 under the existing full v0.7 authorization."
verification:
  state: "needs_rework"
  updated_at: "2026-07-24T22:25:53.948Z"
  updated_by: "TESTER"
  note: "Rework: the branch contains only task lifecycle and PR artifacts; no KnowledgeRef implementation or focused contract tests are present yet."
  attempts: 1
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Define strict digest-addressed KnowledgeRef contracts, deterministic resolution and stale/missing receipts, then verify bounded runtime excerpts without creating a second context pack."
events:
  -
    type: "status"
    at: "2026-07-24T22:17:12.985Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Define strict digest-addressed KnowledgeRef contracts, deterministic resolution and stale/missing receipts, then verify bounded runtime excerpts without creating a second context pack."
  -
    type: "verify"
    at: "2026-07-24T22:25:53.948Z"
    author: "TESTER"
    state: "needs_rework"
    note: "Rework: the branch contains only task lifecycle and PR artifacts; no KnowledgeRef implementation or focused contract tests are present yet."
doc_version: 3
doc_updated_at: "2026-07-24T22:26:09.785Z"
doc_updated_by: "CODER"
description: "RF-08: standardize reproducible references into the existing context knowledge plane with digest, reason, retrieval provenance, score, requirement, freshness, and bounded excerpts."
sections:
  Summary: |-
    Define digest-addressed KnowledgeRef contracts

    RF-08: standardize reproducible references into the existing context knowledge plane with digest, reason, retrieval provenance, score, requirement, freshness, and bounded excerpts.
  Scope: |-
    - In scope: KnowledgeRef schema/types/fixtures, resolver and digest/freshness validation, retrieval provenance, optional score, reason/required semantics, prepared excerpt metadata, and preservation of context-pack.md as a distinct assimilation artifact.
    - Out of scope: FTS implementation, semantic reranking, or a second wiki/CAS.
  Plan: |-
    1. Define the canonical ref grammar and versioned KnowledgeRef schema.
    2. Resolve refs through existing context show/storage adapters and validate digests/freshness.
    3. Add bounded excerpt and omission/missing receipts without copying durable knowledge into a new plane.
    4. Thread refs through prepared runtime contracts behind compatibility views.
    5. Add exact, stale, missing, alias, graph, and source fixtures.
  Verify Steps: |-
    1. Resolve each supported knowledge kind by canonical ref. Expected: the returned object matches the stored digest and source identity.
    2. Modify or remove a referenced item. Expected: stale and missing states are explicit and cannot be presented as fresh context.
    3. Build a runtime excerpt. Expected: it records reason, source span, digest, limits, and omitted/missing receipt while context-pack.md remains unchanged.
    4. Run `bun run schemas:check`, focused context contract tests, and `bun run typecheck`.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-07-24T22:25:53.948Z — VERIFY — needs_rework

    By: TESTER

    Note: Rework: the branch contains only task lifecycle and PR artifacts; no KnowledgeRef implementation or focused contract tests are present yet.
    Attempts: 1

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-24T22:17:12.985Z, excerpt_hash=sha256:e0a28fae052431332f5b445eac80ed7582457c8d3a88fac7abd2596dba299882

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607221848-ER5H6N-define-digest-addressed-knowledgeref-contracts/.agentplane/tasks/202607221848-ER5H6N/blueprint/resolved-snapshot.json
    - old_digest: 3d481e7a7bf1aa47eed18b9d586376d441b3bbccc1851ce5bdd1dfedcb60fef0
    - current_digest: 3d481e7a7bf1aa47eed18b9d586376d441b3bbccc1851ce5bdd1dfedcb60fef0
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607221848-ER5H6N

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202607221848-ER5H6N
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert the task implementation commit(s) while preserving unrelated task and migration state.
    - Restore the previous compatibility view or persisted contract version.
    - Re-run focused contract, migration, and type checks.
  Findings: |-
    - Observation: git diff --name-status main...HEAD lists only .agentplane/tasks/202607221848-ER5H6N lifecycle artifacts.
      Impact: None of the four Verify Steps can be established from the current branch.
      Resolution: Implement the approved RF-08 contract, resolver, bounded excerpt receipts, fixtures, and focused tests before re-verification.
id_source: "generated"
---
## Summary

Define digest-addressed KnowledgeRef contracts

RF-08: standardize reproducible references into the existing context knowledge plane with digest, reason, retrieval provenance, score, requirement, freshness, and bounded excerpts.

## Scope

- In scope: KnowledgeRef schema/types/fixtures, resolver and digest/freshness validation, retrieval provenance, optional score, reason/required semantics, prepared excerpt metadata, and preservation of context-pack.md as a distinct assimilation artifact.
- Out of scope: FTS implementation, semantic reranking, or a second wiki/CAS.

## Plan

1. Define the canonical ref grammar and versioned KnowledgeRef schema.
2. Resolve refs through existing context show/storage adapters and validate digests/freshness.
3. Add bounded excerpt and omission/missing receipts without copying durable knowledge into a new plane.
4. Thread refs through prepared runtime contracts behind compatibility views.
5. Add exact, stale, missing, alias, graph, and source fixtures.

## Verify Steps

1. Resolve each supported knowledge kind by canonical ref. Expected: the returned object matches the stored digest and source identity.
2. Modify or remove a referenced item. Expected: stale and missing states are explicit and cannot be presented as fresh context.
3. Build a runtime excerpt. Expected: it records reason, source span, digest, limits, and omitted/missing receipt while context-pack.md remains unchanged.
4. Run `bun run schemas:check`, focused context contract tests, and `bun run typecheck`.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-07-24T22:25:53.948Z — VERIFY — needs_rework

By: TESTER

Note: Rework: the branch contains only task lifecycle and PR artifacts; no KnowledgeRef implementation or focused contract tests are present yet.
Attempts: 1

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-24T22:17:12.985Z, excerpt_hash=sha256:e0a28fae052431332f5b445eac80ed7582457c8d3a88fac7abd2596dba299882

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607221848-ER5H6N-define-digest-addressed-knowledgeref-contracts/.agentplane/tasks/202607221848-ER5H6N/blueprint/resolved-snapshot.json
- old_digest: 3d481e7a7bf1aa47eed18b9d586376d441b3bbccc1851ce5bdd1dfedcb60fef0
- current_digest: 3d481e7a7bf1aa47eed18b9d586376d441b3bbccc1851ce5bdd1dfedcb60fef0
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607221848-ER5H6N

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202607221848-ER5H6N
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert the task implementation commit(s) while preserving unrelated task and migration state.
- Restore the previous compatibility view or persisted contract version.
- Re-run focused contract, migration, and type checks.

## Findings

- Observation: git diff --name-status main...HEAD lists only .agentplane/tasks/202607221848-ER5H6N lifecycle artifacts.
  Impact: None of the four Verify Steps can be established from the current branch.
  Resolution: Implement the approved RF-08 contract, resolver, bounded excerpt receipts, fixtures, and focused tests before re-verification.
