# PR Review

Created: 2026-09-23T10:25:48.224Z

## Task

- Task: `202609230942-E6D0V4`
- Title: Make canonical AgentPlane autonomy safe and default
- Status: DOING
- Branch: `task/202609230942-E6D0V4/make-canonical-agentplane-autonomy-safe-and-defa`
- Canonical task record: `.agentplane/tasks/202609230942-E6D0V4/README.md`

## Verification

- State: ok
- Note: Canonical validation sha256:5e8298c1a7b3254408d6f69fb13ffd26cb6b44f617b306f78672546c59375241
- Canonical workflow state lives in the task README.

## Handoff Notes

- No handoff notes recorded yet. Use `agentplane pr note ...` to append one.

<!-- BEGIN AUTO SUMMARY -->
<details>
<summary>Raw evidence</summary>

- Updated: 2026-09-23T10:25:48.224Z
- Branch: task/202609230942-E6D0V4/make-canonical-agentplane-autonomy-safe-and-defa
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 docs/developer/task-execution-authority.mdx        |  13 +-
 docs/user/cli-reference.generated.mdx              |   5 +
 docs/user/configuration.mdx                        |  10 +-
 docs/user/task-lifecycle.mdx                       |  30 ++--
 .../task-backend/kernel-authority-schema.ts        |   2 +-
 .../src/commands/task/advance-task-step.ts         |  17 +++
 .../agentplane/src/commands/task/create.command.ts | 153 ++++++++++++++++++-
 .../commands/task/kernel-plan-authority.test.ts    | 170 +++++++++++++++++++++
 .../src/commands/task/kernel-plan-authority.ts     | 104 +++++++++++++
 .../agentplane/src/commands/task/kernel-plan.ts    |   2 +
 .../src/commands/task/kernel-runtime-context.ts    |  37 ++++-
 .../src/commands/task/kernel-semantic-result.ts    |   2 +
 packages/agentplane/src/commands/task/new.ts       |  34 +++--
 .../src/runner/usecases/kernel-authority.test.ts   | 108 +++++++------
 .../src/runner/usecases/kernel-authority.ts        |  49 +++++-
 .../core/src/tasks/task-artifact-schema.task.ts    |   8 +
 .../src/tasks/task-kernel/authority-lineage.ts     |  20 ++-
 packages/core/src/tasks/task-kernel/kernel.ts      |  11 +-
 packages/core/src/tasks/task-kernel/model.ts       |   3 +-
 .../task-kernel/repository-policy-approval.test.ts |  63 ++++++++
 packages/core/src/tasks/task-store.ts              |   4 +
 21 files changed, 738 insertions(+), 107 deletions(-)
```

</details>
<!-- END AUTO SUMMARY -->
