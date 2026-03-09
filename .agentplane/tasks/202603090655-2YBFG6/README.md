---
id: "202603090655-2YBFG6"
title: "Add backend matrix regressions and install-first docs"
result_summary: "Documented projection-first remote backends and added a CLI regression for projection snapshot export."
status: "DONE"
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
  state: "ok"
  updated_at: "2026-03-09T07:49:35.926Z"
  updated_by: "TESTER"
  note: |-
    Verified backend matrix and install-first docs.
    - bunx vitest run packages/agentplane/src/backends/task-backend.test.ts packages/agentplane/src/commands/doctor.command.test.ts packages/agentplane/src/cli/run-cli.core.tasks.test.ts packages/agentplane/src/cli/run-cli.core.init-upgrade-backend.test.ts --pool=forks --testTimeout 60000 --hookTimeout 60000
    - bun run lint:core -- packages/agentplane/src/backends/task-backend.test.ts packages/agentplane/src/commands/doctor.command.test.ts packages/agentplane/src/cli/run-cli.core.tasks.test.ts packages/agentplane/src/cli/run-cli.core.init-upgrade-backend.test.ts
    - bun run docs:site:check
commit:
  hash: "83f70a70cd27fd2983f36f4d4c439bd25f644038"
  message: "🔌 2YBFG6 backend: add install-first projection docs and export regression"
comments:
  -
    author: "CODER"
    body: "Start: adding backend matrix regressions and install-first guidance around projection, sync, and snapshot behavior."
  -
    author: "CODER"
    body: "Verified: backend matrix regressions passed, projection-first Redmine reads are documented, and install-first task export behavior is covered by CLI tests."
events:
  -
    type: "status"
    at: "2026-03-09T07:39:36.332Z"
    author: "CODER"
    from: "TODO"
    to: "DOING"
    note: "Start: adding backend matrix regressions and install-first guidance around projection, sync, and snapshot behavior."
  -
    type: "verify"
    at: "2026-03-09T07:49:35.926Z"
    author: "TESTER"
    state: "ok"
    note: |-
      Verified backend matrix and install-first docs.
      - bunx vitest run packages/agentplane/src/backends/task-backend.test.ts packages/agentplane/src/commands/doctor.command.test.ts packages/agentplane/src/cli/run-cli.core.tasks.test.ts packages/agentplane/src/cli/run-cli.core.init-upgrade-backend.test.ts --pool=forks --testTimeout 60000 --hookTimeout 60000
      - bun run lint:core -- packages/agentplane/src/backends/task-backend.test.ts packages/agentplane/src/commands/doctor.command.test.ts packages/agentplane/src/cli/run-cli.core.tasks.test.ts packages/agentplane/src/cli/run-cli.core.init-upgrade-backend.test.ts
      - bun run docs:site:check
  -
    type: "status"
    at: "2026-03-09T07:49:50.219Z"
    author: "CODER"
    from: "DOING"
    to: "DONE"
    note: "Verified: backend matrix regressions passed, projection-first Redmine reads are documented, and install-first task export behavior is covered by CLI tests."
doc_version: 3
doc_updated_at: "2026-03-09T07:49:50.219Z"
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
#### 2026-03-09T07:49:35.926Z — VERIFY — ok

By: TESTER

Note: Verified backend matrix and install-first docs.
- bunx vitest run packages/agentplane/src/backends/task-backend.test.ts packages/agentplane/src/commands/doctor.command.test.ts packages/agentplane/src/cli/run-cli.core.tasks.test.ts packages/agentplane/src/cli/run-cli.core.init-upgrade-backend.test.ts --pool=forks --testTimeout 60000 --hookTimeout 60000
- bun run lint:core -- packages/agentplane/src/backends/task-backend.test.ts packages/agentplane/src/commands/doctor.command.test.ts packages/agentplane/src/cli/run-cli.core.tasks.test.ts packages/agentplane/src/cli/run-cli.core.init-upgrade-backend.test.ts
- bun run docs:site:check

VerifyStepsRef: doc_version=3, doc_updated_at=2026-03-09T07:45:04.995Z, excerpt_hash=sha256:04b8a8a6591b5d1351330f5bf72d38d01bf938b0503ab620181fe2792af0136a

<!-- END VERIFICATION RESULTS -->

## Rollback Plan

- Revert task-related commit(s).
- Re-run required checks to confirm rollback safety.

## Findings
