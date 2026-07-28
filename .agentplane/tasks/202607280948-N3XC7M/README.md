---
id: "202607280948-N3XC7M"
title: "Retry transient runner cancellation intent reads"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "runner"
  - "ci"
  - "regression"
  - "v0.7"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-07-28T09:48:50.744Z"
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
    at: "2026-07-28T09:49:46.640Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
doc_version: 3
doc_updated_at: "2026-07-28T09:49:46.640Z"
doc_updated_by: "CODER"
description: "Fix the CI-proven race where an atomically published runner cancellation intent changes during a stable read and is treated as a fatal execution error. Retry only transient immutable-publication collisions, preserve fail-closed behavior for malformed or unsafe records, and add deterministic regression coverage."
sections:
  Summary: |-
    Retry transient runner cancellation intent reads

    Fix the CI-proven race where an atomically published runner cancellation intent changes during a stable read and is treated as a fatal execution error. Retry only transient immutable-publication collisions, preserve fail-closed behavior for malformed or unsafe records, and add deterministic regression coverage.
  Scope: |-
    - In scope: Fix the CI-proven race where an atomically published runner cancellation intent changes during a stable read and is treated as a fatal execution error. Retry only transient immutable-publication collisions, preserve fail-closed behavior for malformed or unsafe records, and add deterministic regression coverage.
    - Out of scope: unrelated refactors not required for "Retry transient runner cancellation intent reads".
  Plan: "1. Add a narrowly scoped retry path for transient stable-read collisions when observing immutable runner cancellation intents. 2. Keep ENOENT optionality and unsafe/malformed-record failures fail-closed. 3. Add a deterministic regression that injects one publication-race read failure, then proves cancellation completes. 4. Run focused runner tests, typecheck, and the relevant fast unit gate."
  Verify Steps: "1. Inject a single transient stable-file publication collision while reading a runner cancellation intent; expected: the read retries and returns the immutable intent. 2. Execute the cancellation lifecycle regression; expected: cancellation yields terminal cancelled state, not failed. 3. Run focused execution-control and lifecycle-cancellation tests, typecheck, and bun run test:fast; expected: all pass."
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
        at: "2026-07-28T09:50:41.587Z"
        authorityDigest: "sha256:85ae791ce354cec9aa11f9c7c723dd1171411f847ade6977953bf45ccb47314d"
        digest: "sha256:93c58638aab8a8213938c16d9d6193729e7be01a2e153ed3914127745fc08122"
        operationDigest: "sha256:9985527c3943e690522424b7653bdc11b0c9ce90519ce9ebb718de33f669d73a"
        operationId: "pr.open"
        outcome: "approved"
        policyRule: "workflow.external_reversible"
        previousDigest: null
        schemaVersion: 1
        sequence: 1
        stateFingerprintDigest: "sha256:d907e506b0184d09c4489ef4d0fb2e67a1d050c8db004ca55e64e9999b53774c"
    grants:
      -
        actor: "USER"
        digest: "sha256:85ae791ce354cec9aa11f9c7c723dd1171411f847ade6977953bf45ccb47314d"
        expiresAt: "2026-07-28T10:05:41.587Z"
        id: "authority-0e48b6e5-e106-479c-8676-666931efd6e0"
        issuedAt: "2026-07-28T09:50:41.587Z"
        kind: "side_effect_authority"
        operationDigest: "sha256:9985527c3943e690522424b7653bdc11b0c9ce90519ce9ebb718de33f669d73a"
        operationId: "pr.open"
        policyRule: "workflow.external_reversible"
        schemaVersion: 1
        stateFingerprintDigest: "sha256:d907e506b0184d09c4489ef4d0fb2e67a1d050c8db004ca55e64e9999b53774c"
        stateScopeDigest: "sha256:52c328820e5a7f8cccefc775c7f6953048fad851220a86e4c08effc390db0018"
    schemaVersion: 1
  workflow_route_baseline:
    start_head_sha: "89a82f010479eb2583e414fb49c930d4819b5777"
    version: 1
id_source: "generated"
---
## Summary

Retry transient runner cancellation intent reads

Fix the CI-proven race where an atomically published runner cancellation intent changes during a stable read and is treated as a fatal execution error. Retry only transient immutable-publication collisions, preserve fail-closed behavior for malformed or unsafe records, and add deterministic regression coverage.

## Scope

- In scope: Fix the CI-proven race where an atomically published runner cancellation intent changes during a stable read and is treated as a fatal execution error. Retry only transient immutable-publication collisions, preserve fail-closed behavior for malformed or unsafe records, and add deterministic regression coverage.
- Out of scope: unrelated refactors not required for "Retry transient runner cancellation intent reads".

## Plan

1. Add a narrowly scoped retry path for transient stable-read collisions when observing immutable runner cancellation intents. 2. Keep ENOENT optionality and unsafe/malformed-record failures fail-closed. 3. Add a deterministic regression that injects one publication-race read failure, then proves cancellation completes. 4. Run focused runner tests, typecheck, and the relevant fast unit gate.

## Verify Steps

1. Inject a single transient stable-file publication collision while reading a runner cancellation intent; expected: the read retries and returns the immutable intent. 2. Execute the cancellation lifecycle regression; expected: cancellation yields terminal cancelled state, not failed. 3. Run focused execution-control and lifecycle-cancellation tests, typecheck, and bun run test:fast; expected: all pass.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
