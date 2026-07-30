---
id: "202607302012-FCYR88"
title: "Unblock protected-base conflict rework after main advancement"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "branch-pr"
  - "code"
  - "conflict-rework"
  - "followup"
  - "release-blocker"
  - "v0.7"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "code.branch_pr"
verify:
  - "bun run test -- packages/agentplane/src/commands/pr/conflict-rework.legacy-base.test.ts --maxWorkers=1 --no-file-parallelism"
  - "bun run test:critical"
  - "bun run typecheck"
plan_approval:
  state: "approved"
  updated_at: "2026-07-30T20:12:34.537Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-07-30T20:22:00.707Z"
  updated_by: "CODER"
  note: "Protected-base conflict route passed: focused legacy/current handoff regression 16 tests, typecheck, targeted ESLint and Prettier, and critical suite 12/12 (76 tests) are green."
  attempts: 0
quality_review:
  state: "pass"
  provenance: "evaluator_supplied"
  updated_at: "2026-07-30T20:22:27.136Z"
  updated_by: "EVALUATOR"
  note: "EVALUATOR returned pass with 1 typed finding(s)."
  evaluated_sha: "3f61098fd12e2a8359ed90d3aae50f8282ecce4f"
  blueprint_digest: "9df647c48381f73db327c2e85bebd654707bb2e709e64e77b5f053d39062e1e2"
  evidence_refs:
    - ".agentplane/tasks/202607302012-FCYR88/quality/20260730-202226736-recovery-context/evaluator-work-order.json"
    - ".agentplane/tasks/202607302012-FCYR88/quality/20260730-202226736-recovery-context/quality-report.json"
    - ".agentplane/tasks/202607302012-FCYR88/quality/20260730-202226736-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202607302012-FCYR88/quality/20260730-202226736-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202607302012-FCYR88/quality/20260730-202226736-recovery-context/evaluator-result.json"
    - ".agentplane/tasks/202607302012-FCYR88/README.md"
    - ".agentplane/tasks/202607302012-FCYR88/quality/20260730-202226736-recovery-context/evaluator-diff.patch"
    - ".agentplane/tasks/202607302012-FCYR88/quality/20260730-202226736-recovery-context/evaluator-observed-checks.json"
    - ".agentplane/tasks/202607302012-FCYR88/quality/20260730-202226736-recovery-context/evaluator-blueprint.json"
    - ".agentplane/policy/dod.code.md"
    - ".agentplane/policy/dod.core.md"
    - ".agentplane/policy/security.must.md"
    - ".agentplane/policy/workflow.branch_pr.md"
  findings:
    - "The change adds no automatic rebase, merge, force-push, or semantic hunk selection; it only restores packet eligibility from already-persisted provider, queue, and handoff identities."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: repair protected-base conflict rework routing after main advanced."
events:
  -
    type: "status"
    at: "2026-07-30T20:13:03.894Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: repair protected-base conflict rework routing after main advanced."
  -
    type: "verify"
    at: "2026-07-30T20:22:00.707Z"
    author: "CODER"
    state: "ok"
    note: "Protected-base conflict route passed: focused legacy/current handoff regression 16 tests, typecheck, targeted ESLint and Prettier, and critical suite 12/12 (76 tests) are green."
doc_version: 3
doc_updated_at: "2026-07-30T20:22:02.738Z"
doc_updated_by: "CODER"
description: "Repair branch_pr conflict-rework routing when a protected-base PR retains a verified INTEGRATOR handoff but the provider base SHA is behind current main. Preserve the CLI/agent boundary: CLI may derive the bounded packet and adoption evidence, but must never auto-rebase, merge, force-push, or select semantic conflict hunks. This unblocks beta.1 PR #4668."
sections:
  Summary: |-
    Unblock protected-base conflict rework after main advancement

    Repair branch_pr conflict-rework routing when a protected-base PR retains a verified INTEGRATOR handoff but the provider base SHA is behind current main. Preserve the CLI/agent boundary: CLI may derive the bounded packet and adoption evidence, but must never auto-rebase, merge, force-push, or select semantic conflict hunks. This unblocks beta.1 PR #4668.
  Scope: |-
    - In scope: Repair branch_pr conflict-rework routing when a protected-base PR retains a verified INTEGRATOR handoff but the provider base SHA is behind current main. Preserve the CLI/agent boundary: CLI may derive the bounded packet and adoption evidence, but must never auto-rebase, merge, force-push, or select semantic conflict hunks. This unblocks beta.1 PR #4668.
    - Out of scope: unrelated refactors not required for "Unblock protected-base conflict rework after main advancement".
  Plan: "1. Reproduce the protected-base base-advancement state using a current provider head, INTEGRATOR handoff, queue rework state, and advanced local main. 2. Change only conflict-route eligibility/preparation so current provider-base handoffs either yield the formal adoption receipt or a bounded semantic-rework packet; CLI must not auto-rebase, auto-merge, force-push, or choose conflict hunks. 3. Add focused coverage for current provider-base and legacy absent-base handoffs, including stale-token rejection. 4. Run the declared focused test, typecheck, critical suite, record verifier/evaluator evidence, and integrate through the normal PR queue."
  Verify Steps: |-
    PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

    1. Run `bun run test -- packages/agentplane/src/commands/pr/conflict-rework.legacy-base.test.ts --maxWorkers=1 --no-file-parallelism`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Run `bun run test:critical`. Expected: it succeeds and confirms the requested outcome for this task.
    4. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    5. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-07-30T20:22:00.707Z — VERIFY — ok

    By: CODER

    Note: Protected-base conflict route passed: focused legacy/current handoff regression 16 tests, typecheck, targeted ESLint and Prettier, and critical suite 12/12 (76 tests) are green.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-30T20:13:03.894Z, excerpt_hash=sha256:22eade0b671a9f83f5c0ea2f3f907f2a0f576608fb804b0d2cecc7c02e02ba0c

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202607302012-FCYR88-protected-base-conflict-rework/.agentplane/tasks/202607302012-FCYR88/blueprint/resolved-snapshot.json
    - old_digest: 9df647c48381f73db327c2e85bebd654707bb2e709e64e77b5f053d39062e1e2
    - current_digest: 9df647c48381f73db327c2e85bebd654707bb2e709e64e77b5f053d39062e1e2
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607302012-FCYR88

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
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: A verified INTEGRATOR handoff with a known provider base and a rework queue now yields a bounded read-only packet after strict provider-to-queue-to-current ancestry checks.
      Impact: A main advancement no longer deadlocks semantic conflict routing; the CLI still leaves rebase, merge, and hunk decisions to the executing agent.
      Resolution: Continue with independent evaluator review and normal PR lifecycle.
extensions:
  workflow_route_baseline:
    start_head_sha: "ce7af971c0609eed73710cd239a3f2897ae3bd7e"
    version: 1
id_source: "generated"
---
## Summary

Unblock protected-base conflict rework after main advancement

Repair branch_pr conflict-rework routing when a protected-base PR retains a verified INTEGRATOR handoff but the provider base SHA is behind current main. Preserve the CLI/agent boundary: CLI may derive the bounded packet and adoption evidence, but must never auto-rebase, merge, force-push, or select semantic conflict hunks. This unblocks beta.1 PR #4668.

## Scope

- In scope: Repair branch_pr conflict-rework routing when a protected-base PR retains a verified INTEGRATOR handoff but the provider base SHA is behind current main. Preserve the CLI/agent boundary: CLI may derive the bounded packet and adoption evidence, but must never auto-rebase, merge, force-push, or select semantic conflict hunks. This unblocks beta.1 PR #4668.
- Out of scope: unrelated refactors not required for "Unblock protected-base conflict rework after main advancement".

## Plan

1. Reproduce the protected-base base-advancement state using a current provider head, INTEGRATOR handoff, queue rework state, and advanced local main. 2. Change only conflict-route eligibility/preparation so current provider-base handoffs either yield the formal adoption receipt or a bounded semantic-rework packet; CLI must not auto-rebase, auto-merge, force-push, or choose conflict hunks. 3. Add focused coverage for current provider-base and legacy absent-base handoffs, including stale-token rejection. 4. Run the declared focused test, typecheck, critical suite, record verifier/evaluator evidence, and integrate through the normal PR queue.

## Verify Steps

PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

1. Run `bun run test -- packages/agentplane/src/commands/pr/conflict-rework.legacy-base.test.ts --maxWorkers=1 --no-file-parallelism`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
3. Run `bun run test:critical`. Expected: it succeeds and confirms the requested outcome for this task.
4. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
5. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-07-30T20:22:00.707Z — VERIFY — ok

By: CODER

Note: Protected-base conflict route passed: focused legacy/current handoff regression 16 tests, typecheck, targeted ESLint and Prettier, and critical suite 12/12 (76 tests) are green.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-30T20:13:03.894Z, excerpt_hash=sha256:22eade0b671a9f83f5c0ea2f3f907f2a0f576608fb804b0d2cecc7c02e02ba0c

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/v07-packet-fix-control-20260730/.agentplane/worktrees/202607302012-FCYR88-protected-base-conflict-rework/.agentplane/tasks/202607302012-FCYR88/blueprint/resolved-snapshot.json
- old_digest: 9df647c48381f73db327c2e85bebd654707bb2e709e64e77b5f053d39062e1e2
- current_digest: 9df647c48381f73db327c2e85bebd654707bb2e709e64e77b5f053d39062e1e2
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607302012-FCYR88

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

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: A verified INTEGRATOR handoff with a known provider base and a rework queue now yields a bounded read-only packet after strict provider-to-queue-to-current ancestry checks.
  Impact: A main advancement no longer deadlocks semantic conflict routing; the CLI still leaves rebase, merge, and hunk decisions to the executing agent.
  Resolution: Continue with independent evaluator review and normal PR lifecycle.
