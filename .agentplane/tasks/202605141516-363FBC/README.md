---
id: "202605141516-363FBC"
title: "Ignore SQLite cache on read-heavy commands"
result_summary: "Merged via PR #3726."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 7
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
  state: "ok"
  updated_at: "2026-05-14T16:18:28.201Z"
  updated_by: "CODER"
  note: "Verified after Codex review fix: SQLite gitignore repair is best-effort, so projection cache writes continue even if .gitignore cannot be read or updated. Evidence: focused LocalBackend SQLite gitignore regression tests pass, LocalBackend/context release readiness tests pass, exact-file ESLint passes, typecheck passes, and hotspots baseline passes."
  attempts: 0
commit:
  hash: "24e4883bd27fba448575a45b8b629772036da65b"
  message: "Merge pull request #3726 from basilisk-labs/task/202605141516-363FBC/sqlite-cache-ignore"
comments:
  -
    author: "CODER"
    body: "Start: Implementing the approved SQLite cache ignore repair in the dedicated task worktree, scoped to runtime gitignore/cache handling plus a regression test for stale initialized repositories."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #3726 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "status"
    at: "2026-05-14T15:17:28.752Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Implementing the approved SQLite cache ignore repair in the dedicated task worktree, scoped to runtime gitignore/cache handling plus a regression test for stale initialized repositories."
  -
    type: "verify"
    at: "2026-05-14T15:37:51.644Z"
    author: "CODER"
    state: "ok"
    note: "Verified: SQLite cache writers repair stale .gitignore entries for .agentplane/cache.sqlite, .agentplane/cache.sqlite-wal, and .agentplane/cache.sqlite-shm before writing the shared cache. Evidence: focused LocalBackend/context tests pass, exact-file ESLint passes, typecheck passes, policy routing passes, git diff whitespace check passes, and doctor is OK with unrelated pre-existing branch_pr normalization warnings."
  -
    type: "verify"
    at: "2026-05-14T16:18:28.201Z"
    author: "CODER"
    state: "ok"
    note: "Verified after Codex review fix: SQLite gitignore repair is best-effort, so projection cache writes continue even if .gitignore cannot be read or updated. Evidence: focused LocalBackend SQLite gitignore regression tests pass, LocalBackend/context release readiness tests pass, exact-file ESLint passes, typecheck passes, and hotspots baseline passes."
  -
    type: "status"
    at: "2026-05-14T16:20:24.684Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #3726 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-05-14T16:20:24.690Z"
doc_updated_by: "INTEGRATOR"
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
    ### 2026-05-14T15:37:51.644Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified: SQLite cache writers repair stale .gitignore entries for .agentplane/cache.sqlite, .agentplane/cache.sqlite-wal, and .agentplane/cache.sqlite-shm before writing the shared cache. Evidence: focused LocalBackend/context tests pass, exact-file ESLint passes, typecheck passes, policy routing passes, git diff whitespace check passes, and doctor is OK with unrelated pre-existing branch_pr normalization warnings.
    Attempts: 0
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-14T15:17:28.752Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6
    
    Details:
    
    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605141516-363FBC-sqlite-cache-ignore/.agentplane/tasks/202605141516-363FBC/blueprint/resolved-snapshot.json
    - old_digest: ea88cb250271e954e79b8e87a91f7589117e4171f0f823318a307167976477a2
    - current_digest: ea88cb250271e954e79b8e87a91f7589117e4171f0f823318a307167976477a2
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605141516-363FBC
    
    ### 2026-05-14T16:18:28.201Z — VERIFY — ok
    
    By: CODER
    
    Note: Verified after Codex review fix: SQLite gitignore repair is best-effort, so projection cache writes continue even if .gitignore cannot be read or updated. Evidence: focused LocalBackend SQLite gitignore regression tests pass, LocalBackend/context release readiness tests pass, exact-file ESLint passes, typecheck passes, and hotspots baseline passes.
    Attempts: 0
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-14T15:37:51.747Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6
    
    Details:
    
    BlueprintSnapshotRef:
    - state: current
    - path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605141516-363FBC-sqlite-cache-ignore/.agentplane/tasks/202605141516-363FBC/blueprint/resolved-snapshot.json
    - old_digest: ea88cb250271e954e79b8e87a91f7589117e4171f0f823318a307167976477a2
    - current_digest: ea88cb250271e954e79b8e87a91f7589117e4171f0f823318a307167976477a2
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605141516-363FBC
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Old initialized repositories can lack the v0.6 SQLite ignore entries while read-heavy task projection still writes .agentplane/cache.sqlite.
      Impact: Without the repair, task list/search/next can leave .agentplane/cache.sqlite as an untracked file even though the cache is disposable and must not be committed.
      Resolution: Moved runtime gitignore append logic into a shared helper, kept init on the full runtime ignore contract, and made task projection/context reindex call a narrowed SQLite-only repair before shared cache writes.
    
    - Observation: Review found that awaiting gitignore repair directly could make read-heavy projection paths fail on normal filesystem errors.
      Impact: The cache writer could regress from best-effort behavior to command failure when .gitignore is read-only, malformed as a directory, or otherwise unavailable.
      Resolution: Wrapped SQLite ignore repair in non-fatal catch paths for task projection and context reindex, and added a regression that keeps projection reads working when .gitignore repair fails.
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
### 2026-05-14T15:37:51.644Z — VERIFY — ok

By: CODER

Note: Verified: SQLite cache writers repair stale .gitignore entries for .agentplane/cache.sqlite, .agentplane/cache.sqlite-wal, and .agentplane/cache.sqlite-shm before writing the shared cache. Evidence: focused LocalBackend/context tests pass, exact-file ESLint passes, typecheck passes, policy routing passes, git diff whitespace check passes, and doctor is OK with unrelated pre-existing branch_pr normalization warnings.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-14T15:17:28.752Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605141516-363FBC-sqlite-cache-ignore/.agentplane/tasks/202605141516-363FBC/blueprint/resolved-snapshot.json
- old_digest: ea88cb250271e954e79b8e87a91f7589117e4171f0f823318a307167976477a2
- current_digest: ea88cb250271e954e79b8e87a91f7589117e4171f0f823318a307167976477a2
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605141516-363FBC

### 2026-05-14T16:18:28.201Z — VERIFY — ok

By: CODER

Note: Verified after Codex review fix: SQLite gitignore repair is best-effort, so projection cache writes continue even if .gitignore cannot be read or updated. Evidence: focused LocalBackend SQLite gitignore regression tests pass, LocalBackend/context release readiness tests pass, exact-file ESLint passes, typecheck passes, and hotspots baseline passes.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-14T15:37:51.747Z, excerpt_hash=sha256:4067e6c0d2671944bbb825f93b0ba7363aab826f8b2f3d8fbcbd2a2e4f1204c6

Details:

BlueprintSnapshotRef:
- state: current
- path: /Users/densmirnov/Github/agentplane/.agentplane/worktrees/202605141516-363FBC-sqlite-cache-ignore/.agentplane/tasks/202605141516-363FBC/blueprint/resolved-snapshot.json
- old_digest: ea88cb250271e954e79b8e87a91f7589117e4171f0f823318a307167976477a2
- current_digest: ea88cb250271e954e79b8e87a91f7589117e4171f0f823318a307167976477a2
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605141516-363FBC

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: Old initialized repositories can lack the v0.6 SQLite ignore entries while read-heavy task projection still writes .agentplane/cache.sqlite.
  Impact: Without the repair, task list/search/next can leave .agentplane/cache.sqlite as an untracked file even though the cache is disposable and must not be committed.
  Resolution: Moved runtime gitignore append logic into a shared helper, kept init on the full runtime ignore contract, and made task projection/context reindex call a narrowed SQLite-only repair before shared cache writes.

- Observation: Review found that awaiting gitignore repair directly could make read-heavy projection paths fail on normal filesystem errors.
  Impact: The cache writer could regress from best-effort behavior to command failure when .gitignore is read-only, malformed as a directory, or otherwise unavailable.
  Resolution: Wrapped SQLite ignore repair in non-fatal catch paths for task projection and context reindex, and added a regression that keeps projection reads working when .gitignore repair fails.
