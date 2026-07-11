---
id: "202607092208-1J49NQ"
title: "Split routing and task-command hotspots for v0.6.22"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 8
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "patch-0.6.22"
  - "refactor"
  - "routing"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "code.branch_pr"
verify:
  - "bun run hotspots:check"
  - "bun run lifecycle:invariants"
  - "bun run typecheck"
  - "bunx vitest run packages/agentplane/src/commands/shared packages/agentplane/src/commands/task packages/agentplane/src/cli/run-cli.core.route-decision.test.ts"
plan_approval:
  state: "approved"
  updated_at: "2026-07-09T22:09:56.765Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-07-11T11:16:27.677Z"
  updated_by: "REVIEWER"
  note: "Verified route/task behavior, lifecycle invariants, hotspot reduction, CI contract, and full fast suite."
  attempts: 0
quality_review:
  state: "pass"
  updated_at: "2026-07-11T11:16:29.792Z"
  updated_by: "EVALUATOR"
  note: "Quality review passed."
  evaluated_sha: "ffe86ed87114321894e79bf7bf0f5a017d7b60a1"
  blueprint_digest: "75cb25c76cf2f5921e69c2e76317f1c7f8f9b7baded7e2a2eac8a578a7975441"
  evidence_refs:
    - ".agentplane/tasks/202607092208-1J49NQ/README.md"
    - ".agentplane/tasks/202607092208-1J49NQ/quality/20260711-111629792-recovery-context/quality-report.json"
    - ".agentplane/tasks/202607092208-1J49NQ/quality/20260711-111629792-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202607092208-1J49NQ/quality/20260711-111629792-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202607092208-1J49NQ/blueprint/resolved-snapshot.json"
  findings:
    - "No blocking findings; extracted boundaries preserve public APIs and deterministic route behavior."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: split routing and task-command hotspots along existing domain boundaries while preserving lifecycle and CLI contracts."
events:
  -
    type: "status"
    at: "2026-07-10T16:21:23.394Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: split routing and task-command hotspots along existing domain boundaries while preserving lifecycle and CLI contracts."
  -
    type: "verify"
    at: "2026-07-11T11:16:27.677Z"
    author: "REVIEWER"
    state: "ok"
    note: "Verified route/task behavior, lifecycle invariants, hotspot reduction, CI contract, and full fast suite."
doc_version: 3
doc_updated_at: "2026-07-11T11:16:27.922Z"
doc_updated_by: "CODER"
description: "Decompose route-oracle, hosted-close, task new, platform CLI, and close-message rendering modules into typed domain helpers while preserving route decisions, exit codes, and task lifecycle contracts."
sections:
  Summary: |-
    Split routing and task-command hotspots for v0.6.22

    Decompose route-oracle, hosted-close, task new, platform CLI, and close-message rendering modules into typed domain helpers while preserving route decisions, exit codes, and task lifecycle contracts.
  Scope: |-
    - In scope: Decompose route-oracle, hosted-close, task new, platform CLI, and close-message rendering modules into typed domain helpers while preserving route decisions, exit codes, and task lifecycle contracts.
    - Out of scope: unrelated refactors not required for "Split routing and task-command hotspots for v0.6.22".
  Plan: |-
    1. Partition route, hosted-close, task-new, platform, and close-message responsibilities along typed contract boundaries.
    2. Preserve blocker codes, exact repair commands, exit codes, and lifecycle invariants.
    3. Add focused regression tests at each extracted boundary.
    4. Run route/task suites, lifecycle invariants, hotspots, and typecheck.
  Verify Steps: |-
    1. Run `bunx vitest run packages/agentplane/src/commands/shared packages/agentplane/src/commands/task packages/agentplane/src/cli/run-cli.core.route-decision.test.ts`; route and task lifecycle tests pass.
    2. Run `bun run lifecycle:invariants`; it passes against the split implementation.
    3. Run `bun run hotspots:check`; touched modules are removed from or materially reduced in the >400-line warning set, with none above 600 lines.
    4. Run `bun run typecheck` and `bun run ci:contract`; both pass.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-07-11T11:16:27.677Z — VERIFY — ok

    By: REVIEWER

    Note: Verified route/task behavior, lifecycle invariants, hotspot reduction, CI contract, and full fast suite.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-11T11:16:05.227Z, excerpt_hash=sha256:c5bbc843045f29fa50bb5435509d7485bbdfb4070672948e396c4616b9c37ef0

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607092208-1J49NQ-split-routing-and-task-command-hotspots-for-v0-6/.agentplane/tasks/202607092208-1J49NQ/blueprint/resolved-snapshot.json
    - old_digest: 75cb25c76cf2f5921e69c2e76317f1c7f8f9b7baded7e2a2eac8a578a7975441
    - current_digest: 75cb25c76cf2f5921e69c2e76317f1c7f8f9b7baded7e2a2eac8a578a7975441
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607092208-1J49NQ

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane pr update 202607092208-1J49NQ
    - diagnostic_command: agentplane pr check 202607092208-1J49NQ
    - source_of_truth: route=task_next_action diagnostic=pr_check remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: false
    - repeat_stop_condition: if PR check passes but next-action still requests PR artifact update, verify live PR state before rerunning mutation
    - risks: pr_artifact_freshness_loop, git_hook_side_effect

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Split route execution packets from route phase selection while preserving exported route-oracle APIs, blocker codes, argv safety, and exact recovery commands.
    - Split hosted-close pre-merge validation, task-new duplicate detection, platform role-guide rendering, and close-message verification normalization into focused helpers.
    - All touched runtime modules are below 400 lines; runtime hotspot count decreased from 14 to 9 (18 before the v0.6.22 refactor tranche).
    - Verification passed: focused route/task/guard suite 62 files/440 tests, lifecycle invariants, hotspots:check, typecheck, ci:contract, and full test:fast 364 files/2157 tests.

    - Observation: Five routing and task-command hotspots were split behind their existing public facades.
      Impact: Runtime hotspot count decreased from 14 to 9 without route-code or lifecycle-contract changes.
      Resolution: Focused 62/440, lifecycle invariants, hotspots, typecheck, ci:contract, and full 364/2157 passed.
id_source: "generated"
---
## Summary

Split routing and task-command hotspots for v0.6.22

Decompose route-oracle, hosted-close, task new, platform CLI, and close-message rendering modules into typed domain helpers while preserving route decisions, exit codes, and task lifecycle contracts.

## Scope

- In scope: Decompose route-oracle, hosted-close, task new, platform CLI, and close-message rendering modules into typed domain helpers while preserving route decisions, exit codes, and task lifecycle contracts.
- Out of scope: unrelated refactors not required for "Split routing and task-command hotspots for v0.6.22".

## Plan

1. Partition route, hosted-close, task-new, platform, and close-message responsibilities along typed contract boundaries.
2. Preserve blocker codes, exact repair commands, exit codes, and lifecycle invariants.
3. Add focused regression tests at each extracted boundary.
4. Run route/task suites, lifecycle invariants, hotspots, and typecheck.

## Verify Steps

1. Run `bunx vitest run packages/agentplane/src/commands/shared packages/agentplane/src/commands/task packages/agentplane/src/cli/run-cli.core.route-decision.test.ts`; route and task lifecycle tests pass.
2. Run `bun run lifecycle:invariants`; it passes against the split implementation.
3. Run `bun run hotspots:check`; touched modules are removed from or materially reduced in the >400-line warning set, with none above 600 lines.
4. Run `bun run typecheck` and `bun run ci:contract`; both pass.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-07-11T11:16:27.677Z — VERIFY — ok

By: REVIEWER

Note: Verified route/task behavior, lifecycle invariants, hotspot reduction, CI contract, and full fast suite.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-11T11:16:05.227Z, excerpt_hash=sha256:c5bbc843045f29fa50bb5435509d7485bbdfb4070672948e396c4616b9c37ef0

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202607092208-1J49NQ-split-routing-and-task-command-hotspots-for-v0-6/.agentplane/tasks/202607092208-1J49NQ/blueprint/resolved-snapshot.json
- old_digest: 75cb25c76cf2f5921e69c2e76317f1c7f8f9b7baded7e2a2eac8a578a7975441
- current_digest: 75cb25c76cf2f5921e69c2e76317f1c7f8f9b7baded7e2a2eac8a578a7975441
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607092208-1J49NQ

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane pr update 202607092208-1J49NQ
- diagnostic_command: agentplane pr check 202607092208-1J49NQ
- source_of_truth: route=task_next_action diagnostic=pr_check remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: false
- repeat_stop_condition: if PR check passes but next-action still requests PR artifact update, verify live PR state before rerunning mutation
- risks: pr_artifact_freshness_loop, git_hook_side_effect

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Split route execution packets from route phase selection while preserving exported route-oracle APIs, blocker codes, argv safety, and exact recovery commands.
- Split hosted-close pre-merge validation, task-new duplicate detection, platform role-guide rendering, and close-message verification normalization into focused helpers.
- All touched runtime modules are below 400 lines; runtime hotspot count decreased from 14 to 9 (18 before the v0.6.22 refactor tranche).
- Verification passed: focused route/task/guard suite 62 files/440 tests, lifecycle invariants, hotspots:check, typecheck, ci:contract, and full test:fast 364 files/2157 tests.

- Observation: Five routing and task-command hotspots were split behind their existing public facades.
  Impact: Runtime hotspot count decreased from 14 to 9 without route-code or lifecycle-contract changes.
  Resolution: Focused 62/440, lifecycle invariants, hotspots, typecheck, ci:contract, and full 364/2157 passed.
