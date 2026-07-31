Task: `202607221908-2NDXVB`
Title: Migrate task, lifecycle, and route command boundaries
Canonical task record: `.agentplane/tasks/202607221908-2NDXVB/README.md`

## Summary

Migrate task, lifecycle, and route command boundaries

RF-24/RF-25 vertical slice: move task/lifecycle/route commands to granular sessions, typed workflow results, and centralized renderers without reconstructing route state or parsing stdout.

## Scope

- In scope: task read/write, plan/start/verify/finish, brief/next-action/status, worktree/PR route projections, granular backend/Git/route/policy capabilities, typed results/errors, and human/JSON compatibility rendering.
- Out of scope: context, runner/Hermes, and provider/release operation execution.

## Verification

- State: ok
- Note:

```text
Passed: granular capability denial, lazy remote provider resolution, typed lifecycle rendering,
invariants, guards, typecheck, architecture, critical and focused matrices. Full-suite timeout
classified against clean main.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-07-31T23:35:34.211Z
- Branch: task/202607221908-2NDXVB/migrate-task-lifecycle-and-route-command-boundar
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/cli/run-cli.core.command-session.test.ts   |  57 +++++-
 .../src/cli/run-cli/command-catalog.test.ts        |  83 ++++++++
 .../src/cli/run-cli/command-catalog/kernel.test.ts |  27 +++
 .../src/cli/run-cli/command-catalog/lifecycle.ts   |  27 ++-
 .../command-catalog/task-capability-profiles.ts    |  45 +++++
 .../src/cli/run-cli/command-catalog/task.ts        | 169 +++++++++++-----
 .../src/cli/run-cli/command-loaders/lifecycle.ts   |  49 +++--
 .../src/cli/run-cli/command-loaders/task.ts        | 220 ++++++++++++---------
 .../agentplane/src/commands/task/begin.command.ts  |  37 +---
 .../agentplane/src/commands/task/brief.command.ts  |   9 +-
 packages/agentplane/src/commands/task/plan.ts      |  18 +-
 .../agentplane/src/commands/task/status.command.ts |   9 +-
 12 files changed, 545 insertions(+), 205 deletions(-)
```

</details>
