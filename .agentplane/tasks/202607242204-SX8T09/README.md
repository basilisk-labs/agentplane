---
id: "202607242204-SX8T09"
title: "Persist typed runner effect operations before execution"
status: "TODO"
priority: "high"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on:
  - "202607221848-VBV9B1"
  - "202607221849-NWVCAG"
tags:
  - "code"
  - "effect-journal"
  - "idempotency"
  - "milestone-alpha2"
  - "refactor"
  - "rf-06"
  - "rf-13"
  - "runner"
  - "safety"
  - "v0.7"
  - "wave-contracts"
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
  updated_at: "2026-07-24T22:06:33.395Z"
  updated_by: "ORCHESTRATOR"
  note: "Approved as the pre-effect journal and supervisor single-spawn safety boundary required before effect resolution."
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
doc_updated_at: "2026-07-24T22:06:08.773Z"
doc_updated_by: "PLANNER"
description: "Define strict versioned runner effect operation and journal contracts, persist operation identity, idempotency, authority, StateFingerprint and expected postconditions before adapter execution, and make crash/restart/replay refuse a second spawn for the same operation key."
sections:
  Summary: |-
    Persist typed runner effect operations before execution

    Define strict versioned runner effect operation and journal contracts, persist operation identity, idempotency, authority, StateFingerprint and expected postconditions before adapter execution, and make crash/restart/replay refuse a second spawn for the same operation key.
  Scope: |-
    - In scope: strict versioned RunnerEffectOperation and RunnerEffectJournal contracts with canonical digests, operation identity, idempotency key, authority reference/digest, precondition StateFingerprint digest, claim generation, expected postconditions and observed evidence.
    - Persist the immutable operation/journal and a downgrade-resistant preparation marker before the first adapter execution; update phases atomically without trusting event-log order as authority.
    - Make run, retry, replay, resume and restart paths recognize the operation key and refuse a second supervisor spawn when the prior effect is started, unknown or post-state-unknown.
    - Treat two independent supervisor processes racing on the same operation key and claim generation as one concurrency domain: an atomic journal/claim transition elects one winner and only that winner may spawn the adapter.
    - Preserve bounded legacy read compatibility without adding required artifact-path fields that invalidate existing runs.
    - Define enforcement truthfully as supervisor_single_spawn unless an adapter/provider proves that the idempotency key is forwarded.
    - Out of scope: operator verdict capture, effect resolution lease, claim retirement and semantic selection of applied versus not_applied; task 202607242158-QV09NA owns those.
  Plan: |-
    1. Add strict core schemas and canonical digest/idempotency derivation for runner effect operations and journals.
    2. Extend preparation/run-state contracts additively with a modern effect-journal feature marker and bounded legacy parser behavior.
    3. Persist the operation and prepared/started journal phases through contained atomic writes before adapter.execute.
    4. Reconcile crash, restart, retry, resume and replay against the durable operation key, and use an atomic operation-key/generation claim transition to elect one winner across independent supervisor processes.
    5. Add JSON round-trip, anti-downgrade, crash-boundary and synchronized cross-process race tests that prove exactly one adapter spawn, plus lifecycle/guard/type gates.
  Verify Steps: |-
    1. Inspect filesystem state inside an adapter test double at its first instruction. Expected: a strict operation and started journal already exist and bind task, run, adapter, claim generation, authority, fingerprint, postconditions and idempotency.
    2. Start two independent supervisor processes behind a synchronization barrier for the same operation key and claim generation. Expected: the atomic journal/claim transition elects exactly one winner, the loser observes the durable started/unknown state, and a shared adapter test double records exactly one adapter.execute spawn across both processes.
    3. Crash before execute, during execute and before post-state observation, then restart, retry, resume and replay. Expected: the same operation identity survives; AgentPlane invokes adapter.execute at most once for that key.
    4. Tamper with operation, journal, feature marker, authority/fingerprint digest or claim generation. Expected: strict validation rejects the run and no adapter spawn occurs.
    5. Round-trip modern and legacy run artifacts. Expected: modern fields cannot be stripped or downgraded; supported legacy state remains readable and explicitly marked without inventing pre-effect evidence.
    6. Exercise an adapter without provider idempotency support and one that forwards the key. Expected: receipts distinguish supervisor_single_spawn from provider_key_forwarded and never claim generic exactly-once.
    7. Run focused effect-operation/journal suites, bun run lifecycle:invariants, bun run guards:check, bun run test:critical and bun run typecheck.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert the implementation commits while retaining RF-06 fail-closed effect guards.
    - Preserve any written journals as diagnostic evidence; never reinterpret them as resolved or safe to retry.
    - Restore prior compatibility parsing only after modern anti-downgrade and legacy read fixtures pass.
  Findings: |-
    - Exactly-once for arbitrary external effects is not generally provable. This leaf guarantees no second AgentPlane adapter spawn for one operation key; stronger provider guarantees are recorded only when the key is actually forwarded.
    - Operator resolution is a separate verification boundary because it has different authority, concurrency and crash-recovery semantics.
id_source: "generated"
---
## Summary

Persist typed runner effect operations before execution

Define strict versioned runner effect operation and journal contracts, persist operation identity, idempotency, authority, StateFingerprint and expected postconditions before adapter execution, and make crash/restart/replay refuse a second spawn for the same operation key.

## Scope

- In scope: strict versioned RunnerEffectOperation and RunnerEffectJournal contracts with canonical digests, operation identity, idempotency key, authority reference/digest, precondition StateFingerprint digest, claim generation, expected postconditions and observed evidence.
- Persist the immutable operation/journal and a downgrade-resistant preparation marker before the first adapter execution; update phases atomically without trusting event-log order as authority.
- Make run, retry, replay, resume and restart paths recognize the operation key and refuse a second supervisor spawn when the prior effect is started, unknown or post-state-unknown.
- Treat two independent supervisor processes racing on the same operation key and claim generation as one concurrency domain: an atomic journal/claim transition elects one winner and only that winner may spawn the adapter.
- Preserve bounded legacy read compatibility without adding required artifact-path fields that invalidate existing runs.
- Define enforcement truthfully as supervisor_single_spawn unless an adapter/provider proves that the idempotency key is forwarded.
- Out of scope: operator verdict capture, effect resolution lease, claim retirement and semantic selection of applied versus not_applied; task 202607242158-QV09NA owns those.

## Plan

1. Add strict core schemas and canonical digest/idempotency derivation for runner effect operations and journals.
2. Extend preparation/run-state contracts additively with a modern effect-journal feature marker and bounded legacy parser behavior.
3. Persist the operation and prepared/started journal phases through contained atomic writes before adapter.execute.
4. Reconcile crash, restart, retry, resume and replay against the durable operation key, and use an atomic operation-key/generation claim transition to elect one winner across independent supervisor processes.
5. Add JSON round-trip, anti-downgrade, crash-boundary and synchronized cross-process race tests that prove exactly one adapter spawn, plus lifecycle/guard/type gates.

## Verify Steps

1. Inspect filesystem state inside an adapter test double at its first instruction. Expected: a strict operation and started journal already exist and bind task, run, adapter, claim generation, authority, fingerprint, postconditions and idempotency.
2. Start two independent supervisor processes behind a synchronization barrier for the same operation key and claim generation. Expected: the atomic journal/claim transition elects exactly one winner, the loser observes the durable started/unknown state, and a shared adapter test double records exactly one adapter.execute spawn across both processes.
3. Crash before execute, during execute and before post-state observation, then restart, retry, resume and replay. Expected: the same operation identity survives; AgentPlane invokes adapter.execute at most once for that key.
4. Tamper with operation, journal, feature marker, authority/fingerprint digest or claim generation. Expected: strict validation rejects the run and no adapter spawn occurs.
5. Round-trip modern and legacy run artifacts. Expected: modern fields cannot be stripped or downgraded; supported legacy state remains readable and explicitly marked without inventing pre-effect evidence.
6. Exercise an adapter without provider idempotency support and one that forwards the key. Expected: receipts distinguish supervisor_single_spawn from provider_key_forwarded and never claim generic exactly-once.
7. Run focused effect-operation/journal suites, bun run lifecycle:invariants, bun run guards:check, bun run test:critical and bun run typecheck.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert the implementation commits while retaining RF-06 fail-closed effect guards.
- Preserve any written journals as diagnostic evidence; never reinterpret them as resolved or safe to retry.
- Restore prior compatibility parsing only after modern anti-downgrade and legacy read fixtures pass.

## Findings

- Exactly-once for arbitrary external effects is not generally provable. This leaf guarantees no second AgentPlane adapter spawn for one operation key; stronger provider guarantees are recorded only when the key is actually forwarded.
- Operator resolution is a separate verification boundary because it has different authority, concurrency and crash-recovery semantics.
