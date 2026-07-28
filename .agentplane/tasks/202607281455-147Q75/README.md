---
id: "202607281455-147Q75"
title: "Repair evaluator response schema for Codex structured output"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 4
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
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: repair the evaluator structured-output schema compatibility defect and add a focused provider-schema regression without changing evaluator review semantics."
events:
  -
    type: "status"
    at: "2026-07-28T14:56:22.566Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: repair the evaluator structured-output schema compatibility defect and add a focused provider-schema regression without changing evaluator review semantics."
doc_version: 3
doc_updated_at: "2026-07-28T14:56:22.566Z"
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
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
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
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
