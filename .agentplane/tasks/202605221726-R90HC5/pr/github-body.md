Task: `202605221726-R90HC5`
Title: Enforce batch primary task artifact scaffold
Canonical task record: `.agentplane/tasks/202605221726-R90HC5/README.md`

## Summary

Enforce batch primary task artifact scaffold

Prevent shared batch worktrees from referencing a primary task that lacks a readable task README and explicit included-task manifest.

## Scope

- In scope: Prevent shared batch worktrees from referencing a primary task that lacks a readable task README and explicit included-task manifest.
- Out of scope: unrelated refactors not required for "Enforce batch primary task artifact scaffold".

## Verification

- State: ok
- Note:

```text
Verified: batch ownership metadata is written for primary and included tasks during pr open/update;
included task route/status can resolve the primary PR branch from extensions.branch_pr_batch. Checks
passed: targeted hosted-close batch test, batch validation/pr-meta/task-hosted-close tests, and bun
run typecheck.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-22T18:21:30.292Z
- Branch: task/202605221726-R90HC5/batch-ownership-scaffold
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/cli/run-cli.core.task-hosted-close.test.ts | 41 ++++++++++++
 .../agentplane/src/commands/pr/internal/sync.ts    | 77 +++++++++++++++++++++-
 .../agentplane/src/commands/shared/task-handoff.ts | 27 +++++++-
 3 files changed, 143 insertions(+), 2 deletions(-)
```

</details>
