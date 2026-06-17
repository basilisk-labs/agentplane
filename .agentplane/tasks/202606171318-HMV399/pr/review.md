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
- Note: Verified: platform sync lint fixes and branch_pr local open PR routing optimization pass targeted tests, lint, typecheck, policy routing, and dry-run platform smoke.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-06-17T16:17:44.421Z
- Branch: task/202606171318-HMV399/platform-sync
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/cli/run-cli.core.platform-sync.test.ts     | 205 +++++++
 .../src/cli/run-cli.core.route-decision.test.ts    | 104 ++++
 .../src/cli/run-cli/command-catalog/core.ts        |  14 +
 .../src/cli/run-cli/command-loaders/core.ts        |   3 +
 .../agentplane/src/cli/run-cli/commands/ide.ts     | 150 +----
 .../src/cli/run-cli/commands/init/ide-sync.ts      |  11 +-
 .../src/cli/run-cli/commands/platform.ts           | 662 +++++++++++++++++++++
 .../src/commands/pr/internal/sync-github.test.ts   |  21 +
 .../src/commands/pr/internal/sync-github.ts        |   2 +-
 .../src/commands/shared/route-decision.ts          |  14 +-
 10 files changed, 1036 insertions(+), 150 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
