---
id: "202607221908-9M2FBQ"
title: "Qualify the AgentPlane 0.7.0-alpha.2 milestone"
status: "TODO"
priority: "high"
owner: "TESTER"
revision: 5
origin:
  system: "manual"
depends_on:
  - "202607221848-0ZAB1F"
  - "202607221848-1HWR0R"
  - "202607221848-ABG7SD"
  - "202607221848-ER5H6N"
  - "202607221848-T9B3PS"
  - "202607221848-VBV9B1"
  - "202607221848-VC4VVS"
  - "202607221849-8YYZ9X"
  - "202607221849-NWVCAG"
  - "202607221849-TBTX8X"
  - "202607221907-DK2CJF"
tags:
  - "milestone-0-7-0-alpha-2"
  - "quality"
  - "release-gate"
  - "v0.7"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "quality.regression"
verify:
  - "bun run ci:contract"
  - "bun run lifecycle:invariants"
  - "bun run schemas:check"
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
doc_updated_at: "2026-07-22T19:08:01.675Z"
doc_updated_by: "PLANNER"
description: "Run the executable fan-in gate for 0.7.0-alpha.2, prove every included leaf is DONE and stable, compare required safety/quality metrics, and record whether publishing this optional prerelease is justified."
sections:
  Summary: |-
    Qualify the AgentPlane 0.7.0-alpha.2 milestone

    Run the executable fan-in gate for 0.7.0-alpha.2, prove every included leaf is DONE and stable, compare required safety/quality metrics, and record whether publishing this optional prerelease is justified.
  Scope: |-
    - In scope: enforce complete dependency fan-in for the 0.7.0-alpha.2 slice, rerun its contract/lifecycle/schema/type/test/benchmark gates, compare frozen success/rework/safety controls, record residual risks, and issue an evidence-backed publish-or-do-not-publish decision.
    - Out of scope: adding architecture or implementation behavior; any defect becomes a bounded rework/follow-up task.
  Plan: |-
    1. Confirm every declared 0.7.0-alpha.2 dependency is DONE at the reviewed main SHA.
    2. Run the milestone-specific deterministic and semantic quality gates.
    3. Compare safety, compatibility, success/rework, and orchestration metrics to the frozen baseline.
    4. Record blockers and require rework before qualification.
    5. Decide whether an optional 0.7.0-alpha.2 prerelease materially helps external integration testing; qualification may complete without publication.
  Verify Steps: |-
    1. Resolve the dependency closure from this gate. Expected: every required leaf for 0.7.0-alpha.2 is an ancestor and has merged verification/evaluator/hosted-close evidence.
    2. Run `bun run test:critical`, `bun run schemas:check`, `bun run lifecycle:invariants`, `bun run ci:contract`. Expected: all milestone checks pass on one reviewed SHA.
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

Qualify the AgentPlane 0.7.0-alpha.2 milestone

Run the executable fan-in gate for 0.7.0-alpha.2, prove every included leaf is DONE and stable, compare required safety/quality metrics, and record whether publishing this optional prerelease is justified.

## Scope

- In scope: enforce complete dependency fan-in for the 0.7.0-alpha.2 slice, rerun its contract/lifecycle/schema/type/test/benchmark gates, compare frozen success/rework/safety controls, record residual risks, and issue an evidence-backed publish-or-do-not-publish decision.
- Out of scope: adding architecture or implementation behavior; any defect becomes a bounded rework/follow-up task.

## Plan

1. Confirm every declared 0.7.0-alpha.2 dependency is DONE at the reviewed main SHA.
2. Run the milestone-specific deterministic and semantic quality gates.
3. Compare safety, compatibility, success/rework, and orchestration metrics to the frozen baseline.
4. Record blockers and require rework before qualification.
5. Decide whether an optional 0.7.0-alpha.2 prerelease materially helps external integration testing; qualification may complete without publication.

## Verify Steps

1. Resolve the dependency closure from this gate. Expected: every required leaf for 0.7.0-alpha.2 is an ancestor and has merged verification/evaluator/hosted-close evidence.
2. Run `bun run test:critical`, `bun run schemas:check`, `bun run lifecycle:invariants`, `bun run ci:contract`. Expected: all milestone checks pass on one reviewed SHA.
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
