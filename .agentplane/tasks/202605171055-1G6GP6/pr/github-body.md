Task: `202605171055-1G6GP6`
Title: Add branch_pr route decision CLI commands
Canonical task record: `.agentplane/tasks/202605171055-1G6GP6/README.md`

## Summary

Add branch_pr route decision CLI commands

Add machine-readable task route/status/next-action/resume/repair commands for branch_pr agent workflow optimization, and update prompts plus CLI documentation to teach the new commands.

## Scope

- In scope: Add machine-readable task route/status/next-action/resume/repair commands for branch_pr agent workflow optimization, and update prompts plus CLI documentation to teach the new commands.
- Out of scope: unrelated refactors not required for "Add branch_pr route decision CLI commands".

## Verification

- State: ok
- Note:

```text
Post-rebase verification refreshed at current HEAD after rebasing route decision CLI work onto
origin/main. Focused tests and typecheck were rerun after rebase; prior lint:core, format:check,
policy routing, diff check, framework bootstrap, and repo-local smokes remain valid for the same
implementation.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-17T11:12:35.038Z
- Branch: task/202605171055-1G6GP6/route-decision-cli
- Head: 7f98675e5298

```text
 .../blueprint/resolved-snapshot.json               | 552 +++++++++++++++++++++
 docs/user/cli-reference.generated.mdx              | 104 ++++
 docs/user/task-lifecycle.mdx                       |  17 +
 packages/agentplane/src/cli/command-guide.ts       |   6 +-
 .../src/cli/run-cli.core.route-decision.test.ts    | 108 ++++
 .../src/cli/run-cli/command-catalog/project.ts     |   9 +
 .../src/cli/run-cli/command-catalog/task.ts        |   6 +
 .../src/cli/run-cli/command-loaders/project.ts     |  11 +
 .../src/cli/run-cli/command-loaders/task.ts        |   8 +
 .../src/commands/branch/work-resume.command.ts     |  56 +++
 .../src/commands/branch/work-start.command.ts      |   1 +
 .../agentplane/src/commands/flow/flow.command.ts   |  31 ++
 .../agentplane/src/commands/flow/repair.command.ts |  82 +++
 packages/agentplane/src/commands/pr/flow-status.ts |   8 +-
 .../src/commands/shared/route-decision.ts          | 330 ++++++++++++
 .../src/commands/task/next-action.command.ts       |  58 +++
 .../agentplane/src/commands/task/status.command.ts |  79 +++
 .../agentplane/src/commands/task/task.command.ts   |   9 +
 18 files changed, 1470 insertions(+), 5 deletions(-)
```

</details>
