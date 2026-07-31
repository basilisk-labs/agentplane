---
id: "202607310028-7KFTPH"
title: "Re-qualify the AgentPlane 0.7.0-beta.2 milestone from corrected main"
status: "DOING"
priority: "high"
owner: "TESTER"
revision: 4
origin:
  system: "manual"
depends_on:
  - "202607221852-01ACZ9"
  - "202607221852-1KWS8Y"
  - "202607221852-9T0RT3"
  - "202607221852-ABP0EX"
  - "202607221852-ADC3A5"
  - "202607221852-J910P6"
  - "202607221852-WF8A0X"
  - "202607221852-YP9QCH"
  - "202607300553-CR9VTJ"
  - "202607302331-3C8V0X"
tags:
  - "milestone-0-7-0-beta-2"
  - "quality"
  - "release-gate"
  - "requalification"
  - "v0.7"
task_kind: "code"
mutation_scope: "none"
blueprint_request: "quality.regression"
verify:
  - "bun run ci:contract"
  - "bun run test:critical"
  - "bun run typecheck"
plan_approval:
  state: "approved"
  updated_at: "2026-07-31T00:28:53.832Z"
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
    author: "TESTER"
    body: "Start: re-qualify beta.2 only on corrected main; no implementation change or package publication is permitted."
events:
  -
    type: "status"
    at: "2026-07-31T00:29:18.514Z"
    author: "TESTER"
    from: "TODO"
    to: "DOING"
    note: "Start: re-qualify beta.2 only on corrected main; no implementation change or package publication is permitted."
doc_version: 3
doc_updated_at: "2026-07-31T00:29:18.514Z"
doc_updated_by: "TESTER"
description: "Re-run the beta.2 qualification gate from corrected main after the guard and clone-baseline repair was isolated and merged in task 202607302331-3C8V0X. Validate dependency closure, exact RF-04 measurement, safety and outcome metrics, and issue an evidence-backed publish-or-do-not-publish decision. This task must not modify product code or publish a package."
sections:
  Summary: |-
    Re-qualify the AgentPlane 0.7.0-beta.2 milestone from corrected main

    Re-run the beta.2 qualification gate from corrected main after the guard and clone-baseline repair was isolated and merged in task 202607302331-3C8V0X. Validate dependency closure, exact RF-04 measurement, safety and outcome metrics, and issue an evidence-backed publish-or-do-not-publish decision. This task must not modify product code or publish a package.
  Scope: |-
    - In scope: Re-run the beta.2 qualification gate from corrected main after the guard and clone-baseline repair was isolated and merged in task 202607302331-3C8V0X. Validate dependency closure, exact RF-04 measurement, safety and outcome metrics, and issue an evidence-backed publish-or-do-not-publish decision. This task must not modify product code or publish a package.
    - Out of scope: unrelated refactors not required for "Re-qualify the AgentPlane 0.7.0-beta.2 milestone from corrected main".
  Plan: "1. Pin corrected main and verify the dependency closure, including 202607302331-3C8V0X, has merged verification, evaluator, and hosted-close evidence. 2. Rebuild the exact RF-04 qualification measurement (50 runs and 55 provider episodes) on that SHA; preserve command-level evidence. 3. Run test:critical, typecheck, and ci:contract, and compare outcome, safety, token, and latency metrics against frozen beta.2 guardrails. 4. Produce a qualification packet and independent evaluator review. 5. Record publish or do-not-publish explicitly; do not modify product code or publish a package."
  Verify Steps: |-
    PLANNER fallback scaffold for "Re-qualify the AgentPlane 0.7.0-beta.2 milestone from corrected main". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Re-qualify the AgentPlane 0.7.0-beta.2 milestone from corrected main". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
extensions:
  workflow_route_baseline:
    start_head_sha: "25fbf2d836a94e9b190464da219a35efd4ebe878"
    version: 1
id_source: "generated"
---
## Summary

Re-qualify the AgentPlane 0.7.0-beta.2 milestone from corrected main

Re-run the beta.2 qualification gate from corrected main after the guard and clone-baseline repair was isolated and merged in task 202607302331-3C8V0X. Validate dependency closure, exact RF-04 measurement, safety and outcome metrics, and issue an evidence-backed publish-or-do-not-publish decision. This task must not modify product code or publish a package.

## Scope

- In scope: Re-run the beta.2 qualification gate from corrected main after the guard and clone-baseline repair was isolated and merged in task 202607302331-3C8V0X. Validate dependency closure, exact RF-04 measurement, safety and outcome metrics, and issue an evidence-backed publish-or-do-not-publish decision. This task must not modify product code or publish a package.
- Out of scope: unrelated refactors not required for "Re-qualify the AgentPlane 0.7.0-beta.2 milestone from corrected main".

## Plan

1. Pin corrected main and verify the dependency closure, including 202607302331-3C8V0X, has merged verification, evaluator, and hosted-close evidence. 2. Rebuild the exact RF-04 qualification measurement (50 runs and 55 provider episodes) on that SHA; preserve command-level evidence. 3. Run test:critical, typecheck, and ci:contract, and compare outcome, safety, token, and latency metrics against frozen beta.2 guardrails. 4. Produce a qualification packet and independent evaluator review. 5. Record publish or do-not-publish explicitly; do not modify product code or publish a package.

## Verify Steps

PLANNER fallback scaffold for "Re-qualify the AgentPlane 0.7.0-beta.2 milestone from corrected main". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Re-qualify the AgentPlane 0.7.0-beta.2 milestone from corrected main". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
