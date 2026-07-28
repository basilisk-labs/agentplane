---
id: "202607280704-EATE9R"
title: "Prove cleanup identity after provider-updated PR head"
result_summary: "pre-merge closure"
status: "DONE"
priority: "high"
owner: "CODER"
revision: 13
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-07-28T07:05:16.124Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-07-28T07:13:25.623Z"
  updated_by: "TESTER"
  note: "Targeted cleanup provider-proof regression suite, TypeScript build, runtime doctor, and routing validation all passed for commit 4e4708b49."
  attempts: 0
quality_review:
  state: "pass"
  provenance: "evaluator_supplied"
  updated_at: "2026-07-28T07:22:12.337Z"
  updated_by: "EVALUATOR"
  note: "EVALUATOR returned pass with 1 typed finding(s)."
  evaluated_sha: "779fa87dd699d829d4990e0c5fddcc591da3fd99"
  blueprint_digest: "a6a5c1ea93baefaf87bc79368e1c0966c2ef86d8029180cf279041ff42cf5712"
  evidence_refs:
    - ".agentplane/tasks/202607280704-EATE9R/quality/20260728-072212216-recovery-context/evaluator-work-order.json"
    - ".agentplane/tasks/202607280704-EATE9R/quality/20260728-072212216-recovery-context/quality-report.json"
    - ".agentplane/tasks/202607280704-EATE9R/quality/20260728-072212216-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202607280704-EATE9R/quality/20260728-072212216-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202607280704-EATE9R/quality/20260728-072212216-recovery-context/evaluator-result.json"
    - ".agentplane/tasks/202607280704-EATE9R/README.md"
    - ".agentplane/tasks/202607280704-EATE9R/quality/20260728-072212216-recovery-context/evaluator-diff.patch"
    - ".agentplane/tasks/202607280704-EATE9R/quality/20260728-072212216-recovery-context/evaluator-observed-checks.json"
    - ".agentplane/tasks/202607280704-EATE9R/quality/20260728-072212216-recovery-context/evaluator-blueprint.json"
    - ".agentplane/policy/dod.code.md"
    - ".agentplane/policy/dod.core.md"
    - ".agentplane/policy/security.must.md"
    - ".agentplane/policy/workflow.branch_pr.md"
  findings:
    - "Current head retains the exact two-parent proof and passes the previously missed lint gate before publication."
commit:
  hash: "4e4708b49d94193df8aaa204f5b85b4a38042fdc"
  message: "fix: prove cleanup after provider branch update"
comments:
  -
    author: "CODER"
    body: "Start: implement a fail-closed cleanup identity proof for the provider-updated PR head observed during protected-base integration."
  -
    author: "CODER"
    body: "Implementation: committed 4e4708b49 with a strict provider-update ancestry proof and positive plus fail-closed cleanup regressions."
  -
    author: "CODER"
    body: "Verified: pre-merge closure packet is ready for the task PR."
events:
  -
    type: "status"
    at: "2026-07-28T07:05:27.137Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implement a fail-closed cleanup identity proof for the provider-updated PR head observed during protected-base integration."
  -
    type: "status"
    at: "2026-07-28T07:12:56.651Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Implementation: committed 4e4708b49 with a strict provider-update ancestry proof and positive plus fail-closed cleanup regressions."
  -
    type: "verify"
    at: "2026-07-28T07:13:25.623Z"
    author: "TESTER"
    state: "ok"
    note: "Targeted cleanup provider-proof regression suite, TypeScript build, runtime doctor, and routing validation all passed for commit 4e4708b49."
  -
    type: "status"
    at: "2026-07-28T07:14:47.176Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: pre-merge closure packet is ready for the task PR."
doc_version: 3
doc_updated_at: "2026-07-28T07:14:47.177Z"
doc_updated_by: "CODER"
description: "Allow branch_pr cleanup to recognize a GitHub-generated PR branch update after a protected-base merge, only when immutable ancestry and merged-base evidence prove the original task head is integrated. Preserve fail-closed behavior for unrelated or rewritten heads."
sections:
  Summary: |-
    Prove cleanup identity after provider-updated PR head

    Allow branch_pr cleanup to recognize a GitHub-generated PR branch update after a protected-base merge, only when immutable ancestry and merged-base evidence prove the original task head is integrated. Preserve fail-closed behavior for unrelated or rewritten heads.
  Scope: |-
    - In scope: Allow branch_pr cleanup to recognize a GitHub-generated PR branch update after a protected-base merge, only when immutable ancestry and merged-base evidence prove the original task head is integrated. Preserve fail-closed behavior for unrelated or rewritten heads.
    - Out of scope: unrelated refactors not required for "Prove cleanup identity after provider-updated PR head".
  Plan: "1. Model the provider-updated PR head as a distinct cleanup evidence case without accepting arbitrary rewrites. 2. Permit cleanup only when immutable ancestry proves the original task head landed in the protected base and the observed provider head is the GitHub-generated update against that base. 3. Add positive and fail-closed regression tests, then run focused cleanup tests, typecheck, doctor, and routing validation."
  Verify Steps: "1. bunx vitest packages/agentplane/src/commands/branch/cleanup-merged.targeted.test.ts: proves the GitHub-updated-head case is accepted only with merged-base ancestry and that unrelated/re-written heads remain rejected. 2. bun run typecheck: proves the changed cleanup proof code remains type-safe. 3. ap doctor and node .agentplane/policy/check-routing.mjs: prove runtime and policy routing integrity."
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-07-28T07:13:25.623Z — VERIFY — ok

    By: TESTER

    Note: Targeted cleanup provider-proof regression suite, TypeScript build, runtime doctor, and routing validation all passed for commit 4e4708b49.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-28T07:12:56.651Z, excerpt_hash=sha256:7060a12b8de9d84c6c359fcc572eac9d51f07578a94d92549327d9b82f8f071a

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/inc-20260727-main-lane.prxk2f/repo/.agentplane/worktrees/202607280704-EATE9R-prove-cleanup-identity-after-provider-updated-pr/.agentplane/tasks/202607280704-EATE9R/blueprint/resolved-snapshot.json
    - old_digest: a6a5c1ea93baefaf87bc79368e1c0966c2ef86d8029180cf279041ff42cf5712
    - current_digest: a6a5c1ea93baefaf87bc79368e1c0966c2ef86d8029180cf279041ff42cf5712
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607280704-EATE9R

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202607280704-EATE9R
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: 17 targeted cleanup tests passed; typecheck, doctor, routing validation, Prettier, and diff check passed.
      Impact: The cleanup route recognizes only a provider merge head with the local task head and a base-ancestor parent.
      Resolution: Record local pass; the hosted PR route remains required before integration.
extensions:
  agentplane.side_effect_authority:
    audit:
      -
        actor: "USER"
        at: "2026-07-28T07:06:18.123Z"
        authorityDigest: "sha256:8ca7cd5d8f4976f025d6b0aa8cb2cbb5423f760c50f9f752b286ed2f45bc8269"
        digest: "sha256:f3eb08ae566c35d38baa2821e429ddd113d96c48b9e4a55a47f91448d73ab2b8"
        operationDigest: "sha256:3061745a213a6329ba051e33060a630f708cadff2b2836ec00bdb7fbba012acb"
        operationId: "pr.open"
        outcome: "approved"
        policyRule: "workflow.external_reversible"
        previousDigest: null
        schemaVersion: 1
        sequence: 1
        stateFingerprintDigest: "sha256:bb12614f644448b0cf57d79f54030b6018b91d4fa9625618cb3f7dece69e01c3"
      -
        actor: "USER"
        at: "2026-07-28T07:14:27.661Z"
        authorityDigest: "sha256:ea7d504c29987178ad7ab0a4530679c0814f67793f147b520df6545928db3311"
        digest: "sha256:31b3022ee72566143e8634752536659e25d2d655c32624cf0bfbdb6ced924bca"
        operationDigest: "sha256:66cb289440e2353e7a028c7a3a49b84a5d3be5bf04c052a530f7edfa4e70710b"
        operationId: "task.pre_merge_close"
        outcome: "approved"
        policyRule: "workflow.external_high_risk"
        previousDigest: "sha256:f3eb08ae566c35d38baa2821e429ddd113d96c48b9e4a55a47f91448d73ab2b8"
        schemaVersion: 1
        sequence: 2
        stateFingerprintDigest: "sha256:f0c2e8036ddc35999f04b6a68fecc70bb1aa6992ffa524cfd0eb34c3cd99aca7"
      -
        actor: "USER"
        at: "2026-07-28T07:15:21.333Z"
        authorityDigest: "sha256:3615f11e77025731aafdd940e0d1d0fbe87fd765485fe79fa441791733115b3c"
        digest: "sha256:2739b55978f4e770ca0cd50c8e5ed6b4b86b8c51413b52b894879b78d47e81db"
        operationDigest: "sha256:c714b89546865f2e2cb91f2e1f1e79e5875d8d0bb23474e0100ff8460147ab45"
        operationId: "pr.head.publish"
        outcome: "approved"
        policyRule: "workflow.external_reversible"
        previousDigest: "sha256:31b3022ee72566143e8634752536659e25d2d655c32624cf0bfbdb6ced924bca"
        schemaVersion: 1
        sequence: 3
        stateFingerprintDigest: "sha256:85604ab5011fbaa8aebac437368aa46f1fec36f65b97b882a03a598e3597e5f5"
    grants:
      -
        actor: "USER"
        digest: "sha256:8ca7cd5d8f4976f025d6b0aa8cb2cbb5423f760c50f9f752b286ed2f45bc8269"
        expiresAt: "2026-07-28T07:21:18.123Z"
        id: "authority-41e715c0-4d57-45b3-a0f2-9b6cf2926ef1"
        issuedAt: "2026-07-28T07:06:18.123Z"
        kind: "side_effect_authority"
        operationDigest: "sha256:3061745a213a6329ba051e33060a630f708cadff2b2836ec00bdb7fbba012acb"
        operationId: "pr.open"
        policyRule: "workflow.external_reversible"
        schemaVersion: 1
        stateFingerprintDigest: "sha256:bb12614f644448b0cf57d79f54030b6018b91d4fa9625618cb3f7dece69e01c3"
        stateScopeDigest: "sha256:fc20ee7a1953c22543fb93d47739fa8181cba731c527721f221a8ffa7c6b56c0"
      -
        actor: "USER"
        digest: "sha256:ea7d504c29987178ad7ab0a4530679c0814f67793f147b520df6545928db3311"
        expiresAt: "2026-07-28T07:29:27.661Z"
        id: "authority-add87c65-cc74-480c-9a2e-672e708d2ffd"
        issuedAt: "2026-07-28T07:14:27.661Z"
        kind: "side_effect_authority"
        operationDigest: "sha256:66cb289440e2353e7a028c7a3a49b84a5d3be5bf04c052a530f7edfa4e70710b"
        operationId: "task.pre_merge_close"
        policyRule: "workflow.external_high_risk"
        schemaVersion: 1
        stateFingerprintDigest: "sha256:f0c2e8036ddc35999f04b6a68fecc70bb1aa6992ffa524cfd0eb34c3cd99aca7"
        stateScopeDigest: "sha256:9863b3d015f1bc872ec36af798a147ea7a64ceb414d08bc8f469c01488fb021a"
      -
        actor: "USER"
        digest: "sha256:3615f11e77025731aafdd940e0d1d0fbe87fd765485fe79fa441791733115b3c"
        expiresAt: "2026-07-28T07:30:21.333Z"
        id: "authority-4367b934-ee8e-41be-aa8d-230b2b70d051"
        issuedAt: "2026-07-28T07:15:21.333Z"
        kind: "side_effect_authority"
        operationDigest: "sha256:c714b89546865f2e2cb91f2e1f1e79e5875d8d0bb23474e0100ff8460147ab45"
        operationId: "pr.head.publish"
        policyRule: "workflow.external_reversible"
        schemaVersion: 1
        stateFingerprintDigest: "sha256:85604ab5011fbaa8aebac437368aa46f1fec36f65b97b882a03a598e3597e5f5"
        stateScopeDigest: "sha256:a2c337762ac5aa6ff132c778fc3ba121a97f04e87655d97a56216582e5abe3e8"
    schemaVersion: 1
  workflow_route_baseline:
    start_head_sha: "32bb732a2bc37b812d53839df9890353a34451ef"
    version: 1
id_source: "generated"
---
## Summary

Prove cleanup identity after provider-updated PR head

Allow branch_pr cleanup to recognize a GitHub-generated PR branch update after a protected-base merge, only when immutable ancestry and merged-base evidence prove the original task head is integrated. Preserve fail-closed behavior for unrelated or rewritten heads.

## Scope

- In scope: Allow branch_pr cleanup to recognize a GitHub-generated PR branch update after a protected-base merge, only when immutable ancestry and merged-base evidence prove the original task head is integrated. Preserve fail-closed behavior for unrelated or rewritten heads.
- Out of scope: unrelated refactors not required for "Prove cleanup identity after provider-updated PR head".

## Plan

1. Model the provider-updated PR head as a distinct cleanup evidence case without accepting arbitrary rewrites. 2. Permit cleanup only when immutable ancestry proves the original task head landed in the protected base and the observed provider head is the GitHub-generated update against that base. 3. Add positive and fail-closed regression tests, then run focused cleanup tests, typecheck, doctor, and routing validation.

## Verify Steps

1. bunx vitest packages/agentplane/src/commands/branch/cleanup-merged.targeted.test.ts: proves the GitHub-updated-head case is accepted only with merged-base ancestry and that unrelated/re-written heads remain rejected. 2. bun run typecheck: proves the changed cleanup proof code remains type-safe. 3. ap doctor and node .agentplane/policy/check-routing.mjs: prove runtime and policy routing integrity.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-07-28T07:13:25.623Z — VERIFY — ok

By: TESTER

Note: Targeted cleanup provider-proof regression suite, TypeScript build, runtime doctor, and routing validation all passed for commit 4e4708b49.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-28T07:12:56.651Z, excerpt_hash=sha256:7060a12b8de9d84c6c359fcc572eac9d51f07578a94d92549327d9b82f8f071a

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/inc-20260727-main-lane.prxk2f/repo/.agentplane/worktrees/202607280704-EATE9R-prove-cleanup-identity-after-provider-updated-pr/.agentplane/tasks/202607280704-EATE9R/blueprint/resolved-snapshot.json
- old_digest: a6a5c1ea93baefaf87bc79368e1c0966c2ef86d8029180cf279041ff42cf5712
- current_digest: a6a5c1ea93baefaf87bc79368e1c0966c2ef86d8029180cf279041ff42cf5712
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607280704-EATE9R

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202607280704-EATE9R
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: 17 targeted cleanup tests passed; typecheck, doctor, routing validation, Prettier, and diff check passed.
  Impact: The cleanup route recognizes only a provider merge head with the local task head and a base-ancestor parent.
  Resolution: Record local pass; the hosted PR route remains required before integration.
