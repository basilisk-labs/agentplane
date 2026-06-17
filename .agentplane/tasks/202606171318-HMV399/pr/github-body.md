Task: `202606171318-HMV399`
Title: Add platform sync for agent instruction surfaces
Canonical task record: `.agentplane/tasks/202606171318-HMV399/README.md`

## Summary

Add platform sync for agent instruction surfaces

Implement platform sync for major agent platforms by projecting AgentPlane discipline into native instruction files, excluding runner integration.

## Scope

- In scope: Implement platform sync for major agent platforms by projecting AgentPlane discipline into native instruction files, excluding runner integration.
- Out of scope: unrelated refactors not required for "Add platform sync for agent instruction surfaces".

## Verification

- State: ok
- Note: Implemented platform sync instruction-surface projections and verified targeted CLI behavior.
- Canonical workflow state lives in the task README.

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
