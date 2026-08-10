Task: `202608101850-25R7W2`
Title: Recover legacy merged cleanup identity from the provider
Canonical task record: `.agentplane/tasks/202608101850-25R7W2/README.md`

## Summary

Recover legacy merged cleanup identity from the provider

Allow explicit cleanup of a legacy DONE task branch when old PR metadata lacks pr_number but an exact branch-and-base provider lookup proves a merged PR, its provider head equals the local branch head, its merge commit is on the base branch, and pre-merge closure evidence is present. Preserve rejection for ambiguous, closed, open, mismatched-head, post-merge-drift, or unavailable-provider cases.

## Scope

- In scope: Allow explicit cleanup of a legacy DONE task branch when old PR metadata lacks pr_number but an exact branch-and-base provider lookup proves a merged PR, its provider head equals the local branch head, its merge commit is on the base branch, and pre-merge closure evidence is present. Preserve rejection for ambiguous, closed, open, mismatched-head, post-merge-drift, or unavailable-provider cases.
- Out of scope: unrelated refactors not required for "Recover legacy merged cleanup identity from the provider".

## Verification

- State: ok
- Note: Verified: CLI-owned declared checks passed; independent EVALUATOR review is pending.
- Canonical workflow state lives in the task README.

<details>
<summary>Raw evidence</summary>

- Updated: 2026-08-10T19:07:56.432Z
- Branch: task/202608101850-25R7W2/recover-legacy-merged-cleanup-identity-from-the
- Head: computed live by `agentplane pr check` / `agentplane integrate`

```text
 .../branch/cleanup-merged-targeted-proof.ts        |  29 +++-
 .../branch/cleanup-merged.targeted.test.ts         | 159 +++++++++++++++++++--
 .../src/commands/task/close-tail-state.test.ts     |  13 +-
 .../src/commands/task/close-tail-state.ts          |   4 +-
 4 files changed, 190 insertions(+), 15 deletions(-)
```

</details>
