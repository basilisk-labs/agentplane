---
id: "202602111519-GH7VJW"
title: "T5: Network approvals honor execution escalation"
result_summary: "Network approvals are execution-aware across command paths."
risk_level: "low"
status: "DONE"
priority: "high"
owner: "CODER"
depends_on:
  - "202602111519-6CT56C"
  - "202602111519-XP57PR"
tags:
  - "cli"
  - "policy"
  - "code"
verify: []
plan_approval:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
verification:
  state: "ok"
  updated_at: "2026-02-11T15:48:00.209Z"
  updated_by: "CODER"
  note: "Verified: update-check network gating now uses execution-aware effective approvals, so conservative profile requires explicit --allow-network even when require_network=false. Added run-cli core tests, then ran lint and builds."
commit:
  hash: "839f558c89711769ac804c2d874ac0e839462057"
  message: "✅ GH7VJW network: apply execution-aware update-check gating"
comments:
  -
    author: "CODER"
    body: "Start: aligning update-check and other network paths with execution-aware approval gating."
  -
    author: "CODER"
    body: "Verified: All network policy gates now honor execution escalation, including update-check behavior under conservative profile, with explicit --allow-network override preserved."
events:
  -
    type: "status"
    at: "2026-02-11T15:46:42.765Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: aligning update-check and other network paths with execution-aware approval gating."
  -
    type: "verify"
    at: "2026-02-11T15:48:00.209Z"
    author: "CODER"
    state: "ok"
    note: "Verified: update-check network gating now uses execution-aware effective approvals, so conservative profile requires explicit --allow-network even when require_network=false. Added run-cli core tests, then ran lint and builds."
  -
    type: "status"
    at: "2026-02-11T15:48:35.938Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: All network policy gates now honor execution escalation, including update-check behavior under conservative profile, with explicit --allow-network override preserved."
doc_version: 2
doc_updated_at: "2026-02-11T15:48:35.938Z"
doc_updated_by: "CODER"
description: "Route network checks through unified approval helper so conservative requires approval even when require_network=false."
id_source: "generated"
---
## Summary

Ensure network approval checks honor execution escalation consistently, including optional update-check gating.

## Scope

In scope: run-cli update-check policy gating and regression tests for conservative profile behavior. Out of scope: non-network force approvals (handled in T4).

## Plan

1) Switch update-check gating to effective approvals (execution + approvals). 2) Add/adjust tests to prove conservative profile blocks update-check without explicit allow. 3) Run CLI/core tests and builds.

## Risks

Risk: changing update-check behavior for users with custom execution profile. Mitigation: preserve opt-in semantics through --allow-network and add targeted tests.

## Verify Steps

Run: bun run test:cli:core -- packages/agentplane/src/cli/run-cli.core.test.ts ; bun run test:agentplane -- packages/agentplane/src/commands/shared/network-approval.test.ts ; bun run lint ; bun run --filter=@agentplaneorg/core build ; bun run --filter=agentplane build

## Verification

### Plan

### Results

<!-- BEGIN VERIFICATION RESULTS -->
#### 2026-02-11T15:48:00.209Z — VERIFY — ok

By: CODER

Note: Verified: update-check network gating now uses execution-aware effective approvals, so conservative profile requires explicit --allow-network even when require_network=false. Added run-cli core tests, then ran lint and builds.

VerifyStepsRef: doc_version=2, doc_updated_at=2026-02-11T15:46:42.765Z, excerpt_hash=sha256:2a787421b6f704ac0f69035dff7cbb6cd9a36e95812bd8b7995fcc74d1a93b8a

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

Revert this task commit to restore prior update-check gating logic and rerun CLI tests.

## Context

ensureNetworkApproved now evaluates effective approvals, but update-check gating in run-cli still reads raw require_network and ignores conservative escalation.

## Notes

### Decisions
Use effective approvals computed from execution profile for all network gating decisions.
