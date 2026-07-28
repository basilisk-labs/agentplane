---
id: "202607282157-FT85MC"
title: "Freeze complete branch evidence for evaluator review"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 8
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "evaluator"
  - "quality"
  - "v0.7"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-07-28T21:58:01.517Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-07-28T22:08:53.597Z"
  updated_by: "TESTER"
  note: "Focused evaluator evidence regression tests (17), Prettier, ESLint, typecheck, policy routing, and doctor passed. The work order now freezes the merge-base-to-target diff with base provenance; direct root/single-commit behavior and missing branch_pr base failure are covered."
  attempts: 0
quality_review:
  state: "rework"
  provenance: "evaluator_supplied"
  updated_at: "2026-07-28T22:10:01.064Z"
  updated_by: "EVALUATOR"
  note: "EVALUATOR returned rework with 1 typed finding(s)."
  evaluated_sha: "fae38597465dbcea157645ec28f47ea3564c1481"
  blueprint_digest: "a73d05fa92d5a843c8e92a74272171e8869d1073f4e8fbb1a4323324ddba0ad9"
  evidence_refs:
    - ".agentplane/tasks/202607282157-FT85MC/quality/20260728-220908430-recovery-context/evaluator-work-order.json"
    - ".agentplane/tasks/202607282157-FT85MC/quality/20260728-220908430-recovery-context/quality-report.json"
    - ".agentplane/tasks/202607282157-FT85MC/quality/20260728-220908430-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202607282157-FT85MC/quality/20260728-220908430-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202607282157-FT85MC/quality/20260728-220908430-recovery-context/evaluator-result.json"
    - ".agentplane/tasks/202607282157-FT85MC/quality/20260728-220908430-recovery-context/evaluator-follow-up.json"
    - ".agentplane/tasks/202607282157-FT85MC/README.md"
    - ".agentplane/tasks/202607282157-FT85MC/quality/20260728-220908430-recovery-context/evaluator-diff.patch"
    - ".agentplane/tasks/202607282157-FT85MC/quality/20260728-220908430-recovery-context/evaluator-observed-checks.json"
    - ".agentplane/tasks/202607282157-FT85MC/quality/20260728-220908430-recovery-context/evaluator-blueprint.json"
    - ".agentplane/policy/dod.code.md"
    - ".agentplane/policy/dod.core.md"
    - ".agentplane/policy/security.must.md"
    - ".agentplane/policy/workflow.branch_pr.md"
  findings:
    - "The frozen review contains no durable verification records: verification_records and runner_history are empty, while the only check evidence is a narrative verification note."
commit:
  hash: "fae38597465dbcea157645ec28f47ea3564c1481"
  message: "🐛 FT85MC code: preserve direct evaluator fallback"
comments:
  -
    author: "ORCHESTRATOR"
    body: "Start: isolate the evaluator evidence contract so quality review always receives the complete branch change and concrete verification evidence."
  -
    author: "CODER"
    body: "Implementation committed: complete evaluator branch diff freezing, explicit diff base provenance, and regression coverage are ready for independent verification."
  -
    author: "CODER"
    body: "Implementation amended: direct-mode single-commit fallback remains explicit while branch_pr review stays fail-closed without a resolvable base."
events:
  -
    type: "status"
    at: "2026-07-28T21:58:01.832Z"
    author: "ORCHESTRATOR"
    from: "TODO"
    to: "DOING"
    note: "Start: isolate the evaluator evidence contract so quality review always receives the complete branch change and concrete verification evidence."
  -
    type: "status"
    at: "2026-07-28T22:06:59.963Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: complete evaluator branch diff freezing, explicit diff base provenance, and regression coverage are ready for independent verification."
  -
    type: "status"
    at: "2026-07-28T22:08:52.841Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Implementation amended: direct-mode single-commit fallback remains explicit while branch_pr review stays fail-closed without a resolvable base."
  -
    type: "verify"
    at: "2026-07-28T22:08:53.597Z"
    author: "TESTER"
    state: "ok"
    note: "Focused evaluator evidence regression tests (17), Prettier, ESLint, typecheck, policy routing, and doctor passed. The work order now freezes the merge-base-to-target diff with base provenance; direct root/single-commit behavior and missing branch_pr base failure are covered."
doc_version: 3
doc_updated_at: "2026-07-28T22:08:54.276Z"
doc_updated_by: "CODER"
description: "RF-QUALITY: evaluator review must freeze the complete task branch diff against its merge base, rather than only git show of the latest implementation commit. Include durable, machine-readable verification record evidence so EVALUATOR can assess the entire approved change and required checks without relying on narrative summaries. Keep the change generic, fail closed when the base cannot be resolved, and preserve no-change behavior."
sections:
  Summary: |-
    Freeze complete branch evidence for evaluator review

    RF-QUALITY: evaluator review must freeze the complete task branch diff against its merge base, rather than only git show of the latest implementation commit. Include durable, machine-readable verification record evidence so EVALUATOR can assess the entire approved change and required checks without relying on narrative summaries. Keep the change generic, fail closed when the base cannot be resolved, and preserve no-change behavior.
  Scope: |-
    - In scope: RF-QUALITY: evaluator review must freeze the complete task branch diff against its merge base, rather than only git show of the latest implementation commit. Include durable, machine-readable verification record evidence so EVALUATOR can assess the entire approved change and required checks without relying on narrative summaries. Keep the change generic, fail closed when the base cannot be resolved, and preserve no-change behavior.
    - Out of scope: unrelated refactors not required for "Freeze complete branch evidence for evaluator review".
  Plan: "1. Reproduce the evaluator evidence gap using a multi-commit branch and identify the authoritative merge base for a branch_pr task. 2. Replace one-commit snapshotting with a bounded full branch patch from that merge base to the evaluated SHA, including binary/rename-safe content and a fail-closed error if base resolution is unavailable. 3. Freeze machine-readable verification records in the same work order and cover their discovery. 4. Add focused regression tests for complete multi-commit evidence, no-change handling, and base-resolution failure. 5. Run focused tests, formatting, typecheck, policy routing, and an independent evaluator review before PR integration."
  Verify Steps: |-
    1. Create a multi-commit fixture and prepare an evaluator work order. Expected: the frozen actual diff includes every change from the merge base through the evaluated SHA, and the work order records that base SHA.
    2. Prepare a no-work-unit review and a missing-base case. Expected: no-work-unit output remains explicit; unresolved base references fail closed with E_VALIDATION.
    3. Run focused evaluator tests, formatting, typecheck, policy routing, and doctor. Expected: all pass and their task verification records are frozen in the final evaluator work order.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-07-28T22:08:53.597Z — VERIFY — ok

    By: TESTER

    Note: Focused evaluator evidence regression tests (17), Prettier, ESLint, typecheck, policy routing, and doctor passed. The work order now freezes the merge-base-to-target diff with base provenance; direct root/single-commit behavior and missing branch_pr base failure are covered.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-28T22:08:52.841Z, excerpt_hash=sha256:6799a97240ce9375d02df78c2da6147825fb74355e8ef7bc0a4b06f89aef08bb

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/inc-20260727-main-lane.prxk2f/repo/.agentplane/worktrees/202607282157-FT85MC-freeze-full-evaluator-evidence/.agentplane/tasks/202607282157-FT85MC/blueprint/resolved-snapshot.json
    - old_digest: a73d05fa92d5a843c8e92a74272171e8869d1073f4e8fbb1a4323324ddba0ad9
    - current_digest: a73d05fa92d5a843c8e92a74272171e8869d1073f4e8fbb1a4323324ddba0ad9
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607282157-FT85MC

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202607282157-FT85MC
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
    - Observation: All three task-specific Verify Steps passed with 17 focused tests and static checks.
      Impact: EVALUATOR receives complete branch evidence and machine-readable verification records instead of only the final commit delta.
      Resolution: Use the recorded verification artifacts as frozen evidence for the independent evaluator episode.
extensions:
  workflow_route_baseline:
    start_head_sha: "7f44e71fa8dbe12987744e4442ba0110dc150090"
    version: 1
id_source: "generated"
---
## Summary

Freeze complete branch evidence for evaluator review

RF-QUALITY: evaluator review must freeze the complete task branch diff against its merge base, rather than only git show of the latest implementation commit. Include durable, machine-readable verification record evidence so EVALUATOR can assess the entire approved change and required checks without relying on narrative summaries. Keep the change generic, fail closed when the base cannot be resolved, and preserve no-change behavior.

## Scope

- In scope: RF-QUALITY: evaluator review must freeze the complete task branch diff against its merge base, rather than only git show of the latest implementation commit. Include durable, machine-readable verification record evidence so EVALUATOR can assess the entire approved change and required checks without relying on narrative summaries. Keep the change generic, fail closed when the base cannot be resolved, and preserve no-change behavior.
- Out of scope: unrelated refactors not required for "Freeze complete branch evidence for evaluator review".

## Plan

1. Reproduce the evaluator evidence gap using a multi-commit branch and identify the authoritative merge base for a branch_pr task. 2. Replace one-commit snapshotting with a bounded full branch patch from that merge base to the evaluated SHA, including binary/rename-safe content and a fail-closed error if base resolution is unavailable. 3. Freeze machine-readable verification records in the same work order and cover their discovery. 4. Add focused regression tests for complete multi-commit evidence, no-change handling, and base-resolution failure. 5. Run focused tests, formatting, typecheck, policy routing, and an independent evaluator review before PR integration.

## Verify Steps

1. Create a multi-commit fixture and prepare an evaluator work order. Expected: the frozen actual diff includes every change from the merge base through the evaluated SHA, and the work order records that base SHA.
2. Prepare a no-work-unit review and a missing-base case. Expected: no-work-unit output remains explicit; unresolved base references fail closed with E_VALIDATION.
3. Run focused evaluator tests, formatting, typecheck, policy routing, and doctor. Expected: all pass and their task verification records are frozen in the final evaluator work order.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-07-28T22:08:53.597Z — VERIFY — ok

By: TESTER

Note: Focused evaluator evidence regression tests (17), Prettier, ESLint, typecheck, policy routing, and doctor passed. The work order now freezes the merge-base-to-target diff with base provenance; direct root/single-commit behavior and missing branch_pr base failure are covered.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-28T22:08:52.841Z, excerpt_hash=sha256:6799a97240ce9375d02df78c2da6147825fb74355e8ef7bc0a4b06f89aef08bb

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/inc-20260727-main-lane.prxk2f/repo/.agentplane/worktrees/202607282157-FT85MC-freeze-full-evaluator-evidence/.agentplane/tasks/202607282157-FT85MC/blueprint/resolved-snapshot.json
- old_digest: a73d05fa92d5a843c8e92a74272171e8869d1073f4e8fbb1a4323324ddba0ad9
- current_digest: a73d05fa92d5a843c8e92a74272171e8869d1073f4e8fbb1a4323324ddba0ad9
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607282157-FT85MC

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202607282157-FT85MC
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

- Observation: All three task-specific Verify Steps passed with 17 focused tests and static checks.
  Impact: EVALUATOR receives complete branch evidence and machine-readable verification records instead of only the final commit delta.
  Resolution: Use the recorded verification artifacts as frozen evidence for the independent evaluator episode.
