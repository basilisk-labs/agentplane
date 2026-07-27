---
id: "202607242204-SX8T09"
title: "Persist typed runner effect operations before execution"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 15
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
comments:
  -
    author: "CODER"
    body: "Start: map the runner effect boundary, then implement the durable operation journal and single-spawn claim."
events:
  -
    type: "status"
    at: "2026-07-27T02:12:20.737Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: map the runner effect boundary, then implement the durable operation journal and single-spawn claim."
doc_version: 3
doc_updated_at: "2026-07-27T02:12:20.737Z"
doc_updated_by: "CODER"
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
extensions:
  agentplane.side_effect_authority:
    audit:
      -
        actor: "USER"
        at: "2026-07-27T02:12:44.179Z"
        authorityDigest: "sha256:d4ec71e928b5cef1a85134623c4a60bf0c26fa6c03af0163f6857d064fc2895d"
        digest: "sha256:f583b6111e218aad812cc3c8bc9475e94b12e28d31147a9438494867bcee190d"
        operationDigest: "sha256:32613629ea92f5874435d2a44bb911763bfea22fd654766935d471eae9a98e18"
        operationId: "pr.open"
        outcome: "approved"
        policyRule: "workflow.external_reversible"
        previousDigest: null
        schemaVersion: 1
        sequence: 1
        stateFingerprintDigest: "sha256:04e43060f17001e34c47812d4cee8446cba297d2b3a55636b9bc3777285923b3"
      -
        actor: "USER"
        at: "2026-07-27T02:13:04.426Z"
        authorityDigest: "sha256:767bcf0153ea16fc1a334a4b16b13c076a2ece4a569c4c1747bc6b9da7d1bd14"
        digest: "sha256:8d7c5583e983533bf694828b2617ca944997e7d4f523144f396866038e8670e2"
        operationDigest: "sha256:32613629ea92f5874435d2a44bb911763bfea22fd654766935d471eae9a98e18"
        operationId: "pr.open"
        outcome: "approved"
        policyRule: "workflow.external_reversible"
        previousDigest: "sha256:f583b6111e218aad812cc3c8bc9475e94b12e28d31147a9438494867bcee190d"
        schemaVersion: 1
        sequence: 2
        stateFingerprintDigest: "sha256:e7606306197afa484774f4b5d4505997581666e0b9a97147eaec279d1ef541cf"
      -
        actor: "USER"
        at: "2026-07-27T02:55:37.028Z"
        authorityDigest: "sha256:239017282fd631200c3f283bc2c73f8397dc12c1b3463c1c91a357a9d7d15928"
        digest: "sha256:334dfdb333e76f334b6c05c81a0f2d95d360de5bb2c98c380ef6f76a7c4f98f3"
        operationDigest: "sha256:515bbae6bf8843503c1f923da38794f1f9eb431a5097da9ff937aeb82db72d9a"
        operationId: "pr.head.publish"
        outcome: "approved"
        policyRule: "workflow.external_reversible"
        previousDigest: "sha256:8d7c5583e983533bf694828b2617ca944997e7d4f523144f396866038e8670e2"
        schemaVersion: 1
        sequence: 3
        stateFingerprintDigest: "sha256:443a01a0b459ffbc72355a38d58ff2e88763420ab5dcad43cfcdf772164839a7"
      -
        actor: "USER"
        at: "2026-07-27T03:13:40.938Z"
        authorityDigest: "sha256:a5ad7eec9b72cef8fa2932bb3fc327a041b0de2da07aa291ae5d7a7204231a33"
        digest: "sha256:754370fa222580ea9b9a4b37540da4a0305bfa7bea36866da56f387800dd26fd"
        operationDigest: "sha256:515bbae6bf8843503c1f923da38794f1f9eb431a5097da9ff937aeb82db72d9a"
        operationId: "pr.head.publish"
        outcome: "approved"
        policyRule: "workflow.external_reversible"
        previousDigest: "sha256:334dfdb333e76f334b6c05c81a0f2d95d360de5bb2c98c380ef6f76a7c4f98f3"
        schemaVersion: 1
        sequence: 4
        stateFingerprintDigest: "sha256:59847f1e24fc8f9ecea9ea41bf5556991ab033301a8954f87d81d7e65ccd5b73"
      -
        actor: "USER"
        at: "2026-07-27T03:21:59.984Z"
        authorityDigest: "sha256:3998d5ed70662816aba4a86f768be088d78eba2211aea0f93b0618df8b1f6539"
        digest: "sha256:1bb9b8e1a7962559959091aff6970ed17d4684965e628a9ba7262d38f556818c"
        operationDigest: "sha256:515bbae6bf8843503c1f923da38794f1f9eb431a5097da9ff937aeb82db72d9a"
        operationId: "pr.head.publish"
        outcome: "approved"
        policyRule: "workflow.external_reversible"
        previousDigest: "sha256:754370fa222580ea9b9a4b37540da4a0305bfa7bea36866da56f387800dd26fd"
        schemaVersion: 1
        sequence: 5
        stateFingerprintDigest: "sha256:9f12564dcfa338dc1f73c7ac1199fce278c48ce27e7fb1150540634a2ae8c777"
      -
        actor: "USER"
        at: "2026-07-27T03:34:43.115Z"
        authorityDigest: "sha256:7962efce178fda081c55bccdfdb6e8a05cc63275d2a94155a63bf1cad7f1d6b8"
        digest: "sha256:23376a13c568d99c4c2037f364212a656a9f4136d586d33672c2090e3d803119"
        operationDigest: "sha256:515bbae6bf8843503c1f923da38794f1f9eb431a5097da9ff937aeb82db72d9a"
        operationId: "pr.head.publish"
        outcome: "approved"
        policyRule: "workflow.external_reversible"
        previousDigest: "sha256:1bb9b8e1a7962559959091aff6970ed17d4684965e628a9ba7262d38f556818c"
        schemaVersion: 1
        sequence: 6
        stateFingerprintDigest: "sha256:bfcee215e10920c88602612eb75dcf2bc55ca76ac682792ddc22df9f09f5535d"
      -
        actor: "USER"
        at: "2026-07-27T03:41:17.294Z"
        authorityDigest: "sha256:25db26e862a0f79f882f7c6c4377fdf58c67783687ae14b922e6bddf0720a03f"
        digest: "sha256:da250b3a6098b08876f9c11de0d3db86a740914ce4827bfef9b07fb238e6c321"
        operationDigest: "sha256:515bbae6bf8843503c1f923da38794f1f9eb431a5097da9ff937aeb82db72d9a"
        operationId: "pr.head.publish"
        outcome: "approved"
        policyRule: "workflow.external_reversible"
        previousDigest: "sha256:23376a13c568d99c4c2037f364212a656a9f4136d586d33672c2090e3d803119"
        schemaVersion: 1
        sequence: 7
        stateFingerprintDigest: "sha256:953fd5ce6271d2c49238a645b910496c30548f4b0c78d690ed4505d6373a8b14"
    grants:
      -
        actor: "USER"
        digest: "sha256:d4ec71e928b5cef1a85134623c4a60bf0c26fa6c03af0163f6857d064fc2895d"
        expiresAt: "2026-07-27T02:27:44.179Z"
        id: "authority-a803f1a2-af75-489c-8bc3-056692ad483d"
        issuedAt: "2026-07-27T02:12:44.179Z"
        kind: "side_effect_authority"
        operationDigest: "sha256:32613629ea92f5874435d2a44bb911763bfea22fd654766935d471eae9a98e18"
        operationId: "pr.open"
        policyRule: "workflow.external_reversible"
        schemaVersion: 1
        stateFingerprintDigest: "sha256:04e43060f17001e34c47812d4cee8446cba297d2b3a55636b9bc3777285923b3"
        stateScopeDigest: "sha256:5a555f440ccac3dbc228116dbe3cfa7f72617972edaf555ab4e76175eee8aaf0"
      -
        actor: "USER"
        digest: "sha256:767bcf0153ea16fc1a334a4b16b13c076a2ece4a569c4c1747bc6b9da7d1bd14"
        expiresAt: "2026-07-27T02:28:04.426Z"
        id: "authority-a6693fad-2a6d-49f9-8dae-cce20995d906"
        issuedAt: "2026-07-27T02:13:04.426Z"
        kind: "side_effect_authority"
        operationDigest: "sha256:32613629ea92f5874435d2a44bb911763bfea22fd654766935d471eae9a98e18"
        operationId: "pr.open"
        policyRule: "workflow.external_reversible"
        schemaVersion: 1
        stateFingerprintDigest: "sha256:e7606306197afa484774f4b5d4505997581666e0b9a97147eaec279d1ef541cf"
        stateScopeDigest: "sha256:09044b071b0dafa9af22e448c62a19c1ac1ccd05a15e3eb90b2d72f46f628775"
      -
        actor: "USER"
        digest: "sha256:239017282fd631200c3f283bc2c73f8397dc12c1b3463c1c91a357a9d7d15928"
        expiresAt: "2026-07-27T03:10:37.028Z"
        id: "authority-0746be7f-83b3-4058-bd30-a0b78241df44"
        issuedAt: "2026-07-27T02:55:37.028Z"
        kind: "side_effect_authority"
        operationDigest: "sha256:515bbae6bf8843503c1f923da38794f1f9eb431a5097da9ff937aeb82db72d9a"
        operationId: "pr.head.publish"
        policyRule: "workflow.external_reversible"
        schemaVersion: 1
        stateFingerprintDigest: "sha256:443a01a0b459ffbc72355a38d58ff2e88763420ab5dcad43cfcdf772164839a7"
        stateScopeDigest: "sha256:27f42122ba6c6eacec93230405d0b438626c3f2e2ef5e2ef842b59965c8e6f31"
      -
        actor: "USER"
        digest: "sha256:a5ad7eec9b72cef8fa2932bb3fc327a041b0de2da07aa291ae5d7a7204231a33"
        expiresAt: "2026-07-27T03:28:40.938Z"
        id: "authority-3270e08e-64c7-491f-a58a-14973e090d50"
        issuedAt: "2026-07-27T03:13:40.938Z"
        kind: "side_effect_authority"
        operationDigest: "sha256:515bbae6bf8843503c1f923da38794f1f9eb431a5097da9ff937aeb82db72d9a"
        operationId: "pr.head.publish"
        policyRule: "workflow.external_reversible"
        schemaVersion: 1
        stateFingerprintDigest: "sha256:59847f1e24fc8f9ecea9ea41bf5556991ab033301a8954f87d81d7e65ccd5b73"
        stateScopeDigest: "sha256:30557bad82a74cb4f5f3a0e529c113453cce9a668acff4eff28d2dd59e6ae929"
      -
        actor: "USER"
        digest: "sha256:3998d5ed70662816aba4a86f768be088d78eba2211aea0f93b0618df8b1f6539"
        expiresAt: "2026-07-27T03:36:59.984Z"
        id: "authority-fe642e1e-2f7a-435a-bedc-316c69873dbe"
        issuedAt: "2026-07-27T03:21:59.984Z"
        kind: "side_effect_authority"
        operationDigest: "sha256:515bbae6bf8843503c1f923da38794f1f9eb431a5097da9ff937aeb82db72d9a"
        operationId: "pr.head.publish"
        policyRule: "workflow.external_reversible"
        schemaVersion: 1
        stateFingerprintDigest: "sha256:9f12564dcfa338dc1f73c7ac1199fce278c48ce27e7fb1150540634a2ae8c777"
        stateScopeDigest: "sha256:95a186bc7e474b70ab119d2fb8bff380674e66f25b323eeecfc2ba9865e56cdb"
      -
        actor: "USER"
        digest: "sha256:7962efce178fda081c55bccdfdb6e8a05cc63275d2a94155a63bf1cad7f1d6b8"
        expiresAt: "2026-07-27T03:49:43.115Z"
        id: "authority-4d1157e6-4246-4e79-8b83-d1656c803f5a"
        issuedAt: "2026-07-27T03:34:43.115Z"
        kind: "side_effect_authority"
        operationDigest: "sha256:515bbae6bf8843503c1f923da38794f1f9eb431a5097da9ff937aeb82db72d9a"
        operationId: "pr.head.publish"
        policyRule: "workflow.external_reversible"
        schemaVersion: 1
        stateFingerprintDigest: "sha256:bfcee215e10920c88602612eb75dcf2bc55ca76ac682792ddc22df9f09f5535d"
        stateScopeDigest: "sha256:fab44be6a4e81337660fa154a7ab366dfb60781c719881c1ddb1eafe39a9559f"
      -
        actor: "USER"
        digest: "sha256:25db26e862a0f79f882f7c6c4377fdf58c67783687ae14b922e6bddf0720a03f"
        expiresAt: "2026-07-27T03:56:17.294Z"
        id: "authority-5f432d6d-ece7-4df8-bf67-bd44033323c6"
        issuedAt: "2026-07-27T03:41:17.294Z"
        kind: "side_effect_authority"
        operationDigest: "sha256:515bbae6bf8843503c1f923da38794f1f9eb431a5097da9ff937aeb82db72d9a"
        operationId: "pr.head.publish"
        policyRule: "workflow.external_reversible"
        schemaVersion: 1
        stateFingerprintDigest: "sha256:953fd5ce6271d2c49238a645b910496c30548f4b0c78d690ed4505d6373a8b14"
        stateScopeDigest: "sha256:0101bbda6650aad4ec65e77b7085869e34cbe13f85b338f955a0dfe5eb589da4"
    schemaVersion: 1
  workflow_route_baseline:
    start_head_sha: "e080b180b13f9d138b9a8eee0e5d73a18517722b"
    version: 1
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
