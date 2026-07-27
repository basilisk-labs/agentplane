---
id: "202607221849-TBTX8X"
title: "Prepare and apply typed evaluator results"
result_summary: "pre-merge closure"
status: "DONE"
priority: "high"
owner: "CODER"
revision: 28
origin:
  system: "manual"
depends_on:
  - "202607221846-9XC1H0"
  - "202607221846-YGWMA2"
  - "202607221848-VC4VVS"
  - "202607221849-NWVCAG"
tags:
  - "evaluator"
  - "milestone-alpha2"
  - "refactor"
  - "rf-12"
  - "rf-25"
  - "use-case"
  - "v0.7"
  - "wave-contracts"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "code.branch_pr"
verify:
  - "bun run lifecycle:invariants"
  - "bun run schemas:check"
  - "bun run test:critical"
  - "bun run typecheck"
plan_approval:
  state: "approved"
  updated_at: "2026-07-27T12:39:03.976Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-07-27T13:56:01.444Z"
  updated_by: "TESTER"
  note: "Verified RF-12a against all five task steps: 14 focused evaluator tests cover prepared frozen evidence, strict typed apply, staleness and mutation rejection, in-process use cases, and distinct human provenance. schema check, lifecycle invariants, agentplane typecheck, policy routing, and the reviewed compatibility ratchet passed."
  attempts: 0
quality_review:
  state: "pass"
  provenance: "evaluator_supplied"
  updated_at: "2026-07-27T14:36:29.970Z"
  updated_by: "EVALUATOR"
  note: "EVALUATOR returned pass with 1 typed finding(s)."
  evaluated_sha: "9fbcd8fe21742287bc3846c50ad777db198ac495"
  blueprint_digest: "f51d20f20e8dc6bd8b451f07f90c56218d7fa8709e0505633fe075ab9f5a9f53"
  evidence_refs:
    - ".agentplane/tasks/202607221849-TBTX8X/quality/20260727-143234799-recovery-context/evaluator-work-order.json"
    - ".agentplane/tasks/202607221849-TBTX8X/quality/20260727-143234799-recovery-context/quality-report.json"
    - ".agentplane/tasks/202607221849-TBTX8X/quality/20260727-143234799-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202607221849-TBTX8X/quality/20260727-143234799-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202607221849-TBTX8X/quality/20260727-143234799-recovery-context/evaluator-result.json"
    - ".agentplane/tasks/202607221849-TBTX8X/README.md"
    - ".agentplane/tasks/202607221849-TBTX8X/quality/20260727-143234799-recovery-context/evaluator-diff.patch"
    - ".agentplane/tasks/202607221849-TBTX8X/quality/20260727-143234799-recovery-context/evaluator-observed-checks.json"
    - ".agentplane/tasks/202607221849-TBTX8X/quality/20260727-143234799-recovery-context/evaluator-blueprint.json"
    - ".agentplane/policy/dod.code.md"
    - ".agentplane/policy/dod.core.md"
    - ".agentplane/policy/security.must.md"
    - ".agentplane/policy/workflow.branch_pr.md"
  findings:
    - "The prepare/apply flow binds evaluator output to the frozen task revision, evaluated SHA, blueprint digest, and evidence digests; mutation-shaped result fields are rejected before quality state can change."
commit:
  hash: "9fbcd8fe21742287bc3846c50ad777db198ac495"
  message: "🧩 TBTX8X task: repair evaluator compatibility"
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "CODER"
    body: "Implemented: added frozen EVALUATOR work-order preparation, strict typed result application, stale and frozen-evidence rejection, and a human-provenance compatibility facade. Added evaluator prepare/apply CLI surfaces and recorded their reviewed additive compatibility delta. Checks: focused evaluator and route tests, agentplane typecheck, lifecycle invariants, schemas, compatibility ratchet, policy routing, and touched-file lint."
  -
    author: "CODER"
    body: "Verified: pre-merge closure packet is ready for the task PR."
  -
    author: "CODER"
    body: "Reopened before merge: GitHub verify-contract found the generated CLI reference stale after the additive evaluator prepare/apply command surface. Regenerate the reference and repeat verification and quality review."
  -
    author: "CODER"
    body: "Verified: pre-merge closure packet is ready for the task PR."
  -
    author: "CODER"
    body: "Reopened before merge: hosted full-fast verification found a legacy evaluator run input without reworkContext and four newly unused evaluator exports. Restore compatibility defaulting and remove dead exports, then repeat CI-equivalent checks."
  -
    author: "CODER"
    body: "Verified: pre-merge closure packet is ready for the task PR."
events:
  -
    type: "status"
    at: "2026-07-27T12:39:26.802Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-07-27T13:54:47.732Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Implemented: added frozen EVALUATOR work-order preparation, strict typed result application, stale and frozen-evidence rejection, and a human-provenance compatibility facade. Added evaluator prepare/apply CLI surfaces and recorded their reviewed additive compatibility delta. Checks: focused evaluator and route tests, agentplane typecheck, lifecycle invariants, schemas, compatibility ratchet, policy routing, and touched-file lint."
  -
    type: "verify"
    at: "2026-07-27T13:56:01.444Z"
    author: "TESTER"
    state: "ok"
    note: "Verified RF-12a against all five task steps: 14 focused evaluator tests cover prepared frozen evidence, strict typed apply, staleness and mutation rejection, in-process use cases, and distinct human provenance. schema check, lifecycle invariants, agentplane typecheck, policy routing, and the reviewed compatibility ratchet passed."
  -
    type: "status"
    at: "2026-07-27T13:58:15.547Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: pre-merge closure packet is ready for the task PR."
  -
    type: "status"
    at: "2026-07-27T14:09:54.199Z"
    author: "CODER"
    from: "DONE"
    to: "DOING"
    note: "Reopened before merge: GitHub verify-contract found the generated CLI reference stale after the additive evaluator prepare/apply command surface. Regenerate the reference and repeat verification and quality review."
  -
    type: "status"
    at: "2026-07-27T14:12:07.086Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: pre-merge closure packet is ready for the task PR."
  -
    type: "status"
    at: "2026-07-27T14:20:52.327Z"
    author: "CODER"
    from: "DONE"
    to: "DOING"
    note: "Reopened before merge: hosted full-fast verification found a legacy evaluator run input without reworkContext and four newly unused evaluator exports. Restore compatibility defaulting and remove dead exports, then repeat CI-equivalent checks."
  -
    type: "status"
    at: "2026-07-27T14:32:21.477Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
  -
    type: "status"
    at: "2026-07-27T14:37:05.375Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: pre-merge closure packet is ready for the task PR."
doc_version: 3
doc_updated_at: "2026-07-27T14:37:05.376Z"
doc_updated_by: "CODER"
description: "RF-12a/RF-25a: split evaluator into typed prepare and apply use cases over frozen task revision, evaluated SHA, actual diff, observed checks, acceptance, policy, blueprint, and knowledge evidence."
sections:
  Summary: |-
    Prepare and apply typed evaluator results

    RF-12a/RF-25a: split evaluator into typed prepare and apply use cases over frozen task revision, evaluated SHA, actual diff, observed checks, acceptance, policy, blueprint, and knowledge evidence.
  Scope: |-
    - In scope: EvaluatorWorkOrder preparation, existing EvaluatorSgrResult validation, typed in-process prepare/apply results, read-only authority, frozen evidence, staleness rejection, finding evidence refs, and compatibility recording facade.
    - Out of scope: launching/calibrating the EVALUATOR model episode, which is the next task.
  Plan: |-
    1. Prepare evaluator input from immutable acceptance, revision, SHA, observed receipt, diff, policy, blueprint, and knowledge refs.
    2. Return typed use-case data rather than reading/writing verdicts through CLI args/stdout.
    3. Validate EvaluatorSgrResult schema, evidence refs, uncertainty, and action recommendations.
    4. Apply only against the exact frozen fingerprint and reject evaluator attempts to mutate implementation.
    5. Preserve an explicit human-record compatibility path with provenance.
  Verify Steps: |-
    1. Prepare evaluator evidence for code, docs, metadata-only, and context tasks. Expected: frozen revision/SHA, actual diff/checks, acceptance, and semantic criteria are complete.
    2. Apply valid, stale, missing-evidence, and mutation-attempt results. Expected: only the valid read-only result changes quality state.
    3. Call the use cases in-process. Expected: no stdout capture or rendered shell command is required.
    4. Record a human verdict through compatibility mode. Expected: it is distinguishable from an EVALUATOR result.
    5. Run schema, evaluator, lifecycle, and type checks.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-07-27T13:56:01.444Z — VERIFY — ok

    By: TESTER

    Note: Verified RF-12a against all five task steps: 14 focused evaluator tests cover prepared frozen evidence, strict typed apply, staleness and mutation rejection, in-process use cases, and distinct human provenance. schema check, lifecycle invariants, agentplane typecheck, policy routing, and the reviewed compatibility ratchet passed.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-27T13:54:47.732Z, excerpt_hash=sha256:188ee92348d41c7804af84cdcded4e552bb72d26005880802f0c3af4076e68d8

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/rf05b-integration-base/.agentplane/worktrees/202607221849-TBTX8X-prepare-and-apply-typed-evaluator-results/.agentplane/tasks/202607221849-TBTX8X/blueprint/resolved-snapshot.json
    - old_digest: f51d20f20e8dc6bd8b451f07f90c56218d7fa8709e0505633fe075ab9f5a9f53
    - current_digest: f51d20f20e8dc6bd8b451f07f90c56218d7fa8709e0505633fe075ab9f5a9f53
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607221849-TBTX8X

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202607221849-TBTX8X
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert the task implementation commit(s) while preserving unrelated task and migration state.
    - Restore the previous compatibility view or persisted contract version.
    - Re-run focused contract, migration, and type checks.
  Findings: |-
    - Observation: Focused evaluator suite: 14 passed; schemas, lifecycle invariants, typecheck, policy routing, and compatibility baseline passed.
      Impact: Prepared evaluator work orders and typed result application meet the task acceptance criteria without stdout coupling or evaluator mutation authority.
      Resolution: Record OK verification and hand off to the EVALUATOR quality gate.
extensions:
  agentplane.side_effect_authority:
    audit:
      -
        actor: "USER"
        at: "2026-07-27T12:39:50.579Z"
        authorityDigest: "sha256:df027ed543f52347e7a237be8829192cea39c4b4d16ee9964ec52910560e8033"
        digest: "sha256:4937debf03916ca4a673e407d6fe6f23f3cc9f340fa6de89388928c28b0a55b5"
        operationDigest: "sha256:58c6bd2ea8286815628d2c349bff38a79fcf6151ab1f3f008fe7b17591b064b3"
        operationId: "pr.open"
        outcome: "approved"
        policyRule: "workflow.external_reversible"
        previousDigest: null
        schemaVersion: 1
        sequence: 1
        stateFingerprintDigest: "sha256:397cf7736ddd6cb72c1126f44b45e2649623d8e8d1576323f022699820808def"
      -
        actor: "USER"
        at: "2026-07-27T12:40:35.035Z"
        authorityDigest: "sha256:9c9f9ff083558405ccb8e249521bd0aff1f7f5a73b268af23995b3cc1644bcbc"
        digest: "sha256:ef7a052056b630b115958723cd17d689da1ef81c789c33c1fd3c8c041786f62e"
        operationDigest: "sha256:58c6bd2ea8286815628d2c349bff38a79fcf6151ab1f3f008fe7b17591b064b3"
        operationId: "pr.open"
        outcome: "approved"
        policyRule: "workflow.external_reversible"
        previousDigest: "sha256:4937debf03916ca4a673e407d6fe6f23f3cc9f340fa6de89388928c28b0a55b5"
        schemaVersion: 1
        sequence: 2
        stateFingerprintDigest: "sha256:7900a275d609a627926949796cfee406ce995e8bd532050ad79137c33a1f3dae"
      -
        actor: "USER"
        at: "2026-07-27T13:57:45.002Z"
        authorityDigest: "sha256:d9837156416e3a7db6506e66be20072f3f26a7fec9e3f92ea8f547fad51f263e"
        digest: "sha256:2deca4dd94ac7a07c62a7822cb7ba08deaed9cdd14210965e4d2727b0847df9e"
        operationDigest: "sha256:097c27defeecda2b05aa9aafe68863ea165adefc9ec1080e6c2c5e20a03a01b0"
        operationId: "task.pre_merge_close"
        outcome: "approved"
        policyRule: "workflow.external_high_risk"
        previousDigest: "sha256:ef7a052056b630b115958723cd17d689da1ef81c789c33c1fd3c8c041786f62e"
        schemaVersion: 1
        sequence: 3
        stateFingerprintDigest: "sha256:474ae5403fe85f9b493afa9418554985a193d88cbbe32594299f5a649ef9f50b"
      -
        actor: "USER"
        at: "2026-07-27T13:58:51.863Z"
        authorityDigest: "sha256:4e4ded612ca6d03bf12b940b37a0f0d22854d63d039974ee9bf75b3ab3788974"
        digest: "sha256:e38ff1289a33eae6e06c6a73d87e38c8d93e4a9955dc4cfe39c9327502be8bbc"
        operationDigest: "sha256:c63360b67d4cec342dc21a2ce591063ab7d4b9ebe056227237fc02000fa78ba2"
        operationId: "route.remote.refresh"
        outcome: "approved"
        policyRule: "workflow.external_reversible"
        previousDigest: "sha256:2deca4dd94ac7a07c62a7822cb7ba08deaed9cdd14210965e4d2727b0847df9e"
        schemaVersion: 1
        sequence: 4
        stateFingerprintDigest: "sha256:c2363c9666149f793cec8c79ecb5623f6778984b8c111b27feea44b4b278dc8d"
      -
        actor: "USER"
        at: "2026-07-27T14:00:15.780Z"
        authorityDigest: "sha256:e6bc8a74f13a55adb6368b1b3e0f8035b046402f920810758e5dab014726d27a"
        digest: "sha256:44356c2d3adcc43e4c5e378990c9dd4b5ef31ea524f3df1230e0840f3313a1ec"
        operationDigest: "sha256:0579b1ebc2b517f46f972beb4fc2a66c06e749c3951f471e66aa409f892413d2"
        operationId: "pr.head.publish"
        outcome: "approved"
        policyRule: "workflow.external_reversible"
        previousDigest: "sha256:e38ff1289a33eae6e06c6a73d87e38c8d93e4a9955dc4cfe39c9327502be8bbc"
        schemaVersion: 1
        sequence: 5
        stateFingerprintDigest: "sha256:69a10575ca2b085b320bc715668375f1d6d54849a94dc0356e3d46c74d66e7f5"
      -
        actor: "USER"
        at: "2026-07-27T14:04:46.669Z"
        authorityDigest: "sha256:04b6542808cd9fdb89cdfe48527a65d19d7099521723400bdc155bd7044cc056"
        digest: "sha256:18480a8459081e3643e94263c7f8b0f0d10b468950787ff20587dfd1cbf967a6"
        operationDigest: "sha256:593986e890b63f1c47df028f8354de1d29e6c94fe905abf0447a3e5ab532d0e5"
        operationId: "integration.enqueue"
        outcome: "approved"
        policyRule: "workflow.external_high_risk"
        previousDigest: "sha256:44356c2d3adcc43e4c5e378990c9dd4b5ef31ea524f3df1230e0840f3313a1ec"
        schemaVersion: 1
        sequence: 6
        stateFingerprintDigest: "sha256:1f138dd353b0a721749f634f8d3caae6e48f868ef5f94e6951cd1dfcec956b43"
      -
        actor: "USER"
        at: "2026-07-27T14:11:31.376Z"
        authorityDigest: "sha256:e35653d55584fb26e19626f9e29d87a8726e8775b505f5f6f36f5bcc2b4f237c"
        digest: "sha256:6ed85c4751683e49978e833940cce30d827a432352ff85837a35c6d21e3a5ed1"
        operationDigest: "sha256:097c27defeecda2b05aa9aafe68863ea165adefc9ec1080e6c2c5e20a03a01b0"
        operationId: "task.pre_merge_close"
        outcome: "approved"
        policyRule: "workflow.external_high_risk"
        previousDigest: "sha256:18480a8459081e3643e94263c7f8b0f0d10b468950787ff20587dfd1cbf967a6"
        schemaVersion: 1
        sequence: 7
        stateFingerprintDigest: "sha256:5f1be812fb74d9d98215ec5c8068471e562ef758a6b2f4e539113f2e3aa7972b"
      -
        actor: "USER"
        at: "2026-07-27T14:12:50.522Z"
        authorityDigest: "sha256:1924423e99b5d23267f4693cf55ff562905f6d286670a66751e88440b178aa61"
        digest: "sha256:662c8fc9e14959edc4f82c8c0dfb75076a25a38263e7c7cd53280965c411dd64"
        operationDigest: "sha256:c63360b67d4cec342dc21a2ce591063ab7d4b9ebe056227237fc02000fa78ba2"
        operationId: "route.remote.refresh"
        outcome: "approved"
        policyRule: "workflow.external_reversible"
        previousDigest: "sha256:6ed85c4751683e49978e833940cce30d827a432352ff85837a35c6d21e3a5ed1"
        schemaVersion: 1
        sequence: 8
        stateFingerprintDigest: "sha256:c698c9a9af00e833a20cca0598b9f5ee9e5d47b907984dda5be39731b85bac06"
      -
        actor: "USER"
        at: "2026-07-27T14:13:46.250Z"
        authorityDigest: "sha256:48fd91b891c0c5acd74b2bf240154f6f2155211d01bb499b62a9e4240eb6d656"
        digest: "sha256:a16d4d987a856adf69fe66217318a9f5267c9b9b248b1741228dcd46cd1bf0bb"
        operationDigest: "sha256:0579b1ebc2b517f46f972beb4fc2a66c06e749c3951f471e66aa409f892413d2"
        operationId: "pr.head.publish"
        outcome: "approved"
        policyRule: "workflow.external_reversible"
        previousDigest: "sha256:662c8fc9e14959edc4f82c8c0dfb75076a25a38263e7c7cd53280965c411dd64"
        schemaVersion: 1
        sequence: 9
        stateFingerprintDigest: "sha256:9442275970b58b53afd1892f481461da73752ebb081dc0d7ffb1541e46d05ffc"
      -
        actor: "USER"
        at: "2026-07-27T14:36:46.644Z"
        authorityDigest: "sha256:cba3afc1039d9eb1405bf26ee698e4043cb23eb981baff7b6cbcded2c4827b49"
        digest: "sha256:58a3306d5b2a29d55865b15608f609ae50242841ef47e80d08dd9ace00b564f1"
        operationDigest: "sha256:097c27defeecda2b05aa9aafe68863ea165adefc9ec1080e6c2c5e20a03a01b0"
        operationId: "task.pre_merge_close"
        outcome: "approved"
        policyRule: "workflow.external_high_risk"
        previousDigest: "sha256:a16d4d987a856adf69fe66217318a9f5267c9b9b248b1741228dcd46cd1bf0bb"
        schemaVersion: 1
        sequence: 10
        stateFingerprintDigest: "sha256:8f632244045193f3b60d860cac946fb38c05e74b14227ae4b91317bfdf9be3bb"
    grants:
      -
        actor: "USER"
        digest: "sha256:df027ed543f52347e7a237be8829192cea39c4b4d16ee9964ec52910560e8033"
        expiresAt: "2026-07-27T12:54:50.579Z"
        id: "authority-45c1d5b7-8a2b-4184-84c1-03bf8c40ceb6"
        issuedAt: "2026-07-27T12:39:50.579Z"
        kind: "side_effect_authority"
        operationDigest: "sha256:58c6bd2ea8286815628d2c349bff38a79fcf6151ab1f3f008fe7b17591b064b3"
        operationId: "pr.open"
        policyRule: "workflow.external_reversible"
        schemaVersion: 1
        stateFingerprintDigest: "sha256:397cf7736ddd6cb72c1126f44b45e2649623d8e8d1576323f022699820808def"
        stateScopeDigest: "sha256:fa4b29b7fe691047deba1f2f471c16ffaa9112d7416dab23bb6364491cd5732a"
      -
        actor: "USER"
        digest: "sha256:9c9f9ff083558405ccb8e249521bd0aff1f7f5a73b268af23995b3cc1644bcbc"
        expiresAt: "2026-07-27T12:55:35.035Z"
        id: "authority-67948e57-0ad6-4689-bb01-6c6b62bc0dd5"
        issuedAt: "2026-07-27T12:40:35.035Z"
        kind: "side_effect_authority"
        operationDigest: "sha256:58c6bd2ea8286815628d2c349bff38a79fcf6151ab1f3f008fe7b17591b064b3"
        operationId: "pr.open"
        policyRule: "workflow.external_reversible"
        schemaVersion: 1
        stateFingerprintDigest: "sha256:7900a275d609a627926949796cfee406ce995e8bd532050ad79137c33a1f3dae"
        stateScopeDigest: "sha256:4b24092296d1df3b5312fed6bae80d1cca5b75782afcfd4c0f2043d275155875"
      -
        actor: "USER"
        digest: "sha256:d9837156416e3a7db6506e66be20072f3f26a7fec9e3f92ea8f547fad51f263e"
        expiresAt: "2026-07-27T14:12:45.002Z"
        id: "authority-17290cd7-a44c-4ac0-b5af-a986b81673fa"
        issuedAt: "2026-07-27T13:57:45.002Z"
        kind: "side_effect_authority"
        operationDigest: "sha256:097c27defeecda2b05aa9aafe68863ea165adefc9ec1080e6c2c5e20a03a01b0"
        operationId: "task.pre_merge_close"
        policyRule: "workflow.external_high_risk"
        schemaVersion: 1
        stateFingerprintDigest: "sha256:474ae5403fe85f9b493afa9418554985a193d88cbbe32594299f5a649ef9f50b"
        stateScopeDigest: "sha256:71e3ca58fb88ddac1b173c577c06d0f6f6c08bd4bf433aeec95f83affa86c01c"
      -
        actor: "USER"
        digest: "sha256:4e4ded612ca6d03bf12b940b37a0f0d22854d63d039974ee9bf75b3ab3788974"
        expiresAt: "2026-07-27T14:13:51.863Z"
        id: "authority-3327788d-21ed-4ced-8016-c02ea8d03565"
        issuedAt: "2026-07-27T13:58:51.863Z"
        kind: "side_effect_authority"
        operationDigest: "sha256:c63360b67d4cec342dc21a2ce591063ab7d4b9ebe056227237fc02000fa78ba2"
        operationId: "route.remote.refresh"
        policyRule: "workflow.external_reversible"
        schemaVersion: 1
        stateFingerprintDigest: "sha256:c2363c9666149f793cec8c79ecb5623f6778984b8c111b27feea44b4b278dc8d"
        stateScopeDigest: "sha256:fbeacc5e0893ae024093b8ba507f483dd3c6f486a7fb0bf220922d2c62987aee"
      -
        actor: "USER"
        digest: "sha256:e6bc8a74f13a55adb6368b1b3e0f8035b046402f920810758e5dab014726d27a"
        expiresAt: "2026-07-27T14:15:15.780Z"
        id: "authority-84338380-fb4c-445f-9e35-47cce04d3196"
        issuedAt: "2026-07-27T14:00:15.780Z"
        kind: "side_effect_authority"
        operationDigest: "sha256:0579b1ebc2b517f46f972beb4fc2a66c06e749c3951f471e66aa409f892413d2"
        operationId: "pr.head.publish"
        policyRule: "workflow.external_reversible"
        schemaVersion: 1
        stateFingerprintDigest: "sha256:69a10575ca2b085b320bc715668375f1d6d54849a94dc0356e3d46c74d66e7f5"
        stateScopeDigest: "sha256:abd9e46633f534c7c939f432efc2829bcba45fcc3f82fff4d96bc6f44d7d0b1f"
      -
        actor: "USER"
        digest: "sha256:04b6542808cd9fdb89cdfe48527a65d19d7099521723400bdc155bd7044cc056"
        expiresAt: "2026-07-27T14:19:46.669Z"
        id: "authority-0e950948-ec6b-4798-a8dc-009ae06e3c65"
        issuedAt: "2026-07-27T14:04:46.669Z"
        kind: "side_effect_authority"
        operationDigest: "sha256:593986e890b63f1c47df028f8354de1d29e6c94fe905abf0447a3e5ab532d0e5"
        operationId: "integration.enqueue"
        policyRule: "workflow.external_high_risk"
        schemaVersion: 1
        stateFingerprintDigest: "sha256:1f138dd353b0a721749f634f8d3caae6e48f868ef5f94e6951cd1dfcec956b43"
        stateScopeDigest: "sha256:903d0703d247196aab44ecd34de064349ee46c1fdb138cf33dae0cfaabc0b7c4"
      -
        actor: "USER"
        digest: "sha256:e35653d55584fb26e19626f9e29d87a8726e8775b505f5f6f36f5bcc2b4f237c"
        expiresAt: "2026-07-27T14:26:31.376Z"
        id: "authority-284fa716-69c1-42ac-968d-97adfce7a26e"
        issuedAt: "2026-07-27T14:11:31.376Z"
        kind: "side_effect_authority"
        operationDigest: "sha256:097c27defeecda2b05aa9aafe68863ea165adefc9ec1080e6c2c5e20a03a01b0"
        operationId: "task.pre_merge_close"
        policyRule: "workflow.external_high_risk"
        schemaVersion: 1
        stateFingerprintDigest: "sha256:5f1be812fb74d9d98215ec5c8068471e562ef758a6b2f4e539113f2e3aa7972b"
        stateScopeDigest: "sha256:042b2b998653e7cd8f8487eaf984e2e5a3de3ae7ba8e2721468a43427617ff0c"
      -
        actor: "USER"
        digest: "sha256:1924423e99b5d23267f4693cf55ff562905f6d286670a66751e88440b178aa61"
        expiresAt: "2026-07-27T14:27:50.522Z"
        id: "authority-d54a4884-97bb-468f-b62b-5809acdec812"
        issuedAt: "2026-07-27T14:12:50.522Z"
        kind: "side_effect_authority"
        operationDigest: "sha256:c63360b67d4cec342dc21a2ce591063ab7d4b9ebe056227237fc02000fa78ba2"
        operationId: "route.remote.refresh"
        policyRule: "workflow.external_reversible"
        schemaVersion: 1
        stateFingerprintDigest: "sha256:c698c9a9af00e833a20cca0598b9f5ee9e5d47b907984dda5be39731b85bac06"
        stateScopeDigest: "sha256:fd7b85db08b8c65741bfccb5e2adb04537ba59c66748d32a5e2495842f4cf796"
      -
        actor: "USER"
        digest: "sha256:48fd91b891c0c5acd74b2bf240154f6f2155211d01bb499b62a9e4240eb6d656"
        expiresAt: "2026-07-27T14:28:46.250Z"
        id: "authority-9cf95f36-a094-4af8-9123-e2271d81ef42"
        issuedAt: "2026-07-27T14:13:46.250Z"
        kind: "side_effect_authority"
        operationDigest: "sha256:0579b1ebc2b517f46f972beb4fc2a66c06e749c3951f471e66aa409f892413d2"
        operationId: "pr.head.publish"
        policyRule: "workflow.external_reversible"
        schemaVersion: 1
        stateFingerprintDigest: "sha256:9442275970b58b53afd1892f481461da73752ebb081dc0d7ffb1541e46d05ffc"
        stateScopeDigest: "sha256:7dd2ce7260614e1ac1f13ef98164701fd29d5b75476246354e4b3f05f6a52b4e"
      -
        actor: "USER"
        digest: "sha256:cba3afc1039d9eb1405bf26ee698e4043cb23eb981baff7b6cbcded2c4827b49"
        expiresAt: "2026-07-27T14:51:46.644Z"
        id: "authority-732be7c1-da9c-4cf3-a9cc-b59bfd768c79"
        issuedAt: "2026-07-27T14:36:46.644Z"
        kind: "side_effect_authority"
        operationDigest: "sha256:097c27defeecda2b05aa9aafe68863ea165adefc9ec1080e6c2c5e20a03a01b0"
        operationId: "task.pre_merge_close"
        policyRule: "workflow.external_high_risk"
        schemaVersion: 1
        stateFingerprintDigest: "sha256:8f632244045193f3b60d860cac946fb38c05e74b14227ae4b91317bfdf9be3bb"
        stateScopeDigest: "sha256:b7dc9f041219d33cff8d0cecedcadb41ab2a75ab8571366a42997ac45194424b"
    schemaVersion: 1
  workflow_route_baseline:
    start_head_sha: "f5b987c4b7aabd4830b202c0b6e902211f8abdc4"
    version: 1
id_source: "generated"
---
## Summary

Prepare and apply typed evaluator results

RF-12a/RF-25a: split evaluator into typed prepare and apply use cases over frozen task revision, evaluated SHA, actual diff, observed checks, acceptance, policy, blueprint, and knowledge evidence.

## Scope

- In scope: EvaluatorWorkOrder preparation, existing EvaluatorSgrResult validation, typed in-process prepare/apply results, read-only authority, frozen evidence, staleness rejection, finding evidence refs, and compatibility recording facade.
- Out of scope: launching/calibrating the EVALUATOR model episode, which is the next task.

## Plan

1. Prepare evaluator input from immutable acceptance, revision, SHA, observed receipt, diff, policy, blueprint, and knowledge refs.
2. Return typed use-case data rather than reading/writing verdicts through CLI args/stdout.
3. Validate EvaluatorSgrResult schema, evidence refs, uncertainty, and action recommendations.
4. Apply only against the exact frozen fingerprint and reject evaluator attempts to mutate implementation.
5. Preserve an explicit human-record compatibility path with provenance.

## Verify Steps

1. Prepare evaluator evidence for code, docs, metadata-only, and context tasks. Expected: frozen revision/SHA, actual diff/checks, acceptance, and semantic criteria are complete.
2. Apply valid, stale, missing-evidence, and mutation-attempt results. Expected: only the valid read-only result changes quality state.
3. Call the use cases in-process. Expected: no stdout capture or rendered shell command is required.
4. Record a human verdict through compatibility mode. Expected: it is distinguishable from an EVALUATOR result.
5. Run schema, evaluator, lifecycle, and type checks.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-07-27T13:56:01.444Z — VERIFY — ok

By: TESTER

Note: Verified RF-12a against all five task steps: 14 focused evaluator tests cover prepared frozen evidence, strict typed apply, staleness and mutation rejection, in-process use cases, and distinct human provenance. schema check, lifecycle invariants, agentplane typecheck, policy routing, and the reviewed compatibility ratchet passed.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-27T13:54:47.732Z, excerpt_hash=sha256:188ee92348d41c7804af84cdcded4e552bb72d26005880802f0c3af4076e68d8

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/rf05b-integration-base/.agentplane/worktrees/202607221849-TBTX8X-prepare-and-apply-typed-evaluator-results/.agentplane/tasks/202607221849-TBTX8X/blueprint/resolved-snapshot.json
- old_digest: f51d20f20e8dc6bd8b451f07f90c56218d7fa8709e0505633fe075ab9f5a9f53
- current_digest: f51d20f20e8dc6bd8b451f07f90c56218d7fa8709e0505633fe075ab9f5a9f53
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607221849-TBTX8X

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202607221849-TBTX8X
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert the task implementation commit(s) while preserving unrelated task and migration state.
- Restore the previous compatibility view or persisted contract version.
- Re-run focused contract, migration, and type checks.

## Findings

- Observation: Focused evaluator suite: 14 passed; schemas, lifecycle invariants, typecheck, policy routing, and compatibility baseline passed.
  Impact: Prepared evaluator work orders and typed result application meet the task acceptance criteria without stdout coupling or evaluator mutation authority.
  Resolution: Record OK verification and hand off to the EVALUATOR quality gate.
