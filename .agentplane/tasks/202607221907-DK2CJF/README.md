---
id: "202607221907-DK2CJF"
title: "Qualify the AgentPlane 0.7.0-alpha.1 milestone"
status: "DOING"
priority: "high"
owner: "TESTER"
revision: 8
origin:
  system: "manual"
depends_on:
  - "202607221846-4CE7EG"
  - "202607221846-4VB97J"
  - "202607221846-9XC1H0"
  - "202607221846-C2XADX"
  - "202607221846-SXJ75T"
  - "202607221846-Y89CFB"
  - "202607221846-YGWMA2"
  - "202607221846-ZAENM6"
  - "202607222129-1ZQHJD"
  - "202607230554-YFYT83"
tags:
  - "milestone-0-7-0-alpha-1"
  - "quality"
  - "release-gate"
  - "v0.7"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "quality.regression"
verify:
  - "bun run ci:contract"
  - "bun run guards:check"
  - "bun run schemas:check"
  - "bun run test:critical"
  - "bun run bench:agent-efficiency:replay:check"
plan_approval:
  state: "approved"
  updated_at: "2026-07-24T06:54:11.036Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-07-24T07:03:36.976Z"
  updated_by: "TESTER"
  note: "Alpha.1 qualification passed on reviewed SHA 35e4925a7: all ten dependency PRs are merged with evaluator and hosted-close evidence; critical, schemas, guards, contract, and immutable RF-04 replay gates passed. Decision: qualify without publishing the optional prerelease."
  attempts: 0
commit: null
comments:
  -
    author: "TESTER"
    body: "Start: Qualify the alpha.1 dependency fan-in and rerun every declared deterministic milestone gate on one reviewed SHA."
events:
  -
    type: "status"
    at: "2026-07-24T06:55:06.272Z"
    author: "TESTER"
    from: "TODO"
    to: "DOING"
    note: "Start: Qualify the alpha.1 dependency fan-in and rerun every declared deterministic milestone gate on one reviewed SHA."
  -
    type: "verify"
    at: "2026-07-24T07:03:36.976Z"
    author: "TESTER"
    state: "ok"
    note: "Alpha.1 qualification passed on reviewed SHA 35e4925a7: all ten dependency PRs are merged with evaluator and hosted-close evidence; critical, schemas, guards, contract, and immutable RF-04 replay gates passed. Decision: qualify without publishing the optional prerelease."
doc_version: 3
doc_updated_at: "2026-07-24T07:03:37.427Z"
doc_updated_by: "TESTER"
description: "Run the executable fan-in gate for 0.7.0-alpha.1, prove every included leaf is DONE and stable, compare required safety/quality metrics, and record whether publishing this optional prerelease is justified."
sections:
  Summary: |-
    Qualify the AgentPlane 0.7.0-alpha.1 milestone

    Run the executable fan-in gate for 0.7.0-alpha.1, prove every included leaf is DONE and stable, compare required safety/quality metrics, and record whether publishing this optional prerelease is justified.
  Scope: |-
    - In scope: enforce complete dependency fan-in for the 0.7.0-alpha.1 slice, rerun its contract/lifecycle/schema/type/test/benchmark gates, compare frozen success/rework/safety controls, record residual risks, and issue an evidence-backed publish-or-do-not-publish decision.
    - Optional backport: only isolated compatibility-safe correctness fixes may be proposed for 0.6.25+; the gate itself does not require a stable patch release.
    - Out of scope: adding architecture or implementation behavior; any defect becomes a bounded rework/follow-up task.
  Plan: |-
    1. Confirm every declared 0.7.0-alpha.1 dependency is DONE at the reviewed main SHA.
    2. Run the milestone-specific deterministic and semantic quality gates.
    3. Compare safety, compatibility, success/rework, and orchestration metrics to the frozen baseline.
    4. Record blockers and require rework before qualification.
    5. Decide whether an optional 0.7.0-alpha.1 prerelease materially helps external integration testing; qualification may complete without publication.
  Verify Steps: |-
    1. Resolve the dependency closure from this gate. Expected: every required leaf for 0.7.0-alpha.1 is an ancestor and has merged verification/evaluator/hosted-close evidence.
    2. Run `bun run test:critical`, `bun run schemas:check`, `bun run guards:check`, `bun run ci:contract`. Expected: all milestone checks pass on one reviewed SHA.
    3. Compare golden metrics and residual risks. Expected: no verified-success or safety regression is hidden by token/latency improvements.
    4. Record a publish decision. Expected: publication is optional, explicit, and never substitutes for unfinished dependencies.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-07-24T07:03:36.976Z — VERIFY — ok

    By: TESTER

    Note: Alpha.1 qualification passed on reviewed SHA 35e4925a7: all ten dependency PRs are merged with evaluator and hosted-close evidence; critical, schemas, guards, contract, and immutable RF-04 replay gates passed. Decision: qualify without publishing the optional prerelease.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-24T06:55:06.272Z, excerpt_hash=sha256:2611ab0a56a2f3812f5587671c945f2c0356fc0cc119b3ffa185f0e8789f2f3f

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607221907-DK2CJF-qualify-the-agentplane-0-7-0-alpha-1-milestone/.agentplane/tasks/202607221907-DK2CJF/blueprint/resolved-snapshot.json
    - old_digest: 0fe4326b44ea9f820fe00a84df1e3a808b5380c0f167f1d0eb7c4331b2021d7c
    - current_digest: 0fe4326b44ea9f820fe00a84df1e3a808b5380c0f167f1d0eb7c4331b2021d7c
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607221907-DK2CJF

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane pr open 202607221907-DK2CJF --author TESTER
    - diagnostic_command: agentplane pr flow status 202607221907-DK2CJF
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: true
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: git_hook_side_effect

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Do not mutate product state during qualification beyond evidence artifacts.
    - If a prerelease was not published, revert only the gate evidence through its task branch.
    - If a prerelease was published, preserve it and route fixes through a new prerelease version; never overwrite the tag/package.
  Findings: |-
    - Observation: The frozen pre-0.7 replay retains 50 known mismatches across 350 outcome cells and timing is not yet comparable.
      Impact: Alpha.1 establishes trust and compatibility foundations but does not claim end-to-end efficiency improvement.
      Resolution: Keep the baseline and ratchets unchanged, defer publication, and proceed to the alpha.2 typed-contract wave.
id_source: "generated"
---
## Summary

Qualify the AgentPlane 0.7.0-alpha.1 milestone

Run the executable fan-in gate for 0.7.0-alpha.1, prove every included leaf is DONE and stable, compare required safety/quality metrics, and record whether publishing this optional prerelease is justified.

## Scope

- In scope: enforce complete dependency fan-in for the 0.7.0-alpha.1 slice, rerun its contract/lifecycle/schema/type/test/benchmark gates, compare frozen success/rework/safety controls, record residual risks, and issue an evidence-backed publish-or-do-not-publish decision.
- Optional backport: only isolated compatibility-safe correctness fixes may be proposed for 0.6.25+; the gate itself does not require a stable patch release.
- Out of scope: adding architecture or implementation behavior; any defect becomes a bounded rework/follow-up task.

## Plan

1. Confirm every declared 0.7.0-alpha.1 dependency is DONE at the reviewed main SHA.
2. Run the milestone-specific deterministic and semantic quality gates.
3. Compare safety, compatibility, success/rework, and orchestration metrics to the frozen baseline.
4. Record blockers and require rework before qualification.
5. Decide whether an optional 0.7.0-alpha.1 prerelease materially helps external integration testing; qualification may complete without publication.

## Verify Steps

1. Resolve the dependency closure from this gate. Expected: every required leaf for 0.7.0-alpha.1 is an ancestor and has merged verification/evaluator/hosted-close evidence.
2. Run `bun run test:critical`, `bun run schemas:check`, `bun run guards:check`, `bun run ci:contract`. Expected: all milestone checks pass on one reviewed SHA.
3. Compare golden metrics and residual risks. Expected: no verified-success or safety regression is hidden by token/latency improvements.
4. Record a publish decision. Expected: publication is optional, explicit, and never substitutes for unfinished dependencies.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-07-24T07:03:36.976Z — VERIFY — ok

By: TESTER

Note: Alpha.1 qualification passed on reviewed SHA 35e4925a7: all ten dependency PRs are merged with evaluator and hosted-close evidence; critical, schemas, guards, contract, and immutable RF-04 replay gates passed. Decision: qualify without publishing the optional prerelease.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-24T06:55:06.272Z, excerpt_hash=sha256:2611ab0a56a2f3812f5587671c945f2c0356fc0cc119b3ffa185f0e8789f2f3f

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607221907-DK2CJF-qualify-the-agentplane-0-7-0-alpha-1-milestone/.agentplane/tasks/202607221907-DK2CJF/blueprint/resolved-snapshot.json
- old_digest: 0fe4326b44ea9f820fe00a84df1e3a808b5380c0f167f1d0eb7c4331b2021d7c
- current_digest: 0fe4326b44ea9f820fe00a84df1e3a808b5380c0f167f1d0eb7c4331b2021d7c
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607221907-DK2CJF

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane pr open 202607221907-DK2CJF --author TESTER
- diagnostic_command: agentplane pr flow status 202607221907-DK2CJF
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: true
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: git_hook_side_effect

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Do not mutate product state during qualification beyond evidence artifacts.
- If a prerelease was not published, revert only the gate evidence through its task branch.
- If a prerelease was published, preserve it and route fixes through a new prerelease version; never overwrite the tag/package.

## Findings

- Observation: The frozen pre-0.7 replay retains 50 known mismatches across 350 outcome cells and timing is not yet comparable.
  Impact: Alpha.1 establishes trust and compatibility foundations but does not claim end-to-end efficiency improvement.
  Resolution: Keep the baseline and ratchets unchanged, defer publication, and proceed to the alpha.2 typed-contract wave.
