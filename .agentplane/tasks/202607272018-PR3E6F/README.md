---
id: "202607272018-PR3E6F"
title: "Synchronize evaluator verification guidance for alpha.2 qualification"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "alpha2"
  - "documentation"
  - "evaluator"
  - "rework"
  - "v0.7"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-07-27T20:19:43.747Z"
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
    body: "Start: continue branch_pr task in the dedicated task worktree."
events:
  -
    type: "status"
    at: "2026-07-27T20:20:49.746Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
doc_version: 3
doc_updated_at: "2026-07-27T20:20:49.746Z"
doc_updated_by: "CODER"
description: "Fix the bootstrap contract drift where AGENTS.md and its packaged asset still prescribe evaluator execute while the generated bootstrap contract requires evaluator run. Keep the change limited to canonical guidance, derived asset synchronization, and the failing freshness/contract checks."
sections:
  Summary: |-
    Synchronize evaluator verification guidance for alpha.2 qualification

    Fix the bootstrap contract drift where AGENTS.md and its packaged asset still prescribe evaluator execute while the generated bootstrap contract requires evaluator run. Keep the change limited to canonical guidance, derived asset synchronization, and the failing freshness/contract checks.
  Scope: |-
    - In scope: Fix the bootstrap contract drift where AGENTS.md and its packaged asset still prescribe evaluator execute while the generated bootstrap contract requires evaluator run. Keep the change limited to canonical guidance, derived asset synchronization, and the failing freshness/contract checks.
    - Out of scope: unrelated refactors not required for "Synchronize evaluator verification guidance for alpha.2 qualification".
  Plan: |-
    1. Compare BOOTSTRAP_VERIFICATION_COMMANDS with the canonical AGENTS.md Verification block and change only the stale evaluator recording command from evaluator execute to evaluator run. Keep the branch_pr lifecycle provider-execution command unchanged.
    2. Run the repository agent-template synchronizer so packages/agentplane/assets/AGENTS.md remains derived from the canonical root file.
    3. Confirm generated bootstrap guidance and packaged assets are fresh, then run the contract gate that originally failed.
    4. Record the rebase-merge-safe limitation that task-local historical commit hashes are not expected to be main ancestors.
  Verify Steps: |-
    1. Run bun run docs:bootstrap:check. Expected: AGENTS.md Verification block exactly matches BOOTSTRAP_VERIFICATION_COMMANDS.
    2. Run bun run agents:check. Expected: packages/agentplane/assets/AGENTS.md is synchronized with AGENTS.md.
    3. Verify that branch_pr lifecycle guidance still contains evaluator execute and that only verification-record guidance uses evaluator run. Expected: provider execution and result recording remain distinct.
    4. Run bun run ci:contract. Expected: the original alpha.2 blocking gate passes without unrelated changes.
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
        at: "2026-07-27T20:21:14.833Z"
        authorityDigest: "sha256:123c544629dd0b6a47802057b940cbe4a1a5d3b7894fcb6350057faa1bd701e0"
        digest: "sha256:e67054a76f32c7ca76441503398274dfd8aaf8ce79b3c3c75ee594ba00579ad6"
        operationDigest: "sha256:091cc0e77f0932eedcabc20556b7cd85f5f16ebb0f9fc556782b61beecc15e5d"
        operationId: "pr.open"
        outcome: "approved"
        policyRule: "workflow.external_reversible"
        previousDigest: null
        schemaVersion: 1
        sequence: 1
        stateFingerprintDigest: "sha256:efe8ff07733db915b7358c4206761fd47411aca26d0a05990c2e30ae4526332c"
    grants:
      -
        actor: "USER"
        digest: "sha256:123c544629dd0b6a47802057b940cbe4a1a5d3b7894fcb6350057faa1bd701e0"
        expiresAt: "2026-07-27T20:36:14.833Z"
        id: "authority-35c9dead-aef3-4bc3-8131-6166cf1cb885"
        issuedAt: "2026-07-27T20:21:14.833Z"
        kind: "side_effect_authority"
        operationDigest: "sha256:091cc0e77f0932eedcabc20556b7cd85f5f16ebb0f9fc556782b61beecc15e5d"
        operationId: "pr.open"
        policyRule: "workflow.external_reversible"
        schemaVersion: 1
        stateFingerprintDigest: "sha256:efe8ff07733db915b7358c4206761fd47411aca26d0a05990c2e30ae4526332c"
        stateScopeDigest: "sha256:7e78a4bb257fe0ff0939cd6187908bb311c731a8546e2b069f58f8da3d2176a3"
    schemaVersion: 1
  workflow_route_baseline:
    start_head_sha: "56e0d620fad82ca93bb9a2f6deddbd48c87c1a55"
    version: 1
id_source: "generated"
---
## Summary

Synchronize evaluator verification guidance for alpha.2 qualification

Fix the bootstrap contract drift where AGENTS.md and its packaged asset still prescribe evaluator execute while the generated bootstrap contract requires evaluator run. Keep the change limited to canonical guidance, derived asset synchronization, and the failing freshness/contract checks.

## Scope

- In scope: Fix the bootstrap contract drift where AGENTS.md and its packaged asset still prescribe evaluator execute while the generated bootstrap contract requires evaluator run. Keep the change limited to canonical guidance, derived asset synchronization, and the failing freshness/contract checks.
- Out of scope: unrelated refactors not required for "Synchronize evaluator verification guidance for alpha.2 qualification".

## Plan

1. Compare BOOTSTRAP_VERIFICATION_COMMANDS with the canonical AGENTS.md Verification block and change only the stale evaluator recording command from evaluator execute to evaluator run. Keep the branch_pr lifecycle provider-execution command unchanged.
2. Run the repository agent-template synchronizer so packages/agentplane/assets/AGENTS.md remains derived from the canonical root file.
3. Confirm generated bootstrap guidance and packaged assets are fresh, then run the contract gate that originally failed.
4. Record the rebase-merge-safe limitation that task-local historical commit hashes are not expected to be main ancestors.

## Verify Steps

1. Run bun run docs:bootstrap:check. Expected: AGENTS.md Verification block exactly matches BOOTSTRAP_VERIFICATION_COMMANDS.
2. Run bun run agents:check. Expected: packages/agentplane/assets/AGENTS.md is synchronized with AGENTS.md.
3. Verify that branch_pr lifecycle guidance still contains evaluator execute and that only verification-record guidance uses evaluator run. Expected: provider execution and result recording remain distinct.
4. Run bun run ci:contract. Expected: the original alpha.2 blocking gate passes without unrelated changes.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
