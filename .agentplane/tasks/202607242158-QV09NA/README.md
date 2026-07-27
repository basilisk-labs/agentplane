---
id: "202607242158-QV09NA"
title: "Resolve durable runner effects in doubt without duplicate execution"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 18
origin:
  system: "manual"
depends_on:
  - "202607221846-9XC1H0"
  - "202607221848-VBV9B1"
  - "202607221849-NWVCAG"
  - "202607242201-6BN1GV"
  - "202607242204-SX8T09"
tags:
  - "effect-in-doubt"
  - "idempotency"
  - "milestone-alpha2"
  - "refactor"
  - "rf-06"
  - "rf-13"
  - "runner"
  - "safety"
  - "v0.7"
  - "wave-contracts"
  - "code"
task_kind: "code"
mutation_scope: "code"
risk_flags:
  - "security"
blueprint_request: "code.branch_pr"
verify:
  - "bun run guards:check"
  - "bun run lifecycle:invariants"
  - "bun run test:critical"
  - "bun run typecheck"
plan_approval:
  state: "approved"
  updated_at: "2026-07-24T22:06:41.798Z"
  updated_by: "ORCHESTRATOR"
  note: "Approved as the explicit operator-resolution and claim-retirement boundary after typed effect journals and authority contracts."
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
    at: "2026-07-27T05:36:45.776Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
doc_version: 3
doc_updated_at: "2026-07-27T05:36:45.776Z"
doc_updated_by: "CODER"
description: "Resolve a durable typed effect_in_doubt journal through an explicit operator-supplied applied or not_applied verdict, authority/evidence validation and an exclusive resumable generation lease; retire the claim exactly once without ever invoking the adapter or automatically releasing uncertainty."
sections:
  Summary: |-
    Resolve durable runner effects in doubt without duplicate execution

    Consume the typed effect journal produced by 202607242204-SX8T09 and resolve it only through an authority-bound operator-supplied applied or not_applied verdict, resumable exclusive lease, durable evidence and exactly-once claim retirement without invoking the adapter.
  Scope: |-
    - In scope: consume the typed effect operation/journal from task 202607242204-SX8T09 and resolve an unresolved runner effect without invoking the adapter.
    - Persist immutable resolution intent and final resolution records bound to operation/idempotency, authority, StateFingerprint, claim generation and content-digested evidence.
    - Acquire an exclusive resumable generation lease for the same intent digest; conflicting verdicts or generations must fail closed.
    - Accept only explicit typed operator verdicts applied or not_applied with actor, operator_supplied provenance, evidence references and observed time; the CLI must never choose a verdict.
    - Attach the resolution to run state before claim retirement; restart after every durable phase must resume idempotently and retire at most once.
    - Provide bounded human/JSON status and an explicit resolve-effect/resume surface; no timeout, reconcile, cancel or generic run path may release the claim automatically.
    - Out of scope: effect journal creation, RF-13 authority policy itself, or provider-side exactly-once guarantees.
  Plan: |-
    1. Define strict resolution-intent, resolution, verdict and specialized lease contracts with canonical digests and create-new persistence.
    2. Add a resolution use case that validates operation identity, current claim generation, RF-13 authority, StateFingerprint and no-follow content-digested evidence without invoking the adapter.
    3. Persist intent, acquire/resume the intent-bound generation lease, persist resolution, attach it atomically to run state, then retire the active claim exactly once.
    4. Expose explicit resolve-effect and resume commands plus bounded status/JSON projections; keep generic retry/resume/cancel/reconcile paths fail-closed.
    5. Add opposing-verdict concurrency, stale-generation/authority/fingerprint/evidence rejection, phase-by-phase crash recovery, applied/not_applied retry semantics and legacy opt-in tests.
    6. Run the full lifecycle/guard/critical/type gates and record the limits of supervisor versus provider idempotency.
  Verify Steps: |-
    1. Attempt run, retry, replay, resume, cancel, timeout and generic reconcile against an unresolved journal without an operator verdict. Expected: the claim remains held, no path invokes the adapter, and the CLI points only to explicit effect resolution.
    2. Submit malformed, stale-authority, mismatched-operation/fingerprint/generation and evidence-free intents, then a valid typed verdict. Expected: invalid intents make no state change; the valid intent records actor, operator_supplied provenance, authority and content-digested evidence.
    3. Start two resolvers with the same intent and two with opposing verdicts. Expected: one intent-bound lease generation wins, identical retries converge, and the conflicting verdict receives a typed conflict; one resolution and one claim retirement exist.
    4. Crash after intent creation, lease acquisition, resolution write, state attachment and claim retirement, resuming each case. Expected: recovery completes idempotently without adapter invocation, duplicate terminal transition or automatic release.
    5. Resolve applied and not_applied outcomes. Expected: applied permanently forbids retry of the source operation; not_applied permits only a new operation key under current authority/fingerprint. Legacy RF-06 uncertainty requires an explicit legacy-acceptance path and never invents pre-effect evidence.
    6. Run focused effect-resolution/lease/CLI suites, bun run lifecycle:invariants, bun run guards:check, bun run test:critical and bun run typecheck.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert the implementation commits while retaining this task and the RF-06 fail-closed guards.
    - Do not delete or reinterpret already persisted effect_in_doubt evidence; keep unresolved records blocked for manual inspection.
    - Restore the prior compatibility projection only after focused lifecycle, restart and concurrency tests pass.
  Findings: |-
    - Split from effect journal creation after read-only design audit showed one combined task would cross schema/persistence and operator-resolution verification boundaries and likely repeat RF-06 scale.
    - Contract guarantee is no duplicate AgentPlane adapter spawn for one operation key; generic exactly-once external effects require provider-key support and are never implied.
    - This task intentionally waits for RF-06b, RF-13, RF-03, the journal leaf and the graph amendment.
extensions:
  agentplane.side_effect_authority:
    audit:
      -
        actor: "USER"
        at: "2026-07-27T05:37:15.133Z"
        authorityDigest: "sha256:7146841a04e3a6c3af492be635d5611df3be13ef7d7ca088e953a5e8d0c30306"
        digest: "sha256:e660bbf6ca10d6f7edcc3cc461f3bacb52ef900f2b07e069edc81f298a627e69"
        operationDigest: "sha256:0ab7ef4840f3381d328d0f7c4bfb504c3732f12dff9d017cf2965fc267830187"
        operationId: "pr.open"
        outcome: "approved"
        policyRule: "workflow.external_reversible"
        previousDigest: null
        schemaVersion: 1
        sequence: 1
        stateFingerprintDigest: "sha256:fec7405d99827d96190f0d4852553bf04a3bb22ce516cb137ea155781c903353"
    grants:
      -
        actor: "USER"
        digest: "sha256:7146841a04e3a6c3af492be635d5611df3be13ef7d7ca088e953a5e8d0c30306"
        expiresAt: "2026-07-27T05:52:15.133Z"
        id: "authority-b90a3cd6-65dd-4374-a4f2-d9c5d1c6b3af"
        issuedAt: "2026-07-27T05:37:15.133Z"
        kind: "side_effect_authority"
        operationDigest: "sha256:0ab7ef4840f3381d328d0f7c4bfb504c3732f12dff9d017cf2965fc267830187"
        operationId: "pr.open"
        policyRule: "workflow.external_reversible"
        schemaVersion: 1
        stateFingerprintDigest: "sha256:fec7405d99827d96190f0d4852553bf04a3bb22ce516cb137ea155781c903353"
        stateScopeDigest: "sha256:056b09d305ad6fb504b81b86b549ae2425687219ed4d94dbf8c7ba13e3fccd09"
    schemaVersion: 1
  workflow_route_baseline:
    start_head_sha: "cae1a43c6aadbe44325f842254f0f60c78882b84"
    version: 1
id_source: "generated"
---
## Summary

Resolve durable runner effects in doubt without duplicate execution

Consume the typed effect journal produced by 202607242204-SX8T09 and resolve it only through an authority-bound operator-supplied applied or not_applied verdict, resumable exclusive lease, durable evidence and exactly-once claim retirement without invoking the adapter.

## Scope

- In scope: consume the typed effect operation/journal from task 202607242204-SX8T09 and resolve an unresolved runner effect without invoking the adapter.
- Persist immutable resolution intent and final resolution records bound to operation/idempotency, authority, StateFingerprint, claim generation and content-digested evidence.
- Acquire an exclusive resumable generation lease for the same intent digest; conflicting verdicts or generations must fail closed.
- Accept only explicit typed operator verdicts applied or not_applied with actor, operator_supplied provenance, evidence references and observed time; the CLI must never choose a verdict.
- Attach the resolution to run state before claim retirement; restart after every durable phase must resume idempotently and retire at most once.
- Provide bounded human/JSON status and an explicit resolve-effect/resume surface; no timeout, reconcile, cancel or generic run path may release the claim automatically.
- Out of scope: effect journal creation, RF-13 authority policy itself, or provider-side exactly-once guarantees.

## Plan

1. Define strict resolution-intent, resolution, verdict and specialized lease contracts with canonical digests and create-new persistence.
2. Add a resolution use case that validates operation identity, current claim generation, RF-13 authority, StateFingerprint and no-follow content-digested evidence without invoking the adapter.
3. Persist intent, acquire/resume the intent-bound generation lease, persist resolution, attach it atomically to run state, then retire the active claim exactly once.
4. Expose explicit resolve-effect and resume commands plus bounded status/JSON projections; keep generic retry/resume/cancel/reconcile paths fail-closed.
5. Add opposing-verdict concurrency, stale-generation/authority/fingerprint/evidence rejection, phase-by-phase crash recovery, applied/not_applied retry semantics and legacy opt-in tests.
6. Run the full lifecycle/guard/critical/type gates and record the limits of supervisor versus provider idempotency.

## Verify Steps

1. Attempt run, retry, replay, resume, cancel, timeout and generic reconcile against an unresolved journal without an operator verdict. Expected: the claim remains held, no path invokes the adapter, and the CLI points only to explicit effect resolution.
2. Submit malformed, stale-authority, mismatched-operation/fingerprint/generation and evidence-free intents, then a valid typed verdict. Expected: invalid intents make no state change; the valid intent records actor, operator_supplied provenance, authority and content-digested evidence.
3. Start two resolvers with the same intent and two with opposing verdicts. Expected: one intent-bound lease generation wins, identical retries converge, and the conflicting verdict receives a typed conflict; one resolution and one claim retirement exist.
4. Crash after intent creation, lease acquisition, resolution write, state attachment and claim retirement, resuming each case. Expected: recovery completes idempotently without adapter invocation, duplicate terminal transition or automatic release.
5. Resolve applied and not_applied outcomes. Expected: applied permanently forbids retry of the source operation; not_applied permits only a new operation key under current authority/fingerprint. Legacy RF-06 uncertainty requires an explicit legacy-acceptance path and never invents pre-effect evidence.
6. Run focused effect-resolution/lease/CLI suites, bun run lifecycle:invariants, bun run guards:check, bun run test:critical and bun run typecheck.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert the implementation commits while retaining this task and the RF-06 fail-closed guards.
- Do not delete or reinterpret already persisted effect_in_doubt evidence; keep unresolved records blocked for manual inspection.
- Restore the prior compatibility projection only after focused lifecycle, restart and concurrency tests pass.

## Findings

- Split from effect journal creation after read-only design audit showed one combined task would cross schema/persistence and operator-resolution verification boundaries and likely repeat RF-06 scale.
- Contract guarantee is no duplicate AgentPlane adapter spawn for one operation key; generic exactly-once external effects require provider-key support and are never implied.
- This task intentionally waits for RF-06b, RF-13, RF-03, the journal leaf and the graph amendment.
