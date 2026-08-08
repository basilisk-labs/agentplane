---
id: "202608062023-V3WHE9"
title: "Add safe local evidence retention, statistics, and garbage collection"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 12
origin:
  system: "manual"
depends_on:
  - "202608061850-BZT3D9"
tags:
  - "code"
  - "evidence"
  - "maintenance"
  - "v0.7.5"
task_kind: "code"
mutation_scope: "code"
risk_flags:
  - "merge"
blueprint_request: "code.branch_pr"
verify:
  - "bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/evidence packages/agentplane/src/cli/run-cli.core.evidence.test.ts"
  - "bun run test:critical"
  - "bun run typecheck"
  - "bun run docs:cli:check"
plan_approval:
  state: "approved"
  updated_at: "2026-08-06T20:23:34.963Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "needs_rework"
  updated_at: "2026-08-06T22:28:55.868Z"
  updated_by: "TESTER"
  note: "Evidence unit/maintenance suites pass (8 tests), CLI contract passes (3 tests), typecheck/lint/docs/build pass, and live dry runs report 17,457 tracked evidence files / 145,406,551 bytes, 189 valid reachable objects, 19 safe compact candidates, and 0 GC candidates. Critical suite remains blocked by the shared compatibility ratchet owned by 202608061850-BZT3D9."
  attempts: 1
execution_route:
  frozen: true
  reason_codes:
    - "repository_branch_pr_floor"
  repository_mode: "branch_pr"
  requested_mode: "auto"
  schema_version: 1
  selected_mode: "branch_pr"
commit: null
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "CODER"
    body: "Implementation: local evidence stats, dry-run-first hard-link compaction, and hash-verified retention GC now protect reachable, active, failing, and release-pinned evidence; apply requires a clean repository and explicit confirmation."
events:
  -
    type: "status"
    at: "2026-08-06T22:11:26.005Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-08-06T22:28:40.203Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Implementation: local evidence stats, dry-run-first hard-link compaction, and hash-verified retention GC now protect reachable, active, failing, and release-pinned evidence; apply requires a clean repository and explicit confirmation."
  -
    type: "verify"
    at: "2026-08-06T22:28:55.868Z"
    author: "TESTER"
    state: "needs_rework"
    note: "Evidence unit/maintenance suites pass (8 tests), CLI contract passes (3 tests), typecheck/lint/docs/build pass, and live dry runs report 17,457 tracked evidence files / 145,406,551 bytes, 189 valid reachable objects, 19 safe compact candidates, and 0 GC candidates. Critical suite remains blocked by the shared compatibility ratchet owned by 202608061850-BZT3D9."
doc_version: 3
doc_updated_at: "2026-08-06T22:28:56.702Z"
doc_updated_by: "CODER"
description: "Add OSS evidence stats, compact, and gc surfaces with a dry-run-first retention model: keep task summaries, ACRs, receipts, fingerprints, object hashes, compact manifests, and final findings in Git; deduplicate large raw prompts, diffs, logs, provider JSONL, evaluator inputs, and replay corpora in the content-addressed object store; protect current failures and release evidence; require explicit apply authority before deleting only proven unreferenced or expired objects."
sections:
  Summary: |-
    Add safe local evidence retention, statistics, and garbage collection

    Add OSS evidence stats, compact, and gc surfaces with a dry-run-first retention model: keep task summaries, ACRs, receipts, fingerprints, object hashes, compact manifests, and final findings in Git; deduplicate large raw prompts, diffs, logs, provider JSONL, evaluator inputs, and replay corpora in the content-addressed object store; protect current failures and release evidence; require explicit apply authority before deleting only proven unreferenced or expired objects.
  Scope: |-
    - In scope: Add OSS evidence stats, compact, and gc surfaces with a dry-run-first retention model: keep task summaries, ACRs, receipts, fingerprints, object hashes, compact manifests, and final findings in Git; deduplicate large raw prompts, diffs, logs, provider JSONL, evaluator inputs, and replay corpora in the content-addressed object store; protect current failures and release evidence; require explicit apply authority before deleting only proven unreferenced or expired objects.
    - Out of scope: unrelated refactors not required for "Add safe local evidence retention, statistics, and garbage collection".
  Plan: "1. Define a local evidence inventory and reachability model separating immutable Git manifests from large content-addressed objects. 2. Add evidence stats with JSON and human output for tracked evidence, object counts and bytes, duplicates, reachable, pinned, expired, and collectible objects. 3. Add a dry-run-first compact path that only replaces supported duplicate large payloads with verified object references and refuses unsupported or dirty histories. 4. Add a dry-run-first gc path whose apply mode requires explicit authority and can delete only hash-verified unreferenced or retention-expired objects; never delete task summaries, ACRs, receipts, fingerprints, final findings, current failure evidence, or release-pinned evidence. 5. Add retention configuration with conservative defaults and fixtures for success/failure age, deduplication, pins, corrupted references, concurrent writers, interruption, and idempotency. 6. Document rollback/recovery and run critical compatibility checks."
  Verify Steps: |-
    - bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/evidence packages/agentplane/src/cli/run-cli.core.evidence.test.ts
    - bun run test:critical
    - bun run typecheck
    - bun run docs:cli:check
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-08-06T22:28:55.868Z — VERIFY — needs_rework

    By: TESTER

    Note: Evidence unit/maintenance suites pass (8 tests), CLI contract passes (3 tests), typecheck/lint/docs/build pass, and live dry runs report 17,457 tracked evidence files / 145,406,551 bytes, 189 valid reachable objects, 19 safe compact candidates, and 0 GC candidates. Critical suite remains blocked by the shared compatibility ratchet owned by 202608061850-BZT3D9.
    Attempts: 1

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-06T22:28:40.203Z, excerpt_hash=sha256:e03b6b8572c687ad65e25d32e0460d9ce86132acfcae68bbe78b35a8b1e469b2

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608062023-V3WHE9-add-safe-local-evidence-retention-statistics-and/.agentplane/tasks/202608062023-V3WHE9/blueprint/resolved-snapshot.json
    - old_digest: a3242977958400cf037cf84a545367555fb4ee1e5e843f158d09e81746ab2f18
    - current_digest: a3242977958400cf037cf84a545367555fb4ee1e5e843f158d09e81746ab2f18
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202608062023-V3WHE9

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202608062023-V3WHE9
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: The first critical chunk rejects the pre-0.7.5 reviewed compatibility candidate after the three new advanced evidence commands change CLI topology; no task-local critical behavior failed.
      Impact: Final pass and publication must wait for the centralized baseline update and rebase.
      Resolution: Merge BZT3D9, rebase V3WHE9, rerun evidence tests, CLI test, critical, typecheck, and docs check, then record pass.
extensions:
  workflow_route_baseline:
    start_head_sha: "0e1d30346d74b782d736e480700919077e532c5f"
    version: 1
id_source: "generated"
---
## Summary

Add safe local evidence retention, statistics, and garbage collection

Add OSS evidence stats, compact, and gc surfaces with a dry-run-first retention model: keep task summaries, ACRs, receipts, fingerprints, object hashes, compact manifests, and final findings in Git; deduplicate large raw prompts, diffs, logs, provider JSONL, evaluator inputs, and replay corpora in the content-addressed object store; protect current failures and release evidence; require explicit apply authority before deleting only proven unreferenced or expired objects.

## Scope

- In scope: Add OSS evidence stats, compact, and gc surfaces with a dry-run-first retention model: keep task summaries, ACRs, receipts, fingerprints, object hashes, compact manifests, and final findings in Git; deduplicate large raw prompts, diffs, logs, provider JSONL, evaluator inputs, and replay corpora in the content-addressed object store; protect current failures and release evidence; require explicit apply authority before deleting only proven unreferenced or expired objects.
- Out of scope: unrelated refactors not required for "Add safe local evidence retention, statistics, and garbage collection".

## Plan

1. Define a local evidence inventory and reachability model separating immutable Git manifests from large content-addressed objects. 2. Add evidence stats with JSON and human output for tracked evidence, object counts and bytes, duplicates, reachable, pinned, expired, and collectible objects. 3. Add a dry-run-first compact path that only replaces supported duplicate large payloads with verified object references and refuses unsupported or dirty histories. 4. Add a dry-run-first gc path whose apply mode requires explicit authority and can delete only hash-verified unreferenced or retention-expired objects; never delete task summaries, ACRs, receipts, fingerprints, final findings, current failure evidence, or release-pinned evidence. 5. Add retention configuration with conservative defaults and fixtures for success/failure age, deduplication, pins, corrupted references, concurrent writers, interruption, and idempotency. 6. Document rollback/recovery and run critical compatibility checks.

## Verify Steps

- bunx vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/evidence packages/agentplane/src/cli/run-cli.core.evidence.test.ts
- bun run test:critical
- bun run typecheck
- bun run docs:cli:check

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-08-06T22:28:55.868Z — VERIFY — needs_rework

By: TESTER

Note: Evidence unit/maintenance suites pass (8 tests), CLI contract passes (3 tests), typecheck/lint/docs/build pass, and live dry runs report 17,457 tracked evidence files / 145,406,551 bytes, 189 valid reachable objects, 19 safe compact candidates, and 0 GC candidates. Critical suite remains blocked by the shared compatibility ratchet owned by 202608061850-BZT3D9.
Attempts: 1

VerifyStepsRef: doc_version=3, doc_updated_at=2026-08-06T22:28:40.203Z, excerpt_hash=sha256:e03b6b8572c687ad65e25d32e0460d9ce86132acfcae68bbe78b35a8b1e469b2

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202608062023-V3WHE9-add-safe-local-evidence-retention-statistics-and/.agentplane/tasks/202608062023-V3WHE9/blueprint/resolved-snapshot.json
- old_digest: a3242977958400cf037cf84a545367555fb4ee1e5e843f158d09e81746ab2f18
- current_digest: a3242977958400cf037cf84a545367555fb4ee1e5e843f158d09e81746ab2f18
- route_changed: no
- safe_command: agentplane blueprint snapshot 202608062023-V3WHE9

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202608062023-V3WHE9
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: The first critical chunk rejects the pre-0.7.5 reviewed compatibility candidate after the three new advanced evidence commands change CLI topology; no task-local critical behavior failed.
  Impact: Final pass and publication must wait for the centralized baseline update and rebase.
  Resolution: Merge BZT3D9, rebase V3WHE9, rerun evidence tests, CLI test, critical, typecheck, and docs check, then record pass.
