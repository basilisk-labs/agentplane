Task: `202605131603-PFXN5E`
Title: Automate branch_pr merge queue finalization
Canonical task record: `.agentplane/tasks/202605131603-PFXN5E/README.md`

## Summary

Automate branch_pr merge queue finalization

Make branch_pr completion queue verified task branches for serialized integration, prefer merge commits over squash in hosted close routes, and move protected-base integration toward GitHub merge orchestration instead of a manual handoff-only stop.

## Scope

- In scope: Make branch_pr completion queue verified task branches for serialized integration, prefer merge commits over squash in hosted close routes, and move protected-base integration toward GitHub merge orchestration instead of a manual handoff-only stop.
- Out of scope: unrelated refactors not required for "Automate branch_pr merge queue finalization".

## Verification

- State: ok
- Note: Final verification after queue drain/docs refresh: focused integrate and queue tests passed (4 files, 18 tests); eslint passed for changed TS; bun run typecheck passed; format/checks passed through pre-push up to the cold-start timing guard; PR branch pushed at 401d1ac6d.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-13T16:37:33.831Z
- Branch: task/202605131603-PFXN5E/automate-merge-queue
- Head: f208d75106b9

```text
 .github/workflows/publish.yml                      |   4 +-
 .github/workflows/task-hosted-close.yml            |   4 +-
 docs/user/cli-reference.generated.mdx              |   1 +
 .../src/commands/integrate-queue.command.ts        | 137 +++++++++++----------
 .../src/commands/integrate-queue.spec.ts           |   9 ++
 .../src/commands/pr/integrate/cmd.test.ts          |  85 +++++++++++--
 .../agentplane/src/commands/pr/integrate/cmd.ts    | 103 ++++++++++++++++
 .../task/hosted-close-workflow-contract.test.ts    |   5 +-
 8 files changed, 268 insertions(+), 80 deletions(-)
```

</details>
