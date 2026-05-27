Task: `202605271737-1K3J53`
Title: Strengthen task route oracle
Canonical task record: `.agentplane/tasks/202605271737-1K3J53/README.md`

## Summary

Strengthen task route oracle

Enhance the CLI route oracle so one command reports the current phase, authoritative checkout, blocker, and next concrete command for agent execution.

## Scope

- In scope: Enhance the CLI route oracle so one command reports the current phase, authoritative checkout, blocker, and next concrete command for agent execution.
- Out of scope: unrelated refactors not required for "Strengthen task route oracle".

## Verification

- State: ok
- Note: Refactored route oracle into a separate module after hosted hotspot failure.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-27T17:39:04.987Z
- Branch: task/202605271737-1K3J53/strengthen-task-route-oracle
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/cli/run-cli.core.route-decision.test.ts    |  31 ++++-
 .../src/commands/shared/route-decision.ts          |  19 ++-
 .../agentplane/src/commands/shared/route-oracle.ts | 150 +++++++++++++++++++++
 .../agentplane/src/commands/task/brief.command.ts  |   6 +
 .../src/commands/task/next-action.command.ts       |  11 +-
 .../agentplane/src/commands/task/status.command.ts |   4 +-
 6 files changed, 213 insertions(+), 8 deletions(-)
```

</details>
