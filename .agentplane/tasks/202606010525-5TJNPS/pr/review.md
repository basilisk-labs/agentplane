# PR Review

Created: 2026-06-01T05:26:11.714Z

## Task

- Task: `202606010525-5TJNPS`
- Title: Add Hermes task-run launch path
- Status: DOING
- Branch: `task/202606010525-5TJNPS/add-hermes-task-run-launch-path`
- Canonical task record: `.agentplane/tasks/202606010525-5TJNPS/README.md`

## Verification

- State: ok
- Note: Verified Hermes task-run supervise and Hermes runner init profile. Checks: bun x vitest run packages/agentplane/src/commands/hermes/hermes.command.test.ts packages/agentplane/src/runner/config.test.ts packages/agentplane/src/runner/adapters/custom.test.ts packages/agentplane/src/runner/usecases/task-run-lifecycle.test.ts packages/core/src/config/config.test.ts packages/agentplane/src/cli/run-cli.core.init.test.ts; bun run typecheck; bun run format:changed; bun run schemas:check; bun run docs:cli:check; bun run docs:recipes:check; node .agentplane/policy/check-routing.mjs.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-06-01T05:26:11.714Z
- Branch: task/202606010525-5TJNPS/add-hermes-task-run-launch-path
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 docs/recipes/hermes-agentplane.mdx                 |  6 ++
 docs/user/cli-reference.generated.mdx              |  4 +-
 docs/workflow-guides/hermes-kanban.mdx             | 27 +++++++-
 .../agentplane/src/cli/run-cli.core.init.test.ts   | 18 ++++++
 .../src/cli/run-cli/commands/init/answers.ts       |  3 +
 .../src/cli/run-cli/commands/init/execution.ts     |  1 +
 .../src/cli/run-cli/commands/init/ide-sync.ts      |  3 +-
 .../src/cli/run-cli/commands/init/init-plan.ts     |  3 +-
 .../src/cli/run-cli/commands/init/model.ts         | 13 +++-
 .../src/cli/run-cli/commands/init/modes.ts         |  1 +
 .../src/cli/run-cli/commands/init/spec.ts          |  8 +--
 .../src/cli/run-cli/commands/init/steps/ide.ts     |  1 +
 .../src/cli/run-cli/commands/init/write-config.ts  | 14 ++++-
 .../src/commands/hermes/hermes-runtime.ts          | 12 +++-
 .../src/commands/hermes/hermes.command.test.ts     | 72 ++++++++++++++++++++++
 .../src/runner/adapters/custom-preparation.ts      |  6 +-
 packages/agentplane/src/runner/adapters/custom.ts  | 45 +++++++++-----
 packages/agentplane/src/runner/adapters/index.ts   |  3 +
 packages/agentplane/src/runner/config.test.ts      | 13 ++++
 packages/agentplane/src/runner/config.ts           |  2 +-
 .../agentplane/src/runner/usecases/task-run.ts     |  3 +-
 packages/core/schemas/config.schema.json           |  2 +-
 packages/core/src/config/config.test.ts            | 16 +++++
 packages/core/src/config/schema.impl.ts            |  2 +-
 packages/spec/schemas/config.schema.json           |  2 +-
 schemas/config.schema.json                         |  2 +-
 26 files changed, 244 insertions(+), 38 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
