# PR Review

Created: 2026-05-18T10:46:40.621Z

## Task

- Task: `202605181046-JM9F16`
- Title: Gate runner surfaces for v0.7
- Status: DOING
- Branch: `task/202605181046-JM9F16/gate-runner-v0-7`
- Canonical task record: `.agentplane/tasks/202605181046-JM9F16/README.md`

## Verification

- State: ok
- Note: Removed public runner command surfaces and context --run shortcuts for current release; runner implementation remains deferred to v0.7. Verified targeted Vitest, help snapshots, typecheck, ESLint, generated CLI docs, docs bootstrap/onboarding, formatting, diff-check, and policy routing.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-18T11:00:49.834Z
- Branch: task/202605181046-JM9F16/gate-runner-v0-7
- Head: 2abbc12b295c

```text
 .../blueprint/resolved-snapshot.json               | 526 +++++++++++++++++++++
 docs/developer/blueprints.mdx                      |   5 +-
 docs/developer/local-context.mdx                   |  18 +-
 docs/developer/recipes-development.mdx             |  14 +-
 docs/developer/recipes-spec.mdx                    | 107 +----
 docs/user/cli-reference.generated.mdx              | 111 +----
 docs/user/commands.mdx                             |  36 +-
 docs/user/configuration.mdx                        |  49 +-
 docs/user/local-context.mdx                        |  10 +-
 .../src/backends/task-backend/shared/record.ts     |   1 -
 .../src/backends/task-backend/shared/types.ts      |   1 -
 .../src/blueprints/builtins-specialized.ts         |  79 ----
 packages/agentplane/src/blueprints/builtins.ts     |  10 +-
 packages/agentplane/src/blueprints/model.ts        |   1 -
 packages/agentplane/src/blueprints/resolve.test.ts |   9 +-
 packages/agentplane/src/blueprints/resolve.ts      |  10 -
 .../agentplane/src/blueprints/validate.test.ts     |   5 +-
 .../run-cli.core.help-snap.test.ts.snap            |  16 +-
 .../src/cli/run-cli.core.docs-cli.test.ts          |   2 +-
 .../src/cli/run-cli.core.help-snap.test.ts         |  11 -
 .../src/cli/run-cli/command-catalog/task.ts        |  33 --
 .../src/cli/run-cli/command-loaders/task.ts        |  19 -
 .../src/commands/blueprint/task-input.ts           |   1 -
 .../src/commands/context/context.command.ts        |   6 +-
 .../src/commands/context/context.learn.spec.ts     |  37 --
 .../agentplane/src/commands/context/ingest.spec.ts |  30 +-
 .../src/commands/context/release-readiness.test.ts |  36 +-
 .../agentplane/src/commands/hooks/task-context.ts  |   1 -
 .../agentplane/src/commands/task/begin.command.ts  |   1 -
 packages/agentplane/src/commands/task/new.spec.ts  |   1 -
 packages/agentplane/src/commands/task/new.ts       |   1 -
 .../agentplane/src/commands/task/task.command.ts   |   6 +-
 packages/agentplane/src/context/ingest-task.ts     |   6 +-
 packages/agentplane/src/context/ingest.ts          |  35 +-
 34 files changed, 608 insertions(+), 626 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
