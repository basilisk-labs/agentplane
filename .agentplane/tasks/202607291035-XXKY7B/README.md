---
id: "202607291035-XXKY7B"
title: "Prevent evaluator self-referential evidence in recovery-context review"
result_summary: "pre-merge closure"
status: "DONE"
priority: "high"
owner: "CODER"
revision: 9
origin:
  system: "manual"
depends_on: []
tags:
  - "evaluator"
  - "followup"
  - "quality"
  - "v0.7"
verify:
  - "bun run test:fast -- packages/agentplane/src/commands/evaluator/evaluator-episode.calibration.test.ts packages/agentplane/src/commands/evaluator/evaluator-execute.command.test.ts packages/agentplane/src/commands/evaluator/evaluator-run.command.test.ts"
  - "bun run ci:contract"
plan_approval:
  state: "approved"
  updated_at: "2026-07-29T10:37:05.073Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-07-29T10:44:01.710Z"
  updated_by: "TESTER"
  note: "Focused evaluator regression suite passed (41/41); full ci:contract passed on the committed branch head."
  attempts: 0
quality_review:
  state: "pass"
  provenance: "evaluator_supplied"
  updated_at: "2026-07-29T10:45:05.154Z"
  updated_by: "EVALUATOR"
  note: "EVALUATOR returned pass with 1 typed finding(s)."
  evaluated_sha: "95ea07baae4d70773c3d4797e94eaa39ebee9c3f"
  blueprint_digest: "435770db05798b9dff128e1b32632452d244afbed820e54ee89464480ced8a3e"
  evidence_refs:
    - ".agentplane/tasks/202607291035-XXKY7B/quality/20260729-104430711-recovery-context/evaluator-work-order.json"
    - ".agentplane/tasks/202607291035-XXKY7B/quality/20260729-104430711-recovery-context/quality-report.json"
    - ".agentplane/tasks/202607291035-XXKY7B/quality/20260729-104430711-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202607291035-XXKY7B/quality/20260729-104430711-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202607291035-XXKY7B/quality/20260729-104430711-recovery-context/evaluator-result.json"
    - ".agentplane/tasks/202607291035-XXKY7B/README.md"
    - ".agentplane/tasks/202607291035-XXKY7B/quality/20260729-104430711-recovery-context/evaluator-diff.patch"
    - ".agentplane/tasks/202607291035-XXKY7B/quality/20260729-104430711-recovery-context/evaluator-observed-checks.json"
    - ".agentplane/tasks/202607291035-XXKY7B/quality/20260729-104430711-recovery-context/evaluator-blueprint.json"
    - ".agentplane/policy/dod.code.md"
    - ".agentplane/policy/dod.core.md"
    - ".agentplane/policy/security.must.md"
    - ".agentplane/policy/workflow.branch_pr.md"
  findings:
    - "The implementation removes the self-referential evidence requirement from both recovery-context evaluator copies and adds focused prompt-contract regression coverage."
commit:
  hash: "56de32dae5c72a0148be152fa7bd4e20c982db77"
  message: "test(task): verify evaluator evidence fix"
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "CODER"
    body: "Implementation: removed the self-referential evaluator evidence requirement and added prompt-level regression coverage. Validation: evaluator suite 41/41; ci:contract passed."
  -
    author: "CODER"
    body: "Verified: pre-merge closure packet is ready for the task PR."
events:
  -
    type: "status"
    at: "2026-07-29T10:37:41.312Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-07-29T10:42:43.553Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Implementation: removed the self-referential evaluator evidence requirement and added prompt-level regression coverage. Validation: evaluator suite 41/41; ci:contract passed."
  -
    type: "verify"
    at: "2026-07-29T10:44:01.710Z"
    author: "TESTER"
    state: "ok"
    note: "Focused evaluator regression suite passed (41/41); full ci:contract passed on the committed branch head."
  -
    type: "status"
    at: "2026-07-29T10:45:45.601Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: pre-merge closure packet is ready for the task PR."
doc_version: 3
doc_updated_at: "2026-07-29T10:45:45.602Z"
doc_updated_by: "CODER"
description: "Repair the recovery-context evaluator prompt contract so evaluator findings cite only frozen work-order evidence and cannot cite evaluator-generated work-order or report paths. Add a focused regression test and prove a replacement evaluator episode can be recorded for the blocked beta.1 qualification."
sections:
  Summary: |-
    Prevent evaluator self-referential evidence in recovery-context review

    Repair the recovery-context evaluator prompt contract so evaluator findings cite only frozen work-order evidence and cannot cite evaluator-generated work-order or report paths. Add a focused regression test and prove a replacement evaluator episode can be recorded for the blocked beta.1 qualification.
  Scope: |-
    - In scope: Repair the recovery-context evaluator prompt contract so evaluator findings cite only frozen work-order evidence and cannot cite evaluator-generated work-order or report paths. Add a focused regression test and prove a replacement evaluator episode can be recorded for the blocked beta.1 qualification.
    - Out of scope: unrelated refactors not required for "Prevent evaluator self-referential evidence in recovery-context review".
  Plan: "1. Reproduce the invalid recovery-context evaluator result and identify the conflicting prompt instruction. 2. Amend only the evaluator guidance needed to require findings to cite frozen work-order evidence and prohibit self-generated work-order or report paths. 3. Add a focused regression test that freezes this contract at prompt construction or provider-result validation. 4. Run the evaluator-focused suite and the full contract gate. 5. Hand the merged fix back to beta.1 for one replacement semantic review; do not synthesize the beta verdict or publish a release from this follow-up."
  Verify Steps: |-
    PLANNER fallback scaffold for "Prevent evaluator self-referential evidence in recovery-context review". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Prevent evaluator self-referential evidence in recovery-context review". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-07-29T10:44:01.710Z — VERIFY — ok

    By: TESTER

    Note: Focused evaluator regression suite passed (41/41); full ci:contract passed on the committed branch head.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-29T10:42:43.553Z, excerpt_hash=sha256:6ed44c9887884241f638dfbb9b64dac35ec0d9a649684aba23d6867674604d00

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/inc-20260727-main-lane.prxk2f/repo/.agentplane/tmp/integration-clean-main-branch-0SFMS7/.agentplane/tmp/evaluator-recovery-fix-base-20260729/.agentplane/worktrees/202607291035-XXKY7B-prevent-evaluator-self-referential-evidence-in-r/.agentplane/tasks/202607291035-XXKY7B/blueprint/resolved-snapshot.json
    - old_digest: 435770db05798b9dff128e1b32632452d244afbed820e54ee89464480ced8a3e
    - current_digest: 435770db05798b9dff128e1b32632452d244afbed820e54ee89464480ced8a3e
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607291035-XXKY7B

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202607291035-XXKY7B
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
    - Observation: The constructed recovery-context prompt now permits only frozen work-order evidence and explicitly excludes evaluator-generated paths.
      Impact: A provider response can no longer be instructed to cite a path that the CLI must reject.
      Resolution: Both built-in and repository evaluator modules were aligned; the prompt-level assertion prevents divergence.
extensions:
  implementation_commit:
    hash: "95ea07baae4d70773c3d4797e94eaa39ebee9c3f"
    message: "fix(evaluator): prohibit self-referential evidence"
  workflow_route_baseline:
    start_head_sha: "b90a9e6df9ae35a1a518e1ffa73903d6e5784d35"
    version: 1
id_source: "generated"
---
## Summary

Prevent evaluator self-referential evidence in recovery-context review

Repair the recovery-context evaluator prompt contract so evaluator findings cite only frozen work-order evidence and cannot cite evaluator-generated work-order or report paths. Add a focused regression test and prove a replacement evaluator episode can be recorded for the blocked beta.1 qualification.

## Scope

- In scope: Repair the recovery-context evaluator prompt contract so evaluator findings cite only frozen work-order evidence and cannot cite evaluator-generated work-order or report paths. Add a focused regression test and prove a replacement evaluator episode can be recorded for the blocked beta.1 qualification.
- Out of scope: unrelated refactors not required for "Prevent evaluator self-referential evidence in recovery-context review".

## Plan

1. Reproduce the invalid recovery-context evaluator result and identify the conflicting prompt instruction. 2. Amend only the evaluator guidance needed to require findings to cite frozen work-order evidence and prohibit self-generated work-order or report paths. 3. Add a focused regression test that freezes this contract at prompt construction or provider-result validation. 4. Run the evaluator-focused suite and the full contract gate. 5. Hand the merged fix back to beta.1 for one replacement semantic review; do not synthesize the beta verdict or publish a release from this follow-up.

## Verify Steps

PLANNER fallback scaffold for "Prevent evaluator self-referential evidence in recovery-context review". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Prevent evaluator self-referential evidence in recovery-context review". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-07-29T10:44:01.710Z — VERIFY — ok

By: TESTER

Note: Focused evaluator regression suite passed (41/41); full ci:contract passed on the committed branch head.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-29T10:42:43.553Z, excerpt_hash=sha256:6ed44c9887884241f638dfbb9b64dac35ec0d9a649684aba23d6867674604d00

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/inc-20260727-main-lane.prxk2f/repo/.agentplane/tmp/integration-clean-main-branch-0SFMS7/.agentplane/tmp/evaluator-recovery-fix-base-20260729/.agentplane/worktrees/202607291035-XXKY7B-prevent-evaluator-self-referential-evidence-in-r/.agentplane/tasks/202607291035-XXKY7B/blueprint/resolved-snapshot.json
- old_digest: 435770db05798b9dff128e1b32632452d244afbed820e54ee89464480ced8a3e
- current_digest: 435770db05798b9dff128e1b32632452d244afbed820e54ee89464480ced8a3e
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607291035-XXKY7B

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202607291035-XXKY7B
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

- Observation: The constructed recovery-context prompt now permits only frozen work-order evidence and explicitly excludes evaluator-generated paths.
  Impact: A provider response can no longer be instructed to cite a path that the CLI must reject.
  Resolution: Both built-in and repository evaluator modules were aligned; the prompt-level assertion prevents divergence.
