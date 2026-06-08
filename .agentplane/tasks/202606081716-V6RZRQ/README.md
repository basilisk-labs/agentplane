---
id: "202606081716-V6RZRQ"
title: "Repair Dependabot website dependency lockfile"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 4
origin:
  system: "manual"
depends_on: []
tags:
  - "dependabot"
  - "pr-4488"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-06-08T17:17:04.347Z"
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
    body: "Start: repair Dependabot PR #4488 lockfile and verify docs install/build gates."
events:
  -
    type: "status"
    at: "2026-06-08T17:17:09.884Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: repair Dependabot PR #4488 lockfile and verify docs install/build gates."
doc_version: 3
doc_updated_at: "2026-06-08T17:17:09.884Z"
doc_updated_by: "CODER"
description: "Update bun.lock for Dependabot PR #4488 so docs CI can run with --frozen-lockfile."
sections:
  Summary: |-
    Repair Dependabot website dependency lockfile

    Update bun.lock for Dependabot PR #4488 so docs CI can run with --frozen-lockfile.
  Scope: |-
    - In scope: Update bun.lock for Dependabot PR #4488 so docs CI can run with --frozen-lockfile.
    - Out of scope: unrelated refactors not required for "Repair Dependabot website dependency lockfile".
  Plan: |-
    1. Update bun.lock on Dependabot PR #4488 to match website/package.json.
    2. Verify frozen install and website build:check locally.
    3. Commit and push the PR branch, then require fresh hosted checks before merge.
  Verify Steps: |-
    PLANNER fallback scaffold for "Repair Dependabot website dependency lockfile". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "Repair Dependabot website dependency lockfile". Expected: the visible result matches ## Summary and stays inside approved scope.
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

Repair Dependabot website dependency lockfile

Update bun.lock for Dependabot PR #4488 so docs CI can run with --frozen-lockfile.

## Scope

- In scope: Update bun.lock for Dependabot PR #4488 so docs CI can run with --frozen-lockfile.
- Out of scope: unrelated refactors not required for "Repair Dependabot website dependency lockfile".

## Plan

1. Update bun.lock on Dependabot PR #4488 to match website/package.json.
2. Verify frozen install and website build:check locally.
3. Commit and push the PR branch, then require fresh hosted checks before merge.

## Verify Steps

PLANNER fallback scaffold for "Repair Dependabot website dependency lockfile". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "Repair Dependabot website dependency lockfile". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
