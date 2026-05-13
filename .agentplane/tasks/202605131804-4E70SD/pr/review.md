# PR Review

Created: 2026-05-13T18:09:21.608Z

## Task

- Task: `202605131804-4E70SD`
- Title: Add phase-aware policy engine
- Status: DOING
- Branch: `task/202605131804-4E70SD/phase-aware-policy`
- Canonical task record: `.agentplane/tasks/202605131804-4E70SD/README.md`

## Verification

- State: ok
- Note: Verified: phase-aware policy engine added and wired into lifecycle choke points. Checks passed: bun run typecheck; policy/evaluate tests; policy/engine tests; plan unit tests; workflow verify hooks; finish validation tests; integrate cmd tests; workflow.test; targeted eslint; git diff --check; node .agentplane/policy/check-routing.mjs; ap doctor.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-13T18:55:17.018Z
- Branch: task/202605131804-4E70SD/phase-aware-policy
- Head: f8741fe95a5f

```text
 .../blueprint/resolved-snapshot.json               | 551 +++++++++++++++++++++
 packages/agentplane/src/cli/exit-codes.ts          |   1 +
 .../agentplane/src/commands/branch/work-start.ts   |  17 +
 .../agentplane/src/commands/pr/integrate/cmd.ts    |  18 +
 .../agentplane/src/commands/shared/policy-deny.ts  |  15 +
 .../src/commands/shared/task-mutation.ts           |  52 +-
 packages/agentplane/src/commands/task/block.ts     |   1 +
 .../agentplane/src/commands/task/close-shared.ts   |   1 +
 .../agentplane/src/commands/task/finish-execute.ts |  27 +
 .../agentplane/src/commands/task/new.command.ts    |  16 +-
 packages/agentplane/src/commands/task/plan.ts      |  36 +-
 .../agentplane/src/commands/task/set-status.ts     |   1 +
 .../src/commands/task/shared/transition-command.ts |   3 +
 packages/agentplane/src/commands/task/start.ts     |   1 +
 .../src/commands/task/verify-record-execute.ts     |   2 +
 packages/agentplane/src/policy/engine.test.ts      |  53 ++
 packages/agentplane/src/policy/engine.ts           |  23 +-
 packages/agentplane/src/policy/model.ts            |  14 +-
 packages/agentplane/src/policy/rules/phase.ts      |  74 +++
 packages/agentplane/src/policy/taxonomy.ts         |  30 ++
 packages/agentplane/src/shared/errors.ts           |   2 +
 scripts/baselines/knip-baseline.json               |  10 -
 22 files changed, 920 insertions(+), 28 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
