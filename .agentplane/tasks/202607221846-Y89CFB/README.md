---
id: "202607221846-Y89CFB"
title: "Build supervisor-owned execution receipts"
status: "TODO"
priority: "high"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on:
  - "202607221846-4CE7EG"
tags:
  - "evidence"
  - "milestone-alpha1"
  - "refactor"
  - "rf-01"
  - "runner"
  - "trust-boundary"
  - "v0.7"
  - "wave-trust"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "code.branch_pr"
verify:
  - "bun run lifecycle:invariants"
  - "bun run test:critical"
  - "bun run typecheck"
plan_approval:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
  attempts: 0
commit: null
comments: []
events: []
doc_version: 3
doc_updated_at: "2026-07-22T18:46:55.422Z"
doc_updated_by: "PLANNER"
description: "RF-01b: create ExecutionReceipt from observed process, Git, check, artifact, and hash evidence; prevent agent output from overriding it and consume it in success and verification policy."
sections:
  Summary: |-
    Build supervisor-owned execution receipts

    RF-01b: create ExecutionReceipt from observed process, Git, check, artifact, and hash evidence; prevent agent output from overriding it and consume it in success and verification policy.
  Scope: |-
    - In scope: ExecutionReceipt contract, adapter process observation, before/after Git snapshots, actual changed/untracked paths, observed checks, artifact hashes, provenance, conflict handling, success policy, context verification policy, and persisted runner state compatibility.
    - Out of scope: sandbox authority defaults and protected-path enforcement, which are completed in RF-03.
  Plan: |-
    1. Define the immutable supervisor-owned receipt and provenance model.
    2. Observe process completion, timeout, exit, capabilities, Git delta, checks, artifacts, and hashes outside the agent result parser.
    3. Replace manifest merge override behavior with claim-versus-observation reconciliation.
    4. Drive runner success and context verification from observed evidence.
    5. Cover conflicting claims, unreported writes, pre-existing dirt, legacy state, and artifact tampering.
  Verify Steps: |-
    1. Run adapters with an agent result that conflicts with actual exit, timing, checks, and paths. Expected: ExecutionReceipt records runtime truth; claims remain separate and cannot make a run successful.
    2. Create an unreported tracked or untracked write. Expected: the before/after observer records it with an observed provenance and stable digest.
    3. Start from a pre-existing dirty fixture. Expected: only the run delta is attributed to the episode.
    4. Verify a legacy task without a receipt. Expected: policy reports unverified/compatibility state, never observed success.
    5. Run focused adapter, manifest-policy, task-run, and context-policy tests plus `bun run lifecycle:invariants` and `bun run typecheck`.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert the task implementation commit(s) without changing unrelated task state.
    - Restore the previous persisted contract or schema version where applicable.
    - Re-run the task-specific checks and record any data requiring explicit migration repair.
  Findings: ""
id_source: "generated"
---
## Summary

Build supervisor-owned execution receipts

RF-01b: create ExecutionReceipt from observed process, Git, check, artifact, and hash evidence; prevent agent output from overriding it and consume it in success and verification policy.

## Scope

- In scope: ExecutionReceipt contract, adapter process observation, before/after Git snapshots, actual changed/untracked paths, observed checks, artifact hashes, provenance, conflict handling, success policy, context verification policy, and persisted runner state compatibility.
- Out of scope: sandbox authority defaults and protected-path enforcement, which are completed in RF-03.

## Plan

1. Define the immutable supervisor-owned receipt and provenance model.
2. Observe process completion, timeout, exit, capabilities, Git delta, checks, artifacts, and hashes outside the agent result parser.
3. Replace manifest merge override behavior with claim-versus-observation reconciliation.
4. Drive runner success and context verification from observed evidence.
5. Cover conflicting claims, unreported writes, pre-existing dirt, legacy state, and artifact tampering.

## Verify Steps

1. Run adapters with an agent result that conflicts with actual exit, timing, checks, and paths. Expected: ExecutionReceipt records runtime truth; claims remain separate and cannot make a run successful.
2. Create an unreported tracked or untracked write. Expected: the before/after observer records it with an observed provenance and stable digest.
3. Start from a pre-existing dirty fixture. Expected: only the run delta is attributed to the episode.
4. Verify a legacy task without a receipt. Expected: policy reports unverified/compatibility state, never observed success.
5. Run focused adapter, manifest-policy, task-run, and context-policy tests plus `bun run lifecycle:invariants` and `bun run typecheck`.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert the task implementation commit(s) without changing unrelated task state.
- Restore the previous persisted contract or schema version where applicable.
- Re-run the task-specific checks and record any data requiring explicit migration repair.

## Findings
