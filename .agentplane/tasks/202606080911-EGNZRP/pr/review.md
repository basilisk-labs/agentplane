# PR Review

Created: 2026-06-08T09:12:54.861Z

## Task

- Task: `202606080911-EGNZRP`
- Title: Harden agent route terminal contract
- Status: DOING
- Branch: `task/202606080911-EGNZRP/harden-agent-route-terminal-contract`
- Canonical task record: `.agentplane/tasks/202606080911-EGNZRP/README.md`

## Verification

- State: ok
- Note: Reverified route terminal contract after hotspot fix.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-06-08T09:12:54.861Z
- Branch: task/202606080911-EGNZRP/harden-agent-route-terminal-contract
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/cli/run-cli.core.route-decision.test.ts    |  11 ++-
 .../cli/run-cli.core.task-next-action-json.test.ts | 108 +++++++++++++++++++++
 .../src/commands/branch/cleanup-merged.ts          |   4 +-
 .../commands/shared/route-decision-next-action.ts  |   9 ++
 .../src/commands/shared/route-decision-types.ts    |   2 +
 .../src/commands/shared/route-decision.ts          |  37 ++++++-
 .../agentplane/src/commands/shared/route-oracle.ts |   6 ++
 .../src/commands/task/next-action.command.ts       | 107 +++++++++++++++++++-
 .../agentplane/src/commands/task/status.command.ts |   8 ++
 .../src/runner/usecases/task-run-bootstrap.ts      |  18 +++-
 10 files changed, 296 insertions(+), 14 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
