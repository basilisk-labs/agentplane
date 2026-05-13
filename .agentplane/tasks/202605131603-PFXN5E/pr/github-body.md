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
- Note: Updated verification after diagnostic refinement: eslint on changed TS passed; focused Vitest for hosted-close workflow and integrate command passed (2 files, 9 tests); bun run typecheck passed; git diff --check passed.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-05-13T16:13:43.955Z
- Branch: task/202605131603-PFXN5E/automate-merge-queue
- Head: 07e9c09bfab0

```text
 .github/workflows/publish.yml                      |   4 +-
 .github/workflows/task-hosted-close.yml            |   4 +-
 .../src/commands/integrate-queue.command.ts        | 137 +++++++++++----------
 .../src/commands/integrate-queue.spec.ts           |   9 ++
 .../src/commands/pr/integrate/cmd.test.ts          |  85 +++++++++++--
 .../agentplane/src/commands/pr/integrate/cmd.ts    | 103 ++++++++++++++++
 .../task/hosted-close-workflow-contract.test.ts    |   5 +-
 7 files changed, 267 insertions(+), 80 deletions(-)
```

</details>
