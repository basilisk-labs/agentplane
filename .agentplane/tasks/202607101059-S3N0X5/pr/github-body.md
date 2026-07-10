Task: `202607101059-S3N0X5`
Title: Recover queue lanes after merged PR branch deletion
Canonical task record: `.agentplane/tasks/202607101059-S3N0X5/README.md`

## Summary

Recover queue lanes after merged PR branch deletion

Make branch_pr queue recovery resolve authoritative GitHub PR state by persisted PR number when the remote head branch has been deleted, validate branch/base identity, and prevent false missing-PR diagnostics for queued pre-merge-closed tasks whose artifacts are not yet on main.

## Scope

- In scope: Make branch_pr queue recovery resolve authoritative GitHub PR state by persisted PR number when the remote head branch has been deleted, validate branch/base identity, and prevent false missing-PR diagnostics for queued pre-merge-closed tasks whose artifacts are not yet on main.
- Out of scope: unrelated refactors not required for "Recover queue lanes after merged PR branch deletion".

## Verification

- State: ok
- Note:

```text
Review follow-up verified: queue-only OPEN fallback is restricted to queued entries; handoff without
authoritative PR evidence remains not_found for recovery. Focused suite passed (3 files, 14 tests),
typecheck and lint:core passed.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-07-10T11:11:44.154Z
- Branch: task/202607101059-S3N0X5/recover-queue-lanes-after-merged-pr-branch-delet
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .agentplane/tasks/202607092209-F33MNN/README.md    |   1 +
 docs/internal/v0.6.22-refactor-plan.md             |   5 +-
 .../src/cli/run-cli.core.pr-flow.status.test.ts    | 222 ++++++++++++++++++++-
 packages/agentplane/src/commands/pr/flow-status.ts |  83 +++++---
 .../src/commands/pr/internal/sync-github.ts        |  39 ++++
 5 files changed, 320 insertions(+), 30 deletions(-)
```

</details>
