Task: `202608032116-V9DBA5`
Title: Restore ACR generation in hosted close qualification
Canonical task record: `.agentplane/tasks/202608032116-V9DBA5/README.md`

## Summary

Restore ACR generation in hosted close qualification

Reproduce why task hosted-close reports success but silently omits acr.json, make hosted close either persist the required ACR or fail with actionable evidence, and preserve idempotent hosted closure.

## Scope

- In scope: Reproduce why task hosted-close reports success but silently omits acr.json, make hosted close either persist the required ACR or fail with actionable evidence, and preserve idempotent hosted closure.
- Out of scope: unrelated refactors not required for "Restore ACR generation in hosted close qualification".

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-03T21:36:24.646Z
- Branch: task/202608032116-V9DBA5/restore-acr-generation-in-hosted-close-qualifica
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 docs/user/commands.mdx                             |  2 +-
 .../src/cli/run-cli.core.task-hosted-close.test.ts |  3 +++
 packages/agentplane/src/commands/acr/generate.ts   |  2 +-
 .../commands/task/finish-acr-refresh.unit.test.ts  | 27 ++++++++++++++++++++++
 .../agentplane/src/commands/task/finish-shared.ts  | 21 +++++++++++++++--
 .../src/commands/task/hosted-close.command.ts      |  1 +
 6 files changed, 52 insertions(+), 4 deletions(-)
```

</details>
