Task: `202608031321-5GK3DD`
Title: Make built-in task run context-verifiable
Canonical task record: `.agentplane/tasks/202608031321-5GK3DD/README.md`

## Summary

Make built-in task run context-verifiable

Fix GitHub issue #4641 by ensuring the default built-in runner completes through a live authenticated context-verification boundary or stops with an executable supervisor route; never accept persisted receipt bytes, path hashes, or self-claims as authentication.

## Scope

- In scope: Fix GitHub issue #4641 by ensuring the default built-in runner completes through a live authenticated context-verification boundary or stops with an executable supervisor route; never accept persisted receipt bytes, path hashes, or self-claims as authentication.
- Out of scope: unrelated refactors not required for "Make built-in task run context-verifiable".

## Verification

- State: ok
- Note:

```text
Verified: live context supervision, fail-closed receipt handling, formal task verification,
module-size guard, and the full local CI matrix all pass.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-03T13:23:15.671Z
- Branch: task/202608031321-5GK3DD/make-built-in-task-run-context-verifiable
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../commands/context/assimilation-supervisor.ts    |  67 ++++-
 .../context/assimilation-supervisor.unit.test.ts   |  63 +++++
 .../commands/context/assimilation-verification.ts  |  49 ++++
 .../verify-task.maximum-assimilation.unit.test.ts  |  37 ++-
 .../agentplane/src/commands/context/verify-task.ts |   5 +-
 .../src/commands/shared/route-execution-packet.ts  |   1 +
 .../src/commands/shared/workflow-step-factory.ts   |  31 +++
 .../src/commands/shared/workflow-step.test.ts      |  84 +++++++
 .../agentplane/src/context/ingest-task-prompt.ts   |   2 +-
 packages/agentplane/src/context/verify-task.ts     |  64 +++--
 .../src/runner/usecases/task-run-authority.ts      |  26 +-
 .../usecases/task-run-context.integration.test.ts  | 270 ++++-----------------
 12 files changed, 445 insertions(+), 254 deletions(-)
```

</details>
