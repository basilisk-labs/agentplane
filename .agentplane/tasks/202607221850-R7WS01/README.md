---
id: "202607221850-R7WS01"
title: "Return typed runner lifecycle results"
status: "TODO"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on:
  - "202607221846-Y89CFB"
  - "202607221848-VC4VVS"
  - "202607221850-9C9WBP"
  - "202607221850-DRWR0V"
  - "202607242158-QV09NA"
tags:
  - "milestone-beta1"
  - "refactor"
  - "rf-25"
  - "runner"
  - "use-case"
  - "v0.7"
  - "wave-supervisor"
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
doc_updated_at: "2026-07-22T18:50:23.048Z"
doc_updated_by: "PLANNER"
description: "RF-25d: make runner preparation, invocation, observation, evaluation, and lifecycle operations return typed in-process results with compatibility renderers instead of stdout parsing."
sections:
  Summary: |-
    Return typed runner lifecycle results

    RF-25d: make runner preparation, invocation, observation, evaluation, and lifecycle operations return typed in-process results with compatibility renderers instead of stdout parsing.
  Scope: |-
    - In scope: typed runner use-case results, adapter ports, error/result union, human/JSON renderers, compatibility snapshots, and supervisor invocation without subprocess/stdout capture.
    - Consume the durable effect-resolution contract as typed `effect_in_doubt`, `applied` and `not_applied` states, preserving resolution provenance, authority/evidence identity and claim generation in every in-process result and renderer.
    - An unresolved `effect_in_doubt` result is terminally blocked for generic retry, replay, resume and restart paths; only the explicit resolution protocol from task 202607242158-QV09NA may transition it to `applied` or `not_applied`.
    - Out of scope: automating the complete direct route, delivered by the next task.
  Plan: |-
    1. Define typed results for runner preparation, invocation, observation, evaluation handoff, and terminal outcomes.
    2. Separate rendering/exit mapping from use-case logic.
    3. Call runner phases in-process from the supervisor.
    4. Map durable journal/resolution input to typed `effect_in_doubt`, `applied` and `not_applied` outcomes with resolution provenance, and reject any generic retry path for unresolved effects.
    5. Preserve documented human and JSON output through compatibility renderers without dropping resolution provenance.
    6. Add result/renderer parity, adapter error, cancellation, timeout, stale-work-order and effect-resolution transition tests.
  Verify Steps: |-
    1. Invoke each runner phase in-process. Expected: structured results carry work-order/fingerprint/receipt identities without reading stdout.
    2. Render the same result to human and JSON formats. Expected: compatibility snapshots and exit codes remain stable.
    3. Feed durable journal states for `effect_in_doubt`, operator-resolved `applied` and operator-resolved `not_applied` into each runner/supervisor entry point. Expected: typed results and both renderers preserve the state, operator-supplied resolution provenance, evidence/authority digests and claim generation without stdout parsing.
    4. Invoke generic retry, replay, resume and restart against unresolved `effect_in_doubt`. Expected: every path returns the typed blocked outcome, performs no adapter invocation and directs callers only to the explicit operator-resolution protocol; no generic retry can reinterpret the effect as `not_applied`.
    5. Exercise cancellation, timeout, adapter crash, stale input, and policy denial. Expected: typed outcomes and observed receipts remain complete.
    6. Run runner/supervisor/lifecycle tests and typecheck.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert the migrated vertical slice while preserving the typed contracts consumed by later tasks.
    - Preserve `effect_in_doubt`, `applied` and `not_applied` states plus resolution provenance in any compatibility boundary; do not restore a generic retry path for unresolved effects.
    - Restore the previous compatibility path only when it cannot bypass the explicit operator-resolution protocol or invoke the adapter for unresolved `effect_in_doubt`.
    - Re-run lifecycle, focused, and type checks before resuming dependent work.
  Findings: ""
id_source: "generated"
---
## Summary

Return typed runner lifecycle results

RF-25d: make runner preparation, invocation, observation, evaluation, and lifecycle operations return typed in-process results with compatibility renderers instead of stdout parsing.

## Scope

- In scope: typed runner use-case results, adapter ports, error/result union, human/JSON renderers, compatibility snapshots, and supervisor invocation without subprocess/stdout capture.
- Consume the durable effect-resolution contract as typed `effect_in_doubt`, `applied` and `not_applied` states, preserving resolution provenance, authority/evidence identity and claim generation in every in-process result and renderer.
- An unresolved `effect_in_doubt` result is terminally blocked for generic retry, replay, resume and restart paths; only the explicit resolution protocol from task 202607242158-QV09NA may transition it to `applied` or `not_applied`.
- Out of scope: automating the complete direct route, delivered by the next task.

## Plan

1. Define typed results for runner preparation, invocation, observation, evaluation handoff, and terminal outcomes.
2. Separate rendering/exit mapping from use-case logic.
3. Call runner phases in-process from the supervisor.
4. Map durable journal/resolution input to typed `effect_in_doubt`, `applied` and `not_applied` outcomes with resolution provenance, and reject any generic retry path for unresolved effects.
5. Preserve documented human and JSON output through compatibility renderers without dropping resolution provenance.
6. Add result/renderer parity, adapter error, cancellation, timeout, stale-work-order and effect-resolution transition tests.

## Verify Steps

1. Invoke each runner phase in-process. Expected: structured results carry work-order/fingerprint/receipt identities without reading stdout.
2. Render the same result to human and JSON formats. Expected: compatibility snapshots and exit codes remain stable.
3. Feed durable journal states for `effect_in_doubt`, operator-resolved `applied` and operator-resolved `not_applied` into each runner/supervisor entry point. Expected: typed results and both renderers preserve the state, operator-supplied resolution provenance, evidence/authority digests and claim generation without stdout parsing.
4. Invoke generic retry, replay, resume and restart against unresolved `effect_in_doubt`. Expected: every path returns the typed blocked outcome, performs no adapter invocation and directs callers only to the explicit operator-resolution protocol; no generic retry can reinterpret the effect as `not_applied`.
5. Exercise cancellation, timeout, adapter crash, stale input, and policy denial. Expected: typed outcomes and observed receipts remain complete.
6. Run runner/supervisor/lifecycle tests and typecheck.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert the migrated vertical slice while preserving the typed contracts consumed by later tasks.
- Preserve `effect_in_doubt`, `applied` and `not_applied` states plus resolution provenance in any compatibility boundary; do not restore a generic retry path for unresolved effects.
- Restore the previous compatibility path only when it cannot bypass the explicit operator-resolution protocol or invoke the adapter for unresolved `effect_in_doubt`.
- Re-run lifecycle, focused, and type checks before resuming dependent work.

## Findings
