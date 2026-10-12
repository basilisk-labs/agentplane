# PR Review

Created: 2026-10-12T15:29:25.183Z

## Task

- Task: `202610120014-1C3ZFG`
- Title: Integrate reviewed XTX M2 and S8 nine-path corrections on canonical main
- Status: DOING
- Branch: `task/202610120014-1C3ZFG/integrate-reviewed-xtx-m2-and-s8-nine-path-corre`
- Canonical task record: `.agentplane/tasks/202610120014-1C3ZFG/README.md`

## Verification

- State: ok
- Note: Canonical validation sha256:1852371885ab3272ccd7f1a9471cdc2ac7ca5930105ea4a607ddab61ba479807
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-10-12T15:29:25.183Z
- Branch: task/202610120014-1C3ZFG/integrate-reviewed-xtx-m2-and-s8-nine-path-corre
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 ...run-cli.core.pr-flow.pr-open.validation.test.ts | 426 +++++++++++++++
 .../impl/commands.commit-non-close.unit.test.ts    | 161 ++++--
 .../src/commands/guard/impl/commit-refresh.ts      |   3 +-
 .../agentplane/src/commands/guard/impl/commit.ts   |   1 +
 packages/agentplane/src/commands/pr/open.ts        |  24 +
 .../src/commands/task/kernel-exchange.ts           |   2 +
 .../commands/task/kernel-recovery-evidence.test.ts | 598 ++++++++++++++++++++-
 .../src/commands/task/kernel-recovery-evidence.ts  | 215 +++++++-
 .../commands/task/kernel-rework-lineage.test.ts    | 419 +++++++++------
 .../src/commands/task/kernel-rework-lineage.ts     | 112 ++--
 .../commands/task/kernel-scope-replan-inputs.ts    | 168 ++++++
 .../src/runner/process-supervision.test.ts         | 151 ++++--
 .../src/runner/process-supervision/process-tree.ts |  84 ++-
 .../src/runner/process-supervision/run.ts          |  57 +-
 .../process-supervision/timeout-controller.ts      |  23 +-
 packages/core/src/tasks/task-kernel/index.ts       |   1 +
 .../src/tasks/task-kernel/kernel-replan.test.ts    | 316 +++++++++--
 packages/core/src/tasks/task-kernel/kernel.ts      |  28 +-
 .../tasks/task-kernel/replan-work-items.test.ts    | 253 +++++++++
 .../src/tasks/task-kernel/replan-work-items.ts     | 174 ++++++
 20 files changed, 2833 insertions(+), 383 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
