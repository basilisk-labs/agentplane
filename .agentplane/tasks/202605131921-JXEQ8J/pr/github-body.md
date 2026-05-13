Task: `202605131921-JXEQ8J`
Title: Cloud backend: optional auto-push task status changes to remote
Canonical task record: `.agentplane/tasks/202605131921-JXEQ8J/README.md`

## Summary

Cloud backend: optional auto-push task status changes to remote

Goal: When the project uses cloud backend, changes to local task status made via AgentPlane lifecycle commands should be able to propagate to the remote connector (GitHub issue state/status) without requiring a manual  step.

Design constraints:
- Must be opt-in (flag or config), to preserve the current explicit-sync model by default.
- Must be safe under branch_pr and not leak secrets; surface clear error when token/env is missing.
- Must not run if the cloud projection is stale or conflicts exist; should advise the safe pull command first.

Acceptance criteria:
- Provide a documented toggle/flag that triggers an immediate cloud push after status-mutating commands (finish/verify/start-ready/block/mark).
- Include focused tests validating the toggle triggers a push call and respects staleness/conflict gates.
- Update cloud backend docs to explain the new opt-in behavior.

## Scope

- In scope: Goal: When the project uses cloud backend, changes to local task status made via AgentPlane lifecycle commands should be able to propagate to the remote connector (GitHub issue state/status) without requiring a manual  step. Design constraints: - Must be opt-in (flag or config), to preserve the current explicit-sync model by default. - Must be safe under branch_pr and not leak secrets; surface clear error when token/env is missing. - Must not run if the cloud projection is stale or conflicts exist; should advise the safe pull command first. Acceptance criteria: - Provide a documented toggle/flag that triggers an immediate cloud push after status-mutating commands (finish/verify/start-ready/block/mark). - Include focused tests validating the toggle triggers a push call and respects staleness/conflict gates. - Update cloud backend docs to explain the new opt-in behavior.
- Out of scope: unrelated refactors not required for "Cloud backend: optional auto-push task status changes to remote".

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-13T19:40:40.747Z
- Branch: task/202605131921-JXEQ8J/cloud-auto-sync
- Head: e4f235b15a4d

```text
 .../blueprint/resolved-snapshot.json               | 551 +++++++++++++++++++++
 docs/user/backends/cloud.mdx                       |  21 +
 .../src/backends/task-backend/cloud-backend.ts     |   6 +
 .../src/cli/run-cli.core.backend-sync.test.ts      |  49 ++
 packages/agentplane/src/commands/backend.ts        |  87 +++-
 .../src/commands/backend/sync.command.ts           |  26 +
 .../src/commands/task/shared/transition-command.ts |  53 +-
 .../task/shared/transition-command.unit.test.ts    |  96 ++++
 8 files changed, 882 insertions(+), 7 deletions(-)
```

</details>
