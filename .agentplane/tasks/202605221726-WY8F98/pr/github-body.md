Task: `202605221726-WY8F98`
Title: Batch close-tail evidence for related tasks
Canonical task record: `.agentplane/tasks/202605221726-WY8F98/README.md`

## Summary

Batch close-tail evidence for related tasks

Allow one hosted close-tail PR to close a verified related task batch while preserving per-task verification and finish evidence.

## Scope

- In scope: Allow one hosted close-tail PR to close a verified related task batch while preserving per-task verification and finish evidence.
- Out of scope: unrelated refactors not required for "Batch close-tail evidence for related tasks".

## Verification

- State: ok
- Note:

```text
Evaluator pass: implementation is limited to close-tail PR evidence for batch metadata and tests
cover hosted-close plus hosted-close-pr behavior.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-23T00:31:44.898Z
- Branch: task/202605221726-WY8F98/batch-close-tail-evidence
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/cli/run-cli.core.task-hosted-close-pr.test.ts    | 10 ++++++++++
 .../src/commands/task/hosted-close-pr.execute.ts         | 16 ++++++++++++++--
 .../src/commands/task/hosted-close-pr.precheck.ts        |  3 ++-
 .../src/commands/task/hosted-close-pr.types.ts           |  1 +
 4 files changed, 27 insertions(+), 3 deletions(-)
```

</details>
