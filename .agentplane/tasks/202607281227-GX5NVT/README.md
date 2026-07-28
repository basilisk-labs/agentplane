---
id: "202607281227-GX5NVT"
title: "Handle evaluator stdin EPIPE without unhandled CI failures"
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
  updated_at: "2026-07-28T12:28:08.182Z"
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
    at: "2026-07-28T12:28:33.621Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
doc_version: 3
doc_updated_at: "2026-07-28T12:28:33.621Z"
doc_updated_by: "CODER"
description: "Prevent unhandled EPIPE when the evaluator provider closes stdin while the prompt is being dispatched; retain provider failure semantics and add a deterministic regression test."
sections:
  Summary: |-
    Handle evaluator stdin EPIPE without unhandled CI failures

    Prevent unhandled EPIPE when the evaluator provider closes stdin while the prompt is being dispatched; retain provider failure semantics and add a deterministic regression test.
  Scope: |-
    - In scope: Prevent unhandled EPIPE when the evaluator provider closes stdin while the prompt is being dispatched; retain provider failure semantics and add a deterministic regression test.
    - Out of scope: unrelated refactors not required for "Handle evaluator stdin EPIPE without unhandled CI failures".
  Plan: "1. Add a deterministic regression case for evaluator stdin closing during prompt dispatch. 2. Make the evaluator subprocess boundary consume or classify EPIPE without producing an unhandled exception, while preserving the provider failure receipt. 3. Run focused evaluator tests, typecheck, and the fast unit suite; record the GitHub CI result."
  Verify Steps: "1. Run the focused evaluator execution test, including a regression where stdin closes before or during prompt dispatch; expected: a structured provider failure is recorded and Vitest reports no unhandled EPIPE. 2. Run bun run typecheck; expected: pass. 3. Run bun run test:fast; expected: pass with zero unhandled errors. 4. Confirm the hosted PR Core CI reports a successful PR verification check."
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
        at: "2026-07-28T12:28:47.568Z"
        authorityDigest: "sha256:87554586ecab56011f5c7cb7b3590988df9cba49a0e456965c392368baf7165c"
        digest: "sha256:3ea3e725b0f326ac2ff2cfabd5689de89cf5180063daef26c4793659aded3851"
        operationDigest: "sha256:bf1c8a0147e12630d11b9b29faed5761f00e7e1e594edc6daae4c8410c98d011"
        operationId: "pr.open"
        outcome: "approved"
        policyRule: "workflow.external_reversible"
        previousDigest: null
        schemaVersion: 1
        sequence: 1
        stateFingerprintDigest: "sha256:a9d871cc1b56afec4b597d7e311f0e8e1f9d89e47f86c8deaea2cad0dc21ed72"
    grants:
      -
        actor: "USER"
        digest: "sha256:87554586ecab56011f5c7cb7b3590988df9cba49a0e456965c392368baf7165c"
        expiresAt: "2026-07-28T12:43:47.568Z"
        id: "authority-d5e36611-8107-4da1-93c2-c3124ec50104"
        issuedAt: "2026-07-28T12:28:47.568Z"
        kind: "side_effect_authority"
        operationDigest: "sha256:bf1c8a0147e12630d11b9b29faed5761f00e7e1e594edc6daae4c8410c98d011"
        operationId: "pr.open"
        policyRule: "workflow.external_reversible"
        schemaVersion: 1
        stateFingerprintDigest: "sha256:a9d871cc1b56afec4b597d7e311f0e8e1f9d89e47f86c8deaea2cad0dc21ed72"
        stateScopeDigest: "sha256:f1264e917bfe98421ab2370cf31a492aac5583479cdf8c992949ae3252f1936c"
    schemaVersion: 1
  workflow_route_baseline:
    start_head_sha: "47213e98e23ec136566a31bb1ef6c44f16d64690"
    version: 1
id_source: "generated"
---
## Summary

Handle evaluator stdin EPIPE without unhandled CI failures

Prevent unhandled EPIPE when the evaluator provider closes stdin while the prompt is being dispatched; retain provider failure semantics and add a deterministic regression test.

## Scope

- In scope: Prevent unhandled EPIPE when the evaluator provider closes stdin while the prompt is being dispatched; retain provider failure semantics and add a deterministic regression test.
- Out of scope: unrelated refactors not required for "Handle evaluator stdin EPIPE without unhandled CI failures".

## Plan

1. Add a deterministic regression case for evaluator stdin closing during prompt dispatch. 2. Make the evaluator subprocess boundary consume or classify EPIPE without producing an unhandled exception, while preserving the provider failure receipt. 3. Run focused evaluator tests, typecheck, and the fast unit suite; record the GitHub CI result.

## Verify Steps

1. Run the focused evaluator execution test, including a regression where stdin closes before or during prompt dispatch; expected: a structured provider failure is recorded and Vitest reports no unhandled EPIPE. 2. Run bun run typecheck; expected: pass. 3. Run bun run test:fast; expected: pass with zero unhandled errors. 4. Confirm the hosted PR Core CI reports a successful PR verification check.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
