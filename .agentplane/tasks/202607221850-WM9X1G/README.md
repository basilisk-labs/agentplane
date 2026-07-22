---
id: "202607221850-WM9X1G"
title: "Journal resumable context-ingestion phases"
status: "TODO"
priority: "high"
owner: "CODER"
revision: 5
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
  state: "pending"
  updated_at: null
  updated_by: null
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
doc_updated_at: "2026-07-22T18:50:14.033Z"
doc_updated_by: "PLANNER"
description: "RF-18: persist an idempotent assimilation run journal so task creation, manifest, pack, semantic apply, reindex, validation, evaluation, and finalize phases can safely resume or repair."
sections:
  Summary: |-
    Journal resumable context-ingestion phases

    RF-18: persist an idempotent assimilation run journal so task creation, manifest, pack, semantic apply, reindex, validation, evaluation, and finalize phases can safely resume or repair.
  Scope: |-
    - In scope: versioned run journal, exact task/run identity, phase fingerprints and idempotency keys, crash injection, retry/resume/repair, divergence diagnosis, lock ownership, and context doctor visibility.
    - Out of scope: a fake distributed transaction across task backend and filesystem.
  Plan: |-
    1. Define journal phases, state transitions, ownership, and recovery metadata.
    2. Persist exact typed mutation results before advancing phases.
    3. Make each filesystem/backend operation idempotent against its fingerprint and postconditions.
    4. Add resume and targeted repair commands/diagnostics.
    5. Inject crashes at every boundary and verify no duplicate task, lock, or applied knowledge.
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
id_source: "generated"
---
## Summary

Journal resumable context-ingestion phases

RF-18: persist an idempotent assimilation run journal so task creation, manifest, pack, semantic apply, reindex, validation, evaluation, and finalize phases can safely resume or repair.

## Scope

- In scope: versioned run journal, exact task/run identity, phase fingerprints and idempotency keys, crash injection, retry/resume/repair, divergence diagnosis, lock ownership, and context doctor visibility.
- Out of scope: a fake distributed transaction across task backend and filesystem.

## Plan

1. Define journal phases, state transitions, ownership, and recovery metadata.
2. Persist exact typed mutation results before advancing phases.
3. Make each filesystem/backend operation idempotent against its fingerprint and postconditions.
4. Add resume and targeted repair commands/diagnostics.
5. Inject crashes at every boundary and verify no duplicate task, lock, or applied knowledge.

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
