---
id: "202608062023-V3WHE9"
title: "Add safe local evidence retention, statistics, and garbage collection"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 8
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
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
  attempts: 0
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
events:
  -
    type: "status"
    at: "2026-08-06T22:11:26.005Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
doc_version: 3
doc_updated_at: "2026-08-06T22:11:26.005Z"
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
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
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
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
