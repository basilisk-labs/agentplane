---
id: "202607221846-ZAENM6"
title: "Add trust-boundary architecture ratchets"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on:
  - "202607221846-SXJ75T"
tags:
  - "architecture"
  - "guard"
  - "milestone-alpha1"
  - "refactor"
  - "rf-27"
  - "v0.7"
  - "wave-trust"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "code.branch_pr"
verify:
  - "bun run ci:contract"
  - "bun run guards:check"
  - "bun run test:critical"
plan_approval:
  state: "approved"
  updated_at: "2026-07-22T21:26:45.488Z"
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
    body: "Start: implement trust-boundary architecture ratchets from the approved alpha.1 plan."
events:
  -
    type: "status"
    at: "2026-07-22T21:28:08.834Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implement trust-boundary architecture ratchets from the approved alpha.1 plan."
doc_version: 3
doc_updated_at: "2026-07-22T21:28:08.834Z"
doc_updated_by: "CODER"
description: "RF-27a: baseline and prohibit new automatic semantic verdicts, agent-writable observed fields, implicit danger sandboxes, untyped durable boundaries, shell-string orchestration, and duplicate runner task representations."
sections:
  Summary: |-
    Add trust-boundary architecture ratchets

    RF-27a: baseline and prohibit new automatic semantic verdicts, agent-writable observed fields, implicit danger sandboxes, untyped durable boundaries, shell-string orchestration, and duplicate runner task representations.
  Scope: |-
    - In scope: a baseline-plus-ratchet checker, machine-readable known-violation inventory, focused checker tests, and CI integration for the v0.7 trust invariants.
    - Out of scope: failing the build for every legacy violation before its owning RF slice is migrated.
  Plan: |-
    1. Define precise syntax- and schema-aware checks for each approved trust invariant.
    2. Record only current legacy violations with stable identifiers and owners.
    3. Fail on new violations and on baseline growth while allowing baseline reduction.
    4. Add focused positive and negative checker fixtures.
    5. Integrate the ratchet into the existing guard/contract lane.
  Verify Steps: |-
    1. Run the checker against current main. Expected: only reviewed baseline entries are accepted and each entry maps to an RF owner.
    2. Add one synthetic violation per invariant in test fixtures. Expected: every new violation fails with an actionable path and rule id.
    3. Remove a baseline fixture entry. Expected: the checker requires the baseline to shrink rather than silently restoring it.
    4. Run `bun run guards:check`, `bun run test:critical`, and `bun run ci:contract`. Expected: the ratchet is enforced by the normal contract lane.
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

Add trust-boundary architecture ratchets

RF-27a: baseline and prohibit new automatic semantic verdicts, agent-writable observed fields, implicit danger sandboxes, untyped durable boundaries, shell-string orchestration, and duplicate runner task representations.

## Scope

- In scope: a baseline-plus-ratchet checker, machine-readable known-violation inventory, focused checker tests, and CI integration for the v0.7 trust invariants.
- Out of scope: failing the build for every legacy violation before its owning RF slice is migrated.

## Plan

1. Define precise syntax- and schema-aware checks for each approved trust invariant.
2. Record only current legacy violations with stable identifiers and owners.
3. Fail on new violations and on baseline growth while allowing baseline reduction.
4. Add focused positive and negative checker fixtures.
5. Integrate the ratchet into the existing guard/contract lane.

## Verify Steps

1. Run the checker against current main. Expected: only reviewed baseline entries are accepted and each entry maps to an RF owner.
2. Add one synthetic violation per invariant in test fixtures. Expected: every new violation fails with an actionable path and rule id.
3. Remove a baseline fixture entry. Expected: the checker requires the baseline to shrink rather than silently restoring it.
4. Run `bun run guards:check`, `bun run test:critical`, and `bun run ci:contract`. Expected: the ratchet is enforced by the normal contract lane.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert the task implementation commit(s) without changing unrelated task state.
- Restore the previous persisted contract or schema version where applicable.
- Re-run the task-specific checks and record any data requiring explicit migration repair.

## Findings
