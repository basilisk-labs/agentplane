---
id: "202605141516-363FBC"
title: "Ignore SQLite cache on read-heavy commands"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 4
origin:
  system: "manual"
depends_on: []
tags:
  - "bug"
  - "cli"
  - "code"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-14T15:17:04.537Z"
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
    body: "Start: Implementing the approved SQLite cache ignore repair in the dedicated task worktree, scoped to runtime gitignore/cache handling plus a regression test for stale initialized repositories."
events:
  -
    type: "status"
    at: "2026-05-14T15:17:28.752Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Implementing the approved SQLite cache ignore repair in the dedicated task worktree, scoped to runtime gitignore/cache handling plus a regression test for stale initialized repositories."
doc_version: 3
doc_updated_at: "2026-05-14T15:17:28.752Z"
doc_updated_by: "CODER"
description: "Ensure read-heavy commands that create the shared SQLite cache also prevent .agentplane/cache.sqlite and WAL/SHM files from appearing as untracked files in older AgentPlane repositories whose .gitignore predates the v0.6 cache ignore entries."
sections:
  Summary: |-
    Ignore SQLite cache on read-heavy commands
    
    Ensure read-heavy commands that create the shared SQLite cache also prevent .agentplane/cache.sqlite and WAL/SHM files from appearing as untracked files in older AgentPlane repositories whose .gitignore predates the v0.6 cache ignore entries.
  Scope: |-
    - In scope: Ensure read-heavy commands that create the shared SQLite cache also prevent .agentplane/cache.sqlite and WAL/SHM files from appearing as untracked files in older AgentPlane repositories whose .gitignore predates the v0.6 cache ignore entries.
    - Out of scope: unrelated refactors not required for "Ignore SQLite cache on read-heavy commands".
  Plan: "Implement a defensive cache-ignore repair for the shared SQLite projection path so read-heavy commands cannot leave .agentplane/cache.sqlite, .agentplane/cache.sqlite-wal, or .agentplane/cache.sqlite-shm as untracked files in older initialized repos. Prefer reusing the existing runtime gitignore contract. Add a regression test that simulates an initialized repo with stale .gitignore, runs a cache-producing read path, and asserts git status does not report sqlite cache files. Verify with the focused test file and routing check."
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

Ignore SQLite cache on read-heavy commands

Ensure read-heavy commands that create the shared SQLite cache also prevent .agentplane/cache.sqlite and WAL/SHM files from appearing as untracked files in older AgentPlane repositories whose .gitignore predates the v0.6 cache ignore entries.

## Scope

- In scope: Ensure read-heavy commands that create the shared SQLite cache also prevent .agentplane/cache.sqlite and WAL/SHM files from appearing as untracked files in older AgentPlane repositories whose .gitignore predates the v0.6 cache ignore entries.
- Out of scope: unrelated refactors not required for "Ignore SQLite cache on read-heavy commands".

## Plan

Implement a defensive cache-ignore repair for the shared SQLite projection path so read-heavy commands cannot leave .agentplane/cache.sqlite, .agentplane/cache.sqlite-wal, or .agentplane/cache.sqlite-shm as untracked files in older initialized repos. Prefer reusing the existing runtime gitignore contract. Add a regression test that simulates an initialized repo with stale .gitignore, runs a cache-producing read path, and asserts git status does not report sqlite cache files. Verify with the focused test file and routing check.

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
