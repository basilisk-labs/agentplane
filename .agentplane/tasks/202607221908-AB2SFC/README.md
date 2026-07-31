---
id: "202607221908-AB2SFC"
title: "Qualify the AgentPlane 0.7.0-rc.1 milestone"
status: "DOING"
priority: "high"
owner: "TESTER"
revision: 10
origin:
  system: "manual"
depends_on:
  - "202607221852-71SCSW"
  - "202607221852-ECBY56"
  - "202607310028-7KFTPH"
  - "202607311338-CT2725"
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
  state: "approved"
  updated_at: "2026-07-31T13:34:55.128Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "needs_rework"
  updated_at: "2026-07-31T13:37:05.041Z"
  updated_by: "TESTER"
  note: "RC.1 qualification is blocked by active incident INC-20260731-01 after critical, workflow coverage, and lifecycle gates passed; release prepublish correctly rejected the unresolved runner receipt-observation race."
  attempts: 1
commit: null
comments:
  -
    author: "TESTER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
events:
  -
    type: "status"
    at: "2026-07-31T13:35:14.089Z"
    author: "TESTER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "verify"
    at: "2026-07-31T13:37:05.041Z"
    author: "TESTER"
    state: "needs_rework"
    note: "RC.1 qualification is blocked by active incident INC-20260731-01 after critical, workflow coverage, and lifecycle gates passed; release prepublish correctly rejected the unresolved runner receipt-observation race."
doc_version: 3
doc_updated_at: "2026-07-31T13:37:05.727Z"
doc_updated_by: "TESTER"
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
    ### 2026-07-31T13:37:05.041Z — VERIFY — needs_rework

    By: TESTER

    Note: RC.1 qualification is blocked by active incident INC-20260731-01 after critical, workflow coverage, and lifecycle gates passed; release prepublish correctly rejected the unresolved runner receipt-observation race.
    Attempts: 1

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-31T13:35:14.089Z, excerpt_hash=sha256:33d29f96d9cc9641447f15803b5287f16a629fe035597ae85782852d011b3be0

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202607221908-AB2SFC-qualify-the-agentplane-0-7-0-rc-1-milestone/.agentplane/tasks/202607221908-AB2SFC/blueprint/resolved-snapshot.json
    - old_digest: 90a9309e5f0f29d169090d141459e1419957fe758a4a212cedc0ef1076bfc979
    - current_digest: 90a9309e5f0f29d169090d141459e1419957fe758a4a212cedc0ef1076bfc979
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607221908-AB2SFC

    DecisionContextRef:
    - operator_action: provider_action
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: none
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: none

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Do not mutate product state during qualification beyond evidence artifacts.
    - If a prerelease was not published, revert only the gate evidence through its task branch.
    - If a prerelease was published, preserve it and route fixes through a new prerelease version; never overwrite the tag/package.
  Findings: |-
    - Observation: bun run release:prepublish:fast stopped at release:incidents:check because INC-20260731-01 remains active.
      Impact: AgentPlane 0.7.0-rc.1 cannot be qualified or published while a successful runner receipt can remain unobserved by the outer supervisor.
      Resolution: Create a bounded CODER follow-up, repair and verify receipt observation, resolve the incident with evidence, then rerun this qualification from updated main.
extensions:
  workflow_route_baseline:
    start_head_sha: "d9fa4e76ef2e7860c17a6069e41ac30806e6157e"
    version: 1
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
### 2026-07-31T13:37:05.041Z — VERIFY — needs_rework

By: TESTER

Note: RC.1 qualification is blocked by active incident INC-20260731-01 after critical, workflow coverage, and lifecycle gates passed; release prepublish correctly rejected the unresolved runner receipt-observation race.
Attempts: 1

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-31T13:35:14.089Z, excerpt_hash=sha256:33d29f96d9cc9641447f15803b5287f16a629fe035597ae85782852d011b3be0

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202607221908-AB2SFC-qualify-the-agentplane-0-7-0-rc-1-milestone/.agentplane/tasks/202607221908-AB2SFC/blueprint/resolved-snapshot.json
- old_digest: 90a9309e5f0f29d169090d141459e1419957fe758a4a212cedc0ef1076bfc979
- current_digest: 90a9309e5f0f29d169090d141459e1419957fe758a4a212cedc0ef1076bfc979
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607221908-AB2SFC

DecisionContextRef:
- operator_action: provider_action
- can_execute_now: false
- safe_command: none
- diagnostic_command: none
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: none

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Do not mutate product state during qualification beyond evidence artifacts.
- If a prerelease was not published, revert only the gate evidence through its task branch.
- If a prerelease was published, preserve it and route fixes through a new prerelease version; never overwrite the tag/package.

## Findings

- Observation: bun run release:prepublish:fast stopped at release:incidents:check because INC-20260731-01 remains active.
  Impact: AgentPlane 0.7.0-rc.1 cannot be qualified or published while a successful runner receipt can remain unobserved by the outer supervisor.
  Resolution: Create a bounded CODER follow-up, repair and verify receipt observation, resolve the incident with evidence, then rerun this qualification from updated main.
