Task: `202606010530-BEYQXA`
Title: Fix Hermes task launch profile gaps
Canonical task record: `.agentplane/tasks/202606010530-BEYQXA/README.md`

## Summary

Fix Hermes task launch profile gaps

Resolve GitHub issue #4347 by allowing hermes supervise to execute the same-task task-run route step safely and by adding a first-class Hermes init/runner profile path.

## Scope

- In scope: Resolve GitHub issue #4347 by allowing hermes supervise to execute the same-task task-run route step safely and by adding a first-class Hermes init/runner profile path.
- Out of scope: unrelated refactors not required for "Fix Hermes task launch profile gaps".

## Verification

- State: ok
- Note:

```text
Verified: Hermes supervise now allowlists same-task task run through typed args, init --tool hermes
seeds the custom Hermes runner profile, and targeted tests/type/docs/routing checks pass.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-06-01T05:31:21.158Z
- Branch: task/202606010530-BEYQXA/fix-hermes-task-launch
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 docs/recipes/hermes-agentplane.mdx                 | 12 +++++++
 docs/user/cli-reference.generated.mdx              |  8 ++++-
 docs/user/configuration.mdx                        |  5 ++-
 .../agentplane/src/cli/run-cli.core.init.test.ts   | 31 +++++++++++++++++
 .../src/cli/run-cli/commands/init/answers.ts       |  4 +++
 .../src/cli/run-cli/commands/init/execution.ts     |  2 ++
 .../src/cli/run-cli/commands/init/init-plan.ts     |  1 +
 .../src/cli/run-cli/commands/init/model.ts         | 12 ++++++-
 .../src/cli/run-cli/commands/init/modes.ts         | 10 ++++++
 .../src/cli/run-cli/commands/init/orchestrate.ts   |  1 +
 .../src/cli/run-cli/commands/init/presets.ts       |  1 +
 .../src/cli/run-cli/commands/init/spec.ts          |  8 +++--
 .../src/cli/run-cli/commands/init/write-config.ts  | 18 +++++++++-
 .../src/commands/hermes/hermes-runtime.ts          |  5 ++-
 .../src/commands/hermes/hermes.command.test.ts     | 40 ++++++++++++++++++++++
 .../src/runner/adapters/custom-preparation.ts      |  3 ++
 .../agentplane/src/runner/adapters/custom.test.ts  |  1 +
 17 files changed, 155 insertions(+), 7 deletions(-)
```

</details>
