---
id: "202608111922-W4ZM7J"
title: "Validate declared checks with the supervised execution grammar"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "lifecycle"
  - "verifier"
verify:
  - "bun test packages/agentplane/src/commands/task/direct-task-verification.test.ts packages/agentplane/src/cli/run-cli.core.tasks.create.test.ts packages/agentplane/src/commands/task/update.unit.test.ts"
plan_approval:
  state: "approved"
  updated_at: "2026-08-11T19:23:44.124Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
  attempts: 0
execution_route:
  frozen: true
  reason_codes:
    - "repository_branch_pr_floor"
  repository_mode: "branch_pr"
  requested_mode: "branch_pr"
  schema_version: 1
  selected_mode: "branch_pr"
commit:
  hash: "240a672c22598edc1dc7cacdd42421f73d01e194"
  message: "🚧 W4ZM7J task: apply external agent result"
comments:
  -
    author: "CODER"
    body: "Start: continue branch_pr task in the dedicated task worktree."
  -
    author: "SUPERVISOR"
    body: "Implementation committed: 240a672c2259. CLI accepted one state-bound external-agent semantic result."
events:
  -
    type: "status"
    at: "2026-08-11T19:27:21.059Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
  -
    type: "status"
    at: "2026-08-11T20:17:36.989Z"
    author: "SUPERVISOR"
    from: "DOING"
    to: "DOING"
    note: "Implementation committed: 240a672c2259. CLI accepted one state-bound external-agent semantic result."
    commit: "240a672c22598edc1dc7cacdd42421f73d01e194"
doc_version: 3
doc_updated_at: "2026-08-11T20:17:36.989Z"
doc_updated_by: "SUPERVISOR"
description: "Reject unsupported verification commands at every task mutation boundary using the same deterministic parser later used by automatic TESTER execution. Return an actionable error before persisting task state; preserve repository-bound argv execution without shell evaluation; cover task new, add, update, derive, begin/create adapters, and the previously failing bun test path command."
sections:
  Summary: |-
    Validate declared checks with the supervised execution grammar

    Reject unsupported verification commands at every task mutation boundary using the same deterministic parser later used by automatic TESTER execution. Return an actionable error before persisting task state; preserve repository-bound argv execution without shell evaluation; cover task new, add, update, derive, begin/create adapters, and the previously failing bun test path command.
  Scope: |-
    - In scope: Reject unsupported verification commands at every task mutation boundary using the same deterministic parser later used by automatic TESTER execution. Return an actionable error before persisting task state; preserve repository-bound argv execution without shell evaluation; cover task new, add, update, derive, begin/create adapters, and the previously failing bun test path command.
    - Out of scope: unrelated refactors not required for "Validate declared checks with the supervised execution grammar".
  Plan: "1. Inventory every command that can persist or replace task verify entries and the automatic TESTER execution path. 2. Extract one deterministic, repository-bound declared-check parser and validator that returns the exact argv accepted by execution. 3. Apply that validator before writes in task new, add, update, derive, begin, and create adapters without shell evaluation. 4. Preserve supported bun test path filters, safe bun run scripts, and fixed built-in policy checks; reject unsupported or escaping arguments with an actionable validation error. 5. Add mutation-boundary tests proving invalid checks leave no task changes and the original bun test path command is accepted and executable. 6. Add parity tests proving every accepted command is parseable by supervised TESTER and every rejected command is blocked before persistence. 7. Run the focused declared-check and task mutation suites, typecheck, formatting checks, and the critical CLI route."
  Verify Steps: |-
    PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

    1. Run `bun test packages/agentplane/src/commands/task/direct-task-verification.test.ts packages/agentplane/src/cli/run-cli.core.tasks.create.test.ts packages/agentplane/src/commands/task/update.unit.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
    2. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    3. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
extensions:
  workflow_route_baseline:
    start_head_sha: "2069221001f334aa7538042998166dae60919499"
    version: 1
id_source: "generated"
---
## Summary

Validate declared checks with the supervised execution grammar

Reject unsupported verification commands at every task mutation boundary using the same deterministic parser later used by automatic TESTER execution. Return an actionable error before persisting task state; preserve repository-bound argv execution without shell evaluation; cover task new, add, update, derive, begin/create adapters, and the previously failing bun test path command.

## Scope

- In scope: Reject unsupported verification commands at every task mutation boundary using the same deterministic parser later used by automatic TESTER execution. Return an actionable error before persisting task state; preserve repository-bound argv execution without shell evaluation; cover task new, add, update, derive, begin/create adapters, and the previously failing bun test path command.
- Out of scope: unrelated refactors not required for "Validate declared checks with the supervised execution grammar".

## Plan

1. Inventory every command that can persist or replace task verify entries and the automatic TESTER execution path. 2. Extract one deterministic, repository-bound declared-check parser and validator that returns the exact argv accepted by execution. 3. Apply that validator before writes in task new, add, update, derive, begin, and create adapters without shell evaluation. 4. Preserve supported bun test path filters, safe bun run scripts, and fixed built-in policy checks; reject unsupported or escaping arguments with an actionable validation error. 5. Add mutation-boundary tests proving invalid checks leave no task changes and the original bun test path command is accepted and executable. 6. Add parity tests proving every accepted command is parseable by supervised TESTER and every rejected command is blocked before persistence. 7. Run the focused declared-check and task mutation suites, typecheck, formatting checks, and the critical CLI route.

## Verify Steps

PLANNER fallback scaffold. Replace with task-specific acceptance checks when PLANNER context is available.

1. Run `bun test packages/agentplane/src/commands/task/direct-task-verification.test.ts packages/agentplane/src/cli/run-cli.core.tasks.create.test.ts packages/agentplane/src/commands/task/update.unit.test.ts`. Expected: it succeeds and confirms the requested outcome for this task.
2. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
3. Compare the final result against the task summary and touched scope. Expected: remaining follow-up is either resolved or explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
