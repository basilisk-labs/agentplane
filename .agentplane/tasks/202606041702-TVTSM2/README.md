---
id: "202606041702-TVTSM2"
title: "Add decision context surfaces for agents"
result_summary: "No-op closure recorded."
risk_level: "low"
breaking: false
status: "DONE"
priority: "med"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on: []
tags:
  - "cli"
  - "code"
  - "routing"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-06-04T17:02:24.951Z"
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
    body: "Start: Add typed decision context to agent-facing CLI surfaces so execution, diagnosis, stale state, provider action, and stop conditions are explicit."
  -
    author: "ORCHESTRATOR"
    body: |-
      Verified: no implementation changes were required; closure is recorded as no-op bookkeeping.

      Note: Stale active bookkeeping record had no implementation branch, no commits, and no local README; completed prompt/route work superseded it.
events:
  -
    type: "status"
    at: "2026-06-04T17:02:25.218Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Add typed decision context to agent-facing CLI surfaces so execution, diagnosis, stale state, provider action, and stop conditions are explicit."
  -
    type: "status"
    at: "2026-06-05T07:07:36.263Z"
    author: "ORCHESTRATOR"
    from: "DOING"
    to: "DONE"
    note: |-
      Verified: no implementation changes were required; closure is recorded as no-op bookkeeping.

      Note: Stale active bookkeeping record had no implementation branch, no commits, and no local README; completed prompt/route work superseded it.
doc_version: 3
doc_updated_at: "2026-06-05T07:07:36.263Z"
doc_updated_by: "ORCHESTRATOR"
description: "Add typed agent-facing context to route, task brief/status, verification, PR, runner, and diagnostic outputs so agents can distinguish execution, diagnosis, stale state, provider action, and stop conditions without inferring from prose."
sections:
  Summary: |-
    Add decision context surfaces for agents

    Add typed agent-facing context to route, task brief/status, verification, PR, runner, and diagnostic outputs so agents can distinguish execution, diagnosis, stale state, provider action, and stop conditions without inferring from prose.
  Scope: |-
    - In scope: Add typed agent-facing context to route, task brief/status, verification, PR, runner, and diagnostic outputs so agents can distinguish execution, diagnosis, stale state, provider action, and stop conditions without inferring from prose.
    - Out of scope: unrelated refactors not required for "Add decision context surfaces for agents".
  Plan: "Implement typed decision-context surfaces without changing lifecycle semantics: inspect existing route/brief/status/runner/verify/error outputs; add reusable context derivation for action/source/freshness/repeat/fallback signals; expose it in JSON and human output; classify runner/hook/stale-artifact ambiguity with safe diagnostic commands; add focused regression tests; record verification and residual risks."
  Verify Steps: |-
    PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
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

Add decision context surfaces for agents

Add typed agent-facing context to route, task brief/status, verification, PR, runner, and diagnostic outputs so agents can distinguish execution, diagnosis, stale state, provider action, and stop conditions without inferring from prose.

## Scope

- In scope: Add typed agent-facing context to route, task brief/status, verification, PR, runner, and diagnostic outputs so agents can distinguish execution, diagnosis, stale state, provider action, and stop conditions without inferring from prose.
- Out of scope: unrelated refactors not required for "Add decision context surfaces for agents".

## Plan

Implement typed decision-context surfaces without changing lifecycle semantics: inspect existing route/brief/status/runner/verify/error outputs; add reusable context derivation for action/source/freshness/repeat/fallback signals; expose it in JSON and human output; classify runner/hook/stale-artifact ambiguity with safe diagnostic commands; add focused regression tests; record verification and residual risks.

## Verify Steps

PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
