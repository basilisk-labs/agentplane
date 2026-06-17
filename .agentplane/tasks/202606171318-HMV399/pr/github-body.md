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
- Note:

```text
Verified: route loop fix, OPEN PR metadata persistence, platform registry split, typecheck, hotspot
contract, and focused platform/route tests pass on final branch head.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-06-17T16:17:44.421Z
- Branch: task/202606171318-HMV399/platform-sync
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/cli/run-cli.core.platform-sync.test.ts     | 205 ++++++++++
 ...li.core.route-decision.pr-open-metadata.test.ts | 152 ++++++++
 .../src/cli/run-cli/command-catalog/core.ts        |  14 +
 .../src/cli/run-cli/command-loaders/core.ts        |   3 +
 .../agentplane/src/cli/run-cli/commands/ide.ts     | 150 +-------
 .../src/cli/run-cli/commands/init/ide-sync.ts      |  12 +-
 .../src/cli/run-cli/commands/platform-registry.ts  | 253 +++++++++++++
 .../src/cli/run-cli/commands/platform.ts           | 416 +++++++++++++++++++++
 .../src/commands/pr/internal/sync-github.test.ts   |  21 ++
 .../src/commands/pr/internal/sync-github.ts        |   2 +-
 .../src/commands/shared/route-decision.ts          |  14 +-
 11 files changed, 1092 insertions(+), 150 deletions(-)
```

</details>
