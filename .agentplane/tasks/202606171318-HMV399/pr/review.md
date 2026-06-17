# PR Review

Created: 2026-06-17T13:19:36.764Z

## Task

- Task: `202606171318-HMV399`
- Title: Add platform sync for agent instruction surfaces
- Status: DOING
- Branch: `task/202606171318-HMV399/platform-sync`
- Canonical task record: `.agentplane/tasks/202606171318-HMV399/README.md`

## Verification

- State: ok
- Note: Implemented platform sync instruction-surface projections and verified targeted CLI behavior.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-06-17T13:19:36.764Z
- Branch: task/202606171318-HMV399/platform-sync
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/cli/run-cli.core.platform-sync.test.ts     | 200 +++++++
 .../src/cli/run-cli/command-catalog/core.ts        |  14 +
 .../src/cli/run-cli/command-loaders/core.ts        |   3 +
 .../agentplane/src/cli/run-cli/commands/ide.ts     | 150 +----
 .../src/cli/run-cli/commands/init/ide-sync.ts      |  11 +-
 .../src/cli/run-cli/commands/platform.ts           | 649 +++++++++++++++++++++
 6 files changed, 882 insertions(+), 145 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
