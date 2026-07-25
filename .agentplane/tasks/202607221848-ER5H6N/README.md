---
id: "202607221848-ER5H6N"
title: "Define digest-addressed KnowledgeRef contracts"
result_summary: "pre-merge closure"
status: "DONE"
priority: "high"
owner: "CODER"
revision: 11
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
  state: "ok"
  updated_at: "2026-07-25T00:32:22.992Z"
  updated_by: "TESTER"
  note: "PASS: independent adversarial review rejected forged receipts, parser/schema drift, projection symlink escape, and Unicode boundary drift; test:critical passed 11/11. Post-rebase focused verification passed 55/55 with schemas, types, format, lint, compatibility, spec examples, and hotspot gates green."
  attempts: 0
quality_review:
  state: "pass"
  provenance: "human_supplied"
  updated_at: "2026-07-25T00:33:05.573Z"
  updated_by: "HUMAN"
  note: "Independent adversarial review passed the RF-08 contract leaf with no remaining blockers."
  evaluated_sha: "c7f0d8b8433b5ff7a1818a15ef11c90151d53546"
  blueprint_digest: "3d481e7a7bf1aa47eed18b9d586376d441b3bbccc1851ce5bdd1dfedcb60fef0"
  evidence_refs:
    - ".agentplane/tasks/202607221848-ER5H6N/README.md"
    - ".agentplane/tasks/202607221848-ER5H6N/quality/20260725-003305573-recovery-context/quality-report.json"
    - ".agentplane/tasks/202607221848-ER5H6N/quality/20260725-003305573-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202607221848-ER5H6N/quality/20260725-003305573-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202607221848-ER5H6N/blueprint/resolved-snapshot.json"
    - "commit:c7f0d8b8433b5ff7a1818a15ef11c90151d53546"
    - "packages/core/src/runner/knowledge-ref.test.ts"
    - "packages/agentplane/src/context/knowledge-ref.test.ts"
    - "bun run test:critical (11/11 chunks in independent review)"
    - "post-rebase focused verification (55/55 tests)"
  findings:
    - "Forged prepared receipts, unsupported parser routes, selectorless missing reasons, and repository-escaping source or projection symlinks are rejected."
    - "Public Draft-07 schema and runtime parsing agree on canonical selector encoding, ascending ranges, reason/ref bounds, and Unicode code-point length limits."
    - "Focused tests, critical suite, typecheck, schema sync, spec examples, compatibility baseline, ESLint, Prettier, hotspot guard, and diff checks passed on the reviewed implementation."
commit:
  hash: "c7f0d8b8433b5ff7a1818a15ef11c90151d53546"
  message: "🧠 ER5H6N context: add digest-addressed knowledge refs"
comments:
  -
    author: "CODER"
    body: "Start: Define strict digest-addressed KnowledgeRef contracts, deterministic resolution and stale/missing receipts, then verify bounded runtime excerpts without creating a second context pack."
  -
    author: "CODER"
    body: "Verified: pre-merge closure packet is ready for the task PR."
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
  -
    type: "verify"
    at: "2026-07-25T00:32:22.992Z"
    author: "TESTER"
    state: "ok"
    note: "PASS: independent adversarial review rejected forged receipts, parser/schema drift, projection symlink escape, and Unicode boundary drift; test:critical passed 11/11. Post-rebase focused verification passed 55/55 with schemas, types, format, lint, compatibility, spec examples, and hotspot gates green."
  -
    type: "status"
    at: "2026-07-25T00:33:38.549Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: pre-merge closure packet is ready for the task PR."
doc_version: 3
doc_updated_at: "2026-07-25T00:33:38.550Z"
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

    ### 2026-07-25T00:32:22.992Z — VERIFY — ok

    By: TESTER

    Note: PASS: independent adversarial review rejected forged receipts, parser/schema drift, projection symlink escape, and Unicode boundary drift; test:critical passed 11/11. Post-rebase focused verification passed 55/55 with schemas, types, format, lint, compatibility, spec examples, and hotspot gates green.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-24T22:26:09.785Z, excerpt_hash=sha256:e0a28fae052431332f5b445eac80ed7582457c8d3a88fac7abd2596dba299882

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
    - diagnostic_command: none
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

    - Observation: All supported KnowledgeRef kinds resolve to digest-linked source identities; stale/missing states withhold content; bounded excerpt receipts preserve context-pack.md. A redundant macOS critical rerun completed the 50-run RF-04 replay logic but Finder-created .DS_Store files caused cleanup-only ENOTEMPTY after the assertions.
      Impact: RF-08 contract semantics and its required gates are verified. The unrelated macOS temporary-directory cleanup race remains a release-reliability follow-up, not a KnowledgeRef correctness failure.
      Resolution: Accept RF-08 and create a separate narrow reliability task to make RF-04 temporary cleanup retry-safe before stable 0.7.0.
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

### 2026-07-25T00:32:22.992Z — VERIFY — ok

By: TESTER

Note: PASS: independent adversarial review rejected forged receipts, parser/schema drift, projection symlink escape, and Unicode boundary drift; test:critical passed 11/11. Post-rebase focused verification passed 55/55 with schemas, types, format, lint, compatibility, spec examples, and hotspot gates green.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-24T22:26:09.785Z, excerpt_hash=sha256:e0a28fae052431332f5b445eac80ed7582457c8d3a88fac7abd2596dba299882

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
- diagnostic_command: none
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

- Observation: All supported KnowledgeRef kinds resolve to digest-linked source identities; stale/missing states withhold content; bounded excerpt receipts preserve context-pack.md. A redundant macOS critical rerun completed the 50-run RF-04 replay logic but Finder-created .DS_Store files caused cleanup-only ENOTEMPTY after the assertions.
  Impact: RF-08 contract semantics and its required gates are verified. The unrelated macOS temporary-directory cleanup race remains a release-reliability follow-up, not a KnowledgeRef correctness failure.
  Resolution: Accept RF-08 and create a separate narrow reliability task to make RF-04 temporary cleanup retry-safe before stable 0.7.0.
