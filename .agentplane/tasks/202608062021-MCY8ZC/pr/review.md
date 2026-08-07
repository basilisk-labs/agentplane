# PR Review

Created: 2026-08-06T21:35:28.993Z

## Task

- Task: `202608062021-MCY8ZC`
- Title: Polish the external supervisor protocol and canonical task help
- Status: DOING
- Branch: `task/202608062021-MCY8ZC/polish-the-external-supervisor-protocol-and-cano`
- Canonical task record: `.agentplane/tasks/202608062021-MCY8ZC/README.md`

## Verification

- State: ok
- Note: Rebased onto current main; protocol, compact help, generated docs, type safety, and all critical compatibility gates pass.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-06T21:35:52.329Z
- Branch: task/202608062021-MCY8ZC/polish-the-external-supervisor-protocol-and-cano
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 docs/user/cli-reference.generated.mdx              |  49 +++++
 .../run-cli.core.help-snap.test.ts.snap            |  12 +-
 .../src/cli/run-cli.core.help-contract.test.ts     |   8 +-
 .../src/cli/run-cli.core.task-advance.test.ts      | 211 ++++++++++++++++-----
 .../src/cli/run-cli.core.task-guided.test.ts       |   2 +-
 packages/agentplane/src/cli/run-cli.core.test.ts   |  18 +-
 .../src/commands/shared/route-decision-blockers.ts |  18 ++
 .../agentplane/src/commands/shared/route-oracle.ts |   1 +
 .../src/commands/shared/workflow-step-branch.ts    |  14 +-
 .../shared/workflow-step-fingerprint.test.ts       |   4 +-
 .../src/commands/shared/workflow-step-reducer.ts   |  28 +++
 .../src/commands/shared/workflow-step.test.ts      |  42 +++-
 .../src/commands/shared/workflow-step.ts           |   4 +
 .../src/commands/task/advance.command.ts           |  66 +++++--
 .../src/commands/task/agent-action-packet.test.ts  |  78 +++++++-
 .../src/commands/task/agent-action-packet.ts       |  71 ++++++-
 .../agentplane/src/commands/task/begin.command.ts  |   2 +-
 .../agentplane/src/commands/task/task.command.ts   |  62 ++----
 18 files changed, 545 insertions(+), 145 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
