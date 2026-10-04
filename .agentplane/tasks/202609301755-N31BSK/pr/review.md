# PR Review

Created: 2026-09-30T18:55:25.973Z

## Task

- Task: `202609301755-N31BSK`
- Title: Recover policy authority without losing approved task progress
- Status: DOING
- Branch: `task/202609301755-N31BSK/recover-policy-authority-without-losing-approved`
- Canonical task record: `.agentplane/tasks/202609301755-N31BSK/README.md`

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-09-30T18:55:25.973Z
- Branch: task/202609301755-N31BSK/recover-policy-authority-without-losing-approved
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 docs/user/cli-reference.generated.mdx              |   1 +
 docs/user/task-lifecycle.mdx                       |  18 +++
 .../task-backend/kernel-authority-schema.ts        |   7 +-
 .../src/cli/run-cli.core.help-snap.test.ts         |  10 ++
 .../run-cli.core.policy-authority-renewal.test.ts  | 148 +++++++++++++++++++
 .../src/commands/task/plan-approve.command.ts      |  30 +++-
 .../src/runner/usecases/kernel-authority.test.ts   | 160 +++++++++++++++++++++
 .../src/runner/usecases/kernel-authority.ts        |  12 ++
 .../src/runner/usecases/kernel-policy-renewal.ts   | 101 +++++++++++++
 .../src/tasks/task-kernel/authority-lineage.ts     | 102 ++++++++++++-
 packages/core/src/tasks/task-kernel/index.ts       |   3 +
 packages/core/src/tasks/task-kernel/kernel.ts      |  26 ++++
 packages/core/src/tasks/task-kernel/model.ts       |   3 +-
 .../src/tasks/task-kernel/policy-renewal.test.ts   | 109 ++++++++++++++
 website/static/llms-full.txt                       |  18 +++
 15 files changed, 744 insertions(+), 4 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
