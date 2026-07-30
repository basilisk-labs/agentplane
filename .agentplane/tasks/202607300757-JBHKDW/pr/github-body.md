Task: `202607300757-JBHKDW`
Title: Fix direct verified-task closeout route
Canonical task record: `.agentplane/tasks/202607300757-JBHKDW/README.md`

## Summary

Fix direct verified-task closeout route

Reproduce and fix v0.6.24 route guidance that selects task complete with placeholder arguments, leaving verified direct-workflow tasks without an argv-safe closeout command.

## Scope

- In scope: Reproduce and fix v0.6.24 route guidance that selects task complete with placeholder arguments, leaving verified direct-workflow tasks without an argv-safe closeout command.
- Out of scope: unrelated refactors not required for "Fix direct verified-task closeout route".

## Verification

- State: ok
- Note:

```text
Verified: direct verified-task closeout now emits concrete exactArgv, safe_to_mutate=true, and
canExecuteNow=true; targeted and full fast CI passed.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-07-30T10:44:25.661Z
- Branch: task/202607300757-JBHKDW/fix-direct-verified-task-closeout-route
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../run-cli.core.route-decision.work-start.test.ts | 140 +++++++++++++++++++++
 .../commands/shared/route-decision-next-action.ts  |   8 ++
 .../agentplane/src/commands/task/handoff.shared.ts |  35 +++++-
 3 files changed, 181 insertions(+), 2 deletions(-)
```

</details>
