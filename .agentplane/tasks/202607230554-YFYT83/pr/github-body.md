Task: `202607230554-YFYT83`
Title: Make branch_pr publication and cleanup state-safe
Canonical task record: `.agentplane/tasks/202607230554-YFYT83/README.md`

## Summary

Make branch_pr publication and cleanup state-safe

Repair the branch_pr lifecycle so task and pre-merge closure commits are published before queueing, enqueue and integration fail closed when local, upstream, or hosted PR heads disagree, evaluator rework invalidates stale closure evidence, remote freshness telemetry reports checked truth, and cleanup can safely target provider-merged rebase or squash branches without deleting unrelated worktrees.

## Scope

- In scope: branch_pr route publication state; local, upstream, and hosted PR head agreement at enqueue, claim, run-next, and integrate; pre-merge closure invalidation after rework or branch advancement; truthful remote freshness telemetry; provider-confirmed task-scoped cleanup for merged rebase or squash PRs; focused CLI documentation, roadmap, and regression tests.
- Out of scope: changing provider merge authority, auto-merging without the integration lane, deleting unrelated historical cleanup candidates, RF04 replay work, or any mutation of agentplane-loops.

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-07-23T05:57:56.603Z
- Branch: task/202607230554-YFYT83/make-branch-pr-publication-and-cleanup-state-saf
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
No changes detected.
```

</details>
