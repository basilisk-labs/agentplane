---
id: "202605290508-41676W"
title: "SQLite task cache decomposition"
status: "DOING"
priority: "med"
owner: "CODER"
revision: 5
origin:
  system: "manual"
depends_on: []
tags:
  - "hotspot"
  - "refactor"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-29T05:08:14.769Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-29T05:13:51.058Z"
  updated_by: "CODER"
  note: "SQLite task projection cache helpers extracted into local-task-sqlite-cache-key.ts; local-task-sqlite-cache.ts reduced from hotspot range to 236 lines. Also resolved a main-branch knip blocker in the Obsidian projection facade by making the exported file type a real facade import/re-export."
  attempts: 0
commit: null
comments:
  -
    author: "CODER"
    body: "Start: Extract local task SQLite cache key and fingerprint helpers while preserving SQLite projection cache behavior."
events:
  -
    type: "status"
    at: "2026-05-29T05:08:26.875Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: Extract local task SQLite cache key and fingerprint helpers while preserving SQLite projection cache behavior."
  -
    type: "verify"
    at: "2026-05-29T05:13:51.058Z"
    author: "CODER"
    state: "ok"
    note: "SQLite task projection cache helpers extracted into local-task-sqlite-cache-key.ts; local-task-sqlite-cache.ts reduced from hotspot range to 236 lines. Also resolved a main-branch knip blocker in the Obsidian projection facade by making the exported file type a real facade import/re-export."
doc_version: 3
doc_updated_at: "2026-05-29T05:13:51.083Z"
doc_updated_by: "CODER"
description: "Extract focused helpers from packages/agentplane/src/backends/task-backend/local-task-sqlite-cache.ts to reduce the runtime hotspot below the warning threshold without changing local task SQLite cache behavior."
sections:
  Summary: |-
    SQLite task cache decomposition

    Extract focused helpers from packages/agentplane/src/backends/task-backend/local-task-sqlite-cache.ts to reduce the runtime hotspot below the warning threshold without changing local task SQLite cache behavior.
  Scope: |-
    - In scope: Extract focused helpers from packages/agentplane/src/backends/task-backend/local-task-sqlite-cache.ts to reduce the runtime hotspot below the warning threshold without changing local task SQLite cache behavior.
    - Out of scope: unrelated refactors not required for "SQLite task cache decomposition".
  Plan: "Scope: reduce packages/agentplane/src/backends/task-backend/local-task-sqlite-cache.ts below the 400-line hotspot warning by extracting cache-key, git status, and README fingerprint helpers into focused module(s). Preserve public SQLite cache API and task projection behavior. Acceptance: relevant task backend/cache tests pass or nearest task backend test surface is documented, typecheck/arch/knip/lint/format pass, bun run hotspots:check shows one fewer runtime hotspot."
  Verify Steps: |-
    PLANNER fallback scaffold for "SQLite task cache decomposition". Replace with task-specific acceptance checks when PLANNER context is available.

    1. Review the requested outcome for "SQLite task cache decomposition". Expected: the visible result matches ## Summary and stays inside approved scope.
    2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
    3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-29T05:13:51.058Z — VERIFY — ok

    By: CODER

    Note: SQLite task projection cache helpers extracted into local-task-sqlite-cache-key.ts; local-task-sqlite-cache.ts reduced from hotspot range to 236 lines. Also resolved a main-branch knip blocker in the Obsidian projection facade by making the exported file type a real facade import/re-export.
    Attempts: 0

    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-29T05:08:26.875Z, excerpt_hash=sha256:9400625f400d4a49fa27f0d710fbcc3f4eb57fe028a0a8b0a73d55b5804eb007

    Details:

    BlueprintSnapshotRef:
    - state: current
    - path: .agentplane/tasks/202605290508-41676W/blueprint/resolved-snapshot.json
    - old_digest: cbd385c67351e163fce75e9b36c237a091d2355a82578161a8eb8449b0a3d70f
    - current_digest: cbd385c67351e163fce75e9b36c237a091d2355a82578161a8eb8449b0a3d70f
    - route_changed: no
    - safe_command: agentplane blueprint snapshot 202605290508-41676W

    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: |-
    - Observation: Commands passed: bun test packages/agentplane/src/backends/task-backend/local-task-sqlite-cache.test.ts packages/agentplane/src/backends/task-backend.local.test.ts; bun run typecheck; bun run arch:check; bun run knip:check; bun run lint:core; bun run format:changed; bun run hotspots:check.
      Impact: SQLite cache key JSON structure, porcelain path parsing API, SQLite projection read/write API, and Obsidian facade type API are preserved.
      Resolution: Runtime hotspot warnings dropped from 10 to 9; local-task-sqlite-cache.ts is now below 400 lines.
id_source: "generated"
---
## Summary

SQLite task cache decomposition

Extract focused helpers from packages/agentplane/src/backends/task-backend/local-task-sqlite-cache.ts to reduce the runtime hotspot below the warning threshold without changing local task SQLite cache behavior.

## Scope

- In scope: Extract focused helpers from packages/agentplane/src/backends/task-backend/local-task-sqlite-cache.ts to reduce the runtime hotspot below the warning threshold without changing local task SQLite cache behavior.
- Out of scope: unrelated refactors not required for "SQLite task cache decomposition".

## Plan

Scope: reduce packages/agentplane/src/backends/task-backend/local-task-sqlite-cache.ts below the 400-line hotspot warning by extracting cache-key, git status, and README fingerprint helpers into focused module(s). Preserve public SQLite cache API and task projection behavior. Acceptance: relevant task backend/cache tests pass or nearest task backend test surface is documented, typecheck/arch/knip/lint/format pass, bun run hotspots:check shows one fewer runtime hotspot.

## Verify Steps

PLANNER fallback scaffold for "SQLite task cache decomposition". Replace with task-specific acceptance checks when PLANNER context is available.

1. Review the requested outcome for "SQLite task cache decomposition". Expected: the visible result matches ## Summary and stays inside approved scope.
2. Run the most relevant validation step for this task. Expected: it succeeds without unexpected regressions in touched behavior.
3. Compare the final result against ## Scope and record any residual follow-up in ## Findings. Expected: open edges are explicit rather than implicit.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
### 2026-05-29T05:13:51.058Z — VERIFY — ok

By: CODER

Note: SQLite task projection cache helpers extracted into local-task-sqlite-cache-key.ts; local-task-sqlite-cache.ts reduced from hotspot range to 236 lines. Also resolved a main-branch knip blocker in the Obsidian projection facade by making the exported file type a real facade import/re-export.
Attempts: 0

VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-29T05:08:26.875Z, excerpt_hash=sha256:9400625f400d4a49fa27f0d710fbcc3f4eb57fe028a0a8b0a73d55b5804eb007

Details:

BlueprintSnapshotRef:
- state: current
- path: .agentplane/tasks/202605290508-41676W/blueprint/resolved-snapshot.json
- old_digest: cbd385c67351e163fce75e9b36c237a091d2355a82578161a8eb8449b0a3d70f
- current_digest: cbd385c67351e163fce75e9b36c237a091d2355a82578161a8eb8449b0a3d70f
- route_changed: no
- safe_command: agentplane blueprint snapshot 202605290508-41676W

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings

- Observation: Commands passed: bun test packages/agentplane/src/backends/task-backend/local-task-sqlite-cache.test.ts packages/agentplane/src/backends/task-backend.local.test.ts; bun run typecheck; bun run arch:check; bun run knip:check; bun run lint:core; bun run format:changed; bun run hotspots:check.
  Impact: SQLite cache key JSON structure, porcelain path parsing API, SQLite projection read/write API, and Obsidian facade type API are preserved.
  Resolution: Runtime hotspot warnings dropped from 10 to 9; local-task-sqlite-cache.ts is now below 400 lines.
