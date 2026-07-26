---
id: "202607221849-NWVCAG"
title: "Bind side effects to explicit authority records"
result_summary: "pre-merge closure"
status: "DONE"
priority: "high"
owner: "CODER"
revision: 21
origin:
  system: "manual"
depends_on:
  - "202607221848-T9B3PS"
  - "202607221848-VBV9B1"
tags:
  - "approvals"
  - "authority"
  - "milestone-alpha2"
  - "refactor"
  - "rf-13"
  - "security"
  - "v0.7"
  - "wave-contracts"
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
  updated_at: "2026-07-26T08:57:24.536Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-07-26T22:54:30.707Z"
  updated_by: "TESTER"
  note: "Implementation rework verified: route authority now forces the runner read-only when the canonical work order has no writable roots."
  attempts: 0
quality_review:
  state: "rework"
  provenance: "evaluator_supplied"
  updated_at: "2026-07-26T22:38:50.288Z"
  updated_by: "EVALUATOR"
  note: "Runner work-order parity is not met on the current head."
  evaluated_sha: "e8e889efc1075a1ff5663de5a451019b91eea2b6"
  blueprint_digest: "166b25d862b184759dd0216e260cdf201f6e4f449a00c226c5e95be1ae316b49"
  evidence_refs:
    - ".agentplane/tasks/202607221849-NWVCAG/README.md"
    - ".agentplane/tasks/202607221849-NWVCAG/quality/20260726-223850288-recovery-context/quality-report.json"
    - ".agentplane/tasks/202607221849-NWVCAG/quality/20260726-223850288-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202607221849-NWVCAG/quality/20260726-223850288-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202607221849-NWVCAG/blueprint/resolved-snapshot.json"
    - "bunx vitest run packages/agentplane/src/runner/usecases/agent-work-order.integration.test.ts --reporter=verbose (2 failed, 3 passed)"
  findings:
    - "The public task run --dry-run surface exits with code 3 in both direct and branch_pr canonical-work-order fixtures, while brief, next-action, and Hermes succeed; therefore the claimed unified preparation contract is broken."
commit:
  hash: "c3af98022fa7c79e891761b14e2b2ca715c7b238"
  message: "🐛 NWVCAG task: stabilize authority fingerprint transitions"
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "CODER"
    body: "Verified: pre-merge closure packet is ready for the task PR."
events:
  -
    type: "status"
    at: "2026-07-26T10:58:46.219Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "verify"
    at: "2026-07-26T11:01:10.281Z"
    author: "TESTER"
    state: "needs_rework"
    note: "Rework required: the current branch contains only task/blueprint/PR artifacts and no implementation paths for the approved authority-record scope."
  -
    type: "verify"
    at: "2026-07-26T21:55:05.292Z"
    author: "TESTER"
    state: "ok"
    note: "Verified RF-13 authority policy: scoped records gate external and high-risk workflow operations; stale/tampered records fail closed; local reversible operations remain available. Passed focused authority/workflow tests, test:fast, test:critical, typecheck, format:changed, lint:core, compatibility ratchet, guards, and lifecycle invariants."
  -
    type: "status"
    at: "2026-07-26T22:03:49.067Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: pre-merge closure packet is ready for the task PR."
  -
    type: "verify"
    at: "2026-07-26T22:54:30.707Z"
    author: "TESTER"
    state: "ok"
    note: "Implementation rework verified: route authority now forces the runner read-only when the canonical work order has no writable roots."
doc_version: 3
doc_updated_at: "2026-07-26T22:54:31.400Z"
doc_updated_by: "CODER"
description: "RF-13: classify local, external reversible, external high-risk, and semantic operations; require typed authority/approval records and audit actor, policy rule, digest, and scope."
sections:
  Summary: |-
    Bind side effects to explicit authority records

    RF-13: classify local, external reversible, external high-risk, and semantic operations; require typed authority/approval records and audit actor, policy rule, digest, and scope.
  Scope: |-
    - In scope: operation classification, authority schema/digest, approval-step production, policy evaluation and audit for network, PR sync/open, queue, merge, publish/deploy, danger sandbox, task close/finalize, and semantic values.
    - Out of scope: granting authority implicitly or replacing user/agent semantic content with CLI defaults.
  Plan: |-
    1. Define operation classes and the authority record linked to actor, rule, scope, expiry, and fingerprint.
    2. Map every approved side effect to its required authority level.
    3. Return a typed approval step when authority is missing or stale.
    4. Persist an immutable audit entry for each allowed or denied operation.
    5. Add tests for local, network, provider, merge, publish, close, danger, and semantic boundaries.
  Verify Steps: |-
    1. Evaluate each operation class without authority. Expected: only allowed local reversible operations proceed; others return a typed approval step.
    2. Supply scoped authority and then alter actor, scope, fingerprint, or expiry. Expected: only the exact valid record permits the effect.
    3. Exercise semantic verdict/summary inputs. Expected: authority never fabricates or substitutes semantic values.
    4. Inspect audit fixtures. Expected: actor, policy rule, authority digest, state fingerprint, operation, and outcome are complete.
    5. Run focused policy/lifecycle tests, guards, and typecheck.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-07-26T11:01:10.281Z — VERIFY — needs_rework

    By: TESTER

    Note: Rework required: the current branch contains only task/blueprint/PR artifacts and no implementation paths for the approved authority-record scope.
    Attempts: 1

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-26T10:58:46.219Z, excerpt_hash=sha256:b339f71535fe8e5a8d50993c0125b581ebc30ad2905592177531f036143c88a3

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607221849-NWVCAG-bind-side-effects-to-explicit-authority-records/.agentplane/tasks/202607221849-NWVCAG/blueprint/resolved-snapshot.json
    - old_digest: 166b25d862b184759dd0216e260cdf201f6e4f449a00c226c5e95be1ae316b49
    - current_digest: 166b25d862b184759dd0216e260cdf201f6e4f449a00c226c5e95be1ae316b49
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607221849-NWVCAG

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202607221849-NWVCAG
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    ### 2026-07-26T21:55:05.292Z — VERIFY — ok

    By: TESTER

    Note: Verified RF-13 authority policy: scoped records gate external and high-risk workflow operations; stale/tampered records fail closed; local reversible operations remain available. Passed focused authority/workflow tests, test:fast, test:critical, typecheck, format:changed, lint:core, compatibility ratchet, guards, and lifecycle invariants.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-26T11:01:11.150Z, excerpt_hash=sha256:b339f71535fe8e5a8d50993c0125b581ebc30ad2905592177531f036143c88a3

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607221849-NWVCAG-bind-side-effects-to-explicit-authority-records/.agentplane/tasks/202607221849-NWVCAG/blueprint/resolved-snapshot.json
    - old_digest: 166b25d862b184759dd0216e260cdf201f6e4f449a00c226c5e95be1ae316b49
    - current_digest: 166b25d862b184759dd0216e260cdf201f6e4f449a00c226c5e95be1ae316b49
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607221849-NWVCAG

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: none
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    ### 2026-07-26T22:54:30.707Z — VERIFY — ok

    By: TESTER

    Note: Implementation rework verified: route authority now forces the runner read-only when the canonical work order has no writable roots.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-26T22:03:49.068Z, excerpt_hash=sha256:b339f71535fe8e5a8d50993c0125b581ebc30ad2905592177531f036143c88a3

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607221849-NWVCAG-bind-side-effects-to-explicit-authority-records/.agentplane/tasks/202607221849-NWVCAG/blueprint/resolved-snapshot.json
    - old_digest: 166b25d862b184759dd0216e260cdf201f6e4f449a00c226c5e95be1ae316b49
    - current_digest: 166b25d862b184759dd0216e260cdf201f6e4f449a00c226c5e95be1ae316b49
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607221849-NWVCAG

    DecisionContextRef:
    - operator_action: stop
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
    - Revert the task implementation commit(s) while preserving unrelated task and migration state.
    - Restore the previous compatibility view or persisted contract version.
    - Re-run focused contract, migration, and type checks.
  Findings: |-
    - Observation: Compared with main, changed paths are limited to .agentplane/tasks/202607221849-NWVCAG artifacts.
      Impact: The declared authority, stale-record, semantic-input, and audit Verify Steps cannot be satisfied without a source implementation.
      Resolution: Return the task to CODER for the approved implementation, then run the declared focused policy/lifecycle checks.

    - Observation: bun run test:fast passed (468 files, 3255 tests); bun run test:critical passed (11 chunks, 72 tests); bun run typecheck and bun run format:changed passed.
      Impact: task run --dry-run again shares the canonical work-order path with brief, next-action, and Hermes without granting an unapproved write-capable sandbox.
      Resolution: Added route_authority sandbox provenance plus focused policy and cross-surface regressions.
extensions:
  agentplane.side_effect_authority:
    audit:
      -
        actor: "USER"
        at: "2026-07-26T21:56:24.861Z"
        authorityDigest: "sha256:f0747812df2480bdb475824383d4b55dd0eb4747a9291fb6d372a8f012de4fc2"
        digest: "sha256:b918d0412cba0f2afffe25ccff3b76cbe4a019a08e0d26cd3c0b01007eec8613"
        operationDigest: "sha256:7167264322d9ed4b3cc997961d74379c67ba90ace051b37216f3de1515513000"
        operationId: "task.pre_merge_close"
        outcome: "approved"
        policyRule: "workflow.external_high_risk"
        previousDigest: null
        schemaVersion: 1
        sequence: 1
        stateFingerprintDigest: "sha256:e89927e05b92757a1c2361e38bebe010ef6d958c4a07c4a4c4b01e02ed233b6b"
      -
        actor: "USER"
        at: "2026-07-26T22:03:26.828Z"
        authorityDigest: "sha256:1451915d5b69301a926d1909e7a45e807aecd239b0c7151dc393fac90ee96e91"
        digest: "sha256:089940203a6e9ad4cb926f06496fc15bda5693b132f0d136ec485e8fba610266"
        operationDigest: "sha256:c49dea0559584b3f9a3fba9c934149d9ba8fa59f49c84f41ca5561bc226f334b"
        operationId: "task.pre_merge_close"
        outcome: "approved"
        policyRule: "workflow.external_high_risk"
        previousDigest: "sha256:b918d0412cba0f2afffe25ccff3b76cbe4a019a08e0d26cd3c0b01007eec8613"
        schemaVersion: 1
        sequence: 2
        stateFingerprintDigest: "sha256:c3eb1ae6d2f6df94f5077e56720907da8684989289cf53fec4c88bf06948766f"
      -
        actor: "USER"
        at: "2026-07-26T22:09:00.976Z"
        authorityDigest: "sha256:d75fb6ce7dadcff1803a8fbbd97d168516e3107620a2ae62b552d20d52248027"
        digest: "sha256:762551cd1e622ebdce943ca595480d69a47c738304acc7e85dadfbadb0bb6488"
        operationDigest: "sha256:9a80108688db12d8aafff4305cf83de0dcc27624a64967e98263d4fd56c1b362"
        operationId: "route.remote.refresh"
        outcome: "approved"
        policyRule: "workflow.external_reversible"
        previousDigest: "sha256:089940203a6e9ad4cb926f06496fc15bda5693b132f0d136ec485e8fba610266"
        schemaVersion: 1
        sequence: 3
        stateFingerprintDigest: "sha256:8fe7eb588846cc38bfbe38485f7240a775fece36c2c39980b35b011770058ac7"
      -
        actor: "USER"
        at: "2026-07-26T22:13:55.609Z"
        authorityDigest: "sha256:ec5bc8cf93598d898948cc538f258a99f815206a8a858909857c51d3f3ce87fd"
        digest: "sha256:836faeacf2f8a80fbc881919c1ff9a53f3366f29f2cbf8b42002539ac5ed962b"
        operationDigest: "sha256:9a80108688db12d8aafff4305cf83de0dcc27624a64967e98263d4fd56c1b362"
        operationId: "route.remote.refresh"
        outcome: "approved"
        policyRule: "workflow.external_reversible"
        previousDigest: "sha256:762551cd1e622ebdce943ca595480d69a47c738304acc7e85dadfbadb0bb6488"
        schemaVersion: 1
        sequence: 4
        stateFingerprintDigest: "sha256:73d29bb0a696fb5203547a8b979a9b5e1f59c659d6e1ff53c47ff451b1916532"
      -
        actor: "USER"
        at: "2026-07-26T22:25:59.094Z"
        authorityDigest: "sha256:23b50f6344567695d43717c2ad40930b0a143fa6727d374ad081dde3d06e9226"
        digest: "sha256:2be91ad314ff815178a2fbef51b8e0f9fc1bfba94eaa9fa39494e31d499f826c"
        operationDigest: "sha256:9a80108688db12d8aafff4305cf83de0dcc27624a64967e98263d4fd56c1b362"
        operationId: "route.remote.refresh"
        outcome: "approved"
        policyRule: "workflow.external_reversible"
        previousDigest: "sha256:836faeacf2f8a80fbc881919c1ff9a53f3366f29f2cbf8b42002539ac5ed962b"
        schemaVersion: 1
        sequence: 5
        stateFingerprintDigest: "sha256:54d5d81a5335dd3b2c4084391086f8a322649d34dd8e540a2034a8b0f6767954"
      -
        actor: "USER"
        at: "2026-07-26T22:28:52.664Z"
        authorityDigest: "sha256:af6847d5907a447e4fec3bb5bda35a09e8ee2d97e0cfef546c3d33980d716c5f"
        digest: "sha256:5f616c9b5edf5ec76277e9d19dced2af31512c843beb69c5d1b0e733191d3ebd"
        operationDigest: "sha256:9a80108688db12d8aafff4305cf83de0dcc27624a64967e98263d4fd56c1b362"
        operationId: "route.remote.refresh"
        outcome: "approved"
        policyRule: "workflow.external_reversible"
        previousDigest: "sha256:2be91ad314ff815178a2fbef51b8e0f9fc1bfba94eaa9fa39494e31d499f826c"
        schemaVersion: 1
        sequence: 6
        stateFingerprintDigest: "sha256:713480bf65846144d740bd7bec4a2c4c89ab6949d16544e001f2809205930d77"
      -
        actor: "USER"
        at: "2026-07-26T22:31:56.160Z"
        authorityDigest: "sha256:94abb750544f46241f1404a13c36ddec8c4fc32df9443936a2e31b876af6ac5c"
        digest: "sha256:0d7fce7ec409d9d5585c102e7db461ee58454ccf4534fcc43eee1a99ab3be09e"
        operationDigest: "sha256:9a80108688db12d8aafff4305cf83de0dcc27624a64967e98263d4fd56c1b362"
        operationId: "route.remote.refresh"
        outcome: "approved"
        policyRule: "workflow.external_reversible"
        previousDigest: "sha256:5f616c9b5edf5ec76277e9d19dced2af31512c843beb69c5d1b0e733191d3ebd"
        schemaVersion: 1
        sequence: 7
        stateFingerprintDigest: "sha256:c7d27b7f980b96a21ea95d9db754b3399fe76aeda73b96360eb9e2111a51d792"
    grants:
      -
        actor: "USER"
        digest: "sha256:f0747812df2480bdb475824383d4b55dd0eb4747a9291fb6d372a8f012de4fc2"
        expiresAt: "2026-07-26T22:11:24.861Z"
        id: "authority-080db970-1b39-4de2-ab73-f6f8c6cc4d05"
        issuedAt: "2026-07-26T21:56:24.861Z"
        kind: "side_effect_authority"
        operationDigest: "sha256:7167264322d9ed4b3cc997961d74379c67ba90ace051b37216f3de1515513000"
        operationId: "task.pre_merge_close"
        policyRule: "workflow.external_high_risk"
        schemaVersion: 1
        stateFingerprintDigest: "sha256:e89927e05b92757a1c2361e38bebe010ef6d958c4a07c4a4c4b01e02ed233b6b"
        stateScopeDigest: "sha256:677d6af9d70d48b270888a999907524d75c35864931005a9361efc4595efd658"
      -
        actor: "USER"
        digest: "sha256:1451915d5b69301a926d1909e7a45e807aecd239b0c7151dc393fac90ee96e91"
        expiresAt: "2026-07-26T22:18:26.828Z"
        id: "authority-5399bb9b-6dfc-4e2b-99b6-f0e64496ee98"
        issuedAt: "2026-07-26T22:03:26.828Z"
        kind: "side_effect_authority"
        operationDigest: "sha256:c49dea0559584b3f9a3fba9c934149d9ba8fa59f49c84f41ca5561bc226f334b"
        operationId: "task.pre_merge_close"
        policyRule: "workflow.external_high_risk"
        schemaVersion: 1
        stateFingerprintDigest: "sha256:c3eb1ae6d2f6df94f5077e56720907da8684989289cf53fec4c88bf06948766f"
        stateScopeDigest: "sha256:281f3bbe4bb31d60f1a4320ac5fb8c6bc476ee6fe6531d774aab9d172bc8199d"
      -
        actor: "USER"
        digest: "sha256:d75fb6ce7dadcff1803a8fbbd97d168516e3107620a2ae62b552d20d52248027"
        expiresAt: "2026-07-26T22:24:00.976Z"
        id: "authority-bf85e654-04a5-41ce-9f9d-5d917322ccde"
        issuedAt: "2026-07-26T22:09:00.976Z"
        kind: "side_effect_authority"
        operationDigest: "sha256:9a80108688db12d8aafff4305cf83de0dcc27624a64967e98263d4fd56c1b362"
        operationId: "route.remote.refresh"
        policyRule: "workflow.external_reversible"
        schemaVersion: 1
        stateFingerprintDigest: "sha256:8fe7eb588846cc38bfbe38485f7240a775fece36c2c39980b35b011770058ac7"
        stateScopeDigest: "sha256:d3785bce78909858483805ca726f72d21ba0928bcb8c75a1428139ee829ae304"
      -
        actor: "USER"
        digest: "sha256:ec5bc8cf93598d898948cc538f258a99f815206a8a858909857c51d3f3ce87fd"
        expiresAt: "2026-07-26T22:28:55.609Z"
        id: "authority-decfd72a-bd1e-4457-895a-f2e30ada309a"
        issuedAt: "2026-07-26T22:13:55.609Z"
        kind: "side_effect_authority"
        operationDigest: "sha256:9a80108688db12d8aafff4305cf83de0dcc27624a64967e98263d4fd56c1b362"
        operationId: "route.remote.refresh"
        policyRule: "workflow.external_reversible"
        schemaVersion: 1
        stateFingerprintDigest: "sha256:73d29bb0a696fb5203547a8b979a9b5e1f59c659d6e1ff53c47ff451b1916532"
        stateScopeDigest: "sha256:d998215c986158d8dacfa9a25ed155a807c99ab78e1fa456c5b049b5096ca3cd"
      -
        actor: "USER"
        digest: "sha256:23b50f6344567695d43717c2ad40930b0a143fa6727d374ad081dde3d06e9226"
        expiresAt: "2026-07-26T22:40:59.094Z"
        id: "authority-c1cf7a70-fd1e-4170-a2ca-10538897cf78"
        issuedAt: "2026-07-26T22:25:59.094Z"
        kind: "side_effect_authority"
        operationDigest: "sha256:9a80108688db12d8aafff4305cf83de0dcc27624a64967e98263d4fd56c1b362"
        operationId: "route.remote.refresh"
        policyRule: "workflow.external_reversible"
        schemaVersion: 1
        stateFingerprintDigest: "sha256:54d5d81a5335dd3b2c4084391086f8a322649d34dd8e540a2034a8b0f6767954"
        stateScopeDigest: "sha256:bbeeb38d9ae42df733e53c4c037cb0a4a7e905e272f000f67c7aeb6f283045b4"
      -
        actor: "USER"
        digest: "sha256:af6847d5907a447e4fec3bb5bda35a09e8ee2d97e0cfef546c3d33980d716c5f"
        expiresAt: "2026-07-26T22:43:52.664Z"
        id: "authority-8d7030ac-7073-4da8-be69-f4f1e67c95eb"
        issuedAt: "2026-07-26T22:28:52.664Z"
        kind: "side_effect_authority"
        operationDigest: "sha256:9a80108688db12d8aafff4305cf83de0dcc27624a64967e98263d4fd56c1b362"
        operationId: "route.remote.refresh"
        policyRule: "workflow.external_reversible"
        schemaVersion: 1
        stateFingerprintDigest: "sha256:713480bf65846144d740bd7bec4a2c4c89ab6949d16544e001f2809205930d77"
        stateScopeDigest: "sha256:cb06cc8500ab3736d48583b1fd7d295551bf5131d01893b61532e5d6ac8772da"
      -
        actor: "USER"
        digest: "sha256:94abb750544f46241f1404a13c36ddec8c4fc32df9443936a2e31b876af6ac5c"
        expiresAt: "2026-07-26T22:46:56.160Z"
        id: "authority-7603a6b5-1db3-403e-8c75-9b4266190cfd"
        issuedAt: "2026-07-26T22:31:56.160Z"
        kind: "side_effect_authority"
        operationDigest: "sha256:9a80108688db12d8aafff4305cf83de0dcc27624a64967e98263d4fd56c1b362"
        operationId: "route.remote.refresh"
        policyRule: "workflow.external_reversible"
        schemaVersion: 1
        stateFingerprintDigest: "sha256:c7d27b7f980b96a21ea95d9db754b3399fe76aeda73b96360eb9e2111a51d792"
        stateScopeDigest: "sha256:92376c839e19c2e0dc8f8b5b8ad986bf3a86a1989dc95d4702aef50697aa09b0"
    schemaVersion: 1
  workflow_route_baseline:
    start_head_sha: "4da09cdaca713eb3be1576f00a4f57e72b1353db"
    version: 1
id_source: "generated"
---
## Summary

Bind side effects to explicit authority records

RF-13: classify local, external reversible, external high-risk, and semantic operations; require typed authority/approval records and audit actor, policy rule, digest, and scope.

## Scope

- In scope: operation classification, authority schema/digest, approval-step production, policy evaluation and audit for network, PR sync/open, queue, merge, publish/deploy, danger sandbox, task close/finalize, and semantic values.
- Out of scope: granting authority implicitly or replacing user/agent semantic content with CLI defaults.

## Plan

1. Define operation classes and the authority record linked to actor, rule, scope, expiry, and fingerprint.
2. Map every approved side effect to its required authority level.
3. Return a typed approval step when authority is missing or stale.
4. Persist an immutable audit entry for each allowed or denied operation.
5. Add tests for local, network, provider, merge, publish, close, danger, and semantic boundaries.

## Verify Steps

1. Evaluate each operation class without authority. Expected: only allowed local reversible operations proceed; others return a typed approval step.
2. Supply scoped authority and then alter actor, scope, fingerprint, or expiry. Expected: only the exact valid record permits the effect.
3. Exercise semantic verdict/summary inputs. Expected: authority never fabricates or substitutes semantic values.
4. Inspect audit fixtures. Expected: actor, policy rule, authority digest, state fingerprint, operation, and outcome are complete.
5. Run focused policy/lifecycle tests, guards, and typecheck.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-07-26T11:01:10.281Z — VERIFY — needs_rework

By: TESTER

Note: Rework required: the current branch contains only task/blueprint/PR artifacts and no implementation paths for the approved authority-record scope.
Attempts: 1

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-26T10:58:46.219Z, excerpt_hash=sha256:b339f71535fe8e5a8d50993c0125b581ebc30ad2905592177531f036143c88a3

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607221849-NWVCAG-bind-side-effects-to-explicit-authority-records/.agentplane/tasks/202607221849-NWVCAG/blueprint/resolved-snapshot.json
- old_digest: 166b25d862b184759dd0216e260cdf201f6e4f449a00c226c5e95be1ae316b49
- current_digest: 166b25d862b184759dd0216e260cdf201f6e4f449a00c226c5e95be1ae316b49
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607221849-NWVCAG

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202607221849-NWVCAG
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

### 2026-07-26T21:55:05.292Z — VERIFY — ok

By: TESTER

Note: Verified RF-13 authority policy: scoped records gate external and high-risk workflow operations; stale/tampered records fail closed; local reversible operations remain available. Passed focused authority/workflow tests, test:fast, test:critical, typecheck, format:changed, lint:core, compatibility ratchet, guards, and lifecycle invariants.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-26T11:01:11.150Z, excerpt_hash=sha256:b339f71535fe8e5a8d50993c0125b581ebc30ad2905592177531f036143c88a3

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607221849-NWVCAG-bind-side-effects-to-explicit-authority-records/.agentplane/tasks/202607221849-NWVCAG/blueprint/resolved-snapshot.json
- old_digest: 166b25d862b184759dd0216e260cdf201f6e4f449a00c226c5e95be1ae316b49
- current_digest: 166b25d862b184759dd0216e260cdf201f6e4f449a00c226c5e95be1ae316b49
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607221849-NWVCAG

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: none
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

### 2026-07-26T22:54:30.707Z — VERIFY — ok

By: TESTER

Note: Implementation rework verified: route authority now forces the runner read-only when the canonical work order has no writable roots.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-26T22:03:49.068Z, excerpt_hash=sha256:b339f71535fe8e5a8d50993c0125b581ebc30ad2905592177531f036143c88a3

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607221849-NWVCAG-bind-side-effects-to-explicit-authority-records/.agentplane/tasks/202607221849-NWVCAG/blueprint/resolved-snapshot.json
- old_digest: 166b25d862b184759dd0216e260cdf201f6e4f449a00c226c5e95be1ae316b49
- current_digest: 166b25d862b184759dd0216e260cdf201f6e4f449a00c226c5e95be1ae316b49
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607221849-NWVCAG

DecisionContextRef:
- operator_action: stop
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

- Revert the task implementation commit(s) while preserving unrelated task and migration state.
- Restore the previous compatibility view or persisted contract version.
- Re-run focused contract, migration, and type checks.

## Findings

- Observation: Compared with main, changed paths are limited to .agentplane/tasks/202607221849-NWVCAG artifacts.
  Impact: The declared authority, stale-record, semantic-input, and audit Verify Steps cannot be satisfied without a source implementation.
  Resolution: Return the task to CODER for the approved implementation, then run the declared focused policy/lifecycle checks.

- Observation: bun run test:fast passed (468 files, 3255 tests); bun run test:critical passed (11 chunks, 72 tests); bun run typecheck and bun run format:changed passed.
  Impact: task run --dry-run again shares the canonical work-order path with brief, next-action, and Hermes without granting an unapproved write-capable sandbox.
  Resolution: Added route_authority sandbox provenance plus focused policy and cross-surface regressions.
