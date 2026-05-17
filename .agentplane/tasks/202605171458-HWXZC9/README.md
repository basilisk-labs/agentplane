---
id: "202605171458-HWXZC9"
title: "Fix context init starter wiki lint"
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
task_kind: "code"
mutation_scope: "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-17T14:59:02.143Z"
  updated_by: "ORCHESTRATOR"
  note: "Approved per user request to verify and fix context init starter wiki lint failure in a separate task."
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
    body: "Start: Fix context init starter wiki lint failure in a manually isolated worktree because ap work start is blocked by stale and conflicted base checkout state."
events:
  -
    type: "status"
    at: "2026-05-17T14:59:33.706Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Fix context init starter wiki lint failure in a manually isolated worktree because ap work start is blocked by stale and conflicted base checkout state."
doc_version: 3
doc_updated_at: "2026-05-17T14:59:33.706Z"
doc_updated_by: "CODER"
description: "Ensure context init generated starter wiki pages satisfy context wiki lint frontmatter requirements, including adaptive profile starter indexes and AGENTS page."
sections:
  Summary: |-
    Fix context init starter wiki lint
    
    Ensure context init generated starter wiki pages satisfy context wiki lint frontmatter requirements, including adaptive profile starter indexes and AGENTS page.
  Scope: |-
    - In scope: Ensure context init generated starter wiki pages satisfy context wiki lint frontmatter requirements, including adaptive profile starter indexes and AGENTS page.
    - Out of scope: unrelated refactors not required for "Fix context init starter wiki lint".
  Plan: "1. Reproduce the bug in an isolated temporary project: context init --profile adaptive followed by full context wiki lint should currently fail on generated starter wiki files. 2. Update the context init starter wiki generation so AGENTS.md and index/category starter pages include valid AgentPlane wiki frontmatter/source-link hygiene compatible with context wiki lint. 3. Add or update focused regression tests to cover fresh adaptive init plus full wiki lint. 4. Run focused context tests, the reproduction command, git diff --check, and policy routing."
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

Fix context init starter wiki lint

Ensure context init generated starter wiki pages satisfy context wiki lint frontmatter requirements, including adaptive profile starter indexes and AGENTS page.

## Scope

- In scope: Ensure context init generated starter wiki pages satisfy context wiki lint frontmatter requirements, including adaptive profile starter indexes and AGENTS page.
- Out of scope: unrelated refactors not required for "Fix context init starter wiki lint".

## Plan

1. Reproduce the bug in an isolated temporary project: context init --profile adaptive followed by full context wiki lint should currently fail on generated starter wiki files. 2. Update the context init starter wiki generation so AGENTS.md and index/category starter pages include valid AgentPlane wiki frontmatter/source-link hygiene compatible with context wiki lint. 3. Add or update focused regression tests to cover fresh adaptive init plus full wiki lint. 4. Run focused context tests, the reproduction command, git diff --check, and policy routing.

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
