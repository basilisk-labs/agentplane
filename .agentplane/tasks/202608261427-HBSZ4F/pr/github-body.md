Task: `202608261427-HBSZ4F`
Title: Recover no-PR task branch publication after task-artifact-only divergence
Canonical task record: `.agentplane/tasks/202608261427-HBSZ4F/README.md`

## Summary

Recover no-PR task branch publication after task-artifact-only divergence

Release blocker for BXQZ97 and AgentPlane 0.7.8. Symptom: AgentPlane pr open reproducibly fails twice with non-fast-forward when the remote task branch has no PR and local and remote heads diverge only because separate successful verification runs recorded different AgentPlane-owned task evidence commits; source trees are identical. Violated invariant: a clean verified task must have a normal effectively-once publication route when an observed orphan remote branch differs only in the same task's generated artifacts. Root cause: branch publication permits exact-head reuse and guarded replacement for an existing OPEN PR, but intentionally rejects every divergent no-PR branch. Temporary recovery: preserve both exact heads and do not force-push, delete the remote branch, open a PR manually, or edit task state. Permanent fix: add one fail-closed guarded no-PR replacement path that requires exact remote-head lease, same repository identity, provider-proven absence of a matching PR, and a diff confined to the current task's artifact paths; retain refusal for source differences, provider ambiguity, identity mismatch, missing objects, or races. Regression tests must prove success for task-artifact-only divergence and refusal for source divergence, unavailable provider state, mismatched repository, and lease races. Integrate normally, then resume BXQZ97.

## Scope

- In scope: Release blocker for BXQZ97 and AgentPlane 0.7.8. Symptom: AgentPlane pr open reproducibly fails twice with non-fast-forward when the remote task branch has no PR and local and remote heads diverge only because separate successful verification runs recorded different AgentPlane-owned task evidence commits; source trees are identical. Violated invariant: a clean verified task must have a normal effectively-once publication route when an observed orphan remote branch differs only in the same task's generated artifacts. Root cause: branch publication permits exact-head reuse and guarded replacement for an existing OPEN PR, but intentionally rejects every divergent no-PR branch. Temporary recovery: preserve both exact heads and do not force-push, delete the remote branch, open a PR manually, or edit task state. Permanent fix: add one fail-closed guarded no-PR replacement path that requires exact remote-head lease, same repository identity, provider-proven absence of a matching PR, and a diff confined to the current task's artifact paths; retain refusal for source differences, provider ambiguity, identity mismatch, missing objects, or races. Regression tests must prove success for task-artifact-only divergence and refusal for source divergence, unavailable provider state, mismatched repository, and lease races. Integrate normally, then resume BXQZ97.
- Out of scope: unrelated refactors not required for "Recover no-PR task branch publication after task-artifact-only divergence".

## Verification

- State: pending
- Note: Not recorded yet.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-26T14:34:34.419Z
- Branch: task/202608261427-HBSZ4F/recover-no-pr-task-branch-publication-after-task
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../src/commands/pr/branch-publication.test.ts     | 325 ++++++++++++++++++++-
 .../src/commands/pr/branch-publication.ts          | 110 ++++++-
 packages/agentplane/src/commands/pr/open.ts        |   3 +
 3 files changed, 436 insertions(+), 2 deletions(-)
```

</details>
