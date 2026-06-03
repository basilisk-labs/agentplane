Task: `202606031931-MY3BW9`
Title: Fix upstream issue #4407: Direct workflow leaves verified tasks active and routes them back to run
Canonical task record: `.agentplane/tasks/202606031931-MY3BW9/README.md`

## Summary

Fix upstream issue #4407: Direct workflow leaves verified tasks active and routes them back to run

Resolve https://github.com/basilisk-labs/agentplane/issues/4407

## Scope

- In scope: Resolve https://github.com/basilisk-labs/agentplane/issues/4407.
- Out of scope: unrelated refactors not required for "Fix upstream issue #4407: Direct workflow leaves verified tasks active and routes them back to run".

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-06-03T19:32:40.634Z
- Branch: task/202606031931-MY3BW9/fix-upstream-issue-4407-direct-workflow-leaves-v
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/cli/run-cli.core.route-decision.test.ts    | 79 ++++++++++++++++++
 .../src/commands/hermes/hermes-runtime.ts          |  8 ++
 .../commands/shared/route-decision-next-action.ts  | 12 +++
 .../agentplane/src/commands/shared/route-oracle.ts |  7 +-
 packages/agentplane/src/commands/task/list.ts      |  5 ++
 .../commands/task/shared/branch-pr-list-state.ts   | 93 +++++++++++++++++++---
 6 files changed, 194 insertions(+), 10 deletions(-)
```

</details>
