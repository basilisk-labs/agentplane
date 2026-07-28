---
id: "202607221850-WM9X1G"
title: "Journal resumable context-ingestion phases"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 8
origin:
  system: "manual"
depends_on:
  - "202607221908-9M2FBQ"
tags:
  - "context"
  - "ingest"
  - "milestone-beta1"
  - "refactor"
  - "rf-18"
  - "saga"
  - "v0.7"
  - "wave-supervisor"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "code.branch_pr"
verify:
  - "bun run task-state:check"
  - "bun run test:critical"
  - "bun run typecheck"
plan_approval:
  state: "approved"
  updated_at: "2026-07-28T07:46:15.347Z"
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
    author: "ORCHESTRATOR"
    body: "Start: implement the approved resumable ingest journal vertical slice, preserving semantic work as an agent-owned phase."
events:
  -
    type: "status"
    at: "2026-07-28T07:46:21.325Z"
    author: "ORCHESTRATOR"
    from: "TODO"
    to: "DOING"
    note: "Start: implement the approved resumable ingest journal vertical slice, preserving semantic work as an agent-owned phase."
doc_version: 3
doc_updated_at: "2026-07-28T07:46:21.325Z"
doc_updated_by: "ORCHESTRATOR"
description: "RF-18: persist an idempotent assimilation run journal so task creation, manifest, pack, semantic apply, reindex, validation, evaluation, and finalize phases can safely resume or repair."
sections:
  Summary: |-
    Journal resumable context-ingestion phases

    RF-18: persist an idempotent assimilation run journal so task creation, manifest, pack, semantic apply, reindex, validation, evaluation, and finalize phases can safely resume or repair.
  Scope: |-
    - In scope: versioned run journal, exact task/run identity, phase fingerprints and idempotency keys, crash injection, retry/resume/repair, divergence diagnosis, lock ownership, and context doctor visibility.
    - Out of scope: a fake distributed transaction across task backend and filesystem.
  Plan: "1. Add a versioned run journal with immutable run identity, phase fingerprints, receipts, and postconditions for deterministic ingest boundaries. 2. Resume the matching run instead of using task-list diffs; persist source lock, task creation receipt, and task-pack completion idempotently. 3. Surface incomplete or divergent run state through context doctor with a bounded recovery route, without automating semantic apply. 4. Add fault-injection seams and focused tests for crash/retry, same-versus-changed fingerprints, and manifest/task/pack divergence. 5. Run declared task-state, critical, focused context, and type checks; record evidence."
  Verify Steps: |-
    1. Crash after each journal phase and resume. Expected: execution continues from the first incomplete operation with no duplicate task, lock, manifest, pack, or semantic apply.
    2. Create manifest/task/pack divergence. Expected: context doctor reports the exact inconsistency and a bounded repair action.
    3. Repeat a completed phase with the same and a changed fingerprint. Expected: same is a no-op; changed is rejected or explicitly repaired.
    4. Run focused context ingest/doctor tests, task-state check, and typecheck.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert the migrated vertical slice while preserving the typed contracts consumed by later tasks.
    - Restore the previous compatibility path behind an explicit feature/compatibility boundary.
    - Re-run lifecycle, focused, and type checks before resuming dependent work.
  Findings: ""
extensions:
  workflow_route_baseline:
    start_head_sha: "89a82f010479eb2583e414fb49c930d4819b5777"
    version: 1
id_source: "generated"
---
## Summary

Journal resumable context-ingestion phases

RF-18: persist an idempotent assimilation run journal so task creation, manifest, pack, semantic apply, reindex, validation, evaluation, and finalize phases can safely resume or repair.

## Scope

- In scope: versioned run journal, exact task/run identity, phase fingerprints and idempotency keys, crash injection, retry/resume/repair, divergence diagnosis, lock ownership, and context doctor visibility.
- Out of scope: a fake distributed transaction across task backend and filesystem.

## Plan

1. Add a versioned run journal with immutable run identity, phase fingerprints, receipts, and postconditions for deterministic ingest boundaries. 2. Resume the matching run instead of using task-list diffs; persist source lock, task creation receipt, and task-pack completion idempotently. 3. Surface incomplete or divergent run state through context doctor with a bounded recovery route, without automating semantic apply. 4. Add fault-injection seams and focused tests for crash/retry, same-versus-changed fingerprints, and manifest/task/pack divergence. 5. Run declared task-state, critical, focused context, and type checks; record evidence.

## Verify Steps

1. Crash after each journal phase and resume. Expected: execution continues from the first incomplete operation with no duplicate task, lock, manifest, pack, or semantic apply.
2. Create manifest/task/pack divergence. Expected: context doctor reports the exact inconsistency and a bounded repair action.
3. Repeat a completed phase with the same and a changed fingerprint. Expected: same is a no-op; changed is rejected or explicitly repaired.
4. Run focused context ingest/doctor tests, task-state check, and typecheck.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert the migrated vertical slice while preserving the typed contracts consumed by later tasks.
- Restore the previous compatibility path behind an explicit feature/compatibility boundary.
- Re-run lifecycle, focused, and type checks before resuming dependent work.

## Findings
