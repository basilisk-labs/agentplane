---
id: "202606040927-KSESDS"
title: "Clarify evaluator SHA recovery guidance"
result_summary: "No-op closure recorded."
risk_level: "low"
breaking: false
status: "DONE"
priority: "med"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "cli"
  - "code"
  - "evaluator"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-06-04T09:27:34.455Z"
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
    body: "Start: implementing focused CLI diagnostics for evaluator SHA freshness so finish recovery tells agents when to use the reviewed implementation commit instead of rerunning evaluator loops."
  -
    author: "ORCHESTRATOR"
    body: |-
      Verified: no implementation changes were required; closure is recorded as no-op bookkeeping.

      Note: Stale active bookkeeping record had no implementation branch, no commits, and no local README; release-readiness work superseded it.
events:
  -
    type: "status"
    at: "2026-06-04T09:27:44.781Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implementing focused CLI diagnostics for evaluator SHA freshness so finish recovery tells agents when to use the reviewed implementation commit instead of rerunning evaluator loops."
  -
    type: "status"
    at: "2026-06-05T07:07:36.263Z"
    author: "ORCHESTRATOR"
    from: "DOING"
    to: "DONE"
    note: |-
      Verified: no implementation changes were required; closure is recorded as no-op bookkeeping.

      Note: Stale active bookkeeping record had no implementation branch, no commits, and no local README; release-readiness work superseded it.
doc_version: 3
doc_updated_at: "2026-06-05T07:07:36.263Z"
doc_updated_by: "ORCHESTRATOR"
description: "Improve AgentPlane evaluator/finish diagnostics so agents do not loop when evaluator reviews the last implementation commit while HEAD only contains task-artifact commits."
sections:
  Summary: |-
    Clarify evaluator SHA recovery guidance

    Improve AgentPlane evaluator/finish diagnostics so agents do not loop when evaluator reviews the last implementation commit while HEAD only contains task-artifact commits.
  Scope: |-
    - In scope: Improve AgentPlane evaluator/finish diagnostics so agents do not loop when evaluator reviews the last implementation commit while HEAD only contains task-artifact commits.
    - Out of scope: unrelated refactors not required for "Clarify evaluator SHA recovery guidance".
  Plan: "1. Update evaluator run diagnostics to expose evaluated_sha, head_sha, and when HEAD is task-artifact-only so agents can stop chasing artifact commits. 2. Improve finish stale quality-review guidance to explain when reviewed SHA differs from expected SHA because the expected commit is task-artifact-only, and point to --implementation-commit/--commit usage instead of generic rerun loops. 3. Add focused tests covering evaluator SHA diagnostics and stale finish guidance, then run the relevant evaluator/finish test slices."
  Verify Steps: |-
    1. Run `bun test packages/agentplane/src/commands/evaluator/evaluator-run.command.test.ts`. Expected: evaluator run reports evaluated/head SHA context and records the last implementation SHA after task-artifact commits.
    2. Run `bun test packages/agentplane/src/commands/task/quality-review-gate.unit.test.ts`. Expected: stale quality-review failures include reviewed/expected SHA details and implementation-commit recovery guidance.
    3. Inspect the final diff for evaluator/finish diagnostics. Expected: behavior stays scoped to CLI guidance and quality-review freshness checks.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Clarify evaluator SHA recovery guidance

Improve AgentPlane evaluator/finish diagnostics so agents do not loop when evaluator reviews the last implementation commit while HEAD only contains task-artifact commits.

## Scope

- In scope: Improve AgentPlane evaluator/finish diagnostics so agents do not loop when evaluator reviews the last implementation commit while HEAD only contains task-artifact commits.
- Out of scope: unrelated refactors not required for "Clarify evaluator SHA recovery guidance".

## Plan

1. Update evaluator run diagnostics to expose evaluated_sha, head_sha, and when HEAD is task-artifact-only so agents can stop chasing artifact commits. 2. Improve finish stale quality-review guidance to explain when reviewed SHA differs from expected SHA because the expected commit is task-artifact-only, and point to --implementation-commit/--commit usage instead of generic rerun loops. 3. Add focused tests covering evaluator SHA diagnostics and stale finish guidance, then run the relevant evaluator/finish test slices.

## Verify Steps

1. Run `bun test packages/agentplane/src/commands/evaluator/evaluator-run.command.test.ts`. Expected: evaluator run reports evaluated/head SHA context and records the last implementation SHA after task-artifact commits.
2. Run `bun test packages/agentplane/src/commands/task/quality-review-gate.unit.test.ts`. Expected: stale quality-review failures include reviewed/expected SHA details and implementation-commit recovery guidance.
3. Inspect the final diff for evaluator/finish diagnostics. Expected: behavior stays scoped to CLI guidance and quality-review freshness checks.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
