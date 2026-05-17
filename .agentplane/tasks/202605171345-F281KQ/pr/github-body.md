Task: `202605171345-F281KQ`
Title: Add guided task begin and complete shortcuts
Canonical task record: `.agentplane/tasks/202605171345-F281KQ/README.md`

## Summary

Add guided task begin and complete shortcuts

Add thin user-facing workflow shortcuts over existing task lifecycle primitives so users can begin and complete a task through policy-aware commands while preserving the generated audit trail and explicit stop gates.

## Scope

- In scope: Add thin user-facing workflow shortcuts over existing task lifecycle primitives so users can begin and complete a task through policy-aware commands while preserving the generated audit trail and explicit stop gates.
- Out of scope: unrelated refactors not required for "Add guided task begin and complete shortcuts".

## Verification

- State: ok
- Note:

```text
Implemented guided task begin and complete shortcuts. Checks passed: guided CLI tests;
command-guide/help snapshots; docs freshness; policy routing; typecheck; lint; lifecycle unit tests
via Vitest after bun-test runner mismatch was reported as issue #3845; clean temp-repo smoke for
init -> task begin -> task complete.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-17T17:44:32.929Z
- Branch: task/202605171345-F281KQ/guided-task-shortcuts
- Head: 06ba4e225b95

```text
 .agentplane/WORKFLOW.md                            |   4 +
 .../blueprint/resolved-snapshot.json               | 535 +++++++++++++++++++++
 .agentplane/workflows/last-known-good.md           |   4 +
 docs/user/cli-reference.generated.mdx              |  63 +++
 .../run-cli.core.help-snap.test.ts.snap            | 113 +++--
 packages/agentplane/src/cli/command-guide.test.ts  |   4 +-
 packages/agentplane/src/cli/command-guide.ts       |  10 +-
 packages/agentplane/src/cli/command-invocations.ts |   2 +
 packages/agentplane/src/cli/command-snippets.ts    |   2 +
 .../src/cli/run-cli.core.task-guided.test.ts       | 228 +++++++++
 .../src/cli/run-cli/command-catalog/task.ts        |   6 +
 .../src/cli/run-cli/command-loaders/task.ts        |   8 +
 .../agentplane/src/commands/task/begin.command.ts  | 270 +++++++++++
 .../src/commands/task/complete.command.ts          | 185 +++++++
 .../agentplane/src/commands/task/task.command.ts   |  11 +-
 15 files changed, 1385 insertions(+), 60 deletions(-)
```

</details>
