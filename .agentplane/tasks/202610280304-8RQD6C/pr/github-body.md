Task: `202610280304-8RQD6C`
Title: Recognize worktree preparation in failed-check lineage
Canonical task record: `.agentplane/tasks/202610280304-8RQD6C/README.md`

## Summary

Recognize worktree preparation in failed-check lineage

A native required-check correction must validate an issued WorkOrder whose authority lineage includes an exact worktree_preparation continuation, without weakening receipt, parent, fingerprint, revision, or repository identity proof.

## Scope

- In scope: A native required-check correction must validate an issued WorkOrder whose authority lineage includes an exact worktree_preparation continuation, without weakening receipt, parent, fingerprint, revision, or repository identity proof.
- Out of scope: unrelated refactors not required for "Recognize worktree preparation in failed-check lineage".

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-10-28T03:58:56.468Z
- Branch: task/202610280304-8RQD6C/recognize-worktree-preparation-in-failed-check-l
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 packages/core/src/tasks/task-kernel/kernel.ts      |  16 +-
 .../task-kernel/required-check-correction.test.ts  | 194 +++++++++++++++++++++
 2 files changed, 206 insertions(+), 4 deletions(-)
```

</details>
