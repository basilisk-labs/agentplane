---
id: "202605311543-3H1G55"
title: "Use body files for PR publication"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 4
origin:
  system: "manual"
depends_on: []
tags:
  - "cli"
  - "github"
  - "safety"
task_kind: "code"
mutation_scope: "code"
verify:
  - "bun run test -- pr"
  - "bun run verify:cli"
plan_approval:
  state: "approved"
  updated_at: "2026-05-31T15:52:50.221Z"
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
    body: "Start: implementing the approved release recovery CLI and prompt-policy improvement batch in the primary KS7B7N branch_pr worktree."
events:
  -
    type: "status"
    at: "2026-05-31T15:53:31.790Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: implementing the approved release recovery CLI and prompt-policy improvement batch in the primary KS7B7N branch_pr worktree."
doc_version: 3
doc_updated_at: "2026-05-31T15:53:31.790Z"
doc_updated_by: "CODER"
description: "Update ap pr open/update to generate and pass markdown PR bodies via temporary body files, preventing shell execution of markdown backticks and other inline quoting hazards."
sections:
  Summary: |-
    Use body files for PR publication

    Update ap pr open/update to generate and pass markdown PR bodies via temporary body files, preventing shell execution of markdown backticks and other inline quoting hazards.
  Scope: |-
    - In scope: Update ap pr open/update to generate and pass markdown PR bodies via temporary body files, preventing shell execution of markdown backticks and other inline quoting hazards.
    - Out of scope: unrelated refactors not required for "Use body files for PR publication".
  Plan: |-
    1. Find PR publication paths that pass markdown bodies inline to shell commands.
    2. Route generated PR bodies through body files or structured API calls.
    3. Add tests covering markdown backticks and command-like text in PR bodies.
    4. Verify ap pr open/update behavior and GitHub publication safety.
  Verify Steps: |-
    PLANNER fallback scaffold for "Use body files for PR publication". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Use body files for PR publication". Expected: the visible result matches ## Summary and stays inside approved scope.
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

Use body files for PR publication

Update ap pr open/update to generate and pass markdown PR bodies via temporary body files, preventing shell execution of markdown backticks and other inline quoting hazards.

## Scope

- In scope: Update ap pr open/update to generate and pass markdown PR bodies via temporary body files, preventing shell execution of markdown backticks and other inline quoting hazards.
- Out of scope: unrelated refactors not required for "Use body files for PR publication".

## Plan

1. Find PR publication paths that pass markdown bodies inline to shell commands.
2. Route generated PR bodies through body files or structured API calls.
3. Add tests covering markdown backticks and command-like text in PR bodies.
4. Verify ap pr open/update behavior and GitHub publication safety.

## Verify Steps

PLANNER fallback scaffold for "Use body files for PR publication". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Use body files for PR publication". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
