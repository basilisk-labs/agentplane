Task: `202606031744-7N0FHQ`
Title: Support pre-merge branch_pr closure
Canonical task record: `.agentplane/tasks/202606031744-7N0FHQ/README.md`

## Summary

Support pre-merge branch_pr closure

Implement a branch_pr closure mode where a task PR can carry a complete pre-merge closure packet in the task branch, making hosted close a no-op/recovery fallback instead of the normal second closure PR.

## Scope

- In scope: Implement a branch_pr closure mode where a task PR can carry a complete pre-merge closure packet in the task branch, making hosted close a no-op/recovery fallback instead of the normal second closure PR.
- Out of scope: unrelated refactors not required for "Support pre-merge branch_pr closure".

## Verification

- State: ok
- Note:

```text
Command: timeout 180s bunx vitest run
packages/agentplane/src/commands/task/finish.close-tail.unit.test.ts
packages/agentplane/src/commands/task/hosted-close.command.test.ts
packages/agentplane/src/commands/shared/pr-meta.test.ts --pool=threads --maxWorkers=1 --testTimeout
120000 --hookTimeout 120000. Result: pass, 3 files and 34 tests passed. Command: bun run typecheck.
Result: pass. Command: node .agentplane/policy/check-routing.mjs. Result: pass, policy routing OK.
Command: bun run format:changed. Result: pass. Command: bun run docs:cli:check. Result: pass, cli
reference up to date. Command: git diff --check. Result: pass. Command: ap doctor. Result: pass with
unrelated historical DONE-task warnings 202605221745-8BHZSX and 202606011809-VCQPP7.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-06-03T17:44:58.986Z
- Branch: task/202606031744-7N0FHQ/support-pre-merge-branch-pr-closure
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .agentplane/policy/workflow.branch_pr.md           |  16 ++--
 docs/user/branching-and-pr-artifacts.mdx           |  19 ++--
 docs/user/cli-reference.generated.mdx              |   1 +
 docs/user/task-lifecycle.mdx                       |   6 +-
 docs/user/workflow.mdx                             |  14 +--
 packages/agentplane/src/commands/finish.run.ts     |   2 +
 .../agentplane/src/commands/finish.spec.shared.ts  |  16 ++++
 packages/agentplane/src/commands/finish.spec.ts    |   7 ++
 .../agentplane/src/commands/task/finish-close.ts   |  20 ++++
 .../agentplane/src/commands/task/finish-command.ts |   2 +
 .../src/commands/task/finish-execute-close.ts      |  48 ++++++++++
 .../agentplane/src/commands/task/finish-plan.ts    |  23 +++++
 .../agentplane/src/commands/task/finish-types.ts   |   2 +
 .../commands/task/finish.close-tail.unit.test.ts   | 106 +++++++++++++++++++++
 .../src/commands/task/hosted-close.command.test.ts |  37 ++++++-
 .../src/commands/task/hosted-close.command.ts      |  14 +++
 16 files changed, 305 insertions(+), 28 deletions(-)
```

</details>
