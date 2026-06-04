Task: `202606031956-Y6BRMR`
Title: Add evaluator skepticism levels to Codex runner init
Canonical task record: `.agentplane/tasks/202606031956-Y6BRMR/README.md`

## Summary

Add evaluator skepticism levels to Codex runner init

Implement configurable evaluator skepticism levels for Codex runner audit prompts, expose the setting during init, and cover the behavior with tests.

## Scope

- In scope: Implement configurable evaluator skepticism levels for Codex runner audit prompts, expose the setting during init, and cover the behavior with tests.
- Out of scope: unrelated refactors not required for "Add evaluator skepticism levels to Codex runner init".

## Verification

- State: ok
- Note:

```text
Verified current PR head 9a8ad918 after verification-artifact refresh: GitHub PR #4410 checks pass
(PR verification, verify-contract, verify-static, verify-unit, test-windows rerun, docs, CodeQL).
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-06-03T20:00:09.435Z
- Branch: task/202606031956-Y6BRMR/evaluator-skepticism
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 docs/user/cli-reference.generated.mdx              |  1 +
 .../src/cli/run-cli/commands/init/answers.ts       |  5 ++-
 .../cli/run-cli/commands/init/execution.test.ts    |  5 +++
 .../src/cli/run-cli/commands/init/execution.ts     |  2 ++
 .../src/cli/run-cli/commands/init/init-plan.ts     |  1 +
 .../src/cli/run-cli/commands/init/model.ts         |  5 ++-
 .../src/cli/run-cli/commands/init/orchestrate.ts   |  1 +
 .../src/cli/run-cli/commands/init/presets.ts       |  5 +++
 .../src/cli/run-cli/commands/init/spec.ts          |  9 ++++++
 .../commands/init/steps/advanced-settings.ts       | 27 +++++++++++++++-
 .../cli/run-cli/commands/init/steps/contracts.ts   |  3 +-
 .../commands/init/steps/prompt-steps.test.ts       |  1 +
 .../src/cli/run-cli/commands/init/write-config.ts  |  9 +++++-
 packages/agentplane/src/runner/types/context.ts    |  7 ++++-
 .../src/runner/usecases/task-run-blueprint.test.ts | 15 +++++++++
 .../src/runner/usecases/task-run-bootstrap.ts      | 36 ++++++++++++++++++++++
 .../agentplane/src/runner/usecases/task-run.ts     |  1 +
 packages/agentplane/src/workflow-runtime/build.ts  |  1 +
 packages/core/schemas/config.schema.json           |  8 ++++-
 packages/core/src/config/config.test.ts            | 17 ++++++++++
 packages/core/src/config/config.ts                 |  1 +
 packages/core/src/config/index.ts                  |  1 +
 packages/core/src/config/schema.impl.ts            |  4 +++
 packages/core/src/config/workflow-file.ts          |  1 +
 packages/spec/schemas/config.schema.json           |  8 ++++-
 schemas/config.schema.json                         |  8 ++++-
 26 files changed, 173 insertions(+), 9 deletions(-)
```

</details>
