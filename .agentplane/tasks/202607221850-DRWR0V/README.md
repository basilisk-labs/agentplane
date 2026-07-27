---
id: "202607221850-DRWR0V"
title: "Extract the shared typed workflow supervisor from Hermes"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 8
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
  state: "approved"
  updated_at: "2026-07-27T23:41:21.664Z"
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
    body: "Start: continue branch_pr task in the dedicated task worktree."
events:
  -
    type: "status"
    at: "2026-07-27T23:42:49.570Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
doc_version: 3
doc_updated_at: "2026-07-27T23:42:49.570Z"
doc_updated_by: "CODER"
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
extensions:
  agentplane.side_effect_authority:
    audit:
      -
        actor: "USER"
        at: "2026-07-27T23:43:01.343Z"
        authorityDigest: "sha256:dbce89022531053e8f681e2d0191c7d4fd2e95183f274c296728df6285c614f8"
        digest: "sha256:1ab233d4e140180a2f8968916b1986c45fd5605c52e58754871884baff956082"
        operationDigest: "sha256:6b9c1ca1f5682941b10ccdc69ca307304daddacd065362fcfb42a0201edda03b"
        operationId: "pr.open"
        outcome: "approved"
        policyRule: "workflow.external_reversible"
        previousDigest: null
        schemaVersion: 1
        sequence: 1
        stateFingerprintDigest: "sha256:b22bc8c8821ce72b870ffed0e117cb0fad3074f907d3fd9800411bd35c77b09d"
    grants:
      -
        actor: "USER"
        digest: "sha256:dbce89022531053e8f681e2d0191c7d4fd2e95183f274c296728df6285c614f8"
        expiresAt: "2026-07-27T23:58:01.343Z"
        id: "authority-38324f39-545f-476a-bf03-cadaeed06fb9"
        issuedAt: "2026-07-27T23:43:01.343Z"
        kind: "side_effect_authority"
        operationDigest: "sha256:6b9c1ca1f5682941b10ccdc69ca307304daddacd065362fcfb42a0201edda03b"
        operationId: "pr.open"
        policyRule: "workflow.external_reversible"
        schemaVersion: 1
        stateFingerprintDigest: "sha256:b22bc8c8821ce72b870ffed0e117cb0fad3074f907d3fd9800411bd35c77b09d"
        stateScopeDigest: "sha256:b6760c538c90412a2b37ffe3bf7cafe86ae74d7a9eb29334c61e5b2d55cad55f"
    schemaVersion: 1
  workflow_route_baseline:
    start_head_sha: "2d6582e7f017820668cbbbbe90c211e360e47394"
    version: 1
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
