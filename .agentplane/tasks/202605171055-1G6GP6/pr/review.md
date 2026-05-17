# PR Review

Created: 2026-05-17T10:56:21.808Z

## Task

- Task: `202605171055-1G6GP6`
- Title: Add branch_pr route decision CLI commands
- Status: DOING
- Branch: `task/202605171055-1G6GP6/route-decision-cli`
- Canonical task record: `.agentplane/tasks/202605171055-1G6GP6/README.md`

## Verification

- State: ok
- Note: Addressed PR review threads: stale PR metadata now routes to pr update before integration, and repair plans no longer emit no_repair_needed while blockers are present. Checks passed: focused route-decision/pr-flow tests, typecheck, knip:check, lint:core, format:check, routing policy check, diff check, and framework bootstrap.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-17T12:51:37.857Z
- Branch: task/202605171055-1G6GP6/route-decision-cli
- Head: 735c441d5283

```text
 .../blueprint/resolved-snapshot.json               | 552 +++++++++++++++++++++
 docs/user/cli-reference.generated.mdx              | 104 ++++
 docs/user/task-lifecycle.mdx                       |  17 +
 packages/agentplane/src/cli/command-guide.ts       |   6 +-
 .../src/cli/run-cli.core.route-decision.test.ts    | 313 ++++++++++++
 .../src/cli/run-cli/command-catalog/project.ts     |   9 +
 .../src/cli/run-cli/command-catalog/task.ts        |   6 +
 .../src/cli/run-cli/command-loaders/project.ts     |  11 +
 .../src/cli/run-cli/command-loaders/task.ts        |   8 +
 .../src/commands/branch/work-resume.command.ts     |  56 +++
 .../src/commands/branch/work-start.command.ts      |   1 +
 .../agentplane/src/commands/flow/flow.command.ts   |  31 ++
 .../agentplane/src/commands/flow/repair.command.ts |  82 +++
 packages/agentplane/src/commands/pr/flow-status.ts |   8 +-
 .../src/commands/shared/route-decision.ts          | 401 +++++++++++++++
 .../src/commands/task/next-action.command.ts       |  58 +++
 .../agentplane/src/commands/task/status.command.ts |  79 +++
 .../agentplane/src/commands/task/task.command.ts   |   9 +
 scripts/baselines/knip-baseline.json               |  58 +--
 19 files changed, 1770 insertions(+), 39 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
