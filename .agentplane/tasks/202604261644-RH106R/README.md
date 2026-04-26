---
id: "202604261644-RH106R"
title: "Prune Redmine sync re-exports"
result_summary: "Pruned Redmine sync re-exports and reduced Knip baseline total from 423 to 417."
status: "DONE"
priority: "med"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "backend"
  - "code"
  - "knip"
  - "refactor"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-04-26T16:44:37.225Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-04-26T16:45:56.771Z"
  updated_by: "CODER"
  note: |-
    Command: bunx vitest run packages/agentplane/src/backends/task-backend.redmine.mapping.test.ts packages/agentplane/src/backends/task-backend.redmine.cache.test.ts packages/agentplane/src/backends/task-backend.redmine.docs.test.ts packages/agentplane/src/backends/task-backend.redmine.remote.test.ts packages/agentplane/src/backends/task-backend.redmine.write.test.ts packages/agentplane/src/backends/task-backend.load.test.ts
    Result: pass
    Evidence: 6 files, 54 tests passed.
    Scope: Redmine backend sync/import behavior and backend loading.
    
    Command: bun run typecheck
    Result: pass
    Evidence: tsc -b exited 0.
    Scope: repository TypeScript after pruning Redmine sync re-exports.
    
    Command: bun run lint:core
    Result: pass
    Evidence: eslint exited 0.
    Scope: packages, scripts, and root lint config.
    
    Command: node scripts/check-knip-baseline.mjs
    Result: pass
    Evidence: baseline OK total=417/417.
    Scope: unused-code baseline after Redmine sync export pruning.
    
    Command: bun run format:check
    Result: pass
    Evidence: All matched files use Prettier code style.
    Scope: repository formatting.
    
    Command: git diff --check
    Result: pass
    Evidence: no whitespace errors.
    Scope: changed diff.
    
    Command: bun run framework:dev:bootstrap
    Result: pass
    Evidence: Framework dev runtime is ready.
    Scope: repo-local CLI/runtime after backend source change.
commit:
  hash: "f0299e842dd60df9bc10f78c5c05dde5b396b134"
  message: "🚧 RH106R task: prune redmine sync re-exports"
comments:
  -
    author: "CODER"
    body: "Start: Prune unused Redmine sync re-exports without changing RedmineBackend behavior, refresh Knip, and run backend-focused verification."
  -
    author: "CODER"
    body: "Verified: Removed unused Redmine sync re-exports while preserving RedmineBackend imports, refreshed Knip baseline to total 417, and passed Redmine/backend tests plus typecheck, lint, Knip, format, diff check, and framework bootstrap."
events:
  -
    type: "status"
    at: "2026-04-26T16:44:41.584Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Prune unused Redmine sync re-exports without changing RedmineBackend behavior, refresh Knip, and run backend-focused verification."
  -
    type: "verify"
    at: "2026-04-26T16:45:56.771Z"
    author: "CODER"
    state: "ok"
    note: |-
      Command: bunx vitest run packages/agentplane/src/backends/task-backend.redmine.mapping.test.ts packages/agentplane/src/backends/task-backend.redmine.cache.test.ts packages/agentplane/src/backends/task-backend.redmine.docs.test.ts packages/agentplane/src/backends/task-backend.redmine.remote.test.ts packages/agentplane/src/backends/task-backend.redmine.write.test.ts packages/agentplane/src/backends/task-backend.load.test.ts
      Result: pass
      Evidence: 6 files, 54 tests passed.
      Scope: Redmine backend sync/import behavior and backend loading.
      
      Command: bun run typecheck
      Result: pass
      Evidence: tsc -b exited 0.
      Scope: repository TypeScript after pruning Redmine sync re-exports.
      
      Command: bun run lint:core
      Result: pass
      Evidence: eslint exited 0.
      Scope: packages, scripts, and root lint config.
      
      Command: node scripts/check-knip-baseline.mjs
      Result: pass
      Evidence: baseline OK total=417/417.
      Scope: unused-code baseline after Redmine sync export pruning.
      
      Command: bun run format:check
      Result: pass
      Evidence: All matched files use Prettier code style.
      Scope: repository formatting.
      
      Command: git diff --check
      Result: pass
      Evidence: no whitespace errors.
      Scope: changed diff.
      
      Command: bun run framework:dev:bootstrap
      Result: pass
      Evidence: Framework dev runtime is ready.
      Scope: repo-local CLI/runtime after backend source change.
  -
    type: "status"
    at: "2026-04-26T16:46:09.815Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: Removed unused Redmine sync re-exports while preserving RedmineBackend imports, refreshed Knip baseline to total 417, and passed Redmine/backend tests plus typecheck, lint, Knip, format, diff check, and framework bootstrap."
doc_version: 3
doc_updated_at: "2026-04-26T16:46:09.816Z"
doc_updated_by: "CODER"
description: "Remove unused re-exports from redmine/backend-sync.ts while preserving the RedmineBackend imports, then refresh the Knip baseline."
sections:
  Summary: |-
    Prune Redmine sync re-exports
    
    Remove unused re-exports from redmine/backend-sync.ts while preserving the RedmineBackend imports, then refresh the Knip baseline.
  Scope: |-
    - In scope: Remove unused re-exports from redmine/backend-sync.ts while preserving the RedmineBackend imports, then refresh the Knip baseline.
    - Out of scope: unrelated refactors not required for "Prune Redmine sync re-exports".
  Plan: |-
    1. Remove unused Redmine sync re-exports from packages/agentplane/src/backends/task-backend/redmine/backend-sync.ts while keeping the symbols consumed by redmine-backend.ts.
    2. Refresh scripts/baselines/knip-baseline.json and confirm the total decreases.
    3. Run focused Redmine backend tests plus typecheck, lint, Knip check, format, diff check, framework bootstrap, and task verification.
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-04-26T16:45:56.771Z — VERIFY — ok
    
    By: CODER
    
    Note: Command: bunx vitest run packages/agentplane/src/backends/task-backend.redmine.mapping.test.ts packages/agentplane/src/backends/task-backend.redmine.cache.test.ts packages/agentplane/src/backends/task-backend.redmine.docs.test.ts packages/agentplane/src/backends/task-backend.redmine.remote.test.ts packages/agentplane/src/backends/task-backend.redmine.write.test.ts packages/agentplane/src/backends/task-backend.load.test.ts
    Result: pass
    Evidence: 6 files, 54 tests passed.
    Scope: Redmine backend sync/import behavior and backend loading.
    
    Command: bun run typecheck
    Result: pass
    Evidence: tsc -b exited 0.
    Scope: repository TypeScript after pruning Redmine sync re-exports.
    
    Command: bun run lint:core
    Result: pass
    Evidence: eslint exited 0.
    Scope: packages, scripts, and root lint config.
    
    Command: node scripts/check-knip-baseline.mjs
    Result: pass
    Evidence: baseline OK total=417/417.
    Scope: unused-code baseline after Redmine sync export pruning.
    
    Command: bun run format:check
    Result: pass
    Evidence: All matched files use Prettier code style.
    Scope: repository formatting.
    
    Command: git diff --check
    Result: pass
    Evidence: no whitespace errors.
    Scope: changed diff.
    
    Command: bun run framework:dev:bootstrap
    Result: pass
    Evidence: Framework dev runtime is ready.
    Scope: repo-local CLI/runtime after backend source change.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-26T16:44:41.589Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
## Summary

Prune Redmine sync re-exports

Remove unused re-exports from redmine/backend-sync.ts while preserving the RedmineBackend imports, then refresh the Knip baseline.

## Scope

- In scope: Remove unused re-exports from redmine/backend-sync.ts while preserving the RedmineBackend imports, then refresh the Knip baseline.
- Out of scope: unrelated refactors not required for "Prune Redmine sync re-exports".

## Plan

1. Remove unused Redmine sync re-exports from packages/agentplane/src/backends/task-backend/redmine/backend-sync.ts while keeping the symbols consumed by redmine-backend.ts.
2. Refresh scripts/baselines/knip-baseline.json and confirm the total decreases.
3. Run focused Redmine backend tests plus typecheck, lint, Knip check, format, diff check, framework bootstrap, and task verification.

## Verify Steps

1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-04-26T16:45:56.771Z — VERIFY — ok

By: CODER

Note: Command: bunx vitest run packages/agentplane/src/backends/task-backend.redmine.mapping.test.ts packages/agentplane/src/backends/task-backend.redmine.cache.test.ts packages/agentplane/src/backends/task-backend.redmine.docs.test.ts packages/agentplane/src/backends/task-backend.redmine.remote.test.ts packages/agentplane/src/backends/task-backend.redmine.write.test.ts packages/agentplane/src/backends/task-backend.load.test.ts
Result: pass
Evidence: 6 files, 54 tests passed.
Scope: Redmine backend sync/import behavior and backend loading.

Command: bun run typecheck
Result: pass
Evidence: tsc -b exited 0.
Scope: repository TypeScript after pruning Redmine sync re-exports.

Command: bun run lint:core
Result: pass
Evidence: eslint exited 0.
Scope: packages, scripts, and root lint config.

Command: node scripts/check-knip-baseline.mjs
Result: pass
Evidence: baseline OK total=417/417.
Scope: unused-code baseline after Redmine sync export pruning.

Command: bun run format:check
Result: pass
Evidence: All matched files use Prettier code style.
Scope: repository formatting.

Command: git diff --check
Result: pass
Evidence: no whitespace errors.
Scope: changed diff.

Command: bun run framework:dev:bootstrap
Result: pass
Evidence: Framework dev runtime is ready.
Scope: repo-local CLI/runtime after backend source change.

VerifyStepsRef: doc_version=3, doc_updated_at=2026-04-26T16:44:41.589Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
