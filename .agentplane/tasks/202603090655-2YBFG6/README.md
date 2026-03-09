---
id: "202603090655-2YBFG6"
title: "Add backend matrix regressions and install-first docs"
status: "DOING"
priority: "high"
owner: "CODER"
depends_on: []
tags:
  - "code"
  - "backend"
verify: []
plan_approval:
  state: "approved"
  updated_at: "2026-03-09T07:39:35.953Z"
  updated_by: "ORCHESTRATOR"
  note: null
verification:
  state: "pending"
  updated_at: null
  updated_by: null
  note: null
commit: null
comments:
  -
    author: "CODER"
    body: "Start: adding backend matrix regressions and install-first guidance around projection, sync, and snapshot behavior."
events:
  -
    type: "status"
    at: "2026-03-09T07:39:36.332Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: adding backend matrix regressions and install-first guidance around projection, sync, and snapshot behavior."
doc_version: 3
doc_updated_at: "2026-03-09T07:45:04.995Z"
doc_updated_by: "CODER"
description: "Cover local and Redmine backends with shared integration scenarios and document the universal backend contract for npm-installed users."
id_source: "generated"
---
## Summary

Add backend matrix regressions and install-first docs

Cover local and Redmine backends with shared integration scenarios and document the universal backend contract for npm-installed users.

## Scope

- In scope: Cover local and Redmine backends with shared integration scenarios and document the universal backend contract for npm-installed users.
- Out of scope: unrelated refactors not required for "Add backend matrix regressions and install-first docs".

## Plan

1. Implement the change for "Add backend matrix regressions and install-first docs".
2. Run required checks and capture verification evidence.
3. Finalize task findings and finish with traceable commit metadata.

## Verify Steps

1. Run `bunx vitest run packages/agentplane/src/backends/task-backend.test.ts packages/agentplane/src/commands/doctor.command.test.ts packages/agentplane/src/cli/run-cli.core.tasks.test.ts packages/agentplane/src/cli/run-cli.core.init-upgrade-backend.test.ts --pool=forks --testTimeout 60000 --hookTimeout 60000`. Expected: backend matrix regressions pass for local and Redmine-backed flows.
2. Run `bun run lint:core -- packages/agentplane/src/backends/task-backend.test.ts packages/agentplane/src/commands/doctor.command.test.ts packages/agentplane/src/cli/run-cli.core.tasks.test.ts packages/agentplane/src/cli/run-cli.core.init-upgrade-backend.test.ts`. Expected: modified backend and CLI test surfaces lint cleanly.
3. Run `bun run docs:site:check`. Expected: install-first backend docs render cleanly without stale cache/fallback wording.

## Verification

<!-- BEGIN VERIFICATION RESULTS -->
<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
