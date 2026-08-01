---
id: "202608012339-30YX9C"
title: "Allow documentation tasks to commit canonical site artifacts"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 4
origin:
  system: "manual"
depends_on: []
tags:
  - "docs"
  - "policy"
  - "v0.7"
task_kind: "code"
mutation_scope: "code"
blueprint_request: "code.branch_pr"
verify:
  - "bun run docs:site:check"
  - "bunx vitest run packages/agentplane/src/policy/rules/task-bound-mutation.test.ts"
plan_approval:
  state: "approved"
  updated_at: "2026-08-01T23:40:09.089Z"
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
    body: "Start: continue branch_pr task in the dedicated task worktree."
events:
  -
    type: "status"
    at: "2026-08-01T23:40:33.688Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: continue branch_pr task in the dedicated task worktree."
doc_version: 3
doc_updated_at: "2026-08-01T23:40:33.688Z"
doc_updated_by: "CODER"
description: "Treat Docusaurus documentation navigation and generated social-card artifacts as documentation paths so docs.change tasks can satisfy the full site gate without bypassing task-bound mutation policy."
sections:
  Summary: |-
    Allow documentation tasks to commit canonical site artifacts

    Treat Docusaurus documentation navigation and generated social-card artifacts as documentation paths so docs.change tasks can satisfy the full site gate without bypassing task-bound mutation policy.
  Scope: |-
    - In scope: Treat Docusaurus documentation navigation and generated social-card artifacts as documentation paths so docs.change tasks can satisfy the full site gate without bypassing task-bound mutation policy.
    - Out of scope: unrelated refactors not required for "Allow documentation tasks to commit canonical site artifacts".
  Plan: |-
    1. Extend docs-only path classification to the canonical Docusaurus navigation files and generated social-card artifacts.
    2. Add focused policy tests that prove docs tasks may commit those exact paths while implementation paths remain blocked.
    3. Run the focused policy test, policy routing check, and full docs site gate.
    4. Open, verify, evaluate, and integrate the protected fix before resuming the migration-guide task.
  Verify Steps: |-
    PLANNER fallback scaffold for "Allow documentation tasks to commit canonical site artifacts". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Allow documentation tasks to commit canonical site artifacts". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
extensions:
  workflow_route_baseline:
    start_head_sha: "5319bbdeecb05adc2c436e4039f5046a5bfeb89a"
    version: 1
id_source: "generated"
---
## Summary

Allow documentation tasks to commit canonical site artifacts

Treat Docusaurus documentation navigation and generated social-card artifacts as documentation paths so docs.change tasks can satisfy the full site gate without bypassing task-bound mutation policy.

## Scope

- In scope: Treat Docusaurus documentation navigation and generated social-card artifacts as documentation paths so docs.change tasks can satisfy the full site gate without bypassing task-bound mutation policy.
- Out of scope: unrelated refactors not required for "Allow documentation tasks to commit canonical site artifacts".

## Plan

1. Extend docs-only path classification to the canonical Docusaurus navigation files and generated social-card artifacts.
2. Add focused policy tests that prove docs tasks may commit those exact paths while implementation paths remain blocked.
3. Run the focused policy test, policy routing check, and full docs site gate.
4. Open, verify, evaluate, and integrate the protected fix before resuming the migration-guide task.

## Verify Steps

PLANNER fallback scaffold for "Allow documentation tasks to commit canonical site artifacts". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Allow documentation tasks to commit canonical site artifacts". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
