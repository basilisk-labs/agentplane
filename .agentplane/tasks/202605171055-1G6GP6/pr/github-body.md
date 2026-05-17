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
Verified hosted CI fix: removed unused public route-decision type exports and refreshed knip
baseline after TaskResumeContext became used. Checks passed: knip:check, focused
route-decision/pr-flow tests, typecheck, lint:core, format:check, routing policy check, diff check,
framework bootstrap, and route status smoke.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-17T11:47:14.512Z
- Branch: task/202605171055-1G6GP6/route-decision-cli
- Head: 193305ed7106

```text
 .../blueprint/resolved-snapshot.json               | 552 +++++++++++++++++++++
 docs/user/cli-reference.generated.mdx              | 104 ++++
 docs/user/task-lifecycle.mdx                       |  17 +
 packages/agentplane/src/cli/command-guide.ts       |   6 +-
 .../src/cli/run-cli.core.route-decision.test.ts    | 184 +++++++
 .../src/cli/run-cli/command-catalog/project.ts     |   9 +
 .../src/cli/run-cli/command-catalog/task.ts        |   6 +
 .../src/cli/run-cli/command-loaders/project.ts     |  11 +
 .../src/cli/run-cli/command-loaders/task.ts        |   8 +
 .../src/commands/branch/work-resume.command.ts     |  56 +++
 .../src/commands/branch/work-start.command.ts      |   1 +
 .../agentplane/src/commands/flow/flow.command.ts   |  31 ++
 .../agentplane/src/commands/flow/repair.command.ts |  82 +++
 packages/agentplane/src/commands/pr/flow-status.ts |   8 +-
 .../src/commands/shared/route-decision.ts          | 356 +++++++++++++
 .../src/commands/task/next-action.command.ts       |  58 +++
 .../agentplane/src/commands/task/status.command.ts |  79 +++
 .../agentplane/src/commands/task/task.command.ts   |   9 +
 18 files changed, 1572 insertions(+), 5 deletions(-)
```

</details>
