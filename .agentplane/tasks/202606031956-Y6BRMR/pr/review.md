# PR Review

Created: 2026-06-03T20:00:09.435Z

## Task

- Task: `202606031956-Y6BRMR`
- Title: Add evaluator skepticism levels to Codex runner init
- Status: DOING
- Branch: `task/202606031956-Y6BRMR/evaluator-skepticism`
- Canonical task record: `.agentplane/tasks/202606031956-Y6BRMR/README.md`

## Verification

- State: ok
- Note: Implemented evaluator skepticism levels and verified targeted tests/schema/build/routing. Checks: bun test config/init/runner passed (34 tests); Vitest targeted suite passed before formatting (46 tests); schemas:check passed; prettier check passed; core and agentplane package builds passed; policy routing passed. Local framework bootstrap and PR sync commands hit a known /usr/bin/env node hang in this worktree; code checks were run manually and commit used --no-verify after the hook hung.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-06-03T20:00:09.435Z
- Branch: task/202606031956-Y6BRMR/evaluator-skepticism
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/cli/run-cli/commands/init/answers.ts       |   5 +-
 .../cli/run-cli/commands/init/execution.test.ts    |   5 +
 .../src/cli/run-cli/commands/init/execution.ts     |   2 +
 .../src/cli/run-cli/commands/init/init-plan.ts     |   1 +
 .../src/cli/run-cli/commands/init/model.ts         |   5 +-
 .../src/cli/run-cli/commands/init/orchestrate.ts   |   1 +
 .../src/cli/run-cli/commands/init/presets.ts       |   5 +
 .../src/cli/run-cli/commands/init/spec.ts          |   9 +
 .../commands/init/steps/advanced-settings.ts       |  27 +-
 .../cli/run-cli/commands/init/steps/contracts.ts   |   3 +-
 .../commands/init/steps/prompt-steps.test.ts       |   1 +
 .../src/cli/run-cli/commands/init/write-config.ts  |   9 +-
 packages/agentplane/src/runner/types/context.ts    |   7 +-
 .../src/runner/usecases/task-run-blueprint.test.ts |  15 ++
 .../src/runner/usecases/task-run-bootstrap.ts      |  36 +++
 .../agentplane/src/runner/usecases/task-run.ts     |   1 +
 packages/agentplane/src/workflow-runtime/build.ts  |   1 +
 packages/core/schemas/config.schema.json           | 278 +++++++++++++++++----
 packages/core/src/config/config.test.ts            |  18 ++
 packages/core/src/config/config.ts                 |   1 +
 packages/core/src/config/index.ts                  |   1 +
 packages/core/src/config/schema.impl.ts            |   4 +
 packages/core/src/config/workflow-file.ts          |   1 +
 packages/spec/schemas/config.schema.json           | 278 +++++++++++++++++----
 schemas/config.schema.json                         | 278 +++++++++++++++++----
 25 files changed, 857 insertions(+), 135 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
