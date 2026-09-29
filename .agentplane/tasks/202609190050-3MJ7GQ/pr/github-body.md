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
- Note: Canonical validation sha256:80c0f8fad3b7a60bad0745a0dac2b628c0c078d1386a4f88fb0b15d412be3bb9
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-09-19T01:42:44.829Z
- Branch: task/202609190050-3MJ7GQ/persist-native-identity-repair
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../commands/shared/native-task-identity.test.ts   | 99 ++++++++++++++++++++++
 .../src/commands/shared/native-task-identity.ts    | 45 ++++++++--
 2 files changed, 135 insertions(+), 9 deletions(-)
```

</details>
