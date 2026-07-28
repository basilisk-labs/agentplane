---
id: "202607281455-147Q75"
title: "Repair evaluator response schema for Codex structured output"
result_summary: "pre-merge closure"
status: "DONE"
priority: "high"
owner: "CODER"
revision: 10
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "evaluator"
  - "provider"
  - "regression"
  - "release-blocker"
  - "v0.7"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "code.branch_pr"
verify:
  - "bun run format:changed"
  - "bun run typecheck"
  - "bunx vitest run packages/agentplane/src/commands/evaluator/evaluator-episode.calibration.test.ts packages/agentplane/src/commands/evaluator/evaluator-execute.command.test.ts"
  - "node .agentplane/policy/check-routing.mjs"
plan_approval:
  state: "approved"
  updated_at: "2026-07-28T14:56:09.876Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-07-28T15:03:08.775Z"
  updated_by: "TESTER"
  note: "Verified evaluator schema compatibility: all structured-output properties are required with nullable optional metadata, nulls normalize before strict SGR validation, and the provider boundary remains read-only. Checks passed: focused evaluator suites (14), typecheck, format, routing validation."
  attempts: 0
quality_review:
  state: "pass"
  provenance: "human_supplied"
  updated_at: "2026-07-28T15:36:51.396Z"
  updated_by: "HUMAN"
  note: "Independent review of the CI recovery patch: the null-normalization traversal now treats external arrays as unknown values before record narrowing, preserving the schema compatibility behavior while satisfying strict TypeScript safety."
  evaluated_sha: "5fe3f261279c62fbcda629d4ee6cb539fdc956e1"
  blueprint_digest: "502c33075284ce6f9aa46423f98024e5cae094e841cac21d82f799f5898e4d05"
  evidence_refs:
    - ".agentplane/tasks/202607281455-147Q75/quality/20260728-153650388-recovery-context/evaluator-work-order.json"
    - ".agentplane/tasks/202607281455-147Q75/quality/20260728-153650388-recovery-context/quality-report.json"
    - ".agentplane/tasks/202607281455-147Q75/quality/20260728-153650388-recovery-context/evaluator-prompt.md"
    - ".agentplane/tasks/202607281455-147Q75/quality/20260728-153650388-recovery-context/evaluator-opinion.md"
    - ".agentplane/tasks/202607281455-147Q75/README.md"
    - ".agentplane/tasks/202607281455-147Q75/quality/20260728-153650388-recovery-context/evaluator-diff.patch"
    - ".agentplane/tasks/202607281455-147Q75/quality/20260728-153650388-recovery-context/evaluator-observed-checks.json"
    - ".agentplane/tasks/202607281455-147Q75/quality/20260728-153650388-recovery-context/evaluator-blueprint.json"
    - ".agentplane/policy/dod.code.md"
    - ".agentplane/policy/dod.core.md"
    - ".agentplane/policy/security.must.md"
    - ".agentplane/policy/workflow.branch_pr.md"
    - "packages/agentplane/src/commands/evaluator/evaluator-review-usecase.ts"
    - "5fe3f261279c62fbcda629d4ee6cb539fdc956e1"
  findings:
    - "The normalization path preserves its read-only semantics: only null placeholders are removed from copied records, while non-record and array values remain opaque unknown values."
commit:
  hash: "2a83376fe1a6b69d98ece871ecd2b0c200a204ba"
  message: "Record evaluator schema implementation"
comments:
  -
    author: "CODER"
    body: "Start: repair the evaluator structured-output schema compatibility defect and add a focused provider-schema regression without changing evaluator review semantics."
  -
    author: "CODER"
    body: "Implemented: Codex-compatible evaluator output schema now requires nullable optional fields, the strict handoff normalizes nulls, and regression coverage proves the provider contract."
  -
    author: "CODER"
    body: "Verified: pre-merge closure packet is ready for the task PR."
events:
  -
    type: "status"
    at: "2026-07-28T14:56:22.566Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: repair the evaluator structured-output schema compatibility defect and add a focused provider-schema regression without changing evaluator review semantics."
  -
    type: "status"
    at: "2026-07-28T15:02:06.041Z"
    author: "CODER"
    from: "DOING"
    to: "DOING"
    note: "Implemented: Codex-compatible evaluator output schema now requires nullable optional fields, the strict handoff normalizes nulls, and regression coverage proves the provider contract."
  -
    type: "verify"
    at: "2026-07-28T15:03:08.775Z"
    author: "TESTER"
    state: "ok"
    note: "Verified evaluator schema compatibility: all structured-output properties are required with nullable optional metadata, nulls normalize before strict SGR validation, and the provider boundary remains read-only. Checks passed: focused evaluator suites (14), typecheck, format, routing validation."
  -
    type: "status"
    at: "2026-07-28T15:11:53.640Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: pre-merge closure packet is ready for the task PR."
doc_version: 3
doc_updated_at: "2026-07-28T15:11:53.641Z"
doc_updated_by: "CODER"
description: "Release-blocking follow-up: make the evaluator typed-result JSON Schema compatible with the current Codex structured-output validator, preserve optional evidence fields through explicit nullable values, and add a regression test proving evaluator execution reaches a typed result instead of failing before the provider turn."
sections:
  Summary: |-
    Repair evaluator response schema for Codex structured output

    Release-blocking follow-up: make the evaluator typed-result JSON Schema compatible with the current Codex structured-output validator, preserve optional evidence fields through explicit nullable values, and add a regression test proving evaluator execution reaches a typed result instead of failing before the provider turn.
  Scope: |-
    - In scope: Release-blocking follow-up: make the evaluator typed-result JSON Schema compatible with the current Codex structured-output validator, preserve optional evidence fields through explicit nullable values, and add a regression test proving evaluator execution reaches a typed result instead of failing before the provider turn.
    - Out of scope: unrelated refactors not required for "Repair evaluator response schema for Codex structured output".
  Plan: "1. Change only the evaluator structured-output schema and its focused tests so Codex accepts the response format while the existing strict result validator keeps evidence fields semantically optional. 2. Add a regression that asserts the nested evidence reference schema is OpenAI-compatible and preserves nullable optional fields. 3. Run the declared evaluator tests, typecheck, format:changed, and routing validation. 4. Publish the task branch PR; record TESTER verification, EVALUATOR review, hosted checks, and integration before resuming task 202607221850-8HBF4J."
  Verify Steps: |-
    PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

    1. Run `bunx vitest run packages/agentplane/src/commands/evaluator/evaluator-episode.calibration.test.ts packages/agentplane/src/commands/evaluator/evaluator-execute.command.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
    3. Run `bun run format:changed`. Expected: it succeeds and confirms the requested outcome for this task.
    4. Run `node .agentplane/policy/check-routing.mjs`. Expected: it succeeds and confirms the requested outcome for this task.
    5. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    6. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-07-28T15:03:08.775Z — VERIFY — ok

    By: TESTER

    Note: Verified evaluator schema compatibility: all structured-output properties are required with nullable optional metadata, nulls normalize before strict SGR validation, and the provider boundary remains read-only. Checks passed: focused evaluator suites (14), typecheck, format, routing validation.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-28T15:02:06.041Z, excerpt_hash=sha256:0f02b6024d3b7dd2a22a439db2952a208adb7ee3641e06cd4aebec162b19ed27

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/inc-20260727-main-lane.prxk2f/repo/.agentplane/worktrees/202607281455-147Q75-repair-evaluator-response-schema/.agentplane/tasks/202607281455-147Q75/blueprint/resolved-snapshot.json
    - old_digest: 502c33075284ce6f9aa46423f98024e5cae094e841cac21d82f799f5898e4d05
    - current_digest: 502c33075284ce6f9aa46423f98024e5cae094e841cac21d82f799f5898e4d05
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202607281455-147Q75

    DecisionContextRef:
    - operator_action: stop
    - can_execute_now: false
    - safe_command: none
    - diagnostic_command: agentplane task verify-show 202607281455-147Q75
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
    - Observation: The previously rejected response format now has an OpenAI-compatible required/nullable shape.
      Impact: Codex can begin the EVALUATOR turn instead of failing schema validation before review.
      Resolution: Recorded local verification; the subsequent independent EVALUATOR episode will prove the live provider path.
extensions:
  workflow_route_baseline:
    start_head_sha: "322533fd11f322aadf4e77a44d4343c0c6c19341"
    version: 1
id_source: "generated"
---
## Summary

Repair evaluator response schema for Codex structured output

Release-blocking follow-up: make the evaluator typed-result JSON Schema compatible with the current Codex structured-output validator, preserve optional evidence fields through explicit nullable values, and add a regression test proving evaluator execution reaches a typed result instead of failing before the provider turn.

## Scope

- In scope: Release-blocking follow-up: make the evaluator typed-result JSON Schema compatible with the current Codex structured-output validator, preserve optional evidence fields through explicit nullable values, and add a regression test proving evaluator execution reaches a typed result instead of failing before the provider turn.
- Out of scope: unrelated refactors not required for "Repair evaluator response schema for Codex structured output".

## Plan

1. Change only the evaluator structured-output schema and its focused tests so Codex accepts the response format while the existing strict result validator keeps evidence fields semantically optional. 2. Add a regression that asserts the nested evidence reference schema is OpenAI-compatible and preserves nullable optional fields. 3. Run the declared evaluator tests, typecheck, format:changed, and routing validation. 4. Publish the task branch PR; record TESTER verification, EVALUATOR review, hosted checks, and integration before resuming task 202607221850-8HBF4J.

## Verify Steps

PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

1. Run `bunx vitest run packages/agentplane/src/commands/evaluator/evaluator-episode.calibration.test.ts packages/agentplane/src/commands/evaluator/evaluator-execute.command.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
2. Run `bun run typecheck`. Expected: it succeeds and confirms the requested outcome for this task.
3. Run `bun run format:changed`. Expected: it succeeds and confirms the requested outcome for this task.
4. Run `node .agentplane/policy/check-routing.mjs`. Expected: it succeeds and confirms the requested outcome for this task.
5. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
6. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-07-28T15:03:08.775Z — VERIFY — ok

By: TESTER

Note: Verified evaluator schema compatibility: all structured-output properties are required with nullable optional metadata, nulls normalize before strict SGR validation, and the provider boundary remains read-only. Checks passed: focused evaluator suites (14), typecheck, format, routing validation.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-07-28T15:02:06.041Z, excerpt_hash=sha256:0f02b6024d3b7dd2a22a439db2952a208adb7ee3641e06cd4aebec162b19ed27

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/tmp/inc-20260727-main-lane.prxk2f/repo/.agentplane/worktrees/202607281455-147Q75-repair-evaluator-response-schema/.agentplane/tasks/202607281455-147Q75/blueprint/resolved-snapshot.json
- old_digest: 502c33075284ce6f9aa46423f98024e5cae094e841cac21d82f799f5898e4d05
- current_digest: 502c33075284ce6f9aa46423f98024e5cae094e841cac21d82f799f5898e4d05
- route_changed: no
- safe_command: agentplane blueprint snapshot 202607281455-147Q75

DecisionContextRef:
- operator_action: stop
- can_execute_now: false
- safe_command: none
- diagnostic_command: agentplane task verify-show 202607281455-147Q75
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

- Observation: The previously rejected response format now has an OpenAI-compatible required/nullable shape.
  Impact: Codex can begin the EVALUATOR turn instead of failing schema validation before review.
  Resolution: Recorded local verification; the subsequent independent EVALUATOR episode will prove the live provider path.
