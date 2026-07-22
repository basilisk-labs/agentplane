---
id: "202607221850-DRWR0V"
title: "Extract the shared typed workflow supervisor from Hermes"
status: "TODO"
priority: "high"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on:
  - "202607221908-9M2FBQ"
tags:
  - "hermes"
  - "milestone-beta1"
  - "refactor"
  - "rf-09"
  - "rf-25"
  - "supervisor"
  - "v0.7"
  - "wave-supervisor"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "code.branch_pr"
verify:
  - "bun run guards:check"
  - "bun run lifecycle:invariants"
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
doc_updated_at: "2026-07-22T18:50:11.032Z"
doc_updated_by: "PLANNER"
description: "RF-09/RF-25c: implement one in-process decide, execute, refresh, and audit loop over typed operations; make Hermes and CLI adapters use it without raw shell route execution."
sections:
  Summary: |-
    Extract the shared typed workflow supervisor from Hermes

    RF-09/RF-25c: implement one in-process decide, execute, refresh, and audit loop over typed operations; make Hermes and CLI adapters use it without raw shell route execution.
  Scope: |-
    - In scope: shared supervisor use case, typed operation registry/executor, state refresh after each operation, idempotency/postcondition enforcement, compatibility adapters for Hermes and CLI, uniform audit log, and hard stops for plan approval and semantic closeout.
    - Out of scope: full context/direct/branch_pr lifecycle automation, which is delivered by dependent vertical slices.
  Plan: |-
    1. Define supervisor input/output and typed operation executor ports.
    2. Move Hermes route classification and allowlisted execution onto the common reducer and registry.
    3. Execute at most one safe step, observe it, refresh state, and decide again until a typed stop.
    4. Reject raw shell strings, stale fingerprints, missing authority, plan approval, and semantic closeout.
    5. Add caller-parity, idempotency, audit, crash, and stop-condition fixtures.
  Verify Steps: |-
    1. Feed identical state through Hermes and CLI adapters. Expected: both produce the same typed step, operation result, refreshed fingerprint, and audit entry.
    2. Supply a raw shell route or unregistered operation. Expected: the supervisor rejects it before execution.
    3. Exercise approval, semantic closeout, wait, crash, and repeated-idempotency cases. Expected: bounded typed stops and no duplicated side effect.
    4. Run supervisor/Hermes/route tests, lifecycle invariants, guards, and typecheck.
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

Extract the shared typed workflow supervisor from Hermes

RF-09/RF-25c: implement one in-process decide, execute, refresh, and audit loop over typed operations; make Hermes and CLI adapters use it without raw shell route execution.

## Scope

- In scope: shared supervisor use case, typed operation registry/executor, state refresh after each operation, idempotency/postcondition enforcement, compatibility adapters for Hermes and CLI, uniform audit log, and hard stops for plan approval and semantic closeout.
- Out of scope: full context/direct/branch_pr lifecycle automation, which is delivered by dependent vertical slices.

## Plan

1. Define supervisor input/output and typed operation executor ports.
2. Move Hermes route classification and allowlisted execution onto the common reducer and registry.
3. Execute at most one safe step, observe it, refresh state, and decide again until a typed stop.
4. Reject raw shell strings, stale fingerprints, missing authority, plan approval, and semantic closeout.
5. Add caller-parity, idempotency, audit, crash, and stop-condition fixtures.

## Verify Steps

1. Feed identical state through Hermes and CLI adapters. Expected: both produce the same typed step, operation result, refreshed fingerprint, and audit entry.
2. Supply a raw shell route or unregistered operation. Expected: the supervisor rejects it before execution.
3. Exercise approval, semantic closeout, wait, crash, and repeated-idempotency cases. Expected: bounded typed stops and no duplicated side effect.
4. Run supervisor/Hermes/route tests, lifecycle invariants, guards, and typecheck.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert the migrated vertical slice while preserving the typed contracts consumed by later tasks.
- Restore the previous compatibility path behind an explicit feature/compatibility boundary.
- Re-run lifecycle, focused, and type checks before resuming dependent work.

## Findings
