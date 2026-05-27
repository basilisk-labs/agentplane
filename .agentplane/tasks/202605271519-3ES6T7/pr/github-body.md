Task: `202605271519-3ES6T7`
Title: Start Codex runner prompts with /goal
Canonical task record: `.agentplane/tasks/202605271519-3ES6T7/README.md`

## Summary

Start Codex runner prompts with /goal

Update the AgentPlane Codex runner bootstrap so Codex exec receives a prompt that starts with the /goal slash command for task and context runner execution, while preserving the existing bundle/result manifest contract.

## Scope

- In scope: Update the AgentPlane Codex runner bootstrap so Codex exec receives a prompt that starts with the /goal slash command for task and context runner execution, while preserving the existing bundle/result manifest contract.
- Out of scope: unrelated refactors not required for "Start Codex runner prompts with /goal".

## Verification

- State: ok
- Note: Connected public task run command and verified Codex /goal dry-run path.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-27T15:20:20.635Z
- Branch: task/202605271519-3ES6T7/codex-goal-bootstrap
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 docs/user/cli-reference.generated.mdx              |  35 +++++
 docs/user/commands.mdx                             |   6 +-
 docs/user/configuration.mdx                        |   9 +-
 .../src/cli/run-cli.core.docs-cli.test.ts          |   2 +-
 .../src/cli/run-cli.core.task-run.test.ts          | 101 +++++++++++++
 .../src/cli/run-cli/command-catalog/task.ts        |   3 +
 .../src/cli/run-cli/command-loaders/task.ts        |   2 +
 .../agentplane/src/commands/task/run.command.ts    | 157 +++++++++++++++++++++
 .../src/runner/usecases/task-run-blueprint.test.ts |  34 +++++
 .../src/runner/usecases/task-run-bootstrap.ts      |  27 ++++
 10 files changed, 368 insertions(+), 8 deletions(-)
```

</details>
