# PR Review

Created: 2026-05-17T17:27:09.110Z

## Task

- Task: `202605171345-F281KQ`
- Title: Add guided task begin and complete shortcuts
- Status: DOING
- Branch: `task/202605171345-F281KQ/guided-task-shortcuts`
- Canonical task record: `.agentplane/tasks/202605171345-F281KQ/README.md`

## Verification

- State: ok
- Note: Implemented guided task begin and complete shortcuts. Checks passed: guided CLI tests; command-guide/help snapshots; docs freshness; policy routing; typecheck; lint; lifecycle unit tests via Vitest after bun-test runner mismatch was reported as issue #3845; clean temp-repo smoke for init -> task begin -> task complete.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-17T17:44:32.929Z
- Branch: task/202605171345-F281KQ/guided-task-shortcuts
- Head: 06ba4e225b95

```text
 .agentplane/WORKFLOW.md                            |   4 +
 .../blueprint/resolved-snapshot.json               | 535 +++++++++++++++++++++
 .agentplane/workflows/last-known-good.md           |   4 +
 docs/user/cli-reference.generated.mdx              |  63 +++
 .../run-cli.core.help-snap.test.ts.snap            | 113 +++--
 packages/agentplane/src/cli/command-guide.test.ts  |   4 +-
 packages/agentplane/src/cli/command-guide.ts       |  10 +-
 packages/agentplane/src/cli/command-invocations.ts |   2 +
 packages/agentplane/src/cli/command-snippets.ts    |   2 +
 .../src/cli/run-cli.core.task-guided.test.ts       | 228 +++++++++
 .../src/cli/run-cli/command-catalog/task.ts        |   6 +
 .../src/cli/run-cli/command-loaders/task.ts        |   8 +
 .../agentplane/src/commands/task/begin.command.ts  | 270 +++++++++++
 .../src/commands/task/complete.command.ts          | 185 +++++++
 .../agentplane/src/commands/task/task.command.ts   |  11 +-
 15 files changed, 1385 insertions(+), 60 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
