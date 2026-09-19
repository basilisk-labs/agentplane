Task: `202609190050-3MJ7GQ`
Title: Persist the verified Task Kernel native identity release blocker through the canonical repository coordinator
Canonical task record: `.agentplane/tasks/202609190050-3MJ7GQ/README.md`

## Summary

Persist the verified Task Kernel native identity release blocker through the canonical repository coordinator

Carry the already validated two-file native identity repair into an AgentPlane-owned commit using the repaired canonical repository coordinator. Scope is only native-task-identity.ts and native-task-identity.test.ts. This unblocks provider publication for task 202609172016-5A9KVM.

## Scope

- In scope: Carry the already validated two-file native identity repair into an AgentPlane-owned commit using the repaired canonical repository coordinator. Scope is only native-task-identity.ts and native-task-identity.test.ts. This unblocks provider publication for task 202609172016-5A9KVM.
- Out of scope: unrelated refactors not required for "Persist the verified Task Kernel native identity release blocker through the canonical repository coordinator".

## Verification

- State: ok
- Note: Verified: canonical Task Kernel final checks passed.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-09-19T00:59:45.018Z
- Branch: task/202609190050-3MJ7GQ/persist-native-identity-repair
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../commands/shared/native-task-identity.test.ts   | 99 ++++++++++++++++++++++
 .../src/commands/shared/native-task-identity.ts    | 45 ++++++++--
 2 files changed, 135 insertions(+), 9 deletions(-)
```

</details>
