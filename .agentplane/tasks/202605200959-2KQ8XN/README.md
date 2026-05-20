---
id: "202605200959-2KQ8XN"
title: "Clarify workflow state source terminology"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 4
origin:
  system: "manual"
depends_on: []
tags:
  - "ambiguity"
  - "docs"
  - "workflow"
task_kind: "docs"
mutation_scope: "docs"
blueprint_request: "docs.change"
verify:
  - "ap doctor"
  - "node .agentplane/policy/check-routing.mjs"
plan_approval:
  state: "approved"
  updated_at: "2026-05-20T09:59:58.342Z"
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
    body: "Start: Batch task for workflow source terminology clarification; implementation will be included in primary ambiguity-route-contract worktree."
events:
  -
    type: "status"
    at: "2026-05-20T10:03:23.583Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Batch task for workflow source terminology clarification; implementation will be included in primary ambiguity-route-contract worktree."
doc_version: 3
doc_updated_at: "2026-05-20T10:03:23.583Z"
doc_updated_by: "CODER"
description: "Clarify that .agentplane/WORKFLOW.md is the single repo-local workflow/config source, while ap config show is a readback and quickstart is guidance, reducing source-of-truth ambiguity for agents."
sections:
  Summary: |-
    Clarify workflow state source terminology

    Clarify that runtime config/readback is canonical workflow state and WORKFLOW.md is a managed agent-readable projection, reducing source-of-truth ambiguity for agents.
  Scope: |-
    - In scope: Clarify that runtime config/readback is canonical workflow state and WORKFLOW.md is a managed agent-readable projection, reducing source-of-truth ambiguity for agents.
    - Out of scope: unrelated refactors not required for "Clarify workflow state source terminology".
  Plan: |-
    1. Clarify the smallest safe implementation scope for: Clarify workflow state source terminology.
    2. Make the scoped change using existing project conventions.
    3. Run the task Verify Steps and record the result before finishing.
  Verify Steps: |-
    PLANNER fallback scaffold for "Clarify workflow state source terminology". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Clarify workflow state source terminology". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
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

Clarify workflow state source terminology

Clarify that runtime config/readback is canonical workflow state and WORKFLOW.md is a managed agent-readable projection, reducing source-of-truth ambiguity for agents.

## Scope

- In scope: Clarify that runtime config/readback is canonical workflow state and WORKFLOW.md is a managed agent-readable projection, reducing source-of-truth ambiguity for agents.
- Out of scope: unrelated refactors not required for "Clarify workflow state source terminology".

## Plan

1. Clarify the smallest safe implementation scope for: Clarify workflow state source terminology.
2. Make the scoped change using existing project conventions.
3. Run the task Verify Steps and record the result before finishing.

## Verify Steps

PLANNER fallback scaffold for "Clarify workflow state source terminology". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Clarify workflow state source terminology". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
