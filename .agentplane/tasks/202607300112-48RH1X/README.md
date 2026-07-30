---
id: "202607300112-48RH1X"
title: "Authorize deterministic RF-04 qualification rebuild evidence"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "qualification"
  - "rf04"
  - "safety"
  - "v0.7"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-07-30T01:13:01.324Z"
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
    body: "Start: implement the constrained deterministic RF-04 qualification rebuild target in the dedicated task worktree."
events:
  -
    type: "status"
    at: "2026-07-30T01:13:16.030Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implement the constrained deterministic RF-04 qualification rebuild target in the dedicated task worktree."
doc_version: 3
doc_updated_at: "2026-07-30T01:27:45.804Z"
doc_updated_by: "CODER"
description: "Repair the RF-04 replay capture safety contract so a qualification packet can rebuild frozen envelopes into its exact task-local evidence file without a provider driver, retry, replacement capture, or mutable baseline write. Keep all non-qualification capture targets restricted."
sections:
  Summary: |-
    Authorize deterministic RF-04 qualification rebuild evidence

    Repair the RF-04 replay capture safety contract so a qualification packet can rebuild frozen envelopes into its exact task-local evidence file without a provider driver, retry, replacement capture, or mutable baseline write. Keep all non-qualification capture targets restricted.
  Scope: |-
    - In scope: Repair the RF-04 replay capture safety contract so a qualification packet can rebuild frozen envelopes into its exact task-local evidence file without a provider driver, retry, replacement capture, or mutable baseline write. Keep all non-qualification capture targets restricted.
    - Out of scope: unrelated refactors not required for "Authorize deterministic RF-04 qualification rebuild evidence".
  Plan: |-
    1. Define one explicit qualification-rebuild target derived from a validated task ID and fixed evidence filename; retain canonical-only targets for every other RF-04 mode.
    2. Reject conflicting --output, provider --driver, --replace, and --pilot combinations for this deterministic rebuild path.
    3. Route qualification-packet RF-04 rebuilding through the new constrained contract and retain exact frozen-measurement comparison.
    4. Add focused tests for allowed task-local rebuild, traversal/foreign path rejection, and no-driver/no-replacement invariants.
    5. Run focused tests, RF-04 safety tests, qualification packet tests, ci:contract, and a real local packet-build probe with no provider invocation.
  Verify Steps: |-
    1. Focused RF-04 safety and capture-script tests prove that only the exact .agentplane/tasks/<task-id>/evidence/rf04-current-rebuild.v1.json target is accepted for qualification rebuilds.
    2. Focused qualification-packet tests prove the packet emits that evidence path and rejects divergent frozen measurements.
    3. Tests prove qualification rebuild rejects --driver, --replace, --pilot, conflicting --output, malformed task IDs, and path traversal.
    4. `bun run ci:contract` passes.
    5. A real local `ap task verify ok` packet-build probe reaches the RF-04 candidate gate without provider driver/retry/replacement execution; beta.1 remains blocked if candidate verdict is fail.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: The qualification rebuild must project immutable historical envelope and evidence bytes, not compare them with post-capture local driver or dependency bytes.
      Impact: Current workspace evolution otherwise makes a valid frozen replay artifact impossible to rebuild and blocks the beta.1 packet before its candidate gate.
      Resolution: Qualification mode accepts only a fixed task-local output, preserves no-driver/no-replace controls, and reconstructs using the frozen baseline harness after envelope consistency checks.
extensions:
  workflow_route_baseline:
    start_head_sha: "dd7d77beb33517ce7e208935925fa58ce66d4029"
    version: 1
id_source: "generated"
---
## Summary

Authorize deterministic RF-04 qualification rebuild evidence

Repair the RF-04 replay capture safety contract so a qualification packet can rebuild frozen envelopes into its exact task-local evidence file without a provider driver, retry, replacement capture, or mutable baseline write. Keep all non-qualification capture targets restricted.

## Scope

- In scope: Repair the RF-04 replay capture safety contract so a qualification packet can rebuild frozen envelopes into its exact task-local evidence file without a provider driver, retry, replacement capture, or mutable baseline write. Keep all non-qualification capture targets restricted.
- Out of scope: unrelated refactors not required for "Authorize deterministic RF-04 qualification rebuild evidence".

## Plan

1. Define one explicit qualification-rebuild target derived from a validated task ID and fixed evidence filename; retain canonical-only targets for every other RF-04 mode.
2. Reject conflicting --output, provider --driver, --replace, and --pilot combinations for this deterministic rebuild path.
3. Route qualification-packet RF-04 rebuilding through the new constrained contract and retain exact frozen-measurement comparison.
4. Add focused tests for allowed task-local rebuild, traversal/foreign path rejection, and no-driver/no-replacement invariants.
5. Run focused tests, RF-04 safety tests, qualification packet tests, ci:contract, and a real local packet-build probe with no provider invocation.

## Verify Steps

1. Focused RF-04 safety and capture-script tests prove that only the exact .agentplane/tasks/<task-id>/evidence/rf04-current-rebuild.v1.json target is accepted for qualification rebuilds.
2. Focused qualification-packet tests prove the packet emits that evidence path and rejects divergent frozen measurements.
3. Tests prove qualification rebuild rejects --driver, --replace, --pilot, conflicting --output, malformed task IDs, and path traversal.
4. `bun run ci:contract` passes.
5. A real local `ap task verify ok` packet-build probe reaches the RF-04 candidate gate without provider driver/retry/replacement execution; beta.1 remains blocked if candidate verdict is fail.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: The qualification rebuild must project immutable historical envelope and evidence bytes, not compare them with post-capture local driver or dependency bytes.
  Impact: Current workspace evolution otherwise makes a valid frozen replay artifact impossible to rebuild and blocks the beta.1 packet before its candidate gate.
  Resolution: Qualification mode accepts only a fixed task-local output, preserves no-driver/no-replace controls, and reconstructs using the frozen baseline harness after envelope consistency checks.
