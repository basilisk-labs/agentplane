---
id: "202605051655-W7502P"
title: "Harden task parsing and lint checks"
result_summary: "Merged via PR #921."
status: "DONE"
priority: "high"
owner: "CODER"
revision: 6
origin:
  system: "manual"
depends_on: []
tags:
  - "code"
  - "tasks"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-05-05T16:55:14.975Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "ok"
  updated_at: "2026-05-05T17:06:47.685Z"
  updated_by: "CODER"
  note: "Command: bunx vitest run packages/core/src/tasks/task-readme.test.ts packages/core/src/tasks/task-store.test.ts packages/core/src/tasks/tasks-lint.test.ts packages/agentplane/src/backends/task-index.test.ts packages/agentplane/src/backends/task-backend.local.test.ts packages/agentplane/src/cli/run-cli.core.tasks.query-listing.test.ts packages/agentplane/src/cli/run-cli.core.tasks.normalize-migrate.test.ts packages/agentplane/src/cli/run-cli.core.misc.test.ts packages/agentplane/src/commands/workflow.test.ts. Result: pass. Evidence: 9 files, 143 tests passed. Scope: task README parsing, local backend projection cache, listing/query, normalize/migrate, task lint CLI. Command: bun run typecheck. Result: pass. Evidence: tsc -b exited 0. Scope: workspace TypeScript. Command: prettier/eslint on touched files and git diff --check. Result: pass. Evidence: formatting, lint, whitespace clean. Command: node .agentplane/policy/check-routing.mjs. Result: pass. Evidence: policy routing OK. Command: node packages/agentplane/bin/agentplane.js task lint && node packages/agentplane/bin/agentplane.js task list --quiet --limit 3 && node packages/agentplane/bin/agentplane.js doctor. Result: pass. Evidence: task lint OK, task list printed first three tasks, doctor OK with repo-local runtime and 0 warnings."
commit:
  hash: "1cd426adb958de91970379dd5285374374c3f4c1"
  message: "Merge pull request #921 from basilisk-labs/task/202605051655-W7502P/harden-task-parsing-lint"
comments:
  -
    author: "CODER"
    body: "Start: harden task projection cache invalidation and make task lint useful on legacy historical task archives without hiding malformed current task records."
  -
    author: "INTEGRATOR"
    body: "Verified: PR #921 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
events:
  -
    type: "status"
    at: "2026-05-05T16:55:26.498Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: harden task projection cache invalidation and make task lint useful on legacy historical task archives without hiding malformed current task records."
  -
    type: "verify"
    at: "2026-05-05T17:06:47.685Z"
    author: "CODER"
    state: "ok"
    note: "Command: bunx vitest run packages/core/src/tasks/task-readme.test.ts packages/core/src/tasks/task-store.test.ts packages/core/src/tasks/tasks-lint.test.ts packages/agentplane/src/backends/task-index.test.ts packages/agentplane/src/backends/task-backend.local.test.ts packages/agentplane/src/cli/run-cli.core.tasks.query-listing.test.ts packages/agentplane/src/cli/run-cli.core.tasks.normalize-migrate.test.ts packages/agentplane/src/cli/run-cli.core.misc.test.ts packages/agentplane/src/commands/workflow.test.ts. Result: pass. Evidence: 9 files, 143 tests passed. Scope: task README parsing, local backend projection cache, listing/query, normalize/migrate, task lint CLI. Command: bun run typecheck. Result: pass. Evidence: tsc -b exited 0. Scope: workspace TypeScript. Command: prettier/eslint on touched files and git diff --check. Result: pass. Evidence: formatting, lint, whitespace clean. Command: node .agentplane/policy/check-routing.mjs. Result: pass. Evidence: policy routing OK. Command: node packages/agentplane/bin/agentplane.js task lint && node packages/agentplane/bin/agentplane.js task list --quiet --limit 3 && node packages/agentplane/bin/agentplane.js doctor. Result: pass. Evidence: task lint OK, task list printed first three tasks, doctor OK with repo-local runtime and 0 warnings."
  -
    type: "status"
    at: "2026-05-05T17:11:09.951Z"
    author: "INTEGRATOR"
    from: "DOING"
    to: "DONE"
    note: "Verified: PR #921 merged on GitHub main; hosted closure automation recorded canonical task artifacts."
doc_version: 3
doc_updated_at: "2026-05-05T17:11:09.957Z"
doc_updated_by: "INTEGRATOR"
description: "Fix task projection parsing/cache invalidation so clean branch switches cannot reuse stale task indexes, and make task lint handle legacy historical task records without failing current health checks."
sections:
  Summary: |-
    Harden task parsing and lint checks
    
    Fix task projection parsing/cache invalidation so clean branch switches cannot reuse stale task indexes, and make task lint handle legacy historical task records without failing current health checks.
  Scope: |-
    - In scope: Fix task projection parsing/cache invalidation so clean branch switches cannot reuse stale task indexes, and make task lint handle legacy historical task records without failing current health checks.
    - Out of scope: unrelated refactors not required for "Harden task parsing and lint checks".
  Plan: |-
    1. Add a regression that proves projection-only task listing does not reuse a clean but stale task index after the task README set changes.
    2. Extend the task index metadata/freshness check so cached projections are invalidated across branch switches, pulls, additions, deletions, and task-id path changes.
    3. Add a regression for task lint on legacy historical records and adjust lint validation to distinguish malformed current records from known legacy archive shape.
    4. Run focused task parser/backend/listing/lint tests, typecheck, lint/format on touched files, policy routing, and repo-local doctor.
  Verify Steps: |-
    1. Review the changed artifact or behavior for the `code` task. Expected: the requested outcome is visible and matches the approved scope.
    2. Run the most relevant validation step for the `code` task. Expected: it succeeds without unexpected regressions in touched scope.
    3. Compare the final result against the task summary and scope. Expected: any remaining follow-up is explicit in ## Findings.
  Verification: |-
    <!-- BEGIN VERIFICATION RESULTS -->
    ### 2026-05-05T17:06:47.685Z — VERIFY — ok
    
    By: CODER
    
    Note: Command: bunx vitest run packages/core/src/tasks/task-readme.test.ts packages/core/src/tasks/task-store.test.ts packages/core/src/tasks/tasks-lint.test.ts packages/agentplane/src/backends/task-index.test.ts packages/agentplane/src/backends/task-backend.local.test.ts packages/agentplane/src/cli/run-cli.core.tasks.query-listing.test.ts packages/agentplane/src/cli/run-cli.core.tasks.normalize-migrate.test.ts packages/agentplane/src/cli/run-cli.core.misc.test.ts packages/agentplane/src/commands/workflow.test.ts. Result: pass. Evidence: 9 files, 143 tests passed. Scope: task README parsing, local backend projection cache, listing/query, normalize/migrate, task lint CLI. Command: bun run typecheck. Result: pass. Evidence: tsc -b exited 0. Scope: workspace TypeScript. Command: prettier/eslint on touched files and git diff --check. Result: pass. Evidence: formatting, lint, whitespace clean. Command: node .agentplane/policy/check-routing.mjs. Result: pass. Evidence: policy routing OK. Command: node packages/agentplane/bin/agentplane.js task lint && node packages/agentplane/bin/agentplane.js task list --quiet --limit 3 && node packages/agentplane/bin/agentplane.js doctor. Result: pass. Evidence: task lint OK, task list printed first three tasks, doctor OK with repo-local runtime and 0 warnings.
    
    VerifyStepsRef: doc_version=3, doc_updated_at=2026-05-05T16:55:26.498Z, excerpt_hash=sha256:0c911ba57bbda86e6b1d4b2c31f39ff10ccc1febf923fdb7f66dbb574080a0d7
    
    <!-- END VERIFICATION RESULTS -->
  Rollback Plan: |-
    - Revert task-related commit(s).
    - Re-run required checks to confirm rollback safety.
  Findings: ""
id_source: "generated"
---
