---
id: "202605210819-HMKXDR"
title: "Default context init to maximum assimilation"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 4
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "context"
  - "init"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-21T08:19:56.298Z"
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
    body: "Start: Implement the approved context init UX change in the task worktree, keeping legacy option code available while defaulting interactive init to maximum-assimilation and adding the context-layer post-init commit behavior."
events:
  -
    type: "status"
    at: "2026-05-21T08:20:09.870Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Implement the approved context init UX change in the task worktree, keeping legacy option code available while defaulting interactive init to maximum-assimilation and adding the context-layer post-init commit behavior."
doc_version: 3
doc_updated_at: "2026-05-21T08:20:09.870Z"
doc_updated_by: "CODER"
description: "Temporarily hide interactive context init mode choices so default init uses maximum-assimilation without asking, while preserving the option code, and add a context-layer commit after initialization."
sections:
  Summary: |-
    Default context init to maximum assimilation

    Temporarily hide interactive context init mode choices so default init uses maximum-assimilation without asking, while preserving the option code, and add a context-layer commit after initialization.
  Scope: |-
    - In scope: Temporarily hide interactive context init mode choices so default init uses maximum-assimilation without asking, while preserving the option code, and add a context-layer commit after initialization.
    - Out of scope: unrelated refactors not required for "Default context init to maximum assimilation".
  Plan: |-
    1. Inspect live context init implementation and tests.
    2. Preserve existing option/profile code but bypass the TTY question when no profile is provided, defaulting to maximum-assimilation.
    3. Add the context-layer post-init commit behavior analogous to agentplane init, with a context-specific commit message.
    4. Update targeted tests/docs generated surfaces only if command help or observable behavior changes.
    5. Verify with task verify-show, focused context init tests, routing check, and doctor where relevant.
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

Default context init to maximum assimilation

Temporarily hide interactive context init mode choices so default init uses maximum-assimilation without asking, while preserving the option code, and add a context-layer commit after initialization.

## Scope

- In scope: Temporarily hide interactive context init mode choices so default init uses maximum-assimilation without asking, while preserving the option code, and add a context-layer commit after initialization.
- Out of scope: unrelated refactors not required for "Default context init to maximum assimilation".

## Plan

1. Inspect live context init implementation and tests.
2. Preserve existing option/profile code but bypass the TTY question when no profile is provided, defaulting to maximum-assimilation.
3. Add the context-layer post-init commit behavior analogous to agentplane init, with a context-specific commit message.
4. Update targeted tests/docs generated surfaces only if command help or observable behavior changes.
5. Verify with task verify-show, focused context init tests, routing check, and doctor where relevant.

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
