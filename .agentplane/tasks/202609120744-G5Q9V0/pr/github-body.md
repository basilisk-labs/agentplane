Task: `202609120744-G5Q9V0`
Title: Fail fast on incomplete ops task intent
Canonical task record: `.agentplane/tasks/202609120744-G5Q9V0/README.md`

## Summary

Fail fast on incomplete ops task intent

Make task new reject or materialize incomplete controlled ops intent before lifecycle approval, and expose structured intent fields in task brief so downstream host-operation guards are not the first failure point.

## Scope

- In scope: Make task new reject or materialize incomplete controlled ops intent before lifecycle approval, and expose structured intent fields in task brief so downstream host-operation guards are not the first failure point.
- Out of scope: unrelated refactors not required for "Fail fast on incomplete ops task intent".

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-09-12T07:48:41.870Z
- Branch: task/202609120744-G5Q9V0/fail-fast-on-incomplete-ops-task-intent
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/cli/run-cli.core.route-decision.test.ts    |   4 +
 .../src/cli/run-cli.core.tasks.create.test.ts      | 102 +++++++++++++++++++++
 .../agentplane/src/commands/task/brief-model.ts    |   9 ++
 .../agentplane/src/commands/task/brief-render.ts   |   7 ++
 packages/agentplane/src/commands/task/new.spec.ts  |   5 +
 packages/agentplane/src/commands/task/new.ts       |  47 ++++++++++
 6 files changed, 174 insertions(+)
```

</details>
