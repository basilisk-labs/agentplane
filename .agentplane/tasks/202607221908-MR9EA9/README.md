---
id: "202607221908-MR9EA9"
title: "Qualify the AgentPlane 0.7.0-beta.1 milestone"
status: "DOING"
priority: "high"
owner: "TESTER"
revision: 10
origin:
  system: "manual"
depends_on:
  - "202607221850-0SFMS7"
  - "202607221850-8HBF4J"
  - "202607221850-9C9WBP"
  - "202607221850-DRWR0V"
  - "202607221850-R7WS01"
  - "202607221850-WM9X1G"
  - "202607221908-9M2FBQ"
  - "202607242236-1BFWEY"
tags:
  - "milestone-0-7-0-beta-1"
  - "quality"
  - "release-gate"
  - "v0.7"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "quality.regression"
verify:
  - "bun run ci:contract"
  - "bun run coverage:workflow-suite"
  - "bun run lifecycle:invariants"
  - "bun run test:critical"
  - "bun run schemas:check"
  - "bun run package:install-smoke"
plan_approval:
  state: "approved"
  updated_at: "2026-07-29T10:18:59.045Z"
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
    body: "Start: continue branch_pr task in the dedicated task worktree."
events:
  -
    type: "status"
    at: "2026-07-29T10:19:27.879Z"
    author: "TESTER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
doc_version: 3
doc_updated_at: "2026-07-29T10:19:27.879Z"
doc_updated_by: "TESTER"
description: "Run the executable fan-in gate for 0.7.0-beta.1, prove every included leaf is DONE and stable, compare required safety/quality metrics, and record whether publishing this optional prerelease is justified."
sections:
  Summary: |-
    Qualify the AgentPlane 0.7.0-beta.1 milestone

    Run the executable fan-in gate for 0.7.0-beta.1, prove every included leaf is DONE and stable, compare required safety/quality metrics, and record whether publishing this optional prerelease is justified.
  Scope: |-
    - In scope: enforce complete dependency fan-in for the 0.7.0-beta.1 slice, rerun its contract/lifecycle/schema/type/test/benchmark gates, compare frozen success/rework/safety controls, record residual risks, and issue an evidence-backed publish-or-do-not-publish decision.
    - Out of scope: adding architecture or implementation behavior; any defect becomes a bounded rework/follow-up task.
  Plan: |-
    1. Confirm every declared 0.7.0-beta.1 dependency is DONE at the reviewed main SHA.
    2. Run the milestone-specific deterministic and semantic quality gates.
    3. Compare safety, compatibility, success/rework, and orchestration metrics to the frozen baseline.
    4. Record blockers and require rework before qualification.
    5. Decide whether an optional 0.7.0-beta.1 prerelease materially helps external integration testing; qualification may complete without publication.
  Verify Steps: "1. Resolve the dependency closure from this gate. Expected: every required leaf for 0.7.0-beta.1, including 202607242236-1BFWEY, is an ancestor and has merged verification/evaluator/hosted-close evidence. 2. Run bun run test:critical, bun run coverage:workflow-suite, bun run lifecycle:invariants, bun run ci:contract, bun run schemas:check, and bun run package:install-smoke. Expected: all milestone checks and the installed-package journal/migration smoke pass on one reviewed SHA. 3. Run direct EXECUTOR and context/CURATOR rework fixtures through their configured episode/token/no-progress limits and restart checkpoints. Expected: both are bounded, resumable, and cannot replay completed agent or effect operations. 4. Compare golden metrics and residual risks. Expected: no verified-success or safety regression is hidden by token/latency improvements. 5. Record a publish decision. Expected: publication is optional, explicit, and never substitutes for unfinished dependencies."
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Do not mutate product state during qualification beyond evidence artifacts.
    - If a prerelease was not published, revert only the gate evidence through its task branch.
    - If a prerelease was published, preserve it and route fixes through a new prerelease version; never overwrite the tag/package.
  Findings: ""
extensions:
  workflow_route_baseline:
    start_head_sha: "b90a9e6df9ae35a1a518e1ffa73903d6e5784d35"
    version: 1
id_source: "generated"
---
## Summary

Qualify the AgentPlane 0.7.0-beta.1 milestone

Run the executable fan-in gate for 0.7.0-beta.1, prove every included leaf is DONE and stable, compare required safety/quality metrics, and record whether publishing this optional prerelease is justified.

## Scope

- In scope: enforce complete dependency fan-in for the 0.7.0-beta.1 slice, rerun its contract/lifecycle/schema/type/test/benchmark gates, compare frozen success/rework/safety controls, record residual risks, and issue an evidence-backed publish-or-do-not-publish decision.
- Out of scope: adding architecture or implementation behavior; any defect becomes a bounded rework/follow-up task.

## Plan

1. Confirm every declared 0.7.0-beta.1 dependency is DONE at the reviewed main SHA.
2. Run the milestone-specific deterministic and semantic quality gates.
3. Compare safety, compatibility, success/rework, and orchestration metrics to the frozen baseline.
4. Record blockers and require rework before qualification.
5. Decide whether an optional 0.7.0-beta.1 prerelease materially helps external integration testing; qualification may complete without publication.

## Verify Steps

1. Resolve the dependency closure from this gate. Expected: every required leaf for 0.7.0-beta.1, including 202607242236-1BFWEY, is an ancestor and has merged verification/evaluator/hosted-close evidence. 2. Run bun run test:critical, bun run coverage:workflow-suite, bun run lifecycle:invariants, bun run ci:contract, bun run schemas:check, and bun run package:install-smoke. Expected: all milestone checks and the installed-package journal/migration smoke pass on one reviewed SHA. 3. Run direct EXECUTOR and context/CURATOR rework fixtures through their configured episode/token/no-progress limits and restart checkpoints. Expected: both are bounded, resumable, and cannot replay completed agent or effect operations. 4. Compare golden metrics and residual risks. Expected: no verified-success or safety regression is hidden by token/latency improvements. 5. Record a publish decision. Expected: publication is optional, explicit, and never substitutes for unfinished dependencies.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Do not mutate product state during qualification beyond evidence artifacts.
- If a prerelease was not published, revert only the gate evidence through its task branch.
- If a prerelease was published, preserve it and route fixes through a new prerelease version; never overwrite the tag/package.

## Findings
