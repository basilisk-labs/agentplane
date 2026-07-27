---
id: "202607242204-SX8T09"
title: "Persist typed runner effect operations before execution"
result_summary: "pre-merge closure"
status: "DONE"
priority: "high"
owner: "CODER"
revision: 25
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
  state: "ok"
  updated_at: "2026-07-27T03:57:14.469Z"
  updated_by: "TESTER"
  note: "Focused runner effect suites passed (91 tests); typecheck, lifecycle invariants, guards, critical CLI suite, hotspot baseline, lint, and Knip baseline passed. Hosted PR #4637 is green on the published head."
  attempts: 0
quality_review:
  state: "pass"
  provenance: "evaluator_supplied"
  updated_at: "2026-07-27T04:15:28.279Z"
  updated_by: "EVALUATOR"
  note: "Current PR head retains the durable prepare-claim-start-accept protocol; the final hosted CI is green on this exact head."
  evaluated_sha: "6b83d0c70fc0c093ab00a21c217a5adec936ac38"
  blueprint_digest: "cbfb06223de4a9891387ca669dbd5c69859ac1054e7fd24be7e0fe709148c327"
  evidence_refs:
    - ".agentplane/tasks/202607242204-SX8T09/README.md"
    - ".agentplane/tasks/202607242204-SX8T09/quality/20260727-041528279-recovery-context/quality-report.json"
    - ".agentplane/tasks/202607242204-SX8T09/quality/20260727-041528279-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202607242204-SX8T09/quality/20260727-041528279-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202607242204-SX8T09/blueprint/resolved-snapshot.json"
    - "packages/core/src/runner/runner-effect-operation.ts"
    - "packages/agentplane/src/runner/effect-operation.test.ts"
    - "https://github.com/basilisk-labs/agentplane/pull/4637"
  findings:
    - "Runner effect operation is persisted before adapter execution, and atomic journal claiming prevents a second supervisor from spawning the same effect."
    - "Current task head 463e1f5f has 17 successful hosted checks; the evaluation now binds to that exact published revision."
commit:
  hash: "6b83d0c70fc0c093ab00a21c217a5adec936ac38"
  message: "✨ SX8T09 runner: remove unused effect helper exports"
comments:
  -
    author: "CODER"
    body: "Start: map the runner effect boundary, then implement the durable operation journal and single-spawn claim."
  -
    author: "CODER"
    body: "Verified: pre-merge closure packet is ready for the task PR."
events:
  -
    type: "status"
    at: "2026-07-27T02:12:20.737Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: map the runner effect boundary, then implement the durable operation journal and single-spawn claim."
  -
    type: "verify"
    at: "2026-07-27T03:57:14.469Z"
    author: "TESTER"
    state: "ok"
    note: "Focused runner effect suites passed (91 tests); typecheck, lifecycle invariants, guards, critical CLI suite, hotspot baseline, lint, and Knip baseline passed. Hosted PR #4637 is green on the published head."
  -
    type: "status"
    at: "2026-07-27T03:58:40.359Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: pre-merge closure packet is ready for the task PR."
doc_version: 3
doc_updated_at: "2026-07-27T03:58:40.359Z"
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
    ### 2026-07-27T03:57:14.469Z — VERIFY — ok

    By: TESTER

    Note: Focused runner effect suites passed (91 tests); typecheck, lifecycle invariants, guards, critical CLI suite, hotspot baseline, lint, and Knip baseline passed. Hosted PR #4637 is green on the published head.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-27T02:12:20.737Z, excerpt_hash=sha256:51296906977449187f73387f030b344457f202d7fc4c05b19d790a02eb0fadb7

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/rf05b-integration-base/.agentplane/worktrees/202607242204-SX8T09-persist-typed-runner-effect-operations-before-ex/.agentplane/tasks/202607242204-SX8T09/blueprint/resolved-snapshot.json
    - old_digest: cbfb06223de4a9891387ca669dbd5c69859ac1054e7fd24be7e0fe709148c327
    - current_digest: cbfb06223de4a9891387ca669dbd5c69859ac1054e7fd24be7e0fe709148c327
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607242204-SX8T09

    DecisionContextRef:
    - operator_action: provider_action
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
      -
        actor: "USER"
        at: "2026-07-27T03:50:36.786Z"
        authorityDigest: "sha256:9d16b2cc9eed1ada5ce012f11f51b8a05377dc90b3c32276db8a204dc5c818de"
        digest: "sha256:622c80e2ef403c6bfc198ffd5efc7e702fb2fe6781e6d6cf1725cef95f66fb11"
        operationDigest: "sha256:515bbae6bf8843503c1f923da38794f1f9eb431a5097da9ff937aeb82db72d9a"
        operationId: "pr.head.publish"
        outcome: "approved"
        policyRule: "workflow.external_reversible"
        previousDigest: "sha256:da250b3a6098b08876f9c11de0d3db86a740914ce4827bfef9b07fb238e6c321"
        schemaVersion: 1
        sequence: 8
        stateFingerprintDigest: "sha256:20866ec96845f4ac9feb0e6e164b80278ad900f09406f6d50b2df4ecfaa6ef70"
      -
        actor: "USER"
        at: "2026-07-27T03:58:15.684Z"
        authorityDigest: "sha256:860fbafa4669696f6e8727b7beda523ac0e35fc614fa812e99f156a8f9a29ac9"
        digest: "sha256:1519e8e78252fa132a24181bf4399b8df218a5588cb394a10248933e25d743e5"
        operationDigest: "sha256:e8f48e6fbaad91cf5c1c86fe065fefef8d275325a31a7855cc7a173f7fabd697"
        operationId: "task.pre_merge_close"
        outcome: "approved"
        policyRule: "workflow.external_high_risk"
        previousDigest: "sha256:622c80e2ef403c6bfc198ffd5efc7e702fb2fe6781e6d6cf1725cef95f66fb11"
        schemaVersion: 1
        sequence: 9
        stateFingerprintDigest: "sha256:5a07178970cdb9a20171f69b9fe23a5f8a0a95f75e6fe718a38ec3d113353b1d"
      -
        actor: "USER"
        at: "2026-07-27T03:59:08.899Z"
        authorityDigest: "sha256:7068a76c1e0c7ecad8024c0a000fd93f633bb17257a68aab575dfdb816fb0ef6"
        digest: "sha256:0f65ab2cc4fe9f7a76190bf2152fa1014ff77b9efe5fbd60ba5a8224fd432d71"
        operationDigest: "sha256:9e3b9cbecb1f7b8db5d1d2a087b0bdc2f70f24f77d69473b68166f51cff594e5"
        operationId: "route.remote.refresh"
        outcome: "approved"
        policyRule: "workflow.external_reversible"
        previousDigest: "sha256:1519e8e78252fa132a24181bf4399b8df218a5588cb394a10248933e25d743e5"
        schemaVersion: 1
        sequence: 10
        stateFingerprintDigest: "sha256:562898a5f903349db3c117185c381750618480fc78ca04ab70216b43cb64648e"
      -
        actor: "USER"
        at: "2026-07-27T04:00:12.869Z"
        authorityDigest: "sha256:60a96cbc8f9b1aed371ba31731880e733f06a6999d9b884d32a9a6dbac5ada13"
        digest: "sha256:a8b78d66a0bfcd1f8d46e86f78348edc90e9c4d400405f74d40d1a4534aba1e8"
        operationDigest: "sha256:515bbae6bf8843503c1f923da38794f1f9eb431a5097da9ff937aeb82db72d9a"
        operationId: "pr.head.publish"
        outcome: "approved"
        policyRule: "workflow.external_reversible"
        previousDigest: "sha256:0f65ab2cc4fe9f7a76190bf2152fa1014ff77b9efe5fbd60ba5a8224fd432d71"
        schemaVersion: 1
        sequence: 11
        stateFingerprintDigest: "sha256:a290422f55b6d58fdb4080882b3d0c17d1e3bbb27ac9659867f37c4f0092768a"
      -
        actor: "USER"
        at: "2026-07-27T04:07:23.515Z"
        authorityDigest: "sha256:34986f0607efafb8fa1019b0e99021cad62667db3f301456b9a0060aa9c9d39e"
        digest: "sha256:d0abd5e13183bdecc6a9e465de0e885c1410ae2394a1b2ad4810db40350497af"
        operationDigest: "sha256:a11cf294cdb11983e9f25014391a0061fc8f468ff002a3ebaba53278905c92ee"
        operationId: "integration.enqueue"
        outcome: "approved"
        policyRule: "workflow.external_high_risk"
        previousDigest: "sha256:a8b78d66a0bfcd1f8d46e86f78348edc90e9c4d400405f74d40d1a4534aba1e8"
        schemaVersion: 1
        sequence: 12
        stateFingerprintDigest: "sha256:e3ac27d8cf502010a3aa0c3c70dc05f8767344aae8c37aa6bf21023f4fb9b5af"
      -
        actor: "USER"
        at: "2026-07-27T04:15:57.498Z"
        authorityDigest: "sha256:19d78e783674adf19ec5a58813c05cb31edca04cd258b8d8c31d42740a05cb79"
        digest: "sha256:5fec0517241a3b5cdedd8876613fe073476af7211d213b99a964c63ee4e92380"
        operationDigest: "sha256:9e3b9cbecb1f7b8db5d1d2a087b0bdc2f70f24f77d69473b68166f51cff594e5"
        operationId: "route.remote.refresh"
        outcome: "approved"
        policyRule: "workflow.external_reversible"
        previousDigest: "sha256:d0abd5e13183bdecc6a9e465de0e885c1410ae2394a1b2ad4810db40350497af"
        schemaVersion: 1
        sequence: 13
        stateFingerprintDigest: "sha256:4491ae39676c5b19fd1246841a49318ae03018e6565a0c154d9fa38a26ec457d"
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
      -
        actor: "USER"
        digest: "sha256:9d16b2cc9eed1ada5ce012f11f51b8a05377dc90b3c32276db8a204dc5c818de"
        expiresAt: "2026-07-27T04:05:36.786Z"
        id: "authority-09a17491-e62a-43a7-805a-80a4cd0e7ec7"
        issuedAt: "2026-07-27T03:50:36.786Z"
        kind: "side_effect_authority"
        operationDigest: "sha256:515bbae6bf8843503c1f923da38794f1f9eb431a5097da9ff937aeb82db72d9a"
        operationId: "pr.head.publish"
        policyRule: "workflow.external_reversible"
        schemaVersion: 1
        stateFingerprintDigest: "sha256:20866ec96845f4ac9feb0e6e164b80278ad900f09406f6d50b2df4ecfaa6ef70"
        stateScopeDigest: "sha256:ff310df0b278fc6ad390598305b6254b3306f9e7f86fe4a07b882bb03ac45bcc"
      -
        actor: "USER"
        digest: "sha256:860fbafa4669696f6e8727b7beda523ac0e35fc614fa812e99f156a8f9a29ac9"
        expiresAt: "2026-07-27T04:13:15.684Z"
        id: "authority-81346005-d459-40bb-9f39-be29cdb3bb22"
        issuedAt: "2026-07-27T03:58:15.684Z"
        kind: "side_effect_authority"
        operationDigest: "sha256:e8f48e6fbaad91cf5c1c86fe065fefef8d275325a31a7855cc7a173f7fabd697"
        operationId: "task.pre_merge_close"
        policyRule: "workflow.external_high_risk"
        schemaVersion: 1
        stateFingerprintDigest: "sha256:5a07178970cdb9a20171f69b9fe23a5f8a0a95f75e6fe718a38ec3d113353b1d"
        stateScopeDigest: "sha256:98da6e8e606e696576f3e483c1b0bf01bc7f3b45d58e2f470373d2a0f1a1ae9c"
      -
        actor: "USER"
        digest: "sha256:7068a76c1e0c7ecad8024c0a000fd93f633bb17257a68aab575dfdb816fb0ef6"
        expiresAt: "2026-07-27T04:14:08.899Z"
        id: "authority-42a9084b-4f56-45cf-ab72-778c0497be1c"
        issuedAt: "2026-07-27T03:59:08.899Z"
        kind: "side_effect_authority"
        operationDigest: "sha256:9e3b9cbecb1f7b8db5d1d2a087b0bdc2f70f24f77d69473b68166f51cff594e5"
        operationId: "route.remote.refresh"
        policyRule: "workflow.external_reversible"
        schemaVersion: 1
        stateFingerprintDigest: "sha256:562898a5f903349db3c117185c381750618480fc78ca04ab70216b43cb64648e"
        stateScopeDigest: "sha256:93068d10e1da6eb7d7e237a59abcdf460c5e677f2efc39dfdc41893c08178250"
      -
        actor: "USER"
        digest: "sha256:60a96cbc8f9b1aed371ba31731880e733f06a6999d9b884d32a9a6dbac5ada13"
        expiresAt: "2026-07-27T04:15:12.869Z"
        id: "authority-be72eb0d-c9e8-4aca-b1ef-a1ba8829ee2d"
        issuedAt: "2026-07-27T04:00:12.869Z"
        kind: "side_effect_authority"
        operationDigest: "sha256:515bbae6bf8843503c1f923da38794f1f9eb431a5097da9ff937aeb82db72d9a"
        operationId: "pr.head.publish"
        policyRule: "workflow.external_reversible"
        schemaVersion: 1
        stateFingerprintDigest: "sha256:a290422f55b6d58fdb4080882b3d0c17d1e3bbb27ac9659867f37c4f0092768a"
        stateScopeDigest: "sha256:1e37fffa5fc7919ae0e0c4ad6cadbe80a0044843ba4db0c73b90a48c4b7f6d3e"
      -
        actor: "USER"
        digest: "sha256:34986f0607efafb8fa1019b0e99021cad62667db3f301456b9a0060aa9c9d39e"
        expiresAt: "2026-07-27T04:22:23.515Z"
        id: "authority-9c3b81f2-205e-4b28-9fc5-525ab8c6f8ad"
        issuedAt: "2026-07-27T04:07:23.515Z"
        kind: "side_effect_authority"
        operationDigest: "sha256:a11cf294cdb11983e9f25014391a0061fc8f468ff002a3ebaba53278905c92ee"
        operationId: "integration.enqueue"
        policyRule: "workflow.external_high_risk"
        schemaVersion: 1
        stateFingerprintDigest: "sha256:e3ac27d8cf502010a3aa0c3c70dc05f8767344aae8c37aa6bf21023f4fb9b5af"
        stateScopeDigest: "sha256:111f54a6d710239f541389c6761de6a45e18ba01b5ab6f15bf40cae575d8d61c"
      -
        actor: "USER"
        digest: "sha256:19d78e783674adf19ec5a58813c05cb31edca04cd258b8d8c31d42740a05cb79"
        expiresAt: "2026-07-27T04:30:57.498Z"
        id: "authority-89ab2960-d32e-40a0-8710-f9da8742c06b"
        issuedAt: "2026-07-27T04:15:57.498Z"
        kind: "side_effect_authority"
        operationDigest: "sha256:9e3b9cbecb1f7b8db5d1d2a087b0bdc2f70f24f77d69473b68166f51cff594e5"
        operationId: "route.remote.refresh"
        policyRule: "workflow.external_reversible"
        schemaVersion: 1
        stateFingerprintDigest: "sha256:4491ae39676c5b19fd1246841a49318ae03018e6565a0c154d9fa38a26ec457d"
        stateScopeDigest: "sha256:2ab8a8cfc15b7a5b2a7de28d557771fbbe706ed37b85ea575fdb1b5f8a4ba0ec"
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
### 2026-07-27T03:57:14.469Z — VERIFY — ok

By: TESTER

Note: Focused runner effect suites passed (91 tests); typecheck, lifecycle invariants, guards, critical CLI suite, hotspot baseline, lint, and Knip baseline passed. Hosted PR #4637 is green on the published head.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-27T02:12:20.737Z, excerpt_hash=sha256:51296906977449187f73387f030b344457f202d7fc4c05b19d790a02eb0fadb7

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/rf05b-integration-base/.agentplane/worktrees/202607242204-SX8T09-persist-typed-runner-effect-operations-before-ex/.agentplane/tasks/202607242204-SX8T09/blueprint/resolved-snapshot.json
- old_digest: cbfb06223de4a9891387ca669dbd5c69859ac1054e7fd24be7e0fe709148c327
- current_digest: cbfb06223de4a9891387ca669dbd5c69859ac1054e7fd24be7e0fe709148c327
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607242204-SX8T09

DecisionContextRef:
- operator_action: provider_action
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

- Revert the implementation commits while retaining RF-06 fail-closed effect guards.
- Preserve any written journals as diagnostic evidence; never reinterpret them as resolved or safe to retry.
- Restore prior compatibility parsing only after modern anti-downgrade and legacy read fixtures pass.

## Findings

- Exactly-once for arbitrary external effects is not generally provable. This leaf guarantees no second AgentPlane adapter spawn for one operation key; stronger provider guarantees are recorded only when the key is actually forwarded.
- Operator resolution is a separate verification boundary because it has different authority, concurrency and crash-recovery semantics.
