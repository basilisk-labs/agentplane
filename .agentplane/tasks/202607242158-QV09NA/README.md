---
id: "202607242158-QV09NA"
title: "Resolve durable runner effects in doubt without duplicate execution"
result_summary: "pre-merge closure"
status: "DONE"
priority: "high"
owner: "CODER"
revision: 32
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
  state: "ok"
  updated_at: "2026-07-27T06:38:24.275Z"
  updated_by: "TESTER"
  note: "Local verification passed: 65 focused resolution/operation/state tests, 32 unresolved-effect cancel/reconcile/concurrency tests, critical CLI suite, lifecycle invariants, guards, typecheck, compatibility baseline, formatter, and diff check. Concurrent identical intents converge; conflicting verdicts reject without adapter execution."
  attempts: 0
quality_review:
  state: "pass"
  provenance: "evaluator_supplied"
  updated_at: "2026-07-27T07:02:42.678Z"
  updated_by: "EVALUATOR"
  note: "Reviewed 7f6761b: hot-path extraction preserves the explicit operator-resolution boundary and restores all enforced module-size budgets."
  evaluated_sha: "7f6761be42d40ba041572448685f0888a23b17be"
  blueprint_digest: "75a878e6fa748741215c6aa80666e64b74720ea6a76c75ddb6420687f27fc05f"
  evidence_refs:
    - ".agentplane/tasks/202607242158-QV09NA/README.md"
    - ".agentplane/tasks/202607242158-QV09NA/quality/20260727-070242678-recovery-context/quality-report.json"
    - ".agentplane/tasks/202607242158-QV09NA/quality/20260727-070242678-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202607242158-QV09NA/quality/20260727-070242678-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202607242158-QV09NA/blueprint/resolved-snapshot.json"
    - "git diff --find-renames --find-copies --stat 7f6761b^ 7f6761b"
    - "bunx vitest run task-run-active-claim-{concurrency,history-safe,reconciliation}.test.ts task-run-active-claim.test.ts task-run-effect-resolution.test.ts task-run-lifecycle-cancel-effect-in-doubt.test.ts (67 passed)"
    - "bun run hotspots:check (runtime threshold and oversized-test baseline passed)"
    - "bun run typecheck && bun run lifecycle:invariants && bun run guards:check && bun run format:check && bun run test:critical"
  findings:
    - "The dedicated retirement module remains reachable only from effect resolution; it requires an exact durable resolution reference before stale-claim retirement."
    - "The resolve-effect and resume-effect command contracts are re-exported unchanged from the stable task-run command module; direct CLI help and focused regression suites preserve the public surface."
commit:
  hash: "2d735bbb41c251281b9239d730bc22ae6fc42c76"
  message: "✨ QV09NA task: record renewed closure authority"
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "CODER"
    body: "Implementation committed: durable operator-supplied effect resolution, isolated claim retirement, and dedicated fresh-key resume after not_applied."
  -
    author: "CODER"
    body: "Verified: pre-merge closure packet is ready for the task PR."
  -
    author: "CODER"
    body: "Verified: refreshed pre-merge closure packet is ready for the task PR."
events:
  -
    type: "status"
    at: "2026-07-27T05:36:45.776Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-07-27T06:36:34.484Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: durable operator-supplied effect resolution, isolated claim retirement, and dedicated fresh-key resume after not_applied."
  -
    type: "verify"
    at: "2026-07-27T06:38:24.275Z"
    author: "TESTER"
    state: "ok"
    note: "Local verification passed: 65 focused resolution/operation/state tests, 32 unresolved-effect cancel/reconcile/concurrency tests, critical CLI suite, lifecycle invariants, guards, typecheck, compatibility baseline, formatter, and diff check. Concurrent identical intents converge; conflicting verdicts reject without adapter execution."
  -
    type: "status"
    at: "2026-07-27T06:39:30.103Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: pre-merge closure packet is ready for the task PR."
  -
    type: "status"
    at: "2026-07-27T06:47:44.140Z"
    author: "CODER"
    from: "DONE"
    to: "DONE"
    note: "Verified: refreshed pre-merge closure packet is ready for the task PR."
doc_version: 3
doc_updated_at: "2026-07-27T06:47:44.141Z"
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
    ### 2026-07-27T06:38:24.275Z — VERIFY — ok

    By: TESTER

    Note: Local verification passed: 65 focused resolution/operation/state tests, 32 unresolved-effect cancel/reconcile/concurrency tests, critical CLI suite, lifecycle invariants, guards, typecheck, compatibility baseline, formatter, and diff check. Concurrent identical intents converge; conflicting verdicts reject without adapter execution.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-27T06:36:34.484Z, excerpt_hash=sha256:36c83d45021296a1a33d2c8b29198a53b6f5104ea1fee8a63c5e13ae454acc25

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/rf05b-integration-base/.agentplane/worktrees/202607242158-QV09NA-resolve-durable-runner-effects-in-doubt-without/.agentplane/tasks/202607242158-QV09NA/blueprint/resolved-snapshot.json
    - old_digest: 75a878e6fa748741215c6aa80666e64b74720ea6a76c75ddb6420687f27fc05f
    - current_digest: 75a878e6fa748741215c6aa80666e64b74720ea6a76c75ddb6420687f27fc05f
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607242158-QV09NA

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202607242158-QV09NA
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

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
      -
        actor: "USER"
        at: "2026-07-27T05:39:07.913Z"
        authorityDigest: "sha256:d44ada963b91b76bea2343a358e531b82c73f0cdd4f71378425896dfb511f014"
        digest: "sha256:2190db5e5f91e6dcd59a23815691c4f9e4597c79eedd900147cf0919a4d9c488"
        operationDigest: "sha256:0ab7ef4840f3381d328d0f7c4bfb504c3732f12dff9d017cf2965fc267830187"
        operationId: "pr.open"
        outcome: "approved"
        policyRule: "workflow.external_reversible"
        previousDigest: "sha256:e660bbf6ca10d6f7edcc3cc461f3bacb52ef900f2b07e069edc81f298a627e69"
        schemaVersion: 1
        sequence: 2
        stateFingerprintDigest: "sha256:e5c4c64ecb9036243a3f4e2c03616fec6929ff5ee417046a57f261bda8e153e6"
      -
        actor: "USER"
        at: "2026-07-27T06:39:12.065Z"
        authorityDigest: "sha256:6f8d5cfebd9dcb5eacc63f4c546027eed78595ba5caa0b4a40eb5f7b2092a938"
        digest: "sha256:f6f7f661c11fb445adf9abfc65cc57e0dcfe5a69e1d227e4e187acba8db44df1"
        operationDigest: "sha256:ad973ccca9732c052c5e63e0a8dd3b7d714b321966cf5f73ac6b4b913848f13b"
        operationId: "task.pre_merge_close"
        outcome: "approved"
        policyRule: "workflow.external_high_risk"
        previousDigest: "sha256:2190db5e5f91e6dcd59a23815691c4f9e4597c79eedd900147cf0919a4d9c488"
        schemaVersion: 1
        sequence: 3
        stateFingerprintDigest: "sha256:c886e578174b1e82c1e22f8118c1ab21041c14c76eab6d18e99fba1bbb059257"
      -
        actor: "USER"
        at: "2026-07-27T06:39:47.505Z"
        authorityDigest: "sha256:9a35d7958b9e2646ecb751197333baba0f4626cb4a926a5ce16418cc53c49f4e"
        digest: "sha256:0332d18c146bccaa5508c8cee50fb09efd8caa83cbe18ff113413374b9f316fa"
        operationDigest: "sha256:678dbfd8e125bb2e9d731ae61cf92402ad28eb3dc2b6efcb9d907d8a3b668788"
        operationId: "route.remote.refresh"
        outcome: "approved"
        policyRule: "workflow.external_reversible"
        previousDigest: "sha256:f6f7f661c11fb445adf9abfc65cc57e0dcfe5a69e1d227e4e187acba8db44df1"
        schemaVersion: 1
        sequence: 4
        stateFingerprintDigest: "sha256:e275383d783567bca424c5ef6cf7bad192fef8f3ecceabb53930e9cb0aa29716"
      -
        actor: "USER"
        at: "2026-07-27T06:40:38.673Z"
        authorityDigest: "sha256:4ba9e3d423e28dd513623e00be4e115ed24c5dba0357756d538c995868dbee02"
        digest: "sha256:85aa1f281c48b32708f6b2d1714e456c841dc7d1dacac72dc45d1666c908c9e6"
        operationDigest: "sha256:346de02e6d0bd500858939132bf133df02e4c834b58a5d9657ee6d195c3d8d0a"
        operationId: "pr.head.publish"
        outcome: "approved"
        policyRule: "workflow.external_reversible"
        previousDigest: "sha256:0332d18c146bccaa5508c8cee50fb09efd8caa83cbe18ff113413374b9f316fa"
        schemaVersion: 1
        sequence: 5
        stateFingerprintDigest: "sha256:c8505445cada13519b000bcbf3a3e14f748c1e3cac38efa0bf21016fd66a1ed4"
      -
        actor: "USER"
        at: "2026-07-27T06:47:03.985Z"
        authorityDigest: "sha256:a9620041c2654044666ed5e332065d2e04100c73f0fb2c611cfb36b9f1d0ad10"
        digest: "sha256:e651fe9785513745974166206f886c9b43e0570fd26413a2273276c38e715a1b"
        operationDigest: "sha256:ddabd4f2ca41b67848e0b739df4a20643e6b907e0d773221f51a4a3a729f90c6"
        operationId: "task.pre_merge_close"
        outcome: "approved"
        policyRule: "workflow.external_high_risk"
        previousDigest: "sha256:85aa1f281c48b32708f6b2d1714e456c841dc7d1dacac72dc45d1666c908c9e6"
        schemaVersion: 1
        sequence: 6
        stateFingerprintDigest: "sha256:703197c5a17cfb6e0480322eb2bb76d449977d7702029aef2bd1aa10699af59f"
      -
        actor: "USER"
        at: "2026-07-27T06:48:04.883Z"
        authorityDigest: "sha256:089614821f62c3d0f7377cf04b232a79129bc8b0c776b73ee30f2ace0680cd86"
        digest: "sha256:b2545cc2f2a3b02104054afa7065ad5f89c88ce06cc0d1feef9136c847c913cb"
        operationDigest: "sha256:346de02e6d0bd500858939132bf133df02e4c834b58a5d9657ee6d195c3d8d0a"
        operationId: "pr.head.publish"
        outcome: "approved"
        policyRule: "workflow.external_reversible"
        previousDigest: "sha256:e651fe9785513745974166206f886c9b43e0570fd26413a2273276c38e715a1b"
        schemaVersion: 1
        sequence: 7
        stateFingerprintDigest: "sha256:7a4057f18b66309c6be8f4d0bbe8c6eb113cbd53a9f78a3ef4748ec8ca259e8c"
      -
        actor: "USER"
        at: "2026-07-27T11:06:13.700Z"
        authorityDigest: "sha256:847ae7e7d26fdf2ffda03532cc5faceb1638d177587277e8768b0abad0815a8c"
        digest: "sha256:526608f0ca277ab7f03d0a33447c427bfe9fe9fa907893f4a11be823a06ed37d"
        operationDigest: "sha256:ddabd4f2ca41b67848e0b739df4a20643e6b907e0d773221f51a4a3a729f90c6"
        operationId: "task.pre_merge_close"
        outcome: "approved"
        policyRule: "workflow.external_high_risk"
        previousDigest: "sha256:b2545cc2f2a3b02104054afa7065ad5f89c88ce06cc0d1feef9136c847c913cb"
        schemaVersion: 1
        sequence: 8
        stateFingerprintDigest: "sha256:f072709b6203a575dd0a793e8de01137a1fc7432a55528ba6b6dd2b90cf2ede7"
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
      -
        actor: "USER"
        digest: "sha256:d44ada963b91b76bea2343a358e531b82c73f0cdd4f71378425896dfb511f014"
        expiresAt: "2026-07-27T05:54:07.913Z"
        id: "authority-f2a4220b-3948-4f19-8eaf-a4542f9b3cf0"
        issuedAt: "2026-07-27T05:39:07.913Z"
        kind: "side_effect_authority"
        operationDigest: "sha256:0ab7ef4840f3381d328d0f7c4bfb504c3732f12dff9d017cf2965fc267830187"
        operationId: "pr.open"
        policyRule: "workflow.external_reversible"
        schemaVersion: 1
        stateFingerprintDigest: "sha256:e5c4c64ecb9036243a3f4e2c03616fec6929ff5ee417046a57f261bda8e153e6"
        stateScopeDigest: "sha256:1235a3b8ddb3c9524d4372c6f8027f3c1b9ec0291282a9575cfc811607e91493"
      -
        actor: "USER"
        digest: "sha256:6f8d5cfebd9dcb5eacc63f4c546027eed78595ba5caa0b4a40eb5f7b2092a938"
        expiresAt: "2026-07-27T06:54:12.065Z"
        id: "authority-9baa32ad-a8bb-4996-9eb5-a9a684aa1e53"
        issuedAt: "2026-07-27T06:39:12.065Z"
        kind: "side_effect_authority"
        operationDigest: "sha256:ad973ccca9732c052c5e63e0a8dd3b7d714b321966cf5f73ac6b4b913848f13b"
        operationId: "task.pre_merge_close"
        policyRule: "workflow.external_high_risk"
        schemaVersion: 1
        stateFingerprintDigest: "sha256:c886e578174b1e82c1e22f8118c1ab21041c14c76eab6d18e99fba1bbb059257"
        stateScopeDigest: "sha256:7e76632026b9f2102791cfec8702eb6fe3d691d03fe26fdd6d59d87100de9a78"
      -
        actor: "USER"
        digest: "sha256:9a35d7958b9e2646ecb751197333baba0f4626cb4a926a5ce16418cc53c49f4e"
        expiresAt: "2026-07-27T06:54:47.505Z"
        id: "authority-fe44aa45-8a9f-4d78-81e1-55b1c84a41cc"
        issuedAt: "2026-07-27T06:39:47.505Z"
        kind: "side_effect_authority"
        operationDigest: "sha256:678dbfd8e125bb2e9d731ae61cf92402ad28eb3dc2b6efcb9d907d8a3b668788"
        operationId: "route.remote.refresh"
        policyRule: "workflow.external_reversible"
        schemaVersion: 1
        stateFingerprintDigest: "sha256:e275383d783567bca424c5ef6cf7bad192fef8f3ecceabb53930e9cb0aa29716"
        stateScopeDigest: "sha256:9f61c5c563401e1bf325ebe49df8874317835049f2f41b783823ab9a42f8943c"
      -
        actor: "USER"
        digest: "sha256:4ba9e3d423e28dd513623e00be4e115ed24c5dba0357756d538c995868dbee02"
        expiresAt: "2026-07-27T06:55:38.673Z"
        id: "authority-825e0b70-3db2-4735-928d-1c3e6331e1d4"
        issuedAt: "2026-07-27T06:40:38.673Z"
        kind: "side_effect_authority"
        operationDigest: "sha256:346de02e6d0bd500858939132bf133df02e4c834b58a5d9657ee6d195c3d8d0a"
        operationId: "pr.head.publish"
        policyRule: "workflow.external_reversible"
        schemaVersion: 1
        stateFingerprintDigest: "sha256:c8505445cada13519b000bcbf3a3e14f748c1e3cac38efa0bf21016fd66a1ed4"
        stateScopeDigest: "sha256:7db76882455ae00194ce6ba170d125fb0a0b392589287642bfedaf5a11bd06fd"
      -
        actor: "USER"
        digest: "sha256:a9620041c2654044666ed5e332065d2e04100c73f0fb2c611cfb36b9f1d0ad10"
        expiresAt: "2026-07-27T07:02:03.985Z"
        id: "authority-c7a0c267-b995-4ba1-8a03-898796d9bd75"
        issuedAt: "2026-07-27T06:47:03.985Z"
        kind: "side_effect_authority"
        operationDigest: "sha256:ddabd4f2ca41b67848e0b739df4a20643e6b907e0d773221f51a4a3a729f90c6"
        operationId: "task.pre_merge_close"
        policyRule: "workflow.external_high_risk"
        schemaVersion: 1
        stateFingerprintDigest: "sha256:703197c5a17cfb6e0480322eb2bb76d449977d7702029aef2bd1aa10699af59f"
        stateScopeDigest: "sha256:8ee2a13a49567aea24754ea9fb5600132cd3600b90e1107702376ff1345fde0f"
      -
        actor: "USER"
        digest: "sha256:089614821f62c3d0f7377cf04b232a79129bc8b0c776b73ee30f2ace0680cd86"
        expiresAt: "2026-07-27T07:03:04.883Z"
        id: "authority-ace41562-c3fc-445a-a499-73fb6ac13f4f"
        issuedAt: "2026-07-27T06:48:04.883Z"
        kind: "side_effect_authority"
        operationDigest: "sha256:346de02e6d0bd500858939132bf133df02e4c834b58a5d9657ee6d195c3d8d0a"
        operationId: "pr.head.publish"
        policyRule: "workflow.external_reversible"
        schemaVersion: 1
        stateFingerprintDigest: "sha256:7a4057f18b66309c6be8f4d0bbe8c6eb113cbd53a9f78a3ef4748ec8ca259e8c"
        stateScopeDigest: "sha256:9d1f581d6f77756f658252cf247cc75b295e3efe8cf1867602b2db9845bc1e76"
      -
        actor: "USER"
        digest: "sha256:847ae7e7d26fdf2ffda03532cc5faceb1638d177587277e8768b0abad0815a8c"
        expiresAt: "2026-07-27T11:21:13.700Z"
        id: "authority-3b220083-f5e2-462f-81e1-65469b9eda71"
        issuedAt: "2026-07-27T11:06:13.700Z"
        kind: "side_effect_authority"
        operationDigest: "sha256:ddabd4f2ca41b67848e0b739df4a20643e6b907e0d773221f51a4a3a729f90c6"
        operationId: "task.pre_merge_close"
        policyRule: "workflow.external_high_risk"
        schemaVersion: 1
        stateFingerprintDigest: "sha256:f072709b6203a575dd0a793e8de01137a1fc7432a55528ba6b6dd2b90cf2ede7"
        stateScopeDigest: "sha256:005fb04be1c4ea0427b043d581c2cc00e0bc2693351c872be0a9490dc3101ed2"
    schemaVersion: 1
  implementation_commit:
    hash: "90d33ac632e4181385fc8cf59b37c8badc3fa1d2"
    message: "🐛 QV09NA effect-in-doubt: format resolution coverage"
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
### 2026-07-27T06:38:24.275Z — VERIFY — ok

By: TESTER

Note: Local verification passed: 65 focused resolution/operation/state tests, 32 unresolved-effect cancel/reconcile/concurrency tests, critical CLI suite, lifecycle invariants, guards, typecheck, compatibility baseline, formatter, and diff check. Concurrent identical intents converge; conflicting verdicts reject without adapter execution.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-27T06:36:34.484Z, excerpt_hash=sha256:36c83d45021296a1a33d2c8b29198a53b6f5104ea1fee8a63c5e13ae454acc25

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/rf05b-integration-base/.agentplane/worktrees/202607242158-QV09NA-resolve-durable-runner-effects-in-doubt-without/.agentplane/tasks/202607242158-QV09NA/blueprint/resolved-snapshot.json
- old_digest: 75a878e6fa748741215c6aa80666e64b74720ea6a76c75ddb6420687f27fc05f
- current_digest: 75a878e6fa748741215c6aa80666e64b74720ea6a76c75ddb6420687f27fc05f
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607242158-QV09NA

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202607242158-QV09NA
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert the implementation commits while retaining this task and the RF-06 fail-closed guards.
- Do not delete or reinterpret already persisted effect_in_doubt evidence; keep unresolved records blocked for manual inspection.
- Restore the prior compatibility projection only after focused lifecycle, restart and concurrency tests pass.

## Findings

- Split from effect journal creation after read-only design audit showed one combined task would cross schema/persistence and operator-resolution verification boundaries and likely repeat RF-06 scale.
- Contract guarantee is no duplicate AgentPlane adapter spawn for one operation key; generic exactly-once external effects require provider-key support and are never implied.
- This task intentionally waits for RF-06b, RF-13, RF-03, the journal leaf and the graph amendment.
