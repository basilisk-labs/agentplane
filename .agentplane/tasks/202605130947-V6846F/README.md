---
id: "202605130947-V6846F"
title: "Optimize CLI read-heavy startup paths"
result_summary: "Merged via PR #3625."
status: "DONE"
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
  updated_at: "2026-05-13T10:45:46.911Z"
  updated_by: "CODER"
  note: "Updated docs to describe .agentplane/cache.sqlite as the global SQLite projection/cache database and recorded follow-up backlog tasks for generated projections, scripts layout, and context domain extraction. Evidence: docs IA check passed and stale local.sqlite/context.sqlite references are absent from current docs/code surfaces."
  attempts: 0
commit:
  hash: "b274d81aa9ffdbd545265678bf9042268df23da1"
  message: "Merge pull request #3625 from basilisk-labs/task/202605130947-V6846F/cli-perf-read-paths"
comments:
  -
    author: "CODER"
    body: "Start: Analyze current CLI performance code, implement behavior-preserving optimizations for read-heavy startup/task-list paths, then verify with focused tests and benchmark evidence."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #3625 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
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
  -
    type: "verify"
    at: "2026-05-13T10:35:10.369Z"
    author: "CODER"
    state: "ok"
    note: "Moved the shared SQLite projection database to .agentplane/cache.sqlite and kept context/service for context-owned service subdirectories. Evidence: focused Vitest 32/32 passed; exact-file ESLint passed; targeted TS compile passed; agentplane package build passed; smoke verified task list and context reindex both create .agentplane/cache.sqlite; cold-path benchmark still improves read-heavy paths."
  -
    type: "verify"
    at: "2026-05-13T10:45:46.911Z"
    author: "CODER"
    state: "ok"
    note: "Updated docs to describe .agentplane/cache.sqlite as the global SQLite projection/cache database and recorded follow-up backlog tasks for generated projections, scripts layout, and context domain extraction. Evidence: docs IA check passed and stale local.sqlite/context.sqlite references are absent from current docs/code surfaces."
  -
    type: "status"
    at: "2026-05-13T11:36:38.210Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #3625 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-05-13T11:36:38.210Z"
doc_updated_by: "INTEGRATOR"
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
    
    ### 2026-05-13T10:35:10.369Z — VERIFY — ok
    
    By: CODER
    
    Note: Moved the shared SQLite projection database to .agentplane/cache.sqlite and kept context/service for context-owned service subdirectories. Evidence: focused Vitest 32/32 passed; exact-file ESLint passed; targeted TS compile passed; agentplane package build passed; smoke verified task list and context reindex both create .agentplane/cache.sqlite; cold-path benchmark still improves read-heavy paths.
    Attempts: 0
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-13T10:23:32.810Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    Details:
    
    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605130947-V6846F-cli-perf-read-paths/.agentplane/tasks/202605130947-V6846F/blueprint/resolved-snapshot.json
    - old_digest: 4178befc44e30568c554d526972a8cc76dd7357389df383138ad3d7b39429985
    - current_digest: 4178befc44e30568c554d526972a8cc76dd7357389df383138ad3d7b39429985
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605130947-V6846F
    
    ### 2026-05-13T10:45:46.911Z — VERIFY — ok
    
    By: CODER
    
    Note: Updated docs to describe .agentplane/cache.sqlite as the global SQLite projection/cache database and recorded follow-up backlog tasks for generated projections, scripts layout, and context domain extraction. Evidence: docs IA check passed and stale local.sqlite/context.sqlite references are absent from current docs/code surfaces.
    Attempts: 0
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-13T10:35:10.375Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
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
      Impact: Task read-heavy paths now reuse .agentplane/cache.sqlite with task_projection_* tables while README.md remains source of truth; context projection uses the same embedded driver without sqlite3 CLI spawn.
      Resolution: Added better-sqlite3 as trusted dependency, shared embedded sqlite driver, stale-safe task projection cache, focused tests, and cached blueprint resolver for task list.
    
    - Observation: Final medians after path move: task_list 436.038ms, task_search 354.972ms, task_next 359.987ms versus original baseline task_list 1159.331ms, task_search 1123.773ms, task_next 1164.330ms.
      Impact: The cache path now matches ownership: one global AgentPlane cache DB at .agentplane/cache.sqlite, with context projection and task projection separated by tables and owner metadata.
      Resolution: Updated task projection path resolver, context init manifest/gitignore, context reindex/read path, context doctor, context assimilation forbidden outputs, tests, and docs evidence text.
    
    - Observation: Created TODO tasks 202605131043-2GMHKQ, 202605131043-GD7RJJ, and 202605131043-802HWG with scoped plans instead of mixing large structural refactors into the SQLite implementation diff.
      Impact: Docs now match the new cache ownership boundary; future structure changes have executable task IDs.
      Resolution: Updated project layout, local context docs, overview, commands, and tasks/backend docs; kept marketing as a submodule rather than removing it.
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

### 2026-05-13T10:35:10.369Z — VERIFY — ok

By: CODER

Note: Moved the shared SQLite projection database to .agentplane/cache.sqlite and kept context/service for context-owned service subdirectories. Evidence: focused Vitest 32/32 passed; exact-file ESLint passed; targeted TS compile passed; agentplane package build passed; smoke verified task list and context reindex both create .agentplane/cache.sqlite; cold-path benchmark still improves read-heavy paths.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-13T10:23:32.810Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605130947-V6846F-cli-perf-read-paths/.agentplane/tasks/202605130947-V6846F/blueprint/resolved-snapshot.json
- old_digest: 4178befc44e30568c554d526972a8cc76dd7357389df383138ad3d7b39429985
- current_digest: 4178befc44e30568c554d526972a8cc76dd7357389df383138ad3d7b39429985
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605130947-V6846F

### 2026-05-13T10:45:46.911Z — VERIFY — ok

By: CODER

Note: Updated docs to describe .agentplane/cache.sqlite as the global SQLite projection/cache database and recorded follow-up backlog tasks for generated projections, scripts layout, and context domain extraction. Evidence: docs IA check passed and stale local.sqlite/context.sqlite references are absent from current docs/code surfaces.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-13T10:35:10.375Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

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
  Impact: Task read-heavy paths now reuse .agentplane/cache.sqlite with task_projection_* tables while README.md remains source of truth; context projection uses the same embedded driver without sqlite3 CLI spawn.
  Resolution: Added better-sqlite3 as trusted dependency, shared embedded sqlite driver, stale-safe task projection cache, focused tests, and cached blueprint resolver for task list.

- Observation: Final medians after path move: task_list 436.038ms, task_search 354.972ms, task_next 359.987ms versus original baseline task_list 1159.331ms, task_search 1123.773ms, task_next 1164.330ms.
  Impact: The cache path now matches ownership: one global AgentPlane cache DB at .agentplane/cache.sqlite, with context projection and task projection separated by tables and owner metadata.
  Resolution: Updated task projection path resolver, context init manifest/gitignore, context reindex/read path, context doctor, context assimilation forbidden outputs, tests, and docs evidence text.

- Observation: Created TODO tasks 202605131043-2GMHKQ, 202605131043-GD7RJJ, and 202605131043-802HWG with scoped plans instead of mixing large structural refactors into the SQLite implementation diff.
  Impact: Docs now match the new cache ownership boundary; future structure changes have executable task IDs.
  Resolution: Updated project layout, local context docs, overview, commands, and tasks/backend docs; kept marketing as a submodule rather than removing it.
