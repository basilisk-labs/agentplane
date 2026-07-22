---
id: "202607221908-AB2SFC"
title: "Qualify the AgentPlane 0.7.0-rc.1 milestone"
status: "TODO"
priority: "high"
owner: "TESTER"
revision: 5
origin:
  system: "manual"
depends_on:
  - "202607221852-71SCSW"
  - "202607221852-ECBY56"
  - "202607221908-0JP0ZZ"
tags:
  - "milestone-0-7-0-rc-1"
  - "quality"
  - "release-gate"
  - "v0.7"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "quality.regression"
verify:
  - "bun run coverage:workflow-suite"
  - "bun run lifecycle:invariants"
  - "bun run release:prepublish:fast"
  - "bun run test:critical"
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
doc_updated_at: "2026-07-22T19:08:09.872Z"
doc_updated_by: "PLANNER"
description: "Run the executable fan-in gate for 0.7.0-rc.1, prove every included leaf is DONE and stable, compare required safety/quality metrics, and record whether publishing this optional prerelease is justified."
sections:
  Summary: |-
    Qualify the AgentPlane 0.7.0-rc.1 milestone

    Run the executable fan-in gate for 0.7.0-rc.1, prove every included leaf is DONE and stable, compare required safety/quality metrics, and record whether publishing this optional prerelease is justified.
  Scope: |-
    - In scope: enforce complete dependency fan-in for the 0.7.0-rc.1 slice, rerun its contract/lifecycle/schema/type/test/benchmark gates, compare frozen success/rework/safety controls, record residual risks, and issue an evidence-backed publish-or-do-not-publish decision.
    - Out of scope: adding architecture or implementation behavior; any defect becomes a bounded rework/follow-up task.
  Plan: |-
    1. Confirm every declared 0.7.0-rc.1 dependency is DONE at the reviewed main SHA.
    2. Run the milestone-specific deterministic and semantic quality gates.
    3. Compare safety, compatibility, success/rework, and orchestration metrics to the frozen baseline.
    4. Record blockers and require rework before qualification.
    5. Decide whether an optional 0.7.0-rc.1 prerelease materially helps external integration testing; qualification may complete without publication.
  Verify Steps: |-
    1. Resolve the dependency closure from this gate. Expected: every required leaf for 0.7.0-rc.1 is an ancestor and has merged verification/evaluator/hosted-close evidence.
    2. Run `bun run test:critical`, `bun run coverage:workflow-suite`, `bun run lifecycle:invariants`, `bun run release:prepublish:fast`. Expected: all milestone checks pass on one reviewed SHA.
    3. Compare golden metrics and residual risks. Expected: no verified-success or safety regression is hidden by token/latency improvements.
    4. Record a publish decision. Expected: publication is optional, explicit, and never substitutes for unfinished dependencies.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Do not mutate product state during qualification beyond evidence artifacts.
    - If a prerelease was not published, revert only the gate evidence through its task branch.
    - If a prerelease was published, preserve it and route fixes through a new prerelease version; never overwrite the tag/package.
  Findings: ""
id_source: "generated"
---
## Summary

Qualify the AgentPlane 0.7.0-rc.1 milestone

Run the executable fan-in gate for 0.7.0-rc.1, prove every included leaf is DONE and stable, compare required safety/quality metrics, and record whether publishing this optional prerelease is justified.

## Scope

- In scope: enforce complete dependency fan-in for the 0.7.0-rc.1 slice, rerun its contract/lifecycle/schema/type/test/benchmark gates, compare frozen success/rework/safety controls, record residual risks, and issue an evidence-backed publish-or-do-not-publish decision.
- Out of scope: adding architecture or implementation behavior; any defect becomes a bounded rework/follow-up task.

## Plan

1. Confirm every declared 0.7.0-rc.1 dependency is DONE at the reviewed main SHA.
2. Run the milestone-specific deterministic and semantic quality gates.
3. Compare safety, compatibility, success/rework, and orchestration metrics to the frozen baseline.
4. Record blockers and require rework before qualification.
5. Decide whether an optional 0.7.0-rc.1 prerelease materially helps external integration testing; qualification may complete without publication.

## Verify Steps

1. Resolve the dependency closure from this gate. Expected: every required leaf for 0.7.0-rc.1 is an ancestor and has merged verification/evaluator/hosted-close evidence.
2. Run `bun run test:critical`, `bun run coverage:workflow-suite`, `bun run lifecycle:invariants`, `bun run release:prepublish:fast`. Expected: all milestone checks pass on one reviewed SHA.
3. Compare golden metrics and residual risks. Expected: no verified-success or safety regression is hidden by token/latency improvements.
4. Record a publish decision. Expected: publication is optional, explicit, and never substitutes for unfinished dependencies.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Do not mutate product state during qualification beyond evidence artifacts.
- If a prerelease was not published, revert only the gate evidence through its task branch.
- If a prerelease was published, preserve it and route fixes through a new prerelease version; never overwrite the tag/package.

## Findings
