Task: `202607311055-ST7XZY`
Title: Eliminate direct workflow state-neutral routing loops
Canonical task record: `.agentplane/tasks/202607311055-ST7XZY/README.md`

## Summary

Eliminate direct workflow state-neutral routing loops

Audit v0.6.25 direct workflow route decisions for successful state-neutral command loops; fix DOING plus pending verification plus absent runner routing; add deterministic recovery for untracked canonical task artifacts; add exact and analogous regression coverage without touching main.

## Scope

- In scope: v0.6.25 direct route selection, execution-packet safety, runner guidance, exact-state and analogous route regressions, untracked canonical task-artifact detection/recovery, and v0.6.26 maintenance release evidence.
- Out of scope: main, agentplane-loops, unrelated 0.7 work, provider redesign, and automatic commits that bypass configured approval policy.

## Verification

- State: needs_rework
- Note: Rework: stale pre-merge closure accepted after implementation changes.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-07-31T11:08:32.287Z
- Branch: task/202607311055-ST7XZY/eliminate-direct-workflow-state-neutral-routing
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 ...cli.core.route-decision.direct-closeout.test.ts | 224 ++++++++++++++++++++-
 .../run-cli.core.route-decision.quality.test.ts    | 103 ++++++++++
 .../src/cli/run-cli.core.route-decision.test.ts    |   7 +-
 .../src/cli/run-cli.core.task-guided.test.ts       |   2 +-
 .../src/commands/shared/route-decision-blockers.ts |  44 +++-
 .../commands/shared/route-decision-next-action.ts  |  74 ++++---
 .../src/commands/shared/route-decision-repair.ts   |  10 +-
 .../src/commands/shared/route-execution-packet.ts  |   3 +
 .../agentplane/src/commands/shared/route-oracle.ts |  15 +-
 .../src/commands/shared/task-handoff.test.ts       |  36 ++++
 .../agentplane/src/commands/shared/task-handoff.ts |   2 +-
 .../agentplane/src/commands/task/begin.command.ts  |   2 +-
 .../agentplane/src/commands/task/task.command.ts   |   4 +-
 13 files changed, 470 insertions(+), 56 deletions(-)
```

</details>
