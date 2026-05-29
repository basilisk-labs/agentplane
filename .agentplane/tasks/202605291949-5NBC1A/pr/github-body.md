Task: `202605291949-5NBC1A`
Title: Remove direct Redmine task backend
Canonical task record: `.agentplane/tasks/202605291949-5NBC1A/README.md`

## Summary

Remove direct Redmine task backend

Remove Redmine as a first-class AgentPlane task backend so public AgentPlane exposes only local and cloud backend choices; keep cloud as the provider-agnostic handoff point for Redmine connector behavior.

## Scope

- In scope: Remove Redmine as a first-class AgentPlane task backend so public AgentPlane exposes only local and cloud backend choices; keep cloud as the provider-agnostic handoff point for Redmine connector behavior.
- Out of scope: unrelated refactors not required for "Remove direct Redmine task backend".

## Verification

- State: ok
- Note:

```text
Implemented and verified: focused backend/init tests, backend-critical suite, typecheck, build,
doctor, and policy routing all passed. Commits: 05b42f6f5, 5aa293214.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-29T19:51:11.668Z
- Branch: task/202605291949-5NBC1A/remove-direct-redmine-task-backend
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 docs/developer/architecture.mdx                    |   7 +-
 docs/developer/cloud-backend-integration-plan.mdx  |   2 +-
 docs/developer/testing-and-quality.mdx             |   7 +-
 docs/user/cli-reference.generated.mdx              |   2 +-
 docs/user/prerequisites.mdx                        |  16 +-
 package.json                                       |   4 +-
 .../src/backends/task-backend.load.test.ts         | 107 +---
 .../backends/task-backend.redmine.cache.test.ts    | 501 ------------------
 .../src/backends/task-backend.redmine.docs.test.ts | 528 -------------------
 .../backends/task-backend.redmine.mapping.test.ts  | 428 ----------------
 .../backends/task-backend.redmine.remote.test.ts   | 504 ------------------
 .../backends/task-backend.redmine.write.test.ts    | 568 ---------------------
 packages/agentplane/src/backends/task-backend.ts   |   2 -
 .../backends/task-backend/cloud-backend-sync.ts    |  16 +-
 .../backends/task-backend/cloud-backend-utils.ts   |   1 +
 .../src/backends/task-backend/cloud-backend.ts     |  13 +-
 .../backends/task-backend/cloud-start-refresh.ts   |  15 +-
 .../agentplane/src/backends/task-backend/load.ts   |  31 +-
 .../src/backends/task-backend/redmine-backend.ts   | 243 ---------
 .../task-backend/redmine/backend-cache-doc.ts      | 257 ----------
 .../task-backend/redmine/backend-report.ts         |  66 ---
 .../backends/task-backend/redmine/backend-sync.ts  |   4 -
 .../task-backend/redmine/backend-sync/context.ts   |  71 ---
 .../task-backend/redmine/backend-sync/ids.ts       |  23 -
 .../task-backend/redmine/backend-sync/migration.ts | 125 -----
 .../task-backend/redmine/backend-sync/status.ts    |  95 ----
 .../task-backend/redmine/backend-sync/sync.ts      | 109 ----
 .../task-backend/redmine/backend-sync/write.ts     | 129 -----
 .../src/backends/task-backend/redmine/client.ts    |  65 ---
 .../src/backends/task-backend/redmine/comments.ts  |  70 ---
 .../src/backends/task-backend/redmine/env.test.ts  |  65 ---
 .../src/backends/task-backend/redmine/env.ts       |  89 ----
 .../src/backends/task-backend/redmine/fields.ts    |  48 --
 .../src/backends/task-backend/redmine/inspect.ts   | 102 ----
 .../src/backends/task-backend/redmine/live.test.ts | 146 ------
 .../src/backends/task-backend/redmine/mapping.ts   | 223 --------
 .../src/backends/task-backend/redmine/parse.ts     |  26 -
 .../src/backends/task-backend/redmine/remote.ts    | 107 ----
 .../task-backend/redmine/runtime-context.ts        | 162 ------
 .../task-backend/redmine/runtime-methods.ts        | 181 -------
 .../task-backend/redmine/runtime-operations.ts     | 151 ------
 .../backends/task-backend/redmine/runtime-state.ts |  79 ---
 .../src/backends/task-backend/redmine/state.ts     | 148 ------
 .../agentplane/src/backends/task-backend/shared.ts |   6 +-
 .../src/backends/task-backend/shared/doc.ts        |  17 +-
 .../src/backends/task-backend/shared/errors.ts     |  30 +-
 .../src/backends/task-backend/shared/id.ts         |   4 -
 .../src/backends/task-backend/shared/normalize.ts  |  12 -
 .../src/backends/task-backend/shared/types.ts      |   7 +-
 packages/agentplane/src/cli/command-guide.ts       |   8 -
 packages/agentplane/src/cli/command-snippets.ts    |   6 +-
 .../src/cli/run-cli/commands/init/execution.ts     |   6 +-
 .../src/cli/run-cli/commands/init/init-paths.ts    |   8 +-
 .../src/cli/run-cli/commands/init/model.ts         |   2 +-
 .../src/cli/run-cli/commands/init/spec.ts          |   4 +-
 .../src/cli/run-cli/commands/init/steps/backend.ts |   1 -
 .../commands/init/steps/prompt-steps.test.ts       |   8 +-
 .../src/cli/run-cli/commands/init/write-config.ts  |  15 +-
 .../src/cli/run-cli/commands/init/write-env.ts     |  61 ---
 .../src/commands/backend/sync.command.ts           |  10 +-
 .../commands/guard/impl/close-message-render.ts    |   1 +
 .../src/commands/guard/impl/close-message.test.ts  |  34 ++
 .../src/commands/guard/impl/close-message.ts       |   6 +-
 packages/agentplane/src/commands/sync.command.ts   |   4 +-
 packages/agentplane/src/shared/env.ts              |   2 +-
 scripts/README.md                                  |   4 +-
 scripts/baselines/knip-baseline.json               |  96 +---
 scripts/checks/run-backend-live-suite.mjs          |  99 ----
 scripts/lib/test-route-registry.mjs                |   7 -
 scripts/run-backend-live-suite.mjs                 |   1 -
 70 files changed, 175 insertions(+), 5820 deletions(-)
```

</details>
