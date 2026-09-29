Task: `202609232204-B33RAA`
Title: Repair intake intent and manifest effect classification
Canonical task record: `.agentplane/tasks/202609232204-B33RAA/README.md`

## Summary

Repair intake intent and manifest effect classification

Resolve #4835 and replace stale PR #5932 on current main: classify package.json as dependencies only when dependency fields change, reject incomplete controlled ops intent before task creation, expose structured intent in task brief, and add focused regression coverage.

## Scope

- In scope: Resolve #4835 and replace stale PR #5932 on current main: classify package.json as dependencies only when dependency fields change, reject incomplete controlled ops intent before task creation, expose structured intent in task brief, and add focused regression coverage.
- Out of scope: unrelated refactors not required for "Repair intake intent and manifest effect classification".

## Verification

- State: ok
- Note: Verified: canonical Task Kernel final checks passed.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-09-23T22:40:50.828Z
- Branch: task/202609232204-B33RAA/repair-intake-intent-and-manifest-effect-classif
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/cli/run-cli.core.route-decision.test.ts    | 66 +++++++++++++++
 .../src/cli/run-cli.core.tasks.create.test.ts      | 97 ++++++++++++++++++++++
 .../agentplane/src/commands/task/brief-model.ts    |  7 ++
 .../agentplane/src/commands/task/brief-render.ts   |  6 ++
 .../commands/task/direct-task-verification.test.ts |  8 +-
 .../task/external-agent-implementation-recovery.ts | 25 +++---
 .../agentplane/src/commands/task/kernel-read.ts    | 13 ++-
 packages/agentplane/src/commands/task/new.spec.ts  |  8 +-
 packages/agentplane/src/commands/task/new.ts       | 31 +++++++
 .../src/commands/task/verify-record-execute.ts     | 34 +++-----
 .../task/verify-record-observed-changes.ts         | 83 +++++++++++++++++-
 .../task/verify-record.durability.unit.test.ts     | 79 ++++++++++++++++++
 .../src/commands/task/verify-record.types.ts       |  2 +
 .../src/runtime/task-routing/resolve.test.ts       | 39 +++++++++
 .../agentplane/src/runtime/task-routing/resolve.ts |  2 +
 packages/core/src/tasks/index.ts                   |  1 +
 .../src/tasks/verification-contract-kernel.d.ts    |  5 ++
 .../core/src/tasks/verification-contract-kernel.js | 58 +++++++++++--
 .../core/src/tasks/verification-contract.test.ts   | 53 ++++++++++++
 packages/core/src/tasks/verification-contract.ts   |  8 ++
 20 files changed, 579 insertions(+), 46 deletions(-)
```

</details>
