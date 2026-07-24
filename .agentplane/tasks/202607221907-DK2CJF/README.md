---
id: "202607221907-DK2CJF"
title: "Qualify the AgentPlane 0.7.0-alpha.1 milestone"
status: "DOING"
priority: "high"
owner: "TESTER"
revision: 10
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
  updated_at: "2026-07-24T07:14:47.934Z"
  updated_by: "TESTER"
  note: "Independent-review rework resolved on SHA 1bf9c6dc8: stale 4VB97J and 9XC1H0 worktrees plus local and remote branches are absent, metric and ratchet ownership statements are corrected, and all five milestone gates passed again."
  attempts: 0
quality_review:
  state: "rework"
  provenance: "evaluator_supplied"
  updated_at: "2026-07-24T07:10:47.250Z"
  updated_by: "EVALUATOR"
  note: "Alpha.1 evidence is mechanically sound, but qualification cannot pass until two merged dependency worktrees are cleaned and two metric statements are corrected."
  evaluated_sha: "3cdd91f240cfff4936c4094e45b9cd044e3680d8"
  blueprint_digest: "0fe4326b44ea9f820fe00a84df1e3a808b5380c0f167f1d0eb7c4331b2021d7c"
  evidence_refs:
    - ".agentplane/tasks/202607221907-DK2CJF/README.md"
    - ".agentplane/tasks/202607221907-DK2CJF/quality/20260724-071047250-recovery-context/quality-report.json"
    - ".agentplane/tasks/202607221907-DK2CJF/quality/20260724-071047250-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202607221907-DK2CJF/quality/20260724-071047250-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202607221907-DK2CJF/blueprint/resolved-snapshot.json"
    - ".agentplane/tasks/202607221907-DK2CJF/qualification.md"
    - "docs/internal/v0.7-refactor-plan.md"
    - "git worktree list --porcelain and task-scoped cleanup proof"
  findings:
    - "P1: the wave gate requires clean worktree cleanup, while 4VB97J and 9XC1H0 remained registered at the reviewed SHA."
    - "P2: the structural baseline has ten observed scalar cells, not ten measured cost metrics; seventeen metric kinds exist and six are observed."
    - "P2: the nineteen ratchet violations belong to RF-21, RF-06b/RF-09/RF-25, and RF-05a/RF-05b, not RF-24/RF-27."
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
  -
    type: "verify"
    at: "2026-07-24T07:14:47.934Z"
    author: "TESTER"
    state: "ok"
    note: "Independent-review rework resolved on SHA 1bf9c6dc8: stale 4VB97J and 9XC1H0 worktrees plus local and remote branches are absent, metric and ratchet ownership statements are corrected, and all five milestone gates passed again."
doc_version: 3
doc_updated_at: "2026-07-24T07:14:48.386Z"
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

    ### 2026-07-24T07:14:47.934Z — VERIFY — ok

    By: TESTER

    Note: Independent-review rework resolved on SHA 1bf9c6dc8: stale 4VB97J and 9XC1H0 worktrees plus local and remote branches are absent, metric and ratchet ownership statements are corrected, and all five milestone gates passed again.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-24T07:03:37.427Z, excerpt_hash=sha256:2611ab0a56a2f3812f5587671c945f2c0356fc0cc119b3ffa185f0e8789f2f3f

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607221907-DK2CJF-qualify-the-agentplane-0-7-0-alpha-1-milestone/.agentplane/tasks/202607221907-DK2CJF/blueprint/resolved-snapshot.json
    - old_digest: 0fe4326b44ea9f820fe00a84df1e3a808b5380c0f167f1d0eb7c4331b2021d7c
    - current_digest: 0fe4326b44ea9f820fe00a84df1e3a808b5380c0f167f1d0eb7c4331b2021d7c
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607221907-DK2CJF

    DecisionContextRef:
    - operator_action: stop
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
    - Observation: The frozen pre-0.7 replay retains 50 known mismatches across 350 outcome cells and timing is not yet comparable.
      Impact: Alpha.1 establishes trust and compatibility foundations but does not claim end-to-end efficiency improvement.
      Resolution: Keep the baseline and ratchets unchanged, defer publication, and proceed to the alpha.2 typed-contract wave.

    - Observation: The first review correctly rejected qualification while two dependency worktrees remained registered.
      Impact: Cleanup closure is now explicit and alpha.1 no longer advances on merge evidence alone.
      Resolution: Used task-scoped cleanup, added local and remote absence proof, corrected evidence, and reran critical, schema, guard, contract, and offline replay checks.
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

### 2026-07-24T07:14:47.934Z — VERIFY — ok

By: TESTER

Note: Independent-review rework resolved on SHA 1bf9c6dc8: stale 4VB97J and 9XC1H0 worktrees plus local and remote branches are absent, metric and ratchet ownership statements are corrected, and all five milestone gates passed again.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-24T07:03:37.427Z, excerpt_hash=sha256:2611ab0a56a2f3812f5587671c945f2c0356fc0cc119b3ffa185f0e8789f2f3f

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607221907-DK2CJF-qualify-the-agentplane-0-7-0-alpha-1-milestone/.agentplane/tasks/202607221907-DK2CJF/blueprint/resolved-snapshot.json
- old_digest: 0fe4326b44ea9f820fe00a84df1e3a808b5380c0f167f1d0eb7c4331b2021d7c
- current_digest: 0fe4326b44ea9f820fe00a84df1e3a808b5380c0f167f1d0eb7c4331b2021d7c
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607221907-DK2CJF

DecisionContextRef:
- operator_action: stop
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

- Observation: The frozen pre-0.7 replay retains 50 known mismatches across 350 outcome cells and timing is not yet comparable.
  Impact: Alpha.1 establishes trust and compatibility foundations but does not claim end-to-end efficiency improvement.
  Resolution: Keep the baseline and ratchets unchanged, defer publication, and proceed to the alpha.2 typed-contract wave.

- Observation: The first review correctly rejected qualification while two dependency worktrees remained registered.
  Impact: Cleanup closure is now explicit and alpha.1 no longer advances on merge evidence alone.
  Resolution: Used task-scoped cleanup, added local and remote absence proof, corrected evidence, and reran critical, schema, guard, contract, and offline replay checks.
