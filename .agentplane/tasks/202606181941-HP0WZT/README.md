---
id: "202606181941-HP0WZT"
title: "Fix close dirty-state regressions"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "bug"
  - "code"
  - "lifecycle"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-06-18T19:41:33.177Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-06-18T19:46:23.509Z"
  updated_by: "CODER"
  note: "Command: ./node_modules/.bin/vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/backends/task-backend.local-handoff.test.ts. Result: pass. Evidence: 1 test passed; empty task dirs ignored while non-empty missing README still warns. Command: ./node_modules/.bin/vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/task/finish.validation.unit.test.ts. Result: pass. Evidence: 22 tests passed, including close-commit pre-mutation validation. Command: node .agentplane/policy/check-routing.mjs. Result: pass. Evidence: policy routing OK. Command: agentplane doctor. Result: pass. Evidence: doctor OK; unrelated warnings remain for old DONE tasks 202606040927-KSESDS and 202606041702-TVTSM2 missing commit hashes."
  attempts: 0
quality_review:
  state: "pass"
  updated_at: "2026-06-18T19:50:21.981Z"
  updated_by: "EVALUATOR"
  note: "Quality review passed."
  evaluated_sha: "173c916b1e09a6573b52df8f05fb1b84ad09b15d"
  blueprint_digest: "bf281fc3c1c95752b31227879bbeec9b1d9513b2bf6a2a7bfcd20520004bfbd2"
  evidence_refs:
    - ".agentplane/tasks/202606181941-HP0WZT/README.md"
    - ".agentplane/tasks/202606181941-HP0WZT/quality/20260618-195021981-recovery-context/quality-report.json"
    - ".agentplane/tasks/202606181941-HP0WZT/quality/20260618-195021981-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202606181941-HP0WZT/quality/20260618-195021981-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202606181941-HP0WZT/blueprint/resolved-snapshot.json"
  findings:
    - "No blocking findings."
commit: null
comments:
  -
    author: "CODER"
    body: "Start: fixing GitHub issues #4523 and #4524 in a dedicated branch_pr worktree with focused dirty-task and close-order regression coverage."
events:
  -
    type: "status"
    at: "2026-06-18T19:41:56.168Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: fixing GitHub issues #4523 and #4524 in a dedicated branch_pr worktree with focused dirty-task and close-order regression coverage."
  -
    type: "verify"
    at: "2026-06-18T19:46:23.509Z"
    author: "CODER"
    state: "ok"
    note: "Command: ./node_modules/.bin/vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/backends/task-backend.local-handoff.test.ts. Result: pass. Evidence: 1 test passed; empty task dirs ignored while non-empty missing README still warns. Command: ./node_modules/.bin/vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/task/finish.validation.unit.test.ts. Result: pass. Evidence: 22 tests passed, including close-commit pre-mutation validation. Command: node .agentplane/policy/check-routing.mjs. Result: pass. Evidence: policy routing OK. Command: agentplane doctor. Result: pass. Evidence: doctor OK; unrelated warnings remain for old DONE tasks 202606040927-KSESDS and 202606041702-TVTSM2 missing commit hashes."
doc_version: 3
doc_updated_at: "2026-06-18T19:46:23.741Z"
doc_updated_by: "CODER"
description: "Fix GitHub issues #4523 and #4524: empty task directories must not count as dirty task artifacts, and close/finish must not transition task status before dirty-state preconditions pass."
sections:
  Summary: |-
    Fix close dirty-state regressions

    Fix GitHub issues #4523 and #4524: empty task directories must not count as dirty task artifacts, and close/finish must not transition task status before dirty-state preconditions pass.
  Scope: |-
    - In scope: Fix GitHub issues #4523 and #4524: empty task directories must not count as dirty task artifacts, and close/finish must not transition task status before dirty-state preconditions pass.
    - Out of scope: unrelated refactors not required for "Fix close dirty-state regressions".
  Plan: |-
    1. Reproduce dirty-task handling for empty task directories and close precondition ordering in focused tests.
    2. Fix task artifact/dirty detection so empty task directories are ignored unless they contain real AgentPlane artifacts.
    3. Reorder close/finish flow so status mutation happens only after close preconditions pass.
    4. Verify with targeted tests plus policy/doctor checks, open PR linked to GitHub issues #4523 and #4524, wait for hosted checks, merge through GitHub, then close/comment the issues.
  Verify Steps: |-
    1. Run `./node_modules/.bin/vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/backends/task-backend.local-handoff.test.ts`. Expected: empty task directories and handoff-only directories are ignored, while non-empty missing-README directories still warn.
    2. Run `./node_modules/.bin/vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/task/finish.validation.unit.test.ts`. Expected: finish close-commit validation still rejects dirty close state before task status mutation.
    3. Run `node .agentplane/policy/check-routing.mjs` and `agentplane doctor`. Expected: policy routing and repository health checks pass or any unrelated pre-existing warning is recorded in Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-06-18T19:46:23.509Z — VERIFY — ok

    By: CODER

    Note: Command: ./node_modules/.bin/vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/backends/task-backend.local-handoff.test.ts. Result: pass. Evidence: 1 test passed; empty task dirs ignored while non-empty missing README still warns. Command: ./node_modules/.bin/vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/task/finish.validation.unit.test.ts. Result: pass. Evidence: 22 tests passed, including close-commit pre-mutation validation. Command: node .agentplane/policy/check-routing.mjs. Result: pass. Evidence: policy routing OK. Command: agentplane doctor. Result: pass. Evidence: doctor OK; unrelated warnings remain for old DONE tasks 202606040927-KSESDS and 202606041702-TVTSM2 missing commit hashes.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-06-18T19:41:56.168Z, excerpt_hash=sha256:a40ce113633a4213ce991659300adb44469786f9dd26e2adb3e21dcfbdf47b16

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202606181941-HP0WZT-fix-close-dirty-state-regressions/.agentplane/tasks/202606181941-HP0WZT/blueprint/resolved-snapshot.json
    - old_digest: bf281fc3c1c95752b31227879bbeec9b1d9513b2bf6a2a7bfcd20520004bfbd2
    - current_digest: bf281fc3c1c95752b31227879bbeec9b1d9513b2bf6a2a7bfcd20520004bfbd2
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202606181941-HP0WZT

    DecisionContextRef:
    - operator_action: run_exact_argv
    - can_execute_now: true
    - safe_command: agentplane work start 202606181941-HP0WZT --agent CODER --slug fix-close-dirty-state-regressions --worktree
    - diagnostic_command: agentplane work resume 202606181941-HP0WZT
    - source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
    - freshness: route=computed_local remote=remote_skipped
    - repeat_allowed: true
    - repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
    - risks: worktree_projection_drift

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Fix close dirty-state regressions

Fix GitHub issues #4523 and #4524: empty task directories must not count as dirty task artifacts, and close/finish must not transition task status before dirty-state preconditions pass.

## Scope

- In scope: Fix GitHub issues #4523 and #4524: empty task directories must not count as dirty task artifacts, and close/finish must not transition task status before dirty-state preconditions pass.
- Out of scope: unrelated refactors not required for "Fix close dirty-state regressions".

## Plan

1. Reproduce dirty-task handling for empty task directories and close precondition ordering in focused tests.
2. Fix task artifact/dirty detection so empty task directories are ignored unless they contain real AgentPlane artifacts.
3. Reorder close/finish flow so status mutation happens only after close preconditions pass.
4. Verify with targeted tests plus policy/doctor checks, open PR linked to GitHub issues #4523 and #4524, wait for hosted checks, merge through GitHub, then close/comment the issues.

## Verify Steps

1. Run `./node_modules/.bin/vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/backends/task-backend.local-handoff.test.ts`. Expected: empty task directories and handoff-only directories are ignored, while non-empty missing-README directories still warn.
2. Run `./node_modules/.bin/vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/task/finish.validation.unit.test.ts`. Expected: finish close-commit validation still rejects dirty close state before task status mutation.
3. Run `node .agentplane/policy/check-routing.mjs` and `agentplane doctor`. Expected: policy routing and repository health checks pass or any unrelated pre-existing warning is recorded in Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-06-18T19:46:23.509Z — VERIFY — ok

By: CODER

Note: Command: ./node_modules/.bin/vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/backends/task-backend.local-handoff.test.ts. Result: pass. Evidence: 1 test passed; empty task dirs ignored while non-empty missing README still warns. Command: ./node_modules/.bin/vitest --config vitest.workspace.ts run --project agentplane packages/agentplane/src/commands/task/finish.validation.unit.test.ts. Result: pass. Evidence: 22 tests passed, including close-commit pre-mutation validation. Command: node .agentplane/policy/check-routing.mjs. Result: pass. Evidence: policy routing OK. Command: agentplane doctor. Result: pass. Evidence: doctor OK; unrelated warnings remain for old DONE tasks 202606040927-KSESDS and 202606041702-TVTSM2 missing commit hashes.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-06-18T19:41:56.168Z, excerpt_hash=sha256:a40ce113633a4213ce991659300adb44469786f9dd26e2adb3e21dcfbdf47b16

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/base-main-for-XS41ZV/.agentplane/worktrees/202606181941-HP0WZT-fix-close-dirty-state-regressions/.agentplane/tasks/202606181941-HP0WZT/blueprint/resolved-snapshot.json
- old_digest: bf281fc3c1c95752b31227879bbeec9b1d9513b2bf6a2a7bfcd20520004bfbd2
- current_digest: bf281fc3c1c95752b31227879bbeec9b1d9513b2bf6a2a7bfcd20520004bfbd2
- route_changed: no
- safe_command: agentplane blueprint snapshot 202606181941-HP0WZT

DecisionContextRef:
- operator_action: run_exact_argv
- can_execute_now: true
- safe_command: agentplane work start 202606181941-HP0WZT --agent CODER --slug fix-close-dirty-state-regressions --worktree
- diagnostic_command: agentplane work resume 202606181941-HP0WZT
- source_of_truth: route=task_next_action diagnostic=task_next_action remote=not_checked
- freshness: route=computed_local remote=remote_skipped
- repeat_allowed: true
- repeat_stop_condition: after any non-zero exit or completed mutation, recompute task next-action before a second step
- risks: worktree_projection_drift

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
