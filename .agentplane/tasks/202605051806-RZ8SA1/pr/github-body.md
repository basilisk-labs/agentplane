Task: `202605051806-RZ8SA1`
Title: Add cloud backend init contract

## Summary

Add cloud backend init contract

Add cloud as a first-class backend selection in agentplane init, generated backend config, and init tests without coupling AgentPlane to a specific synchronization provider.

## Scope

- In scope: Add cloud as a first-class backend selection in agentplane init, generated backend config, and init tests without coupling AgentPlane to a specific synchronization provider.
- Out of scope: unrelated refactors not required for "Add cloud backend init contract".

## Verification

- State: ok
- Note: Verified: init accepts cloud backend and writes cloud config/env templates; targeted init cloud test, typecheck, arch check, policy routing, git diff check, and repo-local doctor passed.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-05T18:20:32.439Z
- Branch: task/202605051806-RZ8SA1/cloud-backend-contract
- Head: 901b4f88042f

```text
 .agentplane/tasks/202605051806-B77NBZ/README.md    |  96 +++++++
 .agentplane/tasks/202605051806-BW1M39/README.md    |  96 +++++++
 .agentplane/tasks/202605051806-TVZ7N4/README.md    |  96 +++++++
 docs/developer/cloud-backend-integration-plan.mdx  |  24 +-
 docs/user/backends/cloud.mdx                       |  47 ++--
 .../src/backends/task-backend.cloud.test.ts        | 100 +++++++
 .../src/backends/task-backend.load.test.ts         |  50 ++++
 packages/agentplane/src/backends/task-backend.ts   |   1 +
 .../src/backends/task-backend/cloud-backend.ts     | 306 +++++++++++++++++++++
 .../agentplane/src/backends/task-backend/load.ts   |  18 ++
 .../src/backends/task-backend/shared/types.ts      |  13 +
 .../run-cli.core.help-snap.test.ts.snap            |   2 +
 .../src/cli/run-cli.core.backend-sync.test.ts      |  62 +++++
 .../agentplane/src/cli/run-cli.core.init.test.ts   |  33 +++
 .../src/cli/run-cli/command-catalog/project.ts     |   3 +
 .../src/cli/run-cli/command-loaders/project.ts     |   4 +
 .../src/cli/run-cli/commands/init/execution.ts     |  14 +-
 .../src/cli/run-cli/commands/init/model.ts         |   3 +-
 .../src/cli/run-cli/commands/init/spec.ts          |   4 +-
 .../src/cli/run-cli/commands/init/steps/backend.ts |   1 +
 .../src/cli/run-cli/commands/init/write-config.ts  |  20 +-
 .../src/cli/run-cli/commands/init/write-env.ts     |  60 +++-
 packages/agentplane/src/commands/backend.ts        |  97 +++++++
 .../src/commands/backend/sync.command.ts           |  64 ++++-
 24 files changed, 1180 insertions(+), 34 deletions(-)
```

</details>
