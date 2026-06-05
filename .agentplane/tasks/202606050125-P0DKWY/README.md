---
id: "202606050125-P0DKWY"
title: "Harden release lifecycle test cleanup"
result_summary: "Release follow-up completed and included in the v0.6.17 release branch."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 7
origin:
  system: "manual"
depends_on: []
tags:
  - "ci"
  - "release"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-06-05T01:25:39.831Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-06-05T01:26:21.297Z"
  updated_by: "REVIEWER"
  note: "Release lifecycle cleanup hardening passed."
  attempts: 0
quality_review:
  state: "pass"
  updated_at: "2026-06-05T01:27:04.281Z"
  updated_by: "EVALUATOR"
  note: "Release lifecycle cleanup hardening is focused and verified."
  evaluated_sha: "451a96881f3504f45485fe5132f0915b9ec86dc7"
  blueprint_digest: "aa891a79fb76938cab35c1f008a03901f70025c2faa9a8c59c7dcc26f8311d20"
  evidence_refs:
    - ".agentplane/tasks/202606050125-P0DKWY/README.md"
    - ".agentplane/tasks/202606050125-P0DKWY/quality/20260605-012704281-recovery-context/quality-report.json"
    - ".agentplane/tasks/202606050125-P0DKWY/quality/20260605-012704281-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202606050125-P0DKWY/quality/20260605-012704281-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202606050125-P0DKWY/blueprint/resolved-snapshot.json"
    - "packages/agentplane/src/cli/release-critical-lifecycle.test.ts"
  findings:
    - "The failing hosted test used single-attempt recursive temp repo removal; the patch uses fs.rm retry options and focused release-critical verification passed."
commit:
  hash: "451a96881f3504f45485fe5132f0915b9ec86dc7"
  message: "🧪 S2SCRB release: harden lifecycle cleanup"
comments:
  -
    author: "CODER"
    body: "Start: harden release lifecycle test cleanup after hosted verify-unit ENOTEMPTY failure."
  -
    author: "INTEGRATOR"
    body: "Verified: release follow-up was implemented, reviewed, and merged through the v0.6.17 release branch."
events:
  -
    type: "status"
    at: "2026-06-05T01:25:40.118Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: harden release lifecycle test cleanup after hosted verify-unit ENOTEMPTY failure."
  -
    type: "verify"
    at: "2026-06-05T01:26:21.297Z"
    author: "REVIEWER"
    state: "ok"
    note: "Release lifecycle cleanup hardening passed."
  -
    type: "status"
    at: "2026-06-05T02:00:52.128Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: release follow-up was implemented, reviewed, and merged through the v0.6.17 release branch."
doc_version: 3
doc_updated_at: "2026-06-05T02:00:52.129Z"
doc_updated_by: "INTEGRATOR"
description: "GitHub verify-unit failed in release-critical-lifecycle.test.ts with ENOTEMPTY while removing a temporary git info directory. Make the test cleanup robust so hosted CI does not fail on transient filesystem cleanup races."
sections:
  Summary: |-
    Harden release lifecycle test cleanup

    GitHub verify-unit failed in release-critical-lifecycle.test.ts with ENOTEMPTY while removing a temporary git info directory. Make the test cleanup robust so hosted CI does not fail on transient filesystem cleanup races.
  Scope: |-
    - In scope: GitHub verify-unit failed in release-critical-lifecycle.test.ts with ENOTEMPTY while removing a temporary git info directory. Make the test cleanup robust so hosted CI does not fail on transient filesystem cleanup races.
    - Out of scope: unrelated refactors not required for "Harden release lifecycle test cleanup".
  Plan: "Harden release-critical lifecycle test cleanup by using retry-capable recursive removal for the temporary repository, then rerun the failing test and release-critical suite before updating the release PR."
  Verify Steps: |-
    PLANNER fallback scaffold for "Harden release lifecycle test cleanup". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Harden release lifecycle test cleanup". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-06-05T01:26:21.297Z — VERIFY — ok

    By: REVIEWER

    Note: Release lifecycle cleanup hardening passed.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-06-05T01:25:40.118Z, excerpt_hash=sha256:bc106a46819223cfe8117b4d164914c5433a6ab9af75413399f842a67e5856b1

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202606042325-S2SCRB-prepare-v0-6-17-release-candidate/.agentplane/tasks/202606050125-P0DKWY/blueprint/resolved-snapshot.json
    - old_digest: aa891a79fb76938cab35c1f008a03901f70025c2faa9a8c59c7dcc26f8311d20
    - current_digest: aa891a79fb76938cab35c1f008a03901f70025c2faa9a8c59c7dcc26f8311d20
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202606050125-P0DKWY

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane work start 202606050125-P0DKWY --agent CODER --slug harden-release-lifecycle-test-cleanup --worktree
    - diagnostic_command: none
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: true
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - runner_required: false
    - runner_failure_means: not_runner_route
    - risks: none

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Fixed hosted verify-unit ENOTEMPTY cleanup race by using retry-capable recursive removal for the temporary lifecycle test repository. Verification: bun test packages/agentplane/src/cli/release-critical-lifecycle.test.ts; bun run test:release:critical; bunx prettier packages/agentplane/src/cli/release-critical-lifecycle.test.ts --check.
      Impact: Hosted unit CI should no longer fail on transient temp git directory cleanup races in this release-critical test.
      Resolution: Update release PR with the cleanup hardening patch.
id_source: "generated"
---
## Summary

Harden release lifecycle test cleanup

GitHub verify-unit failed in release-critical-lifecycle.test.ts with ENOTEMPTY while removing a temporary git info directory. Make the test cleanup robust so hosted CI does not fail on transient filesystem cleanup races.

## Scope

- In scope: GitHub verify-unit failed in release-critical-lifecycle.test.ts with ENOTEMPTY while removing a temporary git info directory. Make the test cleanup robust so hosted CI does not fail on transient filesystem cleanup races.
- Out of scope: unrelated refactors not required for "Harden release lifecycle test cleanup".

## Plan

Harden release-critical lifecycle test cleanup by using retry-capable recursive removal for the temporary repository, then rerun the failing test and release-critical suite before updating the release PR.

## Verify Steps

PLANNER fallback scaffold for "Harden release lifecycle test cleanup". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Harden release lifecycle test cleanup". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-06-05T01:26:21.297Z — VERIFY — ok

By: REVIEWER

Note: Release lifecycle cleanup hardening passed.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-06-05T01:25:40.118Z, excerpt_hash=sha256:bc106a46819223cfe8117b4d164914c5433a6ab9af75413399f842a67e5856b1

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202606042325-S2SCRB-prepare-v0-6-17-release-candidate/.agentplane/tasks/202606050125-P0DKWY/blueprint/resolved-snapshot.json
- old_digest: aa891a79fb76938cab35c1f008a03901f70025c2faa9a8c59c7dcc26f8311d20
- current_digest: aa891a79fb76938cab35c1f008a03901f70025c2faa9a8c59c7dcc26f8311d20
- route_changed: no
- safe_command: agentplane blueprint snapshot 202606050125-P0DKWY

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane work start 202606050125-P0DKWY --agent CODER --slug harden-release-lifecycle-test-cleanup --worktree
- diagnostic_command: none
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: true
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- runner_required: false
- runner_failure_means: not_runner_route
- risks: none

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: Fixed hosted verify-unit ENOTEMPTY cleanup race by using retry-capable recursive removal for the temporary lifecycle test repository. Verification: bun test packages/agentplane/src/cli/release-critical-lifecycle.test.ts; bun run test:release:critical; bunx prettier packages/agentplane/src/cli/release-critical-lifecycle.test.ts --check.
  Impact: Hosted unit CI should no longer fail on transient temp git directory cleanup races in this release-critical test.
  Resolution: Update release PR with the cleanup hardening patch.
