---
id: "202605171721-K2EP8Y"
title: "Fix website dependency PR lockfile drift"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 4
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "frontend"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-17T17:21:27.096Z"
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
    body: "Start: Implementing the approved website dependency lockfile fix in a dedicated branch_pr worktree. Scope is limited to website TypeScript dependency metadata and Bun lockfile unless verification exposes a minimal website compatibility issue."
events:
  -
    type: "status"
    at: "2026-05-17T17:21:42.910Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Implementing the approved website dependency lockfile fix in a dedicated branch_pr worktree. Scope is limited to website TypeScript dependency metadata and Bun lockfile unless verification exposes a minimal website compatibility issue."
doc_version: 3
doc_updated_at: "2026-05-17T17:21:42.910Z"
doc_updated_by: "CODER"
description: "Update the website TypeScript dependency with the matching Bun lockfile so duplicate Dependabot website PRs can be superseded and closed."
sections:
  Summary: |-
    Fix website dependency PR lockfile drift

    Update the website TypeScript dependency with the matching Bun lockfile so duplicate Dependabot website PRs can be superseded and closed.
  Scope: |-
    - In scope: Update the website TypeScript dependency with the matching Bun lockfile so duplicate Dependabot website PRs can be superseded and closed.
    - Out of scope: unrelated refactors not required for "Fix website dependency PR lockfile drift".
  Plan: "Scope: replace the duplicate website Dependabot TypeScript PRs with one task-bound update that changes website/package.json and the matching website/bun.lock only, unless verification proves a minimal website compatibility fix is required. Steps: 1. start a branch_pr worktree as CODER; 2. update website TypeScript to 6.0.3 and regenerate the Bun lockfile; 3. run the task verify contract plus website-focused install/build/type checks and routing/doctor checks; 4. open and merge one task PR through the branch_pr route; 5. close PR #3800 and #3811 as superseded after the task PR lands. Re-approval triggers: touching non-website source beyond minimal compatibility fixes, adding/removing dependencies unrelated to TypeScript, or skipping required checks."
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

Fix website dependency PR lockfile drift

Update the website TypeScript dependency with the matching Bun lockfile so duplicate Dependabot website PRs can be superseded and closed.

## Scope

- In scope: Update the website TypeScript dependency with the matching Bun lockfile so duplicate Dependabot website PRs can be superseded and closed.
- Out of scope: unrelated refactors not required for "Fix website dependency PR lockfile drift".

## Plan

Scope: replace the duplicate website Dependabot TypeScript PRs with one task-bound update that changes website/package.json and the matching website/bun.lock only, unless verification proves a minimal website compatibility fix is required. Steps: 1. start a branch_pr worktree as CODER; 2. update website TypeScript to 6.0.3 and regenerate the Bun lockfile; 3. run the task verify contract plus website-focused install/build/type checks and routing/doctor checks; 4. open and merge one task PR through the branch_pr route; 5. close PR #3800 and #3811 as superseded after the task PR lands. Re-approval triggers: touching non-website source beyond minimal compatibility fixes, adding/removing dependencies unrelated to TypeScript, or skipping required checks.

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
