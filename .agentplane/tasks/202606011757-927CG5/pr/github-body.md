Task: `202606011757-927CG5`
Title: Restore maximum assimilation task ACR artifact
Canonical task record: `.agentplane/tasks/202606011757-927CG5/README.md`

## Summary

Restore maximum assimilation task ACR artifact

Commit the missing task-local acr.json for completed maximum-assimilation task 202606011717-C22C3X and verify context verify-task passes on main state. Scope is limited to deterministic ACR repair and task traceability for the post-merge validation gap.

## Scope

- In scope: Commit the missing task-local acr.json for completed maximum-assimilation task 202606011717-C22C3X and verify context verify-task passes on main state. Scope is limited to deterministic ACR repair and task traceability for the post-merge validation gap.
- Out of scope: unrelated refactors not required for "Restore maximum assimilation task ACR artifact".

## Verification

- State: ok
- Note: Review fix verified: disabled optional ACR refresh now filters mixed finish batches to context tasks only.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-06-01T17:57:54.576Z
- Branch: task/202606011757-927CG5/restore-maximum-assimilation-task-acr-artifact
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .agentplane/tasks/202606011717-C22C3X/acr.json     | 344 +++++++++++++++++++++
 .../src/commands/acr/acr.command.test.ts           |  25 ++
 .../src/commands/acr/generate-extensions.ts        |   1 +
 .../commands/task/finish-acr-refresh.unit.test.ts  | 120 +++++++
 .../agentplane/src/commands/task/finish-shared.ts  |   9 +-
 5 files changed, 497 insertions(+), 2 deletions(-)
```

</details>
