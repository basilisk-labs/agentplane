## Summary

Migrate task command paths onto backend capability facade

Route task show and task mutation command helpers through capability-aware service helpers so command logic no longer special-cases the local backend directly.

## Scope

- In scope: Route task show and task mutation command helpers through capability-aware service helpers so command logic no longer special-cases the local backend directly.
- Out of scope: unrelated refactors not required for "Migrate task command paths onto backend capability facade".

## Verification

- State: ok
- Note: branch_pr drift detection and hosted merge sync now route through backend capabilities with backward-safe fallback for older backend doubles; targeted tests, typecheck, and lint passed.
- Full verification checklist lives in local review.md.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-04-18T07:17:11.025Z
- Branch: task/202604180617-8RSXN9/task-command-capabilities
- Head: 0554cc19835d

```text
 .agentplane/tasks/202604180617-MV8SE2/README.md    | 119 +++++++++++++++++++++
 .../tasks/202604180617-MV8SE2/pr/diffstat.txt      |   0
 .../tasks/202604180617-MV8SE2/pr/github-body.md    |  33 ++++++
 .../tasks/202604180617-MV8SE2/pr/github-title.txt  |   1 +
 .agentplane/tasks/202604180617-MV8SE2/pr/meta.json |  14 +++
 .../tasks/202604180617-MV8SE2/pr/notes.jsonl       |   0
 .agentplane/tasks/202604180617-MV8SE2/pr/review.md |  57 ++++++++++
 .../tasks/202604180617-MV8SE2/pr/verify.log        |   0
 .agentplane/tasks/202604180617-SWBDDT/README.md    |  87 +++++++++++++++
 .../agentplane/src/commands/shared/task-backend.ts |  24 ++++-
 .../src/commands/shared/task-mutation.test.ts      |  25 ++++-
 .../src/commands/shared/task-mutation.ts           |  12 ++-
 .../src/commands/shared/task-store/store.ts        |   5 +-
 .../src/commands/task/block.unit.test.ts           |   1 +
 .../agentplane/src/commands/task/doc.unit.test.ts  |   1 +
 .../agentplane/src/commands/task/finish-shared.ts  |  10 +-
 packages/agentplane/src/commands/task/finish.ts    |  10 +-
 .../src/commands/task/finish.unit.test.ts          |   1 +
 .../src/commands/task/mutation-parity.unit.test.ts |  11 ++
 .../agentplane/src/commands/task/plan.unit.test.ts |   1 +
 .../src/commands/task/set-status.unit.test.ts      |   1 +
 packages/agentplane/src/commands/task/show.ts      |   5 +-
 .../src/commands/task/start.unit.test.ts           |   1 +
 .../src/commands/task/verify-record.unit.test.ts   |   1 +
 .../src/commands/workflow.task-doc.test.ts         |  46 +++++++-
 25 files changed, 446 insertions(+), 20 deletions(-)
```

</details>
