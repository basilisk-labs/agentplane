---
id: "202607242158-QV09NA"
title: "Resolve durable runner effects in doubt without duplicate execution"
result_summary: "pre-merge closure"
status: "DONE"
priority: "high"
owner: "CODER"
revision: 46
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
  updated_at: "2026-07-27T11:45:13.384Z"
  updated_by: "EVALUATOR"
  note: "Reviewed the post-CI repair at 4aa3d6f36e62: it removes only an unused public type re-export and makes three routing fixtures explicitly represent the already-committed, verified state their asserted integration routes require. No runner-effect verdict, claim-retirement, adapter-call, or retry semantics changed."
  evaluated_sha: "4aa3d6f36e621a7446fbb96c9f2b2ee7f180f8d7"
  blueprint_digest: "75a878e6fa748741215c6aa80666e64b74720ea6a76c75ddb6420687f27fc05f"
  evidence_refs:
    - ".agentplane/tasks/202607242158-QV09NA/README.md"
    - ".agentplane/tasks/202607242158-QV09NA/quality/20260727-114513384-recovery-context/quality-report.json"
    - ".agentplane/tasks/202607242158-QV09NA/quality/20260727-114513384-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202607242158-QV09NA/quality/20260727-114513384-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202607242158-QV09NA/blueprint/resolved-snapshot.json"
    - "bun run test:fast (474 files, 3284 tests passed)"
    - "bun run lint:core && bun run arch:check && bun run knip:check && bun run typecheck && bun run test:critical"
    - "git diff 278c7491397046cda79831600d7b10bf9d62f707...4aa3d6f36e621a7446fbb96c9f2b2ee7f180f8d7"
  findings:
    - "The previous CI failure was test/static drift, not a defect in the QV effect-resolution safety contract. The corrected fixtures now preserve the fail-safe branch route for genuinely uncommitted work."
commit:
  hash: "000da2f558f03a633b474888ce682f0542396e92"
  message: "📋 QV09NA effect-in-doubt: authorize pre-merge closure"
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
  -
    author: "CODER"
    body: "Verified: refreshed pre-merge closure packet is ready for the task PR."
  -
    author: "CODER"
    body: "Verified: refreshed pre-merge closure packet is ready for the task PR."
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
  -
    type: "status"
    at: "2026-07-27T11:06:56.898Z"
    author: "CODER"
    from: "DONE"
    to: "DONE"
    note: "Verified: refreshed pre-merge closure packet is ready for the task PR."
  -
    type: "status"
    at: "2026-07-27T11:19:37.611Z"
    author: "CODER"
    from: "DONE"
    to: "DONE"
    note: "Verified: refreshed pre-merge closure packet is ready for the task PR."
  -
    type: "status"
    at: "2026-07-27T11:47:31.894Z"
    author: "CODER"
    from: "DONE"
    to: "DONE"
    note: "Verified: refreshed pre-merge closure packet is ready for the task PR."
doc_version: 3
doc_updated_at: "2026-07-27T11:47:31.895Z"
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
      -
        actor: "USER"
        at: "2026-07-27T11:07:20.396Z"
        authorityDigest: "sha256:e695bdabd451f078d0583069358591f5aafe8ab6bdf027f87f1d803c62a26495"
        digest: "sha256:e122b9ee1c0d6b8b4047afba236edbc3e03ba3fb9ecb32c4291a274332acd54a"
        operationDigest: "sha256:346de02e6d0bd500858939132bf133df02e4c834b58a5d9657ee6d195c3d8d0a"
        operationId: "pr.head.publish"
        outcome: "approved"
        policyRule: "workflow.external_reversible"
        previousDigest: "sha256:526608f0ca277ab7f03d0a33447c427bfe9fe9fa907893f4a11be823a06ed37d"
        schemaVersion: 1
        sequence: 9
        stateFingerprintDigest: "sha256:ed46cb1e8b5776edf79205d630c617b2d143c04915122df15a7bb393af86e266"
      -
        actor: "USER"
        at: "2026-07-27T11:09:31.989Z"
        authorityDigest: "sha256:c5af61f9b4bca8332e8b35759fc242123fd6415f9219b118356efefa068b580c"
        digest: "sha256:a0595f5da549d425d9533aa2c7910be8c97e031a12a4ac313ac3f2b8aaa3a739"
        operationDigest: "sha256:f63bbe348ecd9ffa0ffea38448df68e3587b29d17f27b3c4ef7b890e050e19ff"
        operationId: "integration.enqueue"
        outcome: "approved"
        policyRule: "workflow.external_high_risk"
        previousDigest: "sha256:e122b9ee1c0d6b8b4047afba236edbc3e03ba3fb9ecb32c4291a274332acd54a"
        schemaVersion: 1
        sequence: 10
        stateFingerprintDigest: "sha256:759c848a2292ebdbaaf261f779df5157dd4e5687af90d17fc189f8c2689a1d33"
      -
        actor: "USER"
        at: "2026-07-27T11:19:13.234Z"
        authorityDigest: "sha256:1a68e218c2d1d9d15ebb5bc752fdf71d459548ccffa0820d7a32f4e320b64b4d"
        digest: "sha256:6199dc82a005386da701a1100faa3bc08807132f17c905a62e790fa6ec49dcbf"
        operationDigest: "sha256:ddabd4f2ca41b67848e0b739df4a20643e6b907e0d773221f51a4a3a729f90c6"
        operationId: "task.pre_merge_close"
        outcome: "approved"
        policyRule: "workflow.external_high_risk"
        previousDigest: "sha256:a0595f5da549d425d9533aa2c7910be8c97e031a12a4ac313ac3f2b8aaa3a739"
        schemaVersion: 1
        sequence: 11
        stateFingerprintDigest: "sha256:90570ce1187d0d492aa6f3d7176883a02459f81c9032df4852857969bf521c73"
      -
        actor: "USER"
        at: "2026-07-27T11:20:03.156Z"
        authorityDigest: "sha256:19020094d64ed5f8b0b54d812258dceed1bfa40822592c925e927c79ea1119fd"
        digest: "sha256:2b3bbd543c9fd7d2b6f95ae4b09d6cca54306260d5c48bf02f3961341d8c721e"
        operationDigest: "sha256:346de02e6d0bd500858939132bf133df02e4c834b58a5d9657ee6d195c3d8d0a"
        operationId: "pr.head.publish"
        outcome: "approved"
        policyRule: "workflow.external_reversible"
        previousDigest: "sha256:6199dc82a005386da701a1100faa3bc08807132f17c905a62e790fa6ec49dcbf"
        schemaVersion: 1
        sequence: 12
        stateFingerprintDigest: "sha256:66f8987f439f4fb1b179d0dfd61756450287da0071abd3c860e4bb53645926fb"
      -
        actor: "USER"
        at: "2026-07-27T11:22:34.214Z"
        authorityDigest: "sha256:4af0d12d994a899fbb7d3c35ec570d278fa252c290d1f9b10dfde3eaf9cc52dc"
        digest: "sha256:71346b96eea4bb5426059298017b8280ec4e1bc827dd8b34c34845b8d94fa4f3"
        operationDigest: "sha256:f63bbe348ecd9ffa0ffea38448df68e3587b29d17f27b3c4ef7b890e050e19ff"
        operationId: "integration.enqueue"
        outcome: "approved"
        policyRule: "workflow.external_high_risk"
        previousDigest: "sha256:2b3bbd543c9fd7d2b6f95ae4b09d6cca54306260d5c48bf02f3961341d8c721e"
        schemaVersion: 1
        sequence: 13
        stateFingerprintDigest: "sha256:e94de2fe343513f600fc9b19b5713dd2eaa25ded7be826017cf05e55152da728"
      -
        actor: "USER"
        at: "2026-07-27T11:44:15.779Z"
        authorityDigest: "sha256:5b04bb02107eb16ea55c9cebde2423d2fcaf208fff618f740bebf7c2f8284ea9"
        digest: "sha256:4e04db01a23a3197b5b3c02e68be606537b67e8a97882c2d74853ff6140586e7"
        operationDigest: "sha256:678dbfd8e125bb2e9d731ae61cf92402ad28eb3dc2b6efcb9d907d8a3b668788"
        operationId: "route.remote.refresh"
        outcome: "approved"
        policyRule: "workflow.external_reversible"
        previousDigest: "sha256:71346b96eea4bb5426059298017b8280ec4e1bc827dd8b34c34845b8d94fa4f3"
        schemaVersion: 1
        sequence: 14
        stateFingerprintDigest: "sha256:46e8d5d94c86df1aa45d0b7deb3c8c76970cbe736c7b896f7f3c6f668471513c"
      -
        actor: "USER"
        at: "2026-07-27T11:46:04.424Z"
        authorityDigest: "sha256:0064c7ad73902b4ffdba4868c58371646a7d81228f9835c94fbe6bd26dc7b215"
        digest: "sha256:291eed15e6389e2e3f7402fceea3254619502ca735c0bb1fc694c20ccf9c8e86"
        operationDigest: "sha256:678dbfd8e125bb2e9d731ae61cf92402ad28eb3dc2b6efcb9d907d8a3b668788"
        operationId: "route.remote.refresh"
        outcome: "approved"
        policyRule: "workflow.external_reversible"
        previousDigest: "sha256:4e04db01a23a3197b5b3c02e68be606537b67e8a97882c2d74853ff6140586e7"
        schemaVersion: 1
        sequence: 15
        stateFingerprintDigest: "sha256:c7ef0ff00a7931947b0b66b89a1ddcdf26e7f1aae779364f395aae161d0c4982"
      -
        actor: "USER"
        at: "2026-07-27T11:46:38.342Z"
        authorityDigest: "sha256:8e6178d04babe052d102bfc455f24e0364c8ea4269ca453bcc06ec23c78391f9"
        digest: "sha256:24d77a7a8b4a04254bb7db099138c31309ec532c58d1642d2dca63f3148281fb"
        operationDigest: "sha256:ddabd4f2ca41b67848e0b739df4a20643e6b907e0d773221f51a4a3a729f90c6"
        operationId: "task.pre_merge_close"
        outcome: "approved"
        policyRule: "workflow.external_high_risk"
        previousDigest: "sha256:291eed15e6389e2e3f7402fceea3254619502ca735c0bb1fc694c20ccf9c8e86"
        schemaVersion: 1
        sequence: 16
        stateFingerprintDigest: "sha256:2b65876e41f0a24569cfc3c9086afbe7a15f34c4f70080e3c0a31a4f0fa4840d"
      -
        actor: "USER"
        at: "2026-07-27T11:47:56.871Z"
        authorityDigest: "sha256:9d68bd50107588209d2a44507e0ae132846653bf1a84fc556672d69f9471dccb"
        digest: "sha256:1934d743045a78dd68c6cd4950f5678cb265acfff44e4bd998595a85efdc6e58"
        operationDigest: "sha256:678dbfd8e125bb2e9d731ae61cf92402ad28eb3dc2b6efcb9d907d8a3b668788"
        operationId: "route.remote.refresh"
        outcome: "approved"
        policyRule: "workflow.external_reversible"
        previousDigest: "sha256:24d77a7a8b4a04254bb7db099138c31309ec532c58d1642d2dca63f3148281fb"
        schemaVersion: 1
        sequence: 17
        stateFingerprintDigest: "sha256:2ffc85f82ef717a52318aeb804f09ef0cc2189614dc2029ffa2261cdaa70c73b"
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
      -
        actor: "USER"
        digest: "sha256:e695bdabd451f078d0583069358591f5aafe8ab6bdf027f87f1d803c62a26495"
        expiresAt: "2026-07-27T11:22:20.396Z"
        id: "authority-d682cfe3-c7bf-4e06-af44-39bbc2b342d8"
        issuedAt: "2026-07-27T11:07:20.396Z"
        kind: "side_effect_authority"
        operationDigest: "sha256:346de02e6d0bd500858939132bf133df02e4c834b58a5d9657ee6d195c3d8d0a"
        operationId: "pr.head.publish"
        policyRule: "workflow.external_reversible"
        schemaVersion: 1
        stateFingerprintDigest: "sha256:ed46cb1e8b5776edf79205d630c617b2d143c04915122df15a7bb393af86e266"
        stateScopeDigest: "sha256:5de2ea7fa891ba8a586ea47c1708ec53569ff5f084865c4c653723574baf3b3d"
      -
        actor: "USER"
        digest: "sha256:c5af61f9b4bca8332e8b35759fc242123fd6415f9219b118356efefa068b580c"
        expiresAt: "2026-07-27T11:24:31.989Z"
        id: "authority-950ae9ee-2492-49f3-843f-53ae63cd5003"
        issuedAt: "2026-07-27T11:09:31.989Z"
        kind: "side_effect_authority"
        operationDigest: "sha256:f63bbe348ecd9ffa0ffea38448df68e3587b29d17f27b3c4ef7b890e050e19ff"
        operationId: "integration.enqueue"
        policyRule: "workflow.external_high_risk"
        schemaVersion: 1
        stateFingerprintDigest: "sha256:759c848a2292ebdbaaf261f779df5157dd4e5687af90d17fc189f8c2689a1d33"
        stateScopeDigest: "sha256:c8b087188b8d8a10bdb59a55eee4f6c46816c91258385e2a029ca74002a20727"
      -
        actor: "USER"
        digest: "sha256:1a68e218c2d1d9d15ebb5bc752fdf71d459548ccffa0820d7a32f4e320b64b4d"
        expiresAt: "2026-07-27T11:34:13.234Z"
        id: "authority-10ebb3ac-28bd-44ec-ad00-12d64748780c"
        issuedAt: "2026-07-27T11:19:13.234Z"
        kind: "side_effect_authority"
        operationDigest: "sha256:ddabd4f2ca41b67848e0b739df4a20643e6b907e0d773221f51a4a3a729f90c6"
        operationId: "task.pre_merge_close"
        policyRule: "workflow.external_high_risk"
        schemaVersion: 1
        stateFingerprintDigest: "sha256:90570ce1187d0d492aa6f3d7176883a02459f81c9032df4852857969bf521c73"
        stateScopeDigest: "sha256:7a8203d83a336bf6972bfdc514e4fed41db32c7797d043ebf1aa648596f6053c"
      -
        actor: "USER"
        digest: "sha256:19020094d64ed5f8b0b54d812258dceed1bfa40822592c925e927c79ea1119fd"
        expiresAt: "2026-07-27T11:35:03.156Z"
        id: "authority-f69fd366-acd5-4c32-bd13-bb66f78decda"
        issuedAt: "2026-07-27T11:20:03.156Z"
        kind: "side_effect_authority"
        operationDigest: "sha256:346de02e6d0bd500858939132bf133df02e4c834b58a5d9657ee6d195c3d8d0a"
        operationId: "pr.head.publish"
        policyRule: "workflow.external_reversible"
        schemaVersion: 1
        stateFingerprintDigest: "sha256:66f8987f439f4fb1b179d0dfd61756450287da0071abd3c860e4bb53645926fb"
        stateScopeDigest: "sha256:ecd1e413233a1ed15e3c701cfb45e6e4d8d655b46a5a0bb8b08bd97cdeab4f70"
      -
        actor: "USER"
        digest: "sha256:4af0d12d994a899fbb7d3c35ec570d278fa252c290d1f9b10dfde3eaf9cc52dc"
        expiresAt: "2026-07-27T11:37:34.214Z"
        id: "authority-804ddb86-114d-4832-a0db-1750c1b93853"
        issuedAt: "2026-07-27T11:22:34.214Z"
        kind: "side_effect_authority"
        operationDigest: "sha256:f63bbe348ecd9ffa0ffea38448df68e3587b29d17f27b3c4ef7b890e050e19ff"
        operationId: "integration.enqueue"
        policyRule: "workflow.external_high_risk"
        schemaVersion: 1
        stateFingerprintDigest: "sha256:e94de2fe343513f600fc9b19b5713dd2eaa25ded7be826017cf05e55152da728"
        stateScopeDigest: "sha256:0a03d037c20c7f9a3dfb3a119664a0ee3c36267e127be3d62830dd2b1a556c5d"
      -
        actor: "USER"
        digest: "sha256:5b04bb02107eb16ea55c9cebde2423d2fcaf208fff618f740bebf7c2f8284ea9"
        expiresAt: "2026-07-27T11:59:15.779Z"
        id: "authority-6c3c74c8-e19e-4ea1-ba9c-85e25bac0792"
        issuedAt: "2026-07-27T11:44:15.779Z"
        kind: "side_effect_authority"
        operationDigest: "sha256:678dbfd8e125bb2e9d731ae61cf92402ad28eb3dc2b6efcb9d907d8a3b668788"
        operationId: "route.remote.refresh"
        policyRule: "workflow.external_reversible"
        schemaVersion: 1
        stateFingerprintDigest: "sha256:46e8d5d94c86df1aa45d0b7deb3c8c76970cbe736c7b896f7f3c6f668471513c"
        stateScopeDigest: "sha256:910d0943d880daa779d01201e67b12547158f966474e50da86bc65ec5b98ad64"
      -
        actor: "USER"
        digest: "sha256:0064c7ad73902b4ffdba4868c58371646a7d81228f9835c94fbe6bd26dc7b215"
        expiresAt: "2026-07-27T12:01:04.424Z"
        id: "authority-a85afec2-6314-4160-be7e-a98b560508eb"
        issuedAt: "2026-07-27T11:46:04.424Z"
        kind: "side_effect_authority"
        operationDigest: "sha256:678dbfd8e125bb2e9d731ae61cf92402ad28eb3dc2b6efcb9d907d8a3b668788"
        operationId: "route.remote.refresh"
        policyRule: "workflow.external_reversible"
        schemaVersion: 1
        stateFingerprintDigest: "sha256:c7ef0ff00a7931947b0b66b89a1ddcdf26e7f1aae779364f395aae161d0c4982"
        stateScopeDigest: "sha256:26d842cd1eaa923481fae1d1f94e450a9caa0ecb46c331e0d77b130c7f4e5b9f"
      -
        actor: "USER"
        digest: "sha256:8e6178d04babe052d102bfc455f24e0364c8ea4269ca453bcc06ec23c78391f9"
        expiresAt: "2026-07-27T12:01:38.342Z"
        id: "authority-269e07d6-5437-470d-922d-e68e748dbb3b"
        issuedAt: "2026-07-27T11:46:38.342Z"
        kind: "side_effect_authority"
        operationDigest: "sha256:ddabd4f2ca41b67848e0b739df4a20643e6b907e0d773221f51a4a3a729f90c6"
        operationId: "task.pre_merge_close"
        policyRule: "workflow.external_high_risk"
        schemaVersion: 1
        stateFingerprintDigest: "sha256:2b65876e41f0a24569cfc3c9086afbe7a15f34c4f70080e3c0a31a4f0fa4840d"
        stateScopeDigest: "sha256:1ed37c4083b4bb914bd2e2532e3fdde6ed1201dd786d2865bc46a2c7cd9d5b60"
      -
        actor: "USER"
        digest: "sha256:9d68bd50107588209d2a44507e0ae132846653bf1a84fc556672d69f9471dccb"
        expiresAt: "2026-07-27T12:02:56.871Z"
        id: "authority-a0fc739e-2baa-469a-953c-557035d13719"
        issuedAt: "2026-07-27T11:47:56.871Z"
        kind: "side_effect_authority"
        operationDigest: "sha256:678dbfd8e125bb2e9d731ae61cf92402ad28eb3dc2b6efcb9d907d8a3b668788"
        operationId: "route.remote.refresh"
        policyRule: "workflow.external_reversible"
        schemaVersion: 1
        stateFingerprintDigest: "sha256:2ffc85f82ef717a52318aeb804f09ef0cc2189614dc2029ffa2261cdaa70c73b"
        stateScopeDigest: "sha256:b64a77348fd8e96dd5e18860c99aef5ca98cfeb20ecc6db45c0d93d0fbd704fb"
    schemaVersion: 1
  implementation_commit:
    hash: "4aa3d6f36e621a7446fbb96c9f2b2ee7f180f8d7"
    message: "🐛 QV09NA effect-in-doubt: align static and route fixtures"
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
