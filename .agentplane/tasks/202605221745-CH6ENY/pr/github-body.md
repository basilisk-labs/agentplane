Task: `202605221745-CH6ENY`
Title: Expose batch ownership in agent context
Canonical task record: `.agentplane/tasks/202605221745-CH6ENY/README.md`

## Summary

Expose batch ownership in agent context

Expose primary batch task, included task ids, shared worktree branch, per-task verification state, and next owner action in route/brief output so agents do not confuse satellite tasks with integration owners.

## Scope

- In scope: Expose primary batch task, included task ids, shared worktree branch, per-task verification state, and next owner action in route/brief output so agents do not confuse satellite tasks with integration owners.
- Out of scope: unrelated refactors not required for "Expose batch ownership in agent context".

## Verification

- State: ok
- Note:

```text
Removed exported-only batch task state type after verify-static/knip flagged it; local knip, format,
and batch tests pass.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-23T03:56:45.011Z
- Branch: task/202605221745-CH6ENY/batch-ownership-context
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../cli/run-cli.core.route-decision.batch.test.ts  | 253 +++++++++++++++++++++
 .../src/cli/run-cli.core.route-decision.test.ts    |   1 +
 .../src/commands/shared/route-batch-ownership.ts   | 158 +++++++++++++
 .../src/commands/shared/route-decision.ts          |  37 ++-
 .../agentplane/src/commands/task/brief.command.ts  |  73 ++++++
 .../agentplane/src/commands/task/status.command.ts |  26 +++
 6 files changed, 541 insertions(+), 7 deletions(-)
```

</details>
