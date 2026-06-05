---
id: "202606050043-B2MFPM"
title: "Update release build contract for TypeScript wrapper"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on: []
tags:
  - "cognitive-load"
  - "release"
  - "test"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-06-05T00:43:59.624Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-06-05T00:44:32.836Z"
  updated_by: "CODER"
  note: "Updated release build contract for run-typescript-build --force; targeted release-ci-contract test and Prettier check passed."
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: update release build contract after process-bound TypeScript wrapper."
events:
  -
    type: "status"
    at: "2026-06-05T00:44:00.208Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: update release build contract after process-bound TypeScript wrapper."
  -
    type: "verify"
    at: "2026-06-05T00:44:32.836Z"
    author: "CODER"
    state: "ok"
    note: "Updated release build contract for run-typescript-build --force; targeted release-ci-contract test and Prettier check passed."
doc_version: 3
doc_updated_at: "2026-06-05T00:44:32.976Z"
doc_updated_by: "CODER"
description: "After replacing package build scripts with process-bound TypeScript wrappers, release-ci-contract still asserts the old literal 'tsc -b --force'. Update the contract to require clean plus run-typescript-build --force so it preserves the publishable clean-build invariant without forcing the unstable shim."
sections:
  Summary: |-
    Update release build contract for TypeScript wrapper

    After replacing package build scripts with process-bound TypeScript wrappers, release-ci-contract still asserts the old literal 'tsc -b --force'. Update the contract to require clean plus run-typescript-build --force so it preserves the publishable clean-build invariant without forcing the unstable shim.
  Scope: |-
    - In scope: After replacing package build scripts with process-bound TypeScript wrappers, release-ci-contract still asserts the old literal 'tsc -b --force'. Update the contract to require clean plus run-typescript-build --force so it preserves the publishable clean-build invariant without forcing the unstable shim.
    - Out of scope: unrelated refactors not required for "Update release build contract for TypeScript wrapper".
  Plan: "1. Update release-ci-contract to assert npm run clean plus run-typescript-build --force for the publishable agentplane build. 2. Run the failing release contract test/chunk through the process-bound Vitest runner. 3. Record verification/evaluator evidence, then resume release-ci-base/full prepublish."
  Verify Steps: |-
    PLANNER fallback scaffold for "Update release build contract for TypeScript wrapper". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Update release build contract for TypeScript wrapper". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-06-05T00:44:32.836Z — VERIFY — ok

    By: CODER

    Note: Updated release build contract for run-typescript-build --force; targeted release-ci-contract test and Prettier check passed.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-06-05T00:44:00.208Z, excerpt_hash=sha256:23cc6b45b1602efe32b3ae138cda5e7f2a33b364508234fa397a18ad6ac25fc6

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202606042325-S2SCRB-prepare-v0-6-17-release-candidate/.agentplane/tasks/202606050043-B2MFPM/blueprint/resolved-snapshot.json
    - old_digest: 06b797e86c98b25191482b863970175b22225f31f7566aca61889205601b94ea
    - current_digest: 06b797e86c98b25191482b863970175b22225f31f7566aca61889205601b94ea
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202606050043-B2MFPM

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane work start 202606050043-B2MFPM --agent CODER --slug update-release-build-contract-for-typescript-wra --worktree
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
    - Observation: The contract was tied to the old tsc shim string instead of the publishable clean forced type-build invariant.
      Impact: The release suite now validates the intended build behavior while allowing the more stable process-bound TypeScript wrapper.
      Resolution: Assert npm run clean plus run-typescript-build --force in the agentplane package build script.
id_source: "generated"
---
## Summary

Update release build contract for TypeScript wrapper

After replacing package build scripts with process-bound TypeScript wrappers, release-ci-contract still asserts the old literal 'tsc -b --force'. Update the contract to require clean plus run-typescript-build --force so it preserves the publishable clean-build invariant without forcing the unstable shim.

## Scope

- In scope: After replacing package build scripts with process-bound TypeScript wrappers, release-ci-contract still asserts the old literal 'tsc -b --force'. Update the contract to require clean plus run-typescript-build --force so it preserves the publishable clean-build invariant without forcing the unstable shim.
- Out of scope: unrelated refactors not required for "Update release build contract for TypeScript wrapper".

## Plan

1. Update release-ci-contract to assert npm run clean plus run-typescript-build --force for the publishable agentplane build. 2. Run the failing release contract test/chunk through the process-bound Vitest runner. 3. Record verification/evaluator evidence, then resume release-ci-base/full prepublish.

## Verify Steps

PLANNER fallback scaffold for "Update release build contract for TypeScript wrapper". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Update release build contract for TypeScript wrapper". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-06-05T00:44:32.836Z — VERIFY — ok

By: CODER

Note: Updated release build contract for run-typescript-build --force; targeted release-ci-contract test and Prettier check passed.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-06-05T00:44:00.208Z, excerpt_hash=sha256:23cc6b45b1602efe32b3ae138cda5e7f2a33b364508234fa397a18ad6ac25fc6

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202606042325-S2SCRB-prepare-v0-6-17-release-candidate/.agentplane/tasks/202606050043-B2MFPM/blueprint/resolved-snapshot.json
- old_digest: 06b797e86c98b25191482b863970175b22225f31f7566aca61889205601b94ea
- current_digest: 06b797e86c98b25191482b863970175b22225f31f7566aca61889205601b94ea
- route_changed: no
- safe_command: agentplane blueprint snapshot 202606050043-B2MFPM

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane work start 202606050043-B2MFPM --agent CODER --slug update-release-build-contract-for-typescript-wra --worktree
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

- Observation: The contract was tied to the old tsc shim string instead of the publishable clean forced type-build invariant.
  Impact: The release suite now validates the intended build behavior while allowing the more stable process-bound TypeScript wrapper.
  Resolution: Assert npm run clean plus run-typescript-build --force in the agentplane package build script.
