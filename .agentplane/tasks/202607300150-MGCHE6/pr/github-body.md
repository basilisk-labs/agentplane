Task: `202607300150-MGCHE6`
Title: Recover diverged task PR identities safely
Canonical task record: `.agentplane/tasks/202607300150-MGCHE6/README.md`

## Summary

Recover diverged task PR identities safely

Provide a bounded CLI recovery route for branch_pr tasks whose local worktree head and hosted PR head diverge. Preserve the local unpublished commit as explicit recovery evidence, adopt the observed remote task-branch head without force-push or automatic conflict resolution, and restore a fresh conflict-rework packet for the task owner.

## Scope

- In scope: Provide a bounded CLI recovery route for branch_pr tasks whose local worktree head and hosted PR head diverge. Preserve the local unpublished commit as explicit recovery evidence, adopt the observed remote task-branch head without force-push or automatic conflict resolution, and restore a fresh conflict-rework packet for the task owner.
- Out of scope: unrelated refactors not required for "Recover diverged task PR identities safely".

## Verification

- State: ok
- Note:

```text
Focused recovery tests passed (29/29), typecheck passed, compatibility gate passed, and the full
ci:contract suite passed.
```
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-07-30T01:54:04.757Z
- Branch: task/202607300150-MGCHE6/recover-diverged-task-pr-identities-safely
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../commands/pr/conflict-rework-recovery.test.ts   | 221 +++++++++++++++++++++
 .../src/commands/pr/conflict-rework-recovery.ts    | 190 ++++++++++++++++++
 .../src/commands/pr/conflict-rework.command.ts     |  33 +++
 packages/agentplane/src/commands/pr/pr.command.ts  |   3 +
 packages/agentplane/src/commands/pr/pr.spec.ts     |  73 ++++++-
 .../baselines/v0.7-compatibility-candidate.json    |  69 ++++++-
 .../check-compatibility-contract-baseline.mjs      |  42 ++++
 7 files changed, 623 insertions(+), 8 deletions(-)
```

</details>
