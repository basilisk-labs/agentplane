Task: `202605131125-68KKFW`
Title: Split human and agent CLI output
Canonical task record: `.agentplane/tasks/202605131125-68KKFW/README.md`

## Summary

Split human and agent CLI output

Make the long-form agentplane command render a cleaner human-oriented output with spacing, alignment, and color while keeping the short ap command minimal and unstyled for agent consumption.

## Scope

- In scope: Make the long-form agentplane command render a cleaner human-oriented output with spacing, alignment, and color while keeping the short ap command minimal and unstyled for agent consumption.
- Out of scope: unrelated refactors not required for "Split human and agent CLI output".

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-13T11:57:06.791Z
- Branch: task/202605131125-68KKFW/split-cli-output
- Head: ec32aeedaa16

```text
 .../blueprint/resolved-snapshot.json               | 513 +++++++++++++++++++++
 .../src/backends/task-backend/cloud-pull.ts        |   5 +-
 .../task-backend/redmine/backend-sync/sync.ts      |  10 +-
 packages/agentplane/src/cli/output.test.ts         |  34 +-
 packages/agentplane/src/cli/output.ts              | 127 ++++-
 .../agentplane/src/cli/run-cli.core.init.test.ts   |   3 +
 packages/agentplane/src/commands/acr/validate.ts   |   3 +-
 packages/agentplane/src/commands/doctor.run.ts     |   4 +-
 8 files changed, 677 insertions(+), 22 deletions(-)
```

</details>
