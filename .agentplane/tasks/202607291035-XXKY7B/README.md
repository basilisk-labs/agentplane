---
id: "202607291035-XXKY7B"
title: "Prevent evaluator self-referential evidence in recovery-context review"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 6
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
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
  attempts: 0
commit:
  hash: "95ea07baae4d70773c3d4797e94eaa39ebee9c3f"
  message: "fix(evaluator): prohibit self-referential evidence"
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "CODER"
    body: "Implementation: removed the self-referential evaluator evidence requirement and added prompt-level regression coverage. Validation: evaluator suite 41/41; ci:contract passed."
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
doc_version: 3
doc_updated_at: "2026-07-29T10:42:43.553Z"
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
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
extensions:
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
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
