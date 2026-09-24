# PR Review

Created: 2026-09-24T14:39:05.856Z

## Task

- Task: `202609232231-BYSVV6`
- Title: Reduce AgentPlane workspace disk usage while preserving canonical task history
- Status: DOING
- Branch: `task/202609232231-BYSVV6/compact-task-history`
- Canonical task record: `.agentplane/tasks/202609232231-BYSVV6/README.md`

## Verification

- State: ok
- Note: Focused tests, full local CI, compact task-store behavior, and measured disk reduction passed; hosted PR checks are tracked separately.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-09-24T19:57:54.670Z
- Branch: task/202609232231-BYSVV6/compact-task-history
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 docs/user/branching-and-pr-artifacts.mdx           |  10 +
 docs/user/cli-reference.generated.mdx              |  29 +++
 .../agentplane/src/backends/task-backend/load.ts   |  62 +++++-
 .../backends/task-backend/local-backend-read.ts    |  25 +--
 .../backends/task-backend/local-backend-write.ts   |  19 +-
 .../src/backends/task-backend/local-backend.ts     | 104 +++++++--
 ...un-cli.core.hooks.pre-push-task-binding.test.ts |  61 +++++-
 .../run-cli.core.pr-flow.cleanup-merged.test.ts    |   2 +-
 .../run-cli.core.pr-flow.worktree-runtime.test.ts  |   6 +
 .../src/cli/run-cli/command-catalog/lifecycle.ts   |   6 +
 .../src/cli/run-cli/command-loaders/lifecycle.ts   |   4 +
 .../branch/work-start.compact-tasks.test.ts        | 233 +++++++++++++++++++++
 .../commands/branch/work-start.compact-tasks.ts    |  58 +++++
 .../commands/branch/work-start.hook-shim.test.ts   |   1 +
 .../src/commands/branch/work-start.materialize.ts  |  18 +-
 .../agentplane/src/commands/branch/work-start.ts   |  27 ++-
 .../src/commands/cleanup/inspect.command.ts        |  59 ++++++
 .../src/commands/cleanup/inspect.test.ts           |  88 ++++++++
 .../agentplane/src/commands/cleanup/inspect.ts     | 141 +++++++++++++
 .../src/commands/cleanup/merged.command.ts         |   6 +-
 .../src/commands/hooks/pre-push-task-binding.ts    |  36 +++-
 .../src/commands/hooks/run.pre-push.helpers.ts     |   3 +-
 .../agentplane/src/commands/hooks/run.pre-push.ts  |   7 +-
 .../src/commands/pr/internal/sync-github.test.ts   |  72 +++++++
 .../src/commands/pr/internal/sync-github.ts        |  28 ++-
 .../baselines/v0.7-compatibility-candidate.json    |  36 +++-
 .../check-compatibility-contract-baseline.mjs      |  24 +++
 scripts/checks/run-pre-push-hook.mjs               |  32 ++-
 28 files changed, 1117 insertions(+), 80 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
