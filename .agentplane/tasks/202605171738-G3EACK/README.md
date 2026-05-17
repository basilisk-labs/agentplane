---
id: "202605171738-G3EACK"
title: "Gate framework-only policy and dev CLI commands"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 4
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-17T17:38:24.422Z"
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
    body: "Start: implementing framework-only policy and dev CLI command gates in the dedicated branch_pr worktree, with focused tests for prompt-module filtering and command dispatch behavior."
events:
  -
    type: "status"
    at: "2026-05-17T17:38:49.601Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implementing framework-only policy and dev CLI command gates in the dedicated branch_pr worktree, with focused tests for prompt-module filtering and command dispatch behavior."
doc_version: 3
doc_updated_at: "2026-05-17T17:38:49.601Z"
doc_updated_by: "CODER"
description: "Add framework-checkout-only policy loading and enforce framework dev CLI commands so they are available only inside AgentPlane framework checkouts, including direct repo-local CLI runs."
sections:
  Summary: |-
    Gate framework-only policy and dev CLI commands

    Add framework-checkout-only policy loading and enforce framework dev CLI commands so they are available only inside AgentPlane framework checkouts, including direct repo-local CLI runs.
  Scope: |-
    - In scope: Add framework-checkout-only policy loading and enforce framework dev CLI commands so they are available only inside AgentPlane framework checkouts, including direct repo-local CLI runs.
    - Out of scope: unrelated refactors not required for "Gate framework-only policy and dev CLI commands".
  Plan: "Implement a framework-only development surface: (1) add a bundled framework.dev policy module with repo_types=[framework] so it compiles only for AgentPlane framework checkouts; (2) propagate framework repo_type into init/recipe prompt graph compilation where applicable without polluting normal user repositories; (3) enforce framework CLI command dispatch so surface=framework commands fail outside framework checkout while remaining available through repo-local and handoff runs inside the framework repo; (4) add focused tests for policy filtering, help visibility, dispatch denial, and direct repo-local invocation semantics."
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

Gate framework-only policy and dev CLI commands

Add framework-checkout-only policy loading and enforce framework dev CLI commands so they are available only inside AgentPlane framework checkouts, including direct repo-local CLI runs.

## Scope

- In scope: Add framework-checkout-only policy loading and enforce framework dev CLI commands so they are available only inside AgentPlane framework checkouts, including direct repo-local CLI runs.
- Out of scope: unrelated refactors not required for "Gate framework-only policy and dev CLI commands".

## Plan

Implement a framework-only development surface: (1) add a bundled framework.dev policy module with repo_types=[framework] so it compiles only for AgentPlane framework checkouts; (2) propagate framework repo_type into init/recipe prompt graph compilation where applicable without polluting normal user repositories; (3) enforce framework CLI command dispatch so surface=framework commands fail outside framework checkout while remaining available through repo-local and handoff runs inside the framework repo; (4) add focused tests for policy filtering, help visibility, dispatch denial, and direct repo-local invocation semantics.

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
