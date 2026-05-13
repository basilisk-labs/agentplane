---
id: "202605130947-V6846F"
title: "Optimize CLI read-heavy startup paths"
status: "DOING"
priority: "high"
owner: "CODER"
revision: 1
origin:
  system: "manual"
depends_on: []
tags:
  - "cli"
  - "code"
  - "performance"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-13T10:22:15.001Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-13T10:23:32.804Z"
  updated_by: "CODER"
  note: "Implemented unified SQLite projection cache with embedded better-sqlite3 driver. Evidence: focused Vitest 32/32 passed; exact-file ESLint passed; targeted TS compile passed; framework bootstrap passed; cold-path benchmark after native rebuild improved task_list 1159.331ms -> 355.393ms, task_search 1123.773ms -> 366.110ms, task_next 1164.330ms -> 371.164ms."
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Analyze current CLI performance code, implement behavior-preserving optimizations for read-heavy startup/task-list paths, then verify with focused tests and benchmark evidence."
events:
  -
    type: "status"
    at: "2026-05-13T09:48:18.897Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Analyze current CLI performance code, implement behavior-preserving optimizations for read-heavy startup/task-list paths, then verify with focused tests and benchmark evidence."
  -
    type: "verify"
    at: "2026-05-13T10:23:32.804Z"
    author: "CODER"
    state: "ok"
    note: "Implemented unified SQLite projection cache with embedded better-sqlite3 driver. Evidence: focused Vitest 32/32 passed; exact-file ESLint passed; targeted TS compile passed; framework bootstrap passed; cold-path benchmark after native rebuild improved task_list 1159.331ms -> 355.393ms, task_search 1123.773ms -> 366.110ms, task_next 1164.330ms -> 371.164ms."
doc_version: 3
doc_updated_at: "2026-05-13T10:23:32.810Z"
doc_updated_by: "CODER"
description: "Analyze the current AgentPlane CLI performance code after recent changes and implement behavior-preserving speedups for hot read-heavy paths."
sections:
  Summary: |-
    Optimize CLI read-heavy startup paths
    
    Analyze the current AgentPlane CLI performance code after recent changes and implement behavior-preserving speedups for hot read-heavy paths.
  Scope: |-
    - In scope: Analyze the current AgentPlane CLI performance code after recent changes and implement behavior-preserving speedups for hot read-heavy paths.
    - Out of scope: unrelated refactors not required for "Optimize CLI read-heavy startup paths".
  Plan: |-
    1. Re-run live performance/code inspection after recent checkout changes and preserve current task README as the canonical source of truth.
    2. Introduce a single SQLite projection cache file with separate task-cache tables and context lifecycle ownership left intact.
    3. Use an embedded SQLite driver when available, with safe fallback to the existing README/tasks-index path when unavailable or stale.
    4. Route read-heavy task list/search/next paths through the SQLite task projection where fresh.
    5. Verify with focused backend/task CLI tests plus benchmark evidence for cold read-heavy commands.
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-13T10:23:32.804Z — VERIFY — ok
    
    By: CODER
    
    Note: Implemented unified SQLite projection cache with embedded better-sqlite3 driver. Evidence: focused Vitest 32/32 passed; exact-file ESLint passed; targeted TS compile passed; framework bootstrap passed; cold-path benchmark after native rebuild improved task_list 1159.331ms -> 355.393ms, task_search 1123.773ms -> 366.110ms, task_next 1164.330ms -> 371.164ms.
    Attempts: 0
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-13T10:06:08.107Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    Details:
    
    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605130947-V6846F-cli-perf-read-paths/.agentplane/tasks/202605130947-V6846F/blueprint/resolved-snapshot.json
    - old_digest: 4178befc44e30568c554d526972a8cc76dd7357389df383138ad3d7b39429985
    - current_digest: 4178befc44e30568c554d526972a8cc76dd7357389df383138ad3d7b39429985
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605130947-V6846F
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Baseline command: node scripts/measure-cli-cold-path.mjs --suite cli-cold-path --runs 2 --warmups 1. Baseline medians before cache: quickstart 208.652ms, task_list 1159.331ms, task_search 1123.773ms, task_next 1164.330ms, preflight_quick 323.897ms. Final medians: quickstart 206.022ms, task_list 355.393ms, task_search 366.110ms, task_next 371.164ms, preflight_quick 403.428ms.
      Impact: Task read-heavy paths now reuse .agentplane/context/service/local.sqlite with task_projection_* tables while README.md remains source of truth; context projection uses the same embedded driver without sqlite3 CLI spawn.
      Resolution: Added better-sqlite3 as trusted dependency, shared embedded sqlite driver, stale-safe task projection cache, focused tests, and cached blueprint resolver for task list.
id_source: "generated"
---
## Summary

Optimize CLI read-heavy startup paths

Analyze the current AgentPlane CLI performance code after recent changes and implement behavior-preserving speedups for hot read-heavy paths.

## Scope

- In scope: Analyze the current AgentPlane CLI performance code after recent changes and implement behavior-preserving speedups for hot read-heavy paths.
- Out of scope: unrelated refactors not required for "Optimize CLI read-heavy startup paths".

## Plan

1. Re-run live performance/code inspection after recent checkout changes and preserve current task README as the canonical source of truth.
2. Introduce a single SQLite projection cache file with separate task-cache tables and context lifecycle ownership left intact.
3. Use an embedded SQLite driver when available, with safe fallback to the existing README/tasks-index path when unavailable or stale.
4. Route read-heavy task list/search/next paths through the SQLite task projection where fresh.
5. Verify with focused backend/task CLI tests plus benchmark evidence for cold read-heavy commands.

## Verify Steps

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-13T10:23:32.804Z — VERIFY — ok

By: CODER

Note: Implemented unified SQLite projection cache with embedded better-sqlite3 driver. Evidence: focused Vitest 32/32 passed; exact-file ESLint passed; targeted TS compile passed; framework bootstrap passed; cold-path benchmark after native rebuild improved task_list 1159.331ms -> 355.393ms, task_search 1123.773ms -> 366.110ms, task_next 1164.330ms -> 371.164ms.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-13T10:06:08.107Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605130947-V6846F-cli-perf-read-paths/.agentplane/tasks/202605130947-V6846F/blueprint/resolved-snapshot.json
- old_digest: 4178befc44e30568c554d526972a8cc76dd7357389df383138ad3d7b39429985
- current_digest: 4178befc44e30568c554d526972a8cc76dd7357389df383138ad3d7b39429985
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605130947-V6846F

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: Baseline command: node scripts/measure-cli-cold-path.mjs --suite cli-cold-path --runs 2 --warmups 1. Baseline medians before cache: quickstart 208.652ms, task_list 1159.331ms, task_search 1123.773ms, task_next 1164.330ms, preflight_quick 323.897ms. Final medians: quickstart 206.022ms, task_list 355.393ms, task_search 366.110ms, task_next 371.164ms, preflight_quick 403.428ms.
  Impact: Task read-heavy paths now reuse .agentplane/context/service/local.sqlite with task_projection_* tables while README.md remains source of truth; context projection uses the same embedded driver without sqlite3 CLI spawn.
  Resolution: Added better-sqlite3 as trusted dependency, shared embedded sqlite driver, stale-safe task projection cache, focused tests, and cached blueprint resolver for task list.
