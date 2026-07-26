---
id: "202607221849-NWVCAG"
title: "Bind side effects to explicit authority records"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 11
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
  updated_at: "2026-07-26T21:55:05.292Z"
  updated_by: "TESTER"
  note: "Verified RF-13 authority policy: scoped records gate external and high-risk workflow operations; stale/tampered records fail closed; local reversible operations remain available. Passed focused authority/workflow tests, test:fast, test:critical, typecheck, format:changed, lint:core, compatibility ratchet, guards, and lifecycle invariants."
  attempts: 0
quality_review:
  state: "pass"
  provenance: "evaluator_supplied"
  updated_at: "2026-07-26T21:55:55.787Z"
  updated_by: "EVALUATOR"
  note: "RF-13 meets the formal workflow authority contract: protected external and high-risk operations require an exact scoped record, local reversible operations remain automatic, and semantic verdict values remain outside router synthesis."
  evaluated_sha: "1a5e1b672a6ed9de4403dc30bc84fab1574be4db"
  blueprint_digest: "166b25d862b184759dd0216e260cdf201f6e4f449a00c226c5e95be1ae316b49"
  evidence_refs:
    - ".agentplane/tasks/202607221849-NWVCAG/README.md"
    - ".agentplane/tasks/202607221849-NWVCAG/quality/20260726-215555787-recovery-context/quality-report.json"
    - ".agentplane/tasks/202607221849-NWVCAG/quality/20260726-215555787-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202607221849-NWVCAG/quality/20260726-215555787-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202607221849-NWVCAG/blueprint/resolved-snapshot.json"
    - "packages/agentplane/src/commands/shared/side-effect-authority.test.ts"
    - "bun run test:fast"
    - "bun run test:critical"
    - "bun run typecheck"
    - "bun run guards:check"
  findings:
    - "Typed approval is emitted without a matching record; an exact operation/state-scope/expiry match restores only the projected workflow operation."
    - "Authority audit fixtures cover actor, policy rule, operation digest, state fingerprint, authority digest, outcome, and hash-chain tamper failure."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
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
doc_version: 3
doc_updated_at: "2026-07-26T21:55:05.952Z"
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

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert the task implementation commit(s) while preserving unrelated task and migration state.
    - Restore the previous compatibility view or persisted contract version.
    - Re-run focused contract, migration, and type checks.
  Findings: |-
    - Observation: Compared with main, changed paths are limited to .agentplane/tasks/202607221849-NWVCAG artifacts.
      Impact: The declared authority, stale-record, semantic-input, and audit Verify Steps cannot be satisfied without a source implementation.
      Resolution: Return the task to CODER for the approved implementation, then run the declared focused policy/lifecycle checks.
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

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert the task implementation commit(s) while preserving unrelated task and migration state.
- Restore the previous compatibility view or persisted contract version.
- Re-run focused contract, migration, and type checks.

## Findings

- Observation: Compared with main, changed paths are limited to .agentplane/tasks/202607221849-NWVCAG artifacts.
  Impact: The declared authority, stale-record, semantic-input, and audit Verify Steps cannot be satisfied without a source implementation.
  Resolution: Return the task to CODER for the approved implementation, then run the declared focused policy/lifecycle checks.
