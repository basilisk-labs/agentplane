Task: `202607281303-81KQ3X`
Title: Persist branch_pr authority outside the PR head
Canonical task record: `.agentplane/tasks/202607281303-81KQ3X/README.md`

## Summary

Persist branch_pr authority outside the PR head

Protected CI is invalidated when a scoped authority grant is written to the task README and auto-committed to the PR branch. Persist auditable, expiring authority metadata outside refs/heads while retaining exact operation and state-scope validation across task and integration checkouts.

## Scope

- In scope: Protected CI is invalidated when a scoped authority grant is written to the task README and auto-committed to the PR branch. Persist auditable, expiring authority metadata outside refs/heads while retaining exact operation and state-scope validation across task and integration checkouts.
- Out of scope: unrelated refactors not required for "Persist branch_pr authority outside the PR head".

## Verification

- State: ok
- Note:

```text
Verified authority storage across linked worktrees, exact-scope rejection, typecheck, focused tests,
test:fast, and local fast CI.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-07-28T13:04:44.037Z
- Branch: task/202607281303-81KQ3X/persist-branch-pr-authority-outside-the-pr-head
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/commands/shared/route-decision.ts          |   8 +-
 .../shared/side-effect-authority-store.test.ts     | 144 +++++++++++++++++++
 .../commands/shared/side-effect-authority-store.ts | 154 +++++++++++++++++++++
 .../src/commands/task/authority-grant.command.ts   | 110 +++++++--------
 4 files changed, 356 insertions(+), 60 deletions(-)
```

</details>
