# PR Review

Created: 2026-07-31T19:53:56.576Z

## Task

- Task: `202607221854-RW8CJF`
- Title: Define granular CommandSession capabilities and migrate a pilot slice
- Status: DONE
- Branch: `task/202607221854-RW8CJF/define-granular-commandsession-capabilities-and`
- Canonical task record: `.agentplane/tasks/202607221854-RW8CJF/README.md`

## Verification

- State: ok
- Note: Hosted hotspot regression resolved by moving the trace integration case into a dedicated test file; hotspots baseline, 13 focused tests, and typecheck pass at 32da254a5.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-07-31T20:23:47.343Z
- Branch: task/202607221854-RW8CJF/define-granular-commandsession-capabilities-and
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/cli/run-cli.command-session.test.ts        |  38 +++
 packages/agentplane/src/cli/run-cli.ts             |  13 +
 .../src/cli/run-cli/command-catalog.test.ts        |  39 +++
 .../agentplane/src/cli/run-cli/command-catalog.ts  |   9 +-
 .../cli/run-cli/command-catalog/command-session.ts | 262 +++++++++++++++++++++
 .../src/cli/run-cli/command-catalog/core.ts        |  11 +-
 .../src/cli/run-cli/command-catalog/kernel.test.ts | 139 +++++++++++
 .../src/cli/run-cli/command-catalog/kernel.ts      | 158 +++++++++++--
 .../src/cli/run-cli/command-catalog/lifecycle.ts   |   6 +-
 .../src/cli/run-cli/command-catalog/project.ts     |  18 +-
 .../src/cli/run-cli/command-catalog/task.ts        |  21 +-
 .../src/cli/run-cli/command-loaders/core.ts        |  18 +-
 .../src/cli/run-cli/command-loaders/lifecycle.ts   |   6 +-
 .../src/cli/run-cli/command-loaders/project.ts     |  24 +-
 .../src/cli/run-cli/command-loaders/task.ts        |  32 ++-
 .../agentplane/src/cli/run-cli/commands/config.ts  |   6 +-
 .../src/cli/run-cli/commands/core/agents.ts        |   4 +-
 .../agentplane/src/cli/run-cli/registry.run.ts     |  17 +-
 .../src/commands/task/next-action.command.ts       |  10 +-
 19 files changed, 776 insertions(+), 55 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
