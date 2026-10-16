# PR Review

Created: 2026-10-16T05:41:13.733Z

## Task

- Task: `202610160500-6RCQSY`
- Title: Expose auditable USER cancellation for withdrawn mandatory scope on started canonical tasks
- Status: DONE
- Branch: `task/202610160500-6RCQSY/withdrawn-scope-cancellation`
- Canonical task record: `.agentplane/tasks/202610160500-6RCQSY/README.md`

## Verification

- State: ok
- Note: Verified: canonical Task Kernel final checks passed.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-10-16T05:41:13.733Z
- Branch: task/202610160500-6RCQSY/withdrawn-scope-cancellation
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/adapters/task-backend/kernel-record.ts     |  12 +
 .../src/cli/run-cli/command-catalog/task.ts        | 101 +++-----
 .../src/cli/run-cli/command-loaders/task.ts        |   5 +
 .../agentplane/src/commands/task/cancel.command.ts |  88 +++++++
 .../src/commands/task/kernel-cancellation.test.ts  | 272 +++++++++++++++++++++
 .../src/commands/task/kernel-cancellation.ts       | 239 ++++++++++++++++++
 .../usecases/task-run-active-claim-record.ts       |   5 +-
 .../src/runner/usecases/task-run-active-claim.ts   |   4 +-
 .../src/tasks/task-kernel/cancellation.test.ts     | 156 ++++++++++++
 .../core/src/tasks/task-kernel/cancellation.ts     |  77 ++++++
 packages/core/src/tasks/task-kernel/kernel.ts      |  32 +++
 packages/core/src/tasks/task-kernel/model.ts       |  24 ++
 .../baselines/v0.7-compatibility-candidate.json    | 137 ++++++++++-
 .../check-compatibility-contract-baseline.mjs      |  88 ++++++-
 14 files changed, 1164 insertions(+), 76 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
