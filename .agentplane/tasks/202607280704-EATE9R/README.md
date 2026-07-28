---
id: "202607280704-EATE9R"
title: "Prove cleanup identity after provider-updated PR head"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 6
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
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: implement a fail-closed cleanup identity proof for the provider-updated PR head observed during protected-base integration."
events:
  -
    type: "status"
    at: "2026-07-28T07:05:27.137Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implement a fail-closed cleanup identity proof for the provider-updated PR head observed during protected-base integration."
doc_version: 3
doc_updated_at: "2026-07-28T07:05:27.137Z"
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
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
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
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
